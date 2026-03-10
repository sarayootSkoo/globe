import { writable } from 'svelte/store';

/**
 * Whether cross-repo highlight mode is active.
 * When true, GlobeCanvas dims same-repo nodes and brightens cross-repo links.
 */
export const showCrossRepo = writable<boolean>(false);

/**
 * If set, filters the cross-repo highlight to only the specified repo pair.
 * Format: "oms-order→oms-webapp"
 * null = show all cross-repo connections.
 */
export const crossRepoFilter = writable<string | null>(null);
