import { writable, get } from 'svelte/store';
import * as fx from './themeEffects';
import * as globe from './globeState';
import { theme, glowLevel } from './appState';
import { safeGet, safeSet } from '../utils/storage';

export interface Preset {
  name: string;
  settings: Record<string, any>;
}

export const presets = writable<Preset[]>([]);
export const activePresetName = writable<string | null>(null);

// Built-in presets
const BUILTIN_PRESETS: Preset[] = [
  {
    name: 'Chill',
    settings: {
      'app.theme': 'galaxy',
      'app.glow': 0.2,
      'fx.density': 0.5,
      'fx.speed': 0.4,
      'globe.rotateSpeed': 0.15,
      'globe.opacity': 0.6,
    },
  },
  {
    name: 'Low Energy',
    settings: {
      'app.theme': 'dark',
      'app.glow': 0.1,
      'fx.density': 0.15,
      'fx.speed': 0.2,
      'fx.nebula': false,
      'fx.glitter': false,
      'fx.shootStars': false,
      'fx.embers': false,
      'fx.snowflakes': false,
      'fx.lightning': false,
      'fx.elecArcs': false,
      'fx.plasmaAura': false,
      'fx.sparkBurst': false,
      'fx.bgMesh': false,
      'fx.border': false,
      'fx.bloom': false,
      'fx.bhEnabled': false,
      'fx.fwEnabled': false,
      'globe.autoRotate': true,
      'globe.wireframe': false,
      'globe.pulse': false,
      'globe.comet': false,
      'globe.rotateSpeed': 0.1,
      'globe.opacity': 0.8,
      'globe.dotBright': 0.5,
    },
  },
  {
    name: 'Fireworks',
    settings: {
      'app.theme': 'dark',
      'app.glow': 0.5,
      'fx.fwEnabled': true,
      'fx.fwSpeed': 1,
      'fx.fwRate': 2,
      'fx.fwSize': 1.5,
      'fx.fwMiddleFire': true,
      'fx.fwColorful': true,
      'fx.fwNoLimit': false,
      'fx.fwHue': 0,
      'fx.bloom': true,
      'fx.bloomStr': 1.5,
      'fx.bloomRad': 0.5,
      'fx.bloomThr': 0.2,
      'globe.opacity': 0.5,
    },
  },
  {
    name: 'MAX',
    settings: {
      'app.glow': 1,
      'fx.density': 5,
      'fx.speed': 3,
      'fx.elecArcInt': 5,
      'fx.elecArcSpd': 3,
      'fx.elecArcCnt': 5,
      'fx.elecOrbitSpd': 3,
      'fx.elecCoreGlow': 5,
      'fx.sparkInt': 5,
      'fx.sparkRate': 3,
      'fx.borderIntensity': 3,
      'fx.borderSpeed': 2,
      'fx.fwEnabled': true,
      'fx.fwSpeed': 3,
      'fx.fwRate': 5,
      'fx.fwSize': 3,
      'fx.fwMiddleFire': true,
      'fx.fwColorful': true,
      'fx.fwNoLimit': true,
      'globe.opacity': 0.3,
    },
  },
];

