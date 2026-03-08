# manage_presets

## Status: 🟢 done
## Prod: src/lib/stores/presetState.ts

save → load roundtrip:
  given store X = 'foo'
  save('MyPreset') → presets list has entry { name:'MyPreset', settings:{'key.x':'foo'} }
  change store X = 'bar'
  load('MyPreset') → store X === 'foo'

delete active preset:
  save('A') → load('A') → activePresetName === 'A'
  delete('A') → activePresetName === null

rename updates active:
  save('A') → load('A') → rename('A','B')
  activePresetName === 'B'
  presets list has 'B', not 'A'

import merge:
  existing = [{ name:'A', settings:{} }]
  import JSON with [{ name:'A', settings:{x:1} }, { name:'B', settings:{} }]
  result: 'A' overwritten, 'B' added

export → re-import idempotent:
  export → clear → import → presets list identical

built-in presets present after init:
  get(presets).map(p=>p.name) includes 'Chill','Low Energy','Fireworks','MAX'

STORE_MAP coverage:
  all 40+ keys resolve to non-null store reference
