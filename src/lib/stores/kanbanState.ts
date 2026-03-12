import { derived, writable, get } from 'svelte/store';
import { graphNodes } from './graphData';
import type {
  GraphNode, KanbanCard, KanbanStatus, KanbanColumnDef,
  AgentType, CardType, CardLifecycleState, PauseReason,
} from '../types';

// ── SDLC Pipeline Columns ────────────────────────────────────────────────────
export const KANBAN_COLUMNS: KanbanColumnDef[] = [
  { id: 'create',      label: 'CREATE',      color: '#ffffff' },
  { id: 'design',      label: 'DESIGN',      color: '#b44dff' },
  { id: 'backlog',     label: 'BACKLOG',     color: '#888888' },
  { id: 'hold',        label: 'HOLD',        color: '#ffcc00' },
  { id: 'task',        label: 'TASK',        color: '#00e5ff' },
  { id: 'issue',       label: 'ISSUE',       color: '#ff3d3d' },
  { id: 'develop',     label: 'DEVELOP',     color: '#4d8aff' },
  { id: 'testing',     label: 'TESTING',     color: '#f97316' },
  { id: 'validate',    label: 'VALIDATE',    color: '#00ff88' },
  { id: 'update-docs', label: 'UPDATE DOCS', color: '#ff3dff' },
  { id: 'done',        label: 'DONE',        color: '#666666' },
];

// ── Agent Definitions (13 agents — full SDLC team) ──────────────────────────
export const AGENT_DEFS: Record<string, { label: string; role: string; color: string; icon: string; command: string }> = {
  chore:      { label: 'Chore',      role: 'Tech Lead',        color: '#b44dff', icon: 'CH', command: '/chore' },
  feature:    { label: 'Feature',    role: 'Tech Lead',        color: '#a855f7', icon: 'FE', command: '/feature' },
  breakdown:  { label: 'Breakdown',  role: 'Product Manager',  color: '#ff3dff', icon: 'BD', command: '/breakdown' },
  estimate:   { label: 'Estimate',   role: 'Scrum Master',     color: '#06b6d4', icon: 'ES', command: '/estimate' },
  implement:  { label: 'Implement',  role: 'Developer',        color: '#4d8aff', icon: 'IM', command: '/implement' },
  issue:      { label: 'Issue',      role: 'Investigator',     color: '#ff3d3d', icon: 'IS', command: '/issue' },
  test:       { label: 'Test',       role: 'QA Engineer',      color: '#eab308', icon: 'TE', command: '/test' },
  review:     { label: 'Review',     role: 'Code Reviewer',    color: '#f97316', icon: 'RE', command: '/review' },
  security:   { label: 'Security',   role: 'Security Auditor', color: '#ef4444', icon: 'SE', command: '/security' },
  validate:   { label: 'Validate',   role: 'Domain Expert',    color: '#00ff88', icon: 'VA', command: '/validate' },
  docs:       { label: 'Docs',       role: 'Tech Writer',      color: '#8b5cf6', icon: 'DO', command: '/docs' },
  deploy:     { label: 'Deploy',     role: 'DevOps Engineer',  color: '#64748b', icon: 'DP', command: '/deploy' },
  discussion: { label: 'Discussion', role: 'Architect',        color: '#14b8a6', icon: 'DI', command: '/discussion' },
};

// ── Agent Suggestion Rules (which agents are valid per column) ───────────────
export const AGENT_SUGGEST_RULES: Record<KanbanStatus, AgentType[]> = {
  'create':      ['chore', 'feature', 'issue'],
  'design':      ['breakdown', 'discussion', 'chore'],
  'backlog':     [],
  'hold':        [],
  'task':        ['implement', 'estimate'],
  'issue':       ['issue'],
  'develop':     ['implement'],
  'testing':     ['test', 'review'],
  'validate':    ['validate', 'security'],
  'update-docs': ['docs'],
  'done':        ['deploy'],
};

