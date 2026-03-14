<script lang="ts">
  /**
   * AgentStage — RPG character team stage in the Command Center.
   *
   * Always shows 6 characters standing by (idle).
   * When an agent is working on a task, the character wakes up
   * and animates (typing/reading) with a speech bubble showing
   * what they're doing.
   */
  import { onMount } from 'svelte';
  import { loadSpriteSheets } from '../../lib/renderers/SpriteSheetLoader';
  import { PixelCharacterEngine } from '../../lib/renderers/PixelCharacterEngine';
  import type { CharacterState } from '../../lib/renderers/PixelCharacterEngine';
  import { pixelAgents } from '../../lib/stores/pixelAgentState';
  import type { PixelAgentMapping } from '../../lib/stores/pixelAgentState';
  import { playChime, unlockAudio } from '../../lib/stores/pixelAgentSound';

  // ── Stage layout ──────────────────────────────────────────────────────────
  const STAGE_W = 256;
  const STAGE_H = 80;

  // 6 heroes always visible, evenly spaced
  const CY = 68;
  const ALL_POSITIONS = [
    { x: 32,  y: CY },   // slot 0
    { x: 72,  y: CY },   // slot 1
    { x: 112, y: CY },   // slot 2
    { x: 152, y: CY },   // slot 3
    { x: 192, y: CY },   // slot 4
    { x: 228, y: CY },   // slot 5
  ];

  const MAX_HEROES = 6;
  const STANDBY_COUNT = 6;
  const TEAM_IDS = ['agent-0', 'agent-1', 'agent-2', 'agent-3', 'agent-4', 'agent-5'];

  let canvasEl = $state<HTMLCanvasElement | null>(null);
  let engine: PixelCharacterEngine | null = null;
  let spawnedTeam = $state(false);
  let prevWorkingMap = new Map<string, string>(); // nodeId → previous lifecycle

  onMount(() => {
    if (!canvasEl) return;

    const dpr = window.devicePixelRatio || 1;
    canvasEl.width = Math.round(STAGE_W * dpr);
    canvasEl.height = Math.round(STAGE_H * dpr);
    const ctx = canvasEl.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    }

    // Load sprite sheets, then spawn team
    loadSpriteSheets().then(() => {
      initTeam();
    }).catch(() => {
      initTeam(); // fallback to pixel data
    });

    canvasEl.addEventListener('mousedown', unlockAudio, { once: true });

    // Watch for active agents → wake up characters
    const unsub = pixelAgents.subscribe(agents => {
      if (!engine) return;
      updateTeamStates(agents);
    });

    return () => {
      unsub();
      engine?.stop();
    };
  });

  function initTeam() {
    if (!canvasEl || spawnedTeam) return;

    engine = new PixelCharacterEngine(canvasEl, { scale: 1 });

    for (let i = 0; i < STANDBY_COUNT; i++) {
      const pos = ALL_POSITIONS[i];
      engine.spawn(TEAM_IDS[i], pos.x, pos.y, i);
      engine.setCharacterState(TEAM_IDS[i], 'idle');
      engine.setOpacity(TEAM_IDS[i], 0.6);  // idle = semi-transparent
    }

    engine.start();
    spawnedTeam = true;
    spawnedCount = STANDBY_COUNT;
  }

  let spawnedCount = 0;

  // Labels for each hero slot
  interface HeroLabel {
    agent: string;
    action: string;
    state: 'idle' | 'working' | 'done' | 'error';
    x: number;  // % position from left
  }
  let heroLabels = $state<HeroLabel[]>(
    ALL_POSITIONS.map((pos) => ({
      agent: 'Standby',
      action: '',
      state: 'idle' as const,
      x: (pos.x / STAGE_W) * 100,
    }))
  );

  /**
   * Sync logic:
   * - 2 heroes always standing by (idle)
   * - When agents start working, wake up standby heroes first
   * - If more agents than standby, spawn extra heroes (up to 6 total)
   * - When agents stop, extra heroes despawn, standby go back to idle
   */
  function updateTeamStates(agents: Map<string, PixelAgentMapping>) {
    if (!engine || !spawnedTeam) return;

    // Collect active agents (non-idle)
    const workingAgents: Array<{ nodeId: string; agent: PixelAgentMapping }> = [];
    for (const [nodeId, agent] of agents) {
      if (agent.lifecycle === 'running' || agent.lifecycle === 'completed' || agent.lifecycle === 'failed') {
        workingAgents.push({ nodeId, agent });
      }
    }

    // How many total heroes needed: at least STANDBY_COUNT, up to MAX_HEROES
    const needed = Math.max(STANDBY_COUNT, Math.min(workingAgents.length, MAX_HEROES));

    // Spawn extra heroes if needed
    while (spawnedCount < needed) {
      const pos = ALL_POSITIONS[spawnedCount];
      engine.spawn(TEAM_IDS[spawnedCount], pos.x, pos.y, spawnedCount);
      spawnedCount++;
    }

    // Despawn extras that are no longer needed (keep at least STANDBY_COUNT)
    while (spawnedCount > needed && spawnedCount > STANDBY_COUNT) {
      spawnedCount--;
      engine.despawn(TEAM_IDS[spawnedCount]);
    }

    // Assign working agents to slots
    const slotAssignments = new Map<number, { nodeId: string; agent: PixelAgentMapping }>();
    for (let i = 0; i < workingAgents.length && i < needed; i++) {
      slotAssignments.set(i, workingAgents[i]);
    }

    // Update each spawned character + build labels
    const nextLabels: HeroLabel[] = [];

    for (let i = 0; i < spawnedCount; i++) {
      const charId = TEAM_IDS[i];
      const assignment = slotAssignments.get(i);
      const pos = ALL_POSITIONS[i];
      const xPct = (pos.x / STAGE_W) * 100;

      if (assignment) {
        const { nodeId, agent } = assignment;
        // Active — full opacity, animate
        engine.setCharacterState(charId, agent.characterState as CharacterState);
        engine.setOpacity(charId, 1.0);
        engine.hideBubble(charId);

        if (agent.lifecycle === 'completed') {
          const prev = prevWorkingMap.get(nodeId);
          if (prev !== 'completed') playChime();
        }

        prevWorkingMap.set(nodeId, agent.lifecycle);

        const displayState: HeroLabel['state'] =
          agent.lifecycle === 'running' ? 'working' :
          agent.lifecycle === 'completed' ? 'done' :
          agent.lifecycle === 'failed' ? 'error' : 'idle';

        nextLabels.push({
          agent: agent.agentType ?? '?',
          action: truncate(agent.bubble ?? '', 18),
          state: displayState,
          x: xPct,
        });
      } else {
        // Idle — semi-transparent, front-facing
        engine.setCharacterState(charId, 'idle');
        engine.setOpacity(charId, 0.6);
        engine.hideBubble(charId);

        nextLabels.push({
          agent: 'Standby',
          action: '',
          state: 'idle',
          x: xPct,
        });
      }
    }

    heroLabels = nextLabels;
  }

  function truncate(text: string, max: number): string {
    return text.length <= max ? text : text.slice(0, max - 1) + '…';
  }

  function stateColor(state: string): string {
    switch (state) {
      case 'working': return '#f97316';
      case 'done':    return '#22c55e';
      case 'error':   return '#ef4444';
      default:        return '#555';
    }
  }


