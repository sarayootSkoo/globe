<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { theme } from '../../lib/stores/appState';
  import type { Theme } from '../../lib/stores/appState';
  import * as fx from '../../lib/stores/themeEffects';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let animId: number | null = null;
  let frame = 0;

  // Local mirrors
  let enabled = true;
  let intensity = 1;
  let speed = 1;
  let currentTheme: Theme = 'dark';

  // Black hole stores
  let bhEnabled = false;
  let bhSize = 1;
  let bhSpeed = 1;
  let bhGlow = 1;
  let bhWidth = 1;
  let bhHeight = 1;
  let bhHue = 280;

  // ── Noise helpers ────────────────────────────────────────────────────────
  function noise(x: number, y: number): number {
    return (
      Math.sin(x * 1.3 + y * 0.7) * 0.3 +
      Math.sin(x * 2.7 - y * 1.1) * 0.2 +
      Math.sin(x * 0.5 + y * 2.3) * 0.25 +
      Math.cos(x * 1.8 + y * 1.5) * 0.25
    );
  }

  function fbm(x: number, y: number): number {
    return (
      noise(x, y) * 0.5 +
      noise(x * 2.1, y * 2.1) * 0.25 +
      noise(x * 4.3, y * 4.3) * 0.125 +
      noise(x * 8.7, y * 8.7) * 0.0625
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FIRE THEME — Bold flame tongues with sharp tips
  // ══════════════════════════════════════════════════════════════════════════

  interface Flame {
    edge: 0 | 1 | 2 | 3;
    pos: number;
    height: number;
    width: number;
    phase: number;
    speed: number;
  }

  const FLAME_COUNT = 60;
  let flames: Flame[] = [];

  function buildFlames(): void {
    flames = [];
    for (let i = 0; i < FLAME_COUNT; i++) {
      flames.push({
        edge: (Math.floor(i / (FLAME_COUNT / 4))) as 0 | 1 | 2 | 3,
        pos: (i % (FLAME_COUNT / 4)) / (FLAME_COUNT / 4),
        height: 50 + Math.random() * 100,
        width: 20 + Math.random() * 40,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 1.5,
      });
    }
  }

  function drawFire(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    // Layer 1: Deep red/orange base glow
    const glowD = 100 * int;
    const edges: Array<{ x0: number; y0: number; x1: number; y1: number; fx: number; fy: number; fw: number; fh: number }> = [
      { x0: 0, y0: 0, x1: 0, y1: glowD, fx: 0, fy: 0, fw: W, fh: glowD },         // top
      { x0: 0, y0: H, x1: 0, y1: H - glowD, fx: 0, fy: H - glowD, fw: W, fh: glowD }, // bottom
      { x0: 0, y0: 0, x1: glowD, y1: 0, fx: 0, fy: 0, fw: glowD, fh: H },           // left
      { x0: W, y0: 0, x1: W - glowD, y1: 0, fx: W - glowD, fy: 0, fw: glowD, fh: H }, // right
    ];

    for (const e of edges) {
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      g.addColorStop(0, `rgba(200,30,0,${0.35 * int})`);
      g.addColorStop(0.3, `rgba(255,80,0,${0.2 * int})`);
      g.addColorStop(0.6, `rgba(255,60,0,${0.08 * int})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Layer 2: Individual flame tongues with bezier curves
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const fl of flames) {
      const t = time * fl.speed + fl.phase;
      const flicker = 0.6 + 0.4 * Math.sin(t * 2.3 + Math.cos(t * 1.1) * 2);
      const h = fl.height * flicker * int;
      const w = fl.width * (0.8 + 0.2 * Math.sin(t * 3.1));
      const tipWaver = w * 0.3 * Math.sin(t * 2.7);

      let bx: number, by: number, dx: number, dy: number;
      switch (fl.edge) {
        case 0: bx = fl.pos * W; by = 0; dx = tipWaver; dy = h; break;
        case 1: bx = W; by = fl.pos * H; dx = -h; dy = tipWaver; break;
        case 2: bx = fl.pos * W; by = H; dx = tipWaver; dy = -h; break;
        case 3: bx = 0; by = fl.pos * H; dx = h; dy = tipWaver; break;
      }

      // Outer flame body (red)
      ctx.beginPath();
      const tipX = bx + dx;
      const tipY = by + dy;

      if (fl.edge === 0 || fl.edge === 2) {
        const dir = fl.edge === 0 ? 1 : -1;
        ctx.moveTo(bx - w * 0.6, by);
        ctx.quadraticCurveTo(bx - w * 0.2, by + dir * h * 0.6, tipX, tipY);
        ctx.quadraticCurveTo(bx + w * 0.2, by + dir * h * 0.6, bx + w * 0.6, by);
      } else {
        const dir = fl.edge === 3 ? 1 : -1;
        ctx.moveTo(bx, by - w * 0.6);
        ctx.quadraticCurveTo(bx + dir * h * 0.6, by - w * 0.2, tipX, tipY);
        ctx.quadraticCurveTo(bx + dir * h * 0.6, by + w * 0.2, bx, by + w * 0.6);
      }
      ctx.closePath();

      const flameGrad = ctx.createRadialGradient(bx, by, 0, bx, by, h);
      flameGrad.addColorStop(0, `rgba(255,220,80,${0.5 * int})`);
      flameGrad.addColorStop(0.2, `rgba(255,160,20,${0.45 * int})`);
      flameGrad.addColorStop(0.5, `rgba(255,60,0,${0.35 * int})`);
      flameGrad.addColorStop(0.8, `rgba(200,20,0,${0.2 * int})`);
      flameGrad.addColorStop(1, 'rgba(100,0,0,0)');
      ctx.fillStyle = flameGrad;
      ctx.fill();

      // Inner bright core (yellow-white) — smaller
      ctx.beginPath();
      const coreH = h * 0.35;
      const coreW = w * 0.3;
      if (fl.edge === 0 || fl.edge === 2) {
        const dir = fl.edge === 0 ? 1 : -1;
        ctx.moveTo(bx - coreW, by);
        ctx.quadraticCurveTo(bx, by + dir * coreH, bx + coreW, by);
      } else {
        const dir = fl.edge === 3 ? 1 : -1;
        ctx.moveTo(bx, by - coreW);
        ctx.quadraticCurveTo(bx + dir * coreH, by, bx, by + coreW);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,200,${0.4 * flicker * int})`;
      ctx.fill();
    }

    // Layer 3: Edge hotline
    ctx.lineWidth = 4 * int;
    ctx.shadowBlur = 15 * int;
    ctx.shadowColor = 'rgba(255,100,0,0.6)';
    ctx.strokeStyle = `rgba(255,180,50,${0.6 * int})`;
    ctx.strokeRect(2, 2, W - 4, H - 4);
    ctx.shadowBlur = 0;

    // Layer 4: Bright corner flares
    const corners = [[0, 0], [W, 0], [0, H], [W, H]];
    for (const [cx, cy] of corners) {
      const cPulse = 0.6 + 0.4 * Math.sin(time * 1.3 + cx * 0.01);
      const r = 120 * int * cPulse;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      cg.addColorStop(0, `rgba(255,220,100,${0.4 * int})`);
      cg.addColorStop(0.2, `rgba(255,120,0,${0.3 * int})`);
      cg.addColorStop(0.5, `rgba(200,40,0,${0.15 * int})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }

    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // GALAXY THEME — Purple nebula clouds with star sparkles
  // ══════════════════════════════════════════════════════════════════════════

  interface NebulaBlob {
    x: number; y: number;
    rx: number; ry: number;
    phase: number;
    speed: number;
    hue: number; // 0=purple, 1=pink, 2=blue
  }

  const NEBULA_COUNT = 40;
  let nebulae: NebulaBlob[] = [];

  interface StarSparkle {
    x: number; y: number;
    size: number;
    phase: number;
    speed: number;
  }

  const STAR_SPARKLE_COUNT = 80;
  let starSparkles: StarSparkle[] = [];

  function buildGalaxy(W: number, H: number): void {
    nebulae = [];
    // Place nebula blobs along edges, denser at corners
    for (let i = 0; i < NEBULA_COUNT; i++) {
      let x: number, y: number;
      const edge = Math.floor(Math.random() * 4);
      const margin = 120;
      switch (edge) {
        case 0: x = Math.random() * W; y = Math.random() * margin; break;
        case 1: x = W - Math.random() * margin; y = Math.random() * H; break;
        case 2: x = Math.random() * W; y = H - Math.random() * margin; break;
        case 3: x = Math.random() * margin; y = Math.random() * H; break;
      }
      nebulae.push({
        x: x!, y: y!,
        rx: 60 + Math.random() * 120,
        ry: 50 + Math.random() * 100,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.5,
        hue: Math.floor(Math.random() * 3),
      });
    }

    // Stars scattered along border region
    starSparkles = [];
    for (let i = 0; i < STAR_SPARKLE_COUNT; i++) {
      let x: number, y: number;
      const edge = Math.floor(Math.random() * 4);
      const d = Math.random() * 140;
      switch (edge) {
        case 0: x = Math.random() * W; y = d; break;
        case 1: x = W - d; y = Math.random() * H; break;
        case 2: x = Math.random() * W; y = H - d; break;
        case 3: x = d; y = Math.random() * H; break;
      }
      starSparkles.push({
        x: x!, y: y!,
        size: 1 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        speed: 1 + Math.random() * 3,
      });
    }
  }

  function drawGalaxy(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    const purpleColors = [
      [120, 40, 180],  // deep purple
      [180, 80, 220],  // medium purple
      [200, 120, 255], // light purple
      [160, 60, 200],  // vivid purple
      [220, 100, 255], // pink-purple
      [80, 40, 160],   // dark indigo
    ];

    // Layer 1: Large corner nebula washes
    const cornerPositions = [
      { x: 0, y: 0 }, { x: W, y: 0 }, { x: 0, y: H }, { x: W, y: H },
    ];
    for (let i = 0; i < cornerPositions.length; i++) {
      const cp = cornerPositions[i];
      const pulse = 0.7 + 0.3 * Math.sin(time * 0.4 + i * 1.5);
      const r = (180 + 60 * pulse) * int;
      const cg = ctx.createRadialGradient(cp.x, cp.y, 0, cp.x, cp.y, r);
      cg.addColorStop(0, `rgba(160,60,220,${0.35 * int * pulse})`);
      cg.addColorStop(0.25, `rgba(120,40,180,${0.25 * int})`);
      cg.addColorStop(0.5, `rgba(80,20,140,${0.12 * int})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);
    }

    // Layer 2: Edge nebula gradient wash
    const edgeD = 130 * int;
    const edgeDefs = [
      { x0: 0, y0: 0, x1: 0, y1: edgeD, fx: 0, fy: 0, fw: W, fh: edgeD },
      { x0: 0, y0: H, x1: 0, y1: H - edgeD, fx: 0, fy: H - edgeD, fw: W, fh: edgeD },
      { x0: 0, y0: 0, x1: edgeD, y1: 0, fx: 0, fy: 0, fw: edgeD, fh: H },
      { x0: W, y0: 0, x1: W - edgeD, y1: 0, fx: W - edgeD, fy: 0, fw: edgeD, fh: H },
    ];
    for (let i = 0; i < edgeDefs.length; i++) {
      const e = edgeDefs[i];
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      const wave = 0.7 + 0.3 * Math.sin(time * 0.3 + i * 2);
      g.addColorStop(0, `rgba(100,30,160,${0.25 * int * wave})`);
      g.addColorStop(0.4, `rgba(140,60,200,${0.12 * int})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Layer 3: Individual nebula cloud blobs
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const nb of nebulae) {
      const t = time * nb.speed + nb.phase;
      const pulse = 0.6 + 0.4 * Math.sin(t);
      const breathX = nb.x + Math.sin(t * 0.7) * 8;
      const breathY = nb.y + Math.cos(t * 0.5) * 6;
      const rx = nb.rx * pulse * int;
      const ry = nb.ry * pulse * int;

      const col = purpleColors[nb.hue % purpleColors.length];
      const alpha = 0.12 * int * pulse;

      const g = ctx.createRadialGradient(breathX, breathY, 0, breathX, breathY, Math.max(rx, ry));
      g.addColorStop(0, `rgba(${col[0]+40},${col[1]+30},${col[2]},${alpha * 1.5})`);
      g.addColorStop(0.3, `rgba(${col[0]},${col[1]},${col[2]},${alpha})`);
      g.addColorStop(0.6, `rgba(${col[0]-30},${col[1]-20},${col[2]-30},${alpha * 0.4})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.ellipse(breathX, breathY, rx, ry, t * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    // Layer 4: Star sparkles
    for (const star of starSparkles) {
      const t = time * star.speed + star.phase;
      const twinkle = 0.3 + 0.7 * Math.pow(Math.sin(t) * 0.5 + 0.5, 2);
      const s = star.size * twinkle * int;

      ctx.fillStyle = `rgba(255,255,255,${0.7 * twinkle * int})`;

      // 4-point cross sparkle
      ctx.beginPath();
      ctx.moveTo(star.x, star.y - s * 2);
      ctx.lineTo(star.x + s * 0.3, star.y);
      ctx.lineTo(star.x, star.y + s * 2);
      ctx.lineTo(star.x - s * 0.3, star.y);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(star.x - s * 2, star.y);
      ctx.lineTo(star.x, star.y + s * 0.3);
      ctx.lineTo(star.x + s * 2, star.y);
      ctx.lineTo(star.x, star.y - s * 0.3);
      ctx.closePath();
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(star.x, star.y, s * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,255,${0.9 * twinkle * int})`;
      ctx.fill();
    }

    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // WINTER THEME — Delicate frost crystals and snowflake patterns
  // ══════════════════════════════════════════════════════════════════════════

  interface FrostCrystal {
    x: number; y: number;
    size: number;
    rotation: number;
    branches: number; // 6 or 8
    alpha: number;
    phase: number;
    speed: number;
  }

  const CRYSTAL_COUNT = 50;
  let crystals: FrostCrystal[] = [];

  function buildWinter(W: number, H: number): void {
    crystals = [];
    for (let i = 0; i < CRYSTAL_COUNT; i++) {
      let x: number, y: number;
      const edge = Math.floor(Math.random() * 4);
      const d = Math.random() * 130;
      switch (edge) {
        case 0: x = Math.random() * W; y = d; break;
        case 1: x = W - d; y = Math.random() * H; break;
        case 2: x = Math.random() * W; y = H - d; break;
        case 3: x = d; y = Math.random() * H; break;
      }
      crystals.push({
        x: x!, y: y!,
        size: 10 + Math.random() * 35,
        rotation: Math.random() * Math.PI,
        branches: Math.random() > 0.5 ? 6 : 8,
        alpha: 0.15 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.6,
      });
    }
  }

  function drawSnowflake(x: number, y: number, size: number, branches: number, rot: number, alpha: number): void {
    if (!ctx) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.strokeStyle = `rgba(200,220,240,${alpha})`;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    for (let i = 0; i < branches; i++) {
      const angle = (i / branches) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);

      // Main arm
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();

      // Side branches
      const branchLen = size * 0.4;
      for (let j = 1; j <= 2; j++) {
        const bpos = size * (j * 0.3);
        ctx.beginPath();
        ctx.moveTo(bpos, 0);
        ctx.lineTo(bpos + branchLen * 0.5, -branchLen * 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bpos, 0);
        ctx.lineTo(bpos + branchLen * 0.5, branchLen * 0.5);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,235,255,${alpha * 0.8})`;
    ctx.fill();

    ctx.restore();
  }

  function drawWinter(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    // Layer 1: Soft white-blue edge glow (frosty mist)
    const glowD = 110 * int;
    const edgeDefs = [
      { x0: 0, y0: 0, x1: 0, y1: glowD, fx: 0, fy: 0, fw: W, fh: glowD },
      { x0: 0, y0: H, x1: 0, y1: H - glowD, fx: 0, fy: H - glowD, fw: W, fh: glowD },
      { x0: 0, y0: 0, x1: glowD, y1: 0, fx: 0, fy: 0, fw: glowD, fh: H },
      { x0: W, y0: 0, x1: W - glowD, y1: 0, fx: W - glowD, fy: 0, fw: glowD, fh: H },
    ];
    for (const e of edgeDefs) {
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      g.addColorStop(0, `rgba(200,220,240,${0.2 * int})`);
      g.addColorStop(0.3, `rgba(180,210,235,${0.1 * int})`);
      g.addColorStop(0.7, `rgba(160,200,230,${0.03 * int})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Layer 2: Corner frost concentrations
    const corners = [[0, 0], [W, 0], [0, H], [W, H]];
    for (let i = 0; i < corners.length; i++) {
      const [cx, cy] = corners[i];
      const pulse = 0.7 + 0.3 * Math.sin(time * 0.3 + i * 1.8);
      const r = 160 * int * pulse;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      cg.addColorStop(0, `rgba(210,230,250,${0.2 * int * pulse})`);
      cg.addColorStop(0.3, `rgba(190,215,240,${0.12 * int})`);
      cg.addColorStop(0.6, `rgba(170,200,235,${0.05 * int})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);
    }

    // Layer 3: Snowflake crystals
    for (const cr of crystals) {
      const t = time * cr.speed + cr.phase;
      const pulse = 0.5 + 0.5 * Math.sin(t);
      const rot = cr.rotation + time * 0.05;
      const alpha = cr.alpha * (0.5 + 0.5 * pulse) * int;
      drawSnowflake(cr.x, cr.y, cr.size * int, cr.branches, rot, alpha);
    }

    // Layer 4: Tiny floating frost particles
    for (let i = 0; i < 60; i++) {
      const seed = i * 73.13;
      const edge = Math.floor(seed % 4);
      const pos = (seed * 0.618) % 1;
      const life = (time * 0.2 + seed * 0.003) % 1;
      const drift = 50 * life * int;
      const alpha = (1 - life) * 0.35 * int;
      const sz = (1 - life * 0.5) * 2 * int;

      let px: number, py: number;
      switch (edge) {
        case 0: px = pos * W; py = drift; break;
        case 1: px = W - drift; py = pos * H; break;
        case 2: px = pos * W; py = H - drift; break;
        case 3: px = drift; py = pos * H; break;
      }

      ctx.beginPath();
      ctx.arc(px!, py!, sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,240,255,${alpha})`;
      ctx.fill();
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // DARK THEME — Cyan energy tendrils
  // ══════════════════════════════════════════════════════════════════════════

  function drawDark(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    // Layer 1: Deep cyan edge glow
    const glowD = 70 * int;
    const edgeDefs = [
      { x0: 0, y0: 0, x1: 0, y1: glowD, fx: 0, fy: 0, fw: W, fh: glowD },
      { x0: 0, y0: H, x1: 0, y1: H - glowD, fx: 0, fy: H - glowD, fw: W, fh: glowD },
      { x0: 0, y0: 0, x1: glowD, y1: 0, fx: 0, fy: 0, fw: glowD, fh: H },
      { x0: W, y0: 0, x1: W - glowD, y1: 0, fx: W - glowD, fy: 0, fw: glowD, fh: H },
    ];
    for (const e of edgeDefs) {
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      g.addColorStop(0, `rgba(0,180,230,${0.15 * int})`);
      g.addColorStop(0.4, `rgba(0,120,180,${0.06 * int})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Layer 2: Energy border line segments with flowing brightness
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 2 * int;

    const segCount = 100;
    // Top
    for (let i = 0; i < segCount; i++) {
      const t2 = i / segCount;
      const wave = noise(t2 * 6 + time * 1.5, 0) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(t2 * W, 0);
      ctx.lineTo(((i + 1) / segCount) * W, 0);
      ctx.strokeStyle = `rgba(0,212,255,${(0.15 + 0.35 * wave) * int})`;
      ctx.stroke();
    }
    // Bottom
    for (let i = 0; i < segCount; i++) {
      const t2 = i / segCount;
      const wave = noise(t2 * 6 + time * 1.5, 3) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(t2 * W, H);
      ctx.lineTo(((i + 1) / segCount) * W, H);
      ctx.strokeStyle = `rgba(0,212,255,${(0.15 + 0.35 * wave) * int})`;
      ctx.stroke();
    }
    // Left
    for (let i = 0; i < segCount; i++) {
      const t2 = i / segCount;
      const wave = noise(t2 * 6 + time * 1.5, 6) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, t2 * H);
      ctx.lineTo(0, ((i + 1) / segCount) * H);
      ctx.strokeStyle = `rgba(0,212,255,${(0.15 + 0.35 * wave) * int})`;
      ctx.stroke();
    }
    // Right
    for (let i = 0; i < segCount; i++) {
      const t2 = i / segCount;
      const wave = noise(t2 * 6 + time * 1.5, 9) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(W, t2 * H);
      ctx.lineTo(W, ((i + 1) / segCount) * H);
      ctx.strokeStyle = `rgba(0,212,255,${(0.15 + 0.35 * wave) * int})`;
      ctx.stroke();
    }

    // Layer 3: Traveling spark nodes
    for (let i = 0; i < 12; i++) {
      const seed = i * 0.813;
      const peri = ((time * (0.15 + seed * 0.1) + seed * 7) % 4);
      let sx: number, sy: number;
      const seg = peri % 4;
      if (seg < 1)      { sx = seg * W; sy = 0; }
      else if (seg < 2) { sx = W; sy = (seg - 1) * H; }
      else if (seg < 3) { sx = (1 - (seg - 2)) * W; sy = H; }
      else              { sx = 0; sy = (1 - (seg - 3)) * H; }

      const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 20 * int);
      sg.addColorStop(0, `rgba(180,240,255,${0.5 * int})`);
      sg.addColorStop(0.3, `rgba(0,200,255,${0.25 * int})`);
      sg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(sx, sy, 20 * int, 0, Math.PI * 2);
      ctx.fillStyle = sg;
      ctx.fill();
    }

    // Layer 4: Corner glow
    const corners = [[0, 0], [W, 0], [0, H], [W, H]];
    for (let i = 0; i < corners.length; i++) {
      const [cx, cy] = corners[i];
      const pulse = 0.6 + 0.4 * Math.sin(time * 0.6 + i * 1.5);
      const r = 80 * int;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      cg.addColorStop(0, `rgba(0,220,255,${0.2 * int * pulse})`);
      cg.addColorStop(0.4, `rgba(0,140,200,${0.1 * int})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }

    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // LIGHT THEME — Subtle blue-white mist
  // ══════════════════════════════════════════════════════════════════════════

  function drawLight(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    // Soft blue mist along edges
    const glowD = 80 * int;
    const edgeDefs = [
      { x0: 0, y0: 0, x1: 0, y1: glowD, fx: 0, fy: 0, fw: W, fh: glowD },
      { x0: 0, y0: H, x1: 0, y1: H - glowD, fx: 0, fy: H - glowD, fw: W, fh: glowD },
      { x0: 0, y0: 0, x1: glowD, y1: 0, fx: 0, fy: 0, fw: glowD, fh: H },
      { x0: W, y0: 0, x1: W - glowD, y1: 0, fx: W - glowD, fy: 0, fw: glowD, fh: H },
    ];
    for (const e of edgeDefs) {
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      g.addColorStop(0, `rgba(60,100,200,${0.1 * int})`);
      g.addColorStop(0.5, `rgba(80,120,210,${0.04 * int})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Subtle border line
    ctx.strokeStyle = `rgba(50,80,160,${0.12 * int})`;
    ctx.lineWidth = 1.5 * int;
    ctx.strokeRect(3, 3, W - 6, H - 6);

    // Corner accents
    const corners = [[0, 0], [W, 0], [0, H], [W, H]];
    for (const [cx, cy] of corners) {
      const pulse = 0.7 + 0.3 * Math.sin(time * 0.5 + cx * 0.01);
      const r = 50 * int;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      cg.addColorStop(0, `rgba(80,120,200,${0.1 * int * pulse})`);
      cg.addColorStop(0.5, `rgba(60,100,180,${0.04 * int})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ELECTRIC THEME — Crackling lightning arcs along edges
  // ══════════════════════════════════════════════════════════════════════════

  interface EdgeArc {
    edge: 0 | 1 | 2 | 3;
    pos0: number;        // start position along edge (0–1)
    pos1: number;        // end position along edge (0–1)
    life: number;
    decay: number;
    segments: { x: number; y: number }[];
    width: number;
  }

  const ARC_MAX = 6;
  let arcs: EdgeArc[] = [];
  let arcTimer = 0;

  function edgePoint(edge: number, pos: number, W: number, H: number): { x: number; y: number } {
    switch (edge) {
      case 0: return { x: pos * W, y: 0 };
      case 1: return { x: W, y: pos * H };
      case 2: return { x: (1 - pos) * W, y: H };
      default: return { x: 0, y: (1 - pos) * H };
    }
  }

  function spawnArc(W: number, H: number): EdgeArc {
    const edge = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;
    const pos0 = Math.random();
    const pos1 = pos0 + (Math.random() - 0.5) * 0.4;
    const p0 = edgePoint(edge, Math.min(pos0, pos1), W, H);
    const p1 = edgePoint(edge, Math.max(pos0, pos1), W, H);

    // Inward normal direction for jagged offsets
    let nx = 0, ny = 0;
    switch (edge) {
      case 0: ny = 1; break;
      case 1: nx = -1; break;
      case 2: ny = -1; break;
      case 3: nx = 1; break;
    }

    const segCount = 8 + Math.floor(Math.random() * 6);
    const segments: { x: number; y: number }[] = [];
    for (let i = 0; i <= segCount; i++) {
      const t = i / segCount;
      const bx = p0.x + (p1.x - p0.x) * t;
      const by = p0.y + (p1.y - p0.y) * t;
      const inward = Math.sin(t * Math.PI) * (20 + Math.random() * 40);
      const jitter = (Math.random() - 0.5) * 15;
      segments.push({
        x: bx + nx * inward + (ny !== 0 ? jitter : 0),
        y: by + ny * inward + (nx !== 0 ? jitter : 0),
      });
    }

    return {
      edge, pos0, pos1,
      life: 1,
      decay: 0.04 + Math.random() * 0.06,
      segments,
      width: 1 + Math.random() * 2,
    };
  }

  function drawElectric(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    // Layer 1: Electric blue edge glow
    const glowD = 60 * int;
    const edgeDefs = [
      { x0: 0, y0: 0, x1: 0, y1: glowD, fx: 0, fy: 0, fw: W, fh: glowD },
      { x0: 0, y0: H, x1: 0, y1: H - glowD, fx: 0, fy: H - glowD, fw: W, fh: glowD },
      { x0: 0, y0: 0, x1: glowD, y1: 0, fx: 0, fy: 0, fw: glowD, fh: H },
      { x0: W, y0: 0, x1: W - glowD, y1: 0, fx: W - glowD, fy: 0, fw: glowD, fh: H },
    ];
    for (const e of edgeDefs) {
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      const pulse = 0.6 + 0.4 * Math.sin(time * 1.5);
      g.addColorStop(0, `rgba(40,100,255,${0.15 * int * pulse})`);
      g.addColorStop(0.3, `rgba(20,60,200,${0.06 * int})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Layer 2: Crackling arc discharges along edges
    arcTimer -= speed;
    if (arcTimer <= 0 && arcs.length < ARC_MAX) {
      arcs.push(spawnArc(W, H));
      arcTimer = 5 + Math.random() * 15; // frequent arcs
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = arcs.length - 1; i >= 0; i--) {
      const arc = arcs[i];
      arc.life -= arc.decay * speed;

      if (arc.life <= 0) {
        arcs.splice(i, 1);
        continue;
      }

      const flicker = arc.life * (0.4 + 0.6 * Math.sin(frame * 1.2 + i * 4));

      // Outer glow
      ctx.beginPath();
      ctx.moveTo(arc.segments[0].x, arc.segments[0].y);
      for (let j = 1; j < arc.segments.length; j++) {
        ctx.lineTo(arc.segments[j].x, arc.segments[j].y);
      }
      ctx.strokeStyle = `rgba(60,140,255,${flicker * 0.12 * int})`;
      ctx.lineWidth = arc.width * 8;
      ctx.stroke();

      // Mid glow
      ctx.beginPath();
      ctx.moveTo(arc.segments[0].x, arc.segments[0].y);
      for (let j = 1; j < arc.segments.length; j++) {
        ctx.lineTo(arc.segments[j].x, arc.segments[j].y);
      }
      ctx.strokeStyle = `rgba(100,180,255,${flicker * 0.35 * int})`;
      ctx.lineWidth = arc.width * 3;
      ctx.stroke();

      // Bright white-blue core
      ctx.beginPath();
      ctx.moveTo(arc.segments[0].x, arc.segments[0].y);
      for (let j = 1; j < arc.segments.length; j++) {
        ctx.lineTo(arc.segments[j].x, arc.segments[j].y);
      }
      ctx.strokeStyle = `rgba(200,230,255,${flicker * 0.7 * int})`;
      ctx.lineWidth = arc.width;
      ctx.stroke();
    }

    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';

    // Layer 3: Flickering edge line
    const edgePulse = 0.3 + 0.7 * Math.abs(Math.sin(time * 2));
    ctx.strokeStyle = `rgba(60,140,255,${0.2 * edgePulse * int})`;
    ctx.lineWidth = 2 * int;
    ctx.strokeRect(1, 1, W - 2, H - 2);

    // Layer 4: Corner sparks
    const corners = [[0, 0], [W, 0], [0, H], [W, H]];
    for (let i = 0; i < corners.length; i++) {
      const [cx, cy] = corners[i];
      const pulse = 0.5 + 0.5 * Math.sin(time * 1.8 + i * 2.3);
      const r = 70 * int * pulse;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      cg.addColorStop(0, `rgba(150,200,255,${0.25 * int * pulse})`);
      cg.addColorStop(0.3, `rgba(60,140,255,${0.12 * int})`);
      cg.addColorStop(0.6, `rgba(30,80,200,${0.04 * int})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }

    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VOID THEME — Black hole with accretion disk + gravitational lensing
  // ══════════════════════════════════════════════════════════════════════════

  function drawVoid(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    const cx = W / 2;
    const cy = H / 2;
    const minDim = Math.min(W, H);
    const holeR = minDim * 0.06 * int;   // black hole core radius
    const diskR = minDim * 0.35 * int;   // outer accretion disk radius

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // ── Layer 1: Swirling accretion disk spirals ─────────────────────────
    const armCount = 5;
    for (let arm = 0; arm < armCount; arm++) {
      const armOffset = (arm / armCount) * Math.PI * 2;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        // Logarithmic spiral: r = a * e^(b*theta)
        const theta = t * Math.PI * 4 + armOffset + time * 0.3;
        const r = holeR * 1.5 + (diskR - holeR) * t;
        // Add wobble for organic feel
        const wobble = Math.sin(theta * 3 + time * 2) * r * 0.04;
        const x = cx + Math.cos(theta) * (r + wobble);
        const y = cy + Math.sin(theta) * (r + wobble) * 0.45; // flatten for perspective
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const fade = 0.08 + 0.04 * Math.sin(time * 1.5 + arm);
      ctx.strokeStyle = `rgba(160,60,220,${fade * int})`;
      ctx.lineWidth = 2 + Math.sin(time + arm) * 0.5;
      ctx.stroke();
    }

    // ── Layer 2: Bright accretion ring (photon sphere) ───────────────────
    for (let ring = 0; ring < 3; ring++) {
      const ringR = holeR * (2.0 + ring * 0.6);
      const segments = 80;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // Elliptical (perspective) + subtle pulsation
        const pulse = 1 + Math.sin(time * 2.5 + ring + theta * 2) * 0.03;
        const x = cx + Math.cos(theta) * ringR * pulse;
        const y = cy + Math.sin(theta) * ringR * 0.42 * pulse;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const ringAlpha = (0.15 - ring * 0.04) * int;
      ctx.strokeStyle = `rgba(180,140,255,${ringAlpha})`;
      ctx.lineWidth = (3 - ring) * int;
      ctx.stroke();

      // Glow duplicate
      ctx.strokeStyle = `rgba(120,60,200,${ringAlpha * 0.5})`;
      ctx.lineWidth = (6 - ring * 2) * int;
      ctx.stroke();
    }

    // ── Layer 3: Gravitational lensing halo (bright crescent on top) ─────
    const lensR = holeR * 2.5;
    // Top crescent — light warped around the black hole
    const lensG = ctx.createRadialGradient(cx, cy - lensR * 0.3, lensR * 0.6, cx, cy - lensR * 0.3, lensR * 1.5);
    const lensPulse = 0.7 + 0.3 * Math.sin(time * 1.8);
    lensG.addColorStop(0, `rgba(200,180,255,${0.2 * int * lensPulse})`);
    lensG.addColorStop(0.3, `rgba(140,80,220,${0.1 * int * lensPulse})`);
    lensG.addColorStop(0.6, `rgba(80,20,160,${0.04 * int})`);
    lensG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lensG;
    ctx.fillRect(cx - lensR * 2, cy - lensR * 2, lensR * 4, lensR * 3);

    // Bottom arc — dimmer reflection
    const lensG2 = ctx.createRadialGradient(cx, cy + lensR * 0.4, lensR * 0.4, cx, cy + lensR * 0.4, lensR * 1.2);
    lensG2.addColorStop(0, `rgba(140,100,200,${0.08 * int * lensPulse})`);
    lensG2.addColorStop(0.5, `rgba(80,40,160,${0.03 * int})`);
    lensG2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lensG2;
    ctx.fillRect(cx - lensR * 2, cy - lensR, lensR * 4, lensR * 3);

    // ── Layer 4: Event horizon glow ring ─────────────────────────────────
    const horizonPulse = 0.8 + 0.2 * Math.sin(time * 3.2);
    const horizonG = ctx.createRadialGradient(cx, cy, holeR * 0.8, cx, cy, holeR * 2.5);
    horizonG.addColorStop(0, 'rgba(0,0,0,0)');
    horizonG.addColorStop(0.4, `rgba(120,50,200,${0.12 * int * horizonPulse})`);
    horizonG.addColorStop(0.7, `rgba(180,100,255,${0.08 * int * horizonPulse})`);
    horizonG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = horizonG;
    ctx.beginPath();
    ctx.arc(cx, cy, holeR * 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // ── Layer 5: Dark singularity center (drawn OVER everything) ─────────
    // Use 'source-over' to punch a dark hole
    const darkG = ctx.createRadialGradient(cx, cy, 0, cx, cy, holeR * 1.8);
    darkG.addColorStop(0, 'rgba(0,0,0,0.9)');
    darkG.addColorStop(0.5, 'rgba(5,0,15,0.7)');
    darkG.addColorStop(0.8, 'rgba(10,0,30,0.3)');
    darkG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = darkG;
    ctx.beginPath();
    ctx.arc(cx, cy, holeR * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // ── Layer 6: Void edge glow (borders) ────────────────────────────────
    const edgeD = 50 * int;
    const edgeDefs = [
      { x0: 0, y0: 0, x1: 0, y1: edgeD, fx: 0, fy: 0, fw: W, fh: edgeD },
      { x0: 0, y0: H, x1: 0, y1: H - edgeD, fx: 0, fy: H - edgeD, fw: W, fh: edgeD },
      { x0: 0, y0: 0, x1: edgeD, y1: 0, fx: 0, fy: 0, fw: edgeD, fh: H },
      { x0: W, y0: 0, x1: W - edgeD, y1: 0, fx: W - edgeD, fy: 0, fw: edgeD, fh: H },
    ];
    for (const e of edgeDefs) {
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      const edgePulse = 0.7 + 0.3 * Math.sin(time * 0.8);
      g.addColorStop(0, `rgba(120,30,180,${0.12 * int * edgePulse})`);
      g.addColorStop(0.5, `rgba(80,10,140,${0.04 * int})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // ── Layer 7: Matter streams being pulled toward center ───────────────
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const streamCount = 8;
    for (let s = 0; s < streamCount; s++) {
      const baseAngle = (s / streamCount) * Math.PI * 2 + time * 0.15;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        // Spiral inward: starts far, curves into center
        const r = diskR * (1 - t * 0.85);
        const theta = baseAngle + t * Math.PI * 2.5; // 2.5 turns inward
        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r * 0.42; // perspective
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const streamFade = 0.06 * int * (0.7 + 0.3 * Math.sin(time * 2 + s));
      ctx.strokeStyle = `rgba(200,120,255,${streamFade})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // AURORA THEME — Northern lights: flowing curtains of green/teal/purple
  // ══════════════════════════════════════════════════════════════════════════

  interface AuroraRibbon {
    x: number;       // horizontal anchor along top edge (0–W)
    width: number;   // ribbon width
    height: number;  // maximum drape depth
    phase: number;   // phase offset for wave animation
    speed: number;   // individual speed multiplier
    hue: number;     // 0=green, 1=teal, 2=purple, 3=cyan
    alpha: number;   // base opacity
  }

  const AURORA_COUNT = 18;
  let auroraRibbons: AuroraRibbon[] = [];

  function buildAurora(W: number, _H: number): void {
    auroraRibbons = [];
    for (let i = 0; i < AURORA_COUNT; i++) {
      auroraRibbons.push({
        x: (i / AURORA_COUNT) * W + (Math.random() - 0.5) * (W / AURORA_COUNT),
        width: 60 + Math.random() * 120,
        height: 80 + Math.random() * 200,
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.35,
        hue: Math.floor(Math.random() * 4),
        alpha: 0.12 + Math.random() * 0.2,
      });
    }
  }

  function drawAurora(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    // Aurora color palettes [r, g, b] for each hue index
    const auroraColors: [number, number, number][] = [
      [30,  220,  80],   // 0: vivid green
      [0,   200, 180],   // 1: teal
      [120,  60, 220],   // 2: purple
      [0,   210, 230],   // 3: cyan
    ];

    // Layer 1: Background glow wash along top edge
    const bgGlowH = 200 * int;
    const bgG = ctx.createLinearGradient(0, 0, 0, bgGlowH);
    bgG.addColorStop(0,   `rgba(0,80,40,${0.18 * int})`);
    bgG.addColorStop(0.3, `rgba(0,60,60,${0.1 * int})`);
    bgG.addColorStop(0.7, `rgba(10,0,40,${0.04 * int})`);
    bgG.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = bgG;
    ctx.fillRect(0, 0, W, bgGlowH);

    // Subtle glow on side edges too (Aurora bleeds in from corners)
    const sideD = 80 * int;
    const sideEdges = [
      { x0: 0, y0: 0, x1: sideD, y1: 0, fx: 0, fy: 0, fw: sideD, fh: H * 0.5 },
      { x0: W, y0: 0, x1: W - sideD, y1: 0, fx: W - sideD, fy: 0, fw: sideD, fh: H * 0.5 },
    ];
    for (const e of sideEdges) {
      const sg = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      sg.addColorStop(0,   `rgba(0,120,60,${0.1 * int})`);
      sg.addColorStop(0.5, `rgba(0,80,80,${0.04 * int})`);
      sg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Layer 2: Individual ribbon curtains with bezier drape
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const rb of auroraRibbons) {
      const t = time * rb.speed + rb.phase;

      // Animate the horizontal sway of the ribbon anchor
      const sway   = Math.sin(t * 0.8) * 30 + Math.sin(t * 1.3 + rb.phase) * 15;
      const ax     = rb.x + sway;
      const drape  = rb.height * (0.55 + 0.45 * Math.abs(Math.sin(t * 0.6))) * int;
      const waveL  = Math.sin(t * 1.1 + rb.phase * 0.5) * rb.width * 0.3;
      const waveR  = Math.sin(t * 0.9 + rb.phase * 0.7) * rb.width * 0.3;
      const halfW  = rb.width * (0.8 + 0.2 * Math.sin(t * 1.7)) * 0.5;

      // fbm shimmer for tip position
      const shimmer = fbm(ax * 0.008 + time * 0.1, t * 0.05) * 40;

      // Control points for a flowing drape shape
      const tipX   = ax + shimmer;
      const tipY   = drape;
      const cp1X   = ax - halfW * 0.5 + waveL;
      const cp1Y   = drape * 0.5;
      const cp2X   = ax + halfW * 0.5 + waveR;
      const cp2Y   = drape * 0.6;

      const col    = auroraColors[rb.hue];
      const alpha  = rb.alpha * (0.5 + 0.5 * Math.abs(Math.sin(t * 0.7))) * int;

      // Draw outer glow ribbon
      ctx.beginPath();
      ctx.moveTo(ax - halfW, 0);
      ctx.bezierCurveTo(cp1X - halfW * 0.3, cp1Y, tipX - 10, tipY - 20, tipX, tipY + shimmer * 0.5);
      ctx.bezierCurveTo(tipX + 10, tipY - 20, cp2X + halfW * 0.3, cp2Y, ax + halfW, 0);
      ctx.closePath();

      const grad = ctx.createLinearGradient(ax, 0, ax, tipY);
      grad.addColorStop(0,   `rgba(${col[0]},${col[1]},${col[2]},${alpha * 1.2})`);
      grad.addColorStop(0.3, `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.9})`);
      grad.addColorStop(0.7, `rgba(${Math.min(col[0]+40, 255)},${col[1]},${Math.min(col[2]+40, 255)},${alpha * 0.4})`);
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Inner bright core ribbon — narrower, more luminous
      const coreHalf = halfW * 0.25;
      ctx.beginPath();
      ctx.moveTo(ax - coreHalf, 0);
      ctx.bezierCurveTo(ax - coreHalf * 0.5 + waveL * 0.5, drape * 0.4, tipX - 4, tipY * 0.7, tipX, tipY * 0.8);
      ctx.bezierCurveTo(tipX + 4, tipY * 0.7, ax + coreHalf * 0.5 + waveR * 0.5, drape * 0.4, ax + coreHalf, 0);
      ctx.closePath();

      const coreGrad = ctx.createLinearGradient(ax, 0, ax, tipY * 0.8);
      coreGrad.addColorStop(0,   `rgba(${Math.min(col[0]+80, 255)},${Math.min(col[1]+80, 255)},${Math.min(col[2]+80, 255)},${alpha * 0.8})`);
      coreGrad.addColorStop(0.5, `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.5})`);
      coreGrad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.fill();
    }

    // Layer 3: Shimmering top edge line — aurora horizon
    const segCount = 120;
    ctx.lineWidth = 2 * int;
    ctx.lineCap = 'round';
    for (let i = 0; i < segCount; i++) {
      const t2   = i / segCount;
      const wave = fbm(t2 * 4 + time * 0.3, 0) * 0.5 + 0.5;
      // Rotate through green→teal→purple along the top
      const hPos = t2 * 3; // 0–3
      let r: number, g: number, b: number;
      if (hPos < 1)      { r = 0; g = Math.round(200 * wave); b = Math.round(80 * wave); }
      else if (hPos < 2) { r = 0; g = Math.round(180 * wave); b = Math.round(180 * wave); }
      else               { r = Math.round(100 * wave); g = Math.round(60 * wave); b = Math.round(220 * wave); }

      ctx.beginPath();
      ctx.moveTo(t2 * W, 0);
      ctx.lineTo(((i + 1) / segCount) * W, 0);
      ctx.strokeStyle = `rgba(${r},${g},${b},${(0.2 + 0.4 * wave) * int})`;
      ctx.stroke();
    }

    // Layer 4: Corner aurora blooms
    const cornerPositions = [[0, 0], [W, 0]]; // only top corners for aurora
    for (let i = 0; i < cornerPositions.length; i++) {
      const [cx, cy] = cornerPositions[i];
      const pulse = 0.6 + 0.4 * Math.sin(time * 0.5 + i * 2.1);
      const r = 150 * int * pulse;
      const col = i === 0 ? [0, 200, 100] : [80, 40, 200];
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      cg.addColorStop(0,   `rgba(${col[0]},${col[1]},${col[2]},${0.2 * int * pulse})`);
      cg.addColorStop(0.4, `rgba(${col[0]},${col[1]},${col[2]},${0.08 * int})`);
      cg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }

    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RAIN THEME — Diagonal rain streaks, puddle ripples, edge mist
  // ══════════════════════════════════════════════════════════════════════════

  interface RainDrop {
    x: number;       // start x (from top edge or left edge)
    y: number;       // start y
    len: number;     // streak length
    speed: number;   // fall speed factor
    alpha: number;   // opacity
    angle: number;   // slight angle variation from base diagonal
    edge: 0 | 1;     // 0=top, 1=right (rain comes from upper-right)
  }

  interface Ripple {
    x: number;
    y: number;
    r: number;       // current radius
    maxR: number;    // max radius
    alpha: number;
    speed: number;
  }

  const RAIN_COUNT = 70;
  const RIPPLE_MAX = 15;
  let rainDrops: RainDrop[] = [];
  let ripples: Ripple[] = [];
  let rippleTimer = 0;

  function buildRain(W: number, H: number): void {
    rainDrops = [];
    for (let i = 0; i < RAIN_COUNT; i++) {
      // Rain comes from top and right edges diagonally
      const edge = Math.random() > 0.6 ? 1 : 0; // 60% from top, 40% from right
      rainDrops.push({
        x: edge === 0 ? Math.random() * W : W - Math.random() * 60,
        y: edge === 0 ? Math.random() * -H : Math.random() * H * 0.6,
        len: 20 + Math.random() * 50,
        speed: 0.6 + Math.random() * 1.2,
        alpha: 0.08 + Math.random() * 0.25,
        angle: (-0.3 - Math.random() * 0.2), // diagonal angle (left and down)
        edge: edge as 0 | 1,
      });
    }
    ripples = [];
  }

  function drawRain(W: number, H: number, time: number, int: number): void {
    if (!ctx) return;

    // Layer 1: Mist/fog gradients along all edges — blue-grey atmospheric haze
    const mistD = 100 * int;
    const mistEdges = [
      { x0: 0, y0: 0, x1: 0, y1: mistD, fx: 0, fy: 0, fw: W, fh: mistD },
      { x0: 0, y0: H, x1: 0, y1: H - mistD, fx: 0, fy: H - mistD, fw: W, fh: mistD },
      { x0: 0, y0: 0, x1: mistD, y1: 0, fx: 0, fy: 0, fw: mistD, fh: H },
      { x0: W, y0: 0, x1: W - mistD, y1: 0, fx: W - mistD, fy: 0, fw: mistD, fh: H },
    ];
    for (let i = 0; i < mistEdges.length; i++) {
      const e = mistEdges[i];
      const wave = 0.7 + 0.3 * Math.sin(time * 0.4 + i * 1.7);
      const mg = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      mg.addColorStop(0,   `rgba(80,100,120,${0.15 * int * wave})`);
      mg.addColorStop(0.4, `rgba(60,80,100,${0.07 * int})`);
      mg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = mg;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // Layer 2: Rain streaks (animated with time offset)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    for (const drop of rainDrops) {
      // Advance position based on time
      const travel = (time * drop.speed * 60) % (H + drop.len * 2 + W * 0.5);
      // Diagonal fall: move left and down
      const dx = travel * Math.cos(drop.angle + Math.PI / 2);
      const dy = travel * Math.sin(drop.angle + Math.PI / 2);

      const sx = drop.x + dx;
      const sy = drop.y + dy;
      const ex = sx + Math.cos(drop.angle) * drop.len;
      const ey = sy + Math.sin(drop.angle) * drop.len;

      // Wind shimmer from fbm
      const shimmer = 0.7 + 0.3 * fbm(sx * 0.01 + time * 0.2, sy * 0.01);
      const alpha = drop.alpha * shimmer * int;

      // Outer thin glow
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(100,140,180,${alpha * 0.4})`;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Inner bright core
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = `rgba(160,200,230,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Layer 3: Puddle ripple circles along bottom edge
    // Spawn new ripples periodically
    rippleTimer -= speed;
    if (rippleTimer <= 0 && ripples.length < RIPPLE_MAX) {
      const rx = Math.random() * W;
      const ry = H - Math.random() * 20;
      ripples.push({
        x: rx, y: ry,
        r: 0,
        maxR: 20 + Math.random() * 40,
        alpha: 0.3 + Math.random() * 0.3,
        speed: 0.4 + Math.random() * 0.6,
      });
      rippleTimer = 4 + Math.random() * 8;
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.lineCap = 'butt';

    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += rp.speed * speed;
      const life = 1 - rp.r / rp.maxR;

      if (life <= 0) {
        ripples.splice(i, 1);
        continue;
      }

      const ripAlpha = rp.alpha * life * int;
      const scaleY = 0.35; // flatten ellipse to look like ground puddle

      ctx.save();
      ctx.translate(rp.x, rp.y);
      ctx.scale(1, scaleY);

      // Outer ring
      ctx.beginPath();
      ctx.arc(0, 0, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100,150,200,${ripAlpha * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner sharp ring
      ctx.beginPath();
      ctx.arc(0, 0, rp.r * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(140,180,220,${ripAlpha * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }

    // Layer 4: Bottom edge wet sheen
    const sheenG = ctx.createLinearGradient(0, H, 0, H - 40 * int);
    sheenG.addColorStop(0,   `rgba(60,90,130,${0.18 * int})`);
    sheenG.addColorStop(0.5, `rgba(40,70,110,${0.08 * int})`);
    sheenG.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = sheenG;
    ctx.fillRect(0, H - 40 * int, W, 40 * int);

    // Subtle moving mist streaks from noise
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 8; i++) {
      const seed = i * 17.3;
      const px = ((seed * 0.13 + time * 0.03) % 1) * W;
      const py = fbm(px * 0.005 + time * 0.05, seed) * H * 0.3;
      const mistLen = 80 + Math.sin(seed + time * 0.2) * 40;
      const mistAlpha = (0.02 + 0.02 * Math.abs(Math.sin(time * 0.3 + seed))) * int;

      const mg2 = ctx.createLinearGradient(px, py, px + mistLen * 0.7, py + mistLen * 0.4);
      mg2.addColorStop(0,   'rgba(0,0,0,0)');
      mg2.addColorStop(0.5, `rgba(70,100,140,${mistAlpha})`);
      mg2.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.strokeStyle = mg2 as unknown as string;
      ctx.lineWidth = 15 + Math.sin(seed) * 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + mistLen * 0.7, py + mistLen * 0.4);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // BLACK HOLE — Standalone configurable effect (works on any theme)
  // ══════════════════════════════════════════════════════════════════════════

  /** Convert HSL (h: 0-360, s: 0-1, l: 0-1) to {r,g,b} (0-255) */
  function hsl2rgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60)       { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else              { r = c; b = x; }
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }

  function drawBlackhole(W: number, H: number, time: number): void {
    if (!ctx) return;

    const cx = W / 2;
    const cy = H / 2;
    const minDim = Math.min(W, H);

    // Configurable params
    const sz = bhSize;
    const gl = bhGlow;
    const scaleX = bhWidth;
    const scaleY = bhHeight;

    const holeR = minDim * 0.06 * sz;
    const diskR = minDim * 0.35 * sz;

    // Generate color palette from hue
    const bright = hsl2rgb(bhHue, 0.7, 0.75);
    const mid    = hsl2rgb(bhHue, 0.8, 0.5);
    const dark   = hsl2rgb(bhHue, 0.9, 0.3);
    const dim    = hsl2rgb(bhHue, 0.7, 0.15);

    ctx.save();

    // Apply width/height stretch from center
    ctx.translate(cx, cy);
    ctx.scale(scaleX, scaleY);
    ctx.translate(-cx, -cy);

    ctx.globalCompositeOperation = 'lighter';

    // ── Layer 1: Swirling accretion disk spirals ─────────────────────────
    const armCount = 5;
    for (let arm = 0; arm < armCount; arm++) {
      const armOffset = (arm / armCount) * Math.PI * 2;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        const theta = t * Math.PI * 4 + armOffset + time * 0.3;
        const r = holeR * 1.5 + (diskR - holeR) * t;
        const wobble = Math.sin(theta * 3 + time * 2) * r * 0.04;
        const x = cx + Math.cos(theta) * (r + wobble);
        const y = cy + Math.sin(theta) * (r + wobble) * 0.45;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const fade = (0.08 + 0.04 * Math.sin(time * 1.5 + arm)) * gl;
      ctx.strokeStyle = `rgba(${mid.r},${mid.g},${mid.b},${fade})`;
      ctx.lineWidth = 2 + Math.sin(time + arm) * 0.5;
      ctx.stroke();
    }

    // ── Layer 2: Bright photon rings ────────────────────────────────────
    for (let ring = 0; ring < 3; ring++) {
      const ringR = holeR * (2.0 + ring * 0.6);
      const segments = 80;
      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const pulse = 1 + Math.sin(time * 2.5 + ring + theta * 2) * 0.03;
        const x = cx + Math.cos(theta) * ringR * pulse;
        const y = cy + Math.sin(theta) * ringR * 0.42 * pulse;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const ringAlpha = (0.15 - ring * 0.04) * gl;
      ctx.strokeStyle = `rgba(${bright.r},${bright.g},${bright.b},${ringAlpha})`;
      ctx.lineWidth = (3 - ring) * gl;
      ctx.stroke();

      ctx.strokeStyle = `rgba(${mid.r},${mid.g},${mid.b},${ringAlpha * 0.5})`;
      ctx.lineWidth = (6 - ring * 2) * gl;
      ctx.stroke();
    }

    // ── Layer 3: Gravitational lensing halo ─────────────────────────────
    const lensR = holeR * 2.5;
    const lensPulse = 0.7 + 0.3 * Math.sin(time * 1.8);

    const lensG = ctx.createRadialGradient(cx, cy - lensR * 0.3, lensR * 0.6, cx, cy - lensR * 0.3, lensR * 1.5);
    lensG.addColorStop(0, `rgba(${bright.r},${bright.g},${bright.b},${0.2 * gl * lensPulse})`);
    lensG.addColorStop(0.3, `rgba(${mid.r},${mid.g},${mid.b},${0.1 * gl * lensPulse})`);
    lensG.addColorStop(0.6, `rgba(${dark.r},${dark.g},${dark.b},${0.04 * gl})`);
    lensG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lensG;
    ctx.fillRect(cx - lensR * 2, cy - lensR * 2, lensR * 4, lensR * 3);

    const lensG2 = ctx.createRadialGradient(cx, cy + lensR * 0.4, lensR * 0.4, cx, cy + lensR * 0.4, lensR * 1.2);
    lensG2.addColorStop(0, `rgba(${mid.r},${mid.g},${mid.b},${0.08 * gl * lensPulse})`);
    lensG2.addColorStop(0.5, `rgba(${dark.r},${dark.g},${dark.b},${0.03 * gl})`);
    lensG2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lensG2;
    ctx.fillRect(cx - lensR * 2, cy - lensR, lensR * 4, lensR * 3);

    // ── Layer 4: Event horizon glow ring ─────────────────────────────────
    const horizonPulse = 0.8 + 0.2 * Math.sin(time * 3.2);
    const horizonG = ctx.createRadialGradient(cx, cy, holeR * 0.8, cx, cy, holeR * 2.5);
    horizonG.addColorStop(0, 'rgba(0,0,0,0)');
    horizonG.addColorStop(0.4, `rgba(${mid.r},${mid.g},${mid.b},${0.12 * gl * horizonPulse})`);
    horizonG.addColorStop(0.7, `rgba(${bright.r},${bright.g},${bright.b},${0.08 * gl * horizonPulse})`);
    horizonG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = horizonG;
    ctx.beginPath();
    ctx.arc(cx, cy, holeR * 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // ── Layer 5: Dark singularity (NOT affected by scale transform) ─────
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scaleX, scaleY);
    ctx.translate(-cx, -cy);

    const darkG = ctx.createRadialGradient(cx, cy, 0, cx, cy, holeR * 1.8);
    darkG.addColorStop(0, 'rgba(0,0,0,0.9)');
    darkG.addColorStop(0.5, `rgba(${dim.r},${dim.g},${dim.b},0.7)`);
    darkG.addColorStop(0.8, `rgba(${dim.r},${dim.g},${dim.b},0.3)`);
    darkG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = darkG;
    ctx.beginPath();
    ctx.arc(cx, cy, holeR * 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Layer 6: Edge glow ──────────────────────────────────────────────
    const edgeD = 50 * gl;
    const edgeDefs = [
      { x0: 0, y0: 0, x1: 0, y1: edgeD, fx: 0, fy: 0, fw: W, fh: edgeD },
      { x0: 0, y0: H, x1: 0, y1: H - edgeD, fx: 0, fy: H - edgeD, fw: W, fh: edgeD },
      { x0: 0, y0: 0, x1: edgeD, y1: 0, fx: 0, fy: 0, fw: edgeD, fh: H },
      { x0: W, y0: 0, x1: W - edgeD, y1: 0, fx: W - edgeD, fy: 0, fw: edgeD, fh: H },
    ];
    for (const e of edgeDefs) {
      const g = ctx.createLinearGradient(e.x0, e.y0, e.x1, e.y1);
      const edgePulse = 0.7 + 0.3 * Math.sin(time * 0.8);
      g.addColorStop(0, `rgba(${mid.r},${mid.g},${mid.b},${0.12 * gl * edgePulse})`);
      g.addColorStop(0.5, `rgba(${dark.r},${dark.g},${dark.b},${0.04 * gl})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(e.fx, e.fy, e.fw, e.fh);
    }

    // ── Layer 7: Matter streams ──────────────────────────────────────────
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scaleX, scaleY);
    ctx.translate(-cx, -cy);
    ctx.globalCompositeOperation = 'lighter';

    const streamCount = 8;
    for (let s = 0; s < streamCount; s++) {
      const baseAngle = (s / streamCount) * Math.PI * 2 + time * 0.15;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const r = diskR * (1 - t * 0.85);
        const theta = baseAngle + t * Math.PI * 2.5;
        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r * 0.42;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      const streamFade = 0.06 * gl * (0.7 + 0.3 * Math.sin(time * 2 + s));
      ctx.strokeStyle = `rgba(${bright.r},${bright.g},${bright.b},${streamFade})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // Main draw loop
  // ══════════════════════════════════════════════════════════════════════════

  let lastW = 0;
  let lastH = 0;

  function draw(): void {
    if (!ctx || !enabled) {
      animId = requestAnimationFrame(draw);
      return;
    }

    const W = canvas.width;
    const H = canvas.height;

    // Rebuild positional particles on resize
    if (W !== lastW || H !== lastH) {
      lastW = W;
      lastH = H;
      buildGalaxy(W, H);
      buildWinter(W, H);
      buildAurora(W, H);
      buildRain(W, H);
    }

    ctx.clearRect(0, 0, W, H);
    frame++;

    const time = frame * 0.02 * speed;
    const int = intensity;

    switch (currentTheme) {
      case 'fire':     drawFire(W, H, time, int); break;
      case 'galaxy':   drawGalaxy(W, H, time, int); break;
      case 'winter':   drawWinter(W, H, time, int); break;
      case 'dark':     drawDark(W, H, time, int); break;
      case 'light':    drawLight(W, H, time, int); break;
      case 'electric': drawElectric(W, H, time, int); break;
      case 'void':     drawVoid(W, H, time, int); break;
      case 'aurora':   drawAurora(W, H, time, int); break;
      case 'rain':     drawRain(W, H, time, int); break;
    }

    // Standalone black hole effect (works on any theme)
    if (bhEnabled) {
      const bhTime = frame * 0.02 * bhSpeed;
      drawBlackhole(W, H, bhTime);
    }

    animId = requestAnimationFrame(draw);
  }

  onMount(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    buildFlames();
    buildGalaxy(canvas.width, canvas.height);
    buildWinter(canvas.width, canvas.height);
    buildAurora(canvas.width, canvas.height);
    buildRain(canvas.width, canvas.height);

    // Read initial values
    enabled = get(fx.borderEnabled);
    intensity = get(fx.borderIntensity);
    speed = get(fx.borderSpeed);
    currentTheme = get(theme);

    animId = requestAnimationFrame(draw);

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Read initial black hole values
    bhEnabled = get(fx.blackholeEnabled);
    bhSize    = get(fx.blackholeSize);
    bhSpeed   = get(fx.blackholeSpeed);
    bhGlow    = get(fx.blackholeGlow);
    bhWidth   = get(fx.blackholeWidth);
    bhHeight  = get(fx.blackholeHeight);
    bhHue     = get(fx.blackholeHue);

    const unsubs = [
      fx.borderEnabled.subscribe(v   => { enabled = v; }),
      fx.borderIntensity.subscribe(v => { intensity = v; }),
      fx.borderSpeed.subscribe(v     => { speed = v; }),
      theme.subscribe(v              => { currentTheme = v; }),
      fx.blackholeEnabled.subscribe(v => { bhEnabled = v; }),
      fx.blackholeSize.subscribe(v    => { bhSize = v; }),
      fx.blackholeSpeed.subscribe(v   => { bhSpeed = v; }),
      fx.blackholeGlow.subscribe(v    => { bhGlow = v; }),
      fx.blackholeWidth.subscribe(v   => { bhWidth = v; }),
      fx.blackholeHeight.subscribe(v  => { bhHeight = v; }),
      fx.blackholeHue.subscribe(v     => { bhHue = v; }),
    ];

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      unsubs.forEach(u => u());
    };
  });
</script>

<canvas id="border-magic" bind:this={canvas}></canvas>

<style>
  #border-magic {
    position: fixed;
    inset: 0;
    z-index: 14;
    pointer-events: none;
  }
</style>
