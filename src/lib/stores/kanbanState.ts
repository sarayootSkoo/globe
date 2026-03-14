import { derived, writable, get } from 'svelte/store';
import { graphNodes } from './graphData';
import { kanbanDB, exportBoardState } from './kanbanDB';
import { addLog } from './activityLog';
import type {
  GraphNode, KanbanCard, KanbanStatus, KanbanColumnDef,
  AgentType, CardType, CardLifecycleState, PauseReason,
  AgentSuggestion, CardPriority, CardRef, ChecklistItem, CardComment,
} from '../types';

// ── Config-driven definitions (editable via Settings dialog) ─────────────────
import { kanbanConfig } from './kanbanConfig';

// Mutable snapshot — updated lazily when config changes (not reactive stores)
export let KANBAN_COLUMNS: KanbanColumnDef[] = get(kanbanConfig).columns;
export let AGENT_DEFS: Record<string, { label: string; role: string; color: string; icon: string; command: string }> = get(kanbanConfig).agents;
export let AGENT_SUGGEST_RULES: Record<KanbanStatus, AgentType[]> = get(kanbanConfig).agentSuggestRules as Record<KanbanStatus, AgentType[]>;

kanbanConfig.subscribe(cfg => {
  KANBAN_COLUMNS = cfg.columns;
  AGENT_DEFS = cfg.agents;
  AGENT_SUGGEST_RULES = cfg.agentSuggestRules as Record<KanbanStatus, AgentType[]>;
});

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

/** Per-card updated-at timestamp (ms) — set on move, lifecycle change, agent assign */
export const cardUpdatedAt = writable<Record<string, number>>(
  kanbanDB.get('cardUpdatedAt', {}) as Record<string, number>
);
cardUpdatedAt.subscribe(v => { kanbanDB.set('cardUpdatedAt', v); });

/** Manual card ordering per column — column → ordered nodeId[] */
export const cardOrder = writable<Record<string, string[]>>(
  kanbanDB.get('cardOrder', {}) as Record<string, string[]>
);
cardOrder.subscribe(v => { kanbanDB.set('cardOrder', v); });

export function setCardOrder(colId: string, order: string[]): void {
  cardOrder.update(m => ({ ...m, [colId]: order }));
}

export function clearCardOrder(): void {
  cardOrder.set({});
  kanbanDB.set('cardOrder', {});
}

/** Reset all manual overrides — statuses, agents, lifecycle, order, local cards */
export function resetBoard(): void {
  statusOverrides.set({});
  agentAssignments.set({});
  lifecycleStates.set({});
  iterationStates.set({});
  cardUpdatedAt.set({});
  cardOrder.set({});
  localCards.set({});
  cardDependencyMap.set({});
}

function touchCard(nodeId: string): void {
  cardUpdatedAt.update(m => ({ ...m, [nodeId]: Date.now() }));
}

