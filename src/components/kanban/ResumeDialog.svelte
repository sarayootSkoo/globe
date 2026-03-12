<script lang="ts">
  import type { KanbanCard } from '../../lib/types';
  import { buildCommandString } from '../../lib/workflow/commandRegistry';

  interface Props {
    card: KanbanCard;
    onResume: (copyCommand: boolean) => void;
    onSkip: () => void;
    onCancel: () => void;
  }

  let { card, onResume, onSkip, onCancel }: Props = $props();

  let pauseDuration = $derived(() => {
    if (!card.lastRunAt) return 'unknown';
    const ms = Date.now() - card.lastRunAt;
    const m = Math.floor(ms / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m ago`;
  });

  let resumeCommand = $derived(
    card.lastCommand ? buildCommandString(card, card.lastCommand) : ''
  );

  function handleCopy() {
    if (resumeCommand) navigator.clipboard.writeText(resumeCommand);
    onResume(true);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dialog-overlay" onclick={onCancel}>
  <div class="dialog" onclick={(e) => e.stopPropagation()}>
    <div class="dialog-title">RESUME WORK</div>
    <div class="dialog-divider"></div>

    <div class="dialog-row">
      <span class="label">Card:</span>
      <span class="value">{card.node.label}</span>
    </div>
    <div class="dialog-row">
      <span class="label">Paused:</span>
      <span class="value">{pauseDuration()}</span>
    </div>
    {#if card.pauseReason}
      <div class="dialog-row">
        <span class="label">Reason:</span>
        <span class="value">{card.pauseReason.replace('_', ' ')}</span>
      </div>
    {/if}

    {#if card.artifactPath || card.lastCommand}
      <div class="context-box">
        {#if card.lastCommand}<div class="ctx-row">Previous: {card.lastCommand}</div>{/if}
        {#if card.artifactPath}<div class="ctx-row">Artifact: {card.artifactPath}</div>{/if}
      </div>
    {/if}

    {#if resumeCommand}
      <div class="cmd-section">
        <span class="label">Resume command:</span>
        <div class="cmd-box">{resumeCommand}</div>
      </div>
    {/if}

    <div class="dialog-actions">
      <button class="btn btn-primary" onclick={handleCopy}>Resume & Copy</button>
      <button class="btn btn-secondary" onclick={() => onResume(false)}>Resume Only</button>
      <button class="btn btn-warn" onclick={onSkip}>Skip & Complete</button>
      <button class="btn btn-ghost" onclick={onCancel}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .dialog-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; }
  .dialog { background: #161922; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; width: 420px; max-width: 90vw; font-family: var(--font, 'JetBrains Mono', monospace); }
  .dialog-title { font-size: 13px; font-weight: 700; color: #e0e0e0; letter-spacing: 0.08em; }
  .dialog-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
  .dialog-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 12px; }
  .label { color: #666; font-size: 12px; }
  .value { color: #ccc; }
  .context-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 10px 12px; margin: 12px 0; }
  .ctx-row { font-size: 11px; color: #888; margin-bottom: 4px; }
  .ctx-row:last-child { margin-bottom: 0; }
  .cmd-section { margin: 14px 0; font-size: 12px; }
  .cmd-box { margin-top: 6px; background: rgba(0,229,255,0.06); border: 1px solid rgba(0,229,255,0.15); border-radius: 6px; padding: 10px 12px; font-size: 11px; color: #00e5ff; word-break: break-all; }
  .dialog-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 18px; }
  .btn { border: none; border-radius: 6px; padding: 10px 16px; font-size: 12px; font-family: inherit; cursor: pointer; font-weight: 600; }
  .btn-primary { background: rgba(0,229,255,0.15); color: #00e5ff; border: 1px solid rgba(0,229,255,0.3); }
  .btn-primary:hover { background: rgba(0,229,255,0.25); }
  .btn-secondary { background: rgba(255,255,255,0.05); color: #aaa; border: 1px solid rgba(255,255,255,0.08); }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); }
  .btn-warn { background: rgba(249,115,22,0.1); color: #f97316; border: 1px solid rgba(249,115,22,0.2); }
  .btn-ghost { background: transparent; color: #666; }
  .btn-ghost:hover { color: #999; }
</style>
