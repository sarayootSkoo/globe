# Energy Score System

> Measures how much GPU/CPU power each preset or live configuration consumes.
> Used by the EnergyBar (live indicator) and PresetSystem (dot display + sorting).

---

## Table of Contents

1. [Overview](#overview)
2. [Energy Score Formula](#energy-score-formula)
3. [EnergyBar Component](#energybar-component)
4. [Preset System Enhancements](#preset-system-enhancements)
5. [Adding New Presets](#adding-new-presets)
6. [File Map](#file-map)

---

## Overview

The energy system provides a unified metric (0–1 score) representing how resource-intensive
the current visual configuration is. This score drives:

- **EnergyBar**: A live gradient bar above the Presets panel showing real-time energy usage
- **Preset dots**: Each preset card displays 1–5 colored dots indicating its energy cost
- **Sorting**: Presets are sorted lowest-energy-first so battery-friendly options appear at the top

---

## Energy Score Formula

### Function: `computeEnergyScore(preset: Preset): number`

**Location**: `src/lib/stores/presetState.ts`

The score is a weighted average of 4 normalized factors:

| Factor | Weight | Raw Range | Normalization |
|--------|--------|-----------|---------------|
| `fx.density` | 30% | 0–5 | `min(density / 5, 1)` |
| `fx.speed` | 25% | 0–3 | `min(speed / 3, 1)` |
| Boolean effects | 25% | 0–14 enabled | `enabledCount / 14` |
| `app.glow` | 20% | 0–1 | Already normalized |

```
score = nDensity * 0.30 + nSpeed * 0.25 + nBools * 0.25 + nGlow * 0.20
```

### Why these weights?

- **Density (30%)**: Controls particle count across all effects — the single biggest GPU cost
- **Speed (25%)**: Higher speed = more frequent position recalculations per frame
- **Booleans (25%)**: Each enabled effect adds a render pass or canvas layer
- **Glow (20%)**: Adds post-processing bloom/shadow passes but less costly than particle systems

### Boolean Effect Keys (`ENERGY_BOOL_KEYS`)

These 14 toggleable effects are counted for the boolean factor:

| Key | Effect | GPU Impact |
|-----|--------|------------|
| `fx.nebula` | Nebula cloud overlay | Medium — canvas layer |
| `fx.glitter` | Glitter particle sparkles | Low — small particles |
| `fx.shootStars` | Shooting star streaks | Low — occasional draw |
| `fx.embers` | Floating ember particles | Medium — many particles |
| `fx.snowflakes` | Snowflake particles | Medium — many particles |
| `fx.lightning` | Lightning bolt flashes | Low — intermittent |
| `fx.elecArcs` | Electric arc tendrils | High — complex geometry |
| `fx.plasmaAura` | Plasma aura glow ring | Medium — shader pass |
| `fx.sparkBurst` | Spark burst explosions | Medium — burst particles |
| `fx.bgMesh` | Background mesh grid | Low — static geometry |
| `fx.border` | Animated border effect | Medium — canvas overlay |
| `fx.bloom` | Post-processing bloom | High — full-screen pass |
| `fx.bhEnabled` | Black hole effect | High — distortion shader |
| `fx.fwEnabled` | Fireworks system | High — particle explosions |

### Default Fallback

When a preset doesn't define a key, `DEFAULT_VALUES` is used. This means:
- A preset that only sets `fx.density: 0.1` still inherits all default booleans (most are `true`)
- To make a truly low-energy preset, explicitly set booleans to `false`

### Built-in Preset Scores

| Preset | Score | Dots | Color | Why |
|--------|-------|------|-------|-----|
| Low Energy | ~5% | 1 (green) | `#22ff88` | Density 0.15, speed 0.2, all booleans off, glow 0.1 |
| Chill | ~30% | 3 (lime) | `#88ee44` | Density 0.5, speed 0.4, defaults for booleans, glow 0.2 |
| Fireworks | ~48% | 3 (yellow) | `#ffcc00` | Default density/speed, fireworks+bloom on, glow 0.5 |
| MAX | ~95% | 5 (red) | `#ff3333` | Density 5, speed 3, glow 1, fireworks on max |

---

## EnergyBar Component

**Location**: `src/components/controls/EnergyBar.svelte`

### Architecture

```
17 store subscriptions
    → captureCurrentState() snapshot
    → computeEnergyScore() → 0–1 score
    → $derived: pct, levelLabel, sliderPos, color
    → Rendered: header + gradient track + thumb
```

The component subscribes to all energy-driving stores:

```typescript
// Key subscriptions (17 total):
fx.effectDensity, fx.effectSpeed, glowLevel,
fx.showNebula, fx.showGlitter, fx.showShootingStars,
fx.showEmbers, fx.showSnowflakes, fx.showLightning,
fx.showElectricArcs, fx.showPlasmaAura, fx.showSparkBurst,
fx.showBgMesh, fx.borderEnabled, fx.bloomEnabled,
fx.blackholeEnabled, fx.fireworksEnabled,
activePresetName
```

Any change to any of these stores triggers `update()` which:
1. Calls `captureCurrentState()` to snapshot all stores
2. Wraps it as a pseudo-Preset
3. Passes it through `computeEnergyScore()`

### Visual Elements

```
┌─────────────────────────────────────────────────┐
│ E N E R G Y  ⚡  Med   [Custom]         ~25%   │  ← Header
│ ⏸───⚡────⚡────⚡────🔥──🔥                    │  ← Gradient track
│         [█]                                      │  ← Glowing thumb
└─────────────────────────────────────────────────┘
```

- **Header**: Label + bolt emoji + level name + preset tag + percentage
- **Track**: `linear-gradient` from dark green → green → lime → yellow → orange → red
- **Scale marks**: ⏸ (0%), ⚡ (25%, 50%, 75%), 🔥 (90%, 100%)
- **Thumb**: 14px rounded square, color matches energy level, CSS `box-shadow` glow, `transition: left 0.3s ease`

### Level Labels & Colors

| Energy Range | Label | Color | Hex |
|-------------|-------|-------|-----|
| 0–9% | Idle | Green | `#22ff88` |
| 10–24% | Low | Green | `#22ff88` |
| 25–44% | Med | Lime | `#88ee44` |
| 45–59% | High | Yellow | `#ffcc00` |
| 60–79% | Heavy | Orange | `#ff8833` |
| 80–100% | Max | Red | `#ff3333` |

### Preset Tag

Shows `activePresetName` if a preset is active, otherwise "Custom".

---

## Preset System Enhancements

**Location**: `src/components/controls/PresetSystem.svelte`

### Sorted Preset Grid

```typescript
let sortedPresets = $derived(
  [...presetList]
    .map(p => ({ preset: p, energy: computeEnergyScore(p) }))
    .sort((a, b) => a.energy - b.energy)
);
```

- Uses Svelte 5 `$derived` for reactive recomputation
- Spreads `presetList` to avoid mutating the original array
- Maps each preset to `{ preset, energy }` tuple
- Sorts ascending (lowest energy first)
- Re-sorts automatically when presets change (e.g., after import)

### Energy Dots

Each preset card shows 1–5 dots below the name:

```
┌────────────┐
│   Chill     │
│  ●●●○○     │  ← 3 filled (lime), 2 empty
└────────────┘
```

**Dot count** (`energyDotCount`): Uses non-linear breakpoints for better visual spread:

| Score Range | Dots |
|-------------|------|
| < 0.10 | 1 |
| 0.10 – 0.24 | 2 |
| 0.25 – 0.44 | 3 |
| 0.45 – 0.69 | 4 |
| >= 0.70 | 5 |

**Dot color** (`energyColor`): Same color scale as EnergyBar.

**Tooltip**: Hover shows `"Chill — Energy: ~30% · Low"` via `energyLabel()`.

### CSS

```css
.energy-dots .dot.filled { color: var(--energy-color); }  /* dynamic color */
.energy-dots .dot.empty  { color: rgba(255,255,255,0.12); } /* dim */
```

Color is passed via CSS custom property `--energy-color` set inline on the container.

---

## Adding New Presets

### Step 1: Define in `BUILTIN_PRESETS`

```typescript
// In src/lib/stores/presetState.ts
const BUILTIN_PRESETS: Preset[] = [
  // ... existing presets
  {
    name: 'Zen',
    settings: {
      'app.theme': 'aurora',
      'app.glow': 0.15,
      'fx.density': 0.3,
      'fx.speed': 0.25,
      'fx.nebula': true,
      'fx.glitter': false,
      'fx.shootStars': false,
      'fx.embers': false,
      // ... other booleans set to false for low energy
    },
  },
];
```

### Step 2: Update `builtinNames` in PresetSystem

```typescript
// In src/components/controls/PresetSystem.svelte
const builtinNames = ['Chill', 'Low Energy', 'Fireworks', 'MAX', 'Zen'];
```

### Step 3: No further action needed

- Energy score auto-calculates from the `settings` object
- Sorting auto-places it in the correct position
- Dots and colors auto-render based on the score

### Available Setting Keys

All keys in `STORE_MAP` are valid preset settings. Organized by category:

**App**: `app.theme` (string), `app.glow` (0–1)

**Effects Master**: `fx.density` (0–5), `fx.speed` (0–3)

**Effect Toggles**: `fx.nebula`, `fx.glitter`, `fx.shootStars`, `fx.embers`, `fx.snowflakes`, `fx.lightning`, `fx.elecArcs`, `fx.plasmaAura`, `fx.sparkBurst`, `fx.bgStars`, `fx.bgMesh`, `fx.border`, `fx.bloom`, `fx.bhEnabled`, `fx.fwEnabled`

**Effect Params**: `fx.elecArcInt`, `fx.elecArcSpd`, `fx.elecArcCnt`, `fx.elecOrbitSpd`, `fx.elecCoreGlow`, `fx.sparkInt`, `fx.sparkRate`, `fx.borderIntensity`, `fx.borderSpeed`, `fx.bloomStr`, `fx.bloomRad`, `fx.bloomThr`, `fx.bhSize`, `fx.bhSpeed`, `fx.bhGlow`, `fx.bhWidth`, `fx.bhHeight`, `fx.bhHue`, `fx.fwSpeed`, `fx.fwRate`, `fx.fwSize`, `fx.fwMiddleFire`, `fx.fwColorful`, `fx.fwNoLimit`, `fx.fwHue`

**Globe**: `globe.autoRotate`, `globe.wireframe`, `globe.dots`, `globe.links`, `globe.pulse`, `globe.comet`, `globe.pulseSpeed`, `globe.rotateSpeed`, `globe.zoom`, `globe.opacity`, `globe.dotBright`, `globe.tourSpeed`

---

## File Map

| File | Role |
|------|------|
| `src/lib/stores/presetState.ts` | `computeEnergyScore()`, `BUILTIN_PRESETS`, `STORE_MAP`, `DEFAULT_VALUES` |
| `src/components/controls/EnergyBar.svelte` | Live energy bar with gradient track and glowing thumb |
| `src/components/controls/PresetSystem.svelte` | Preset grid with energy dots, sorted by score |
| `src/components/controls/GlobeControls.svelte` | Parent component that renders `<EnergyBar />` and `<PresetSystem />` |
