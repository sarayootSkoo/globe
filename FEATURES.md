# Knowledge Graph — Feature Documentation

> 3D/2D interactive knowledge base visualization built with **Svelte 5 + Three.js + TypeScript + Vite**
>
> Last updated: 2026-03-08

---

## Table of Contents

1. [Themes](#1-themes)
2. [3D Globe Visualization](#2-3d-globe-visualization)
3. [Camera & Navigation](#3-camera--navigation)
4. [Node Interaction](#4-node-interaction)
5. [Search & Filtering](#5-search--filtering)
6. [Visual Effects](#6-visual-effects)
7. [Electric Effects](#7-electric-effects)
8. [Border Magic Effects](#8-border-magic-effects)
9. [Black Hole Effect](#9-black-hole-effect)
10. [Bloom Post-Processing](#10-bloom-post-processing)
11. [Audio Reactive Mode](#11-audio-reactive-mode)
12. [Preset System](#12-preset-system)
13. [Auto Tour](#13-auto-tour)
14. [Comet Trails](#14-comet-trails)
15. [Node Trail (Breadcrumb)](#15-node-trail-breadcrumb)
16. [Connection Animations](#16-connection-animations)
17. [Theme Transitions](#17-theme-transitions)
18. [Immersive Mode](#18-immersive-mode)
19. [Markdown Preview](#19-markdown-preview)
20. [Interaction Modes](#20-interaction-modes)
21. [Keyboard Shortcuts](#21-keyboard-shortcuts)
22. [Persistence](#22-persistence)
23. [Architecture](#23-architecture)

---

## 1. Themes

9 visual themes, each with unique color palette, particle effects, and border animations.

| # | Theme      | Key Color | Accent    | Special Effect        |
|---|------------|-----------|-----------|------------------------|
| 1 | Dark       | `#030508` | `#00d4ff` | Default cyan glow      |
| 2 | Light      | `#0a0e1a` | `#e0aa20` | Amber/gold tones       |
| 3 | Fire       | `#0a0400` | `#ff6a00` | Embers + flame border  |
| 4 | Winter     | `#020a14` | `#7ec8ff` | Snowflakes + ice       |
| 5 | Galaxy     | `#05000d` | `#b46aff` | Nebula clouds          |
| 6 | Electric   | `#020810` | `#3c8cff` | Plasma + lightning     |
| 7 | Void       | `#050008` | `#b040ff` | Dark matter accretion  |
| 8 | Aurora     | `#020d0a` | `#40ffa0` | Northern lights        |
| 9 | Rain       | `#0a0c10` | `#6090c0` | Raindrops + ripples    |

Switch themes with keys **1–9** or the theme selector in top controls.

**Files:** `src/app.css` (CSS variables), `src/lib/stores/appState.ts` (theme store)

---

## 2. 3D Globe Visualization

The core visualization renders knowledge nodes on a 3D sphere.

| Parameter        | Value  | Description                          |
|------------------|--------|--------------------------------------|
| Globe Radius     | 300    | Sphere radius in scene units         |
| Dot Count        | 2,400  | Background particle dots (Fibonacci) |
| Default Camera   | 900    | Default camera distance              |
| Focus Camera     | 650    | Camera distance when locked on node  |

**Components:**
- **Wireframe sphere** — toggleable geodesic grid overlay
- **Dot sphere** — 2,400 particles distributed via Fibonacci lattice, colored per theme gradient
- **Sprite nodes** — clickable nodes positioned on sphere surface, sized by connection count
- **Connection arcs** — great-circle curves linking related nodes

**Controls (Globe Controls panel):**

| Control          | Range      | Description                      |
|------------------|------------|----------------------------------|
| Auto Rotate      | on/off     | Orbit rotation                   |
| Rotation Speed   | 5–200%     | Orbit angular velocity           |
| Zoom             | 10–100     | Camera distance (400–1660 units) |
| Opacity          | 10–100%    | Globe wireframe + dot opacity    |
| Dot Light        | 0–2000%    | Dot sphere brightness            |
| Pulse            | on/off     | Breathing animation on nodes     |
| Pulse Speed      | 10–200%    | Pulse frequency (0.1–2 Hz)       |
| Wireframe        | on/off     | Show/hide geodesic grid          |
| Dot Sphere       | on/off     | Show/hide background dots        |
| Connections      | on/off     | Show/hide arc links              |
| Comet Trail      | on/off     | Particle trails during WASD      |

**Files:** `src/lib/renderers/GlobeRenderer.ts`, `src/components/globe/GlobeCanvas.svelte`, `src/lib/constants.ts`

---

## 3. Camera & Navigation

### WASD Flight Controls

| Key    | Action                              |
|--------|-------------------------------------|
| W      | Pitch up (tilt camera upward)       |
| A      | Yaw left (rotate camera left)       |
| S      | Pitch down (tilt camera downward)   |
| D      | Yaw right (rotate camera right)     |
| Shift  | Speed boost (4x acceleration)       |
| Q      | Brake / decelerate                  |

Physics-based movement with acceleration, friction, and max velocity (500 km/h display).

### Mouse Controls

| Action       | Effect                     |
|--------------|----------------------------|
| Click + Drag | Orbit camera around globe  |
| Scroll       | Zoom in/out                |
| Click node   | Select and lock            |
| Click empty  | Deselect + clear trail     |

**Speed HUD** appears during WASD movement showing velocity bar, key indicators, and km/h readout.

**Files:** `src/lib/renderers/GlobeWASD.ts`, `src/components/globe/WasdHud.svelte`, `src/components/wasd/WasdPopup.svelte`

---

## 4. Node Interaction

### Selection
- **Click node** → select, lock camera, open detail panel
- **Click empty** → deselect, unlock camera, clear trail
- **Hover** → highlight node, show label, pulse connected nodes

### Detail Panel (right side)
Shows when a node is selected:
- Node label + category badge
- File path
- Description text
- Keywords list
- Connected nodes (clickable — jumps to that node)
- Action buttons: Focus (VSCode), Impact Analysis, Path From Here, Preview

### On-Click Visual Effects
- **Node explosion** — 40-particle burst (velocity 80–280 units/s, life 0.4–1.0s)
- **Connection pulse** — glowing sphere travels along arcs to connected nodes
- **Node trail** — gold breadcrumb line connecting visited nodes (max 30 points)

**Files:** `src/components/panels/DetailPanel.svelte`, `src/lib/renderers/GlobeNodeExplosion.ts`, `src/lib/renderers/GlobeConnectionPulse.ts`

---

## 5. Search & Filtering

### Full-Text Search
- Real-time scoring across node labels, descriptions, and keywords
- Results dropdown table with score visualization bars
- Globe highlighting: matched nodes glow, non-matches grayscale
- Heatmap ring overlay showing match density on sphere
- Clear search resets zoom to default

### Category Filtering
- Legend panel (top-right) lists all 7 categories with color badges
- Click category to toggle visibility
- Hidden categories gray out on globe

| Category       | Color     |
|----------------|-----------|
| Core Docs      | `#00d4ff` |
| ADR Decisions  | `#a855f7` |
| Discussions    | `#f97316` |
| OMS Order Docs | `#3b82f6` |
| OMS Webapp     | `#10b981` |
| Webapp Help    | `#f59e0b` |
| Meta / Config  | `#6b7280` |

**Files:** `src/lib/stores/searchState.ts`, `src/components/search/SearchBox.svelte`, `src/components/search/SearchResults.svelte`, `src/components/panels/LegendPanel.svelte`

---

## 6. Visual Effects

### Particle Background (theme-dependent)

| Effect          | Theme      | Description                          |
|-----------------|------------|--------------------------------------|
| Nebula clouds   | Galaxy     | Layered translucent cloud drifts     |
| Glitter         | Galaxy     | Twinkling micro-particles            |
| Shooting stars  | Galaxy     | Bright streaks with long tails       |
| Embers          | Fire       | Rising orange particles              |
| Snowflakes      | Winter     | Falling, wobbling ice crystals       |
| Lightning       | All        | Random jagged bolts                  |
| Background stars| All        | 180 fixed stars (12 with halo glow)  |
| Background mesh | All        | Connective grid lines                |

### Master Controls

| Control     | Range     | Effect                                   |
|-------------|-----------|------------------------------------------|
| Density     | 0–200%    | Particle count multiplier (0x–2x)        |
| Speed       | 0–300%    | Animation speed multiplier (0x–3x)       |

Each effect can be individually toggled on/off.

**Files:** `src/lib/stores/themeEffects.ts`, `src/lib/renderers/ParticleBackground.ts`, `src/components/background/ParticleCanvas.svelte`

---

## 7. Electric Effects

5-layer plasma ball system rendered around the globe (works on all themes, most visible on Electric theme).

| Layer        | Description                                 |
|--------------|---------------------------------------------|
| Arcs         | Jagged lightning bolts across globe surface  |
| Plasma aura  | Diffuse glow halo around sphere             |
| Orbit rings  | Swirling elliptical energy bands            |
| Core glow    | Bright pulsing center illumination          |
| Spark burst  | Radial lightning discharge (periodic pulse) |

### Controls

| Parameter         | Range     | Effect                          |
|-------------------|-----------|---------------------------------|
| Arc Intensity     | 20–300%   | Bolt brightness + count         |
| Arc Speed         | 25–300%   | Animation velocity              |
| Arc Count         | 20–300%   | Number of arcs multiplier       |
| Orbit Speed       | 25–300%   | Ring rotation rate              |
| Core Glow         | 20–300%   | Center glow intensity           |
| Spark Intensity   | 20–300%   | Bolt brightness in bursts       |
| Spark Rate        | 25–300%   | Burst frequency                 |

**Files:** `src/lib/renderers/GlobeElectricArcs.ts`, `src/components/controls/GlobeControls.svelte`

---

## 8. Border Magic Effects

Animated edge effects around the viewport, unique per theme.

| Theme    | Effect                                                  |
|----------|---------------------------------------------------------|
| Fire     | Flame tongues from all edges (bezier tips, red→yellow)  |
| Winter   | Icy gradient overlay, snowflake-like particles          |
| Galaxy   | Purple nebula glow from edges                           |
| Electric | Crackling energy at border                              |
| Void     | Dark matter accretion disk animation                    |
| Aurora   | Northern lights shimmer (18 ribbons, green→purple)      |
| Rain     | Raindrops (70 drops) + water ripples (15 max)           |
| Dark     | Subtle cyan edge glow                                   |
| Light    | Warm amber edge glow                                    |

### Controls

| Parameter  | Range    | Effect                    |
|------------|----------|---------------------------|
| Border     | on/off   | Toggle entire effect      |
| Intensity  | 20–200%  | Glow strength             |
| Speed      | 25–300%  | Animation speed           |

Toggle with **B** key.

**Files:** `src/components/background/BorderMagic.svelte`

---

## 9. Black Hole Effect

Standalone animated black hole with accretion disk. Works on any theme.

### Controls

| Parameter | Range     | Effect                                |
|-----------|-----------|---------------------------------------|
| Enabled   | on/off    | Toggle black hole                     |
| Size      | 0–2000%   | Overall scale (0.01x–20x)            |
| Speed     | 0–2000%   | Animation speed                       |
| Glow      | 0–2000%   | Glow intensity                        |
| Width     | 0–2000%   | Horizontal stretch                    |
| Height    | 0–2000%   | Vertical stretch                      |
| Color     | 0°–360°   | HSL hue (rainbow slider)             |

7-layer rendering: outer glow, accretion disk ring, inner disk, core shadow, event horizon, lens distortion, color ring.

Toggle with **H** key.

**Files:** `src/components/background/BorderMagic.svelte` (drawBlackhole function)

---

## 10. Bloom Post-Processing

Three.js UnrealBloomPass applied to the entire 3D scene.

| Parameter  | Range    | Effect                                          |
|------------|----------|-------------------------------------------------|
| Enabled    | on/off   | Toggle bloom pipeline                           |
| Strength   | 0–500%   | Bloom glow brightness (0–5x)                   |
| Radius     | 0–200%   | Blur spread/softness (0–2x)                    |
| Threshold  | 0–100%   | Brightness cutoff — lower = more bloom (0–1)   |

Uses Three.js EffectComposer with RenderPass → UnrealBloomPass pipeline.

**Files:** `src/lib/renderers/GlobeRenderer.ts` (setBloom, updateBloom methods)

---

## 11. Audio Reactive Mode

Drives visual effects from microphone input via Web Audio API.

### How It Works
1. Requests microphone access
2. FFT frequency analysis via AnalyserNode
3. Splits spectrum into 3 bands
4. Maps band levels to effect parameters in real-time

### Frequency Mapping

| Band | Range      | Drives                                    |
|------|------------|-------------------------------------------|
| Bass | 0–15%      | Arc intensity, core glow, border glow     |
| Mid  | 15–50%     | Arc speed, spark intensity                |
| High | 50–100%    | Spark rate, border speed                  |

### Controls

| Parameter    | Range      | Effect                         |
|--------------|------------|--------------------------------|
| Audio Toggle | on/off     | Start/stop mic capture         |
| Sensitivity  | 10–300%    | Input amplification (0.1–3x)  |

Real-time 3-bar visualizer shows bass/mid/high levels.

Original effect values are saved on start and restored on stop.

**Files:** `src/lib/stores/audioReactive.ts`

---

## 12. Preset System

Save, load, export, and share effect configurations.

### Built-in Presets

| Preset      | Description                                           |
|-------------|-------------------------------------------------------|
| **Chill**   | Galaxy theme, density 50%, speed 40%, glow 20%        |
| **Low Energy** | Dark theme, minimal effects — saves browser RAM    |
| **MAX**     | All effects cranked to maximum intensity               |

**Low Energy** disables: nebula, glitter, shooting stars, embers, snowflakes, lightning, electric arcs, plasma, spark burst, wireframe, border, bloom, black hole. Sets density 15%, speed 20%.

### Custom Presets
- **Save Current** → captures all ~50 store values as a named preset
- **Overwrite** (↻ button) → update existing preset with current settings
- **Delete** (× button) → remove custom preset (built-ins are locked)

### Export / Import
- **Export** → copies all custom presets as JSON to clipboard
- **Import** → paste JSON, merges with existing presets

### Preset Thumbnails
Each preset card shows a 3px color gradient bar reflecting:
- Theme base color
- Glow intensity (opacity)
- Energy level (density + speed → white brightness)

### Reset
- **Reset button** or **R key** → all effects return to defaults, clears node trail

**Files:** `src/lib/stores/presetState.ts`, `src/components/controls/PresetSystem.svelte`

---

## 13. Auto Tour

Automated camera flythrough visiting nodes sequentially.

| Setting       | Default | Range      | Effect                          |
|---------------|---------|------------|---------------------------------|
| Tour Speed    | 100%    | 10–500%    | Pause duration at each node     |
| Pause Duration| 3s      | 0.6–30s    | Inversely proportional to speed |

- Activates with **Space** key or Tour button
- Smooth fly-to transition between nodes
- Pauses at each node before moving to next
- Selects and locks each visited node
- Dispatches `kg:tour-toggled` event for UI sync

**Files:** `src/lib/renderers/GlobeAutoTour.ts`, `src/components/globe/GlobeCanvas.svelte`

---

## 14. Comet Trails

8 parallel colored particle trails visible during WASD rotation.

| Color   | Hex       |
|---------|-----------|
| Cyan    | `#00d4ff` |
| Purple  | `#a855f7` |
| Orange  | `#f97316` |
| Green   | `#10b981` |
| Blue    | `#3b82f6` |
| Amber   | `#f59e0b` |
| Red     | `#ef4444` |
| Indigo  | `#6366f1` |

- Each trail stores 40 position points
- Alpha fades based on rotation speed (visible above 15% velocity)
- Toggleable in Globe Controls panel

**Files:** `src/lib/renderers/GlobeCometTrails.ts`

---

## 15. Node Trail (Breadcrumb)

Gold line connecting previously visited nodes — shows exploration path.

| Property    | Value     |
|-------------|-----------|
| Core color  | `#ffd700` (gold), 70% opacity  |
| Glow color  | `#ff8800` (orange), 25% opacity |
| Max points  | 30        |
| Blending    | Additive  |

**Reset:** click empty space, press R, or click Reset button.

**Files:** `src/lib/renderers/GlobeNodeTrail.ts`

---

## 16. Connection Animations

### Node Explosion
- 40 particles burst on node click
- Random sphere directions
- Velocity: 80–280 units/s
- Lifetime: 0.4–1.0 seconds
- Color matches theme accent

### Connection Pulse
- Glowing sphere travels along connection arcs
- Fires from selected node to all connected nodes
- Speed and color configurable

### Flow Pulses (on hover)
- Small additive-blended spheres travel along arc geometry
- Loop continuously while node is hovered
- Cleaned up on hover end

**Files:** `src/lib/renderers/GlobeNodeExplosion.ts`, `src/lib/renderers/GlobeConnectionPulse.ts`, `src/lib/renderers/GlobeRenderer.ts`

---

## 17. Theme Transitions

Smooth animated color interpolation when switching themes.

- Duration: **0.6 seconds**
- Interpolation: **smoothstep** (`t*t*(3-2*t)`)
- Lerps: dot sphere colors (Float32Array), wireframe color
- Captures old colors before applying new theme palette

**Files:** `src/lib/renderers/GlobeRenderer.ts` (_themeTransition field, animate loop)

---

## 18. Immersive Mode

Fullscreen mode that hides all UI panels.

- Toggle with **F** key
- Hides: Globe Controls, Search Box, Top Controls, Legend, Stats, Detail, Path, Toolbar, WASD HUD
- Shows: "Press F to exit" hint (bottom-right, fades)
- Uses `body.immersive` CSS class with `opacity: 0; pointer-events: none`

**Files:** `src/lib/stores/appState.ts` (immersiveMode store), `src/App.svelte`, `src/app.css`

---

## 19. Markdown Preview

Fullscreen reader overlay for node documentation.

- Renders markdown → HTML (via `marked` library)
- Syntax highlighting for code blocks
- Table, blockquote, list, image support
- **Preview toolbar:**
  - Width slider (adjustable via CSS variable `--preview-w`)
  - Text search within preview (highlight matches, navigate between)
  - Match count display
  - Close button

**Files:** `src/components/preview/PreviewOverlay.svelte`, `src/lib/stores/previewState.ts`

---

## 20. Interaction Modes

| Mode     | Description                                          |
|----------|------------------------------------------------------|
| Explore  | Default — free browse, hover highlight, click select |
| Path     | Select 2 nodes → compute shortest path (BFS)        |
| Impact   | Select node → highlight all connected nodes          |

Path panel shows intermediate nodes with hop count. Click nodes in path to jump.

**Files:** `src/lib/stores/appState.ts` (currentMode), `src/components/panels/PathPanel.svelte`, `src/lib/utils/graph.ts` (bfs)

---

## 21. Keyboard Shortcuts

| Key        | Action                       |
|------------|------------------------------|
| W A S D    | Rotate globe                 |
| Shift      | Speed boost (4x)             |
| Q          | Brake                        |
| 1 – 9      | Switch theme                 |
| Space      | Toggle auto tour             |
| R          | Reset all effects to defaults|
| F          | Fullscreen / Immersive mode  |
| B          | Toggle border effect         |
| H          | Toggle black hole            |
| Click node | Select & lock                |
| Click empty| Deselect + clear trail       |
| Scroll     | Zoom in/out                  |
| Drag       | Orbit camera                 |
| ?          | Toggle keyboard help modal   |

Shortcuts are disabled when typing in input/textarea fields.

**Files:** `src/components/controls/KeyboardShortcuts.svelte`, `src/components/controls/KeyboardHelp.svelte`

---

## 22. Persistence

All settings are persisted to `localStorage` (via `@secure-storage/common` wrapper).

### Persisted Keys

| Prefix     | Examples                                           |
|------------|----------------------------------------------------|
| `app.*`    | theme, glow                                        |
| `globe.*`  | autoRotate, wireframe, dots, links, pulse, comet, pulseSpeed, rotateSpeed, zoom, opacity, dotBright, tourSpeed |
| `fx.*`     | density, speed, nebula, glitter, shootStars, embers, snowflakes, lightning, elecArcs, plasmaAura, elecArcInt, elecArcSpd, elecArcCnt, elecOrbitSpd, elecCoreGlow, sparkBurst, sparkInt, sparkRate, bgStars, bgMesh, border, borderIntensity, borderSpeed, bloom, bloomStr, bloomRad, bloomThr, bhEnabled, bhSize, bhSpeed, bhGlow, bhWidth, bhHeight, bhHue |
| `ui.*`     | globeOpen, fxOpen (panel collapse states)          |
| `presets.*`| custom (user-saved presets array)                  |

Numeric sliders use **80ms debounced writes** to avoid storage spam during dragging.

Corrupted entries are auto-cleaned on read (catch → removeItem → return fallback).

**Files:** `src/lib/stores/persist.ts`, `src/lib/utils/storage.ts`

---

## 23. Architecture

### Component Tree

```
App.svelte
├── TopBanner.svelte          ← Title bar
├── ModeBar.svelte            ← Mode indicator (explore/path/impact)
├── TopControls.svelte        ← Layout toggle + theme selector
├── ParticleCanvas.svelte     ← 2D particle background
├── BorderMagic.svelte        ← Edge effects + black hole
├── Scanline.svelte           ← CRT scanline overlay
├── Corners.svelte            ← Corner bracket decorations
├── GlobeCanvas.svelte        ← 3D globe (Three.js)
│   ├── GlobeRenderer         ← Core renderer (dots, wireframe, nodes, arcs)
│   ├── GlobeWASD             ← Keyboard flight controls
│   ├── GlobeCometTrails      ← Comet particle trails
│   ├── GlobeElectricArcs     ← 5-layer plasma ball
│   ├── GlobeNodeExplosion    ← Click particle burst
│   ├── GlobeConnectionPulse  ← Arc travel animation
│   ├── GlobeNodeTrail        ← Gold breadcrumb line
│   └── GlobeAutoTour         ← Automated node tour
├── WasdHud.svelte            ← Speed + key indicator
├── GlobeControls.svelte      ← Control panel (150+ parameters)
│   └── PresetSystem.svelte   ← Preset cards + save/load/export
├── SearchBox.svelte           ← Search input
│   └── SearchResults.svelte   ← Results dropdown
├── LegendPanel.svelte         ← Category filter
├── StatsPanel.svelte          ← Node/link counts
├── DetailPanel.svelte         ← Selected node info
├── PathPanel.svelte           ← Shortest path display
├── Toolbar.svelte             ← Action buttons
├── KeyboardShortcuts.svelte   ← Global key handler
├── KeyboardHelp.svelte        ← Help modal (?)
└── PreviewOverlay.svelte      ← Markdown reader
```

### State Management

```
stores/
├── appState.ts       ← theme, mode, selectedNode, glow, immersive
├── globeState.ts     ← rotation, zoom, pulse, comet, opacity, tour
├── themeEffects.ts   ← 30+ effect toggles & sliders
├── audioReactive.ts  ← mic input → FFT → effect mapping
├── presetState.ts    ← preset CRUD + built-in presets
├── searchState.ts    ← query, scored results, matched set
├── graphData.ts      ← nodes + links arrays
├── previewState.ts   ← preview overlay state
└── persist.ts        ← localStorage load/save subscriptions
```

### Rendering Pipeline

```
                ┌─────────────┐
                │ ParticleCanvas│ ← 2D Canvas (theme particles)
                └──────┬──────┘
                       │
                ┌──────▼──────┐
                │ BorderMagic  │ ← 2D Canvas (edges + black hole)
                └──────┬──────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                  GlobeRenderer                    │
│  ┌────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │Wireframe│  │Dot Sphere│  │ Sprite Nodes     │ │
│  │ sphere  │  │ 2400 pts │  │ (clickable)      │ │
│  └────────┘  └──────────┘  └──────────────────┘ │
│  ┌────────────┐  ┌───────────────┐               │
│  │ Arcs (links)│  │ Electric Arcs │               │
│  └────────────┘  └───────────────┘               │
│                                                   │
│  RenderPass → UnrealBloomPass → Screen            │
└───────────────────────────────────────────────────┘
```

### Key Constants

| Constant         | Value | Description                    |
|------------------|-------|--------------------------------|
| GLOBE_RADIUS     | 300   | Sphere radius (scene units)    |
| DOT_COUNT        | 2,400 | Background dot particles       |
| TRAIL_COUNT      | 8     | Comet trail count              |
| TRAIL_POINTS     | 40    | Points per comet trail         |
| DEFAULT_CAM_DIST | 900   | Default camera distance        |
| FOCUS_CAM_DIST   | 650   | Camera distance when locked    |

---

## Quick Start

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

### Tips
- Press **?** for keyboard shortcut overlay
- Use **Low Energy** preset on low-spec machines
- **R** resets everything (effects + trail) to defaults
- **Space** starts auto-tour for hands-free exploration
- **F** for immersive full-globe experience
- Export presets before clearing browser data
