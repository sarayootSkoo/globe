/**
 * kanbanDB.ts — Unified localStorage Manager
 *
 * Centralises all localStorage keys into one module and provides typed
 * get / set / delete helpers with 100ms debounced writes.
 *
 * Tables mirror the existing scattered keys across kanbanState, workflowState,
 * and commandState — no existing stores need to change.
 */

// ── Storage Keys ─────────────────────────────────────────────────────────────

export const DB_KEYS = {
  agents:       'kg-kanban-agents',
  moves:        'kg-kanban-moves',
  cards:        'kg-kanban-local-cards',
  lifecycle:    'kg-kanban-lifecycle',
  iterations:   'kg-kanban-iterations',
  workflows:    'kg-kanban-workflows',
  commands:     'kg-kanban-command-queue',
  sessions:     'kg-kanban-sessions',
  history:      'kg-kanban-history',
  settings:     'kg-kanban-settings',
  dependencies: 'kg-kanban-dependencies',
} as const;

export type DBTable = keyof typeof DB_KEYS;

// ── Debounce helper ───────────────────────────────────────────────────────────

function makeDebounce(ms: number) {
  const timers = new Map<string, ReturnType<typeof setTimeout>>();
  return function debounce(key: string, fn: () => void): void {
    const existing = timers.get(key);
    if (existing !== undefined) clearTimeout(existing);
    timers.set(key, setTimeout(() => {
      fn();
      timers.delete(key);
    }, ms));
  };
}

const debounce = makeDebounce(100);

// ── Core read / write helpers ─────────────────────────────────────────────────

function readRaw(storageKey: string): string | null {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function writeRaw(storageKey: string, value: string): void {
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

function deleteRaw(storageKey: string): void {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // Silently ignore
  }
}

// ── Typed DB API ──────────────────────────────────────────────────────────────

/**
 * Read a table as a parsed JSON value, returning `fallback` on miss/error.
 */
function get<T>(table: DBTable, fallback: T): T {
  const raw = readRaw(DB_KEYS[table]);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Write a value to a table. The actual localStorage write is debounced 100ms
 * so rapid successive updates are coalesced.
 */
function set<T>(table: DBTable, value: T): void {
  const key = DB_KEYS[table];
  const serialised = JSON.stringify(value);
  debounce(key, () => writeRaw(key, serialised));
}

/**
 * Remove a table entry immediately (no debounce — intentional deletion).
 */
function del(table: DBTable): void {
  deleteRaw(DB_KEYS[table]);
}

// ── Stale-data cleanup ────────────────────────────────────────────────────────

/**
 * Remove any kg-kanban-* keys from localStorage that are not part of the
 * current schema. Call this once at app start to evict legacy data.
 */
function cleanup(): void {
  const validKeys = new Set(Object.values(DB_KEYS));
  const toRemove: string[] = [];

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kg-kanban-') && !(validKeys as Set<string>).has(k)) {
        toRemove.push(k);
      }
    }
    for (const k of toRemove) {
      localStorage.removeItem(k);
    }
  } catch {
    // Ignore storage errors during cleanup
  }
}

// ── Per-table typed convenience accessors ─────────────────────────────────────
//
// Each accessor delegates to get/set/del with the correct table name.
// This gives call sites a clean, self-documenting API:
//   kanbanDB.cards.get({})  vs  kanbanDB.get('cards', {})

function makeAccessor<T>(table: DBTable) {
  return {
    get:    (fallback: T): T => get<T>(table, fallback),
    set:    (value: T): void => set<T>(table, value),
    delete: (): void          => del(table),
  };
}

// ── Storage monitoring ──────────────────────────────────────────────────────

/** Returns total bytes used by kg-kanban-* keys and a warning if over 1.5MB */
function getStorageUsage(): { bytes: number; formatted: string; warning: boolean } {
  let total = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kg-kanban-')) {
        const v = localStorage.getItem(k);
        if (v) total += k.length + v.length;
      }
    }
  } catch {
    // Ignore storage errors
  }
  const bytes = total * 2; // UTF-16 chars = 2 bytes each
  const kb = bytes / 1024;
  const formatted = kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(2)} MB`;
  const warning = bytes > 1.5 * 1024 * 1024; // warn at 1.5MB
  return { bytes, formatted, warning };
}

// ── Public export ─────────────────────────────────────────────────────────────

export const kanbanDB = {
  // Generic access
  get,
  set,
  del,
  cleanup,
  getStorageUsage,

  // Per-table typed helpers
  cards:      makeAccessor<Record<string, unknown>>('cards'),
  workflows:  makeAccessor<Record<string, unknown>>('workflows'),
  commands:   makeAccessor<unknown[]>('commands'),
  sessions:   makeAccessor<Record<string, unknown>>('sessions'),
  history:    makeAccessor<unknown[]>('history'),
  settings:   makeAccessor<Record<string, unknown>>('settings'),
  agents:       makeAccessor<Record<string, string>>('agents'),
  moves:        makeAccessor<Record<string, string>>('moves'),
  lifecycle:    makeAccessor<Record<string, unknown>>('lifecycle'),
  iterations:   makeAccessor<Record<string, unknown>>('iterations'),
  dependencies: makeAccessor<Record<string, string[]>>('dependencies'),
};

export default kanbanDB;
