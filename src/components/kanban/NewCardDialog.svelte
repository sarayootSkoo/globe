<script lang="ts">
  import type { CardType } from '../../lib/types';
  import { CATEGORIES } from '../../lib/constants';
  import { addLocalCard, updateLifecycle } from '../../lib/stores/kanbanState';
  import { WORKFLOW_CHAINS } from '../../lib/workflow/workflowEngine';
  import { startWorkflow } from '../../lib/stores/workflowState';
  import { addLog } from '../../lib/stores/activityLog';
  import { buildCommandString, COMMAND_REGISTRY } from '../../lib/workflow/commandRegistry';
  import FileDropZone from './FileDropZone.svelte';

  const EVENT_SERVER = 'http://localhost:4010';

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();

  let title = $state('');
  let section = $state('');
  let customSection = $state('');
  let cardType = $state<CardType>('spec');
  let description = $state('');
  let chainId = $state('feature');
  let files = $state<File[]>([]);

  let allSections = $derived(Object.keys(CATEGORIES).sort());
  let effectiveSection = $derived(section === '__custom' ? customSection : section);

  // Upload path preview
  let now = new Date();
  let dateStr = $derived(
    `${String(now.getDate()).padStart(2,'0')}_${String(now.getMonth()+1).padStart(2,'0')}_${now.getFullYear()}`
  );
  let uploadPath = $derived(
    effectiveSection && files.length > 0
      ? `uploads/${dateStr}/${effectiveSection}/`
      : null
  );

  const TYPE_OPTIONS: { value: CardType; icon: string; label: string }[] = [
    { value: 'spec',       icon: '\u{1F4CB}', label: 'Spec' },
    { value: 'discussion', icon: '\u{1F4AC}', label: 'Discussion' },
    { value: 'task',       icon: '\u{1F527}', label: 'Task' },
    { value: 'issue',      icon: '\u{1F41B}', label: 'Issue' },
  ];

  function handleFiles(incoming: File[]) {
    files = incoming;
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1] || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadFiles(upPath: string, fileList: File[], cardId: string): Promise<boolean> {
    if (fileList.length === 0) return true;
    try {
      const fileData = await Promise.all(
        fileList.map(async (f) => ({ name: f.name, data: await fileToBase64(f) }))
      );
      const res = await fetch(`${EVENT_SERVER}/card/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploadPath: upPath, files: fileData, cardId }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  let launching = $state(false);

  async function createCard(mode: 'draft' | 'start' | 'launch') {
    if (!title.trim()) return;
    const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    addLocalCard({
      id,
      title: title.trim(),
      description: description.trim() || undefined,
      section: effectiveSection || undefined,
      column: mode === 'draft' ? 'create' : 'design',
      type: cardType,
      uploadPath: uploadPath ?? undefined,
      createdAt: Date.now(),
    });

    // Upload files if any
    if (files.length > 0 && uploadPath) {
      await uploadFiles(uploadPath, files, id);
    }

    // Start workflow for non-draft cards
    if (mode !== 'draft') {
      startWorkflow(id, chainId);
      updateLifecycle(id, 'started');

      const cmd = cardType === 'issue' ? '/issue' : '/chore';
      const args = uploadPath
        ? `'${uploadPath}'`
        : `"${title.trim()}"`;
      const cmdStr = `${cmd} ${args}`;
      navigator.clipboard.writeText(cmdStr);

      if (mode === 'launch') {
        launching = true;
        try {
          const res = await fetch(`${EVENT_SERVER}/agent/launch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: cmd, args, cardId: id }),
          });
          const data = await res.json();
          if (res.ok && data.sessionId) {
            addLog(id, 'agent:launched', { command: cmd, args, sessionId: data.sessionId, pid: data.pid });
            updateLifecycle(id, 'running');
          }
        } catch { /* non-critical */ }
        launching = false;
      }
    }

    onClose();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dialog-overlay" onclick={onClose}>
  <div class="dialog" onclick={(e) => e.stopPropagation()}>
    <div class="dialog-title">CREATE NEW CARD</div>
    <div class="dialog-divider"></div>

    <!-- Title -->
    <div class="field">
      <label class="field-label">Title</label>
      <input class="field-input" type="text" bind:value={title} placeholder="Card title..." />
    </div>

    <!-- Section -->
    <div class="field">
      <label class="field-label">Section</label>
      <select class="field-select" bind:value={section}>
        <option value="">Select section</option>
        {#each allSections as s}
          <option value={s}>{CATEGORIES[s]?.label || s}</option>
        {/each}
        <option value="__custom">Custom...</option>
      </select>
      {#if section === '__custom'}
        <input class="field-input mt-4" type="text" bind:value={customSection} placeholder="Custom section name..." />
      {/if}
    </div>

    <!-- Type -->
    <div class="field">
      <label class="field-label">Type</label>
      <div class="type-options">
        {#each TYPE_OPTIONS as opt}
          <label class="type-option" class:selected={cardType === opt.value}>
            <input type="radio" bind:group={cardType} value={opt.value} />
            <span>{opt.icon} {opt.label}</span>
          </label>
        {/each}
      </div>
    </div>

    <!-- Description -->
    <div class="field">
      <label class="field-label">Description</label>
      <textarea class="field-textarea" bind:value={description} rows="3" placeholder="Brief description..."></textarea>
    </div>

    <!-- Workflow Chain -->
    <div class="field">
      <label class="field-label">Workflow</label>
      <select class="field-select" bind:value={chainId}>
        {#each WORKFLOW_CHAINS as chain}
          <option value={chain.id}>{chain.name} ({chain.steps.length} steps)</option>
        {/each}
      </select>
    </div>

    <!-- File Drop Zone -->
    <div class="field">
      <label class="field-label">Attachments</label>
      <FileDropZone onFiles={handleFiles} />

      {#if uploadPath}
        <div class="upload-path">Files will be saved to: {uploadPath}</div>
      {/if}
    </div>

    <!-- Actions -->
    <div class="dialog-actions">
      <button class="btn btn-launch" onclick={() => createCard('launch')} disabled={!title.trim() || launching}>
        {launching ? 'Launching...' : 'Create & Launch Claude'}
      </button>
      <button class="btn btn-primary" onclick={() => createCard('start')} disabled={!title.trim()}>
        Create & Copy Command
      </button>
      <button class="btn btn-secondary" onclick={() => createCard('draft')} disabled={!title.trim()}>
        Create as Draft
      </button>
      <button class="btn btn-ghost" onclick={onClose}>Cancel</button>
    </div>
  </div>
</div>

<style>
  .dialog-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; }
  .dialog {
    background: #161922; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
    padding: 24px; width: 520px; max-width: 90vw; max-height: 85vh; overflow-y: auto;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }
  .dialog-title { font-size: 13px; font-weight: 700; color: #e0e0e0; letter-spacing: 0.08em; }
  .dialog-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }

  .field { margin-bottom: 16px; }
  .field-label { display: block; font-size: 11px; color: #666; margin-bottom: 6px; letter-spacing: 0.04em; }
  .field-input, .field-select, .field-textarea {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #ccc; font-family: inherit; outline: none;
    box-sizing: border-box;
  }
  .field-input:focus, .field-select:focus, .field-textarea:focus { border-color: rgba(0,229,255,0.4); }
  .field-textarea { resize: vertical; min-height: 60px; }
  .mt-4 { margin-top: 6px; }

  .type-options { display: flex; gap: 6px; flex-wrap: wrap; }
  .type-option {
    padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; color: #888;
    border: 1px solid rgba(255,255,255,0.06); transition: all 0.15s;
  }
  .type-option:hover { background: rgba(255,255,255,0.04); }
  .type-option.selected { background: rgba(0,229,255,0.08); border-color: rgba(0,229,255,0.3); color: #00e5ff; }
  .type-option input { display: none; }

  .upload-path { margin-top: 8px; font-size: 10px; color: #666; font-style: italic; }

  .dialog-actions { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }
  .btn {
    border: none; border-radius: 6px; padding: 10px 16px; font-size: 12px;
    font-family: inherit; cursor: pointer; font-weight: 600;
  }
  .btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .btn-launch { background: rgba(0,255,136,0.15); color: #00ff88; border: 1px solid rgba(0,255,136,0.3); }
  .btn-launch:hover:not(:disabled) { background: rgba(0,255,136,0.25); }
  .btn-primary { background: rgba(0,229,255,0.15); color: #00e5ff; border: 1px solid rgba(0,229,255,0.3); }
  .btn-primary:hover:not(:disabled) { background: rgba(0,229,255,0.25); }
  .btn-secondary { background: rgba(255,255,255,0.05); color: #aaa; border: 1px solid rgba(255,255,255,0.08); }
  .btn-secondary:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
  .btn-ghost { background: transparent; color: #666; }
  .btn-ghost:hover { color: #999; }
</style>
