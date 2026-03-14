/**
 * kanbanDB.ts — Unified DB Manager (memory cache + SQLite)
 *
 * NO localStorage. All persistence via SQLite through event-server API.
 *
 *   init():   SQLite → memory cache (async, called once before app renders)
 *   get():    memory cache (sync, instant)
 *   set():    memory cache (sync) + SQLite (async, debounced 300ms)
 */

// ── Table Keys ──────────────────────────────────────────────────────────────

export const DB_KEYS = {
  agents:           'agents',
  moves:            'moves',
  cards:            'cards',
  lifecycle:        'lifecycle',
  iterations:       'iterations',
  workflows:        'workflows',
  commands:         'commands',
  sessions:         'sessions',
  history:          'history',
  settings:         'settings',
  dependencies:     'dependencies',
  cardUpdatedAt:    'cardUpdatedAt',
  cardOrder:        'cardOrder',
  config:           'config',
  iterHistory:      'iterHistory',
  commandPanel:     'commandPanel',
  previewWidth:     'previewWidth',
  uiState:          'uiState',
} as const;

export type DBTable = keyof typeof DB_KEYS;

// ── In-Memory Cache ─────────────────────────────────────────────────────────

const cache = new Map<string, string>();

// ── Debounce ────────────────────────────────────────────────────────────────

function makeDebounce(ms: number) {
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  return function debounce(key: string, fn: () => void): void {
    const existing = timers.get(key);
    if (existing !== undefined) clearTimeout(existing);
    timers.set(key, setTimeout(() => { fn(); timers.delete(key); }, ms));
  };
}

const dbDebounce = makeDebounce(300);

// ── SQLite API ──────────────────────────────────────────────────────────────

const DB_API = 'http://localhost:4010';

