<script lang="ts">
  import { currentMode, pathSelection, selectedNodeId } from '../../lib/stores/appState';
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import type { AppMode } from '../../lib/stores/appState';
  import type { GraphNode, GraphLink } from '../../lib/types';

  let mode = $state<AppMode>('explore');
  let nodes = $state<GraphNode[]>([]);
  let links = $state<GraphLink[]>([]);

  $effect(() => {
    const unsub = currentMode.subscribe(v => { mode = v; });
    return unsub;
  });

  $effect(() => {
    const unsubNodes = graphNodes.subscribe(v => { nodes = v; });
    const unsubLinks = graphLinks.subscribe(v => { links = v; });
    return () => { unsubNodes(); unsubLinks(); };
  });

  let pathActive = $derived(mode === 'path');
  let impactActive = $derived(mode === 'impact');

  function handlePath(): void {
    if (mode === 'path') {
      resetMode();
    } else {
      resetMode();
      currentMode.set('path');
      pathSelection.set([]);
    }
  }

  function handleImpact(): void {
    if (mode === 'impact') {
      resetMode();
    } else {
      resetMode();
      currentMode.set('impact');
    }
  }

  function handleExport(): void {
    const data = {
      nodes: nodes.map(n => ({ id: n.id, file: n.file, label: n.label, cat: n.cat, refs: n.refs })),
      links: links.map(l => ({
        source: typeof l.source === 'string' ? l.source : (l.source as GraphNode).id,
        target: typeof l.target === 'string' ? l.target : (l.target as GraphNode).id,
        label: l.label,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'knowledge-graph-export.json';
    a.click();
  }

  function handleReset(): void {
    resetMode();
  }

  function resetMode(): void {
    currentMode.set('explore');
    pathSelection.set([]);
    selectedNodeId.set(null);
  }
</script>

<div id="toolbar">
  <button
    class="tool-btn"
    class:active={pathActive}
    title="Find shortest path between 2 nodes"
    onclick={handlePath}
  >
    Path
  </button>
  <button
    class="tool-btn"
    class:active={impactActive}
    title="Show impact of selected node"
    onclick={handleImpact}
  >
    Impact
  </button>
  <button
    class="tool-btn"
    title="Export graph data as JSON"
    onclick={handleExport}
  >
    Export
  </button>
  <button
    class="tool-btn"
    title="Reset view"
    onclick={handleReset}
  >
    Reset
  </button>
</div>

<style>
  #toolbar {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 20;
    display: flex;
    gap: 6px;
  }
  .tool-btn {
    background: var(--panel-bg);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 7px 12px;
    font-family: var(--font);
    font-size: 11px;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .tool-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
  .tool-btn.active {
    color: var(--orange);
    border-color: var(--orange);
    background: rgba(249, 115, 22, 0.08);
  }
</style>
