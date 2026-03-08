interface Star {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;           // base alpha
  twinkle: number;     // phase offset (radians)
  twinkleSpeed: number;
  bright: boolean;
}

interface MeshPoint {
  x: number;
  y: number;
}

type MeshEdge = [number, number];

// ── Fire ember particle ────────────────────────────────────────────────────
interface Ember {
  x: number;
  y: number;
  r: number;         // radius
  vx: number;
  vy: number;        // negative = rises
  life: number;      // 0..1 remaining
  decay: number;     // life lost per frame
  hue: number;       // 0=red, 30=orange, 50=yellow
}

// ── Snowflake particle ─────────────────────────────────────────────────────
interface Snowflake {
  x: number;
  y: number;
  r: number;
  vx: number;        // gentle horizontal drift
  vy: number;        // positive = falls
  a: number;         // alpha
  wobble: number;    // sine phase for swaying
  wobbleSpeed: number;
}

/** Total star count (12 of them are "bright" with a glow halo) */
const STAR_COUNT = 180;
const BRIGHT_COUNT = 12;

/** Grid connection distance as a fraction of the shorter viewport dimension */
const MESH_DIST_FACTOR = 0.18;

const EMBER_COUNT = 120;
const SNOWFLAKE_COUNT = 100;

// ── Galaxy nebula cloud ────────────────────────────────────────────────────
interface NebulaCloud {
  x: number;
  y: number;
  r: number;         // cloud radius
  vx: number;
  vy: number;
  hue: number;       // 260=purple, 300=pink, 200=blue
  a: number;         // alpha
  pulse: number;     // phase
  pulseSpeed: number;
}

// ── Galaxy glitter sparkle ─────────────────────────────────────────────────
interface Glitter {
  x: number;
  y: number;
  r: number;
  hue: number;         // color hue (purple/pink/cyan range)
  phase: number;       // flash phase
  speed: number;       // flash speed — high = rapid shimmer
  peakAlpha: number;   // max brightness
  onDuration: number;  // fraction of cycle that is "on" (0..1)
}

// ── Galaxy shooting star (comet) ───────────────────────────────────────────
interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;         // tail length in pixels
  life: number;        // 0..1 remaining
  decay: number;       // life lost per frame
  hue: number;         // trail hue
  r: number;           // head radius
}

const NEBULA_COUNT = 50;
const GLITTER_COUNT = 200;
const SHOOTING_STAR_MAX = 4;  // max concurrent shooting stars

// ── Electric lightning bolt ───────────────────────────────────────────────
interface LightningBolt {
  x0: number; y0: number;     // start point
  x1: number; y1: number;     // end point
  life: number;               // 0..1 remaining
  decay: number;
  segments: { x: number; y: number }[];  // jagged path points
  branches: { x: number; y: number }[][]; // forked sub-paths
  width: number;
  hue: number;                // 200–240 range (blue to electric blue)
}

// ── Electric plasma spark ─────────────────────────────────────────────────
interface PlasmaSpark {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  decay: number;
  r: number;
  hue: number;
}

const LIGHTNING_MAX = 3;      // max concurrent lightning bolts
const PLASMA_SPARK_COUNT = 80;

export type ParticleTheme = 'dark' | 'light' | 'fire' | 'winter' | 'galaxy' | 'electric';

/** Runtime-adjustable settings pushed from the UI stores */
export interface EffectSettings {
  density: number;        // 0–2, multiplier for particle counts on rebuild
  speed: number;          // 0.25–3, multiplier for all velocities
  showNebula: boolean;
  showGlitter: boolean;
  showShootingStars: boolean;
  showEmbers: boolean;
  showSnowflakes: boolean;
  showLightning: boolean;
  showBgStars: boolean;
  showBgMesh: boolean;
}

const DEFAULT_SETTINGS: EffectSettings = {
  density: 1, speed: 1,
  showNebula: true, showGlitter: true, showShootingStars: true,
  showEmbers: true, showSnowflakes: true, showLightning: true,
  showBgStars: true, showBgMesh: true,
};

export class ParticleBackground {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  private stars: Star[] = [];
  private meshPts: MeshPoint[] = [];
  private meshEdges: MeshEdge[] = [];
  private _r: number;
  private _g: number;
  private _b: number;

  private _theme: ParticleTheme = 'dark';
  private _settings: EffectSettings = { ...DEFAULT_SETTINGS };

