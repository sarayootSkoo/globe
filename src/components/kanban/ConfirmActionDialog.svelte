<script lang="ts">
  import {
    pendingActions, confirmDialogOpen,
    toggleAction, toggleAll, confirmChecked, confirmAll, dismissAll, removeAction,
    type PendingAction,
  } from '../../lib/stores/actionConfirm';

  let open = $state(false);
  let actions = $state<PendingAction[]>([]);

  $effect(() => {
    const u = confirmDialogOpen.subscribe(v => { open = v; });
    return u;
  });

  $effect(() => {
    const u = pendingActions.subscribe(v => { actions = v; });
    return u;
  });

  let allChecked = $derived(actions.length > 0 && actions.every(a => a.checked));
  let someChecked = $derived(actions.some(a => a.checked));
  let checkedCount = $derived(actions.filter(a => a.checked).length);

  const TYPE_LABEL: Record<string, { label: string; color: string; icon: string }> = {
    claim:   { label: 'CLAIM',   color: '#00e5ff', icon: '\u{1F680}' },
    launch:  { label: 'LAUNCH',  color: '#00ff88', icon: '\u{25B6}'  },
    advance: { label: 'ADVANCE', color: '#a78bfa', icon: '\u{27A1}'  },
  };

  function handleToggleAll() {
    toggleAll(!allChecked);
  }

  async function handleConfirmChecked() {
    await confirmChecked();
  }

  async function handleConfirmAll() {
    await confirmAll();
  }
</script>

