/**
 * Event Server — HTTP + WebSocket server for Claude hook events and agent launch.
 * Port: 4010
 * Also syncs board data to SQLite via mcp-kanban/kanban-db.mjs.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';

// ── Paths ─────────────────────────────────────────────────────────────────────

const __scriptDir = path.dirname(new URL(import.meta.url).pathname);

// Resolve .kanban/board.json relative to the project root (one directory up
// from the scripts/ folder where this file lives).
const BOARD_PATH = path.resolve(__scriptDir, '../.kanban/board.json');

// Docs root — read from graph-data.json, fallback to default
let DOCS_ROOT;
try {
  const graphRaw = JSON.parse(fs.readFileSync(path.resolve(__scriptDir, '../public/graph-data.json'), 'utf8'));
  DOCS_ROOT = graphRaw.root || path.resolve(__scriptDir, '../../docs');
} catch {
  DOCS_ROOT = path.resolve(__scriptDir, '../../docs');
}
console.log('[event-server] DOCS_ROOT:', DOCS_ROOT);

// ── SQLite DB sync (via mcp-kanban) ───────────────────────────────────────────

let dbModule = null;
try {
  dbModule = await import('../mcp-kanban/kanban-db.mjs');
  console.log('[event-server] SQLite DB connected via kanban-db.mjs');
} catch (err) {
  console.warn('[event-server] SQLite DB not available:', err.message);
}

/**
 * Sync cards array into SQLite. Each card is upserted by id.
 * Returns { synced: number, total: number }
 */
function syncCardsToDb(cards) {
  if (!dbModule || !dbModule.db) return { synced: 0, total: 0 };
  const db = dbModule.db;

  // Ensure activity_log table exists
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

  const upsert = db.prepare(`
    INSERT INTO cards (id, title, section, column_id, status, priority, agent_type, artifact_path, upload_path, metadata, created_at, updated_at)
    VALUES (@id, @title, @section, @column_id, @status, @priority, @agent_type, @artifact_path, @upload_path, @metadata, @created_at, @updated_at)
    ON CONFLICT(id) DO UPDATE SET
      title=@title, section=@section, column_id=@column_id, status=@status,
      priority=@priority, agent_type=@agent_type, artifact_path=@artifact_path,
      upload_path=@upload_path, metadata=@metadata, updated_at=@updated_at
  `);

  const logSync = db.prepare(`
    INSERT INTO activity_log (card_id, action, detail, source, created_at)
    VALUES (?, 'db:synced', ?, 'sync', datetime('now'))
  `);

  let synced = 0;
  const syncBatch = db.transaction((cardList) => {
    for (const c of cardList) {
      if (!c.id) continue;
      const now = new Date().toISOString();
      upsert.run({
        id: c.id,
        title: c.title || c.label || c.node?.label || 'Untitled',
        section: c.section || c.cat || c.node?.cat || null,
        column_id: c.column_id || c.column || c.status || 'backlog',
        status: c.lifecycleState || c.lifecycle || c.cardStatus || 'idle',
        priority: c.priority || 'medium',
        agent_type: c.agent || c.agent_type || null,
        artifact_path: c.artifactPath || c.artifact_path || c.filePath || null,
        upload_path: c.uploadPath || c.upload_path || null,
        metadata: c.metadata ? (typeof c.metadata === 'string' ? c.metadata : JSON.stringify(c.metadata)) : null,
        created_at: c.created_at || c.createdAt ? new Date(c.createdAt || c.created_at).toISOString() : now,
        updated_at: now,
      });
      synced++;
    }
  });

  try {
    syncBatch(cards);
  } catch (err) {
    console.error('[event-server] DB sync error:', err.message);
  }

  return { synced, total: cards.length };
}

// ── Session logs DB table ────────────────────────────────────────────────────

if (dbModule && dbModule.db) {
  dbModule.db.exec(`
    CREATE TABLE IF NOT EXISTS session_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      card_id TEXT,
      stream TEXT NOT NULL DEFAULT 'stdout',
      text TEXT NOT NULL,
      timestamp TEXT DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_session_logs_session ON session_logs(session_id);
    CREATE INDEX IF NOT EXISTS idx_session_logs_card ON session_logs(card_id);
  `);
  console.log('[event-server] session_logs table ready');
}

let insertLogStmt = null;
let getLogsBySessionStmt = null;
let getLogsByCardStmt = null;
if (dbModule && dbModule.db) {
  insertLogStmt = dbModule.db.prepare(
    'INSERT INTO session_logs (session_id, card_id, stream, text, timestamp) VALUES (?, ?, ?, ?, ?)'
  );
  getLogsBySessionStmt = dbModule.db.prepare(
    'SELECT * FROM session_logs WHERE session_id = ? ORDER BY id ASC LIMIT ?'
  );
  getLogsByCardStmt = dbModule.db.prepare(
    'SELECT * FROM session_logs WHERE card_id = ? ORDER BY id ASC LIMIT ?'
  );
}

