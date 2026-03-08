<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import * as THREE from 'three';
  import { GlobeRenderer } from '../../lib/renderers/GlobeRenderer';
  import { GlobeWASD } from '../../lib/renderers/GlobeWASD';
  import { GlobeCometTrails } from '../../lib/renderers/GlobeCometTrails';
  import { GlobeElectricArcs } from '../../lib/renderers/GlobeElectricArcs';
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { glowLevel, selectedNodeId, theme, activeCats } from '../../lib/stores/appState';
  import * as fx from '../../lib/stores/themeEffects';
  import { searchMatched } from '../../lib/stores/searchState';
  import * as globeStore from '../../lib/stores/globeState';
  import { showPreview } from '../../lib/stores/previewState';
  import type { GraphNode, WASDKeys } from '../../lib/types';

  // ── Props ──────────────────────────────────────────────────────────────────
  interface Props {
    onwasdupdate?: (detail: { keys: WASDKeys; speed: number }) => void;
  }
  let { onwasdupdate }: Props = $props();

  // ── DOM bindings ─────────────────────────────────────────────────────────────
  let canvas: HTMLCanvasElement;
  let labelContainer: HTMLDivElement;

  // ── Renderer instances ───────────────────────────────────────────────────────
  let renderer: GlobeRenderer | null = null;
  let wasd: GlobeWASD | null = null;
  let comets: GlobeCometTrails | null = null;
  let electricArcs: GlobeElectricArcs | null = null;

  // ── Reactive state that mirrors stores ───────────────────────────────────────
  let visible = $state(true);   // drives class:show — true = globe layout active

  // ── Animation loop handle ────────────────────────────────────────────────────
  let animId: number | null = null;

  // ── Resize handler ───────────────────────────────────────────────────────────
  let _resizeHandler: (() => void) | null = null;

  // ---------------------------------------------------------------------------
  // onMount — create renderer and wire everything together
  // ---------------------------------------------------------------------------
  onMount(() => {
    renderer     = new GlobeRenderer(canvas);
    wasd         = new GlobeWASD(renderer.camera, renderer.controls);
    comets       = new GlobeCometTrails(renderer.scene);
    electricArcs = new GlobeElectricArcs(renderer.scene);

    // ── Wire renderer callbacks ─────────────────────────────────────────────

    renderer.onNodeClick = (node: GraphNode | null) => {
      if (node) {
        selectedNodeId.set(node.id);
        globeStore.lockedNode.set(node);
      } else {
        selectedNodeId.set(null);
        globeStore.lockedNode.set(null);
      }
    };

    renderer.onNodeUnlock = () => {
      selectedNodeId.set(null);
      globeStore.lockedNode.set(null);
    };

    // WASD flyTo: forward the request to the renderer
    wasd.onFlyTo = (pos, dist) => renderer?.flyTo(pos, dist);

    // ── Configure WASD gate functions ───────────────────────────────────────
    // Globe is always the active layout in this app (single layout)
    wasd.isGlobeActive = () => true;
    wasd.isSearchActive = () => {
      const m = get(searchMatched);
      return m !== null && m.size > 0;
    };

    // ── Load data into renderer when stores are populated ───────────────────
    const unsubNodes = graphNodes.subscribe(nodes => {
      if (!renderer || !nodes.length) return;
      const links  = get(graphLinks);
      const glow   = get(glowLevel);
      renderer.updateNodes(nodes, links, labelContainer, glow);
    });

    const unsubLinks = graphLinks.subscribe(links => {
      if (!renderer) return;
      const nodes = get(graphNodes);
      if (!nodes.length) return;
      const glow = get(glowLevel);
      renderer.updateNodes(nodes, links, labelContainer, glow);
    });

    // ── React to search changes ─────────────────────────────────────────────
    const unsubSearch = searchMatched.subscribe(matched => {
      if (!renderer) return;
      if (matched && matched.size > 0) {
        renderer.search(matched);
        if (wasd) wasd.isSearchActive = () => true;
      } else {
        renderer.clearSearch();
        if (wasd) wasd.isSearchActive = () => false;
      }
    });

    // ── React to glow level changes ─────────────────────────────────────────
    const unsubGlow = glowLevel.subscribe(level => {
      renderer?.updateGlow(level);
    });

    // ── React to theme changes ──────────────────────────────────────────────
    const unsubTheme = theme.subscribe(t => {
      renderer?.updateTheme(t);
      electricArcs?.setEnabled(t === 'electric');
    });

    // ── Electric arc effect stores ────────────────────────────────────────
    const unsubElecArcs = fx.showElectricArcs.subscribe(v => {
      electricArcs?.setShowArcs(v);
    });
    const unsubPlasmaAura = fx.showPlasmaAura.subscribe(v => {
      electricArcs?.setShowAura(v);
    });
    const unsubElecInt = fx.electricArcIntensity.subscribe(v => {
      electricArcs?.setIntensity(v);
    });
    const unsubElecSpd = fx.electricArcSpeed.subscribe(v => {
      electricArcs?.setSpeed(v);
    });
    const unsubElecCnt = fx.electricArcCount.subscribe(v => {
      electricArcs?.setArcCount(v);
    });
    const unsubElecOrbit = fx.electricOrbitSpeed.subscribe(v => {
      electricArcs?.setOrbitSpeed(v);
    });
    const unsubElecCore = fx.electricCoreGlow.subscribe(v => {
      electricArcs?.setCoreGlow(v);
    });
    const unsubSparkBurst = fx.showSparkBurst.subscribe(v => {
      electricArcs?.setShowSparkBurst(v);
    });
    const unsubSparkInt = fx.sparkBurstIntensity.subscribe(v => {
      electricArcs?.setSparkIntensity(v);
    });
    const unsubSparkRate = fx.sparkBurstRate.subscribe(v => {
      electricArcs?.setSparkRate(v);
    });

    // ── React to autoRotate store ────────────────────────────────────────────
    const unsubAutoRotate = globeStore.autoRotate.subscribe(v => {
      if (renderer) renderer.controls.autoRotate = v;
      if (wasd) wasd.autoRotateSetting = v;
    });

    // ── React to rotateSpeed store ───────────────────────────────────────────
    const unsubRotateSpeed = globeStore.rotateSpeed.subscribe(v => {
      if (renderer) renderer.controls.autoRotateSpeed = v;
    });

    // ── React to cometEnabled store ──────────────────────────────────────────
    const unsubComet = globeStore.cometEnabled.subscribe(v => {
      if (comets) comets.setEnabled(v);
    });

    // ── React to category filter changes ─────────────────────────────────────
    const unsubCats = activeCats.subscribe(cats => {
      renderer?.filterCategories(cats);
    });

    // ── Listen for kg:flyto from search results table ─────────────────────
    const handleFlyTo = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!renderer || !detail?.nodeId) return;
      const nodeId = detail.nodeId as string;

      // Find the node mesh entry which has the actual 3D position
      const entry = renderer.nodeMeshes.find(g => g.data.id === nodeId);
      if (!entry) return;

      const nodePos = entry.mesh.position.clone().normalize();
      const targetCamPos = nodePos.multiplyScalar(650);
      renderer.flyTo(targetCamPos, 650);

      // Lock onto the node
      selectedNodeId.set(nodeId);
      globeStore.lockedNode.set(entry.data);
      renderer.lockedNode = entry.data;
      renderer.hovered = entry.data;
      renderer.controls.autoRotate = false;
    };
    document.addEventListener('kg:flyto', handleFlyTo);

    // ── Resize ───────────────────────────────────────────────────────────────
    _resizeHandler = () => renderer?.resize();
    window.addEventListener('resize', _resizeHandler);

    // ── Animation loop ───────────────────────────────────────────────────────
    function loop(ts: number): void {
      animId = requestAnimationFrame(loop);

      if (!renderer) return;

      // Read current store values for this frame
      const autoRotateVal   = get(globeStore.autoRotate);
      const searchActiveVal = (() => { const m = get(searchMatched); return m !== null && m.size > 0; })();

      // ── WASD update ────────────────────────────────────────────────────────
      if (wasd) {
        const dt = 0.016;
        wasd.update(dt, searchActiveVal, autoRotateVal);

        // Emit WASD state to parent for HUD display
        if (onwasdupdate) {
          onwasdupdate({ keys: { ...wasd.state.keys }, speed: wasd.state.speed });
        }
      }

      // ── Electric arcs update ──────────────────────────────────────────────
      if (electricArcs) {
        electricArcs.update(0.016);
      }

      // ── Comet trails update ────────────────────────────────────────────────
      if (comets && wasd) {
        comets.update(
          0.016,
          wasd.state.speed,
          wasd.state.rotX,
          wasd.state.rotY,
        );
      }

      // ── Main render ────────────────────────────────────────────────────────
      renderer.animate(ts, {
        pulseEnabled: get(globeStore.pulseEnabled),
        pulseSpeed:   get(globeStore.pulseSpeed),
        glowLevel:    get(glowLevel),
        showWireframe: get(globeStore.showWireframe),
        showDots:      get(globeStore.showDots),
        showLinks:     get(globeStore.showLinks),
        globeOpacity:  get(globeStore.globeOpacity),
      });
    }

    animId = requestAnimationFrame(loop);

    // Return cleanup
    return () => {
      unsubNodes();
      unsubLinks();
      unsubSearch();
      unsubGlow();
      unsubTheme();
      unsubAutoRotate();
      unsubRotateSpeed();
      unsubComet();
      unsubCats();
      unsubElecArcs();
      unsubPlasmaAura();
      unsubElecInt();
      unsubElecSpd();
      unsubElecCnt();
      unsubElecOrbit();
      unsubElecCore();
      unsubSparkBurst();
      unsubSparkInt();
      unsubSparkRate();
      document.removeEventListener('kg:flyto', handleFlyTo);
    };
  });

  // ---------------------------------------------------------------------------
  // onDestroy — dispose Three.js resources
  // ---------------------------------------------------------------------------
  onDestroy(() => {
    if (animId !== null) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    if (_resizeHandler) {
      window.removeEventListener('resize', _resizeHandler);
    }
    renderer?.dispose();
    wasd?.dispose();
    comets?.dispose();
    electricArcs?.dispose();
  });

  // ---------------------------------------------------------------------------
  // Canvas event handlers
  // ---------------------------------------------------------------------------
  function handleMouseMove(e: MouseEvent): void {
    renderer?.handleMouseMove(e);
  }

  function handleClick(): void {
    renderer?.handleClick();
  }

  function handleMouseLeave(): void {
    renderer?.handleMouseLeave();
  }
