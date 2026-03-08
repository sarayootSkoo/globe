/**
 * GlobeFireworks — 3D firework effect around the knowledge globe.
 *
 * Features:
 *   1. Rocket launch trails rising from globe surface
 *   2. Burst explosions with configurable size & particle count
 *   3. Middle-fire (secondary burst within main explosion)
 *   4. Colorful random mode — each firework picks from a vibrant HSL palette
 *   5. Special rainbow fireworks with color-cycling particles
 *   6. Gravity simulation on particles (falling trails)
 *   7. Speed rate control for launch frequency & animation speed
 *   8. Theme-adaptive color palettes
 *   9. No limit mode — unlimited concurrent fireworks
 *
 * Wired via themeEffects stores → GlobeCanvas subscriptions.
 */

import * as THREE from 'three';
import { GLOBE_RADIUS } from '../constants';

const R = GLOBE_RADIUS;

// ── Color palettes per theme ────────────────────────────────────────────────

interface FireworkPalette {
  /** Base firework colors (randomly picked per burst) */
  colors: number[];
  /** Trail/rocket color */
  trail: number;
  /** Flash center color */
  flash: number;
}

const THEME_PALETTES: Record<string, FireworkPalette> = {
  dark:     { colors: [0x00d4ff, 0xa855f7, 0xf97316, 0x10b981, 0xef4444, 0xfbbf24, 0x6366f1, 0xec4899], trail: 0xffeedd, flash: 0xffffff },
  light:    { colors: [0x3b82f6, 0x8b5cf6, 0xef4444, 0x10b981, 0xf59e0b, 0xec4899, 0x06b6d4, 0x84cc16], trail: 0xffcc66, flash: 0xffffee },
  fire:     { colors: [0xff4400, 0xff8800, 0xffcc00, 0xff2200, 0xffaa33, 0xff6600, 0xffdd44, 0xff0000], trail: 0xffaa44, flash: 0xffffff },
  winter:   { colors: [0x88ddff, 0xaaeeff, 0xccf0ff, 0x4488ff, 0x66bbff, 0xddffff, 0x99ccff, 0xbbddff], trail: 0xccddff, flash: 0xeeffff },
  galaxy:   { colors: [0xcc66ff, 0x9933ff, 0xff66cc, 0x6633ff, 0xaa44ff, 0xff44aa, 0xdd88ff, 0x7744ff], trail: 0xddaaff, flash: 0xffeeff },
  electric: { colors: [0x00aaff, 0x4488ff, 0x66ccff, 0x0066ff, 0x88ddff, 0x2266ff, 0x00ddff, 0x3399ff], trail: 0xaaddff, flash: 0xddeeff },
  void:     { colors: [0xcc44ff, 0xaa00dd, 0xee88ff, 0x8800bb, 0xdd66ff, 0x9900cc, 0xff99ff, 0xbb22ee], trail: 0xdd77ff, flash: 0xffddff },
  aurora:   { colors: [0x44ffaa, 0x22cc66, 0x88ffcc, 0x00ff88, 0x66ffbb, 0x33dd88, 0xaaffdd, 0x00cc55], trail: 0x88ffbb, flash: 0xddffee },
  rain:     { colors: [0x6688aa, 0x8899bb, 0xaabbcc, 0x5577aa, 0x7799bb, 0x99aabb, 0x4466aa, 0xbbccdd], trail: 0x8899bb, flash: 0xccddee },
};

// ── Special colorful palette (used when colorful mode is on) ────────────────

function generateRainbowColor(): number {
  const hue = Math.random() * 360;
  const c = new THREE.Color();
  c.setHSL(hue / 360, 0.9, 0.6);
  return c.getHex();
}

function generateRainbowColors(count: number): number[] {
  const colors: number[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(generateRainbowColor());
  }
  return colors;
}

// ── Interfaces ──────────────────────────────────────────────────────────────

interface FireworkRocket {
  /** Current position */
  position: THREE.Vector3;
  /** Velocity direction (outward from globe) */
  velocity: THREE.Vector3;
  /** Trail line */
  trail: THREE.Line;
  /** Trail positions buffer */
  trailPositions: number[];
  /** Life remaining */
  life: number;
  /** Max life (for fade calc) */
  maxLife: number;
  /** Color for the burst */
  burstColor: number;
  /** Is this a special rainbow firework? */
  isRainbow: boolean;
  /** Is this a middle-fire (secondary burst)? */
  isMiddleFire: boolean;
  /** Burst size multiplier */
  burstSize: number;
}

