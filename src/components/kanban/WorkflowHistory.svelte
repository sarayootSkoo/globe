<script lang="ts">
  import { workflowExecutions } from '../../lib/stores/workflowState';
  import { WORKFLOW_CHAINS } from '../../lib/workflow/workflowEngine';
  import type { WorkflowExecution, WorkflowStepRecord } from '../../lib/types';

  interface Props {
    cardId: string;
  }

  let { cardId }: Props = $props();

  // Subscribe to the Svelte store via $effect (Svelte 5 pattern for legacy stores)
  let allExecutions = $state<Record<string, WorkflowExecution>>({});

  $effect(() => {
    const unsub = workflowExecutions.subscribe(v => { allExecutions = v; });
    return unsub;
  });

  // Derived: execution for this card
  let execution = $derived(allExecutions[cardId] ?? null);

  // Derived: chain definition
  let chain = $derived(
    execution ? WORKFLOW_CHAINS.find(c => c.id === execution.chainId) ?? null : null
  );

  // Derived: progress percentage
  let progressPct = $derived(
    execution && execution.totalSteps > 0
      ? Math.round((execution.currentStep / execution.totalSteps) * 100)
      : 0
  );

  // Derived: badge for current execution status
  let statusBadge = $derived(
    execution ? statusStyle(execution.status) : null
  );

  // Derived: progress bar fill color
  let progressColor = $derived(
    execution
      ? execution.status === 'failed'
        ? '#ff5555'
        : execution.status === 'completed'
          ? '#00e5ff'
          : '#00ff88'
      : '#00ff88'
  );

  // Derived: next pending step
  let pendingStep = $derived(
    execution && chain ? chain.steps[execution.currentStep] ?? null : null
  );

  // Status badge style helper
  function statusStyle(status: WorkflowExecution['status']): { color: string; bg: string; label: string } {
    switch (status) {
      case 'active':    return { color: '#00ff88', bg: 'rgba(0,255,136,0.1)',    label: 'ACTIVE' };
      case 'paused':    return { color: '#f97316', bg: 'rgba(249,115,22,0.1)',   label: 'PAUSED' };
      case 'completed': return { color: '#00e5ff', bg: 'rgba(0,229,255,0.1)',    label: 'DONE' };
      case 'failed':    return { color: '#ff5555', bg: 'rgba(255,85,85,0.1)',    label: 'FAILED' };
    }
  }

  // Step status icon and color
  function stepIcon(status: WorkflowStepRecord['status']): { icon: string; color: string } {
    switch (status) {
      case 'completed': return { icon: '✓', color: '#00ff88' };
      case 'failed':    return { icon: '✗', color: '#ff5555' };
      case 'running':   return { icon: '◉', color: '#00e5ff' };
      case 'pending':   return { icon: '○', color: '#444' };
      case 'skipped':   return { icon: '—', color: '#555' };
    }
  }

  // Format a timestamp as HH:MM
  function formatTime(ts: number): string {
    const d = new Date(ts);
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }

  // Format duration in ms → human-readable
  function formatDuration(startedAt: number, completedAt: number | null): string {
    if (!completedAt) return '';
    const ms = completedAt - startedAt;
    if (ms < 1000) return `${ms}ms`;
    const s = Math.floor(ms / 1000);
    if (s < 60) return `${s}s`;
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return sec > 0 ? `${min}m ${sec}s` : `${min}m`;
  }
</script>

