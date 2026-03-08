/**
 * GlobeElectricArcs — 3D lightning bolt arcs that crackle around the globe surface.
 *
 * Creates jagged lightning bolt meshes that arc between random points on the globe,
 * plus a pulsing plasma aura halo around the globe center.
 * Only active when the "electric" theme is selected.
 */

import * as THREE from 'three';
import { GLOBE_RADIUS } from '../constants';

// ── Lightning arc on globe surface ──────────────────────────────────────────

interface GlobeLightningArc {
  line: THREE.Line;
  glowLine: THREE.Line;
  life: number;
  decay: number;
  maxLife: number;
}

const ARC_COUNT = 6;           // max concurrent arcs
const ARC_SEGMENTS = 20;       // jagged segments per arc
const ARC_SPAWN_INTERVAL = 0.3; // seconds between new arcs
const R = GLOBE_RADIUS;
const ARC_LIFT = 15;           // how far arcs lift above surface

export class GlobeElectricArcs {
  group: THREE.Group;
  private scene: THREE.Scene;
  private arcs: GlobeLightningArc[] = [];
  private spawnTimer = 0;
  private _enabled = false;
  private _showArcs = true;
  private _showAura = true;
  private _intensity = 1;  // 0.2–2 controls arc brightness + aura strength
  private _speed = 1;      // 0.25–3 controls arc spawn rate + flicker