// ── Persistence (localStorage) ───────────────────────────────────────────────
const STORAGE_KEY = 'kg-kanban-agents';
const MOVE_KEY    = 'kg-kanban-moves';
const LOCAL_CARDS_KEY = 'kg-kanban-local-cards';
const LIFECYCLE_KEY   = 'kg-kanban-lifecycle';
const ITERATION_KEY   = 'kg-kanban-iterations';

function loadMap(key: string): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch { return {}; }
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

/** nodeId → AgentType */
export const agentAssignments = writable<Record<string, AgentType>>(
  loadMap(STORAGE_KEY) as Record<string, AgentType>
);
agentAssignments.subscribe(v => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
});

/** nodeId → KanbanStatus (manual column overrides via drag-and-drop) */
export const statusOverrides = writable<Record<string, KanbanStatus>>(
  loadMap(MOVE_KEY) as Record<string, KanbanStatus>
);
statusOverrides.subscribe(v => {
  localStorage.setItem(MOVE_KEY, JSON.stringify(v));
});

/** Local cards created from UI (not from graph nodes) */
export interface LocalCardData {
  id: string;
  title: string;
  section?: string;
  column: KanbanStatus;
  type: CardType;
  uploadPath?: string;
  createdAt: number;
}

export const localCards = writable<Record<string, LocalCardData>>(
  loadJson<Record<string, LocalCardData>>(LOCAL_CARDS_KEY, {})
);
localCards.subscribe(v => {
  localStorage.setItem(LOCAL_CARDS_KEY, JSON.stringify(v));
});

/** nodeId → lifecycle state */
export interface LifecycleData {
  state: CardLifecycleState;
  pauseReason?: PauseReason | null;
  startedAt?: number | null;
  completedAt?: number | null;
}

export const lifecycleStates = writable<Record<string, LifecycleData>>(
  loadJson<Record<string, LifecycleData>>(LIFECYCLE_KEY, {})
);
lifecycleStates.subscribe(v => {
  localStorage.setItem(LIFECYCLE_KEY, JSON.stringify(v));
});

/** nodeId → iteration data */
export interface IterationData {
  count: number;
  score: number;         // 0-5
  lastCommand?: string;
  lastRunAt?: number;
  artifactPath?: string;
}

export const iterationStates = writable<Record<string, IterationData>>(
  loadJson<Record<string, IterationData>>(ITERATION_KEY, {})
);
iterationStates.subscribe(v => {
  localStorage.setItem(ITERATION_KEY, JSON.stringify(v));
});

// ── Actions ──────────────────────────────────────────────────────────────────

export function assignAgent(nodeId: string, agent: AgentType): void {
  agentAssignments.update(m => ({ ...m, [nodeId]: agent }));
}

export function moveCard(nodeId: string, newStatus: KanbanStatus): void {
  statusOverrides.update(m => ({ ...m, [nodeId]: newStatus }));
}

export function addLocalCard(card: LocalCardData): void {
  localCards.update(m => ({ ...m, [card.id]: card }));
}

export function removeLocalCard(cardId: string): void {
  localCards.update(m => {
    const next = { ...m };
    delete next[cardId];
    return next;
  });
}

export function updateLifecycle(
  nodeId: string,
  state: CardLifecycleState,
  pauseReason?: PauseReason | null,
): void {
  lifecycleStates.update(m => ({
    ...m,
    [nodeId]: {
      ...m[nodeId],
      state,
      pauseReason: pauseReason ?? null,
      ...(state === 'started' ? { startedAt: Date.now() } : {}),
      ...(state === 'completed' ? { completedAt: Date.now() } : {}),
    },
  }));
}

export function updateIteration(
  nodeId: string,
  data: Partial<IterationData>,
): void {
  iterationStates.update(m => ({
    ...m,
    [nodeId]: { count: 0, score: 0, ...m[nodeId], ...data },
  }));
}

// ── Status Detection (file path → SDLC column) ──────────────────────────────

