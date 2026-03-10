import { writable, derived } from 'svelte/store';
import { graphNodes, graphLinks } from './graphData';
import { getConnectedNHop } from '../utils/graph';
import type { GraphNode } from '../types';

/**
 * The ID of the node currently being analysed for impact.
 * null = no impact analysis active.
 */
export const impactNodeId = writable<string | null>(null);

/**
 * Number of hops to explore (1 = direct neighbours only, 2 = neighbours of neighbours).
 */
export const impactHops = writable<number>(1);

/**
 * A map of nodeId → { node, hop } for all nodes affected by the current
 * impact node within the selected hop depth.
 *
 * Derived from impactNodeId, impactHops, graphNodes, and graphLinks.
 * Returns an empty Map when impactNodeId is null.
 */
export const impactResults = derived<
  [typeof impactNodeId, typeof impactHops, typeof graphNodes, typeof graphLinks],
  Map<string, { node: GraphNode; hop: number }>
>(
  [impactNodeId, impactHops, graphNodes, graphLinks],
  ([$nodeId, $hops, $nodes, $links]) => {
    const result = new Map<string, { node: GraphNode; hop: number }>();
    if (!$nodeId || $nodes.length === 0) return result;

    const hopMap = getConnectedNHop($nodeId, $links, $hops);
    const nodeById = new Map($nodes.map(n => [n.id, n]));

    hopMap.forEach((hop, id) => {
      const node = nodeById.get(id);
      if (node) result.set(id, { node, hop });
    });

    return result;
  }
);

/**
 * Convenience derived: the raw Map<string, number> of id → hop distance,
 * suitable for passing directly to GlobeRenderer.highlightImpact().
 */
export const impactHopMap = derived<
  [typeof impactNodeId, typeof impactHops, typeof graphNodes, typeof graphLinks],
  Map<string, number>
>(
  [impactNodeId, impactHops, graphNodes, graphLinks],
  ([$nodeId, $hops, $nodes, $links]) => {
    if (!$nodeId || $nodes.length === 0) return new Map<string, number>();
    return getConnectedNHop($nodeId, $links, $hops);
  }
);