interface FireworkBurst {
  /** Points system for particles */
  points: THREE.Points;
  /** Velocities for each particle */
  velocities: Float32Array;
  /** Life remaining */
  life: number;
  /** Max life */
  maxLife: number;
  /** Whether particles cycle through rainbow */
  isRainbow: boolean;
  /** Spawn middle-fire sub-bursts? */
  middleFirePending: boolean;
  /** Position of this burst (for middle-fire spawning) */
  center: THREE.Vector3;
  /** Base color for non-rainbow mode */
  color: number;
  /** Burst size multiplier */
  sizeMultiplier: number;
}

// ── Constants ───────────────────────────────────────────────────────────────

const BASE_LAUNCH_INTERVAL = 0.8;  // seconds between rockets at rate=1
const ROCKET_SPEED = 350;           // units/second outward
const ROCKET_TRAIL_LEN = 12;       // trail point count
const BURST_PARTICLE_COUNT = 80;    // particles per burst at size=1
const BURST_LIFETIME = 1.8;         // seconds a burst lives
const GRAVITY_STRENGTH = 60;        // downward pull on burst particles
const MIDDLE_FIRE_DELAY = 0.3;      // seconds after burst to spawn middle-fire

export class GlobeFireworks {
  private group: THREE.Group;
  private scene: THREE.Scene;

  // Active fireworks
  private rockets: FireworkRocket[] = [];
  private bursts: FireworkBurst[] = [];

  // Timers
  private launchTimer = 0;

  // Settings
  private _enabled = false;
  private _speed = 1;          // animation speed multiplier
  private _launchRate = 1;     // rockets per interval multiplier
  private _burstSize = 1;      // particle count & spread multiplier
  private _middleFire = true;  // secondary inner burst enabled
  private _colorful = true;    // random colorful mode
  private _noLimit = false;    // unlimited concurrent fireworks
  private _time = 0;
  private _palette: FireworkPalette = THEME_PALETTES.dark;

