# effects — Business Rules

## Status: 🟢 done
## Prod: src/lib/renderers/Globe*.ts (5 files)

---

## show_comets
| Rule | Detail |
|------|--------|
| Trigger | WASD movement only (flight mode) |
| Count | 8 trails, always fixed |
| Behavior | Trails follow camera direction on globe surface |
| Fade | Each trail fades toward tail (max points cap) |
| Shape | Colored line on sphere surface |
| Off | Inactive when not flying |

---

## show_electric
| Rule | Detail |
|------|--------|
| Layers | 6: arcs, aura, orbit rings, core glow, wisps, spark burst |
| Themes | 9 color palettes (theme-specific) |
| Toggles | showElectricArcs, showPlasmaAura, showSparkBurst |
| Intensity | electricArcIntensity, electricArcSpeed, electricArcCount |
| Speed | electricOrbitSpeed |
| Glow | electricCoreGlow |
| Sparks | sparkBurstIntensity, sparkBurstRate |

---

## node_effects (explosion + pulse + trail)
| Sub-effect | Trigger | Behavior |
|------------|---------|----------|
| explosion | node click | 40-particle burst at node position |
| pulse | link exists | glowing orbs travel along link lines |
| trail | camera move | gold breadcrumb line, max 30 points |

---

## auto_tour
| Rule | Detail |
|------|--------|
| Mode | Sequential node fly-through |
| Order | Visits nodes one by one |
| Camera | Uses flyTo() on GlobeRenderer |
| Event | Emits `kg:tour-toggled` custom event |
| Data dep | graphNodes list |

---

## show_fireworks
| Rule | Detail |
|------|--------|
| Sequence | Rocket launch → burst → particle fall |
| Gravity | Particles affected by gravity |
| Fire | Middle fire effect (optional toggle) |
| Colors | Rainbow (fireworksColorful) or hue-locked (fireworksHue) |
| Toggles | fireworksEnabled, fireworksMiddleFire, fireworksColorful, fireworksNoLimit |
| Tuning | fireworksSpeed, fireworksLaunchRate, fireworksBurstSize |
