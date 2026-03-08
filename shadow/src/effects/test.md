# effects — Test Plan

## Status: 🟢 done
## Prod: src/lib/renderers/Globe*.ts (5 files)

---

## show_comets

| # | Scenario | Assert |
|---|----------|--------|
| 1 | WASD held → trails appear | 8 Line objects in scene |
| 2 | WASD released → trails freeze/hide | no new points added |
| 3 | Trail length cap | points.length <= maxPoints |
| 4 | Each trail unique color | materials[i].color !== materials[j].color |
| 5 | dispose() → removes all from scene | scene.children excludes comet lines |

---

## show_electric

| # | Scenario | Assert |
|---|----------|--------|
| 1 | showElectricArcs=true → arc group visible | group.visible === true |
| 2 | showElectricArcs=false → hidden | group.visible === false |
| 3 | showPlasmaAura toggle | aura mesh visibility matches store |
| 4 | electricArcCount change → rebuild | arc children.length === new count |
| 5 | Theme switch → colors update | arc material.color matches palette[theme].arc |
| 6 | showSparkBurst=true → burst group active | burst group visible |
| 7 | sparkBurstRate → interval frequency | spy on setInterval call arg |
| 8 | dispose() → clears all 6 layers | scene.children empty of electric objects |

---

## node_effects

### explosion
| # | Scenario | Assert |
|---|----------|--------|
| 1 | Node click → 40 particles spawned | particles.length === 40 |
| 2 | update() over time → particles fade | all particles removed after lifetime |
| 3 | dispose() → pool cleared | scene has no explosion particles |

### pulse
| # | Scenario | Assert |
|---|----------|--------|
| 1 | Link added → orb spawned | orb in scene |
| 2 | update() → orb advances along curve | orb.position changes each frame |
| 3 | t>=1 → orb removed or loops | orb not frozen at endpoint |

### trail
| # | Scenario | Assert |
|---|----------|--------|
| 1 | Camera moves → points accumulate | trail.points.length increases |
| 2 | Exceeds 30 points → oldest dropped | trail.points.length <= 30 |
| 3 | Color is gold | material.color.getHexString() === 'ffd700' (approx) |

---

## auto_tour

| # | Scenario | Assert |
|---|----------|--------|
| 1 | Start tour → flyTo called with node[0] | flyTo spy called with graphNodes[0] |
| 2 | After arrival → flyTo called with node[1] | flyTo spy called with graphNodes[1] |
| 3 | Wraps at end → back to node[0] | idx resets to 0 |
| 4 | Toggle emits event | `kg:tour-toggled` event dispatched |
| 5 | Stop tour → no further flyTo calls | flyTo not called after stop |

---

## show_fireworks

| # | Scenario | Assert |
|---|----------|--------|
| 1 | fireworksEnabled=true → rockets launch | rocket Mesh added to scene |
| 2 | Rocket reaches apex → burst spawned | particles > 0 after apex |
| 3 | fireworksBurstSize=20 → 20 particles | particles.length === 20 |
| 4 | fireworksMiddleFire=true → fire cone present | fire particle group in scene |
| 5 | fireworksColorful=true → varied hues | particle colors not all equal |
| 6 | fireworksNoLimit=false → cap enforced | concurrent rockets <= max |
| 7 | Particles fall over time | y position decreases each update |
| 8 | Lifetime expired → removed from scene | dead particles not in scene.children |
| 9 | dispose() → all rockets + particles cleared | scene clean |

---

## Shared: init/update/dispose contract

| # | Scenario | Assert |
|---|----------|--------|
| 1 | init() before update() → no error | no throw |
| 2 | dispose() called twice → no error | idempotent |
| 3 | update(0) → no division by zero | no NaN in positions |
