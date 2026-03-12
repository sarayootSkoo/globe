<script lang="ts">
  import { ipcConnected, lastEvent, ipcStatus, startPolling, stopPolling } from '../../lib/stores/ipcBridge';
  import type { KanbanEvent } from '../../lib/types';

  let connected = $state(false);
  let event = $state<KanbanEvent | null>(null);
  let polling = $state(false);

  $effect(() => {
    const unsub1 = ipcConnected.subscribe(v => { connected = v; });
    const unsub2 = lastEvent.subscribe(v => { event = v; });
    return () => { unsub1(); unsub2(); };
  });

  function formatTime(isoString: string): string {
    const d = new Date(isoString);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    const s = d.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  function togglePolling(): void {
    if (polling) {
      stopPolling();
      polling = false;
    } else {
      startPolling();
      polling = true;
    }
  }

  /** Shorten event type for compact display: "command:progress" → "progress" */
  function shortType(type: string): string {
    const parts = type.split(':');
    return parts[parts.length - 1] ?? type;
  }
</script>

<div class="ipc-indicator" class:connected>
  <!-- Status dot -->
  <span class="dot" class:dot-green={connected} class:dot-red={!connected}></span>

  <!-- Label and last event info -->
  <div class="ipc-info">
    <span class="ipc-label">{connected ? 'IPC' : 'IPC'}</span>
    {#if event}
      <span class="ipc-event">{shortType(event.type)}</span>
      <span class="ipc-time">{formatTime(event.timestamp)}</span>
    {:else}
      <span class="ipc-event ipc-none">idle</span>
    {/if}
  </div>

  <!-- Poll toggle -->
  <button
    class="poll-toggle"
    class:active={polling}
    onclick={togglePolling}
    title={polling ? 'Stop polling' : 'Start polling'}
  >
    {polling ? '\u25A0' : '\u25B6'}
  </button>
</div>

<style>
  .ipc-indicator {
    position: fixed;
    bottom: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(13, 15, 22, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    padding: 4px 8px;
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 10px;
    color: #666;
    z-index: 999;
    backdrop-filter: blur(6px);
    transition: border-color 0.2s;
    user-select: none;
  }

  .ipc-indicator.connected {
    border-color: rgba(0, 255, 136, 0.18);
  }

  /* Status dot */
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot-green {
    background: #00ff88;
    box-shadow: 0 0 5px rgba(0, 255, 136, 0.6);
    animation: pulse-green 2s ease-in-out infinite;
  }

  .dot-red {
    background: #ff4444;
    box-shadow: 0 0 4px rgba(255, 68, 68, 0.4);
  }

  @keyframes pulse-green {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }

  /* Info area */
  .ipc-info {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .ipc-label {
    font-weight: 700;
    color: #555;
    letter-spacing: 0.04em;
  }

  .ipc-event {
    color: #00e5ff;
    font-size: 9px;
    letter-spacing: 0.02em;
  }

  .ipc-none {
    color: #444;
  }

  .ipc-time {
    color: #444;
    font-size: 9px;
  }

  /* Poll toggle button */
  .poll-toggle {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    color: #555;
    font-size: 8px;
    padding: 2px 5px;
    cursor: pointer;
    font-family: inherit;
    line-height: 1;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
    flex-shrink: 0;
  }

  .poll-toggle:hover {
    color: #aaa;
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.04);
  }

  .poll-toggle.active {
    color: #00ff88;
    border-color: rgba(0, 255, 136, 0.3);
    background: rgba(0, 255, 136, 0.06);
  }

  .poll-toggle.active:hover {
    background: rgba(0, 255, 136, 0.1);
  }
</style>