</script>

<!-- Globe canvas — Three.js renders directly into this element -->
<canvas
  bind:this={canvas}
  id="globe-canvas"
  class:show={visible}
  onmousemove={handleMouseMove}
  onclick={handleClick}
  onmouseleave={handleMouseLeave}
></canvas>

<!-- Floating DOM label container — positioned absolutely over the canvas -->
<div bind:this={labelContainer} id="globe-label-container" class:show={visible}></div>

<style>
  /* ── Globe 3D Canvas ───────────────────────────── */
  #globe-canvas {
    position: fixed;
    inset: 0;
    z-index: 2;
    display: none;
    cursor: grab;
  }
  #globe-canvas:active {
    cursor: grabbing;
  }
  #globe-canvas.show {
    display: block;
  }

  /* ── Globe Labels ──────────────────────────────── */
  :global(.globe-label) {
    position: absolute;
    pointer-events: none;
    font-family: 'Courier New', monospace;
    font-size: 9px;
    letter-spacing: 0.5px;
    white-space: nowrap;
    text-shadow: 0 0 8px currentColor;
    opacity: 0;
    transition: opacity 0.2s;
    transform: translate(-50%, -100%);
    padding-bottom: 4px;
  }

  #globe-label-container {
    position: fixed;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    display: none;
  }
  #globe-label-container.show {
    display: block;
  }
</style>
