# Knowledge Graph — Shadow File

> Auto-generated codebase map. Last updated: 2026-03-08

**Stack:** Svelte 5 + Three.js 0.160 + D3 7 + TypeScript + Vite 6
**Port:** dev `:4002`, preview `:4003`
**Package manager:** pnpm

## File Tree (53 source files)

```
├── index.html                    # Entry point, mounts #app (lang="th")
├── vite.config.ts                # Svelte plugin, base './', secure-storage env
├── svelte.config.js              # vitePreprocess()
├── tsconfig.json                 # ESNext, strict, bundler resolution
├── .env / .env.example           # VITE_SECURE_STORAGE_SECRET/PREFIX
├── public/graph-data.json        # ~133 nodes, 69 links
├── FEATURES.md                   # 664-line feature docs (23 sections)
│
├── src/
│   ├── main.ts                   # Mount App, initPersistence(), apply theme
│   ├── App.svelte                # Root — composes all 23 components
│   ├── app.css                   # 853 lines — 9 themes CSS vars, all panel styles
│   │
│   ├── lib/
│   │   ├── types.ts              # GraphNode, GraphLink, Category, ScoredResult, WASDKeys/State
│   │   ├── constants.ts          # CATEGORIES(7), GLOBE_RADIUS=300, DOT_COUNT=2400
│   │   │
│   │   ├── stores/               # 9 Svelte writable stores
│   │   │   ├── appState.ts       # theme, currentMode, selectedNodeId, glowLevel, activeCats, pathSelection, immersiveMode
│   │   │   ├── globeState.ts     # autoRotate, showWireframe/Dots/Links, pulseEnabled/Speed, cometEnabled, rotateSpeed, zoomLevel, lockedNode, globeOpacity, dotBrightness, tourSpeed
│   │   │   ├── themeEffects.ts   # 37 stores: effect*, show*, electric*, spark*, border*, bloom*, fireworks*, blackhole*
│   │   │   ├── searchState.ts    # searchQuery, searchScored (derived), searchMatched (derived)
│   │   │   ├── graphData.ts      # graphNodes, graphLinks, loadData() → fetches graph-data.json
│   │   │   ├── previewState.ts   # previewVisible, previewNode, previewWidth, showPreview/hidePreview
│   │   │   ├── presetState.ts    # 350 lines — presets CRUD, STORE_MAP(40+ keys), 4 built-in presets
│   │   │   ├── persist.ts        # initPersistence() — loads ~50 values from encrypted localStorage, 80ms debounce
│   │   │   └── audioReactive.ts  # Web Audio API mic → FFT → bass/mid/high → drives effects
│   │   │
│   │   ├── utils/
│   │   │   ├── storage.ts        # @secure-storage/common wrapper: safeGet/Set/Remove/GetEnum/GetNumber
│   │   │   ├── search.ts         # doSearch() — weighted scoring (label=100, id=40, keywords=30, file=20, desc=10)
│   │   │   ├── graph.ts          # getConnected(), bfs(), nodeRadius(), nodeColor(), truncLabel()
│   │   │   ├── color.ts          # parseColorToHex(), getCSSColor()
│   │   │   ├── sphere.ts         # fibonacciSphere(), computeGlobePositions(), greatCircleArc()
│   │   │   └── export.ts         # exportGraph() → downloads JSON
│   │   │
│   │   └── renderers/            # 10 Three.js renderer classes (~4790 lines)
│   │       ├── GlobeRenderer.ts  # Core: scene/camera/controls, sprite nodes, arc links, bloom, search heatmap, theme transitions
│   │       ├── GlobeWASD.ts      # Physics WASD flight: acceleration, friction, quaternion rotation
│   │       ├── GlobeCometTrails.ts # 8 colored trails on sphere surface during WASD
│   │       ├── GlobeElectricArcs.ts # 6-layer plasma ball: arcs, aura, orbit rings, core, wisps, spark burst — 9 theme palettes
│   │       ├── GlobeNodeExplosion.ts # 40-particle burst on click
│   │       ├── GlobeConnectionPulse.ts # Traveling light along links
│   │       ├── GlobeNodeTrail.ts # Gold breadcrumb line (max 30 points)
│   │       ├── GlobeAutoTour.ts  # Sequential node fly-through
│   │       ├── GlobeFireworks.ts # Rockets + bursts + middle-fire + rainbow + gravity
│   │       └── ParticleBackground.ts # 2D canvas: stars, mesh, embers, snowflakes, nebula, glitter, shooting stars, lightning, plasma
│   │
│   └── components/               # 23 Svelte 5 components (~7138 lines)
│       ├── background/
│       │   ├── Scanline.svelte       # CRT scanline overlay
│       │   ├── Corners.svelte        # Corner bracket decorations
│       │   ├── ParticleCanvas.svelte  # 2D particle background
│       │   └── BorderMagic.svelte     # 9 theme border effects + black hole
│       ├── banner/
│       │   ├── TopBanner.svelte       # Title + live stats
│       │   └── ModeBar.svelte         # Mode indicator (path/impact)
│       ├── controls/
│       │   ├── TopControls.svelte     # Layout/theme/glow selectors
│       │   ├── Toolbar.svelte         # Path/Impact/Export/Reset buttons
│       │   ├── GlobeControls.svelte   # 150+ parameter control panel
│       │   ├── PresetSystem.svelte    # Save/load/export/import presets
│       │   ├── ScreenshotBtn.svelte   # Canvas screenshot
│       │   ├── KeyboardHelp.svelte    # ? modal
│       │   └── KeyboardShortcuts.svelte # Global key handler (1-9, R, F, B, H, Space)
│       ├── panels/
│       │   ├── DetailPanel.svelte     # Selected node info + actions
│       │   ├── PathPanel.svelte       # BFS shortest path display
│       │   ├── StatsPanel.svelte      # Node/link/hub/orphan counts
│       │   └── LegendPanel.svelte     # Category filter with toggle
│       ├── search/
│       │   ├── SearchBox.svelte       # Search input + results integration
│       │   └── SearchResults.svelte   # Animated results table with scores
│       ├── globe/
│       │   ├── GlobeCanvas.svelte     # Three.js mount + all store subscriptions + RAF loop
│       │   └── WasdHud.svelte         # Speed/key indicators
│       ├── wasd/
│       │   └── WasdPopup.svelte       # Full WASD guide modal
│       └── preview/
│           └── PreviewOverlay.svelte  # Fullscreen markdown reader
```

