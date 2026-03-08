import type { GraphNode, GraphLink } from '../types';

/**
 * Serialises the current graph state to a JSON file and triggers a browser
 * download.  Only the stable, serialisable fields are included — D3 simulation
 * position data and internal state fields are stripped.
 *
 * Output filename: knowledge-graph-export.json
 */
export function exportGraph(nodes: GraphNode[], links: GraphLink[]): void {
  const data = {
    nodes: nodes.map(n => ({
      id:    n.id,
      file:  n.file,
      label: n.label,
      cat:   n.cat,
      refs:  n.refs,
    })),
    links: links.map(l => ({
      source: typeof l.source === 'string' ? l.source : l.source.id,
      target: typeof l.target === 'string' ? l.target : l.target.id,
      label:  l.label,
    })),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'knowledge-graph-export.json';
  a.click();
}