  // Color picker — 0 means "use palette/random", otherwise specific hue 1-360
  private _pickedHue = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);
  }

  // ── Rocket launch ───────────────────────────────────────────────────────────

  private _launchRocket(isMiddleFire = false, origin?: THREE.Vector3, parentColor?: number): void {
    // Pick a random outward direction from globe surface
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const dir = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta),
    );

    const startPos = origin
      ? origin.clone()
      : dir.clone().multiplyScalar(R * 1.02);

    const velocity = dir.clone().multiplyScalar(ROCKET_SPEED * (isMiddleFire ? 0.4 : 1));

    // Determine burst color
    let burstColor: number;
    let isRainbow = false;

    if (this._pickedHue > 0) {
      // User picked a specific color
      const c = new THREE.Color();
      c.setHSL(this._pickedHue / 360, 0.9, 0.6);
      burstColor = c.getHex();
    } else if (parentColor !== undefined) {
      burstColor = parentColor;
    } else if (this._colorful) {
      // 20% chance of rainbow, 80% random vivid color
      if (Math.random() < 0.2) {
        isRainbow = true;
        burstColor = 0xffffff;
      } else {
        burstColor = generateRainbowColor();
      }
    } else {
      // Pick from theme palette
      const colors = this._palette.colors;
      burstColor = colors[Math.floor(Math.random() * colors.length)];
    }

    // Build trail line
    const trailPositions: number[] = [];
    for (let i = 0; i < ROCKET_TRAIL_LEN; i++) {
      trailPositions.push(startPos.x, startPos.y, startPos.z);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));

    const mat = new THREE.LineBasicMaterial({
      color: this._palette.trail,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const trail = new THREE.Line(geo, mat);
    trail.frustumCulled = false;
    this.group.add(trail);

    const maxLife = isMiddleFire ? 0.15 + Math.random() * 0.1 : 0.3 + Math.random() * 0.4;

    this.rockets.push({
      position: startPos.clone(),
      velocity,
      trail,
      trailPositions,
      life: maxLife,
      maxLife,
      burstColor,
      isRainbow,
      isMiddleFire,
      burstSize: isMiddleFire ? 0.4 : this._burstSize,
    });
  }

  // ── Burst creation ──────────────────────────────────────────────────────────

  private _createBurst(
    center: THREE.Vector3,
    color: number,
    isRainbow: boolean,
    sizeMultiplier: number,
    enableMiddleFire: boolean,
  ): void {
    const particleCount = Math.max(20, Math.round(BURST_PARTICLE_COUNT * sizeMultiplier));
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(color);
    const spread = R * 0.6 * sizeMultiplier;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      // Start at center
      positions[idx]     = center.x;
      positions[idx + 1] = center.y;
      positions[idx + 2] = center.z;

      // Random velocity in sphere
      const vTheta = Math.random() * Math.PI * 2;
      const vPhi = Math.acos(2 * Math.random() - 1);
      const speed = (0.3 + Math.random() * 0.7) * spread;
      velocities[idx]     = Math.sin(vPhi) * Math.cos(vTheta) * speed;
      velocities[idx + 1] = Math.cos(vPhi) * speed;
      velocities[idx + 2] = Math.sin(vPhi) * Math.sin(vTheta) * speed;

      // Color
      if (isRainbow) {
        const c = new THREE.Color();
        c.setHSL(Math.random(), 0.9, 0.65);
        colors[idx]     = c.r;
        colors[idx + 1] = c.g;
        colors[idx + 2] = c.b;
      } else {
        // Slight variation around base color
        const variation = 0.15;
        colors[idx]     = Math.min(1, baseColor.r + (Math.random() - 0.5) * variation);
        colors[idx + 1] = Math.min(1, baseColor.g + (Math.random() - 0.5) * variation);
        colors[idx + 2] = Math.min(1, baseColor.b + (Math.random() - 0.5) * variation);
      }

      sizes[i] = (2 + Math.random() * 4) * sizeMultiplier;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 5 * sizeMultiplier,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    this.group.add(points);

    this.bursts.push({
      points,
      velocities,
      life: BURST_LIFETIME,
      maxLife: BURST_LIFETIME,
      isRainbow,
      middleFirePending: enableMiddleFire && this._middleFire,
      center: center.clone(),
      color,
      sizeMultiplier,
    });
  }

  // ── Per-frame update ──────────────────────────────────────────────────────

  update(dt: number): void {
    if (!this._enabled) {
      this.group.visible = false;
      return;
    }
    this.group.visible = true;

    const spd = this._speed;
    this._time += dt * spd;
    const effectiveDt = dt * spd;

    // ── Launch new rockets ────────────────────────────────────────────────
    this.launchTimer -= effectiveDt * this._launchRate;
    if (this.launchTimer <= 0) {
      const maxActive = this._noLimit ? Infinity : 20;
      if (this.rockets.length + this.bursts.length < maxActive || this._noLimit) {
        // Launch 1-3 rockets per batch for variety
        const batchSize = 1 + Math.floor(Math.random() * Math.min(3, Math.ceil(this._launchRate)));
        for (let i = 0; i < batchSize; i++) {
          this._launchRocket();
        }
      }
      this.launchTimer = BASE_LAUNCH_INTERVAL * (0.5 + Math.random() * 0.5);
    }

    // ── Update rockets ──────────────────────────────────────────────────
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const rocket = this.rockets[i];
      rocket.life -= effectiveDt;

      // Move rocket outward
      rocket.position.add(rocket.velocity.clone().multiplyScalar(effectiveDt));

      // Update trail — shift positions and add current position at head
      const tp = rocket.trailPositions;
      for (let j = tp.length - 3; j >= 3; j -= 3) {
        tp[j] = tp[j - 3];
        tp[j + 1] = tp[j - 2];
        tp[j + 2] = tp[j - 1];
      }
      tp[0] = rocket.position.x;
      tp[1] = rocket.position.y;
      tp[2] = rocket.position.z;

      const posAttr = rocket.trail.geometry.getAttribute('position') as THREE.BufferAttribute;
      (posAttr.array as Float32Array).set(tp);
      posAttr.needsUpdate = true;

      // Fade trail
      const fade = Math.max(0, rocket.life / rocket.maxLife);
      (rocket.trail.material as THREE.LineBasicMaterial).opacity = fade * 0.8;

      if (rocket.life <= 0) {
        // Explode!
        this._createBurst(
          rocket.position.clone(),
          rocket.burstColor,
          rocket.isRainbow,
          rocket.burstSize,
          !rocket.isMiddleFire, // only top-level rockets can spawn middle-fire
        );

        // Cleanup rocket
        this.group.remove(rocket.trail);
        rocket.trail.geometry.dispose();
        (rocket.trail.material as THREE.Material).dispose();
        this.rockets.splice(i, 1);
      }
    }

    // ── Update bursts ──────────────────────────────────────────────────
    const gravDir = new THREE.Vector3(0, -1, 0); // global down for gravity

    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const burst = this.bursts[i];
      burst.life -= effectiveDt;

      if (burst.life <= 0) {
        this.group.remove(burst.points);
        burst.points.geometry.dispose();
        (burst.points.material as THREE.Material).dispose();
        this.bursts.splice(i, 1);
        continue;
      }

      // Spawn middle-fire sub-bursts
      if (burst.middleFirePending && burst.life < burst.maxLife - MIDDLE_FIRE_DELAY) {
        burst.middleFirePending = false;
        // Launch 2-4 small middle-fire rockets from burst center
        const mfCount = 2 + Math.floor(Math.random() * 3);
        for (let m = 0; m < mfCount; m++) {
          this._launchRocket(true, burst.center, burst.color);
        }
      }

      const t = burst.life / burst.maxLife;
      const posAttr = burst.points.geometry.getAttribute('position') as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      const vels = burst.velocities;
      const particleCount = positions.length / 3;

      // Update particle positions with velocity + gravity
      for (let p = 0; p < particleCount; p++) {
        const idx = p * 3;

        // Apply gravity
        vels[idx + 1] -= GRAVITY_STRENGTH * effectiveDt;

        // Apply drag (air resistance)
        const drag = 1 - 0.5 * effectiveDt;
        vels[idx]     *= drag;
        vels[idx + 1] *= drag;
        vels[idx + 2] *= drag;

        // Move
        positions[idx]     += vels[idx] * effectiveDt;
        positions[idx + 1] += vels[idx + 1] * effectiveDt;
        positions[idx + 2] += vels[idx + 2] * effectiveDt;
      }
      posAttr.needsUpdate = true;

      // Rainbow color cycling
      if (burst.isRainbow) {
        const colorAttr = burst.points.geometry.getAttribute('color') as THREE.BufferAttribute;
        const colors = colorAttr.array as Float32Array;
        const c = new THREE.Color();
        for (let p = 0; p < particleCount; p++) {
          const idx = p * 3;
          const hue = ((this._time * 0.5 + p / particleCount) % 1);
          c.setHSL(hue, 0.9, 0.65);
          colors[idx]     = c.r;
          colors[idx + 1] = c.g;
          colors[idx + 2] = c.b;
        }
        colorAttr.needsUpdate = true;
      }

      // Fade out
      const fadeStart = 0.4; // start fading at 40% life remaining
      const opacity = t > fadeStart ? 1 : t / fadeStart;
      (burst.points.material as THREE.PointsMaterial).opacity = opacity;

      // Shrink particles as they age
      (burst.points.material as THREE.PointsMaterial).size =
        (3 + 2 * burst.sizeMultiplier) * Math.max(0.3, t);
    }
  }

  // ── Public API ────────────────────────────────────────────────────────────

  setEnabled(enabled: boolean): void {
    this._enabled = enabled;
    if (!enabled) this._clearAll();
  }

  setTheme(themeName: string): void {
    this._palette = THEME_PALETTES[themeName] || THEME_PALETTES.dark;
  }

  setSpeed(v: number): void        { this._speed = v; }
  setLaunchRate(v: number): void    { this._launchRate = v; }
  setBurstSize(v: number): void     { this._burstSize = v; }
  setMiddleFire(v: boolean): void   { this._middleFire = v; }
  setColorful(v: boolean): void     { this._colorful = v; }
  setNoLimit(v: boolean): void      { this._noLimit = v; }
  setPickedHue(v: number): void     { this._pickedHue = v; }

  private _clearAll(): void {
    for (const rocket of this.rockets) {
      this.group.remove(rocket.trail);
      rocket.trail.geometry.dispose();
      (rocket.trail.material as THREE.Material).dispose();
    }
    this.rockets = [];

    for (const burst of this.bursts) {
      this.group.remove(burst.points);
      burst.points.geometry.dispose();
      (burst.points.material as THREE.Material).dispose();
    }
    this.bursts = [];
  }

  dispose(): void {
    this._clearAll();
    this.scene.remove(this.group);
  }
}
