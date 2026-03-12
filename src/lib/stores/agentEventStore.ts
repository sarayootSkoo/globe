import { writable } from 'svelte/store';
import type { AgentLiveStatus, KanbanEvent } from '../types';

// ── Stores ───────────────────────────────────────────────────────────────────

/** Live statuses keyed by nodeId / sessionId */
export const agentLiveStatuses = writable<Map<string, AgentLiveStatus>>(new Map());

/** Last 50 events received over the WebSocket */
export const recentEvents = writable<KanbanEvent[]>([]);

/** Whether the WebSocket connection is active */
export const wsConnected = writable<boolean>(false);

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

  // Derive nodeId / sessionId from event data
  const data = event.data as Record<string, unknown>;
  const nodeId = (data?.sessionId as string) || (data?.cardId as string) || event.cardId;
  if (!nodeId) return;

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
          lastAction: 'Starting...',
        });
        break;

      case 'command:progress': {
        const output = (data?.output as string) || (data?.stderr as string) || '';
        next.set(nodeId, {
          ...current,
          state: 'working',
          lastAction: output.trim().slice(0, 120) || current.lastAction,
          progress: Math.min(99, (current.progress ?? 0) + 5),
        });
        break;
      }

      case 'command:completed':
        next.set(nodeId, {
          ...current,
          state: 'done',
          progress: 100,
          lastAction: 'Completed',
        });
        break;

      case 'command:failed':
        next.set(nodeId, {
          ...current,
          state: 'error',
          lastAction: 'Failed',
        });
        break;

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
      const msg = JSON.parse(ev.data as string) as { type: string; events?: KanbanEvent[]; event?: KanbanEvent };

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
