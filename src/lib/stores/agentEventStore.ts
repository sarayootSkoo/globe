import { writable } from 'svelte/store';
import type { AgentLiveStatus, KanbanEvent } from '../types';
import { updateLifecycle, moveCard, mergeBoardState } from './kanbanState';
import { addLog } from './activityLog';
import type { KanbanStatus } from '../types';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ConsoleLine {
  stream: 'stdout' | 'stderr';
  text: string;
  timestamp: string;
}

// ── Stores ───────────────────────────────────────────────────────────────────

/** Live statuses keyed by nodeId / sessionId */
export const agentLiveStatuses = writable<Map<string, AgentLiveStatus>>(new Map());

/** Last 50 events received over the WebSocket */
export const recentEvents = writable<KanbanEvent[]>([]);

/** Whether the WebSocket connection is active */
export const wsConnected = writable<boolean>(false);

/**
 * Console output lines per cardId.
 * Keyed by cardId (or sessionId if cardId is absent).
 * Each entry holds up to 500 lines.
 */
export const agentConsoleOutput = writable<Map<string, ConsoleLine[]>>(new Map());

const MAX_CONSOLE_LINES = 500;

function appendConsoleLine(key: string, line: ConsoleLine): void {
  agentConsoleOutput.update(map => {
    const next = new Map(map);
    const existing = next.get(key) ?? [];
    const updated = [...existing, line];
    next.set(key, updated.length > MAX_CONSOLE_LINES ? updated.slice(updated.length - MAX_CONSOLE_LINES) : updated);
    return next;
  });
}

// ── Closed sessions (ignore incoming events for these keys) ─────────────────

const closedKeys = new Set<string>();

/** Mark a key as closed so incoming WebSocket events won't re-create its status */
export function markSessionClosed(key: string): void {
  closedKeys.add(key);
  // Auto-expire after 5s so stale entries don't accumulate
  setTimeout(() => closedKeys.delete(key), 5000);
}

// ── Internal state ───────────────────────────────────────────────────────────

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let intentionalClose = false;

const WS_URL = 'ws://localhost:4010/ws';
const MAX_RECENT_EVENTS = 50;
const RECONNECT_DELAY_MS = 3000;

// ── Event processing ─────────────────────────────────────────────────────────

