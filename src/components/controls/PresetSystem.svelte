<script lang="ts">
  import { presets, activePresetName, applyPreset, savePreset, deletePreset, initPresets, resetToDefaults, disableAllEffects, exportPresetsAsFile, importPresetsFromFile, computeEnergyScore } from '../../lib/stores/presetState';
  import type { Preset } from '../../lib/stores/presetState';

  let presetList = $state<Preset[]>([]);
  let activeName = $state<string | null>(null);

  // Sorted by energy score ascending (lowest energy first)
  let sortedPresets = $derived(
    [...presetList]
      .map(p => ({ preset: p, energy: computeEnergyScore(p) }))
      .sort((a, b) => a.energy - b.energy)
  );
  let showSaveInput = $state(false);
  let newPresetName = $state('');
  let importStatus = $state('');

  $effect(() => {
    initPresets();
    const u1 = presets.subscribe(v => { presetList = v; });
    const u2 = activePresetName.subscribe(v => { activeName = v; });
    return () => { u1(); u2(); };
  });

  function handleApply(preset: Preset): void {
    applyPreset(preset);
  }

  function handleSave(): void {
    const name = newPresetName.trim();
    if (!name) return;
    savePreset(name);
    newPresetName = '';
    showSaveInput = false;
  }

  /** Overwrite an existing custom preset with current settings */
  function handleOverwrite(name: string): void {
    savePreset(name);
  }

  function handleDelete(name: string): void {
    deletePreset(name);
  }

  function handleExport(): void {
    exportPresetsAsFile();
  }

  async function handleImport(): Promise<void> {
    const count = await importPresetsFromFile();
    if (count > 0) {
      importStatus = `Imported ${count} preset${count > 1 ? 's' : ''}`;
      setTimeout(() => { importStatus = ''; }, 2000);
    } else {
      importStatus = 'No presets found';
      setTimeout(() => { importStatus = ''; }, 2000);
    }
  }

  const builtinNames = ['Chill', 'Low Energy', 'Fireworks', 'MAX'];

  // ── Energy dots visual ──────────────────────────────────────────────────
  const MAX_DOTS = 5;

  /** Map energy 0–1 → dot count 1–5 (non-linear breakpoints for visual clarity) */
  function energyDotCount(energy: number): number {
    if (energy < 0.10) return 1;
    if (energy < 0.25) return 2;
    if (energy < 0.45) return 3;
    if (energy < 0.70) return 4;
    return 5;
  }

  /** Energy level color: green → yellow → orange → red */
  function energyColor(energy: number): string {
    if (energy < 0.25) return '#22ff88';   // green — minimal
    if (energy < 0.45) return '#88ee44';   // lime — low
    if (energy < 0.60) return '#ffcc00';   // yellow — medium
    if (energy < 0.80) return '#ff8833';   // orange — high
    return '#ff3333';                       // red — max
  }

  /** Readable energy label */
  function energyLabel(energy: number): string {
    const pct = Math.round(energy * 100);
    if (energy < 0.25) return `~${pct}% · Minimal`;
    if (energy < 0.45) return `~${pct}% · Low`;
    if (energy < 0.60) return `~${pct}% · Medium`;
    if (energy < 0.80) return `~${pct}% · High`;
    return `~${pct}% · Max`;
  }

  // ── Preset thumbnail color mapping ────────────────────────────────────────
  const THEME_COLORS: Record<string, string> = {
    dark:     '#4488cc',
    light:    '#aaccff',
    fire:     '#ff5522',
    winter:   '#88ccff',
    galaxy:   '#9944ff',
    electric: '#00eeff',
    void:     '#8800cc',
    aurora:   '#22ff88',
    rain:     '#4477aa',
  };

  function presetThumbStyle(preset: Preset): string {
    const s = preset.settings;
    const themeName = (s['app.theme'] as string) || 'dark';
    const baseColor = THEME_COLORS[themeName] || '#4488cc';
    const glow = Math.min(s['app.glow'] as number ?? 0.35, 1);
    const density = Math.min((s['fx.density'] as number ?? 1) / 5, 1);
    const speed = Math.min((s['fx.speed'] as number ?? 1) / 3, 1);
    // Build a gradient: left = theme color (opacity=glow), right = energy (density+speed)
    const energyBright = Math.round((density + speed) * 50);
    return `background: linear-gradient(90deg, ${baseColor}${Math.round(glow * 200).toString(16).padStart(2,'0')}, rgba(255,255,255,${energyBright / 100})); opacity: ${0.5 + glow * 0.5};`;
  }
</script>

