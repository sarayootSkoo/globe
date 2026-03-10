<script lang="ts">
  import { currentMode, selectedNodeId } from '../../lib/stores/appState';
  import { graphNodes } from '../../lib/stores/graphData';
  import { impactNodeId, impactHops, impactResults } from '../../lib/stores/impactState';
  import { CATEGORIES } from '../../lib/constants';
  import type { GraphNode } from '../../lib/types';

  let mode = $state<string>('explore');
  let nodeId = $state<string | null>(null);
  let hops = $state<number>(1);
  let nodes = $state<GraphNode[]>([]);
  let results = $state<Map<string, { node: GraphNode; hop: number }>>(new Map());

  $effect(() => {
    const unsub = currentMode.subscribe(v => { mode = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = impactNodeId.subscribe(v => { nodeId = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = impactHops.subscribe(v => { hops = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = graphNodes.subscribe(v => { nodes = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = impactResults.subscribe(v => { results = v; });
    return unsub;
  });

  let show = $derived(mode === 'impact' && nodeId !== null);

  let sourceNode = $derived(nodeId ? nodes.find(n => n.id === nodeId) ?? null : null);
  let sourceCat = $derived(sourceNode ? (CATEGORIES[sourceNode.cat] ?? CATEGORIES['meta']) : null);

  /** Results grouped by category key. */
  let grouped = $derived((): Map<string, Array<{ node: GraphNode; hop: number }>> => {
    const map = new Map<string, Array<{ node: GraphNode; hop: number }>>();
    results.forEach(({ node, hop }) => {
      const cat = node.cat || 'meta';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push({ node, hop });
    });
    // Sort each group: hop 1 before hop 2, then alphabetically
    map.forEach(arr => {
      arr.sort((a, b) => {
        if (a.hop !== b.hop) return a.hop - b.hop;
        return a.node.label.localeCompare(b.node.label);
      });
    });
    return map;
  });

  let totalCount = $derived(results.size);

  function toggleHops(): void {
    impactHops.update(h => (h === 1 ? 2 : 1));
  }

  function closePanel(): void {
    currentMode.set('explore');
    impactNodeId.set(null);
  }

  function selectResultNode(n: GraphNode): void {
    selectedNodeId.set(n.id);
    // Dispatch fly-to event so GlobeCanvas can focus the node
    document.dispatchEvent(new CustomEvent('kg:flyto', { detail: { nodeId: n.id } }));
  }
</script>

<div class="panel" id="impact-panel" class:show={show}>
  <div class="panel-title">Impact Analysis</div>

  {#if sourceNode && sourceCat}
    <div class="impact-source">
      <div class="impact-source-dot" style="background:{sourceCat.color};box-shadow:0 0 5px {sourceCat.color}"></div>
      <span class="impact-source-label" style="color:{sourceCat.color}">{sourceNode.label}</span>
    </div>

    <div class="impact-controls">
      <button
        class="hop-btn"
        class:active={hops === 1}
        onclick={() => impactHops.set(1)}
      >
        1-Hop
      </button>
      <button
        class="hop-btn"
        class:active={hops === 2}
        onclick={() => impactHops.set(2)}
      >
        2-Hop
      </button>
      <button class="close-btn" onclick={closePanel}>✕ Exit</button>
    </div>

    <div class="impact-summary">
      {totalCount} affected node{totalCount === 1 ? '' : 's'}
    </div>

    {#if totalCount === 0}
      <div class="none-label">No connected nodes found.</div>
    {:else}
      <div class="impact-list">
        {#each Array.from(grouped().entries()) as [catKey, items]}
          {@const cat = CATEGORIES[catKey] ?? CATEGORIES['meta']}
          <div class="impact-cat-header" style="color:{cat.color}">{cat.label}</div>
          {#each items as item}
            <div
              class="impact-item"
              onclick={() => selectResultNode(item.node)}
              role="button"
              tabindex="0"
              onkeydown={(e) => e.key === 'Enter' && selectResultNode(item.node)}
            >
              <div
                class="impact-item-dot"
                style="background:{cat.color};box-shadow:0 0 3px {cat.color}"
              ></div>
              <span class="impact-item-label">{item.node.label}</span>
              <span
                class="hop-badge"
                class:hop1={item.hop === 1}
                class:hop2={item.hop === 2}
              >
                {item.hop}H
              </span>
            </div>
          {/each}
        {/each}
      </div>
    {/if}
  {/if}
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
  #impact-panel {
    top: 280px;
    right: 16px;
    width: 280px;
    max-height: calc(100vh - 360px);
    overflow-y: auto;
    display: none;
  }
  #impact-panel.show {
    display: block;
  }

  /* ── Source node row ─────────────────────────────── */
  .impact-source {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
  }
  .impact-source-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .impact-source-label {
    font-size: 12px;
    font-weight: bold;
    word-break: break-word;
  }

  /* ── Hop toggle + close row ───────────────────────── */
  .impact-controls {
    display: flex;
    gap: 5px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .hop-btn {
    padding: 4px 10px;
    background: rgba(0, 212, 255, 0.06);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 3px;
    font-size: 10px;
    color: var(--text-dim);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
  }
  .hop-btn:hover {
    background: rgba(0, 212, 255, 0.12);
    border-color: var(--accent);
    color: var(--accent);
  }
  .hop-btn.active {
    background: rgba(0, 212, 255, 0.15);
    border-color: var(--accent);
    color: var(--accent);
  }
  .close-btn {
    padding: 4px 10px;
    background: rgba(255, 80, 80, 0.06);
    border: 1px solid rgba(255, 80, 80, 0.2);
    border-radius: 3px;
    font-size: 10px;
    color: var(--red, #ff5050);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
    margin-left: auto;
  }
  .close-btn:hover {
    background: rgba(255, 80, 80, 0.14);
    border-color: var(--red, #ff5050);
  }

  /* ── Summary ─────────────────────────────────────── */
  .impact-summary {
    font-size: 10px;
    color: var(--text-dim);
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }

  /* ── List ────────────────────────────────────────── */
  .impact-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .impact-cat-header {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin: 8px 0 3px;
    opacity: 0.8;
  }
  .impact-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 2px;
    font-size: 11px;
    color: var(--text-dim);
    cursor: pointer;
    border-radius: 2px;
    transition: background 0.15s, color 0.15s;
  }
  .impact-item:hover {
    background: rgba(255, 255, 255, 0.04);
    color: var(--accent);
  }
  .impact-item-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .impact-item-label {
    flex: 1;
    word-break: break-word;
  }

  /* ── Hop badge ───────────────────────────────────── */
  .hop-badge {
    font-size: 9px;
    font-weight: bold;
    padding: 1px 5px;
    border-radius: 8px;
    flex-shrink: 0;
    letter-spacing: 0.5px;
  }
  .hop-badge.hop1 {
    background: rgba(0, 212, 255, 0.15);
    border: 1px solid rgba(0, 212, 255, 0.4);
    color: var(--accent);
  }
  .hop-badge.hop2 {
    background: rgba(255, 165, 0, 0.12);
    border: 1px solid rgba(255, 165, 0, 0.35);
    color: #ffaa33;
  }

  .none-label {
    font-size: 10px;
    color: var(--text-dim);
  }
</style>
