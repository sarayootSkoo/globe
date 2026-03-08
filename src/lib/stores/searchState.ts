import { writable, derived } from 'svelte/store';
import { graphNodes } from './graphData';
import { doSearch } from '../utils/search';
import type { ScoredResult } from '../types';

/**
 * The raw text the user has typed into the search input.
 */
export const searchQuery = writable<string>('');

/**
 * Scored search results derived from the current query and node list.
 * Returns an empty array when the query is blank (doSearch returns [] for empty input).
 */
export const searchScored = derived<
  [typeof searchQuery, typeof graphNodes],
  ScoredResult[]
>(
  [searchQuery, graphNodes],
  ([$query, $nodes]) => doSearch($query, $nodes)
);

/**
 * Set of node IDs that match the current search query, or null when there is
 * no active query. Components use null to mean "no filter applied".
 */
export const searchMatched = derived<typeof searchScored, Set<string> | null>(
  searchScored,
  ($scored) => {
    if ($scored.length === 0) return null;
    return new Set($scored.map((r) => r.node.id));
  }
);