/** Local cards created from UI (not from graph nodes) */
export interface LocalCardData {
  id: string;
  title: string;
  description?: string;
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

// ── Card References Store ────────────────────────────────────────────────────

export const cardRefs = writable<Record<string, CardRef[]>>(
  kanbanDB.get('cardRefs', {}) as Record<string, CardRef[]>
);
cardRefs.subscribe(v => { kanbanDB.set('cardRefs', v); });

export function addCardRef(cardId: string, ref: CardRef): void {
  cardRefs.update(m => {
    const existing = m[cardId] ?? [];
    if (existing.some(r => r.targetId === ref.targetId && r.type === ref.type)) return m;
    return { ...m, [cardId]: [...existing, ref] };
  });
  addLog(cardId, 'card:updated', { action: 'ref:added', targetId: ref.targetId, refType: ref.type });
}

export function removeCardRef(cardId: string, targetId: string): void {
  cardRefs.update(m => {
    const existing = m[cardId];
    if (!existing) return m;
    const next = existing.filter(r => r.targetId !== targetId);
    if (next.length === 0) {
      const copy = { ...m };
      delete copy[cardId];
      return copy;
    }
    return { ...m, [cardId]: next };
  });
  addLog(cardId, 'card:updated', { action: 'ref:removed', targetId });
}

// ── Card Labels Store ────────────────────────────────────────────────────────

export const cardLabels = writable<Record<string, string[]>>(
  kanbanDB.get('cardLabels', {}) as Record<string, string[]>
);
cardLabels.subscribe(v => { kanbanDB.set('cardLabels', v); });

export function setCardLabels(cardId: string, labelIds: string[]): void {
  cardLabels.update(m => ({ ...m, [cardId]: labelIds }));
}

export function toggleCardLabel(cardId: string, labelId: string): void {
  cardLabels.update(m => {
    const existing = m[cardId] ?? [];
    const has = existing.includes(labelId);
    return { ...m, [cardId]: has ? existing.filter(l => l !== labelId) : [...existing, labelId] };
  });
}

// ── Card Due Dates Store ─────────────────────────────────────────────────────

export const cardDueDates = writable<Record<string, string>>(
  kanbanDB.get('cardDueDates', {}) as Record<string, string>
);
cardDueDates.subscribe(v => { kanbanDB.set('cardDueDates', v); });

export function setCardDueDate(cardId: string, dateIso: string | null): void {
  cardDueDates.update(m => {
    if (!dateIso) {
      const copy = { ...m };
      delete copy[cardId];
      return copy;
    }
    return { ...m, [cardId]: dateIso };
  });
}

// ── Card Checklists Store ────────────────────────────────────────────────────

export const cardChecklists = writable<Record<string, ChecklistItem[]>>(
  kanbanDB.get('cardChecklists', {}) as Record<string, ChecklistItem[]>
);
cardChecklists.subscribe(v => { kanbanDB.set('cardChecklists', v); });

export function addChecklistItem(cardId: string, text: string): void {
  const item: ChecklistItem = {
    id: `cl-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    text,
    done: false,
    createdAt: Date.now(),
  };
  cardChecklists.update(m => ({ ...m, [cardId]: [...(m[cardId] ?? []), item] }));
}

export function toggleChecklistItem(cardId: string, itemId: string): void {
  cardChecklists.update(m => {
    const items = m[cardId];
    if (!items) return m;
    return { ...m, [cardId]: items.map(i => i.id === itemId ? { ...i, done: !i.done } : i) };
  });
}

export function removeChecklistItem(cardId: string, itemId: string): void {
  cardChecklists.update(m => {
    const items = m[cardId];
    if (!items) return m;
    return { ...m, [cardId]: items.filter(i => i.id !== itemId) };
  });
}

// ── Card Comments Store ──────────────────────────────────────────────────────

export const cardComments = writable<Record<string, CardComment[]>>(
  kanbanDB.get('cardComments', {}) as Record<string, CardComment[]>
);
cardComments.subscribe(v => { kanbanDB.set('cardComments', v); });

export function addCardComment(cardId: string, text: string, author: string = 'user'): void {
  const comment: CardComment = {
    id: `cmt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    text,
    author,
    createdAt: Date.now(),
  };
  cardComments.update(m => ({ ...m, [cardId]: [...(m[cardId] ?? []), comment] }));
}

export function removeCardComment(cardId: string, commentId: string): void {
  cardComments.update(m => {
    const items = m[cardId];
    if (!items) return m;
    return { ...m, [cardId]: items.filter(c => c.id !== commentId) };
  });
}

// ── Visible Projects (derived) ───────────────────────────────────────────────

export const visibleProjects = derived(kanbanConfig, ($cfg) => {
  return new Set(($cfg.projects ?? []).filter(p => p.visible).map(p => p.id));
});

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
  const prev = get(agentAssignments)[nodeId] ?? null;
  agentAssignments.update(m => ({ ...m, [nodeId]: agent }));
  if (agent) {
    addLog(nodeId, 'agent:assigned', { agent, prev });
  } else {
    addLog(nodeId, 'agent:unassigned', { prev });
  }
}

export function setCardArtifact(nodeId: string, filePath: string): void {
  iterationStates.update(m => ({
    ...m,
    [nodeId]: { ...m[nodeId] ?? { count: 0, score: 0 }, artifactPath: filePath },
  }));
  touchCard(nodeId);
  addLog(nodeId, 'card:artifact', { filePath });
}

