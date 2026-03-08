# effects — Implementation

## Status: 🟢 done
## Prod: src/lib/renderers/Globe*.ts (5 files)

---

## Pattern: all renderers share init/update/dispose

```ts
class GlobeXxx {
  init(scene, ...deps): void
  update(delta): void
  dispose(): void
}
```

---

## show_comets
**Prod:** `GlobeCometTrails.ts` (152 lines)
| Item | Detail |
|------|--------|
| Dep | Three.js, GLOBE_RADIUS |
| Data | 8 trail objects, each: `{ line: Line, points: Vector3[] }` |
| Update | On WASD: prepend camera-dir point, pop oldest beyond maxPoints |
| Geometry | `BufferGeometry` updated per frame |
| Material | `LineBasicMaterial` per trail color |
| Guard | `if (!isFlying) return` early-exit |

---

## show_electric
**Prod:** `GlobeElectricArcs.ts` (~350 lines)
| Layer | Three.js object |
|-------|----------------|
| arcs | `Line` x N (spline paths) |
| aura | `Mesh` (sphere + shader) |
| orbit rings | `Line` (torus-like circles) |
| core glow | `PointLight` + `Mesh` |
| wisps | `Points` |
| spark burst | `Points` (burst pool) |

Stores subscribed (reactive):
```
showElectricArcs → toggle arc group visibility
showPlasmaAura → toggle aura mesh
electricArcIntensity/Speed/Count → arc rebuild
electricOrbitSpeed → ring rotation rate
electricCoreGlow → light intensity
showSparkBurst → burst group visibility
sparkBurstIntensity/Rate → burst params
```
Theme palettes: 9 entries keyed by theme name → `{ arc, aura, core, wisp }` color sets.

---

## node_effects
**Prod:** 3 files (~104–122 lines each)

### GlobeNodeExplosion.ts
```
click event → spawn 40 particles at node world pos
each particle: velocity + lifetime
update(): move by velocity, fade alpha, remove dead
geometry: Points with custom shader or PointsMaterial
```

### GlobeConnectionPulse.ts
```
per link: orb travels t=0→1 along CatmullRomCurve3
update(): advance t by speed*delta, loop or remove
object: Mesh(SphereGeometry, MeshBasicMaterial) per orb
```

### GlobeNodeTrail.ts
```
camera move → push world pos to trail[]
cap at 30 points (shift oldest)
geometry: Line updated each frame
color: gold (#FFD700 or equiv)
```

---

## auto_tour
**Prod:** `GlobeAutoTour.ts` (88 lines)
```ts
let idx = 0
function next() {
  flyTo(graphNodes[idx])
  idx = (idx + 1) % graphNodes.length
}
// timer or onArrival → next()
dispatchEvent(new CustomEvent('kg:tour-toggled', { detail: { active } }))
```
Dep: `GlobeRenderer.flyTo(node)`, `graphNodes: Node[]`

---

## show_fireworks
**Prod:** `GlobeFireworks.ts` (~450 lines)
| Phase | Behavior |
|-------|----------|
| launch | rocket Mesh moves upward at fireworksSpeed |
| burst | at apex: spawn N particles (fireworksBurstSize) radially |
| fall | particles += gravity vector each frame |
| middle fire | extra particle cone below burst point |
| cleanup | particles with lifetime<=0 removed from scene |

Store bindings:
```
fireworksEnabled → start/stop launcher interval
fireworksLaunchRate → setInterval delay
fireworksSpeed → rocket velocity
fireworksBurstSize → particle count at burst
fireworksMiddleFire → enable fire cone
fireworksColorful → random hue per rocket
fireworksHue → fixed hue when !colorful
fireworksNoLimit → remove max-concurrent cap
```