<div class="preset-panel">
  <div class="preset-title">Presets</div>
  <div class="preset-grid">
    {#each sortedPresets as { preset, energy }}
      {@const dots = energyDotCount(energy)}
      {@const color = energyColor(energy)}
      <button
        class="preset-btn"
        class:active={activeName === preset.name}
        onclick={() => handleApply(preset)}
        title="{preset.name} — Energy: {energyLabel(energy)}"
      >
        <span class="preset-thumb" style={presetThumbStyle(preset)}></span>
        <span class="preset-name">{preset.name}</span>
        <span class="energy-dots" style="--energy-color: {color}">
          {#each Array(MAX_DOTS) as _, i}
            <span class="dot" class:filled={i < dots} class:empty={i >= dots}>●</span>
          {/each}
        </span>
        {#if !builtinNames.includes(preset.name)}
          <span
            class="preset-overwrite"
            onclick={(e) => { e.stopPropagation(); handleOverwrite(preset.name); }}
            role="button"
            tabindex="0"
            title="Overwrite with current settings"
          >&#8635;</span>
          <span
            class="preset-delete"
            onclick={(e) => { e.stopPropagation(); handleDelete(preset.name); }}
            role="button"
            tabindex="0"
            title="Delete preset"
          >&times;</span>
        {/if}
      </button>
    {/each}
  </div>

  <div class="preset-actions">
    <button class="preset-disable-btn" onclick={() => { disableAllEffects(); document.dispatchEvent(new CustomEvent('kg:reset')); }} title="Turn off all visual effects">Disable All</button>
    <button class="preset-reset-btn" onclick={() => { resetToDefaults(); document.dispatchEvent(new CustomEvent('kg:reset')); }} title="Reset all effects to defaults">Reset</button>
    <button class="preset-reset-btn" onclick={handleExport} title="Download presets as .json file">Export</button>
    <button class="preset-reset-btn" onclick={handleImport} title="Import presets from .json file">Import</button>
  </div>

  {#if importStatus}
    <div class="import-status">{importStatus}</div>
  {/if}

  {#if showSaveInput}
    <div class="preset-save-row">
      <input
        class="preset-input"
        type="text"
        placeholder="Preset name..."
        bind:value={newPresetName}
        onkeydown={(e) => e.key === 'Enter' && handleSave()}
      />
      <button class="preset-save-btn" onclick={handleSave}>Save</button>
      <button class="preset-save-btn cancel" onclick={() => { showSaveInput = false; }}>X</button>
    </div>
  {:else}
    <button class="preset-add-btn" onclick={() => { showSaveInput = true; }}>
      + Save Current
    </button>
  {/if}
</div>

<style>
  .preset-panel {
    margin-top: 4px;
  }
  .preset-title {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    border-bottom: 1px solid var(--border);
    padding-bottom: 5px;
    margin-bottom: 8px;
  }
  .preset-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 6px;
  }
  .preset-btn {
    position: relative;
    padding: 4px 10px;
    padding-top: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 3px;
    font-size: 10px;
    color: var(--text-dim);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
    overflow: hidden;
  }
  .preset-thumb {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 3px 3px 0 0;
    transition: opacity 0.3s;
  }
  .preset-name {
    display: block;
    font-size: 10px;
    line-height: 1.3;
  }
  .energy-dots {
    display: block;
    font-size: 7px;
    letter-spacing: 1px;
    margin-top: 2px;
    line-height: 1;
  }
  .energy-dots .dot.filled {
    color: var(--energy-color, #88ee44);
  }
  .energy-dots .dot.empty {
    color: rgba(255, 255, 255, 0.12);
  }
  .preset-btn:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: var(--accent);
    color: var(--text);
  }
  .preset-btn.active {
    background: rgba(0, 212, 255, 0.15);
    border-color: var(--accent);
    color: var(--accent);
  }
  .preset-overwrite {
    margin-left: 4px;
    color: var(--text-dim);
    font-size: 10px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .preset-overwrite:hover {
    color: var(--accent);
  }
  .preset-delete {
    margin-left: 2px;
    color: var(--text-dim);
    font-size: 12px;
    cursor: pointer;
  }
  .preset-delete:hover {
    color: #ff5555;
  }
  .preset-actions {
    display: flex;
    gap: 4px;
    margin-bottom: 4px;
  }
  .preset-disable-btn {
    flex: 1;
    padding: 4px 8px;
    background: rgba(255, 50, 50, 0.05);
    border: 1px dashed rgba(255, 80, 80, 0.4);
    border-radius: 3px;
    font-size: 9px;
    color: var(--text-dim);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
  }
  .preset-disable-btn:hover {
    border-color: #ff5555;
    color: #ff5555;
    background: rgba(255, 50, 50, 0.12);
  }
  .preset-reset-btn {
    flex: 1;
    padding: 4px 8px;
    background: rgba(255,255,255,0.03);
    border: 1px dashed var(--border);
    border-radius: 3px;
    font-size: 9px;
    color: var(--text-dim);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
  }
  .preset-reset-btn:hover {
    border-color: #ffaa33;
    color: #ffaa33;
  }
  .preset-add-btn {
    width: 100%;
    padding: 4px 8px;
    background: rgba(255,255,255,0.03);
    border: 1px dashed var(--border);
    border-radius: 3px;
    font-size: 9px;
    color: var(--text-dim);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
  }
  .preset-add-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
  .preset-save-row {
    display: flex;
    gap: 4px;
  }
  .preset-input {
    flex: 1;
    padding: 3px 6px;
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--border);
    border-radius: 3px;
    font-size: 10px;
    color: var(--text);
    font-family: var(--font);
    outline: none;
  }
  .preset-input:focus {
    border-color: var(--accent);
  }
  .preset-save-btn {
    padding: 3px 8px;
    background: rgba(0, 212, 255, 0.1);
    border: 1px solid var(--accent);
    border-radius: 3px;
    font-size: 9px;
    color: var(--accent);
    cursor: pointer;
    font-family: var(--font);
  }
  .preset-save-btn.cancel {
    background: rgba(255,50,50,0.1);
    border-color: #ff5555;
    color: #ff5555;
  }
  .import-status {
    font-size: 9px;
    color: var(--accent);
    text-align: center;
    padding: 2px 0;
    letter-spacing: 0.5px;
  }
</style>
