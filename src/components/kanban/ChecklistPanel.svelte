<script lang="ts">
  import { cardChecklists, addChecklistItem, toggleChecklistItem, removeChecklistItem } from '../../lib/stores/kanbanState';
  import type { ChecklistItem } from '../../lib/types';

  // ── Props ─────────────────────────────────────────────────────────────────
  interface Props {
    cardId: string;
  }

  let { cardId }: Props = $props();

  // ── Reactive state bridged from Svelte 4 store ────────────────────────────
  let allChecklists = $state<Record<string, ChecklistItem[]>>({});
  $effect(() => {
    const u = cardChecklists.subscribe(v => { allChecklists = v; });
    return u;
  });

  // ── Derived data ──────────────────────────────────────────────────────────
  let items = $derived(allChecklists[cardId] ?? []);
  let doneCount = $derived(items.filter(i => i.done).length);
  let totalCount = $derived(items.length);
  let progressPct = $derived(totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0);

  // ── Add item input ────────────────────────────────────────────────────────
  let newText = $state('');

  function handleAdd() {
    const trimmed = newText.trim();
    if (!trimmed) return;
    addChecklistItem(cardId, trimmed);
    newText = '';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  }
</script>

<div class="checklist-panel">
  <!-- Progress header -->
  <div class="checklist-header">
    <span class="header-label">Checklist</span>
    <span class="header-count">({doneCount}/{totalCount})</span>
    {#if totalCount > 0}
      <div class="progress-track">
        <div
          class="progress-fill"
          class:progress-complete={progressPct === 100}
          style="width: {progressPct}%"
        ></div>
      </div>
      <span class="progress-pct">{progressPct}%</span>
    {/if}
  </div>

  <!-- Items list -->
  {#if items.length > 0}
    <ul class="checklist-items">
      {#each items as item (item.id)}
        <li class="checklist-item" class:item-done={item.done}>
          <label class="item-label">
            <input
              type="checkbox"
              checked={item.done}
              onchange={() => toggleChecklistItem(cardId, item.id)}
              class="item-checkbox"
            />
            <span class="item-text" class:text-done={item.done}>{item.text}</span>
          </label>
          <button
            class="btn-remove"
            onclick={() => removeChecklistItem(cardId, item.id)}
            title="Remove item"
          >&#x2715;</button>
        </li>
      {/each}
    </ul>
  {:else}
    <div class="empty-hint">No items yet</div>
  {/if}

  <!-- Add item input -->
  <div class="add-row">
    <input
      type="text"
      class="add-input"
      placeholder="Add item..."
      bind:value={newText}
      onkeydown={handleKeydown}
    />
  </div>
</div>

<style>
  /* ── Panel container ───────────────────────────────────────────────────── */
  .checklist-panel {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
  }

  /* ── Header with progress ──────────────────────────────────────────────── */
  .checklist-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 0;
    user-select: none;
  }

  .header-label {
    font-size: 10px;
    font-weight: 700;
    color: #9098a8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .header-count {
    font-size: 10px;
    font-weight: 600;
    color: #555;
  }

  .progress-track {
    flex: 1;
    height: 3px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 2px;
    overflow: hidden;
    min-width: 40px;
  }

  .progress-fill {
    height: 100%;
    background: #00e5ff;
    border-radius: 2px;
    transition: width 0.25s ease;
  }

  .progress-fill.progress-complete {
    background: #00ff88;
  }

  .progress-pct {
    font-size: 9px;
    font-weight: 600;
    color: #555;
    font-variant-numeric: tabular-nums;
    min-width: 28px;
    text-align: right;
  }

  /* ── Items list ────────────────────────────────────────────────────────── */
  .checklist-items {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .checklist-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 4px;
    border-radius: 4px;
    transition: background 0.1s;
  }

  .checklist-item:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .item-label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    flex: 1;
    min-width: 0;
  }

  .item-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    transition: all 0.12s;
  }

  .item-checkbox:checked {
    background: #00e5ff;
    border-color: #00e5ff;
  }

  .item-checkbox:checked::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 3px;
    width: 4px;
    height: 7px;
    border: solid #0d1117;
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);
  }

  .item-checkbox:hover {
    border-color: rgba(0, 229, 255, 0.4);
  }

  .item-text {
    color: #b8c0cc;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-done {
    text-decoration: line-through;
    color: #555;
  }

  .btn-remove {
    background: none;
    border: none;
    color: #333;
    font-size: 9px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 3px;
    font-family: inherit;
    line-height: 1;
    opacity: 0;
    transition: all 0.12s;
    flex-shrink: 0;
  }

  .checklist-item:hover .btn-remove {
    opacity: 1;
  }

  .btn-remove:hover {
    color: #ff5555;
    background: rgba(255, 85, 85, 0.1);
  }

  /* ── Empty hint ────────────────────────────────────────────────────────── */
  .empty-hint {
    font-size: 10px;
    color: #444;
    padding: 4px 4px;
    font-style: italic;
  }

  /* ── Add item row ──────────────────────────────────────────────────────── */
  .add-row {
    padding-top: 2px;
  }

  .add-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 11px;
    font-family: inherit;
    color: #b8c0cc;
    outline: none;
    transition: border-color 0.12s;
    box-sizing: border-box;
  }

  .add-input::placeholder {
    color: #444;
  }

  .add-input:focus {
    border-color: rgba(0, 229, 255, 0.3);
  }
</style>
