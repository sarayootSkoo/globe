<script lang="ts">
  import { agentSuggestions, AGENT_DEFS, assignAgent } from '../../lib/stores/kanbanState';
  import type { AgentType } from '../../lib/types';

  interface Props {
    nodeId: string;
    onAccept?: (agent: AgentType) => void;
  }

  let { nodeId, onAccept }: Props = $props();

  let suggestions = $state<import('../../lib/types').AgentSuggestion[]>([]);
  let showTooltip = $state(false);

  $effect(() => {
    const unsub = agentSuggestions.subscribe(map => {
      suggestions = map.get(nodeId) ?? [];
    });
    return unsub;
  });

  let topSuggestion = $derived(suggestions[0] ?? null);
  let topDef = $derived(topSuggestion ? AGENT_DEFS[topSuggestion.agent] : null);

  function handleAccept(e: MouseEvent) {
    e.stopPropagation();
    if (!topSuggestion) return;
    const agent = topSuggestion.agent as AgentType;
    assignAgent(nodeId, agent);
    if (onAccept) onAccept(agent);
  }
</script>

{#if topSuggestion && topDef}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="suggest-badge"
    style="--agent-color: {topDef.color}"
    onclick={handleAccept}
    onmouseenter={() => showTooltip = true}
    onmouseleave={() => showTooltip = false}
  >
    <span class="badge-pulse"></span>
    <span class="badge-icon">{topDef.icon}</span>
    <span class="badge-label">{topDef.label}</span>

    {#if showTooltip && suggestions.length > 0}
      <div class="suggest-tooltip" onclick={(e) => e.stopPropagation()}>
        <div class="tooltip-title">AI Suggestions</div>
        {#each suggestions as s}
          {@const def = AGENT_DEFS[s.agent]}
          {#if def}
            <div class="tooltip-row">
              <span class="tip-icon" style="color: {def.color}">{def.icon}</span>
              <span class="tip-name">{def.label}</span>
              <span class="tip-pri">p{s.priority}</span>
              {#if s.note}
                <span class="tip-note">{s.note}</span>
              {/if}
            </div>
          {/if}
        {/each}
        <div class="tooltip-hint">Click to assign {topDef.label}</div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .suggest-badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 7px 2px 5px;
    border-radius: 5px;
    border: 1px solid color-mix(in srgb, var(--agent-color) 40%, transparent);
    background: color-mix(in srgb, var(--agent-color) 10%, transparent);
    cursor: pointer;
    font-family: var(--font, 'JetBrains Mono', monospace);
    transition: background 0.15s, border-color 0.15s;
    user-select: none;
  }
  .suggest-badge:hover {
    background: color-mix(in srgb, var(--agent-color) 22%, transparent);
    border-color: color-mix(in srgb, var(--agent-color) 70%, transparent);
  }

  /* Pulsing ring behind icon */
  .badge-pulse {
    position: absolute;
    inset: -2px;
    border-radius: 7px;
    border: 1px solid var(--agent-color);
    animation: pulse-ring 2s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes pulse-ring {
    0%   { opacity: 0.5; transform: scale(1); }
    50%  { opacity: 0.15; transform: scale(1.06); }
    100% { opacity: 0.5; transform: scale(1); }
  }

  .badge-icon {
    font-size: 9px;
    font-weight: 700;
    color: var(--agent-color);
    letter-spacing: 0.03em;
    line-height: 1;
  }

  .badge-label {
    font-size: 9px;
    font-weight: 600;
    color: color-mix(in srgb, var(--agent-color) 80%, #ccc);
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  /* Tooltip */
  .suggest-tooltip {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 0;
    z-index: 200;
    background: #161922;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 10px 12px;
    min-width: 200px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.7);
    pointer-events: all;
  }

  .tooltip-title {
    font-size: 10px;
    font-weight: 700;
    color: #888;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .tooltip-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 5px;
    font-size: 11px;
  }

  .tip-icon {
    font-size: 9px;
    font-weight: 700;
    width: 18px;
    flex-shrink: 0;
  }

  .tip-name {
    color: #ccc;
    flex: 1;
  }

  .tip-pri {
    font-size: 9px;
    color: #555;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .tip-note {
    font-size: 9px;
    color: #556;
    width: 100%;
    margin-top: 1px;
    padding-left: 24px;
    display: block;
  }

  .tooltip-hint {
    margin-top: 8px;
    padding-top: 7px;
    border-top: 1px solid rgba(255,255,255,0.05);
    font-size: 9px;
    color: #555;
    font-style: italic;
  }
</style>
