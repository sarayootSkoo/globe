<script lang="ts">
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { showCrossRepo, crossRepoFilter } from '../../lib/stores/crossRepoState';
  import { CATEGORIES } from '../../lib/constants';
  import type { GraphNode, GraphLink } from '../../lib/types';

  // ── Props ──────────────────────────────────────────────────────────────────
  interface Props {
    visible: boolean;
    onclose?: () => void;
  }
  let { visible, onclose }: Props = $props();

  // ── Local state mirroring stores ─────────────────────────────────────────
  let nodes = $state<GraphNode[]>([]);
  let links = $state<GraphLink[]>([]);
  let crossRepoOn = $state(false);
  let activeFilter = $state<string | null>(null);

  $effect(() => {
    const unsubNodes = graphNodes.subscribe(v => { nodes = v; });
    const unsubLinks = graphLinks.subscribe(v => { links = v; });
    const unsubCR    = showCrossRepo.subscribe(v => { crossRepoOn = v; });
    const unsubFilt  = crossRepoFilter.subscribe(v => { activeFilter = v; });
    return () => { unsubNodes(); unsubLinks(); unsubCR(); unsubFilt(); };
  });

  // ── Cross-repo link analysis ──────────────────────────────────────────────

  /** Build a nodeId → cat map for quick lookups. */
  let nodeById = $derived(new Map<string, GraphNode>(nodes.map(n => [n.id, n])));

  /** All links that cross category boundaries. */
  let crossRepoLinks = $derived(
    links.filter(l => {
      const sid = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tid = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      const sn  = nodeById.get(sid);
      const tn  = nodeById.get(tid);
      return sn && tn && sn.cat !== tn.cat;
    })
  );

  /** Total cross-repo link count. */
  let totalCrossRepo = $derived(crossRepoLinks.length);

  /**
   * Dependency matrix: Map of "srcCat→tgtCat" → { count, direction }.
   * Pairs are stored canonically so we can show both directions.
   */
  let matrix = $derived((): Array<{ key: string; srcCat: string; tgtCat: string; count: number; direction: string }> => {
    const pairMap = new Map<string, { srcCat: string; tgtCat: string; count: number; direction: string }>();

    for (const l of crossRepoLinks) {
      const sid = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tid = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      const sn  = nodeById.get(sid);
      const tn  = nodeById.get(tid);
      if (!sn || !tn) continue;

      const dir = l.direction ?? 'bidirectional';
      // Use the link's own direction to determine display pair key
      // forward / bidirectional: srcCat → tgtCat
      // backward: flip tgtCat → srcCat
      let displaySrc = sn.cat;
      let displayTgt = tn.cat;
      if (dir === 'backward') {
        displaySrc = tn.cat;
        displayTgt = sn.cat;
      }

      const key = `${displaySrc}\u2192${displayTgt}`;
      const existing = pairMap.get(key);
      if (existing) {
        existing.count++;
      } else {
        pairMap.set(key, { srcCat: displaySrc, tgtCat: displayTgt, count: 1, direction: dir, key });
      }
    }

    return Array.from(pairMap.values()).sort((a, b) => b.count - a.count);
  });

  // ── Actions ───────────────────────────────────────────────────────────────

  function toggleCrossRepo(): void {
    showCrossRepo.update(v => !v);
    if (crossRepoOn) {
      // Turning off — also clear filter
      crossRepoFilter.set(null);
    }
  }

  function selectPair(key: string): void {
    if (activeFilter === key) {
      crossRepoFilter.set(null);
    } else {
      crossRepoFilter.set(key);
      showCrossRepo.set(true);
    }
  }

  function closePanel(): void {
    showCrossRepo.set(false);
    crossRepoFilter.set(null);
    onclose?.();
  }

  // ── Category colour helper ────────────────────────────────────────────────
  function catColor(cat: string): string {
    return (CATEGORIES[cat] ?? CATEGORIES['meta'])?.color ?? '#888';
  }
