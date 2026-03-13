/**
 * sync-all-to-db.mjs — Import ALL graph nodes from graph-data.json into SQLite
 *
 * This syncs every doc/card on the board into .kanban/kanban.db
 * Run: node scripts/sync-all-to-db.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from '../mcp-kanban/kanban-db.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRAPH_PATH = path.resolve(__dirname, '../public/graph-data.json');

// ── Load graph data ─────────────────────────────────────────────────────────
const raw = JSON.parse(fs.readFileSync(GRAPH_PATH, 'utf8'));
const nodes = raw.nodes || [];
console.log(`[sync] Loaded ${nodes.length} nodes from graph-data.json`);

// ── Status detection (mirrors kanbanState.ts deriveStatus) ──────────────────
function deriveStatus(node) {
  const f = (node.file || '').toLowerCase();
  const s = (node.status || '').toLowerCase();

  if (/[/\\]old[/\\]|[/\\]archive[/\\]/.test(f)) return 'done';
  if (/[/\\]hold[/\\]/.test(f)) return 'hold';
  if (s === 'done' || s === 'completed') return 'done';
  if (s === 'hold' || s === 'on-hold') return 'hold';
  if (s === 'in-progress') return 'develop';
  if (/[/\\]specs?[/\\]/.test(f) || f.startsWith('spec')) return 'design';
  if (/[/\\]tasks?[/\\]/.test(f) || f.startsWith('task')) return 'task';
  if (/[/\\]issues?[/\\]/.test(f) || f.startsWith('issue')) return 'issue';
  if (/[/\\]discuss(ion)?[/\\]/.test(f) || f.startsWith('discuss')) return 'backlog';
  if (/[/\\]decisions?[/\\]/.test(f)) return 'done';
  // Default: if it has a file, put in backlog; otherwise skip
  return node.file ? 'backlog' : null;
}

function detectType(file) {
  const f = (file || '').toLowerCase();
  if (/[/\\]specs?[/\\]/.test(f) || f.startsWith('spec')) return 'spec';
  if (/[/\\]issues?[/\\]/.test(f) || f.startsWith('issue')) return 'issue';
  if (/[/\\]tasks?[/\\]/.test(f) || f.startsWith('task')) return 'task';
  return 'discussion';
}

function detectSection(node) {
  const f = (node.file || '');
  // Extract section from file path like "oms-order-specs/..." or category
  const match = f.match(/^([a-z]+-[a-z]+)/);
  return match ? match[1] : node.cat || 'general';
}

function detectPriority(node, type) {
  if (type === 'issue') return 'high';
  if (type === 'spec') return 'medium';
  if (type === 'task') return 'medium';
  return 'low';
}

// ── Ensure activity_log table ───────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id TEXT,
    action TEXT NOT NULL,
    detail TEXT,
    source TEXT DEFAULT 'sync',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_log_card ON activity_log(card_id);
`);

// ── Upsert all nodes ────────────────────────────────────────────────────────
const upsert = db.prepare(`
  INSERT INTO cards (id, title, section, column_id, status, priority, agent_type, artifact_path, metadata, created_at, updated_at)
  VALUES (@id, @title, @section, @column_id, @status, @priority, @agent_type, @artifact_path, @metadata, @created_at, @updated_at)
  ON CONFLICT(id) DO UPDATE SET
    title=@title, section=@section, column_id=@column_id,
    priority=@priority, artifact_path=@artifact_path,
    metadata=@metadata, updated_at=@updated_at
`);

const logEntry = db.prepare(`
  INSERT INTO activity_log (card_id, action, detail, source)
  VALUES (?, 'db:synced', ?, 'graph-sync')
`);

let inserted = 0;
let skipped = 0;
const now = new Date().toISOString();

const syncAll = db.transaction(() => {
  for (const node of nodes) {
    const column = deriveStatus(node);
    if (!column) { skipped++; continue; }

    const type = detectType(node.file);
    const section = detectSection(node);
    const priority = detectPriority(node, type);

    upsert.run({
      id: node.id,
      title: node.label || node.id,
      section,
      column_id: column,
      status: 'idle',
      priority,
      agent_type: null,
      artifact_path: node.file || null,
      metadata: JSON.stringify({
        type,
        cat: node.cat || null,
        desc: node.desc || null,
        keywords: node.keywords || [],
        file: node.file || null,
        graphStatus: node.status || null,
      }),
      created_at: now,
      updated_at: now,
    });
    inserted++;
  }

  // Log the sync event
  logEntry.run(null, JSON.stringify({ total: nodes.length, inserted, skipped, syncedAt: now }));
});

syncAll();

// ── Summary ─────────────────────────────────────────────────────────────────
console.log(`[sync] Inserted/updated: ${inserted} cards`);
console.log(`[sync] Skipped (no column): ${skipped} nodes`);

// Column distribution
const colDist = db.prepare('SELECT column_id, COUNT(*) as c FROM cards GROUP BY column_id ORDER BY c DESC').all();
console.log('\n  Column distribution:');
for (const r of colDist) {
  console.log(`    ${r.column_id.padEnd(15)} ${r.c}`);
}

// Type distribution from metadata
const total = db.prepare('SELECT COUNT(*) as c FROM cards').get().c;
console.log(`\n  Total cards in DB: ${total}`);

// Also sync board.json
const allCards = db.prepare('SELECT * FROM cards ORDER BY updated_at DESC').all();
const columns = {};
for (const c of allCards) {
  if (!columns[c.column_id]) columns[c.column_id] = [];
  columns[c.column_id].push(c.id);
}
const boardPath = path.resolve(__dirname, '../.kanban/board.json');
fs.writeFileSync(boardPath, JSON.stringify({ cards: allCards, columns, updatedAt: Date.now() }, null, 2), 'utf8');
console.log(`\n  board.json synced (${allCards.length} cards)`);

console.log('\n✅ All graph nodes synced to SQLite');
