import { writable } from 'svelte/store';
import { CATEGORIES } from '../constants';

export type AppMode = 'explore' | 'path' | 'impact';
export type Theme = 'dark' | 'light' | 'fire' | 'winter' | 'galaxy' | 'electric' | 'void' | 'aurora' | 'rain';

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
 * Set of category keys selected by the user for filtering (click-in / click-out).
 * Empty Set = show all (no filter active). Non-empty = show only selected categories.
 */
export const activeCats = writable<Set<string>>(new Set());

/**
 * Node IDs selected for path-finding. First element is source, second is target.
 * Cleared when mode leaves 'path'.
 */
export const pathSelection = writable<string[]>([]);

/** Immersive mode — hides all UI panels, shows only globe + effects */
export const immersiveMode = writable<boolean>(false);
