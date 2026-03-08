<script lang="ts">
  import { theme, glowLevel } from '../../lib/stores/appState';
  import type { Theme } from '../../lib/stores/appState';

  let currentTheme = $state<Theme>('dark');
  let glow = $state<number>(0.35);

  $effect(() => {
    const unsub = theme.subscribe(v => { currentTheme = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = glowLevel.subscribe(v => { glow = v; });
    return unsub;
  });

  // Sync theme to document attribute
  $effect(() => {
    document.documentElement.dataset.theme = currentTheme;
  });

  let themeIcon = $derived(currentTheme === 'dark' ? '☽' : '☀');

  let glowLabel = $derived((): string => {
    if (glow === 0) return 'FLAT';
    if (glow < 0.3) return 'LOW';
    if (glow < 0.7) return 'MID';
    return 'GLOW';
  });

  // Slider value is 0–100; store value is 0.0–1.0
  let sliderVal = $derived(Math.round(glow * 100));

  function toggleTheme(): void {
    const next: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    theme.set(next);
  }

  function handleGlowInput(e: Event): void {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    glowLevel.set(val / 100);
  }
</script>

<div id="top-controls">
  <select class="ctrl-select" id="layout-select">
    <option value="globe" selected>Globe 3D</option>
  </select>

  <div class="glow-ctrl">
    <span class="glow-label" id="glow-label">{glowLabel()}</span>
    <input
      type="range"
      class="glow-slider"
      id="glow-slider"
      min="0"
      max="100"
      value={sliderVal}
      title="0 = Flat, 100 = Full Bloom"
      oninput={handleGlowInput}
    />
  </div>

  <button
    class="theme-btn"
    id="theme-toggle"
    title="Toggle dark/light"
    onclick={toggleTheme}
  >
    {themeIcon}
  </button>
</div>

<style>
  #top-controls {
    position: fixed;
    top: 22px;
    left: 16px;
    z-index: 25;
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .ctrl-select {
    background: var(--panel-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 6px 10px;
    font-family: var(--font);
    font-size: 11px;
    color: var(--text);
    cursor: pointer;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300d4ff'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
    padding-right: 26px;
    transition: all 0.2s;
  }
  :global([data-theme="light"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231e40af'/%3E%3C/svg%3E");
  }
  .ctrl-select:hover {
    border-color: var(--accent);
  }
  .ctrl-select option {
    background: #0a0e17;
    color: #e0e6ed;
  }
  :global([data-theme="light"]) .ctrl-select option {
    background: #fff;
    color: #1e293b;
  }
  .theme-btn {
    background: var(--panel-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 4px;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 16px;
    line-height: 1;
  }
  .theme-btn:hover {
    border-color: var(--accent);
  }
  .glow-ctrl {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--panel-bg);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 4px 10px;
    transition: all 0.2s;
  }
  .glow-ctrl:hover {
    border-color: var(--accent);
  }
  .glow-label {
    font-family: var(--font);
    font-size: 9px;
    color: var(--text-dim);
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
    min-width: 32px;
    text-align: center;
  }
  .glow-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 80px;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--text-dim) 0%, var(--accent) 100%);
    outline: none;
    cursor: pointer;
  }
  .glow-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 6px var(--accent);
    cursor: pointer;
  }
  .glow-slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--bg);
    box-shadow: 0 0 6px var(--accent);
    cursor: pointer;
  }
</style>
