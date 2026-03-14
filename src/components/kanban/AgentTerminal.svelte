<script lang="ts">
  import {
    agentConsoleOutput,
    agentLiveStatuses,
    wsConnected,
    loadLogsForCard,
    markSessionClosed,
    ptySessionMap,
  } from '../../lib/stores/agentEventStore';
  import { kanbanCards, updateLifecycle } from '../../lib/stores/kanbanState';
  import XtermTerminal from './XtermTerminal.svelte';
  import type { ConsoleLine } from '../../lib/stores/agentEventStore';
  import type { AgentLiveStatus, KanbanCard } from '../../lib/types';

  // ── Props ─────────────────────────────────────────────────────────────────
  interface Props {
    open?: boolean;
    onToggle?: () => void;
    onActiveTabChange?: (cardId: string | null) => void;
  }

  let { open = $bindable(false), onToggle, onActiveTabChange }: Props = $props();

  // ── Reactive state bridged from Svelte 4 stores ───────────────────────────
  let outputMap = $state(new Map<string, ConsoleLine[]>());
  let statusMap = $state(new Map<string, AgentLiveStatus>());
  let cards = $state<KanbanCard[]>([]);
  let connected = $state(false);

  $effect(() => {
    const u1 = agentConsoleOutput.subscribe(v => { outputMap = v; });
    return u1;
  });
  $effect(() => {
    const u2 = agentLiveStatuses.subscribe(v => { statusMap = v; });
    return u2;
  });
  $effect(() => {
    const u3 = wsConnected.subscribe(v => { connected = v; });
    return u3;
  });
  $effect(() => {
    const u4 = kanbanCards.subscribe(v => { cards = v; });
    return u4;
  });

  let ptyMap = $state(new Map<string, string>());
  $effect(() => {
    const u5 = ptySessionMap.subscribe(v => { ptyMap = v; });
    return u5;
  });

  // ── Active sessions — any key that has output OR a live status ─────────────
  let sessions = $derived((): string[] => {
    const keys = new Set<string>();
    for (const k of outputMap.keys()) keys.add(k);
    for (const k of statusMap.keys()) keys.add(k);
    return [...keys];
  });

  // Active tab
  let activeTab = $state<string | null>(null);

  // When sessions list changes, auto-select first if none selected
  $effect(() => {
    const list = sessions();
    if (list.length > 0 && (activeTab === null || !list.includes(activeTab))) {
      activeTab = list[0];
    } else if (list.length === 0) {
      activeTab = null;
    }
  });

  // Notify parent when activeTab changes
  $effect(() => {
    onActiveTabChange?.(activeTab);
  });

  // Auto-open when a new session starts running
  $effect(() => {
    for (const [, status] of statusMap) {
      if (status.state === 'working') {
        open = true;
        break;
      }
    }
  });

  // Load persisted logs from DB when tab becomes active and has no output
  let loadedKeys = new Set<string>();
  $effect(() => {
    if (!activeTab) return;
    const lines = outputMap.get(activeTab) ?? [];
    if (lines.length === 0 && !loadedKeys.has(activeTab)) {
      loadedKeys.add(activeTab);
      loadLogsForCard(activeTab);
    }
  });

  // ── Per-tab cleared lines (keys cleared by the clear button) ──────────────
  let clearedAt = $state<Map<string, number>>(new Map());

  /** Terminate ALL sessions and clear all tabs */
  function closeAllSessions() {
    const allKeys = [...sessions()];
    // Mark all as closed first to prevent ghost events
    for (const key of allKeys) {
      markSessionClosed(key);
      updateLifecycle(key, 'paused', 'user_pause');
    }
    // Stop all agents on server in one call
    fetch(`${EVENT_SERVER}/agent/stop-all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: 'user_clear_all' }),
    }).catch(() => { /* best-effort */ });
    // Clear all stores
    agentConsoleOutput.set(new Map());
    agentLiveStatuses.set(new Map());
    ptySessionMap.set(new Map());
    clearedAt = new Map();
    loadedKeys = new Set();
    activeTab = null;
  }

  /** Close a session tab — stops the agent process, removes output + status, switches to next tab */
  function closeTab(key: string) {
    // Mark as closed BEFORE the stop request so the resulting command:failed event is ignored
    markSessionClosed(key);

    // Kill the agent process on the server (by cardId since key is typically the cardId)
    fetch(`${EVENT_SERVER}/agent/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId: key, sessionId: key }),
    }).catch(() => { /* best-effort */ });

    // Reset card lifecycle to paused (user manually closed)
    updateLifecycle(key, 'paused', 'user_pause');

    // Remove from stores
    agentConsoleOutput.update(m => { const next = new Map(m); next.delete(key); return next; });
    agentLiveStatuses.update(m => { const next = new Map(m); next.delete(key); return next; });
    ptySessionMap.update(m => { const next = new Map(m); next.delete(key); return next; });
    // Clean up local state
    const nextCleared = new Map(clearedAt);
    nextCleared.delete(key);
    clearedAt = nextCleared;
    loadedKeys.delete(key);
    // Switch tab
    if (activeTab === key) {
      const list = sessions().filter(k => k !== key);
      activeTab = list.length > 0 ? list[0] : null;
    }
  }

  function visibleLines(key: string): ConsoleLine[] {
    const lines = outputMap.get(key) ?? [];
    const offset = clearedAt.get(key) ?? 0;
    return lines.slice(offset);
  }

  // ── Panel height resize ───────────────────────────────────────────────────
  let panelHeight = $state(300);
  let resizing = $state(false);
  let resizeStartY = $state(0);
  let resizeStartH = $state(0);

  function onResizeMouseDown(e: MouseEvent) {
    resizing = true;
    resizeStartY = e.clientY;
    resizeStartH = panelHeight;
    e.preventDefault();
  }

  $effect(() => {
    if (!resizing) return;

    function onMove(e: MouseEvent) {
      const delta = resizeStartY - e.clientY;
      panelHeight = Math.max(120, Math.min(window.innerHeight - 120, resizeStartH + delta));
    }

    function onUp() {
      resizing = false;
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  });

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  let bodyEl = $state<HTMLElement | null>(null);

  $effect(() => {
    // Re-run whenever outputMap or activeTab changes so we scroll on new lines
    const lines = activeTab ? (outputMap.get(activeTab) ?? []) : [];
    lines; // read to establish dependency
    if (bodyEl) {
      // Use requestAnimationFrame so DOM has updated before measuring
      requestAnimationFrame(() => {
        if (bodyEl) bodyEl.scrollTop = bodyEl.scrollHeight;
      });
    }
  });

  // ── Helpers ───────────────────────────────────────────────────────────────
  function formatTime(isoOrTs: string): string {
    try {
      const d = new Date(isoOrTs);
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    } catch {
      return '--:--:--';
    }
  }

  function tabLabel(key: string): string {
    // Try to find card title by ID
    const card = cards.find(c => c.node.id === key);
    if (card) return card.node.label.slice(0, 28);
    // Try status map — it may have a label or command that's more readable
    const status = statusMap.get(key);
    if (status?.lastAction && status.lastAction.length > 3) return status.lastAction.slice(0, 28);
    // Fallback: use basename of key (trim long UUIDs)
    const parts = key.split(/[/\\]/);
    const base = parts[parts.length - 1] || key;
    const clean = base.replace(/\.[^.]+$/, '');
    return clean.length > 22 ? clean.slice(0, 18) + '...' : clean;
  }

  function statusFor(key: string): AgentLiveStatus | undefined {
    return statusMap.get(key);
  }

  function togglePanel() {
    open = !open;
    onToggle?.();
  }

  // Running session count — used by the toggle button badge
  let runningCount = $derived(
    [...statusMap.values()].filter(s => s.state === 'working').length
  );

  // ── Input field for sending messages to agent ───────────────────────────
  const EVENT_SERVER = 'http://localhost:4010';
  let inputText = $state('');
  let sending = $state(false);

  async function sendMessage() {
    const msg = inputText.trim();
    if (!msg || sending) return;

    // Find session info for the active tab (use it as cardId)
    const cardId = activeTab || null;

    // Find any running session for this card
    let targetSession: string | null = null;
    for (const [, status] of statusMap) {
      if (status.nodeId === cardId && status.state === 'working') {
        targetSession = cardId;
        break;
      }
    }

    sending = true;
    inputText = '';

    try {
      const res = await fetch(`${EVENT_SERVER}/agent/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: targetSession, message: msg, cardId }),
      });
      if (!res.ok) {
        console.error('[AgentTerminal] send failed:', await res.text());
      }
    } catch (err) {
      console.error('[AgentTerminal] send error:', err);
    }
    sending = false;
  }

  function handleInputKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<!-- ── Floating toggle button (bottom-right corner) ──────────────────────── -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<button
  class="terminal-fab"
  class:fab-open={open}
  onclick={togglePanel}
  title={open ? 'Close terminal panel' : 'Open agent terminal'}
>
  <span class="fab-icon">&#x276F;_</span>
  <span class="fab-label">Terminal</span>
  {#if runningCount > 0}
    <span class="fab-badge">{runningCount}</span>
  {:else if !connected}
    <span class="fab-dot fab-dot-offline" title="WebSocket disconnected"></span>
  {:else}
    <span class="fab-dot fab-dot-idle"></span>
  {/if}
</button>

<!-- ── Terminal panel ──────────────────────────────────────────────────────── -->
{#if open}
  <div
    class="terminal-panel"
    style="height: {panelHeight}px;"
  >
    <!-- Resize handle -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="resize-handle"
      class:resizing
      onmousedown={onResizeMouseDown}
    ></div>

    <!-- Tab bar -->
    <div class="tab-bar">
      <div class="tab-bar-left">
        <span class="panel-icon">&#x276F;_</span>
        <span class="panel-title">AGENT TERMINAL</span>
        {#if !connected}
          <span class="ws-badge ws-off" title="WebSocket disconnected">OFFLINE</span>
        {:else}
          <span class="ws-badge ws-on" title="WebSocket connected">LIVE</span>
        {/if}
      </div>

      <div class="tabs-scroll">
        {#each sessions() as key (key)}
          {@const status = statusFor(key)}
          {@const state = status?.state ?? 'idle'}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="tab"
            class:tab-active={activeTab === key}
            onclick={() => { activeTab = key; }}
            title={key}
          >
            <span
              class="tab-dot"
              class:dot-running={state === 'working'}
              class:dot-done={state === 'done'}
              class:dot-error={state === 'error'}
              class:dot-idle={state === 'idle'}
            ></span>
            <span class="tab-label">{tabLabel(key)}</span>
            <button
              class="tab-close"
              onclick={(e) => { e.stopPropagation(); closeTab(key); }}
              title="Close session"
            >&#x2715;</button>
          </div>
        {/each}
      </div>

      <div class="tab-bar-right">
        {#if sessions().length > 0}
          <button
            class="clear-btn"
            onclick={closeAllSessions}
            title="Terminate all agents and close all tabs"
          >
            Clear All
          </button>
        {/if}
        <button class="close-btn" onclick={togglePanel} title="Minimize terminal">&#x2715;</button>
      </div>
    </div>

    <!-- Terminal body -->
    {#if sessions().length === 0}
      <div class="terminal-body" bind:this={bodyEl}>
        <div class="no-agents">
          <span class="no-agents-icon">&#x276F;_</span>
          <span>No active agents</span>
          <span class="no-agents-sub">Launch a Claude agent to see output here</span>
        </div>
      </div>
    {:else if activeTab && ptyMap.has(activeTab)}
      <!-- PTY session: render full xterm.js terminal -->
      <div class="terminal-body xterm-body">
        <XtermTerminal sessionId={ptyMap.get(activeTab) ?? ''} cardId={activeTab} />
      </div>
    {:else if activeTab}
      <div class="terminal-body" bind:this={bodyEl}>
        {#if visibleLines(activeTab).length === 0}
          <div class="empty-output">No output yet...</div>
        {:else}
          {#each visibleLines(activeTab) as line (line.timestamp + line.text)}
            <div class="line" class:line-stderr={line.stream === 'stderr'}>
              <span class="line-ts">[{formatTime(line.timestamp)}]</span>
              <span class="line-text">{line.text}</span>
            </div>
          {/each}
        {/if}
      </div>
    {:else}
      <div class="terminal-body" bind:this={bodyEl}></div>
    {/if}

    <!-- Input bar for non-PTY sessions (PTY sessions handle input via xterm) -->
    {#if activeTab && !ptyMap.has(activeTab)}
      <div class="input-bar">
        <span class="input-prompt">&#x276F;</span>
        <input
          class="input-field"
          type="text"
          placeholder="Send a message to the agent..."
          bind:value={inputText}
          onkeydown={handleInputKeydown}
          disabled={sending}
        />
        <button
          class="send-btn"
          onclick={sendMessage}
          disabled={!inputText.trim() || sending}
        >
          {sending ? '...' : 'Send'}
        </button>
      </div>
    {/if}
  </div>
{/if}

<style>
  /* ── FAB (floating action button) ─────────────────────────────────────────── */
  .terminal-fab {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 140;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: #161922;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #9098a8;
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.04em;
  }
  .terminal-fab:hover {
    background: #1e2333;
    border-color: rgba(0, 229, 255, 0.3);
    color: #00e5ff;
  }
  .terminal-fab.fab-open {
    background: #1a1f2e;
    border-color: rgba(0, 229, 255, 0.4);
    color: #00e5ff;
  }

  .fab-icon {
    font-size: 12px;
    opacity: 0.7;
  }
  .fab-label {
    letter-spacing: 0.06em;
  }
  .fab-badge {
    background: #00e5ff;
    color: #0d1117;
    font-size: 9px;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
  }
  .fab-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .fab-dot-offline {
    background: #ff5555;
  }
  .fab-dot-idle {
    background: #444;
  }

  /* ── Terminal panel ─────────────────────────────────────────────────────── */
  .terminal-panel {
    position: fixed;
    bottom: 0;
    left: 44px;
    right: 0;
    z-index: 150;
    background: #0d1117;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    font-family: var(--font, 'JetBrains Mono', monospace);
    animation: slide-up 0.18s ease-out;
    overflow: hidden;
  }

  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* ── Resize handle ─────────────────────────────────────────────────────── */
  .resize-handle {
    height: 5px;
    cursor: ns-resize;
    background: transparent;
    flex-shrink: 0;
    transition: background 0.12s;
  }
  .resize-handle:hover,
  .resize-handle.resizing {
    background: rgba(0, 229, 255, 0.25);
  }

  /* ── Tab bar ────────────────────────────────────────────────────────────── */
  .tab-bar {
    display: flex;
    align-items: center;
    gap: 0;
    height: 36px;
    background: #161922;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
    overflow: hidden;
  }

  .tab-bar-left {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 14px;
    flex-shrink: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    height: 100%;
  }

  .panel-icon {
    font-size: 12px;
    color: #00e5ff;
    opacity: 0.7;
  }
  .panel-title {
    font-size: 10px;
    font-weight: 700;
    color: #9098a8;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  .ws-badge {
    font-size: 9px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 4px;
    letter-spacing: 0.06em;
  }
  .ws-on {
    color: #00ff88;
    background: rgba(0, 255, 136, 0.08);
    border: 1px solid rgba(0, 255, 136, 0.25);
  }
  .ws-off {
    color: #ff5555;
    background: rgba(255, 85, 85, 0.08);
    border: 1px solid rgba(255, 85, 85, 0.25);
  }

  /* Session tabs */
  .tabs-scroll {
    display: flex;
    align-items: center;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
    scrollbar-width: none;
  }
  .tabs-scroll::-webkit-scrollbar {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 14px;
    height: 100%;
    cursor: pointer;
    font-size: 11px;
    color: #5a6070;
    border-right: 1px solid rgba(255, 255, 255, 0.04);
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.12s;
    user-select: none;
  }
  .tab:hover {
    color: #9098a8;
    background: rgba(255, 255, 255, 0.03);
  }
  .tab.tab-active {
    color: #e0e0e0;
    background: #0d1117;
    border-bottom: 2px solid #00e5ff;
    margin-bottom: -1px;
  }

  /* Status dots on tabs */
  .tab-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-running {
    background: #00ff88;
    box-shadow: 0 0 6px #00ff88;
    animation: tab-pulse 1.5s ease-in-out infinite;
  }
  .dot-done {
    background: #00ff88;
    opacity: 0.5;
  }
  .dot-error {
    background: #ff5555;
  }
  .dot-idle {
    background: #444;
  }

  @keyframes tab-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  .tab-label {
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tab-close {
    background: none;
    border: none;
    color: #444;
    font-size: 10px;
    cursor: pointer;
    padding: 0 2px;
    border-radius: 3px;
    line-height: 1;
    flex-shrink: 0;
    opacity: 0;
    transition: all 0.12s;
  }
  .tab:hover .tab-close {
    opacity: 1;
  }
  .tab-close:hover {
    color: #ff5555;
    background: rgba(255, 85, 85, 0.12);
  }

  /* Right-side controls */
  .tab-bar-right {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 10px;
    flex-shrink: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.06);
    height: 100%;
  }
  .clear-btn {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    padding: 3px 8px;
    font-size: 10px;
    font-family: inherit;
    color: #666;
    cursor: pointer;
    transition: all 0.12s;
  }
  .clear-btn:hover {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.3);
    background: rgba(255, 85, 85, 0.06);
  }
  .close-btn {
    background: none;
    border: none;
    color: #555;
    font-size: 16px;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;
    transition: all 0.12s;
    font-family: inherit;
  }
  .close-btn:hover {
    color: #ccc;
    background: rgba(255, 255, 255, 0.06);
  }

  /* ── Terminal body ──────────────────────────────────────────────────────── */
  .terminal-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
    padding: 8px 14px;
    font-size: 12px;
    line-height: 1.6;
    color: #b8c0cc;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }
  .terminal-body.xterm-body {
    padding: 0;
    overflow: hidden;
  }
  .terminal-body::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .terminal-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  /* Output lines */
  .line {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-height: 19px;
    word-break: break-all;
  }
  .line:hover {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 3px;
    margin: 0 -4px;
    padding: 0 4px;
  }

  .line-ts {
    color: #444;
    font-size: 10px;
    flex-shrink: 0;
    padding-top: 2px;
    user-select: none;
  }

  .line-text {
    color: #b0ffa0;
    white-space: pre-wrap;
    word-break: break-word;
    flex: 1;
  }

  .line.line-stderr .line-text {
    color: #ff7070;
  }

  /* Empty / no-agents states */
  .no-agents {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
    color: #444;
    font-size: 12px;
  }
  .no-agents-icon {
    font-size: 28px;
    opacity: 0.3;
  }
  .no-agents-sub {
    font-size: 10px;
    color: #333;
  }

  .empty-output {
    color: #444;
    font-size: 11px;
    padding: 8px 0;
    font-style: italic;
  }

  /* ── Input bar ──────────────────────────────────────────────────────────── */
  .input-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: #161922;
    flex-shrink: 0;
  }

  .input-prompt {
    color: #00e5ff;
    font-size: 13px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .input-field {
    flex: 1;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 12px;
    font-family: inherit;
    color: #e0e0e0;
    outline: none;
    transition: border-color 0.15s;
  }
  .input-field:focus {
    border-color: rgba(0, 229, 255, 0.4);
  }
  .input-field::placeholder {
    color: #444;
  }
  .input-field:disabled {
    opacity: 0.5;
  }

  .send-btn {
    background: rgba(0, 229, 255, 0.12);
    border: 1px solid rgba(0, 229, 255, 0.25);
    border-radius: 6px;
    padding: 7px 16px;
    font-size: 11px;
    font-weight: 700;
    font-family: inherit;
    color: #00e5ff;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .send-btn:hover:not(:disabled) {
    background: rgba(0, 229, 255, 0.22);
    border-color: rgba(0, 229, 255, 0.5);
  }
  .send-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
</style>