export function moveCard(nodeId: string, newStatus: KanbanStatus): void {
  const prev = get(statusOverrides)[nodeId] ?? null;
  statusOverrides.update(m => ({ ...m, [nodeId]: newStatus }));
  touchCard(nodeId);
  addLog(nodeId, 'card:moved', { from: prev, to: newStatus });
}

export function addLocalCard(card: LocalCardData): void {
  localCards.update(m => ({ ...m, [card.id]: card }));
  addLog(card.id, 'card:created', { title: card.title, column: card.column, type: card.type });
}

export function updateLocalCard(cardId: string, updates: Partial<Pick<LocalCardData, 'title' | 'description' | 'section' | 'type' | 'column' | 'uploadPath'>>): void {
  localCards.update(m => {
    if (!m[cardId]) return m;
    return { ...m, [cardId]: { ...m[cardId], ...updates } };
  });
  addLog(cardId, 'card:updated', updates);
}

export function removeLocalCard(cardId: string): void {
  localCards.update(m => {
    const next = { ...m };
    delete next[cardId];
    return next;
  });
}

/** Fully delete a card — remove from all stores */
export function deleteCard(cardId: string): void {
  removeLocalCard(cardId);
  statusOverrides.update(m => { const n = { ...m }; delete n[cardId]; return n; });
  lifecycleStates.update(m => { const n = { ...m }; delete n[cardId]; return n; });
  agentAssignments.update(m => { const n = { ...m }; delete n[cardId]; return n; });
  iterationStates.update(m => { const n = { ...m }; delete n[cardId]; return n; });
  cardPriorities.update(m => { const n = new Map(m); n.delete(cardId); return n; });
  cardUpdatedAt.update(m => { const n = { ...m }; delete n[cardId]; return n; });
  addLog(cardId, 'card:deleted', {});
}

export function updateLifecycle(
  nodeId: string,
  state: CardLifecycleState,
  pauseReason?: PauseReason | null,
): void {
  const prev = get(lifecycleStates)[nodeId]?.state ?? 'idle';
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
  touchCard(nodeId);
  const action = `lifecycle:${state}` as const;
  addLog(nodeId, action, { from: prev, to: state, ...(pauseReason ? { pauseReason } : {}) });
}

