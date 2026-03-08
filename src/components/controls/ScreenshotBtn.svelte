<script lang="ts">
  function captureScreenshot(): void {
    const canvas = document.getElementById('globe-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    // Force a render frame then capture
    requestAnimationFrame(() => {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `knowledge-graph-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.warn('[screenshot] Failed to capture:', e);
      }
    });
  }
</script>

<button class="screenshot-btn" onclick={captureScreenshot} title="Save screenshot (PNG)">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="12" cy="13" r="3"/>
    <path d="M7 7h.01"/>
  </svg>
</button>

<style>
  .screenshot-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
  }
  .screenshot-btn:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
