<script lang="ts">
  import { searchQuery, searchScored, searchMatched } from '../../lib/stores/searchState';
  import { graphNodes } from '../../lib/stores/graphData';
  import { showPreview } from '../../lib/stores/previewState';
  import { selectedNodeId } from '../../lib/stores/appState';
  import { CATEGORIES } from '../../lib/constants';
  import type { ScoredResult, GraphNode } from '../../lib/types';

  // ── Store subscriptions ───────────────────────────────────────────────────
  let scored = $state<ScoredResult[]>([]);
  let nodes = $state<GraphNode[]>([]);
  let query = $state('');

  $effect(() => {
    const u1 = searchScored.subscribe((v) => { scored = v; });
    const u2 = graphNodes.subscribe((v) => { nodes = v; });
    const u3 = searchQuery.subscribe((v) => { query = v; });
    return () => { u1(); u2(); u3(); };
  });

  // ── Visibility with 800 ms delay after query changes ─────────────────────
  let visible = $state(false);
  let showTimer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    // Track query — when it changes cancel pending timer and reschedule
    const _q = query;
    const _s = scored;

    if (showTimer !== null) {
      clearTimeout(showTimer);
      showTimer = null;
    }

    // Collapse immediately on clear
    if (!_q.trim()) {
      visible = false;
      return;
    }

    // Hide, then show after fly animation completes (~800 ms)
    visible = false;
    showTimer = setTimeout(() => {
      visible = true;
      showTimer = null;

      // Animate progress bars 50 ms after the panel fades in
      setTimeout(() => {
        const bars = document.querySelectorAll<HTMLElement>('.sr-bar-fill[data-pct]');
        bars.forEach((bar) => {
          bar.style.width = (bar.dataset.pct ?? '0') + '%';
        });
      }, 50);
    }, 800);
  });

  // ── Derived display values ────────────────────────────────────────────────
  let maxScore = $derived(scored.length > 0 ? scored[0].score : 1);

  function pctFor(score: number): number {
    return Math.round((score / maxScore) * 100);
  }

  function pctColor(pct: number): string {
    if (pct >= 80) return 'var(--green)';
    if (pct >= 50) return 'var(--yellow)';
    if (pct >= 30) return 'var(--orange)';
    return 'var(--text-dim)';
  }

  // ── Event handlers ────────────────────────────────────────────────────────
  /**
   * Row click: select node and dispatch a custom event so the globe / 2D graph
   * can fly/focus to it. We dispatch on the document so any listener can pick it up.
   */
  function handleRowClick(e: MouseEvent, nodeId: string) {
    // If the click was on the view button, ignore (handled separately)
    if ((e.target as Element).closest('.sr-view-btn')) return;

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    selectedNodeId.set(nodeId);

    // Dispatch global event — globe/2D components listen for this
    document.dispatchEvent(
      new CustomEvent('kg:flyto', { detail: { nodeId, node } })
    );
  }

  function handleViewClick(e: MouseEvent, nodeId: string) {
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (node?.preview) showPreview(node);
  }
</script>

<!-- Search results are rendered directly below #search-box (SearchBox mounts that wrapper) -->
<div id="search-results" class="search-results" class:show={visible}>
  {#if query.trim()}
    <!-- Header row -->
    <div class="search-results-header">
      {#if scored.length === 0}
        <span>No results for "{query}"</span>
        <span class="search-results-count">0 / {nodes.length}</span>
      {:else}
        <span>Results</span>
        <span class="search-results-count">{scored.length} / {nodes.length} documents</span>
      {/if}
    </div>

    {#if scored.length > 0}
      <table>
        <thead>
          <tr>
            <th class="sr-no">#</th>
            <th>Name</th>
            <th>Path</th>
            <th style="text-align:right">Match</th>
            <th></th>
            <th class="sr-view"></th>
          </tr>
        </thead>
        <tbody>
          {#each scored as item, i}
            {@const n = item.node}
            {@const cat = CATEGORIES[n.cat] ?? CATEGORIES['meta']}
            {@const pct = pctFor(item.score)}
            {@const color = pctColor(pct)}
            {@const hasPreview = !!n.preview}
            <tr
              data-node-id={n.id}
              onclick={(e) => handleRowClick(e, n.id)}
            >
              <td class="sr-no">{i + 1}</td>
              <td class="sr-name" style="color:{cat.color}" title={n.label}>{n.label}</td>
              <td class="sr-path" title={n.file ?? ''}>{n.file ?? ''}</td>
              <td class="sr-score" style="color:{color}">{pct}%</td>
              <td class="sr-bar">
                <!-- data-pct starts at 0; $effect above sets it to real value for animation -->
                <div
                  class="sr-bar-fill"
                  style="width:0%;background:{color}"
                  data-pct={pct}
                ></div>
              </td>
              <td class="sr-view">
                <button
                  class="sr-view-btn"
                  class:disabled={!hasPreview}
                  data-node-id={n.id}
                  title={hasPreview ? 'View document' : 'No preview'}
                  onclick={(e) => handleViewClick(e, n.id)}
                >
                  &#9686;
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  {/if}
</div>

<style>
  .search-results {
    background: var(--panel-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 6px 6px;
    max-height: 320px;
    overflow-y: auto;
    width: 560px;
    margin-top: -1px;
    margin-left: -110px;
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  .search-results.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .search-results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px 6px;
    border-bottom: 1px solid var(--border);
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--accent);
  }

  .search-results-count {
    font-size: 11px;
    color: var(--text);
    font-weight: bold;
    letter-spacing: 0;
    text-transform: none;
  }

  /* Table */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
  }

  th {
    text-align: left;
    padding: 5px 8px;
    color: var(--accent);
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: var(--panel-bg);
  }

  td {
    padding: 5px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    color: var(--text-dim);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  tr {
    cursor: pointer;
    transition: background 0.15s;
  }

  tr:hover {
    background: rgba(0, 212, 255, 0.06);
  }

  tr:hover td {
    color: var(--text);
  }

  /* Column-specific */
  .sr-no {
    width: 28px;
    text-align: center;
    color: var(--text-dim);
  }

  .sr-name {
    color: var(--text);
    font-weight: 500;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sr-path {
    font-size: 9px;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sr-score {
    text-align: right;
    font-weight: bold;
    width: 48px;
    white-space: nowrap;
  }

  .sr-bar {
    width: 50px;
    padding: 5px 6px;
  }

  :global(.sr-bar-fill) {
    height: 4px;
    border-radius: 2px;
    min-width: 2px;
    transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .sr-view {
    width: 36px;
    text-align: center;
    padding: 3px 4px;
  }

  .sr-view-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 20px;
    border-radius: 3px;
    background: rgba(0, 212, 255, 0.06);
    border: 1px solid rgba(0, 212, 255, 0.2);
    color: var(--accent);
    font-size: 11px;
    cursor: pointer;
    font-family: var(--font);
    transition: all 0.2s;
    line-height: 1;
  }

  .sr-view-btn:hover {
    background: rgba(0, 212, 255, 0.15);
    border-color: var(--accent);
    box-shadow: 0 0 6px rgba(0, 212, 255, 0.2);
  }

  .sr-view-btn.disabled {
    opacity: 0.2;
    cursor: default;
    pointer-events: none;
  }
</style>
