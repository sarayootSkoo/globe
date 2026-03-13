import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  // Card operations (SQLite-backed)
  createCard,
  getCard,
  listCards,
  searchCards,
  moveCardToColumn,
  updateCardStatus,
  // Workflow operations
  startWorkflow,
  completeWorkflow,
  getWorkflows,
  // Metrics
  getMetrics,
  // Events (append-only JSONL)
  appendEvent,
  readEvents,
  // Legacy compat
  readBoard,
  readStatus,
} from './kanban-db.mjs';

// --- Helpers ---

function generateId() {
  return `card_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function ok(data) {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
}

function err(message) {
  return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: message }, null, 2) }] };
}

// --- MCP Server ---

const server = new McpServer({
  name: 'mcp-kanban',
  version: '2.0.0',
});

// 1. kanban_get_board — Read full board state
server.registerTool(
  'kanban_get_board',
  {
    title: 'Get Board State',
    description: 'Read the full Kanban board state including all cards, columns, and current session status. Data is served from SQLite.',
    inputSchema: z.object({}).strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async () => {
    const board = readBoard();
    const status = readStatus();
    return ok({ ...board, session: status });
  },
);

// 2. kanban_list_cards — List cards with filters (now uses SQL queries)
server.registerTool(
  'kanban_list_cards',
  {
    title: 'List Cards',
    description: 'List Kanban cards with optional filters by column, status, or agent. Uses SQL indexed queries for fast filtering.',
    inputSchema: z
      .object({
        column: z.string().optional().describe('Filter by column name (e.g. "backlog", "in-progress", "done")'),
        status: z.string().optional().describe('Filter by card status (e.g. "idle", "running", "completed")'),
        agent: z.string().optional().describe('Filter by assigned agent name'),
        limit: z.number().int().min(1).max(200).default(50).describe('Max cards to return (default: 50)'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ column, status, agent, limit }) => {
    const cards = listCards({ column, status, agent, limit });
    return ok({ total: cards.length, cards });
  },
);

// 3. kanban_get_card — Get single card details (direct SQLite lookup by PK)
server.registerTool(
  'kanban_get_card',
  {
    title: 'Get Card',
    description: 'Get full details for a single Kanban card by its ID, including workflow history.',
    inputSchema: z
      .object({
        card_id: z.string().min(1).describe('The card ID to retrieve'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ card_id }) => {
    const card = getCard(card_id);
    if (!card) return err(`Card not found: ${card_id}`);
    const workflows = getWorkflows(card_id);
    return ok({ ...card, workflows });
  },
);

// 4. kanban_create_card — Create new card (INSERT into SQLite)
server.registerTool(
  'kanban_create_card',
  {
    title: 'Create Card',
    description: 'Create a new Kanban card and place it in the specified column (default: backlog). Stored in SQLite.',
    inputSchema: z
      .object({
        title: z.string().min(1).describe('Card title'),
        section: z.string().min(1).describe('Section or category the card belongs to'),
        column: z.string().default('backlog').describe('Target column (default: "backlog")'),
        priority: z.string().default('medium').describe('Priority level: low, medium, high (default: "medium")'),
      })
      .strict(),
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  },
  async ({ title, section, column, priority }) => {
    const id = generateId();
    const card = createCard({ id, title, section, column, priority });
    appendEvent({ type: 'card:created', cardId: id, title, column, priority, section });
    return ok(card);
  },
);

// 5. kanban_move_card — Move card to column (SQL UPDATE)
server.registerTool(
  'kanban_move_card',
  {
    title: 'Move Card',
    description: 'Move a Kanban card to a different column.',
    inputSchema: z
      .object({
        card_id: z.string().min(1).describe('The card ID to move'),
        to_column: z.string().min(1).describe('Target column name'),
        reason: z.string().optional().describe('Optional reason for moving the card'),
      })
      .strict(),
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  },
  async ({ card_id, to_column, reason }) => {
    const result = moveCardToColumn(card_id, to_column);
    if (!result) return err(`Card not found: ${card_id}`);
    appendEvent({ type: 'card:moved', cardId: card_id, fromColumn: result.fromColumn, toColumn: to_column, reason });
    return ok(result.card);
  },
);

// 6. kanban_update_status — Update card lifecycle status (SQL UPDATE)
server.registerTool(
  'kanban_update_status',
  {
    title: 'Update Card Status',
    description: 'Update the lifecycle status of a Kanban card. Valid statuses: idle, started, running, paused, completed, failed, blocked.',
    inputSchema: z
      .object({
        card_id: z.string().min(1).describe('The card ID to update'),
        status: z.enum(['idle', 'started', 'running', 'paused', 'completed', 'failed', 'blocked']).describe('New lifecycle status'),
        reason: z.string().optional().describe('Optional reason for the status change'),
      })
      .strict(),
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  },
  async ({ card_id, status, reason }) => {
    const result = updateCardStatus(card_id, status, reason);
    if (!result) return err(`Card not found: ${card_id}`);
    appendEvent({ type: 'lifecycle:changed', cardId: card_id, previousStatus: result.previousStatus, status, reason });
    return ok(result.card);
  },
);

// 7. kanban_start_workflow — Start workflow for card (INSERT into workflows table)
server.registerTool(
  'kanban_start_workflow',
  {
    title: 'Start Workflow',
    description: 'Record that a workflow has started for a card. Stores in SQLite workflows table.',
    inputSchema: z
      .object({
        card_id: z.string().min(1).describe('The card ID to start a workflow for'),
        command: z.string().min(1).describe('The workflow command or action being started'),
        input_path: z.string().optional().describe('Optional path to input data for the workflow'),
      })
      .strict(),
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  },
  async ({ card_id, command, input_path }) => {
    const card = getCard(card_id);
    if (!card) return err(`Card not found: ${card_id}`);

    const workflowId = `wf_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const workflow = startWorkflow({
      id: workflowId,
      card_id,
      command,
      from_column: card.column_id,
    });
    appendEvent({ type: 'workflow:started', cardId: card_id, workflowId, command, input_path });

    return ok({ ...workflow, input_path, message: 'Workflow started' });
  },
);

