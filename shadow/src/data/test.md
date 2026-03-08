# load_graph

## Status: 🟢 done
## Prod: src/lib/stores/graphData.ts

**Unit: loadData()**

| case | setup | expect |
|------|-------|--------|
| happy path | fetch returns valid JSON | graphNodes set, graphLinks set |
| label ≤ 28 | label='Short' | unchanged |
| label > 28 | label=31-char string | truncated to 28 chars |
| label = 28 | exactly 28 chars | unchanged |
| fetch throws | fetch rejects | console.warn called, stores stay [] |
| invalid JSON | res.json() throws | console.warn called, stores stay [] |
| empty dataset | nodes=[], links=[] | graphNodes=[], graphLinks=[] |

**Counts (smoke / snapshot):**
- nodes.length → 133
- links.length → 69

**Store reactivity:**
- after loadData() resolves → $graphNodes readable in derived stores (searchScored, etc.)
