<script lang="ts">
  let visible = $state(false);

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      visible = !visible;
    }
    if (e.key === 'Escape' && visible) {
      visible = false;
    }
  }

  $effect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const shortcuts = [
    { keys: 'W A S D', desc: 'Rotate globe' },
    { keys: 'Shift', desc: 'Speed boost' },
    { keys: 'Q', desc: 'Brake' },
    { keys: 'Click node', desc: 'Select & lock' },
    { keys: 'Click empty', desc: 'Deselect' },
    { keys: 'Scroll', desc: 'Zoom in/out' },
    { keys: 'Drag', desc: 'Orbit camera' },
    { keys: '?', desc: 'Toggle this help' },
  ];
</script>

{#if visible}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="kb-overlay" onclick={() => { visible = false; }}>
    <div class="kb-panel" onclick={(e) => e.stopPropagation()}>
      <div class="kb-title">Keyboard Shortcuts</div>
      <div class="kb-list">
        {#each shortcuts as s}
          <div class="kb-row">
            <span class="kb-keys">{s.keys}</span>
            <span class="kb-desc">{s.desc}</span>
          </div>
        {/each}
      </div>
      <div class="kb-hint">Press ? or Esc to close</div>
    </div>
  </div>
{/if}

<style>
  .kb-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }
  .kb-panel {
    background: var(--panel-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 24px 32px;
    min-width: 280px;
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.1);
  }
  .kb-title {
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    border-bottom: 1px solid var(--border);
    padding-bottom: 10px;
    margin-bottom: 14px;
    text-align: center;
  }
  .kb-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .kb-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  .kb-keys {
    font-family: var(--font);
    font-size: 11px;
    color: var(--accent);
    background: rgba(0, 212, 255, 0.08);
    padding: 2px 8px;
    border-radius: 3px;
    border: 1px solid rgba(0, 212, 255, 0.2);
    white-space: nowrap;
  }
  .kb-desc {
    font-size: 11px;
    color: var(--text-dim);
  }
  .kb-hint {
    margin-top: 14px;
    font-size: 9px;
    color: var(--text-dim);
    text-align: center;
    opacity: 0.6;
  }
</style>
