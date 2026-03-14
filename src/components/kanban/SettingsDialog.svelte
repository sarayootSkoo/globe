<script lang="ts">
  import { kanbanConfig, DEFAULT_CONFIG } from '../../lib/stores/kanbanConfig';
  import type { KanbanConfig, ColumnDef, AgentDef, TimingConfig, LimitsConfig, NetworkConfig, AutoConfirmConfig, ProjectDef, LabelDef } from '../../lib/stores/kanbanConfig';

  let { onclose }: { onclose: () => void } = $props();

  let config = $state<KanbanConfig>(structuredClone(DEFAULT_CONFIG));
  let activeTab = $state<'projects' | 'labels' | 'columns' | 'agents' | 'timing' | 'limits' | 'network' | 'pipeline' | 'automation' | 'guide'>('projects');
  let initialized = false;

  // Subscribe to live config
  $effect(() => {
    const unsub = kanbanConfig.subscribe(v => {
      if (!initialized) {
        config = structuredClone(v);
        initialized = true;
      }
    });
    return unsub;
  });

  function save() {
    kanbanConfig.set(structuredClone(config));
  }

  function handleResetSection() {
    if (activeTab === 'guide') return;
    const key = activeTab === 'projects' ? 'projects'
      : activeTab === 'labels' ? 'labels'
      : activeTab === 'agents' ? 'agents'
      : activeTab === 'timing' ? 'timing'
      : activeTab === 'limits' ? 'limits'
      : activeTab === 'network' ? 'network'
      : activeTab === 'pipeline' ? 'pipelineRules'
      : activeTab === 'automation' ? 'autoConfirm'
      : 'columns';
    (config as unknown as Record<string, unknown>)[key] = structuredClone((DEFAULT_CONFIG as unknown as Record<string, unknown>)[key]);
    save();
  }

  function handleResetAll() {
    config = structuredClone(DEFAULT_CONFIG);
    save();
  }

  function toggleClaimable(idx: number) {
    config.columns[idx].claimable = !config.columns[idx].claimable;
    save();
  }

  function updateColumn(idx: number, field: keyof ColumnDef, value: string | boolean) {
    (config.columns[idx] as unknown as Record<string, unknown>)[field] = value;
    save();
  }

  function updateTiming(field: keyof TimingConfig, value: string) {
    config.timing[field] = parseInt(value) || 0;
    save();
  }

  function updateLimits(field: keyof LimitsConfig, value: string) {
    config.limits[field] = parseInt(value) || 0;
    save();
  }

  function updateNetwork(field: keyof NetworkConfig, value: string) {
    config.network[field] = value;
    save();
  }

  function updateAgent(key: string, field: keyof AgentDef, value: string) {
    config.agents[key][field] = value;
    save();
  }

  function togglePipelineAutoLaunch(idx: number) {
    config.pipelineRules[idx].autoLaunch = !config.pipelineRules[idx].autoLaunch;
    save();
  }

  function toggleAutoConfirm(field: keyof AutoConfirmConfig) {
    (config.autoConfirm as Record<string, boolean>)[field] = !config.autoConfirm[field];
    save();
  }

  // ── Project management ──────────────────────────────────────────────────
  let newProjectId = $state('');
  let newProjectLabel = $state('');
  let newProjectColor = $state('#14b8a6');

  function hexToGlow(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.5)`;
  }

  function addNewProject() {
    const id = newProjectId.trim().toLowerCase().replace(/\s+/g, '-');
    if (!id || !newProjectLabel.trim()) return;
    if (config.projects.some(p => p.id === id)) return;
    config.projects = [...config.projects, { id, label: newProjectLabel.trim(), color: newProjectColor, glow: hexToGlow(newProjectColor), visible: true }];
    save();
    newProjectId = '';
    newProjectLabel = '';
    newProjectColor = '#14b8a6';
  }

  function toggleProjectVisible(idx: number) {
    config.projects[idx].visible = !config.projects[idx].visible;
    save();
  }

  function deleteProject(idx: number) {
    config.projects = config.projects.filter((_, i) => i !== idx);
    save();
  }

  function updateProjectField(idx: number, field: keyof ProjectDef, value: string | boolean) {
    (config.projects[idx] as unknown as Record<string, unknown>)[field] = value;
    if (field === 'color') {
      config.projects[idx].glow = hexToGlow(value as string);
    }
    save();
  }

  // ── Label management ────────────────────────────────────────────────────
  let newLabelName = $state('');
  let newLabelColor = $state('#f97316');

  function addNewLabel() {
    const name = newLabelName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (config.labels.some(l => l.id === id)) return;
    config.labels = [...config.labels, { id, name, color: newLabelColor }];
    save();
    newLabelName = '';
    newLabelColor = '#f97316';
  }

  function deleteLabel(idx: number) {
    config.labels = config.labels.filter((_, i) => i !== idx);
    save();
  }

  function updateLabelField(idx: number, field: keyof LabelDef, value: string) {
    (config.labels[idx] as unknown as Record<string, string>)[field] = value;
    save();
  }

  // ── WIP limits ──────────────────────────────────────────────────────────
  function updateWipLimit(colId: string, value: string) {
    config.wipLimits = { ...config.wipLimits, [colId]: parseInt(value) || 0 };
    save();
  }

  const TABS = [
    { id: 'projects' as const, label: 'Projects', icon: '◆' },
    { id: 'labels' as const, label: 'Labels', icon: '◉' },
    { id: 'columns' as const, label: 'Columns', icon: '▦' },
    { id: 'agents' as const, label: 'Agents', icon: '⚙' },
    { id: 'pipeline' as const, label: 'Pipeline', icon: '→' },
    { id: 'automation' as const, label: 'Automation', icon: '⚡' },
    { id: 'timing' as const, label: 'Timing', icon: '⏱' },
    { id: 'limits' as const, label: 'Limits', icon: '#' },
    { id: 'network' as const, label: 'Network', icon: '⊕' },
    { id: 'guide' as const, label: 'Guide', icon: '?' },
  ];
</script>

<div class="settings-overlay" onclick={onclose}>
  <div class="settings-dialog" onclick={(e) => e.stopPropagation()}>
    <!-- Header -->
    <div class="settings-header">
      <span class="settings-icon">&#x2699;</span>
      <span class="settings-title">BOARD SETTINGS</span>
      <button class="close-btn" onclick={onclose}>&#x2715;</button>
    </div>

    <!-- Tabs -->
    <div class="tab-bar">
      {#each TABS as tab}
        <button
          class="tab-btn"
          class:tab-active={activeTab === tab.id}
          onclick={() => activeTab = tab.id}
        >
          <span class="tab-icon">{tab.icon}</span> {tab.label}
        </button>
      {/each}
    </div>

    <!-- Content -->
    <div class="settings-body">

      {#if activeTab === 'projects'}
        <div class="section-desc">Manage project categories visible on the kanban board.</div>
        <div class="col-table">
          <div class="col-row col-header-row">
            <span class="col-cell" style="width:30px"></span>
            <span class="col-cell" style="width:100px">ID</span>
            <span class="col-cell" style="width:120px">Label</span>
            <span class="col-cell" style="width:50px">Color</span>
            <span class="col-cell" style="width:70px">Visible</span>
            <span class="col-cell" style="width:50px"></span>
          </div>
          {#each config.projects as proj, idx}
            <div class="col-row" style="opacity: {proj.visible ? 1 : 0.4}">
              <span class="col-cell" style="width:30px">
                <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:{proj.color}"></span>
              </span>
              <span class="col-cell" style="width:100px">
                <input class="mini-input" value={proj.id} oninput={(e) => updateProjectField(idx, 'id', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell" style="width:120px">
                <input class="mini-input" value={proj.label} oninput={(e) => updateProjectField(idx, 'label', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell" style="width:50px">
                <input type="color" class="color-picker" value={proj.color} oninput={(e) => updateProjectField(idx, 'color', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell" style="width:70px">
                <button class="toggle-btn" class:toggle-on={proj.visible} onclick={() => toggleProjectVisible(idx)}>
                  {proj.visible ? 'ON' : 'OFF'}
                </button>
              </span>
              <span class="col-cell" style="width:50px">
                <button class="del-btn" onclick={() => deleteProject(idx)}>&#x2715;</button>
              </span>
            </div>
          {/each}
        </div>
        <div class="add-form">
          <input class="mini-input" style="width:100px" placeholder="project-id" bind:value={newProjectId} />
          <input class="mini-input" style="width:120px" placeholder="Label" bind:value={newProjectLabel} />
          <input type="color" class="color-picker" bind:value={newProjectColor} />
          <button class="add-btn" onclick={addNewProject}>+ Add</button>
        </div>

      {:else if activeTab === 'labels'}
        <div class="section-desc">Custom labels for card tagging and filtering.</div>
        <div class="col-table">
          <div class="col-row col-header-row">
            <span class="col-cell" style="width:30px"></span>
            <span class="col-cell" style="width:120px">Name</span>
            <span class="col-cell" style="width:50px">Color</span>
            <span class="col-cell" style="width:50px"></span>
          </div>
          {#each config.labels as label, idx}
            <div class="col-row">
              <span class="col-cell" style="width:30px">
                <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:{label.color}"></span>
              </span>
              <span class="col-cell" style="width:120px">
                <input class="mini-input" value={label.name} oninput={(e) => updateLabelField(idx, 'name', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell" style="width:50px">
                <input type="color" class="color-picker" value={label.color} oninput={(e) => updateLabelField(idx, 'color', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell" style="width:50px">
                <button class="del-btn" onclick={() => deleteLabel(idx)}>&#x2715;</button>
              </span>
            </div>
          {/each}
        </div>
        <div class="add-form">
          <input class="mini-input" style="width:140px" placeholder="Label name" bind:value={newLabelName} />
          <input type="color" class="color-picker" bind:value={newLabelColor} />
          <button class="add-btn" onclick={addNewLabel}>+ Add</button>
        </div>

      {:else if activeTab === 'columns'}
        <div class="section-desc">Configure columns, icons, tooltips, and auto-claim eligibility.</div>
        <div class="col-table">
          <div class="col-row col-header-row">
            <span class="col-cell col-icon-cell">Icon</span>
            <span class="col-cell col-id-cell">ID</span>
            <span class="col-cell col-label-cell">Label</span>
            <span class="col-cell col-color-cell">Color</span>
            <span class="col-cell col-claim-cell">Claimable</span>
            <span class="col-cell" style="width:50px">WIP</span>
            <span class="col-cell col-tip-cell">Tooltip</span>
          </div>
          {#each config.columns as col, idx}
            <div class="col-row">
              <span class="col-cell col-icon-cell">
                <input class="mini-input icon-input" value={col.icon} oninput={(e) => updateColumn(idx, 'icon', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell col-id-cell">
                <span class="col-id-tag" style="color: {col.color}">{col.id}</span>
              </span>
              <span class="col-cell col-label-cell">
                <input class="mini-input" value={col.label} oninput={(e) => updateColumn(idx, 'label', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell col-color-cell">
                <input type="color" class="color-picker" value={col.color} oninput={(e) => updateColumn(idx, 'color', (e.target as HTMLInputElement).value)} />
                <span class="color-hex">{col.color}</span>
              </span>
              <span class="col-cell col-claim-cell">
                <button
                  class="toggle-btn"
                  class:toggle-on={col.claimable}
                  onclick={() => toggleClaimable(idx)}
                >
                  {col.claimable ? 'ON' : 'OFF'}
                </button>
              </span>
              <span class="col-cell" style="width:50px">
                <input class="mini-input" style="width:40px;text-align:center" type="number" min="0" value={config.wipLimits[col.id] ?? 0} oninput={(e) => updateWipLimit(col.id, (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell col-tip-cell">
                <input class="mini-input tip-input" value={col.tooltip} oninput={(e) => updateColumn(idx, 'tooltip', (e.target as HTMLInputElement).value)} />
              </span>
            </div>
          {/each}
        </div>

      {:else if activeTab === 'agents'}
        <div class="section-desc">Configure agent definitions, roles, and slash commands.</div>
        <div class="col-table">
          <div class="col-row col-header-row">
            <span class="col-cell" style="width:60px">Key</span>
            <span class="col-cell" style="width:80px">Label</span>
            <span class="col-cell" style="width:120px">Role</span>
            <span class="col-cell" style="width:40px">Icon</span>
            <span class="col-cell" style="width:50px">Color</span>
            <span class="col-cell" style="width:80px">Command</span>
          </div>
          {#each Object.entries(config.agents) as [key, agent]}
            <div class="col-row">
              <span class="col-cell" style="width:60px"><span class="col-id-tag" style="color:{agent.color}">{key}</span></span>
              <span class="col-cell" style="width:80px"><input class="mini-input" value={agent.label} oninput={(e) => updateAgent(key, 'label', (e.target as HTMLInputElement).value)} /></span>
              <span class="col-cell" style="width:120px"><input class="mini-input" value={agent.role} oninput={(e) => updateAgent(key, 'role', (e.target as HTMLInputElement).value)} /></span>
              <span class="col-cell" style="width:40px"><input class="mini-input icon-input" value={agent.icon} oninput={(e) => updateAgent(key, 'icon', (e.target as HTMLInputElement).value)} /></span>
              <span class="col-cell" style="width:50px">
                <input type="color" class="color-picker" value={agent.color} oninput={(e) => updateAgent(key, 'color', (e.target as HTMLInputElement).value)} />
              </span>
              <span class="col-cell" style="width:80px"><input class="mini-input" value={agent.command} oninput={(e) => updateAgent(key, 'command', (e.target as HTMLInputElement).value)} /></span>
            </div>
          {/each}
        </div>

      {:else if activeTab === 'pipeline'}
        <div class="section-desc">Configure automatic pipeline transitions between columns.</div>
        <div class="col-table">
          <div class="col-row col-header-row">
            <span class="col-cell" style="width:100px">From</span>
            <span class="col-cell" style="width:30px"></span>
            <span class="col-cell" style="width:100px">To</span>
            <span class="col-cell" style="width:100px">Auto Agent</span>
            <span class="col-cell" style="width:80px">Auto Launch</span>
          </div>
          {#each config.pipelineRules as rule, idx}
            <div class="col-row">
              <span class="col-cell" style="width:100px"><span class="col-id-tag">{rule.from}</span></span>
              <span class="col-cell" style="width:30px; color:#555">&#x2192;</span>
              <span class="col-cell" style="width:100px"><span class="col-id-tag">{rule.to}</span></span>
              <span class="col-cell" style="width:100px"><span class="col-id-tag" style="color:#4d8aff">{rule.autoAgent || 'none'}</span></span>
              <span class="col-cell" style="width:80px">
                <button class="toggle-btn" class:toggle-on={rule.autoLaunch} onclick={() => togglePipelineAutoLaunch(idx)}>
                  {rule.autoLaunch ? 'ON' : 'OFF'}
                </button>
              </span>
            </div>
          {/each}
        </div>

      {:else if activeTab === 'timing'}
        <div class="section-desc">Debounce and reconnect intervals (milliseconds).</div>
        <div class="field-grid">
          {#each Object.entries(config.timing) as [key, val]}
            <div class="field-row">
              <label class="field-label">{key.replace(/([A-Z])/g, ' $1').replace(/Ms$/, ' (ms)')}</label>
              <input class="field-input" type="number" value={val} oninput={(e) => updateTiming(key as keyof TimingConfig, (e.target as HTMLInputElement).value)} />
            </div>
          {/each}
        </div>

      {:else if activeTab === 'limits'}
        <div class="section-desc">Maximum values for queues, logs, and retries.</div>
        <div class="field-grid">
          {#each Object.entries(config.limits) as [key, val]}
            <div class="field-row">
              <label class="field-label">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input class="field-input" type="number" value={val} oninput={(e) => updateLimits(key as keyof LimitsConfig, (e.target as HTMLInputElement).value)} />
            </div>
          {/each}
        </div>

      {:else if activeTab === 'network'}
        <div class="section-desc">Server endpoints for event server and WebSocket.</div>
        <div class="field-grid">
          {#each Object.entries(config.network) as [key, val]}
            <div class="field-row">
              <label class="field-label">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input class="field-input" type="text" value={val} oninput={(e) => updateNetwork(key as keyof NetworkConfig, (e.target as HTMLInputElement).value)} />
            </div>
          {/each}
        </div>

      {:else if activeTab === 'automation'}
        <div class="section-desc">Control auto-claim, queue launch, and confirm dialog behavior.</div>
        <div class="auto-grid">
          <div class="auto-section">
            <div class="auto-section-title">Master Switches</div>
            <div class="auto-row">
              <div class="auto-info">
                <span class="auto-label">Auto-Claim Engine</span>
                <span class="auto-desc">Automatically assign agents to idle cards in claimable columns</span>
              </div>
              <button class="toggle-btn" class:toggle-on={config.autoConfirm.autoClaimEnabled} onclick={() => toggleAutoConfirm('autoClaimEnabled')}>
                {config.autoConfirm.autoClaimEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            <div class="auto-row">
              <div class="auto-info">
                <span class="auto-label">Queue Auto-Launch</span>
                <span class="auto-desc">Queue processor automatically launches agents when slots available</span>
              </div>
              <button class="toggle-btn" class:toggle-on={config.autoConfirm.queueAutoLaunch} onclick={() => toggleAutoConfirm('queueAutoLaunch')}>
                {config.autoConfirm.queueAutoLaunch ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div class="auto-section">
            <div class="auto-section-title">Confirm Dialog Behavior</div>
            <div class="auto-hint">When ON, actions execute immediately without showing the confirm dialog.</div>
            <div class="auto-row">
              <div class="auto-info">
                <span class="auto-label">&#x1F4CB; Claim — Auto Confirm</span>
                <span class="auto-desc">Skip confirm for agent claim actions</span>
              </div>
              <button class="toggle-btn" class:toggle-on={config.autoConfirm.claimAutoConfirm} onclick={() => toggleAutoConfirm('claimAutoConfirm')}>
                {config.autoConfirm.claimAutoConfirm ? 'AUTO' : 'CONFIRM'}
              </button>
            </div>
            <div class="auto-row">
              <div class="auto-info">
                <span class="auto-label">&#x25B6; Launch — Auto Confirm</span>
                <span class="auto-desc">Skip confirm for agent launch actions</span>
              </div>
              <button class="toggle-btn" class:toggle-on={config.autoConfirm.launchAutoConfirm} onclick={() => toggleAutoConfirm('launchAutoConfirm')}>
                {config.autoConfirm.launchAutoConfirm ? 'AUTO' : 'CONFIRM'}
              </button>
            </div>
            <div class="auto-row">
              <div class="auto-info">
                <span class="auto-label">&#x27A1; Advance — Auto Confirm</span>
                <span class="auto-desc">Skip confirm for pipeline advance actions</span>
              </div>
              <button class="toggle-btn" class:toggle-on={config.autoConfirm.advanceAutoConfirm} onclick={() => toggleAutoConfirm('advanceAutoConfirm')}>
                {config.autoConfirm.advanceAutoConfirm ? 'AUTO' : 'CONFIRM'}
              </button>
            </div>
          </div>

          <div class="auto-section">
            <div class="auto-section-title">Claimable Columns</div>
            <div class="auto-hint">Columns where auto-claim engine will assign agents to idle cards.</div>
            <div class="auto-cols">
              {#each config.columns as col, idx}
                <button
                  class="auto-col-chip"
                  class:auto-col-active={col.claimable}
                  style="border-color: {col.color}; color: {col.claimable ? col.color : '#444'}"
                  onclick={() => toggleClaimable(idx)}
                >
                  {col.icon} {col.label}
                </button>
              {/each}
            </div>
          </div>
        </div>

      {:else if activeTab === 'guide'}
        <div class="guide-content">
          <h3 class="guide-heading">SDLC Board Guide</h3>
          <div class="guide-section">
            <div class="guide-title">Column Flow</div>
            <div class="guide-flow">
              {#each config.columns as col}
                <span class="guide-chip" style="border-color: {col.color}; color: {col.color}">
                  <span class="guide-chip-icon">{col.icon}</span> {col.label}
                </span>
              {/each}
            </div>
          </div>
          <div class="guide-section">
            <div class="guide-title">Column Descriptions</div>
            {#each config.columns as col}
              <div class="guide-row">
                <span class="guide-col-icon" style="color: {col.color}">{col.icon}</span>
                <span class="guide-col-label" style="color: {col.color}">{col.label}</span>
                <span class="guide-col-tip">{col.tooltip}</span>
                {#if col.claimable}
                  <span class="guide-badge">auto-claim</span>
                {/if}
              </div>
            {/each}
          </div>
          <div class="guide-section">
            <div class="guide-title">Agents</div>
            {#each Object.entries(config.agents) as [key, agent]}
              <div class="guide-row">
                <span class="guide-agent-icon" style="background: {agent.color}">{agent.icon}</span>
                <span class="guide-col-label" style="color: {agent.color}">{agent.label}</span>
                <span class="guide-col-tip">{agent.role} &mdash; <code>{agent.command}</code></span>
              </div>
            {/each}
          </div>
          <div class="guide-section">
            <div class="guide-title">Pipeline</div>
            {#each config.pipelineRules as rule}
              <div class="guide-row">
                <span class="guide-col-label">{rule.from}</span>
                <span style="color:#555">&#x2192;</span>
                <span class="guide-col-label">{rule.to}</span>
                {#if rule.autoAgent}
                  <span class="guide-badge">{rule.autoAgent}</span>
                {/if}
                {#if rule.autoLaunch}
                  <span class="guide-badge guide-badge-green">auto-launch</span>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Footer -->
    <div class="settings-footer">
      {#if activeTab !== 'guide'}
        <button class="btn btn-reset" onclick={handleResetSection}>Reset {activeTab}</button>
      {/if}
      <button class="btn btn-reset-all" onclick={handleResetAll}>Reset All</button>
      <button class="btn btn-close" onclick={onclose}>Close</button>
    </div>
  </div>
</div>

<style>
  .settings-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center;
    animation: fade-in 0.12s ease-out;
  }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

  .settings-dialog {
    background: #12141a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    width: 860px; max-width: 95vw;
    max-height: 85vh;
    display: flex; flex-direction: column;
    font-family: var(--font, 'JetBrains Mono', monospace);
    box-shadow: 0 16px 48px rgba(0,0,0,0.6);
  }

  .settings-header {
    display: flex; align-items: center; gap: 8px;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .settings-icon { font-size: 16px; color: #00e5ff; }
  .settings-title {
    font-size: 13px; font-weight: 700; color: #e0e0e0;
    letter-spacing: 0.1em; flex: 1;
  }
  .close-btn {
    background: none; border: none; color: #555; font-size: 14px;
    cursor: pointer; padding: 4px 8px; border-radius: 4px;
  }
  .close-btn:hover { color: #ff5555; background: rgba(255,85,85,0.1); }

  /* Tabs */
  .tab-bar {
    display: flex; gap: 2px; padding: 0 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    overflow-x: auto;
  }
  .tab-btn {
    background: none; border: none; border-bottom: 2px solid transparent;
    color: #555; font-size: 11px; font-weight: 600; font-family: inherit;
    padding: 10px 14px; cursor: pointer; white-space: nowrap;
    letter-spacing: 0.04em; transition: all 0.12s;
  }
  .tab-btn:hover { color: #aaa; }
  .tab-active {
    color: #00e5ff !important;
    border-bottom-color: #00e5ff;
  }
  .tab-icon { margin-right: 4px; }

  /* Body */
  .settings-body {
    flex: 1; overflow-y: auto; padding: 16px 20px;
    min-height: 300px;
  }
  .section-desc {
    font-size: 11px; color: #555; margin-bottom: 14px;
    letter-spacing: 0.02em;
  }

  /* Column table */
  .col-table { display: flex; flex-direction: column; gap: 1px; }
  .col-row {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 8px; border-radius: 4px;
  }
  .col-row:hover { background: rgba(255,255,255,0.02); }
  .col-header-row {
    font-size: 9px; font-weight: 700; color: #555;
    letter-spacing: 0.08em; text-transform: uppercase;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    padding-bottom: 8px; margin-bottom: 4px;
  }
  .col-header-row:hover { background: transparent; }
  .col-cell { display: flex; align-items: center; gap: 4px; }
  .col-icon-cell { width: 40px; }
  .col-id-cell { width: 90px; }
  .col-label-cell { width: 100px; }
  .col-color-cell { width: 100px; }
  .col-claim-cell { width: 70px; }
  .col-tip-cell { flex: 1; }

  .col-id-tag {
    font-size: 10px; font-weight: 600; letter-spacing: 0.04em;
  }

  /* Inputs */
  .mini-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px; padding: 4px 6px;
    color: #ccc; font-size: 11px; font-family: inherit;
    width: 100%; outline: none; box-sizing: border-box;
  }
  .mini-input:focus { border-color: rgba(0,229,255,0.3); }
  .icon-input { width: 32px; text-align: center; }
  .tip-input { width: 100%; }

  .color-picker {
    width: 22px; height: 22px; border: none; border-radius: 4px;
    background: transparent; cursor: pointer; padding: 0;
  }
  .color-hex { font-size: 9px; color: #555; font-family: inherit; }

  /* Toggle */
  .toggle-btn {
    font-size: 9px; font-weight: 700; font-family: inherit;
    padding: 3px 8px; border-radius: 4px; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.03); color: #555;
    letter-spacing: 0.06em; transition: all 0.12s;
  }
  .toggle-on {
    background: rgba(0,255,136,0.12); color: #00ff88;
    border-color: rgba(0,255,136,0.3);
  }

  /* Field grid (timing/limits/network) */
  .field-grid { display: flex; flex-direction: column; gap: 10px; }
  .field-row { display: flex; align-items: center; gap: 12px; }
  .field-label {
    font-size: 11px; color: #888; width: 220px;
    text-transform: capitalize;
  }
  .field-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px; padding: 6px 10px;
    color: #ccc; font-size: 12px; font-family: inherit;
    width: 200px; outline: none;
  }
  .field-input:focus { border-color: rgba(0,229,255,0.3); }

  /* Guide */
  .guide-content { font-size: 12px; color: #aaa; }
  .guide-heading {
    font-size: 14px; font-weight: 700; color: #e0e0e0;
    margin: 0 0 16px; letter-spacing: 0.06em;
  }
  .guide-section { margin-bottom: 20px; }
  .guide-title {
    font-size: 11px; font-weight: 700; color: #666;
    letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: 8px; padding-bottom: 4px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .guide-flow {
    display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;
  }
  .guide-chip {
    font-size: 10px; font-weight: 600; padding: 4px 10px;
    border: 1px solid; border-radius: 6px;
    display: flex; align-items: center; gap: 4px;
    letter-spacing: 0.04em;
  }
  .guide-chip-icon { font-size: 12px; }
  .guide-row {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 0; font-size: 11px;
  }
  .guide-col-icon { font-size: 14px; width: 20px; text-align: center; }
  .guide-col-label { font-weight: 600; min-width: 90px; font-size: 11px; }
  .guide-col-tip { color: #666; flex: 1; }
  .guide-badge {
    font-size: 9px; font-weight: 700; padding: 2px 6px;
    border-radius: 3px; letter-spacing: 0.04em;
    background: rgba(0,229,255,0.1); color: #00e5ff;
    border: 1px solid rgba(0,229,255,0.2);
  }
  .guide-badge-green {
    background: rgba(0,255,136,0.1); color: #00ff88;
    border-color: rgba(0,255,136,0.2);
  }
  .guide-agent-icon {
    width: 20px; height: 20px; border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 8px; font-weight: 700; color: #fff;
  }
  .guide-content code {
    font-size: 10px; color: #4d8aff;
    background: rgba(77,138,255,0.08);
    padding: 1px 4px; border-radius: 3px;
  }

  /* Footer */
  .settings-footer {
    display: flex; gap: 8px; padding: 12px 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    justify-content: flex-end;
  }
  .btn {
    font-size: 11px; font-weight: 600; font-family: inherit;
    padding: 6px 14px; border-radius: 6px; cursor: pointer;
    letter-spacing: 0.04em; border: 1px solid;
    transition: all 0.12s;
  }
  .btn-reset {
    background: rgba(249,115,22,0.1); color: #f97316;
    border-color: rgba(249,115,22,0.25);
  }
  .btn-reset:hover { background: rgba(249,115,22,0.2); }
  .btn-reset-all {
    background: rgba(255,85,85,0.1); color: #ff5555;
    border-color: rgba(255,85,85,0.25);
  }
  .btn-reset-all:hover { background: rgba(255,85,85,0.2); }
  .btn-close {
    background: rgba(255,255,255,0.05); color: #aaa;
    border-color: rgba(255,255,255,0.1);
  }
  .btn-close:hover { background: rgba(255,255,255,0.1); color: #e0e0e0; }

  /* Automation tab */
  .auto-grid { display: flex; flex-direction: column; gap: 20px; }
  .auto-section {
    background: rgba(255,255,255,0.015);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 8px; padding: 14px;
  }
  .auto-section-title {
    font-size: 11px; font-weight: 700; color: #888;
    letter-spacing: 0.06em; text-transform: uppercase;
    margin-bottom: 10px;
  }
  .auto-hint {
    font-size: 10px; color: #555; margin-bottom: 10px;
  }
  .auto-row {
    display: flex; align-items: center; gap: 12px;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }
  .auto-row:last-child { border-bottom: none; }
  .auto-info { flex: 1; }
  .auto-label {
    font-size: 12px; font-weight: 600; color: #ccc;
    display: block;
  }
  .auto-desc {
    font-size: 10px; color: #555; display: block; margin-top: 2px;
  }
  .auto-cols {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .auto-col-chip {
    font-size: 10px; font-weight: 600; font-family: inherit;
    padding: 5px 10px; border-radius: 6px; cursor: pointer;
    border: 1px solid; background: transparent;
    letter-spacing: 0.04em; transition: all 0.12s;
    opacity: 0.5;
  }
  .auto-col-active {
    opacity: 1;
    background: rgba(255,255,255,0.04);
  }
  .auto-col-chip:hover { opacity: 0.8; }

  /* Add form */
  .add-form {
    display: flex; align-items: center; gap: 8px;
    margin-top: 12px; padding: 10px 8px;
    border-top: 1px solid rgba(255,255,255,0.04);
  }
  .add-btn {
    font-size: 10px; font-weight: 700; font-family: inherit;
    padding: 5px 12px; border-radius: 4px; cursor: pointer;
    border: 1px solid rgba(0,229,255,0.3);
    background: rgba(0,229,255,0.1); color: #00e5ff;
    letter-spacing: 0.04em; transition: all 0.12s; white-space: nowrap;
  }
  .add-btn:hover { background: rgba(0,229,255,0.2); }
  .del-btn {
    background: none; border: none; color: #555; font-size: 12px;
    cursor: pointer; padding: 2px 6px; border-radius: 3px;
  }
  .del-btn:hover { color: #ff5555; background: rgba(255,85,85,0.1); }
</style>
