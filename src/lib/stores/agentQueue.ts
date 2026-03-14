/**
 * agentQueue.ts — Agent launch queue with concurrency control.
 *
 * Manages a priority queue of cards waiting to be launched as Claude agents.
 * Respects a configurable max concurrent limit (default: 2).
 * Dedup guard: prevents launching the same card twice.
 */

import { writable, get } from 'svelte/store';
import { kanbanDB } from './kanbanDB';
import { lifecycleStates, updateLifecycle, iterationStates, kanbanCards } from './kanbanState';
import { addLog } from './activityLog';
import { addPendingAction } from './actionConfirm';
import type { AgentQueueItem } from '../types';

// ── Settings ──────────────────────────────────────────────────────────────────

function loadSetting<T>(key: string, fallback: T): T {
  const settings = kanbanDB.settings.get({});
  return (settings as Record<string, unknown>)[key] as T ?? fallback;
}

function saveSetting<T>(key: string, value: T): void {
  const settings = kanbanDB.settings.get({});
  kanbanDB.settings.set({ ...settings, [key]: value });
}

export const maxConcurrent = writable<number>(
  loadSetting('maxConcurrent', 2)
);
maxConcurrent.subscribe(v => saveSetting('maxConcurrent', v));

export const autoAdvanceEnabled = writable<boolean>(
  loadSetting('autoAdvanceEnabled', false)
);
autoAdvanceEnabled.subscribe(v => saveSetting('autoAdvanceEnabled', v));

// ── Queue Store ───────────────────────────────────────────────────────────────

export const agentQueue = writable<AgentQueueItem[]>(
  loadSetting<AgentQueueItem[]>('agentQueue', [])
);
agentQueue.subscribe(v => saveSetting('agentQueue', v));

// ── Lazy running agent count (avoids circular dep with agentEventStore) ──────

let _agentLiveStatuses: import('svelte/store').Writable<Map<string, { state: string }>> | null = null;

/** Register the agentLiveStatuses store to avoid circular import */
export function registerLiveStatuses(store: typeof _agentLiveStatuses): void {
  _agentLiveStatuses = store;
}

function getRunningAgentCount(): number {
  if (!_agentLiveStatuses) return 0;
  const statuses = get(_agentLiveStatuses);
  let count = 0;
  for (const [, status] of statuses) {
    if (status.state === 'working') count++;
  }
  return count;
}

// ── Queue Actions ─────────────────────────────────────────────────────────────

const EVENT_SERVER = 'http://localhost:4010';

/**
 * Enqueue a card for agent launch. Sorted by priority (higher first).
 * Dedup: skips if card is already in queue or already running.
 */
export function enqueue(
  cardId: string,
  command: string,
  args: string = '',
  retryCount: number = 0,
): void {
  const $queue = get(agentQueue);
  const $lifecycle = get(lifecycleStates);

  // Dedup: don't enqueue if already in queue
  if ($queue.some(q => q.cardId === cardId)) return;

  // Dedup: don't enqueue if already running
  if ($lifecycle[cardId]?.state === 'running') return;

  // Compute priority from iteration state
  const $iter = get(iterationStates);
  const iterScore = $iter[cardId]?.score ?? 0;
  const priority = retryCount > 0 ? 5 : (iterScore > 0 ? iterScore * 10 : 50);

  const item: AgentQueueItem = {
    cardId,
    command,
    args,
    priority,
    enqueuedAt: Date.now(),
    retryCount,
  };

  agentQueue.update(q => {
    const next = [...q, item];
    next.sort((a, b) => b.priority - a.priority);
    return next;
  });

  addLog(cardId, 'command:started', { queued: true, command, retryCount });
}

/**
 * Remove a card from the queue (e.g., when user cancels).
 */
export function dequeueCard(cardId: string): void {
  agentQueue.update(q => q.filter(i => i.cardId !== cardId));
}

/**
 * Actually launch a queued item via the event server PTY endpoint.
 */
async function doLaunch(item: AgentQueueItem): Promise<boolean> {
  updateLifecycle(item.cardId, 'started');

  try {
    const res = await fetch(`${EVENT_SERVER}/agent/pty`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardId: item.cardId,
        command: item.command,
        args: item.args,
      }),
    });

    if (res.status === 429) {
      agentQueue.update(q => [item, ...q]);
      updateLifecycle(item.cardId, 'claimed');
      return false;
    }

    const data = await res.json();
    if (res.ok && data.sessionId) {
      updateLifecycle(item.cardId, 'running');
      addLog(item.cardId, 'agent:launched', {
        command: item.command,
        args: item.args,
        sessionId: data.sessionId,
        pid: data.pid,
        retryCount: item.retryCount,
        fromQueue: true,
      });
      return true;
    } else {
      addLog(item.cardId, 'agent:launch-failed', { error: data.error || 'Unknown' });
      updateLifecycle(item.cardId, 'failed');
      return false;
    }
  } catch (err: any) {
    addLog(item.cardId, 'agent:launch-failed', { error: err.message });
    updateLifecycle(item.cardId, 'failed');
    return false;
  }
}

/**
 * Try to launch the next item in the queue if under concurrency limit.
 * Adds a pending confirmation action instead of launching directly.
 * Returns true if an action was queued for confirmation.
 */
function tryLaunchNext(): boolean {
  const $queue = get(agentQueue);
  const $max = get(maxConcurrent);
  const $running = getRunningAgentCount();

  if ($queue.length === 0 || $running >= $max) return false;

  const item = $queue[0];

  // Remove from queue to prevent double-processing
  agentQueue.update(q => q.slice(1));

  // Find card title
  const $cards = get(kanbanCards);
  const card = $cards.find(c => c.node.id === item.cardId);
  const title = card?.node.label.slice(0, 40) ?? item.cardId;

  const retryLabel = item.retryCount > 0 ? ` (retry #${item.retryCount})` : '';

  addPendingAction(
    'launch',
    item.cardId,
    title,
    `Launch ${item.command} ${item.args}${retryLabel}`,
    () => doLaunch(item),
  );

  return true;
}

// ── Queue Processor (reactive) ────────────────────────────────────────────────

let _processorUnsub: (() => void) | null = null;
let _processorTimer: ReturnType<typeof setTimeout> | null = null;
const PROCESS_DEBOUNCE_MS = 1000;

/**
 * Start the reactive queue processor.
 * Watches agentLiveStatuses — when running count drops below max, launches next.
 */
export function startQueueProcessor(): void {
  if (_processorUnsub) return;

  if (!_agentLiveStatuses) return;
  _processorUnsub = _agentLiveStatuses.subscribe(() => {
    if (_processorTimer) clearTimeout(_processorTimer);
    _processorTimer = setTimeout(() => {
      _processorTimer = null;
      // Queue confirmation actions until queue empty or at capacity
      let queued = true;
      while (queued) {
        queued = tryLaunchNext();
      }
    }, PROCESS_DEBOUNCE_MS);
  });
}

/**
 * Stop the queue processor.
 */
export function stopQueueProcessor(): void {
  if (_processorTimer) clearTimeout(_processorTimer);
  if (_processorUnsub) {
    _processorUnsub();
    _processorUnsub = null;
  }
}
