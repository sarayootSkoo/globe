# apply_theme

## Status: 🟢 done
## Prod: src/lib/stores/appState.ts + src/lib/stores/themeEffects.ts

setTheme applies data-theme attribute:
  setTheme('fire')
  document.documentElement.getAttribute('data-theme') === 'fire'

setTheme updates theme store:
  setTheme('winter')
  get(theme) === 'winter'

each theme sets correct effect defaults:
  setTheme('void') → all show* stores === false
  setTheme('rain') → showSnowflakes === true, showLightning === true, showEmbers === false
  setTheme('fire') → showEmbers === true
  setTheme('galaxy') → showBgStars && showNebula && showShootingStars === true

density/speed persist across theme switch:
  effectDensity.set(15)
  setTheme('light')
  get(effectDensity) === 15   // not reset by theme change

all 9 theme names recognized (no fallback to undefined):
  THEMES = ['dark','light','fire','winter','galaxy','electric','void','aurora','rain']
  THEMES.forEach(t => expect(THEME_DEFAULTS[t]).toBeDefined())

canvas renderers accept all 9 theme names without throwing:
  ['Electric','Fireworks','Particle'].forEach(R => new R('fire').getPalette() !== undefined)
