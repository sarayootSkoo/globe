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
  let globeGroup: THREE.Group | null = null;

  // Drag rotation
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  let rotX = 0;
  let rotY = 0;
  let autoRotate = true;

  const R = GLOBE_RADIUS;

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
    autoRotate = false;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !globeGroup) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    rotY += dx * 0.005;
    rotX += dy * 0.005;
    rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotX));
    prevX = e.clientX;
    prevY = e.clientY;
  }

  function handleMouseUp() {
    isDragging = false;
    // Resume auto-rotate after 3 seconds of no drag
    setTimeout(() => { if (!isDragging) autoRotate = true; }, 3000);
  }

  onMount(() => {
    if (!canvas) return;
    const W = canvas.clientWidth || 256;
    const H = canvas.clientHeight || 256;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000811, 1);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, W / H, 1, 5000);
    camera.position.set(0, 0, 900);

    globeGroup = new THREE.Group();
    scene.add(globeGroup);

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
    globeGroup.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({
      size: 1.2, color: 0x334455, transparent: true, opacity: 0.3,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // Core glow
    const glowGeo = new THREE.SphereGeometry(R * 0.25, 16, 16);
    globeGroup.add(new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({
      color: 0xccddff, transparent: true, opacity: 0.06,
    })));

    // Wireframe rings
    const ringGeo = new THREE.TorusGeometry(R, 0.5, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x223344, transparent: true, opacity: 0.1 });
    globeGroup.add(new THREE.Mesh(ringGeo, ringMat));
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 2;
    globeGroup.add(ring2);

    buildScene();

    function loop() {
      animId = requestAnimationFrame(loop);
      if (!renderer || !scene || !camera || !globeGroup) return;
      if (autoRotate) rotY += 0.002;
      globeGroup.rotation.y = rotY;
      globeGroup.rotation.x = rotX;
      renderer.render(scene, camera);
    }
    loop();
  });

  function buildScene() {
    if (!globeGroup) return;
    const nodes = get(graphNodes);
    const links = get(graphLinks);
    if (nodes.length === 0) return;

    const positions = computeGlobePositions(nodes);
    const nodeMap = new Map<string, GraphNode>();
    for (const n of nodes) nodeMap.set(n.id, n);

    // Node points
    const posArr: number[] = [];
    const colArr: number[] = [];
    for (const node of nodes) {
      const p = positions[node.id];
      if (!p) continue;
      posArr.push(p.x * R, p.y * R, p.z * R);
      const c = new THREE.Color(CATEGORIES[node.cat]?.color || '#888888');
      colArr.push(c.r, c.g, c.b);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(posArr, 3));
    nodeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colArr, 3));
    globeGroup.add(new THREE.Points(nodeGeo, new THREE.PointsMaterial({
      size: 5, vertexColors: true, transparent: true, opacity: 0.9,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    // Connection lines
    const linePos: number[] = [];
    const lineCol: number[] = [];
    for (const link of links) {
      const sid = typeof link.source === 'string' ? link.source : (link.source as GraphNode).id;
      const tid = typeof link.target === 'string' ? link.target : (link.target as GraphNode).id;
      const sp = positions[sid], tp = positions[tid];
      if (!sp || !tp) continue;
      const arcPts = greatCircleArc(
        { x: sp.x * R, y: sp.y * R, z: sp.z * R },
        { x: tp.x * R, y: tp.y * R, z: tp.z * R },
        R, 8,
      );
      const col = new THREE.Color(CATEGORIES[nodeMap.get(sid)?.cat ?? '']?.color || '#334466');
      for (let i = 0; i < arcPts.length - 1; i++) {
        linePos.push(arcPts[i].x, arcPts[i].y, arcPts[i].z);
        linePos.push(arcPts[i + 1].x, arcPts[i + 1].y, arcPts[i + 1].z);
        lineCol.push(col.r, col.g, col.b, col.r, col.g, col.b);
      }
    }
    if (linePos.length > 0) {
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
      lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineCol, 3));
      globeGroup.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0.12,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })));
    }
  }

  onDestroy(() => {
    if (animId !== null) cancelAnimationFrame(animId);
    if (renderer) { renderer.dispose(); renderer.forceContextLoss(); }
    renderer = null; scene = null; camera = null; globeGroup = null;
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<canvas
  bind:this={canvas}
  class="mini-globe-canvas"
  onmousedown={handleMouseDown}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseUp}
></canvas>

<style>
  .mini-globe-canvas {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 9px;
    cursor: grab;
  }
  .mini-globe-canvas:active {
    cursor: grabbing;
  }
</style>
