# Chore: สร้าง MCP Server สำหรับ Knowledge Graph

## Metadata
adw_id: `knowledge-graph`
prompt: `การสร้าง mcp server สำหรับ knowledge-graph`
datetime: `09-03-2026 13:30:22`

---

## Chore Description
โปรเจกต์ knowledge-graph มี data model (nodes/links/categories) และ utility functions (search, BFS path finding, connected nodes) ที่พร้อมใช้งานอยู่แล้ว แต่ปัจจุบันเข้าถึงได้เฉพาะผ่าน browser UI เท่านั้น การสร้าง MCP server จะเปิดให้ AI agents (Claude Code, Claude Desktop) สามารถ query knowledge graph ได้โดยตรง — ค้นหา nodes, หา path ระหว่าง nodes, ดู connections, อ่าน preview content — ทั้งหมดนี้โดยไม่ต้องเปิด browser

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[Claude Code] → ไม่มี MCP tools → ต้องอ่าน graph-data.json ด้วยมือ → parse JSON เอง → ไม่มี search/BFS
[User] → เปิด browser → localhost:4002 → ค้นหา/ดู graph → copy ข้อมูลมาบอก AI

ข้อจำกัด: AI ไม่สามารถ query graph data ได้ตรงๆ
```
**Score: 2/5** — ข้อมูล graph มีอยู่แต่เข้าถึงยากจาก AI tools

### TO-BE — Target State
```
[Claude Code] → MCP tools → search_nodes("kafka") → ScoredResult[]  ✅
[Claude Code] → MCP tools → find_path("oms-order", "adapter") → string[]  ✅
[Claude Code] → MCP tools → get_node("_decisions-001") → GraphNode with preview  ✅
[Claude Code] → MCP tools → get_connected("_core-architecture") → string[]  ✅
[Claude Code] → MCP tools → read_node_file("_decisions-001") → full markdown  ✅
[Claude Code] → MCP tools → filter_nodes({ category: "decisions" }) → GraphNode[]  ✅
[Claude Code] → MCP resource → knowledge-graph/categories → Category[]  ✅
[Claude Code] → MCP resource → knowledge-graph/stats → { totalNodes, ... }  ✅
```
**Score: 5/5** — AI สามารถ query knowledge graph ได้สมบูรณ์ผ่าน MCP protocol

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1 | graph-data.json path ผิดเมื่อ run จาก directory อื่น | Medium | MCP server โหลดข้อมูลไม่ได้ | ใช้ path resolve จาก `__dirname` หรือ config param |
| 2 | Large graph data ทำให้ MCP response ช้า | Low | Response delay | Limit results + pagination |
| 3 | @modelcontextprotocol/sdk version incompatibility | Low | Server ไม่ start | Pin SDK version, ทดสอบก่อน deploy |
| 4 | Node.js vs browser code mixing | Medium | Import errors (svelte stores, DOM APIs) | สร้าง pure functions แยกจาก Svelte stores |

---

## Promise.all Impact
**NO — ไม่มี async ordering impact.** MCP tools แต่ละตัวเป็น independent read-only queries ไม่มี state mutation ที่ต้อง synchronize

---

## Relevant Files

### Existing (reuse logic)
- `src/lib/types.ts` — GraphNode, GraphLink, Category, ScoredResult interfaces
- `src/lib/utils/search.ts:16` — `doSearch()` weighted search algorithm
- `src/lib/utils/graph.ts:8-63` — `getConnected()`, `bfs()`, `isLinkOf()`, `nodeRadius()`, `nodeColor()`
- `src/lib/constants.ts:4-13` — CATEGORIES default map
- `public/graph-data.json` — nodes & links dataset (234 nodes, 156 links)
- `public/graph-config.json` — project config with categories

### New Files
- `mcp-server/package.json` — MCP server package (standalone Node.js)
- `mcp-server/src/index.ts` — MCP server entry point (stdio transport)
- `mcp-server/src/graph-loader.ts` — โหลด graph-data.json + graph-config.json จาก filesystem
- `mcp-server/src/tools.ts` — MCP tool definitions & handlers
- `mcp-server/tsconfig.json` — TypeScript config (Node.js target)

---

## Architecture Decision: Standalone vs Embedded

**เลือก Standalone** — สร้างเป็น separate Node.js process ใน `mcp-server/` subdirectory:
- ไม่ depend on Svelte/Vite/browser APIs
- Copy pure utility functions (search.ts, graph.ts) มาใช้ตรง (ไม่ import จาก src/ เพราะ Svelte store imports จะพัง)
- ใช้ `@modelcontextprotocol/sdk` กับ `StdioServerTransport`
- อ่าน graph data จาก filesystem โดยตรง (fs.readFileSync) ไม่ใช่ fetch

---

## Step by Step Tasks

### 1. สร้าง MCP Server Package
**File:** `mcp-server/package.json`
- สร้าง Node.js package ที่มี `@modelcontextprotocol/sdk` เป็น dependency
- TypeScript compilation target: Node 18+
- Entry point: `dist/index.js`

```json
{
  "name": "knowledge-graph-mcp",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.1"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.0.0"
  }
}
```

### 2. TypeScript Config
**File:** `mcp-server/tsconfig.json`
- Target ES2022, module NodeNext
- outDir: `dist/`

### 3. Graph Data Loader
**File:** `mcp-server/src/graph-loader.ts`
- อ่าน `public/graph-data.json` และ `public/graph-config.json` จาก parent directory
- Parse nodes, links, categories
- Export `loadGraphData()` function ที่ return `{ nodes, links, categories, stats }`
- ใช้ `path.resolve(__dirname, '../../public/graph-data.json')` สำหรับ default path
- รับ optional `--data-dir` CLI argument เพื่อ override path

### 4. Pure Utility Functions (copy from src)
**File:** `mcp-server/src/tools.ts`
- Copy `doSearch()` logic จาก `src/lib/utils/search.ts`
- Copy `getConnected()`, `bfs()` logic จาก `src/lib/utils/graph.ts`
- Copy type interfaces จาก `src/lib/types.ts`
- ปรับให้เป็น pure Node.js (ไม่มี Svelte imports)

### 5. MCP Server Entry Point
**File:** `mcp-server/src/index.ts`
- สร้าง MCP server ด้วย `@modelcontextprotocol/sdk`
- ใช้ `StdioServerTransport` สำหรับ Claude Code integration
- โหลด graph data ตอน startup
- Register 6 MCP tools + 2 MCP resources:

#### Tools (6 tools):

**`search_nodes`**
- Input: `{ query: string, limit?: number }`
- Output: Top N scored results (default 20)
- ใช้ doSearch() algorithm

**`get_node`**
- Input: `{ id: string }`
- Output: Full node data including preview content
- Return null ถ้าไม่เจอ

**`get_connected`**
- Input: `{ id: string }`
- Output: Array of connected node IDs + labels

**`find_path`**
- Input: `{ from: string, to: string }`
- Output: Array of node IDs in shortest path, or null

**`read_node_file`**
- Input: `{ id: string }`
- Output: Full file content จาก disk (ใช้ node.file + basePath จาก config)
- ใช้ fs.readFileSync อ่านไฟล์ต้นฉบับ — ไม่ใช่แค่ truncated preview

**`filter_nodes`**
- Input: `{ category?: string, min_refs?: number, has_preview?: boolean, limit?: number }`
- Output: Array of matching nodes (default limit 50)
- Filter by category, minimum reference count, หรือมี preview content

#### Resources (2 resources):

**`knowledge-graph://categories`**
- URI: `knowledge-graph://categories`
- Return: All categories with label, color, glow, node count
- Static data — ไม่ต้องรับ input