function deriveStatus(node: GraphNode): KanbanStatus | null {
  const f = node.file || '';
  const fl = f.toLowerCase();

  // old/ or archive/ → done
  if (/[/\\]old[/\\]/i.test(f) || /[-_]old[/\\]/i.test(f)) return 'done';
  if (/[/\\]archive[/\\]/i.test(f)) return 'done';

  // hold/ → hold
  if (/[/\\]hold[/\\]/i.test(f) || /[-_]hold[/\\]/i.test(f)) return 'hold';

  // Explicit status from build-graph-data
  if (node.status === 'done') return 'done';
  if (node.status === 'hold') return 'hold';

  // specs/ (active) → develop (they have a spec, ready to implement)
  if (node.status === 'in-progress') return 'develop';
  if (/[-/\\]specs[/\\]/i.test(fl) || fl.startsWith('specs/')) return 'develop';

  // tasks/ → task
  if (/[-/\\]tasks?[/\\]/i.test(fl) || fl.startsWith('task')) return 'task';

  // discussion/ → backlog (has been discussed, waiting for action)
  if (/[-/\\]discuss[/\\]/i.test(fl) || fl.startsWith('discuss')) return 'backlog';

  // decisions/ → done (already decided)
  if (/[-/\\]decisions?[/\\]/i.test(fl) || fl.startsWith('decision')) return 'done';

  return null;
}

function detectType(f: string): CardType {
  const fl = f.toLowerCase();
  if (/[-/\\]specs?[/\\]/i.test(fl) || fl.startsWith('spec')) return 'spec';
  if (/[-/\\]tasks?[/\\]/i.test(fl) || fl.startsWith('task')) return 'task';
  if (/[-/\\]issues?[/\\]/i.test(fl) || fl.startsWith('issue')) return 'issue';
  return 'discussion';
}

// ── Derived Stores ───────────────────────────────────────────────────────────

export const kanbanCards = derived(
  [graphNodes, agentAssignments, statusOverrides, localCards, lifecycleStates, iterationStates],
  ([$nodes, $agents, $overrides, $locals, $lifecycle, $iterations]) => {
    const cards: KanbanCard[] = [];

    // Cards from graph nodes (file-based detection)
    for (const node of $nodes) {
      let status = deriveStatus(node);
      if (status === null) continue;
      if ($overrides[node.id]) status = $overrides[node.id];
      const agent = $agents[node.id] || null;
      const lc = $lifecycle[node.id];
      const iter = $iterations[node.id];
      cards.push({
        node,
        status,
        filePath: node.file || '',
        type: detectType(node.file || ''),
        agent,
        lifecycle: lc?.state || 'idle',
        pauseReason: lc?.pauseReason ?? null,
        iterationCount: iter?.count || 0,
        iterationScore: iter?.score || 0,
        lastCommand: iter?.lastCommand ?? null,
        lastRunAt: iter?.lastRunAt ?? null,
        artifactPath: iter?.artifactPath ?? node.file ?? null,
      });
    }

    // Local cards (created via UI — no graph node)
    for (const local of Object.values($locals)) {
      const agent = $agents[local.id] || null;
      const lc = $lifecycle[local.id];
      const iter = $iterations[local.id];
      const fakeNode: GraphNode = {
        id: local.id,
        label: local.title,
        cat: local.section || 'local',
      };
      cards.push({
        node: fakeNode,
        status: $overrides[local.id] || local.column,
        filePath: '',
        type: local.type,
        agent,
        lifecycle: lc?.state || 'idle',
        pauseReason: lc?.pauseReason ?? null,
        iterationCount: iter?.count || 0,
        iterationScore: iter?.score || 0,
        lastCommand: iter?.lastCommand ?? null,
        lastRunAt: iter?.lastRunAt ?? null,
        uploadPath: local.uploadPath ?? null,
        artifactPath: iter?.artifactPath ?? null,
        isLocal: true,
      });
    }

    return cards;
  }
);

export const kanbanColumns = derived(kanbanCards, ($cards) => {
  const grouped = new Map<KanbanStatus, KanbanCard[]>();
  for (const col of KANBAN_COLUMNS) grouped.set(col.id, []);
  for (const card of $cards) {
    grouped.get(card.status)?.push(card);
  }
  return grouped;
});
