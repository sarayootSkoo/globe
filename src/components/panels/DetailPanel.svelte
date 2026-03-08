<script lang="ts">
  import { selectedNodeId, currentMode } from '../../lib/stores/appState';
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { showPreview } from '../../lib/stores/previewState';
  import { CATEGORIES } from '../../lib/constants';
  import { getConnected } from '../../lib/utils/graph';
  import type { GraphNode, GraphLink } from '../../lib/types';

  let selId = $state<string | null>(null);
  let nodes = $state<GraphNode[]>([]);
  let links = $state<GraphLink[]>([]);

  $effect(() => {
    const unsub = selectedNodeId.subscribe(v => { selId = v; });
    return unsub;
  });

  $effect(() => {
    const unsubNodes = graphNodes.subscribe(v => { nodes = v; });
    const unsubLinks = graphLinks.subscribe(v => { links = v; });
    return () => { unsubNodes(); unsubLinks(); };
  });

  let node = $derived(selId ? nodes.find(n => n.id === selId) ?? null : null);
  let show = $derived(node !== null);
  let cat = $derived(node ? (CATEGORIES[node.cat] ?? CATEGORIES['meta']) : null);

  let connected = $derived(
    node ? Array.from(getConnected(node.id, links)).map(id => nodes.find(n => n.id === id)).filter((n): n is GraphNode => !!n) : []
  );

  function selectNode(n: GraphNode): void {
    selectedNodeId.set(n.id);
  }

  function startImpact(): void {
    if (!node) return;
    currentMode.set('impact');
  }

  function startPath(): void {
    if (!node) return;
    currentMode.set('path');
  }
</script>

<div class="panel" id="detail" class:show={show}>
  <div class="panel-title">Document Detail</div>
  {#if node && cat}
    <div class="detail-title">{node.label}</div>
    <div class="detail-cat" style="color:{cat.color}">{cat.label} — {node.file ?? ''}</div>
    <div class="detail-desc">{node.desc ?? 'No description'}</div>

    <div id="d-actions">
      <button
        class="detail-btn"
        onclick={() => window.open(`vscode://file${node!.file ?? ''}`, '_self')}
      >
        Focus
      </button>
      <button class="detail-btn" onclick={startImpact}>Impact Analysis</button>
      <button class="detail-btn" onclick={startPath}>Path From Here</button>
      {#if node.preview}
        <button
          class="detail-btn preview-btn"
          onclick={() => showPreview(node!)}
        >
          Preview MD
        </button>
      {/if}
    </div>

    <div class="detail-section">Keywords</div>
    <div id="d-keywords">
      {#if (node.keywords ?? []).length > 0}
        {#each node.keywords ?? [] as kw}
          <span class="detail-keyword">{kw}</span>
        {/each}
      {:else}
        <span class="none-label">None</span>
      {/if}
    </div>

    <div class="detail-section">Connections</div>
    <div id="d-connections">
      {#if connected.length === 0}
        <span class="none-label">Orphan node — no connections</span>
      {:else}
        {#each connected as cn}
          {@const cnCat = CATEGORIES[cn.cat] ?? CATEGORIES['meta']}
          <div
            class="detail-link-item"
            onclick={() => selectNode(cn)}
            role="button"
            tabindex="0"
            onkeydown={(e) => e.key === 'Enter' && selectNode(cn)}
          >
            <div
              class="detail-link-dot"
              style="background:{cnCat.color};box-shadow:0 0 4px {cnCat.color}"
            ></div>
            {cn.label}
          </div>
        {/each}
      {/if}
    </div>
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
  #detail {
    top: 280px;
    right: 16px;
    width: 280px;
    max-height: calc(100vh - 360px);
    overflow-y: auto;
    display: none;
  }
  #detail.show {
    display: block;
  }
  .detail-title {
    font-size: 13px;
    color: var(--accent);
    font-weight: bold;
    margin-bottom: 4px;
    word-break: break-word;
  }
  .detail-cat {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .detail-desc {
    font-size: 11px;
    color: var(--text-dim);
    line-height: 1.5;
    margin-bottom: 10px;
    word-break: break-word;
  }
  .detail-section {
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--accent);
    margin: 10px 0 5px;
    text-transform: uppercase;
  }
  .detail-keyword {
    display: inline-block;
    padding: 2px 8px;
    margin: 2px;
    background: rgba(0, 212, 255, 0.08);
    border: 1px solid rgba(0, 212, 255, 0.15);
    border-radius: 10px;
    font-size: 10px;
    color: var(--accent);
  }
  .detail-link-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 0;
    font-size: 11px;
    color: var(--text-dim);
    cursor: pointer;
  }
  .detail-link-item:hover {
    color: var(--accent);
  }
  .detail-link-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .detail-btn {
    display: inline-block;
    padding: 5px 12px;
    margin: 3px 3px 3px 0;
    background: rgba(0, 212, 255, 0.08);
    border: 1px solid rgba(0, 212, 255, 0.25);
    border-radius: 3px;
    font-size: 10px;
    color: var(--accent);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
  }
  .detail-btn:hover {
    background: rgba(0, 212, 255, 0.15);
    border-color: var(--accent);
  }
  .preview-btn {
    background: rgba(168, 85, 247, 0.1);
    border-color: rgba(168, 85, 247, 0.4);
    color: #a855f7;
  }
  .none-label {
    font-size: 10px;
    color: var(--text-dim);
  }
</style>