<div style="width: 100%;">
  {#if !execution}
    <!-- No workflow state -->
    <div style="
      padding: 12px 0;
      color: #444;
      font-size: 11px;
      font-style: italic;
      text-align: center;
    ">
      No workflow started
    </div>
  {:else}
    <!-- Chain name + status badge -->
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    ">
      <span style="font-size: 11px; color: #9098a8; font-weight: 600;">
        {chain?.name ?? execution.chainId}
      </span>
      {#if statusBadge}
        <span style="
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 2px 8px;
          border-radius: 4px;
          background: {statusBadge.bg};
          color: {statusBadge.color};
        ">
          {statusBadge.label}
        </span>
      {/if}
    </div>

    <!-- Progress bar -->
    <div style="margin-bottom: 12px;">
      <div style="
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #6a7080;
        margin-bottom: 4px;
      ">
        <span>Step {execution.currentStep}/{execution.totalSteps}</span>
        <span>{progressPct}%</span>
      </div>
      <div style="
        height: 3px;
        background: rgba(255,255,255,0.06);
        border-radius: 2px;
        overflow: hidden;
      ">
        <div style="
          height: 100%;
          width: {progressPct}%;
          background: {progressColor};
          border-radius: 2px;
          transition: width 0.3s ease;
        "></div>
      </div>
    </div>

    <!-- Timeline: completed steps -->
    {#if execution.history.length > 0}
      <div style="display: flex; flex-direction: column; gap: 1px;">
        {#each execution.history as record (record.index)}
          <div style="
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 7px 8px;
            background: rgba(255,255,255,0.02);
            border-radius: 5px;
            border: 1px solid rgba(255,255,255,0.04);
          ">
            <!-- Status icon -->
            <span style="
              font-size: 11px;
              color: {stepIcon(record.status).color};
              line-height: 1;
              font-weight: 700;
              flex-shrink: 0;
              padding-top: 1px;
            ">{stepIcon(record.status).icon}</span>

            <!-- Step details -->
            <div style="flex: 1; min-width: 0;">
              <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 4px;
                margin-bottom: 2px;
              ">
                <span style="
                  font-size: 11px;
                  font-weight: 700;
                  color: #00e5ff;
                  font-family: 'JetBrains Mono', monospace;
                ">{record.command}</span>
                <span style="font-size: 9px; color: #555;">
                  {formatTime(record.startedAt)}
                </span>
              </div>

              <!-- Column flow: fromColumn → toColumn -->
              <div style="
                display: flex;
                align-items: center;
                gap: 4px;
                margin-bottom: 2px;
              ">
                <span style="
                  font-size: 9px;
                  color: #666;
                  background: rgba(255,255,255,0.04);
                  padding: 1px 5px;
                  border-radius: 3px;
                ">{record.fromColumn}</span>
                <span style="font-size: 9px; color: #444;">→</span>
                <span style="
                  font-size: 9px;
                  color: #888;
                  background: rgba(255,255,255,0.04);
                  padding: 1px 5px;
                  border-radius: 3px;
                ">{record.toColumn}</span>
              </div>

              <!-- Duration -->
              {#if record.completedAt}
                <div style="font-size: 9px; color: #555;">
                  {formatDuration(record.startedAt, record.completedAt)}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Next pending step (highlighted, shown when active) -->
    {#if pendingStep && execution.status === 'active'}
      <div style="
        margin-top: {execution.history.length > 0 ? '6px' : '0'};
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 7px 8px;
        background: rgba(0,229,255,0.04);
        border: 1px solid rgba(0,229,255,0.15);
        border-radius: 5px;
      ">
        <span style="
          font-size: 11px;
          color: #00e5ff;
          line-height: 1;
          font-weight: 700;
          flex-shrink: 0;
          padding-top: 1px;
        ">▶</span>

        <div style="flex: 1; min-width: 0;">
          <div style="
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
          ">
            <span style="
              font-size: 11px;
              font-weight: 700;
              color: #00e5ff;
              font-family: 'JetBrains Mono', monospace;
            ">{pendingStep.trigger}</span>
            <span style="font-size: 9px; color: #555; font-style: italic;">next</span>
          </div>

          <div style="
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span style="
              font-size: 9px;
              color: #666;
              background: rgba(255,255,255,0.04);
              padding: 1px 5px;
              border-radius: 3px;
            ">{pendingStep.from}</span>
            <span style="font-size: 9px; color: #444;">→</span>
            <span style="
              font-size: 9px;
              color: #888;
              background: rgba(255,255,255,0.04);
              padding: 1px 5px;
              border-radius: 3px;
            ">{pendingStep.to}</span>
          </div>
        </div>
      </div>
    {/if}

    <!-- Paused indicator -->
    {#if execution.status === 'paused' && pendingStep}
      <div style="
        margin-top: {execution.history.length > 0 ? '6px' : '0'};
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 7px 8px;
        background: rgba(249,115,22,0.04);
        border: 1px solid rgba(249,115,22,0.15);
        border-radius: 5px;
      ">
        <span style="
          font-size: 11px;
          color: #f97316;
          line-height: 1;
          font-weight: 700;
          flex-shrink: 0;
          padding-top: 1px;
        ">⏸</span>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 10px; color: #f97316; font-weight: 600; margin-bottom: 2px;">
            Paused at step {execution.currentStep + 1}
          </div>
          <div style="font-size: 9px; color: #666;">
            Waiting to run {pendingStep.trigger}
          </div>
        </div>
      </div>
    {/if}

    <!-- Failed indicator -->
    {#if execution.status === 'failed'}
      <div style="
        margin-top: {execution.history.length > 0 ? '6px' : '0'};
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 7px 8px;
        background: rgba(255,85,85,0.04);
        border: 1px solid rgba(255,85,85,0.2);
        border-radius: 5px;
      ">
        <span style="font-size: 11px; color: #ff5555; font-weight: 700; flex-shrink: 0;">✗</span>
        <span style="font-size: 10px; color: #ff5555;">Workflow failed at step {execution.currentStep}</span>
      </div>
    {/if}

    <!-- Completed indicator -->
    {#if execution.status === 'completed'}
      <div style="
        margin-top: {execution.history.length > 0 ? '6px' : '0'};
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 7px 8px;
        background: rgba(0,229,255,0.04);
        border: 1px solid rgba(0,229,255,0.15);
        border-radius: 5px;
      ">
        <span style="font-size: 11px; color: #00e5ff; font-weight: 700; flex-shrink: 0;">✓</span>
        <span style="font-size: 10px; color: #00e5ff;">All {execution.totalSteps} steps completed</span>
      </div>
    {/if}

    <!-- Started at timestamp -->
    <div style="
      margin-top: 8px;
      font-size: 9px;
      color: #3a3f50;
    ">
      Started {formatTime(execution.createdAt)}
    </div>
  {/if}
</div>