function persistLog(sessionId, cardId, stream, text, timestamp) {
  if (!insertLogStmt) return;
  try {
    insertLogStmt.run(sessionId, cardId || null, stream, text, timestamp);
  } catch { /* best-effort */ }
}

// ── Slash command → prompt resolver ─────────────────────────────────────────

const COMMANDS_DIRS = [
  path.resolve(__scriptDir, '../.claude/commands'),       // project-level
  path.resolve(__scriptDir, '../../.claude/commands'),     // knowledge/ level
  path.resolve(__scriptDir, '../../../.claude/commands'),  // git-central/ level
];

/**
 * Resolve a slash command (e.g. "/chore") to its prompt content.
 * Reads the .md file from .claude/commands/ directories, replaces $ARGUMENTS.
 * Returns the resolved prompt string, or the original command if not found.
 */
function resolveSlashCommand(command, args) {
  if (!command.startsWith('/')) {
    return args ? `${command} ${args}` : command;
  }

  const skillName = command.slice(1); // strip '/'
  for (const dir of COMMANDS_DIRS) {
    const mdPath = path.join(dir, `${skillName}.md`);
    try {
      const content = fs.readFileSync(mdPath, 'utf8');
      // Replace $ARGUMENTS placeholder with actual args
      const resolved = content.replace(/\$ARGUMENTS/g, args || '');
      console.log(`[event-server] Resolved /${skillName} from ${mdPath}`);
      return resolved;
    } catch {
      // File not found in this dir, try next
    }
  }

  // Fallback: strip the / and use as natural language
  console.warn(`[event-server] Could not resolve /${skillName}, using as prompt`);
  return args ? `${command.slice(1)} ${args}` : command.slice(1);
}

// ── In-memory state ──────────────────────────────────────────────────────────

const MAX_EVENTS = 1000;
const events = [];                 // KanbanEvent[]
const agentStatuses = new Map();   // sessionId → { sessionId, pid, cwd, command, state, startedAt }
const agentProcesses = new Map();  // sessionId → child process (for stdin write)
const wsClients = new Set();       // Set<WebSocket-like>

// ── WebSocket upgrade (no ws package — native HTTP upgrade) ──────────────────

/**
 * Minimal WebSocket frame encoder/decoder for the server side.
 * Supports text frames only (opcode 0x1) and ping/pong (0x9/0xA).
 */

function encodeFrame(data) {
  const payload = Buffer.from(data, 'utf8');
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.alloc(2);
    header[0] = 0x81; // FIN + text opcode
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }
  return Buffer.concat([header, payload]);
}

function encodePing() {
  const buf = Buffer.alloc(2);
  buf[0] = 0x89; // FIN + ping
  buf[1] = 0;
  return buf;
}

function encodePong() {
  const buf = Buffer.alloc(2);
  buf[0] = 0x8A; // FIN + pong
  buf[1] = 0;
  return buf;
}

/**
 * Parse incoming WebSocket frames from a buffer.
 * Returns { frames: string[], remainder: Buffer }
 */
function decodeFrames(buf) {
  const frames = [];
  let offset = 0;

  while (offset < buf.length) {
    if (buf.length < offset + 2) break;

    const firstByte = buf[offset];
    const secondByte = buf[offset + 1];
    const opcode = firstByte & 0x0f;
    const masked = (secondByte & 0x80) !== 0;
    let payloadLen = secondByte & 0x7f;
    let headerLen = 2;

    if (payloadLen === 126) {
      if (buf.length < offset + 4) break;
      payloadLen = buf.readUInt16BE(offset + 2);
      headerLen = 4;
    } else if (payloadLen === 127) {
      if (buf.length < offset + 10) break;
      payloadLen = Number(buf.readBigUInt64BE(offset + 2));
      headerLen = 10;
    }

    const maskLen = masked ? 4 : 0;
    const totalLen = headerLen + maskLen + payloadLen;
    if (buf.length < offset + totalLen) break;

    let payload = buf.slice(offset + headerLen + maskLen, offset + totalLen);
    if (masked) {
      const mask = buf.slice(offset + headerLen, offset + headerLen + 4);
      const unmasked = Buffer.alloc(payloadLen);
      for (let i = 0; i < payloadLen; i++) {
        unmasked[i] = payload[i] ^ mask[i % 4];
      }
      payload = unmasked;
    }

    frames.push({ opcode, payload });
    offset += totalLen;
  }

  return { frames, remainder: buf.slice(offset) };
}

import { createHash } from 'crypto';

function doHandshake(req, socket) {
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    return false;
  }
  const accept = createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64');

  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: websocket\r\n' +
    'Connection: Upgrade\r\n' +
    `Sec-WebSocket-Accept: ${accept}\r\n` +
    '\r\n'
  );
  return true;
}

