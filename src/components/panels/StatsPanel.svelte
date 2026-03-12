<script lang="ts">
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { showStatusBadges } from '../../lib/stores/statusState';
  import type { GraphNode, GraphLink } from '../../lib/types';

  let nodes = $state<GraphNode[]>([]);
  let links = $state<GraphLink[]>([]);
  let badgesOn = $state(false);

  $effect(() => {
    const unsubNodes = graphNodes.subscribe(v => { nodes = v; });
    const unsubLinks = graphLinks.subscribe(v => { links = v; });
    const unsubBadges = showStatusBadges.subscribe(v => { badgesOn = v; });
    return () => { unsubNodes(); unsubLinks(); unsubBadges(); };
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

  let doneCount = $derived(nodes.filter(n => n.status === 'done').length);
  let inProgressCount = $derived(nodes.filter(n => n.status === 'in-progress').length);
  let plannedCount = $derived(nodes.filter(n => n.status === 'planned').length);

  function toggleBadges(): void {
    showStatusBadges.update(v => !v);
  }
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
  <div class="divider"></div>
  <div class="panel-section-title">Status</div>
  <div class="stat-row">
    <span class="stat-label status-done">Done</span>
    <span class="stat-value">{doneCount}</span>
  </div>
  <div class="stat-row">
    <span class="stat-label status-inprogress">In Progress</span>
    <span class="stat-value">{inProgressCount}</span>
  </div>
  <div class="stat-row">
    <span class="stat-label status-planned">Planned</span>
    <span class="stat-value">{plannedCount}</span>
  </div>
  <div class="toggle-row">
    <span class="stat-label">Show badges on graph</span>
    <button
      class="toggle-btn"
      class:active={badgesOn}
      onclick={toggleBadges}
      aria-pressed={badgesOn}
    >{badgesOn ? 'ON' : 'OFF'}</button>
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
    left: 56px;
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
  .panel-section-title {
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 4px;
  }
  .status-done {
    color: #00ff88;
  }
  .status-inprogress {
    color: #ffaa00;
  }
  .status-planned {
    color: #888888;
  }
  .toggle-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0 2px;
    font-size: 11px;
  }
  .toggle-btn {
    font-size: 9px;
    letter-spacing: 1px;
    padding: 2px 7px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-dim);
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .toggle-btn.active {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(0, 212, 255, 0.08);
  }
  .toggle-btn:hover {
    border-color: var(--border-hi);
    color: var(--text);
  }
</style>
