/**
 * kanbanConfig.ts — Centralized configuration store backed by kanbanDB.
 *
 * All config persisted via the unified kanbanDB system (kg-kanban-config).
 */

import { writable, get } from 'svelte/store';
import { kanbanDB } from './kanbanDB';
import type { KanbanStatus, AgentType } from '../types';

// ── Storage (via kanbanDB) ───────────────────────────────────────────────────

function loadConfig<T>(fallback: T): T {
  const stored = kanbanDB.config.get({} as Record<string, unknown>);
  if (!stored || Object.keys(stored).length === 0) return fallback;
  return { ...fallback, ...stored } as T;
}

function saveConfig(cfg: KanbanConfig): void {
  kanbanDB.config.set(cfg as unknown as Record<string, unknown>);
}

// Migrate: remove old standalone key if exists
try { localStorage.removeItem('kg-kanban-config'); } catch { /* ignore */ }

// ── Column Definition ────────────────────────────────────────────────────────

export interface ColumnDef {
  id: KanbanStatus;
  label: string;
  color: string;
  icon: string;       // emoji or short text icon
  tooltip: string;    // guide description
  claimable: boolean; // eligible for auto-claim
}

// ── Agent Definition ─────────────────────────────────────────────────────────

export interface AgentDef {
  label: string;
  role: string;
  color: string;
  icon: string;
  command: string;
}

// ── Pipeline Rule ────────────────────────────────────────────────────────────

export interface PipelineRule {
  from: KanbanStatus;
  to: KanbanStatus;
  autoAgent: AgentType | null;
  autoLaunch: boolean;
}

// ── Timing Config ────────────────────────────────────────────────────────────

export interface TimingConfig {
  autoClaimDebounceMs: number;
  queueProcessorDebounceMs: number;
  boardSyncDebounceMs: number;
  wsReconnectMs: number;
}

// ── Limits Config ────────────────────────────────────────────────────────────

export interface LimitsConfig {
  maxConcurrentAgents: number;
  maxActivityLog: number;
  maxConsoleLines: number;
  maxRecentEvents: number;
  maxRetryAttempts: number;
  maxCommandHistory: number;
}

// ── Network Config ───────────────────────────────────────────────────────────

export interface NetworkConfig {
  eventServerUrl: string;
  wsUrl: string;
}

// ── Project Definition ───────────────────────────────────────────────────────

export interface ProjectDef {
  id: string;
  label: string;
  color: string;
  glow: string;
  visible: boolean;
}

// ── Label Definition ─────────────────────────────────────────────────────────

export interface LabelDef {
  id: string;
  name: string;
  color: string;
}

// ── Auto-Confirm Config ──────────────────────────────────────────────────────

export interface AutoConfirmConfig {
  /** Auto-execute claim actions without confirm dialog */
  claimAutoConfirm: boolean;
  /** Auto-execute launch actions without confirm dialog */
  launchAutoConfirm: boolean;
  /** Auto-execute pipeline advance actions without confirm dialog */
  advanceAutoConfirm: boolean;
  /** Master switch: disable all auto-claim entirely */
  autoClaimEnabled: boolean;
  /** Master switch: disable queue auto-launch entirely */
  queueAutoLaunch: boolean;
}

// ── Full Config ──────────────────────────────────────────────────────────────

export interface KanbanConfig {
  columns: ColumnDef[];
  agents: Record<string, AgentDef>;
  agentSuggestRules: Record<string, string[]>;
  timing: TimingConfig;
  limits: LimitsConfig;
  network: NetworkConfig;
  pipelineRules: PipelineRule[];
  autoConfirm: AutoConfirmConfig;
  projects: ProjectDef[];
  labels: LabelDef[];
  wipLimits: Record<string, number>;
}

// ── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_COLUMNS: ColumnDef[] = [
  { id: 'create',      label: 'CREATE',      color: '#ffffff', icon: '✦', tooltip: 'New cards — create tasks, features, or issues', claimable: false },
  { id: 'design',      label: 'DESIGN',      color: '#b44dff', icon: '◈', tooltip: 'Design phase — breakdown & architecture planning', claimable: false },
  { id: 'backlog',     label: 'BACKLOG',     color: '#888888', icon: '☰', tooltip: 'Prioritized backlog — waiting for sprint assignment', claimable: false },
  { id: 'hold',        label: 'HOLD',        color: '#ffcc00', icon: '⏸', tooltip: 'On hold — blocked or paused work', claimable: false },
  { id: 'task',        label: 'TASK',        color: '#00e5ff', icon: '▸', tooltip: 'Ready tasks — agent can auto-claim and start', claimable: true },
  { id: 'issue',       label: 'ISSUE',       color: '#ff3d3d', icon: '⚑', tooltip: 'Active issues — bugs & investigations', claimable: true },
  { id: 'develop',     label: 'DEVELOP',     color: '#4d8aff', icon: '⟨⟩', tooltip: 'In development — implementation in progress', claimable: true },
  { id: 'testing',     label: 'TESTING',     color: '#f97316', icon: '⧫', tooltip: 'Testing phase — QA & review cycles', claimable: true },
  { id: 'validate',    label: 'VALIDATE',    color: '#00ff88', icon: '✓', tooltip: 'Validation — domain expert sign-off', claimable: true },
  { id: 'update-docs', label: 'UPDATE DOCS', color: '#ff3dff', icon: '✎', tooltip: 'Documentation updates required before done', claimable: true },
  { id: 'done',        label: 'DONE',        color: '#666666', icon: '●', tooltip: 'Completed — ready for archive', claimable: false },
  { id: 'archive',     label: 'ARCHIVE',     color: '#444444', icon: '▪', tooltip: 'Archived — historical reference only', claimable: false },
  { id: 'delete',      label: 'DELETE',      color: '#ff3d3d', icon: '✕', tooltip: 'Marked for deletion — truncate to purge', claimable: false },
];

