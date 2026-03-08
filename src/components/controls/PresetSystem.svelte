<script lang="ts">
  import { presets, activePresetName, applyPreset, savePreset, deletePreset, initPresets, resetToDefaults, exportPresets, importPresets } from '../../lib/stores/presetState';
  import type { Preset } from '../../lib/stores/presetState';

  let presetList = $state<Preset[]>([]);
  let activeName = $state<string | null>(null);
  let showSaveInput = $state(false);
  let newPresetName = $state('');
  let showImportInput = $state(false);
  let importJson = $state('');

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
    const json = exportPresets();
    navigator.clipboard.writeText(json).then(() => {
      // brief visual feedback handled by button text
    });
  }

  function handleImport(): void {
    const count = importPresets(importJson);
    if (count > 0) {
      importJson = '';
      showImportInput = false;
    }
  }

  const builtinNames = ['Chill', 'Low Energy', 'MAX'];

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
    {#each presetList as preset}
      <button
        class="preset-btn"
        class:active={activeName === preset.name}
        onclick={() => handleApply(preset)}
        title="Apply {preset.name} preset"
      >
        <span class="preset-thumb" style={presetThumbStyle(preset)}></span>
        {preset.name}
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
    <button class="preset-reset-btn" onclick={() => { resetToDefaults(); document.dispatchEvent(new CustomEvent('kg:reset')); }} title="Reset all effects to defaults">Reset</button>
    <button class="preset-reset-btn" onclick={handleExport} title="Copy presets to clipboard">Export</button>
    <button class="preset-reset-btn" onclick={() => { showImportInput = !showImportInput; }} title="Import presets from JSON">Import</button>
  </div>

  {#if showImportInput}
    <div class="preset-save-row" style="margin-bottom:4px">
      <input
        class="preset-input"
        type="text"
        placeholder="Paste JSON..."
        bind:value={importJson}
        onkeydown={(e) => e.key === 'Enter' && handleImport()}
      />
      <button class="preset-save-btn" onclick={handleImport}>OK</button>
      <button class="preset-save-btn cancel" onclick={() => { showImportInput = false; }}>X</button>
    </div>
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
</style>