export function updateIteration(
  nodeId: string,
  data: Partial<IterationData>,
): void {
  iterationStates.update(m => ({
    ...m,
    [nodeId]: { ...m[nodeId], ...data },
  }));
  addLog(nodeId, 'iteration:updated', { ...data });
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
  addLog(cardId, 'dependency:added', { blockedBy: blockedByCardId });
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
  addLog(cardId, 'dependency:removed', { blockedBy: blockedByCardId });
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
  [graphNodes, agentAssignments, statusOverrides, localCards, lifecycleStates, iterationStates, cardDependencyMap, cardRefs],
  ([$nodes, $agents, $overrides, $locals, $lifecycle, $iterations, $depMap, $refs]) => {
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
      const nodeRefs = $refs[node.id] ?? [];
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
        refs: nodeRefs.length > 0 ? nodeRefs : undefined,
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
        desc: local.description || undefined,
        cat: local.section || 'local',
      };
      const blockedBy = $depMap[local.id] ?? [];
      const blocking = computeBlocking(local.id);
      const localRefs = $refs[local.id] ?? [];
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
        refs: localRefs.length > 0 ? localRefs : undefined,
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

// ── Bulk lifecycle update (for IPC bridge status transitions) ─────────────────

/**
 * Update all cards matching `fromState` to `toState`.
 * Used by ipcBridge when it detects a session status transition
 * (e.g. idle → running means Claude just started, so mark 'started' cards as 'running').
 */
export function updateLifecycleByStatus(
  fromState: CardLifecycleState,
  toState: CardLifecycleState,
): void {
  lifecycleStates.update(m => {
    const next = { ...m };
    let changed = false;
    for (const [id, data] of Object.entries(next)) {
      if (data.state === fromState) {
        next[id] = { ...data, state: toState };
        changed = true;
      }
    }
    return changed ? next : m;
  });
}

// ── Board Merge (event-server/MCP → browser stores) ──────────────────────────

/**
 * Merge remote board state (from .kanban/board.json) into local Svelte stores.
 * Called when WebSocket receives a 'board:updated' message, meaning the MCP
 * server or a Claude hook wrote new data. Uses "remote wins" merge strategy.
 */
export function mergeBoardState(board: {
  cards?: Array<Record<string, unknown>>;
  lifecycle?: Record<string, LifecycleData>;
  agents?: Record<string, AgentType>;
  moves?: Record<string, KanbanStatus>;
  dependencies?: Record<string, string[]>;
  workflows?: Record<string, unknown>;
}): void {
  if (board.lifecycle) {
    lifecycleStates.update(current => ({ ...current, ...board.lifecycle }));
  }
  if (board.agents) {
    agentAssignments.update(current => ({ ...current, ...board.agents }));
  }
  if (board.moves) {
    statusOverrides.update(current => ({ ...current, ...board.moves }));
  }
  if (board.dependencies) {
    cardDependencyMap.update(current => ({ ...current, ...board.dependencies }));
  }

  // Merge server-created cards into local stores
  if (Array.isArray(board.cards)) {
    const currentLocal = get(localCards);
    const currentGraph = get(graphNodes);
    const graphIds = new Set(currentGraph.map(n => n.id));

    for (const c of board.cards) {
      const id = c.id as string;
      if (!id) continue;
      // Skip if already in graph nodes or local cards
      if (graphIds.has(id) || currentLocal[id]) {
        // But still update column/lifecycle if server has newer data
        const serverCol = (c.column_id || c.column || c.status) as KanbanStatus;
        const serverLifecycle = (c.lifecycleState || c.lifecycle) as CardLifecycleState;
        if (serverCol) {
          statusOverrides.update(m => ({ ...m, [id]: serverCol }));
        }
        if (serverLifecycle) {
          lifecycleStates.update(m => ({
            ...m,
            [id]: { ...m[id], state: serverLifecycle, updatedAt: Date.now() },
          }));
        }
        // Update artifact path if server has it
        if (c.artifactPath) {
          iterationStates.update(m => ({
            ...m,
            [id]: { ...m[id], artifactPath: c.artifactPath as string },
          }));
        }
        continue;
      }

      // New card from server — add to localCards
      const col = (c.column_id || c.column || c.status || 'backlog') as string;
      addLocalCard({
        id,
        title: (c.title || c.label || id) as string,
        description: '',
        section: (c.section || c.cat || 'knowledge-graph') as string,
        type: (c.type || 'spec') as 'spec' | 'discussion' | 'task' | 'issue',
        column: col as KanbanStatus,
        createdAt: c.createdAt ? new Date(c.createdAt as string).getTime() : Date.now(),
      });

      // Set lifecycle
      const lifecycle = (c.lifecycleState || c.lifecycle || 'idle') as CardLifecycleState;
      lifecycleStates.update(m => ({
        ...m,
        [id]: { state: lifecycle, updatedAt: Date.now() },
      }));

      // Set agent if present
      if (c.agent_type) {
        agentAssignments.update(m => ({ ...m, [id]: c.agent_type as AgentType }));
      }

      // Set artifact path
      if (c.artifactPath) {
        iterationStates.update(m => ({
          ...m,
          [id]: { ...m[id], artifactPath: c.artifactPath as string },
        }));
      }
    }
  }
}

// ── Board Sync (browser → event-server → .kanban/board.json + SQLite) ────────

const BOARD_SYNC_URL = 'http://localhost:4010/board';
const BOARD_SYNC_DEBOUNCE_MS = 5000;

let _syncDebounceTimer: ReturnType<typeof setTimeout> | null = null;
let _syncUnsubscribe: (() => void) | null = null;

/** Track DB sync state: cardId → { synced, lastSyncAt } */
export const dbSyncState = writable<Record<string, { synced: boolean; lastSyncAt: number }>>({});

/**
 * Serialise ALL kanban cards (graph + local) and POST to the event server.
 * The event server writes board.json AND syncs to SQLite.
 */
export async function syncBoardToServer(): Promise<void> {
  // Get full card data from the derived store
  const allCards = get(kanbanCards);
  const $lifecycle = get(lifecycleStates);
  const $agents = get(agentAssignments);
  const $priorities = get(cardPriorities);

  // Build card array with all fields for DB sync
  const cards = allCards.map(c => ({
    id: c.node.id,
    title: c.node.label,
    label: c.node.label,
    section: c.node.cat || null,
    cat: c.node.cat || null,
    column_id: c.status,
    column: c.status,
    status: c.status,
    lifecycleState: c.lifecycle,
    lifecycle: c.lifecycle,
    priority: (() => { const s = $priorities.get(c.node.id)?.score ?? 0; return s >= 60 ? 'high' : s >= 30 ? 'medium' : 'low'; })(),
    agent: c.agent || null,
    agent_type: c.agent || null,
    filePath: c.filePath || null,
    artifactPath: c.artifactPath || null,
    type: c.type,
    isLocal: c.isLocal || false,
    iterationCount: c.iterationCount,
    iterationScore: c.iterationScore,
    metadata: {
      type: c.type,
      cat: c.node.cat,
      keywords: c.node.keywords || [],
      desc: c.node.desc || null,
    },
  }));

  // Also include legacy localStorage export for backward compat
  const legacyPayload = JSON.parse(exportBoardState());

  const payload = JSON.stringify({
    ...legacyPayload,
    cards,
    syncedAt: Date.now(),
  });

  try {
    const res = await fetch(BOARD_SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    });
    if (res.ok) {
      const result = await res.json();
      // Update sync state for all cards
      const now = Date.now();
      const syncUpdate: Record<string, { synced: boolean; lastSyncAt: number }> = {};
      for (const c of cards) {
        syncUpdate[c.id] = { synced: true, lastSyncAt: now };
      }
      dbSyncState.set(syncUpdate);
    }
  } catch {
    // Event server not running — mark all as not synced
    const syncUpdate: Record<string, { synced: boolean; lastSyncAt: number }> = {};
    for (const c of cards) {
      syncUpdate[c.id] = { synced: false, lastSyncAt: 0 };
    }
    dbSyncState.set(syncUpdate);
  }
}

