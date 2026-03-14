<script lang="ts">
  import { onMount } from 'svelte';
  import { navigateTo } from '../../lib/router';
  import { kanbanCards, kanbanColumns, KANBAN_COLUMNS, AGENT_DEFS } from '../../lib/stores/kanbanState';
  import { activityLog } from '../../lib/stores/activityLog';
  import type { KanbanCard } from '../../lib/types';

  // ── Reactive store snapshots ────────────────────────────────────────────
  let _cards: KanbanCard[] = [];
  let _columns = new Map<string, KanbanCard[]>();
  let _log: { action: string; timestamp: number; cardId?: string }[] = [];

  let unsubs: (() => void)[] = [];
  onMount(() => {
    unsubs = [
      kanbanCards.subscribe(v => { _cards = v; computeAnalytics(); }),
      kanbanColumns.subscribe(v => { _columns = v; }),
      activityLog.subscribe(v => { _log = v as any[]; }),
    ];
    return () => unsubs.forEach(u => u());
  });

  // ── Computed analytics ──────────────────────────────────────────────────
  let totalCards = $state(0);
  let completedCount = $state(0);
  let failedCount = $state(0);
  let runningCount = $state(0);
  let idleCount = $state(0);
  let avgIterations = $state(0);
  let completionRate = $state(0);
  let byStatus = $state<Record<string, number>>({});
  let byType = $state<Record<string, number>>({});
  let byLifecycle = $state<Record<string, number>>({});
  let byAgent = $state<Record<string, number>>({});
  let byProject = $state<Record<string, number>>({});
  let timeline = $state<Record<string, { created: number; moved: number; completed: number; failed: number }>>({});
  let recentCards = $state<{ id: string; title: string; status: string; type: string; lifecycle: string; agent: string | null }[]>([]);

  function computeAnalytics() {
    const cards = _cards;
    totalCards = cards.length;

    // Status distribution
    const bs: Record<string, number> = {};
    const bt: Record<string, number> = {};
    const bl: Record<string, number> = {};
    const ba: Record<string, number> = {};
    const bp: Record<string, number> = {};
    let completed = 0, failed = 0, running = 0, idle = 0, iterSum = 0, iterCount = 0;

    for (const c of cards) {
      bs[c.status] = (bs[c.status] || 0) + 1;
      bt[c.type] = (bt[c.type] || 0) + 1;
      bl[c.lifecycle] = (bl[c.lifecycle] || 0) + 1;
      if (c.agent) ba[c.agent] = (ba[c.agent] || 0) + 1;
      if (c.node.cat) bp[c.node.cat] = (bp[c.node.cat] || 0) + 1;
      if (c.lifecycle === 'completed') completed++;
      if (c.lifecycle === 'failed') failed++;
      if (c.lifecycle === 'running') running++;
      if (c.lifecycle === 'idle') idle++;
      if (c.iterationCount > 0) { iterSum += c.iterationCount; iterCount++; }
    }

    completedCount = completed;
    failedCount = failed;
    runningCount = running;
    idleCount = idle;
    avgIterations = iterCount > 0 ? Math.round((iterSum / iterCount) * 10) / 10 : 0;
    completionRate = totalCards > 0 ? Math.round((completed / totalCards) * 1000) / 10 : 0;
    byStatus = bs;
    byType = bt;
    byLifecycle = bl;
    byAgent = ba;
    byProject = bp;

    // Recent cards (last 20, sorted by most recent activity)
    recentCards = [...cards]
      .sort((a, b) => (b.lastRunAt ?? 0) - (a.lastRunAt ?? 0))
      .slice(0, 20)
      .map(c => ({
        id: c.node.id,
        title: c.node.label,
        status: c.status,
        type: c.type,
        lifecycle: c.lifecycle,
        agent: c.agent ?? null,
      }));

    // Timeline from activity log (last 7 days)
    const now = Date.now();
    const dayMs = 86400000;
    const tl: Record<string, { created: number; moved: number; completed: number; failed: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const key = new Date(now - i * dayMs).toISOString().slice(0, 10);
      tl[key] = { created: 0, moved: 0, completed: 0, failed: 0 };
    }
    for (const entry of _log) {
      if (!entry.timestamp) continue;
      const key = new Date(entry.timestamp).toISOString().slice(0, 10);
      if (!tl[key]) continue;
      if (entry.action === 'card:created') tl[key].created++;
      else if (entry.action === 'card:moved') tl[key].moved++;
      else if (entry.action?.startsWith('lifecycle:completed')) tl[key].completed++;
      else if (entry.action?.startsWith('lifecycle:failed')) tl[key].failed++;
    }
    timeline = tl;
  }

  const STATUS_COLORS: Record<string, string> = {
    create: '#ffffff', design: '#b44dff', backlog: '#888888', hold: '#ffcc00',
    task: '#00e5ff', issue: '#ff3d3d', develop: '#4d8aff', testing: '#f97316',
    validate: '#00ff88', 'update-docs': '#ff3dff', done: '#666666',
    archive: '#444444', delete: '#ff3d3d',
  };
  const TYPE_COLORS: Record<string, string> = {
    spec: '#4d8aff', task: '#00e5ff', issue: '#ff3d3d', discussion: '#b44dff',
  };
  const LIFECYCLE_COLORS: Record<string, string> = {
    idle: '#666', claimed: '#b44dff', started: '#eab308', running: '#00ff88',
    paused: '#f97316', completed: '#22c55e', failed: '#ef4444', blocked: '#ff3d3d',
  };
  const AGENT_COLORS: Record<string, string> = {
    chore: '#b44dff', feature: '#a855f7', breakdown: '#ff3dff', estimate: '#06b6d4',
    implement: '#4d8aff', issue: '#ff3d3d', test: '#eab308', review: '#f97316',
    security: '#ef4444', validate: '#00ff88', docs: '#8b5cf6', deploy: '#64748b',
    discussion: '#14b8a6',
  };
  const PROJECT_COLORS = ['#4d8aff','#00e5ff','#b44dff','#ff3d3d','#00ff88','#f97316','#eab308','#ff3dff','#06b6d4','#64748b'];

  function maxVal(obj: Record<string, number>): number {
    const vals = Object.values(obj);
    return vals.length > 0 ? Math.max(...vals, 1) : 1;
  }
  function sortedEntries(obj: Record<string, number>): [string, number][] {
    return Object.entries(obj).sort((a, b) => b[1] - a[1]);
  }
  function timelineMax(tl: Record<string, { created: number; moved: number; completed: number; failed: number }>): number {
    let m = 1;
    for (const v of Object.values(tl)) {
      const sum = v.created + v.moved + v.completed + v.failed;
      if (sum > m) m = sum;
    }
    return m;
  }
  function projectColor(idx: number): string {
    return PROJECT_COLORS[idx % PROJECT_COLORS.length];
  }