{#if open && actions.length > 0}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="backdrop" onclick={dismissAll}></div>

  <div class="confirm-dialog">
    <!-- Header -->
    <div class="dialog-header">
      <div class="header-left">
        <span class="header-icon">&#x26A0;</span>
        <span class="header-title">CONFIRM ACTIONS</span>
        <span class="count-badge">{actions.length}</span>
      </div>
      <button class="btn-close" onclick={dismissAll} title="Dismiss all">&#x2715;</button>
    </div>

    <!-- Select all bar -->
    <div class="select-bar">
      <label class="select-all-label">
        <input
          type="checkbox"
          checked={allChecked}
          onchange={handleToggleAll}
          class="cb"
        />
        <span class="select-all-text">
          {allChecked ? 'Deselect All' : 'Select All'}
        </span>
      </label>
      <span class="selected-count">{checkedCount}/{actions.length} selected</span>
    </div>

    <!-- Action list -->
    <div class="action-list">
      {#each actions as action (action.id)}
        {@const t = TYPE_LABEL[action.type] ?? { label: action.type, color: '#888', icon: '?' }}
        <div class="action-item" class:item-unchecked={!action.checked}>
          <label class="action-label">
            <input
              type="checkbox"
              checked={action.checked}
              onchange={() => toggleAction(action.id)}
              class="cb"
            />
            <span class="action-type-badge" style="color: {t.color}; border-color: {t.color}40; background: {t.color}10">
              {t.icon} {t.label}
            </span>
            <div class="action-info">
              <span class="action-card-title">{action.cardTitle}</span>
              <span class="action-desc">{action.description}</span>
            </div>
          </label>
          <button
            class="btn-remove"
            onclick={() => removeAction(action.id)}
            title="Remove this action"
          >&#x2715;</button>
        </div>
      {/each}
    </div>

    <!-- Footer -->
    <div class="dialog-footer">
      <button class="btn btn-dismiss" onclick={dismissAll}>
        Hold All
      </button>
      <div class="footer-right">
        <button
          class="btn btn-confirm-selected"
          disabled={!someChecked}
          onclick={handleConfirmChecked}
        >
          Confirm Selected ({checkedCount})
        </button>
        <button
          class="btn btn-confirm-all"
          onclick={handleConfirmAll}
        >
          Confirm All
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 299;
    background: rgba(0, 0, 0, 0.4);
  }

  .confirm-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 300;
    width: 540px;
    max-width: calc(100vw - 40px);
    max-height: calc(100vh - 80px);
    background: #0d1117;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    font-family: 'JetBrains Mono', monospace;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 170, 0, 0.12);
    animation: dialog-in 0.15s ease-out;
    overflow: hidden;
  }

  @keyframes dialog-in {
    from { opacity: 0; transform: translate(-50%, -48%); }
    to   { opacity: 1; transform: translate(-50%, -50%); }
  }

  /* ── Header ─────────────────────────────────────────────────────── */
  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #161922;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-icon {
    font-size: 12px;
    color: #ffaa00;
  }

  .header-title {
    font-size: 10px;
    font-weight: 700;
    color: #9098a8;
    letter-spacing: 0.1em;
  }

  .count-badge {
    background: #ffaa00;
    color: #0d1117;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
  }

  .btn-close {
    background: none;
    border: none;
    color: #555;
    font-size: 14px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    transition: all 0.12s;
    font-family: inherit;
    line-height: 1;
  }
  .btn-close:hover {
    color: #ccc;
    background: rgba(255, 255, 255, 0.06);
  }

  /* ── Select bar ─────────────────────────────────────────────────── */
  .select-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 14px;
    background: rgba(22, 25, 34, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    flex-shrink: 0;
  }

  .select-all-label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none;
  }

  .select-all-text {
    font-size: 10px;
    color: #9098a8;
    font-weight: 600;
  }

  .selected-count {
    font-size: 9px;
    color: #555;
  }

  .cb {
    accent-color: #00e5ff;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  /* ── Action list ────────────────────────────────────────────────── */
  .action-list {
    flex: 1;
    overflow-y: auto;
    padding: 4px 0;
    max-height: 360px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
  }
  .action-list::-webkit-scrollbar {
    width: 5px;
  }
  .action-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 3px;
  }

  .action-item {
    display: flex;
    align-items: center;
    padding: 6px 14px;
    gap: 8px;
    transition: background 0.1s, opacity 0.15s;
    border-left: 2px solid transparent;
  }
  .action-item:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  .action-item.item-unchecked {
    opacity: 0.45;
  }

  .action-label {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
    cursor: pointer;
    user-select: none;
  }

  .action-type-badge {
    font-size: 8px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid;
    letter-spacing: 0.06em;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .action-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
  }

  .action-card-title {
    font-size: 11px;
    font-weight: 600;
    color: #b8c0cc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .action-desc {
    font-size: 9px;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn-remove {
    background: none;
    border: none;
    color: #444;
    font-size: 10px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 3px;
    transition: all 0.12s;
    font-family: inherit;
    flex-shrink: 0;
  }
  .btn-remove:hover {
    color: #ff5555;
    background: rgba(255, 85, 85, 0.08);
  }

  /* ── Footer ─────────────────────────────────────────────────────── */
  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #161922;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  .footer-right {
    display: flex;
    gap: 6px;
  }

  .btn {
    border-radius: 5px;
    padding: 5px 12px;
    font-size: 10px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.12s;
    letter-spacing: 0.03em;
  }

  .btn-dismiss {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #9098a8;
  }
  .btn-dismiss:hover {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.3);
    background: rgba(255, 85, 85, 0.06);
  }

  .btn-confirm-selected {
    background: rgba(0, 229, 255, 0.08);
    border: 1px solid rgba(0, 229, 255, 0.3);
    color: #00e5ff;
  }
  .btn-confirm-selected:hover:not(:disabled) {
    background: rgba(0, 229, 255, 0.15);
    border-color: rgba(0, 229, 255, 0.5);
  }
  .btn-confirm-selected:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .btn-confirm-all {
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid rgba(0, 255, 136, 0.3);
    color: #00ff88;
  }
  .btn-confirm-all:hover {
    background: rgba(0, 255, 136, 0.2);
    border-color: rgba(0, 255, 136, 0.5);
    box-shadow: 0 0 8px rgba(0, 255, 136, 0.15);
  }
</style>
