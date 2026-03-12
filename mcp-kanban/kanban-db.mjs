import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// .kanban/ is 2 levels up from mcp-kanban/ (project root)
const KANBAN_DIR = resolve(__dirname, '../.kanban');

// Ensure .kanban directory exists
try {
  mkdirSync(KANBAN_DIR, { recursive: true });
} catch (_) {}

function kanbanPath(filename) {
  return resolve(KANBAN_DIR, filename);
}

// --- Default structures ---

function emptyBoard() {
  return { cards: [], columns: {}, updatedAt: Date.now() };
}

// --- board.json ---

export function readBoard() {
  try {
    const raw = readFileSync(kanbanPath('board.json'), 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return emptyBoard();
  }
}

export function writeBoard(data) {
  const board = { ...data, updatedAt: Date.now() };
  writeFileSync(kanbanPath('board.json'), JSON.stringify(board, null, 2), 'utf8');
  return board;
}

// --- events.jsonl ---

export function readEvents(limit = 50) {
  try {
    const raw = readFileSync(kanbanPath('events.jsonl'), 'utf8');
    const lines = raw.split('\n').filter((l) => l.trim() !== '');
    const slice = limit > 0 ? lines.slice(-limit) : lines;
    return slice.map((line) => {
      try {
        return JSON.parse(line);
      } catch (_) {
        return { raw: line };
      }
    });
  } catch (_) {
    return [];
  }
}

export function appendEvent(event) {
  const line = JSON.stringify({ ...event, ts: event.ts ?? Date.now() }) + '\n';
  appendFileSync(kanbanPath('events.jsonl'), line, 'utf8');
}

// --- status.json ---

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

// --- pending.json ---

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

// --- result.json ---

export function readResult() {
  try {
    const raw = readFileSync(kanbanPath('result.json'), 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}
