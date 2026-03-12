<script lang="ts">
  let {
    cardId,
    blockedBy = [],
    blocking = [],
  }: {
    cardId: string;
    blockedBy?: string[];
    blocking?: string[];
  } = $props();

  let isBlocked  = $derived(blockedBy.length > 0);
  let isBlocking = $derived(blocking.length > 0);
</script>

{#if isBlocked || isBlocking}
  <div class="dep-badges">
    {#if isBlocked}
      <span
        class="dep-badge dep-blocked"
        title="Blocked by: {blockedBy.join(', ')}"
      >
        🔒 Blocked by {blockedBy.length}
      </span>
    {/if}
    {#if isBlocking}
      <span
        class="dep-badge dep-blocking"
        title="Blocking: {blocking.join(', ')}"
      >
        ⚠️ Blocking {blocking.length}
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

  /* Card is blocked — cannot proceed */
  .dep-blocked {
    color: #ff5555;
    border-color: rgba(255, 85, 85, 0.45);
    background: rgba(255, 85, 85, 0.10);
  }

  /* Card is blocking others — they are waiting on this one */
  .dep-blocking {
    color: #f97316;
    border-color: rgba(249, 115, 22, 0.45);
    background: rgba(249, 115, 22, 0.10);
  }
</style>
