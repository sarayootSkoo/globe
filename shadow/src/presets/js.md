# manage_presets

## Status: 🟢 done
## Prod: src/lib/stores/presetState.ts

Stores:
- presets: writable<Preset[]>          // full list incl. built-ins
- activePresetName: writable<string|null>

STORE_MAP: Record<string, Writable<any>>
  keys: 'app.theme', 'fx.density', 'fx.speed', 'bg.nebula', ... (40+ entries)
  values: direct store references

save(name):
  settings = {}
  for [key, store] of STORE_MAP → settings[key] = get(store)
  presets.update(list => upsert(list, { name, settings }))
  activePresetName.set(name)
  persist()

load(name):
  preset = get(presets).find(p => p.name === name)
  for [key, val] of Object.entries(preset.settings) → STORE_MAP[key]?.set(val)
  activePresetName.set(name)

delete(name):
  presets.update(list => list.filter(p => p.name !== name))
  if get(activePresetName) === name → activePresetName.set(null)
  persist()

rename(oldName, newName):
  presets.update(list => list.map(p => p.name === oldName ? {...p, name: newName} : p))
  if get(activePresetName) === oldName → activePresetName.set(newName)
  persist()

exportPresets():
  blob = new Blob([JSON.stringify(get(presets))], { type: 'application/json' })
  trigger download

importPresets(file: File):
  text = await file.text()
  incoming: Preset[] = JSON.parse(text)
  presets.update(list => merge(list, incoming))  // last-write-wins on name collision
  persist()

persist(): safeSet('presets', get(presets))
init():    presets.set(safeGet('presets') ?? DEFAULT_PRESETS)
