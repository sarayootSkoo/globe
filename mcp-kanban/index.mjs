import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  readBoard,
  writeBoard,
  readEvents,
  appendEvent,
  readStatus,
  readPending,
  readResult,
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
  version: '1.0.0',
});

// 1. kanban_get_board — Read full board state
server.registerTool(
  'kanban_get_board',
  {
    title: 'Get Board State',
    description: 'Read the full Kanban board state including all cards, columns, and current session status.',
    inputSchema: z.object({}).strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async () => {
    const board = readBoard();
    const status = readStatus();
    return ok({ ...board, session: status });
  },
);

// 2. kanban_list_cards — List cards with filters
server.registerTool(
  'kanban_list_cards',
  {
    title: 'List Cards',
    description: 'List Kanban cards with optional filters by column, status, or agent. Returns up to `limit` cards.',
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
    const board = readBoard();
    let cards = board.cards ?? [];

    // Determine which cards belong to the requested column via board.columns map
    if (column) {
      const columnCardIds = new Set(board.columns?.[column] ?? []);
      cards = cards.filter((c) => columnCardIds.has(c.id) || c.column === column);
    }
    if (status) {
      cards = cards.filter((c) => c.status === status);
    }
    if (agent) {
      cards = cards.filter((c) => c.agent === agent);
    }

    return ok({ total: cards.length, cards: cards.slice(0, limit) });
  },
);

// 3. kanban_get_card — Get single card details
server.registerTool(
  'kanban_get_card',
  {
    title: 'Get Card',
    description: 'Get full details for a single Kanban card by its ID.',
    inputSchema: z
      .object({
        card_id: z.string().min(1).describe('The card ID to retrieve'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ card_id }) => {
    const board = readBoard();
    const card = (board.cards ?? []).find((c) => c.id === card_id);
    if (!card) return err(`Card not found: ${card_id}`);
    return ok(card);
  },
);

// 4. kanban_create_card — Create new card
server.registerTool(
  'kanban_create_card',
  {
    title: 'Create Card',
    description: 'Create a new Kanban card and place it in the specified column (default: backlog).',
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
    const board = readBoard();
    const newCard = {
      id: generateId(),
      title,
      section,
      column,
      priority,
      status: 'idle',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    board.cards = [...(board.cards ?? []), newCard];

    // Add to column list
    if (!board.columns) board.columns = {};
    if (!board.columns[column]) board.columns[column] = [];
    board.columns[column] = [...board.columns[column], newCard.id];

    writeBoard(board);
    appendEvent({ type: 'card:created', cardId: newCard.id, title, column, priority, section });

    return ok(newCard);
  },
);

// 5. kanban_move_card — Move card to column
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
    const board = readBoard();
    const cardIndex = (board.cards ?? []).findIndex((c) => c.id === card_id);
    if (cardIndex === -1) return err(`Card not found: ${card_id}`);

    const card = board.cards[cardIndex];
    const fromColumn = card.column;

    // Remove from old column list
    if (board.columns?.[fromColumn]) {
      board.columns[fromColumn] = board.columns[fromColumn].filter((id) => id !== card_id);
    }

    // Add to new column list
    if (!board.columns) board.columns = {};
    if (!board.columns[to_column]) board.columns[to_column] = [];
    board.columns[to_column] = [...board.columns[to_column], card_id];

    // Update card
    board.cards[cardIndex] = { ...card, column: to_column, updatedAt: Date.now() };

    writeBoard(board);
    appendEvent({ type: 'card:moved', cardId: card_id, fromColumn, toColumn: to_column, reason });

    return ok(board.cards[cardIndex]);
  },
);

// 6. kanban_update_status — Update card lifecycle status
const VALID_STATUSES = ['idle', 'started', 'running', 'paused', 'completed', 'failed', 'blocked'];

server.registerTool(
  'kanban_update_status',
  {
    title: 'Update Card Status',
    description: `Update the lifecycle status of a Kanban card. Valid statuses: ${VALID_STATUSES.join(', ')}.`,
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
    const board = readBoard();
    const cardIndex = (board.cards ?? []).findIndex((c) => c.id === card_id);
    if (cardIndex === -1) return err(`Card not found: ${card_id}`);

    const card = board.cards[cardIndex];
    const previousStatus = card.status;

    board.cards[cardIndex] = { ...card, status, updatedAt: Date.now() };
    writeBoard(board);
    appendEvent({ type: 'lifecycle:changed', cardId: card_id, previousStatus, status, reason });

    return ok(board.cards[cardIndex]);
  },
);

// 7. kanban_start_workflow — Start workflow for card
server.registerTool(
  'kanban_start_workflow',
  {
    title: 'Start Workflow',
    description: 'Record that a workflow has started for a card.',
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
    const board = readBoard();
    const card = (board.cards ?? []).find((c) => c.id === card_id);
    if (!card) return err(`Card not found: ${card_id}`);

    const event = { type: 'workflow:started', cardId: card_id, command, input_path };
    appendEvent(event);

    return ok({ card_id, command, input_path, message: 'Workflow started' });
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
    const board = readBoard();
    const cardIndex = (board.cards ?? []).findIndex((c) => c.id === card_id);
    if (cardIndex === -1) return err(`Card not found: ${card_id}`);

    const card = board.cards[cardIndex];
    board.cards[cardIndex] = { ...card, status: 'completed', updatedAt: Date.now() };
    writeBoard(board);

    appendEvent({ type: 'workflow:completed', cardId: card_id, output_path, suggested_next });

    return ok({ card_id, output_path, suggested_next, message: 'Workflow completed' });
  },
);

// 9. kanban_search — Search cards by text
server.registerTool(
  'kanban_search',
  {
    title: 'Search Cards',
    description: 'Search Kanban cards by text in their title or section. Case-insensitive.',
    inputSchema: z
      .object({
        query: z.string().min(1).describe('Search text to match against card titles and sections'),
        limit: z.number().int().min(1).max(100).default(10).describe('Max results to return (default: 10)'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ query, limit }) => {
    const board = readBoard();
    const lower = query.toLowerCase();

    const matches = (board.cards ?? []).filter(
      (c) =>
        c.title?.toLowerCase().includes(lower) ||
        c.section?.toLowerCase().includes(lower),
    );

    return ok({ query, total: matches.length, cards: matches.slice(0, limit) });
  },
);

// 10. kanban_metrics — Board metrics
server.registerTool(
  'kanban_metrics',
  {
    title: 'Board Metrics',
    description: 'Get Kanban board metrics: card counts per column and status, WIP count, and recent event count.',
    inputSchema: z
      .object({
        period: z.enum(['today', 'week', 'month', 'all']).default('all').describe('Time period for event metrics (default: "all")'),
      })
      .strict(),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ period }) => {
    const board = readBoard();
    const cards = board.cards ?? [];

    // Cards per column
    const perColumn = {};
    for (const [col, ids] of Object.entries(board.columns ?? {})) {
      perColumn[col] = ids.length;
    }
    // Also tally from card.column for cards not in board.columns
    for (const card of cards) {
      if (card.column && !(card.column in perColumn)) {
        perColumn[card.column] = (perColumn[card.column] ?? 0) + 1;
      }
    }

    // Cards per status
    const perStatus = {};
    for (const card of cards) {
      const s = card.status ?? 'unknown';
      perStatus[s] = (perStatus[s] ?? 0) + 1;
    }

    // WIP = cards with status running or started
    const wip = cards.filter((c) => c.status === 'running' || c.status === 'started').length;

    // Recent events by period
    const allEvents = readEvents(0); // read all
    let filteredEvents = allEvents;
    const now = Date.now();
    const periodMs = { today: 86400000, week: 604800000, month: 2592000000 };
    if (period !== 'all' && periodMs[period]) {
      const cutoff = now - periodMs[period];
      filteredEvents = allEvents.filter((e) => (e.ts ?? 0) >= cutoff);
    }

    return ok({
      period,
      totalCards: cards.length,
      perColumn,
      perStatus,
      wip,
      recentEvents: filteredEvents.length,
      boardUpdatedAt: board.updatedAt,
    });
  },
);

// --- Start ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('mcp-kanban v1.0.0 running via stdio');
}

main().catch((err) => {
  console.error('mcp-kanban server failed:', err);
  process.exit(1);
});
