<script lang="ts">
  import { currentMode, pathSelection, selectedNodeId } from '../../lib/stores/appState';
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { bfs } from '../../lib/utils/graph';
  import { CATEGORIES } from '../../lib/constants';
  import type { GraphNode, GraphLink } from '../../lib/types';

  let mode = $state<string>('explore');
  let pathSel = $state<string[]>([]);
  let nodes = $state<GraphNode[]>([]);
  let links = $state<GraphLink[]>([]);

  $effect(() => {
    const unsub = currentMode.subscribe(v => { mode = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = pathSelection.subscribe(v => { pathSel = v; });
    return unsub;
  });

  $effect(() => {
    const unsubNodes = graphNodes.subscribe(v => { nodes = v; });
    const unsubLinks = graphLinks.subscribe(v => { links = v; });
    return () => { unsubNodes(); unsubLinks(); };
  });

  let show = $derived(mode === 'path');

  // Compute the resolved path when two nodes are selected
  let resolvedPath = $derived(
    pathSel.length === 2
      ? bfs(pathSel[0], pathSel[1], nodes, links)
      : null
  );

  let statusText = $derived((): string => {
    if (pathSel.length === 0) return 'Click START node';
    if (pathSel.length === 1) {
      const n = nodes.find(x => x.id === pathSel[0]);
      return `Start: ${n ? n.label : pathSel[0]} → Click END node`;
    }
    if (resolvedPath === null) return 'No path found!';
    return `${resolvedPath.length} nodes, ${resolvedPath.length - 1} hops`;
  });

  let pathError = $derived(pathSel.length === 2 && resolvedPath === null);

  let pathNodes = $derived((): Array<{ node: GraphNode; color: string }> => {
    if (!resolvedPath) return [];
    return resolvedPath.map(id => {
      const n = nodes.find(x => x.id === id)!;
      const cat = CATEGORIES[n?.cat ?? 'meta'] ?? CATEGORIES['meta'];
      return { node: n, color: cat.color };
    }).filter(item => item.node != null);
  });

  function clickPathNode(n: GraphNode): void {
    selectedNodeId.set(n.id);
  }
</script>

<div class="panel" id="path-panel" class:show={show}>
  <div class="panel-title">Shortest Path</div>
  <div
    id="path-content"
    style="font-size:11px;color:{pathError ? 'var(--red)' : 'var(--text-dim)'}"
  >
    {statusText()}
  </div>
  <div class="path-nodes" id="path-nodes">
    {#each pathNodes() as item, i}
      <span
        class="path-node"
        style="background:{item.color}20;border:1px solid {item.color};color:{item.color};cursor:pointer"
        onclick={() => clickPathNode(item.node)}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && clickPathNode(item.node)}
      >
        {item.node.label}
      </span>
      {#if i < pathNodes().length - 1}
        <span class="path-arrow">→</span>
      {/if}
    {/each}
  </div>
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
  #path-panel {
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 300px;
    max-width: 600px;
    display: none;
    text-align: center;
  }
  #path-panel.show {
    display: block;
  }
  .path-nodes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .path-node {
    padding: 4px 10px;
    border-radius: 3px;
    font-size: 11px;
  }
  .path-arrow {
    color: var(--orange);
    font-size: 14px;
  }
</style>