/** Wrap a raw socket into a minimal client object */
function createWsClient(socket) {
  let buffer = Buffer.alloc(0);
  let alive = true;

  const client = {
    socket,
    get alive() { return alive; },
    send(data) {
      if (!alive) return;
      try {
        socket.write(encodeFrame(data));
      } catch {
        alive = false;
      }
    },
    ping() {
      if (!alive) return;
      try {
        socket.write(encodePing());
      } catch {
        alive = false;
      }
    },
    close() {
      alive = false;
      try { socket.destroy(); } catch { /* ignore */ }
    },
  };

  socket.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    const { frames, remainder } = decodeFrames(buffer);
    buffer = remainder;

    for (const frame of frames) {
      if (frame.opcode === 0x8) {
        // Close frame
        alive = false;
        wsClients.delete(client);
        socket.destroy();
      } else if (frame.opcode === 0x9) {
        // Ping — respond with pong
        try { socket.write(encodePong()); } catch { /* ignore */ }
      } else if (frame.opcode === 0xA) {
        // Pong — keep alive confirmed
      }
    }
  });

  socket.on('close', () => {
    alive = false;
    wsClients.delete(client);
  });

  socket.on('error', () => {
    alive = false;
    wsClients.delete(client);
  });

  return client;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function addEvent(event) {
  events.push(event);
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }
}

function broadcast(data) {
  const frame = encodeFrame(JSON.stringify(data));
  for (const client of wsClients) {
    if (client.alive) {
      try {
        client.socket.write(frame);
      } catch {
        client.close();
        wsClients.delete(client);
      }
    } else {
      wsClients.delete(client);
    }
  }
}

function corsHeaders(req) {
  const origin = req.headers.origin || '';
  const allowed = /^https?:\/\/localhost(:\d+)?$/.test(origin) ? origin : 'http://localhost:4002';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function readBody(req, maxSize = 50 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxSize) { req.destroy(); reject(new Error('Body too large')); return; }
      body += chunk;
    });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function send(res, status, data, extraHeaders = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders,
  });
  res.end(body);
}

/** Guess MIME type from file extension */
function guessMime(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimes = {
    '.pdf': 'application/pdf',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp',
    '.md': 'text/markdown', '.txt': 'text/plain', '.csv': 'text/csv',
    '.json': 'application/json', '.xml': 'application/xml',
    '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
    '.zip': 'application/zip', '.gz': 'application/gzip',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  };
  return mimes[ext] || 'application/octet-stream';
}

// ── HTTP Request Handler ─────────────────────────────────────────────────────

