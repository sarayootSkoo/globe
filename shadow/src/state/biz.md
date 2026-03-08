# persist_state

## Status: 🟢 done
## Prod: src/lib/stores/persist.ts + src/lib/utils/storage.ts

Feature: persist ~50 UI state values to localStorage (AES-encrypted) and restore them on app start.

**Why it exists:** Users configure globe speed, themes, panel positions, etc. — must survive page reload without a backend.

**Security:** uses @secure-storage/common (AES). Keys controlled by env vars:
- `VITE_SECURE_STORAGE_SECRET` — encryption key
- `VITE_SECURE_STORAGE_PREFIX` — key namespace

**Config entry shape (PersistEntry<T>):**
- `store` — Svelte writable to subscribe to
- `key` — localStorage key string
- `load` — function: storedValue → T (parse/validate/default)
- `debounce?` — ms delay before write (optional, for sliders)

**Shorthand helpers (reduce boilerplate):**
- `bool(store, key, default)` — PersistEntry for boolean
- `num(store, key, default, min, max)` — PersistEntry for number with range clamp

**Slider pattern:** `debouncedSet(key, value, ms=80)` — cancels previous timer, writes after idle.

**Lifecycle:**
1. `initPersistence()` called at app start
2. Reads all ~50 entries from localStorage → sets stores
3. Subscribes to each store → writes on every change (debounced where configured)

**Theme validation:** `VALID_THEMES` string array — only known theme names accepted from storage.
