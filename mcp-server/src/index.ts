import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadGraphData } from './graph-loader.js';
import { doSearch, getConnected, bfs, readNodeFile } from './tools.js';

// Load graph data once at startup
const graph = loadGraphData();

const server = new McpServer({
  name: 'knowledge-graph',
  version: '1.0.0',
});

// --- Tools ---

server.tool(
  'search_nodes',
  'Search knowledge graph nodes by query string. Uses weighted scoring across label, id, keywords, file path, and description.',
  {
    query: z.string().describe('Search query text'),
    limit: z.number().optional().default(20).describe('Max results to return (default 20)'),
  },
  async ({ query, limit }) => {
    const results = doSearch(query, graph.nodes).slice(0, limit);
    const data = results.map(r => ({
      id: r.node.id,
      label: r.node.label,
      cat: r.node.cat,
      score: r.score,
      desc: r.node.desc,
      preview: r.node.preview ? r.node.preview.substring(0, 200) : undefined,
    }));
    return {
      content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
    };
  },
);

server.tool(
  'get_node',
  'Get full details of a specific node by ID, including preview content.',
  {
    id: z.string().describe('Node ID to look up'),
  },
  async ({ id }) => {
    const node = graph.nodes.find(n => n.id === id);
    if (!node) {
      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ error: 'Node not found', id }) }],
      };
    }
    const connected = [...getConnected(id, graph.links)];
    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({ ...node, connections: connected }, null, 2),
      }],
    };
  },
);

server.tool(
  'get_connected',
  'Get all nodes directly connected to a given node ID.',
  {
    id: z.string().describe('Node ID to find connections for'),
  },
  async ({ id }) => {
    const connectedIds = [...getConnected(id, graph.links)];
    const connectedNodes = connectedIds.map(cid => {
      const n = graph.nodes.find(node => node.id === cid);
      return n ? { id: n.id, label: n.label, cat: n.cat } : { id: cid };
    });
    return {
      content: [{ type: 'text' as const, text: JSON.stringify(connectedNodes, null, 2) }],
    };
  },
);

server.tool(
  'find_path',
  'Find the shortest path between two nodes using BFS. Returns array of node IDs or null if no path exists.',
  {
    from: z.string().describe('Starting node ID'),
    to: z.string().describe('Target node ID'),
  },
  async ({ from, to }) => {
    const path = bfs(from, to, graph.nodes, graph.links);
    if (!path) {
      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ path: null, message: 'No path found' }) }],
      };
    }
    const pathNodes = path.map(pid => {
      const n = graph.nodes.find(node => node.id === pid);
      return n ? { id: n.id, label: n.label, cat: n.cat } : { id: pid };
    });
    return {
      content: [{ type: 'text' as const, text: JSON.stringify({ path: path, nodes: pathNodes }, null, 2) }],
    };
  },
);

server.tool(
  'read_node_file',
  'Read the full source file content for a node. Returns the raw markdown/text from disk.',
  {
    id: z.string().describe('Node ID whose source file to read'),
  },
  async ({ id }) => {
    const node = graph.nodes.find(n => n.id === id);
    if (!node) {
      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ error: 'Node not found', id }) }],
      };
    }
    const content = readNodeFile(node, graph.config.basePath);
    if (content === null) {
      return {
        content: [{ type: 'text' as const, text: JSON.stringify({ error: 'File not found or not readable', file: node.file }) }],
      };
    }
    return {
      content: [{ type: 'text' as const, text: content }],
    };
  },
);

server.tool(
  'filter_nodes',
  'Filter nodes by category, minimum reference count, or preview availability.',
  {
    category: z.string().optional().describe('Filter by category key (e.g. "decisions", "core")'),
    min_refs: z.number().optional().describe('Minimum reference count'),
    has_preview: z.boolean().optional().describe('Only nodes with preview content'),
    limit: z.number().optional().default(50).describe('Max results (default 50)'),
  },
  async ({ category, min_refs, has_preview, limit }) => {
    let filtered = graph.nodes;

    if (category) {
      filtered = filtered.filter(n => n.cat === category);
    }
    if (min_refs !== undefined) {
      filtered = filtered.filter(n => (n.refs ?? 0) >= min_refs);
    }
    if (has_preview) {
      filtered = filtered.filter(n => !!n.preview);
    }

    const data = filtered.slice(0, limit).map(n => ({
      id: n.id,
      label: n.label,
      cat: n.cat,
      refs: n.refs,
      desc: n.desc,
    }));

    return {
      content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
    };
  },
);

// --- Resources ---

server.resource(
  'categories',
  'knowledge-graph://categories',
  { description: 'All knowledge graph categories with label, color, glow, and node count' },
  async () => {
    const data = Object.entries(graph.categories).map(([key, cat]) => ({
      key,
      ...cat,
      nodeCount: graph.stats.categoryCounts[key] ?? 0,
    }));
    return {
      contents: [{
        uri: 'knowledge-graph://categories',
        mimeType: 'application/json',
        text: JSON.stringify(data, null, 2),
      }],
    };
  },
);

server.resource(
  'stats',
  'knowledge-graph://stats',
  { description: 'Knowledge graph overview statistics' },
  async () => {
    return {
      contents: [{
        uri: 'knowledge-graph://stats',
        mimeType: 'application/json',
        text: JSON.stringify(graph.stats, null, 2),
      }],
    };
  },
);

// --- Start server ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('MCP server failed to start:', err);
  process.exit(1);
});