function pushToSqlite(table: string, value: unknown): void {
  dbDebounce(`db:${table}`, () => {
    fetch(`${DB_API}/db/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: { [`ls:${table}`]: value } }),
    }).catch(() => {});
  });
}

// ── Core read / write (memory only) ─────────────────────────────────────────

function readRaw(key: string): string | null {
  return cache.get(key) ?? null;
}

function writeRaw(key: string, value: string): void {
  cache.set(key, value);
}

// ── Typed API ───────────────────────────────────────────────────────────────

function get<T>(table: DBTable, fallback: T): T {
  const raw = readRaw(DB_KEYS[table]);
  if (raw === null) return fallback;
  try { return JSON.parse(raw) as T; }
  catch { return fallback; }
}

function set<T>(table: DBTable, value: T): void {
  writeRaw(DB_KEYS[table], JSON.stringify(value));
  pushToSqlite(table, value);
}

function del(table: DBTable): void {
  cache.delete(DB_KEYS[table]);
  pushToSqlite(table, null);
}

// ── Accessors ───────────────────────────────────────────────────────────────

function makeAccessor<T>(table: DBTable) {
  return {
    get:    (fallback: T): T => get<T>(table, fallback),
    set:    (value: T): void => set<T>(table, value),
    delete: (): void          => del(table),
  };
}

// ── Storage monitoring ──────────────────────────────────────────────────────

function getStorageUsage(): { bytes: number; formatted: string; warning: boolean } {
  let total = 0;
  for (const [k, v] of cache.entries()) total += k.length + v.length;
  const bytes = total * 2;
  const kb = bytes / 1024;
  return {
    bytes,
    formatted: kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(2)} MB`,
    warning: bytes > 1.5 * 1024 * 1024,
  };
}

// ── Board Export ────────────────────────────────────────────────────────────

export function exportBoardState(): string {
  return JSON.stringify({
    cards:        get('cards', {}),
    lifecycle:    get('lifecycle', {}),
    agents:       get('agents', {}),
    workflows:    get('workflows', {}),
    moves:        get('moves', {}),
    iterations:   get('iterations', {}),
    dependencies: get('dependencies', {}),
    config:       get('config', {}),
    exportedAt:   Date.now(),
  }, null, 2);
}

// ── Init: load from SQLite (async, call before app renders) ─────────────────

let _initialized = false;

/**
 * Initialize: migrate localStorage → SQLite (once), then load from SQLite.
 * Must be called and awaited BEFORE stores read from cache.
 */
export async function init(): Promise<{ ok: boolean; tables: number }> {
  // Step 1: Migrate localStorage → SQLite (one-time)
  await migrateLocalStorageToSqlite();

  // Step 2: Load from SQLite → memory cache
  try {
    const resp = await fetch(`${DB_API}/db/state`);
    if (!resp.ok) return { ok: false, tables: 0 };
    const data = await resp.json();

    let tables = 0;
    if (data.settings && typeof data.settings === 'object') {
      for (const [key, value] of Object.entries(data.settings)) {
        if (key.startsWith('ls:')) {
          const table = key.slice(3);
          const dbKey = DB_KEYS[table as DBTable];
          if (dbKey) {
            writeRaw(dbKey, typeof value === 'string' ? value : JSON.stringify(value));
            tables++;
          }
        }
      }
    }
    _initialized = true;
    return { ok: true, tables };
  } catch {
    // SQLite unavailable — cache stays empty, stores use defaults
    _initialized = true;
    return { ok: false, tables: 0 };
  }
}

/** One-time: push any remaining localStorage data to SQLite, then clear it */
async function migrateLocalStorageToSqlite(): Promise<void> {
  try {
    const toMigrate: Record<string, unknown> = {};
    let hasData = false;

    // Old key format (kg-kanban-*)
    const OLD_KEYS: Record<string, string> = {
      'kg-kanban-agents': 'agents',
      'kg-kanban-moves': 'moves',
      'kg-kanban-local-cards': 'cards',
      'kg-kanban-lifecycle': 'lifecycle',
      'kg-kanban-iterations': 'iterations',
      'kg-kanban-workflows': 'workflows',
      'kg-kanban-command-queue': 'commands',
      'kg-kanban-sessions': 'sessions',
      'kg-kanban-history': 'history',
      'kg-kanban-settings': 'settings',
      'kg-kanban-dependencies': 'dependencies',
      'kg-kanban-card-updated-at': 'cardUpdatedAt',
      'kg-kanban-config': 'config',
      'kg-kanban-iteration-history': 'iterHistory',
      'kg-kanban-command-panel': 'commandPanel',
      'kg-kanban-preview-width': 'previewWidth',
      'kg-kanban-ui-state': 'uiState',
    };

    for (const [oldKey, table] of Object.entries(OLD_KEYS)) {
      const raw = localStorage.getItem(oldKey);
      if (raw !== null && raw !== '{}' && raw !== '[]' && raw !== 'false') {
        try { toMigrate[`ls:${table}`] = JSON.parse(raw); }
        catch { toMigrate[`ls:${table}`] = raw; }
        hasData = true;
      }
    }

    if (!hasData) return;

    // Push to SQLite
    await fetch(`${DB_API}/db/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: toMigrate }),
    }).catch(() => {});

    // Clear ALL kg-kanban-* from localStorage
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kg-kanban-')) toRemove.push(k);
    }
    for (const k of toRemove) localStorage.removeItem(k);

    if (toRemove.length > 0) {
      console.log(`[kanbanDB] Migrated ${Object.keys(toMigrate).length} tables to SQLite, cleared ${toRemove.length} localStorage keys`);
    }
  } catch { /* migration is best-effort */ }
}

// ── Periodic sync ───────────────────────────────────────────────────────────

let _syncInterval: ReturnType<typeof setInterval> | null = null;

export function startDbSync(intervalMs = 30000): void {
  if (_syncInterval) return;
  _syncInterval = setInterval(() => {
    syncToDb().catch(() => {});
  }, intervalMs);
}

export function stopDbSync(): void {
  if (_syncInterval) { clearInterval(_syncInterval); _syncInterval = null; }
}

export async function syncToDb(): Promise<{ ok: boolean }> {
  try {
    const all: Record<string, unknown> = {};
    for (const [table] of Object.entries(DB_KEYS)) {
      const val = get(table as DBTable, null);
      if (val !== null) all[`ls:${table}`] = val;
    }
    const resp = await fetch(`${DB_API}/db/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings: all }),
    });
    return { ok: resp.ok };
  } catch { return { ok: false }; }
}

export async function syncFromDb(): Promise<{ ok: boolean; restored?: number }> {
  return init();
}

// ── Public API ──────────────────────────────────────────────────────────────

export const kanbanDB = {
  get, set, del,
  cleanup: () => {},
  getStorageUsage,
  init,

  cards:         makeAccessor<Record<string, unknown>>('cards'),
  workflows:     makeAccessor<Record<string, unknown>>('workflows'),
  commands:      makeAccessor<unknown[]>('commands'),
  sessions:      makeAccessor<Record<string, unknown>>('sessions'),
  history:       makeAccessor<unknown[]>('history'),
  settings:      makeAccessor<Record<string, unknown>>('settings'),
  agents:        makeAccessor<Record<string, string>>('agents'),
  moves:         makeAccessor<Record<string, string>>('moves'),
  lifecycle:     makeAccessor<Record<string, unknown>>('lifecycle'),
  iterations:    makeAccessor<Record<string, unknown>>('iterations'),
  dependencies:  makeAccessor<Record<string, string[]>>('dependencies'),
  cardUpdatedAt: makeAccessor<Record<string, number>>('cardUpdatedAt'),
  config:        makeAccessor<Record<string, unknown>>('config'),
  iterHistory:   makeAccessor<Record<string, unknown[]>>('iterHistory'),
  commandPanel:  makeAccessor<boolean>('commandPanel'),
  previewWidth:  makeAccessor<number>('previewWidth'),
  uiState:       makeAccessor<Record<string, unknown>>('uiState'),
};

export default kanbanDB;