function processEvent(event: KanbanEvent): void {
  // Append to recentEvents (capped at 50)
  recentEvents.update(list => {
    const next = [...list, event];
    return next.length > MAX_RECENT_EVENTS ? next.slice(next.length - MAX_RECENT_EVENTS) : next;
  });

  // Derive nodeId / cardId from event data (cardId lives inside event.data, not at top level)
  const data = event.data as Record<string, unknown>;
  const cardId = (data?.cardId as string) || event.cardId || null;
  // Prefer cardId as the key so tab labels match card names
  const nodeId = cardId || (data?.sessionId as string);
  if (!nodeId) return;

  // Skip events for sessions the user has explicitly closed (prevents ghost "Failed" tabs)
  if (closedKeys.has(nodeId)) return;

  const message = (data?.message as string) || '';

  agentLiveStatuses.update(map => {
    const next = new Map(map);
    const current: AgentLiveStatus = next.get(nodeId) ?? {
      nodeId,
      agent: null,
      state: 'idle',
    };

    switch (event.type) {
      case 'command:started':
        next.set(nodeId, {
          ...current,
          state: 'working',
          startedAt: event.timestamp,
          progress: 0,
          lastAction: message || 'Starting...',
        });
        if (cardId) {
          updateLifecycle(cardId, 'running');
          addLog(cardId, 'command:started', { message, command: data?.command });
        }
        break;

      case 'command:progress': {
        const output = (data?.output as string) || (data?.stderr as string) || '';
        next.set(nodeId, {
          ...current,
          state: 'working',
          lastAction: output.trim().slice(0, 120) || message || current.lastAction,
          progress: Math.min(99, (current.progress ?? 0) + 5),
        });
        break;
      }

      case 'command:completed':
        next.set(nodeId, {
          ...current,
          state: 'done',
          progress: 100,
          lastAction: message || 'Completed',
        });
        if (cardId) {
          updateLifecycle(cardId, 'completed');
          addLog(cardId, 'lifecycle:completed', { message, score: data?.score, duration: data?.duration });
        }
        break;

      case 'command:failed':
        next.set(nodeId, {
          ...current,
          state: 'error',
          lastAction: message || 'Failed',
        });
        if (cardId) {
          updateLifecycle(cardId, 'failed');
          addLog(cardId, 'lifecycle:failed', { message });
        }
        break;

      case 'lifecycle:started':
        next.set(nodeId, { ...current, state: 'working', startedAt: event.timestamp, lastAction: message || 'Started' });
        if (cardId) {
          updateLifecycle(cardId, 'running');
          addLog(cardId, 'lifecycle:started', { message });
        }
        break;

      case 'lifecycle:running':
        next.set(nodeId, {
          ...current,
          state: 'working',
          lastAction: message || current.lastAction,
          progress: Math.min(99, (current.progress ?? 0) + 8),
        });
        if (cardId) {
          addLog(cardId, 'lifecycle:running', { message, file: data?.file });
        }
        break;

      case 'lifecycle:completed':
        next.set(nodeId, { ...current, state: 'done', progress: 100, lastAction: message || 'Completed' });
        if (cardId) {
          updateLifecycle(cardId, 'completed');
          addLog(cardId, 'lifecycle:completed', { message, score: data?.score });
        }
        break;

      case 'card:moved': {
        const toCol = (data?.to as string) || (data?.toColumn as string);
        if (cardId && toCol) {
          moveCard(cardId, toCol as KanbanStatus);
          addLog(cardId, 'card:moved', { from: data?.from, to: toCol, message });
        }
        break;
      }

      default:
        break;
    }

    return next;
  });
}

// ── WebSocket connection ──────────────────────────────────────────────────────

function scheduleReconnect(): void {
  if (intentionalClose) return;
  if (reconnectTimer !== null) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, RECONNECT_DELAY_MS);
}

function connect(): void {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    return;
  }

  try {
    socket = new WebSocket(WS_URL);
  } catch {
    scheduleReconnect();
    return;
  }

  socket.addEventListener('open', () => {
    wsConnected.set(true);
  });

  socket.addEventListener('message', (ev) => {
    try {
      const msg = JSON.parse(ev.data as string) as {
        type: string;
        events?: KanbanEvent[];
        event?: KanbanEvent;
        sessionId?: string;
        cardId?: string | null;
        data?: string;
        timestamp?: string;
      };

      if (msg.type === 'init' && Array.isArray(msg.events)) {
        // Seed recentEvents with last 10 from server
        recentEvents.update(list => {
          const combined = [...(msg.events ?? []), ...list];
          return combined.slice(-MAX_RECENT_EVENTS);
        });
        // Process each for live status
        for (const e of msg.events ?? []) {
          processEvent(e);
        }
      } else if (msg.type === 'event' && msg.event) {
        processEvent(msg.event);
      } else if (msg.type === 'board:updated') {
        loadBoardFromServer();
      } else if (msg.type === 'agent:stdout' || msg.type === 'agent:stderr') {
        // Console output from a spawned claude process
        const stream = msg.type === 'agent:stdout' ? 'stdout' : 'stderr';
        const key = msg.cardId || msg.sessionId;
        if (key && msg.data && !closedKeys.has(key)) {
          // Split multi-line chunks into individual lines, preserving empty lines
          const lines = msg.data.split('\n');
          const ts = msg.timestamp ?? new Date().toISOString();
          for (const line of lines) {
            // Skip the very last empty string produced by a trailing newline
            if (line === '' && lines[lines.length - 1] === line) continue;
            appendConsoleLine(key, { stream, text: line, timestamp: ts });
          }
        }
      }
    } catch {
      // Ignore malformed messages
    }
  });

  socket.addEventListener('close', () => {
    wsConnected.set(false);
    socket = null;
    scheduleReconnect();
  });

  socket.addEventListener('error', () => {
    wsConnected.set(false);
    // close event will follow and trigger reconnect
  });
}

