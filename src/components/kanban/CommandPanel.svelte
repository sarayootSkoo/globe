<script lang="ts">
  import {
    commandPanelOpen, toggleCommandPanel,
  } from '../../lib/stores/commandState';
  import { globePreview } from '../../lib/stores/appState';
  import { navigateTo } from '../../lib/router';

  let isOpen = $state(false);
  let isGlobeOn = $state(false);

  $effect(() => {
    const unsub = commandPanelOpen.subscribe(v => { isOpen = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = globePreview.subscribe(v => { isGlobeOn = v; });
    return unsub;
  });

  $effect(() => {
    if (!isOpen && isGlobeOn) {
      globePreview.set(false);
    }
  });

  function toggleGlobePreview() {
    globePreview.update(v => !v);
  }

  let globeExpanded = $state(false);

  function toggleGlobeExpand() {
    globeExpanded = !globeExpanded;
  }

  function switchToGlobe() {
    globePreview.set(false);
    globeExpanded = false;
    toggleCommandPanel();
    navigateTo('globe');
  }

  function switchToAnalytics() {
    globePreview.set(false);
    toggleCommandPanel();
    navigateTo('analytics');
  }
</script>

{#if isOpen}
  <div class="cmd-panel">
    <div class="panel-header">
      <span class="panel-title">COMMAND CENTER</span>
      <button class="panel-close" onclick={toggleCommandPanel}>&times;</button>
    </div>
    <div class="panel-divider"></div>

    <div class="panel-body">
      <div class="section">
        <button class="menu-item" class:menu-active={isGlobeOn} onclick={toggleGlobePreview}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>
          </svg>
          <span class="menu-label">Globe Preview</span>
          <span class="menu-badge" class:badge-on={isGlobeOn}>{isGlobeOn ? 'ON' : 'OFF'}</span>
        </button>

        {#if isGlobeOn}
          {#if globeExpanded}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="globe-backdrop" onclick={toggleGlobeExpand}></div>
          {/if}
          <div class="globe-box" class:globe-expanded={globeExpanded}>
            <iframe
              src="/?console=hide&menu=hide&search=hide"
              title="Globe Preview"
              class="globe-iframe"
            ></iframe>
            <button class="globe-expand" onclick={toggleGlobeExpand} title={globeExpanded ? 'Minimize' : 'Expand'}>
              {#if globeExpanded}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="4,14 4,20 10,20"/><polyline points="20,10 20,4 14,4"/><line x1="14" y1="10" x2="20" y2="4"/><line x1="4" y1="20" x2="10" y2="14"/>
                </svg>
              {:else}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              {/if}
            </button>
          </div>
        {/if}
      </div>

      <div class="section-divider"></div>

      <div class="section">
        <div class="section-label">VIEWS</div>
        <button class="menu-item" onclick={switchToGlobe}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>
          </svg>
          <span class="menu-label">Full Globe View</span>
          <span class="menu-arrow">&rarr;</span>
        </button>
        <button class="menu-item" onclick={switchToAnalytics}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/>
          </svg>
          <span class="menu-label">Analytics Dashboard</span>
          <span class="menu-arrow">&rarr;</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .cmd-panel {
    position: fixed;
    top: 0;
    left: 44px;
    bottom: 0;
    width: 280px;
    background: rgba(10, 10, 26, 0.96);
    border-right: 1px solid rgba(255,255,255,0.06);
    z-index: 60;
    font-family: var(--font, 'JetBrains Mono', monospace);
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(16px);
    animation: slideIn 0.15s ease-out;
  }
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    flex-shrink: 0;
  }
  .panel-title {
    font-size: 11px;
    font-weight: 700;
    color: var(--accent, #00e5ff);
    letter-spacing: 0.1em;
  }
  .panel-close {
    background: none;
    border: none;
    color: #555;
    font-size: 18px;
    cursor: pointer;
    padding: 0 4px;
    border-radius: 4px;
  }
  .panel-close:hover { color: #fff; }
  .panel-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  .panel-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
  }

  .section { padding: 4px 12px; }
  .section-label {
    font-size: 9px; color: #555; font-weight: 700;
    letter-spacing: 0.08em; padding: 8px 8px 6px;
  }
  .section-divider {
    height: 1px; background: rgba(255,255,255,0.04); margin: 4px 12px;
  }

  .menu-item {
    display: flex; align-items: center; gap: 10px; width: 100%;
    padding: 10px 12px; background: none; border: none; border-radius: 6px;
    color: #aaa; font-size: 12px; font-family: inherit; cursor: pointer;
    transition: all 0.12s; text-align: left;
  }
  .menu-item:hover { background: rgba(255,255,255,0.04); color: #e0e0e0; }
  .menu-active { background: rgba(0,229,255,0.06); color: #00e5ff; }
  .menu-label { flex: 1; font-weight: 500; }
  .menu-badge {
    font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 3px;
    letter-spacing: 0.04em; background: rgba(255,255,255,0.04);
    color: #555; border: 1px solid rgba(255,255,255,0.08);
  }
  .badge-on { background: rgba(0,255,136,0.1); color: #00ff88; border-color: rgba(0,255,136,0.3); }
  .menu-arrow { color: #444; font-size: 14px; }

  /* Globe backdrop (blur behind expanded) */
  .globe-backdrop {
    position: fixed;
    inset: 0;
    z-index: 499;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Globe iframe box — mini & expanded */
  .globe-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    margin: 8px 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(0,229,255,0.2);
    background: #000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .globe-box.globe-expanded {
    position: fixed;
    top: 10vh;
    left: 10vw;
    width: 80vw;
    height: 80vh;
    aspect-ratio: auto;
    margin: 0;
    border-radius: 14px;
    border: 1px solid rgba(0,229,255,0.3);
    z-index: 500;
    box-shadow: 0 0 60px rgba(0,0,0,0.8), 0 0 20px rgba(0,229,255,0.1);
  }
  .globe-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    border-radius: 9px;
    transition: border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .globe-expanded .globe-iframe {
    border-radius: 13px;
  }
  .globe-expand {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    color: #ccc;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    z-index: 501;
    backdrop-filter: blur(8px);
  }
  .globe-expand:hover {
    background: rgba(0,229,255,0.15);
    color: #00e5ff;
    border-color: rgba(0,229,255,0.4);
  }
  .globe-expanded .globe-expand {
    top: 16px;
    right: 16px;
    padding: 8px;
  }

</style>
