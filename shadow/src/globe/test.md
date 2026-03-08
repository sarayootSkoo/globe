# render_scene

## Status: 🟢 done
## Prod: src/lib/renderers/GlobeRenderer.ts

### Test Scope
| Area | What to verify |
|---|---|
| init() | Canvas mounted, scene/camera/renderer created |
| Nodes | Sprite + glowMesh created per node; labelEl injected to DOM |
| Links | Line created per link; arc points via greatCircleArc |
| Dots | Points object with DOT_COUNT(2400) vertices |
| Wireframe | LineSegments added to scene |
| Bloom | EffectComposer + UnrealBloomPass attached |
| Raycaster | Hovered node gets highlight state |
| animate() | toggles: wireframe, dots, links, opacity |
| Pulse | glowMesh scale oscillates when pulseEnabled=true |
| dispose() | renderer disposed, labels removed from DOM |

### Mock Strategy
```ts
vi.mock('three')          // mock Scene, Camera, WebGLRenderer, etc.
vi.mock('three/examples/jsm/controls/OrbitControls')
vi.mock('three/examples/jsm/postprocessing/EffectComposer')
vi.mock('$lib/utils', () => ({
  fibonacciSphere: vi.fn(() => [/* stub points */]),
  computeGlobePositions: vi.fn(nodes => nodes.map(() => new THREE.Vector3())),
  greatCircleArc: vi.fn(() => []),
  getConnected: vi.fn(() => []),
  parseColorToHex: vi.fn(c => c),
}))
```

### Key Test Cases
```
init()
  ✓ appends <canvas> to container
  ✓ creates NodeMeshEntry for each input node
  ✓ creates Line for each input link
  ✓ dot particles vertex count === DOT_COUNT

animate({ showDots: false })
  ✓ dotParticles.visible === false

animate({ pulseEnabled: true, pulseSpeed: 1 })
  ✓ glowMesh.scale changes between frames

animate({ globeOpacity: 0.5 })
  ✓ globeMesh.material.opacity === 0.5

hover node (raycaster intersect)
  ✓ intersected node mesh gets highlight material

dispose()
  ✓ renderer.dispose() called
  ✓ labelEl removed from document.body
```

---

# fly_wasd

## Status: 🟢 done
## Prod: src/lib/renderers/GlobeWASD.ts

### Test Scope
| Area | What to verify |
|---|---|
| Keydown/Keyup | state.keys updated correctly |
| Input gate | keypresses ignored inside INPUT/TEXTAREA |
| Globe gate | update() no-op when !isGlobeActive |
| Search gate | update() no-op when isSearchActive |
| Acceleration | speed increases with WASD held |
| Boost | speed increases faster with Shift held |
| Brake | Q key decelerates speed |
| Friction | speed decreases without any key |
| Max speed | speed capped at maxSpeed(4.0) |
| Camera move | camera.position changes when speed > 0 |
| onFlyTo cb | fired when speed returns to 0 after movement |
| autoRotate | restored on flight end |
| destroy() | event listeners removed |

### Mock Strategy
```ts
const mockCamera = { position: new THREE.Vector3(), quaternion: new THREE.Quaternion() }
const mockControls = { autoRotate: false, update: vi.fn() }

// simulate keypress
window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }))
wasd.update(0.016)  // one frame
```

### Key Test Cases
```
keydown 'w' → state.keys.w === true
keyup  'w'  → state.keys.w === false

keydown inside INPUT → state.keys unchanged

isGlobeActive=false → update() returns early, camera unchanged

W held, update(0.1)
  ✓ state.speed > 0
  ✓ camera.position !== original

Shift+W held, update(0.1)
  ✓ state.speed > W-only speed (boostRate > accelRate)

Q held when speed=3.0, update(0.1)
  ✓ state.speed < 3.0

no keys held, speed=2.0, update(0.1)
  ✓ state.speed < 2.0 (friction)

speed hits 0 after _wasMoving=true
  ✓ onFlyTo called once
  ✓ controls.autoRotate restored

destroy()
  ✓ subsequent keydown events do not update state
```
