<script lang="ts">
  import type { KanbanCard, CardType } from '../../lib/types';
  import { marked } from 'marked';
  import { COMMAND_REGISTRY, getCommandsForColumn, buildCommandString } from '../../lib/workflow/commandRegistry';
  import { CATEGORIES } from '../../lib/constants';
  import { AGENT_DEFS, updateLifecycle, moveCard, updateLocalCard, addLocalCard } from '../../lib/stores/kanbanState';
  import { startWorkflow, removeWorkflow, workflowExecutions } from '../../lib/stores/workflowState';
  import { WORKFLOW_CHAINS } from '../../lib/workflow/workflowEngine';
  import WorkflowHistory from './WorkflowHistory.svelte';
  import FileDropZone from './FileDropZone.svelte';
  import { activityLog, getCardLogs, addLog, type LogEntry } from '../../lib/stores/activityLog';
  import { recentEvents, agentLiveStatuses, wsConnected, agentConsoleOutput } from '../../lib/stores/agentEventStore';
  import type { ConsoleLine } from '../../lib/stores/agentEventStore';
  import type { KanbanEvent, AgentLiveStatus } from '../../lib/types';

  const EVENT_SERVER = 'http://localhost:4010';

  interface Props {
    card: KanbanCard;
    onClose: () => void;
    onRerun: (command: string, filePath: string) => void;
  }

  let { card, onClose, onRerun }: Props = $props();

  // ── View mode: 'preview' | 'edit' | 'fullview' ──────────────────────────
  let viewMode = $state<'preview' | 'edit' | 'fullview' | 'details'>('preview');
  let editContent = $state('');
  let fullContent = $state('');
  let loadingFile = $state(false);
  let saving = $state(false);
  let saveMsg = $state('');
  let fileError = $state('');

  // ── Uploaded files listing ────────────────────────────────────────────────
  interface UploadedFile {
    id: string;
    filename: string;
    original_name: string;
    mime_type: string | null;
    size: number;
    upload_path: string;
    created_at: string;
  }
  let uploadedFiles = $state<UploadedFile[]>([]);
  let loadingFiles = $state(false);

  async function fetchUploadedFiles() {
    if (!card.node.id) return;
    loadingFiles = true;
    try {
      const res = await fetch(`${EVENT_SERVER}/card/${encodeURIComponent(card.node.id)}/files`);
      if (res.ok) {
        const data = await res.json();
        uploadedFiles = data.files || [];
      }
    } catch { /* non-critical */ }
    loadingFiles = false;
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function getFileIcon(mime: string | null): string {
    if (!mime) return '\u{1F4C4}';
    if (mime.startsWith('image/')) return '\u{1F5BC}';
    if (mime === 'application/pdf') return '\u{1F4D1}';
    if (mime.startsWith('text/')) return '\u{1F4DD}';
    if (mime.includes('spreadsheet') || mime.includes('excel')) return '\u{1F4CA}';
    if (mime.includes('zip') || mime.includes('gzip')) return '\u{1F4E6}';
    return '\u{1F4C4}';
  }

  // Fetch files on mount
  fetchUploadedFiles();

  // Available commands for this card's current column
  let availableCommands = $derived(
    getCommandsForColumn(card.status).filter(cmd => {
      const def = COMMAND_REGISTRY[cmd];
      return def && (def.rerunnable || card.iterationCount === 0);
    })
  );

  // Configure marked
  marked.setOptions({ gfm: true, breaks: true });

  // Render markdown to HTML via marked
  function renderMd(text: string): string {
    if (!text) return '<p class="empty">No content preview available</p>';
    return marked.parse(text) as string;
  }

  // ── Load full file content from event server ─────────────────────────────
  async function loadFullFile(): Promise<string | null> {
    const filePath = card.node.file || card.filePath || card.artifactPath;
    if (!filePath) return null;
    loadingFile = true;
    fileError = '';
    try {
      const res = await fetch(`${EVENT_SERVER}/card/file?path=${encodeURIComponent(filePath)}`);
      const data = await res.json();
      if (!res.ok) {
        fileError = data.error || 'Failed to load';
        return null;
      }
      return data.content;
    } catch (err: any) {
      fileError = err.message || 'Network error';
      return null;
    } finally {
      loadingFile = false;
    }
  }

  // ── Save file content ────────────────────────────────────────────────────
  async function saveFile() {
    const filePath = card.node.file || card.filePath || card.artifactPath;
    if (!filePath) return;
    saving = true;
    saveMsg = '';
    try {
      const res = await fetch(`${EVENT_SERVER}/card/file`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: filePath, content: editContent, cardId: card.node.id }),
      });
      const data = await res.json();
      if (res.ok) {
        saveMsg = 'Saved';
        // Update the node preview with first 500 chars
        fullContent = editContent;
        setTimeout(() => { saveMsg = ''; }, 2000);
      } else {
        saveMsg = data.error || 'Save failed';
      }
    } catch (err: any) {
      saveMsg = err.message || 'Network error';
    } finally {
      saving = false;
    }
  }

  // ── Switch to edit mode ──────────────────────────────────────────────────
  async function enterEditMode() {
    const content = await loadFullFile();
    if (content != null) {
      editContent = content;
      fullContent = content;
      viewMode = 'edit';
    } else if (card.node.preview) {
      // Fallback to preview content if file not found
      editContent = card.node.preview;
      fullContent = card.node.preview;
      viewMode = 'edit';
    }
  }

  // ── Switch to full view mode ─────────────────────────────────────────────
  async function enterFullView() {
    if (fullContent) {
      viewMode = 'fullview';
      return;
    }
    // Try loading full file from server
    const content = await loadFullFile();
    if (content != null) {
      fullContent = content;
    } else {
      // Fallback to preview content
      fullContent = card.node.preview || card.node.desc || 'No content available';
      fileError = ''; // clear error — we have fallback
    }
    viewMode = 'fullview';
  }

  function backToPreview() {
    viewMode = 'preview';
    saveMsg = '';
  }

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

  // ── Real-time agent status for this card ────────────────────────────────
  let liveStatuses = $state<Map<string, AgentLiveStatus>>(new Map());
  let allEvents = $state<KanbanEvent[]>([]);
  let isWsConnected = $state(false);

  $effect(() => {
    const unsub = agentLiveStatuses.subscribe(v => { liveStatuses = v; });
    return unsub;
  });
  $effect(() => {
    const unsub = recentEvents.subscribe(v => { allEvents = v; });
    return unsub;
  });
  $effect(() => {
    const unsub = wsConnected.subscribe(v => { isWsConnected = v; });
    return unsub;
  });

  // Console output for this card
  let allConsoleOutput = $state<Map<string, ConsoleLine[]>>(new Map());
  $effect(() => {
    const unsub = agentConsoleOutput.subscribe(v => { allConsoleOutput = v; });
    return unsub;
  });
  let consoleLines = $derived(allConsoleOutput.get(card.node.id) ?? []);

  // Auto-scroll console to bottom when new lines arrive
  let consoleEl = $state<HTMLDivElement | null>(null);
  $effect(() => {
    // Depend on consoleLines length so this re-runs when lines are added
    const _len = consoleLines.length;
    if (consoleEl) {
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }
  });

  // Live status for this card
  let liveStatus = $derived(liveStatuses.get(card.node.id) ?? null);
  let isLive = $derived(liveStatus?.state === 'working');

  // Filter recent events for this card (latest first, max 30)
  let cardEvents = $derived(
    allEvents
      .filter(e => {
        const data = e.data as Record<string, unknown>;
        return e.cardId === card.node.id ||
               (data?.cardId as string) === card.node.id ||
               (data?.sessionId as string) === card.node.id;
      })
      .slice(-30)
      .reverse()
  );

  // Event type display helpers
  function eventIcon(type: string): string {
    if (type.includes('started')) return '\u25B6';
    if (type.includes('progress')) return '\u25C9';
    if (type.includes('completed')) return '\u2714';
    if (type.includes('failed')) return '\u2718';
    if (type.includes('moved')) return '\u2192';
    return '\u25CF';
  }

  function eventColor(type: string): string {
    if (type.includes('started')) return '#00ff88';
    if (type.includes('progress')) return '#00e5ff';
    if (type.includes('completed')) return '#00e5ff';
    if (type.includes('failed')) return '#ff5555';
    if (type.includes('moved')) return '#b44dff';
    return '#888';
  }

  function eventMessage(event: KanbanEvent): string {
    const data = event.data as Record<string, unknown>;
    const msg = (data?.message as string) || (data?.output as string) || (data?.stderr as string) || '';
    return msg.trim().slice(0, 100) || event.type.split(':')[1] || event.type;
  }

  function eventTime(ts: string): string {
    try {
      const d = new Date(ts);
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    } catch { return ''; }
  }

  // Activity log for this card
  let allLogs = $state<LogEntry[]>([]);
  $effect(() => {
    const unsub = activityLog.subscribe(v => { allLogs = v; });
    return unsub;
  });
  let cardLogs = $derived(getCardLogs(allLogs, card.node.id));

  // Format log action for display
  function formatAction(action: string): string {
    const parts = action.split(':');
    return parts.length === 2 ? `${parts[1]}` : action;
  }

  function actionColor(action: string): string {
    if (action.includes('started') || action.includes('running')) return '#00ff88';
    if (action.includes('paused') || action.includes('blocked')) return '#f97316';
    if (action.includes('completed')) return '#00e5ff';
    if (action.includes('failed')) return '#ff5555';
    if (action.includes('moved')) return '#b44dff';
    if (action.includes('agent')) return '#eab308';
    if (action.includes('command')) return '#00e5ff';
    return '#888';
  }

  function handleRerunClick(cmd: string) {
    const filePath = card.artifactPath || card.filePath;
    onRerun(cmd, filePath);
  }

  // Has a source file?
  let hasFile = $derived(Boolean(card.node.file || card.filePath || card.artifactPath));

  // ── Edit Card Details ─────────────────────────────────────────────────────
  let editingDetails = $state(false);
  let editTitle = $state('');
  let editDescription = $state('');
  let editCardType = $state<CardType>('spec');
  let editSection = $state('');
  let editCustomSection = $state('');

  // Is this a locally-created card (editable metadata)?
  let isLocalCard = $derived(card.node.id.startsWith('local-'));
  let editFiles = $state<File[]>([]);

  let allSections = $derived(Object.keys(CATEGORIES).sort());
  let effectiveEditSection = $derived(editSection === '__custom' ? editCustomSection : editSection);

  // Upload path preview
  let editDateStr = $derived.by(() => {
    const now = new Date();
    return `${String(now.getDate()).padStart(2,'0')}_${String(now.getMonth()+1).padStart(2,'0')}_${now.getFullYear()}`;
  });
  let editUploadPath = $derived(
    editFiles.length > 0
      ? `uploads/${editDateStr}/${effectiveEditSection || 'general'}/`
      : null
  );

  function handleEditFiles(incoming: File[]) {
    editFiles = incoming;
  }

  function startEditDetails() {
    editTitle = card.node.label || '';
    editDescription = card.node.desc || '';
    editCardType = card.type;
    const currentCat = card.node.cat || '';
    if (currentCat && allSections.includes(currentCat)) {
      editSection = currentCat;
      editCustomSection = '';
    } else if (currentCat && currentCat !== 'local') {
      editSection = '__custom';
      editCustomSection = currentCat;
    } else {
      editSection = '';
      editCustomSection = '';
    }
    editFiles = [];
    editingDetails = true;
    viewMode = 'details';
  }

  /** Read File as base64 */
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Strip data URL prefix: "data:...;base64,"
        resolve(result.split(',')[1] || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /** Upload files to event server */
  async function uploadFiles(uploadPath: string, files: File[], cardId: string): Promise<boolean> {
    if (files.length === 0) return true;
    try {
      const fileData = await Promise.all(
        files.map(async (f) => ({ name: f.name, data: await fileToBase64(f) }))
      );
      const res = await fetch(`${EVENT_SERVER}/card/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uploadPath, files: fileData, cardId }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  let savingDetails = $state(false);

  /** Save details — for local cards updates store, for graph cards converts to local */
  async function saveDetails(mode: 'save' | 'draft' | 'start') {
    if (!editTitle.trim()) return;
    savingDetails = true;
    saveMsg = '';
    const section = effectiveEditSection || undefined;
    const upPath = editUploadPath ?? undefined;

    // Upload files first if any — don't block workflow on upload failure
    let uploadOk = true;
    if (editFiles.length > 0 && upPath) {
      const targetId = isLocalCard ? card.node.id : 'pending';
      uploadOk = await uploadFiles(upPath, editFiles, targetId);
      if (!uploadOk) saveMsg = 'File upload failed — workflow started without files';
    }

    // Determine the card ID to operate on
    let targetCardId = card.node.id;

    if (isLocalCard) {
      updateLocalCard(card.node.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        type: editCardType,
        section,
        uploadPath: upPath,
      });
      card.node.label = editTitle.trim();
      card.node.desc = editDescription.trim();
      card.node.cat = section || card.node.cat;
    } else {
      // Graph node — create a local override card
      targetCardId = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      addLocalCard({
        id: targetCardId,
        title: editTitle.trim(),
        description: editDescription.trim(),
        section,
        column: mode === 'draft' ? 'create' : card.status,
        type: editCardType,
        uploadPath: upPath,
        createdAt: Date.now(),
      });
      // Re-upload with correct cardId
      if (editFiles.length > 0 && upPath) {
        await uploadFiles(upPath, editFiles, targetCardId);
      }
    }

    // Handle mode: draft vs start vs save
    if (mode === 'draft') {
      if (isLocalCard) updateLocalCard(targetCardId, { column: 'create' });
      moveCard(targetCardId, 'create');
      updateLifecycle(targetCardId, 'idle');
    } else if (mode === 'start') {
      moveCard(targetCardId, 'design');
      startWorkflow(targetCardId, restartChainId);
      updateLifecycle(targetCardId, 'started');
      addLog(targetCardId, 'workflow:started', { chainId: restartChainId });
    }

    savingDetails = false;
    editingDetails = false;
    if (saveMsg) {
      // Show error briefly then close
      setTimeout(() => { saveMsg = ''; viewMode = 'preview'; }, 2000);
    } else {
      viewMode = 'preview';
    }
  }

  function cancelEditDetails() {
    editingDetails = false;
    viewMode = 'preview';
  }

  // ── Restart Workflow ──────────────────────────────────────────────────────
  let restartChainId = $state('feature');
  let hasWorkflow = $state(false);

  $effect(() => {
    const unsub = workflowExecutions.subscribe(v => {
      hasWorkflow = Boolean(v[card.node.id]);
      if (v[card.node.id]?.chainId) {
        restartChainId = v[card.node.id].chainId;
      }
    });
    return unsub;
  });

  function restartWorkflow() {
    removeWorkflow(card.node.id);
    moveCard(card.node.id, 'design');
    startWorkflow(card.node.id, restartChainId);
    updateLifecycle(card.node.id, 'started');
    addLog(card.node.id, 'workflow:restarted', { chainId: restartChainId });
  }

  function startNewWorkflow() {
    moveCard(card.node.id, 'design');
    startWorkflow(card.node.id, restartChainId);
    updateLifecycle(card.node.id, 'started');
    addLog(card.node.id, 'workflow:started', { chainId: restartChainId });
  }

  // Handle keyboard — Escape closes full view or whole card
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (viewMode === 'fullview') backToPreview();
      else if (viewMode === 'edit') backToPreview();
      else if (viewMode === 'details') cancelEditDetails();
      else onClose();
    }
  }

  // Auto-focus overlay for keyboard events
  let overlayEl: HTMLDivElement;
  $effect(() => {
    if (overlayEl) overlayEl.focus();
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

{#if viewMode === 'fullview'}
  <!-- ═══ FULL VIEW MODAL ═══ -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="fullview-overlay" onclick={backToPreview} onkeydown={handleKeydown} tabindex="0" bind:this={overlayEl}>
    <div class="fullview-panel" onclick={(e) => e.stopPropagation()}>
      <div class="fullview-header">
        <div class="fullview-title">{card.node.label}</div>
        <div class="fullview-actions">
          <button class="fv-btn" onclick={enterEditMode}>Edit</button>
          <button class="fv-btn fv-close" onclick={backToPreview}>Back</button>
        </div>
      </div>
      <div class="fullview-body">
        {#if loadingFile}
          <div class="loading-msg">Loading...</div>
        {:else if fileError}
          <div class="error-msg">{fileError}</div>
        {:else}
          <div class="fullview-md">
            {@html renderMd(fullContent)}
          </div>
        {/if}
      </div>
    </div>
  </div>

{:else}
  <!-- ═══ CARD PREVIEW / EDIT MODAL ═══ -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="preview-overlay" onclick={onClose} onkeydown={handleKeydown} tabindex="0" bind:this={overlayEl}>
    <div class="preview-panel" class:panel-wide={viewMode === 'edit' || viewMode === 'details'} onclick={(e) => e.stopPropagation()}>
      <!-- Header -->
      <div class="preview-header">
        {#if viewMode !== 'details'}
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
        {:else}
          <div class="preview-title-area">
            <div class="preview-title" style="font-size: 12px; color: #888">Editing: {card.node.label}</div>
          </div>
        {/if}
        <div class="header-actions">
          {#if viewMode === 'edit'}
            <button class="action-btn save-btn" onclick={saveFile} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button class="action-btn" onclick={backToPreview}>Cancel</button>
          {:else if viewMode === 'details'}
            <button class="action-btn" onclick={cancelEditDetails}>Back</button>
          {:else}
            <button class="action-btn edit-btn" onclick={startEditDetails}>Edit Details</button>
            {#if hasFile}
              <button class="action-btn edit-btn" onclick={enterEditMode} disabled={loadingFile}>
                {loadingFile ? '...' : 'Edit MD'}
              </button>
              <button class="action-btn fullview-btn" onclick={enterFullView} disabled={loadingFile}>
                Full View
              </button>
            {/if}
          {/if}
          <button class="preview-close" onclick={onClose}>×</button>
        </div>
      </div>

      {#if saveMsg}
        <div class="save-banner" class:save-ok={saveMsg === 'Saved'} class:save-err={saveMsg !== 'Saved'}>
          {saveMsg}
        </div>
      {/if}

      <div class="preview-body">
        <!-- Left: Content preview / editor / details form -->
        <div class="preview-content">
          {#if viewMode === 'details'}
            <!-- ── Edit Card Details Form ── -->
            <div class="details-form">
              <div class="df-title">EDIT CARD DETAILS</div>
              <div class="df-divider"></div>

              <div class="df-field">
                <label class="df-label">Title</label>
                <input class="df-input" type="text" bind:value={editTitle} placeholder="Card title..." />
              </div>

              <div class="df-field">
                <label class="df-label">Section</label>
                <select class="df-select" bind:value={editSection}>
                  <option value="">Select section</option>
                  {#each allSections as s}
                    <option value={s}>{CATEGORIES[s]?.label || s}</option>
                  {/each}
                  <option value="__custom">Custom...</option>
                </select>
                {#if editSection === '__custom'}
                  <input class="df-input df-mt" type="text" bind:value={editCustomSection} placeholder="Custom section name..." />
                {/if}
              </div>

              <div class="df-field">
                <label class="df-label">Type</label>
                <div class="df-type-options">
                  {#each [['spec','\u{1F4CB}','Spec'],['discussion','\u{1F4AC}','Discussion'],['task','\u{1F527}','Task'],['issue','\u{1F41B}','Issue']] as [val, icon, label]}
                    <label class="df-type-opt" class:df-type-sel={editCardType === val}>
                      <input type="radio" bind:group={editCardType} value={val} />
                      <span>{icon} {label}</span>
                    </label>
                  {/each}
                </div>
              </div>

              <div class="df-field">
                <label class="df-label">Description</label>
                <textarea class="df-textarea" bind:value={editDescription} rows="4" placeholder="Brief description..."></textarea>
              </div>

              <div class="df-field">
                <label class="df-label">Workflow</label>
                <select class="df-select" bind:value={restartChainId}>
                  {#each WORKFLOW_CHAINS as chain}
                    <option value={chain.id}>{chain.name} ({chain.steps.length} steps)</option>
                  {/each}
                </select>
              </div>

              <div class="df-field">
                <label class="df-label">Attachments</label>
                <FileDropZone onFiles={handleEditFiles} />
                {#if editUploadPath}
                  <div class="df-upload-path">Files will be saved to: {editUploadPath}</div>
                {/if}
              </div>

              {#if !isLocalCard}
                <div class="df-hint">This is a graph node — saving will create a local copy</div>
              {/if}

              <div class="df-divider"></div>
              <div class="df-actions">
                <button class="df-btn df-btn-start" onclick={() => saveDetails('start')} disabled={!editTitle.trim() || savingDetails}>
                  {savingDetails ? 'Saving...' : 'Save & Start Workflow'}
                </button>
                <button class="df-btn df-btn-save" onclick={() => saveDetails('save')} disabled={!editTitle.trim() || savingDetails}>
                  {savingDetails ? 'Saving...' : 'Save'}
                </button>
                <button class="df-btn df-btn-draft" onclick={() => saveDetails('draft')} disabled={!editTitle.trim() || savingDetails}>
                  Save as Draft
                </button>
                <button class="df-btn df-btn-cancel" onclick={cancelEditDetails} disabled={savingDetails}>Cancel</button>
              </div>
            </div>

          {:else if viewMode === 'edit'}
            <!-- ── Markdown Editor ── -->
            <div class="editor-area">
              <div class="editor-tabs">
                <span class="editor-tab active">Markdown</span>
                <span class="editor-file">{card.node.file || card.filePath || ''}</span>
              </div>
              <textarea
                class="md-editor"
                bind:value={editContent}
                spellcheck="false"
              ></textarea>
            </div>
          {:else}
            <!-- ── Preview ── -->
            {#if card.node.preview}
              <div class="markdown-body">
                {@html renderMd(card.node.preview)}
              </div>
            {:else if card.filePath || card.node.file}
              <div class="file-ref">
                <span class="file-icon">&#x1F4C4;</span>
                <span class="file-path">{card.filePath || card.node.file}</span>
              </div>
            {:else}
              <div class="no-content">No content preview available</div>
            {/if}

            {#if card.node.desc}
              <div class="card-desc">{card.node.desc}</div>
            {/if}

            {#if fileError}
              <div class="error-msg" style="margin-top: 8px">{fileError}</div>
            {/if}
          {/if}
        </div>

        <!-- Right: Actions sidebar (hidden in details edit mode) -->
        {#if viewMode !== 'details'}
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

          <!-- Real-time Activity -->
          {#if isLive || cardEvents.length > 0}
            <div class="sidebar-section">
              <div class="section-label">
                LIVE ACTIVITY
                {#if isLive}
                  <span class="live-dot"></span>
                {:else if isWsConnected}
                  <span class="ws-dot ws-connected"></span>
                {/if}
              </div>

              {#if liveStatus}
                <div class="live-status-card" class:live-active={isLive}>
                  <div class="live-header">
                    <span class="live-state live-state-{liveStatus.state}">{liveStatus.state.toUpperCase()}</span>
                    {#if liveStatus.progress != null && liveStatus.progress > 0}
                      <span class="live-pct">{liveStatus.progress}%</span>
                    {/if}
                  </div>
                  {#if liveStatus.lastAction}
                    <div class="live-action">{liveStatus.lastAction}</div>
                  {/if}
                  {#if liveStatus.progress != null && liveStatus.progress > 0}
                    <div class="live-bar">
                      <div class="live-bar-fill" style="width: {liveStatus.progress}%"></div>
                    </div>
                  {/if}
                </div>
              {/if}

              {#if cardEvents.length > 0}
                <div class="event-feed">
                  {#each cardEvents.slice(0, 15) as evt (evt.id)}
                    <div class="event-row">
                      <span class="event-icon" style="color: {eventColor(evt.type)}">{eventIcon(evt.type)}</span>
                      <div class="event-body">
                        <span class="event-msg">{eventMessage(evt)}</span>
                      </div>
                      <span class="event-time">{eventTime(evt.timestamp)}</span>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}

          <!-- Agent Console -->
          <div class="sidebar-section">
            <div class="section-label">
              AGENT CONSOLE
              {#if isLive}
                <span class="console-live-dot"></span>
              {/if}
            </div>
            <div class="console-box" bind:this={consoleEl}>
              {#if consoleLines.length === 0}
                <div class="console-empty">No agent output</div>
              {:else}
                {#each consoleLines as line (line.timestamp + line.text)}
                  <div class="console-line console-{line.stream}">{line.text}</div>
                {/each}
              {/if}
            </div>
          </div>

          <!-- Card Details -->
          <div class="sidebar-section">
            <div class="section-label">
              CARD DETAILS
              <button class="inline-edit-btn" onclick={startEditDetails}>Edit</button>
            </div>
            <div class="detail-row"><span class="detail-key">Title:</span> <span class="detail-val">{card.node.label}</span></div>
            <div class="detail-row"><span class="detail-key">Type:</span> <span class="detail-val">{card.type}</span></div>
            {#if card.node.cat}
              <div class="detail-row"><span class="detail-key">Section:</span> <span class="detail-val">{card.node.cat}</span></div>
            {/if}
            {#if card.node.desc}
              <div class="detail-row"><span class="detail-key">Desc:</span> <span class="detail-val detail-desc">{card.node.desc}</span></div>
            {/if}
          </div>

          <!-- Workflow History + Restart -->
          <div class="sidebar-section">
            <div class="section-label">WORKFLOW</div>
            <WorkflowHistory cardId={card.node.id} />
            <div class="workflow-actions">
              {#if hasWorkflow}
                <button class="wf-btn wf-restart" onclick={restartWorkflow}>Restart Workflow</button>
              {:else}
                <div class="wf-start-group">
                  <select class="ed-select" bind:value={restartChainId}>
                    {#each WORKFLOW_CHAINS as chain}
                      <option value={chain.id}>{chain.name}</option>
                    {/each}
                  </select>
                  <button class="wf-btn wf-start" onclick={startNewWorkflow}>Start Workflow</button>
                </div>
              {/if}
            </div>
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
          {#if card.artifactPath || card.uploadPath || card.node.file || uploadedFiles.length > 0}
            <div class="sidebar-section">
              <div class="section-label">FILES {#if uploadedFiles.length > 0}<span class="log-count">{uploadedFiles.length}</span>{/if}</div>
              {#if card.node.file}
                <div class="file-entry">Source: {card.node.file}</div>
              {/if}
              {#if card.artifactPath}
                <div class="file-entry">Artifact: {card.artifactPath}</div>
              {/if}
              {#if card.uploadPath && uploadedFiles.length === 0}
                <div class="file-entry">Upload: {card.uploadPath}</div>
              {/if}
              {#if loadingFiles}
                <div class="file-entry" style="color: #555">Loading files...</div>
              {/if}
              {#each uploadedFiles as file (file.id)}
                <a
                  class="uploaded-file-entry"
                  href="{EVENT_SERVER}/blob/{file.id}"
                  target="_blank"
                  rel="noopener"
                >
                  <span class="uf-icon">{getFileIcon(file.mime_type)}</span>
                  <span class="uf-name">{file.original_name}</span>
                  <span class="uf-size">{formatFileSize(file.size)}</span>
                </a>
              {/each}
            </div>
          {/if}

          <!-- Activity Log -->
          {#if cardLogs.length > 0}
            <div class="sidebar-section">
              <div class="section-label">ACTIVITY LOG <span class="log-count">{cardLogs.length}</span></div>
              <div class="log-list">
                {#each cardLogs.slice(0, 20) as entry (entry.id)}
                  <div class="log-entry">
                    <span class="log-dot" style="background: {actionColor(entry.action)}"></span>
                    <div class="log-detail">
                      <span class="log-action" style="color: {actionColor(entry.action)}">{formatAction(entry.action)}</span>
                      {#if entry.detail.to && entry.action === 'card:moved'}
                        <span class="log-meta">{entry.detail.from ?? '?'} → {entry.detail.to}</span>
                      {:else if entry.detail.agent}
                        <span class="log-meta">{entry.detail.agent}</span>
                      {:else if entry.detail.command}
                        <span class="log-meta">{entry.detail.command}</span>
                      {:else if entry.detail.from && entry.detail.to}
                        <span class="log-meta">{entry.detail.from} → {entry.detail.to}</span>
                      {/if}
                    </div>
                    <span class="log-time">{timeAgo(entry.timestamp)}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  /* ═══ PREVIEW OVERLAY ═══ */
  .preview-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
  }
  .preview-panel {
    background: #131620; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; width: 95vw; max-width: 1400px; max-height: 90vh;
    display: flex; flex-direction: column; overflow: hidden;
    font-family: var(--font, 'JetBrains Mono', monospace);
    transition: width 0.2s ease;
  }
  .panel-wide { width: 95vw; max-width: 1400px; }

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

  .header-actions {
    display: flex; gap: 6px; align-items: center; flex-shrink: 0;
  }
  .action-btn {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    color: #aaa; font-size: 11px; padding: 4px 12px; border-radius: 5px;
    cursor: pointer; font-family: inherit; transition: all 0.15s;
  }
  .action-btn:hover { background: rgba(255,255,255,0.1); color: #ddd; }
  .action-btn:disabled { opacity: 0.4; cursor: default; }

  .edit-btn:hover { border-color: rgba(0,229,255,0.3); color: #00e5ff; }
  .fullview-btn { color: #b44dff; border-color: rgba(180,77,255,0.2); }
  .fullview-btn:hover { background: rgba(180,77,255,0.1); border-color: rgba(180,77,255,0.4); color: #d080ff; }
  .save-btn { color: #00ff88; border-color: rgba(0,255,136,0.2); }
  .save-btn:hover { background: rgba(0,255,136,0.1); border-color: rgba(0,255,136,0.4); }

  .preview-close {
    background: none; border: none; color: #666;
    font-size: 20px; cursor: pointer; padding: 0 4px;
    line-height: 1;
  }
  .preview-close:hover { color: #ccc; }

  /* Save banner */
  .save-banner {
    padding: 4px 20px; font-size: 11px; text-align: center;
    animation: fadeIn 0.2s;
  }
  .save-ok { background: rgba(0,255,136,0.08); color: #00ff88; }
  .save-err { background: rgba(255,85,85,0.08); color: #ff5555; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* Body layout — 12-column grid */
  .preview-body {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    flex: 1; overflow: hidden;
  }

  /* Content area — 8 of 12 columns (full 12 when sidebar hidden) */
  .preview-content {
    grid-column: span 8;
    padding: 20px; overflow-y: auto;
    border-right: 1px solid rgba(255,255,255,0.04);
  }
  .preview-content:only-child {
    grid-column: span 12;
    border-right: none;
  }
  .preview-content::-webkit-scrollbar { width: 4px; }
  .preview-content::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08); border-radius: 2px;
  }

  /* Markdown body */
  .markdown-body { font-size: 12px; color: #bbb; line-height: 1.6; }
  .markdown-body :global(h1) { font-size: 16px; color: #e0e0e0; margin: 16px 0 8px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 4px; }
  .markdown-body :global(h2) { font-size: 14px; color: #d0d0d0; margin: 14px 0 6px; }
  .markdown-body :global(h3) { font-size: 12px; color: #c0c0c0; margin: 12px 0 4px; }
  .markdown-body :global(code) {
    background: rgba(0,229,255,0.06); color: #00e5ff;
    padding: 2px 5px; border-radius: 3px; font-size: 11px;
  }
  .markdown-body :global(pre) {
    background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px; padding: 10px; overflow-x: auto; margin: 8px 0;
  }
  .markdown-body :global(pre code) {
    background: none; padding: 0; color: #ccc;
  }
  .markdown-body :global(strong) { color: #e0e0e0; }
  .markdown-body :global(li) { margin: 2px 0; padding-left: 8px; }
  .markdown-body :global(table) {
    width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 11px;
  }
  .markdown-body :global(th) {
    text-align: left; padding: 4px 8px; border-bottom: 1px solid rgba(255,255,255,0.1);
    color: #999; font-weight: 600;
  }
  .markdown-body :global(td) {
    padding: 3px 8px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #aaa;
  }
  .markdown-body :global(blockquote) {
    border-left: 3px solid rgba(0,229,255,0.3); padding-left: 12px;
    margin: 8px 0; color: #888;
  }
  .markdown-body :global(hr) {
    border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 12px 0;
  }
  .markdown-body :global(a) { color: #00e5ff; text-decoration: none; }
  .markdown-body :global(a:hover) { text-decoration: underline; }

  /* Editor */
  .editor-area { display: flex; flex-direction: column; height: 100%; }
  .editor-tabs {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 8px; font-size: 10px;
  }
  .editor-tab {
    color: #00e5ff; border-bottom: 1px solid #00e5ff;
    padding-bottom: 2px; font-weight: 600;
  }
  .editor-file { color: #555; margin-left: auto; font-size: 9px; }
  .md-editor {
    flex: 1; min-height: 300px;
    background: rgba(0,0,0,0.3); color: #ccc;
    border: 1px solid rgba(255,255,255,0.08); border-radius: 6px;
    padding: 12px; font-family: 'JetBrains Mono', monospace;
    font-size: 12px; line-height: 1.6; resize: none;
    outline: none; tab-size: 2;
  }
  .md-editor:focus { border-color: rgba(0,229,255,0.3); }
  .md-editor::-webkit-scrollbar { width: 4px; }
  .md-editor::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08); border-radius: 2px;
  }

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

  .loading-msg { color: #555; font-size: 12px; padding: 20px; text-align: center; }
  .error-msg { color: #ff5555; font-size: 11px; padding: 6px 10px; background: rgba(255,85,85,0.06); border-radius: 4px; }

  /* Sidebar — 4 of 12 columns */
  .preview-sidebar {
    grid-column: span 4;
    padding: 16px;
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
  .uploaded-file-entry {
    display: flex; align-items: center; gap: 6px;
    padding: 5px 8px; margin-bottom: 3px;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 5px; text-decoration: none;
    transition: background 0.15s, border-color 0.15s;
    cursor: pointer;
  }
  .uploaded-file-entry:hover {
    background: rgba(0,229,255,0.06); border-color: rgba(0,229,255,0.2);
  }
  .uf-icon { font-size: 11px; flex-shrink: 0; }
  .uf-name {
    flex: 1; font-size: 10px; color: #aaa;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .uploaded-file-entry:hover .uf-name { color: #00e5ff; }
  .uf-size { font-size: 9px; color: #555; flex-shrink: 0; }

  /* ── Real-time Activity ── */
  .live-dot {
    display: inline-block; width: 6px; height: 6px;
    border-radius: 50%; background: #00ff88; margin-left: 6px;
    animation: livePulse 1.2s infinite;
    vertical-align: middle;
  }
  @keyframes livePulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 4px #00ff88; }
    50% { opacity: 0.4; box-shadow: none; }
  }
  .ws-dot {
    display: inline-block; width: 5px; height: 5px;
    border-radius: 50%; margin-left: 6px; vertical-align: middle;
  }
  .ws-connected { background: #444; }

  .live-status-card {
    padding: 8px 10px; border-radius: 6px; margin-bottom: 8px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    transition: all 0.2s;
  }
  .live-status-card.live-active {
    background: rgba(0,255,136,0.04);
    border-color: rgba(0,255,136,0.15);
  }
  .live-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 4px;
  }
  .live-state {
    font-size: 9px; font-weight: 700; letter-spacing: 0.06em;
    padding: 2px 6px; border-radius: 3px;
  }
  .live-state-working { color: #00ff88; background: rgba(0,255,136,0.1); }
  .live-state-done { color: #00e5ff; background: rgba(0,229,255,0.1); }
  .live-state-error { color: #ff5555; background: rgba(255,85,85,0.1); }
  .live-state-idle { color: #666; background: rgba(255,255,255,0.04); }
  .live-pct { font-size: 10px; color: #00ff88; font-weight: 600; }
  .live-action {
    font-size: 10px; color: #9098a8; line-height: 1.4;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    margin-bottom: 4px;
  }
  .live-bar {
    height: 2px; background: rgba(255,255,255,0.06);
    border-radius: 1px; overflow: hidden;
  }
  .live-bar-fill {
    height: 100%; background: #00ff88; border-radius: 1px;
    transition: width 0.3s ease;
  }

  .event-feed {
    display: flex; flex-direction: column; gap: 1px;
    max-height: 180px; overflow-y: auto;
  }
  .event-feed::-webkit-scrollbar { width: 3px; }
  .event-feed::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.06); border-radius: 2px;
  }
  .event-row {
    display: flex; align-items: flex-start; gap: 5px;
    padding: 3px 4px; border-radius: 3px;
    font-size: 10px;
  }
  .event-row:hover { background: rgba(255,255,255,0.03); }
  .event-icon { flex-shrink: 0; font-size: 9px; margin-top: 2px; }
  .event-body { flex: 1; min-width: 0; }
  .event-msg {
    color: #8090a0; font-size: 9px; line-height: 1.3;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    display: block;
  }
  .event-time {
    font-size: 8px; color: #3a3f50; flex-shrink: 0;
    white-space: nowrap; margin-top: 1px;
  }

  /* Activity Log */
  .log-count {
    font-size: 9px; color: #444; font-weight: 400;
    margin-left: 4px;
  }
  .log-list {
    display: flex; flex-direction: column; gap: 2px;
    max-height: 200px; overflow-y: auto;
  }
  .log-list::-webkit-scrollbar { width: 3px; }
  .log-list::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.06); border-radius: 2px;
  }
  .log-entry {
    display: flex; align-items: flex-start; gap: 6px;
    padding: 4px 6px; border-radius: 4px;
    background: rgba(255,255,255,0.02);
  }
  .log-entry:hover { background: rgba(255,255,255,0.04); }
  .log-dot {
    width: 5px; height: 5px; border-radius: 50%;
    flex-shrink: 0; margin-top: 4px;
  }
  .log-detail {
    flex: 1; min-width: 0;
    display: flex; flex-direction: column; gap: 1px;
  }
  .log-action {
    font-size: 10px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .log-meta {
    font-size: 9px; color: #555;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .log-time {
    font-size: 9px; color: #3a3f50; flex-shrink: 0;
    white-space: nowrap;
  }

  /* ═══ FULL VIEW OVERLAY ═══ */
  .fullview-overlay {
    position: fixed; inset: 0; z-index: 250;
    background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center;
  }
  .fullview-panel {
    background: #0e1118; border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; width: 80vw; max-width: 1000px; max-height: 90vh;
    display: flex; flex-direction: column; overflow: hidden;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }
  .fullview-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .fullview-title {
    font-size: 14px; font-weight: 700; color: #e8e8ec;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .fullview-actions { display: flex; gap: 6px; }
  .fv-btn {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    color: #aaa; font-size: 11px; padding: 4px 14px; border-radius: 5px;
    cursor: pointer; font-family: inherit; transition: all 0.15s;
  }
  .fv-btn:hover { background: rgba(255,255,255,0.1); color: #ddd; }
  .fv-close { color: #888; }
  .fullview-body {
    flex: 1; overflow-y: auto; padding: 24px 32px;
  }
  .fullview-body::-webkit-scrollbar { width: 5px; }
  .fullview-body::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08); border-radius: 3px;
  }
  .fullview-md { font-size: 13px; color: #ccc; line-height: 1.7; }
  .fullview-md :global(h1) { font-size: 20px; color: #e8e8ec; margin: 20px 0 10px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px; }
  .fullview-md :global(h2) { font-size: 17px; color: #ddd; margin: 18px 0 8px; }
  .fullview-md :global(h3) { font-size: 14px; color: #ccc; margin: 14px 0 6px; }
  .fullview-md :global(code) {
    background: rgba(0,229,255,0.06); color: #00e5ff;
    padding: 2px 5px; border-radius: 3px; font-size: 12px;
  }
  .fullview-md :global(pre) {
    background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px; padding: 14px; overflow-x: auto; margin: 10px 0;
  }
  .fullview-md :global(pre code) { background: none; padding: 0; color: #ccc; font-size: 12px; }
  .fullview-md :global(strong) { color: #e0e0e0; }
  .fullview-md :global(li) { margin: 3px 0; padding-left: 8px; }
  .fullview-md :global(table) {
    width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px;
  }
  .fullview-md :global(th) {
    text-align: left; padding: 6px 10px; border-bottom: 1px solid rgba(255,255,255,0.1);
    color: #999; font-weight: 600;
  }
  .fullview-md :global(td) {
    padding: 4px 10px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #bbb;
  }
  .fullview-md :global(blockquote) {
    border-left: 3px solid rgba(180,77,255,0.4); padding-left: 14px;
    margin: 10px 0; color: #999;
  }
  .fullview-md :global(hr) {
    border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 16px 0;
  }
  .fullview-md :global(a) { color: #00e5ff; text-decoration: none; }
  .fullview-md :global(a:hover) { text-decoration: underline; }

  /* ═══ AGENT CONSOLE ═══ */
  .console-live-dot {
    display: inline-block; width: 6px; height: 6px;
    border-radius: 50%; background: #00ff88; margin-left: 6px;
    animation: livePulse 1.2s infinite;
    vertical-align: middle;
  }
  .console-box {
    background: #0a0c10; border: 1px solid rgba(255,255,255,0.06);
    border-radius: 5px; padding: 8px; font-family: 'JetBrains Mono', monospace;
    font-size: 9px; line-height: 1.5; max-height: 200px; overflow-y: auto;
    min-height: 36px;
  }
  .console-box::-webkit-scrollbar { width: 3px; }
  .console-box::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.08); border-radius: 2px;
  }
  .console-empty {
    color: #3a3f50; font-style: italic; text-align: center; padding: 4px 0;
  }
  .console-line {
    white-space: pre-wrap; word-break: break-all; display: block;
    margin: 0; padding: 0;
  }
  .console-stdout { color: #00cc66; }
  .console-stderr { color: #ff5555; }

  /* ═══ DETAILS FORM (content area) ═══ */
  .details-form {
    max-width: 520px; margin: 0 auto;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }
  .df-title { font-size: 13px; font-weight: 700; color: #e0e0e0; letter-spacing: 0.08em; }
  .df-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 14px 0; }
  .df-field { margin-bottom: 16px; }
  .df-label { display: block; font-size: 11px; color: #666; margin-bottom: 6px; letter-spacing: 0.04em; }
  .df-input, .df-select, .df-textarea {
    width: 100%; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #ccc;
    font-family: inherit; outline: none; box-sizing: border-box;
  }
  .df-input:focus, .df-select:focus, .df-textarea:focus { border-color: rgba(0,229,255,0.4); }
  .df-textarea { resize: vertical; min-height: 60px; }
  .df-mt { margin-top: 6px; }

  .df-type-options { display: flex; gap: 6px; flex-wrap: wrap; }
  .df-type-opt {
    padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; color: #888;
    border: 1px solid rgba(255,255,255,0.06); transition: all 0.15s;
  }
  .df-type-opt:hover { background: rgba(255,255,255,0.04); }
  .df-type-sel { background: rgba(0,229,255,0.08); border-color: rgba(0,229,255,0.3); color: #00e5ff; }
  .df-type-opt input { display: none; }

  .df-upload-path { margin-top: 8px; font-size: 10px; color: #666; font-style: italic; }
  .df-hint { font-size: 10px; color: #555; font-style: italic; margin-bottom: 8px; }

  .df-actions { display: flex; flex-direction: column; gap: 8px; }
  .df-btn {
    border: none; border-radius: 6px; padding: 10px 16px; font-size: 12px;
    font-family: inherit; cursor: pointer; font-weight: 600; transition: all 0.15s;
  }
  .df-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .df-btn-start { background: rgba(0,255,136,0.15); color: #00ff88; border: 1px solid rgba(0,255,136,0.3); }
  .df-btn-start:hover:not(:disabled) { background: rgba(0,255,136,0.25); }
  .df-btn-save { background: rgba(0,229,255,0.15); color: #00e5ff; border: 1px solid rgba(0,229,255,0.3); }
  .df-btn-save:hover:not(:disabled) { background: rgba(0,229,255,0.25); }
  .df-btn-draft { background: rgba(255,255,255,0.05); color: #aaa; border: 1px solid rgba(255,255,255,0.08); }
  .df-btn-draft:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
  .df-btn-cancel { background: transparent; color: #666; }
  .df-btn-cancel:hover { color: #999; }

  /* ═══ CARD DETAILS (sidebar) ═══ */
  .inline-edit-btn {
    background: none; border: none; color: #00e5ff; font-size: 9px;
    cursor: pointer; margin-left: 6px; font-family: inherit;
    opacity: 0.6; transition: opacity 0.15s;
  }
  .inline-edit-btn:hover { opacity: 1; }

  .detail-row { font-size: 10px; color: #888; margin-bottom: 3px; display: flex; gap: 4px; }
  .detail-key { color: #555; flex-shrink: 0; }
  .detail-val { color: #aaa; overflow: hidden; text-overflow: ellipsis; }
  .detail-desc { white-space: nowrap; max-width: 140px; }

  /* ═══ WORKFLOW ACTIONS ═══ */
  .workflow-actions { margin-top: 8px; }
  .wf-btn {
    width: 100%; padding: 6px 10px; border-radius: 5px;
    font-size: 10px; font-weight: 600; cursor: pointer;
    font-family: inherit; transition: all 0.15s;
  }
  .wf-restart {
    background: rgba(249,115,22,0.12); color: #f97316;
    border: 1px solid rgba(249,115,22,0.25);
  }
  .wf-restart:hover { background: rgba(249,115,22,0.2); }
  .wf-start {
    background: rgba(0,255,136,0.12); color: #00ff88;
    border: 1px solid rgba(0,255,136,0.25);
  }
  .wf-start:hover { background: rgba(0,255,136,0.2); }
  .wf-start-group { display: flex; flex-direction: column; gap: 6px; }
</style>
