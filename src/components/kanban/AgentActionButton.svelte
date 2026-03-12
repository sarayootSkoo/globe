<script lang="ts">
  import type { KanbanCard } from '../../lib/types';
  import { agentLiveStatuses } from '../../lib/stores/agentEventStore';

  interface Props {
    card: KanbanCard;
    command: string;
  }

  let { card, command }: Props = $props();

  let isWorking = $state(false);
  let isLaunching = $state(false);
  let showConfirm = $state(false);
  let error = $state<string | null>(null);

  $effect(() => {
    const unsub = agentLiveStatuses.subscribe(map => {
      const status = map.get(card.node.id);
      isWorking = status?.state === 'working';
    });
    return unsub;
  });

  const isDisabled = $derived(isWorking || isLaunching);

  function handleClick() {
    error = null;
    showConfirm = true;
  }

  function handleCancel() {
    showConfirm = false;
  }

  async function handleConfirm() {
    showConfirm = false;
    isLaunching = true;
    error = null;

    try {
      const res = await fetch('http://localhost:4010/agent/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command,
          args: card.node.label,
          cwd: card.filePath
            ? card.filePath.replace(/\/[^/]+$/, '')   // parent dir of file
            : undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }

      // Success — agent is now running; status will update via WebSocket
    } catch (err) {
      error = err instanceof Error ? err.message : 'Launch failed';
    } finally {
      isLaunching = false;
    }
  }
</script>

<!-- ── Confirmation dialog ────────────────────────────────────────────────── -->
{#if showConfirm}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="dialog-overlay" onclick={handleCancel}>
    <div class="dialog" onclick={(e) => e.stopPropagation()}>
      <div class="dialog-title">LAUNCH AGENT</div>
      <div class="dialog-divider"></div>

      <div class="dialog-row">
        <span class="label">Command:</span>
        <span class="value cmd-text">{command}</span>
      </div>
      <div class="dialog-row">
        <span class="label">Card:</span>
        <span class="value">{card.node.label}</span>
      </div>

      <div class="dialog-actions">
        <button class="btn btn-primary" onclick={handleConfirm}>
          Confirm Launch
        </button>
        <button class="btn btn-ghost" onclick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- ── Action button ──────────────────────────────────────────────────────── -->
<button
  class="action-btn"
  class:disabled={isDisabled}
  disabled={isDisabled}
  onclick={handleClick}
  title={isWorking ? 'Agent is working…' : `Run ${command}`}
>
  {#if isLaunching}
    <span class="btn-spinner"></span>
    <span>Launching…</span>
  {:else if isWorking}
    <span class="btn-spinner working-spinner"></span>
    <span>Working…</span>
  {:else}
    <span class="play-icon">&#9654;</span>
    <span>Run {command}</span>
  {/if}
</button>

{#if error}
  <span class="error-msg">{error}</span>
{/if}

<style>
  /* ── Action button ── */
  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 12px;
    background: rgba(0, 229, 255, 0.12);
    border: 1px solid rgba(0, 229, 255, 0.28);
    border-radius: 6px;
    color: #00e5ff;
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap;
  }

  .action-btn:hover:not(.disabled) {
    background: rgba(0, 229, 255, 0.22);
    border-color: rgba(0, 229, 255, 0.45);
  }

  .action-btn.disabled {
    opacity: 0.45;
    cursor: not-allowed;
    color: #888;
    border-color: rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
  }

  .play-icon {
    font-size: 9px;
  }

  /* ── Spinner ── */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .btn-spinner {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1.5px solid rgba(0, 229, 255, 0.25);
    border-top-color: #00e5ff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  .working-spinner {
    border-color: rgba(249, 115, 22, 0.25);
    border-top-color: #f97316;
  }

  /* ── Error ── */
  .error-msg {
    display: block;
    font-size: 10px;
    color: #ef4444;
    margin-top: 4px;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }

  /* ── Dialog (matches StartDialog.svelte style) ── */
  .dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dialog {
    background: #161922;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 24px;
    width: 380px;
    max-width: 90vw;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }

  .dialog-title {
    font-size: 13px;
    font-weight: 700;
    color: #e0e0e0;
    letter-spacing: 0.08em;
  }

  .dialog-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    margin: 14px 0;
  }

  .dialog-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .label { color: #666; flex-shrink: 0; }
  .value { color: #ccc; }

  .cmd-text {
    color: #00e5ff;
    font-weight: 600;
  }

  .dialog-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 18px;
  }

  .btn {
    border: none;
    border-radius: 6px;
    padding: 10px 16px;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    font-weight: 600;
  }

  .btn-primary {
    background: rgba(0, 229, 255, 0.15);
    color: #00e5ff;
    border: 1px solid rgba(0, 229, 255, 0.3);
  }
  .btn-primary:hover { background: rgba(0, 229, 255, 0.25); }

  .btn-ghost {
    background: transparent;
    color: #666;
    border: none;
  }
  .btn-ghost:hover { color: #999; }
</style>
