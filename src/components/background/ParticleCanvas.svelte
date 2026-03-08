<script lang="ts">
  import { onMount } from 'svelte';
  import { ParticleBackground } from '../../lib/renderers/ParticleBackground';
  import type { ParticleTheme } from '../../lib/renderers/ParticleBackground';
  import * as fx from '../../lib/stores/themeEffects';

  let canvasEl: HTMLCanvasElement;
  let renderer: ParticleBackground | null = null;

  onMount(() => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    renderer = new ParticleBackground(canvasEl);
    // Set initial theme from DOM
    const initTheme = (document.documentElement.dataset.theme || 'dark') as ParticleTheme;
    renderer.setTheme(initTheme);
    renderer.start();

    const onResize = () => {
      renderer?.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Re-read CSS colour and theme on data-theme change
    const observer = new MutationObserver(() => {
      const t = (document.documentElement.dataset.theme || 'dark') as ParticleTheme;
      renderer?.setTheme(t);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Subscribe to effect control stores
    const unsubs = [
      fx.effectDensity.subscribe(v    => renderer?.updateSettings({ density: v })),
      fx.effectSpeed.subscribe(v      => renderer?.updateSettings({ speed: v })),
      fx.showNebula.subscribe(v       => renderer?.updateSettings({ showNebula: v })),
      fx.showGlitter.subscribe(v      => renderer?.updateSettings({ showGlitter: v })),
      fx.showShootingStars.subscribe(v => renderer?.updateSettings({ showShootingStars: v })),
      fx.showEmbers.subscribe(v       => renderer?.updateSettings({ showEmbers: v })),
      fx.showSnowflakes.subscribe(v   => renderer?.updateSettings({ showSnowflakes: v })),
      fx.showBgStars.subscribe(v      => renderer?.updateSettings({ showBgStars: v })),
      fx.showBgMesh.subscribe(v       => renderer?.updateSettings({ showBgMesh: v })),
    ];

    return () => {
      renderer?.dispose();
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      unsubs.forEach(u => u());
    };
  });
</script>

<canvas id="particles" bind:this={canvasEl}></canvas>

<style>
  #particles {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
</style>
