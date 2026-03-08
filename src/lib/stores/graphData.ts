import { writable } from 'svelte/store';
import type { GraphNode, GraphLink } from '../types';

export const graphNodes = writable<GraphNode[]>([]);
export const graphLinks = writable<GraphLink[]>([]);

export async function loadData(): Promise<void> {
  try {
    const resp = await fetch('./graph-data.json');
    if (resp.ok) {
      const data = await resp.json();
      graphNodes.set(
        data.nodes.map((n: GraphNode) => ({
          ...n,
          label: n.label.length > 28 ? n.label.substring(0, 26) + '..' : n.label,
        }))
      );
      graphLinks.set(data.links.map((l: GraphLink) => ({ ...l })));
    }
  } catch {
    console.warn('graph-data.json not found. Run: node scripts/build-graph-data.mjs');
  }
}