/**
 * Start watching `kanbanCards` for changes and syncing to the event server
 * with a 5-second debounce. Performs an initial sync immediately.
 */
export function startBoardSync(): void {
  if (_syncUnsubscribe !== null) return; // already running

  // Initial sync on start
  syncBoardToServer();

  _syncUnsubscribe = kanbanCards.subscribe(() => {
    if (_syncDebounceTimer !== null) clearTimeout(_syncDebounceTimer);
    _syncDebounceTimer = setTimeout(() => {
      _syncDebounceTimer = null;
      syncBoardToServer();
    }, BOARD_SYNC_DEBOUNCE_MS);
  });
}

/**
 * Stop the board sync subscription and cancel any pending debounced write.
 */
export function stopBoardSync(): void {
  if (_syncDebounceTimer !== null) {
    clearTimeout(_syncDebounceTimer);
    _syncDebounceTimer = null;
  }
  if (_syncUnsubscribe !== null) {
    _syncUnsubscribe();
    _syncUnsubscribe = null;
  }
}

// ── Re-init stores from DB cache (call after kanbanDB.init()) ───────────────

export function initKanbanStores(): void {
  agentAssignments.set(kanbanDB.get('agents', {}) as Record<string, AgentType>);
  statusOverrides.set(kanbanDB.get('moves', {}) as Record<string, KanbanStatus>);
  cardUpdatedAt.set(kanbanDB.get('cardUpdatedAt', {}) as Record<string, number>);
  localCards.set(kanbanDB.get('cards', {}) as Record<string, LocalCardData>);
  cardDependencyMap.set(kanbanDB.get('dependencies', {}) as Record<string, string[]>);
  lifecycleStates.set(kanbanDB.get('lifecycle', {}) as Record<string, LifecycleData>);
  iterationStates.set(kanbanDB.get('iterations', {}) as Record<string, IterationData>);
}
