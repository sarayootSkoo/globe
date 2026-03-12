<script lang="ts">
  import { agentLiveStatuses } from '../../lib/stores/agentEventStore';
  import type { AgentLiveStatus } from '../../lib/types';

  interface Props {
    nodeId: string;
  }

  let { nodeId }: Props = $props();

  let status = $state<AgentLiveStatus | null>(null);

  $effect(() => {
    const unsub = agentLiveStatuses.subscribe(map => {
      status = map.get(nodeId) ?? null;
    });
    return unsub;
  });

  // ── Live duration timer ────────────────────────────────────────────────────
  let elapsed = $state(0);
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  $effect(() => {
    if (status?.state === 'working' && status.startedAt) {
      const start = new Date(status.startedAt).getTime();
      elapsed = Math.floor((Date.now() - start) / 1000);
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        elapsed = Math.floor((Date.now() - start) / 1000);
      }, 1000);
    } else {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      elapsed = 0;
    }
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    };
  });

  function formatDuration(secs: number): string {
    if (secs < 60) return `${secs}s`;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  }

  function truncate(text: string, max: number): string {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '…' : text;
  }

  const state = $derived(status?.state ?? 'idle');
</script>

<div class="agent-status" data-state={state}>
  <!-- Status dot / icon -->
  <span class="dot-wrap">
    {#if state === 'idle'}
      <span class="dot dot-idle" title="Idle"></span>
    {:else if state === 'working'}
      <span class="dot dot-working pulse" title="Working">
        <span class="spinner"></span>
      </span>
    {:else if state === 'done'}
      <span class="dot dot-done" title="Done">&#10003;</span>
    {:else if state === 'error'}
      <span class="dot dot-error" title="Error">&#10007;</span>
    {/if}
  </span>

  <!-- Label -->
  <span class="status-label">
    {#if state === 'idle'}
      <span class="text-idle">Idle</span>
    {:else if state === 'working'}
      <span class="text-working">Working...</span>
    {:else if state === 'done'}
      <span class="text-done">Done</span>
    {:else if state === 'error'}
      <span class="text-error">Error</span>
    {/if}
  </span>

  <!-- Last action (truncated) -->
  {#if status?.lastAction && state !== 'idle'}
    <span class="last-action" title={status.lastAction}>
      {truncate(status.lastAction, 30)}
    </span>
  {/if}

  <!-- Live duration while working -->
  {#if state === 'working' && elapsed > 0}
    <span class="duration">{formatDuration(elapsed)}</span>
  {/if}
</div>

<style>
  .agent-status {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 10px;
  }

  /* ── Dot ── */
  .dot-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  .dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    font-size: 9px;
    line-height: 1;
  }

  .dot-idle {
    background: #555;
  }

  .dot-working {
    background: #f97316;
    width: 12px;
    height: 12px;
    position: relative;
  }

  .dot-done {
    background: #22c55e;
    color: #000;
    font-size: 8px;
    font-weight: 700;
  }

  .dot-error {
    background: #ef4444;
    color: #fff;
    font-size: 8px;
    font-weight: 700;
  }

  /* ── Pulse animation ── */
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.9; }
    70%  { transform: scale(1.5); opacity: 0; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  .pulse::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: #f97316;
    animation: pulse-ring 1.4s ease-out infinite;
  }

  /* ── Spinner ── */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .spinner {
    display: block;
    width: 8px;
    height: 8px;
    border: 1.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    position: relative;
    z-index: 1;
  }

  /* ── Labels ── */
  .status-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .text-idle    { color: #555; }
  .text-working { color: #f97316; }
  .text-done    { color: #22c55e; }
  .text-error   { color: #ef4444; }

  /* ── Last action ── */
  .last-action {
    color: #888;
    font-size: 9px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Duration ── */
  .duration {
    color: #f97316;
    font-size: 9px;
    opacity: 0.8;
  }
</style>