export const DEFAULT_AGENTS: Record<string, AgentDef> = {
  chore:      { label: 'Chore',      role: 'Tech Lead',        color: '#b44dff', icon: 'CH', command: '/chore' },
  feature:    { label: 'Feature',    role: 'Tech Lead',        color: '#a855f7', icon: 'FE', command: '/feature' },
  breakdown:  { label: 'Breakdown',  role: 'Product Manager',  color: '#ff3dff', icon: 'BD', command: '/breakdown' },
  estimate:   { label: 'Estimate',   role: 'Scrum Master',     color: '#06b6d4', icon: 'ES', command: '/estimate' },
  implement:  { label: 'Implement',  role: 'Developer',        color: '#4d8aff', icon: 'IM', command: '/implement' },
  issue:      { label: 'Issue',      role: 'Investigator',     color: '#ff3d3d', icon: 'IS', command: '/issue' },
  test:       { label: 'Test',       role: 'QA Engineer',      color: '#eab308', icon: 'TE', command: '/test' },
  review:     { label: 'Review',     role: 'Code Reviewer',    color: '#f97316', icon: 'RE', command: '/review' },
  security:   { label: 'Security',   role: 'Security Auditor', color: '#ef4444', icon: 'SE', command: '/security' },
  validate:   { label: 'Validate',   role: 'Domain Expert',    color: '#00ff88', icon: 'VA', command: '/validate' },
  docs:       { label: 'Docs',       role: 'Tech Writer',      color: '#8b5cf6', icon: 'DO', command: '/docs' },
  deploy:     { label: 'Deploy',     role: 'DevOps Engineer',  color: '#64748b', icon: 'DP', command: '/deploy' },
  discussion: { label: 'Discussion', role: 'Architect',        color: '#14b8a6', icon: 'DI', command: '/discussion' },
};

export const DEFAULT_SUGGEST_RULES: Record<string, string[]> = {
  'create':      ['chore', 'feature', 'issue'],
  'design':      ['breakdown', 'discussion', 'chore'],
  'backlog':     [],
  'hold':        [],
  'task':        ['implement', 'estimate'],
  'issue':       ['issue'],
  'develop':     ['implement'],
  'testing':     ['test', 'review'],
  'validate':    ['validate', 'security'],
  'update-docs': ['docs'],
  'done':        ['deploy'],
  'archive':     [],
  'delete':      [],
};

export const DEFAULT_TIMING: TimingConfig = {
  autoClaimDebounceMs: 500,
  queueProcessorDebounceMs: 1000,
  boardSyncDebounceMs: 5000,
  wsReconnectMs: 3000,
};

export const DEFAULT_LIMITS: LimitsConfig = {
  maxConcurrentAgents: 2,
  maxActivityLog: 500,
  maxConsoleLines: 500,
  maxRecentEvents: 50,
  maxRetryAttempts: 3,
  maxCommandHistory: 20,
};

export const DEFAULT_NETWORK: NetworkConfig = {
  eventServerUrl: 'http://localhost:4010',
  wsUrl: 'ws://localhost:4010/ws',
};

export const DEFAULT_PIPELINE_RULES: PipelineRule[] = [
  { from: 'create',      to: 'design',      autoAgent: 'breakdown' as AgentType, autoLaunch: true },
  { from: 'design',      to: 'task',        autoAgent: null,                     autoLaunch: false },
  { from: 'task',        to: 'develop',     autoAgent: 'implement' as AgentType, autoLaunch: true },
  { from: 'develop',     to: 'testing',     autoAgent: 'test' as AgentType,      autoLaunch: true },
  { from: 'testing',     to: 'validate',    autoAgent: 'validate' as AgentType,  autoLaunch: true },
  { from: 'validate',    to: 'update-docs', autoAgent: 'docs' as AgentType,      autoLaunch: true },
  { from: 'update-docs', to: 'done',        autoAgent: null,                     autoLaunch: false },
];

