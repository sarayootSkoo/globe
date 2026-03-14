<script lang="ts">
  import { kanbanCards, addCardRef } from '../../lib/stores/kanbanState';
  import { CATEGORIES } from '../../lib/constants';
  import type { CardRefType, CardRef, KanbanCard } from '../../lib/types';

  let { cardId, onclose }: { cardId: string; onclose: () => void } = $props();

  let searchQuery = $state('');
  let selectedType = $state<CardRefType>('relates-to');
  let note = $state('');
  let allCards = $state<KanbanCard[]>([]);

  // Subscribe to kanbanCards store
  $effect(() => {
    const unsub = kanbanCards.subscribe(cards => {
      allCards = cards;
    });
    return unsub;
  });

  // Exclude current card and filter by search query
  let filteredCards = $derived(() => {
    const available = allCards.filter(c => c.node.id !== cardId);
    if (!searchQuery.trim()) return available.slice(0, 10);
    const q = searchQuery.toLowerCase();
    return available
      .filter(c => c.node.label.toLowerCase().includes(q))
      .slice(0, 10);
  });

  function getCatColor(cat: string): string {
    return CATEGORIES[cat]?.color ?? '#555';
  }

  function handleAdd(targetId: string) {
    const ref: CardRef = {
      targetId,
      type: selectedType,
      createdAt: Date.now(),
      note: note.trim() || undefined,
    };
    addCardRef(cardId, ref);
    // Reset for next pick
    searchQuery = '';
    note = '';
  }
</script>

<div class="ref-overlay" onclick={onclose}>
  <div class="ref-dialog" onclick={(e) => e.stopPropagation()}>
    <!-- Header -->
    <div class="ref-header">
      <span class="ref-title">ADD REFERENCE</span>
      <button class="close-btn" onclick={onclose}>&times;</button>
    </div>

    <!-- Ref type selector -->
    <div class="ref-section">
      <label class="ref-label">Reference Type</label>
      <select class="ref-select" bind:value={selectedType}>
        <option value="relates-to">relates-to</option>
        <option value="duplicates">duplicates</option>
        <option value="parent-of">parent-of</option>
        <option value="child-of">child-of</option>
      </select>
    </div>

    <!-- Search input -->
    <div class="ref-section">
      <label class="ref-label">Search Cards</label>
      <input
        class="ref-input"
        type="text"
        placeholder="Filter by title..."
        bind:value={searchQuery}
      />
    </div>

    <!-- Results list -->
    <div class="ref-results">
      {#each filteredCards() as card (card.node.id)}
        <button class="ref-result-row" onclick={() => handleAdd(card.node.id)}>
          <span class="cat-dot" style="background: {getCatColor(card.node.cat)}"></span>
          <span class="ref-result-title">{card.node.label}</span>
          <span class="cat-badge" style="color: {getCatColor(card.node.cat)}; border-color: {getCatColor(card.node.cat)}">{card.node.cat}</span>
        </button>
      {:else}
        <div class="ref-empty">No cards found</div>
      {/each}
    </div>

    <!-- Optional note -->
    <div class="ref-section">
      <label class="ref-label">Note (optional)</label>
      <input
        class="ref-input"
        type="text"
        placeholder="Add a note..."
        bind:value={note}
      />
    </div>

    <!-- Footer -->
    <div class="ref-footer">
      <button class="btn btn-cancel" onclick={onclose}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .ref-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
    animation: fade-in 0.12s ease-out;
  }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

  .ref-dialog {
    background: #161922;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    width: 480px; max-width: 95vw;
    max-height: 80vh;
    display: flex; flex-direction: column;
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 12px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.6);
  }

  .ref-header {
    display: flex; align-items: center; gap: 8px;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .ref-title {
    font-size: 12px; font-weight: 700; color: #e0e0e0;
    letter-spacing: 0.1em; flex: 1;
  }
  .close-btn {
    background: none; border: none; color: #555; font-size: 16px;
    cursor: pointer; padding: 2px 6px; border-radius: 4px;
    font-family: inherit; line-height: 1;
  }
  .close-btn:hover { color: #ff5555; background: rgba(255,85,85,0.1); }

  .ref-section {
    padding: 10px 16px;
  }
  .ref-label {
    display: block; font-size: 10px; font-weight: 700; color: #666;
    letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 6px;
  }
  .ref-input {
    width: 100%; box-sizing: border-box;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 7px 10px;
    color: #ccc; font-size: 12px; font-family: inherit;
    outline: none;
  }
  .ref-input:focus { border-color: rgba(0,229,255,0.3); }
  .ref-input::placeholder { color: #444; }

  .ref-select {
    width: 100%; box-sizing: border-box;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 7px 10px;
    color: #ccc; font-size: 12px; font-family: inherit;
    outline: none; cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='%23666'%3E%3Cpath d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }
  .ref-select:focus { border-color: rgba(0,229,255,0.3); }
  .ref-select option { background: #161922; color: #ccc; }

  .ref-results {
    flex: 1; overflow-y: auto;
    padding: 4px 16px;
    max-height: 280px;
    display: flex; flex-direction: column; gap: 2px;
  }

  .ref-result-row {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 10px; border-radius: 6px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    cursor: pointer; text-align: left;
    font-family: inherit; font-size: 12px; color: #ccc;
    transition: all 0.1s;
    width: 100%; box-sizing: border-box;
  }
  .ref-result-row:hover {
    background: rgba(0,229,255,0.06);
    border-color: rgba(0,229,255,0.15);
  }

  .cat-dot {
    width: 8px; height: 8px; border-radius: 50%;
    flex-shrink: 0;
  }

  .ref-result-title {
    flex: 1; overflow: hidden; text-overflow: ellipsis;
    white-space: nowrap; font-size: 12px;
  }

  .cat-badge {
    font-size: 9px; font-weight: 700; padding: 2px 6px;
    border-radius: 4px; letter-spacing: 0.04em;
    border: 1px solid; flex-shrink: 0;
    opacity: 0.7;
  }

  .ref-empty {
    padding: 20px 0; text-align: center;
    color: #444; font-size: 11px;
  }

  .ref-footer {
    display: flex; gap: 8px; padding: 12px 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
    justify-content: flex-end;
  }

  .btn {
    font-size: 11px; font-weight: 600; font-family: inherit;
    padding: 6px 14px; border-radius: 6px; cursor: pointer;
    letter-spacing: 0.04em; border: 1px solid;
    transition: all 0.12s;
  }
  .btn-cancel {
    background: rgba(255,255,255,0.05); color: #aaa;
    border-color: rgba(255,255,255,0.1);
  }
  .btn-cancel:hover { background: rgba(255,255,255,0.1); color: #e0e0e0; }
</style>