async function handleRequest(req, res) {
  const cors = corsHeaders(req);

  // Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost:4010'}`);
  const urlPath = url.pathname;

  // ── GET /health ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && urlPath === '/health') {
    send(res, 200, { ok: true, ts: new Date().toISOString(), clients: wsClients.size }, cors);
    return;
  }

  // ── GET /events ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && urlPath === '/events') {
    send(res, 200, events.slice(-100), cors);
    return;
  }

  // ── GET /status ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && urlPath === '/status') {
    const statuses = {};
    for (const [sid, s] of agentStatuses) {
      statuses[sid] = s;
    }
    send(res, 200, statuses, cors);
    return;
  }

  // ── POST /events ─────────────────────────────────────────────────────────
  if (req.method === 'POST' && urlPath === '/events') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    const event = {
      id: randomUUID(),
      timestamp: new Date().toISOString(),
      ...body,
    };

    addEvent(event);
    broadcast({ type: 'event', event });
    send(res, 201, { ok: true, id: event.id }, cors);
    return;
  }

  // ── POST /agent/launch ───────────────────────────────────────────────────
  if (req.method === 'POST' && urlPath === '/agent/launch') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    const { command, args = '', cwd = process.cwd(), cardId = null } = body;
    if (!command || typeof command !== 'string') {
      send(res, 400, { error: 'command is required' }, cors);
      return;
    }

    const sessionId = randomUUID();
    // Resolve slash commands (e.g. /chore) to their .md prompt content
    const fullPrompt = resolveSlashCommand(command, args);
    const displayCmd = args ? `${command} ${args}` : command;

    let child;
    try {
      // Remove CLAUDECODE env var to allow nested launches
      const cleanEnv = { ...process.env };
      delete cleanEnv.CLAUDECODE;

      child = spawn('claude', ['-p', fullPrompt], {
        cwd,
        env: cleanEnv,
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false,
      });
    } catch (err) {
      send(res, 500, { error: `Failed to spawn: ${err.message}` }, cors);
      return;
    }

    // Record session in DB
    if (dbModule && dbModule.startSession) {
      try {
        dbModule.startSession({ id: sessionId, card_id: cardId, command: displayCmd });
      } catch { /* best-effort */ }
    }

    const status = {
      sessionId,
      pid: child.pid,
      cwd,
      command: displayCmd,
      state: 'running',
      startedAt: new Date().toISOString(),
      cardId,
    };
    agentStatuses.set(sessionId, status);
    agentProcesses.set(sessionId, child);

    // Emit launch event
    const launchEvent = {
      id: randomUUID(),
      type: 'command:started',
      timestamp: status.startedAt,
      source: 'system',
      data: { sessionId, pid: child.pid, command: displayCmd, cwd, cardId },
    };
    addEvent(launchEvent);
    broadcast({ type: 'event', event: launchEvent });

    child.stdout.on('data', (chunk) => {
      const text = chunk.toString('utf8');
      const ts = new Date().toISOString();
      const progressEvent = {
        id: randomUUID(),
        type: 'command:progress',
        timestamp: ts,
        source: 'claude',
        data: { sessionId, output: text.slice(0, 500), cardId },
      };
      addEvent(progressEvent);
      broadcast({ type: 'event', event: progressEvent });

      // Broadcast dedicated agent:stdout event for console panel
      broadcast({
        type: 'agent:stdout',
        sessionId,
        cardId,
        data: text.slice(0, 2000),
        timestamp: ts,
      });

      // Persist to SQLite
      persistLog(sessionId, cardId, 'stdout', text.slice(0, 2000), ts);

      // Update lastAction in status
      const s = agentStatuses.get(sessionId);
      if (s) {
        s.lastAction = text.trim().slice(0, 120);
        agentStatuses.set(sessionId, s);
      }
    });

    child.stderr.on('data', (chunk) => {
      const text = chunk.toString('utf8');
      const ts = new Date().toISOString();
      const errEvent = {
        id: randomUUID(),
        type: 'command:progress',
        timestamp: ts,
        source: 'claude',
        data: { sessionId, stderr: text.slice(0, 500), cardId },
      };
      addEvent(errEvent);
      broadcast({ type: 'event', event: errEvent });

      // Broadcast dedicated agent:stderr event for console panel
      broadcast({
        type: 'agent:stderr',
        sessionId,
        cardId,
        data: text.slice(0, 2000),
        timestamp: ts,
      });

      // Persist to SQLite
      persistLog(sessionId, cardId, 'stderr', text.slice(0, 2000), ts);
    });

    child.on('exit', (code) => {
      const eventType = code === 0 ? 'command:completed' : 'command:failed';
      const s = agentStatuses.get(sessionId);
      if (s) {
        s.state = code === 0 ? 'done' : 'error';
        agentStatuses.set(sessionId, s);
      }
      const doneEvent = {
        id: randomUUID(),
        type: eventType,
        timestamp: new Date().toISOString(),
        source: 'claude',
        data: { sessionId, exitCode: code, cardId },
      };
      addEvent(doneEvent);
      broadcast({ type: 'event', event: doneEvent });

      // End session in DB
      if (dbModule && dbModule.endSession) {
        try { dbModule.endSession(sessionId, { token_usage: 0 }); } catch { /* best-effort */ }
      }

      // Cleanup process reference
      agentProcesses.delete(sessionId);
    });

    send(res, 200, { sessionId, pid: child.pid, cardId }, cors);
    return;
  }

  // ── POST /agent/send — send follow-up message to a running agent ────────
  // Uses `claude -p --continue` to continue the conversation in print mode.
  // If the original process has already exited, spawns a new one with --continue.
  if (req.method === 'POST' && urlPath === '/agent/send') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    const { sessionId: targetSession, message, cardId = null } = body;
    if (!message || typeof message !== 'string') {
      send(res, 400, { error: 'message is required' }, cors);
      return;
    }

    // Find session info to get cwd
    const session = targetSession ? agentStatuses.get(targetSession) : null;
    const cwd = session?.cwd || process.cwd();

    // Create a new session for this follow-up
    const newSessionId = randomUUID();

    // Remove CLAUDECODE env var to allow nested launches
    const cleanEnv = { ...process.env };
    delete cleanEnv.CLAUDECODE;

    let child;
    try {
      // Use --continue to resume the last conversation in the same directory
      child = spawn('claude', ['-p', '--continue', message], {
        cwd,
        env: cleanEnv,
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false,
      });
    } catch (err) {
      send(res, 500, { error: `Failed to spawn: ${err.message}` }, cors);
      return;
    }

    // Record session in DB
    if (dbModule && dbModule.startSession) {
      try {
        dbModule.startSession({ id: newSessionId, card_id: cardId, command: `(reply) ${message.slice(0, 80)}` });
      } catch { /* best-effort */ }
    }

    const status = {
      sessionId: newSessionId,
      pid: child.pid,
      cwd,
      command: `(reply) ${message.slice(0, 80)}`,
      state: 'running',
      startedAt: new Date().toISOString(),
      cardId: cardId || session?.cardId || null,
    };
    agentStatuses.set(newSessionId, status);
    agentProcesses.set(newSessionId, child);

    // Use cardId from original session if not provided
    const effectiveCardId = cardId || session?.cardId || null;

    // Broadcast the user's message as a special event so the terminal shows it
    const userMsgEvent = {
      id: randomUUID(),
      type: 'command:progress',
      timestamp: new Date().toISOString(),
      source: 'ui',
      data: { sessionId: newSessionId, output: `> ${message}`, cardId: effectiveCardId },
    };
    addEvent(userMsgEvent);
    broadcast({ type: 'event', event: userMsgEvent });
    broadcast({
      type: 'agent:stdout',
      sessionId: effectiveCardId || newSessionId,
      cardId: effectiveCardId,
      data: `\n> ${message}\n`,
      timestamp: new Date().toISOString(),
    });

    // Pipe stdout/stderr back through WebSocket
    child.stdout.on('data', (chunk) => {
      const text = chunk.toString('utf8');
      const ts = new Date().toISOString();
      broadcast({
        type: 'agent:stdout',
        sessionId: effectiveCardId || newSessionId,
        cardId: effectiveCardId,
        data: text.slice(0, 2000),
        timestamp: ts,
      });
      persistLog(newSessionId, effectiveCardId, 'stdout', text.slice(0, 2000), ts);
    });

    child.stderr.on('data', (chunk) => {
      const text = chunk.toString('utf8');
      const ts = new Date().toISOString();
      broadcast({
        type: 'agent:stderr',
        sessionId: effectiveCardId || newSessionId,
        cardId: effectiveCardId,
        data: text.slice(0, 2000),
        timestamp: ts,
      });
      persistLog(newSessionId, effectiveCardId, 'stderr', text.slice(0, 2000), ts);
    });

    child.on('exit', (code) => {
      const s = agentStatuses.get(newSessionId);
      if (s) {
        s.state = code === 0 ? 'done' : 'error';
        agentStatuses.set(newSessionId, s);
      }
      agentProcesses.delete(newSessionId);

      if (dbModule && dbModule.endSession) {
        try { dbModule.endSession(newSessionId, { token_usage: 0 }); } catch { /* best-effort */ }
      }
    });

    send(res, 200, { sessionId: newSessionId, pid: child.pid, cardId: effectiveCardId }, cors);
    return;
  }

  // ── POST /agent/pause — suspend a running agent (SIGSTOP) ────────────────
  if (req.method === 'POST' && urlPath === '/agent/pause') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    const { sessionId: targetId, cardId = null, reason = 'user_pause' } = body;

    // Collect matching sessions
    const toPause = [];
    for (const [sid, s] of agentStatuses) {
      if (targetId && sid === targetId) toPause.push(sid);
      else if (cardId && s.cardId === cardId) toPause.push(sid);
    }

    let paused = 0;
    for (const sid of toPause) {
      const child = agentProcesses.get(sid);
      if (child && !child.killed) {
        try {
          child.kill('SIGSTOP');
          paused++;
        } catch { /* already dead */ }
      }
      // Update status
      const s = agentStatuses.get(sid);
      if (s) {
        s.state = 'paused';
        s.pauseReason = reason;
        agentStatuses.set(sid, s);
      }

      // Broadcast pause event
      const pauseEvent = {
        id: randomUUID(),
        type: 'lifecycle:paused',
        timestamp: new Date().toISOString(),
        source: 'ui',
        cardId: s?.cardId || cardId,
        data: { sessionId: sid, cardId: s?.cardId || cardId, reason },
      };
      addEvent(pauseEvent);
      broadcast({ type: 'event', event: pauseEvent });
    }

    send(res, 200, { paused, sessions: toPause }, cors);
    return;
  }

  // ── POST /agent/resume — resume a paused agent (SIGCONT) ────────────────
  if (req.method === 'POST' && urlPath === '/agent/resume') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    const { sessionId: targetId, cardId = null } = body;

    // Collect matching sessions
    const toResume = [];
    for (const [sid, s] of agentStatuses) {
      if (targetId && sid === targetId) toResume.push(sid);
      else if (cardId && s.cardId === cardId) toResume.push(sid);
    }

    let resumed = 0;
    for (const sid of toResume) {
      const child = agentProcesses.get(sid);
      if (child && !child.killed) {
        try {
          child.kill('SIGCONT');
          resumed++;
        } catch { /* already dead */ }
      }
      // Update status
      const s = agentStatuses.get(sid);
      if (s) {
        s.state = 'running';
        s.pauseReason = null;
        agentStatuses.set(sid, s);
      }

      // Broadcast resume event
      const resumeEvent = {
        id: randomUUID(),
        type: 'lifecycle:resumed',
        timestamp: new Date().toISOString(),
        source: 'ui',
        cardId: s?.cardId || cardId,
        data: { sessionId: sid, cardId: s?.cardId || cardId },
      };
      addEvent(resumeEvent);
      broadcast({ type: 'event', event: resumeEvent });
    }

    send(res, 200, { resumed, sessions: toResume }, cors);
    return;
  }

  // ── POST /agent/stop — kill a running agent session ──────────────────────
  if (req.method === 'POST' && urlPath === '/agent/stop') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    const { sessionId: targetId, cardId = null } = body;

    // Collect all sessions to kill (by sessionId or by cardId)
    const toKill = [];
    for (const [sid, s] of agentStatuses) {
      if (targetId && sid === targetId) toKill.push(sid);
      else if (cardId && s.cardId === cardId) toKill.push(sid);
    }

    let killed = 0;
    for (const sid of toKill) {
      const child = agentProcesses.get(sid);
      if (child && !child.killed) {
        try {
          child.kill('SIGTERM');
          // Force kill after 3s if still alive
          setTimeout(() => { try { child.kill('SIGKILL'); } catch {} }, 3000);
          killed++;
        } catch { /* already dead */ }
      }
      // Clean up state
      const s = agentStatuses.get(sid);
      if (s) {
        s.state = 'stopped';
        agentStatuses.set(sid, s);
      }
      agentProcesses.delete(sid);

      // Broadcast stop event
      const stopEvent = {
        id: randomUUID(),
        type: 'command:failed',
        timestamp: new Date().toISOString(),
        source: 'ui',
        data: { sessionId: sid, exitCode: -1, cardId: s?.cardId || cardId, reason: 'user_stopped' },
      };
      addEvent(stopEvent);
      broadcast({ type: 'event', event: stopEvent });

      // End session in DB
      if (dbModule && dbModule.endSession) {
        try { dbModule.endSession(sid, { token_usage: 0 }); } catch {}
      }
    }

    send(res, 200, { killed, sessions: toKill }, cors);
    return;
  }

  // ── GET /session/:id/logs — retrieve persisted session logs ──────────────
  const sessionLogsMatch = urlPath.match(/^\/session\/([^/]+)\/logs$/);
  if (req.method === 'GET' && sessionLogsMatch) {
    const queryId = sessionLogsMatch[1];
    const limit = parseInt(url.searchParams?.get('limit') || '500', 10);

    if (!getLogsBySessionStmt) {
      send(res, 503, { error: 'DB not available' }, cors);
      return;
    }

    try {
      const logs = getLogsBySessionStmt.all(queryId, limit);
      send(res, 200, { logs }, cors);
    } catch (err) {
      send(res, 500, { error: err.message }, cors);
    }
    return;
  }

  // ── GET /card/:id/logs — retrieve session logs by card ID ──────────────
  const cardLogsMatch = urlPath.match(/^\/card\/([^/]+)\/logs$/);
  if (req.method === 'GET' && cardLogsMatch) {
    const queryCardId = cardLogsMatch[1];
    const limit = parseInt(url.searchParams?.get('limit') || '500', 10);

    if (!getLogsByCardStmt) {
      send(res, 503, { error: 'DB not available' }, cors);
      return;
    }

    try {
      const logs = getLogsByCardStmt.all(queryCardId, limit);
      send(res, 200, { logs }, cors);
    } catch (err) {
      send(res, 500, { error: err.message }, cors);
    }
    return;
  }

  // ── POST /board ──────────────────────────────────────────────────────────
  if (req.method === 'POST' && urlPath === '/board') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    // Write board.json
    try {
      fs.mkdirSync(path.dirname(BOARD_PATH), { recursive: true });
      fs.writeFileSync(BOARD_PATH, JSON.stringify(body, null, 2), 'utf8');
    } catch (err) {
      send(res, 500, { error: `Failed to write board: ${err.message}` }, cors);
      return;
    }

    // Sync cards to SQLite DB
    let dbSync = { synced: 0, total: 0 };
    if (body.cards && Array.isArray(body.cards)) {
      dbSync = syncCardsToDb(body.cards);
    }

    broadcast({ type: 'board:updated', timestamp: new Date().toISOString() });
    send(res, 200, { success: true, db: dbSync }, cors);
    return;
  }

  // ── GET /db/cards — Query SQLite cards directly ─────────────────────────
  if (req.method === 'GET' && urlPath === '/db/cards') {
    if (!dbModule) {
      send(res, 503, { error: 'SQLite not available' }, cors);
      return;
    }
    const cards = dbModule.db.prepare('SELECT * FROM cards ORDER BY updated_at DESC').all();
    send(res, 200, { total: cards.length, cards }, cors);
    return;
  }

  // ── GET /db/stats — DB sync statistics ──────────────────────────────────
  if (req.method === 'GET' && urlPath === '/db/stats') {
    if (!dbModule) {
      send(res, 503, { error: 'SQLite not available' }, cors);
      return;
    }
    const db = dbModule.db;
    const stats = {
      cards: db.prepare('SELECT COUNT(*) as c FROM cards').get().c,
      activity_log: db.prepare('SELECT COUNT(*) as c FROM activity_log').get().c,
      command_history: db.prepare('SELECT COUNT(*) as c FROM command_history').get().c,
      workflows: db.prepare('SELECT COUNT(*) as c FROM workflows').get().c,
      sessions: db.prepare('SELECT COUNT(*) as c FROM sessions').get().c,
      last_sync: db.prepare("SELECT MAX(updated_at) as t FROM cards").get().t,
    };
    send(res, 200, stats, cors);
    return;
  }

  // ── GET /card/file?id=...&path=... — Read actual .md file content ──────
  if (req.method === 'GET' && urlPath === '/card/file') {
    const filePath = url.searchParams.get('path');
    if (!filePath) {
      send(res, 400, { error: 'Missing ?path= parameter' }, cors);
      return;
    }
    // Resolve relative to DOCS_ROOT, prevent path traversal
    const resolved = path.resolve(DOCS_ROOT, filePath);
    if (!resolved.startsWith(DOCS_ROOT)) {
      send(res, 403, { error: 'Path outside docs root' }, cors);
      return;
    }
    try {
      const content = fs.readFileSync(resolved, 'utf8');
      send(res, 200, { path: filePath, content, size: content.length }, cors);
    } catch (err) {
      if (err.code === 'ENOENT') {
        send(res, 404, { error: 'File not found', path: filePath }, cors);
      } else {
        send(res, 500, { error: err.message }, cors);
      }
    }
    return;
  }

  // ── POST /card/file — Save edited .md file content ───────────────────
  if (req.method === 'POST' && urlPath === '/card/file') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }
    const { path: filePath, content, cardId } = body;
    if (!filePath || content == null) {
      send(res, 400, { error: 'Missing path or content' }, cors);
      return;
    }
    const resolved = path.resolve(DOCS_ROOT, filePath);
    if (!resolved.startsWith(DOCS_ROOT)) {
      send(res, 403, { error: 'Path outside docs root' }, cors);
      return;
    }
    try {
      // Ensure directory exists
      fs.mkdirSync(path.dirname(resolved), { recursive: true });
      fs.writeFileSync(resolved, content, 'utf8');

      // Log to activity_log if DB available
      if (dbModule && cardId) {
        try {
          dbModule.db.prepare(
            `INSERT INTO activity_log (card_id, action, detail, source) VALUES (?, 'file:edited', ?, 'user')`
          ).run(cardId, JSON.stringify({ path: filePath, size: content.length }));
        } catch { /* non-critical */ }
      }

      broadcast({ type: 'card:file-edited', cardId, path: filePath, timestamp: new Date().toISOString() });
      send(res, 200, { success: true, path: filePath, size: content.length }, cors);
    } catch (err) {
      send(res, 500, { error: err.message }, cors);
    }
    return;
  }

  // ── POST /card/upload — Upload files (base64-encoded) ──────────────────
  if (req.method === 'POST' && urlPath === '/card/upload') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }
    const { uploadPath, files, cardId } = body;
    // files = [{ name: string, data: string (base64) }]
    if (!uploadPath || !Array.isArray(files) || files.length === 0) {
      send(res, 400, { error: 'Missing uploadPath or files array' }, cors);
      return;
    }
    const resolvedDir = path.resolve(DOCS_ROOT, uploadPath);
    if (!resolvedDir.startsWith(DOCS_ROOT)) {
      send(res, 403, { error: 'Path outside docs root' }, cors);
      return;
    }
    try {
      fs.mkdirSync(resolvedDir, { recursive: true });
      const saved = [];
      for (const file of files) {
        if (!file.name || !file.data) continue;
        // Sanitize filename
        const safeName = path.basename(file.name).replace(/[^a-zA-Z0-9._\-]/g, '_');
        const fileDest = path.join(resolvedDir, safeName);
        const buf = Buffer.from(file.data, 'base64');
        fs.writeFileSync(fileDest, buf);
        saved.push({ name: safeName, path: path.join(uploadPath, safeName), size: buf.length });
      }

      // Log to DB
      if (dbModule && cardId) {
        try {
          dbModule.db.prepare(
            `INSERT INTO activity_log (card_id, action, detail, source) VALUES (?, 'file:uploaded', ?, 'user')`
          ).run(cardId, JSON.stringify({ uploadPath, files: saved.map(f => f.name) }));
        } catch { /* non-critical */ }
      }

      // Store file metadata in file_blobs table
      if (dbModule && dbModule.createFileBlob) {
        for (const f of saved) {
          try {
            const buf = fs.readFileSync(path.resolve(resolvedDir, f.name));
            dbModule.createFileBlob({
              id: randomUUID(),
              card_id: cardId || null,
              filename: f.name,
              original_name: files.find(src => path.basename(src.name).replace(/[^a-zA-Z0-9._\-]/g, '_') === f.name)?.name || f.name,
              mime_type: guessMime(f.name),
              size: f.size,
              upload_path: uploadPath,
              blob_data: buf,
            });
          } catch { /* best-effort blob storage */ }
        }
      }

      broadcast({ type: 'card:file-uploaded', cardId, uploadPath, files: saved, timestamp: new Date().toISOString() });
      send(res, 200, { success: true, uploadPath, files: saved }, cors);
    } catch (err) {
      send(res, 500, { error: err.message }, cors);
    }
    return;
  }

  // ── GET /card/:id/files — List uploaded files for a card ──────────────
  const cardFilesMatch = urlPath.match(/^\/card\/([^/]+)\/files$/);
  if (req.method === 'GET' && cardFilesMatch) {
    const queryCardId = cardFilesMatch[1];

    if (!dbModule || !dbModule.getFilesByCard) {
      send(res, 503, { error: 'DB not available' }, cors);
      return;
    }

    try {
      const files = dbModule.getFilesByCard(queryCardId);
      send(res, 200, { cardId: queryCardId, total: files.length, files }, cors);
    } catch (err) {
      send(res, 500, { error: err.message }, cors);
    }
    return;
  }

  // ── DELETE /card/:cardId/files/:fileId — Delete a single file ──────────
  const deleteFileMatch = urlPath.match(/^\/card\/([^/]+)\/files\/([^/]+)$/);
  if (req.method === 'POST' && deleteFileMatch && url.searchParams.get('_method') === 'DELETE') {
    const [, queryCardId, fileId] = deleteFileMatch;

    if (!dbModule || !dbModule.getFileBlob || !dbModule.deleteFileBlob) {
      send(res, 503, { error: 'DB not available' }, cors);
      return;
    }

    try {
      const file = dbModule.getFileBlob(fileId);
      if (!file || file.card_id !== queryCardId) {
        send(res, 404, { error: 'File not found' }, cors);
        return;
      }

      // Remove from filesystem
      const filePath = path.resolve(DOCS_ROOT, file.upload_path, file.filename);
      try { fs.unlinkSync(filePath); } catch { /* file may already be gone */ }

      dbModule.deleteFileBlob(fileId);
      broadcast({ type: 'card:file-deleted', cardId: queryCardId, fileId, timestamp: new Date().toISOString() });
      send(res, 200, { success: true, fileId }, cors);
    } catch (err) {
      send(res, 500, { error: err.message }, cors);
    }
    return;
  }

  // ── GET /uploads/* — Serve uploaded files (filesystem or blob fallback) ─
  if (req.method === 'GET' && urlPath.startsWith('/uploads/')) {
    const relPath = urlPath.slice(1); // strip leading /
    const resolved = path.resolve(DOCS_ROOT, relPath);

    // Path traversal protection
    if (!resolved.startsWith(DOCS_ROOT)) {
      send(res, 403, { error: 'Path outside docs root' }, cors);
      return;
    }

    // Try filesystem first
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      const mime = guessMime(resolved);
      const data = fs.readFileSync(resolved);
      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': data.length,
        'Cache-Control': 'public, max-age=3600',
        ...cors,
      });
      res.end(data);
      return;
    }

    // Fallback: try blob storage in DB
    if (dbModule && dbModule.getFileBlobByPath) {
      const dir = path.dirname(relPath);
      const filename = path.basename(relPath);
      const row = dbModule.getFileBlobByPath(dir.endsWith('/') ? dir : dir + '/', filename);
      if (!row && !dir.endsWith('/')) {
        // Also try without trailing slash
      }
      const blob = row || dbModule.getFileBlobByPath(dir + '/', filename) || dbModule.getFileBlobByPath(dir, filename);
      if (blob && blob.blob_data) {
        const mime = blob.mime_type || guessMime(filename);
        res.writeHead(200, {
          'Content-Type': mime,
          'Content-Length': blob.blob_data.length,
          'Cache-Control': 'public, max-age=3600',
          ...cors,
        });
        res.end(blob.blob_data);
        return;
      }
    }

    send(res, 404, { error: 'File not found', path: relPath }, cors);
    return;
  }

  // ── GET /blob/:fileId — Serve file directly from blob storage ──────────
  const blobMatch = urlPath.match(/^\/blob\/([^/]+)$/);
  if (req.method === 'GET' && blobMatch) {
    const fileId = blobMatch[1];

    if (!dbModule || !dbModule.getFileBlob) {
      send(res, 503, { error: 'DB not available' }, cors);
      return;
    }

    const row = dbModule.getFileBlob(fileId);
    if (!row || !row.blob_data) {
      send(res, 404, { error: 'Blob not found' }, cors);
      return;
    }

    const mime = row.mime_type || guessMime(row.filename);
    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': row.blob_data.length,
      'Content-Disposition': `inline; filename="${row.original_name || row.filename}"`,
      'Cache-Control': 'public, max-age=3600',
      ...cors,
    });
    res.end(row.blob_data);
    return;
  }

  // ── 404 ──────────────────────────────────────────────────────────────────
  send(res, 404, { error: 'Not found' }, cors);
}

