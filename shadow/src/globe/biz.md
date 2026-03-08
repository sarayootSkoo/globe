# render_scene

## Status: 🟢 done
## Prod: src/lib/renderers/GlobeRenderer.ts

- Renders interactive 3D globe with Three.js
- Nodes = sprite meshes at geo positions; links = great-circle arc lines
- Post-processing bloom (UnrealBloomPass) for visual depth
- Hover/click via Raycaster → node selection, fly-to animation
- Search heatmap rings highlight results on globe surface
- Category filter hides/shows node meshes + links
- Theme transitions update material colors at runtime

### Inputs
| Param | Type | Purpose |
|---|---|---|
| container | HTMLElement | Mount target for WebGL canvas |
| nodes | NodeMeshEntry[] | Sprite + label + glow per node |
| links | LinkData[] | Source/target pairs for arcs |

### AnimateParams (runtime toggles)
| Field | Effect |
|---|---|
| pulseEnabled / pulseSpeed | Node glow pulsing |
| glowLevel | Bloom intensity |
| showWireframe / showDots | Globe surface layers |
| showLinks | Arc visibility |
| globeOpacity | Sphere material alpha |
| dotBrightness | Fibonacci dot brightness |

---

# fly_wasd

## Status: 🟢 done
## Prod: src/lib/renderers/GlobeWASD.ts

- Lets user fly around globe with keyboard (game-style WASD)
- Physics model: acceleration → max speed → friction deceleration
- Boost (Shift) triples acceleration; brake (Q) rapid deceleration
- Ignores keypresses when focus is on INPUT/TEXTAREA
- Gated: only active when globe is active AND search is not active
- Fires onFlyTo callback when speed returns to 0 after movement
- Restores OrbitControls autoRotate when flight ends

### Key Bindings
| Key | Action |
|---|---|
| W | Forward |
| A | Left |
| S | Back |
| D | Right |
| Q | Brake |
| Shift | Boost |

### Physics Constants
| Constant | Value |
|---|---|
| accelRate | 1.6 /s |
| boostRate | 4.8 /s |
| brakeRate | 6.0 /s |
| friction | 1.2 /s |
| maxSpeed | 4.0 |