  // Fire-specific
  private embers: Ember[] = [];

  // Winter-specific
  private snowflakes: Snowflake[] = [];

  // Galaxy-specific
  private nebulaClouds: NebulaCloud[] = [];
  private glitters: Glitter[] = [];
  private shootingStars: ShootingStar[] = [];
  private _shootingTimer = 0;       // frames until next comet spawns
  private _frameCount = 0;          // global frame counter for time-based fx

  // Electric-specific
  private lightningBolts: LightningBolt[] = [];
  private _lightningTimer = 0;
  private plasmaSparks: PlasmaSpark[] = [];

  animId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('ParticleBackground: could not get 2D canvas context');
    this.ctx = ctx;

    // Initialise color from the CSS variable (falls back to accent cyan)
    const [r, g, b] = this._readCSSColor();
    this._r = r;
    this._g = g;
    this._b = b;

    this._buildParticles(canvas.width, canvas.height);
    this._buildEmbers(canvas.width, canvas.height);
    this._buildSnowflakes(canvas.width, canvas.height);
    this._buildNebula(canvas.width, canvas.height);
    this._buildGlitter(canvas.width, canvas.height);
    this._buildPlasma(canvas.width, canvas.height);
  }

  // ── Initialisation ──────────────────────────────────────────────────────────

  private _buildParticles(W: number, H: number): void {
    // Stars: BRIGHT_COUNT large twinkling dots + the rest are small dim ones
    this.stars = Array.from({ length: STAR_COUNT }, (_, i) => {
      const bright = i < BRIGHT_COUNT;
      return {
        x:            Math.random() * W,
        y:            Math.random() * H,
        r:            bright
                        ? Math.random() * 1.5 + 1
                        : Math.random() * 0.8 + 0.2,
        vx:           (Math.random() - 0.5) * 0.06,
        vy:           (Math.random() - 0.5) * 0.06,
        a:            bright
                        ? Math.random() * 0.4 + 0.5
                        : Math.random() * 0.25 + 0.05,
        twinkle:      Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        bright,
      };
    });

    // Static grid of 60 points used to draw a faint mesh underneath the stars
    this.meshPts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
    }));

    // Pre-compute which mesh pairs are close enough to connect
    const maxDist = Math.min(W, H) * MESH_DIST_FACTOR;
    this.meshEdges = [];
    for (let i = 0; i < this.meshPts.length; i++) {
      for (let j = i + 1; j < this.meshPts.length; j++) {
        const dx = this.meshPts[i].x - this.meshPts[j].x;
        const dy = this.meshPts[i].y - this.meshPts[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < maxDist) {
          this.meshEdges.push([i, j]);
        }
      }
    }
  }

  private _buildEmbers(W: number, H: number): void {
    this.embers = Array.from({ length: EMBER_COUNT }, () => this._spawnEmber(W, H));
  }

  private _spawnEmber(W: number, H: number): Ember {
    return {
      x: Math.random() * W,
      y: H * (0.6 + Math.random() * 0.4), // spawn in bottom 40%
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.5 + 0.3),   // rise upward
      life: 1,
      decay: Math.random() * 0.005 + 0.002,
      hue: Math.random() * 50,             // 0=red → 50=yellow
    };
  }

  private _buildSnowflakes(W: number, H: number): void {
    this.snowflakes = Array.from({ length: SNOWFLAKE_COUNT }, () => this._spawnSnowflake(W, H));
  }

  private _spawnSnowflake(W: number, H: number): Snowflake {
    return {
      x: Math.random() * W,
      y: Math.random() * -H * 0.3,  // spawn above viewport
      r: Math.random() * 2.5 + 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.8 + 0.2,
      a: Math.random() * 0.5 + 0.3,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
    };
  }

  private _buildNebula(W: number, H: number): void {
    this.nebulaClouds = Array.from({ length: NEBULA_COUNT }, () => this._spawnNebula(W, H));
  }

  private _spawnNebula(W: number, H: number): NebulaCloud {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 100 + 40,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      hue: 220 + Math.random() * 120,  // 220=blue → 340=magenta
      a: Math.random() * 0.05 + 0.015,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.008 + 0.003,
    };
  }

  private _buildGlitter(W: number, H: number): void {
    this.glitters = Array.from({ length: GLITTER_COUNT }, () => this._spawnGlitter(W, H));
    this.shootingStars = [];
    this._shootingTimer = 60 + Math.random() * 120;
  }

  private _spawnGlitter(W: number, H: number): Glitter {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      hue: 220 + Math.random() * 140,    // blue → pink
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.15 + 0.05, // fast shimmer
      peakAlpha: Math.random() * 0.7 + 0.3,
      onDuration: Math.random() * 0.3 + 0.05, // sparkle is brief
    };
  }

  private _buildPlasma(W: number, H: number): void {
    this.plasmaSparks = Array.from({ length: PLASMA_SPARK_COUNT }, () => this._spawnPlasmaSpark(W, H));
    this.lightningBolts = [];
    this._lightningTimer = 30 + Math.random() * 60;
  }

  private _spawnPlasmaSpark(W: number, H: number): PlasmaSpark {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      life: 1,
      decay: Math.random() * 0.008 + 0.003,
      r: Math.random() * 2 + 0.5,
      hue: 200 + Math.random() * 40,
    };
  }

  private _spawnLightning(W: number, H: number): LightningBolt {
    // Random start and end, biased toward screen edges
    const fromEdge = Math.random() > 0.3;
    let x0: number, y0: number, x1: number, y1: number;

    if (fromEdge) {
      const edge = Math.floor(Math.random() * 4);
      switch (edge) {
        case 0: x0 = Math.random() * W; y0 = 0; break;
        case 1: x0 = W; y0 = Math.random() * H; break;
        case 2: x0 = Math.random() * W; y0 = H; break;
        default: x0 = 0; y0 = Math.random() * H; break;
      }
      x1 = x0 + (Math.random() - 0.5) * W * 0.6;
      y1 = y0 + (Math.random() - 0.5) * H * 0.6;
    } else {
      x0 = Math.random() * W;
      y0 = Math.random() * H;
      x1 = x0 + (Math.random() - 0.5) * 300;
      y1 = y0 + (Math.random() - 0.5) * 300;
    }

    // Generate jagged segments
    const segCount = 12 + Math.floor(Math.random() * 10);
    const segments: { x: number; y: number }[] = [];
    const branches: { x: number; y: number }[][] = [];

    for (let i = 0; i <= segCount; i++) {
      const t = i / segCount;
      const baseX = x0 + (x1 - x0) * t;
      const baseY = y0 + (y1 - y0) * t;
      const jitter = (1 - Math.abs(t - 0.5) * 2) * 40; // max jitter at midpoint
      const x = baseX + (Math.random() - 0.5) * jitter;
      const y = baseY + (Math.random() - 0.5) * jitter;
      segments.push({ x, y });

      // Fork branches at ~30% chance per midpoint segment
      if (i > 2 && i < segCount - 2 && Math.random() < 0.3) {
        const branchSegs: { x: number; y: number }[] = [{ x, y }];
        let bx = x, by = y;
        const bLen = 3 + Math.floor(Math.random() * 4);
        const bAngle = Math.atan2(y1 - y0, x1 - x0) + (Math.random() - 0.5) * Math.PI * 0.8;
        for (let j = 0; j < bLen; j++) {
          bx += Math.cos(bAngle) * (15 + Math.random() * 10) + (Math.random() - 0.5) * 8;
          by += Math.sin(bAngle) * (15 + Math.random() * 10) + (Math.random() - 0.5) * 8;
          branchSegs.push({ x: bx, y: by });
        }
        branches.push(branchSegs);
      }
    }

    return {
      x0, y0, x1, y1,
      life: 1,
      decay: 0.03 + Math.random() * 0.04,
      segments,
      branches,
      width: 1.5 + Math.random() * 2,
      hue: 200 + Math.random() * 40,
    };
  }

  private _spawnShootingStar(W: number, H: number): ShootingStar {
    // Pick a random edge to start from (top or right side for natural diagonal)
    const fromTop = Math.random() > 0.4;
    const angle = (Math.random() * 0.4 + 0.3) * Math.PI; // 55°–125° downward-ish
    const speed = Math.random() * 6 + 4;

    return {
      x: fromTop ? Math.random() * W : W + 20,
      y: fromTop ? -20 : Math.random() * H * 0.4,
      vx: -Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: Math.random() * 80 + 60,
      life: 1,
      decay: Math.random() * 0.008 + 0.005,
      hue: 240 + Math.random() * 80,
      r: Math.random() * 1.5 + 1,
    };
  }

  // ── Animation ────────────────────────────────────────────────────────────────

  start(): void {
    if (this.animId !== null) return; // already running
    const loop = () => {
      this._draw();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private _draw(): void {
    const { ctx, canvas, _settings: s } = this;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    if (this._theme === 'fire') {
      this._drawFireBackground(W, H);
      if (s.showEmbers) this._drawEmbers(W, H);
    } else if (this._theme === 'winter') {
      this._drawWinterBackground(W, H);
      if (s.showSnowflakes) this._drawSnowflakes(W, H);
    } else if (this._theme === 'galaxy') {
      this._frameCount++;
      this._drawGalaxyBackground(W, H);
      if (s.showNebula) this._drawNebulaClouds(W, H);
      if (s.showGlitter) this._drawGlitter(W, H);
      if (s.showShootingStars) this._drawShootingStars(W, H);
    } else if (this._theme === 'electric') {
      this._frameCount++;
      this._drawElectricBackground(W, H);
      if (s.showLightning) this._drawLightning(W, H);
      this._drawPlasmaSparks(W, H);
    }

    // Base layers (shared across all themes)
    if (s.showBgMesh) this._drawMesh(W, H);
    if (s.showBgStars) this._drawStars(W, H);
  }

  private _drawMesh(W: number, H: number): void {
    const { ctx } = this;
    const pc = `${this._r},${this._g},${this._b}`;

    ctx.strokeStyle = `rgba(${pc},0.04)`;
    ctx.lineWidth = 0.5;
    this.meshEdges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(this.meshPts[i].x, this.meshPts[i].y);
      ctx.lineTo(this.meshPts[j].x, this.meshPts[j].y);
      ctx.stroke();
    });
  }

  private _drawStars(_W: number, _H: number): void {
    const { ctx } = this;
    const W = _W;
    const H = _H;
    const pc = `${this._r},${this._g},${this._b}`;
    const spd = this._settings.speed;

    this.stars.forEach(p => {
      // Drift slowly across the canvas and wrap at edges
      p.x += p.vx * spd;
      p.y += p.vy * spd;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      p.twinkle += p.twinkleSpeed * spd;
      const flicker = p.bright ? (0.7 + 0.3 * Math.sin(p.twinkle)) : 1;
      const alpha = p.a * flicker;

      if (p.bright) {
        // Bright stars get a soft radial glow halo
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0,   `rgba(${pc},${alpha})`);
        grad.addColorStop(0.3, `rgba(${pc},${alpha * 0.3})`);
        grad.addColorStop(1,   `rgba(${pc},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pc},${alpha})`;
      ctx.fill();
    });
  }

  // ── Fire Effects ─────────────────────────────────────────────────────────────

  private _drawFireBackground(W: number, H: number): void {
    const { ctx } = this;
    // Warm glow from bottom
    const grad = ctx.createLinearGradient(0, H, 0, H * 0.3);
    grad.addColorStop(0, 'rgba(255, 60, 0, 0.06)');
    grad.addColorStop(0.4, 'rgba(255, 120, 20, 0.02)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  private _drawEmbers(W: number, H: number): void {
    const { ctx } = this;
    const spd = this._settings.speed;

    this.embers.forEach((e, idx) => {
      e.x += e.vx * spd;
      e.y += e.vy * spd;
      e.life -= e.decay * spd;

      // Slight horizontal drift variation
      e.vx += (Math.random() - 0.5) * 0.05;

      if (e.life <= 0 || e.y < -20 || e.x < -20 || e.x > W + 20) {
        this.embers[idx] = this._spawnEmber(W, H);
        return;
      }

      const alpha = e.life * 0.8;

      // Glow halo
      const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 6);
      const hsl = `hsl(${e.hue}, 100%, 55%)`;
      grad.addColorStop(0, `hsla(${e.hue}, 100%, 65%, ${alpha * 0.6})`);
      grad.addColorStop(0.3, `hsla(${e.hue}, 100%, 50%, ${alpha * 0.2})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core ember
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fillStyle = hsl.replace(')', `,${alpha})`).replace('hsl', 'hsla');
      ctx.fill();
    });
  }

  // ── Winter Effects ───────────────────────────────────────────────────────────

  private _drawWinterBackground(W: number, H: number): void {
    const { ctx } = this;
    // Subtle icy-blue vignette from top
    const grad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
    grad.addColorStop(0, 'rgba(100, 180, 255, 0.04)');
    grad.addColorStop(0.5, 'rgba(140, 200, 255, 0.015)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  private _drawSnowflakes(W: number, H: number): void {
    const { ctx } = this;
    const spd = this._settings.speed;

    this.snowflakes.forEach((s, idx) => {
      s.wobble += s.wobbleSpeed * spd;
      s.x += (s.vx + Math.sin(s.wobble) * 0.4) * spd;
      s.y += s.vy * spd;

      // Reset if off-screen
      if (s.y > H + 20 || s.x < -30 || s.x > W + 30) {
        this.snowflakes[idx] = this._spawnSnowflake(W, H);
        this.snowflakes[idx].y = -5; // spawn at top
        return;
      }

      const alpha = s.a;

      // Snowflake glow
      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
      grad.addColorStop(0, `rgba(220, 240, 255, ${alpha * 0.7})`);
      grad.addColorStop(0.4, `rgba(180, 220, 255, ${alpha * 0.2})`);
      grad.addColorStop(1, 'rgba(180, 220, 255, 0)');
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw a tiny snowflake shape (6-arm star)
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.strokeStyle = `rgba(220, 240, 255, ${alpha})`;
      ctx.lineWidth = 0.5;
      for (let arm = 0; arm < 6; arm++) {
        const angle = (arm / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * s.r * 1.5, Math.sin(angle) * s.r * 1.5);
        ctx.stroke();
      }
      ctx.restore();

      // Center dot
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 248, 255, ${alpha})`;
      ctx.fill();
    });
  }

  // ── Galaxy Effects ──────────────────────────────────────────────────────────

  private _drawGalaxyBackground(W: number, H: number): void {
    const { ctx } = this;
    const cx = W / 2;
    const cy = H / 2;

    // Layer 1: deep purple radial vignette from center
    const maxR = Math.max(W, H) * 0.8;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    grad.addColorStop(0, 'rgba(80, 20, 140, 0.05)');
    grad.addColorStop(0.3, 'rgba(50, 10, 100, 0.035)');
    grad.addColorStop(0.6, 'rgba(20, 5, 60, 0.02)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Layer 2: subtle teal accent glow (offset from center)
    const g2 = ctx.createRadialGradient(cx * 0.6, cy * 1.3, 0, cx * 0.6, cy * 1.3, maxR * 0.4);
    g2.addColorStop(0, 'rgba(0, 200, 180, 0.025)');
    g2.addColorStop(0.5, 'rgba(0, 100, 140, 0.01)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    // Layer 3: warm pink accent glow (opposite corner)
    const g3 = ctx.createRadialGradient(cx * 1.4, cy * 0.5, 0, cx * 1.4, cy * 0.5, maxR * 0.35);
    g3.addColorStop(0, 'rgba(220, 60, 180, 0.02)');
    g3.addColorStop(0.5, 'rgba(160, 30, 120, 0.008)');
    g3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, W, H);
  }

  private _drawNebulaClouds(W: number, H: number): void {
    const { ctx } = this;

    const spd = this._settings.speed;
    this.nebulaClouds.forEach(c => {
      c.x += c.vx * spd;
      c.y += c.vy * spd;
      c.pulse += c.pulseSpeed * spd;

      // Wrap around edges
      if (c.x < -c.r) c.x = W + c.r;
      if (c.x > W + c.r) c.x = -c.r;
      if (c.y < -c.r) c.y = H + c.r;
      if (c.y > H + c.r) c.y = -c.r;

      const pulseAlpha = c.a * (0.6 + 0.4 * Math.sin(c.pulse));

      // Outer diffuse layer
      const g1 = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r * 1.3);
      g1.addColorStop(0, `hsla(${c.hue}, 60%, 45%, ${pulseAlpha * 0.5})`);
      g1.addColorStop(0.4, `hsla(${c.hue}, 50%, 30%, ${pulseAlpha * 0.2})`);
      g1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      // Inner bright core
      const g2 = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r * 0.5);
      g2.addColorStop(0, `hsla(${c.hue + 20}, 80%, 65%, ${pulseAlpha * 0.8})`);
      g2.addColorStop(0.5, `hsla(${c.hue + 10}, 70%, 50%, ${pulseAlpha * 0.3})`);
      g2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();
    });
  }

  private _drawGlitter(W: number, H: number): void {
    const { ctx } = this;
    const spd = this._settings.speed;

    this.glitters.forEach(g => {
      g.phase += g.speed * spd;

      // Compute flash: sparkle is a narrow spike in a sine wave
      // sin(phase) > (1 - onDuration) means the glitter is "on"
      const sine = Math.sin(g.phase);
      const threshold = 1 - g.onDuration * 2;
      if (sine < threshold) return; // glitter is off this frame

      // Map the "on" portion to 0..1 for alpha
      const t = (sine - threshold) / (1 - threshold);
      const alpha = g.peakAlpha * t;

      // Sparkle glow
      const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r * 5);
      grad.addColorStop(0, `hsla(${g.hue}, 80%, 80%, ${alpha * 0.5})`);
      grad.addColorStop(0.3, `hsla(${g.hue}, 70%, 60%, ${alpha * 0.15})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // 4-point star cross for sparkle shape
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.strokeStyle = `hsla(${g.hue}, 90%, 85%, ${alpha})`;
      ctx.lineWidth = 0.5;
      const armLen = g.r * 3;
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(0, -armLen);
      ctx.lineTo(0, armLen);
      ctx.stroke();
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(-armLen, 0);
      ctx.lineTo(armLen, 0);
      ctx.stroke();
      // Diagonal lines (shorter)
      const diagLen = armLen * 0.5;
      ctx.beginPath();
      ctx.moveTo(-diagLen, -diagLen);
      ctx.lineTo(diagLen, diagLen);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(diagLen, -diagLen);
      ctx.lineTo(-diagLen, diagLen);
      ctx.stroke();
      ctx.restore();

      // Bright center dot
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${g.hue}, 100%, 95%, ${alpha})`;
      ctx.fill();
    });
  }

  private _drawShootingStars(W: number, H: number): void {
    const { ctx } = this;
    const spd = this._settings.speed;

    // Spawn new shooting stars on timer
    this._shootingTimer -= spd;
    if (this._shootingTimer <= 0 && this.shootingStars.length < SHOOTING_STAR_MAX) {
      this.shootingStars.push(this._spawnShootingStar(W, H));
      this._shootingTimer = 80 + Math.random() * 200;
    }

    // Update and draw
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += s.vx * spd;
      s.y += s.vy * spd;
      s.life -= s.decay * spd;

      // Remove if dead or far off-screen
      if (s.life <= 0 || s.x < -200 || s.x > W + 200 || s.y > H + 200) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const alpha = s.life;

      // Calculate tail direction (opposite of velocity)
      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      const tailX = s.x - (s.vx / speed) * s.len;
      const tailY = s.y - (s.vy / speed) * s.len;

      // Draw comet tail as gradient line
      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, `hsla(${s.hue}, 60%, 70%, 0)`);
      grad.addColorStop(0.5, `hsla(${s.hue}, 70%, 75%, ${alpha * 0.3})`);
      grad.addColorStop(0.85, `hsla(${s.hue + 30}, 80%, 80%, ${alpha * 0.6})`);
      grad.addColorStop(1, `hsla(0, 0%, 100%, ${alpha * 0.9})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.r * 1.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Thinner bright inner trail
      ctx.beginPath();
      ctx.moveTo(tailX + (s.x - tailX) * 0.4, tailY + (s.y - tailY) * 0.4);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = `hsla(0, 0%, 100%, ${alpha * 0.5})`;
      ctx.lineWidth = s.r * 0.6;
      ctx.stroke();

      // Bright head glow
      const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
      headGrad.addColorStop(0, `hsla(0, 0%, 100%, ${alpha * 0.8})`);
      headGrad.addColorStop(0.2, `hsla(${s.hue + 20}, 80%, 80%, ${alpha * 0.4})`);
      headGrad.addColorStop(0.5, `hsla(${s.hue}, 60%, 60%, ${alpha * 0.1})`);
      headGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();

      // Head core
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }

    ctx.lineCap = 'butt'; // reset
  }

  // ── Electric Effects ────────────────────────────────────────────────────────

  private _drawElectricBackground(W: number, H: number): void {
    const { ctx } = this;
    // Dark blue ambient glow from center
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.max(W, H) * 0.7;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    grad.addColorStop(0, 'rgba(20, 40, 100, 0.04)');
    grad.addColorStop(0.4, 'rgba(10, 20, 60, 0.025)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Pulsing electric aura
    const pulse = Math.sin(this._frameCount * 0.03) * 0.5 + 0.5;
    const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.5);
    g2.addColorStop(0, `rgba(60, 140, 255, ${0.02 * pulse})`);
    g2.addColorStop(0.5, `rgba(30, 80, 200, ${0.01 * pulse})`);
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  private _drawLightning(W: number, H: number): void {
    const { ctx } = this;
    const spd = this._settings.speed;

    // Spawn new bolts on timer
    this._lightningTimer -= spd;
    if (this._lightningTimer <= 0 && this.lightningBolts.length < LIGHTNING_MAX) {
      this.lightningBolts.push(this._spawnLightning(W, H));
      this._lightningTimer = 40 + Math.random() * 80;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = this.lightningBolts.length - 1; i >= 0; i--) {
      const bolt = this.lightningBolts[i];
      bolt.life -= bolt.decay * spd;

      if (bolt.life <= 0) {
        this.lightningBolts.splice(i, 1);
        continue;
      }

      // Lightning flickers — alpha oscillates rapidly during life
      const flicker = bolt.life * (0.5 + 0.5 * Math.sin(this._frameCount * 0.8 + i * 5));
      const alpha = flicker;

      // Draw main bolt
      this._drawBoltPath(bolt.segments, bolt.width, bolt.hue, alpha);

      // Draw branches (thinner)
      for (const branch of bolt.branches) {
        this._drawBoltPath(branch, bolt.width * 0.5, bolt.hue + 10, alpha * 0.6);
      }

      // Impact glow at both ends
      for (const pt of [bolt.segments[0], bolt.segments[bolt.segments.length - 1]]) {
        const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 30);
        glow.addColorStop(0, `hsla(${bolt.hue}, 90%, 80%, ${alpha * 0.4})`);
        glow.addColorStop(0.4, `hsla(${bolt.hue}, 80%, 60%, ${alpha * 0.1})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }

    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.restore();
  }

  private _drawBoltPath(
    segments: { x: number; y: number }[],
    width: number,
    hue: number,
    alpha: number,
  ): void {
    const { ctx } = this;
    if (segments.length < 2) return;

    // Outer glow (wide, dim)
    ctx.beginPath();
    ctx.moveTo(segments[0].x, segments[0].y);
    for (let j = 1; j < segments.length; j++) {
      ctx.lineTo(segments[j].x, segments[j].y);
    }
    ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${alpha * 0.15})`;
    ctx.lineWidth = width * 6;
    ctx.stroke();

    // Mid glow
    ctx.beginPath();
    ctx.moveTo(segments[0].x, segments[0].y);
    for (let j = 1; j < segments.length; j++) {
      ctx.lineTo(segments[j].x, segments[j].y);
    }
    ctx.strokeStyle = `hsla(${hue}, 85%, 75%, ${alpha * 0.4})`;
    ctx.lineWidth = width * 2.5;
    ctx.stroke();

    // Bright core
    ctx.beginPath();
    ctx.moveTo(segments[0].x, segments[0].y);
    for (let j = 1; j < segments.length; j++) {
      ctx.lineTo(segments[j].x, segments[j].y);
    }
    ctx.strokeStyle = `hsla(0, 0%, 100%, ${alpha * 0.8})`;
    ctx.lineWidth = width * 0.8;
    ctx.stroke();
  }

  private _drawPlasmaSparks(W: number, H: number): void {
    const { ctx } = this;
    const spd = this._settings.speed;

    this.plasmaSparks.forEach((p, idx) => {
      p.x += p.vx * spd;
      p.y += p.vy * spd;
      p.life -= p.decay * spd;

      // Slight drift
      p.vx += (Math.random() - 0.5) * 0.1;
      p.vy += (Math.random() - 0.5) * 0.1;

      if (p.life <= 0 || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) {
        this.plasmaSparks[idx] = this._spawnPlasmaSpark(W, H);
        return;
      }

      const alpha = p.life * 0.6;

      // Glow halo
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      grad.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${alpha * 0.5})`);
      grad.addColorStop(0.3, `hsla(${p.hue}, 80%, 55%, ${alpha * 0.15})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core spark
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${alpha})`;
      ctx.fill();
    });
  }

  // ── Public API ───────────────────────────────────────────────────────────────

  /**
   * Update the particle colour from an explicit RGB triple.
   * Reads the `--particle-color` CSS variable by default (call with no args),
   * or supply r/g/b directly.
   */
  updateColor(r?: number, g?: number, b?: number): void {
    if (r !== undefined && g !== undefined && b !== undefined) {
      this._r = r;
      this._g = g;
      this._b = b;
    } else {
      const [cr, cg, cb] = this._readCSSColor();
      this._r = cr;
      this._g = cg;
      this._b = cb;
    }
  }

  /**
   * Set the current visual theme. This controls which effects render
   * (embers for fire, snowflakes for winter, just stars for dark/light).
   */
  setTheme(t: ParticleTheme): void {
    this._theme = t;
    this.updateColor();
  }

  /**
   * Update runtime effect settings (density, speed, toggles).
   * Density changes trigger a particle rebuild.
   */
  updateSettings(partial: Partial<EffectSettings>): void {
    const densityChanged = partial.density !== undefined && partial.density !== this._settings.density;
    Object.assign(this._settings, partial);

    if (densityChanged) {
      // Rebuild all particle arrays with new density
      const W = this.canvas.width;
      const H = this.canvas.height;
      this._rebuildWithDensity(W, H);
    }
  }

  private _rebuildWithDensity(W: number, H: number): void {
    const d = this._settings.density;

    // Rebuild stars
    const starCount = Math.round(STAR_COUNT * d);
    const brightCount = Math.round(BRIGHT_COUNT * d);
    this.stars = Array.from({ length: Math.max(starCount, 1) }, (_, i) => {
      const bright = i < brightCount;
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: bright ? Math.random() * 1.5 + 1 : Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        a: bright ? Math.random() * 0.4 + 0.5 : Math.random() * 0.25 + 0.05,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        bright,
      };
    });

    // Rebuild mesh
    const meshCount = Math.round(60 * d);
    this.meshPts = Array.from({ length: Math.max(meshCount, 2) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
    }));
    const maxDist = Math.min(W, H) * MESH_DIST_FACTOR;
    this.meshEdges = [];
    for (let i = 0; i < this.meshPts.length; i++) {
      for (let j = i + 1; j < this.meshPts.length; j++) {
        const dx = this.meshPts[i].x - this.meshPts[j].x;
        const dy = this.meshPts[i].y - this.meshPts[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < maxDist) this.meshEdges.push([i, j]);
      }
    }

    // Rebuild theme-specific particles
    const emberCount = Math.round(EMBER_COUNT * d);
    this.embers = Array.from({ length: Math.max(emberCount, 1) }, () => this._spawnEmber(W, H));

    const snowCount = Math.round(SNOWFLAKE_COUNT * d);
    this.snowflakes = Array.from({ length: Math.max(snowCount, 1) }, () => this._spawnSnowflake(W, H));

    const nebulaCount = Math.round(NEBULA_COUNT * d);
    this.nebulaClouds = Array.from({ length: Math.max(nebulaCount, 1) }, () => this._spawnNebula(W, H));

    const glitterCount = Math.round(GLITTER_COUNT * d);
    this.glitters = Array.from({ length: Math.max(glitterCount, 1) }, () => this._spawnGlitter(W, H));

    this.shootingStars = [];

    const plasmaCount = Math.round(PLASMA_SPARK_COUNT * d);
    this.plasmaSparks = Array.from({ length: Math.max(plasmaCount, 1) }, () => this._spawnPlasmaSpark(W, H));
    this.lightningBolts = [];
  }

  /**
   * Resize the canvas and rebuild star/mesh positions.
   * Call this on window resize events.
   */
  resize(w: number, h: number): void {
    this.canvas.width  = w;
    this.canvas.height = h;
    this._buildParticles(w, h);
    this._buildEmbers(w, h);
    this._buildSnowflakes(w, h);
    this._buildNebula(w, h);
    this._buildGlitter(w, h);
    this._buildPlasma(w, h);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  /** Read `--particle-color` CSS variable, returns [r, g, b] numbers */
  private _readCSSColor(): [number, number, number] {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--particle-color')
      .trim();
    // Expected format: "0, 212, 255"
    const parts = (raw || '0,212,255').split(',').map(s => parseInt(s.trim(), 10));
    return [parts[0] ?? 0, parts[1] ?? 212, parts[2] ?? 255];
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  dispose(): void {
    this.stop();
    this.stars = [];
    this.meshPts = [];
    this.meshEdges = [];
    this.embers = [];
    this.snowflakes = [];
    this.nebulaClouds = [];
    this.glitters = [];
    this.shootingStars = [];
    this.plasmaSparks = [];
    this.lightningBolts = [];
  }
}
