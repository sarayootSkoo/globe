<script lang="ts">
  import { CATEGORIES } from '../../lib/constants';
  import { graphNodes } from '../../lib/stores/graphData';
  import { activeCats } from '../../lib/stores/appState';
  import type { GraphNode } from '../../lib/types';

  let nodes = $state<GraphNode[]>([]);
  let active = $state<Set<string>>(new Set(Object.keys(CATEGORIES)));

  $effect(() => {
    const unsub = graphNodes.subscribe(v => { nodes = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = activeCats.subscribe(v => { active = v; });
    return unsub;
  });

  function countForCat(key: string): number {
    return nodes.filter(n => n.cat === key).length;
  }

  function toggleCat(key: string): void {
    activeCats.update(set => {
      const next = new Set(set);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }
</script>

<div class="panel" id="legend">
  <div class="panel-title">Categories</div>
  {#each Object.entries(CATEGORIES) as [key, cat]}
    <div
      class="legend-item"
      class:dimmed={!active.has(key)}
      onclick={() => toggleCat(key)}
      role="button"
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && toggleCat(key)}
    >
      <div class="legend-dot" style="background:{cat.color};box-shadow:0 0 5px {cat.color}"></div>
      <span>{cat.label}</span>
      <span class="legend-count">{countForCat(key)}</span>
    </div>
  {/each}
</div>

<style>
  .panel {
    position: fixed;
    z-index: 20;
    background: var(--panel-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 14px 16px;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.05);
    transition: border-color 0.3s;
  }
  .panel:hover {
    border-color: var(--border-hi);
  }
  .panel-title {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    border-bottom: 1px solid var(--border);
    padding-bottom: 7px;
    margin-bottom: 10px;
  }
  #legend {
    top: 20px;
    right: 16px;
    min-width: 195px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 6px;
    font-size: 11px;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
    padding: 2px 4px;
    border-radius: 3px;
  }
  .legend-item:hover {
    color: var(--text);
    background: rgba(255, 255, 255, 0.03);
  }
  .legend-item.dimmed {
    opacity: 0.2;
  }
  .legend-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .legend-count {
    margin-left: auto;
    font-size: 10px;
    opacity: 0.6;
  }
</style>
