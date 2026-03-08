# apply_theme

## Status: 🟢 done
## Prod: src/lib/stores/appState.ts + src/lib/stores/themeEffects.ts + src/app.css

// appState.ts
theme: writable<string>('dark')

setTheme(name: string):
  theme.set(name)
  document.documentElement.setAttribute('data-theme', name)
  applyThemeEffects(name)   // in themeEffects.ts

// themeEffects.ts — 37 stores
effectDensity: writable<number>(10)
effectSpeed:   writable<number>(10)
showNebula:          writable<boolean>
showGlitter:         writable<boolean>
showShootingStars:   writable<boolean>
showEmbers:          writable<boolean>
showSnowflakes:      writable<boolean>
showLightning:       writable<boolean>
showBgStars:         writable<boolean>
showBgMesh:          writable<boolean>
// ...+27 more effect-specific stores

THEME_DEFAULTS: Record<string, Partial<EffectConfig>> = {
  dark:     { showBgStars:true,  showNebula:true,  showGlitter:false, ... },
  light:    { showBgMesh:true,   showBgStars:false, ... },
  fire:     { showEmbers:true,   showLightning:false, ... },
  winter:   { showSnowflakes:true, showEmbers:false, ... },
  galaxy:   { showBgStars:true,  showNebula:true,  showShootingStars:true, ... },
  electric: { showLightning:true, showBgMesh:true, ... },
  void:     { /* all off */ },
  aurora:   { showNebula:true,   showShootingStars:true, showBgStars:true, ... },
  rain:     { showSnowflakes:true, showLightning:true, showEmbers:false, ... },
}

applyThemeEffects(name):
  cfg = THEME_DEFAULTS[name] ?? {}
  showNebula.set(cfg.showNebula ?? false)
  showGlitter.set(cfg.showGlitter ?? false)
  // ... apply each store

// app.css (853 lines)
[data-theme="dark"]    { --bg: #0a0a0f; --fg: #e8e8f0; --accent: #7c5cbf; ... }
[data-theme="light"]   { --bg: #f5f5fa; --fg: #1a1a2e; --accent: #5b3fa0; ... }
[data-theme="fire"]    { --bg: #1a0500; --fg: #ff8c42; --accent: #ff4500; ... }
// ...etc
