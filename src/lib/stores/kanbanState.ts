import { derived, writable, get } from 'svelte/store';
import { graphNodes } from './graphData';
import { kanbanDB } from './kanbanDB';
import type {
  GraphNode, KanbanCard, KanbanStatus, KanbanColumnDef,
  AgentType, CardType, CardLifecycleState, PauseReason,
  AgentSuggestion, CardPriority,
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

// ── Persistence (kanbanDB) ────────────────────────────────────────────────────

/** nodeId → AgentType */
export const agentAssignments = writable<Record<string, AgentType>>(
  kanbanDB.get('agents', {}) as Record<string, AgentType>
);
agentAssignments.subscribe(v => {
  kanbanDB.set('agents', v);
});

/** nodeId → KanbanStatus (manual column overrides via drag-and-drop) */
export const statusOverrides = writable<Record<string, KanbanStatus>>(
  kanbanDB.get('moves', {}) as Record<string, KanbanStatus>
);
statusOverrides.subscribe(v => {
  kanbanDB.set('moves', v);
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
  kanbanDB.get('cards', {}) as Record<string, LocalCardData>
);
localCards.subscribe(v => {
  kanbanDB.set('cards', v);
});

// ── Dependency Store ─────────────────────────────────────────────────────────

/**
 * Persisted map of cardId → array of cardIds that block it (blockedBy).
 * The inverse (blocking) is derived from this map.
 */
export const cardDependencyMap = writable<Record<string, string[]>>(
  kanbanDB.get('dependencies', {}) as Record<string, string[]>
);
cardDependencyMap.subscribe(v => {
  kanbanDB.set('dependencies', v);
});

/**
 * Derived store: cardId → { blockedBy: string[], blocking: string[] }
 * blockedBy is read directly from cardDependencyMap.
 * blocking is computed by scanning all entries for cards that list this card as a blocker.
 */
export const cardDependencies = derived(
  cardDependencyMap,
  ($deps): Map<string, { blockedBy: string[]; blocking: string[] }> => {
    const result = new Map<string, { blockedBy: string[]; blocking: string[] }>();

    // Collect all known card IDs (blockers and blocked)
    const allIds = new Set<string>();
    for (const [id, blockers] of Object.entries($deps)) {
      allIds.add(id);
      for (const b of blockers) allIds.add(b);
    }

    for (const id of allIds) {
      const blockedBy = $deps[id] ?? [];
      // A card is blocking others if it appears in another card's blockedBy list
      const blocking: string[] = [];
      for (const [otherId, blockers] of Object.entries($deps)) {
        if (blockers.includes(id)) blocking.push(otherId);
      }
      result.set(id, { blockedBy, blocking });
    }

    return result;
  }
);

/** nodeId → lifecycle state */
export interface LifecycleData {
  state: CardLifecycleState;
  pauseReason?: PauseReason | null;
  startedAt?: number | null;
  completedAt?: number | null;
}

export const lifecycleStates = writable<Record<string, LifecycleData>>(
  kanbanDB.get('lifecycle', {}) as Record<string, LifecycleData>
);
lifecycleStates.subscribe(v => {
  kanbanDB.set('lifecycle', v);
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
  kanbanDB.get('iterations', {}) as Record<string, IterationData>
);
iterationStates.subscribe(v => {
  kanbanDB.set('iterations', v);
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
    [nodeId]: { ...m[nodeId], ...data },
  }));
}

/**
 * Record that `cardId` is blocked by `blockedByCardId`.
 * Idempotent — calling multiple times with the same pair is safe.
 */
export function addDependency(cardId: string, blockedByCardId: string): void {
  cardDependencyMap.update(m => {
    const existing = m[cardId] ?? [];
    if (existing.includes(blockedByCardId)) return m;
    return { ...m, [cardId]: [...existing, blockedByCardId] };
  });
}

/**
 * Remove the dependency edge where `cardId` is blocked by `blockedByCardId`.
 */
export function removeDependency(cardId: string, blockedByCardId: string): void {
  cardDependencyMap.update(m => {
    const existing = m[cardId];
    if (!existing) return m;
    const next = existing.filter(id => id !== blockedByCardId);
    if (next.length === 0) {
      const copy = { ...m };
      delete copy[cardId];
      return copy;
    }
    return { ...m, [cardId]: next };
  });
}

/**
 * Return the list of card IDs that `cardId` is currently blocking.
 * (Reads synchronously from the current store value.)
 */
export function getBlockingCards(cardId: string): string[] {
  const deps = get(cardDependencyMap);
  return Object.entries(deps)
    .filter(([, blockers]) => blockers.includes(cardId))
    .map(([id]) => id);
}

/** Archive completed cards older than 30 days — call on app init */
export function archiveOldCards(): void {
  const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
  const now = Date.now();

  lifecycleStates.update(m => {
    const updated = { ...m };
    for (const [nodeId, data] of Object.entries(updated)) {
      if (data.state === 'completed' && data.completedAt && (now - data.completedAt) > MAX_AGE_MS) {
        delete updated[nodeId];
      }
    }
    return updated;
  });

  // Also clean up local cards that are completed and old
  localCards.update(m => {
    const updated = { ...m };
    for (const [id, card] of Object.entries(updated)) {
      if ((now - card.createdAt) > MAX_AGE_MS) {
        // Check if lifecycle is completed
        const lc = get(lifecycleStates)[id];
        if (!lc || lc.state === 'completed') {
          delete updated[id];
        }
      }
    }
    return updated;
  });
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
  [graphNodes, agentAssignments, statusOverrides, localCards, lifecycleStates, iterationStates, cardDependencyMap],
  ([$nodes, $agents, $overrides, $locals, $lifecycle, $iterations, $depMap]) => {
    const cards: KanbanCard[] = [];

    /** Returns the IDs of cards that `id` is blocking (appears in their blockedBy list). */
    function computeBlocking(id: string): string[] {
      return Object.entries($depMap)
        .filter(([, blockers]) => blockers.includes(id))
        .map(([otherId]) => otherId);
    }

    // Cards from graph nodes (file-based detection)
    for (const node of $nodes) {
      let status = deriveStatus(node);
      if (status === null) continue;
      if ($overrides[node.id]) status = $overrides[node.id];
      const agent = $agents[node.id] || null;
      const lc = $lifecycle[node.id];
      const iter = $iterations[node.id];
      const blockedBy = $depMap[node.id] ?? [];
      const blocking = computeBlocking(node.id);
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
        blockedBy: blockedBy.length > 0 ? blockedBy : undefined,
        blocking: blocking.length > 0 ? blocking : undefined,
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
      const blockedBy = $depMap[local.id] ?? [];
      const blocking = computeBlocking(local.id);
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
        blockedBy: blockedBy.length > 0 ? blockedBy : undefined,
        blocking: blocking.length > 0 ? blocking : undefined,
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

// ── agentSuggestions ─────────────────────────────────────────────────────────
//
// For each card that has no agent assigned, compute suggested agents based on:
//   1. Which agents are valid for the card's current column (AGENT_SUGGEST_RULES)
//   2. Card type bias (spec → chore/feature first, task → implement, issue → issue)
//
// Returns Map<nodeId, AgentSuggestion[]> — empty array when card already has agent.

const CARD_TYPE_PREFERRED: Record<CardType, AgentType[]> = {
  spec:       ['chore', 'feature'],
  task:       ['implement'],
  issue:      ['issue'],
  discussion: ['discussion', 'breakdown'],
};

export const agentSuggestions = derived(kanbanCards, ($cards): Map<string, AgentSuggestion[]> => {
  const result = new Map<string, AgentSuggestion[]>();

  for (const card of $cards) {
    // Skip cards that already have an agent assigned
    if (card.agent) {
      result.set(card.node.id, []);
      continue;
    }

    const columnAgents: AgentType[] = AGENT_SUGGEST_RULES[card.status] ?? [];
    const preferred: AgentType[]    = CARD_TYPE_PREFERRED[card.type]   ?? [];

    const suggestions: AgentSuggestion[] = columnAgents.map((agentKey) => {
      const def      = AGENT_DEFS[agentKey as string];
      const isPref   = preferred.includes(agentKey);
      const priority = isPref ? 10 : 5;
      const note     = isPref
        ? `Recommended for ${card.type} cards`
        : `Valid for ${card.status} column`;

      return {
        agent:    agentKey as string,
        command:  def?.command ?? `/${agentKey}`,
        priority,
        note,
      };
    });

    // Sort highest priority first
    suggestions.sort((a, b) => b.priority - a.priority);
    result.set(card.node.id, suggestions);
  }

  return result;
});

// ── cardPriorities ────────────────────────────────────────────────────────────
//
// For each card, compute a priority score (0-100) made up of:
//   Base weight by card type  : issue=40, spec=30, task=20, discussion=10
//   Has agent assigned        : +20
//   Connection count          : +10 per connection, capped at +30
//   Low iteration score (<3)  : +10
//
// Returns Map<nodeId, { score, reasons }>

const TYPE_BASE_SCORE: Record<CardType, number> = {
  issue:      40,
  spec:       30,
  task:       20,
  discussion: 10,
};

export const cardPriorities = derived(kanbanCards, ($cards): Map<string, CardPriority> => {
  const result = new Map<string, CardPriority>();

  for (const card of $cards) {
    let score  = 0;
    const reasons: string[] = [];

    // Base score from card type
    const typeBase = TYPE_BASE_SCORE[card.type] ?? 10;
    score += typeBase;
    reasons.push(`${card.type} card (+${typeBase})`);

    // Agent assigned bonus
    if (card.agent) {
      score += 20;
      reasons.push('agent assigned (+20)');
    }

    // Connection count bonus (capped at +30, i.e. max 3 connections counted)
    const connectionCount = card.node.connections?.length ?? 0;
    if (connectionCount > 0) {
      const connBonus = Math.min(connectionCount * 10, 30);
      score += connBonus;
      reasons.push(`${connectionCount} connection${connectionCount === 1 ? '' : 's'} (+${connBonus})`);
    }

    // Low iteration score bonus
    if (card.iterationScore > 0 && card.iterationScore < 3) {
      score += 10;
      reasons.push('low iteration score (+10)');
    }

    result.set(card.node.id, { score: Math.min(score, 100), reasons });
  }

  return result;
});
