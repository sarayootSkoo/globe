import { writable, derived, get } from 'svelte/store';
import type { KanbanStatus } from '../types';

// ── Command Queue Types ─────────────────────────────────────────────────────

export interface QueuedCommand {
  id: string;
  command: string;         // e.g., '/chore'
  args: string;            // e.g., "'path/to/file.md'"
  cardId: string | null;
  status: 'pending' | 'copied' | 'running' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
}

// ── Persistence ─────────────────────────────────────────────────────────────

const QUEUE_KEY = 'kg-kanban-command-queue';
const PANEL_KEY = 'kg-kanban-command-panel';

function loadQueue(): QueuedCommand[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  } catch { return []; }
}

// ── Stores ──────────────────────────────────────────────────────────────────

/** Command queue — Sprint 1: just tracks clipboard copies */
export const commandQueue = writable<QueuedCommand[]>(loadQueue());
commandQueue.subscribe(v => {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(v));
});

/** Whether command panel sidebar is open */
export const commandPanelOpen = writable<boolean>(
  localStorage.getItem(PANEL_KEY) === 'true'
);
commandPanelOpen.subscribe(v => {
  localStorage.setItem(PANEL_KEY, String(v));
});

/** Active (non-completed) commands */
export const activeCommands = derived(commandQueue, ($q) =>
  $q.filter(c => c.status === 'pending' || c.status === 'running')
);

/** Recent history (last 20 completed) */
export const commandHistory = derived(commandQueue, ($q) =>
  $q
    .filter(c => c.status === 'completed' || c.status === 'failed' || c.status === 'copied')
    .slice(-20)
    .reverse()
);

// ── Actions ─────────────────────────────────────────────────────────────────

export function queueCommand(command: string, args: string, cardId: string | null): QueuedCommand {
  const entry: QueuedCommand = {
    id: `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    command,
    args,
    cardId,
    status: 'pending',
    createdAt: Date.now(),
  };
  commandQueue.update(q => [...q, entry]);
  return entry;
}

export function markCopied(cmdId: string): void {
  commandQueue.update(q =>
    q.map(c => c.id === cmdId ? { ...c, status: 'copied' as const } : c)
  );
}

export function markCompleted(cmdId: string): void {
  commandQueue.update(q =>
    q.map(c => c.id === cmdId ? { ...c, status: 'completed' as const, completedAt: Date.now() } : c)
  );
}

export function clearHistory(): void {
  commandQueue.update(q => q.filter(c => c.status === 'pending' || c.status === 'running'));
}

export function toggleCommandPanel(): void {
  commandPanelOpen.update(v => !v);
}
