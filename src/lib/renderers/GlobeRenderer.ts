/**
 * GlobeRenderer — Three.js 3D globe visualization for the knowledge graph.
 *
 * Extracted and converted from knowledge-graph.html (lines ~2300-3333).
 * Handles all globe rendering: dot sphere, wireframe, sprite nodes,
 * great-circle arc links, pulse animation, hover/click/fly-to, search
 * highlighting with heatmap rings, category filtering, and theme updates.
 *
 * WASD and comet trail logic live in separate files and are NOT included here.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import type { GraphNode, GraphLink } from '../types';
import { CATEGORIES, GLOBE_RADIUS, DOT_COUNT, DEFAULT_CAM_DIST, FOCUS_CAM_DIST } from '../constants';
import { parseColorToHex } from '../utils/color';
import { fibonacciSphere, computeGlobePositions, greatCircleArc } from '../utils/sphere';
import { getConnected } from '../utils/graph';

// ---------------------------------------------------------------------------
// Internal types
// ---------------------------------------------------------------------------

export interface NodeMeshEntry {
  mesh: THREE.Sprite;
  data: GraphNode;
  labelEl: HTMLElement;
  glowMesh: THREE.Sprite;
  glowMat: THREE.SpriteMaterial;
  mat: THREE.SpriteMaterial;
  /** Unscaled sprite radius in world units (half the sprite scale). */
  baseRadius: number;
}

/**
 * Parameters passed from the Svelte component into `animate()` each frame so
 * the renderer does not need to read Svelte stores directly.
 */
export interface AnimateParams {
  pulseEnabled: boolean;
  pulseSpeed: number;
  glowLevel: number;
  showWireframe: boolean;
  showDots: boolean;
  showLinks: boolean;
}

// ---------------------------------------------------------------------------
// GlobeRenderer
// ---------------------------------------------------------------------------

export class GlobeRenderer {
  // ── Three.js core ──────────────────────────────────────────────────────────
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;

  // ── Globe elements ─────────────────────────────────────────────────────────
  nodeMeshes: NodeMeshEntry[] = [];
  linkLines: THREE.Line[] = [];
  dotParticles: THREE.Points | null = null;
  wireframe: THREE.Mesh | null = null;

  // ── Interaction state ──────────────────────────────────────────────────────
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  hovered: GraphNode | null = null;
  lockedNode: GraphNode | null = null;

  // ── Animation state ────────────────────────────────────────────────────────
  animId: number | null = null;
  pulseTime: number = 0;

  // ── Search state ───────────────────────────────────────────────────────────
  searchMatched: Set<string> | null = null;

  // ── Fly-to animation ───────────────────────────────────────────────────────
  _flyAnimId: number | null = null;

  // ── Heatmap rings ──────────────────────────────────────────────────────────
  _heatmapRings: THREE.Line[] = [];

  // ── Cached textures ────────────────────────────────────────────────────────
  _dotTexture: THREE.CanvasTexture | null = null;
  _glowTexture: THREE.CanvasTexture | null = null;

  // ── Callbacks set by the Svelte component ─────────────────────────────────
  onNodeHover: ((node: GraphNode | null) => void) | null = null;
  onNodeClick: ((node: GraphNode | null) => void) | null = null;
  onNodeUnlock: (() => void) | null = null;

  // ── Internal: label container reference ───────────────────────────────────
  private _labelContainer: HTMLElement | null = null;

  // ── Internal: stored links for connected-node lookup ─────────────────────
  private _links: GraphLink[] = [];

  // ── Internal: last timestamp for delta-time calculation ──────────────────
  private _lastTime: number = 0;

  // ── Internal: last glowLevel used (for resets without passing params) ─────
  private _glowLevel: number = 0.35;

  // ---------------------------------------------------------------------------
  // Constructor
  // ---------------------------------------------------------------------------

  constructor(canvas: HTMLCanvasElement) {
    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── Renderer ──────────────────────────────────────────────────────────────
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(W, H);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0); // transparent — body bg shows through

    // ── Scene ─────────────────────────────────────────────────────────────────
    this.scene = new THREE.Scene();

    // ── Camera ────────────────────────────────────────────────────────────────
    this.camera = new THREE.PerspectiveCamera(50, W / H, 1, 5000);
    this.camera.position.set(0, 0, DEFAULT_CAM_DIST);

