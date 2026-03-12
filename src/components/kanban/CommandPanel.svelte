<script lang="ts">
  import {
    commandPanelOpen, activeCommands, commandHistory,
    clearHistory, toggleCommandPanel, markCompleted,
    queueCommand, markCopied,
  } from '../../lib/stores/commandState';
  import type { QueuedCommand } from '../../lib/stores/commandState';
  import { COMMAND_REGISTRY, getCommandsForColumn } from '../../lib/workflow/commandRegistry';
  import { AGENT_DEFS } from '../../lib/stores/kanbanState';

  let isOpen = $state(false);
  let active = $state<QueuedCommand[]>([]);
  let history = $state<QueuedCommand[]>([]);

  $effect(() => {
    const unsub1 = commandPanelOpen.subscribe(v => { isOpen = v; });
    const unsub2 = activeCommands.subscribe(v => { active = v; });
    const unsub3 = commandHistory.subscribe(v => { history = v; });
    return () => { unsub1(); unsub2(); unsub3(); };
  });

  function timeAgo(ts: number): string {
    const ms = Date.now() - ts;
    const m = Math.floor(ms / 60000);
    if (m < 1) return 'now';
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    return `${h}h`;
  }

  function queueAndCopy(command: string) {
    const args = '';
    const entry = queueCommand(command, args, null);
    markCopied(entry.id);
    navigator.clipboard.writeText(command);
  }

  const STATUS_ICONS: Record<string, string> = {
    pending: '\u{23F3}',
    copied: '\u{1F4CB}',
    running: '\u{1F504}',
    completed: '\u2714',
    failed: '\u2718',
  };

  const STATUS_COLORS: Record<string, string> = {
    pending: '#888',
    copied: '#00e5ff',
    running: '#00ff88',
    completed: '#00ff88',
    failed: '#ff5555',
  };
</script>

{#if isOpen}
  <div class="cmd-panel">
    <div class="panel-header">
      <span class="panel-title">COMMAND CENTER</span>
      <button class="panel-close" onclick={toggleCommandPanel}>&times;</button>
    </div>
    <div class="panel-divider"></div>

    <!-- Active commands -->
    {#if active.length > 0}
      <div class="section">
        <div class="section-label">ACTIVE ({active.length})</div>
        {#each active as cmd}
          <div class="cmd-entry active-entry">
            <span class="cmd-status" style="color: {STATUS_COLORS[cmd.status]}">{STATUS_ICONS[cmd.status]}</span>
            <div class="cmd-info">
              <div class="cmd-name">{cmd.command} {cmd.args}</div>
              <div class="cmd-meta">{timeAgo(cmd.createdAt)} ago</div>
            </div>
            <button class="cmd-done-btn" onclick={() => markCompleted(cmd.id)}>Done</button>
          </div>
        {/each}
      </div>
    {:else}
      <div class="empty-section">No active commands</div>
    {/if}

    <!-- History -->
    <div class="section">
      <div class="section-header">
        <span class="section-label">HISTORY</span>
        {#if history.length > 0}
          <button class="clear-btn" onclick={clearHistory}>Clear</button>
        {/if}
      </div>
      {#if history.length > 0}
        {#each history as cmd}
          <div class="cmd-entry">
            <span class="cmd-status" style="color: {STATUS_COLORS[cmd.status]}">{STATUS_ICONS[cmd.status]}</span>
            <div class="cmd-info">
              <div class="cmd-name">{cmd.command} {cmd.args}</div>
              <div class="cmd-meta">{timeAgo(cmd.createdAt)} ago</div>
            </div>
          </div>
        {/each}
      {:else}
        <div class="empty-history">No command history</div>
      {/if}
    </div>

    <!-- Quick Commands -->
    <div class="section">
      <div class="section-label">QUICK COMMANDS</div>
      <div class="quick-grid">
        {#each ['/chore', '/implement', '/test', '/review', '/validate', '/docs'] as cmd}
          {@const def = COMMAND_REGISTRY[cmd]}
          {@const agent = def ? AGENT_DEFS[def.agent] : null}
          <button class="quick-btn" onclick={() => queueAndCopy(cmd)} title={def?.description || cmd}>
            {#if agent}
              <span class="quick-dot" style="background: {agent.color}"></span>
            {/if}
            <span class="quick-label">{cmd.slice(1)}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .cmd-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: #131620;
    border-left: 1px solid rgba(255,255,255,0.06);
    z-index: 60;
    font-family: var(--font, 'JetBrains Mono', monospace);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
  }
  .panel-title {
    font-size: 12px;
    font-weight: 700;
    color: #e0e0e0;
    letter-spacing: 0.08em;
  }
  .panel-close {
    background: none;
    border: none;
    color: #666;
    font-size: 18px;
    cursor: pointer;
  }
  .panel-close:hover { color: #ccc; }
  .panel-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
  }

  .section {
    padding: 12px 16px;
  }
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .section-label {
    font-size: 10px;
    color: #555;
    font-weight: 700;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
  }
  .clear-btn {
    background: none;
    border: none;
    color: #555;
    font-size: 10px;
    cursor: pointer;
    font-family: inherit;
  }
  .clear-btn:hover { color: #ff5555; }

  .cmd-entry {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px 10px;
    margin-bottom: 4px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 6px;
  }
  .active-entry {
    border-color: rgba(0,229,255,0.15);
    background: rgba(0,229,255,0.03);
  }
  .cmd-status {
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .cmd-info {
    flex: 1;
    min-width: 0;
  }
  .cmd-name {
    font-size: 11px;
    color: #ccc;
    word-break: break-all;
  }
  .cmd-meta {
    font-size: 9px;
    color: #555;
    margin-top: 2px;
  }
  .cmd-done-btn {
    background: rgba(0,255,136,0.08);
    border: 1px solid rgba(0,255,136,0.2);
    border-radius: 4px;
    color: #00ff88;
    font-size: 10px;
    padding: 3px 8px;
    cursor: pointer;
    font-family: inherit;
    flex-shrink: 0;
  }
  .cmd-done-btn:hover {
    background: rgba(0,255,136,0.15);
  }

  .empty-section, .empty-history {
    font-size: 11px;
    color: #444;
    font-style: italic;
    padding: 12px 16px;
  }

  .quick-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;
  }
  .quick-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 5px;
    color: #888;
    font-size: 10px;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.12s;
  }
  .quick-btn:hover {
    background: rgba(0,229,255,0.06);
    border-color: rgba(0,229,255,0.15);
    color: #00e5ff;
  }
  .quick-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .quick-label {
    font-weight: 600;
    letter-spacing: 0.03em;
  }
</style>
