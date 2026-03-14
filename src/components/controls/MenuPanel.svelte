<script lang="ts">
  import { currentMode, pathSelection, selectedNodeId, viewMode } from '../../lib/stores/appState';
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { showCrossRepo, crossRepoFilter } from '../../lib/stores/crossRepoState';
  import { toggleCommandPanel } from '../../lib/stores/commandState';
  import { startPolling, stopPolling } from '../../lib/stores/ipcBridge';
  import { navigateTo } from '../../lib/router';
  import type { AppMode } from '../../lib/stores/appState';
  import type { GraphNode, GraphLink, ViewMode } from '../../lib/types';

  interface Props {
    oncrossrepopanel?: () => void;
  }
  let { oncrossrepopanel }: Props = $props();

  let mode = $state<AppMode>('explore');
  let nodes = $state<GraphNode[]>([]);
  let links = $state<GraphLink[]>([]);
  let currentView = $state<ViewMode>('globe');
  let crossRepoPanelOpen = $state(false);
  let hoveredItem = $state<string | null>(null);
  let openPanel = $state<string | null>(null);
  let showSuggestions = $state(false);
  let ipcPolling = $state(false);

  $effect(() => {
    const unsub = currentMode.subscribe(v => { mode = v; });
    return unsub;
  });
  $effect(() => {
    const unsub = viewMode.subscribe(v => { currentView = v; });
    return unsub;
  });
  $effect(() => {
    const unsubN = graphNodes.subscribe(v => { nodes = v; });
    const unsubL = graphLinks.subscribe(v => { links = v; });
    return () => { unsubN(); unsubL(); };
  });

  function togglePanel(id: string): void {
    openPanel = openPanel === id ? null : id;
  }

  // ── Actions ────────────────────────────────────────────────────────────
  function switchToGlobe(): void {
    navigateTo('globe');
    resetMode();
    openPanel = null;
  }
  function switchToBoard(): void {
    navigateTo('kanban');
    openPanel = null;
  }
  function switchToAnalytics(): void {
    navigateTo('analytics');
    openPanel = null;
  }
  function handleExplore(): void {
    navigateTo('globe');
    resetMode();
  }
  function handlePath(): void {
    navigateTo('globe');
    if (mode === 'path') { resetMode(); }
    else { resetMode(); currentMode.set('path'); pathSelection.set([]); }
  }
  function handleImpact(): void {
    navigateTo('globe');
    if (mode === 'impact') { resetMode(); }
    else { resetMode(); currentMode.set('impact'); }
  }
  function handleCrossRepo(): void {
    navigateTo('globe');
    crossRepoPanelOpen = !crossRepoPanelOpen;
    oncrossrepopanel?.();
    if (!crossRepoPanelOpen) { showCrossRepo.set(false); crossRepoFilter.set(null); }
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
    navigateTo('globe');
    openPanel = null;
  }
  function resetMode(): void {
    currentMode.set('explore');
    pathSelection.set([]);
    selectedNodeId.set(null);
  }
</script>