export const DEFAULT_PROJECTS: ProjectDef[] = [
  { id: 'core',       label: 'Core Docs',   color: '#00e5ff', glow: 'rgba(0,229,255,0.6)',  visible: true },
  { id: 'oms-order',  label: 'OMS Order',   color: '#4d8aff', glow: 'rgba(77,138,255,0.5)', visible: true },
  { id: 'oms-webapp', label: 'OMS Webapp',  color: '#00ff88', glow: 'rgba(0,255,136,0.5)',  visible: true },
  { id: 'oms-help',   label: 'Webapp Help', color: '#ffcc00', glow: 'rgba(255,204,0,0.55)', visible: true },
];

export const DEFAULT_LABELS: LabelDef[] = [
  { id: 'urgent',   name: 'Urgent',   color: '#ff3d3d' },
  { id: 'frontend', name: 'Frontend', color: '#4d8aff' },
  { id: 'backend',  name: 'Backend',  color: '#00ff88' },
  { id: 'blocked',  name: 'Blocked',  color: '#f97316' },
  { id: 'review',   name: 'Review',   color: '#b44dff' },
];

export const DEFAULT_WIP_LIMITS: Record<string, number> = {
  develop: 5,
  testing: 3,
  validate: 3,
};

export const DEFAULT_AUTO_CONFIRM: AutoConfirmConfig = {
  claimAutoConfirm: false,
  launchAutoConfirm: false,
  advanceAutoConfirm: false,
  autoClaimEnabled: true,
  queueAutoLaunch: true,
};

export const DEFAULT_CONFIG: KanbanConfig = {
  columns: DEFAULT_COLUMNS,
  agents: DEFAULT_AGENTS,
  agentSuggestRules: DEFAULT_SUGGEST_RULES,
  timing: DEFAULT_TIMING,
  limits: DEFAULT_LIMITS,
  network: DEFAULT_NETWORK,
  pipelineRules: DEFAULT_PIPELINE_RULES,
  autoConfirm: DEFAULT_AUTO_CONFIRM,
  projects: DEFAULT_PROJECTS,
  labels: DEFAULT_LABELS,
  wipLimits: DEFAULT_WIP_LIMITS,
};

// ── Store ────────────────────────────────────────────────────────────────────

export const kanbanConfig = writable<KanbanConfig>(loadConfig(DEFAULT_CONFIG));

// Persist on change
kanbanConfig.subscribe(cfg => saveConfig(cfg));

// ── Derived helpers ──────────────────────────────────────────────────────────

/** Get current claimable column IDs */
export function getClaimableColumns(): KanbanStatus[] {
  return get(kanbanConfig).columns.filter(c => c.claimable).map(c => c.id);
}

/** Get column def by id */
export function getColumnDef(id: KanbanStatus): ColumnDef | undefined {
  return get(kanbanConfig).columns.find(c => c.id === id);
}

/** Update a single config section */
export function updateConfig<K extends keyof KanbanConfig>(
  key: K,
  value: KanbanConfig[K],
): void {
  kanbanConfig.update(cfg => ({ ...cfg, [key]: value }));
}

/** Reset config to defaults */
export function resetConfig(): void {
  kanbanConfig.set({ ...DEFAULT_CONFIG });
}

/** Reset a single section to defaults */
export function resetSection<K extends keyof KanbanConfig>(key: K): void {
  kanbanConfig.update(cfg => ({ ...cfg, [key]: DEFAULT_CONFIG[key] }));
}

// ── Project helpers ──────────────────────────────────────────────────────────

export function addProject(project: ProjectDef): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    projects: [...cfg.projects.filter(p => p.id !== project.id), project],
  }));
}

export function removeProject(projectId: string): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    projects: cfg.projects.map(p => p.id === projectId ? { ...p, visible: false } : p),
  }));
}

export function updateProject(projectId: string, updates: Partial<ProjectDef>): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    projects: cfg.projects.map(p => p.id === projectId ? { ...p, ...updates } : p),
  }));
}

export function toggleProjectVisibility(projectId: string): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    projects: cfg.projects.map(p => p.id === projectId ? { ...p, visible: !p.visible } : p),
  }));
}

// ── Label helpers ────────────────────────────────────────────────────────────

export function addLabel(label: LabelDef): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    labels: [...cfg.labels.filter(l => l.id !== label.id), label],
  }));
}

export function removeLabel(labelId: string): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    labels: cfg.labels.filter(l => l.id !== labelId),
  }));
}

export function updateLabel(labelId: string, updates: Partial<LabelDef>): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    labels: cfg.labels.map(l => l.id === labelId ? { ...l, ...updates } : l),
  }));
}

// ── WIP helpers ──────────────────────────────────────────────────────────────

export function setWipLimit(columnId: string, limit: number): void {
  kanbanConfig.update(cfg => ({
    ...cfg,
    wipLimits: { ...cfg.wipLimits, [columnId]: limit },
  }));
}

export function getWipLimit(columnId: string): number {
  return get(kanbanConfig).wipLimits[columnId] ?? 0;
}
