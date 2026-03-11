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

  const themeOptions: { value: Theme; label: string }[] = [
    { value: 'dark',   label: '☽ Dark' },
    { value: 'light',  label: '☀ Light' },
    { value: 'fire',   label: '🔥 Fire' },
    { value: 'winter', label: '❄ Winter' },
    { value: 'galaxy', label: '🌌 Galaxy' },
    { value: 'electric', label: '⚡ Electric' },
    { value: 'void', label: '🕳 Void' },
    { value: 'aurora', label: '🌌 Aurora' },
    { value: 'rain', label: '🌧 Rain' },
    { value: 'polygon', label: '⬡ Polygon' },
  ];

  let glowLabel = $derived((): string => {
    if (glow === 0) return 'FLAT';
    if (glow < 0.3) return 'LOW';
    if (glow < 0.7) return 'MID';
    return 'GLOW';
  });

  // Slider value is 0–100; store value is 0.0–1.0
  let sliderVal = $derived(Math.round(glow * 100));

  function handleThemeChange(e: Event): void {
    const val = (e.target as HTMLSelectElement).value as Theme;
    theme.set(val);
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

  <select
    class="ctrl-select theme-select"
    id="theme-select"
    title="Choose theme"
    onchange={handleThemeChange}
    value={currentTheme}
  >
    {#each themeOptions as opt}
      <option value={opt.value} selected={opt.value === currentTheme}>{opt.label}</option>
    {/each}
  </select>
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
  :global([data-theme="fire"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23ff6a00'/%3E%3C/svg%3E");
  }
  :global([data-theme="winter"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237ec8ff'/%3E%3C/svg%3E");
  }
  :global([data-theme="galaxy"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23b46aff'/%3E%3C/svg%3E");
  }
  :global([data-theme="electric"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%233c8cff'/%3E%3C/svg%3E");
  }
  :global([data-theme="void"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23b040ff'/%3E%3C/svg%3E");
  }
  :global([data-theme="aurora"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2340ffa0'/%3E%3C/svg%3E");
  }
  :global([data-theme="rain"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236090c0'/%3E%3C/svg%3E");
  }
  :global([data-theme="polygon"]) .ctrl-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2380ffe0'/%3E%3C/svg%3E");
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
  :global([data-theme="fire"]) .ctrl-select option {
    background: #140802;
    color: #ffe0c0;
  }
  :global([data-theme="winter"]) .ctrl-select option {
    background: #081428;
    color: #d0e8ff;
  }
  :global([data-theme="galaxy"]) .ctrl-select option {
    background: #0c041c;
    color: #e0d0ff;
  }
  :global([data-theme="electric"]) .ctrl-select option {
    background: #040c1e;
    color: #d0e4ff;
  }
  :global([data-theme="void"]) .ctrl-select option {
    background: #050008;
    color: #d8c0f0;
  }
  :global([data-theme="aurora"]) .ctrl-select option {
    background: #020d0a;
    color: #c0f0e0;
  }
  :global([data-theme="rain"]) .ctrl-select option {
    background: #0a0c10;
    color: #b0c0d0;
  }
  :global([data-theme="polygon"]) .ctrl-select option {
    background: #1a1040;
    color: #e0f0ff;
  }
  .theme-select {
    min-width: 100px;
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
