import type { GraphNode, GraphLink } from '../types';
import { CATEGORIES } from '../constants';

/**
 * Returns the set of node IDs that are directly connected to the given node ID
 * (undirected — checks both source and target of each link).
 */
export function getConnected(id: string, links: GraphLink[]): Set<string> {
  const s = new Set<string>();
  links.forEach(l => {
    const sid = typeof l.source === 'string' ? l.source : l.source.id;
    const tid = typeof l.target === 'string' ? l.target : l.target.id;
    if (sid === id) s.add(tid);
    if (tid === id) s.add(sid);
  });
  return s;
}

/**
 * Returns true if the link connects to or from the given node ID.
 */
export function isLinkOf(l: GraphLink, id: string): boolean {
  const s = typeof l.source === 'string' ? l.source : l.source.id;
  const t = typeof l.target === 'string' ? l.target : l.target.id;
  return s === id || t === id;
}

/**
 * BFS shortest path between two node IDs.
 * Treats all links as undirected.
 * Returns the path as an array of node IDs, or null if no path exists.
 */
export function bfs(
  startId: string,
  endId: string,
  nodes: GraphNode[],
  links: GraphLink[],
): string[] | null {
  const adj: Record<string, string[]> = {};
  nodes.forEach(n => { adj[n.id] = []; });
  links.forEach(l => {
    const s = typeof l.source === 'string' ? l.source : l.source.id;
    const t = typeof l.target === 'string' ? l.target : l.target.id;
    adj[s].push(t);
    adj[t].push(s); // undirected
  });

  const visited = new Set<string>([startId]);
  const queue: string[][] = [[startId]];

  while (queue.length) {
    const path = queue.shift()!;
    const node = path[path.length - 1];
    if (node === endId) return path;
    for (const next of (adj[node] || [])) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return null;
}

/**
 * Computes the visual radius of a node based on its ref count.
 * Clamps to a maximum of 30.
 */
export function nodeRadius(d: GraphNode): number {
  return Math.min(30, 8 + (d.refs || 0) * 2.5);
}

/**
 * Returns the CSS color string for a node based on its category.
 * Falls back to the 'meta' category color if the category is not found.
 */
export function nodeColor(d: GraphNode): string {
  return (CATEGORIES[d.cat] || CATEGORIES['meta']).color;
}

/**
 * Truncates a label string to 28 characters max.
 * Appends '..' when truncated.
 */
export function truncLabel(s: string): string {
  if (s.length > 28) return s.substring(0, 26) + '..';
  return s;
}

/**
 * Returns a map of nodeId → hop distance for all nodes reachable within
 * `maxHops` hops from `nodeId` (undirected).
 *
 * The source node itself is excluded from the result.
 * Reuses `getConnected` for each hop level.
 */
export function getConnectedNHop(
  nodeId: string,
  links: GraphLink[],
  maxHops: number,
): Map<string, number> {
  const result = new Map<string, number>();
  const visited = new Set<string>([nodeId]);

  let frontier: Set<string> = getConnected(nodeId, links);
  frontier.forEach(id => {
    if (!visited.has(id)) {
      result.set(id, 1);
      visited.add(id);
    }
  });

  for (let hop = 2; hop <= maxHops; hop++) {
    const nextFrontier = new Set<string>();
    frontier.forEach(fId => {
      const neighbors = getConnected(fId, links);
      neighbors.forEach(nId => {
        if (!visited.has(nId)) {
          nextFrontier.add(nId);
          result.set(nId, hop);
          visited.add(nId);
        }
      });
    });
    frontier = nextFrontier;
    if (frontier.size === 0) break;
  }

  return result;
}
