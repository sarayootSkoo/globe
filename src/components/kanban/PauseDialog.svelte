<script lang="ts">
  import type { KanbanCard, PauseReason } from '../../lib/types';

  interface Props {
    card: KanbanCard;
    onPause: (reason: PauseReason, note: string) => void;
    onCancel: () => void;
  }

  let { card, onPause, onCancel }: Props = $props();
  let reason = $state<PauseReason>('user_pause');
  let note = $state('');

  const REASONS: { value: PauseReason; icon: string; label: string }[] = [
    { value: 'token_limit',  icon: '\u{1F504}', label: 'Token limit reached' },
    { value: 'subscription', icon: '\u{1F511}', label: 'Need to login / new subscription' },
    { value: 'user_pause',   icon: '\u23F8',    label: 'Manual pause' },
    { value: 'dependency',   icon: '\u{1F512}', label: 'Blocked by dependency' },
    { value: 'error_retry',  icon: '\u26A0',    label: 'Error — will retry' },
  ];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dialog-overlay" onclick={onCancel}>
  <div class="dialog" onclick={(e) => e.stopPropagation()}>
    <div class="dialog-title">PAUSE WORK</div>
    <div class="dialog-divider"></div>

    <div class="dialog-row">
      <span class="label">Card:</span>
      <span class="value">{card.node.label}</span>
    </div>

    <div class="reason-section">
      <span class="label">Reason:</span>
      {#each REASONS as r}
        <label class="reason-option" class:selected={reason === r.value}>
          <input type="radio" bind:group={reason} value={r.value} />
          <span>{r.icon} {r.label}</span>
        </label>
      {/each}
    </div>

    <div class="note-section">
      <span class="label">Note (optional):</span>
      <input class="note-input" type="text" bind:value={note} placeholder="Additional context..." />
    </div>

    <div class="dialog-actions">
      <button class="btn btn-warn" onclick={() => onPause(reason, note)}>Pause</button>
      <button class="btn btn-ghost" onclick={onCancel}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .dialog-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; }
  .dialog { background: #161922; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; width: 400px; max-width: 90vw; font-family: var(--font, 'JetBrains Mono', monospace); }
  .dialog-title { font-size: 13px; font-weight: 700; color: #e0e0e0; letter-spacing: 0.08em; }
  .dialog-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
  .dialog-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 12px; }
  .label { color: #666; font-size: 12px; margin-bottom: 6px; display: block; }
  .value { color: #ccc; }
  .reason-section { margin: 14px 0; }
  .reason-option {
    display: flex; align-items: center; gap: 8px; padding: 8px 12px; margin: 4px 0;
    border-radius: 6px; cursor: pointer; font-size: 12px; color: #aaa;
    border: 1px solid rgba(255,255,255,0.04);
    transition: all 0.15s;
  }
  .reason-option:hover { background: rgba(255,255,255,0.04); }
  .reason-option.selected { background: rgba(249,115,22,0.08); border-color: rgba(249,115,22,0.3); color: #f97316; }
  .reason-option input { display: none; }
  .note-section { margin: 14px 0; }
  .note-input {
    width: 100%; margin-top: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 8px 12px; font-size: 11px; color: #ccc; font-family: inherit; outline: none;
  }
  .note-input:focus { border-color: rgba(249,115,22,0.4); }
  .dialog-actions { display: flex; gap: 8px; margin-top: 18px; }
  .btn { border: none; border-radius: 6px; padding: 10px 16px; font-size: 12px; font-family: inherit; cursor: pointer; font-weight: 600; flex: 1; }
  .btn-warn { background: rgba(249,115,22,0.15); color: #f97316; border: 1px solid rgba(249,115,22,0.3); }
  .btn-warn:hover { background: rgba(249,115,22,0.25); }
  .btn-ghost { background: transparent; color: #666; }
  .btn-ghost:hover { color: #999; }
</style>
