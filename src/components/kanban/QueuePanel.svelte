<script lang="ts">
  import { agentQueue, dequeueCard, maxConcurrent, autoAdvanceEnabled } from '../../lib/stores/agentQueue';
  import { agentLiveStatuses, markSessionClosed, agentConsoleOutput, ptySessionMap } from '../../lib/stores/agentEventStore';
  import { kanbanCards, updateLifecycle } from '../../lib/stores/kanbanState';
  import { agentHealthSnapshot } from '../../lib/stores/agentHealth';
  import type { AgentQueueItem, AgentHealthSnapshot, AgentLiveStatus, KanbanCard } from '../../lib/types';

  // ── Props ─────────────────────────────────────────────────────────────────
  interface Props {
    open?: boolean;
  }

  let { open = $bindable(false) }: Props = $props();

  // ── Constants ─────────────────────────────────────────────────────────────
  const EVENT_SERVER = 'http://localhost:4010';
  const MAX_RECENT_HISTORY = 5;

  // ── Reactive state bridged from Svelte 4 stores ──────────────────────────
  let queue = $state<AgentQueueItem[]>([]);
  $effect(() => {
    const u = agentQueue.subscribe(v => { queue = v; });
    return u;
  });

  let health = $state<AgentHealthSnapshot>({
    runningCount: 0,
    queueDepth: 0,
    maxConcurrent: 2,
    totalLaunched: 0,
    totalCompleted: 0,
    totalFailed: 0,
    avgDurationMs: 0,
    isAtCapacity: false,
  });
  $effect(() => {
    const u = agentHealthSnapshot.subscribe(v => { health = v; });
    return u;
  });

  let statusMap = $state(new Map<string, AgentLiveStatus>());
  $effect(() => {
    const u = agentLiveStatuses.subscribe(v => { statusMap = v; });
    return u;
  });

  let cards = $state<KanbanCard[]>([]);
  $effect(() => {
    const u = kanbanCards.subscribe(v => { cards = v; });
    return u;
  });

  let concurrency = $state(2);
  $effect(() => {
    const u = maxConcurrent.subscribe(v => { concurrency = v; });
    return u;
  });

  let autoAdvance = $state(false);
  $effect(() => {
    const u = autoAdvanceEnabled.subscribe(v => { autoAdvance = v; });
    return u;
  });

  // ── Derived data ──────────────────────────────────────────────────────────

  /** Running items from the live status map */
  let runningItems = $derived(
    [...statusMap.entries()]
      .filter(([, s]) => s.state === 'working')
      .map(([key, s]) => ({ key, status: s }))
  );

  /** Recently completed or failed items (last N) */
  let recentHistory = $derived(
    [...statusMap.entries()]
      .filter(([, s]) => s.state === 'done' || s.state === 'error')
      .map(([key, s]) => ({ key, status: s }))
      .slice(-MAX_RECENT_HISTORY)
      .reverse()
  );

  // ── Elapsed time ticker ───────────────────────────────────────────────────
  let now = $state(Date.now());
  let tickInterval: ReturnType<typeof setInterval> | null = null;

  $effect(() => {
    if (open) {
      tickInterval = setInterval(() => { now = Date.now(); }, 1000);
    }
    return () => {
      if (tickInterval) {
        clearInterval(tickInterval);
        tickInterval = null;
      }
    };
  });

  // ── Helpers ───────────────────────────────────────────────────────────────

  function cardTitle(cardId: string): string {
    const card = cards.find(c => c.node.id === cardId);
    if (card) return card.node.label.slice(0, 36);
    return cardId.length > 24 ? cardId.slice(0, 20) + '...' : cardId;
  }

  function elapsedStr(fromMs: number): string {
    const diff = Math.max(0, Math.floor((now - fromMs) / 1000));
    if (diff < 60) return `${diff}s`;
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    if (m < 60) return `${m}m ${s}s`;
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
  }

  function elapsedFromIso(iso?: string): string {
    if (!iso) return '--';
    const ms = new Date(iso).getTime();
    if (isNaN(ms)) return '--';
    return elapsedStr(ms);
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  function cancelQueued(cardId: string) {
    dequeueCard(cardId);
    updateLifecycle(cardId, 'idle');
  }

  function stopRunning(cardId: string) {
    markSessionClosed(cardId);
    fetch(`${EVENT_SERVER}/agent/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId, sessionId: cardId }),
    }).catch(() => {});
    updateLifecycle(cardId, 'paused', 'user_pause');
    // Remove from live statuses
    agentLiveStatuses.update(m => {
      const next = new Map(m);
      next.delete(cardId);
      return next;
    });
  }

  function clearQueue() {
    const ids = queue.map(q => q.cardId);
    agentQueue.set([]);
    for (const id of ids) {
      updateLifecycle(id, 'idle');
    }
  }

  let emergencyStopping = $state(false);

  async function emergencyStop() {
    emergencyStopping = true;
    // Clear the queue
    const queuedIds = queue.map(q => q.cardId);
    agentQueue.set([]);
    for (const id of queuedIds) {
      updateLifecycle(id, 'idle');
    }
    // Stop all running agents
    try {
      await fetch(`${EVENT_SERVER}/agent/stop-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'emergency_stop' }),
      });
    } catch {
      // best-effort
    }
    // Clear live statuses
    for (const [key] of statusMap) {
      markSessionClosed(key);
      updateLifecycle(key, 'paused', 'user_pause');
    }
    agentLiveStatuses.set(new Map());
    agentConsoleOutput.set(new Map());
    ptySessionMap.set(new Map());
    emergencyStopping = false;
  }

  function closePanel() {
    open = false;
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="backdrop" onclick={closePanel}></div>

  <div class="queue-panel">
    <!-- Header -->
    <div class="panel-header">
      <div class="header-left">
        <span class="header-icon">&#x25B6;</span>
        <span class="header-title">AGENT QUEUE</span>
        {#if health.queueDepth > 0}
          <span class="depth-badge">{health.queueDepth}</span>
        {/if}
        {#if health.runningCount > 0}
          <span class="running-badge">{health.runningCount} running</span>
        {/if}
        {#if health.isAtCapacity}
          <span class="capacity-badge">AT CAPACITY</span>
        {/if}
      </div>
      <div class="header-right">
        {#if queue.length > 0}
          <button class="btn btn-clear" onclick={clearQueue} title="Remove all queued items">
            Clear Queue
          </button>
        {/if}
        <button
          class="btn btn-emergency"
          onclick={emergencyStop}
          disabled={emergencyStopping}
          title="Stop all running agents and clear queue"
        >
          {emergencyStopping ? 'Stopping...' : 'Emergency Stop'}
        </button>
        <button class="btn-close" onclick={closePanel} title="Close panel">&#x2715;</button>
      </div>
    </div>

    <!-- Stats bar -->
    <div class="stats-bar">
      <span class="stat">
        <span class="stat-label">Concurrent</span>
        <span class="stat-value">{health.runningCount}/{concurrency}</span>
      </span>
      <span class="stat">
        <span class="stat-label">Launched</span>
        <span class="stat-value">{health.totalLaunched}</span>
      </span>
      <span class="stat">
        <span class="stat-label">Completed</span>
        <span class="stat-value stat-green">{health.totalCompleted}</span>
      </span>
      <span class="stat">
        <span class="stat-label">Failed</span>
        <span class="stat-value stat-red">{health.totalFailed}</span>
      </span>
      {#if health.avgDurationMs > 0}
        <span class="stat">
          <span class="stat-label">Avg Time</span>
          <span class="stat-value">{Math.round(health.avgDurationMs / 1000)}s</span>
        </span>
      {/if}
      <span class="stat stat-toggle">
        <span class="stat-label">Auto-advance</span>
        <button
          class="toggle-pill"
          class:toggle-on={autoAdvance}
          onclick={() => autoAdvanceEnabled.set(!autoAdvance)}
        >
          {autoAdvance ? 'ON' : 'OFF'}
        </button>
      </span>
    </div>

    <!-- Scrollable content -->
    <div class="panel-body">
      <!-- Running section -->
      {#if runningItems.length > 0}
        <div class="section">
          <div class="section-header">
            <span class="section-dot dot-running"></span>
            <span class="section-title">RUNNING</span>
            <span class="section-count">{runningItems.length}</span>
          </div>
          {#each runningItems as item (item.key)}
            <div class="queue-item item-running">
              <div class="item-main">
                <span class="item-title">{cardTitle(item.key)}</span>
                {#if item.status.lastAction}
                  <span class="item-command">{item.status.lastAction}</span>
                {/if}
              </div>
              <div class="item-meta">
                <span class="item-elapsed">{elapsedFromIso(item.status.startedAt)}</span>
                {#if item.status.progress != null && item.status.progress > 0}
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: {item.status.progress}%"></div>
                  </div>
                {/if}
                <button
                  class="btn btn-stop"
                  onclick={() => stopRunning(item.key)}
                  title="Stop this agent"
                >
                  Stop
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Queued section -->
      {#if queue.length > 0}
        <div class="section">
          <div class="section-header">
            <span class="section-dot dot-queued"></span>
            <span class="section-title">QUEUED</span>
            <span class="section-count">{queue.length}</span>
          </div>
          {#each queue as item (item.cardId)}
            <div class="queue-item item-queued">
              <div class="item-main">
                <span class="item-title">{cardTitle(item.cardId)}</span>
                <span class="item-command">{item.command} {item.args}</span>
              </div>
              <div class="item-meta">
                <span class="item-elapsed">{elapsedStr(item.enqueuedAt)}</span>
                {#if item.retryCount > 0}
                  <span class="retry-badge">retry #{item.retryCount}</span>
                {/if}
                <span class="priority-badge">P{item.priority}</span>
                <button
                  class="btn btn-cancel"
                  onclick={() => cancelQueued(item.cardId)}
                  title="Remove from queue"
                >
                  Cancel
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Recent history section -->
      {#if recentHistory.length > 0}
        <div class="section">
          <div class="section-header">
            <span class="section-dot dot-history"></span>
            <span class="section-title">RECENT</span>
            <span class="section-count">{recentHistory.length}</span>
          </div>
          {#each recentHistory as item (item.key)}
            <div
              class="queue-item item-history"
              class:item-done={item.status.state === 'done'}
              class:item-failed={item.status.state === 'error'}
            >
              <div class="item-main">
                <span class="item-title">{cardTitle(item.key)}</span>
                <span class="item-command">{item.status.lastAction ?? '--'}</span>
              </div>
              <div class="item-meta">
                <span
                  class="status-tag"
                  class:tag-done={item.status.state === 'done'}
                  class:tag-error={item.status.state === 'error'}
                >
                  {item.status.state === 'done' ? 'Completed' : 'Failed'}
                </span>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Empty state -->
      {#if runningItems.length === 0 && queue.length === 0 && recentHistory.length === 0}
        <div class="empty-state">
          <span class="empty-icon">&#x25B6;</span>
          <span class="empty-text">Queue is empty</span>
          <span class="empty-sub">Enqueue cards to start agent pipeline</span>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* ── Backdrop ───────────────────────────────────────────────────────────── */
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 199;
    background: rgba(0, 0, 0, 0.3);
  }

  /* ── Panel ──────────────────────────────────────────────────────────────── */
  .queue-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
    width: 520px;
    max-width: calc(100vw - 40px);
    max-height: calc(100vh - 80px);
    background: #0d1117;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    font-family: 'JetBrains Mono', monospace;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 229, 255, 0.08);
    animation: panel-in 0.15s ease-out;
    overflow: hidden;
  }

  @keyframes panel-in {
    from { opacity: 0; transform: translate(-50%, -48%); }
    to   { opacity: 1; transform: translate(-50%, -50%); }
  }

  /* ── Header ─────────────────────────────────────────────────────────────── */
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #161922;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-icon {
    font-size: 10px;
    color: #00e5ff;
    opacity: 0.7;
  }

  .header-title {
    font-size: 10px;
    font-weight: 700;
    color: #9098a8;
    letter-spacing: 0.1em;
  }

  .depth-badge {
    background: #00e5ff;
    color: #0d1117;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
  }

  .running-badge {
    font-size: 9px;
    font-weight: 600;
    color: #00ff88;
    background: rgba(0, 255, 136, 0.08);
    border: 1px solid rgba(0, 255, 136, 0.2);
    padding: 1px 6px;
    border-radius: 4px;
    letter-spacing: 0.04em;
  }

  .capacity-badge {
    font-size: 8px;
    font-weight: 700;
    color: #ff5555;
    background: rgba(255, 85, 85, 0.1);
    border: 1px solid rgba(255, 85, 85, 0.25);
    padding: 1px 5px;
    border-radius: 4px;
    letter-spacing: 0.06em;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* ── Buttons ────────────────────────────────────────────────────────────── */
  .btn {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 9px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.12s;
    letter-spacing: 0.04em;
  }

  .btn-clear {
    color: #9098a8;
  }
  .btn-clear:hover {
    color: #00e5ff;
    border-color: rgba(0, 229, 255, 0.3);
    background: rgba(0, 229, 255, 0.06);
  }

  .btn-emergency {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.3);
    background: rgba(255, 85, 85, 0.06);
  }
  .btn-emergency:hover:not(:disabled) {
    background: rgba(255, 85, 85, 0.15);
    border-color: rgba(255, 85, 85, 0.5);
    box-shadow: 0 0 8px rgba(255, 85, 85, 0.2);
  }
  .btn-emergency:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .btn-stop {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.25);
    font-size: 9px;
    padding: 2px 6px;
  }
  .btn-stop:hover {
    background: rgba(255, 85, 85, 0.12);
    border-color: rgba(255, 85, 85, 0.4);
  }

  .btn-cancel {
    color: #9098a8;
    border-color: rgba(255, 255, 255, 0.08);
    font-size: 9px;
    padding: 2px 6px;
  }
  .btn-cancel:hover {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.3);
    background: rgba(255, 85, 85, 0.06);
  }

  .btn-close {
    background: none;
    border: none;
    color: #555;
    font-size: 14px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    transition: all 0.12s;
    font-family: inherit;
    line-height: 1;
  }
  .btn-close:hover {
    color: #ccc;
    background: rgba(255, 255, 255, 0.06);
  }

  /* ── Stats bar ──────────────────────────────────────────────────────────── */
  .stats-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 14px;
    background: rgba(22, 25, 34, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .stat-label {
    font-size: 9px;
    color: #555;
    letter-spacing: 0.04em;
  }

  .stat-value {
    font-size: 10px;
    font-weight: 600;
    color: #9098a8;
  }

  .stat-green { color: #00ff88; }
  .stat-red { color: #ff5555; }

  .stat-toggle {
    margin-left: auto;
  }

  .toggle-pill {
    font-size: 8px;
    font-weight: 700;
    font-family: inherit;
    padding: 1px 6px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #555;
    cursor: pointer;
    transition: all 0.12s;
    letter-spacing: 0.06em;
  }

  .toggle-pill.toggle-on {
    color: #00ff88;
    border-color: rgba(0, 255, 136, 0.3);
    background: rgba(0, 255, 136, 0.08);
  }

  /* ── Panel body ─────────────────────────────────────────────────────────── */
  .panel-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
    min-height: 120px;
    max-height: 400px;
  }
  .panel-body::-webkit-scrollbar {
    width: 5px;
  }
  .panel-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 3px;
  }

  /* ── Sections ───────────────────────────────────────────────────────────── */
  .section {
    margin-bottom: 4px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    user-select: none;
  }

  .section-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot-running {
    background: #00ff88;
    box-shadow: 0 0 6px #00ff88;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .dot-queued {
    background: #00e5ff;
    opacity: 0.7;
  }

  .dot-history {
    background: #555;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }

  .section-title {
    font-size: 9px;
    font-weight: 700;
    color: #555;
    letter-spacing: 0.1em;
  }

  .section-count {
    font-size: 9px;
    color: #444;
  }

  /* ── Queue items ────────────────────────────────────────────────────────── */
  .queue-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 14px;
    gap: 8px;
    transition: background 0.1s;
  }

  .queue-item:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .item-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }

  .item-title {
    font-size: 11px;
    font-weight: 600;
    color: #b8c0cc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-command {
    font-size: 9px;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .item-elapsed {
    font-size: 9px;
    color: #9098a8;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* Running item accent */
  .item-running {
    border-left: 2px solid rgba(0, 255, 136, 0.4);
  }

  .item-running .item-title {
    color: #e0e0e0;
  }

  /* Queued item accent */
  .item-queued {
    border-left: 2px solid rgba(0, 229, 255, 0.25);
  }

  /* History items */
  .item-history {
    opacity: 0.6;
    border-left: 2px solid transparent;
  }

  .item-done {
    border-left-color: rgba(0, 255, 136, 0.2);
  }

  .item-failed {
    border-left-color: rgba(255, 85, 85, 0.2);
  }

  /* ── Progress bar ───────────────────────────────────────────────────────── */
  .progress-bar {
    width: 40px;
    height: 3px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .progress-fill {
    height: 100%;
    background: #00ff88;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* ── Badges ─────────────────────────────────────────────────────────────── */
  .retry-badge {
    font-size: 8px;
    font-weight: 600;
    color: #ffaa00;
    background: rgba(255, 170, 0, 0.08);
    border: 1px solid rgba(255, 170, 0, 0.2);
    padding: 0 4px;
    border-radius: 3px;
    white-space: nowrap;
  }

  .priority-badge {
    font-size: 8px;
    font-weight: 600;
    color: #666;
    white-space: nowrap;
  }

  .status-tag {
    font-size: 9px;
    font-weight: 600;
    padding: 1px 5px;
    border-radius: 3px;
    white-space: nowrap;
  }

  .tag-done {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.08);
  }

  .tag-error {
    color: #ff5555;
    background: rgba(255, 85, 85, 0.08);
  }

  /* ── Empty state ────────────────────────────────────────────────────────── */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    gap: 6px;
  }

  .empty-icon {
    font-size: 24px;
    color: #333;
  }

  .empty-text {
    font-size: 12px;
    color: #444;
  }

  .empty-sub {
    font-size: 10px;
    color: #333;
  }
</style>
