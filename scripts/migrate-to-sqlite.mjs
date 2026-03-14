#!/usr/bin/env node
/**
 * migrate-to-sqlite.mjs — Migration: localStorage → SQLite
 *
 * This script seeds the SQLite database with:
 *   1. Default kanban config (columns, agents, pipeline, timing, limits, network, automation)
 *   2. Default settings (auto-claim, queue)
 *   3. Schema additions (kanban_state table for browser state)
 *
 * Run once after upgrading to SQLite-only storage.
 * Safe to re-run — uses INSERT OR IGNORE / ON CONFLICT.
 *
 * Usage:
 *   node scripts/migrate-to-sqlite.mjs
 */

import { db, getSetting, setSetting } from '../mcp-kanban/kanban-db.mjs';

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  KANBAN DB MIGRATION — localStorage → SQLite');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// ── Step 1: Ensure schema ──────────────────────────────────────────────────

console.log('\n[1/4] Ensuring schema...');

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);
console.log('  ✓ settings table ready');

// ── Step 2: Seed default config ────────────────────────────────────────────

console.log('\n[2/4] Seeding default config...');

const DEFAULT_CONFIG = {
  columns: [
    { id: 'create',      label: 'CREATE',      color: '#ffffff', icon: '✦',  tooltip: 'New cards — create tasks, features, or issues', claimable: false },
    { id: 'design',      label: 'DESIGN',      color: '#b44dff', icon: '◈',  tooltip: 'Design phase — breakdown & architecture planning', claimable: false },
    { id: 'backlog',     label: 'BACKLOG',     color: '#888888', icon: '☰',  tooltip: 'Prioritized backlog — waiting for sprint assignment', claimable: false },
    { id: 'hold',        label: 'HOLD',        color: '#ffcc00', icon: '⏸',  tooltip: 'On hold — blocked or paused work', claimable: false },
    { id: 'task',        label: 'TASK',        color: '#00e5ff', icon: '▸',  tooltip: 'Ready tasks — agent can auto-claim and start', claimable: true },
    { id: 'issue',       label: 'ISSUE',       color: '#ff3d3d', icon: '⚑',  tooltip: 'Active issues — bugs & investigations', claimable: true },
    { id: 'develop',     label: 'DEVELOP',     color: '#4d8aff', icon: '⟨⟩', tooltip: 'In development — implementation in progress', claimable: true },
    { id: 'testing',     label: 'TESTING',     color: '#f97316', icon: '⧫',  tooltip: 'Testing phase — QA & review cycles', claimable: true },
    { id: 'validate',    label: 'VALIDATE',    color: '#00ff88', icon: '✓',  tooltip: 'Validation — domain expert sign-off', claimable: true },
    { id: 'update-docs', label: 'UPDATE DOCS', color: '#ff3dff', icon: '✎',  tooltip: 'Documentation updates required before done', claimable: true },
    { id: 'done',        label: 'DONE',        color: '#666666', icon: '●',  tooltip: 'Completed — ready for archive', claimable: false },
    { id: 'archive',     label: 'ARCHIVE',     color: '#444444', icon: '▪',  tooltip: 'Archived — historical reference only', claimable: false },
    { id: 'delete',      label: 'DELETE',      color: '#ff3d3d', icon: '✕',  tooltip: 'Marked for deletion — truncate to purge', claimable: false },
  ],
  agents: {
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
  },
  agentSuggestRules: {
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
  },
  timing: {
    autoClaimDebounceMs: 500,
    queueProcessorDebounceMs: 1000,
    boardSyncDebounceMs: 5000,
    wsReconnectMs: 3000,
  },
  limits: {
    maxConcurrentAgents: 2,
    maxActivityLog: 500,
    maxConsoleLines: 500,
    maxRecentEvents: 50,
    maxRetryAttempts: 3,
    maxCommandHistory: 20,
  },
  network: {
    eventServerUrl: 'http://localhost:4010',
    wsUrl: 'ws://localhost:4010/ws',
  },
  pipelineRules: [
    { from: 'create',      to: 'design',      autoAgent: 'breakdown', autoLaunch: true },
    { from: 'design',      to: 'task',        autoAgent: null,        autoLaunch: false },
    { from: 'task',        to: 'develop',     autoAgent: 'implement', autoLaunch: true },
    { from: 'develop',     to: 'testing',     autoAgent: 'test',      autoLaunch: true },
    { from: 'testing',     to: 'validate',    autoAgent: 'validate',  autoLaunch: true },
    { from: 'validate',    to: 'update-docs', autoAgent: 'docs',      autoLaunch: true },
    { from: 'update-docs', to: 'done',        autoAgent: null,        autoLaunch: false },
  ],
  autoConfirm: {
    claimAutoConfirm: false,
    launchAutoConfirm: false,
    advanceAutoConfirm: false,
    autoClaimEnabled: true,
    queueAutoLaunch: true,
  },
};

