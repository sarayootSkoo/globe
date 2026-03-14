import { writable, get as storeGet } from 'svelte/store';
import type { AgentLiveStatus, KanbanEvent } from '../types';
import { updateLifecycle, moveCard, mergeBoardState, setCardArtifact, iterationStates } from './kanbanState';
import { addLog } from './activityLog';
import type { KanbanStatus } from '../types';
import { enqueue, autoAdvanceEnabled, registerLiveStatuses } from './agentQueue';
import { advanceCard } from './pipelineAdvance';
import { recordLaunch, recordCompletion, recordFailure, registerHealthLiveStatuses } from './agentHealth';

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

/** PTY session mapping: cardId → sessionId (for xterm.js sessions) */
export const ptySessionMap = writable<Map<string, string>>(new Map());

// Register live statuses with agentQueue and agentHealth to break circular dependencies
registerLiveStatuses(agentLiveStatuses as any);
registerHealthLiveStatuses(agentLiveStatuses);

const MAX_CONSOLE_LINES = 500;

// Batched console line appending — collects lines and flushes once per frame
let pendingLines = new Map<string, ConsoleLine[]>();
let flushScheduled = false;

function appendConsoleLine(key: string, line: ConsoleLine): void {
  const pending = pendingLines.get(key);
  if (pending) {
    pending.push(line);
  } else {
    pendingLines.set(key, [line]);
  }

  if (!flushScheduled) {
    flushScheduled = true;
    requestAnimationFrame(flushConsoleLines);
  }
}