/** Map of store key → writable store reference + type */
const STORE_MAP: Record<string, { store: any; type: 'num' | 'bool' | 'string' }> = {
  'app.theme': { store: theme, type: 'string' },
  'app.glow': { store: glowLevel, type: 'num' },
  'fx.density': { store: fx.effectDensity, type: 'num' },
  'fx.speed': { store: fx.effectSpeed, type: 'num' },
  'fx.nebula': { store: fx.showNebula, type: 'bool' },
  'fx.glitter': { store: fx.showGlitter, type: 'bool' },
  'fx.shootStars': { store: fx.showShootingStars, type: 'bool' },
  'fx.embers': { store: fx.showEmbers, type: 'bool' },
  'fx.snowflakes': { store: fx.showSnowflakes, type: 'bool' },
  'fx.lightning': { store: fx.showLightning, type: 'bool' },
  'fx.elecArcs': { store: fx.showElectricArcs, type: 'bool' },
  'fx.plasmaAura': { store: fx.showPlasmaAura, type: 'bool' },
  'fx.elecArcInt': { store: fx.electricArcIntensity, type: 'num' },
  'fx.elecArcSpd': { store: fx.electricArcSpeed, type: 'num' },
  'fx.elecArcCnt': { store: fx.electricArcCount, type: 'num' },
  'fx.elecOrbitSpd': { store: fx.electricOrbitSpeed, type: 'num' },
  'fx.elecCoreGlow': { store: fx.electricCoreGlow, type: 'num' },
  'fx.sparkBurst': { store: fx.showSparkBurst, type: 'bool' },
  'fx.sparkInt': { store: fx.sparkBurstIntensity, type: 'num' },
  'fx.sparkRate': { store: fx.sparkBurstRate, type: 'num' },
  'fx.bgStars': { store: fx.showBgStars, type: 'bool' },
  'fx.bgMesh': { store: fx.showBgMesh, type: 'bool' },
  'fx.border': { store: fx.borderEnabled, type: 'bool' },
  'fx.borderIntensity': { store: fx.borderIntensity, type: 'num' },
  'fx.borderSpeed': { store: fx.borderSpeed, type: 'num' },
  'fx.bloom': { store: fx.bloomEnabled, type: 'bool' },
  'fx.bloomStr': { store: fx.bloomStrength, type: 'num' },
  'fx.bloomRad': { store: fx.bloomRadius, type: 'num' },
  'fx.bloomThr': { store: fx.bloomThreshold, type: 'num' },
  'fx.bhEnabled': { store: fx.blackholeEnabled, type: 'bool' },
  'fx.bhSize': { store: fx.blackholeSize, type: 'num' },
  'fx.bhSpeed': { store: fx.blackholeSpeed, type: 'num' },
  'fx.bhGlow': { store: fx.blackholeGlow, type: 'num' },
  'fx.bhWidth': { store: fx.blackholeWidth, type: 'num' },
  'fx.bhHeight': { store: fx.blackholeHeight, type: 'num' },
  'fx.bhHue': { store: fx.blackholeHue, type: 'num' },
  'fx.fwEnabled': { store: fx.fireworksEnabled, type: 'bool' },
  'fx.fwSpeed': { store: fx.fireworksSpeed, type: 'num' },
  'fx.fwRate': { store: fx.fireworksLaunchRate, type: 'num' },
  'fx.fwSize': { store: fx.fireworksBurstSize, type: 'num' },
  'fx.fwMiddleFire': { store: fx.fireworksMiddleFire, type: 'bool' },
  'fx.fwColorful': { store: fx.fireworksColorful, type: 'bool' },
  'fx.fwNoLimit': { store: fx.fireworksNoLimit, type: 'bool' },
  'fx.fwHue': { store: fx.fireworksHue, type: 'num' },
  'globe.autoRotate': { store: globe.autoRotate, type: 'bool' },
  'globe.wireframe': { store: globe.showWireframe, type: 'bool' },
  'globe.dots': { store: globe.showDots, type: 'bool' },
  'globe.links': { store: globe.showLinks, type: 'bool' },
  'globe.pulse': { store: globe.pulseEnabled, type: 'bool' },
  'globe.comet': { store: globe.cometEnabled, type: 'bool' },
  'globe.pulseSpeed': { store: globe.pulseSpeed, type: 'num' },
  'globe.rotateSpeed': { store: globe.rotateSpeed, type: 'num' },
  'globe.zoom': { store: globe.zoomLevel, type: 'num' },
  'globe.opacity': { store: globe.globeOpacity, type: 'num' },
  'globe.dotBright': { store: globe.dotBrightness, type: 'num' },
  'globe.tourSpeed': { store: globe.tourSpeed, type: 'num' },
};

