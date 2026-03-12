<script lang="ts">
  /**
   * FileDropZone.svelte — Reusable drag-and-drop file upload zone.
   *
   * Props:
   *   onFiles  — callback invoked with the selected File array
   *   accept   — comma-separated MIME types (e.g. "image/*,application/pdf")
   *   maxFiles — maximum number of files allowed (0 = unlimited)
   */

  interface Props {
    onFiles:  (files: File[]) => void;
    accept?:  string;
    maxFiles?: number;
  }

  let { onFiles, accept = '', maxFiles = 0 }: Props = $props();

  // ── State ──────────────────────────────────────────────────────────────────
  let files   = $state<File[]>([]);
  let isDragOver = $state(false);
  let errorMsg   = $state('');

  // ── Helpers ────────────────────────────────────────────────────────────────
  function formatSize(bytes: number): string {
    if (bytes < 1024)          return `${bytes} B`;
    if (bytes < 1024 * 1024)   return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function addFiles(incoming: FileList | File[]): void {
    const list = Array.from(incoming);
    if (maxFiles > 0 && files.length + list.length > maxFiles) {
      errorMsg = `Maximum ${maxFiles} file${maxFiles === 1 ? '' : 's'} allowed.`;
      return;
    }
    errorMsg = '';
    const next = [...files, ...list];
    files = next;
    onFiles(next);
  }

  function removeFile(idx: number): void {
    const next = files.filter((_, i) => i !== idx);
    files = next;
    errorMsg = '';
    onFiles(next);
  }

  // ── Event handlers ─────────────────────────────────────────────────────────
  function onDragOver(e: DragEvent): void {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    isDragOver = true;
  }

  function onDragLeave(e: DragEvent): void {
    // Only clear when leaving the zone itself (not a child element)
    const rel = e.relatedTarget as Node | null;
    const zone = (e.currentTarget as HTMLElement);
    if (!zone.contains(rel)) isDragOver = false;
  }

  function onDrop(e: DragEvent): void {
    e.preventDefault();
    isDragOver = false;
    if (e.dataTransfer?.files?.length) {
      addFiles(e.dataTransfer.files);
    }
  }

  function onInputChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      addFiles(input.files);
      // Reset the input so the same file can be re-selected if removed
      input.value = '';
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="dropzone"
  class:drag-over={isDragOver}
  ondragover={onDragOver}
  ondragleave={onDragLeave}
  ondrop={onDrop}
  role="region"
  aria-label="File drop zone"
>
  <div class="dz-icon">&#x1F4C2;</div>
  <div class="dz-text">
    {#if isDragOver}
      Drop files here
    {:else}
      Drag and drop files here
    {/if}
  </div>
  <div class="dz-or">or</div>
  <label class="browse-btn">
    Browse for files
    <input
      type="file"
      multiple={maxFiles !== 1}
      accept={accept || undefined}
      onchange={onInputChange}
      style="display:none"
    />
  </label>

  {#if maxFiles > 0}
    <div class="dz-limit">Max {maxFiles} file{maxFiles === 1 ? '' : 's'}</div>
  {/if}
</div>

{#if errorMsg}
  <div class="dz-error">{errorMsg}</div>
{/if}

{#if files.length > 0}
  <div class="file-list">
    {#each files as file, idx (file.name + idx)}
      <div class="file-item">
        <span class="file-icon">&#x1F4C4;</span>
        <span class="file-name">{file.name}</span>
        <span class="file-size">{formatSize(file.size)}</span>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="file-remove" onclick={() => removeFile(idx)} title="Remove">&#x2715;</button>
      </div>
    {/each}
  </div>
{/if}

<style>
  /* ── Drop zone ─────────────────────────────────────────────────────────── */
  .dropzone {
    border: 2px dashed rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 24px 16px;
    text-align: center;
    background: #161922;
    transition: border-color 0.15s, background 0.15s;
    cursor: default;
    user-select: none;
  }

  .dropzone:hover {
    border-color: rgba(0, 229, 255, 0.25);
    background: rgba(0, 229, 255, 0.02);
  }

  .dropzone.drag-over {
    border-color: rgba(0, 229, 255, 0.6);
    background: rgba(0, 229, 255, 0.05);
  }

  .dz-icon {
    font-size: 24px;
    margin-bottom: 8px;
    opacity: 0.5;
  }

  .dz-text {
    font-size: 12px;
    color: #666;
    margin-bottom: 6px;
  }

  .dropzone.drag-over .dz-text {
    color: #00e5ff;
  }

  .dz-or {
    font-size: 10px;
    color: #444;
    margin-bottom: 8px;
  }

  .browse-btn {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    color: #00e5ff;
    background: rgba(0, 229, 255, 0.08);
    border: 1px solid rgba(0, 229, 255, 0.2);
    transition: background 0.15s;
    font-family: inherit;
  }

  .browse-btn:hover {
    background: rgba(0, 229, 255, 0.15);
  }

  .dz-limit {
    margin-top: 8px;
    font-size: 10px;
    color: #444;
  }

  /* ── Error ─────────────────────────────────────────────────────────────── */
  .dz-error {
    margin-top: 6px;
    font-size: 11px;
    color: #ff5555;
  }

  /* ── File list ─────────────────────────────────────────────────────────── */
  .file-list {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .file-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
  }

  .file-icon {
    font-size: 12px;
    opacity: 0.6;
    flex-shrink: 0;
  }

  .file-name {
    flex: 1;
    font-size: 11px;
    color: #ccc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-size {
    font-size: 10px;
    color: #555;
    flex-shrink: 0;
  }

  .file-remove {
    background: none;
    border: none;
    color: #ff5555;
    cursor: pointer;
    font-size: 11px;
    padding: 2px 5px;
    border-radius: 4px;
    transition: background 0.1s;
    flex-shrink: 0;
    line-height: 1;
  }

  .file-remove:hover {
    background: rgba(255, 85, 85, 0.12);
  }
</style>
