#!/usr/bin/env node
// Usage: node scripts/kanban-hook.mjs <action> [args...]
// Actions: session-start, session-end, file-changed, agent-start, agent-end, tool-use
//
// All file operations are wrapped in try/catch — this script must NEVER crash or block Claude.

import fs from 'fs';
import path from 'path';
import http from 'http';

const KANBAN_DIR = path.resolve(process.cwd(), '.kanban');
const STATUS_FILE = path.join(KANBAN_DIR, 'status.json');
const EVENTS_FILE = path.join(KANBAN_DIR, 'events.jsonl');
const BOARD_FILE = path.join(KANBAN_DIR, 'board.json');

const EVENT_SERVER_PORT = 4010;
const EVENT_SERVER_HOST = 'localhost';

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function ensureKanbanDir() {
  if (!fs.existsSync(KANBAN_DIR)) {
    fs.mkdirSync(KANBAN_DIR, { recursive: true });
  }
}

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function appendEvent(event) {
  ensureKanbanDir();
  const line = JSON.stringify({ ...event, timestamp: event.timestamp ?? Date.now() }) + '\n';
  fs.appendFileSync(EVENTS_FILE, line, 'utf8');
}

function writeStatus(data) {
  ensureKanbanDir();
  writeJson(STATUS_FILE, data);
}

/**
 * POST a JSON payload to the event server on :4010.
 * Fails silently — the event server may not be running.
 */
function postToEventServer(payload) {
  return new Promise((resolve) => {
    try {
      const body = JSON.stringify(payload);
      const options = {
        hostname: EVENT_SERVER_HOST,
        port: EVENT_SERVER_PORT,
        path: '/events',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      };

      const req = http.request(options, (res) => {
        res.resume(); // drain response
        resolve();
      });

      req.on('error', () => resolve()); // fail silently
      req.setTimeout(500, () => { req.destroy(); resolve(); });
      req.write(body);
      req.end();
    } catch {
      resolve(); // fail silently
    }
  });
}

// ---------------------------------------------------------------------------
// Board helpers
// ---------------------------------------------------------------------------

/**
 * Read board.json and return cards matching a given status string.
 */
function findCardsByStatus(status) {
  const board = readJson(BOARD_FILE);
  if (!board) return [];

  const cards = [];
  const columns = board.columns ?? board.lists ?? board.lanes ?? [];

  for (const column of columns) {
    const columnCards = column.cards ?? column.items ?? [];
    for (const card of columnCards) {
      if (card.status === status) {
        cards.push(card);
      }
    }
  }

  return cards;
}

/**
 * Update cards in board.json that match `fromStatus` to `toStatus`.
 * Writes back to board.json only if changes were made.
 */
function updateCardStatus(fromStatus, toStatus) {
  const board = readJson(BOARD_FILE);
  if (!board) return;

  let changed = false;
  const columns = board.columns ?? board.lists ?? board.lanes ?? [];

  for (const column of columns) {
    const columnCards = column.cards ?? column.items ?? [];
    for (const card of columnCards) {
      if (card.status === fromStatus) {
        card.status = toStatus;
        changed = true;
      }
    }
  }

  if (changed) {
    ensureKanbanDir();
    writeJson(BOARD_FILE, board);
  }
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

async function sessionStart() {
  writeStatus({ status: 'running', startedAt: Date.now() });
  updateCardStatus('started', 'running');
  appendEvent({
    type: 'command:started',
    source: 'hook',
    data: { session: process.env.CLAUDE_SESSION_ID ?? null },
  });
}

async function sessionEnd() {
  writeStatus({ status: 'idle', completedAt: Date.now() });
  appendEvent({
    type: 'command:completed',
    source: 'hook',
    data: { session: process.env.CLAUDE_SESSION_ID ?? null },
  });
}

async function fileChanged(filePath) {
  appendEvent({
    type: 'file:changed',
    source: 'hook',
    data: { file: filePath ?? null },
  });
}

async function agentStart(agentType) {
  const event = {
    type: 'lifecycle:started',
    source: 'hook',
    timestamp: Date.now(),
    data: { agent: agentType ?? 'unknown' },
  };
  appendEvent(event);
  await postToEventServer(event);
}

async function agentEnd(agentType, status) {
  const event = {
    type: 'lifecycle:completed',
    source: 'hook',
    timestamp: Date.now(),
    data: { agent: agentType ?? 'unknown', status: status ?? null },
  };
  appendEvent(event);
  await postToEventServer(event);
}

async function toolUse(toolName) {
  const event = {
    type: 'command:progress',
    source: 'hook',
    timestamp: Date.now(),
    data: { tool: toolName ?? null },
  };
  appendEvent(event);
  await postToEventServer(event);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main() {
  const [, , action, ...args] = process.argv;

  try {
    switch (action) {
      case 'session-start':
        await sessionStart();
        break;

      case 'session-end':
        await sessionEnd();
        break;

      case 'file-changed':
        await fileChanged(args[0]);
        break;

      case 'agent-start':
        await agentStart(args[0]);
        break;

      case 'agent-end':
        await agentEnd(args[0], args[1]);
        break;

      case 'tool-use':
        await toolUse(args[0]);
        break;

      default:
        // Unknown action — exit silently so Claude is not blocked.
        break;
    }
  } catch {
    // Top-level safety net — never propagate errors to Claude.
    process.exit(0);
  }
}

main().then(() => process.exit(0)).catch(() => process.exit(0));
