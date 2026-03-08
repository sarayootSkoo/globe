# persist_state

## Status: 🟢 done
## Prod: src/lib/stores/persist.ts + src/lib/utils/storage.ts

```ts
// --- env ---
SECRET = import.meta.env.VITE_SECURE_STORAGE_SECRET
PREFIX = import.meta.env.VITE_SECURE_STORAGE_PREFIX

// --- storage utils (storage.ts) ---
safeGet(key): string | null         // encrypted get, catch → null
safeSet(key, value): void           // encrypted set, catch → warn
safeRemove(key): void
safeGetEnum<T>(key, valid: T[]): T | null   // get + validate against allowed list
safeGetNumber(key, min, max): number | null  // get + clamp to range

// --- persist config type ---
interface PersistEntry<T> {
  store:    Writable<T>
  key:      string
  load:     (raw: string | null) => T
  debounce?: number   // ms; omit for immediate write
}

// --- shorthand builders ---
bool(store, key, def: boolean): PersistEntry<boolean>
  load = raw => raw === null ? def : raw === 'true'

num(store, key, def: number, min: number, max: number): PersistEntry<number>
  load = raw => raw === null ? def : clamp(parseFloat(raw), min, max)

// --- debounce write ---
timers: Map<string, ReturnType<typeof setTimeout>>
debouncedSet(key, value, ms=80):
  clearTimeout(timers.get(key))
  timers.set(key, setTimeout(() => safeSet(key, String(value)), ms))

// --- init ---
VALID_THEMES = ['light', 'dark', ...]   // enum guard for theme store

initPersistence(): void
  for each entry in entries[]:         // ~50 PersistEntry configs
    stored = safeGet(entry.key)        // or safeGetEnum / safeGetNumber
    entry.store.set(entry.load(stored))
    entry.store.subscribe(val =>
      entry.debounce
        ? debouncedSet(entry.key, val, entry.debounce)
        : safeSet(entry.key, String(val))
    )
```