</script>

<div class="agent-stage">
  <div class="stage-canvas-wrap">
    <canvas
      bind:this={canvasEl}
      class="stage-canvas"
      width={STAGE_W}
      height={STAGE_H}
    ></canvas>

    {#if !spawnedTeam}
      <div class="stage-loading">Loading team...</div>
    {/if}

    <!-- Active count badge -->
    {#if heroLabels.filter(l => l.state !== 'idle').length > 0}
      <div class="active-badge">{heroLabels.filter(l => l.state !== 'idle').length} active</div>
    {/if}
  </div>

  <!-- Hero roster — 1 row per hero -->
  <div class="hero-roster">
    {#each heroLabels as label, i (i)}
      <div class="roster-row" class:roster-active={label.state !== 'idle'}>
        <span class="roster-idx">{i + 1}</span>
        <span class="roster-dot" style="background: {stateColor(label.state)}"></span>
        <span class="roster-name" style="color: {stateColor(label.state)}">{label.agent}</span>
        {#if label.action}
          <span class="roster-action">{label.action}</span>
        {:else}
          <span class="roster-action roster-idle-text">ready</span>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .agent-stage {
    margin: 4px 0;
    padding: 0 12px;
  }

  /* Canvas area */
  .stage-canvas-wrap {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.05);
    background: linear-gradient(180deg, #080a12 0%, #0c0e18 100%);
    aspect-ratio: 256 / 80;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);
  }

  .stage-canvas {
    width: 100%;
    height: 100%;
    display: block;
    image-rendering: pixelated;
  }

  .stage-loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.04em;
  }

  .active-badge {
    position: absolute;
    top: 4px;
    right: 6px;
    font-size: 8px;
    font-weight: 700;
    color: #00e5ff;
    background: rgba(0,229,255,0.1);
    border: 1px solid rgba(0,229,255,0.2);
    padding: 1px 6px;
    border-radius: 4px;
    letter-spacing: 0.04em;
    pointer-events: none;
  }

  /* Hero roster list */
  .hero-roster {
    margin: 6px 0 2px;
    display: flex;
    flex-direction: column;
    gap: 0;
    background: rgba(255,255,255,0.015);
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.03);
    overflow: hidden;
  }

  .roster-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    font-size: 9px;
    border-bottom: 1px solid rgba(255,255,255,0.02);
    transition: background 0.1s;
  }

  .roster-row:last-child {
    border-bottom: none;
  }

  .roster-row:hover {
    background: rgba(255,255,255,0.03);
  }

  .roster-row.roster-active {
    background: rgba(0,229,255,0.03);
  }

  .roster-idx {
    font-size: 8px;
    color: #333;
    font-weight: 600;
    width: 10px;
    text-align: center;
  }

  .roster-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .roster-name {
    font-weight: 700;
    font-size: 9px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    min-width: 50px;
  }

  .roster-action {
    color: #555;
    font-size: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    text-align: right;
  }

  .roster-idle-text {
    color: #2a2a2a;
    font-style: italic;
  }
</style>
