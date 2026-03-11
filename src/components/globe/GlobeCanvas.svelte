<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import * as THREE from 'three';
  import { GlobeRenderer } from '../../lib/renderers/GlobeRenderer';
  import { GlobeWASD } from '../../lib/renderers/GlobeWASD';
  import { GlobeCometTrails } from '../../lib/renderers/GlobeCometTrails';
  import { GlobeElectricArcs } from '../../lib/renderers/GlobeElectricArcs';
  import { GlobeNodeExplosion } from '../../lib/renderers/GlobeNodeExplosion';
  import { GlobeConnectionPulse } from '../../lib/renderers/GlobeConnectionPulse';
  import { GlobeNodeTrail } from '../../lib/renderers/GlobeNodeTrail';
  import { GlobeAutoTour } from '../../lib/renderers/GlobeAutoTour';
  import { GlobeFireworks } from '../../lib/renderers/GlobeFireworks';
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { glowLevel, selectedNodeId, theme, activeCats, currentMode } from '../../lib/stores/appState';
  import * as fx from '../../lib/stores/themeEffects';
  import { searchMatched } from '../../lib/stores/searchState';
  import { impactNodeId, impactHopMap } from '../../lib/stores/impactState';
  import * as globeStore from '../../lib/stores/globeState';
  import { showPreview } from '../../lib/stores/previewState';
  import { showStatusBadges } from '../../lib/stores/statusState';
  import { showCrossRepo, crossRepoFilter } from '../../lib/stores/crossRepoState';
  import type { GraphNode, GraphLink, WASDKeys } from '../../lib/types';

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
  let nodeExplosion: GlobeNodeExplosion | null = null;
  let connectionPulse: GlobeConnectionPulse | null = null;
  let nodeTrail: GlobeNodeTrail | null = null;
  let autoTour: GlobeAutoTour | null = null;
  let fireworks: GlobeFireworks | null = null;

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
    nodeExplosion   = new GlobeNodeExplosion(renderer.scene);
    connectionPulse = new GlobeConnectionPulse(renderer.scene);
    nodeTrail       = new GlobeNodeTrail(renderer.scene);
    fireworks    = new GlobeFireworks(renderer.scene);
    autoTour = new GlobeAutoTour({
      flyTo: (pos, dist) => renderer?.flyTo(pos, dist),
      onNodeFocus: (node) => {
        selectedNodeId.set(node.id);
        globeStore.lockedNode.set(node);
        if (renderer) {
          renderer.lockedNode = node;
          renderer.hovered = node;
          renderer.controls.autoRotate = false;
        }
      },
      onTourEnd: () => {},
      getZoomDistance: () => {
        // Convert zoomLevel (10–100) → camera distance (1660–400)
        const z = get(globeStore.zoomLevel);
        return 1800 - (z / 100) * 1400;
      },
    });

    // ── Wire renderer callbacks ─────────────────────────────────────────────

    renderer.onNodeClick = (node: GraphNode | null) => {
      if (node) {
        selectedNodeId.set(node.id);
        globeStore.lockedNode.set(node);

        // Explosion effect
        const entry = renderer!.nodeMeshes.find(g => g.data.id === node.id);
        if (entry && nodeExplosion) {
          const color = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00d4ff');
          nodeExplosion.explode(entry.mesh.position.clone(), color);
        }

        // Pulse wave to connected nodes
        if (entry && connectionPulse && node.connections) {
          const targets: THREE.Vector3[] = [];
          for (const connId of node.connections) {
            const connEntry = renderer!.nodeMeshes.find(g => g.data.id === connId);
            if (connEntry) targets.push(connEntry.mesh.position.clone());
          }
          if (targets.length > 0) {
            const color = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00d4ff');
            connectionPulse.fire(entry.mesh.position.clone(), targets, color);
          }
        }

        // Node trail
        if (entry && nodeTrail) {
          nodeTrail.addPoint(entry.mesh.position.clone());
        }
      } else {
        selectedNodeId.set(null);
        globeStore.lockedNode.set(null);
        nodeTrail?.clear();
      }
    };

    renderer.onNodeUnlock = () => {
      selectedNodeId.set(null);
      globeStore.lockedNode.set(null);
      nodeTrail?.clear();
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

    // ── React to impact mode changes ────────────────────────────────────────
    const unsubImpact = impactHopMap.subscribe(hopMap => {
      if (!renderer) return;
      const mode = get(currentMode);
      const nid  = get(impactNodeId);
      if (mode === 'impact' && nid && hopMap.size > 0) {
        renderer.highlightImpact(hopMap);
      } else if (mode !== 'impact') {
        renderer.clearImpact();
      }
    });

    const unsubImpactMode = currentMode.subscribe(mode => {
      if (!renderer) return;
      if (mode !== 'impact') {
        renderer.clearImpact();
      } else {
        // Re-apply if we just entered impact mode
        const hopMap = get(impactHopMap);
        if (hopMap.size > 0) renderer.highlightImpact(hopMap);
      }
    });

    // ── React to status badge toggle ─────────────────────────────────────────
    const unsubStatusBadges = showStatusBadges.subscribe(visible => {
      if (!renderer) return;
      if (visible) {
        const nodes = get(graphNodes);
        renderer.updateStatusBadges(nodes);
        renderer.showStatusBadges(true);
      } else {
        renderer.clearStatusBadges();
      }
    });

    // ── React to cross-repo highlight changes ────────────────────────────────
    function applyCrossRepo(): void {
      if (!renderer) return;
      const crOn     = get(showCrossRepo);
      const crFilter = get(crossRepoFilter);
      const allNodes = get(graphNodes);
      const allLinks = get(graphLinks);

      if (!crOn) {
        renderer.clearCrossRepo();
        return;
      }

      // Build nodeId→cat map
      const nodeById = new Map(allNodes.map(n => [n.id, n]));

      // Determine which links are cross-repo (and optionally filtered to one pair)
      const crossRepoNodeIds = new Set<string>();
      const crossRepoLinkIndices = new Set<number>();

      renderer.linkLines.forEach((line, idx) => {
        const l = line.userData['linkData'] as GraphLink | undefined;
        if (!l) return;
        const sid = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
        const tid = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
        const sn  = nodeById.get(sid);
        const tn  = nodeById.get(tid);
        if (!sn || !tn || sn.cat === tn.cat) return;

        // If a filter is active, only include this pair
        if (crFilter) {
          // Build the canonical pair key the same way CrossRepoPanel does
          const dir = l.direction ?? 'bidirectional';
          const displaySrc = dir === 'backward' ? tn.cat : sn.cat;
          const displayTgt = dir === 'backward' ? sn.cat : tn.cat;
          const key = `${displaySrc}\u2192${displayTgt}`;
          if (key !== crFilter) return;
        }

        crossRepoLinkIndices.add(idx);
        crossRepoNodeIds.add(sid);
        crossRepoNodeIds.add(tid);
      });

      renderer.highlightCrossRepo(crossRepoNodeIds, crossRepoLinkIndices);
    }

    const unsubCrossRepo = showCrossRepo.subscribe(() => {
      applyCrossRepo();
    });
    const unsubCrossRepoFilter = crossRepoFilter.subscribe(() => {
      applyCrossRepo();
    });

    // ── React to glow level changes ─────────────────────────────────────────
    const unsubGlow = glowLevel.subscribe(level => {
      renderer?.updateGlow(level);
    });

    // ── React to theme changes ──────────────────────────────────────────────
    const unsubTheme = theme.subscribe(t => {
      renderer?.updateTheme(t);
      electricArcs?.setTheme(t);
      electricArcs?.setEnabled(true);
      fireworks?.setTheme(t);
      // Auto-toggle polygon planet with polygon theme
      globeStore.showPolygonPlanet.set(t === 'polygon');
    });

    // ── Polygon gradient hue — shift background gradient color ─────────────
    const unsubPolyGradHue = fx.polyGradHue.subscribe(hue => {
      if (hue === 0) {
        // Default: restore original gradient colors
        document.documentElement.style.setProperty('--polygon-grad-top', '#4ac0a8');
        document.documentElement.style.setProperty('--polygon-grad-bottom', '#6030b0');
      } else {
        // Hue-shift: generate new gradient colors from hue
        document.documentElement.style.setProperty('--polygon-grad-top', `hsl(${hue}, 55%, 52%)`);
        document.documentElement.style.setProperty('--polygon-grad-bottom', `hsl(${(hue + 120) % 360}, 60%, 40%)`);
      }
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

    // ── Fireworks effect stores ───────────────────────────────────────────
    const unsubFwEnabled = fx.fireworksEnabled.subscribe(v => {
      fireworks?.setEnabled(v);
    });
    const unsubFwSpeed = fx.fireworksSpeed.subscribe(v => {
      fireworks?.setSpeed(v);
    });
    const unsubFwRate = fx.fireworksLaunchRate.subscribe(v => {
      fireworks?.setLaunchRate(v);
    });
    const unsubFwSize = fx.fireworksBurstSize.subscribe(v => {
      fireworks?.setBurstSize(v);
    });
    const unsubFwMiddle = fx.fireworksMiddleFire.subscribe(v => {
      fireworks?.setMiddleFire(v);
    });
    const unsubFwColorful = fx.fireworksColorful.subscribe(v => {
      fireworks?.setColorful(v);
    });
    const unsubFwNoLimit = fx.fireworksNoLimit.subscribe(v => {
      fireworks?.setNoLimit(v);
    });
    const unsubFwHue = fx.fireworksHue.subscribe(v => {
      fireworks?.setPickedHue(v);
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

    // ── React to zoomLevel store ──────────────────────────────────────────────
    let zoomFirst = true; // skip initial fire to avoid flyTo on mount
    const unsubZoom = globeStore.zoomLevel.subscribe(v => {
      if (zoomFirst) { zoomFirst = false; return; }
      renderer?.setZoom(v);
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

    // ── Listen for kg:autotour events ─────────────────────────────────────
    const handleAutoTour = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!renderer || !autoTour) return;
      if (detail?.action === 'start' || (detail?.action === 'toggle' && !autoTour.active)) {
        const tourNodes = renderer.nodeMeshes.map(entry => ({
          data: entry.data,
          position: entry.mesh.position.clone(),
        }));
        autoTour.start(tourNodes);
        document.dispatchEvent(new CustomEvent('kg:tour-toggled'));
      } else if (detail?.action === 'stop' || (detail?.action === 'toggle' && autoTour.active)) {
        autoTour.stop();
        renderer?.resetPosition();
        document.dispatchEvent(new CustomEvent('kg:tour-toggled'));
      }
    };
    document.addEventListener('kg:autotour', handleAutoTour);

    // ── Listen for kg:reset to clear trail ────────────────────────────────
    const handleReset = () => {
      nodeTrail?.clear();
      selectedNodeId.set(null);
      globeStore.lockedNode.set(null);
    };
    document.addEventListener('kg:reset', handleReset);

    // ── Tour speed subscription ───────────────────────────────────────────
    const unsubTourSpeed = globeStore.tourSpeed.subscribe(v => {
      // v is multiplier: 1 = 3s, 2 = 1.5s, 0.5 = 6s
      if (autoTour) autoTour.setPauseDuration(3 / Math.max(0.1, v));
    });

    // ── Tour random mode subscription ────────────────────────────────────
    const unsubTourRandom = globeStore.tourRandom.subscribe(v => {
      if (autoTour) autoTour.setRandom(v);
    });

    // ── Bloom post-processing subscription ──────────────────────────────────
    const unsubBloom = fx.bloomEnabled.subscribe(v => {
      if (!renderer) return;
      renderer.setBloom(v, get(fx.bloomStrength), get(fx.bloomRadius), get(fx.bloomThreshold));
    });
    const unsubBloomParams = fx.bloomStrength.subscribe(() => {
      if (!renderer) return;
      renderer.updateBloom(get(fx.bloomStrength), get(fx.bloomRadius), get(fx.bloomThreshold));
    });
    const unsubBloomR = fx.bloomRadius.subscribe(() => {
      if (!renderer) return;
      renderer.updateBloom(get(fx.bloomStrength), get(fx.bloomRadius), get(fx.bloomThreshold));
    });
    const unsubBloomT = fx.bloomThreshold.subscribe(() => {
      if (!renderer) return;
      renderer.updateBloom(get(fx.bloomStrength), get(fx.bloomRadius), get(fx.bloomThreshold));
    });

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

      // ── Node explosion update ─────────────────────────────────────────────
      if (nodeExplosion) nodeExplosion.update(0.016);

      // ── Connection pulse update ───────────────────────────────────────────
      if (connectionPulse) connectionPulse.update(0.016);

      // ── Fireworks update ──────────────────────────────────────────────────
      if (fireworks) fireworks.update(0.016);

      // ── Auto tour update ──────────────────────────────────────────────────
      if (autoTour) autoTour.update(0.016);

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
        dotBrightness: get(globeStore.dotBrightness),
        showPolygonPlanet: get(globeStore.showPolygonPlanet),
        polyPulseSpeed: get(fx.polyPulseSpeed),
        polyPlanetSize: get(fx.polyPlanetSize),
      });
    }

    animId = requestAnimationFrame(loop);

    // Return cleanup
    return () => {
      unsubNodes();
      unsubLinks();
      unsubSearch();
      unsubImpact();
      unsubImpactMode();
      unsubStatusBadges();
      unsubCrossRepo();
      unsubCrossRepoFilter();
      unsubGlow();
      unsubTheme();
      unsubAutoRotate();
      unsubRotateSpeed();
      unsubZoom();
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
      unsubFwEnabled();
      unsubFwSpeed();
      unsubFwRate();
      unsubFwSize();
      unsubFwMiddle();
      unsubFwColorful();
      unsubFwNoLimit();
      unsubFwHue();
      document.removeEventListener('kg:flyto', handleFlyTo);
      document.removeEventListener('kg:autotour', handleAutoTour);
      document.removeEventListener('kg:reset', handleReset);
      unsubTourSpeed();
      unsubTourRandom();
      unsubBloom();
      unsubBloomParams();
      unsubBloomR();
      unsubBloomT();
      unsubPolyGradHue();
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
    fireworks?.dispose();
    nodeExplosion?.dispose();
    connectionPulse?.dispose();
    nodeTrail?.dispose();
    autoTour?.dispose();
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
