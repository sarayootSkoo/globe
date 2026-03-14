import { writable } from 'svelte/store';
import type { GraphNode, GraphLink } from '../types';
import type { GraphConfig } from '../config';

export const graphNodes = writable<GraphNode[]>([]);
export const graphLinks = writable<GraphLink[]>([]);

let _dataFile = './graph-data.json';

export async function loadData(config?: GraphConfig): Promise<void> {
  _dataFile = config?.dataFile || './graph-data.json';
  try {
    const resp = await fetch(_dataFile);
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
    console.warn(`${_dataFile} not found. Run: node scripts/build-graph-data.mjs`);
  }
}

/** Re-fetch graph data with cache-bust to sync latest documents */
export async function syncGraphData(): Promise<{ nodes: number; links: number }> {
  const url = `${_dataFile}?t=${Date.now()}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch ${_dataFile}: ${resp.status}`);
  const data = await resp.json();
  const nodes = data.nodes.map((n: GraphNode) => ({
    ...n,
    label: n.label.length > 28 ? n.label.substring(0, 26) + '..' : n.label,
  }));
  graphNodes.set(nodes);
  graphLinks.set(data.links.map((l: GraphLink) => ({ ...l })));
  return { nodes: nodes.length, links: data.links.length };
}
