<script lang="ts">
  import { CATEGORIES } from '../../lib/constants';
  import type { KanbanCard } from '../../lib/types';
  import type { Snippet } from 'svelte';

  let {
    projectId,
    cards,
    collapsed = false,
    ontoggle,
    children,
  }: {
    projectId: string;
    cards: KanbanCard[];
    collapsed: boolean;
    ontoggle: () => void;
    children?: Snippet;
  } = $props();

  let cat = $derived(CATEGORIES[projectId]);
  let dotColor = $derived(cat?.color ?? '#888');
  let label = $derived(cat?.label ?? projectId);
  let count = $derived(cards.length);
</script>

<div class="swim-lane">
  <button class="lane-header" onclick={ontoggle}>
    <span class="chevron" class:collapsed>{collapsed ? '▸' : '▾'}</span>
    <span class="dot" style="background:{dotColor}"></span>
    <span class="label">{label}</span>
    <span class="count">{count}</span>
  </button>

  {#if !collapsed}
    <div class="lane-body">
      {#if children}
        {@render children()}
      {/if}
    </div>
  {/if}
</div>

<style>
  .swim-lane {
    margin-bottom: 2px;
  }

  .lane-header {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 4px 6px;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
    font-size: 10px;
    font-family: inherit;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    border-radius: 3px 3px 0 0;
    transition: background 0.15s;
  }

  .lane-header:hover {
    background: rgba(255, 255, 255, 0.07);
  }

  .chevron {
    font-size: 9px;
    width: 10px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
    transition: transform 0.15s;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .label {
    font-weight: 600;
    letter-spacing: 0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .count {
    margin-left: auto;
    font-size: 9px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.06);
    padding: 1px 5px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .lane-body {
    padding: 2px 0;
  }
</style>
