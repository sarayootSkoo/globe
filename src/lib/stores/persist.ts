/**
 * Store persistence — loads saved settings from secure storage on init,
 * and subscribes to stores to save changes back.
 *
 * Call `initPersistence()` once before mounting the app.
 */

import type { Writable } from 'svelte/store';
import { safeGet, safeSet, safeGetEnum, safeGetNumber } from '../utils/storage';

// ── Stores to persist ────────────────────────────────────────────────────────
import { theme, glowLevel } from './appState';
import type { Theme } from './appState';
import * as globe from './globeState';
import * as fx from './themeEffects';

const VALID_THEMES: readonly Theme[] = ['dark', 'light', 'fire', 'winter', 'galaxy'];

// ── Debounce helper for sliders ──────────────────────────────────────────────
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function debouncedSet(key: string, value: unknown, ms = 80): void {
  const existing = timers.get(key);
  if (existing) clearTimeout(existing);
  timers.set(key, setTimeout(() => {
    safeSet(key, value);
    timers.delete(key);
  }, ms));
}

// ── Persist config ───────────────────────────────────────────────────────────

interface PersistEntry<T> {
  store: Writable<T>;
  key: string;
  load: () => T;
  debounce?: boolean;
}

function bool(store: Writable<boolean>, key: string, def: boolean): PersistEntry<boolean> {
  return { store, key, load: () => safeGet<boolean>(key, def) };
}

function num(store: Writable<number>, key: string, def: number, min: number, max: number): PersistEntry<number> {
  return { store, key, load: () => safeGetNumber(key, def, min, max), debounce: true };
}

function buildEntries(): PersistEntry<any>[] {
  return [
    // App state
    { store: theme,    key: 'app.theme', load: () => safeGetEnum('app.theme', 'dark', VALID_THEMES) },
    num(glowLevel,     'app.glow',       0.35, 0, 1),

    // Globe controls
    bool(globe.autoRotate,    'globe.autoRotate', true),
    bool(globe.showWireframe, 'globe.wireframe',  true),
    bool(globe.showDots,      'globe.dots',       true),
    bool(globe.showLinks,     'globe.links',      true),
    bool(globe.pulseEnabled,  'globe.pulse',      true),
    bool(globe.cometEnabled,  'globe.comet',      true),
    num(globe.pulseSpeed,     'globe.pulseSpeed',  0.6,  0.1, 2),
    num(globe.rotateSpeed,    'globe.rotateSpeed', 0.35, 0.05, 2),
    num(globe.zoomLevel,      'globe.zoom',        55,   10, 100),

    // Theme effects
    num(fx.effectDensity, 'fx.density', 1,    0.1, 2),
    num(fx.effectSpeed,   'fx.speed',   1,    0.25, 3),
    bool(fx.showNebula,       'fx.nebula',     true),
    bool(fx.showGlitter,      'fx.glitter',    true),
    bool(fx.showShootingStars,'fx.shootStars', true),
    bool(fx.showEmbers,       'fx.embers',     true),
    bool(fx.showSnowflakes,   'fx.snowflakes', true),
    bool(fx.showBgStars,      'fx.bgStars',    true),
    bool(fx.showBgMesh,       'fx.bgMesh',     true),

    // Border effect
    bool(fx.borderEnabled,    'fx.border',         true),
    num(fx.borderIntensity,   'fx.borderIntensity', 1,   0.2, 2),
    num(fx.borderSpeed,       'fx.borderSpeed',     1,   0.25, 3),
  ];
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Load persisted values into stores, then subscribe to save on change.
 * Returns a cleanup function that unsubscribes all listeners.
 */
export function initPersistence(): () => void {
  const entries = buildEntries();
  const unsubs: (() => void)[] = [];

  for (const entry of entries) {
    // Load saved value
    const loaded = entry.load();
    entry.store.set(loaded);

    // Subscribe to save changes
    let first = true; // skip the initial subscription fire
    const unsub = entry.store.subscribe((val: any) => {
      if (first) { first = false; return; }
      if (entry.debounce) {
        debouncedSet(entry.key, val);
      } else {
        safeSet(entry.key, val);
      }
    });
    unsubs.push(unsub);
  }

  return () => unsubs.forEach(u => u());
}
