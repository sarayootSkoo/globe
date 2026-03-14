/**
 * autoClaimEngine.ts — Reactive auto-claim engine for kanban cards.
 *
 * Watches for idle cards in claimable columns and automatically assigns
 * the top-priority suggested agent + sets lifecycle to 'claimed'.
 * Does NOT launch agent processes — only pre-assigns for user confirmation.
 */

import { derived, writable, get } from 'svelte/store';
import {
  kanbanCards, agentSuggestions, cardDependencies, lifecycleStates,
  assignAgent, updateLifecycle,
} from './kanbanState';
import { addLog } from './activityLog';
import { kanbanDB } from './kanbanDB';
import { enqueue } from './agentQueue';
import { addPendingAction } from './actionConfirm';
import type { KanbanStatus, AgentSuggestion, AgentType } from '../types';
import { kanbanConfig, getClaimableColumns } from './kanbanConfig';

// ── Settings (persisted via kanbanDB.settings) ──────────────────────────────

function loadSetting<T>(key: string, fallback: T): T {
  const settings = kanbanDB.settings.get({});
  return (settings as Record<string, unknown>)[key] as T ?? fallback;
}

function saveSetting<T>(key: string, value: T): void {
  const settings = kanbanDB.settings.get({});
  kanbanDB.settings.set({ ...settings, [key]: value });
}

export const autoClaimEnabled = writable<boolean>(
  loadSetting('autoClaimEnabled', true)
);
autoClaimEnabled.subscribe(v => saveSetting('autoClaimEnabled', v));

export const autoClaimExclusions = writable<Set<string>>(
  new Set(loadSetting<string[]>('autoClaimExclusions', []))
);
autoClaimExclusions.subscribe(v =>
  saveSetting('autoClaimExclusions', [...v])
);

// ── Dependency check ────────────────────────────────────────────────────────

function hasUnresolvedDeps(
  cardId: string,
  deps: Map<string, { blockedBy: string[]; blocking: string[] }>,
  lifecycles: Record<string, { state: string }>,
): boolean {
  const d = deps.get(cardId);
  if (!d || d.blockedBy.length === 0) return false;
  return d.blockedBy.some(bid => lifecycles[bid]?.state !== 'completed');
}

// ── Claimable cards derived store ───────────────────────────────────────────

export interface ClaimCandidate {
  card: import('../types').KanbanCard;
  suggestedAgent: AgentSuggestion;
}

// Snapshot of claimable columns — updated only when config changes (not reactive in derived)
let _claimableCols: KanbanStatus[] = getClaimableColumns();
kanbanConfig.subscribe(() => { _claimableCols = getClaimableColumns(); });

export const claimableCards = derived(
  [kanbanCards, agentSuggestions, cardDependencies, autoClaimEnabled, autoClaimExclusions, lifecycleStates],
  ([$cards, $suggestions, $deps, $enabled, $exclusions, $lifecycle]): ClaimCandidate[] => {
    if (!$enabled) return [];
    // Check config master switch (snapshot read, not reactive)
    const cfg = get(kanbanConfig);
    if (!cfg.autoConfirm?.autoClaimEnabled) return [];
    return $cards
      .filter(c =>
        _claimableCols.includes(c.status) &&
        !c.agent &&
        c.lifecycle === 'idle' &&
        !$exclusions.has(c.node.id) &&
        !hasUnresolvedDeps(c.node.id, $deps, $lifecycle)
      )
      .map(c => ({
        card: c,
        suggestedAgent: $suggestions.get(c.node.id)?.[0] ?? null,
      }))
      .filter((x): x is ClaimCandidate => x.suggestedAgent !== null);
  }
);

// ── Claimed cards count (for UI badge) ──────────────────────────────────────

export const claimedCardCount = derived(kanbanCards, ($cards) =>
  $cards.filter(c => c.lifecycle === 'claimed').length
);

// ── Auto-claim effect (reactive execution) ──────────────────────────────────

let _unsubscribe: (() => void) | null = null;
let _debounceTimer: ReturnType<typeof setTimeout> | null = null;
const DEBOUNCE_MS = 500;

// Max cards to auto-claim per batch (prevents flooding confirm dialog)
const MAX_CLAIM_BATCH = 5;

export function startAutoClaim(): void {
  if (_unsubscribe) return; // already running

  _unsubscribe = claimableCards.subscribe(($claimable) => {
    if ($claimable.length === 0) return;

    if (_debounceTimer) clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(() => {
      // Re-read current state to avoid stale closures
      const current = get(claimableCards).slice(0, MAX_CLAIM_BATCH);
      for (const { card, suggestedAgent } of current) {
        const cardId = card.node.id;
        const agentName = suggestedAgent.agent;
        const command = suggestedAgent.command;
        const title = card.node.label.slice(0, 40);

        addPendingAction(
          'claim',
          cardId,
          title,
          `Assign ${agentName} → enqueue ${command}`,
          () => {
            assignAgent(cardId, agentName as AgentType);
            updateLifecycle(cardId, 'claimed');
            addLog(cardId, 'lifecycle:claimed', {
              agent: agentName,
              reason: suggestedAgent.note,
              auto: true,
            });
            enqueue(cardId, command, '');
          },
        );
      }
    }, DEBOUNCE_MS);
  });
}

export function stopAutoClaim(): void {
  if (_debounceTimer) clearTimeout(_debounceTimer);
  if (_unsubscribe) {
    _unsubscribe();
    _unsubscribe = null;
  }
}

// ── User actions ────────────────────────────────────────────────────────────

export function unclaimCard(cardId: string): void {
  assignAgent(cardId, '' as import('../types').AgentType); // reset agent
  updateLifecycle(cardId, 'idle');
  addLog(cardId, 'lifecycle:idle', { reason: 'user_unclaim' });
}

export function excludeFromAutoClaim(cardId: string): void {
  autoClaimExclusions.update(s => {
    const next = new Set(s);
    next.add(cardId);
    return next;
  });
  unclaimCard(cardId);
}

export function includeInAutoClaim(cardId: string): void {
  autoClaimExclusions.update(s => {
    const next = new Set(s);
    next.delete(cardId);
    return next;
  });
}
