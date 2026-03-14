<script lang="ts">
  import { kanbanConfig, toggleProjectVisibility } from '../../lib/stores/kanbanConfig';
  import type { ProjectDef } from '../../lib/stores/kanbanConfig';

  interface Props {
    onfocus?: (projectId: string | null) => void;
  }

  let { onfocus }: Props = $props();

  let projects: ProjectDef[] = $state([]);

  $effect(() => {
    const unsub = kanbanConfig.subscribe(cfg => {
      projects = cfg.projects;
    });
    return unsub;
  });

  function handleClick(projectId: string) {
    toggleProjectVisibility(projectId);
  }

  function handleDblClick(projectId: string) {
    onfocus?.(projectId);
  }

  function handleClearFocus() {
    onfocus?.(null);
  }
</script>

<div class="project-chips">
  {#each projects as project (project.id)}
    <button
      class="chip"
      class:dimmed={!project.visible}
      style:border-color={project.color}
      title="{project.label} — click: toggle, dblclick: focus"
      onclick={() => handleClick(project.id)}
      ondblclick={() => handleDblClick(project.id)}
    >
      <span class="dot" style:background={project.color}></span>
      <span class="label">{project.label}</span>
    </button>
  {/each}

  {#if onfocus}
    <button
      class="chip chip-clear"
      title="Clear project focus"
      ondblclick={handleClearFocus}
    >
      <span class="label">✕</span>
    </button>
  {/if}
</div>

<style>
  .project-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    padding: 4px 0;
    font-family: 'JetBrains Mono', monospace;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid;
    background: #12141a;
    color: #ccc;
    font-size: 10px;
    font-family: inherit;
    cursor: pointer;
    transition: opacity 0.2s ease, background 0.15s ease;
    user-select: none;
    line-height: 1.4;
  }

  .chip:hover {
    background: #1a1d26;
  }

  .chip.dimmed {
    opacity: 0.35;
  }

  .chip.dimmed:hover {
    opacity: 0.55;
  }

  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .label {
    white-space: nowrap;
  }

  .chip-clear {
    border-color: #444;
    color: #666;
    font-size: 9px;
    padding: 2px 6px;
  }

  .chip-clear:hover {
    color: #ff5555;
    border-color: #ff5555;
  }
</style>
