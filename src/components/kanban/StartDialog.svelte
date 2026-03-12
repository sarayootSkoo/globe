<script lang="ts">
  import type { KanbanCard } from '../../lib/types';
  import { AGENT_DEFS } from '../../lib/stores/kanbanState';
  import { getNextCommand, detectChain } from '../../lib/workflow/workflowEngine';
  import { buildCommandString, getCommandsForColumn } from '../../lib/workflow/commandRegistry';

  interface Props {
    card: KanbanCard;
    fromColumn: string;
    toColumn: string;
    onConfirm: (copyCommand: boolean) => void;
    onCancel: () => void;
  }

  let { card, fromColumn, toColumn, onConfirm, onCancel }: Props = $props();

  let suggestion = $derived(getNextCommand(card.status));
  let chain = $derived(detectChain(suggestion?.command || '/chore'));
  let commandStr = $derived(
    suggestion ? buildCommandString(card, suggestion.command) : ''
  );

  function handleCopy() {
    if (commandStr) navigator.clipboard.writeText(commandStr);
    onConfirm(true);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dialog-overlay" onclick={onCancel}>
  <div class="dialog" onclick={(e) => e.stopPropagation()}>
    <div class="dialog-title">START WORK</div>
    <div class="dialog-divider"></div>

    <div class="dialog-row">
      <span class="label">Moving:</span>
      <span class="value">{card.node.label}</span>
    </div>
    <div class="dialog-row">
      <span class="label">From:</span>
      <span class="value">{fromColumn} → {toColumn}</span>
    </div>

    {#if suggestion}
      <div class="cmd-section">
        <span class="label">Suggested command:</span>
        <div class="cmd-box">{commandStr}</div>
      </div>
    {/if}

    {#if card.agent && AGENT_DEFS[card.agent]}
      <div class="dialog-row">
        <span class="label">Agent:</span>
        <span class="agent-badge" style="color: {AGENT_DEFS[card.agent].color}">
          {AGENT_DEFS[card.agent].icon} {AGENT_DEFS[card.agent].label}
        </span>
      </div>
    {/if}

    {#if chain}
      <div class="dialog-row">
        <span class="label">Chain:</span>
        <span class="value">{chain.name}</span>
      </div>
    {/if}

    <div class="dialog-actions">
      <button class="btn btn-primary" onclick={handleCopy}>Start & Copy Command</button>
      <button class="btn btn-secondary" onclick={() => onConfirm(false)}>Start without Command</button>
      <button class="btn btn-ghost" onclick={onCancel}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dialog {
    background: #161922;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 24px;
    width: 400px;
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
    background: rgba(255,255,255,0.06);
    margin: 14px 0;
  }
  .dialog-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .label { color: #666; }
  .value { color: #ccc; }
  .agent-badge { font-weight: 700; font-size: 11px; }
  .cmd-section {
    margin: 14px 0;
    font-size: 12px;
  }
  .cmd-box {
    margin-top: 6px;
    background: rgba(0,229,255,0.06);
    border: 1px solid rgba(0,229,255,0.15);
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 11px;
    color: #00e5ff;
    word-break: break-all;
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
    background: rgba(0,229,255,0.15);
    color: #00e5ff;
    border: 1px solid rgba(0,229,255,0.3);
  }
  .btn-primary:hover { background: rgba(0,229,255,0.25); }
  .btn-secondary {
    background: rgba(255,255,255,0.05);
    color: #aaa;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); }
  .btn-ghost {
    background: transparent;
    color: #666;
  }
  .btn-ghost:hover { color: #999; }
</style>
