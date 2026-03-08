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
 * Active on all themes — colors adapt to the element's identity.
 */

import * as THREE from 'three';
import { GLOBE_RADIUS } from '../constants';

const R = GLOBE_RADIUS;

// ── Per-theme color palettes ─────────────────────────────────────────────────

interface ThemePalette {
  /** Main bright line color (arcs, bolts) */
  bright: number;
  /** Glow/bloom color behind arcs */
  glow: number;
  /** Orbit ring main color */
  ring: number;
  /** Orbit ring glow color */
  ringGlow: number;
  /** Wisp tendril color */
  wisp: number;
  /** Bolt fork color */
  fork: number;
  /** Aura gradient: [inner r,g,b  →  outer r,g,b] */
  aura: { r: number; g: number; b: number }[];
  /** Core gradient: [center r,g,b  →  edge r,g,b] */
  core: { r: number; g: number; b: number }[];
  /** Flash gradient: [center r,g,b  →  edge r,g,b] */
  flash: { r: number; g: number; b: number }[];
}

const THEME_PALETTES: Record<string, ThemePalette> = {
  electric: {
    bright: 0xddeeff, glow: 0x4090ff, ring: 0x80c0ff, ringGlow: 0x3060ff,
    wisp: 0xa0d8ff, fork: 0xc0d8ff,
    aura:  [{ r: 30, g: 80, b: 200 }, { r: 50, g: 120, b: 255 }],
    core:  [{ r: 200, g: 230, b: 255 }, { r: 30, g: 70, b: 200 }],
    flash: [{ r: 200, g: 230, b: 255 }, { r: 40, g: 100, b: 255 }],
  },
  fire: {
    bright: 0xffddaa, glow: 0xff6020, ring: 0xff8040, ringGlow: 0xcc3300,
    wisp: 0xffaa44, fork: 0xffcc66,
    aura:  [{ r: 200, g: 60, b: 10 }, { r: 255, g: 120, b: 30 }],
    core:  [{ r: 255, g: 220, b: 150 }, { r: 200, g: 50, b: 10 }],
    flash: [{ r: 255, g: 200, b: 100 }, { r: 255, g: 60, b: 10 }],
  },
  winter: {
    bright: 0xeeffff, glow: 0x40aaff, ring: 0x90d0ff, ringGlow: 0x3080cc,
    wisp: 0xb0e0ff, fork: 0xd0eeff,
    aura:  [{ r: 30, g: 100, b: 200 }, { r: 80, g: 160, b: 255 }],
    core:  [{ r: 220, g: 240, b: 255 }, { r: 40, g: 100, b: 200 }],
    flash: [{ r: 220, g: 240, b: 255 }, { r: 60, g: 140, b: 255 }],
  },
  galaxy: {
    bright: 0xeeccff, glow: 0x9040ff, ring: 0xb070ff, ringGlow: 0x6030cc,
    wisp: 0xc090ff, fork: 0xddaaff,
    aura:  [{ r: 120, g: 40, b: 200 }, { r: 170, g: 80, b: 255 }],
    core:  [{ r: 240, g: 200, b: 255 }, { r: 100, g: 40, b: 200 }],
    flash: [{ r: 230, g: 200, b: 255 }, { r: 120, g: 50, b: 255 }],
  },
  void: {
    bright: 0xee99ff, glow: 0xaa20dd, ring: 0xcc44ff, ringGlow: 0x8800bb,
    wisp: 0xdd77ff, fork: 0xeeaaff,
    aura:  [{ r: 150, g: 20, b: 180 }, { r: 200, g: 60, b: 240 }],
    core:  [{ r: 250, g: 180, b: 255 }, { r: 130, g: 20, b: 180 }],
    flash: [{ r: 240, g: 180, b: 255 }, { r: 160, g: 30, b: 220 }],
  },
  aurora: {
    bright: 0xaaffcc, glow: 0x20cc70, ring: 0x60ffaa, ringGlow: 0x20aa60,
    wisp: 0x80ffbb, fork: 0xbbffdd,
    aura:  [{ r: 20, g: 160, b: 80 }, { r: 60, g: 220, b: 130 }],
    core:  [{ r: 200, g: 255, b: 220 }, { r: 20, g: 150, b: 80 }],
    flash: [{ r: 200, g: 255, b: 220 }, { r: 30, g: 200, b: 100 }],
  },
  rain: {
    bright: 0xbbccdd, glow: 0x5070aa, ring: 0x7090bb, ringGlow: 0x405880,
    wisp: 0x8099bb, fork: 0xaabbcc,
    aura:  [{ r: 50, g: 70, b: 120 }, { r: 80, g: 110, b: 160 }],
    core:  [{ r: 190, g: 210, b: 230 }, { r: 50, g: 70, b: 130 }],
    flash: [{ r: 200, g: 215, b: 235 }, { r: 60, g: 90, b: 160 }],
  },
  dark: {
    bright: 0xaaddff, glow: 0x3080cc, ring: 0x60a0dd, ringGlow: 0x2060aa,
    wisp: 0x80bbee, fork: 0xaaccee,
    aura:  [{ r: 20, g: 70, b: 160 }, { r: 40, g: 100, b: 200 }],
    core:  [{ r: 180, g: 220, b: 255 }, { r: 20, g: 60, b: 160 }],
    flash: [{ r: 180, g: 220, b: 255 }, { r: 30, g: 80, b: 200 }],
  },
  light: {
    bright: 0xffeedd, glow: 0xcc9944, ring: 0xddbb66, ringGlow: 0xaa8833,
    wisp: 0xddcc88, fork: 0xeeddaa,
    aura:  [{ r: 180, g: 140, b: 50 }, { r: 220, g: 180, b: 80 }],
    core:  [{ r: 255, g: 240, b: 200 }, { r: 180, g: 130, b: 40 }],
    flash: [{ r: 255, g: 240, b: 200 }, { r: 200, g: 150, b: 50 }],
  },
};

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
  private _palette: ThemePalette = THEME_PALETTES.electric;

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
    const p = this._palette.aura;
    const i = p[0], o = p[1];

    const g1 = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
    g1.addColorStop(0,    `rgba(${i.r},${i.g},${i.b},0)`);
    g1.addColorStop(0.35, `rgba(${i.r},${i.g},${i.b},0)`);
    g1.addColorStop(0.5,  `rgba(${(i.r+o.r)>>1},${(i.g+o.g)>>1},${(i.b+o.b)>>1},0.02)`);
    g1.addColorStop(0.6,  `rgba(${o.r},${o.g},${o.b},0.04)`);
    g1.addColorStop(0.7,  `rgba(${(i.r+o.r)>>1},${(i.g+o.g)>>1},${(i.b+o.b)>>1},0.03)`);
    g1.addColorStop(0.8,  `rgba(${i.r},${i.g},${i.b},0.015)`);
    g1.addColorStop(0.9,  `rgba(${i.r>>1},${i.g>>1},${i.b>>1},0.005)`);
    g1.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, size, size);

    if (this.auraTexture) {
      // Rebuild existing texture
      this.auraTexture.image = c;
      this.auraTexture.needsUpdate = true;
    } else {
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
  }

  // ── Core glow ─────────────────────────────────────────────────────────────

  private _buildCore(): void {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const cx = size / 2;
    const p = this._palette.core;
    const hi = p[0], lo = p[1];
    const mid = { r: (hi.r + lo.r) >> 1, g: (hi.g + lo.g) >> 1, b: (hi.b + lo.b) >> 1 };

    const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.85);
    g.addColorStop(0,    'rgba(255,255,255,0.95)');
    g.addColorStop(0.08, `rgba(${hi.r},${hi.g},${hi.b},0.85)`);
    g.addColorStop(0.2,  `rgba(${mid.r},${mid.g},${mid.b},0.6)`);
    g.addColorStop(0.4,  `rgba(${(mid.r+lo.r)>>1},${(mid.g+lo.g)>>1},${(mid.b+lo.b)>>1},0.3)`);
    g.addColorStop(0.65, `rgba(${lo.r},${lo.g},${lo.b},0.12)`);
    g.addColorStop(0.85, `rgba(${lo.r>>1},${lo.g>>1},${lo.b>>1},0.04)`);
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    if (this.coreTexture) {
      this.coreTexture.image = c;
      this.coreTexture.needsUpdate = true;
    } else {
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
        color: this._palette.ring,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      line.frustumCulled = false;

      // Glow line (slightly larger, lower opacity)
      const glowMat = new THREE.LineBasicMaterial({
        color: this._palette.ringGlow,
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
      color: this._palette.bright,
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
      color: this._palette.glow,
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
      color: this._palette.wisp,
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
    const p = this._palette.flash;
    const hi = p[0], lo = p[1];
    const mid = { r: (hi.r + lo.r) >> 1, g: (hi.g + lo.g) >> 1, b: (hi.b + lo.b) >> 1 };

    const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx * 0.7);
    g.addColorStop(0,    'rgba(255,255,255,1)');
    g.addColorStop(0.1,  `rgba(${hi.r},${hi.g},${hi.b},0.9)`);
    g.addColorStop(0.3,  `rgba(${mid.r},${mid.g},${mid.b},0.5)`);
    g.addColorStop(0.6,  `rgba(${lo.r},${lo.g},${lo.b},0.15)`);
    g.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    if (this.sparkFlashTexture) {
      this.sparkFlashTexture.image = c;
      this.sparkFlashTexture.needsUpdate = true;
    } else {
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
      color: this._palette.bright,
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
      color: this._palette.glow,
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
        color: this._palette.fork,
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

      for (let li = 0; li < bolt.lines.length; li++) {
        const mat = bolt.lines[li].material as THREE.LineBasicMaterial;
        // First line = main bolt (full flicker), rest = glow/forks (reduced)
        const isSecondary = li === 1; // glow line is always index 1
        mat.opacity = Math.min(isSecondary ? flicker * 0.4 : flicker, 1);
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

  /** Switch color palette to match the active theme's element identity. */
  setTheme(themeName: string): void {
    this._palette = THEME_PALETTES[themeName] || THEME_PALETTES.dark;
    // Rebuild canvas-based textures with new colors
    this._buildAura();
    this._buildCore();
    this._buildSparkFlash();
    // Rebuild orbit rings with new colors
    this._rebuildOrbitRings();
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
