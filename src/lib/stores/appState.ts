import { writable } from 'svelte/store';
import { CATEGORIES } from '../constants';

export type AppMode = 'explore' | 'path' | 'impact';
export type Theme = 'dark' | 'light' | 'fire' | 'winter' | 'galaxy' | 'electric';

/**
 * Current interaction mode for the graph.
 * - 'explore': default browsing/hover mode
 * - 'path':    shortest path selection between two nodes
 * - 'impact':  impact/dependency highlight for a selected node
 */
export const currentMode = writable<AppMode>('explore');

/**
 * ID of the currently selected node, or null if none.
 */
export const selectedNodeId = writable<string | null>(null);

/**
 * Active UI theme. Defaults to dark as set in the HTML.
 */
export const theme = writable<Theme>('dark');

/**
 * Glow intensity level (0 = flat, 1 = full bloom).
 * HTML slider: min=0, max=100, value=35 → divided by 100 = 0.35
 */
export const glowLevel = writable<number>(0.35);

/**
 * Set of category keys that are currently visible/active in the legend.
 * Initialized with all known category keys so everything is visible on load.
 */
export const activeCats = writable<Set<string>>(new Set(Object.keys(CATEGORIES)));

/**
 * Node IDs selected for path-finding. First element is source, second is target.
 * Cleared when mode leaves 'path'.
 */
export const pathSelection = writable<string[]>([]);
