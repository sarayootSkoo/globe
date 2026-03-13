/**
 * activityLog.ts — Persistent activity log for the kanban board.
 *
 * Records every board action (lifecycle change, card move, agent assignment,
 * command run, etc.) into kanbanDB.history with timestamps.
 *
 * Provides a store and helpers to query logs per card or globally.
 */

import { writable, derived } from 'svelte/store';
import { kanbanDB } from './kanbanDB';

// ── Types ────────────────────────────────────────────────────────────────────

export type LogAction =
  | 'lifecycle:idle'
  | 'lifecycle:started'
  | 'lifecycle:running'
  | 'lifecycle:paused'
  | 'lifecycle:completed'
  | 'lifecycle:failed'
  | 'lifecycle:blocked'
  | 'card:moved'
  | 'card:created'
  | 'agent:assigned'
  | 'agent:unassigned'
  | 'command:copied'
  | 'command:started'
  | 'command:rerun'
  | 'iteration:updated'
  | 'dependency:added'
  | 'dependency:removed'
  | 'card:updated'
  | 'agent:launched'
  | 'agent:launch-failed'
  | 'command:launched'
  | 'workflow:started'
  | 'workflow:restarted';

export interface LogEntry {
  id: string;
  cardId: string;
  action: LogAction;
  timestamp: number;
  detail: Record<string, unknown>;
}

// ── Store ────────────────────────────────────────────────────────────────────

const MAX_LOG_ENTRIES = 500;

function loadLog(): LogEntry[] {
  const raw = kanbanDB.history.get([]);
  return (raw as LogEntry[]).slice(-MAX_LOG_ENTRIES);
}

export const activityLog = writable<LogEntry[]>(loadLog());

activityLog.subscribe(entries => {
  kanbanDB.history.set(entries as unknown[]);
});

// ── Actions ──────────────────────────────────────────────────────────────────

function makeId(): string {
  return `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export function addLog(
  cardId: string,
  action: LogAction,
  detail: Record<string, unknown> = {},
): LogEntry {
  const entry: LogEntry = {
    id: makeId(),
    cardId,
    action,
    timestamp: Date.now(),
    detail,
  };

  activityLog.update(entries => {
    const next = [...entries, entry];
    // Trim to keep only latest entries
    return next.length > MAX_LOG_ENTRIES ? next.slice(-MAX_LOG_ENTRIES) : next;
  });

  return entry;
}

// ── Derived: per-card logs (latest first) ────────────────────────────────────

export function getCardLogs(entries: LogEntry[], cardId: string): LogEntry[] {
  return entries.filter(e => e.cardId === cardId).reverse();
}

// ── Derived: global recent (latest 50) ───────────────────────────────────────

export const recentLogs = derived(activityLog, ($log) =>
  $log.slice(-50).reverse()
);
