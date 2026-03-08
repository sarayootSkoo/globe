import * as THREE from 'three';
import { TRAIL_COUNT, TRAIL_POINTS, COMET_COLORS, GLOBE_RADIUS } from '../constants';

interface CometTrail {
  line: THREE.Line;
  geo: THREE.BufferGeometry;
  mat: THREE.LineBasicMaterial;
  theta: number;   // longitude angle (radians)
  phi: number;     // latitude angle (radians)
  points: number;  // max trail history length
  trail: THREE.Vector3[];
}

export class GlobeCometTrails {
  group: THREE.Group;
  trails: CometTrail[] = [];
  enabled: boolean = true;

  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);

    this._buildTrails();
  }

  // ── Initialisation ──────────────────────────────────────────────────────────

  private _buildTrails(): void {
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const positions = new Float32Array(TRAIL_POINTS * 3);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.LineBasicMaterial({
        color: COMET_COLORS[i % COMET_COLORS.length],
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geo, mat);
      line.frustumCulled = false;
      this.group.add(line);

      // Each trail starts evenly spaced in theta, random phi
      const theta = (i / TRAIL_COUNT) * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);

      this.trails.push({ line, geo, mat, theta, phi, points: TRAIL_POINTS, trail: [] });
    }
  }

  // ── Per-frame update ────────────────────────────────────────────────────────

  /**
   * Advance all comet trails along the sphere surface and update GPU buffers.
   *
   * @param dt       Delta-time in seconds
   * @param rotSpeed Current WASD speed scalar (0–1). Trails are invisible below 15%.
   * @param rotX     Accumulated pitch velocity from WASD state (drives phi advancement)
   * @param rotY     Accumulated yaw velocity from WASD state (drives theta advancement)
   */
  update(dt: number, rotSpeed: number, rotX: number, rotY: number): void {
    if (!this.enabled) {
      this.group.visible = false;
      return;
    }

    // Fade in only above 15% speed; ramps linearly to fully opaque at 100%
    const trailAlpha = Math.max(0, (rotSpeed - 0.15) / 0.85);

    // Slightly outside globe surface so trails sit above dot sphere
    const R = GLOBE_RADIUS * 1.02;

    this.trails.forEach((ct, idx) => {
      // Advance trail head based on WASD rotation velocity + constant drift
      ct.theta += (rotY * 2.5 + 0.3) * dt * (1 + rotSpeed * 3);
      ct.phi   += rotX * 1.5 * dt * (1 + rotSpeed * 2);

      // Clamp phi away from poles to avoid degenerate geometry
      ct.phi = Math.max(0.2, Math.min(Math.PI - 0.2, ct.phi));

      // Spherical → Cartesian head position
      const hx = R * Math.sin(ct.phi) * Math.cos(ct.theta);
      const hy = R * Math.cos(ct.phi);
      const hz = R * Math.sin(ct.phi) * Math.sin(ct.theta);
      const head = new THREE.Vector3(hx, hy, hz);

      // Prepend to history, cap at TRAIL_POINTS entries
      ct.trail.unshift(head);
      if (ct.trail.length > ct.points) ct.trail.pop();

      // Write positions into the BufferAttribute
      const posAttr = ct.geo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < ct.points; i++) {
        if (i < ct.trail.length) {
          posAttr.setXYZ(i, ct.trail[i].x, ct.trail[i].y, ct.trail[i].z);
        } else {
          // Pad remainder with last known point so there is no gap in the buffer
          const last = ct.trail[ct.trail.length - 1] ?? head;
          posAttr.setXYZ(i, last.x, last.y, last.z);
        }
      }
      posAttr.needsUpdate = true;

      // Only draw up to the number of real history points
      ct.geo.setDrawRange(0, ct.trail.length);

      // Each trail gets its own colour for visual richness
      ct.mat.color.setHex(COMET_COLORS[idx % COMET_COLORS.length]);

      // Opacity: speed-dependent comet effect
      ct.mat.opacity = trailAlpha * (0.12 + 0.18 * rotSpeed);
    });

    // Hide group entirely when too slow to avoid a faint flicker
    this.group.visible = trailAlpha > 0.01;
  }

  // ── Public controls ─────────────────────────────────────────────────────────

  setEnabled(v: boolean): void {
    this.enabled = v;
    if (!v) {
      this.group.visible = false;
    }
  }

  /** Reset all trail histories (e.g. when switching camera position abruptly) */
  clearTrails(): void {
    this.trails.forEach(ct => {
      ct.trail = [];
    });
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  dispose(): void {
    this.trails.forEach(ct => {
      ct.geo.dispose();
      ct.mat.dispose();
    });
    this.trails = [];
    this.scene.remove(this.group);
  }
}
