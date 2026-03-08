# render_particles

## Status: 🟢 done
## Prod: src/lib/renderers/ParticleBackground.ts

init creates canvas context:
  pb.init(mockCanvas)
  expect(mockCanvas.getContext).toHaveBeenCalledWith('2d')

layers respect show* flags:
  showEmbers.set(false)
  pb.tick()
  expect(ctx.arc).not.toHaveBeenCalledWith(/* ember signature */)

  showEmbers.set(true)
  pb.tick()
  expect(ctx.arc).toHaveBeenCalled()

density scales particle count:
  effectDensity.set(1)
  pb.spawnAll()
  count_low = pb.particles.get('stars').length
  effectDensity.set(20)
  pb.spawnAll()
  count_high = pb.particles.get('stars').length
  expect(count_high).toBeGreaterThan(count_low)

speed scales delta:
  effectSpeed.set(1)
  delta_low = pb.computeDelta()
  effectSpeed.set(20)
  delta_high = pb.computeDelta()
  expect(delta_high).toBeGreaterThan(delta_low)

snowflakes respawn at top after reaching bottom:
  flake.y = canvas.height + 1
  pb.updateSnowflakes()
  expect(flake.y).toBeLessThan(0)   // reset above viewport

lightning generates branching path:
  segments = pb.buildLightning(0, 0, -90, 5)
  expect(segments.length).toBeGreaterThan(1)

destroy cancels animation loop:
  pb.init(canvas); pb.destroy()
  expect(cancelAnimationFrame).toHaveBeenCalled()

BorderMagic renders 9 theme styles without throwing:
  ['dark','light','fire','winter','galaxy','electric','void','aurora','rain']
    .forEach(t => expect(() => BORDER_STYLES[t]()).not.toThrow())
