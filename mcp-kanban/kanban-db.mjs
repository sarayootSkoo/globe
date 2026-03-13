/**
 * kanban-db.mjs — SQLite-backed Kanban database layer
 *
 * Replaces the previous JSON file I/O approach with better-sqlite3.
 * Database file: .kanban/kanban.db (relative to project root)
 *
 * Also maintains JSON file compatibility:
 *   - board.json is written alongside DB changes for browser/event-server sync
 *   - events.jsonl is kept as an append-only log
 */

import Database from 'better-sqlite3';
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// .kanban/ is one level up from mcp-kanban/ (project root)
const KANBAN_DIR = resolve(__dirname, '../.kanban');
const DB_PATH = resolve(KANBAN_DIR, 'kanban.db');

// Ensure .kanban directory exists
try {
  mkdirSync(KANBAN_DIR, { recursive: true });
} catch (_) {}

// ── SQLite Database ─────────────────────────────────────────────────────────

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Schema ──────────────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    section TEXT,
    column_id TEXT NOT NULL DEFAULT 'backlog',
    status TEXT DEFAULT 'idle',
    priority TEXT DEFAULT 'medium',
    agent_type TEXT,
    artifact_path TEXT,
    upload_path TEXT,
    parent_card_id TEXT,
    metadata TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS workflows (
    id TEXT PRIMARY KEY,
    card_id TEXT REFERENCES cards(id) ON DELETE CASCADE,
    from_column TEXT,
    to_column TEXT,
    command TEXT,
    started_at TEXT DEFAULT (datetime('now')),
    completed_at TEXT,
    status TEXT DEFAULT 'running',
    output_json TEXT
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    card_id TEXT REFERENCES cards(id) ON DELETE SET NULL,
    command TEXT,
    started_at TEXT DEFAULT (datetime('now')),
    ended_at TEXT,
    token_usage INTEGER DEFAULT 0,
    pause_reason TEXT,
    resume_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS command_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id TEXT REFERENCES cards(id) ON DELETE SET NULL,
    command TEXT,
    input_path TEXT,
    output_path TEXT,
    executed_at TEXT DEFAULT (datetime('now')),
    duration_ms INTEGER,
    success INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS file_blobs (
    id TEXT PRIMARY KEY,
    card_id TEXT REFERENCES cards(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT,
    size INTEGER NOT NULL DEFAULT 0,
    upload_path TEXT NOT NULL,
    blob_data BLOB,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_cards_column ON cards(column_id);
  CREATE INDEX IF NOT EXISTS idx_cards_status ON cards(status);
  CREATE INDEX IF NOT EXISTS idx_cards_section ON cards(section);
  CREATE INDEX IF NOT EXISTS idx_workflows_card ON workflows(card_id);
  CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
  CREATE INDEX IF NOT EXISTS idx_history_card ON command_history(card_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_card ON sessions(card_id);
  CREATE INDEX IF NOT EXISTS idx_file_blobs_card ON file_blobs(card_id);
`);

// ── Prepared Statements ─────────────────────────────────────────────────────

const stmts = {
  // Cards
  insertCard: db.prepare(`
    INSERT INTO cards (id, title, section, column_id, status, priority, agent_type, artifact_path, parent_card_id, metadata, created_at, updated_at)
    VALUES (@id, @title, @section, @column_id, @status, @priority, @agent_type, @artifact_path, @parent_card_id, @metadata, @created_at, @updated_at)
  `),
  updateCard: db.prepare(`
    UPDATE cards SET title=@title, section=@section, column_id=@column_id, status=@status,
    priority=@priority, agent_type=@agent_type, artifact_path=@artifact_path,
    parent_card_id=@parent_card_id, metadata=@metadata, updated_at=@updated_at
    WHERE id=@id
  `),
  getCard: db.prepare('SELECT * FROM cards WHERE id = ?'),
  getAllCards: db.prepare('SELECT * FROM cards ORDER BY created_at DESC'),
  getCardsByColumn: db.prepare('SELECT * FROM cards WHERE column_id = ? ORDER BY created_at DESC'),
  getCardsByStatus: db.prepare('SELECT * FROM cards WHERE status = ? ORDER BY created_at DESC'),
  getCardsByAgent: db.prepare('SELECT * FROM cards WHERE agent_type = ? ORDER BY created_at DESC'),
  moveCard: db.prepare('UPDATE cards SET column_id = ?, updated_at = datetime(\'now\') WHERE id = ?'),
  updateCardStatus: db.prepare('UPDATE cards SET status = ?, updated_at = datetime(\'now\') WHERE id = ?'),
  deleteCard: db.prepare('DELETE FROM cards WHERE id = ?'),
  searchCards: db.prepare(`
    SELECT * FROM cards
    WHERE title LIKE '%' || @query || '%' OR section LIKE '%' || @query || '%'
    ORDER BY updated_at DESC LIMIT @limit
  `),

  // Workflows
  insertWorkflow: db.prepare(`
    INSERT INTO workflows (id, card_id, from_column, to_column, command, started_at, status)
    VALUES (@id, @card_id, @from_column, @to_column, @command, @started_at, @status)
  `),
  completeWorkflow: db.prepare(`
    UPDATE workflows SET completed_at = datetime('now'), status = @status, output_json = @output_json
    WHERE id = @id
  `),
  getWorkflowsByCard: db.prepare('SELECT * FROM workflows WHERE card_id = ? ORDER BY started_at DESC'),

  // Sessions
  insertSession: db.prepare(`
    INSERT INTO sessions (id, card_id, command, started_at)
    VALUES (@id, @card_id, @command, @started_at)
  `),
  endSession: db.prepare(`
    UPDATE sessions SET ended_at = datetime('now'), token_usage = @token_usage WHERE id = @id
  `),
  getSessionsByCard: db.prepare('SELECT * FROM sessions WHERE card_id = ? ORDER BY started_at DESC'),

  // Command History
  insertCommand: db.prepare(`
    INSERT INTO command_history (card_id, command, input_path, output_path, duration_ms, success)
    VALUES (@card_id, @command, @input_path, @output_path, @duration_ms, @success)
  `),
  getCommandsByCard: db.prepare('SELECT * FROM command_history WHERE card_id = ? ORDER BY executed_at DESC LIMIT ?'),

  // Settings
  getSetting: db.prepare('SELECT value FROM settings WHERE key = ?'),
  upsertSetting: db.prepare(`
    INSERT INTO settings (key, value, updated_at)
    VALUES (@key, @value, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value=@value, updated_at=datetime('now')
  `),

  // File Blobs
  insertFileBlob: db.prepare(`
    INSERT INTO file_blobs (id, card_id, filename, original_name, mime_type, size, upload_path, blob_data, created_at)
    VALUES (@id, @card_id, @filename, @original_name, @mime_type, @size, @upload_path, @blob_data, @created_at)
  `),
  getFilesByCard: db.prepare('SELECT id, card_id, filename, original_name, mime_type, size, upload_path, created_at FROM file_blobs WHERE card_id = ? ORDER BY created_at DESC'),
  getFileBlob: db.prepare('SELECT * FROM file_blobs WHERE id = ?'),
  getFileBlobByPath: db.prepare('SELECT * FROM file_blobs WHERE upload_path = ? AND filename = ?'),
  deleteFileBlob: db.prepare('DELETE FROM file_blobs WHERE id = ?'),
  deleteFilesByCard: db.prepare('DELETE FROM file_blobs WHERE card_id = ?'),

  // Metrics
  countByColumn: db.prepare('SELECT column_id, COUNT(*) as count FROM cards GROUP BY column_id'),
  countByStatus: db.prepare('SELECT status, COUNT(*) as count FROM cards GROUP BY status'),
  countWip: db.prepare("SELECT COUNT(*) as count FROM cards WHERE status IN ('running', 'started')"),
  totalCards: db.prepare('SELECT COUNT(*) as count FROM cards'),
};

// ── Card Operations ─────────────────────────────────────────────────────────

export function createCard({ id, title, section, column = 'backlog', priority = 'medium', agent_type, artifact_path, parent_card_id, metadata }) {
  const now = new Date().toISOString();
  const card = {
    id,
    title,
    section: section || null,
    column_id: column,
    status: 'idle',
    priority,
    agent_type: agent_type || null,
    artifact_path: artifact_path || null,
    parent_card_id: parent_card_id || null,
    metadata: metadata ? JSON.stringify(metadata) : null,
    created_at: now,
    updated_at: now,
  };
  stmts.insertCard.run(card);
  syncBoardJson();
  return getCard(id);
}

export function getCard(id) {
  const row = stmts.getCard.get(id);
  if (!row) return null;
  if (row.metadata) {
    try { row.metadata = JSON.parse(row.metadata); } catch { /* keep as string */ }
  }
  return row;
}

export function updateCard(id, updates) {
  const existing = stmts.getCard.get(id);
  if (!existing) return null;

  const card = {
    ...existing,
    ...updates,
    id, // ensure id doesn't change
    metadata: updates.metadata ? JSON.stringify(updates.metadata) : existing.metadata,
    updated_at: new Date().toISOString(),
  };
  stmts.updateCard.run(card);
  syncBoardJson();
  return getCard(id);
}

export function moveCardToColumn(id, toColumn) {
  const card = stmts.getCard.get(id);
  if (!card) return null;

  const fromColumn = card.column_id;
  stmts.moveCard.run(toColumn, id);
  syncBoardJson();
  return { id, fromColumn, toColumn, card: getCard(id) };
}

export function updateCardStatus(id, status, reason) {
  const card = stmts.getCard.get(id);
  if (!card) return null;

  const previousStatus = card.status;
  stmts.updateCardStatus.run(status, id);
  syncBoardJson();
  return { id, previousStatus, status, card: getCard(id) };
}

export function listCards({ column, status, agent, limit = 50 } = {}) {
  let cards;
  if (column) {
    cards = stmts.getCardsByColumn.all(column);
  } else if (status) {
    cards = stmts.getCardsByStatus.all(status);
  } else if (agent) {
    cards = stmts.getCardsByAgent.all(agent);
  } else {
    cards = stmts.getAllCards.all();
  }

  // Apply cross-filters
  if (column && status) cards = cards.filter(c => c.status === status);
  if (column && agent) cards = cards.filter(c => c.agent_type === agent);
  if (status && agent) cards = cards.filter(c => c.agent_type === agent);

  return cards.slice(0, limit).map(row => {
    if (row.metadata) {
      try { row.metadata = JSON.parse(row.metadata); } catch { /* keep */ }
    }
    return row;
  });
}

export function searchCards(query, limit = 10) {
  return stmts.searchCards.all({ query, limit }).map(row => {
    if (row.metadata) {
      try { row.metadata = JSON.parse(row.metadata); } catch { /* keep */ }
    }
    return row;
  });
}

export function deleteCard(id) {
  const result = stmts.deleteCard.run(id);
  if (result.changes > 0) syncBoardJson();
  return result.changes > 0;
}

// ── Workflow Operations ─────────────────────────────────────────────────────

export function startWorkflow({ id, card_id, command, from_column, to_column }) {
  stmts.insertWorkflow.run({
    id,
    card_id,
    from_column: from_column || null,
    to_column: to_column || null,
    command,
    started_at: new Date().toISOString(),
    status: 'running',
  });
  return { id, card_id, command, status: 'running' };
}

export function completeWorkflow(id, { status = 'completed', output } = {}) {
  stmts.completeWorkflow.run({
    id,
    status,
    output_json: output ? JSON.stringify(output) : null,
  });
}

export function getWorkflows(card_id) {
  return stmts.getWorkflowsByCard.all(card_id).map(row => {
    if (row.output_json) {
      try { row.output = JSON.parse(row.output_json); } catch { row.output = row.output_json; }
    }
    return row;
  });
}

// ── Session Operations ──────────────────────────────────────────────────────

export function startSession({ id, card_id, command }) {
  stmts.insertSession.run({
    id,
    card_id: card_id || null,
    command: command || null,
    started_at: new Date().toISOString(),
  });
}

export function endSession(id, { token_usage = 0 } = {}) {
  stmts.endSession.run({ id, token_usage });
}

export function getSessions(card_id) {
  return stmts.getSessionsByCard.all(card_id);
}

// ── Command History ─────────────────────────────────────────────────────────

export function logCommand({ card_id, command, input_path, output_path, duration_ms, success = true }) {
  stmts.insertCommand.run({
    card_id: card_id || null,
    command,
    input_path: input_path || null,
    output_path: output_path || null,
    duration_ms: duration_ms || null,
    success: success ? 1 : 0,
  });
}

export function getCommands(card_id, limit = 20) {
  return stmts.getCommandsByCard.all(card_id, limit);
}

// ── Settings ────────────────────────────────────────────────────────────────

export function getSetting(key) {
  const row = stmts.getSetting.get(key);
  if (!row) return null;
  try { return JSON.parse(row.value); } catch { return row.value; }
}

export function setSetting(key, value) {
  stmts.upsertSetting.run({ key, value: typeof value === 'string' ? value : JSON.stringify(value) });
}

// ── Metrics ─────────────────────────────────────────────────────────────────

export function getMetrics() {
  const perColumn = {};
  for (const row of stmts.countByColumn.all()) {
    perColumn[row.column_id] = row.count;
  }

  const perStatus = {};
  for (const row of stmts.countByStatus.all()) {
    perStatus[row.status] = row.count;
  }

  const { count: wip } = stmts.countWip.get();
  const { count: totalCards } = stmts.totalCards.get();

  return { totalCards, perColumn, perStatus, wip };
}

// ── File Blob Operations ────────────────────────────────────────────────────

/**
 * Store file metadata (and optionally the binary blob) in SQLite.
 * @param {object} opts
 * @param {string} opts.id - Unique file ID
 * @param {string} opts.card_id - Owning card ID
 * @param {string} opts.filename - Sanitized filename on disk
 * @param {string} opts.original_name - Original filename from user
 * @param {string} [opts.mime_type] - MIME type
 * @param {number} opts.size - File size in bytes
 * @param {string} opts.upload_path - Directory path relative to DOCS_ROOT
 * @param {Buffer} [opts.blob_data] - Optional binary data for blob storage
 */
export function createFileBlob({ id, card_id, filename, original_name, mime_type, size, upload_path, blob_data }) {
  stmts.insertFileBlob.run({
    id,
    card_id: card_id || null,
    filename,
    original_name: original_name || filename,
    mime_type: mime_type || null,
    size: size || 0,
    upload_path,
    blob_data: blob_data || null,
    created_at: new Date().toISOString(),
  });
  return { id, card_id, filename, original_name, size, upload_path };
}

export function getFilesByCard(card_id) {
  return stmts.getFilesByCard.all(card_id);
}

export function getFileBlob(id) {
  return stmts.getFileBlob.get(id);
}

export function getFileBlobByPath(upload_path, filename) {
  return stmts.getFileBlobByPath.get(upload_path, filename);
}

export function deleteFileBlob(id) {
  const result = stmts.deleteFileBlob.run(id);
  return result.changes > 0;
}

export function deleteFilesByCard(card_id) {
  const result = stmts.deleteFilesByCard.run(card_id);
  return result.changes;
}

// ── Events (append-only JSONL — kept for compatibility) ─────────────────────

function kanbanPath(filename) {
  return resolve(KANBAN_DIR, filename);
}

export function appendEvent(event) {
  const line = JSON.stringify({ ...event, ts: event.ts ?? Date.now() }) + '\n';
  appendFileSync(kanbanPath('events.jsonl'), line, 'utf8');
}

export function readEvents(limit = 50) {
  try {
    const raw = readFileSync(kanbanPath('events.jsonl'), 'utf8');
    const lines = raw.split('\n').filter((l) => l.trim() !== '');
    const slice = limit > 0 ? lines.slice(-limit) : lines;
    return slice.map((line) => {
      try { return JSON.parse(line); } catch (_) { return { raw: line }; }
    });
  } catch (_) {
    return [];
  }
}

// ── Board JSON Sync (browser/event-server compatibility) ────────────────────

function syncBoardJson() {
  try {
    const cards = stmts.getAllCards.all().map(row => {
      if (row.metadata) {
        try { row.metadata = JSON.parse(row.metadata); } catch { /* keep */ }
      }
      // Map column_id back to column for JSON compat
      row.column = row.column_id;
      return row;
    });

    const columns = {};
    for (const card of cards) {
      if (!columns[card.column_id]) columns[card.column_id] = [];
      columns[card.column_id].push(card.id);
    }

    const board = { cards, columns, updatedAt: Date.now() };
    writeFileSync(kanbanPath('board.json'), JSON.stringify(board, null, 2), 'utf8');
  } catch (_) {
    // Silent fail — board.json sync is best-effort
  }
}

// ── Legacy Compatibility Layer ──────────────────────────────────────────────
// These functions maintain the same API as the old JSON-based kanban-db.mjs
// so that index.mjs (MCP server) continues to work without changes.

export function readBoard() {
  const cards = listCards({ limit: 9999 });
  const columns = {};
  for (const card of cards) {
    const col = card.column_id || card.column || 'backlog';
    if (!columns[col]) columns[col] = [];
    columns[col].push(card.id);
  }
  return { cards, columns, updatedAt: Date.now() };
}

export function writeBoard(data) {
  // Batch import — used when receiving board state from browser
  const importCards = db.transaction((cards) => {
    for (const card of cards) {
      const existing = stmts.getCard.get(card.id);
      if (existing) {
        stmts.updateCard.run({
          ...existing,
          ...card,
          column_id: card.column_id || card.column || existing.column_id,
          metadata: card.metadata ? JSON.stringify(card.metadata) : existing.metadata,
          updated_at: new Date().toISOString(),
        });
      } else {
        stmts.insertCard.run({
          id: card.id,
          title: card.title || 'Untitled',
          section: card.section || null,
          column_id: card.column_id || card.column || 'backlog',
          status: card.status || 'idle',
          priority: card.priority || 'medium',
          agent_type: card.agent_type || card.agent || null,
          artifact_path: card.artifact_path || null,
          parent_card_id: card.parent_card_id || null,
          metadata: card.metadata ? JSON.stringify(card.metadata) : null,
          created_at: card.createdAt ? new Date(card.createdAt).toISOString() : new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    }
  });

  if (data.cards && Array.isArray(data.cards)) {
    importCards(data.cards);
  }

  syncBoardJson();
  return { ...data, updatedAt: Date.now() };
}

export function readStatus() {
  try {
    const raw = readFileSync(kanbanPath('status.json'), 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function writeStatus(status) {
  writeFileSync(kanbanPath('status.json'), JSON.stringify(status, null, 2), 'utf8');
}

export function readPending() {
  try {
    const raw = readFileSync(kanbanPath('pending.json'), 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return [];
  }
}

export function writePending(commands) {
  writeFileSync(kanbanPath('pending.json'), JSON.stringify(commands, null, 2), 'utf8');
}

export function readResult() {
  try {
    const raw = readFileSync(kanbanPath('result.json'), 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

// ── Migration: Import existing board.json into SQLite ───────────────────────

function migrateFromJson() {
  const boardPath = kanbanPath('board.json');
  if (!existsSync(boardPath)) return;

  // Only migrate if DB is empty
  const { count } = stmts.totalCards.get();
  if (count > 0) return;

  try {
    const raw = readFileSync(boardPath, 'utf8');
    const board = JSON.parse(raw);
    if (board.cards && Array.isArray(board.cards) && board.cards.length > 0) {
      console.error(`[kanban-db] Migrating ${board.cards.length} cards from board.json to SQLite...`);
      writeBoard(board);
      console.error(`[kanban-db] Migration complete.`);
    }
  } catch (err) {
    console.error(`[kanban-db] Migration failed: ${err.message}`);
  }
}

// Run migration on import
migrateFromJson();

// ── Cleanup on exit ─────────────────────────────────────────────────────────

process.on('exit', () => {
  try { db.close(); } catch { /* ignore */ }
});

// Export the raw db for advanced queries
export { db };
