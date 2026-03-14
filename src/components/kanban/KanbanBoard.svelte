<script lang="ts">
  import { selectedNodeId } from '../../lib/stores/appState';
  import { syncGraphData } from '../../lib/stores/graphData';
  import {
    KANBAN_COLUMNS, AGENT_DEFS,
    kanbanCards, kanbanColumns,
    cardPriorities, cardUpdatedAt,
    assignAgent, moveCard, deleteCard,
    addLocalCard, updateLifecycle,
    startBoardSync, stopBoardSync,
    dbSyncState,
    cardOrder, setCardOrder, clearCardOrder, resetBoard,
  } from '../../lib/stores/kanbanState';
  import { CATEGORIES } from '../../lib/constants';
  import { buildCommandString, getCommandsForColumn } from '../../lib/workflow/commandRegistry';
  import type { KanbanCard, KanbanStatus, AgentType, PauseReason } from '../../lib/types';
  import StartDialog from './StartDialog.svelte';
  import PauseDialog from './PauseDialog.svelte';
  import ResumeDialog from './ResumeDialog.svelte';
  import FailedDialog from './FailedDialog.svelte';
  import NewCardDialog from './NewCardDialog.svelte';
  import CardPreview from './CardPreview.svelte';
  import CommandPanel from './CommandPanel.svelte';
  import AgentTerminal from './AgentTerminal.svelte';
  import AgentSuggestBadge from './AgentSuggestBadge.svelte';
  import CardPriorityBadge from './CardPriority.svelte';
  import DependencyBadge from './DependencyBadge.svelte';
  import AgentStatusIndicator from './AgentStatusIndicator.svelte';
  import AgentActionButton from './AgentActionButton.svelte';
  import QueuePanel from './QueuePanel.svelte';
  import PipelineProgress from './PipelineProgress.svelte';
  import ConfirmActionDialog from './ConfirmActionDialog.svelte';
  import { navigateTo } from '../../lib/router';
  import SettingsDialog from './SettingsDialog.svelte';
  import ProjectChips from './ProjectChips.svelte';
  import { kanbanConfig, type ProjectDef } from '../../lib/stores/kanbanConfig';
  import { cardLabels, cardDueDates, cardChecklists, visibleProjects } from '../../lib/stores/kanbanState';
  import { globePreview } from '../../lib/stores/appState';
  import { toggleCommandPanel, queueCommand, markCopied, commandPanelOpen } from '../../lib/stores/commandState';
  import { connectEventServer, disconnectEventServer } from '../../lib/stores/agentEventStore';
  import { addLog } from '../../lib/stores/activityLog';
  import { autoClaimEnabled, claimedCardCount, startAutoClaim, stopAutoClaim } from '../../lib/stores/autoClaimEngine';
  import { agentHealthSnapshot } from '../../lib/stores/agentHealth';
  import { agentQueue, maxConcurrent, autoAdvanceEnabled, startQueueProcessor, stopQueueProcessor } from '../../lib/stores/agentQueue';
  import { startDbSync, stopDbSync, syncFromDb } from '../../lib/stores/kanbanDB';
  import { onMount } from 'svelte';
  import VoiceCommandBar from './VoiceCommandBar.svelte';

  // Max cards to render per column (performance guard)
  const MAX_CARDS_PER_COL = 50;

  // Reactive tick — incremented by ALL store subscriptions to force template re-eval
  let _t = $state(0);
  let _rafPending = false;
  function tick() {
    if (_rafPending) return;
    _rafPending = true;
    requestAnimationFrame(() => {
      _t = (_t + 1) % 1_000_000;
      _rafPending = false;
    });
  }

  // Store snapshots — updated by subscriptions, read via getters that depend on _t
  let _columns = new Map<KanbanStatus, KanbanCard[]>();
  let _cards: KanbanCard[] = [];
  let _priorities = new Map<string, import('../../lib/types').CardPriority>();
  let _syncState: Record<string, { synced: boolean; lastSyncAt: number }> = {};
  let _updatedAtMap: Record<string, number> = {};
  let _cardOrder: Record<string, string[]> = {};

  // Getters that depend on _t to force reactivity
  let columns = $derived.by(() => { void _t; return _columns; });
  let cards = $derived.by(() => { void _t; return _cards; });
  let priorities = $derived.by(() => { void _t; return _priorities; });
  let syncState = $derived.by(() => { void _t; return _syncState; });
  let updatedAtMap = $derived.by(() => { void _t; return _updatedAtMap; });
  let colOrder = $derived.by(() => { void _t; return _cardOrder; });

  let dragNodeId = $state<string | null>(null);
  let dragOverCol = $state<KanbanStatus | null>(null);
  let dragOverCardId = $state<string | null>(null);
  let dragOverCardPos = $state<'above' | 'below'>('below');

  // Column reorder
  let columnOrder = $state<KanbanStatus[]>([]);
  let dragColId = $state<KanbanStatus | null>(null);
  let displayColumns = $derived.by(() => {
    if (columnOrder.length === 0) return KANBAN_COLUMNS;
    const map = new Map(KANBAN_COLUMNS.map(c => [c.id, c]));
    return columnOrder.map(id => map.get(id)).filter(Boolean) as typeof KANBAN_COLUMNS;
  });
  let agentMenuNodeId = $state<string | null>(null);
  let filterType = $state('');
  let filterCat = $state('');
  let searchText = $state('');
  let sortByPriority = $state(false);

  // Dialog states
  let showNewCard = $state(false);
  let previewCard = $state<KanbanCard | null>(null);
  let startDialogCard = $state<{ card: KanbanCard; from: string; to: string } | null>(null);
  let pauseDialogCard = $state<KanbanCard | null>(null);
  let resumeDialogCard = $state<KanbanCard | null>(null);
  let failedDialogCard = $state<KanbanCard | null>(null);

  // Pending drag target (used when StartDialog is needed before drop)
  let pendingDrop = $state<{ nodeId: string; targetCol: KanbanStatus } | null>(null);

  // Terminal panel open state
  let terminalOpen = $state(false);
  let activeTerminalCard = $state<string | null>(null);

  // Project focus mode
  let focusProjectId = $state<string | null>(null);
  let showShortcutHelp = $state(false);
  let isGlobePreview = $state(false);

  $effect(() => { const u = globePreview.subscribe(v => { isGlobePreview = v; }); return u; });

  // Card enrichment stores
  let labelsMap = $state<Record<string, string[]>>({});
  let dueDatesMap = $state<Record<string, string>>({});
  let checklistsMap = $state<Record<string, import('../../lib/types').ChecklistItem[]>>({});
  let configProjects = $state<ProjectDef[]>([]);
  let configLabels = $state<import('../../lib/stores/kanbanConfig').LabelDef[]>([]);
  let wipLimits = $state<Record<string, number>>({});

  $effect(() => { const u = cardLabels.subscribe(v => { labelsMap = v; }); return u; });
  $effect(() => { const u = cardDueDates.subscribe(v => { dueDatesMap = v; }); return u; });
  $effect(() => { const u = cardChecklists.subscribe(v => { checklistsMap = v; }); return u; });
  $effect(() => {
    const u = kanbanConfig.subscribe(v => {
      configProjects = v.projects ?? [];
      configLabels = v.labels ?? [];
      wipLimits = v.wipLimits ?? {};
    });
    return u;
  });

  // Queue panel open state
  let queuePanelOpen = $state(false);

  // Command panel state
  let cmdPanelOpen = $state(false);

  // Settings dialog
  let settingsOpen = $state(false);

  // Sync docs
  let syncing = $state(false);
  let syncResult = $state('');

  async function handleSyncDocs() {
    if (syncing) return;
    syncing = true;
    syncResult = '';
    try {
      // 1. Trigger server-side rebuild of graph-data.json
      const resp = await fetch('http://localhost:4010/sync/graph', { method: 'POST' });
      if (!resp.ok) throw new Error(`Server rebuild failed: ${resp.status}`);
      // 2. Re-fetch the rebuilt data into stores
      const stats = await syncGraphData();
      syncResult = `${stats.nodes} nodes`;
      setTimeout(() => { syncResult = ''; }, 3000);
    } catch (err: unknown) {
      syncResult = 'ERR';
      console.error('[sync]', err);
      // Fallback: just re-fetch existing file
      try {
        const stats = await syncGraphData();
        syncResult = `${stats.nodes} nodes`;
      } catch { /* ignore */ }
      setTimeout(() => { syncResult = ''; }, 3000);
    } finally {
      syncing = false;
    }
  }

  // ── Card selection (per-column multi-select) ──────────────────────────────
  let selectedCards = $state<Set<string>>(new Set());
  let moveTargetCol = $state<KanbanStatus | ''>('');

  function toggleCardSelect(e: MouseEvent, cardId: string) {
    e.stopPropagation();
    const next = new Set(selectedCards);
    if (next.has(cardId)) {
      next.delete(cardId);
    } else {
      next.add(cardId);
    }
    selectedCards = next;
  }

  function toggleSelectAllInColumn(colId: KanbanStatus) {
    const colCards = filteredCards(colId);
    const allSelected = colCards.every(c => selectedCards.has(c.node.id));
    const next = new Set(selectedCards);
    for (const c of colCards) {
      if (allSelected) {
        next.delete(c.node.id);
      } else {
        next.add(c.node.id);
      }
    }
    selectedCards = next;
  }

  function selectedCountInColumn(colId: KanbanStatus): number {
    const colCards = filteredCards(colId);
    return colCards.filter(c => selectedCards.has(c.node.id)).length;
  }

  function isAllSelectedInColumn(colId: KanbanStatus): boolean {
    const colCards = filteredCards(colId);
    return colCards.length > 0 && colCards.every(c => selectedCards.has(c.node.id));
  }

  function moveSelectedTo(targetCol: KanbanStatus) {
    for (const cardId of selectedCards) {
      moveCard(cardId, targetCol);
      if (targetCol === 'done' || targetCol === 'archive') {
        updateLifecycle(cardId, 'completed');
      }
    }
    selectedCards = new Set();
    moveTargetCol = '';
    // Scroll the target column into view so the user can see the moved cards
    requestAnimationFrame(() => {
      const colEl = document.querySelector(`.kanban-column[data-col="${targetCol}"]`);
      colEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    });
  }

  function deleteSelected() {
    // Soft delete — move to DELETE column as backup
    for (const cardId of selectedCards) {
      moveCard(cardId, 'delete');
    }
    selectedCards = new Set();
    requestAnimationFrame(() => {
      const colEl = document.querySelector('.kanban-column[data-col="delete"]');
      colEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    });
  }

  function rescueToCreate(colId: KanbanStatus) {
    const colCards = filteredCards(colId);
    for (const card of colCards) {
      moveCard(card.node.id, 'create');
      updateLifecycle(card.node.id, 'idle');
    }
    selectedCards = new Set([...selectedCards].filter(id => !colCards.some(c => c.node.id === id)));
    requestAnimationFrame(() => {
      const colEl = document.querySelector('.kanban-column[data-col="create"]');
      colEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    });
  }

  function truncateSelected() {
    for (const cardId of selectedCards) {
      deleteCard(cardId);
    }
    selectedCards = new Set();
  }

  function truncateColumn(colId: KanbanStatus) {
    const colCards = filteredCards(colId);
    for (const card of colCards) {
      deleteCard(card.node.id);
    }
    // Clear any selections for cards in this column
    selectedCards = new Set([...selectedCards].filter(id => !colCards.some(c => c.node.id === id)));
  }

  function clearSelection() {
    selectedCards = new Set();
  }

  let totalSelected = $derived(selectedCards.size);

  // Auto-claim reactive state
  let _isAutoClaimEnabled = true;
  let _claimedCount = 0;
  let isAutoClaimEnabled = $derived.by(() => { void _t; return _isAutoClaimEnabled; });
  let claimedCount = $derived.by(() => { void _t; return _claimedCount; });

  // Health & queue reactive state
  let _health: import('../../lib/types').AgentHealthSnapshot = {
    runningCount: 0, queueDepth: 0, maxConcurrent: 2,
    totalLaunched: 0, totalCompleted: 0, totalFailed: 0,
    avgDurationMs: 0, isAtCapacity: false,
  };
  let _queueItems: import('../../lib/types').AgentQueueItem[] = [];
  let _isAutoAdvance = false;
  let _currentMaxConcurrent = 2;

  let health = $derived.by(() => { void _t; return _health; });
  let queueItems = $derived.by(() => { void _t; return _queueItems; });
  let isAutoAdvance = $derived.by(() => { void _t; return _isAutoAdvance; });
  let currentMaxConcurrent = $derived.by(() => { void _t; return _currentMaxConcurrent; });

  // Store subscriptions via onMount (NOT $effect — avoids infinite loop)
  onMount(() => {
    const unsubs = [
      kanbanColumns.subscribe(v => { _columns = v; tick(); }),
      kanbanCards.subscribe(v => { _cards = v; tick(); }),
      cardPriorities.subscribe(v => { _priorities = v; tick(); }),
      dbSyncState.subscribe(v => { _syncState = v; tick(); }),
      cardUpdatedAt.subscribe(v => { _updatedAtMap = v; tick(); }),
      cardOrder.subscribe(v => { _cardOrder = v; tick(); }),
      commandPanelOpen.subscribe(v => { cmdPanelOpen = v; }),
      autoClaimEnabled.subscribe(v => { _isAutoClaimEnabled = v; tick(); }),
      claimedCardCount.subscribe(v => { _claimedCount = v; tick(); }),
      agentHealthSnapshot.subscribe(v => { _health = v; tick(); }),
      agentQueue.subscribe(v => { _queueItems = v; tick(); }),
      autoAdvanceEnabled.subscribe(v => { _isAutoAdvance = v; tick(); }),
      maxConcurrent.subscribe(v => { _currentMaxConcurrent = v; tick(); }),
    ];
    return () => unsubs.forEach(u => u());
  });

  function toggleAutoAdvance() {
    autoAdvanceEnabled.update(v => !v);
  }

  function setMaxConcurrent(val: number) {
    maxConcurrent.set(Math.max(1, Math.min(5, val)));
  }

  // Check if a card is in the queue
  function queuePosition(cardId: string): number {
    const idx = queueItems.findIndex(q => q.cardId === cardId);
    return idx >= 0 ? idx + 1 : -1;
  }

  function toggleAutoClaim() {
    autoClaimEnabled.update(v => !v);
  }

  // Project focus mode
  function handleProjectFocus(projectId: string | null) {
    focusProjectId = focusProjectId === projectId ? null : projectId;
  }

  // Keyboard shortcuts
  function handleKeydown(e: KeyboardEvent) {
    // Don't capture when typing in inputs
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    switch (e.key) {
      case 'n': showNewCard = true; e.preventDefault(); break;
      case '/': {
        const input = document.querySelector('.kanban-search') as HTMLInputElement;
        if (input) { input.focus(); e.preventDefault(); }
        break;
      }
      case '?': showShortcutHelp = !showShortcutHelp; e.preventDefault(); break;
      case 'Escape':
        if (showShortcutHelp) { showShortcutHelp = false; }
        else if (previewCard) { previewCard = null; }
        else if (focusProjectId) { focusProjectId = null; }
        e.preventDefault();
        break;
    }
  }

  // Connect to agent event WebSocket + board sync + auto-claim + queue processor + DB sync on mount
  // Lifecycle: connect services on mount, disconnect on destroy
  onMount(() => {
    syncFromDb().then(r => {
      if (r.restored && r.restored > 0) console.log(`[DB] Restored ${r.restored} tables from SQLite`);
    }).catch(() => {});

    connectEventServer();
    startBoardSync();
    startAutoClaim();
    startQueueProcessor();
    startDbSync(30000);
    return () => {
      disconnectEventServer();
      stopBoardSync();
      stopAutoClaim();
      stopQueueProcessor();
      stopDbSync();
    };
  });

  // Unique categories and types from cards
  let allCats = $derived([...new Set(cards.map(c => c.node.cat))].sort());
  let allTypes = $derived([...new Set(cards.map(c => c.type))].sort());

  // Card type icons
  const TYPE_ICONS: Record<string, string> = {
    spec: '\u{1F4CB}',        // clipboard
    discussion: '\u{1F4AC}',  // speech bubble
    task: '\u{1F527}',        // wrench
    issue: '\u{1F41B}',       // bug
  };

  // Priority derived from card type
  const PRIORITY_MAP: Record<string, { label: string; cls: string }> = {
    issue:      { label: 'HIGH', cls: 'pri-high' },
    spec:       { label: 'MED',  cls: 'pri-med' },
    task:       { label: 'MED',  cls: 'pri-med' },
    discussion: { label: 'LOW',  cls: 'pri-low' },
  };

  // Derive tags from node keywords + category
  function cardTags(card: KanbanCard): string[] {
    const tags: string[] = [];
    if (card.node.cat) tags.push(`#${card.node.cat}`);
    if (card.node.keywords) {
      for (const kw of card.node.keywords.slice(0, 2)) {
        tags.push(`#${kw}`);
      }
    }
    return tags;
  }

  // Derive progress from status position in pipeline
  function cardProgress(card: KanbanCard): { done: number; total: number; pct: number } {
    const colIdx = KANBAN_COLUMNS.findIndex(c => c.id === card.status);
    const total = KANBAN_COLUMNS.length;
    const done = colIdx + 1;
    const pct = Math.round((done / total) * 100);
    return { done, total, pct };
  }

  // Due date helpers
  function dueDateUrgency(dateStr: string | undefined): { label: string; cls: string } | null {
    if (!dateStr) return null;
    const diff = (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    if (diff < 0) return { label: 'Overdue', cls: 'due-overdue' };
    if (diff < 1) return { label: 'Today', cls: 'due-today' };
    if (diff < 3) return { label: `${Math.ceil(diff)}d`, cls: 'due-soon' };
    return { label: `${Math.ceil(diff)}d`, cls: 'due-ok' };
  }

  // Checklist progress
  function checklistProgress(cardId: string): { done: number; total: number } | null {
    const items = checklistsMap[cardId];
    if (!items || items.length === 0) return null;
    return { done: items.filter(i => i.done).length, total: items.length };
  }

  // WIP check
  function isOverWip(status: KanbanStatus): boolean {
    const limit = wipLimits[status] ?? 0;
    if (limit === 0) return false;
    return (columns.get(status)?.length ?? 0) > limit;
  }

  function wipDisplay(status: KanbanStatus): string | null {
    const limit = wipLimits[status] ?? 0;
    if (limit === 0) return null;
    const count = columns.get(status)?.length ?? 0;
    return `${count}/${limit}`;
  }

  function filteredCards(status: KanbanStatus): KanbanCard[] {
    const col = columns.get(status) || [];
    const filtered = col.filter(c => {
      if (filterType && c.type !== filterType) return false;
      if (filterCat && c.node.cat !== filterCat) return false;
      // Project focus mode — skip for local cards
      if (focusProjectId && c.node.cat !== 'local' && c.node.cat !== focusProjectId) return false;
      // Project visibility — skip for local cards (cat='local' or no cat)
      const visProjects = configProjects.filter(p => p.visible).map(p => p.id);
      if (visProjects.length > 0 && c.node.cat && c.node.cat !== 'local' && !visProjects.includes(c.node.cat)) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        if (!c.node.label.toLowerCase().includes(q) &&
            !(c.node.desc || '').toLowerCase().includes(q) &&
            !c.filePath.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    // Apply manual order if exists, then priority or updatedAt
    const order = colOrder[status];
    if (order && order.length > 0 && !sortByPriority) {
      const orderMap = new Map(order.map((id, i) => [id, i]));
      filtered.sort((a, b) => {
        const oA = orderMap.get(a.node.id) ?? 999999;
        const oB = orderMap.get(b.node.id) ?? 999999;
        if (oA !== oB) return oA - oB;
        // Fallback: updatedAt for cards not in manual order
        return (updatedAtMap[b.node.id] ?? 0) - (updatedAtMap[a.node.id] ?? 0);
      });
    } else if (sortByPriority) {
      filtered.sort((a, b) => {
        const scoreA = priorities.get(a.node.id)?.score ?? 0;
        const scoreB = priorities.get(b.node.id)?.score ?? 0;
        return scoreB - scoreA;
      });
    } else {
      // Default: sort by updatedAt descending (recently updated first)
      filtered.sort((a, b) => {
        const tA = updatedAtMap[a.node.id] ?? 0;
        const tB = updatedAtMap[b.node.id] ?? 0;
        return tB - tA;
      });
    }
    return filtered.slice(0, MAX_CARDS_PER_COL);
  }

  /** Total unfiltered count for a column (for showing "X more" label) */
  function totalColCount(status: KanbanStatus): number {
    return (columns.get(status) || []).length;
  }

  // Total cards with status
  let totalCards = $derived(cards.length);

  // ── Drag & Drop ──────────────────────────────────────────────────────────
  function handleDragStart(e: DragEvent, nodeId: string) {
    dragNodeId = nodeId;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', nodeId);
    }
  }

  function handleDragOver(e: DragEvent, colId: KanbanStatus) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    dragOverCol = colId;
  }

  function handleDragLeave() {
    dragOverCol = null;
  }

  function handleDrop(e: DragEvent, colId: KanbanStatus) {
    e.preventDefault();
    dragOverCol = null;
    if (dragNodeId) {
      // Find the card being dragged
      const card = cards.find(c => c.node.id === dragNodeId);
      if (card) {
        // Block move when card is actively running
        if (card.lifecycle === 'running' && !e.shiftKey) {
          dragNodeId = null;
          return; // Cannot move a card that is currently running
        }

        // Block move when card is blocked by a dependency
        if (card.lifecycle === 'blocked' && !e.shiftKey) {
          dragNodeId = null;
          return; // Cannot move a card that is blocked
        }

        if ((card.lifecycle === 'idle' || card.lifecycle === 'claimed') && !e.shiftKey) {
          // Card hasn't been started yet — prompt via StartDialog before moving
          // (Hold Shift to bypass)
          const fromCol = KANBAN_COLUMNS.find(c => c.id === card.status)?.label || card.status;
          const toCol = KANBAN_COLUMNS.find(c => c.id === colId)?.label || colId;
          pendingDrop = { nodeId: dragNodeId, targetCol: colId };
          startDialogCard = { card, from: fromCol, to: toCol };
        } else {
          // started / paused / completed / failed — allow move freely
          moveCard(dragNodeId, colId);
        }
      }
      dragNodeId = null;
    }
  }

  function handleDragEnd() {
    dragNodeId = null;
    dragOverCol = null;
    dragOverCardId = null;
  }

  function handleCardDragOver(e: DragEvent, cardId: string) {
    e.preventDefault();
    e.stopPropagation();
    if (!dragNodeId || dragNodeId === cardId) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    dragOverCardId = cardId;
    dragOverCardPos = e.clientY < midY ? 'above' : 'below';
  }

  function handleCardDrop(e: DragEvent, targetCardId: string, colId: KanbanStatus) {
    e.preventDefault();
    e.stopPropagation();
    if (!dragNodeId || dragNodeId === targetCardId) return;

    const dragCard = cards.find(c => c.node.id === dragNodeId);
    if (!dragCard) return;

    // If dragging from a different column, move to this column first
    if (dragCard.status !== colId) {
      if (dragCard.lifecycle === 'running' && !e.shiftKey) { dragNodeId = null; return; }
      moveCard(dragNodeId, colId);
    }

    // Build new order for this column
    const colCards = filteredCards(colId);
    const ids = colCards.map(c => c.node.id).filter(id => id !== dragNodeId);
    const targetIdx = ids.indexOf(targetCardId);
    const insertIdx = dragOverCardPos === 'above' ? targetIdx : targetIdx + 1;
    ids.splice(insertIdx, 0, dragNodeId);
    setCardOrder(colId, ids);

    dragNodeId = null;
    dragOverCol = null;
    dragOverCardId = null;
  }

  // ── Column drag-to-reorder (live-swap on hover) ────────────────────────
  let _colSwapThrottle = 0;

  function handleColDragStart(e: DragEvent, colId: KanbanStatus) {
    dragColId = colId;
    // Snapshot current order if not already custom
    if (columnOrder.length === 0) {
      columnOrder = KANBAN_COLUMNS.map(c => c.id);
    }
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/column', colId);
    }
  }

  function handleColDragOver(e: DragEvent, colId: KanbanStatus) {
    if (!dragColId || dragColId === colId || dragNodeId) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';

    // Throttle swaps to max 1 per 80ms for smooth feel
    const now = performance.now();
    if (now - _colSwapThrottle < 80) return;
    _colSwapThrottle = now;

    // Live-swap: move column instantly
    const cols = [...columnOrder];
    const fromIdx = cols.indexOf(dragColId);
    const toIdx = cols.indexOf(colId);
    if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return;
    cols.splice(fromIdx, 1);
    cols.splice(toIdx, 0, dragColId);
    columnOrder = cols;
  }

  function handleColDrop(e: DragEvent) {
    if (!dragColId) return;
    if (dragNodeId) return;
    e.preventDefault();
    e.stopPropagation();
    // Order already applied via live-swap — just clean up
    dragColId = null;
  }

  function handleColDragEnd() {
    dragColId = null;
  }

  function resetColumnOrder() {
    columnOrder = [];
  }

  // ── Agent launch helper ─────────────────────────────────────────────────
  const EVENT_SERVER = 'http://localhost:4010';

  async function launchAgent(command: string, args: string, cardId: string | null) {
    try {
      // Use PTY mode for interactive Claude sessions
      const res = await fetch(`${EVENT_SERVER}/agent/pty`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, command, args }),
      });
      const data = await res.json();
      if (res.ok && data.sessionId) {
        if (cardId) {
          addLog(cardId, 'agent:launched', { command, args, sessionId: data.sessionId, pid: data.pid, isPty: true });
          updateLifecycle(cardId, 'running');
        }
        // Auto-open terminal panel so user sees output immediately
        terminalOpen = true;
        return data;
      } else {
        if (cardId) addLog(cardId, 'agent:launch-failed', { error: data.error || 'Unknown' });
        return null;
      }
    } catch (err: any) {
      if (cardId) addLog(cardId, 'agent:launch-failed', { error: err.message });
      return null;
    }
  }

  // ── Dialog handlers ───────────────────────────────────────────────────────
  function handleStartConfirm(copyCommand: boolean, launchClaude: boolean = false) {
    if (startDialogCard) {
      const nodeId = startDialogCard.card.node.id;
      updateLifecycle(nodeId, 'started');
      // Move card if triggered from drag-and-drop
      if (pendingDrop) {
        moveCard(pendingDrop.nodeId, pendingDrop.targetCol);
      }

      const agentCmd = startDialogCard.card.agent ? AGENT_DEFS[startDialogCard.card.agent]?.command || '/chore' : '/chore';
      const cmd = buildCommandString(startDialogCard.card, agentCmd);

      if (launchClaude) {
        // Actually launch Claude agent via event server
        const args = startDialogCard.card.artifactPath || startDialogCard.card.filePath
          ? `'${startDialogCard.card.artifactPath || startDialogCard.card.filePath}'`
          : `"${startDialogCard.card.node.label}"`;
        launchAgent(agentCmd, args, nodeId);
        addLog(nodeId, 'command:launched', { command: agentCmd });
      } else if (copyCommand) {
        navigator.clipboard.writeText(cmd);
        addLog(nodeId, 'command:copied', { command: agentCmd });
      }
    }
    startDialogCard = null;
    pendingDrop = null;
  }

  function handleStartCancel() {
    startDialogCard = null;
    pendingDrop = null;
  }

  function handlePause(reason: PauseReason, note: string) {
    if (pauseDialogCard) {
      const cardId = pauseDialogCard.node.id;
      updateLifecycle(cardId, 'paused', reason);
      // Send SIGSTOP to the actual agent process
      fetch(`${EVENT_SERVER}/agent/pause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, reason }),
      }).catch(() => { /* best-effort */ });
    }
    pauseDialogCard = null;
  }

  function handleResume(copyCommand: boolean, launchClaude: boolean = false) {
    if (resumeDialogCard) {
      const card = resumeDialogCard;
      const cardId = card.node.id;
      updateLifecycle(cardId, 'running');

      // Send SIGCONT to resume the paused agent process
      fetch(`${EVENT_SERVER}/agent/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId }),
      }).catch(() => { /* best-effort */ });

      // Determine command: use lastCommand, or derive from card's current column
      const command = card.lastCommand || getCommandsForColumn(card.status)[0] || null;

      if (launchClaude && command) {
        const args = card.artifactPath ? `'${card.artifactPath}'` : `"${card.node.label}"`;
        launchAgent(command, args, cardId);
      } else if (copyCommand && command) {
        const cmdStr = buildCommandString(card, command);
        if (cmdStr) navigator.clipboard.writeText(cmdStr);
        addLog(cardId, 'command:copied', { command: cmdStr });
      }
    }
    resumeDialogCard = null;
  }

  function handleResumeSkip() {
    if (resumeDialogCard) {
      updateLifecycle(resumeDialogCard.node.id, 'completed');
    }
    resumeDialogCard = null;
  }

  function handleRestart(launch: boolean) {
    if (failedDialogCard) {
      const card = failedDialogCard;
      const cardId = card.node.id;

      if (launch) {
        // Reset lifecycle and launch agent
        updateLifecycle(cardId, 'running');
        const command = card.lastCommand || getCommandsForColumn(card.status)[0] || null;
        if (command) {
          const args = card.artifactPath ? `'${card.artifactPath}'` : `"${card.node.label}"`;
          launchAgent(command, args, cardId);
        }
      } else {
        // Reset lifecycle to idle — user can start manually later
        updateLifecycle(cardId, 'idle');
      }
    }
    failedDialogCard = null;
  }

  function handleRerun(command: string, filePath: string) {
    const args = filePath ? `'${filePath}'` : '';
    const cmdStr = filePath ? `${command} ${args}` : command;
    navigator.clipboard.writeText(cmdStr);
    const cardId = previewCard?.node.id ?? null;
    const entry = queueCommand(command, args, cardId);
    markCopied(entry.id);
    if (cardId) {
      addLog(cardId, 'command:rerun', { command, filePath });
      // Actually launch Claude agent
      launchAgent(command, args, cardId);
    }
    previewCard = null;
  }

  function handleLifecycleClick(e: MouseEvent, card: KanbanCard) {
    e.stopPropagation();
    if (card.lifecycle === 'idle' || card.lifecycle === 'claimed') {
      const col = KANBAN_COLUMNS.find(c => c.id === card.status);
      startDialogCard = { card, from: col?.label || card.status, to: col?.label || card.status };
    } else if (card.lifecycle === 'started' || card.lifecycle === 'running') {
      pauseDialogCard = card;
    } else if (card.lifecycle === 'paused') {
      resumeDialogCard = card;
    } else if (card.lifecycle === 'failed') {
      failedDialogCard = card;
    }
  }

  // ── Agent assignment ─────────────────────────────────────────────────────
  let agentMenuPos = $state<{ top: number; left: number; dropUp: boolean }>({ top: 0, left: 0, dropUp: false });

  function toggleAgentMenu(e: MouseEvent, nodeId: string) {
    e.stopPropagation();
    if (agentMenuNodeId === nodeId) {
      agentMenuNodeId = null;
      return;
    }
    // Calculate position relative to viewport
    const target = (e.currentTarget as HTMLElement).closest('.kanban-card') as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      const menuHeight = 340; // approximate dropdown height
      const menuWidth = 180; // approximate dropdown width
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropUp = spaceBelow < menuHeight && rect.top > menuHeight;
      // Clamp left so dropdown doesn't overflow viewport right edge
      const maxLeft = window.innerWidth - menuWidth - 8;
      agentMenuPos = {
        top: dropUp ? rect.top - 4 : rect.bottom + 4,
        left: Math.min(rect.left, maxLeft),
        dropUp,
      };
    }
    agentMenuNodeId = nodeId;
  }

  function handleAssign(nodeId: string, agent: AgentType) {
    assignAgent(nodeId, agent);
    agentMenuNodeId = null;
  }

  function handleCardClick(card: KanbanCard) {
    previewCard = card;
    agentMenuNodeId = null;
  }

  function closeAgentMenu() {
    agentMenuNodeId = null;
  }

  function catColor(cat: string): string {
    return CATEGORIES[cat]?.color || '#888';
  }

  // ── Reset board ─────────────────────────────────────────────────────────
  let showResetConfirm = $state(false);

  function confirmReset() {
    resetBoard();
    clearCardOrder();
    showResetConfirm = false;
  }

  // ── Create column file drop ──────────────────────────────────────────────
  const SUPPORTED_EXT = ['.md', '.txt', '.json'];
  let createDropOver = $state(false);
  let createDropError = $state('');

  function parseMarkdownTitle(text: string): { title: string; description: string; type: import('../../lib/types').CardType } {
    const lines = text.split('\n');
    let title = '';
    let description = '';
    let type: import('../../lib/types').CardType = 'spec';

    // Extract title from first heading or first non-empty line
    for (const line of lines) {
      const h1 = line.match(/^#\s+(.+)/);
      if (h1) { title = h1[1].trim(); continue; }
      if (!title) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('---')) { title = trimmed; continue; }
      }
      // Collect description from subsequent non-empty lines (up to 3)
      if (title && line.trim() && !line.startsWith('#') && !line.startsWith('---')) {
        if (description.split('\n').length < 4) {
          description += (description ? '\n' : '') + line.trim();
        }
      }
    }

    // Detect type from filename or content
    const lower = text.toLowerCase();
    if (lower.includes('bug') || lower.includes('issue') || lower.includes('fix')) type = 'issue';
    else if (lower.includes('task')) type = 'task';
    else if (lower.includes('discuss')) type = 'discussion';

    return { title: title || 'Untitled', description, type };
  }

  async function handleCreateDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    createDropOver = false;
    createDropError = '';

    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length === 0) return;

    // Validate extensions
    const rejected = files.filter(f => !SUPPORTED_EXT.some(ext => f.name.toLowerCase().endsWith(ext)));
    if (rejected.length > 0) {
      const badExts = [...new Set(rejected.map(f => {
        const dot = f.name.lastIndexOf('.');
        return dot >= 0 ? f.name.slice(dot) : 'no extension';
      }))].join(', ');
      createDropError = `Not supported: ${badExts} — only ${SUPPORTED_EXT.join(', ')} files`;
      setTimeout(() => { createDropError = ''; }, 4000);
      return;
    }

    processDroppedFiles(files);
  }

  function handleCreateDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    createDropOver = true;
  }

  function handleCreateDragLeave(e: DragEvent) {
    const rel = e.relatedTarget as Node | null;
    const zone = e.currentTarget as HTMLElement;
    if (!zone.contains(rel)) createDropOver = false;
  }

  function handleBrowseFiles(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    // Reuse the same drop logic via a synthetic DragEvent-like flow
    const files = Array.from(input.files);
    const rejected = files.filter(f => !SUPPORTED_EXT.some(ext => f.name.toLowerCase().endsWith(ext)));
    if (rejected.length > 0) {
      const badExts = [...new Set(rejected.map(f => {
        const dot = f.name.lastIndexOf('.');
        return dot >= 0 ? f.name.slice(dot) : 'no extension';
      }))].join(', ');
      createDropError = `Not supported: ${badExts} — only ${SUPPORTED_EXT.join(', ')} files`;
      setTimeout(() => { createDropError = ''; }, 4000);
      input.value = '';
      return;
    }
    processDroppedFiles(files);
    input.value = '';
  }

  async function processDroppedFiles(files: File[]) {
    for (const file of files) {
      const text = await file.text();
      const isJson = file.name.toLowerCase().endsWith('.json');

      if (isJson) {
        try {
          const data = JSON.parse(text);
          const items = Array.isArray(data) ? data : [data];
          for (const item of items) {
            const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            addLocalCard({
              id,
              title: String(item.title || item.name || item.label || file.name.replace(/\.json$/, '')),
              description: String(item.description || item.desc || item.summary || '').trim() || ('```json\n' + JSON.stringify(item, null, 2) + '\n```'),
              section: item.section || item.project || undefined,
              column: 'create',
              type: (['spec','task','issue','discussion'].includes(item.type) ? item.type : 'spec') as import('../../lib/types').CardType,
              createdAt: Date.now(),
            });
          }
        } catch {
          createDropError = `Invalid JSON: ${file.name}`;
          setTimeout(() => { createDropError = ''; }, 4000);
        }
      } else {
        const { title, description, type } = parseMarkdownTitle(text);
        const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        addLocalCard({
          id,
          title: title || file.name.replace(/\.(md|txt)$/, ''),
          description: description || undefined,
          column: 'create',
          type,
          createdAt: Date.now(),
        });
      }
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="kanban-overlay" class:globe-preview-active={isGlobePreview} class:cmd-panel-open={cmdPanelOpen} onclick={closeAgentMenu} onkeydown={handleKeydown}>
  <!-- Header bar — two rows -->
  <div class="kanban-header">
    <!-- Row 1: Title + Health + Actions -->
    <div class="header-row-1">
      <div class="kanban-title-area">
        <div class="kanban-title">SDLC Board</div>
        <div class="kanban-subtitle">{totalCards} items</div>
      </div>
      <!-- Agent Health Bar -->
      <div class="health-bar">
        <span class="health-stat" class:at-capacity={health.isAtCapacity} title="Running / max concurrent">
          &#x1F504; {health.runningCount}/{health.maxConcurrent}
        </span>
        {#if health.queueDepth > 0}
          <span class="health-stat queue-stat" title="{health.queueDepth} queued">
            &#x23F3; {health.queueDepth}
          </span>
        {/if}
        <span class="health-stat completed-stat" title="{health.totalCompleted} completed">
          &#x2705; {health.totalCompleted}
        </span>
        {#if health.totalFailed > 0}
          <span class="health-stat failed-stat" title="{health.totalFailed} failed">
            &#x274C; {health.totalFailed}
          </span>
        {/if}
        <select
          class="concurrency-select"
          value={currentMaxConcurrent}
          onchange={(e) => setMaxConcurrent(parseInt((e.target as HTMLSelectElement).value))}
          title="Max concurrent agents"
        >
          {#each [1, 2, 3, 4, 5] as n}
            <option value={n}>{n}x</option>
          {/each}
        </select>
      </div>
      <div class="header-actions">
        <button
          class="pipeline-toggle"
          class:pipeline-active={isAutoAdvance}
          onclick={toggleAutoAdvance}
          title={isAutoAdvance ? 'Auto-advance ON' : 'Auto-advance OFF'}
        >
          Pipeline {isAutoAdvance ? 'ON' : 'OFF'}
        </button>
        <button
          class="autoclaim-toggle"
          class:autoclaim-active={isAutoClaimEnabled}
          onclick={toggleAutoClaim}
          title={isAutoClaimEnabled ? 'Auto-claim ON' : 'Auto-claim OFF'}
        >
          Claim {isAutoClaimEnabled ? 'ON' : 'OFF'}{#if claimedCount > 0}<span class="autoclaim-count">{claimedCount}</span>{/if}
        </button>
        <button
          class="queue-panel-toggle"
          onclick={() => queuePanelOpen = !queuePanelOpen}
          title="Agent queue"
        >
          Queue{#if health.queueDepth > 0}<span class="queue-toggle-count">{health.queueDepth}</span>{/if}
        </button>
        <button class="cmd-toggle" onclick={toggleCommandPanel}>CMD</button>
        <button
          class="sync-toggle"
          class:sync-active={syncing}
          onclick={handleSyncDocs}
          title="Sync documents"
        >
          {#if syncing}&#x21BB;{:else}Sync{/if}
          {#if syncResult}<span class="sync-result">{syncResult}</span>{/if}
        </button>
        <button class="analytics-toggle" onclick={() => navigateTo('analytics')} title="Board analytics dashboard">Analytics</button>
        <button class="reset-toggle" onclick={() => showResetConfirm = true} title="Reset board — clear all manual overrides">Reset</button>
        <button class="settings-toggle" onclick={() => settingsOpen = true} title="Settings">&#x2699;</button>
        <button class="shortcut-help-btn" onclick={() => showShortcutHelp = !showShortcutHelp} title="Keyboard shortcuts">?</button>
      </div>
    </div>
    <!-- Row 2: Search + Filters -->
    <div class="header-row-2">
      <input
        class="kanban-search"
        type="text"
        placeholder="Search cards..."
        bind:value={searchText}
      />
      <select class="kanban-select" bind:value={filterCat}>
        <option value="">All Repos</option>
        {#each allCats as cat}
          <option value={cat}>{CATEGORIES[cat]?.label || cat}</option>
        {/each}
      </select>
      <select class="kanban-select" bind:value={filterType}>
        <option value="">All Types</option>
        {#each allTypes as t}
          <option value={t}>{TYPE_ICONS[t] || ''} {t.toUpperCase()}</option>
        {/each}
      </select>
      <button
        class="sort-toggle"
        class:sort-active={sortByPriority}
        onclick={() => sortByPriority = !sortByPriority}
        title={sortByPriority ? 'Sorting by priority' : 'Sort by priority'}
      >
        &#x21F5; {sortByPriority ? 'Priority' : 'Name'}
      </button>
      {#if columnOrder.length > 0}
        <button
          class="col-reset-btn"
          onclick={resetColumnOrder}
          title="Reset column order to default"
        >
          &#x21BA; Columns
        </button>
      {/if}
    </div>
  </div>

  <!-- Project Chips -->
  <div class="project-chips-bar">
    <ProjectChips onfocus={handleProjectFocus} />
    {#if focusProjectId}
      <span class="focus-badge">
        FOCUS: {configProjects.find(p => p.id === focusProjectId)?.label ?? focusProjectId}
        <button class="focus-clear" onclick={() => focusProjectId = null}>&#x2715;</button>
      </span>
    {/if}
  </div>

  <!-- Selection toolbar -->
  {#if totalSelected > 0}
    <div class="selection-toolbar">
      <span class="sel-count">{totalSelected} selected</span>
      <select
        class="sel-move-select"
        bind:value={moveTargetCol}
        onchange={() => { if (moveTargetCol) moveSelectedTo(moveTargetCol as KanbanStatus); }}
      >
        <option value="">Move to...</option>
        {#each KANBAN_COLUMNS as col}
          <option value={col.id}>{col.label}</option>
        {/each}
      </select>
      <button class="sel-done-btn" onclick={() => moveSelectedTo('done')} title="Move selected to DONE">
        DONE
      </button>
      <button class="sel-archive-btn" onclick={() => moveSelectedTo('archive')} title="Move selected to ARCHIVE">
        ARCHIVE
      </button>
      <button class="sel-delete-btn" onclick={deleteSelected} title="Move selected to DELETE column (soft delete)">
        DELETE
      </button>
      <button class="sel-truncate-btn" onclick={truncateSelected} title="Permanently delete selected cards">
        TRUNCATE
      </button>
      <button class="sel-clear-btn" onclick={clearSelection} title="Clear selection">
        &#x2715;
      </button>
    </div>
  {/if}

  <!-- SDLC Pipeline -->
  <div class="kanban-columns">
    {#each displayColumns as colDef (colDef.id)}
      {@const colCards = filteredCards(colDef.id)}
      <div
        class="kanban-column"
        data-col={colDef.id}
        class:drag-over={dragOverCol === colDef.id}
        class:empty-col={colCards.length === 0}
        class:col-dragging={dragColId === colDef.id}
        ondragover={(e) => handleDragOver(e, colDef.id)}
        ondragleave={handleDragLeave}
        ondrop={(e) => handleDrop(e, colDef.id)}
      >
        <div
          class="column-header"
          draggable="true"
          ondragstart={(e) => handleColDragStart(e, colDef.id)}
          ondragend={handleColDragEnd}
          ondragover={(e) => handleColDragOver(e, colDef.id)}
          ondrop={(e) => handleColDrop(e)}
        >
          {#if colCards.length > 0}
            <input
              type="checkbox"
              class="col-select-all"
              draggable="false"
              checked={isAllSelectedInColumn(colDef.id)}
              onchange={() => toggleSelectAllInColumn(colDef.id)}
              onclick={(e) => e.stopPropagation()}
              ondragstart={(e) => e.preventDefault()}
              title="Select all in {colDef.label}"
            />
          {/if}
          {#if colDef.icon}
            <span class="col-icon" style="color: {colDef.color}" title={colDef.tooltip || ''}>{colDef.icon}</span>
          {:else}
            <span class="col-dot" style="background: {colDef.color}"></span>
          {/if}
          <span class="col-label" style="color: {colDef.color}" title={colDef.tooltip || ''}>{colDef.label}</span>
          {#if colCards.length > 0}
            <span class="col-count">{colCards.length}</span>
          {/if}
          {#if wipDisplay(colDef.id)}
            <span class="wip-badge" class:wip-over={isOverWip(colDef.id)}>{wipDisplay(colDef.id)}</span>
          {/if}
          {#if selectedCountInColumn(colDef.id) > 0}
            <span class="col-sel-count">{selectedCountInColumn(colDef.id)}</span>
          {/if}
          {#if colDef.id === 'create'}
            <button class="col-add" draggable="false" ondragstart={(e) => e.preventDefault()} onclick={(e) => { e.stopPropagation(); showNewCard = true; }}>+</button>
          {/if}
          {#if colDef.id === 'delete' && colCards.length > 0}
            <button
              class="col-rescue"
              draggable="false"
              onclick={(e) => { e.stopPropagation(); rescueToCreate('delete'); }}
              title="Move all back to CREATE column"
            >
              ↩ CREATE
            </button>
            <button
              class="col-truncate"
              draggable="false"
              onclick={(e) => { e.stopPropagation(); truncateColumn('delete'); }}
              title="Permanently delete all cards in this column"
            >
              TRUNCATE
            </button>
          {/if}
        </div>

        <div class="column-body">
          {#if colDef.id === 'create'}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="create-dropzone"
              class:drop-active={createDropOver}
              class:drop-error={!!createDropError}
              ondragover={handleCreateDragOver}
              ondragleave={handleCreateDragLeave}
              ondrop={handleCreateDrop}
            >
              {#if createDropError}
                <span class="cdz-icon cdz-err-icon">&#x26A0;</span>
                <span class="cdz-text cdz-err-text">{createDropError}</span>
              {:else}
                <span class="cdz-icon">&#x1F4C4;</span>
                <span class="cdz-text">{createDropOver ? 'Drop to create card' : 'Drop .md / .txt / .json'}</span>
                <label class="cdz-browse">
                  Browse
                  <input
                    type="file"
                    accept=".md,.txt,.json"
                    multiple
                    onchange={handleBrowseFiles}
                    style="display:none"
                  />
                </label>
              {/if}
            </div>
          {/if}
          {#each colCards as card (card.node.id)}
            {@const pri = PRIORITY_MAP[card.type] || { label: 'LOW', cls: 'pri-low' }}
            {@const tags = cardTags(card)}
            {@const prog = cardProgress(card)}
            <div
              class="kanban-card"
              class:dragging={dragNodeId === card.node.id}
              class:card-claimed={card.lifecycle === 'claimed'}
              class:card-running={card.lifecycle === 'running'}
              class:card-paused={card.lifecycle === 'paused'}
              class:card-terminal-active={terminalOpen && activeTerminalCard === card.node.id}
              class:card-selected={selectedCards.has(card.node.id)}
              class:drop-above={dragOverCardId === card.node.id && dragOverCardPos === 'above'}
              class:drop-below={dragOverCardId === card.node.id && dragOverCardPos === 'below'}
              draggable="true"
              ondragstart={(e) => handleDragStart(e, card.node.id)}
              ondragend={handleDragEnd}
              ondragover={(e) => handleCardDragOver(e, card.node.id)}
              ondrop={(e) => handleCardDrop(e, card.node.id, colDef.id)}
              onclick={() => handleCardClick(card)}
            >
              <!-- Card ID + DB sync state -->
              <div class="card-id-row">
                <input
                  type="checkbox"
                  class="card-select-cb"
                  checked={selectedCards.has(card.node.id)}
                  onclick={(e) => toggleCardSelect(e, card.node.id)}
                />
                <span class="card-id">{card.node.id}</span>
                {#if syncState[card.node.id]?.synced}
                  <span class="sync-badge synced" title="Synced to DB at {new Date(syncState[card.node.id].lastSyncAt).toLocaleTimeString()}">DB</span>
                {:else}
                  <span class="sync-badge not-synced" title="Not synced to DB">DB</span>
                {/if}
              </div>

              <!-- Title row + priority badge -->
              <div class="card-title-row">
                <div class="card-title">{card.node.label}</div>
                <div class="card-pri-group">
                  <CardPriorityBadge nodeId={card.node.id} />
                  <span class="card-pri {pri.cls}">{pri.label}</span>
                </div>
              </div>

              <!-- Agent -->
              <div class="card-agent-row" onclick={(e) => toggleAgentMenu(e, card.node.id)}>
                {#if card.agent && AGENT_DEFS[card.agent]}
                  <span class="agent-dot-sm" style="background: {AGENT_DEFS[card.agent].color}"></span>
                  <span class="agent-name">{AGENT_DEFS[card.agent].label}</span>
                  <span class="agent-status-wrap" onclick={(e) => e.stopPropagation()}>
                    <AgentStatusIndicator nodeId={card.node.id} />
                  </span>
                {:else}
                  <span class="agent-dot-sm unassigned"></span>
                  <span class="agent-name unassigned">Assign agent</span>
                  <span class="agent-suggest-wrap">
                    <AgentSuggestBadge
                      nodeId={card.node.id}
                      onAccept={(agent) => { agentMenuNodeId = null; }}
                    />
                  </span>
                {/if}
              </div>

              <!-- Lifecycle indicator -->
              <div class="card-lifecycle">
                <button
                  class="lifecycle-btn lifecycle-{card.lifecycle}"
                  onclick={(e) => handleLifecycleClick(e, card)}
                >
                  {#if card.lifecycle === 'idle'}&#x25B6;{:else if card.lifecycle === 'claimed'}&#x1F680;{:else if card.lifecycle === 'started' || card.lifecycle === 'running'}&#x23F8;{:else if card.lifecycle === 'paused'}&#x25B6;{:else if card.lifecycle === 'completed'}&#x2714;{:else if card.lifecycle === 'failed'}&#x21BB;{:else}&#x1F512;{/if}
                  {#if card.lifecycle === 'failed'}FAILED{:else}{card.lifecycle}{/if}
                </button>
                {#if queuePosition(card.node.id) > 0}
                  <span class="queue-badge" title="Queue position #{queuePosition(card.node.id)}">Q{queuePosition(card.node.id)}</span>
                {/if}
              </div>

              <!-- Pipeline progress -->
              <PipelineProgress currentColumn={card.status} lifecycle={card.lifecycle} />

              <!-- Dependency & ref badges -->
              {#if (card.blockedBy && card.blockedBy.length > 0) || (card.blocking && card.blocking.length > 0) || (card.refs && card.refs.length > 0)}
                <DependencyBadge
                  cardId={card.node.id}
                  blockedBy={card.blockedBy ?? []}
                  blocking={card.blocking ?? []}
                  refs={card.refs ?? []}
                />
              {/if}

              <!-- Iteration badge -->
              {#if card.iterationCount > 0}
                <div class="card-iteration">
                  <span class="iter-count">&#x1F504; ×{card.iterationCount}</span>
                  <span
                    class="iter-score"
                    class:score-excellent={card.iterationScore >= 4.5}
                    class:score-good={card.iterationScore >= 3.5 && card.iterationScore < 4.5}
                  >
                    &#x2B50; {card.iterationScore.toFixed(1)}/5
                  </span>
                </div>
              {/if}

              <!-- Labels -->
              {#if (labelsMap[card.node.id] ?? []).length > 0}
                <div class="card-label-dots">
                  {#each labelsMap[card.node.id] ?? [] as lid}
                    {#if configLabels.find(l => l.id === lid)}
                      <span class="card-label-dot" style="background:{configLabels.find(l => l.id === lid)?.color}" title={configLabels.find(l => l.id === lid)?.name}></span>
                    {/if}
                  {/each}
                </div>
              {/if}

              <!-- Due Date & Checklist inline -->
              {#if dueDateUrgency(dueDatesMap[card.node.id]) || checklistProgress(card.node.id)}
                <div class="card-meta-badges">
                  {#if dueDateUrgency(dueDatesMap[card.node.id])}
                    <span class="due-badge {dueDateUrgency(dueDatesMap[card.node.id])?.cls}">{dueDateUrgency(dueDatesMap[card.node.id])?.label}</span>
                  {/if}
                  {#if checklistProgress(card.node.id)}
                    <span class="checklist-badge">{checklistProgress(card.node.id)?.done}/{checklistProgress(card.node.id)?.total}</span>
                  {/if}
                </div>
              {/if}

              <!-- Tags -->
              {#if tags.length > 0}
                <div class="card-tags">
                  {#each tags as tag}
                    <span class="card-tag">{tag}</span>
                  {/each}
                </div>
              {/if}

              <!-- Progress -->
              <div class="card-progress">
                <div class="prog-text">
                  <span>{prog.done}/{prog.total} steps</span>
                  <span>{prog.pct}%</span>
                </div>
                <div class="prog-bar">
                  <div class="prog-fill" style="width: {prog.pct}%; background: {colDef.color}"></div>
                </div>
              </div>

              <!-- Timestamp / status -->
              <div class="card-time">{card.node.status || card.type}</div>

              <!-- Agent action button (visible when agent assigned + artifact exists) -->
              {#if card.agent && card.artifactPath && AGENT_DEFS[card.agent]}
                <div class="card-action-footer" onclick={(e) => e.stopPropagation()}>
                  <AgentActionButton
                    card={card}
                    command={AGENT_DEFS[card.agent].command}
                  />
                </div>
              {/if}

              <!-- Agent dropdown rendered as fixed portal below -->
            </div>
          {/each}
          {#if totalColCount(colDef.id) > MAX_CARDS_PER_COL}
            <div class="col-more">+{totalColCount(colDef.id) - MAX_CARDS_PER_COL} more</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Agent dropdown (fixed portal — escapes column overflow) -->
{#if agentMenuNodeId}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="agent-menu-backdrop" onclick={closeAgentMenu}></div>
  <div
    class="agent-dropdown"
    class:drop-up={agentMenuPos.dropUp}
    style="
      position: fixed;
      left: {agentMenuPos.left}px;
      {agentMenuPos.dropUp ? `bottom: ${window.innerHeight - agentMenuPos.top}px` : `top: ${agentMenuPos.top}px`};
    "
    onclick={(e) => e.stopPropagation()}
  >
    {#each Object.entries(AGENT_DEFS) as [key, def]}
      <button
        class="agent-option"
        onclick={() => handleAssign(agentMenuNodeId!, key as AgentType)}
      >
        <span class="agent-dot" style="background: {def.color}"></span>
        {def.label}
        <span class="agent-cmd">{def.command}</span>
      </button>
    {/each}
    <button
      class="agent-option unassign"
      onclick={() => handleAssign(agentMenuNodeId!, null)}
    >
      <span class="agent-dot" style="background: #555"></span>
      Unassign
    </button>
  </div>
{/if}

<!-- Dialogs -->
{#if showNewCard}
  <NewCardDialog onClose={() => showNewCard = false} />
{/if}

{#if previewCard}
  <CardPreview
    card={previewCard}
    onClose={() => previewCard = null}
    onRerun={handleRerun}
  />
{/if}

{#if startDialogCard}
  <StartDialog
    card={startDialogCard.card}
    fromColumn={startDialogCard.from}
    toColumn={startDialogCard.to}
    onConfirm={handleStartConfirm}
    onCancel={handleStartCancel}
  />
{/if}

{#if pauseDialogCard}
  <PauseDialog
    card={pauseDialogCard}
    onPause={handlePause}
    onCancel={() => pauseDialogCard = null}
  />
{/if}

{#if resumeDialogCard}
  <ResumeDialog
    card={resumeDialogCard}
    onResume={handleResume}
    onSkip={handleResumeSkip}
    onCancel={() => resumeDialogCard = null}
  />
{/if}

{#if failedDialogCard}
  <FailedDialog
    card={failedDialogCard}
    onRestart={handleRestart}
    onCancel={() => failedDialogCard = null}
  />
{/if}

<AgentTerminal bind:open={terminalOpen} onActiveTabChange={(id) => activeTerminalCard = id} />

<QueuePanel bind:open={queuePanelOpen} />

<ConfirmActionDialog />

{#if showResetConfirm}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="reset-overlay" onclick={() => showResetConfirm = false}>
    <div class="reset-dialog" onclick={(e) => e.stopPropagation()}>
      <div class="reset-title">RESET BOARD</div>
      <div class="reset-body">Clear all manual overrides, card ordering, agent assignments, local cards, and lifecycle states?</div>
      <div class="reset-body-sub">Graph-based cards will return to their auto-detected columns.</div>
      <div class="reset-actions">
        <button class="reset-btn-confirm" onclick={confirmReset}>Reset to Default</button>
        <button class="reset-btn-cancel" onclick={() => showResetConfirm = false}>Cancel</button>
      </div>
    </div>
  </div>
{/if}

{#if settingsOpen}
  <SettingsDialog onclose={() => settingsOpen = false} />
{/if}

<!-- Keyboard Shortcut Help Overlay -->
{#if showShortcutHelp}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="shortcut-overlay" onclick={() => showShortcutHelp = false}>
    <div class="shortcut-panel" onclick={(e) => e.stopPropagation()}>
      <div class="shortcut-title">KEYBOARD SHORTCUTS</div>
      <div class="shortcut-grid">
        <div class="sc-row"><kbd>n</kbd><span>New card</span></div>
        <div class="sc-row"><kbd>/</kbd><span>Focus search</span></div>
        <div class="sc-row"><kbd>Esc</kbd><span>Close dialog / clear focus</span></div>
        <div class="sc-row"><kbd>?</kbd><span>Toggle this help</span></div>
      </div>
    </div>
  </div>
{/if}

<CommandPanel />

<!-- Voice Command Bar — bottom bar with mic button -->
<VoiceCommandBar />

<style>
  .kanban-overlay {
    position: fixed;
    top: 0;
    left: 44px;
    right: 0;
    bottom: 0;
    z-index: 50;
    background: #0c0e14;
    display: flex;
    flex-direction: column;
    font-family: var(--font, 'JetBrains Mono', monospace);
    overflow: hidden;
    transition: left 0.15s ease;
  }
  .kanban-overlay.cmd-panel-open {
    left: 324px;
  }

  /* ── Header ──────────────────────────────────────────────────────────── */
  .kanban-header {
    display: flex;
    flex-direction: column;
    padding: 10px 20px 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
    gap: 8px;
  }
  .header-row-1 {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .header-row-2 {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
  }
  .kanban-title-area {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .kanban-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text, #e0e0e0);
    letter-spacing: 0.04em;
  }
  .kanban-subtitle {
    font-size: 11px;
    color: #555;
  }
  .kanban-search {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    color: var(--text, #e0e0e0);
    font-family: inherit;
    width: 200px;
    outline: none;
  }
  .kanban-search:focus {
    border-color: var(--accent, #00e5ff);
  }
  .kanban-search::placeholder {
    color: #444;
  }
  .kanban-select {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 12px;
    color: var(--text, #e0e0e0);
    font-family: inherit;
    outline: none;
    cursor: pointer;
  }

  .cmd-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
  }
  .cmd-toggle:hover {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
  }

  .sync-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    color: #666;
    cursor: pointer;
    transition: all 0.15s;
    display: flex; align-items: center; gap: 4px;
    font-family: inherit;
  }
  .sync-toggle:hover {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
    background: rgba(0,229,255,0.06);
  }
  .sync-active {
    color: #f97316 !important;
    border-color: rgba(249,115,22,0.3) !important;
    animation: spin 1s linear infinite;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .sync-result {
    font-size: 9px;
    font-weight: 600;
    color: #00ff88;
    letter-spacing: 0.04em;
  }

  .settings-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 8px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    transition: all 0.15s;
  }
  .settings-toggle:hover {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
    background: rgba(0,229,255,0.06);
  }

  .autoclaim-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
  }
  .autoclaim-toggle:hover {
    color: #b44dff;
    border-color: rgba(180,77,255,0.3);
  }
  .autoclaim-toggle.autoclaim-active {
    color: #b44dff;
    border-color: rgba(180,77,255,0.3);
    background: rgba(180,77,255,0.08);
  }
  .autoclaim-count {
    display: inline-block;
    background: rgba(180,77,255,0.2);
    color: #b44dff;
    border-radius: 8px;
    padding: 0 5px;
    margin-left: 4px;
    font-size: 9px;
    min-width: 14px;
    text-align: center;
  }

  /* ── Health Bar ──────────────────────────────────────────────────── */
  .health-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 8px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
  }
  .health-stat {
    font-size: 11px;
    color: #888;
    white-space: nowrap;
  }
  .health-stat.at-capacity {
    color: #f97316;
    font-weight: 700;
  }
  .health-stat.queue-stat {
    color: #06b6d4;
  }
  .health-stat.completed-stat {
    color: #22c55e;
  }
  .health-stat.failed-stat {
    color: #ef4444;
  }
  .concurrency-select {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 5px;
    padding: 3px 6px;
    font-size: 11px;
    color: #aaa;
    font-family: inherit;
    cursor: pointer;
    outline: none;
  }
  .pipeline-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
  }
  .pipeline-toggle:hover {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
  }
  .pipeline-toggle.pipeline-active {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
    background: rgba(0,229,255,0.08);
  }

  .queue-panel-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
  }
  .queue-panel-toggle:hover {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
  }
  .queue-toggle-count {
    background: #00e5ff;
    color: #0d1117;
    font-size: 8px;
    padding: 0 4px;
    border-radius: 6px;
    margin-left: 3px;
  }

  /* ── Queue Badge ────────────────────────────────────────────────── */
  .queue-badge {
    display: inline-block;
    background: rgba(6,182,212,0.15);
    color: #06b6d4;
    border-radius: 8px;
    padding: 1px 6px;
    margin-left: 6px;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  /* ── Pipeline Mini Progress ─────────────────────────────────────── */
  /* ── Columns layout ────────────────────────────────────────────────── */
  .kanban-columns {
    display: flex;
    gap: 10px;
    padding: 14px 16px;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
  }
  .kanban-columns::-webkit-scrollbar {
    height: 6px;
  }
  .kanban-columns::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08);
    border-radius: 3px;
  }

  .kanban-column {
    flex: 0 0 280px;
    min-width: 260px;
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 10px;
    transition: border-color 0.15s, background 0.15s;
  }
  .kanban-column.drag-over {
    border-color: rgba(0,229,255,0.4);
    background: rgba(0,229,255,0.03);
  }
  .kanban-column.col-dragging {
    opacity: 0.5;
    border-color: rgba(234,179,8,0.4);
  }
  .kanban-column.empty-col {
    flex: 0 0 160px;
    min-width: 140px;
    opacity: 0.5;
  }

  /* ── Column header ───────────────────────────────────────────────────── */
  .column-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    flex-shrink: 0;
    cursor: grab;
  }
  .column-header:active {
    cursor: grabbing;
  }
  .col-dot {
    width: 8px;
    height: 8px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  .col-icon {
    font-size: 12px;
    flex-shrink: 0;
    cursor: help;
  }
  .col-more {
    text-align: center;
    font-size: 10px;
    color: #555;
    padding: 8px 0;
    letter-spacing: 0.04em;
  }
  .col-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }
  .col-count {
    font-size: 10px;
    color: #555;
    margin-left: auto;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 2px 8px;
    border-radius: 4px;
    min-width: 24px;
    text-align: center;
  }

  /* ── Column body (scrollable) ────────────────────────────────────────── */
  .column-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .column-body::-webkit-scrollbar {
    width: 3px;
  }
  .column-body::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.06);
    border-radius: 2px;
  }

  /* ── Create column drop zone ────────────────────────────────────────── */
  .create-dropzone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 28px 10px;
    min-height: 120px;
    border: 2px dashed rgba(255,255,255,0.08);
    border-radius: 8px;
    background: rgba(255,255,255,0.015);
    cursor: default;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .create-dropzone:hover {
    border-color: rgba(0,229,255,0.2);
    background: rgba(0,229,255,0.02);
  }
  .create-dropzone.drop-active {
    border-color: rgba(0,229,255,0.5);
    background: rgba(0,229,255,0.06);
  }
  .cdz-icon {
    font-size: 24px;
    opacity: 0.4;
  }
  .create-dropzone.drop-active .cdz-icon {
    opacity: 0.8;
  }
  .cdz-text {
    font-size: 12px;
    color: #555;
  }
  .create-dropzone.drop-active .cdz-text {
    color: #00e5ff;
  }
  .cdz-browse {
    display: inline-block;
    padding: 5px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    color: #00e5ff;
    background: rgba(0,229,255,0.08);
    border: 1px solid rgba(0,229,255,0.2);
    transition: background 0.15s;
    font-family: inherit;
    margin-top: 4px;
  }
  .cdz-browse:hover {
    background: rgba(0,229,255,0.18);
  }
  .create-dropzone.drop-error {
    border-color: rgba(255,60,60,0.4);
    background: rgba(255,60,60,0.04);
  }
  .cdz-err-icon {
    opacity: 0.8 !important;
  }
  .cdz-err-text {
    color: #ff5555 !important;
    font-size: 10px !important;
    white-space: normal !important;
    line-height: 1.3;
  }

  /* ── Card ─────────────────────────────────────────────────────────────── */
  .kanban-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px;
    padding: 14px 16px;
    cursor: grab;
    transition: all 0.15s;
    position: relative;
  }
  .kanban-card:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  }
  .kanban-card.dragging {
    opacity: 0.4;
    transform: rotate(2deg);
  }
  .kanban-card.drop-above {
    border-top: 2px solid #00e5ff;
    margin-top: -1px;
  }
  .kanban-card.drop-below {
    border-bottom: 2px solid #00e5ff;
    margin-bottom: -1px;
  }
  .kanban-card:active {
    cursor: grabbing;
  }

  /* Card ID row + DB sync badge */
  .card-id-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }
  .card-id {
    font-size: 9px;
    color: #444;
    font-family: inherit;
    letter-spacing: 0.03em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    min-width: 0;
  }
  .kanban-card:hover .card-id {
    color: #666;
  }
  .sync-badge {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 1px 5px;
    border-radius: 3px;
    flex-shrink: 0;
    border: 1px solid;
  }
  .sync-badge.synced {
    color: #00ff88;
    border-color: rgba(0, 255, 136, 0.3);
    background: rgba(0, 255, 136, 0.08);
  }
  .sync-badge.not-synced {
    color: #555;
    border-color: rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
  }

  /* Card title row — title + priority badge */
  .card-title-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
  }
  .card-title {
    font-size: 13px;
    font-weight: 700;
    color: #e8e8ec;
    line-height: 1.35;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Priority badges */
  .card-pri {
    flex-shrink: 0;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid;
    white-space: nowrap;
  }
  .pri-high {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.5);
    background: rgba(255, 85, 85, 0.08);
  }
  .pri-med {
    color: #e8a838;
    border-color: rgba(232, 168, 56, 0.5);
    background: rgba(232, 168, 56, 0.08);
  }
  .pri-low {
    color: #5588ff;
    border-color: rgba(85, 136, 255, 0.5);
    background: rgba(85, 136, 255, 0.08);
  }

  /* Agent row */
  .card-agent-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    overflow: hidden;
    min-width: 0;
  }
  .agent-dot-sm {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .agent-dot-sm.unassigned {
    background: #333;
    border: 1px dashed #555;
  }
  .agent-name {
    font-size: 11px;
    color: #9098a8;
  }
  .agent-name.unassigned {
    color: #444;
    font-style: italic;
  }
  .card-agent-row:hover .agent-name {
    color: var(--accent, #00e5ff);
  }

  /* Tags */
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 10px;
  }
  .card-tag {
    font-size: 10px;
    color: #8090a0;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    padding: 2px 8px;
    border-radius: 4px;
    white-space: nowrap;
  }

  /* Progress */
  .card-progress {
    margin-bottom: 6px;
  }
  .prog-text {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #6a7080;
    margin-bottom: 4px;
  }
  .prog-bar {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 2px;
    overflow: hidden;
  }
  .prog-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* Timestamp / status */
  .card-time {
    font-size: 10px;
    color: #444;
  }

  /* ── Agent dropdown (fixed portal) ────────────────────────────────────── */
  .agent-menu-backdrop {
    position: fixed;
    inset: 0;
    z-index: 99;
  }
  .agent-dropdown {
    background: #151520;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 4px;
    z-index: 100;
    min-width: 160px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.7);
  }
  .agent-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 6px 8px;
    background: none;
    border: none;
    border-radius: 5px;
    color: var(--text, #e0e0e0);
    font-size: 11px;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.1s;
  }
  .agent-option:hover {
    background: rgba(255,255,255,0.06);
  }
  .agent-option.unassign {
    color: #666;
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: 2px;
    padding-top: 7px;
  }
  .agent-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .agent-cmd {
    font-size: 9px;
    color: #555;
    margin-left: auto;
  }

  /* ── Add button in CREATE column ───────────────────────────────────────── */
  .col-add {
    margin-left: 6px;
    width: 22px;
    height: 22px;
    border-radius: 5px;
    border: 1px dashed rgba(255,255,255,0.15);
    background: transparent;
    color: #666;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    font-family: inherit;
    line-height: 1;
  }
  .col-add:hover {
    border-color: rgba(0,229,255,0.4);
    color: #00e5ff;
    background: rgba(0,229,255,0.06);
  }

  .col-rescue {
    margin-left: auto;
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 8px;
    font-weight: 700;
    font-family: inherit;
    color: #888;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: all 0.12s;
  }
  .col-rescue:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.25);
  }
  .col-truncate {
    background: none;
    border: 1px solid rgba(255,60,60,0.25);
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 8px;
    font-weight: 700;
    font-family: inherit;
    color: #ff3d3d;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: all 0.12s;
  }
  .col-truncate:hover {
    background: rgba(255,60,60,0.12);
    border-color: rgba(255,60,60,0.5);
    box-shadow: 0 0 6px rgba(255,60,60,0.2);
  }

  /* ── Column select-all checkbox ────────────────────────────────────────── */
  .col-select-all {
    accent-color: #00e5ff;
    width: 12px;
    height: 12px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .col-sel-count {
    font-size: 8px;
    font-weight: 700;
    background: #00e5ff;
    color: #0d1117;
    padding: 0 4px;
    border-radius: 6px;
    min-width: 14px;
    text-align: center;
  }

  /* ── Card select checkbox ──────────────────────────────────────────────── */
  .card-select-cb {
    accent-color: #00e5ff;
    width: 12px;
    height: 12px;
    cursor: pointer;
    flex-shrink: 0;
  }

  .kanban-card.card-selected {
    border-color: rgba(0, 229, 255, 0.4) !important;
    box-shadow: 0 0 0 1px rgba(0, 229, 255, 0.15), inset 0 0 0 1px rgba(0, 229, 255, 0.06);
  }

  /* ── Selection toolbar ─────────────────────────────────────────────────── */
  .selection-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 20px;
    background: rgba(0, 229, 255, 0.04);
    border-bottom: 1px solid rgba(0, 229, 255, 0.12);
    flex-shrink: 0;
    animation: toolbar-in 0.12s ease-out;
  }

  @keyframes toolbar-in {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .sel-count {
    font-size: 10px;
    font-weight: 700;
    color: #00e5ff;
    letter-spacing: 0.04em;
  }

  .sel-move-select {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 9px;
    color: #9098a8;
    font-family: inherit;
    cursor: pointer;
    outline: none;
  }
  .sel-move-select:hover {
    border-color: rgba(0,229,255,0.3);
  }

  .sel-done-btn,
  .sel-archive-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 9px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: all 0.12s;
  }

  .sel-done-btn {
    color: #00ff88;
    border-color: rgba(0,255,136,0.2);
  }
  .sel-done-btn:hover {
    background: rgba(0,255,136,0.08);
    border-color: rgba(0,255,136,0.4);
  }

  .sel-archive-btn {
    color: #888;
    border-color: rgba(255,255,255,0.08);
  }
  .sel-archive-btn:hover {
    color: #bbb;
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.15);
  }

  .sel-delete-btn {
    background: none;
    border: 1px solid rgba(255,60,60,0.2);
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 9px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: all 0.12s;
    color: #ff3d3d;
  }
  .sel-delete-btn:hover {
    background: rgba(255,60,60,0.1);
    border-color: rgba(255,60,60,0.4);
    box-shadow: 0 0 6px rgba(255,60,60,0.15);
  }

  .sel-truncate-btn {
    background: rgba(255,60,60,0.08);
    border: 1px solid rgba(255,60,60,0.3);
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 9px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: all 0.12s;
    color: #ff3d3d;
  }
  .sel-truncate-btn:hover {
    background: rgba(255,60,60,0.2);
    border-color: rgba(255,60,60,0.6);
    box-shadow: 0 0 8px rgba(255,60,60,0.25);
  }

  .sel-clear-btn {
    background: none;
    border: none;
    color: #555;
    font-size: 12px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: inherit;
    transition: all 0.12s;
  }
  .sel-clear-btn:hover {
    color: #ff5555;
    background: rgba(255,85,85,0.06);
  }

  /* ── Lifecycle indicator on card ────────────────────────────────────────── */
  .card-lifecycle {
    margin-bottom: 6px;
  }
  .lifecycle-btn {
    background: none;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 10px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .lifecycle-btn.lifecycle-idle {
    color: #666;
  }
  .lifecycle-btn.lifecycle-idle:hover {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
  }
  .lifecycle-btn.lifecycle-claimed {
    color: #b44dff;
    border-color: rgba(180,77,255,0.3);
  }
  .lifecycle-btn.lifecycle-claimed:hover {
    color: #c77dff;
    border-color: rgba(180,77,255,0.5);
  }
  .lifecycle-btn.lifecycle-started,
  .lifecycle-btn.lifecycle-running {
    color: #00ff88;
    border-color: rgba(0,255,136,0.3);
  }
  .lifecycle-btn.lifecycle-paused {
    color: #f97316;
    border-color: rgba(249,115,22,0.3);
  }
  .lifecycle-btn.lifecycle-completed {
    color: #00ff88;
    border-color: rgba(0,255,136,0.2);
  }
  .lifecycle-btn.lifecycle-failed {
    color: #ff5555;
    border-color: rgba(255,85,85,0.3);
  }
  .lifecycle-btn.lifecycle-blocked {
    color: #ffcc00;
    border-color: rgba(255,204,0,0.3);
  }

  /* ── Card state modifiers ──────────────────────────────────────────────── */
  .kanban-card.card-claimed {
    border-left: 2px solid rgba(180,77,255,0.5);
  }
  .kanban-card.card-running {
    border-left: 2px solid rgba(0,255,136,0.5);
  }
  .kanban-card.card-paused {
    border-left: 2px solid rgba(249,115,22,0.5);
    opacity: 0.8;
  }
  .kanban-card.card-terminal-active {
    border-color: rgba(0, 229, 255, 0.5);
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.2), 0 0 24px rgba(0, 229, 255, 0.08);
    animation: card-glow-pulse 2s ease-in-out infinite;
  }
  @keyframes card-glow-pulse {
    0%, 100% { box-shadow: 0 0 12px rgba(0, 229, 255, 0.2), 0 0 24px rgba(0, 229, 255, 0.08); }
    50% { box-shadow: 0 0 18px rgba(0, 229, 255, 0.35), 0 0 36px rgba(0, 229, 255, 0.12); }
  }

  /* ── Iteration badge on card ───────────────────────────────────────────── */
  .card-iteration {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    font-size: 10px;
  }
  .iter-count {
    color: #888;
  }
  .iter-score {
    color: #888;
  }
  .iter-score.score-excellent {
    color: #00ff88;
  }
  .iter-score.score-good {
    color: #00e5ff;
  }

  /* ── Sort toggle ─────────────────────────────────────────────────────────── */
  .sort-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .sort-toggle:hover {
    color: #eab308;
    border-color: rgba(234,179,8,0.3);
  }
  .sort-toggle.sort-active {
    color: #eab308;
    border-color: rgba(234,179,8,0.4);
    background: rgba(234,179,8,0.08);
  }

  .col-reset-btn {
    background: rgba(234,179,8,0.08);
    border: 1px solid rgba(234,179,8,0.25);
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 11px;
    font-weight: 600;
    color: #eab308;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
  }
  .col-reset-btn:hover {
    background: rgba(234,179,8,0.15);
    border-color: rgba(234,179,8,0.5);
  }

  /* ── Card priority group (score chip + type badge together) ─────────────── */
  .card-pri-group {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }

  /* ── Agent suggest wrapper (inline in agent row) ────────────────────────── */
  .agent-suggest-wrap {
    margin-left: auto;
    flex-shrink: 1;
    min-width: 0;
    overflow: hidden;
  }

  /* ── Agent status wrapper (inline in agent row, right side) ──────────────── */
  .agent-status-wrap {
    margin-left: auto;
    flex-shrink: 0;
  }

  /* ── Agent action button footer (below timestamp) ────────────────────────── */
  .card-action-footer {
    margin-top: 8px;
  }

  /* ── Project chips bar ──────────────────────────────────────────────────── */
  .project-chips-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    min-height: 28px;
  }
  .focus-badge {
    font-size: 10px;
    font-weight: 700;
    color: #00e5ff;
    background: rgba(0,229,255,0.08);
    border: 1px solid rgba(0,229,255,0.25);
    border-radius: 4px;
    padding: 2px 8px;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: 0.06em;
  }
  .focus-clear {
    background: none;
    border: none;
    color: #00e5ff;
    cursor: pointer;
    font-size: 10px;
    padding: 0 2px;
  }
  .focus-clear:hover { color: #ff5555; }

  /* ── WIP badges ─────────────────────────────────────────────────────────── */
  .wip-badge {
    font-size: 8px;
    font-weight: 700;
    color: #888;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 3px;
    padding: 1px 4px;
    letter-spacing: 0.04em;
  }
  .wip-over {
    color: #ff5555;
    background: rgba(255,85,85,0.1);
    border-color: rgba(255,85,85,0.3);
  }

  /* ── Card label dots ────────────────────────────────────────────────────── */
  .card-label-dots {
    display: flex;
    gap: 3px;
    margin-bottom: 6px;
  }
  .card-label-dot {
    width: 18px;
    height: 5px;
    border-radius: 2px;
    display: inline-block;
  }

  /* ── Card meta badges (due date, checklist) ─────────────────────────────── */
  .card-meta-badges {
    display: flex;
    gap: 6px;
    margin-bottom: 6px;
  }
  .due-badge, .checklist-badge {
    font-size: 9px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 3px;
    letter-spacing: 0.04em;
    font-family: inherit;
  }
  .due-ok { color: #00ff88; background: rgba(0,255,136,0.08); }
  .due-soon { color: #ffcc00; background: rgba(255,204,0,0.1); }
  .due-today { color: #f97316; background: rgba(249,115,22,0.12); }
  .due-overdue { color: #ff3d3d; background: rgba(255,61,61,0.12); }
  .checklist-badge {
    color: #888;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
  }

  /* ── Keyboard shortcut overlay ──────────────────────────────────────────── */
  .shortcut-overlay {
    position: fixed;
    inset: 0;
    z-index: 300;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .shortcut-panel {
    background: #161922;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 20px 28px;
    min-width: 280px;
  }
  .shortcut-title {
    font-size: 12px;
    font-weight: 700;
    color: #e0e0e0;
    letter-spacing: 0.1em;
    margin-bottom: 14px;
  }
  .shortcut-grid { display: flex; flex-direction: column; gap: 8px; }
  .sc-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: #aaa;
  }
  .sc-row kbd {
    display: inline-block;
    min-width: 32px;
    padding: 2px 8px;
    text-align: center;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    font-family: inherit;
    color: #ccc;
  }

  /* ── Shortcut help button ───────────────────────────────────────────────── */
  .shortcut-help-btn {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: #666;
    font-size: 12px;
    font-weight: 700;
    font-family: inherit;
    padding: 5px 8px;
    border-radius: 6px;
    cursor: pointer;
    letter-spacing: 0.04em;
  }
  .shortcut-help-btn:hover { color: #00e5ff; border-color: rgba(0,229,255,0.3); }

  /* ── Analytics button ─────────────────────────────────────────────── */
  .analytics-toggle {
    background: rgba(0,229,255,0.06);
    border: 1px solid rgba(0,229,255,0.15);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 700;
    color: #00e5ff;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
  }
  .analytics-toggle:hover {
    background: rgba(0,229,255,0.15);
    border-color: rgba(0,229,255,0.35);
  }

  /* ── Reset button & dialog ──────────────────────────────────────────── */
  .reset-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 11px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
  }
  .reset-toggle:hover {
    color: #ff5555;
    border-color: rgba(255,60,60,0.3);
  }
  .reset-overlay {
    position: fixed;
    inset: 0;
    z-index: 300;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reset-dialog {
    background: #161922;
    border: 1px solid rgba(255,60,60,0.2);
    border-radius: 12px;
    padding: 24px;
    width: 380px;
    max-width: 90vw;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }
  .reset-title {
    font-size: 13px;
    font-weight: 700;
    color: #ff5555;
    letter-spacing: 0.08em;
    margin-bottom: 14px;
  }
  .reset-body {
    font-size: 12px;
    color: #ccc;
    line-height: 1.5;
    margin-bottom: 6px;
  }
  .reset-body-sub {
    font-size: 11px;
    color: #666;
    margin-bottom: 18px;
  }
  .reset-actions {
    display: flex;
    gap: 8px;
  }
  .reset-btn-confirm {
    flex: 1;
    padding: 10px;
    background: rgba(255,60,60,0.15);
    color: #ff5555;
    border: 1px solid rgba(255,60,60,0.3);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
  }
  .reset-btn-confirm:hover {
    background: rgba(255,60,60,0.25);
  }
  .reset-btn-cancel {
    flex: 1;
    padding: 10px;
    background: rgba(255,255,255,0.05);
    color: #888;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
  }
  .reset-btn-cancel:hover {
    color: #ccc;
    background: rgba(255,255,255,0.08);
  }

  /* ── Terminal toggle in header ───────────────────────────────────────── */
  .terminal-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: #666;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.12s;
  }
  .terminal-toggle:hover {
    color: #00ff88;
    border-color: rgba(0,255,136,0.3);
    background: rgba(0,255,136,0.06);
  }
  .terminal-active {
    color: #00ff88 !important;
    border-color: rgba(0,255,136,0.4) !important;
    background: rgba(0,255,136,0.1) !important;
  }
</style>
