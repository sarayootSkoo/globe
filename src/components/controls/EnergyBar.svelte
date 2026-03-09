<script lang="ts">
  import { captureCurrentState, computeEnergyScore, activePresetName } from '../../lib/stores/presetState';
  import type { Preset } from '../../lib/stores/presetState';
  import * as fx from '../../lib/stores/themeEffects';
  import * as globe from '../../lib/stores/globeState';
  import { glowLevel } from '../../lib/stores/appState';

  // ── Live energy score from current stores ─────────────────────────────────
  let energy = $state(0);
  let activeName = $state<string | null>(null);

  $effect(() => {
    // Subscribe to key energy-driving stores so we recompute on change
    const unsubs = [
      fx.effectDensity.subscribe(() => update()),
      fx.effectSpeed.subscribe(() => update()),
      glowLevel.subscribe(() => update()),
      fx.showNebula.subscribe(() => update()),
      fx.showGlitter.subscribe(() => update()),
      fx.showShootingStars.subscribe(() => update()),
      fx.showEmbers.subscribe(() => update()),
      fx.showSnowflakes.subscribe(() => update()),
      fx.showLightning.subscribe(() => update()),
      fx.showElectricArcs.subscribe(() => update()),
      fx.showPlasmaAura.subscribe(() => update()),
      fx.showSparkBurst.subscribe(() => update()),
      fx.showBgMesh.subscribe(() => update()),
      fx.borderEnabled.subscribe(() => update()),
      fx.bloomEnabled.subscribe(() => update()),
      fx.blackholeEnabled.subscribe(() => update()),
      fx.fireworksEnabled.subscribe(() => update()),
      activePresetName.subscribe(v => { activeName = v; }),
    ];
    return () => unsubs.forEach(u => u());
  });

  function update(): void {
    const snapshot = captureCurrentState();
    const pseudo: Preset = { name: '_live', settings: snapshot };
    energy = computeEnergyScore(pseudo);
  }

  // ── Derived display values ────────────────────────────────────────────────
  let pct = $derived(Math.round(energy * 100));
  let levelLabel = $derived(
    energy < 0.10 ? 'Idle' :
    energy < 0.25 ? 'Low' :
    energy < 0.45 ? 'Med' :
    energy < 0.60 ? 'High' :
    energy < 0.80 ? 'Heavy' : 'Max'
  );
  let presetTag = $derived(activeName ?? 'Custom');

  // Slider position (0–100%)
  let sliderPos = $derived(Math.min(energy * 100, 100));

  function levelColor(e: number): string {
    if (e < 0.25) return '#22ff88';
    if (e < 0.45) return '#88ee44';
    if (e < 0.60) return '#ffcc00';
    if (e < 0.80) return '#ff8833';
    return '#ff3333';
  }
</script>

<div class="energy-bar">
  <div class="energy-header">
    <span class="energy-label">E N E R G Y</span>
    <span class="energy-bolt">⚡</span>
    <span class="energy-level" style="color: {levelColor(energy)}">{levelLabel}</span>
    <span class="energy-tag">{presetTag}</span>
    <span class="energy-pct">~{pct}%</span>
  </div>

  <div class="energy-track">
    <!-- Gradient bar -->
    <div class="track-bg"></div>

    <!-- Scale markers -->
    <div class="scale-marks">
      <span class="mark" style="left: 0%">⏸</span>
      <span class="mark" style="left: 25%">⚡</span>
      <span class="mark" style="left: 50%">⚡</span>
      <span class="mark" style="left: 75%">⚡</span>
      <span class="mark" style="left: 90%" title="Fire">🔥</span>
      <span class="mark" style="left: 100%" title="Max">🔥</span>
    </div>

    <!-- Indicator thumb (read-only, follows live energy) -->
    <div class="thumb" style="left: {sliderPos}%; --thumb-color: {levelColor(energy)}"></div>
  </div>
</div>

<style>
  .energy-bar {
    margin-bottom: 8px;
  }

  .energy-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 6px;
    font-size: 10px;
    letter-spacing: 2px;
  }
  .energy-label {
    color: var(--accent, #00d4ff);
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .energy-bolt {
    font-size: 12px;
    filter: brightness(1.3);
  }
  .energy-level {
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 11px;
  }
  .energy-tag {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    padding: 1px 6px;
    font-size: 9px;
    color: var(--text-dim, #888);
    letter-spacing: 0.5px;
  }
  .energy-pct {
    margin-left: auto;
    color: var(--text-dim, #888);
    font-size: 10px;
    letter-spacing: 0.5px;
  }

  /* ── Track ─────────────────────────────────── */
  .energy-track {
    position: relative;
    height: 20px;
    margin: 0 2px;
  }
  .track-bg {
    position: absolute;
    top: 8px;
    left: 0;
    right: 0;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(90deg,
      #1a3a2a 0%,
      #22ff88 15%,
      #88ee44 30%,
      #ffcc00 50%,
      #ff8833 70%,
      #ff3333 85%,
      #cc1111 100%
    );
    opacity: 0.7;
  }

  /* ── Scale markers ─────────────────────────── */
  .scale-marks {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    pointer-events: none;
  }
  .mark {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 8px;
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  /* ── Thumb indicator ───────────────────────── */
  .thumb {
    position: absolute;
    top: 4px;
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: var(--thumb-color, #22ff88);
    border: 2px solid rgba(255, 255, 255, 0.6);
    transform: translateX(-50%);
    box-shadow:
      0 0 6px var(--thumb-color, #22ff88),
      0 0 12px rgba(0, 0, 0, 0.4);
    transition: left 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    pointer-events: none;
    z-index: 2;
  }
</style>
