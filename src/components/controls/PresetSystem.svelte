<script lang="ts">
  import { presets, activePresetName, applyPreset, savePreset, deletePreset, initPresets, resetToDefaults } from '../../lib/stores/presetState';
  import type { Preset } from '../../lib/stores/presetState';

  let presetList = $state<Preset[]>([]);
  let activeName = $state<string | null>(null);
  let showSaveInput = $state(false);
  let newPresetName = $state('');

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

  const builtinNames = ['Chill', 'MAX'];
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
    <button class="preset-reset-btn" onclick={() => resetToDefaults()} title="Reset all effects to defaults">
      Reset
    </button>
  </div>

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
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 3px;
    font-size: 10px;
    color: var(--text-dim);
    cursor: pointer;
    font-family: var(--font);
    letter-spacing: 0.5px;
    transition: all 0.2s;
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
