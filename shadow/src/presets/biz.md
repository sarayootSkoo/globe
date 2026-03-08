# manage_presets

## Status: 🟢 done
## Prod: src/lib/stores/presetState.ts + src/components/controls/PresetSystem.svelte

Domain: user-defined named snapshots of app state
Entities: Preset { name: string, settings: Record<string, any> }
Built-ins: Chill | Low Energy | Fireworks | MAX (4 factory presets, always present)
Storage: safeGet/safeSet (localStorage-backed, JSON-serialized)
Scope: any store reachable via STORE_MAP (40+ keys)

Rules:
- active preset name tracked separately from preset list
- save = capture current store values into named Preset
- load = apply stored settings → each mapped store
- delete = remove from list; if active → clear activePresetName
- rename = update name in list + update activePresetName if matched
- export = JSON.stringify(presets[]) → download file
- import = parse JSON → merge into presets list (no duplicate names: last wins)
- built-ins cannot be deleted (enforced by convention, not hard lock)
