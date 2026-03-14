<script lang="ts">
  import {
    commandPanelOpen, toggleCommandPanel,
  } from '../../lib/stores/commandState';
  import { globePreview } from '../../lib/stores/appState';
  import { navigateTo } from '../../lib/router';

  let isOpen = $state(false);
  let isGlobeOn = $state(false);
  let miniCanvas: HTMLCanvasElement;
  let rafId: number | null = null;

  $effect(() => {
    const unsub = commandPanelOpen.subscribe(v => { isOpen = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = globePreview.subscribe(v => { isGlobeOn = v; });
    return unsub;
  });

  // When panel closes, turn off globe to save battery
  $effect(() => {
    if (!isOpen && isGlobeOn) {
      globePreview.set(false);
    }
  });

  // Mirror real globe canvas → mini canvas
  $effect(() => {
    if (isGlobeOn && miniCanvas) {
      startMirror();
    } else {
      stopMirror();
    }
    return () => stopMirror();
  });

  function startMirror() {
    stopMirror();
    const ctx = miniCanvas?.getContext('2d');
    if (!ctx) return;

    function frame() {
      const src = document.getElementById('globe-canvas') as HTMLCanvasElement | null;
      if (src && miniCanvas && ctx) {
        const w = miniCanvas.width;
        const h = miniCanvas.height;
        ctx.clearRect(0, 0, w, h);
        // Crop center square from fullscreen globe
        const srcW = src.width;
        const srcH = src.height;
        const size = Math.min(srcW, srcH);
        const sx = (srcW - size) / 2;
        const sy = (srcH - size) / 2;
        ctx.drawImage(src, sx, sy, size, size, 0, 0, w, h);
      }
      rafId = requestAnimationFrame(frame);
    }
    // Small delay to let GlobeCanvas mount and render first frame
    setTimeout(() => { rafId = requestAnimationFrame(frame); }, 200);
  }

  function stopMirror() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function toggleGlobePreview() {
    globePreview.update(v => !v);
  }

  function switchToGlobe() {
    globePreview.set(false);
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
      <!-- Globe Preview Toggle -->
      <div class="section">
        <button class="menu-item" class:menu-active={isGlobeOn} onclick={toggleGlobePreview}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>
          </svg>
          <span class="menu-label">Globe Preview</span>
          <span class="menu-badge" class:badge-on={isGlobeOn}>{isGlobeOn ? 'ON' : 'OFF'}</span>
        </button>

        {#if isGlobeOn}
          <div class="globe-box">
            <canvas
              bind:this={miniCanvas}
              class="globe-mini-canvas"
              width="512"
              height="512"
            ></canvas>
            <button class="globe-expand" onclick={switchToGlobe} title="Open full globe view">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            </button>
          </div>
        {/if}
      </div>

      <div class="section-divider"></div>

      <!-- Quick Navigation -->
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

  .section {
    padding: 4px 12px;
  }
  .section-label {
    font-size: 9px;
    color: #555;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 8px 8px 6px;
  }
  .section-divider {
    height: 1px;
    background: rgba(255,255,255,0.04);
    margin: 4px 12px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    background: none;
    border: none;
    border-radius: 6px;
    color: #aaa;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.12s;
    text-align: left;
  }
  .menu-item:hover {
    background: rgba(255,255,255,0.04);
    color: #e0e0e0;
  }
  .menu-active {
    background: rgba(0,229,255,0.06);
    color: #00e5ff;
  }
  .menu-label {
    flex: 1;
    font-weight: 500;
  }
  .menu-badge {
    font-size: 9px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    letter-spacing: 0.04em;
    background: rgba(255,255,255,0.04);
    color: #555;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .badge-on {
    background: rgba(0,255,136,0.1);
    color: #00ff88;
    border-color: rgba(0,255,136,0.3);
  }
  .menu-arrow {
    color: #444;
    font-size: 14px;
  }

  /* Globe mini preview */
  .globe-box {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    margin: 8px 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(0,229,255,0.2);
    background: #000;
    box-shadow: inset 0 0 20px rgba(0,229,255,0.04);
  }
  .globe-mini-canvas {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 9px;
  }
  .globe-expand {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 4px;
    color: #ccc;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.12s;
  }
  .globe-expand:hover {
    background: rgba(0,229,255,0.15);
    color: #00e5ff;
    border-color: rgba(0,229,255,0.4);
  }
</style>
