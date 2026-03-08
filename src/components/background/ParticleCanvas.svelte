<script lang="ts">
  import { onMount } from 'svelte';
  import { ParticleBackground } from '../../lib/renderers/ParticleBackground';

  let canvasEl: HTMLCanvasElement;
  let renderer: ParticleBackground | null = null;

  onMount(() => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

    renderer = new ParticleBackground(canvasEl);
    renderer.start();

    const onResize = () => {
      renderer?.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Re-read CSS colour on theme change
    const observer = new MutationObserver(() => {
      renderer?.updateColor();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      renderer?.dispose();
      window.removeEventListener('resize', onResize);
      observer.disconnect();
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
