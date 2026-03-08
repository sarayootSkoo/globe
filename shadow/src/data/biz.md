# load_graph

## Status: 🟢 done
## Prod: src/lib/stores/graphData.ts + public/graph-data.json

Feature: load static graph dataset into reactive stores on app start.

**Why it exists:** Graph is pre-built (not live), shipped as a JSON asset. Stores make nodes/links reactive for downstream derived stores (search, globe, etc.).

**Data shape (graph-data.json):**
- ~133 nodes, 69 links
- node fields: id, label, file?, keywords?, desc?, ...
- link fields: source, target, ...

**Label truncation rule:** labels > 28 chars are cut to 28 — prevents overflow in graph visualisation and search results.

**Error handling:** if fetch fails → console.warn (silent fail, stores stay empty).

**Lifecycle:** loadData() called once at app init; no polling / no re-fetch.
