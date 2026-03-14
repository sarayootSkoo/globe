/**
 * agentHealth.ts — Agent health monitoring derived store.
 *
 * Provides a reactive snapshot of agent orchestration health:
 * running count, queue depth, completion stats, capacity alerts.
 */

import { derived, writable, type Writable } from 'svelte/store';
import { agentQueue, maxConcurrent } from './agentQueue';
import { kanbanDB } from './kanbanDB';
import type { AgentHealthSnapshot, AgentLiveStatus } from '../types';

// ── Proxy store for agentLiveStatuses (avoids circular dep) ──────────────────

const liveStatusProxy = writable<Map<string, AgentLiveStatus>>(new Map());

/** Pipe the real agentLiveStatuses store into this proxy. Call once at init. */
export function registerHealthLiveStatuses(store: Writable<Map<string, AgentLiveStatus>>): void {
  store.subscribe(v => liveStatusProxy.set(v));
}

// ── Persistent counters ──────────────────────────────────────────────────────

function loadSetting<T>(key: string, fallback: T): T {
  const settings = kanbanDB.settings.get({});
  return (settings as Record<string, unknown>)[key] as T ?? fallback;
}

function saveSetting<T>(key: string, value: T): void {
  const settings = kanbanDB.settings.get({});
  kanbanDB.settings.set({ ...settings, [key]: value });
}

export const healthCounters = writable<{
  totalLaunched: number;
  totalCompleted: number;
  totalFailed: number;
  totalDurationMs: number;
}>({
  totalLaunched: loadSetting('healthTotalLaunched', 0),
  totalCompleted: loadSetting('healthTotalCompleted', 0),
  totalFailed: loadSetting('healthTotalFailed', 0),
  totalDurationMs: loadSetting('healthTotalDurationMs', 0),
});

healthCounters.subscribe(v => {
  saveSetting('healthTotalLaunched', v.totalLaunched);
  saveSetting('healthTotalCompleted', v.totalCompleted);
  saveSetting('healthTotalFailed', v.totalFailed);
  saveSetting('healthTotalDurationMs', v.totalDurationMs);
});

/** Increment a health counter. Call from event handlers. */
export function recordLaunch(): void {
  healthCounters.update(c => ({ ...c, totalLaunched: c.totalLaunched + 1 }));
}

export function recordCompletion(durationMs: number = 0): void {
  healthCounters.update(c => ({
    ...c,
    totalCompleted: c.totalCompleted + 1,
    totalDurationMs: c.totalDurationMs + durationMs,
  }));
}

export function recordFailure(): void {
  healthCounters.update(c => ({ ...c, totalFailed: c.totalFailed + 1 }));
}

// ── Derived health snapshot ──────────────────────────────────────────────────

export const agentHealthSnapshot = derived(
  [liveStatusProxy, agentQueue, maxConcurrent, healthCounters],
  ([$statuses, $queue, $max, $counters]): AgentHealthSnapshot => {
    let runningCount = 0;
    for (const [, status] of $statuses) {
      if (status.state === 'working') runningCount++;
    }

    const avgDurationMs = $counters.totalCompleted > 0
      ? Math.round($counters.totalDurationMs / $counters.totalCompleted)
      : 0;

    return {
      runningCount,
      queueDepth: $queue.length,
      maxConcurrent: $max,
      totalLaunched: $counters.totalLaunched,
      totalCompleted: $counters.totalCompleted,
      totalFailed: $counters.totalFailed,
      avgDurationMs,
      isAtCapacity: runningCount >= $max,
    };
  }
);
