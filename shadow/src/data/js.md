# load_graph

## Status: 🟢 done
## Prod: src/lib/stores/graphData.ts

```ts
// --- types ---
interface GraphNode { id: string; label: string; file?: string; keywords?: string; desc?: string }
interface GraphLink { source: string; target: string }

// --- stores ---
graphNodes: writable<GraphNode[]>([])
graphLinks: writable<GraphLink[]>([])

// --- loader ---
async loadData(): Promise<void>
  try:
    res  = await fetch('./graph-data.json')
    data = await res.json()           // { nodes: GraphNode[], links: GraphLink[] }
    nodes = data.nodes.map(n =>
      ({ ...n, label: n.label.length > 28 ? n.label.slice(0, 28) : n.label })
    )
    graphNodes.set(nodes)
    graphLinks.set(data.links)
  catch e:
    console.warn('graph-data load failed', e)
    // stores remain []
```

**Call site:** `loadData()` in top-level `onMount` or app entry point — called once.
