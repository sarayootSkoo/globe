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

/** Total star count (12 of them are "bright" with a glow halo) */
const STAR_COUNT = 180;
const BRIGHT_COUNT = 12;

/** Grid connection distance as a fraction of the shorter viewport dimension */
const MESH_DIST_FACTOR = 0.18;

export class ParticleBackground {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  private stars: Star[] = [];
  private meshPts: MeshPoint[] = [];
  private meshEdges: MeshEdge[] = [];
  private _r: number;
  private _g: number;
  private _b: number;

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
    const { ctx, canvas } = this;
    const W = canvas.width;
    const H = canvas.height;
    const pc = `${this._r},${this._g},${this._b}`;

    ctx.clearRect(0, 0, W, H);

    // ── Faint background mesh grid ──────────────────────────────────────────
    ctx.strokeStyle = `rgba(${pc},0.04)`;
    ctx.lineWidth = 0.5;
    this.meshEdges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(this.meshPts[i].x, this.meshPts[i].y);
      ctx.lineTo(this.meshPts[j].x, this.meshPts[j].y);
      ctx.stroke();
    });

    // ── Stars ───────────────────────────────────────────────────────────────
    this.stars.forEach(p => {
      // Drift slowly across the canvas and wrap at edges
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      p.twinkle += p.twinkleSpeed;
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
   * Resize the canvas and rebuild star/mesh positions.
   * Call this on window resize events.
   */
  resize(w: number, h: number): void {
    this.canvas.width  = w;
    this.canvas.height = h;
    this._buildParticles(w, h);
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

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  dispose(): void {
    this.stop();
    this.stars = [];
    this.meshPts = [];
    this.meshEdges = [];
  }
}
