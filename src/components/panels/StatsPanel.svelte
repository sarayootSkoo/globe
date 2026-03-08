<script lang="ts">
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import type { GraphNode, GraphLink } from '../../lib/types';

  let nodes = $state<GraphNode[]>([]);
  let links = $state<GraphLink[]>([]);

  $effect(() => {
    const unsubNodes = graphNodes.subscribe(v => { nodes = v; });
    const unsubLinks = graphLinks.subscribe(v => { links = v; });
    return () => { unsubNodes(); unsubLinks(); };
  });

  let docCount = $derived(nodes.length);
  let linkCount = $derived(links.length);
  let hubCount = $derived(nodes.filter(n => (n.refs ?? 0) >= 5).length);
  let orphanCount = $derived(nodes.filter(n => (n.refs ?? 0) === 0).length);
  let topNode = $derived(
    nodes.length > 0
      ? nodes.reduce((a, b) => ((a.refs ?? 0) > (b.refs ?? 0) ? a : b), nodes[0])
      : null
  );
</script>

<div class="panel" id="stats">
  <div class="panel-title">Graph Stats</div>
  <div class="stat-row">
    <span class="stat-label">Documents</span>
    <span class="stat-value">{docCount}</span>
  </div>
  <div class="stat-row">
    <span class="stat-label">Connections</span>
    <span class="stat-value">{linkCount}</span>
  </div>
  <div class="stat-row">
    <span class="stat-label">Hub Nodes (5+)</span>
    <span class="stat-value">{hubCount}</span>
  </div>
  <div class="stat-row">
    <span class="stat-label">Orphan Nodes</span>
    <span class="stat-value orphan">{orphanCount}</span>
  </div>
  <div class="divider"></div>
  <div class="stat-row">
    <span class="stat-label">Most Connected</span>
    <span class="stat-value top">{topNode ? topNode.label : '—'}</span>
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
  #stats {
    top: 70px;
    left: 16px;
    min-width: 210px;
  }
  .stat-row {
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
    font-size: 11px;
  }
  .stat-label {
    color: var(--text-dim);
  }
  .stat-value {
    font-weight: bold;
  }
  .orphan {
    color: var(--red);
  }
  .top {
    color: var(--accent);
    font-size: 10px;
  }
  .divider {
    height: 1px;
    background: var(--border);
    margin: 8px 0;
  }
</style>
