import type { GraphNode, ScoredResult } from '../types';

/**
 * Scores every node against a search query using weighted field matching.
 *
 * Scoring weights (additive):
 *   label exact match  = 100
 *   label contains     =  60
 *   id contains        =  40
 *   keywords contains  =  30
 *   file contains      =  20
 *   desc contains      =  10
 *
 * Returns results sorted by score descending, with zero-score nodes omitted.
 */
export function doSearch(q: string, nodes: GraphNode[]): ScoredResult[] {
  const query = q.toLowerCase().trim();
  if (!query) return [];

  const scored: ScoredResult[] = [];

  nodes.forEach(n => {
    const fields = {
      label:    (n.label    || '').toLowerCase(),
      id:       (n.id       || '').toLowerCase(),
      desc:     (n.desc     || '').toLowerCase(),
      keywords: (n.keywords || []).join(' ').toLowerCase(),
      file:     (n.file     || '').toLowerCase(),
    };

    let score = 0;

    // Exact match in label = highest weight
    if (fields.label === query)          score += 100;
    else if (fields.label.includes(query)) score += 60;

    // ID match
    if (fields.id.includes(query))       score += 40;

    // Keywords match
    if (fields.keywords.includes(query)) score += 30;

    // File path match
    if (fields.file.includes(query))     score += 20;

    // Description match
    if (fields.desc.includes(query))     score += 10;

    if (score > 0) scored.push({ node: n, score });
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  return scored;
}