## Key Architecture Patterns

- **State:** Svelte `writable` stores — module-level singletons, no context API
- **Persistence:** `@secure-storage/common` (AES encrypted localStorage), 80ms debounced slider writes
- **Rendering:** Three.js `EffectComposer` + `UnrealBloomPass`, sprite-based nodes, additive blending
- **Themes:** 9 themes via CSS `[data-theme]` + per-theme palettes in renderers (Electric/Fireworks/Particle)
- **Events:** Custom DOM events (`kg:tour-toggled`, `kg:node-selected`) for cross-component comms
- **Modes:** 3 interaction modes (explore/path/impact) via `appState.currentMode`
- **Presets:** Capture/restore 40+ store values as JSON snapshots (4 built-in + user custom)
- **Animation:** Single RAF loop in GlobeCanvas calling all renderer `.update()` methods per frame

## Store Details

### appState.ts
| Store | Type | Default |
|-------|------|---------|
| `theme` | string | `'dark'` |
| `currentMode` | `'explore'\|'path'\|'impact'` | `'explore'` |
| `selectedNodeId` | string\|null | `null` |
| `glowLevel` | number (0–1) | `0.35` |
| `activeCats` | Set\<string\> | all 7 categories |
| `pathSelection` | [string, string] | `['','']` |
| `immersiveMode` | boolean | `false` |

### globeState.ts
| Store | Type | Default |
|-------|------|---------|
| `autoRotate` | boolean | `true` |
| `showWireframe` | boolean | `true` |
| `showDots` | boolean | `true` |
| `showLinks` | boolean | `true` |
| `pulseEnabled` | boolean | `true` |
| `pulseSpeed` | number (0–2) | `1` |
| `cometEnabled` | boolean | `true` |
| `rotateSpeed` | number (0–2) | `0.3` |
| `zoomLevel` | number (10–100) | `50` |
| `globeOpacity` | number (0.1–1) | `0.6` |
| `dotBrightness` | number (0–20) | `5` |
| `tourSpeed` | number (0–20) | `3` |
| `lockedNode` | GraphNode\|null | `null` |

### themeEffects.ts (37 stores)
- Master: `effectDensity`(0–20), `effectSpeed`(0–20)
- Background toggles: `showNebula`, `showGlitter`, `showShootingStars`, `showEmbers`, `showSnowflakes`, `showLightning`, `showBgStars`, `showBgMesh`
- Electric: `showElectricArcs`, `showPlasmaAura`, `electricArcIntensity/Speed/Count`, `electricOrbitSpeed`, `electricCoreGlow`
- Spark: `showSparkBurst`, `sparkBurstIntensity/Rate`
- Border: `borderEnabled`, `borderIntensity/Speed`
- Bloom: `bloomEnabled`, `bloomStrength`(0–5), `bloomRadius`(0–2), `bloomThreshold`(0–1)
- Fireworks: `fireworksEnabled`, `fireworksSpeed/LaunchRate/BurstSize`, `fireworksMiddleFire/Colorful/NoLimit/Hue`
- Black hole: `blackholeEnabled`, `blackholeSize/Speed/Glow/Width/Height/Hue`

## Renderer Summary

| Renderer | Lines | Purpose |
|----------|------:|---------|
| `GlobeRenderer` | ~1500 | Core 3D scene — sprites, links, bloom, search, themes |
| `GlobeWASD` | 232 | Physics flight — accel/friction/quaternion rotation |
| `GlobeCometTrails` | 152 | 8 colored trails during WASD movement |
| `GlobeElectricArcs` | ~350 | 6-layer plasma ball with 9 theme palettes |
| `GlobeNodeExplosion` | 122 | 40-particle burst on click |
| `GlobeConnectionPulse` | 110 | Glowing orbs travel along links |
| `GlobeNodeTrail` | 104 | Gold breadcrumb trail (max 30 pts) |
| `GlobeAutoTour` | 88 | Sequential node fly-through |
| `GlobeFireworks` | ~450 | Rockets + bursts + middle-fire + rainbow |
| `ParticleBackground` | ~550 | 2D canvas: 9 effect layers |

## Search Scoring Weights

| Field | Exact Match | Contains |
|-------|:-----------:|:--------:|
| label | 100 | 60 |
| id | — | 40 |
| keywords | — | 30 |
| file | — | 20 |
| description | — | 10 |

## Stats

| Metric | Value |
|--------|-------|
| Total source lines | ~13,600 |
| Components | 23 `.svelte` |
| Renderers | 10 `.ts` classes |
| Stores | 9 files, 40+ writable values |
| Graph data | 133 nodes, 69 links |
| Themes | 9 |
| Built-in presets | 4 (Chill, Low Energy, Fireworks, MAX) |
