# render_particles

## Status: 🟢 done
## Prod: src/lib/renderers/ParticleBackground.ts (~550 lines)

class ParticleBackground:
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  particles: Map<string, Particle[]>   // keyed by layer name
  rafId: number
  stores: Unsubscriber[]               // themeEffects subscriptions

  init(canvas):
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.subscribeStores()
    this.spawnAll()
    this.loop()

  loop():
    requestAnimationFrame(() => {
      ctx.clearRect(0,0,w,h)
      if showBgStars      → drawStars()
      if showBgMesh       → drawMesh()
      if showEmbers       → drawEmbers()
      if showSnowflakes   → drawSnowflakes()
      if showNebula       → drawNebula()
      if showGlitter      → drawGlitter()
      if showShootingStars→ drawShootingStars()
      if showLightning    → drawLightning()
                            drawPlasma()    // always on, opacity 0 if unused
      this.loop()
    })

  drawStars(): each star → ctx.arc + fillStyle(rgba) + density/speed from stores
  drawMesh():  pairs within distance threshold → ctx.lineTo, opacity by dist
  drawEmbers(): particles rise, fade, wrap; color from theme palette
  drawSnowflakes(): fall + horizontal drift; respawn at top
  drawNebula(): large radialGradient blobs, slow drift
  drawGlitter(): random sparkle(x,y,r,opacity), short lifespan
  drawShootingStars(): diagonal trail, one at a time, random interval
  drawLightning(): recursive branch(x,y,angle,depth) with ctx.stroke
  drawPlasma(): Math.sin wave across rows, hsl color cycling

// ParticleCanvas.svelte
  onMount: pb = new ParticleBackground(); pb.init(canvasEl)
  onDestroy: pb.destroy()

// BorderMagic.svelte — border variants by theme
  BORDER_STYLES: Record<string, () => string> = {
    dark: () => 'box-shadow: 0 0 ...',
    fire: () => 'animation: fireGlow ...',
    // ...9 themes
  }
  blackhole: CSS clip-path + keyframe rotation when blackholeEnabled

// Scanline.svelte: position:fixed overlay, repeating-linear-gradient, pointer-events:none
// Corners.svelte:  4 absolutely-positioned SVG bracket elements
