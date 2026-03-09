# Knowledge Graph MCP Server

MCP (Model Context Protocol) server ที่เปิดให้ AI agents query knowledge graph ได้โดยตรง — ค้นหา nodes, หา path, ดู connections, อ่าน file content — ทั้งหมดผ่าน stdio transport

## Setup

```bash
cd mcp-server
pnpm install
pnpm run build
```

## Claude Code Integration

เพิ่มใน `.claude/mcp.json` (project-level):

```json
{
  "mcpServers": {
    "knowledge-graph": {
      "command": "node",
      "args": ["demo/knowledge-graph/mcp-server/dist/index.js"]
    }
  }
}
```

หรือถ้าต้องการ custom data directory:

```json
{
  "mcpServers": {
    "knowledge-graph": {
      "command": "node",
      "args": ["demo/knowledge-graph/mcp-server/dist/index.js", "--data-dir", "/path/to/public"]
    }
  }
}
```

## Tools (6 tools)

### `search_nodes`
ค้นหา nodes ด้วย weighted scoring (label=100/60, id=40, keywords=30, file=20, desc=10)

```
query: "kafka"        → ผลลัพธ์เรียงตาม score
limit: 5              → จำกัดจำนวน (default 20)
```

### `get_node`
ดูรายละเอียด node ทั้งหมด รวม preview content + connections

```
id: "decisions-001-kafka-event-driven"
```

### `get_connected`
ดู nodes ที่เชื่อมต่อโดยตรง (undirected)

```
id: "_core-architecture"
```

### `find_path`
หา shortest path ระหว่าง 2 nodes ด้วย BFS

```
from: "oms-order"
to: "adapter"
```

### `read_node_file`
อ่าน full source file ของ node จาก disk (ไม่ truncate)

```
id: "decisions-001-kafka-event-driven"
```

### `filter_nodes`
กรอง nodes ตาม category, ref count, หรือ preview availability

```
category: "decisions"   → เฉพาะ ADR decisions
min_refs: 5             → nodes ที่มี refs ≥ 5
has_preview: true       → เฉพาะ nodes ที่มี preview
limit: 50               → จำกัดจำนวน (default 50)
```

## Resources (2 resources)

| URI | Description |
|-----|-------------|
| `knowledge-graph://categories` | รายการ categories ทั้งหมด พร้อม label, color, glow, node count |
| `knowledge-graph://stats` | สถิติ graph — totalNodes, totalLinks, categoryCounts |

## Architecture

```
Claude Code ──stdio──→ MCP Server ──fs.readFileSync──→ graph-data.json
                                  ──fs.readFileSync──→ graph-config.json
                                  ──fs.readFileSync──→ source .md files
```

- **Standalone Node.js** — ไม่ depend on Svelte/Vite/browser APIs
- **In-memory graph** — โหลดครั้งเดียวตอน startup (~234 nodes, ~156 links)
- **Pure functions** — search, BFS, getConnected คัดลอกจาก `src/lib/utils/` เป็น browser-independent
- **Reload** — restart MCP server เพื่อโหลด data ใหม่หลัง regenerate graph
