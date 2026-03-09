import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { GraphNode, GraphLink, ScoredResult } from './graph-loader.js';

// --- Pure utility functions (adapted from src/lib/utils/) ---

/**
 * Weighted search across node fields.
 * Scoring: label exact=100, label contains=60, id=40, keywords=30, file=20, desc=10
 */
export function doSearch(q: string, nodes: GraphNode[]): ScoredResult[] {
  const query = q.toLowerCase().trim();
  if (!query) return [];

  const scored: ScoredResult[] = [];

  for (const n of nodes) {
    const label = (n.label || '').toLowerCase();
    const id = (n.id || '').toLowerCase();
    const desc = (n.desc || '').toLowerCase();
    const keywords = (n.keywords || []).join(' ').toLowerCase();
    const file = (n.file || '').toLowerCase();

    let score = 0;

    if (label === query) score += 100;
    else if (label.includes(query)) score += 60;

    if (id.includes(query)) score += 40;
    if (keywords.includes(query)) score += 30;
    if (file.includes(query)) score += 20;
    if (desc.includes(query)) score += 10;

    if (score > 0) scored.push({ node: n, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored;
}

/**
 * Returns IDs of nodes directly connected to the given node (undirected).
 */
export function getConnected(id: string, links: GraphLink[]): Set<string> {
  const s = new Set<string>();
  for (const l of links) {
    const sid = typeof l.source === 'string' ? l.source : l.source.id;
    const tid = typeof l.target === 'string' ? l.target : l.target.id;
    if (sid === id) s.add(tid);
    if (tid === id) s.add(sid);
  }
  return s;
}

/**
 * BFS shortest path between two node IDs.
 * Returns path as array of node IDs, or null if unreachable.
 */
export function bfs(
  startId: string,
  endId: string,
  nodes: GraphNode[],
  links: GraphLink[],
): string[] | null {
  const adj: Record<string, string[]> = {};
  for (const n of nodes) adj[n.id] = [];
  for (const l of links) {
    const s = typeof l.source === 'string' ? l.source : l.source.id;
    const t = typeof l.target === 'string' ? l.target : l.target.id;
    if (adj[s]) adj[s].push(t);
    if (adj[t]) adj[t].push(s);
  }

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
 * Reads a node's source file from disk using the basePath from config.
 */
export function readNodeFile(node: GraphNode, basePath: string): string | null {
  if (!node.file) return null;
  try {
    const filePath = resolve(basePath, node.file);
    return readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}
