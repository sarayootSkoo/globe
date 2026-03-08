# search_nodes

## Status: 🟢 done
## Prod: src/lib/utils/search.ts + src/lib/stores/searchState.ts

Feature: keyword search over graph nodes with weighted scoring.

**Why it exists:** Graph has ~133 nodes — user needs fast, ranked lookup without a backend.

**Scoring weights (higher = more relevant):**
- label exact match → 100
- label contains → 60
- id match → 40
- keywords match → 30
- file match → 20
- desc match → 10

**Rules:**
- Case-insensitive; trim query before scoring
- Empty query → return [] immediately (no work)
- Omit results with score = 0
- Sort descending by score

**Stores (reactive pipeline):**
- `searchQuery` writable — raw input string
- `searchScored` derived — ScoredResult[] from doSearch()
- `searchMatched` derived — filtered/mapped from searchScored for UI

**UI contract:**
- SearchBox owns the input, writes searchQuery
- SearchResults reads searchScored, renders animated table with score column