<!-- Icon rail -->
<nav class="rail">
  <!-- View switchers -->
  <button
    class="rail-btn"
    class:active={currentView === 'globe' && openPanel !== 'board'}
    onclick={switchToGlobe}
    onmouseenter={() => hoveredItem = 'globe'}
    onmouseleave={() => hoveredItem = null}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"/>
      <ellipse cx="12" cy="12" rx="4" ry="10"/>
      <path d="M2 12h20"/>
    </svg>
    {#if hoveredItem === 'globe' && !openPanel}<span class="tip">Globe</span>{/if}
  </button>

  <button
    class="rail-btn"
    class:active={currentView === 'kanban'}
    onclick={switchToBoard}
    onmouseenter={() => hoveredItem = 'board'}
    onmouseleave={() => hoveredItem = null}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="7" height="9" rx="1"/>
      <rect x="14" y="3" width="7" height="6" rx="1"/>
      <rect x="3" y="15" width="7" height="6" rx="1"/>
      <rect x="14" y="12" width="7" height="9" rx="1"/>
    </svg>
    {#if hoveredItem === 'board' && !openPanel}<span class="tip">SDLC Board</span>{/if}
  </button>

  <button
    class="rail-btn"
    class:active={currentView === 'analytics'}
    onclick={switchToAnalytics}
    onmouseenter={() => hoveredItem = 'analytics'}
    onmouseleave={() => hoveredItem = null}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="12" width="4" height="9" rx="1"/>
      <rect x="10" y="7" width="4" height="14" rx="1"/>
      <rect x="17" y="3" width="4" height="18" rx="1"/>
    </svg>
    {#if hoveredItem === 'analytics' && !openPanel}<span class="tip">Analytics</span>{/if}
  </button>

  <div class="rail-div"></div>

  <!-- Context tools -->
  {#if currentView === 'globe'}
    <button class="rail-btn" class:active={mode === 'explore'} onclick={handleExplore}
      onmouseenter={() => hoveredItem = 'explore'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
      </svg>
      {#if hoveredItem === 'explore' && !openPanel}<span class="tip">Explore</span>{/if}
    </button>

    <button class="rail-btn" class:active={mode === 'path'} onclick={handlePath}
      onmouseenter={() => hoveredItem = 'path'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="5" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 6h4a4 4 0 0 1 4 4v4"/>
      </svg>
      {#if hoveredItem === 'path' && !openPanel}<span class="tip">Path Find</span>{/if}
    </button>

    <button class="rail-btn" class:active={mode === 'impact'} onclick={handleImpact}
      onmouseenter={() => hoveredItem = 'impact'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7" stroke-dasharray="4 2"/><circle cx="12" cy="12" r="10" stroke-dasharray="2 3"/>
      </svg>
      {#if hoveredItem === 'impact' && !openPanel}<span class="tip">Impact</span>{/if}
    </button>

    <button class="rail-btn" class:active={crossRepoPanelOpen} onclick={handleCrossRepo}
      onmouseenter={() => hoveredItem = 'xrepo'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="2" y="6" width="6" height="6" rx="1"/><rect x="16" y="6" width="6" height="6" rx="1"/><path d="M8 9h8"/><rect x="9" y="14" width="6" height="6" rx="1"/><path d="M12 12v2"/>
      </svg>
      {#if hoveredItem === 'xrepo' && !openPanel}<span class="tip">Cross-Repo</span>{/if}
    </button>

    <div class="rail-div"></div>

    <!-- Stats panel toggle -->
    <button class="rail-btn" class:active={openPanel === 'stats'} onclick={() => togglePanel('stats')}
      onmouseenter={() => hoveredItem = 'stats'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
      {#if hoveredItem === 'stats' && !openPanel}<span class="tip">Stats</span>{/if}
    </button>

    <!-- Settings/controls toggle -->
    <button class="rail-btn" class:active={openPanel === 'settings'} onclick={() => togglePanel('settings')}
      onmouseenter={() => hoveredItem = 'settings'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
      {#if hoveredItem === 'settings' && !openPanel}<span class="tip">Controls</span>{/if}
    </button>
  {/if}

  {#if currentView === 'kanban'}
    <button class="rail-btn" onclick={toggleCommandPanel}
      onmouseenter={() => hoveredItem = 'cmd'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="4,17 10,11 4,5"/><line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
      {#if hoveredItem === 'cmd'}<span class="tip">Commands</span>{/if}
    </button>
    <button class="rail-btn" class:active={showSuggestions} onclick={() => showSuggestions = !showSuggestions}
      onmouseenter={() => hoveredItem = 'ai'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6h-8c-1.5-1.5-3-3.5-3-6a7 7 0 0 1 7-7z"/><path d="M9 21h6"/><path d="M10 17h4"/>
      </svg>
      {#if hoveredItem === 'ai'}<span class="tip">AI Suggest</span>{/if}
    </button>
    <button class="rail-btn disabled" disabled
      onmouseenter={() => hoveredItem = 'run'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="5,3 19,12 5,21"/>
      </svg>
      {#if hoveredItem === 'run'}<span class="tip">Run Agent <small>S3</small></span>{/if}
    </button>
    <button class="rail-btn" class:active={ipcPolling} onclick={() => { ipcPolling = !ipcPolling; ipcPolling ? startPolling() : stopPolling(); }}
      onmouseenter={() => hoveredItem = 'live'} onmouseleave={() => hoveredItem = null}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="3"/><path d="M8 8a6 6 0 0 0 0 8"/><path d="M16 8a6 6 0 0 1 0 8"/>
      </svg>
      {#if hoveredItem === 'live'}<span class="tip">Live Status</span>{/if}
    </button>
  {/if}

  <div class="rail-spacer"></div>

  <button class="rail-btn" onclick={handleExport}
    onmouseenter={() => hoveredItem = 'export'} onmouseleave={() => hoveredItem = null}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    {#if hoveredItem === 'export' && !openPanel}<span class="tip">Export</span>{/if}
  </button>

  <button class="rail-btn" onclick={handleReset}
    onmouseenter={() => hoveredItem = 'reset'} onmouseleave={() => hoveredItem = null}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="1,4 1,10 7,10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
    </svg>
    {#if hoveredItem === 'reset' && !openPanel}<span class="tip">Reset</span>{/if}
  </button>
</nav>

<!-- Slide-out panel -->
{#if openPanel}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="side-panel" onclick={(e) => e.stopPropagation()}>
    <div class="sp-header">
      <span class="sp-title">{openPanel === 'stats' ? 'GRAPH STATS' : 'CONTROLS'}</span>
      <button class="sp-close" onclick={() => openPanel = null}>&times;</button>
    </div>
    <div class="sp-body">
      {#if openPanel === 'stats'}
        <div class="sp-row"><span>Documents</span><span class="sp-val">{nodes.length}</span></div>
        <div class="sp-row"><span>Connections</span><span class="sp-val">{links.length}</span></div>
        <div class="sp-row"><span>Categories</span><span class="sp-val">{[...new Set(nodes.map(n => n.cat))].length}</span></div>
        <div class="sp-divider"></div>
        <div class="sp-label">STATUS</div>
        <div class="sp-row"><span class="done-text">Done</span><span class="sp-val">{nodes.filter(n => n.status === 'done').length}</span></div>
        <div class="sp-row"><span class="prog-text">In Progress</span><span class="sp-val">{nodes.filter(n => n.status === 'in-progress').length}</span></div>
        <div class="sp-row"><span class="plan-text">Planned</span><span class="sp-val">{nodes.filter(n => n.status === 'planned').length}</span></div>
      {:else if openPanel === 'settings'}
        <div class="sp-hint">Globe Controls and Theme Effects are available via the existing panels on the globe view.</div>
      {/if}
    </div>
  </div>
  <!-- Backdrop to close panel -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="sp-backdrop" onclick={() => openPanel = null}></div>
{/if}

<style>
  /* ── Icon Rail ───────────────────────────────────────────────────────── */
  .rail {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 44px;
    z-index: 65;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    gap: 2px;
    background: rgba(8, 8, 22, 0.7);
    border-right: 1px solid rgba(255,255,255,0.04);
  }
  .rail-btn {
    position: relative;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    border-radius: 8px;
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all 0.12s;
    flex-shrink: 0;
  }
  .rail-btn:hover:not(.disabled) {
    color: rgba(255,255,255,0.75);
    background: rgba(255,255,255,0.04);
  }
  .rail-btn.active {
    color: var(--accent, #00e5ff);
    background: rgba(0, 229, 255, 0.07);
  }
  .rail-btn.disabled {
    opacity: 0.15;
    cursor: default;
  }
  .rail-div {
    width: 18px;
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 4px 0;
    flex-shrink: 0;
  }
  .rail-spacer {
    flex: 1;
  }

  /* Tooltip */
  .tip {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 10px;
    background: rgba(15, 15, 35, 0.95);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 11px;
    font-family: var(--font, 'JetBrains Mono', monospace);
    color: #ccc;
    white-space: nowrap;
    pointer-events: none;
    box-shadow: 0 4px 16px rgba(0,0,0,0.6);
    z-index: 200;
  }
  .tip small {
    font-size: 8px;
    color: #555;
    margin-left: 4px;
  }

  /* ── Slide-out Side Panel ────────────────────────────────────────────── */
  .side-panel {
    position: fixed;
    top: 0;
    left: 44px;
    bottom: 0;
    width: 280px;
    z-index: 64;
    background: rgba(10, 10, 26, 0.94);
    border-right: 1px solid rgba(255,255,255,0.06);
    backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    animation: slideIn 0.15s ease-out;
  }
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .sp-header {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    flex-shrink: 0;
  }
  .sp-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--accent, #00e5ff);
    font-family: var(--font, 'JetBrains Mono', monospace);
  }
  .sp-close {
    margin-left: auto;
    background: none;
    border: none;
    color: #555;
    font-size: 16px;
    cursor: pointer;
    padding: 0 4px;
    border-radius: 4px;
    transition: color 0.1s;
  }
  .sp-close:hover {
    color: #fff;
  }
  .sp-body {
    flex: 1;
    overflow-y: auto;
    padding: 14px 16px;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }
  .sp-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    font-size: 12px;
    color: var(--text-dim, #aaa);
  }
  .sp-val {
    font-weight: 600;
    color: var(--text, #e0e0e0);
  }
  .sp-divider {
    height: 1px;
    background: rgba(255,255,255,0.04);
    margin: 10px 0;
  }
  .sp-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #555;
    margin-bottom: 6px;
  }
  .done-text { color: #00ff88; }
  .prog-text { color: #f97316; }
  .plan-text { color: #4d8aff; }
  .sp-hint {
    font-size: 11px;
    color: #666;
    line-height: 1.5;
  }

  /* Backdrop */
  .sp-backdrop {
    position: fixed;
    inset: 0;
    z-index: 63;
  }
</style>