/** Default values for all stores (mirrors persist.ts buildEntries defaults) */
const DEFAULT_VALUES: Record<string, any> = {
  'app.theme': 'dark',
  'app.glow': 0.35,
  'fx.density': 1,
  'fx.speed': 1,
  'fx.nebula': true,
  'fx.glitter': true,
  'fx.shootStars': true,
  'fx.embers': true,
  'fx.snowflakes': true,
  'fx.lightning': true,
  'fx.elecArcs': true,
  'fx.plasmaAura': true,
  'fx.elecArcInt': 1,
  'fx.elecArcSpd': 1,
  'fx.elecArcCnt': 1,
  'fx.elecOrbitSpd': 1,
  'fx.elecCoreGlow': 1,
  'fx.sparkBurst': true,
  'fx.sparkInt': 1,
  'fx.sparkRate': 1,
  'fx.bgStars': true,
  'fx.bgMesh': true,
  'fx.border': true,
  'fx.borderIntensity': 1,
  'fx.borderSpeed': 1,
  'fx.bloom': false,
  'fx.bloomStr': 1,
  'fx.bloomRad': 0.4,
  'fx.bloomThr': 0.3,
  'fx.bhEnabled': false,
  'fx.bhSize': 1,
  'fx.bhSpeed': 1,
  'fx.bhGlow': 1,
  'fx.bhWidth': 1,
  'fx.bhHeight': 1,
  'fx.bhHue': 280,
  'fx.fwEnabled': false,
  'fx.fwSpeed': 1,
  'fx.fwRate': 1,
  'fx.fwSize': 1,
  'fx.fwMiddleFire': true,
  'fx.fwColorful': true,
  'fx.fwNoLimit': false,
  'fx.fwHue': 0,
  'globe.autoRotate': true,
  'globe.wireframe': true,
  'globe.dots': true,
  'globe.links': true,
  'globe.pulse': true,
  'globe.comet': true,
  'globe.pulseSpeed': 0.6,
  'globe.rotateSpeed': 0.35,
  'globe.zoom': 55,
  'globe.opacity': 1,
  'globe.dotBright': 1,
  'globe.tourSpeed': 1,
};

/** Reset all effect stores to their default values (does not touch presets) */
export function resetToDefaults(): void {
  for (const [key, value] of Object.entries(DEFAULT_VALUES)) {
    const entry = STORE_MAP[key];
    if (entry) {
      entry.store.set(value);
    }
  }
  activePresetName.set(null);
}

/** Apply a preset's settings to stores */
export function applyPreset(preset: Preset): void {
  for (const [key, value] of Object.entries(preset.settings)) {
    const entry = STORE_MAP[key];
    if (entry) {
      entry.store.set(value);
    }
  }
  activePresetName.set(preset.name);
}

/** Capture current state as a snapshot */
export function captureCurrentState(): Record<string, any> {
  const snapshot: Record<string, any> = {};
  for (const [key, entry] of Object.entries(STORE_MAP)) {
    snapshot[key] = get(entry.store);
  }
  return snapshot;
}

/** Save current state as a named preset */
export function savePreset(name: string): void {
  const settings = captureCurrentState();
  const existing = get(presets);
  const idx = existing.findIndex(p => p.name === name);
  if (idx >= 0) {
    existing[idx] = { name, settings };
  } else {
    existing.push({ name, settings });
  }
  presets.set([...existing]);
  activePresetName.set(name);
  // Persist custom presets
  safeSet('presets.custom', existing.filter(p => !BUILTIN_PRESETS.some(b => b.name === p.name)));
}

/** Delete a custom preset */
export function deletePreset(name: string): void {
  const existing = get(presets).filter(p => p.name !== name);
  presets.set(existing);
  safeSet('presets.custom', existing.filter(p => !BUILTIN_PRESETS.some(b => b.name === p.name)));
  if (get(activePresetName) === name) activePresetName.set(null);
}

/** Initialize presets from storage */
export function initPresets(): void {
  const custom = safeGet<Preset[]>('presets.custom', []);
  presets.set([...BUILTIN_PRESETS, ...custom]);
}

/** Export all custom presets as a JSON string */
export function exportPresets(): string {
  const custom = get(presets).filter(p => !BUILTIN_PRESETS.some(b => b.name === p.name));
  return JSON.stringify(custom, null, 2);
}

/** Export presets as a downloadable .json file */
export function exportPresetsAsFile(): void {
  const json = exportPresets();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kg-presets-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Import presets from a JSON string (merges with existing) */
export function importPresets(json: string): number {
  try {
    const imported = JSON.parse(json) as Preset[];
    if (!Array.isArray(imported)) return 0;
    const existing = get(presets);
    let count = 0;
    for (const p of imported) {
      if (!p.name || !p.settings || typeof p.settings !== 'object') continue;
      const idx = existing.findIndex(e => e.name === p.name);
      if (idx >= 0) {
        existing[idx] = p;
      } else {
        existing.push(p);
      }
      count++;
    }
    presets.set([...existing]);
    safeSet('presets.custom', existing.filter(p => !BUILTIN_PRESETS.some(b => b.name === p.name)));
    return count;
  } catch {
    return 0;
  }
}

/** Import presets from a .json file via file picker dialog */
export function importPresetsFromFile(): Promise<number> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) { resolve(0); return; }
      try {
        const text = await file.text();
        resolve(importPresets(text));
      } catch {
        resolve(0);
      }
    };
    input.click();
  });
}
