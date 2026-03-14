<script lang="ts">
  import { onMount } from 'svelte';
  import { loadSpriteSheets } from '../../lib/renderers/SpriteSheetLoader';
  import { PixelCharacterEngine } from '../../lib/renderers/PixelCharacterEngine';
  import type { CharacterState } from '../../lib/renderers/PixelCharacterEngine';
  import { BubbleType } from '../../lib/renderers/PixelSpriteData';
  import { pixelAgents, pixelAgentsEnabled } from '../../lib/stores/pixelAgentState';
  import type { PixelAgentMapping } from '../../lib/stores/pixelAgentState';
  import { playChime, unlockAudio } from '../../lib/stores/pixelAgentSound';

  let canvasEl = $state<HTMLCanvasElement | null>(null);
  let engine: PixelCharacterEngine | null = null;
  let enabled = $state(true);
  let prevAgents = new Map<string, PixelAgentMapping>();

  // Column center positions (auto-discovered from DOM)
  let columnPositions = new Map<string, { x: number; y: number }>();

  $effect(() => {
    const unsub = pixelAgentsEnabled.subscribe(v => { enabled = v; });
    return unsub;
  });

  onMount(() => {
    if (!canvasEl) return;

    // Load sprite sheet images
    loadSpriteSheets().catch(() => { /* fallback to pixel data */ });

    engine = new PixelCharacterEngine(canvasEl, { scale: 1 });

    // Unlock audio on first click anywhere
    document.addEventListener('mousedown', unlockAudio, { once: true });

    // Subscribe to agent changes
    const unsub = pixelAgents.subscribe(agents => {
      if (!engine || !enabled) return;
      syncCharacters(agents);
    });

    // Resize canvas to match the kanban-columns container
    function resizeCanvas() {
      if (!canvasEl) return;
      const container = canvasEl.parentElement;
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvasEl.width = Math.round(w * dpr);
      canvasEl.height = Math.round(h * dpr);
      canvasEl.style.width = w + 'px';
      canvasEl.style.height = h + 'px';
      // Scale context for DPR
      const ctx = canvasEl.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = false;
      }
    }

    const resizeObs = new ResizeObserver(resizeCanvas);
    const container = canvasEl.parentElement;
    if (container) {
      resizeObs.observe(container);
      resizeCanvas();
    }

    engine.start();

    return () => {
      unsub();
      resizeObs.disconnect();
      engine?.stop();
    };
  });

  /**
   * Discover column element positions from the DOM.
   * Columns have `data-col="develop"` etc. attributes.
   */
  function updateColumnPositions() {
    if (!canvasEl) return;
    const container = canvasEl.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const colEls = container.querySelectorAll<HTMLElement>('[data-col]');

    columnPositions.clear();
    for (const el of colEls) {
      const colId = el.getAttribute('data-col');
      if (!colId) continue;
      const r = el.getBoundingClientRect();
      // Position: right side of column header, fully within bounds
      // Character draws upward from foot (y - height), so y must be > character height (~56px)
      columnPositions.set(colId, {
        x: r.left - containerRect.left + r.width - 30,
        y: r.top - containerRect.top + 90,
      });
    }
  }

  const VALID_BUBBLES = new Set<string>(Object.values(BubbleType));

  function asBubbleType(s: string | null): 'permission' | 'done' | 'error' | 'blocked' | 'voice' | null {
    if (s && VALID_BUBBLES.has(s)) return s as 'permission' | 'done' | 'error' | 'blocked' | 'voice';
    return null;
  }

  function syncCharacters(agents: Map<string, PixelAgentMapping>) {
    if (!engine) return;
    updateColumnPositions();

    const currentIds = engine.getCharacterIds();

    for (const [id, agent] of agents) {
      const pos = columnPositions.get(agent.columnId) ?? { x: 200, y: 80 };

      if (!currentIds.has(id)) {
        // New agent — spawn with matrix effect
        engine.spawn(id, pos.x, pos.y, agent.palette);
      } else {
        // Existing agent — update state
        engine.setCharacterState(id, agent.characterState as CharacterState);

        // Move to new column if changed
        const prev = prevAgents.get(id);
        if (prev && prev.columnId !== agent.columnId) {
          engine.moveTo(id, pos.x, pos.y);
        }
      }

      // No speech bubbles on board — status shown via card UI instead
      engine.hideBubble(id);

      // Sound on completion
      const prev = prevAgents.get(id);
      if (prev && prev.lifecycle !== 'completed' && agent.lifecycle === 'completed') {
        playChime();
      }

      currentIds.delete(id);
    }

    // Remove agents no longer present
    for (const removedId of currentIds) {
      engine.despawn(removedId);
    }

    prevAgents = new Map(agents);
  }
</script>

{#if enabled}
  <canvas
    bind:this={canvasEl}
    class="pixel-agent-canvas"
  ></canvas>
{/if}

<style>
  .pixel-agent-canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 10;
    image-rendering: pixelated;
  }
</style>
