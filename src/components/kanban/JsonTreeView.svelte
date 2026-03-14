<script lang="ts">
  interface Props {
    data: unknown;
    label?: string;
    depth?: number;
    startExpanded?: boolean;
  }

  let { data, label = '', depth = 0, startExpanded = true }: Props = $props();

  let expanded = $state(startExpanded && depth < 2);

  function toggle() { expanded = !expanded; }

  function typeOf(val: unknown): string {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val;
  }

  function isExpandable(val: unknown): boolean {
    return (typeof val === 'object' && val !== null);
  }

  function entries(val: unknown): [string, unknown][] {
    if (Array.isArray(val)) return val.map((v, i) => [String(i), v]);
    if (typeof val === 'object' && val !== null) return Object.entries(val);
    return [];
  }

  function preview(val: unknown): string {
    if (Array.isArray(val)) return `[${val.length}]`;
    if (typeof val === 'object' && val !== null) {
      const keys = Object.keys(val);
      return `{${keys.length}}`;
    }
    return '';
  }

  function formatValue(val: unknown): string {
    if (typeof val === 'string') return `"${val}"`;
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    return String(val);
  }

  function valueClass(val: unknown): string {
    if (typeof val === 'string') return 'jt-string';
    if (typeof val === 'number') return 'jt-number';
    if (typeof val === 'boolean') return 'jt-boolean';
    if (val === null) return 'jt-null';
    return '';
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if isExpandable(data)}
  <div class="jt-node" style="padding-left: {depth * 16}px">
    <span class="jt-toggle" onclick={toggle}>{expanded ? '▾' : '▸'}</span>
    {#if label}
      <span class="jt-key">"{label}"</span><span class="jt-colon">: </span>
    {/if}
    {#if !expanded}
      <span class="jt-preview" onclick={toggle}>{Array.isArray(data) ? '[' : '{'}<span class="jt-dots">...</span>{Array.isArray(data) ? ']' : '}'}</span>
      <span class="jt-count">{preview(data)}</span>
    {:else}
      <span class="jt-bracket">{Array.isArray(data) ? '[' : '{'}</span>
    {/if}
  </div>
  {#if expanded}
    {#each entries(data) as [key, val]}
      <svelte:self data={val} label={key} depth={depth + 1} startExpanded={depth < 1} />
    {/each}
    <div class="jt-node" style="padding-left: {depth * 16}px">
      <span class="jt-bracket">{Array.isArray(data) ? ']' : '}'}</span>
    </div>
  {/if}
{:else}
  <div class="jt-node" style="padding-left: {depth * 16}px">
    <span class="jt-spacer"></span>
    {#if label}
      <span class="jt-key">"{label}"</span><span class="jt-colon">: </span>
    {/if}
    <span class={valueClass(data)}>{formatValue(data)}</span>
  </div>
{/if}

<style>
  .jt-node {
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 12px;
    line-height: 1.7;
    white-space: nowrap;
  }
  .jt-toggle {
    display: inline-block;
    width: 14px;
    color: #666;
    cursor: pointer;
    user-select: none;
    text-align: center;
  }
  .jt-toggle:hover { color: #00e5ff; }
  .jt-spacer {
    display: inline-block;
    width: 14px;
  }
  .jt-key { color: #e0e0e0; }
  .jt-colon { color: #666; }
  .jt-bracket { color: #888; }
  .jt-preview {
    color: #666; cursor: pointer;
  }
  .jt-preview:hover { color: #999; }
  .jt-dots { color: #555; }
  .jt-count { color: #444; font-size: 10px; margin-left: 4px; }
  .jt-string { color: #e5a66b; }
  .jt-number { color: #6cb6ff; }
  .jt-boolean { color: #00e5ff; }
  .jt-null { color: #888; font-style: italic; }
</style>
