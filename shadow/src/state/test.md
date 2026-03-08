# persist_state

## Status: 🟢 done
## Prod: src/lib/stores/persist.ts + src/lib/utils/storage.ts

**Unit: storage utils**

| fn | case | expect |
|----|------|--------|
| safeGet | key exists | decrypted value |
| safeGet | key missing | null |
| safeGet | decrypt throws | null (no throw) |
| safeSet | normal | value stored encrypted |
| safeSet | throws | console.warn, no rethrow |
| safeGetEnum | value in valid[] | value |
| safeGetEnum | value not in valid[] | null |
| safeGetEnum | null raw | null |
| safeGetNumber | parseable, in range | number |
| safeGetNumber | below min | min |
| safeGetNumber | above max | max |
| safeGetNumber | NaN / null | null |

**Unit: bool() helper**

| raw | default | expect |
|-----|---------|--------|
| null | true | true |
| null | false | false |
| 'true' | false | true |
| 'false' | true | false |

**Unit: num() helper**

| raw | def | min | max | expect |
|-----|-----|-----|-----|--------|
| null | 5 | 0 | 10 | 5 |
| '3' | 5 | 0 | 10 | 3 |
| '-1' | 5 | 0 | 10 | 0 (clamped) |
| '99' | 5 | 0 | 10 | 10 (clamped) |

**Unit: debouncedSet()**
- called twice within 80ms → safeSet called once (last value)
- called, wait >80ms → safeSet called

**Integration: initPersistence()**
- all ~50 stores set from storage on call
- store.set() after init → safeSet triggered
- VALID_THEMES: unknown theme in storage → store gets default, not invalid value
- missing env vars → storage falls back gracefully (no crash)
