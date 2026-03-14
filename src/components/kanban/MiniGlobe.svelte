<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import * as THREE from 'three';
  import { graphNodes, graphLinks } from '../../lib/stores/graphData';
  import { CATEGORIES, GLOBE_RADIUS } from '../../lib/constants';
  import { computeGlobePositions, greatCircleArc } from '../../lib/utils/sphere';
  import type { GraphNode } from '../../lib/types';

  let canvas: HTMLCanvasElement;
  let animId: number | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let scene: THREE.Scene | null = null;
  let camera: THREE.PerspectiveCamera | null = null;

  const R = GLOBE_RADIUS;

  onMount(() => {
    if (!canvas) return;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000811, 1);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, W / H, 1, 5000);
    camera.position.set(0, 0, 900);

    // Dot sphere (background particles)
    const dotCount = 1200;
    const dotGeo = new THREE.BufferGeometry();
    const dotPos = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = R * 1.02;
      dotPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      dotPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dotPos[i * 3 + 2] = r * Math.cos(phi);
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3));
    const dotMat = new THREE.PointsMaterial({
      size: 1.2,
      color: 0x334455,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(dotGeo, dotMat));

    // Core glow
    const glowGeo = new THREE.SphereGeometry(R * 0.25, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xccddff,
      transparent: true,
      opacity: 0.06,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Ring outlines
    const ringGeo = new THREE.RingGeometry(R * 0.98, R * 1.0, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x223344, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring1);
    const ring2 = ring1.clone();
    ring2.rotation.x = Math.PI / 2;
    scene.add(ring2);

    // Build real node positions + links
    buildScene();

    function loop() {
      animId = requestAnimationFrame(loop);
      if (!renderer || !scene || !camera) return;
      scene.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    loop();
  });

  function buildScene() {
    if (!scene) return;
    const nodes = get(graphNodes);
    const links = get(graphLinks);
    if (nodes.length === 0) return;

    // Use the same positioning as the real globe
    const positions = computeGlobePositions(nodes);

    // Node points
    const posArr: number[] = [];
    const colArr: number[] = [];

    const nodeMap = new Map<string, GraphNode>();
    for (const n of nodes) nodeMap.set(n.id, n);

    for (const node of nodes) {
      const p = positions[node.id];
      if (!p) continue;
      posArr.push(p.x * R, p.y * R, p.z * R);
      const catColor = CATEGORIES[node.cat]?.color || '#888888';
      const c = new THREE.Color(catColor);
      colArr.push(c.r, c.g, c.b);
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(posArr, 3));
    nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colArr, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(nodeGeo, nodeMat));

    // Connection lines (great-circle arcs)
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (const link of links) {
      const sid = typeof link.source === 'string' ? link.source : (link.source as GraphNode).id;
      const tid = typeof link.target === 'string' ? link.target : (link.target as GraphNode).id;
      const sp = positions[sid];
      const tp = positions[tid];
      if (!sp || !tp) continue;

      const arcPts = greatCircleArc(
        { x: sp.x * R, y: sp.y * R, z: sp.z * R },
        { x: tp.x * R, y: tp.y * R, z: tp.z * R },
        R,
        8,
      );

      const sNode = nodeMap.get(sid);
      const col = new THREE.Color(CATEGORIES[sNode?.cat ?? '']?.color || '#334466');

      for (let i = 0; i < arcPts.length - 1; i++) {
        linePositions.push(arcPts[i].x, arcPts[i].y, arcPts[i].z);
        linePositions.push(arcPts[i + 1].x, arcPts[i + 1].y, arcPts[i + 1].z);
        lineColors.push(col.r, col.g, col.b);
        lineColors.push(col.r, col.g, col.b);
      }
    }

    if (linePositions.length > 0) {
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      scene.add(new THREE.LineSegments(lineGeo, lineMat));
    }
  }

  onDestroy(() => {
    if (animId !== null) cancelAnimationFrame(animId);
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }
    renderer = null;
    scene = null;
    camera = null;
  });
</script>

<canvas bind:this={canvas} class="mini-globe-canvas"></canvas>

<style>
  .mini-globe-canvas {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 9px;
  }
</style>
