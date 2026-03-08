# apply_theme

## Status: 🟢 done
## Prod: src/lib/stores/appState.ts + src/app.css + src/lib/stores/themeEffects.ts

Domain: visual identity — color palette + effect layer configuration
Themes (9): dark | light | fire | winter | galaxy | electric | void | aurora | rain
CSS contract: [data-theme="X"] custom properties on :root scoped selector
Effect system: 37 stores in themeEffects.ts; each theme drives different defaults

Master controls:
  effectDensity (0–20): global particle count multiplier
  effectSpeed   (0–20): global animation speed multiplier

Background layer toggles (8 bool stores):
  showNebula | showGlitter | showShootingStars | showEmbers
  showSnowflakes | showLightning | showBgStars | showBgMesh

Rules:
- theme change → setAttribute on documentElement → CSS cascade applies palette
- theme change also → update themeEffects stores to per-theme defaults
- density/speed overrides persist across theme changes (user preference)
- color palettes used in canvas renderers (Electric, Fireworks, Particle) must match CSS theme name
- "void" theme = all background toggles off by default
- "rain" theme = showSnowflakes on, showEmbers off, showLightning on
