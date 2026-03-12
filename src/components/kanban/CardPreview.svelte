<script lang="ts">
  import type { KanbanCard } from '../../lib/types';
  import { COMMAND_REGISTRY, getCommandsForColumn, buildCommandString } from '../../lib/workflow/commandRegistry';
  import { AGENT_DEFS } from '../../lib/stores/kanbanState';

  interface Props {
    card: KanbanCard;
    onClose: () => void;
    onRerun: (command: string, filePath: string) => void;
  }

  let { card, onClose, onRerun }: Props = $props();

  // Available commands for this card's current column
  let availableCommands = $derived(
    getCommandsForColumn(card.status).filter(cmd => {
      const def = COMMAND_REGISTRY[cmd];
      return def && (def.rerunnable || card.iterationCount === 0);
    })
  );

  // Format relative time
  function timeAgo(ts: number | null | undefined): string {
    if (!ts) return '';
    const ms = Date.now() - ts;
    const m = Math.floor(ms / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ${m % 60}m ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  }

  // Score color
  function scoreColor(score: number): string {
    if (score >= 4.5) return '#00ff88';
    if (score >= 4) return '#00e5ff';
    if (score >= 3) return '#eab308';
    if (score >= 2) return '#f97316';
    return '#ff5555';
  }

  // Render markdown as simple HTML (basic rendering without marked for now)
  function renderPreview(text: string): string {
    if (!text) return '<p class="empty">No preview content available</p>';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  function handleRerunClick(cmd: string) {
    const filePath = card.artifactPath || card.filePath;
    onRerun(cmd, filePath);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="preview-overlay" onclick={onClose}>
  <div class="preview-panel" onclick={(e) => e.stopPropagation()}>
    <!-- Header -->
    <div class="preview-header">
      <div class="preview-title-area">
        <div class="preview-title">{card.node.label}</div>
        <div class="preview-meta">
          <span class="meta-type">{card.type.toUpperCase()}</span>
          {#if card.agent && AGENT_DEFS[card.agent]}
            <span class="meta-agent" style="color: {AGENT_DEFS[card.agent].color}">
              {AGENT_DEFS[card.agent].icon} {AGENT_DEFS[card.agent].label}
            </span>
          {/if}
        </div>
      </div>
      <button class="preview-close" onclick={onClose}>×</button>
    </div>

    <div class="preview-body">
      <!-- Left: Content preview -->
      <div class="preview-content">
        {#if card.node.preview}
          <div class="markdown-body">
            {@html renderPreview(card.node.preview)}
          </div>
        {:else if card.filePath}
          <div class="file-ref">
            <span class="file-icon">&#x1F4C4;</span>
            <span class="file-path">{card.filePath}</span>
          </div>
        {:else}
          <div class="no-content">No content preview available</div>
        {/if}

        {#if card.node.desc}
          <div class="card-desc">{card.node.desc}</div>
        {/if}
      </div>

      <!-- Right: Actions sidebar -->
      <div class="preview-sidebar">
        <!-- Iteration Info -->
        <div class="sidebar-section">
          <div class="section-label">ITERATION</div>
          {#if card.iterationCount > 0}
            <div class="iteration-info">
              <div class="iter-stat">
                <span class="iter-count-large">{card.iterationCount}</span>
                <span class="iter-label">runs</span>
              </div>
              <div class="iter-stat">
                <span class="iter-score-large" style="color: {scoreColor(card.iterationScore)}">
                  {card.iterationScore.toFixed(1)}
                </span>
                <span class="iter-label">/5 score</span>
              </div>
            </div>
            {#if card.lastCommand}
              <div class="last-run">
                Last: {card.lastCommand} {timeAgo(card.lastRunAt)}
              </div>
            {/if}
          {:else}
            <div class="no-iterations">No iterations yet</div>
          {/if}
        </div>

        <!-- Lifecycle -->
        <div class="sidebar-section">
          <div class="section-label">STATUS</div>
          <div class="lifecycle-badge lifecycle-{card.lifecycle}">
            {card.lifecycle.toUpperCase()}
          </div>
          {#if card.pauseReason}
            <div class="pause-reason">{card.pauseReason.replace('_', ' ')}</div>
          {/if}
        </div>

        <!-- Re-run Commands -->
        {#if availableCommands.length > 0}
          <div class="sidebar-section">
            <div class="section-label">RE-RUN COMMANDS</div>
            <div class="command-list">
              {#each availableCommands as cmd}
                {@const def = COMMAND_REGISTRY[cmd]}
                <button
                  class="rerun-btn"
                  onclick={() => handleRerunClick(cmd)}
                >
                  <span class="rerun-icon">&#x1F504;</span>
                  <span class="rerun-cmd">{cmd}</span>
                  <span class="rerun-role">{def.role}</span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- File info -->
        {#if card.artifactPath || card.uploadPath}
          <div class="sidebar-section">
            <div class="section-label">FILES</div>
            {#if card.artifactPath}
              <div class="file-entry">Artifact: {card.artifactPath}</div>
            {/if}
            {#if card.uploadPath}
              <div class="file-entry">Upload: {card.uploadPath}</div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .preview-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
  }
  .preview-panel {
    background: #131620; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; width: 760px; max-width: 92vw; max-height: 85vh;
    display: flex; flex-direction: column; overflow: hidden;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }

  /* Header */
  .preview-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .preview-title-area { flex: 1; }
  .preview-title {
    font-size: 15px; font-weight: 700; color: #e8e8ec;
    line-height: 1.3; margin-bottom: 6px;
  }
  .preview-meta { display: flex; gap: 10px; font-size: 11px; }
  .meta-type {
    color: #888; background: rgba(255,255,255,0.05);
    padding: 2px 8px; border-radius: 4px;
  }
  .meta-agent { font-weight: 600; }
  .preview-close {
    background: none; border: none; color: #666;
    font-size: 20px; cursor: pointer; padding: 0 4px;
    line-height: 1;
  }
  .preview-close:hover { color: #ccc; }

  /* Body layout */
  .preview-body {
    display: flex; flex: 1; overflow: hidden;
  }

  /* Content area */
  .preview-content {
    flex: 1; padding: 20px; overflow-y: auto;
    border-right: 1px solid rgba(255,255,255,0.04);
  }
  .preview-content::-webkit-scrollbar { width: 4px; }
  .preview-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08); border-radius: 2px;
  }

  .markdown-body { font-size: 12px; color: #bbb; line-height: 1.6; }
  .markdown-body :global(h1) { font-size: 16px; color: #e0e0e0; margin: 16px 0 8px; }
  .markdown-body :global(h2) { font-size: 14px; color: #d0d0d0; margin: 14px 0 6px; }
  .markdown-body :global(h3) { font-size: 12px; color: #c0c0c0; margin: 12px 0 4px; }
  .markdown-body :global(code) {
    background: rgba(0,229,255,0.06); color: #00e5ff;
    padding: 2px 5px; border-radius: 3px; font-size: 11px;
  }
  .markdown-body :global(strong) { color: #e0e0e0; }
  .markdown-body :global(li) { margin: 2px 0; padding-left: 8px; }

  .file-ref {
    display: flex; align-items: center; gap: 8px;
    padding: 12px; background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05); border-radius: 6px;
  }
  .file-icon { font-size: 16px; }
  .file-path { font-size: 11px; color: #888; word-break: break-all; }
  .no-content { color: #555; font-size: 12px; font-style: italic; padding: 20px 0; }
  .card-desc {
    margin-top: 12px; font-size: 11px; color: #888;
    padding: 10px; background: rgba(255,255,255,0.02);
    border-radius: 6px; line-height: 1.5;
  }

  /* Sidebar */
  .preview-sidebar {
    width: 220px; flex-shrink: 0; padding: 16px;
    overflow-y: auto;
  }
  .sidebar-section { margin-bottom: 18px; }
  .section-label {
    font-size: 10px; color: #555; font-weight: 700;
    letter-spacing: 0.08em; margin-bottom: 8px;
  }

  /* Iteration info */
  .iteration-info { display: flex; gap: 16px; margin-bottom: 8px; }
  .iter-stat { display: flex; flex-direction: column; align-items: center; }
  .iter-count-large { font-size: 22px; font-weight: 700; color: #00e5ff; }
  .iter-score-large { font-size: 22px; font-weight: 700; }
  .iter-label { font-size: 9px; color: #666; margin-top: 2px; }
  .last-run { font-size: 10px; color: #666; }
  .no-iterations { font-size: 11px; color: #444; font-style: italic; }

  /* Lifecycle badge */
  .lifecycle-badge {
    display: inline-block; padding: 4px 10px; border-radius: 4px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
  }
  .lifecycle-idle { background: rgba(255,255,255,0.05); color: #888; }
  .lifecycle-started { background: rgba(0,229,255,0.1); color: #00e5ff; }
  .lifecycle-running { background: rgba(0,255,136,0.1); color: #00ff88; }
  .lifecycle-paused { background: rgba(249,115,22,0.1); color: #f97316; }
  .lifecycle-completed { background: rgba(0,255,136,0.1); color: #00ff88; }
  .lifecycle-failed { background: rgba(255,85,85,0.1); color: #ff5555; }
  .lifecycle-blocked { background: rgba(255,204,0,0.1); color: #ffcc00; }
  .pause-reason { font-size: 10px; color: #f97316; margin-top: 4px; }

  /* Re-run buttons */
  .command-list { display: flex; flex-direction: column; gap: 4px; }
  .rerun-btn {
    display: flex; align-items: center; gap: 6px;
    width: 100%; padding: 8px 10px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px; cursor: pointer; transition: all 0.15s;
    font-family: inherit;
  }
  .rerun-btn:hover {
    background: rgba(0,229,255,0.06); border-color: rgba(0,229,255,0.2);
  }
  .rerun-icon { font-size: 12px; }
  .rerun-cmd { font-size: 11px; color: #00e5ff; font-weight: 600; }
  .rerun-role { font-size: 9px; color: #666; margin-left: auto; }

  /* File entries */
  .file-entry {
    font-size: 10px; color: #666; margin-bottom: 4px;
    word-break: break-all;
  }
</style>
