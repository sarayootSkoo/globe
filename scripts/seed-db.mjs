/**
 * seed-db.mjs — Insert board cards + agent log messages into SQLite
 */
import { createCard, logCommand, startSession, appendEvent, db } from '../mcp-kanban/kanban-db.mjs';

// ── Add activity_log table ──────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id TEXT,
    action TEXT NOT NULL,
    detail TEXT,
    source TEXT DEFAULT 'agent',
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_log_card ON activity_log(card_id);
  CREATE INDEX IF NOT EXISTS idx_log_action ON activity_log(action);
`);

const insertLog = db.prepare(`
  INSERT INTO activity_log (card_id, action, detail, source, created_at)
  VALUES (@card_id, @action, @detail, @source, @created_at)
`);

// ── Cards from the board screenshot ─────────────────────────────────────────
const boardCards = [
  { id: 'local-1773305576047-000dv', title: 'oms-order fix Recalculation flow when pick declined', section: 'oms-order', column: 'design', priority: 'high', metadata: { type: 'issue', severity: 'P1' } },
  { id: 'oms-order-discuss-chore-03_03_2026_22_06_0', title: 'chore-03_03_2026_22_06_0', section: 'oms-order', column: 'backlog', priority: 'low', metadata: { type: 'discussion' } },
  { id: 'oms-order-discuss-chore-10_03_2026_13', title: 'chore-10_03_2026_13_06_2', section: 'oms-order', column: 'backlog', priority: 'low', metadata: { type: 'discussion' } },
  { id: 'oms-order-discuss-delivered-status-upd', title: 'delivered-status-update-review', section: 'oms-order', column: 'backlog', priority: 'low', metadata: { type: 'discussion' } },
  { id: 'oms-order-discuss-deploy-review-tuning', title: 'deploy-review-tuning-performance', section: 'oms-order', column: 'backlog', priority: 'low', metadata: { type: 'discussion' } },
];

const insertCards = db.transaction((cards) => {
  for (const c of cards) {
    const existing = db.prepare('SELECT id FROM cards WHERE id = ?').get(c.id);
    if (!existing) {
      db.prepare(`
        INSERT INTO cards (id, title, section, column_id, status, priority, metadata, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `).run(c.id, c.title, c.section, c.column, c.column === 'design' ? 'running' : 'idle', c.priority, JSON.stringify(c.metadata));
      console.log('  + card:', c.id.slice(0, 40));
    } else {
      console.log('  = skip (exists):', c.id.slice(0, 40));
    }
  }
});

console.log('── Inserting Cards ──');
insertCards(boardCards);

// ── Agent Log Messages ──────────────────────────────────────────────────────
const now = new Date();
function ago(minutes) {
  return new Date(now.getTime() - minutes * 60000).toISOString();
}

const logs = [
  // Card: oms-order fix Recalculation (DESIGN, RUNNING) — full agent trace
  { card_id: 'local-1773305576047-000dv', action: 'card:created', detail: { title: 'oms-order fix Recalculation flow', column: 'backlog' }, source: 'user', ts: ago(120) },
  { card_id: 'local-1773305576047-000dv', action: 'agent:assigned', detail: { agent: 'BD Breakdown', type: 'breakdown' }, source: 'user', ts: ago(115) },
  { card_id: 'local-1773305576047-000dv', action: 'lifecycle:started', detail: { command: '/issue oms-order Recalculation when pick declined' }, source: 'agent', ts: ago(110) },
  { card_id: 'local-1773305576047-000dv', action: 'card:moved', detail: { from: 'backlog', to: 'design' }, source: 'agent', ts: ago(108) },
  { card_id: 'local-1773305576047-000dv', action: 'lifecycle:running', detail: { message: 'Investigating root cause in OrderCalculator.recalculate()' }, source: 'agent', ts: ago(105) },
  { card_id: 'local-1773305576047-000dv', action: 'command:copied', detail: { command: '/issue', args: 'oms-order Recalculation when pick declined' }, source: 'agent', ts: ago(100) },
  { card_id: 'local-1773305576047-000dv', action: 'lifecycle:running', detail: { message: 'Found root cause: pickDeclineHandler() does not call recalculate()' }, source: 'agent', ts: ago(90) },
  { card_id: 'local-1773305576047-000dv', action: 'lifecycle:running', detail: { message: 'Root cause file: order-calculator.ts:142' }, source: 'agent', ts: ago(85) },
  { card_id: 'local-1773305576047-000dv', action: 'lifecycle:running', detail: { message: 'Analyzing impact: 3 files affected, 2 downstream services' }, source: 'agent', ts: ago(80) },
  { card_id: 'local-1773305576047-000dv', action: 'lifecycle:running', detail: { message: 'Generating spec: specs/issue-oms-recalculation-pick-declined.md' }, source: 'agent', ts: ago(70) },
  { card_id: 'local-1773305576047-000dv', action: 'lifecycle:running', detail: { message: 'Spec complete. Ready for implementation phase.' }, source: 'agent', ts: ago(60) },

  // Card: chore-03_03_2026 (BACKLOG, STARTED)
  { card_id: 'oms-order-discuss-chore-03_03_2026_22_06_0', action: 'card:created', detail: { title: 'chore-03_03_2026_22_06_0' }, source: 'system', ts: ago(1440) },
  { card_id: 'oms-order-discuss-chore-03_03_2026_22_06_0', action: 'lifecycle:started', detail: { message: 'Agent queued for processing' }, source: 'agent', ts: ago(200) },
  { card_id: 'oms-order-discuss-chore-03_03_2026_22_06_0', action: 'lifecycle:started', detail: { message: 'Reading spec file for task breakdown...' }, source: 'agent', ts: ago(195) },

  // Card: chore-10_03_2026 (BACKLOG, IDLE)
  { card_id: 'oms-order-discuss-chore-10_03_2026_13', action: 'card:created', detail: { title: 'chore-10_03_2026_13_06_2' }, source: 'system', ts: ago(2880) },

  // Card: delivered-status-update (BACKLOG, IDLE)
  { card_id: 'oms-order-discuss-delivered-status-upd', action: 'card:created', detail: { title: 'delivered-status-update' }, source: 'system', ts: ago(4320) },
  { card_id: 'oms-order-discuss-delivered-status-upd', action: 'lifecycle:idle', detail: { message: 'Waiting for prioritization' }, source: 'system', ts: ago(4300) },

  // Card: deploy-review-tuning (BACKLOG, IDLE)
  { card_id: 'oms-order-discuss-deploy-review-tuning', action: 'card:created', detail: { title: 'deploy-review-tuning-performance' }, source: 'system', ts: ago(4320) },
  { card_id: 'oms-order-discuss-deploy-review-tuning', action: 'lifecycle:idle', detail: { message: 'Queued in backlog' }, source: 'system', ts: ago(4300) },
];

console.log('\n── Inserting Agent Logs ──');
const insertLogs = db.transaction((entries) => {
  for (const l of entries) {
    insertLog.run({
      card_id: l.card_id,
      action: l.action,
      detail: JSON.stringify(l.detail),
      source: l.source,
      created_at: l.ts,
    });
  }
});
insertLogs(logs);
console.log('  +', logs.length, 'log entries');

// ── Command History ─────────────────────────────────────────────────────────
console.log('\n── Inserting Command History ──');
logCommand({ card_id: 'local-1773305576047-000dv', command: '/issue oms-order Recalculation when pick declined', input_path: null, success: true, duration_ms: 45000 });
logCommand({ card_id: 'local-1773305576047-000dv', command: '/chore analyze root cause', input_path: 'oms-order/src/services/order-calculator.ts', success: true, duration_ms: 32000 });
console.log('  + 2 commands');

// ── Session ─────────────────────────────────────────────────────────────────
console.log('\n── Inserting Session ──');
startSession({ id: 'session_design_001', card_id: 'local-1773305576047-000dv', command: '/issue oms-order Recalculation' });
console.log('  + 1 session');

// ── Verify ──────────────────────────────────────────────────────────────────
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  DATABASE SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
for (const t of ['cards', 'activity_log', 'command_history', 'sessions', 'workflows', 'settings']) {
  const { c } = db.prepare('SELECT COUNT(*) as c FROM ' + t).get();
  console.log('  ' + t.padEnd(20) + c + ' rows');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  ACTIVITY LOG (latest 20)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const recent = db.prepare('SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 20').all();
for (const r of recent) {
  const d = JSON.parse(r.detail || '{}');
  const msg = d.message || d.command || d.title || '';
  const time = r.created_at.slice(11, 19);
  console.log('  ' + time + ' [' + r.source.padEnd(6) + '] ' + r.action.padEnd(22) + ' ' + msg.slice(0, 55));
}

console.log('\n✅ Done — all data inserted into .kanban/kanban.db');
