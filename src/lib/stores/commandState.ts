import { writable, derived, get } from 'svelte/store';
import { kanbanDB } from './kanbanDB';
import type { KanbanStatus } from '../types';

// ── Command Queue Types ─────────────────────────────────────────────────────

export type CommandSource = 'ui' | 'voice' | 'auto';

export interface QueuedCommand {
  id: string;
  command: string;         // e.g., '/chore'
  args: string;            // e.g., "'path/to/file.md'"
  cardId: string | null;
  status: 'pending' | 'copied' | 'running' | 'completed' | 'failed';
  source: CommandSource;
  createdAt: number;
  completedAt?: number;
}

// ── Stores (via kanbanDB) ───────────────────────────────────────────────────

/** Command queue — Sprint 1: just tracks clipboard copies */
export const commandQueue = writable<QueuedCommand[]>(
  kanbanDB.commands.get([] as unknown[]) as QueuedCommand[]
);
commandQueue.subscribe(v => {
  kanbanDB.commands.set(v as unknown[]);
});

/** Whether command panel sidebar is open */
export const commandPanelOpen = writable<boolean>(
  kanbanDB.commandPanel.get(false)
);
commandPanelOpen.subscribe(v => {
  kanbanDB.commandPanel.set(v);
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

export function queueCommand(command: string, args: string, cardId: string | null, source: CommandSource = 'ui'): QueuedCommand {
  const entry: QueuedCommand = {
    id: `cmd-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    command,
    args,
    cardId,
    status: 'pending',
    source,
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