// ── Board state loader (triggered by board:updated WebSocket message) ─────

async function loadBoardFromServer(): Promise<void> {
  try {
    const res = await fetch('.kanban/board.json?t=' + Date.now());
    if (!res.ok) return;
    const board = await res.json();
    mergeBoardState(board);
  } catch {
    // Silent fail — server may not be running
  }
}

// ── Load persisted session logs from DB ──────────────────────────────────────

const EVENT_SERVER = 'http://localhost:4010';

/**
 * Load persisted logs for a specific card from the DB.
 * Populates agentConsoleOutput store so terminal shows historical output.
 */
export async function loadLogsForCard(cardId: string): Promise<void> {
  try {
    const res = await fetch(`${EVENT_SERVER}/card/${encodeURIComponent(cardId)}/logs?limit=500`);
    if (!res.ok) return;
    const { logs } = await res.json() as { logs: Array<{ session_id: string; card_id: string; stream: string; text: string; timestamp: string }> };
    if (!logs || logs.length === 0) return;

    agentConsoleOutput.update(map => {
      const next = new Map(map);
      // Group by cardId (use card_id as the key, matching live behavior)
      const key = cardId;
      const existing = next.get(key) ?? [];
      const fromDb: ConsoleLine[] = logs.map(l => ({
        stream: l.stream as 'stdout' | 'stderr',
        text: l.text,
        timestamp: l.timestamp,
      }));
      // Merge: DB first, then any live lines (avoid duplicates by checking timestamp)
      const existingTimestamps = new Set(existing.map(e => e.timestamp + e.text.slice(0, 50)));
      const merged = [
        ...fromDb.filter(l => !existingTimestamps.has(l.timestamp + l.text.slice(0, 50))),
        ...existing,
      ].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      next.set(key, merged.slice(-MAX_CONSOLE_LINES));
      return next;
    });
  } catch {
    // Silent fail — server may not be running
  }
}

/**
 * Load persisted logs for a session from the DB.
 */
export async function loadLogsForSession(sessionId: string, cardId?: string): Promise<void> {
  try {
    const res = await fetch(`${EVENT_SERVER}/session/${encodeURIComponent(sessionId)}/logs?limit=500`);
    if (!res.ok) return;
    const { logs } = await res.json() as { logs: Array<{ session_id: string; card_id: string | null; stream: string; text: string; timestamp: string }> };
    if (!logs || logs.length === 0) return;

    const key = cardId || logs[0]?.card_id || sessionId;
    agentConsoleOutput.update(map => {
      const next = new Map(map);
      const existing = next.get(key) ?? [];
      const fromDb: ConsoleLine[] = logs.map(l => ({
        stream: l.stream as 'stdout' | 'stderr',
        text: l.text,
        timestamp: l.timestamp,
      }));
      const existingTimestamps = new Set(existing.map(e => e.timestamp + e.text.slice(0, 50)));
      const merged = [
        ...fromDb.filter(l => !existingTimestamps.has(l.timestamp + l.text.slice(0, 50))),
        ...existing,
      ].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      next.set(key, merged.slice(-MAX_CONSOLE_LINES));
      return next;
    });
  } catch {
    // Silent fail
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Connect to the event server WebSocket. Safe to call multiple times. */
export function connectEventServer(): void {
  intentionalClose = false;
  connect();
}

/** Disconnect from the event server WebSocket and cancel auto-reconnect. */
export function disconnectEventServer(): void {
  intentionalClose = true;
  if (reconnectTimer !== null) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (socket) {
    socket.close();
    socket = null;
  }
  wsConnected.set(false);
}

/** Named alias for the WebSocket connection (for direct use if needed) */
export const eventSocket = {
  get instance() { return socket; },
};
