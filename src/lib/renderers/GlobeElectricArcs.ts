/**
 * GlobeElectricArcs — 3D plasma ball effect around the globe.
 *
 * Combines four visual layers:
 *   1. Lightning arcs — jagged crackling bolts across the surface
 *   2. Plasma aura   — soft diffuse glow halo
 *   3. Orbit rings   — swirling elliptical energy bands
 *   4. Core glow     — bright pulsing energy center
 *   5. Energy wisps  — short curved tendrils extending from the surface
 *   6. Spark burst   — radial lightning discharge from globe center (periodic pulse)
 *
 * Only active when the "electric" theme is selected.
 */

import * as THREE from 'three';
import { GLOBE_RADIUS } from '../constants';

const R = GLOBE_RADIUS;

// ── Interfaces ───────────────────────────────────────────────────────────────

interface GlobeLightningArc {
  line: THREE.Line;
  glowLine: THREE.Line;
  life: number;
  maxLife: number;
}

interface OrbitRing {
  line: THREE.Line;
  glowLine: THREE.Line;
  axis: THREE.Vector3;
  speed: number;
  currentAngle: number;
  tiltGroup: THREE.Group;
}

interface EnergyWisp {
  line: THREE.Line;
  life: number;
  maxLife: number;
}

interface SparkBolt {
  lines: THREE.Line[];        // main bolt + fork branches
  life: number;
  maxLife: number;
}

// ── Constants ────────────────────────────────────────────────────────────────

const BASE_ARC_COUNT = 6;        // max concurrent arcs at intensity=1
const ARC_SEGMENTS = 20;         // jagged segments per arc
const ARC_SPAWN_INTERVAL = 0.3;  // seconds between arc spawns
const ARC_LIFT = 15;             // how far arcs lift above surface

const MAX_WISPS = 8;             // max concurrent wisps
const WISP_SPAWN_INTERVAL = 0.5; // seconds between wisp spawns

const BASE_SPARK_BOLTS = 12;     // bolts per burst at intensity=1
const SPARK_SEGMENTS = 16;       // segments per radial bolt
const SPARK_FORK_CHANCE = 0.4;   // probability of forking at each segment

export class GlobeElectricArcs {
  group: THREE.Group;
  private scene: THREE.Scene;

  // Lightning arcs
  private arcs: GlobeLightningArc[] = [];
  private spawnTimer = 0;

  // Plasma aura
  private auraSprite: THREE.Sprite | null = null;
  private auraMat: THREE.SpriteMaterial | null = null;
  private auraTexture: THREE.CanvasTexture | null = null;

  // Core glow
  private coreSprite: THREE.Sprite | null = null;
  private coreMat: THREE.SpriteMaterial | null = null;
  private coreTexture: THREE.CanvasTexture | null = null;

  // Orbit rings
  private orbitRings: OrbitRing[] = [];

  // Energy wisps
  private wisps: EnergyWisp[] = [];
  private wispSpawnTimer = 0;

  // Spark burst
  private sparkBolts: SparkBolt[] = [];
  private sparkBurstTimer = 0;
  private _showSparkBurst = true;
  private _sparkIntensity = 1;  // 0.2–3 bolt brightness + count
  private _sparkRate = 1;       // 0.25–3 pulse frequency

  // Spark burst flash sprite
  private sparkFlash: THREE.Sprite | null = null;
  private sparkFlashMat: THREE.SpriteMaterial | null = null;
  private sparkFlashTexture: THREE.CanvasTexture | null = null;
  private _sparkFlashLife = 0;

