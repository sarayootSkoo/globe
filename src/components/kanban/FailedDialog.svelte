<script lang="ts">
  import type { KanbanCard } from '../../lib/types';
  import { buildCommandString, getCommandsForColumn } from '../../lib/workflow/commandRegistry';

  interface Props {
    card: KanbanCard;
    onRestart: (launch: boolean) => void;
    onCancel: () => void;
  }

  let { card, onRestart, onCancel }: Props = $props();

  let effectiveCommand = $derived(
    card.lastCommand || getCommandsForColumn(card.status)[0] || ''
  );

  let restartCommand = $derived(
    effectiveCommand ? buildCommandString(card, effectiveCommand) : ''
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dialog-overlay" onclick={onCancel}>
  <div class="dialog" onclick={(e) => e.stopPropagation()}>
    <div class="dialog-title">
      <span class="title-icon">&#x2718;</span>
      TASK FAILED
    </div>
    <div class="dialog-divider"></div>

    <div class="dialog-row">
      <span class="label">Card:</span>
      <span class="value">{card.node.label}</span>
    </div>
    {#if card.assignedAgent}
      <div class="dialog-row">
        <span class="label">Agent:</span>
        <span class="value">{card.assignedAgent}</span>
      </div>
    {/if}
    {#if card.lastCommand}
      <div class="dialog-row">
        <span class="label">Last command:</span>
        <span class="value cmd-text">{card.lastCommand}</span>
      </div>
    {/if}

    {#if restartCommand}
      <div class="cmd-section">
        <span class="label">Restart command:</span>
        <div class="cmd-box">{restartCommand}</div>
      </div>
    {/if}

    <div class="dialog-actions">
      <button class="btn btn-launch" onclick={() => onRestart(true)}>
        Restart & Launch
      </button>
      <button class="btn btn-hold" onclick={() => onRestart(false)}>
        Restart & Hold
      </button>
      <button class="btn btn-ghost" onclick={onCancel}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .dialog-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; }
  .dialog { background: #161922; border: 1px solid rgba(255,85,85,0.15); border-radius: 12px; padding: 24px; width: 420px; max-width: 90vw; font-family: var(--font, 'JetBrains Mono', monospace); }
  .dialog-title { font-size: 13px; font-weight: 700; color: #ff5555; letter-spacing: 0.08em; display: flex; align-items: center; gap: 8px; }
  .title-icon { font-size: 14px; }
  .dialog-divider { height: 1px; background: rgba(255,85,85,0.12); margin: 14px 0; }
  .dialog-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 12px; }
  .label { color: #666; font-size: 12px; flex-shrink: 0; }
  .value { color: #ccc; }
  .cmd-text { font-size: 11px; color: #888; }
  .cmd-section { margin: 14px 0; font-size: 12px; }
  .cmd-box { margin-top: 6px; background: rgba(0,229,255,0.06); border: 1px solid rgba(0,229,255,0.15); border-radius: 6px; padding: 10px 12px; font-size: 11px; color: #00e5ff; word-break: break-all; }
  .dialog-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 18px; }
  .btn { border: none; border-radius: 6px; padding: 10px 16px; font-size: 12px; font-family: inherit; cursor: pointer; font-weight: 600; }
  .btn-launch { background: rgba(0,255,136,0.15); color: #00ff88; border: 1px solid rgba(0,255,136,0.3); }
  .btn-launch:hover { background: rgba(0,255,136,0.25); }
  .btn-hold { background: rgba(249,115,22,0.12); color: #f97316; border: 1px solid rgba(249,115,22,0.25); }
  .btn-hold:hover { background: rgba(249,115,22,0.22); }
  .btn-ghost { background: transparent; color: #666; }
  .btn-ghost:hover { color: #999; }
</style>