  // Plasma aura
  private auraSprite: THREE.Sprite | null = null;
  private auraMat: THREE.SpriteMaterial | null = null;
  private auraTexture: THREE.CanvasTexture | null = null;
  private _time = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);
    this._buildAura();
  }

  // ── Plasma aura ──────────────────────────────────────────────────────────

  private _buildAura(): void {
    const size = 512;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;

    // Soft diffuse glow — no visible ring edge
    const g1 = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
    g1.addColorStop(0, 'rgba(30,80,200,0)');
    g1.addColorStop(0.35, 'rgba(30,80,200,0)');
    g1.addColorStop(0.5, 'rgba(40,100,255,0.02)');
    g1.addColorStop(0.6, 'rgba(50,120,255,0.04)');
    g1.addColorStop(0.7, 'rgba(40,100,240,0.03)');
    g1.addColorStop(0.8, 'rgba(30,80,200,0.015)');
    g1.addColorStop(0.9, 'rgba(20,50,150,0.005)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, size, size);

    this.auraTexture = new THREE.CanvasTexture(c);
    this.auraTexture.needsUpdate = true;

    this.auraMat = new THREE.SpriteMaterial({
      map: this.auraTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.auraSprite = new THREE.Sprite(this.auraMat);
    const auraScale = R * 3.5;
    this.auraSprite.scale.set(auraScale, auraScale, 1);
    this.group.add(this.auraSprite);
  }

  // ── Lightning arc generation ─────────────────────────────────────────────

  private _spawnArc(): void {
    if (this.arcs.length >= ARC_COUNT) return;

    // Two random points on the sphere
    const theta1 = Math.random() * Math.PI * 2;
    const phi1 = Math.acos(2 * Math.random() - 1);
    const theta2 = theta1 + (Math.random() - 0.5) * Math.PI * 1.2;
    const phi2 = phi1 + (Math.random() - 0.5) * Math.PI * 0.6;

    // Generate jagged path on sphere surface
    const positions: number[] = [];

    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const t = i / ARC_SEGMENTS;

      // Interpolate spherical coords
      const theta = theta1 + (theta2 - theta1) * t;
      const phi = phi1 + (phi2 - phi1) * t;

      // Base point on sphere
      const bx = Math.sin(phi) * Math.cos(theta);
      const by = Math.cos(phi);
      const bz = Math.sin(phi) * Math.sin(theta);

      // Jagged displacement: normal to surface (outward) + tangential
      const jitterMag = Math.sin(t * Math.PI) * ARC_LIFT; // max at midpoint
      const normalJitter = ARC_LIFT + (Math.random() - 0.3) * jitterMag;

      // Tangential jitter (perpendicular to normal)
      const tx = -Math.sin(theta);
      const tz = Math.cos(theta);
      const tangJitter = (Math.random() - 0.5) * jitterMag * 0.6;

      const pr = R + normalJitter;
      positions.push(
        bx * pr + tx * tangJitter,
        by * pr,
        bz * pr + tz * tangJitter,
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Bright core line
    const mat = new THREE.LineBasicMaterial({
      color: 0xddeeff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    });
    const line = new THREE.Line(geo, mat);
    line.frustumCulled = false;
    this.group.add(line);

    // Wide glow line (same geometry, lower opacity, "wider" via separate pass)
    const glowMat = new THREE.LineBasicMaterial({
      color: 0x4090ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    });
    const glowLine = new THREE.Line(geo.clone(), glowMat);
    // Scale slightly outward for glow effect
    glowLine.scale.setScalar(1.01);
    glowLine.frustumCulled = false;
    this.group.add(glowLine);

    const maxLife = 0.15 + Math.random() * 0.3;
    this.arcs.push({
      line,
      glowLine,
      life: maxLife,
      decay: 1, // normalized: life goes from maxLife to 0 over maxLife seconds
      maxLife,
    });
  }

  // ── Per-frame update ─────────────────────────────────────────────────────

  update(dt: number): void {
    if (!this._enabled) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;
    const spd = this._speed;
    const int = this._intensity;
    this._time += dt * spd;

    // Aura pulse
    if (this.auraMat && this.auraSprite) {
      if (this._showAura) {
        this.auraSprite.visible = true;
        const pulse = (0.25 + 0.15 * Math.sin(this._time * 3) + 0.1 * Math.sin(this._time * 7.3)) * int;
        this.auraMat.opacity = pulse;
        const breathe = R * 3.5 * (1 + Math.sin(this._time * 1.5) * 0.03);
        this.auraSprite.scale.set(breathe, breathe, 1);
      } else {
        this.auraSprite.visible = false;
      }
    }

    // Spawn arcs — faster speed = shorter interval, higher intensity = more arcs allowed
    if (this._showArcs) {
      this.spawnTimer -= dt * spd;
      if (this.spawnTimer <= 0) {
        const maxArcs = Math.round(ARC_COUNT * int);
        if (this.arcs.length < maxArcs) {
          this._spawnArc();
        }
        this.spawnTimer = ARC_SPAWN_INTERVAL * (0.5 + Math.random());
      }
    }

    // Update existing arcs
    for (let i = this.arcs.length - 1; i >= 0; i--) {
      const arc = this.arcs[i];
      arc.life -= dt * spd;

      if (arc.life <= 0) {
        // Remove
        this.group.remove(arc.line);
        this.group.remove(arc.glowLine);
        arc.line.geometry.dispose();
        (arc.line.material as THREE.Material).dispose();
        arc.glowLine.geometry.dispose();
        (arc.glowLine.material as THREE.Material).dispose();
        this.arcs.splice(i, 1);
        continue;
      }

      // Flicker effect — rapid on/off, scaled by intensity
      const t = arc.life / arc.maxLife;
      const flicker = t * (0.3 + 0.7 * Math.abs(Math.sin(this._time * 25 + i * 7))) * int;

      (arc.line.material as THREE.LineBasicMaterial).opacity = Math.min(flicker, 1);
      (arc.glowLine.material as THREE.LineBasicMaterial).opacity = Math.min(flicker * 0.35, 1);
    }
  }

  // ── Public API ───────────────────────────────────────────────────────────

  setEnabled(enabled: boolean): void {
    this._enabled = enabled;
    if (!enabled) {
      // Clear all arcs
      for (const arc of this.arcs) {
        this.group.remove(arc.line);
        this.group.remove(arc.glowLine);
        arc.line.geometry.dispose();
        (arc.line.material as THREE.Material).dispose();
        arc.glowLine.geometry.dispose();
        (arc.glowLine.material as THREE.Material).dispose();
      }
      this.arcs = [];
    }
  }

  setShowArcs(v: boolean): void { this._showArcs = v; }
  setShowAura(v: boolean): void { this._showAura = v; }
  setIntensity(v: number): void { this._intensity = v; }
  setSpeed(v: number): void { this._speed = v; }

  dispose(): void {
    this.setEnabled(false);
    if (this.auraSprite) {
      this.group.remove(this.auraSprite);
      this.auraMat?.dispose();
      this.auraTexture?.dispose();
    }
    this.scene.remove(this.group);
  }
}
