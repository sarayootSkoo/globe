<script lang="ts">
  import * as globeStore from '../../lib/stores/globeState';
  import WasdPopup from '../wasd/WasdPopup.svelte';

  // ── Local reactive mirrors of store values ──────────────────────────────────
  let autoRotate   = $state(true);
  let showWireframe = $state(true);
  let showDots      = $state(true);
  let showLinks     = $state(true);
  let pulseEnabled  = $state(true);
  let cometEnabled  = $state(true);

  let pulseSpeedVal   = $state(60);   // raw slider value 10–200
  let rotateSpeedVal  = $state(35);   // raw slider value 5–200
  let zoomVal         = $state(55);   // raw slider value 10–100

  let wasdPopupOpen = $state(false);

  // ── Subscribe to stores ──────────────────────────────────────────────────────
  $effect(() => {
    const u1 = globeStore.autoRotate.subscribe(v    => { autoRotate    = v; });
    const u2 = globeStore.showWireframe.subscribe(v => { showWireframe = v; });
    const u3 = globeStore.showDots.subscribe(v      => { showDots      = v; });
    const u4 = globeStore.showLinks.subscribe(v     => { showLinks     = v; });
    const u5 = globeStore.pulseEnabled.subscribe(v  => { pulseEnabled  = v; });
    const u6 = globeStore.cometEnabled.subscribe(v  => { cometEnabled  = v; });
    const u7 = globeStore.pulseSpeed.subscribe(v    => { pulseSpeedVal  = Math.round(v * 100); });
    const u8 = globeStore.rotateSpeed.subscribe(v   => { rotateSpeedVal = Math.round(v * 100); });
    const u9 = globeStore.zoomLevel.subscribe(v     => { zoomVal = v; });
    return () => { u1(); u2(); u3(); u4(); u5(); u6(); u7(); u8(); u9(); };
  });

  // ── Zoom display label ───────────────────────────────────────────────────────
  // 55 is the default (100%). Scale linearly relative to that.
  let zoomLabel = $derived(Math.round(zoomVal * 100 / 55) + '%');

  // ---------------------------------------------------------------------------
  // Toggle handlers
  // ---------------------------------------------------------------------------
  function toggleAutoRotate(): void {
    globeStore.autoRotate.update(v => !v);
  }

  function toggleWireframe(): void {
    globeStore.showWireframe.update(v => !v);
  }

  function toggleDots(): void {
    globeStore.showDots.update(v => !v);
  }

  function toggleLinks(): void {
    globeStore.showLinks.update(v => !v);
  }

  function togglePulse(): void {
    globeStore.pulseEnabled.update(v => !v);
  }

  function toggleComet(): void {
    globeStore.cometEnabled.update(v => !v);
  }

  // ---------------------------------------------------------------------------
  // Slider handlers
  // ---------------------------------------------------------------------------
  function handlePulseSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    pulseSpeedVal = raw;
    globeStore.pulseSpeed.set(raw / 100); // 10–200 → 0.1–2.0 cycles/s
  }

  function handleRotateSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    rotateSpeedVal = raw;
    globeStore.rotateSpeed.set(raw / 100); // 5–200 → 0.05–2.0
  }

  function handleZoom(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    zoomVal = raw;
    globeStore.zoomLevel.set(raw);
    // Camera distance: 1800 - (val/100)*1400
    // Actual camera movement is handled by the GlobeCanvas subscriber
  }

  // ---------------------------------------------------------------------------
  // WASD popup
  // ---------------------------------------------------------------------------
  function openWasdPopup(): void {
    wasdPopupOpen = true;
  }

  function closeWasdPopup(): void {
    wasdPopupOpen = false;
  }

  function handleCometToggle(): void {
    toggleComet();
  }
</script>

