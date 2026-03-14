<script lang="ts">
  import { getPipelineIndex, PIPELINE_TOTAL_STAGES } from '../../lib/stores/pipelineAdvance';
  import type { KanbanStatus } from '../../lib/types';

  const STAGES = ['create', 'design', 'task', 'develop', 'testing', 'validate', 'done'] as const;

  interface Props {
    currentColumn: string;
    lifecycle: string;
  }

  let { currentColumn, lifecycle }: Props = $props();

  let pipelineIndex = $derived(getPipelineIndex(currentColumn as KanbanStatus));
  let isInPipeline = $derived(pipelineIndex >= 0);
  let isFailed = $derived(lifecycle === 'failed');

  function dotColor(stageIdx: number): string {
    if (isFailed && stageIdx === pipelineIndex) return '#ff5555';
    if (stageIdx < pipelineIndex) return '#00ff88';
    if (stageIdx === pipelineIndex) return '#00e5ff';
    return '#333';
  }

  function dotGlow(stageIdx: number): string {
    if (stageIdx === pipelineIndex && !isFailed) return '0 0 4px #00e5ff';
    if (stageIdx === pipelineIndex && isFailed) return '0 0 4px #ff5555';
    return 'none';
  }
</script>

{#if isInPipeline}
  <div class="pipeline-progress" title="Pipeline: {STAGES[pipelineIndex]}">
    <svg width="120" height="12" viewBox="0 0 120 12">
      <!-- Connecting line -->
      <line x1="6" y1="6" x2="114" y2="6" stroke="#222" stroke-width="1" />

      <!-- Completed segment line -->
      {#if pipelineIndex > 0}
        <line
          x1="6"
          y1="6"
          x2={6 + (pipelineIndex / (STAGES.length - 1)) * 108}
          y2="6"
          stroke={isFailed ? '#ff5555' : '#00ff88'}
          stroke-width="1"
          stroke-opacity="0.6"
        />
      {/if}

      <!-- Stage dots -->
      {#each STAGES as stage, i}
        <circle
          cx={6 + (i / (STAGES.length - 1)) * 108}
          cy="6"
          r={i === pipelineIndex ? 3 : 2.5}
          fill={dotColor(i)}
          style:filter={dotGlow(i) !== 'none' ? `drop-shadow(${dotGlow(i)})` : 'none'}
        >
          <title>{stage}</title>
        </circle>
      {/each}
    </svg>
  </div>
{/if}

<style>
  .pipeline-progress {
    display: inline-flex;
    align-items: center;
    height: 12px;
    width: 120px;
    font-family: 'JetBrains Mono', monospace;
  }

  svg {
    display: block;
  }

  circle {
    transition: fill 0.2s ease, r 0.2s ease;
  }
</style>
