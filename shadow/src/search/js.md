# search_nodes

## Status: 🟢 done
## Prod: src/lib/utils/search.ts + src/lib/stores/searchState.ts

```ts
// --- types ---
interface ScoredResult { node: GraphNode; score: number }

// --- core fn ---
doSearch(query: string, nodes: GraphNode[]): ScoredResult[]
  q = query.trim().toLowerCase()
  if !q → return []
  for each node:
    score = 0
    lbl = node.label.toLowerCase()
    if lbl === q         → score += 100
    else if lbl.includes(q) → score += 60
    if node.id.toLowerCase().includes(q)       → score += 40
    if node.keywords?.toLowerCase().includes(q) → score += 30
    if node.file?.toLowerCase().includes(q)     → score += 20
    if node.desc?.toLowerCase().includes(q)     → score += 10
    if score > 0 → push { node, score }
  return results.sort((a,b) => b.score - a.score)

// --- stores (searchState.ts) ---
searchQuery:  writable<string>('')
searchScored: derived([searchQuery, graphNodes], ([q, nodes]) => doSearch(q, nodes))
searchMatched: derived(searchScored, (results) => results.map(r => r.node))
```

**SearchBox.svelte** — binds input to $searchQuery (two-way)
**SearchResults.svelte** — iterates $searchScored, animated rows, shows score badge
