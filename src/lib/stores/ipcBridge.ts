import { writable } from 'svelte/store';
import type { KanbanEvent, KanbanEventType } from '../types';
import { updateLifecycleByStatus } from './kanbanState';

// ── IPC File Paths (relative to app root, served as static assets) ───────────
export const IPC_PATHS = {
  pending: '.kanban/pending.json',
  status:  '.kanban/status.json',
  result:  '.kanban/result.json',
  events:  '.kanban/events.jsonl',
} as const;

// ── Status shape written by Claude CLI hooks ──────────────────────────────────
export interface IPCStatus {
  status: 'idle' | 'running' | 'error';
  session?: string;
  startedAt?: number;
  completedAt?: number;
  updatedAt?: number;
}

// ── Svelte Stores ─────────────────────────────────────────────────────────────

/** True when status.json is being updated (last fetch succeeded & status=running). */
export const ipcConnected = writable<boolean>(false);

/** Most recent event parsed from status.json / events.jsonl. */
export const lastEvent = writable<KanbanEvent | null>(null);

/** Raw status payload from the most recent successful poll. */
export const ipcStatus = writable<IPCStatus | null>(null);

// ── Internal polling state ────────────────────────────────────────────────────

let pollTimer: ReturnType<typeof setInterval> | null = null;
const POLL_INTERVAL_MS = 2000;

/** Timestamp of the last status.json that was fetched (used for stale detection). */
let lastStatusAt: number | null = null;

/** Track last known status for transition detection. */
let lastKnownStatus: string | null = null;

// ── Poll Implementation ───────────────────────────────────────────────────────

async function fetchStatus(): Promise<void> {
  try {
    // Cache-bust with timestamp so the browser never serves a stale cached file.
    const url = `${IPC_PATHS.status}?t=${Date.now()}`;
    const res = await fetch(url);

    if (!res.ok) {
      // status.json not present yet — Claude hasn't started a session.
      ipcConnected.set(false);
      ipcStatus.set(null);
      return;
    }

    const data = (await res.json()) as IPCStatus;
    ipcStatus.set(data);

    const now = Date.now();
    // Consider connected if status is 'running' OR if status.json was updated
    // within the last 10 seconds (hook just finished writing completedAt).
    const freshWindow = 10_000;
    const isRunning = data.status === 'running';
    const isRecent =
      (data.startedAt !== undefined && now - data.startedAt < freshWindow) ||
      (data.completedAt !== undefined && now - data.completedAt < freshWindow);

    ipcConnected.set(isRunning || isRecent);
    lastStatusAt = now;

    // Detect status transitions and update kanbanState accordingly
    if (data.status === 'running' && lastKnownStatus !== 'running') {
      // Claude just started — transition 'started' cards to 'running'
      updateLifecycleByStatus('started', 'running');
    }
    lastKnownStatus = data.status;

    // Build a synthetic KanbanEvent from the status payload so the UI can
    // display "last event type + timestamp" without parsing events.jsonl.
    const eventType: KanbanEventType =
      data.status === 'running'    ? 'command:started'   :
      data.status === 'idle'       ? 'command:completed' :
                                     'command:failed';

    const syntheticEvent: KanbanEvent = {
      id: `ipc-${now}`,
      type: eventType,
      timestamp: new Date(now).toISOString(),
      source: 'hook',
      data: data,
    };
    lastEvent.set(syntheticEvent);

  } catch {
    // Network or parse error — mark as disconnected.
    ipcConnected.set(false);
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Perform a single poll of .kanban/status.json and update stores.
 * Exported for manual/one-shot use (e.g., tests or immediate refresh).
 */
export async function pollIPC(): Promise<void> {
  await fetchStatus();
}

/**
 * Start background polling every 2 seconds.
 * Safe to call multiple times — will not create duplicate timers.
 */
export function startPolling(): void {
  if (pollTimer !== null) return;
  // Immediate first poll so the UI shows state right away.
  void fetchStatus();
  pollTimer = setInterval(() => { void fetchStatus(); }, POLL_INTERVAL_MS);
}

/**
 * Stop background polling and reset connection state.
 */
export function stopPolling(): void {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  ipcConnected.set(false);
  lastStatusAt = null;
}
