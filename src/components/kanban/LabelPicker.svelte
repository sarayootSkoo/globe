<script lang="ts">
  import { kanbanConfig, addLabel } from '../../lib/stores/kanbanConfig';
  import type { LabelDef } from '../../lib/stores/kanbanConfig';
  import { toggleCardLabel } from '../../lib/stores/kanbanState';

  let { cardId, currentLabels, onclose }: {
    cardId: string;
    currentLabels: string[];
    onclose: () => void;
  } = $props();

  let labels = $state<LabelDef[]>([]);
  let newName = $state('');
  let newColor = $state('#00e5ff');

  $effect(() => {
    const unsub = kanbanConfig.subscribe(cfg => {
      labels = cfg.labels;
    });
    return unsub;
  });

  function isChecked(labelId: string): boolean {
    return currentLabels.includes(labelId);
  }

  function handleToggle(labelId: string) {
    toggleCardLabel(cardId, labelId);
  }

  function toKebab(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    const id = toKebab(name);
    if (!id) return;
    addLabel({ id, name, color: newColor });
    newName = '';
    newColor = '#00e5ff';
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') handleAdd();
  }
</script>

<div class="label-picker-overlay" onclick={onclose}>
  <div class="label-picker" onclick={(e) => e.stopPropagation()}>
    <div class="picker-header">
      <span class="picker-title">LABELS</span>
      <button class="picker-close" onclick={onclose}>&#x2715;</button>
    </div>

    <div class="picker-list">
      {#each labels as label}
        <button
          class="label-row"
          onclick={() => handleToggle(label.id)}
        >
          <span
            class="label-check"
            class:label-checked={isChecked(label.id)}
          >
            {isChecked(label.id) ? '&#x2713;' : ''}
          </span>
          <span class="label-swatch" style="background: {label.color}"></span>
          <span class="label-name">{label.name}</span>
        </button>
      {/each}
    </div>

    <div class="picker-create">
      <input
        class="create-input"
        type="text"
        placeholder="New label..."
        bind:value={newName}
        onkeydown={handleKeydown}
      />
      <input
        class="create-color"
        type="color"
        bind:value={newColor}
      />
      <button class="create-btn" onclick={handleAdd}>Add</button>
    </div>
  </div>
</div>

<style>
  .label-picker-overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
  }

  .label-picker {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    background: #161922;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    min-width: 200px;
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 11px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    z-index: 100;
  }

  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .picker-title {
    font-size: 9px;
    font-weight: 700;
    color: #666;
    letter-spacing: 0.1em;
  }

  .picker-close {
    background: none;
    border: none;
    color: #555;
    font-size: 11px;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 3px;
    line-height: 1;
  }
  .picker-close:hover {
    color: #ff5555;
    background: rgba(255,85,85,0.1);
  }

  .picker-list {
    max-height: 180px;
    overflow-y: auto;
    padding: 4px 0;
  }

  .label-row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 5px 10px;
    background: none;
    border: none;
    color: #ccc;
    font-family: inherit;
    font-size: 11px;
    cursor: pointer;
    text-align: left;
  }
  .label-row:hover {
    background: rgba(255,255,255,0.04);
  }

  .label-check {
    width: 14px;
    height: 14px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    color: #00ff88;
    flex-shrink: 0;
  }
  .label-checked {
    background: rgba(0,255,136,0.1);
    border-color: rgba(0,255,136,0.3);
  }

  .label-swatch {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .label-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .picker-create {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 10px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .create-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 4px 6px;
    color: #ccc;
    font-size: 11px;
    font-family: inherit;
    outline: none;
  }
  .create-input:focus {
    border-color: rgba(0,229,255,0.3);
  }
  .create-input::placeholder {
    color: #444;
  }

  .create-color {
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
  }

  .create-btn {
    background: rgba(0,229,255,0.1);
    border: 1px solid rgba(0,229,255,0.25);
    border-radius: 4px;
    color: #00e5ff;
    font-size: 10px;
    font-weight: 700;
    font-family: inherit;
    padding: 4px 8px;
    cursor: pointer;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .create-btn:hover {
    background: rgba(0,229,255,0.2);
  }
</style>
