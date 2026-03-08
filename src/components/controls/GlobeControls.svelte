<script lang="ts">
  import * as globeStore from '../../lib/stores/globeState';
  import * as fx from '../../lib/stores/themeEffects';
  import { theme } from '../../lib/stores/appState';
  import type { Theme } from '../../lib/stores/appState';
  import WasdPopup from '../wasd/WasdPopup.svelte';
  import PresetSystem from './PresetSystem.svelte';
  import ScreenshotBtn from './ScreenshotBtn.svelte';
  import { audioEnabled, audioBass, audioMid, audioHigh, audioSensitivity, toggleAudio } from '../../lib/stores/audioReactive';

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
  let opacityVal      = $state(100);  // raw slider value 10–100 → 0.1–1.0
  let dotBrightVal    = $state(100);  // raw slider value 0–2000 → 0–20
  let tourSpeedVal    = $state(100);  // raw slider value 10–500 → 0.1–5

  let wasdPopupOpen = $state(false);

  // Audio reactive
  let audioOn = $state(false);
  let bassLvl = $state(0);
  let midLvl = $state(0);
  let highLvl = $state(0);
  let audioSensVal = $state(100);

  // ── Collapse state (persisted) ──────────────────────────────────────────────
  import { safeGet, safeSet } from '../../lib/utils/storage';
  let globeOpen = $state(safeGet<boolean>('ui.globeOpen', true));
  let fxOpen    = $state(safeGet<boolean>('ui.fxOpen', true));

  function toggleGlobeSection(): void {
    globeOpen = !globeOpen;
    safeSet('ui.globeOpen', globeOpen);
  }
  function toggleFxSection(): void {
    fxOpen = !fxOpen;
    safeSet('ui.fxOpen', fxOpen);
  }

  // ── Theme effect controls ──────────────────────────────────────────────────
  let currentTheme = $state<Theme>('dark');
  let fxDensityVal  = $state(100);   // 0–200 slider → 0–2
  let fxSpeedVal    = $state(100);   // 25–300 slider → 0.25–3
  let fxNebula      = $state(true);
  let fxGlitter     = $state(true);
  let fxShootStars  = $state(true);
  let fxEmbers      = $state(true);
  let fxSnowflakes  = $state(true);
  let fxBgStars     = $state(true);
  let fxBgMesh      = $state(true);
  let fxLightning   = $state(true);
  let fxElecArcs    = $state(true);
  let fxPlasmaAura  = $state(true);
  let fxElecArcIntVal   = $state(100); // 20–300 → 0.2–3
  let fxElecArcSpdVal   = $state(100); // 25–300 → 0.25–3
  let fxElecArcCntVal   = $state(100); // 20–300 → 0.2–3
  let fxElecOrbitSpdVal = $state(100); // 25–300 → 0.25–3
  let fxElecCoreGlowVal = $state(100); // 20–300 → 0.2–3
  let fxSparkBurst  = $state(true);
  let fxSparkIntVal = $state(100);    // 20–300 → 0.2–3
  let fxSparkRateVal = $state(100);   // 25–300 → 0.25–3
  let fxBorder      = $state(true);
  let fxBorderIntVal = $state(100);  // 20–200 → 0.2–2
  let fxBorderSpdVal = $state(100);  // 25–300 → 0.25–3

  // Black hole controls
  let fxBhEnabled    = $state(false);
  let fxBhSizeVal    = $state(100);   // 0–2000 → 0–20
  let fxBhSpeedVal   = $state(100);   // 0–2000 → 0–20
  let fxBhGlowVal    = $state(100);   // 0–2000 → 0–20
  let fxBhWidthVal   = $state(100);   // 0–2000 → 0–20
  let fxBhHeightVal  = $state(100);   // 0–2000 → 0–20
  let fxBhHueVal     = $state(280);   // 0–360 raw

  // Bloom (post-processing) controls
  let fxBloom        = $state(false);
  let fxBloomStrVal  = $state(100);   // 0–500 → 0–5
  let fxBloomRadVal  = $state(40);    // 0–200 → 0–2
  let fxBloomThrVal  = $state(30);    // 0–100 → 0–1

  // ── Subscribe to stores ──────────────────────────────────────────────────────
  $effect(() => {
    const u1  = globeStore.autoRotate.subscribe(v    => { autoRotate    = v; });
    const u2  = globeStore.showWireframe.subscribe(v => { showWireframe = v; });
    const u3  = globeStore.showDots.subscribe(v      => { showDots      = v; });
    const u4  = globeStore.showLinks.subscribe(v     => { showLinks     = v; });
    const u5  = globeStore.pulseEnabled.subscribe(v  => { pulseEnabled  = v; });
    const u6  = globeStore.cometEnabled.subscribe(v  => { cometEnabled  = v; });
    const u7  = globeStore.pulseSpeed.subscribe(v    => { pulseSpeedVal  = Math.round(v * 100); });
    const u8  = globeStore.rotateSpeed.subscribe(v   => { rotateSpeedVal = Math.round(v * 100); });
    const u9  = globeStore.zoomLevel.subscribe(v     => { zoomVal = v; });
    const u28 = globeStore.globeOpacity.subscribe(v  => { opacityVal = Math.round(v * 100); });
    const u35 = globeStore.dotBrightness.subscribe(v => { dotBrightVal = Math.round(v * 100); });
    const u43 = globeStore.tourSpeed.subscribe(v      => { tourSpeedVal = Math.round(v * 100); });
    const u44 = audioEnabled.subscribe(v               => { audioOn = v; });
    const u45 = audioBass.subscribe(v                   => { bassLvl = v; });
    const u46 = audioMid.subscribe(v                    => { midLvl = v; });
    const u47 = audioHigh.subscribe(v                   => { highLvl = v; });
    const u48 = audioSensitivity.subscribe(v            => { audioSensVal = Math.round(v * 100); });
    const u10 = theme.subscribe(v                    => { currentTheme = v; });
    const u11 = fx.effectDensity.subscribe(v         => { fxDensityVal = Math.round(v * 100); });
    const u12 = fx.effectSpeed.subscribe(v           => { fxSpeedVal = Math.round(v * 100); });
    const u13 = fx.showNebula.subscribe(v            => { fxNebula = v; });
    const u14 = fx.showGlitter.subscribe(v           => { fxGlitter = v; });
    const u15 = fx.showShootingStars.subscribe(v     => { fxShootStars = v; });
    const u16 = fx.showEmbers.subscribe(v            => { fxEmbers = v; });
    const u17 = fx.showSnowflakes.subscribe(v        => { fxSnowflakes = v; });
    const u23 = fx.showLightning.subscribe(v         => { fxLightning = v; });
    const u24 = fx.showElectricArcs.subscribe(v      => { fxElecArcs = v; });
    const u25 = fx.showPlasmaAura.subscribe(v        => { fxPlasmaAura = v; });
    const u26 = fx.electricArcIntensity.subscribe(v  => { fxElecArcIntVal = Math.round(v * 100); });
    const u27 = fx.electricArcSpeed.subscribe(v      => { fxElecArcSpdVal = Math.round(v * 100); });
    const u29 = fx.electricArcCount.subscribe(v      => { fxElecArcCntVal = Math.round(v * 100); });
    const u30 = fx.electricOrbitSpeed.subscribe(v    => { fxElecOrbitSpdVal = Math.round(v * 100); });
    const u31 = fx.electricCoreGlow.subscribe(v      => { fxElecCoreGlowVal = Math.round(v * 100); });
    const u32 = fx.showSparkBurst.subscribe(v        => { fxSparkBurst = v; });
    const u33 = fx.sparkBurstIntensity.subscribe(v   => { fxSparkIntVal = Math.round(v * 100); });
    const u34 = fx.sparkBurstRate.subscribe(v        => { fxSparkRateVal = Math.round(v * 100); });
    const u18 = fx.showBgStars.subscribe(v           => { fxBgStars = v; });
    const u19 = fx.showBgMesh.subscribe(v            => { fxBgMesh = v; });
    const u20 = fx.borderEnabled.subscribe(v         => { fxBorder = v; });
    const u21 = fx.borderIntensity.subscribe(v       => { fxBorderIntVal = Math.round(v * 100); });
    const u22 = fx.borderSpeed.subscribe(v           => { fxBorderSpdVal = Math.round(v * 100); });
    const u36 = fx.blackholeEnabled.subscribe(v      => { fxBhEnabled = v; });
    const u37 = fx.blackholeSize.subscribe(v         => { fxBhSizeVal = Math.round(v * 100); });
    const u38 = fx.blackholeSpeed.subscribe(v        => { fxBhSpeedVal = Math.round(v * 100); });
    const u39 = fx.blackholeGlow.subscribe(v         => { fxBhGlowVal = Math.round(v * 100); });
    const u40 = fx.blackholeWidth.subscribe(v        => { fxBhWidthVal = Math.round(v * 100); });
    const u41 = fx.blackholeHeight.subscribe(v       => { fxBhHeightVal = Math.round(v * 100); });
    const u42 = fx.blackholeHue.subscribe(v          => { fxBhHueVal = Math.round(v); });
    const u49 = fx.bloomEnabled.subscribe(v          => { fxBloom = v; });
    const u50 = fx.bloomStrength.subscribe(v         => { fxBloomStrVal = Math.round(v * 100); });
    const u51 = fx.bloomRadius.subscribe(v           => { fxBloomRadVal = Math.round(v * 100); });
    const u52 = fx.bloomThreshold.subscribe(v        => { fxBloomThrVal = Math.round(v * 100); });
    return () => { u1(); u2(); u3(); u4(); u5(); u6(); u7(); u8(); u9();
                   u10(); u11(); u12(); u13(); u14(); u15(); u16(); u17(); u18(); u19();
                   u20(); u21(); u22(); u23(); u24(); u25(); u26(); u27(); u28();
                   u29(); u30(); u31(); u32(); u33(); u34(); u35();
                   u36(); u37(); u38(); u39(); u40(); u41(); u42(); u43();
                   u44(); u45(); u46(); u47(); u48(); u49(); u50(); u51(); u52(); };
  });

  // ── Zoom display label ───────────────────────────────────────────────────────
  // 55 is the default (100%). Scale linearly relative to that.
  let zoomLabel    = $derived(Math.round(zoomVal * 100 / 55) + '%');
  let opacityLabel = $derived(opacityVal + '%');
  let dotBrightLabel = $derived(dotBrightVal + '%');
  let tourSpeedLabel = $derived(tourSpeedVal + '%');

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
  }

  function handleOpacity(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    opacityVal = raw;
    globeStore.globeOpacity.set(raw / 100); // 10–100 → 0.1–1.0
  }

  function handleDotBrightness(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    dotBrightVal = raw;
    globeStore.dotBrightness.set(raw / 100); // 0–2000 → 0–20
  }

  function handleTourSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    tourSpeedVal = raw;
    globeStore.tourSpeed.set(raw / 100); // 10–500 → 0.1–5
  }

  let audioSensLabel = $derived(audioSensVal + '%');
  function handleAudioSens(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    audioSensitivity.set(raw / 100);
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

  // ── Auto tour ───────────────────────────────────────────────────────────────
  let tourActive = $state(false);

  function toggleAutoTour(): void {
    tourActive = !tourActive;
    document.dispatchEvent(new CustomEvent('kg:autotour', {
      detail: { action: tourActive ? 'start' : 'stop' },
    }));
  }

  // Sync tour active state with keyboard shortcut toggles
  $effect(() => {
    const handler = () => { tourActive = !tourActive; };
    document.addEventListener('kg:tour-toggled', handler);
    return () => document.removeEventListener('kg:tour-toggled', handler);
  });

  // ── Theme effect handlers ──────────────────────────────────────────────────
  let fxDensityLabel = $derived(fxDensityVal + '%');
  let fxSpeedLabel   = $derived(fxSpeedVal + '%');

  // Which effects are relevant for the current theme
  let isFireTheme   = $derived(currentTheme === 'fire');
  let isWinterTheme = $derived(currentTheme === 'winter');
  let isGalaxyTheme   = $derived(currentTheme === 'galaxy');
  let isElectricTheme = $derived(currentTheme === 'electric');
  let hasThemeEffects = $derived(isFireTheme || isWinterTheme || isGalaxyTheme || isElectricTheme);

  function handleFxDensity(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.effectDensity.set(raw / 100);
  }

  function handleFxSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.effectSpeed.set(raw / 100);
  }

  let fxElecArcIntLabel   = $derived(fxElecArcIntVal + '%');
  let fxElecArcSpdLabel   = $derived(fxElecArcSpdVal + '%');
  let fxElecArcCntLabel   = $derived(fxElecArcCntVal + '%');
  let fxElecOrbitSpdLabel = $derived(fxElecOrbitSpdVal + '%');
  let fxElecCoreGlowLabel = $derived(fxElecCoreGlowVal + '%');
  let fxSparkIntLabel    = $derived(fxSparkIntVal + '%');
  let fxSparkRateLabel   = $derived(fxSparkRateVal + '%');
  let fxBorderIntLabel = $derived(fxBorderIntVal + '%');
  let fxBorderSpdLabel = $derived(fxBorderSpdVal + '%');

  function handleElecArcIntensity(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.electricArcIntensity.set(raw / 100);
  }

  function handleElecArcSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.electricArcSpeed.set(raw / 100);
  }

  function handleElecArcCount(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.electricArcCount.set(raw / 100);
  }

  function handleElecOrbitSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.electricOrbitSpeed.set(raw / 100);
  }

  function handleElecCoreGlow(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.electricCoreGlow.set(raw / 100);
  }

  function handleSparkIntensity(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.sparkBurstIntensity.set(raw / 100);
  }

  function handleSparkRate(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.sparkBurstRate.set(raw / 100);
  }

  function handleBorderIntensity(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.borderIntensity.set(raw / 100);
  }

  function handleBorderSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.borderSpeed.set(raw / 100);
  }

  // ── Black hole handlers ───────────────────────────────────────────────────
  let fxBhSizeLabel   = $derived(fxBhSizeVal + '%');
  let fxBhSpeedLabel  = $derived(fxBhSpeedVal + '%');
  let fxBhGlowLabel   = $derived(fxBhGlowVal + '%');
  let fxBhWidthLabel  = $derived(fxBhWidthVal + '%');
  let fxBhHeightLabel = $derived(fxBhHeightVal + '%');
  let fxBhHueLabel    = $derived(fxBhHueVal + '\u00B0');

  function handleBhSize(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.blackholeSize.set(raw / 100);
  }
  function handleBhSpeed(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.blackholeSpeed.set(raw / 100);
  }
  function handleBhGlow(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.blackholeGlow.set(raw / 100);
  }
  function handleBhWidth(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.blackholeWidth.set(raw / 100);
  }
  function handleBhHeight(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.blackholeHeight.set(raw / 100);
  }
  function handleBhHue(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.blackholeHue.set(raw);
  }

  // ── Bloom (post-processing) handlers ──────────────────────────────────────
  let fxBloomStrLabel = $derived(fxBloomStrVal + '%');
  let fxBloomRadLabel = $derived(fxBloomRadVal + '%');
  let fxBloomThrLabel = $derived(fxBloomThrVal + '%');

  function handleBloomStr(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.bloomStrength.set(raw / 100);
  }
  function handleBloomRad(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.bloomRadius.set(raw / 100);
  }
  function handleBloomThr(e: Event): void {
    const raw = parseInt((e.target as HTMLInputElement).value, 10);
    fx.bloomThreshold.set(raw / 100);
  }