**`knowledge-graph://stats`**
- URI: `knowledge-graph://stats`
- Return: `{ totalNodes, totalLinks, categoryCounts, generated }`
- Static data — graph overview statistics

### 6. Register MCP Server ใน Claude Code Config
**File:** `.claude/mcp.json` (project-level)
- เพิ่ม knowledge-graph-mcp server config
- Command: `node mcp-server/dist/index.js`

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

---

## Validation Commands

```bash
# Build MCP server
cd mcp-server && pnpm install && pnpm run build

# Test: run server and send list_tools request via stdio
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js

# Test: search query
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_nodes","arguments":{"query":"kafka"}}}' | node dist/index.js

# Verify types
cd mcp-server && npx tsc --noEmit
```

---

## Notes
- MCP SDK ใช้ stdio transport เป็น default — Claude Code จะ spawn process แล้วสื่อสารผ่าน stdin/stdout
- graph-data.json มี 234 nodes, 156 links — ขนาดเล็กพอที่จะโหลดเข้า memory ทั้งหมด
- Pure functions (doSearch, bfs, getConnected) ถูก copy มาแทนที่จะ import เพราะ source ใน `src/lib/` depend on Svelte stores และ browser APIs
- ไม่ต้อง watch file changes เพราะ graph data ไม่ค่อยเปลี่ยน — ถ้าต้องการ reload ให้ restart MCP server
- Preview content ใน nodes อาจยาว — `get_node` ควร return full preview แต่ `search_nodes` ควร truncate