<div class="panel" id="globe-controls">
  <div class="panel-title">Globe Controls</div>

  <!-- Auto Rotate -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Auto Rotate</span>
    <div
      class="globe-toggle"
      class:on={autoRotate}
      title="Toggle auto-rotation"
      onclick={toggleAutoRotate}
      role="switch"
      aria-checked={autoRotate}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && toggleAutoRotate()}
    ></div>
  </div>

  <!-- Wireframe -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Wireframe</span>
    <div
      class="globe-toggle"
      class:on={showWireframe}
      title="Toggle wireframe sphere"
      onclick={toggleWireframe}
      role="switch"
      aria-checked={showWireframe}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && toggleWireframe()}
    ></div>
  </div>

  <!-- Dot Sphere -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Dot Sphere</span>
    <div
      class="globe-toggle"
      class:on={showDots}
      title="Toggle particle dots"
      onclick={toggleDots}
      role="switch"
      aria-checked={showDots}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && toggleDots()}
    ></div>
  </div>

  <!-- Connections -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Connections</span>
    <div
      class="globe-toggle"
      class:on={showLinks}
      title="Toggle connection lines"
      onclick={toggleLinks}
      role="switch"
      aria-checked={showLinks}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && toggleLinks()}
    ></div>
  </div>

  <!-- Pulse -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Pulse</span>
    <div
      class="globe-toggle"
      class:on={pulseEnabled}
      title="Toggle breathing pulse animation"
      onclick={togglePulse}
      role="switch"
      aria-checked={pulseEnabled}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && togglePulse()}
    ></div>
  </div>

  <!-- Comet Trail -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Comet Trail</span>
    <div
      class="globe-toggle"
      class:on={cometEnabled}
      title="Toggle comet trail effect when rotating with WASD"
      onclick={toggleComet}
      role="switch"
      aria-checked={cometEnabled}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && toggleComet()}
    ></div>
  </div>

  <!-- Pulse Speed -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Pulse Speed</span>
    <input
      type="range"
      class="globe-pulse-slider"
      id="gc-pulse-speed"
      min="10"
      max="200"
      value={pulseSpeedVal}
      title="Pulse animation speed"
      oninput={handlePulseSpeed}
    />
  </div>

  <!-- Rotate Speed -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Rotate Speed</span>
    <input
      type="range"
      class="globe-speed-slider"
      id="gc-rotate-speed"
      min="5"
      max="200"
      value={rotateSpeedVal}
      title="Auto-rotation speed"
      oninput={handleRotateSpeed}
    />
  </div>

  <div class="divider"></div>

  <!-- Zoom -->
  <div class="globe-ctrl-row zoom-row">
    <div class="zoom-header">
      <span class="globe-ctrl-label">Zoom</span>
      <span class="globe-ctrl-label zoom-val">{zoomLabel}</span>
    </div>
    <input
      type="range"
      class="globe-zoom-slider"
      id="gc-zoom"
      min="10"
      max="100"
      value={zoomVal}
      title="Camera distance (zoom)"
      oninput={handleZoom}
    />
  </div>

  <div class="divider"></div>

  <!-- WASD Controls button -->
  <div class="globe-ctrl-row" style="justify-content:center">
    <button
      class="detail-btn wasd-btn"
      id="gc-wasd-guide"
      title="WASD Rotation Controls Guide"
      onclick={openWasdPopup}
    >
      &#9000; WASD Controls
    </button>
  </div>
</div>

<!-- WASD popup lives here so it shares the cometEnabled state -->
<WasdPopup
  visible={wasdPopupOpen}
  cometEnabled={cometEnabled}
  onclose={closeWasdPopup}
  oncometToggle={handleCometToggle}
/>

<style>
  /* Panel base (self-contained, always shown — parent controls visibility) */
  .panel {
    position: fixed;
    bottom: 60px;
    left: 16px;
    z-index: 25;
    background: var(--panel-bg);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 14px 16px;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.05);
    transition: border-color 0.3s;
    /* show by default — parent App hides/shows this panel by class */
    display: block;
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

  .globe-ctrl-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 3px 0;
    font-size: 11px;
  }
  .globe-ctrl-label {
    color: var(--text-dim);
    white-space: nowrap;
    min-width: 65px;
  }

  /* Toggle pill */
  .globe-toggle {
    position: relative;
    width: 32px;
    height: 16px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.3s;
    flex-shrink: 0;
  }
  .globe-toggle::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--text-dim);
    transition: all 0.3s;
  }
  .globe-toggle.on {
    background: rgba(0, 212, 255, 0.2);
    border-color: var(--accent);
  }
  .globe-toggle.on::after {
    left: 18px;
    background: var(--accent);
  }

  /* Sliders */
  .globe-zoom-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, var(--accent) 100%);
    outline: none;
    cursor: pointer;
    margin: 4px 0;
  }
  .globe-zoom-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--accent);
    cursor: pointer;
  }
  .globe-zoom-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--accent);
    cursor: pointer;
  }

  .globe-pulse-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 80px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, #a855f7 100%);
    outline: none;
    cursor: pointer;
  }
  .globe-pulse-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #a855f7;
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px #a855f7;
    cursor: pointer;
  }
  .globe-pulse-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #a855f7;
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px #a855f7;
    cursor: pointer;
  }

  .globe-speed-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 80px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, var(--green) 100%);
    outline: none;
    cursor: pointer;
  }
  .globe-speed-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--green);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--green);
    cursor: pointer;
  }
  .globe-speed-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--green);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--green);
    cursor: pointer;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: var(--border);
    margin: 6px 0;
  }

  /* Zoom row needs column layout */
  .zoom-row {
    flex-direction: column;
    gap: 4px;
  }
  .zoom-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .zoom-val {
    text-align: right;
    color: var(--accent);
  }

  /* WASD button */
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
  .wasd-btn {
    width: 100%;
    text-align: center;
  }
</style>
