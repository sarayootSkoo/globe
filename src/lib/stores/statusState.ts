import { writable } from 'svelte/store';

/**
 * Whether to show small colored status indicator dots near each node
 * on the globe that has a status field set.
 */
export const showStatusBadges = writable<boolean>(false);

/**
 * Set of status values to show. Empty set = show all statuses.
 * Possible values: 'done', 'in-progress', 'planned'
 */
export const statusFilter = writable<Set<string>>(new Set());
