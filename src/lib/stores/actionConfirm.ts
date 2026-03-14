/**
 * actionConfirm.ts — Pending action confirmation system.
 *
 * Collects automated actions (auto-claim, queue launch, pipeline advance)
 * into a pending list. User must confirm before execution.
 * Respects autoConfirm config — auto-confirmed actions execute immediately.
 */

import { writable, get } from 'svelte/store';
import { kanbanConfig } from './kanbanConfig';

// ── Types ────────────────────────────────────────────────────────────────────

export type ActionType = 'claim' | 'launch' | 'advance';

export interface PendingAction {
  id: string;
  type: ActionType;
  cardId: string;
  cardTitle: string;
  description: string;
  checked: boolean;
  /** Callback to execute when confirmed */
  execute: () => void | Promise<void>;
  createdAt: number;
}

// ── Store ────────────────────────────────────────────────────────────────────

export const pendingActions = writable<PendingAction[]>([]);

/** Whether the confirmation dialog is open */
export const confirmDialogOpen = writable<boolean>(false);

// ── Helpers ──────────────────────────────────────────────────────────────────

let _actionCounter = 0;

/** Check if an action type should auto-confirm (skip dialog) */
function shouldAutoConfirm(type: ActionType): boolean {
  const cfg = get(kanbanConfig).autoConfirm;
  if (type === 'claim') return cfg.claimAutoConfirm;
  if (type === 'launch') return cfg.launchAutoConfirm;
  if (type === 'advance') return cfg.advanceAutoConfirm;
  return false;
}

/**
 * Add an action to the pending list and open the dialog.
 * If autoConfirm is enabled for this action type, execute immediately.
 * Dedup: skips if an action with the same cardId+type already exists.
 */
export function addPendingAction(
  type: ActionType,
  cardId: string,
  cardTitle: string,
  description: string,
  execute: () => void | Promise<void>,
): void {
  const $pending = get(pendingActions);

  // Dedup
  if ($pending.some(a => a.cardId === cardId && a.type === type)) return;

  // Auto-confirm: execute immediately without dialog
  if (shouldAutoConfirm(type)) {
    try { execute(); } catch { /* best-effort */ }
    return;
  }

  const action: PendingAction = {
    id: `action-${++_actionCounter}`,
    type,
    cardId,
    cardTitle,
    description,
    checked: true, // checked by default
    execute,
    createdAt: Date.now(),
  };

  pendingActions.update(list => [...list, action]);
  confirmDialogOpen.set(true);
}

/**
 * Toggle checked state for a single action.
 */
export function toggleAction(actionId: string): void {
  pendingActions.update(list =>
    list.map(a => a.id === actionId ? { ...a, checked: !a.checked } : a)
  );
}

/**
 * Set all actions to checked or unchecked.
 */
export function toggleAll(checked: boolean): void {
  pendingActions.update(list =>
    list.map(a => ({ ...a, checked }))
  );
}

/**
 * Confirm and execute all checked actions, then remove them.
 */
export async function confirmChecked(): Promise<void> {
  const $pending = get(pendingActions);
  const toExecute = $pending.filter(a => a.checked);
  const remaining = $pending.filter(a => !a.checked);

  // Execute all checked
  for (const action of toExecute) {
    try {
      await action.execute();
    } catch {
      // best-effort
    }
  }

  pendingActions.set(remaining);
  if (remaining.length === 0) {
    confirmDialogOpen.set(false);
  }
}

/**
 * Confirm and execute ALL actions regardless of checked state.
 */
export async function confirmAll(): Promise<void> {
  const $pending = get(pendingActions);

  for (const action of $pending) {
    try {
      await action.execute();
    } catch {
      // best-effort
    }
  }

  pendingActions.set([]);
  confirmDialogOpen.set(false);
}

/**
 * Dismiss all pending actions without executing.
 */
export function dismissAll(): void {
  pendingActions.set([]);
  confirmDialogOpen.set(false);
}

/**
 * Remove a single action without executing.
 */
export function removeAction(actionId: string): void {
  pendingActions.update(list => {
    const next = list.filter(a => a.id !== actionId);
    if (next.length === 0) confirmDialogOpen.set(false);
    return next;
  });
}