  // State
  private _enabled = false;
  private _showArcs = true;
  private _showAura = true;
  private _intensity = 1;    // 0.2–3
  private _speed = 1;        // 0.25–3
  private _arcCount = 1;     // 0.2–3 multiplier
  private _orbitSpeed = 1;   // 0.25–3
  private _coreGlow = 1;     // 0.2–3
  private _time = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);
    this._buildAura();
    this._buildCore();
    this._buildSparkFlash();
    this._rebuildOrbitRings();
  }

  // ── Plasma aura ───────────────────────────────────────────────────────────

  private _buildAura(): void {
    const size = 512;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;

    // Soft diffuse glow — no visible ring edge
    const g1 = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
    g1.addColorStop(0,    'rgba(30,80,200,0)');
    g1.addColorStop(0.35, 'rgba(30,80,200,0)');
    g1.addColorStop(0.5,  'rgba(40,100,255,0.02)');
    g1.addColorStop(0.6,  'rgba(50,120,255,0.04)');
    g1.addColorStop(0.7,  'rgba(40,100,240,0.03)');
    g1.addColorStop(0.8,  'rgba(30,80,200,0.015)');
    g1.addColorStop(0.9,  'rgba(20,50,150,0.005)');
    g1.addColorStop(1,    'rgba(0,0,0,0)');
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

  // ── Core glow ─────────────────────────────────────────────────────────────

  private _buildCore(): void {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;

    // Bright blue-white core — much tighter and brighter than the aura
    const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.85);
    g.addColorStop(0,    'rgba(255,255,255,0.95)');
    g.addColorStop(0.08, 'rgba(200,230,255,0.85)');
    g.addColorStop(0.2,  'rgba(120,180,255,0.6)');
    g.addColorStop(0.4,  'rgba(60,120,255,0.3)');
    g.addColorStop(0.65, 'rgba(30,70,200,0.12)');
    g.addColorStop(0.85, 'rgba(10,30,120,0.04)');
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    this.coreTexture = new THREE.CanvasTexture(c);
    this.coreTexture.needsUpdate = true;

    this.coreMat = new THREE.SpriteMaterial({
      map: this.coreTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.coreSprite = new THREE.Sprite(this.coreMat);
    const coreScale = R * 1.5;
    this.coreSprite.scale.set(coreScale, coreScale, 1);
    this.group.add(this.coreSprite);
  }

  // ── Orbit rings ───────────────────────────────────────────────────────────

  private _rebuildOrbitRings(): void {
    // Remove old rings
    for (const ring of this.orbitRings) {
      this.group.remove(ring.tiltGroup);
      ring.line.geometry.dispose();
      (ring.line.material as THREE.Material).dispose();
      ring.glowLine.geometry.dispose();
      (ring.glowLine.material as THREE.Material).dispose();
    }
    this.orbitRings = [];

    const count = Math.min(Math.max(1, Math.round(5 * this._arcCount)), 12);

    for (let i = 0; i < count; i++) {
      const segments = 80;
      const ringR = R * (1.08 + Math.random() * 0.15);
      const positions: number[] = [];

      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        positions.push(
          Math.cos(angle) * ringR,
          0,
          Math.sin(angle) * ringR,
        );
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const mat = new THREE.LineBasicMaterial({
        color: 0x80c0ff,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      line.frustumCulled = false;

      // Glow line (slightly larger, lower opacity)
      const glowMat = new THREE.LineBasicMaterial({
        color: 0x3060ff,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glowLine = new THREE.Line(geo.clone(), glowMat);
      glowLine.scale.setScalar(1.03);
      glowLine.frustumCulled = false;

      // Tilt group — each ring has a unique tilt for variety
      const tiltGroup = new THREE.Group();
      tiltGroup.add(line);
      tiltGroup.add(glowLine);
      tiltGroup.rotation.x = (Math.random() - 0.5) * Math.PI * 0.8;
      tiltGroup.rotation.z = (Math.random() - 0.5) * Math.PI * 0.8;

      this.group.add(tiltGroup);

      this.orbitRings.push({
        line,
        glowLine,
        axis: new THREE.Vector3(0, 1, 0),
        speed: 0.3 + Math.random() * 0.7,
        currentAngle: Math.random() * Math.PI * 2,
        tiltGroup,
      });
    }
  }

  // ── Lightning arc generation ──────────────────────────────────────────────

  private _spawnArc(): void {
    const maxArcs = Math.round(BASE_ARC_COUNT * this._arcCount * this._intensity);
    if (this.arcs.length >= Math.max(1, maxArcs)) return;

    // Two random points on the sphere
    const theta1 = Math.random() * Math.PI * 2;
    const phi1 = Math.acos(2 * Math.random() - 1);
    const theta2 = theta1 + (Math.random() - 0.5) * Math.PI * 1.2;
    const phi2 = phi1 + (Math.random() - 0.5) * Math.PI * 0.6;

    const positions: number[] = [];

    for (let i = 0; i <= ARC_SEGMENTS; i++) {
      const t = i / ARC_SEGMENTS;

      const theta = theta1 + (theta2 - theta1) * t;
      const phi = phi1 + (phi2 - phi1) * t;

      const bx = Math.sin(phi) * Math.cos(theta);
      const by = Math.cos(phi);
      const bz = Math.sin(phi) * Math.sin(theta);

      const jitterMag = Math.sin(t * Math.PI) * ARC_LIFT;
      const normalJitter = ARC_LIFT + (Math.random() - 0.3) * jitterMag;

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

    const glowMat = new THREE.LineBasicMaterial({
      color: 0x4090ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1,
    });
    const glowLine = new THREE.Line(geo.clone(), glowMat);
    glowLine.scale.setScalar(1.01);
    glowLine.frustumCulled = false;
    this.group.add(glowLine);

    const maxLife = 0.15 + Math.random() * 0.3;
    this.arcs.push({ line, glowLine, life: maxLife, maxLife });
  }

  // ── Energy wisp generation ────────────────────────────────────────────────

  private _spawnWisp(): void {
    const maxWisps = Math.round(MAX_WISPS * this._arcCount);
    if (this.wisps.length >= Math.max(1, maxWisps)) return;

    // Random point on sphere surface
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const nx = Math.sin(phi) * Math.cos(theta);
    const ny = Math.cos(phi);
    const nz = Math.sin(phi) * Math.sin(theta);

    // Build curved wisp path: start at surface, curl outward
    const wispLen = R * (0.3 + Math.random() * 0.4);
    const segments = 10;
    const positions: number[] = [];

    // Perpendicular tangent for curl
    const tx = -Math.sin(theta);
    const tz = Math.cos(theta);
    const curl = (Math.random() - 0.5) * wispLen * 0.5;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const dist = R + wispLen * t;
      const curveFactor = Math.sin(t * Math.PI) * curl;

      positions.push(
        nx * dist + tx * curveFactor,
        ny * dist,
        nz * dist + tz * curveFactor,
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const mat = new THREE.LineBasicMaterial({
      color: 0xa0d8ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const line = new THREE.Line(geo, mat);
    line.frustumCulled = false;
    this.group.add(line);

    const maxLife = 0.5 + Math.random() * 1.0;
    this.wisps.push({ line, life: maxLife, maxLife });
  }

  // ── Spark burst flash ────────────────────────────────────────────────────

  private _buildSparkFlash(): void {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;

    // Intense white-blue flash for burst moment
    const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.7);
    g.addColorStop(0,    'rgba(255,255,255,1)');
    g.addColorStop(0.1,  'rgba(200,230,255,0.9)');
    g.addColorStop(0.3,  'rgba(100,170,255,0.5)');
    g.addColorStop(0.6,  'rgba(40,100,255,0.15)');
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    this.sparkFlashTexture = new THREE.CanvasTexture(c);
    this.sparkFlashTexture.needsUpdate = true;

    this.sparkFlashMat = new THREE.SpriteMaterial({
      map: this.sparkFlashTexture,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.sparkFlash = new THREE.Sprite(this.sparkFlashMat);
    const flashScale = R * 2.5;
    this.sparkFlash.scale.set(flashScale, flashScale, 1);
    this.sparkFlash.visible = false;
    this.group.add(this.sparkFlash);
  }

  // ── Spark bolt generation ───────────────────────────────────────────────

  /**
   * Build a jagged bolt path from a surface point outward with midpoint
   * displacement, plus forking branches. Returns array of THREE.Line.
   */
  private _buildSparkBolt(dir: THREE.Vector3): THREE.Line[] {
    const lines: THREE.Line[] = [];
    const boltLen = R * (0.5 + Math.random() * 1.0); // extends 0.5–1.5× R beyond surface

    // Main bolt path with jagged displacement
    const mainPositions = this._jaggedPath(dir, R, R + boltLen, SPARK_SEGMENTS);
    const mainGeo = new THREE.BufferGeometry();
    mainGeo.setAttribute('position', new THREE.Float32BufferAttribute(mainPositions, 3));

    const mainMat = new THREE.LineBasicMaterial({
      color: 0xeef4ff,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mainLine = new THREE.Line(mainGeo, mainMat);
    mainLine.frustumCulled = false;
    this.group.add(mainLine);
    lines.push(mainLine);

    // Glow line for main bolt
    const glowMat = new THREE.LineBasicMaterial({
      color: 0x5090ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowLine = new THREE.Line(mainGeo.clone(), glowMat);
    glowLine.scale.setScalar(1.02);
    glowLine.frustumCulled = false;
    this.group.add(glowLine);
    lines.push(glowLine);

    // Fork branches — split off at random points along the main bolt
    for (let seg = 3; seg < SPARK_SEGMENTS - 2; seg++) {
      if (Math.random() > SPARK_FORK_CHANCE) continue;

      // Fork origin: extract point from main path
      const idx = seg * 3;
      const forkOrigin = new THREE.Vector3(
        mainPositions[idx], mainPositions[idx + 1], mainPositions[idx + 2],
      );

      // Fork direction: slightly deviated from main direction
      const forkDir = forkOrigin.clone().normalize();
      // Add tangential deviation
      const tangent = new THREE.Vector3(
        (Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5),
      ).normalize();
      forkDir.lerp(tangent, 0.3 + Math.random() * 0.3).normalize();

      const forkDist = forkOrigin.length();
      const forkLen = boltLen * (0.2 + Math.random() * 0.4);
      const forkSegs = Math.max(4, Math.round(SPARK_SEGMENTS * 0.4));
      const forkPositions = this._jaggedPath(forkDir, forkDist, forkDist + forkLen, forkSegs);

      const forkGeo = new THREE.BufferGeometry();
      forkGeo.setAttribute('position', new THREE.Float32BufferAttribute(forkPositions, 3));

      const forkMat = new THREE.LineBasicMaterial({
        color: 0xc0d8ff,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const forkLine = new THREE.Line(forkGeo, forkMat);
      forkLine.frustumCulled = false;
      this.group.add(forkLine);
      lines.push(forkLine);
    }

    return lines;
  }

  /**
   * Generate a jagged path from startDist to endDist along a direction,
   * with midpoint displacement perpendicular to the direction.
   */
  private _jaggedPath(dir: THREE.Vector3, startDist: number, endDist: number, segments: number): number[] {
    const positions: number[] = [];

    // Build a perpendicular basis for displacement
    const up = Math.abs(dir.y) < 0.9
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
    const perp1 = new THREE.Vector3().crossVectors(dir, up).normalize();
    const perp2 = new THREE.Vector3().crossVectors(dir, perp1).normalize();

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const dist = startDist + (endDist - startDist) * t;

      // Displacement magnitude: largest at middle, zero at endpoints
      const envelope = Math.sin(t * Math.PI);
      const jitter = envelope * (endDist - startDist) * 0.12;
      const d1 = (Math.random() - 0.5) * 2 * jitter;
      const d2 = (Math.random() - 0.5) * 2 * jitter;

      positions.push(
        dir.x * dist + perp1.x * d1 + perp2.x * d2,
        dir.y * dist + perp1.y * d1 + perp2.y * d2,
        dir.z * dist + perp1.z * d1 + perp2.z * d2,
      );
    }

    return positions;
  }

  /**
   * Fire a burst of radial spark bolts outward from the globe center.
   */
  private _fireBurst(): void {
    const boltCount = Math.max(4, Math.round(BASE_SPARK_BOLTS * this._sparkIntensity));

    for (let i = 0; i < boltCount; i++) {
      // Uniformly distributed directions on the sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );

      const boltLines = this._buildSparkBolt(dir);
      const maxLife = 0.15 + Math.random() * 0.25;
      this.sparkBolts.push({ lines: boltLines, life: maxLife, maxLife });
    }

    // Trigger flash
    this._sparkFlashLife = 0.2;
    if (this.sparkFlash) this.sparkFlash.visible = true;
  }

  // ── Per-frame update ──────────────────────────────────────────────────────

  update(dt: number): void {
    if (!this._enabled) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    const spd = this._speed;
    const int = this._intensity;
    this._time += dt * spd;

    // ── Plasma aura pulse ──────────────────────────────────────────────────
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

    // ── Core glow pulse ────────────────────────────────────────────────────
    if (this.coreMat && this.coreSprite) {
      this.coreSprite.visible = true;
      const corePulse = (0.4 + 0.3 * Math.sin(this._time * 4.5) + 0.15 * Math.sin(this._time * 11.3)) * this._coreGlow;
      this.coreMat.opacity = Math.min(corePulse, 1.0);
      const coreBreath = R * 1.5 * (1 + Math.sin(this._time * 2.2) * 0.06);
      this.coreSprite.scale.set(coreBreath, coreBreath, 1);
    }

    // ── Orbit ring rotation ────────────────────────────────────────────────
    for (const ring of this.orbitRings) {
      ring.currentAngle += dt * this._orbitSpeed * ring.speed;
      ring.tiltGroup.rotation.y = ring.currentAngle;

      // Pulse ring opacity
      const pulse = 0.6 + 0.4 * Math.sin(this._time * 2 + ring.currentAngle);
      const baseOpacity = 0.12 + 0.1 * Math.random() * 0.05;
      (ring.line.material as THREE.LineBasicMaterial).opacity = baseOpacity * pulse * int;
      (ring.glowLine.material as THREE.LineBasicMaterial).opacity = 0.06 * pulse * int;
    }

    // ── Spawn lightning arcs ───────────────────────────────────────────────
    if (this._showArcs) {
      this.spawnTimer -= dt * spd;
      if (this.spawnTimer <= 0) {
        this._spawnArc();
        this.spawnTimer = ARC_SPAWN_INTERVAL * (0.5 + Math.random());
      }
    }

    // ── Update existing arcs ───────────────────────────────────────────────
    for (let i = this.arcs.length - 1; i >= 0; i--) {
      const arc = this.arcs[i];
      arc.life -= dt * spd;

      if (arc.life <= 0) {
        this.group.remove(arc.line);
        this.group.remove(arc.glowLine);
        arc.line.geometry.dispose();
        (arc.line.material as THREE.Material).dispose();
        arc.glowLine.geometry.dispose();
        (arc.glowLine.material as THREE.Material).dispose();
        this.arcs.splice(i, 1);
        continue;
      }

      const t = arc.life / arc.maxLife;
      const flicker = t * (0.3 + 0.7 * Math.abs(Math.sin(this._time * 25 + i * 7))) * int;

      (arc.line.material as THREE.LineBasicMaterial).opacity = Math.min(flicker, 1);
      (arc.glowLine.material as THREE.LineBasicMaterial).opacity = Math.min(flicker * 0.35, 1);
    }

    // ── Spawn energy wisps ─────────────────────────────────────────────────
    this.wispSpawnTimer -= dt * spd;
    if (this.wispSpawnTimer <= 0) {
      this._spawnWisp();
      this.wispSpawnTimer = WISP_SPAWN_INTERVAL * (0.5 + Math.random());
    }

    // ── Update existing wisps ──────────────────────────────────────────────
    for (let i = this.wisps.length - 1; i >= 0; i--) {
      const wisp = this.wisps[i];
      wisp.life -= dt * spd;

      if (wisp.life <= 0) {
        this.group.remove(wisp.line);
        wisp.line.geometry.dispose();
        (wisp.line.material as THREE.Material).dispose();
        this.wisps.splice(i, 1);
        continue;
      }

      // Fade out as life decays
      const fadeT = wisp.life / wisp.maxLife;
      const wispOpacity = fadeT * 0.6 * int;
      (wisp.line.material as THREE.LineBasicMaterial).opacity = Math.min(wispOpacity, 1);
    }

    // ── Spark burst pulse ───────────────────────────────────────────────
    if (this._showSparkBurst) {
      this.sparkBurstTimer -= dt * this._sparkRate;
      // Burst interval: ~2s at rate=1, faster at higher rate
      const burstInterval = 2.0 / this._sparkRate;
      if (this.sparkBurstTimer <= 0) {
        this._fireBurst();
        this.sparkBurstTimer = burstInterval * (0.7 + Math.random() * 0.6);
      }
    }

    // ── Update spark bolts ──────────────────────────────────────────────
    for (let i = this.sparkBolts.length - 1; i >= 0; i--) {
      const bolt = this.sparkBolts[i];
      bolt.life -= dt * spd;

      if (bolt.life <= 0) {
        for (const line of bolt.lines) {
          this.group.remove(line);
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
        }
        this.sparkBolts.splice(i, 1);
        continue;
      }

      // Rapid flicker decay — bolts flash on/off dramatically
      const t = bolt.life / bolt.maxLife;
      const flicker = t * (0.2 + 0.8 * Math.abs(Math.sin(this._time * 40 + i * 11))) * this._sparkIntensity;

      for (const line of bolt.lines) {
        const mat = line.material as THREE.LineBasicMaterial;
        // Core bolts get full flicker, glow/forks get reduced
        const isGlow = mat.color.b > 0.9 && mat.color.r < 0.5;
        mat.opacity = Math.min(isGlow ? flicker * 0.4 : flicker, 1);
      }
    }

    // ── Spark flash fade ────────────────────────────────────────────────
    if (this._sparkFlashLife > 0) {
      this._sparkFlashLife -= dt * spd * 3; // fast fade
      if (this.sparkFlashMat) {
        const flashOp = Math.max(0, this._sparkFlashLife / 0.2) * 0.8 * this._sparkIntensity;
        this.sparkFlashMat.opacity = Math.min(flashOp, 1);
      }
      if (this._sparkFlashLife <= 0 && this.sparkFlash) {
        this.sparkFlash.visible = false;
      }
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────

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

      // Clear all wisps
      for (const wisp of this.wisps) {
        this.group.remove(wisp.line);
        wisp.line.geometry.dispose();
        (wisp.line.material as THREE.Material).dispose();
      }
      this.wisps = [];

      // Clear all spark bolts
      for (const bolt of this.sparkBolts) {
        for (const line of bolt.lines) {
          this.group.remove(line);
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
        }
      }
      this.sparkBolts = [];
    }
  }

  setShowArcs(v: boolean): void { this._showArcs = v; }
  setShowAura(v: boolean): void { this._showAura = v; }
  setIntensity(v: number): void { this._intensity = v; }
  setSpeed(v: number): void     { this._speed = v; }

  setArcCount(v: number): void {
    this._arcCount = v;
    this._rebuildOrbitRings();
  }

  setOrbitSpeed(v: number): void   { this._orbitSpeed = v; }
  setCoreGlow(v: number): void     { this._coreGlow = v; }
  setShowSparkBurst(v: boolean): void { this._showSparkBurst = v; }
  setSparkIntensity(v: number): void  { this._sparkIntensity = v; }
  setSparkRate(v: number): void       { this._sparkRate = v; }

  dispose(): void {
    this.setEnabled(false);

    if (this.auraSprite) {
      this.group.remove(this.auraSprite);
      this.auraMat?.dispose();
      this.auraTexture?.dispose();
    }

    if (this.coreSprite) {
      this.group.remove(this.coreSprite);
      this.coreMat?.dispose();
      this.coreTexture?.dispose();
    }

    if (this.sparkFlash) {
      this.group.remove(this.sparkFlash);
      this.sparkFlashMat?.dispose();
      this.sparkFlashTexture?.dispose();
    }

    // Dispose orbit rings
    for (const ring of this.orbitRings) {
      this.group.remove(ring.tiltGroup);
      ring.line.geometry.dispose();
      (ring.line.material as THREE.Material).dispose();
      ring.glowLine.geometry.dispose();
      (ring.glowLine.material as THREE.Material).dispose();
    }
    this.orbitRings = [];

    this.scene.remove(this.group);
  }
}