// 8. kanban_complete_workflow — Complete workflow step
server.registerTool(
  'kanban_complete_workflow',
  {
    title: 'Complete Workflow',
    description: 'Record that a workflow step has completed for a card and optionally suggest the next step.',
    inputSchema: z
      .object({
        card_id: z.string().min(1).describe('The card ID whose workflow completed'),
        output_path: z.string().optional().describe('Optional path to the output produced by the workflow'),
        suggested_next: z.string().optional().describe('Optional suggestion for the next workflow step'),
      })
      .strict(),
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  },
  async ({ card_id, output_path, suggested_next }) => {
    const card = getCard(card_id);
    if (!card) return err(`Card not found: ${card_id}`);

    // Complete the most recent running workflow for this card
    const workflows = getWorkflows(card_id);
    const runningWf = workflows.find(w => w.status === 'running');
    if (runningWf) {
      completeWorkflow(runningWf.id, { status: 'completed', output: { output_path, suggested_next } });
    }

    // Update card status to completed
    updateCardStatus(card_id, 'completed');
    appendEvent({ type: 'workflow:completed', cardId: card_id, output_path, suggested_next });

    return ok({ card_id, output_path, suggested_next, message: 'Workflow completed' });
  },
);

// 9. kanban_search — Search cards by text (SQL LIKE query with index)
server.registerTool(
  'kanban_search',
  {
    title: 'Search Cards',
    description: 'Search Kanban cards by text in their title or section. Uses SQL LIKE queries.',
    inputSchema: z
      .object({
        query: z.string().min(1).describe('Search text to match against card titles and sections'),
        limit: z.number().int().min(1).max(100).default(10).describe('Max results to return (default: 10)'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ query, limit }) => {
    const matches = searchCards(query, limit);
    return ok({ query, total: matches.length, cards: matches });
  },
);

// 10. kanban_metrics — Board metrics (SQL aggregate queries)
server.registerTool(
  'kanban_metrics',
  {
    title: 'Board Metrics',
    description: 'Get Kanban board metrics: card counts per column and status, WIP count, and recent event count. Uses SQL COUNT/GROUP BY.',
    inputSchema: z
      .object({
        period: z.enum(['today', 'week', 'month', 'all']).default('all').describe('Time period for event metrics (default: "all")'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ period }) => {
    const metrics = getMetrics();

    // Recent events by period (from JSONL)
    const allEvents = readEvents(0);
    let filteredEvents = allEvents;
    const now = Date.now();
    const periodMs = { today: 86400000, week: 604800000, month: 2592000000 };
    if (period !== 'all' && periodMs[period]) {
      const cutoff = now - periodMs[period];
      filteredEvents = allEvents.filter((e) => (e.ts ?? 0) >= cutoff);
    }

    return ok({
      period,
      ...metrics,
      recentEvents: filteredEvents.length,
    });
  },
);

// --- Start ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('mcp-kanban v2.0.0 (SQLite) running via stdio');
}

main().catch((err) => {
  console.error('mcp-kanban server failed:', err);
  process.exit(1);
});