</script>

<div class="panel" id="globe-controls">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="panel-title section-header" onclick={toggleGlobeSection}>
    <span>Globe Controls</span>
    <span class="chevron" class:open={globeOpen}></span>
  </div>

  {#if globeOpen}
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

  <!-- Dot Brightness -->
  <div class="globe-ctrl-row zoom-row">
    <div class="zoom-header">
      <span class="globe-ctrl-label">Dot Light</span>
      <span class="globe-ctrl-label zoom-val">{dotBrightLabel}</span>
    </div>
    <input
      type="range"
      class="globe-opacity-slider"
      min="0"
      max="2000"
      value={dotBrightVal}
      title="Dot sphere brightness (0–2000%)"
      oninput={handleDotBrightness}
    />
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

  <!-- Globe Opacity -->
  <div class="globe-ctrl-row zoom-row">
    <div class="zoom-header">
      <span class="globe-ctrl-label">Opacity</span>
      <span class="globe-ctrl-label zoom-val">{opacityLabel}</span>
    </div>
    <input
      type="range"
      class="globe-opacity-slider"
      min="10"
      max="100"
      value={opacityVal}
      title="Globe wireframe & dot opacity (reduce to prevent blowout with effects)"
      oninput={handleOpacity}
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

  <!-- Tour & Screenshot -->
  <div class="globe-ctrl-row" style="justify-content:center; gap: 6px;">
    <button
      class="detail-btn"
      class:tour-active={tourActive}
      title={tourActive ? 'Stop auto-tour' : 'Start auto-tour'}
      onclick={toggleAutoTour}
    >
      {tourActive ? '■ Stop Tour' : '▶ Auto Tour'}
    </button>
    <ScreenshotBtn />
  </div>

  <!-- Tour Speed -->
  <div class="globe-ctrl-row zoom-row">
    <div class="zoom-header">
      <span class="globe-ctrl-label">Tour Speed</span>
      <span class="globe-ctrl-label zoom-val">{tourSpeedLabel}</span>
    </div>
    <input
      type="range"
      class="fx-speed-slider"
      min="10"
      max="500"
      value={tourSpeedVal}
      title="Auto tour speed (10%=slow, 500%=fast)"
      oninput={handleTourSpeed}
    />
  </div>

  <div class="divider"></div>

  <!-- Audio Reactive -->
  <div class="globe-ctrl-row" style="justify-content:center">
    <button
      class="detail-btn"
      class:audio-active={audioOn}
      title={audioOn ? 'Stop audio reactive' : 'Start audio reactive (mic)'}
      onclick={() => toggleAudio()}
    >
      {audioOn ? '■ Stop Audio' : '♫ Audio React'}
    </button>
  </div>

  {#if audioOn}
    <div class="audio-bars">
      <div class="audio-bar-group">
        <div class="audio-bar bass" style="height:{Math.round(bassLvl * 100)}%"></div>
        <span class="audio-bar-label">Bass</span>
      </div>
      <div class="audio-bar-group">
        <div class="audio-bar mid" style="height:{Math.round(midLvl * 100)}%"></div>
        <span class="audio-bar-label">Mid</span>
      </div>
      <div class="audio-bar-group">
        <div class="audio-bar high" style="height:{Math.round(highLvl * 100)}%"></div>
        <span class="audio-bar-label">High</span>
      </div>
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Sensitivity</span>
        <span class="globe-ctrl-label zoom-val">{audioSensLabel}</span>
      </div>
      <input type="range" class="fx-density-slider" min="10" max="300" value={audioSensVal}
        title="Audio sensitivity (10%–300%)" oninput={handleAudioSens} />
    </div>
  {/if}
  {/if}

  <div class="divider"></div>

  <!-- ── Theme Effects Section ──────────────────────────────────────────── -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="panel-title fx-title section-header" onclick={toggleFxSection}>
    <span>Theme Effects</span>
    <span class="chevron" class:open={fxOpen}></span>
  </div>

  {#if fxOpen}
  <!-- Background Stars -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">BG Stars</span>
    <div
      class="globe-toggle"
      class:on={fxBgStars}
      title="Toggle background star particles"
      onclick={() => fx.showBgStars.update(v => !v)}
      role="switch"
      aria-checked={fxBgStars}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && fx.showBgStars.update(v => !v)}
    ></div>
  </div>

  <!-- Background Mesh -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">BG Mesh</span>
    <div
      class="globe-toggle"
      class:on={fxBgMesh}
      title="Toggle background mesh grid"
      onclick={() => fx.showBgMesh.update(v => !v)}
      role="switch"
      aria-checked={fxBgMesh}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && fx.showBgMesh.update(v => !v)}
    ></div>
  </div>

  <!-- Magic Border -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Border FX</span>
    <div
      class="globe-toggle"
      class:on={fxBorder}
      title="Toggle magic border glow effect"
      onclick={() => fx.borderEnabled.update(v => !v)}
      role="switch"
      aria-checked={fxBorder}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && fx.borderEnabled.update(v => !v)}
    ></div>
  </div>

  {#if fxBorder}
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Border Glow</span>
        <span class="globe-ctrl-label zoom-val">{fxBorderIntLabel}</span>
      </div>
      <input
        type="range"
        class="fx-density-slider"
        min="0"
        max="2000"
        value={fxBorderIntVal}
        title="Border glow intensity (0% = off, 2000% = extreme)"
        oninput={handleBorderIntensity}
      />
    </div>
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Border Speed</span>
        <span class="globe-ctrl-label zoom-val">{fxBorderSpdLabel}</span>
      </div>
      <input
        type="range"
        class="fx-speed-slider"
        min="0"
        max="2000"
        value={fxBorderSpdVal}
        title="Border animation speed"
        oninput={handleBorderSpeed}
      />
    </div>
  {/if}

  <!-- Black Hole Effect -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Black Hole</span>
    <div
      class="globe-toggle"
      class:on={fxBhEnabled}
      title="Toggle black hole effect"
      onclick={() => fx.blackholeEnabled.update(v => !v)}
      role="switch"
      aria-checked={fxBhEnabled}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && fx.blackholeEnabled.update(v => !v)}
    ></div>
  </div>

  {#if fxBhEnabled}
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">BH Size</span>
        <span class="globe-ctrl-label zoom-val">{fxBhSizeLabel}</span>
      </div>
      <input type="range" class="fx-density-slider" min="0" max="2000" value={fxBhSizeVal}
        title="Black hole size (0%–2000%)" oninput={handleBhSize} />
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">BH Speed</span>
        <span class="globe-ctrl-label zoom-val">{fxBhSpeedLabel}</span>
      </div>
      <input type="range" class="fx-speed-slider" min="0" max="2000" value={fxBhSpeedVal}
        title="Black hole animation speed (0%–2000%)" oninput={handleBhSpeed} />
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">BH Glow</span>
        <span class="globe-ctrl-label zoom-val">{fxBhGlowLabel}</span>
      </div>
      <input type="range" class="fx-density-slider" min="0" max="2000" value={fxBhGlowVal}
        title="Black hole glow intensity (0%–2000%)" oninput={handleBhGlow} />
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">BH Width</span>
        <span class="globe-ctrl-label zoom-val">{fxBhWidthLabel}</span>
      </div>
      <input type="range" class="fx-density-slider" min="0" max="2000" value={fxBhWidthVal}
        title="Black hole horizontal stretch (0%–2000%)" oninput={handleBhWidth} />
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">BH Height</span>
        <span class="globe-ctrl-label zoom-val">{fxBhHeightLabel}</span>
      </div>
      <input type="range" class="fx-density-slider" min="0" max="2000" value={fxBhHeightVal}
        title="Black hole vertical stretch (0%–2000%)" oninput={handleBhHeight} />
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">BH Color</span>
        <span class="globe-ctrl-label zoom-val">{fxBhHueLabel}</span>
      </div>
      <input type="range" class="bh-hue-slider" min="0" max="360" value={fxBhHueVal}
        title="Black hole color hue (0°–360°)" oninput={handleBhHue} />
    </div>
  {/if}

  <!-- Bloom (Post-Processing) -->
  <div class="globe-ctrl-row">
    <span class="globe-ctrl-label">Bloom</span>
    <div
      class="globe-toggle"
      class:on={fxBloom}
      title="Toggle bloom post-processing"
      onclick={() => fx.bloomEnabled.update(v => !v)}
      role="switch"
      aria-checked={fxBloom}
      tabindex="0"
      onkeydown={(e) => e.key === 'Enter' && fx.bloomEnabled.update(v => !v)}
    ></div>
  </div>

  {#if fxBloom}
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Strength</span>
        <span class="globe-ctrl-label zoom-val">{fxBloomStrLabel}</span>
      </div>
      <input type="range" class="fx-density-slider" min="0" max="500" value={fxBloomStrVal}
        title="Bloom strength (0%–500%)" oninput={handleBloomStr} />
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Radius</span>
        <span class="globe-ctrl-label zoom-val">{fxBloomRadLabel}</span>
      </div>
      <input type="range" class="fx-speed-slider" min="0" max="200" value={fxBloomRadVal}
        title="Bloom radius (0%–200%)" oninput={handleBloomRad} />
    </div>

    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Threshold</span>
        <span class="globe-ctrl-label zoom-val">{fxBloomThrLabel}</span>
      </div>
      <input type="range" class="fx-density-slider" min="0" max="100" value={fxBloomThrVal}
        title="Bloom threshold (0%–100%)" oninput={handleBloomThr} />
    </div>
  {/if}

  <div class="divider"></div>

  <!-- Theme-specific toggles (only show when relevant) -->
  {#if isFireTheme}
    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Embers</span>
      <div
        class="globe-toggle"
        class:on={fxEmbers}
        title="Toggle fire ember particles"
        onclick={() => fx.showEmbers.update(v => !v)}
        role="switch"
        aria-checked={fxEmbers}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showEmbers.update(v => !v)}
      ></div>
    </div>
  {/if}

  {#if isWinterTheme}
    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Snowflakes</span>
      <div
        class="globe-toggle"
        class:on={fxSnowflakes}
        title="Toggle falling snowflakes"
        onclick={() => fx.showSnowflakes.update(v => !v)}
        role="switch"
        aria-checked={fxSnowflakes}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showSnowflakes.update(v => !v)}
      ></div>
    </div>
  {/if}

  {#if isGalaxyTheme}
    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Nebula</span>
      <div
        class="globe-toggle"
        class:on={fxNebula}
        title="Toggle nebula cloud layers"
        onclick={() => fx.showNebula.update(v => !v)}
        role="switch"
        aria-checked={fxNebula}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showNebula.update(v => !v)}
      ></div>
    </div>

    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Glitter</span>
      <div
        class="globe-toggle"
        class:on={fxGlitter}
        title="Toggle glitter sparkle effect"
        onclick={() => fx.showGlitter.update(v => !v)}
        role="switch"
        aria-checked={fxGlitter}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showGlitter.update(v => !v)}
      ></div>
    </div>

    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Comets</span>
      <div
        class="globe-toggle"
        class:on={fxShootStars}
        title="Toggle shooting star comets"
        onclick={() => fx.showShootingStars.update(v => !v)}
        role="switch"
        aria-checked={fxShootStars}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showShootingStars.update(v => !v)}
      ></div>
    </div>
  {/if}

  <!-- Electric / Energy effects (available on all themes) -->
    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Lightning</span>
      <div
        class="globe-toggle"
        class:on={fxLightning}
        title="Toggle background lightning bolts"
        onclick={() => fx.showLightning.update(v => !v)}
        role="switch"
        aria-checked={fxLightning}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showLightning.update(v => !v)}
      ></div>
    </div>

    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Globe Arcs</span>
      <div
        class="globe-toggle"
        class:on={fxElecArcs}
        title="Toggle electric arcs around the globe"
        onclick={() => fx.showElectricArcs.update(v => !v)}
        role="switch"
        aria-checked={fxElecArcs}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showElectricArcs.update(v => !v)}
      ></div>
    </div>

    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Plasma Aura</span>
      <div
        class="globe-toggle"
        class:on={fxPlasmaAura}
        title="Toggle plasma glow aura around globe"
        onclick={() => fx.showPlasmaAura.update(v => !v)}
        role="switch"
        aria-checked={fxPlasmaAura}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showPlasmaAura.update(v => !v)}
      ></div>
    </div>

    <div class="globe-ctrl-row">
      <span class="globe-ctrl-label">Spark Burst</span>
      <div
        class="globe-toggle"
        class:on={fxSparkBurst}
        title="Toggle radial lightning spark burst"
        onclick={() => fx.showSparkBurst.update(v => !v)}
        role="switch"
        aria-checked={fxSparkBurst}
        tabindex="0"
        onkeydown={(e) => e.key === 'Enter' && fx.showSparkBurst.update(v => !v)}
      ></div>
    </div>

    {#if fxSparkBurst}
      <div class="globe-ctrl-row fx-slider-row">
        <div class="zoom-header">
          <span class="globe-ctrl-label">Spark Power</span>
          <span class="globe-ctrl-label zoom-val">{fxSparkIntLabel}</span>
        </div>
        <input
          type="range"
          class="fx-density-slider"
          min="0"
          max="2000"
          value={fxSparkIntVal}
          title="Spark burst bolt count & brightness (0% = off, 2000% = extreme)"
          oninput={handleSparkIntensity}
        />
      </div>
      <div class="globe-ctrl-row fx-slider-row">
        <div class="zoom-header">
          <span class="globe-ctrl-label">Spark Rate</span>
          <span class="globe-ctrl-label zoom-val">{fxSparkRateLabel}</span>
        </div>
        <input
          type="range"
          class="fx-speed-slider"
          min="0"
          max="2000"
          value={fxSparkRateVal}
          title="Spark burst pulse frequency (0% = off, 2000% = rapid-fire)"
          oninput={handleSparkRate}
        />
      </div>
    {/if}

    <!-- Arc Glow -->
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Arc Glow</span>
        <span class="globe-ctrl-label zoom-val">{fxElecArcIntLabel}</span>
      </div>
      <input
        type="range"
        class="fx-density-slider"
        min="0"
        max="2000"
        value={fxElecArcIntVal}
        title="Electric arc brightness (0% = off, 2000% = extreme)"
        oninput={handleElecArcIntensity}
      />
    </div>

    <!-- Arc Speed -->
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Arc Speed</span>
        <span class="globe-ctrl-label zoom-val">{fxElecArcSpdLabel}</span>
      </div>
      <input
        type="range"
        class="fx-speed-slider"
        min="0"
        max="2000"
        value={fxElecArcSpdVal}
        title="Arc animation speed (0% = frozen, 2000% = extreme)"
        oninput={handleElecArcSpeed}
      />
    </div>

    <!-- Arc Count -->
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Arc Count</span>
        <span class="globe-ctrl-label zoom-val">{fxElecArcCntLabel}</span>
      </div>
      <input
        type="range"
        class="fx-density-slider"
        min="0"
        max="2000"
        value={fxElecArcCntVal}
        title="Number of electric arcs & orbit rings (0% = none, 2000% = extreme)"
        oninput={handleElecArcCount}
      />
    </div>

    <!-- Orbit Speed -->
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Orbit Speed</span>
        <span class="globe-ctrl-label zoom-val">{fxElecOrbitSpdLabel}</span>
      </div>
      <input
        type="range"
        class="fx-speed-slider"
        min="0"
        max="2000"
        value={fxElecOrbitSpdVal}
        title="Energy ring orbit rotation speed (0% = frozen, 2000% = extreme)"
        oninput={handleElecOrbitSpeed}
      />
    </div>

    <!-- Core Glow -->
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Core Glow</span>
        <span class="globe-ctrl-label zoom-val">{fxElecCoreGlowLabel}</span>
      </div>
      <input
        type="range"
        class="fx-density-slider"
        min="0"
        max="2000"
        value={fxElecCoreGlowVal}
        title="Central energy core brightness (0% = off, 2000% = extreme)"
        oninput={handleElecCoreGlow}
      />
    </div>

  <!-- Density slider (always visible) -->
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Density</span>
        <span class="globe-ctrl-label zoom-val">{fxDensityLabel}</span>
      </div>
      <input
        type="range"
        class="fx-density-slider"
        min="0"
        max="2000"
        value={fxDensityVal}
        title="Particle density (0% = off, 2000% = extreme)"
        oninput={handleFxDensity}
      />
    </div>

    <!-- Speed slider -->
    <div class="globe-ctrl-row fx-slider-row">
      <div class="zoom-header">
        <span class="globe-ctrl-label">Speed</span>
        <span class="globe-ctrl-label zoom-val">{fxSpeedLabel}</span>
      </div>
      <input
        type="range"
        class="fx-speed-slider"
        min="0"
        max="2000"
        value={fxSpeedVal}
        title="Effect speed (0% = frozen, 2000% = extreme)"
        oninput={handleFxSpeed}
      />
    </div>
  {/if}

  <div class="divider"></div>
  <PresetSystem />
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
    padding: 10px 12px;
    width: 345px;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.05);
    transition: border-color 0.3s;
    display: block;
    /* Scrollable when content exceeds viewport */
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--accent) transparent;
  }
  .panel::-webkit-scrollbar {
    width: 4px;
  }
  .panel::-webkit-scrollbar-track {
    background: transparent;
  }
  .panel::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 2px;
    opacity: 0.4;
  }
  .panel::-webkit-scrollbar-thumb:hover {
    background: var(--text);
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

  /* Collapsible section header */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: color 0.2s;
  }
  .section-header:hover {
    color: var(--text);
  }
  .chevron {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid var(--accent);
    transition: transform 0.25s ease;
    transform: rotate(-90deg);
  }
  .chevron.open {
    transform: rotate(0deg);
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

  /* Opacity slider — white/accent */
  .globe-opacity-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, #ffffff 100%);
    outline: none;
    cursor: pointer;
    margin: 4px 0;
  }
  .globe-opacity-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  .globe-opacity-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
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
  .tour-active {
    background: rgba(255, 200, 50, 0.15) !important;
    border-color: #ffc832 !important;
    color: #ffc832 !important;
  }
  .audio-active {
    background: rgba(50, 255, 100, 0.15) !important;
    border-color: #32ff64 !important;
    color: #32ff64 !important;
  }

  /* Audio visualizer bars */
  .audio-bars {
    display: flex;
    justify-content: center;
    gap: 8px;
    height: 40px;
    margin: 6px 0;
    align-items: flex-end;
  }
  .audio-bar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 28px;
    height: 100%;
    justify-content: flex-end;
  }
  .audio-bar {
    width: 100%;
    min-height: 2px;
    border-radius: 2px 2px 0 0;
    transition: height 0.05s;
  }
  .audio-bar.bass { background: #ff4040; }
  .audio-bar.mid  { background: #ffaa20; }
  .audio-bar.high { background: #40ff80; }
  .audio-bar-label {
    font-size: 8px;
    color: var(--text-dim);
    margin-top: 2px;
  }

  /* Theme Effects sub-title */
  .fx-title {
    margin-top: 2px;
    margin-bottom: 8px;
  }

  .fx-slider-row {
    flex-direction: column;
    gap: 4px;
  }

  /* Density slider — orange */
  .fx-density-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, var(--orange) 100%);
    outline: none;
    cursor: pointer;
    margin: 2px 0;
  }
  .fx-density-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--orange);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--orange);
    cursor: pointer;
  }
  .fx-density-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--orange);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--orange);
    cursor: pointer;
  }

  /* Black hole hue slider — rainbow gradient */
  .bh-hue-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg,
      hsl(0,80%,50%),
      hsl(60,80%,50%),
      hsl(120,80%,50%),
      hsl(180,80%,50%),
      hsl(240,80%,50%),
      hsl(300,80%,50%),
      hsl(360,80%,50%)
    );
    outline: none;
    cursor: pointer;
    margin: 2px 0;
  }
  .bh-hue-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    border: 2px solid var(--bg);
    box-shadow: 0 0 6px rgba(255,255,255,0.6);
    cursor: pointer;
  }
  .bh-hue-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    border: 2px solid var(--bg);
    box-shadow: 0 0 6px rgba(255,255,255,0.6);
    cursor: pointer;
  }

  /* Speed slider — yellow */
  .fx-speed-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, var(--yellow) 100%);
    outline: none;
    cursor: pointer;
    margin: 2px 0;
  }
  .fx-speed-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--yellow);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--yellow);
    cursor: pointer;
  }
  .fx-speed-slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--yellow);
    border: 2px solid var(--bg);
    box-shadow: 0 0 5px var(--yellow);
    cursor: pointer;
  }
</style>
