# Shadow Summary — Knowledge Graph

> อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง — dashboard สรุปสถานะทั้ง project

**Last updated:** 2026-03-08 23:30 (GMT+7)

## Quick Stats

| Metric | Count |
|--------|-------|
| Total shadows | 8 |
| ⬜ Draft | 0 |
| 🟡 Ready | 0 |
| 🔵 In Progress | 0 |
| 🟢 Done | 8 |
| 🟠 Hold | 0 |
| 🔴 Action | 0 |

## Progress

```
[████████████████████] 100% (8/8 done)
```

## Stack

| Layer | Choice |
|-------|--------|
| **FE** | Svelte 5 + TypeScript |
| **3D** | Three.js 0.160 + D3 7 |
| **Build** | Vite 6 |
| **DB** | — (static JSON) |

## Shadow Index

### `globe/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 1 | render_scene | ✅/✅/✅ | 🟢 done | src/lib/renderers/GlobeRenderer.ts |
| 2 | fly_wasd | ✅/✅/✅ | 🟢 done | src/lib/renderers/GlobeWASD.ts |

### `effects/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 3 | show_comets | ✅/✅/✅ | 🟢 done | src/lib/renderers/GlobeCometTrails.ts |
| 4 | show_electric | ✅/✅/✅ | 🟢 done | src/lib/renderers/GlobeElectricArcs.ts |
| 5 | node_effects | ✅/✅/✅ | 🟢 done | GlobeNodeExplosion + ConnectionPulse + NodeTrail |
| 6 | auto_tour | ✅/✅/✅ | 🟢 done | src/lib/renderers/GlobeAutoTour.ts |
| 7 | show_fireworks | ✅/✅/✅ | 🟢 done | src/lib/renderers/GlobeFireworks.ts |

### `search/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 8 | search_nodes | ✅/✅/✅ | 🟢 done | src/lib/utils/search.ts + stores/searchState.ts |

### `data/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 9 | load_graph | ✅/✅/✅ | 🟢 done | src/lib/stores/graphData.ts |

### `state/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 10 | persist_state | ✅/✅/✅ | 🟢 done | src/lib/stores/persist.ts + utils/storage.ts |

### `presets/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 11 | manage_presets | ✅/✅/✅ | 🟢 done | src/lib/stores/presetState.ts |

### `theme/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 12 | apply_theme | ✅/✅/✅ | 🟢 done | src/lib/stores/appState.ts + themeEffects.ts + app.css |

### `background/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 13 | render_particles | ✅/✅/✅ | 🟢 done | src/lib/renderers/ParticleBackground.ts |

### `audio/`

| # | Feature | T1 biz/js/test | Status | Prod |
|---|---------|:-:|--------|------|
| 14 | react_audio | ✅/✅/✅ | 🟢 done | src/lib/stores/audioReactive.ts |

## Dependency Graph

```
data/load_graph
  └─→ search/search_nodes (uses graphNodes)
  └─→ globe/render_scene (uses graphNodes + graphLinks)
        ├─→ globe/fly_wasd (uses camera + controls)
        ├─→ effects/show_comets (activates during WASD)
        ├─→ effects/show_electric (uses scene)
        ├─→ effects/node_effects (uses scene + nodes)
        ├─→ effects/auto_tour (uses flyTo + nodes)
        ├─→ effects/show_fireworks (uses scene)
        └─→ background/render_particles (2D canvas behind 3D)

state/persist_state
  └─→ presets/manage_presets (reads/writes same stores)
  └─→ theme/apply_theme (persists theme choice)

audio/react_audio
  └─→ effects/* (drives effect intensity reactively)
```

## Action Items

| Shadow File | Action Required | Priority |
|-------------|-----------------|----------|
| — | ไม่มี — ทุก feature มี shadow T1 ครบ | — |

## Changelog

| Date | Shadow File | Change | By |
|------|-------------|--------|-----|
| 2026-03-08 | SHADOW.md | codebase map created (init-reverse) | Claude |
| 2026-03-08 | globe/* | T1 shadow: render_scene + fly_wasd | Claude |
| 2026-03-08 | effects/* | T1 shadow: comets + electric + node_effects + auto_tour + fireworks | Claude |
| 2026-03-08 | search/* | T1 shadow: search_nodes | Claude |
| 2026-03-08 | data/* | T1 shadow: load_graph | Claude |
| 2026-03-08 | state/* | T1 shadow: persist_state | Claude |
| 2026-03-08 | presets/* | T1 shadow: manage_presets | Claude |
| 2026-03-08 | theme/* | T1 shadow: apply_theme | Claude |
| 2026-03-08 | background/* | T1 shadow: render_particles | Claude |
| 2026-03-08 | audio/* | T1 shadow: react_audio | Claude |
| 2026-03-08 | summary.md | shadow summary dashboard created | Claude |
