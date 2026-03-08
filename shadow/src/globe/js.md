# render_scene

## Status: 🟢 done
## Prod: src/lib/renderers/GlobeRenderer.ts

### Class: GlobeRenderer

```ts
class GlobeRenderer {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  composer: EffectComposer        // bloom post-processing
  bloomPass: UnrealBloomPass
  raycaster: THREE.Raycaster

  // Globe layers
  globeMesh: THREE.Mesh           // sphere
  wireframe: THREE.LineSegments
  dotParticles: THREE.Points      // fibonacci sphere, 2400 dots
  linkLines: THREE.Line[]         // great-circle arcs

  // Node tracking
  nodeMeshes: NodeMeshEntry[]     // { mesh, data, labelEl, glowMesh }

  init(container: HTMLElement, nodes: NodeData[], links: LinkData[]): void
  animate(params: AnimateParams): void
  dispose(): void
}
```

### Key Types
```ts
interface NodeMeshEntry {
  mesh: THREE.Sprite
  data: NodeData
  labelEl: HTMLElement
  glowMesh: THREE.Sprite
}

interface AnimateParams {
  pulseEnabled: boolean
  pulseSpeed: number
  glowLevel: number
  showWireframe: boolean
  showDots: boolean
  showLinks: boolean
  globeOpacity: number
  dotBrightness: number
}
```

### Constants (from constants.ts)
| Name | Value |
|---|---|
| GLOBE_RADIUS | 300 |
| DOT_COUNT | 2400 |
| DEFAULT_CAM_DIST | (dist for overview) |
| FOCUS_CAM_DIST | (dist for fly-to) |

### Key Utils Used
| Util | Purpose |
|---|---|
| fibonacciSphere(n) | Evenly distribute n dots on sphere |
| computeGlobePositions(nodes) | Lat/lng → 3D XYZ |
| greatCircleArc(a, b) | Arc points between two nodes |
| getConnected(node, links) | Adjacent node IDs |
| parseColorToHex(str) | Color normalization |

### Init Flow
1. Create scene, camera, renderer → mount canvas to container
2. Build globe mesh + wireframe + dot particles
3. For each node → create Sprite + glow Sprite + HTML label
4. For each link → compute greatCircleArc → THREE.Line
5. Setup EffectComposer with UnrealBloomPass
6. Setup Raycaster + pointer event listeners
7. Start requestAnimationFrame loop

### Animate Loop (per frame)
- Update OrbitControls
- Pulse: oscillate glowMesh scale via sin(t)
- Toggle wireframe / dots / links visibility
- Update globeMesh opacity
- Raycaster: detect hovered node → highlight
- composer.render() (bloom output)

---

# fly_wasd

## Status: 🟢 done
## Prod: src/lib/renderers/GlobeWASD.ts

### Class: GlobeWASD

```ts
class GlobeWASD {
  camera: THREE.Camera
  controls: OrbitControls
  state: WASDState
  onFlyTo?: () => void
  autoRotateSetting: boolean

  constructor(camera, controls, options?)
  // attaches: keydown, keyup, blur → window
  // per-frame call:
  update(delta: number): void
  destroy(): void
}
```

### WASDState
```ts
interface WASDState {
  keys: Record<string, boolean>
  speed: number
  maxSpeed: number      // 4.0
  accelRate: number     // 1.6
  boostRate: number     // 4.8
  brakeRate: number     // 6.0
  friction: number      // 1.2
  rotX: number
  rotY: number
  active: boolean
  _wasMoving: boolean
}
```

### Update Logic
```
boost = Shift held → use boostRate else accelRate
any WASD held → speed += rate * delta (capped at maxSpeed)
Q held       → speed -= brakeRate * delta
no keys      → speed -= friction * delta (floor 0)
if speed > 0:
  compute direction quaternion from rotX/rotY + key combo
  camera.position updated along direction * speed * delta
  _wasMoving = true
if speed == 0 && _wasMoving:
  onFlyTo?.()
  restore controls.autoRotate = autoRotateSetting
  _wasMoving = false
```

### Gate Conditions
```ts
// keydown handler ignores when:
target instanceof HTMLInputElement || HTMLTextAreaElement
// update ignores when:
!isGlobeActive || isSearchActive
```
