/**
 * Event Server — HTTP + WebSocket server for Claude hook events and agent launch.
 * Port: 4010
 * No external dependencies — uses Node.js built-ins only (http + ws upgrade).
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';

// ── Paths ─────────────────────────────────────────────────────────────────────

// Resolve .kanban/board.json relative to the project root (one directory up
// from the scripts/ folder where this file lives).
const BOARD_PATH = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  '../.kanban/board.json'
);

// ── In-memory state ──────────────────────────────────────────────────────────

const MAX_EVENTS = 1000;
const events = [];                 // KanbanEvent[]
const agentStatuses = new Map();   // sessionId → { sessionId, pid, cwd, command, state, startedAt }
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
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
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
  const path = url.pathname;

  // ── GET /health ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && path === '/health') {
    send(res, 200, { ok: true, ts: new Date().toISOString(), clients: wsClients.size }, cors);
    return;
  }

  // ── GET /events ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && path === '/events') {
    send(res, 200, events.slice(-100), cors);
    return;
  }

  // ── GET /status ──────────────────────────────────────────────────────────
  if (req.method === 'GET' && path === '/status') {
    const statuses = {};
    for (const [sid, s] of agentStatuses) {
      statuses[sid] = s;
    }
    send(res, 200, statuses, cors);
    return;
  }

  // ── POST /events ─────────────────────────────────────────────────────────
  if (req.method === 'POST' && path === '/events') {
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
  if (req.method === 'POST' && path === '/agent/launch') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    const { command, args = '', cwd = process.cwd() } = body;
    if (!command || typeof command !== 'string') {
      send(res, 400, { error: 'command is required' }, cors);
      return;
    }

    const sessionId = randomUUID();
    const fullPrompt = args ? `${command} ${args}` : command;

    let child;
    try {
      child = spawn('claude', ['-p', fullPrompt], {
        cwd,
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: false,
      });
    } catch (err) {
      send(res, 500, { error: `Failed to spawn: ${err.message}` }, cors);
      return;
    }

    const status = {
      sessionId,
      pid: child.pid,
      cwd,
      command: fullPrompt,
      state: 'running',
      startedAt: new Date().toISOString(),
    };
    agentStatuses.set(sessionId, status);

    // Emit launch event
    const launchEvent = {
      id: randomUUID(),
      type: 'command:started',
      timestamp: status.startedAt,
      source: 'system',
      data: { sessionId, pid: child.pid, command: fullPrompt, cwd },
    };
    addEvent(launchEvent);
    broadcast({ type: 'event', event: launchEvent });

    child.stdout.on('data', (chunk) => {
      const progressEvent = {
        id: randomUUID(),
        type: 'command:progress',
        timestamp: new Date().toISOString(),
        source: 'claude',
        data: { sessionId, output: chunk.toString('utf8').slice(0, 500) },
      };
      addEvent(progressEvent);
      broadcast({ type: 'event', event: progressEvent });

      // Update lastAction in status
      const s = agentStatuses.get(sessionId);
      if (s) {
        s.lastAction = chunk.toString('utf8').trim().slice(0, 120);
        agentStatuses.set(sessionId, s);
      }
    });

    child.stderr.on('data', (chunk) => {
      const errEvent = {
        id: randomUUID(),
        type: 'command:progress',
        timestamp: new Date().toISOString(),
        source: 'claude',
        data: { sessionId, stderr: chunk.toString('utf8').slice(0, 500) },
      };
      addEvent(errEvent);
      broadcast({ type: 'event', event: errEvent });
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
        data: { sessionId, exitCode: code },
      };
      addEvent(doneEvent);
      broadcast({ type: 'event', event: doneEvent });
    });

    send(res, 200, { sessionId, pid: child.pid }, cors);
    return;
  }

  // ── POST /board ──────────────────────────────────────────────────────────
  if (req.method === 'POST' && path === '/board') {
    let body;
    try { body = await readBody(req); }
    catch {
      send(res, 400, { error: 'Invalid JSON' }, cors);
      return;
    }

    try {
      fs.mkdirSync(path.dirname(BOARD_PATH), { recursive: true });
      fs.writeFileSync(BOARD_PATH, JSON.stringify(body, null, 2), 'utf8');
    } catch (err) {
      send(res, 500, { error: `Failed to write board: ${err.message}` }, cors);
      return;
    }

    broadcast({ type: 'board:updated', timestamp: new Date().toISOString() });
    send(res, 200, { success: true }, cors);
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