function flushConsoleLines(): void {
  flushScheduled = false;
  if (pendingLines.size === 0) return;

  agentConsoleOutput.update(map => {
    const next = new Map(map);
    for (const [key, newLines] of pendingLines) {
      const existing = next.get(key) ?? [];
      const combined = existing.concat(newLines);
      next.set(key, combined.length > MAX_CONSOLE_LINES
        ? combined.slice(combined.length - MAX_CONSOLE_LINES)
        : combined);
    }
    pendingLines = new Map();
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

// ── Retry evaluation ──────────────────────────────────────────────────────────

const MAX_RETRIES = 3;

function evaluateRetry(cardId: string): {
  shouldRetry: boolean;
  retryCount: number;
  backoffMs: number;
  command: string;
} {
  const $iter = storeGet(iterationStates);
  const iter = $iter[cardId];
  const retryCount = (iter?.count ?? 0);
  const lastCommand = iter?.lastCommand ?? '/chore';

  if (retryCount >= MAX_RETRIES) {
    return { shouldRetry: false, retryCount, backoffMs: 0, command: lastCommand };
  }

  // Exponential backoff: 1s, 2s, 4s, max 30s
  const backoffMs = Math.min(30000, 1000 * Math.pow(2, retryCount));

  return { shouldRetry: true, retryCount: retryCount + 1, backoffMs, command: lastCommand };
}

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
        recordLaunch();
        if (cardId) {
          updateLifecycle(cardId, 'running');
          addLog(cardId, 'command:started', { message, command: data?.command });
        }
        // Track PTY sessions
        if (data?.isPty && cardId && data?.sessionId) {
          ptySessionMap.update(m => {
            const next = new Map(m);
            next.set(cardId, data.sessionId as string);
            return next;
          });
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

      case 'command:completed': {
        const durationMs = current.startedAt
          ? Date.now() - new Date(current.startedAt).getTime()
          : (data?.duration as number) || 0;
        next.set(nodeId, {
          ...current,
          state: 'done',
          progress: 100,
          lastAction: message || 'Completed',
        });
        recordCompletion(durationMs);
        if (cardId) {
          updateLifecycle(cardId, 'completed');
          addLog(cardId, 'lifecycle:completed', { message, score: data?.score, duration: durationMs });
          // Pipeline auto-advance: move to next SDLC stage
          if (storeGet(autoAdvanceEnabled)) {
            setTimeout(() => advanceCard(cardId), 500);
          }
        }
        break;
      }

      case 'command:failed':
        next.set(nodeId, {
          ...current,
          state: 'error',
          lastAction: message || 'Failed',
        });
        recordFailure();
        if (cardId) {
          const retryResult = evaluateRetry(cardId);
          if (retryResult.shouldRetry) {
            updateLifecycle(cardId, 'paused', 'error_retry');
            addLog(cardId, 'lifecycle:paused', {
              message,
              reason: 'error_retry',
              retryCount: retryResult.retryCount,
              backoffMs: retryResult.backoffMs,
            });
            setTimeout(() => {
              enqueue(cardId, retryResult.command, '', retryResult.retryCount);
            }, retryResult.backoffMs);
          } else {
            updateLifecycle(cardId, 'failed');
            addLog(cardId, 'lifecycle:failed', { message, retriesExhausted: true });
          }
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

      case 'lifecycle:paused':
        next.set(nodeId, {
          ...current,
          state: 'idle',
          lastAction: message || `Paused (${(data?.reason as string) || 'user'})`,
        });
        if (cardId) {
          updateLifecycle(cardId, 'paused', (data?.reason as string) || 'user_pause');
          addLog(cardId, 'lifecycle:paused', { message, reason: data?.reason });
        }
        break;

      case 'lifecycle:resumed':
        next.set(nodeId, {
          ...current,
          state: 'working',
          lastAction: message || 'Resumed',
          progress: current.progress ?? 0,
        });
        if (cardId) {
          updateLifecycle(cardId, 'running');
          addLog(cardId, 'lifecycle:resumed', { message });
        }
        break;

      case 'lifecycle:completed':
        next.set(nodeId, { ...current, state: 'done', progress: 100, lastAction: message || 'Completed' });
        if (cardId) {
          updateLifecycle(cardId, 'completed');
          addLog(cardId, 'lifecycle:completed', { message, score: data?.score });
        }
        break;

      case 'card:artifact': {
        const filePath = data?.filePath as string;
        if (cardId && filePath) {
          setCardArtifact(cardId, filePath);
          addLog(cardId, 'card:artifact', { filePath, message });
        }
        break;
      }

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
        activeSessions?: Record<string, { sessionId: string; cardId?: string; state?: string }>;
        sessionId?: string;
        cardId?: string | null;
        data?: string;
        timestamp?: string;
      };

      if (msg.type === 'init') {
        // Seed recentEvents with last 10 from server
        if (Array.isArray(msg.events)) {
          recentEvents.update(list => {
            const combined = [...(msg.events ?? []), ...list];
            return combined.slice(-MAX_RECENT_EVENTS);
          });
          // Process each for live status
          for (const e of msg.events ?? []) {
            processEvent(e);
          }
        }

        // Reconcile: mark stale "working" statuses that have no active server session
        if (msg.activeSessions) {
          const serverCardIds = new Set<string>();
          for (const s of Object.values(msg.activeSessions)) {
            if (s.cardId) serverCardIds.add(s.cardId);
            serverCardIds.add(s.sessionId);
          }
          agentLiveStatuses.update(map => {
            const next = new Map(map);
            for (const [key, status] of next) {
              if (status.state === 'working' && !serverCardIds.has(key)) {
                // This session no longer exists on the server — mark as lost
                next.set(key, { ...status, state: 'error', lastAction: 'Session lost (server restarted)' });
                if (key) updateLifecycle(key, 'paused', 'error_retry');
              }
            }
            return next;
          });
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
    // Fetch from event-server API to get the authoritative board state
    const res = await fetch(`${EVENT_SERVER}/board/current?t=${Date.now()}`);
    if (!res.ok) {
      // Fallback to vite-served static file
      const fallback = await fetch('.kanban/board.json?t=' + Date.now());
      if (!fallback.ok) return;
      const board = await fallback.json();
      mergeBoardState(board);
      return;
    }
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

// ── Browser close cleanup ─────────────────────────────────────────────────────

function onBeforeUnload(): void {
  // Use sendBeacon to reliably stop all agents when browser/tab closes
  navigator.sendBeacon(`${EVENT_SERVER}/agent/stop-all`, JSON.stringify({ reason: 'browser_closed' }));
}

/** Connect to the event server WebSocket. Safe to call multiple times. */
export function connectEventServer(): void {
  intentionalClose = false;
  window.addEventListener('beforeunload', onBeforeUnload);
  connect();
}

/** Disconnect from the event server WebSocket and cancel auto-reconnect. */
export function disconnectEventServer(): void {
  intentionalClose = true;
  window.removeEventListener('beforeunload', onBeforeUnload);
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
