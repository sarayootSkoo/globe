<script lang="ts">
  import type { CardRef } from '../../lib/types';

  let {
    cardId,
    blockedBy = [],
    blocking = [],
    refs = [],
  }: {
    cardId: string;
    blockedBy?: string[];
    blocking?: string[];
    refs?: CardRef[];
  } = $props();

  let isBlocked  = $derived(blockedBy.length > 0);
  let isBlocking = $derived(blocking.length > 0);
  let hasRefs    = $derived(refs.length > 0);

  let refSummary = $derived(
    refs.map(r => `${r.type}: ${r.targetId.slice(0, 20)}`).join('\n')
  );
</script>

{#if isBlocked || isBlocking || hasRefs}
  <div class="dep-badges">
    {#if isBlocked}
      <span
        class="dep-badge dep-blocked"
        title="Blocked by: {blockedBy.join(', ')}"
      >
        Blocked by {blockedBy.length}
      </span>
    {/if}
    {#if isBlocking}
      <span
        class="dep-badge dep-blocking"
        title="Blocking: {blocking.join(', ')}"
      >
        Blocking {blocking.length}
      </span>
    {/if}
    {#if hasRefs}
      <span
        class="dep-badge dep-refs"
        title={refSummary}
      >
        {refs.length} ref{refs.length > 1 ? 's' : ''}
      </span>
    {/if}
  </div>
{/if}

<style>
  .dep-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 6px;
  }

  .dep-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 2px 7px;
    border-radius: 4px;
    border: 1px solid;
    white-space: nowrap;
    line-height: 1.4;
    font-family: inherit;
  }

  .dep-blocked {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.45);
    background: rgba(255, 85, 85, 0.10);
  }

  .dep-blocking {
    color: #f97316;
    border-color: rgba(249, 115, 22, 0.45);
    background: rgba(249, 115, 22, 0.10);
  }

  .dep-refs {
    color: #00e5ff;
    border-color: rgba(0, 229, 255, 0.35);
    background: rgba(0, 229, 255, 0.08);
  }
</style>
