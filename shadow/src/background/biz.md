# render_particles

## Status: 🟢 done
## Prod: src/lib/renderers/ParticleBackground.ts + src/components/background/

Domain: animated canvas background — decorative visual layers driven by theme + audio
Canvas: 2D, full-viewport, z-index below UI
Effect layers (9):
  stars        — static/twinkling points, density-scaled
  mesh lines   — connecting lines between nearby stars
  embers       — rising orange/red particles (fire/void themes)
  snowflakes   — falling white particles (winter/rain themes)
  nebula       — large blurred color clouds
  glitter      — small sparkle bursts
  shooting stars — fast diagonal streaks
  lightning    — branching bolt paths
  plasma waves — sine-wave color bands

Overlay components:
  Scanline.svelte   — CRT scanline overlay (CSS)
  Corners.svelte    — bracket corner decorations (SVG/CSS)
  BorderMagic.svelte — animated border effect (9 theme variants + black hole)

Border stores: borderEnabled, borderIntensity(0-1), borderSpeed(0-1)
Black hole stores: blackholeEnabled, blackholeSize, blackholeSpeed, blackholeGlow, blackholeWidth, blackholeHeight, blackholeHue

Control flow:
  master show* bool → enable/disable layer
  effectDensity → particle count per layer
  effectSpeed   → animation frame delta multiplier
  audio bands   → real-time density/glow modulation (if mic active)