</script>

<div class="analytics-page">
  <div class="an-header">
    <div class="an-title">BOARD ANALYTICS</div>
    <span class="an-subtitle">{totalCards} cards</span>
    <button class="an-nav-btn" onclick={() => navigateTo('kanban')}>← Board</button>
    <button class="an-nav-btn" onclick={() => navigateTo('globe')}>Globe</button>
  </div>

  <!-- KPI Cards -->
  <div class="kpi-row">
    <div class="kpi-card">
      <div class="kpi-value">{totalCards}</div>
      <div class="kpi-label">Total Cards</div>
    </div>
    <div class="kpi-card kpi-green">
      <div class="kpi-value">{completionRate}<span class="kpi-unit">%</span></div>
      <div class="kpi-label">Completion Rate</div>
    </div>
    <div class="kpi-card kpi-cyan">
      <div class="kpi-value">{runningCount}</div>
      <div class="kpi-label">Running</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-value">{idleCount}</div>
      <div class="kpi-label">Idle</div>
    </div>
    <div class="kpi-card kpi-red">
      <div class="kpi-value">{failedCount}</div>
      <div class="kpi-label">Failed</div>
    </div>
    <div class="kpi-card kpi-purple">
      <div class="kpi-value">{avgIterations}</div>
      <div class="kpi-label">Avg Iterations</div>
    </div>
  </div>

  <!-- Charts Grid -->
  <div class="charts-grid">
    <!-- Timeline -->
    <div class="chart-card chart-wide">
      <div class="chart-title">Activity — 7 Days</div>
      <div class="timeline-chart">
        {#each Object.entries(timeline) as [day, counts]}
          {@const total = counts.created + counts.moved + counts.completed + counts.failed}
          {@const max = timelineMax(timeline)}
          <div class="tl-col">
            <div class="tl-bars" style="height: 100px">
              {#if counts.completed > 0}
                <div class="tl-seg tl-completed" style="height: {(counts.completed / max) * 100}px" title="{counts.completed} completed"></div>
              {/if}
              {#if counts.moved > 0}
                <div class="tl-seg tl-moved" style="height: {(counts.moved / max) * 100}px" title="{counts.moved} moved"></div>
              {/if}
              {#if counts.created > 0}
                <div class="tl-seg tl-created" style="height: {(counts.created / max) * 100}px" title="{counts.created} created"></div>
              {/if}
              {#if counts.failed > 0}
                <div class="tl-seg tl-failed" style="height: {(counts.failed / max) * 100}px" title="{counts.failed} failed"></div>
              {/if}
            </div>
            <div class="tl-label">{day.slice(5)}</div>
            <div class="tl-total">{total}</div>
          </div>
        {/each}
      </div>
      <div class="tl-legend">
        <span class="tl-leg"><span class="tl-dot" style="background: #22c55e"></span>Completed</span>
        <span class="tl-leg"><span class="tl-dot" style="background: #4d8aff"></span>Moved</span>
        <span class="tl-leg"><span class="tl-dot" style="background: #00e5ff"></span>Created</span>
        <span class="tl-leg"><span class="tl-dot" style="background: #ef4444"></span>Failed</span>
      </div>
    </div>

    <!-- By Status -->
    <div class="chart-card">
      <div class="chart-title">Cards by Column</div>
      <div class="bar-chart">
        {#each sortedEntries(byStatus) as [key, val]}
          <div class="bar-row">
            <span class="bar-label">{key}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: {(val / maxVal(byStatus)) * 100}%; background: {STATUS_COLORS[key] || '#888'}"></div>
            </div>
            <span class="bar-val">{val}</span>
          </div>
        {/each}
        {#if Object.keys(byStatus).length === 0}<div class="chart-empty">No data</div>{/if}
      </div>
    </div>

    <!-- By Type -->
    <div class="chart-card">
      <div class="chart-title">Cards by Type</div>
      <div class="donut-area">
        {#each sortedEntries(byType) as [key, val]}
          <div class="donut-row">
            <span class="donut-dot" style="background: {TYPE_COLORS[key] || '#888'}"></span>
            <span class="donut-label">{key}</span>
            <span class="donut-val">{val}</span>
            <div class="donut-bar-track">
              <div class="donut-bar-fill" style="width: {(val / maxVal(byType)) * 100}%; background: {TYPE_COLORS[key] || '#888'}"></div>
            </div>
          </div>
        {/each}
        {#if Object.keys(byType).length === 0}<div class="chart-empty">No data</div>{/if}
      </div>
    </div>

    <!-- By Lifecycle -->
    <div class="chart-card">
      <div class="chart-title">Lifecycle Distribution</div>
      <div class="bar-chart">
        {#each sortedEntries(byLifecycle) as [key, val]}
          <div class="bar-row">
            <span class="bar-label">{key}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: {(val / maxVal(byLifecycle)) * 100}%; background: {LIFECYCLE_COLORS[key] || '#888'}"></div>
            </div>
            <span class="bar-val">{val}</span>
          </div>
        {/each}
        {#if Object.keys(byLifecycle).length === 0}<div class="chart-empty">No data</div>{/if}
      </div>
    </div>

    <!-- By Agent -->
    <div class="chart-card">
      <div class="chart-title">Agent Assignments</div>
      <div class="bar-chart">
        {#each sortedEntries(byAgent) as [key, val]}
          <div class="bar-row">
            <span class="bar-label">{key}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: {(val / maxVal(byAgent)) * 100}%; background: {AGENT_COLORS[key] || '#888'}"></div>
            </div>
            <span class="bar-val">{val}</span>
          </div>
        {/each}
        {#if Object.keys(byAgent).length === 0}<div class="chart-empty">No data</div>{/if}
      </div>
    </div>

    <!-- By Project -->
    <div class="chart-card">
      <div class="chart-title">Cards by Project</div>
      <div class="bar-chart">
        {#each sortedEntries(byProject) as [key, val], i}
          <div class="bar-row">
            <span class="bar-label">{key}</span>
            <div class="bar-track">
              <div class="bar-fill" style="width: {(val / maxVal(byProject)) * 100}%; background: {projectColor(i)}"></div>
            </div>
            <span class="bar-val">{val}</span>
          </div>
        {/each}
        {#if Object.keys(byProject).length === 0}<div class="chart-empty">No data</div>{/if}
      </div>
    </div>

    <!-- Recent Cards Table -->
    <div class="chart-card chart-wide">
      <div class="chart-title">Recent Cards</div>
      <div class="recent-table-wrap">
        <table class="recent-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Column</th>
              <th>Type</th>
              <th>Lifecycle</th>
              <th>Agent</th>
            </tr>
          </thead>
          <tbody>
            {#each recentCards as card}
              <tr>
                <td class="rt-title" title={card.id}>{card.title}</td>
                <td><span class="rt-badge" style="background: {STATUS_COLORS[card.status] || '#888'}20; color: {STATUS_COLORS[card.status] || '#888'}; border: 1px solid {STATUS_COLORS[card.status] || '#888'}40">{card.status}</span></td>
                <td><span class="rt-type">{card.type}</span></td>
                <td><span class="rt-lc" style="color: {LIFECYCLE_COLORS[card.lifecycle] || '#666'}">{card.lifecycle}</span></td>
                <td>{#if card.agent}<span class="rt-agent" style="color: {AGENT_COLORS[card.agent] || '#888'}">{card.agent}</span>{:else}<span class="rt-none">—</span>{/if}</td>
              </tr>
            {/each}
            {#if recentCards.length === 0}
              <tr><td colspan="5" class="chart-empty">No cards yet</td></tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style>
  .analytics-page {
    position: fixed; inset: 0;
    left: 44px; /* same as kanban — leave room for menu */
    z-index: 50;
    background: #0c0e14;
    padding: 24px 32px;
    overflow-y: auto;
    font-family: var(--font, 'JetBrains Mono', monospace);
  }
  .analytics-page::-webkit-scrollbar { width: 4px; }
  .analytics-page::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

  .an-header {
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .an-title {
    font-size: 15px; font-weight: 700; color: #e0e0e0;
    letter-spacing: 0.08em;
  }
  .an-subtitle {
    font-size: 12px; color: #555; flex: 1;
  }
  .an-refresh {
    background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2);
    border-radius: 6px; padding: 6px 14px; font-size: 11px;
    color: #00e5ff; font-family: inherit; cursor: pointer;
    transition: background 0.15s;
  }
  .an-refresh:hover { background: rgba(0,229,255,0.18); }
  .an-refresh:disabled { opacity: 0.4; cursor: wait; }
  .an-nav-btn {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px; padding: 6px 14px; color: #888;
    font-size: 11px; font-weight: 600; cursor: pointer; font-family: inherit;
    transition: all 0.15s;
  }
  .an-nav-btn:hover { color: #e0e0e0; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); }


  /* ── KPI Cards ──────────────────────────────────────── */
  .kpi-row {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;
    margin-bottom: 20px;
  }
  .kpi-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px; padding: 16px 14px; text-align: center;
  }
  .kpi-value {
    font-size: 28px; font-weight: 700; color: #e0e0e0;
    line-height: 1.1; margin-bottom: 6px;
  }
  .kpi-unit { font-size: 16px; color: #888; font-weight: 400; }
  .kpi-label { font-size: 10px; color: #555; letter-spacing: 0.06em; text-transform: uppercase; }
  .kpi-green .kpi-value { color: #22c55e; }
  .kpi-cyan .kpi-value { color: #00e5ff; }
  .kpi-red .kpi-value { color: #ef4444; }
  .kpi-purple .kpi-value { color: #b44dff; }

  /* ── Charts Grid ────────────────────────────────────── */
  .charts-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  }
  .chart-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px; padding: 16px;
  }
  .chart-card.chart-wide { grid-column: 1 / -1; }
  .chart-title {
    font-size: 11px; font-weight: 700; color: #888;
    letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 14px;
  }
  .chart-empty { color: #444; font-size: 11px; font-style: italic; padding: 10px 0; }

  /* ── Bar Chart ──────────────────────────────────────── */
  .bar-chart { display: flex; flex-direction: column; gap: 6px; }
  .bar-row { display: flex; align-items: center; gap: 8px; }
  .bar-label {
    width: 80px; font-size: 11px; color: #888;
    text-align: right; flex-shrink: 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .bar-track {
    flex: 1; height: 18px; background: rgba(255,255,255,0.03);
    border-radius: 4px; overflow: hidden;
  }
  .bar-fill {
    height: 100%; border-radius: 4px;
    transition: width 0.3s ease; min-width: 2px;
  }
  .bar-val {
    width: 32px; font-size: 11px; color: #ccc;
    font-weight: 600; text-align: right; flex-shrink: 0;
  }

  /* ── Donut-style rows ───────────────────────────────── */
  .donut-area { display: flex; flex-direction: column; gap: 10px; }
  .donut-row { display: flex; align-items: center; gap: 8px; }
  .donut-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
  .donut-label { font-size: 12px; color: #999; width: 80px; }
  .donut-val { font-size: 13px; color: #e0e0e0; font-weight: 700; width: 30px; text-align: right; }
  .donut-bar-track {
    flex: 1; height: 8px; background: rgba(255,255,255,0.03);
    border-radius: 4px; overflow: hidden;
  }
  .donut-bar-fill {
    height: 100%; border-radius: 4px; transition: width 0.3s ease;
  }

  /* ── Timeline Chart ─────────────────────────────────── */
  .timeline-chart {
    display: flex; gap: 6px; justify-content: space-between;
    align-items: flex-end; padding: 0 4px;
  }
  .tl-col {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 4px;
  }
  .tl-bars {
    display: flex; flex-direction: column-reverse;
    align-items: center; gap: 1px; width: 100%;
  }
  .tl-seg {
    width: 100%; border-radius: 2px; min-height: 1px;
  }
  .tl-completed { background: #22c55e; }
  .tl-moved { background: #4d8aff; }
  .tl-created { background: #00e5ff; }
  .tl-failed { background: #ef4444; }
  .tl-label { font-size: 9px; color: #555; }
  .tl-total { font-size: 10px; color: #888; font-weight: 600; }
  .tl-legend {
    display: flex; gap: 14px; margin-top: 10px; justify-content: center;
  }
  .tl-leg { font-size: 10px; color: #666; display: flex; align-items: center; gap: 4px; }
  .tl-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }

  /* ── Recent Cards Table ───────────────────────────── */
  .recent-table-wrap { overflow-x: auto; }
  .recent-table {
    width: 100%; border-collapse: collapse; font-size: 12px;
  }
  .recent-table th {
    text-align: left; font-size: 10px; color: #555;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 6px 10px; border-bottom: 1px solid rgba(255,255,255,0.06);
    font-weight: 600;
  }
  .recent-table td {
    padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,0.03);
    color: #aaa;
  }
  .recent-table tr:hover td { background: rgba(255,255,255,0.02); }
  .rt-title {
    color: #e0e0e0; font-weight: 500;
    max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .rt-badge {
    font-size: 10px; font-weight: 700; padding: 2px 8px;
    border-radius: 4px; letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .rt-type { color: #888; }
  .rt-lc { font-weight: 600; font-size: 11px; }
  .rt-agent { font-weight: 600; font-size: 11px; }
  .rt-none { color: #444; }

  @media (max-width: 800px) {
    .kpi-row { grid-template-columns: repeat(3, 1fr); }
    .charts-grid { grid-template-columns: 1fr; }
  }
</style>