</script>

{#if visible}
<div class="panel" id="cross-repo-panel">
  <div class="panel-title">Cross-Repo Dependencies</div>

  <!-- Toggle + close row -->
  <div class="cr-controls">
    <button
      class="hop-btn"
      class:active={crossRepoOn}
      onclick={toggleCrossRepo}
      title="Toggle cross-repo highlight on globe"
    >
      {crossRepoOn ? 'Highlight ON' : 'Highlight OFF'}
    </button>
    <button class="close-btn" onclick={closePanel}>✕ Exit</button>
  </div>

  <!-- Summary -->
  <div class="cr-summary">
    {totalCrossRepo} cross-repo link{totalCrossRepo === 1 ? '' : 's'} total
    {#if activeFilter}
      &nbsp;&middot;&nbsp;<span class="filter-active">filter: {activeFilter}</span>
    {/if}
  </div>

  <!-- Dependency matrix -->
  {#if matrix().length === 0}
    <div class="none-label">No cross-repo links found.</div>
  {:else}
    <div class="matrix-header">Repo Pairs</div>
    <div class="matrix-list">
      {#each matrix() as row}
        {@const srcC = catColor(row.srcCat)}
        {@const tgtC = catColor(row.tgtCat)}
        <div
          class="matrix-row"
          class:selected={activeFilter === row.key}
          onclick={() => selectPair(row.key)}
          role="button"
          tabindex="0"
          onkeydown={(e) => e.key === 'Enter' && selectPair(row.key)}
          title="Click to filter graph to this pair"
        >
          <!-- Source cat label -->
          <span class="cat-badge" style="color:{srcC};border-color:{srcC}40">
            {(CATEGORIES[row.srcCat] ?? CATEGORIES['meta'])?.label ?? row.srcCat}
          </span>

          <!-- Arrow -->
          <span class="arrow" title={row.direction}>
            {#if row.direction === 'bidirectional'}
              &#8644;
            {:else}
              &rarr;
            {/if}
          </span>

          <!-- Target cat label -->
          <span class="cat-badge" style="color:{tgtC};border-color:{tgtC}40">
            {(CATEGORIES[row.tgtCat] ?? CATEGORIES['meta'])?.label ?? row.tgtCat}
          </span>

          <!-- Link count -->
          <span class="link-count">{row.count}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
{/if}

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
  #cross-repo-panel {
    top: 280px;
    right: 16px;
    width: 290px;
    max-height: calc(100vh - 360px);
    overflow-y: auto;
  }

  /* ── Controls row ─────────────────────────────────── */
  .cr-controls {
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
  .cr-summary {
    font-size: 10px;
    color: var(--text-dim);
    margin-bottom: 8px;
    letter-spacing: 0.5px;
  }
  .filter-active {
    color: var(--accent);
    font-style: italic;
  }

  /* ── Matrix ──────────────────────────────────────── */
  .matrix-header {
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 4px;
    opacity: 0.8;
  }
  .matrix-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .matrix-row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 4px;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.15s;
    border: 1px solid transparent;
  }
  .matrix-row:hover {
    background: rgba(255, 255, 255, 0.04);
  }
  .matrix-row.selected {
    background: rgba(0, 212, 255, 0.06);
    border-color: rgba(0, 212, 255, 0.2);
  }
  .cat-badge {
    font-size: 9px;
    font-weight: bold;
    letter-spacing: 0.3px;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid;
    white-space: nowrap;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .arrow {
    font-size: 12px;
    color: var(--text-dim);
    opacity: 0.7;
    flex-shrink: 0;
  }
  .link-count {
    margin-left: auto;
    font-size: 11px;
    font-weight: bold;
    color: var(--accent);
    flex-shrink: 0;
    min-width: 18px;
    text-align: right;
  }

  .none-label {
    font-size: 10px;
    color: var(--text-dim);
  }
</style>
