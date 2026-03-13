<script lang="ts">
  import { selectedNodeId } from '../../lib/stores/appState';
  import {
    KANBAN_COLUMNS, AGENT_DEFS,
    kanbanCards, kanbanColumns,
    cardPriorities, cardUpdatedAt,
    assignAgent, moveCard,
    updateLifecycle,
    startBoardSync, stopBoardSync,
    dbSyncState,
  } from '../../lib/stores/kanbanState';
  import { CATEGORIES } from '../../lib/constants';
  import { buildCommandString, getCommandsForColumn } from '../../lib/workflow/commandRegistry';
  import type { KanbanCard, KanbanStatus, AgentType, PauseReason } from '../../lib/types';
  import StartDialog from './StartDialog.svelte';
  import PauseDialog from './PauseDialog.svelte';
  import ResumeDialog from './ResumeDialog.svelte';
  import NewCardDialog from './NewCardDialog.svelte';
  import CardPreview from './CardPreview.svelte';
  import CommandPanel from './CommandPanel.svelte';
  import AgentTerminal from './AgentTerminal.svelte';
  import AgentSuggestBadge from './AgentSuggestBadge.svelte';
  import CardPriorityBadge from './CardPriority.svelte';
  import DependencyBadge from './DependencyBadge.svelte';
  import AgentStatusIndicator from './AgentStatusIndicator.svelte';
  import AgentActionButton from './AgentActionButton.svelte';
  import { toggleCommandPanel, queueCommand, markCopied } from '../../lib/stores/commandState';
  import { connectEventServer, disconnectEventServer } from '../../lib/stores/agentEventStore';
  import { addLog } from '../../lib/stores/activityLog';

  let columns = $state(new Map<KanbanStatus, KanbanCard[]>());
  let cards = $state<KanbanCard[]>([]);
  let dragNodeId = $state<string | null>(null);
  let dragOverCol = $state<KanbanStatus | null>(null);
  let agentMenuNodeId = $state<string | null>(null);
  let filterType = $state('');
  let filterCat = $state('');
  let searchText = $state('');
  let sortByPriority = $state(false);
  let priorities = $state(new Map<string, import('../../lib/types').CardPriority>());
  let syncState = $state<Record<string, { synced: boolean; lastSyncAt: number }>>({});
  let updatedAtMap = $state<Record<string, number>>({});

  // Dialog states
  let showNewCard = $state(false);
  let previewCard = $state<KanbanCard | null>(null);
  let startDialogCard = $state<{ card: KanbanCard; from: string; to: string } | null>(null);
  let pauseDialogCard = $state<KanbanCard | null>(null);
  let resumeDialogCard = $state<KanbanCard | null>(null);

  // Pending drag target (used when StartDialog is needed before drop)
  let pendingDrop = $state<{ nodeId: string; targetCol: KanbanStatus } | null>(null);

  // Terminal panel open state
  let terminalOpen = $state(false);
  let activeTerminalCard = $state<string | null>(null);

  $effect(() => {
    const unsub = kanbanColumns.subscribe(v => { columns = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = kanbanCards.subscribe(v => { cards = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = cardPriorities.subscribe(v => { priorities = v; });
    return unsub;
  });

  $effect(() => {
    const unsub = dbSyncState.subscribe(v => { syncState = v; });
    return unsub;
  });
  $effect(() => {
    const unsub = cardUpdatedAt.subscribe(v => { updatedAtMap = v; });
    return unsub;
  });

  // Connect to agent event WebSocket + board sync on mount; cleanup on destroy
  $effect(() => {
    connectEventServer();
    startBoardSync();
    return () => {
      disconnectEventServer();
      stopBoardSync();
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

  function filteredCards(status: KanbanStatus): KanbanCard[] {
    const col = columns.get(status) || [];
    const filtered = col.filter(c => {
      if (filterType && c.type !== filterType) return false;
      if (filterCat && c.node.cat !== filterCat) return false;
      if (searchText) {
        const q = searchText.toLowerCase();
        if (!c.node.label.toLowerCase().includes(q) &&
            !(c.node.desc || '').toLowerCase().includes(q) &&
            !c.filePath.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    if (sortByPriority) {
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
    return filtered;
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

        if (card.lifecycle === 'idle' && !e.shiftKey) {
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
  }

  // ── Agent launch helper ─────────────────────────────────────────────────
  const EVENT_SERVER = 'http://localhost:4010';

  async function launchAgent(command: string, args: string, cardId: string | null) {
    try {
      const res = await fetch(`${EVENT_SERVER}/agent/launch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, args, cardId }),
      });
      const data = await res.json();
      if (res.ok && data.sessionId) {
        if (cardId) {
          addLog(cardId, 'agent:launched', { command, args, sessionId: data.sessionId, pid: data.pid });
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
      updateLifecycle(pauseDialogCard.node.id, 'paused', reason);
    }
    pauseDialogCard = null;
  }

  function handleResume(copyCommand: boolean, launchClaude: boolean = false) {
    if (resumeDialogCard) {
      const card = resumeDialogCard;
      updateLifecycle(card.node.id, 'running');

      // Determine command: use lastCommand, or derive from card's current column
      const command = card.lastCommand || getCommandsForColumn(card.status)[0] || null;

      if (launchClaude && command) {
        const args = card.artifactPath ? `'${card.artifactPath}'` : `"${card.node.label}"`;
        launchAgent(command, args, card.node.id);
      } else if (copyCommand && command) {
        const cmdStr = buildCommandString(card, command);
        if (cmdStr) navigator.clipboard.writeText(cmdStr);
        addLog(card.node.id, 'command:copied', { command: cmdStr });
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
    if (card.lifecycle === 'idle') {
      const col = KANBAN_COLUMNS.find(c => c.id === card.status);
      startDialogCard = { card, from: col?.label || card.status, to: col?.label || card.status };
    } else if (card.lifecycle === 'started' || card.lifecycle === 'running') {
      pauseDialogCard = card;
    } else if (card.lifecycle === 'paused') {
      resumeDialogCard = card;
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
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropUp = spaceBelow < menuHeight && rect.top > menuHeight;
      agentMenuPos = {
        top: dropUp ? rect.top - 4 : rect.bottom + 4,
        left: rect.left,
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
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="kanban-overlay" onclick={closeAgentMenu}>
  <!-- Header bar -->
  <div class="kanban-header">
    <div class="kanban-title-area">
      <div class="kanban-title">SDLC Board</div>
      <div class="kanban-subtitle">{totalCards} items</div>
    </div>
    <div class="kanban-filters">
      <input
        class="kanban-search"
        type="text"
        placeholder="Search..."
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
        title={sortByPriority ? 'Sorting by priority score (descending)' : 'Click to sort by priority'}
      >
        &#x21F5; {sortByPriority ? 'Priority' : 'Name'}
      </button>
      <button class="cmd-toggle" onclick={toggleCommandPanel}>CMD</button>
    </div>
  </div>

  <!-- SDLC Pipeline -->
  <div class="kanban-columns">
    {#each KANBAN_COLUMNS as colDef}
      {@const colCards = filteredCards(colDef.id)}
      <div
        class="kanban-column"
        class:drag-over={dragOverCol === colDef.id}
        class:empty-col={colCards.length === 0}
        ondragover={(e) => handleDragOver(e, colDef.id)}
        ondragleave={handleDragLeave}
        ondrop={(e) => handleDrop(e, colDef.id)}
      >
        <div class="column-header">
          <span class="col-dot" style="background: {colDef.color}"></span>
          <span class="col-label" style="color: {colDef.color}">{colDef.label}</span>
          {#if colCards.length > 0}
            <span class="col-count">{colCards.length}</span>
          {/if}
          {#if colDef.id === 'create'}
            <button class="col-add" onclick={(e) => { e.stopPropagation(); showNewCard = true; }}>+</button>
          {/if}
        </div>

        <div class="column-body">
          {#each colCards as card (card.node.id)}
            {@const pri = PRIORITY_MAP[card.type] || { label: 'LOW', cls: 'pri-low' }}
            {@const tags = cardTags(card)}
            {@const prog = cardProgress(card)}
            <div
              class="kanban-card"
              class:dragging={dragNodeId === card.node.id}
              class:card-running={card.lifecycle === 'running'}
              class:card-paused={card.lifecycle === 'paused'}
              class:card-terminal-active={terminalOpen && activeTerminalCard === card.node.id}
              draggable="true"
              ondragstart={(e) => handleDragStart(e, card.node.id)}
              ondragend={handleDragEnd}
              onclick={() => handleCardClick(card)}
            >
              <!-- Card ID + DB sync state -->
              <div class="card-id-row">
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
                  {#if card.lifecycle === 'idle'}&#x25B6;{:else if card.lifecycle === 'started' || card.lifecycle === 'running'}&#x23F8;{:else if card.lifecycle === 'paused'}&#x25B6;{:else if card.lifecycle === 'completed'}&#x2714;{:else if card.lifecycle === 'failed'}&#x2718;{:else}&#x1F512;{/if}
                  {card.lifecycle}
                </button>
              </div>

              <!-- Dependency badges -->
              {#if (card.blockedBy && card.blockedBy.length > 0) || (card.blocking && card.blocking.length > 0)}
                <DependencyBadge
                  cardId={card.node.id}
                  blockedBy={card.blockedBy ?? []}
                  blocking={card.blocking ?? []}
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

<AgentTerminal bind:open={terminalOpen} onActiveTabChange={(id) => activeTerminalCard = id} />

<CommandPanel />

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
  }

  /* ── Header ──────────────────────────────────────────────────────────── */
  .kanban-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .kanban-title-area {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .kanban-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text, #e0e0e0);
    letter-spacing: 0.04em;
  }
  .kanban-subtitle {
    font-size: 10px;
    color: #555;
  }
  .kanban-filters {
    display: flex;
    gap: 6px;
    margin-left: auto;
  }
  .kanban-search {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 10px;
    color: var(--text, #e0e0e0);
    font-family: inherit;
    width: 160px;
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
    border-radius: 5px;
    padding: 5px 8px;
    font-size: 10px;
    color: var(--text, #e0e0e0);
    font-family: inherit;
    outline: none;
    cursor: pointer;
  }

  .cmd-toggle {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 10px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: all 0.15s;
  }
  .cmd-toggle:hover {
    color: #00e5ff;
    border-color: rgba(0,229,255,0.3);
  }

  /* ── Columns layout ────────────────────────────────────────────────── */
  .kanban-columns {
    display: flex;
    gap: 10px;
    padding: 14px 16px;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
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
  }
  .col-dot {
    width: 8px;
    height: 8px;
    border-radius: 3px;
    flex-shrink: 0;
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
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 10px;
    font-weight: 700;
    color: #666;
    font-family: inherit;
    cursor: pointer;
    letter-spacing: 0.06em;
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
    flex-shrink: 0;
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
</style>