// ── HTTP Server ──────────────────────────────────────────────────────────────

const server = http.createServer(handleRequest);

// ── WebSocket Upgrade ────────────────────────────────────────────────────────

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost:4010'}`);
  if (url.pathname !== '/ws') {
    socket.end('HTTP/1.1 404 Not Found\r\n\r\n');
    return;
  }

  const ok = doHandshake(req, socket);
  if (!ok) return;

  const client = createWsClient(socket);
  wsClients.add(client);

  // Send last 10 events on connect
  const recent = events.slice(-10);
  client.send(JSON.stringify({ type: 'init', events: recent }));

  console.log(`[WS] Client connected (total: ${wsClients.size})`);
});

// ── Heartbeat ────────────────────────────────────────────────────────────────

setInterval(() => {
  for (const client of wsClients) {
    if (!client.alive) {
      wsClients.delete(client);
    } else {
      client.ping();
    }
  }
}, 30_000);

// ── Start ────────────────────────────────────────────────────────────────────

const PORT = 4010;

server.listen(PORT, () => {
  console.log(`[event-server] Listening on http://localhost:${PORT}`);
  console.log(`[event-server] WebSocket at ws://localhost:${PORT}/ws`);
});

// ── Graceful Shutdown ────────────────────────────────────────────────────────

function shutdown() {
  console.log('[event-server] Shutting down...');
  for (const client of wsClients) {
    client.close();
  }
  server.close(() => {
    console.log('[event-server] Stopped.');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
