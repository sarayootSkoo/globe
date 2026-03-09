# Auto Tour System

> Automated camera tour that visits globe nodes sequentially or randomly.
> Controllable via UI panel, keyboard shortcuts, and CustomEvent API.

---

## Table of Contents

1. [Overview](#overview)
2. [GlobeAutoTour Class](#globeautotour-class)
3. [Event Architecture](#event-architecture)
4. [Camera Reset on Stop](#camera-reset-on-stop)
5. [UI Controls](#ui-controls)
6. [Store Integration](#store-integration)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Known Issues & Fixes](#known-issues--fixes)
9. [File Map](#file-map)

---

## Overview

The auto tour system provides an automated "fly-through" experience of the knowledge graph.
The camera visits nodes one-by-one, pausing at each to display node details. Two traversal
modes are supported:

- **Sequential** (default): Visits nodes in order (index 0, 1, 2, ..., wraps to 0)
- **Random**: Jumps to a random node each time (guaranteed different from current)

When the tour stops, the camera automatically resets to the default viewing position.

---

## GlobeAutoTour Class

**Location**: `src/lib/renderers/GlobeAutoTour.ts`

### Constructor

```typescript
interface TourCallbacks {
  flyTo: (position: THREE.Vector3, distance: number) => void;
  onNodeFocus: (node: GraphNode) => void;
  onTourEnd: () => void;
  getZoomDistance?: () => number;  // optional: uses current zoom level
}

const tour = new GlobeAutoTour(callbacks);
```

### Internal State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `nodes` | `{data, position}[]` | `[]` | Node list set on `start()` |
| `currentIndex` | `number` | `0` | Index of current/last visited node |
| `_active` | `boolean` | `false` | Whether tour is running |
| `_timer` | `number` | `0` | Seconds since last node visit |
| `pauseDuration` | `number` | `3` | Seconds to wait at each node |
| `_random` | `boolean` | `false` | Random jump mode |

### Methods

#### `start(nodes)`

```typescript
start(nodes: { data: GraphNode; position: THREE.Vector3 }[]): void
```

- Sets the node list and resets `currentIndex` to 0
- Sets `_active = true` and `_timer = 0`
- Immediately visits the first node via `_visitCurrent()`
- No-op if `nodes` is empty

#### `stop()`

```typescript
stop(): void
```

- Sets `_active = false`
- Calls `callbacks.onTourEnd()`

#### `update(dt)`

```typescript
update(dt: number): void  // call every frame
```

Core update loop:

```
if not active → return
timer += dt
if timer >= pauseDuration:
  timer = 0
  if random mode AND nodes.length > 1:
    pick random index ≠ currentIndex (do-while loop)
  else:
    currentIndex++ (wrap to 0 at end)
  _visitCurrent()
```

The do-while loop for random mode guarantees:
- Never revisits the same node twice in a row
- Terminates quickly (expected 1–2 iterations for any node count)

#### `setPauseDuration(seconds)`

```typescript
setPauseDuration(seconds: number): void
```

Sets the pause time at each node. Clamped to minimum 1 second.
Called by the tour speed subscription: `pauseDuration = 3 / speedMultiplier`.

| Speed Slider | Multiplier | Pause Duration |
|-------------|------------|----------------|
| 10% | 0.1 | 30s (very slow) |
| 100% | 1.0 | 3s (default) |
| 200% | 2.0 | 1.5s (fast) |
| 500% | 5.0 | 1s (clamped min) |

#### `setRandom(enabled)`

```typescript
setRandom(enabled: boolean): void
```

Enables or disables random jump mode. Can be toggled while tour is running — takes effect on the next node transition.

#### `_visitCurrent()` (private)

```typescript
private _visitCurrent(): void
```

1. Gets node entry at `currentIndex`
2. Determines camera distance: `getZoomDistance()` if available, else default 650
3. Normalizes node position to unit sphere, scales by distance
4. Calls `callbacks.flyTo(camPos, dist)` — triggers smooth camera animation
5. Calls `callbacks.onNodeFocus(entry.data)` — updates detail panel

#### `dispose()`

Sets `_active = false`. Called during component cleanup.

---

## Event Architecture

The tour system uses `CustomEvent` on `document` for inter-component communication.

### Event: `kg:autotour`

**Direction**: GlobeControls / KeyboardShortcuts → GlobeCanvas

```typescript
document.dispatchEvent(new CustomEvent('kg:autotour', {
  detail: { action: 'start' | 'stop' | 'toggle' }
}));
```

**Handler in GlobeCanvas** (`handleAutoTour`):

```
action === 'start' OR (action === 'toggle' AND !tour.active):
  → Collect all node positions from renderer.nodeMeshes
  → autoTour.start(tourNodes)
  → Dispatch 'kg:tour-toggled'

action === 'stop' OR (action === 'toggle' AND tour.active):
  → autoTour.stop()
  → renderer.resetPosition()   ← camera reset
  → Dispatch 'kg:tour-toggled'
```

### Event: `kg:tour-toggled`

**Direction**: GlobeCanvas → GlobeControls (UI state sync)

Fired after every start/stop to notify the UI that tour state changed.
GlobeControls listens and toggles `tourActive` to update button text.

### Complete Event Flow

```
User clicks "▶ Auto Tour" button
  │
  ├─ GlobeControls: tourActive = true (flip #1)
  ├─ GlobeControls: tourToggleFromBtn = true (guard)
  ├─ Dispatch: kg:autotour { action: 'start' }
  │
  ├─ GlobeCanvas: receives kg:autotour
  │   ├─ autoTour.start(nodes)
  │   └─ Dispatch: kg:tour-toggled
  │
  └─ GlobeControls: receives kg:tour-toggled
      ├─ Check: tourToggleFromBtn === true
      ├─ Reset: tourToggleFromBtn = false
      └─ SKIP toggle (prevents double-flip)  ← guard works!

User presses Space key
  │
  ├─ KeyboardShortcuts: Dispatch kg:autotour { action: 'toggle' }
  │
  ├─ GlobeCanvas: receives kg:autotour
  │   ├─ autoTour.start() or .stop()
  │   └─ Dispatch: kg:tour-toggled
  │
  └─ GlobeControls: receives kg:tour-toggled
      ├─ Check: tourToggleFromBtn === false (not from button)
      └─ tourActive = !tourActive  ← toggle happens correctly
```

---

## Camera Reset on Stop

**Location**: `src/components/globe/GlobeCanvas.svelte` (handleAutoTour)

When tour stops (any trigger), the camera flies back to default position:

```typescript
autoTour.stop();
renderer?.resetPosition();  // → flyTo(new Vector3(0, 0, DEFAULT_CAM_DIST))
```

`resetPosition()` in `GlobeRenderer.ts`:
- Target: `(0, 0, DEFAULT_CAM_DIST)` — straight-ahead view at default zoom
- Uses the same `flyTo()` smooth animation as tour node visits
- Typically takes ~0.5–1s to complete the camera transition

This ensures the user isn't left looking at a random node position after stopping.

---

## UI Controls

**Location**: `src/components/controls/GlobeControls.svelte`

### Tour Toggle Button

```svelte
<button
  class="detail-btn"
  class:tour-active={tourActive}
  title={tourActive ? 'Stop auto-tour' : 'Start auto-tour'}
  onclick={toggleAutoTour}
>
  {tourActive ? '■ Stop Tour' : '▶ Auto Tour'}
</button>
```

- **Not active**: Shows `▶ Auto Tour` — click to start
- **Active**: Shows `■ Stop Tour` with `.tour-active` CSS (glowing border) — click to stop
- UX convention: button shows the **action** it will perform, not the current state

### Tour Speed Slider

```svelte
<input type="range" min="10" max="500" value={tourSpeedVal} />
```

- Range: 10% (very slow) → 500% (very fast)
- Default: 100%
- Mapping: `tourSpeed.set(raw / 100)` → store value 0.1–5.0
- Display label: `tourSpeedVal + '%'`
- Effect: `pauseDuration = 3 / speed` (called via store subscription in GlobeCanvas)

### Random Jump Toggle

```svelte
<div
  class="globe-toggle"
  class:on={tourRandomMode}
  title="Jump to random nodes instead of sequential"
  onclick={toggleTourRandom}
  role="switch"
  aria-checked={tourRandomMode}
></div>
```

- Uses the same `globe-toggle` switch style as Connections, Pulse, etc.
- Syncs with `globeStore.tourRandom` store
- Can be toggled while tour is running (takes effect on next node jump)
- Accessible: `role="switch"`, `aria-checked`, keyboard Enter support

---

## Store Integration

**Location**: `src/lib/stores/globeState.ts`

### `tourSpeed`

```typescript
export const tourSpeed = writable<number>(1);
```

- Default: `1` (3-second pause per node)
- Subscribed in GlobeCanvas: `autoTour.setPauseDuration(3 / Math.max(0.1, v))`
- Mirrored in GlobeControls as `tourSpeedVal` (raw slider value 10–500)

### `tourRandom`

```typescript
export const tourRandom = writable<boolean>(false);
```

- Default: `false` (sequential mode)
- Subscribed in GlobeCanvas: `autoTour.setRandom(v)`
- Mirrored in GlobeControls as `tourRandomMode`

### Hot-swappable

Both stores use Svelte `subscribe()` in GlobeCanvas, meaning changes take effect
immediately — even while the tour is actively running. No restart required.

---

## Keyboard Shortcuts

**Location**: `src/components/controls/KeyboardShortcuts.svelte`

| Key | Action |
|-----|--------|
| `Space` | Toggle auto tour (start/stop) |

```typescript
case ' ':  // Space bar
  document.dispatchEvent(new CustomEvent('kg:autotour', {
    detail: { action: 'toggle' },
  }));
```

Uses `'toggle'` action so GlobeCanvas checks `autoTour.active` to decide start/stop.

---

## Known Issues & Fixes

### Double-Toggle Bug (Fixed)

**Problem**: Clicking the tour button toggled `tourActive` twice — once in the click
handler and once from the `kg:tour-toggled` event listener — causing the state to
flip back to its original value.

**Root cause**: The event flow creates a synchronous round-trip:
```
button click → tourActive = !tourActive → kg:autotour → GlobeCanvas → kg:tour-toggled → tourActive = !tourActive
```

**Fix**: A `tourToggleFromBtn` guard flag:

```typescript
let tourToggleFromBtn = false;

function toggleAutoTour(): void {
  tourActive = !tourActive;
  tourToggleFromBtn = true;  // set guard
  document.dispatchEvent(new CustomEvent('kg:autotour', { ... }));
}

// Listener skips toggle when guard is set
$effect(() => {
  const handler = () => {
    if (tourToggleFromBtn) {
      tourToggleFromBtn = false;  // reset guard
      return;                     // skip redundant toggle
    }
    tourActive = !tourActive;     // only toggle for external triggers (keyboard)
  };
  document.addEventListener('kg:tour-toggled', handler);
  return () => document.removeEventListener('kg:tour-toggled', handler);
});
```

### Random Mode with 1 Node

If there's only 1 node in the graph, random mode falls through to sequential (no do-while
needed since there's only one option). The `nodes.length > 1` check prevents infinite loop.

---

## File Map

| File | Role |
|------|------|
| `src/lib/renderers/GlobeAutoTour.ts` | Tour engine: sequential + random traversal, timer, camera control |
| `src/lib/stores/globeState.ts` | `tourSpeed` and `tourRandom` writable stores |
| `src/components/globe/GlobeCanvas.svelte` | Tour lifecycle: event handling, start/stop, camera reset, store subscriptions |
| `src/components/controls/GlobeControls.svelte` | UI: toggle button, speed slider, random switch, double-toggle guard |
| `src/components/controls/KeyboardShortcuts.svelte` | Space bar shortcut dispatching `kg:autotour` toggle |
| `src/components/controls/KeyboardHelp.svelte` | Help overlay listing Space → "Toggle auto tour" |
| `src/lib/renderers/GlobeRenderer.ts` | `resetPosition()` method for camera reset on tour stop |
