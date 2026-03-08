import { writable } from 'svelte/store';
import type { GraphNode, GraphLink } from '../types';
import type { GraphConfig } from '../config';

export const graphNodes = writable<GraphNode[]>([]);
export const graphLinks = writable<GraphLink[]>([]);

export async function loadData(config?: GraphConfig): Promise<void> {
  const dataFile = config?.dataFile || './graph-data.json';
  try {
    const resp = await fetch(dataFile);
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
    console.warn(`${dataFile} not found. Run: node scripts/build-graph-data.mjs`);
  }
}
