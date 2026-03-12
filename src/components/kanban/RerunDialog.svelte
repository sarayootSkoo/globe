<script lang="ts">
  import type { KanbanCard } from '../../lib/types';
  import { COMMAND_REGISTRY } from '../../lib/workflow/commandRegistry';

  interface Props {
    card: KanbanCard;
    command: string;
    onConfirm: (command: string, goal: string) => void;
    onCancel: () => void;
  }

  let { card, command, onConfirm, onCancel }: Props = $props();

  let goal = $state('');
  let cmdDef = $derived(COMMAND_REGISTRY[command]);
  let filePath = $derived(card.artifactPath || card.filePath);
  let commandStr = $derived(
    filePath
      ? `${command} '${filePath}'`
      : `${command} "${card.node.label}"`
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dialog-overlay" onclick={onCancel}>
  <div class="dialog" onclick={(e) => e.stopPropagation()}>
    <div class="dialog-title">RE-RUN COMMAND</div>
    <div class="dialog-divider"></div>

    <div class="dialog-row">
      <span class="label">Command:</span>
      <span class="value cmd-value">{command}</span>
    </div>
    <div class="dialog-row">
      <span class="label">File:</span>
      <span class="value file-value">{filePath || 'New artifact'}</span>
    </div>
    <div class="dialog-row">
      <span class="label">Previous runs:</span>
      <span class="value">{card.iterationCount}</span>
    </div>
    {#if card.iterationScore > 0}
      <div class="dialog-row">
        <span class="label">Last score:</span>
        <span class="value">{card.iterationScore}/5</span>
      </div>
    {/if}

    <div class="goal-section">
      <span class="label">Goal (optional):</span>
      <input
        class="goal-input"
        type="text"
        bind:value={goal}
        placeholder="e.g., add error handling scenarios..."
      />
    </div>

    <div class="cmd-preview">
      <span class="label">Will run:</span>
      <div class="cmd-box">{commandStr}</div>
    </div>

    <div class="dialog-actions">
      <button class="btn btn-primary" onclick={() => onConfirm(command, goal)}>
        Re-run {command}
      </button>
      <button class="btn btn-ghost" onclick={onCancel}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .dialog-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; }
  .dialog { background: #161922; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; width: 440px; max-width: 90vw; font-family: var(--font, 'JetBrains Mono', monospace); }
  .dialog-title { font-size: 13px; font-weight: 700; color: #e0e0e0; letter-spacing: 0.08em; }
  .dialog-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
  .dialog-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 12px; }
  .label { color: #666; font-size: 12px; }
  .value { color: #ccc; }
  .cmd-value { color: #00e5ff; font-weight: 600; }
  .file-value { font-size: 11px; color: #888; word-break: break-all; }
  .goal-section { margin: 14px 0; }
  .goal-input {
    width: 100%; margin-top: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 8px 12px; font-size: 11px; color: #ccc; font-family: inherit; outline: none;
    box-sizing: border-box;
  }
  .goal-input:focus { border-color: rgba(0,229,255,0.4); }
  .cmd-preview { margin: 14px 0; }
  .cmd-box {
    margin-top: 6px; background: rgba(0,229,255,0.06); border: 1px solid rgba(0,229,255,0.15);
    border-radius: 6px; padding: 10px 12px; font-size: 11px; color: #00e5ff; word-break: break-all;
  }
  .dialog-actions { display: flex; gap: 8px; margin-top: 18px; }
  .btn { border: none; border-radius: 6px; padding: 10px 16px; font-size: 12px; font-family: inherit; cursor: pointer; font-weight: 600; flex: 1; }
  .btn-primary { background: rgba(0,229,255,0.15); color: #00e5ff; border: 1px solid rgba(0,229,255,0.3); }
  .btn-primary:hover { background: rgba(0,229,255,0.25); }
  .btn-ghost { background: transparent; color: #666; }
  .btn-ghost:hover { color: #999; }
</style>