const DEFAULT_SETTINGS = {
  autoClaimExclusions: [],
  maxConcurrent: 2,
  autoAdvanceEnabled: false,
  autoClaimEnabled: true,
};

// Upsert helper (only insert if not exists)
const upsert = db.prepare(`
  INSERT INTO settings (key, value, updated_at)
  VALUES (@key, @value, datetime('now'))
  ON CONFLICT(key) DO UPDATE SET value=@value, updated_at=datetime('now')
`);

const insertIfNew = db.prepare(`
  INSERT OR IGNORE INTO settings (key, value, updated_at)
  VALUES (@key, @value, datetime('now'))
`);

// Seed config (only if not already set)
const seedDefaults = db.transaction(() => {
  let seeded = 0;

  // Config
  const existingConfig = getSetting('ls:config');
  if (!existingConfig) {
    setSetting('ls:config', DEFAULT_CONFIG);
    seeded++;
    console.log('  + ls:config (columns, agents, pipeline, timing, limits, network, automation)');
  } else {
    console.log('  = ls:config already exists, skipping');
  }

  // Settings
  const existingSettings = getSetting('ls:settings');
  if (!existingSettings) {
    setSetting('ls:settings', DEFAULT_SETTINGS);
    seeded++;
    console.log('  + ls:settings (autoClaimExclusions, maxConcurrent, autoAdvanceEnabled)');
  } else {
    console.log('  = ls:settings already exists, skipping');
  }

  // Initialize empty tables if not present
  const emptyTables = [
    'agents', 'moves', 'cards', 'lifecycle', 'iterations',
    'workflows', 'commands', 'sessions', 'history',
    'dependencies', 'cardUpdatedAt', 'iterHistory',
    'uiState',
  ];

  for (const table of emptyTables) {
    const key = `ls:${table}`;
    const existing = getSetting(key);
    if (!existing) {
      insertIfNew.run({ key, value: '{}' });
      seeded++;
      console.log(`  + ${key} (empty default)`);
    }
  }

  // Scalar defaults
  const scalarDefaults = {
    'ls:commandPanel': 'false',
    'ls:previewWidth': '80',
  };

  for (const [key, value] of Object.entries(scalarDefaults)) {
    const existing = getSetting(key);
    if (!existing) {
      insertIfNew.run({ key, value });
      seeded++;
      console.log(`  + ${key} = ${value}`);
    }
  }

  return seeded;
});

const seeded = seedDefaults();
console.log(`  → ${seeded} entries seeded`);

// ── Step 3: Show current state ─────────────────────────────────────────────

console.log('\n[3/4] Current database state...');

const tables = ['cards', 'settings', 'workflows', 'sessions', 'command_history'];
for (const t of tables) {
  try {
    const { c } = db.prepare(`SELECT COUNT(*) as c FROM ${t}`).get();
    console.log(`  ${t.padEnd(20)} ${c} rows`);
  } catch {
    console.log(`  ${t.padEnd(20)} (table not found)`);
  }
}

// Show ls:* settings
console.log('\n  Browser state keys in settings:');
const lsKeys = db.prepare("SELECT key FROM settings WHERE key LIKE 'ls:%' ORDER BY key").all();
for (const row of lsKeys) {
  const val = getSetting(row.key);
  const preview = JSON.stringify(val).slice(0, 60);
  console.log(`    ${row.key.padEnd(25)} ${preview}${preview.length >= 60 ? '...' : ''}`);
}

// ── Step 4: Verify ─────────────────────────────────────────────────────────

console.log('\n[4/4] Verification...');

const configCheck = getSetting('ls:config');
if (configCheck && configCheck.columns && configCheck.columns.length === 13) {
  console.log('  ✓ Config: 13 columns, ' + Object.keys(configCheck.agents).length + ' agents');
} else {
  console.log('  ✗ Config: missing or incomplete');
}

const settingsCheck = getSetting('ls:settings');
if (settingsCheck) {
  console.log('  ✓ Settings: maxConcurrent=' + (settingsCheck.maxConcurrent ?? 'N/A'));
} else {
  console.log('  ✗ Settings: missing');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  ✅ Migration complete');
console.log('  DB: .kanban/kanban.db');
console.log('  localStorage can now be cleared in browser DevTools');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
