<script lang="ts">
  import { cardPriorities } from '../../lib/stores/kanbanState';
  import type { CardPriority as CardPriorityType } from '../../lib/types';

  interface Props {
    nodeId: string;
  }

  let { nodeId }: Props = $props();

  let priority = $state<CardPriorityType | null>(null);
  let showTooltip = $state(false);

  $effect(() => {
    const unsub = cardPriorities.subscribe(map => {
      priority = map.get(nodeId) ?? null;
    });
    return unsub;
  });

  let score = $derived(priority?.score ?? 0);
  let reasons = $derived(priority?.reasons ?? []);

  let indicatorColor = $derived(
    score >= 80 ? '#ff5555' :
    score >= 50 ? '#eab308' :
    '#666'
  );
</script>

{#if priority}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="priority-chip"
    style="--ind-color: {indicatorColor}"
    onmouseenter={() => showTooltip = true}
    onmouseleave={() => showTooltip = false}
    onclick={(e) => e.stopPropagation()}
  >
    <span class="pri-dot"></span>
    <span class="pri-score">{score}</span>

    {#if showTooltip && reasons.length > 0}
      <div class="pri-tooltip">
        <div class="tooltip-title">Priority Score: {score}</div>
        {#each reasons as reason}
          <div class="tooltip-reason">{reason}</div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .priority-chip {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: default;
    user-select: none;
  }

  .pri-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ind-color);
    flex-shrink: 0;
    box-shadow: 0 0 5px color-mix(in srgb, var(--ind-color) 60%, transparent);
  }

  .pri-score {
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 9px;
    font-weight: 700;
    color: var(--ind-color);
    letter-spacing: 0.03em;
    line-height: 1;
    min-width: 16px;
  }

  /* Tooltip */
  .pri-tooltip {
    position: absolute;
    bottom: calc(100% + 6px);
    right: 0;
    z-index: 200;
    background: #161922;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 10px 12px;
    min-width: 180px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.7);
    pointer-events: none;
  }

  .tooltip-title {
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 10px;
    font-weight: 700;
    color: #ccc;
    letter-spacing: 0.06em;
    margin-bottom: 7px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 6px;
  }

  .tooltip-reason {
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 10px;
    color: #778;
    margin-bottom: 3px;
    padding-left: 2px;
  }

  .tooltip-reason::before {
    content: '+ ';
    color: #556;
  }
</style>
