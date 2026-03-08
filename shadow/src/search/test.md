# search_nodes

## Status: 🟢 done
## Prod: src/lib/utils/search.ts

**Unit: doSearch()**

| case | input | expect |
|------|-------|--------|
| empty string | `''` | `[]` |
| whitespace only | `'  '` | `[]` |
| exact label | `'Alpha'` on node label='Alpha' | score=100, first result |
| partial label | `'alp'` on label='Alpha' | score=60 |
| id match | query matches node.id only | score=40 |
| keyword match | query in node.keywords | score=30 |
| file match | query in node.file | score=20 |
| desc match | query in node.desc | score=10 |
| multi-field match | label contains + desc match | score=70 (60+10) |
| case insensitive | `'ALPHA'` on label='alpha' | score=100 |
| zero score omitted | node with no matching fields | not in results |
| sort order | multiple hits | descending by score |

**Store: searchScored**
- update searchQuery → searchScored recomputes automatically
- empty query → searchScored = []

**Component smoke:**
- SearchBox: typing updates $searchQuery
- SearchResults: renders one row per ScoredResult, score visible