    // ── Orbit Controls ────────────────────────────────────────────────────────
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.35;
    this.controls.minDistance = 400;
    this.controls.maxDistance = 1800;
    this.controls.zoomSpeed = 0.8;

    // ── Lighting ──────────────────────────────────────────────────────────────
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dirLight = new THREE.DirectionalLight(0x00d4ff, 0.6);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);

    // ── Static globe geometry ─────────────────────────────────────────────────
    this._buildDotSphere();
    this._buildWireframe();

    // ── Raycaster + mouse ─────────────────────────────────────────────────────
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-9999, -9999);
  }

  // ---------------------------------------------------------------------------
  // Initialization helpers
  // ---------------------------------------------------------------------------

  private _buildDotSphere(): void {
    const positions: number[] = [];
    const colors: number[] = [];
    const R = GLOBE_RADIUS;

    const pts = fibonacciSphere(DOT_COUNT);
    pts.forEach(({ x, y, z }) => {
      positions.push(x * R, y * R, z * R);
      // Gradient: cyan (top, y=1) → purple (bottom, y=-1)
      const t = (y + 1) / 2; // 0..1
      const cr = Math.round(t * 0   + (1 - t) * 168) / 255;
      const cg = Math.round(t * 212 + (1 - t) * 85)  / 255;
      const cb = Math.round(t * 255 + (1 - t) * 247)  / 255;
      colors.push(cr, cg, cb);
    });

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('color',    new THREE.Float32BufferAttribute(colors,    3));

    const mat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.dotParticles = new THREE.Points(geom, mat);
    this.scene.add(this.dotParticles);
  }

  private _buildWireframe(): void {
    const geo = new THREE.IcosahedronGeometry(GLOBE_RADIUS, 3);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.wireframe = new THREE.Mesh(geo, mat);
    this.scene.add(this.wireframe);
  }

  /** Solid circle with soft anti-aliased edge — used for node dots. */
  private _createDotTexture(size: number): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;

    const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
    grad.addColorStop(0,    '#ffffff');
    grad.addColorStop(0.65, '#ffffff');
    grad.addColorStop(0.78, '#ffffffcc');
    grad.addColorStop(0.92, '#ffffff44');
    grad.addColorStop(1,    '#ffffff00');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cx, cx, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  /** Soft glow ring — used as the node halo sprite. */
  private _createGlowRingTexture(size: number): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;

    const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
    grad.addColorStop(0,    '#ffffff00');
    grad.addColorStop(0.25, '#ffffff08');
    grad.addColorStop(0.5,  '#ffffff22');
    grad.addColorStop(0.7,  '#ffffff18');
    grad.addColorStop(1,    '#ffffff00');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cx, cx, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  // ---------------------------------------------------------------------------
  // Node / link management
  // ---------------------------------------------------------------------------

  /**
   * (Re)builds all node sprites, glow rings, link lines, and DOM labels.
   * Call whenever the graph data changes or on first show.
   *
   * @param nodes       Full node array.
   * @param links       Full link array.
   * @param labelContainer  The DOM element that holds floating labels.
   * @param glowLevel   Current glow intensity (0–1) — used to set initial
   *                    glow opacity.
   */
  updateNodes(
    nodes: GraphNode[],
    links: GraphLink[],
    labelContainer: HTMLElement,
    glowLevel: number = 0.35,
  ): void {
    this._links = links;
    this._labelContainer = labelContainer;
    this._glowLevel = glowLevel;

    // ── Dispose old sprites + labels ─────────────────────────────────────────
    this.nodeMeshes.forEach(({ mesh, labelEl }) => {
      this.scene.remove(mesh);
      if ((mesh as THREE.Sprite).material) (mesh as THREE.Sprite).material.dispose();
      if (labelEl.parentNode) labelEl.parentNode.removeChild(labelEl);
    });
    this.nodeMeshes = [];

    // ── Dispose old link lines ────────────────────────────────────────────────
    this.linkLines.forEach(obj => {
      this.scene.remove(obj);
      obj.geometry.dispose();
      (obj.material as THREE.Material).dispose();
    });
    this.linkLines = [];

    labelContainer.innerHTML = '';

    // ── Assign 3D positions ───────────────────────────────────────────────────
    const R = GLOBE_RADIUS;
    const positions = computeGlobePositions(nodes);

    nodes.forEach(n => {
      const p = positions[n.id] || { x: 0, y: 1, z: 0 };
      n._gx = p.x * R;
      n._gy = p.y * R;
      n._gz = p.z * R;
    });

    // ── Ensure textures exist ─────────────────────────────────────────────────
    if (!this._dotTexture)  this._dotTexture  = this._createDotTexture(128);
    if (!this._glowTexture) this._glowTexture = this._createGlowRingTexture(128);

    // ── Build sprite per node ─────────────────────────────────────────────────
    nodes.forEach(n => {
      const cat = CATEGORIES[n.cat] || CATEGORIES['meta'];
      const colorHex = parseColorToHex(cat.color);
      const r = Math.min(14, 4 + (n.refs || 0) * 1.5);

      // Solid dot sprite (always faces camera)
      const mat = new THREE.SpriteMaterial({
        map: this._dotTexture!,
        color: colorHex,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const mesh = new THREE.Sprite(mat);
      mesh.position.set(n._gx!, n._gy!, n._gz!);
      mesh.scale.setScalar(r * 2);
      mesh.userData['nodeData'] = n;
      this.scene.add(mesh);

      // Glow ring around dot
      const glowMat = new THREE.SpriteMaterial({
        map: this._glowTexture!,
        color: colorHex,
        transparent: true,
        opacity: 0.06 + 0.12 * glowLevel,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const glowMesh = new THREE.Sprite(glowMat);
      glowMesh.scale.setScalar(r * (2.2 + 1.0 * glowLevel));
      mesh.add(glowMesh);

      // DOM label
      const label = document.createElement('div');
      label.className = 'globe-label';
      label.textContent = n.label;
      label.style.color = cat.color;
      label.style.opacity = '0';
      labelContainer.appendChild(label);

      this.nodeMeshes.push({ mesh, data: n, labelEl: label, glowMesh, glowMat, mat, baseRadius: r });
    });

    // ── Build great-circle arc lines ──────────────────────────────────────────
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    links.forEach(l => {
      const sid = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tid = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      const s = nodeMap.get(sid);
      const t = nodeMap.get(tid);
      if (!s || !t) return;

      const arcPts = greatCircleArc(
        { x: s._gx!, y: s._gy!, z: s._gz! },
        { x: t._gx!, y: t._gy!, z: t._gz! },
        GLOBE_RADIUS,
        20,
      );

      const geo = new THREE.BufferGeometry().setFromPoints(
        arcPts.map(p => new THREE.Vector3(p.x, p.y, p.z)),
      );
      const sCat = CATEGORIES[s.cat] || CATEGORIES['meta'];
      const lineMat = new THREE.LineBasicMaterial({
        color: parseColorToHex(sCat.color),
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, lineMat);
      line.userData['linkData'] = l;
      this.scene.add(line);
      this.linkLines.push(line);
    });
  }

  // ---------------------------------------------------------------------------
  // Animation loop
  // ---------------------------------------------------------------------------

  /**
   * Main render loop.  Should be called with `requestAnimationFrame`.
   * The Svelte component passes the current UI state on each frame so this
   * class never reads Svelte stores directly.
   */
  animate(timestamp: number, params: AnimateParams): void {
    // Delta time
    if (!this._lastTime) this._lastTime = timestamp;
    const dt = Math.min((timestamp - this._lastTime) / 1000, 0.1);
    this._lastTime = timestamp;

    this._glowLevel = params.glowLevel;

    this.controls.update();

    // ── Visibility toggles ─────────────────────────────────────────────────
    if (this.wireframe)    this.wireframe.visible    = params.showWireframe;
    if (this.dotParticles) this.dotParticles.visible = params.showDots;
    this.linkLines.forEach(l => { l.visible = params.showLinks; });

    // ── Pulse animation ────────────────────────────────────────────────────
    if (params.pulseEnabled && !this.hovered) {
      this.pulseTime += dt * params.pulseSpeed * Math.PI * 2;
      const gl = params.glowLevel;
      const hasSearchMatch = this.searchMatched !== null && this.searchMatched.size > 0;

      this.nodeMeshes.forEach(({ mesh, mat, glowMat, glowMesh, data, baseRadius }, idx) => {
        const isSearchHit = hasSearchMatch && this.searchMatched!.has(data.id);
        const br = (baseRadius || 6) * 2; // sprite base scale

        if (hasSearchMatch && !isSearchHit) {
          // Non-matched during search: stay dimmed, no pulse
          return;
        }

        // Phase offset per node for organic wave effect
        const phase = this.pulseTime + idx * 0.35;
        const p = Math.sin(phase);

        if (isSearchHit) {
          // SEARCH HIT: strong beacon pulse
          const fastPhase = this.pulseTime * 1.8 + idx * 0.5;
          const sp = Math.sin(fastPhase);

          mesh.scale.setScalar(br * (1 + sp * 0.35));
          mat.opacity = 0.85 + sp * 0.15;
          glowMat.opacity = 0.15 + sp * 0.15;
          glowMesh.scale.setScalar(1.3 + sp * 0.4);
        } else {
          // Normal ambient pulse
          mesh.scale.setScalar(br * (1 + p * 0.06));
          mat.opacity = 0.9 + p * 0.1 * gl;

          const baseGlowOp = 0.06 + 0.12 * gl;
          glowMat.opacity = baseGlowOp + p * 0.04 * gl;
        }
      });

      // Dot sphere subtle breathing
      if (this.dotParticles && params.showDots) {
        const dotPulse = Math.sin(this.pulseTime * 0.7);
        (this.dotParticles.material as THREE.PointsMaterial).opacity =
          (0.25 + 0.25 * params.glowLevel) + dotPulse * 0.05;
        const dotScale = 1 + dotPulse * 0.005;
        this.dotParticles.scale.setScalar(dotScale);
      }

      // Wireframe subtle pulse
      if (this.wireframe && params.showWireframe) {
        const wirePulse = Math.sin(this.pulseTime * 0.5);
        (this.wireframe.material as THREE.MeshBasicMaterial).opacity =
          (0.02 + 0.04 * params.glowLevel) + wirePulse * 0.008;
      }
    }

    // ── Raycasting for hover ───────────────────────────────────────────────
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const meshes = this.nodeMeshes.map(g => g.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, false);

    if (this.lockedNode) {
      // While locked: only update cursor, don't change highlights
      if (intersects.length > 0) {
        this.hovered = (intersects[0].object as THREE.Sprite).userData['nodeData'] as GraphNode;
      } else {
        this.hovered = null;
      }
    } else if (intersects.length > 0) {
      const hitData = (intersects[0].object as THREE.Sprite).userData['nodeData'] as GraphNode;
      if (hitData && hitData !== this.hovered) {
        this._handleHoverEnd();
        this.hovered = hitData;
        this._handleHoverStart(hitData);
      }
    } else {
      if (this.hovered) {
        this._handleHoverEnd();
      }
    }

    // ── DOM label positions ────────────────────────────────────────────────
    if (this._labelContainer) {
      this._updateLabels(this._labelContainer);
    }

    // ── Heatmap ring animation ─────────────────────────────────────────────
    if (this._heatmapRings.length > 0) {
      this._animateHeatmapRings(this.pulseTime);
    }

    this.renderer.render(this.scene, this.camera);
  }

  // ---------------------------------------------------------------------------
  // Hover / click
  // ---------------------------------------------------------------------------

  private _handleHoverStart(d: GraphNode): void {
    const connected = getConnected(d.id, this._links);

    this.nodeMeshes.forEach(({ mesh, data, mat, glowMat, glowMesh, baseRadius }) => {
      const isThis = data.id === d.id;
      const isConn = connected.has(data.id);
      const br = (baseRadius || 6) * 2;

      if (isThis) {
        mat.opacity = 1;
        mesh.scale.setScalar(br * 1.3);
        glowMat.opacity = 0.2;
        glowMesh.scale.setScalar(1.3);
      } else if (isConn) {
        mat.opacity = 0.9;
        mesh.scale.setScalar(br);
      } else {
        mat.opacity = 0.15;
        mesh.scale.setScalar(br * 0.8);
      }
    });

    // Highlight connected links
    this.linkLines.forEach(line => {
      const l = line.userData['linkData'] as GraphLink | undefined;
      if (!l) return;
      const sid = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tid = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      (line.material as THREE.LineBasicMaterial).opacity =
        (sid === d.id || tid === d.id) ? 0.6 : 0.01;
    });

    // Show label for hovered node
    const entry = this.nodeMeshes.find(g => g.data.id === d.id);
    if (entry?.labelEl) entry.labelEl.style.opacity = '1';

    // Notify Svelte component
    this.onNodeHover?.(d);
  }

  private _handleHoverEnd(): void {
    if (!this.hovered) return;
    this.hovered = null;

    // Don't reset visuals when a node is locked (click-selected)
    if (this.lockedNode) return;

    const gl = this._glowLevel;

    this.nodeMeshes.forEach(({ mesh, mat, glowMat, glowMesh, baseRadius }) => {
      const br = (baseRadius || 6) * 2;
      mat.opacity = 0.95;
      glowMat.opacity = 0.06 + 0.12 * gl;
      glowMesh.scale.setScalar(1);
      mesh.scale.setScalar(br);
    });

    this.linkLines.forEach(line => {
      (line.material as THREE.LineBasicMaterial).opacity = 0.07;
    });

    // Hide all labels
    this.nodeMeshes.forEach(({ labelEl }) => {
      if (labelEl) labelEl.style.opacity = '0';
    });

    this.onNodeHover?.(null);
  }

  /**
   * Called from the canvas `click` event binding in the Svelte component.
   * Locks/unlocks the selected node and triggers fly-to animations.
   */
  handleClick(): void {
    if (this.hovered) {
      // ── Click on node: lock + stop auto-rotate + fly to focus ─────────────
      this.lockedNode = this.hovered;
      this.controls.autoRotate = false;

      // Keep hover highlight locked (dims unrelated nodes)
      this._handleHoverStart(this.hovered);

      // Show labels for connected nodes too
      const connected = getConnected(this.hovered.id, this._links);
      this.nodeMeshes.forEach(({ data, labelEl }) => {
        if (labelEl && (data.id === this.lockedNode!.id || connected.has(data.id))) {
          labelEl.style.opacity = '1';
        }
      });

      // Fly camera toward the clicked node
      const nodeEntry = this.nodeMeshes.find(g => g.data.id === this.lockedNode!.id);
      if (nodeEntry) {
        const nodePos = nodeEntry.mesh.position.clone().normalize();
        const targetCamPos = nodePos.multiplyScalar(FOCUS_CAM_DIST);
        this.flyTo(targetCamPos, FOCUS_CAM_DIST);
      }

      this.onNodeClick?.(this.lockedNode);
    } else {
      // ── Click on empty space: unlock + resume ─────────────────────────────
      if (this.lockedNode) {
        this.lockedNode = null;

        // Force full visual reset
        const gl = this._glowLevel;
        this.nodeMeshes.forEach(({ mesh, mat, glowMat, glowMesh, baseRadius, labelEl }) => {
          const br = (baseRadius || 6) * 2;
          mat.opacity = 0.95;
          glowMat.opacity = 0.06 + 0.12 * gl;
          glowMesh.scale.setScalar(1);
          mesh.scale.setScalar(br);
          if (labelEl) labelEl.style.opacity = '0';
        });
        this.linkLines.forEach(line => {
          (line.material as THREE.LineBasicMaterial).opacity = 0.07;
        });

        // Fly back to default position
        this.flyTo(new THREE.Vector3(0, 0, DEFAULT_CAM_DIST), DEFAULT_CAM_DIST);

        // Resume auto-rotate when no search is active
        const hasSearch = this.searchMatched !== null && this.searchMatched.size > 0;
        if (!hasSearch) {
          this.controls.autoRotate = true;
        }

        this.onNodeUnlock?.();
        this.onNodeClick?.(null);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Camera fly-to
  // ---------------------------------------------------------------------------

  /**
   * Smoothly moves the camera to `targetPos` over ~1200 ms using an
   * ease-out cubic.  Maintains correct distance from the origin at every
   * interpolation step so the camera never passes through the globe.
   */
  flyTo(targetPos: THREE.Vector3, targetDist: number): void {
    const startPos = this.camera.position.clone();
    const duration = 1200; // ms
    const startTime = performance.now();

    if (this._flyAnimId !== null) cancelAnimationFrame(this._flyAnimId);

    const step = (now: number) => {
      const elapsed = now - startTime;
      let t = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      t = 1 - Math.pow(1 - t, 3);

      // Interpolate position, then rescale to maintain correct distance
      const pos = new THREE.Vector3().lerpVectors(startPos, targetPos, t);
      const currentDist = startPos.length() + (targetDist - startPos.length()) * t;
      pos.normalize().multiplyScalar(currentDist);

      this.camera.position.copy(pos);
      this.camera.lookAt(0, 0, 0);
      this.controls.target.set(0, 0, 0);
      this.controls.update();

      if (t < 1) {
        this._flyAnimId = requestAnimationFrame(step);
      } else {
        this._flyAnimId = null;
      }
    };

    this._flyAnimId = requestAnimationFrame(step);
  }

  /** Fly camera back to the default position (straight ahead, dist=900). */
  resetPosition(): void {
    this.flyTo(new THREE.Vector3(0, 0, DEFAULT_CAM_DIST), DEFAULT_CAM_DIST);
  }

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------

  /**
   * Applies search highlighting: grays out non-matched nodes, brightens
   * matched nodes, stops auto-rotation, flies to the centroid, and adds
   * heatmap rings.
   *
   * Pass an empty Set or `null` to clear the search state.
   */
  search(matched: Set<string>): void {
    if (!this.nodeMeshes.length) return;

    this.searchMatched = matched.size > 0 ? matched : null;

    // Stop auto-rotation so the view stays locked on target
    this.controls.autoRotate = false;

    const GRAY = 0x3a3a3a;

    this.nodeMeshes.forEach(({ data, mat, glowMat, glowMesh, mesh, baseRadius, labelEl }) => {
      const isMatch = matched.has(data.id);
      const br = (baseRadius || 6) * 2;

      if (isMatch) {
        const cat = CATEGORIES[data.cat] || CATEGORIES['meta'];
        const colorHex = parseColorToHex(cat.color);
        mat.color.setHex(colorHex);
        mat.opacity = 1;
        glowMat.color.setHex(colorHex);
        glowMat.opacity = 0.18;
        glowMesh.scale.setScalar(1.2);
        mesh.scale.setScalar(br * 1.2);
      } else {
        mat.color.setHex(GRAY);
        mat.opacity = 0.2;
        glowMat.color.setHex(GRAY);
        glowMat.opacity = 0.01;
        glowMesh.scale.setScalar(0.3);
        mesh.scale.setScalar(br * 0.7);
      }

      if (labelEl) labelEl.style.opacity = isMatch ? '1' : '0';
    });

    this.linkLines.forEach(line => {
      const l = line.userData['linkData'] as GraphLink | undefined;
      if (!l) return;
      const sid = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tid = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      (line.material as THREE.LineBasicMaterial).opacity =
        matched.has(sid) && matched.has(tid) ? 0.4 : 0.01;
    });

    // ── Fly to centroid of matched nodes ────────────────────────────────────
    const matchedEntries = this.nodeMeshes.filter(g => matched.has(g.data.id));
    if (matchedEntries.length === 0) return;

    const centroid = new THREE.Vector3(0, 0, 0);
    matchedEntries.forEach(({ mesh }) => centroid.add(mesh.position));
    centroid.divideScalar(matchedEntries.length);

    const targetDir = centroid.clone().normalize();
    const zoomDist = matchedEntries.length === 1 ? 520 : FOCUS_CAM_DIST;
    const targetCamPos = targetDir.clone().multiplyScalar(zoomDist);

    this.flyTo(targetCamPos, zoomDist);

    // ── Heatmap rings ────────────────────────────────────────────────────────
    this._removeHeatmapRings();
    this._addHeatmapRings(matchedEntries);
  }

  /** Clears all search state and restores default node appearance. */
  clearSearch(): void {
    this.searchMatched = null;

    const gl = this._glowLevel;

    this.nodeMeshes.forEach(({ data, mat, glowMat, glowMesh, mesh, baseRadius, labelEl }) => {
      const cat = CATEGORIES[data.cat] || CATEGORIES['meta'];
      const colorHex = parseColorToHex(cat.color);
      mat.color.setHex(colorHex);
      mat.opacity = 0.95;
      glowMat.color.setHex(colorHex);
      glowMat.opacity = 0.06 + 0.12 * gl;
      glowMesh.scale.setScalar(1);
      const br = (baseRadius || 6) * 2;
      mesh.scale.setScalar(br);
      if (labelEl) labelEl.style.opacity = '0';
    });

    this.linkLines.forEach(line => {
      (line.material as THREE.LineBasicMaterial).opacity = 0.07;
    });

    this._removeHeatmapRings();

    // Resume auto-rotate
    this.controls.autoRotate = true;

    // Fly back to default position
    this.resetPosition();
  }

  // ---------------------------------------------------------------------------
  // Heatmap rings
  // ---------------------------------------------------------------------------

  private _addHeatmapRings(matchedEntries: NodeMeshEntry[]): void {
    // Angular radii and base opacities for the 3 concentric rings
    const ringRadii   = [0.08, 0.15, 0.24];
    const ringOpacity = [0.35, 0.18, 0.08];

    matchedEntries.forEach(({ mesh, data }) => {
      const cat = CATEGORIES[data.cat] || CATEGORIES['meta'];
      const colorHex = parseColorToHex(cat.color);
      const pos = mesh.position.clone().normalize();

      // Build perpendicular axes relative to the node direction
      const up = Math.abs(pos.y) < 0.99
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(1, 0, 0);
      const tangent   = new THREE.Vector3().crossVectors(pos, up).normalize();
      const bitangent = new THREE.Vector3().crossVectors(pos, tangent).normalize();

      ringRadii.forEach((angRadius, ri) => {
        const segments = 64;
        const points: THREE.Vector3[] = [];

        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);

          // Rotate the node direction vector by angRadius in the tangent plane
          const cosR = Math.cos(angRadius);
          const sinR = Math.sin(angRadius);
          const pt = pos.clone().multiplyScalar(cosR)
            .add(tangent.clone().multiplyScalar(sinR * cosA))
            .add(bitangent.clone().multiplyScalar(sinR * sinA));
          pt.normalize().multiplyScalar(GLOBE_RADIUS * 1.005); // just above surface
          points.push(pt);
        }

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: ringOpacity[ri],
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          linewidth: 1,
        });
        const ring = new THREE.Line(geo, mat);
        ring.userData['_heatmap']    = true;
        ring.userData['_baseOpacity'] = ringOpacity[ri];
        ring.userData['_ringIndex']  = ri;
        this.scene.add(ring);
        this._heatmapRings.push(ring);
      });
    });
  }

  private _removeHeatmapRings(): void {
    this._heatmapRings.forEach(ring => {
      this.scene.remove(ring);
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
    });
    this._heatmapRings = [];
  }

  private _animateHeatmapRings(time: number): void {
    this._heatmapRings.forEach(ring => {
      const ri      = (ring.userData['_ringIndex']   as number) || 0;
      const baseOp  = (ring.userData['_baseOpacity'] as number) || 0.2;
      // Outward ripple with phase offset per ring index
      const phase = time * 1.5 - ri * 1.2;
      const p = Math.sin(phase);
      (ring.material as THREE.LineBasicMaterial).opacity = baseOp + p * baseOp * 0.5;
      const s = 1 + p * 0.02;
      ring.scale.setScalar(s);
    });
  }

  // ---------------------------------------------------------------------------
  // Visual updates
  // ---------------------------------------------------------------------------

  /**
   * Updates all node glow intensities when the glow slider changes.
   * The next `animate()` call will also pick up the new level automatically,
   * but this provides an immediate visual update.
   */
  updateGlow(level: number): void {
    this._glowLevel = level;

    this.nodeMeshes.forEach(({ mat, glowMat, glowMesh, baseRadius }) => {
      mat.opacity = 0.9 + 0.1 * level;
      glowMat.opacity = 0.06 + 0.12 * level;
      glowMesh.scale.setScalar(1 + level * 0.2);
    });

    if (this.dotParticles) {
      (this.dotParticles.material as THREE.PointsMaterial).opacity = 0.25 + 0.25 * level;
    }

    if (this.wireframe) {
      (this.wireframe.material as THREE.MeshBasicMaterial).opacity = 0.02 + 0.04 * level;
    }
  }

  /**
   * Grays out nodes whose category is NOT in `activeCats`.
   * Also adjusts link opacity to match.
   */
  filterCategories(activeCats: Set<string>): void {
    const GRAY = 0x3a3a3a;
    const gl = this._glowLevel;

    this.nodeMeshes.forEach(({ data, mat, glowMat, mesh, baseRadius }) => {
      const active = activeCats.has(data.cat);
      const br = (baseRadius || 6) * 2;

      if (active) {
        const cat = CATEGORIES[data.cat] || CATEGORIES['meta'];
        mat.color.setHex(parseColorToHex(cat.color));
        mat.opacity = 0.95;
        glowMat.color.setHex(parseColorToHex(cat.color));
        glowMat.opacity = 0.06 + 0.12 * gl;
        mesh.scale.setScalar(br);
      } else {
        mat.color.setHex(GRAY);
        mat.opacity = 0.1;
        glowMat.color.setHex(GRAY);
        glowMat.opacity = 0.01;
        mesh.scale.setScalar(br * 0.6);
      }
    });

    const nodeMap = new Map(this.nodeMeshes.map(e => [e.data.id, e.data]));

    this.linkLines.forEach(line => {
      const l = line.userData['linkData'] as GraphLink | undefined;
      if (!l) return;
      const sid = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tid = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      const sn = nodeMap.get(sid);
      const tn = nodeMap.get(tid);
      (line.material as THREE.LineBasicMaterial).opacity =
        sn && tn && activeCats.has(sn.cat) && activeCats.has(tn.cat) ? 0.07 : 0.005;
    });
  }

  /**
   * Updates globe colors when the app theme toggles between dark and light.
   */
  updateTheme(isDark: boolean): void {
    // Wireframe color
    if (this.wireframe) {
      (this.wireframe.material as THREE.MeshBasicMaterial).color.setHex(
        isDark ? 0x00d4ff : 0x1e40af,
      );
    }

    // Rebuild dot sphere gradient colors for the new theme
    if (this.dotParticles) {
      const geo = this.dotParticles.geometry;
      const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
      const count = posAttr.count;
      const colors: number[] = [];
      const R = GLOBE_RADIUS;

      for (let i = 0; i < count; i++) {
        const y = posAttr.getY(i) / R; // normalise -1..1
        const t = (y + 1) / 2;        // 0..1

        if (isDark) {
          // Cyan top → purple bottom
          colors.push(
            t * 0 + (1 - t) * 168 / 255,
            t * 212 / 255 + (1 - t) * 85 / 255,
            1,
          );
        } else {
          // Blue gradient for light theme
          colors.push(
            t * 30  / 255,
            t * 64  / 255,
            175     / 255,
          );
        }
      }

      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }
  }

  // ---------------------------------------------------------------------------
  // DOM labels
  // ---------------------------------------------------------------------------

  private _updateLabels(labelContainer: HTMLElement): void {
    const W = window.innerWidth;
    const H = window.innerHeight;

    this.nodeMeshes.forEach(({ mesh, labelEl }) => {
      if (!labelEl) return;
      const opacity = parseFloat(labelEl.style.opacity) || 0;
      if (opacity < 0.05) return;

      const vec = mesh.position.clone().project(this.camera);
      const x = (vec.x *  0.5 + 0.5) * W;
      const y = (vec.y * -0.5 + 0.5) * H;

      // Hide labels for nodes behind the camera
      if (vec.z > 1) {
        labelEl.style.opacity = '0';
        return;
      }

      labelEl.style.left = x + 'px';
      labelEl.style.top  = (y - 12) + 'px';
    });
  }

  // ---------------------------------------------------------------------------
  // Mouse event handlers (called from Svelte component event bindings)
  // ---------------------------------------------------------------------------

  /** Update normalised mouse coordinates from a `mousemove` event. */
  handleMouseMove(e: MouseEvent): void {
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
  }

  /** Reset mouse position and clear any hover state on `mouseleave`. */
  handleMouseLeave(): void {
    this.mouse.set(-9999, -9999);
    this._handleHoverEnd();
  }

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  /** Handles canvas/window resize — updates camera aspect and renderer size. */
  resize(): void {
    const W = window.innerWidth;
    const H = window.innerHeight;
    this.camera.aspect = W / H;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(W, H);
  }

  /** Cancels animation frames and disposes all Three.js resources. */
  dispose(): void {
    if (this.animId    !== null) cancelAnimationFrame(this.animId);
    if (this._flyAnimId !== null) cancelAnimationFrame(this._flyAnimId);

    // Nodes
    this.nodeMeshes.forEach(({ mesh, mat, glowMat, labelEl }) => {
      this.scene.remove(mesh);
      mat.dispose();
      glowMat.dispose();
      if (labelEl.parentNode) labelEl.parentNode.removeChild(labelEl);
    });

    // Links
    this.linkLines.forEach(obj => {
      this.scene.remove(obj);
      obj.geometry.dispose();
      (obj.material as THREE.Material).dispose();
    });

    // Dot sphere
    if (this.dotParticles) {
      this.scene.remove(this.dotParticles);
      this.dotParticles.geometry.dispose();
      (this.dotParticles.material as THREE.Material).dispose();
    }

    // Wireframe
    if (this.wireframe) {
      this.scene.remove(this.wireframe);
      this.wireframe.geometry.dispose();
      (this.wireframe.material as THREE.Material).dispose();
    }

    // Heatmap rings
    this._removeHeatmapRings();

    // Textures
    this._dotTexture?.dispose();
    this._glowTexture?.dispose();

    // Controls + renderer
    this.controls.dispose();
    this.renderer.dispose();
  }
}
