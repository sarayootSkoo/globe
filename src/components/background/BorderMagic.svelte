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

  // ── Theme flame palettes ─────────────────────────────────────────────────
  interface FlamePalette {
    core: [number, number, number];     // hottest inner color (white/yellow)
    mid: [number, number, number];      // mid flame body
    outer: [number, number, number];    // outer flame tips
    glow: [number, number, number];     // ambient glow cast
    smoke: [number, number, number];    // smoke/wisp at tips
  }

  const palettes: Record<Theme, FlamePalette> = {
    fire: {
      core:  [255, 240, 180],
      mid:   [255, 140, 20],
      outer: [220, 40, 0],
      glow:  [255, 80, 0],
      smoke: [80, 20, 0],
    },
    dark: {
      core:  [200, 250, 255],
      mid:   [0, 180, 240],
      outer: [0, 80, 160],
      glow:  [0, 140, 220],
      smoke: [0, 30, 60],
    },
    light: {
      core:  [160, 190, 255],
      mid:   [60, 100, 200],
      outer: [30, 50, 140],
      glow:  [40, 80, 180],
      smoke: [20, 30, 80],
    },
    winter: {
      core:  [240, 248, 255],
      mid:   [160, 210, 255],
      outer: [80, 150, 220],
      glow:  [120, 190, 255],
      smoke: [40, 60, 100],
    },
    galaxy: {
      core:  [255, 220, 255],
      mid:   [200, 100, 255],
      outer: [120, 40, 200],
      glow:  [160, 60, 255],
      smoke: [60, 20, 100],
    },
  };

  // ── Flame tongue particles ───────────────────────────────────────────────
  interface FlameTongue {
    edge: 0 | 1 | 2 | 3;  // 0=top, 1=right, 2=bottom, 3=left
    pos: number;           // 0–1 position along the edge
    height: number;        // max flame height in px
    width: number;         // flame width in px
    phase: number;         // animation phase offset
    speed: number;         // flicker speed
    waver: number;         // lateral wavering amplitude
  }

  const FLAME_COUNT = 100;
  let flames: FlameTongue[] = [];

  function buildFlames(): void {
    flames = [];
    for (let i = 0; i < FLAME_COUNT; i++) {
      flames.push({
        edge: (Math.floor(Math.random() * 4)) as 0 | 1 | 2 | 3,
        pos: Math.random(),
        height: 30 + Math.random() * 60,
        width: 8 + Math.random() * 20,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        waver: 2 + Math.random() * 6,
      });
    }
  }

  // ── Noise approximation for organic movement ─────────────────────────────
  function noise(x: number, y: number): number {
    return (
      Math.sin(x * 1.3 + y * 0.7) * 0.3 +
      Math.sin(x * 2.7 - y * 1.1) * 0.2 +
      Math.sin(x * 0.5 + y * 2.3) * 0.25 +
      Math.cos(x * 1.8 + y * 1.5) * 0.25
    );
  }

  // ── Color interpolation helper ───────────────────────────────────────────
  function lerpColor(a: [number, number, number], b: [number, number, number], t: number): string {
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return `${r},${g},${bl}`;
  }

  function draw(): void {
    if (!ctx || !enabled) {
      animId = requestAnimationFrame(draw);
      return;
    }

    const W = canvas.width;
    const H = canvas.height;
    const pal = palettes[currentTheme] || palettes.dark;
    const int = intensity;
    const spd = speed;

    ctx.clearRect(0, 0, W, H);
    frame++;

    const time = frame * 0.025 * spd;

    // ── Layer 1: Deep base glow from edges ─────────────────────────────
    const glowDepth = 80 * int;
    const baseAlpha = 0.12 * int;

    // Top
    const gT = ctx.createLinearGradient(0, 0, 0, glowDepth);
    gT.addColorStop(0, `rgba(${pal.glow.join(',')},${baseAlpha})`);
    gT.addColorStop(0.4, `rgba(${pal.outer.join(',')},${baseAlpha * 0.4})`);
    gT.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gT;
    ctx.fillRect(0, 0, W, glowDepth);

    // Bottom
    const gB = ctx.createLinearGradient(0, H, 0, H - glowDepth);
    gB.addColorStop(0, `rgba(${pal.glow.join(',')},${baseAlpha})`);
    gB.addColorStop(0.4, `rgba(${pal.outer.join(',')},${baseAlpha * 0.4})`);
    gB.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gB;
    ctx.fillRect(0, H - glowDepth, W, glowDepth);

    // Left
    const gL = ctx.createLinearGradient(0, 0, glowDepth, 0);
    gL.addColorStop(0, `rgba(${pal.glow.join(',')},${baseAlpha})`);
    gL.addColorStop(0.4, `rgba(${pal.outer.join(',')},${baseAlpha * 0.4})`);
    gL.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gL;
    ctx.fillRect(0, 0, glowDepth, H);

    // Right
    const gR = ctx.createLinearGradient(W, 0, W - glowDepth, 0);
    gR.addColorStop(0, `rgba(${pal.glow.join(',')},${baseAlpha})`);
    gR.addColorStop(0.4, `rgba(${pal.outer.join(',')},${baseAlpha * 0.4})`);
    gR.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gR;
    ctx.fillRect(W - glowDepth, 0, glowDepth, H);

    // ── Layer 2: Volumetric flame tongues ──────────────────────────────
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const fl of flames) {
      const t = time * fl.speed + fl.phase;
      const flicker = 0.5 + 0.5 * noise(t, fl.pos * 10);
      const h = fl.height * flicker * int;
      const w = fl.width * (0.7 + 0.3 * flicker);
      const waverX = fl.waver * Math.sin(t * 1.7) * noise(t * 0.5, fl.pos * 5);

      let x: number, y: number;
      let angle: number;

      // Position flame on its edge, pointing inward
      switch (fl.edge) {
        case 0: // top — flames point down
          x = fl.pos * W;
          y = 0;
          angle = Math.PI / 2;
          break;
        case 1: // right — flames point left
          x = W;
          y = fl.pos * H;
          angle = Math.PI;
          break;
        case 2: // bottom — flames point up
          x = fl.pos * W;
          y = H;
          angle = -Math.PI / 2;
          break;
        case 3: // left — flames point right
          x = 0;
          y = fl.pos * H;
          angle = 0;
          break;
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Draw flame as layered gradient ellipses
      const layers = 5;
      for (let l = layers - 1; l >= 0; l--) {
        const lt = l / layers; // 0=inner, 1=outer
        const lh = h * (0.4 + 0.6 * lt);
        const lw = w * (0.3 + 0.7 * (1 - lt));
        const lwaver = waverX * lt;

        // Color gradient: core → mid → outer → smoke
        let color: string;
        let alpha: number;
        if (lt < 0.3) {
          color = lerpColor(pal.core, pal.mid, lt / 0.3);
          alpha = (0.15 + 0.1 * (1 - lt)) * int;
        } else if (lt < 0.7) {
          color = lerpColor(pal.mid, pal.outer, (lt - 0.3) / 0.4);
          alpha = (0.12 + 0.06 * (1 - lt)) * int;
        } else {
          color = lerpColor(pal.outer, pal.smoke, (lt - 0.7) / 0.3);
          alpha = 0.06 * (1 - lt) * int;
        }

        const grad = ctx.createRadialGradient(
          lwaver, lh * 0.5,
          0,
          lwaver, lh * 0.3,
          Math.max(lh, lw) * 0.8
        );
        grad.addColorStop(0, `rgba(${color},${alpha})`);
        grad.addColorStop(0.5, `rgba(${color},${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${color},0)`);

        ctx.beginPath();
        ctx.ellipse(lwaver, lh * 0.4, lw * 0.5, lh * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.restore();
    }

    // ── Layer 3: Hot inner edge line ───────────────────────────────────
    const edgePulse = 0.6 + 0.4 * Math.sin(time * 1.2);
    const edgeAlpha = 0.25 * edgePulse * int;
    const edgeWidth = 3 * int;

    ctx.globalCompositeOperation = 'lighter';

    // Draw hot edge lines on all four sides with flowing brightness
    const segCount = 80;
    ctx.lineWidth = edgeWidth;

    for (let edge = 0; edge < 4; edge++) {
      ctx.beginPath();
      for (let i = 0; i <= segCount; i++) {
        const t2 = i / segCount;
        const wave = noise(t2 * 8 + time * 2, edge * 3.7) * 0.5 + 0.5;
        const segAlpha = edgeAlpha * (0.3 + 0.7 * wave);
        const color = lerpColor(pal.core, pal.mid, 1 - wave);

        let sx: number, sy: number;
        switch (edge) {
          case 0: sx = t2 * W; sy = 1; break;
          case 1: sx = W - 1; sy = t2 * H; break;
          case 2: sx = (1 - t2) * W; sy = H - 1; break;
          case 3: sx = 1; sy = (1 - t2) * H; break;
        }

        if (i === 0) {
          ctx.moveTo(sx!, sy!);
        } else {
          ctx.lineTo(sx!, sy!);
        }
        ctx.strokeStyle = `rgba(${color},${segAlpha})`;
      }
      ctx.stroke();
    }

    // ── Layer 4: Bright spark embers floating from edges ───────────────
    const sparkCount = 30 * int;
    for (let i = 0; i < sparkCount; i++) {
      const seed = i * 137.508;
      const edge2 = Math.floor(seed % 4);
      const pos2 = (seed * 0.618) % 1;
      const life = ((time * 0.5 + seed * 0.01) % 1);
      const drift = 40 * life * int;
      const sparkAlpha = (1 - life) * 0.5 * int;
      const sparkSize = (1 - life) * 2.5 * int;

      let sx2: number, sy2: number;
      switch (edge2) {
        case 0: sx2 = pos2 * W + noise(seed, time) * 10; sy2 = drift; break;
        case 1: sx2 = W - drift; sy2 = pos2 * H + noise(seed, time) * 10; break;
        case 2: sx2 = pos2 * W + noise(seed, time) * 10; sy2 = H - drift; break;
        case 3: sx2 = drift; sy2 = pos2 * H + noise(seed, time) * 10; break;
      }

      const sparkGrad = ctx.createRadialGradient(sx2!, sy2!, 0, sx2!, sy2!, sparkSize * 3);
      sparkGrad.addColorStop(0, `rgba(${pal.core.join(',')},${sparkAlpha})`);
      sparkGrad.addColorStop(0.4, `rgba(${pal.mid.join(',')},${sparkAlpha * 0.4})`);
      sparkGrad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.arc(sx2!, sy2!, sparkSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = sparkGrad;
      ctx.fill();
    }

    ctx.restore();

    // ── Layer 5: Corner intensity bursts ───────────────────────────────
    const cornerPulse = 0.5 + 0.5 * Math.sin(time * 0.8);
    const cornerRadius = 60 * int;
    const cornerAlpha = 0.15 * cornerPulse * int;
    const corners = [
      [0, 0], [W, 0], [0, H], [W, H]
    ];

    for (const [cx, cy] of corners) {
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cornerRadius);
      cg.addColorStop(0, `rgba(${pal.core.join(',')},${cornerAlpha})`);
      cg.addColorStop(0.3, `rgba(${pal.mid.join(',')},${cornerAlpha * 0.5})`);
      cg.addColorStop(0.6, `rgba(${pal.outer.join(',')},${cornerAlpha * 0.2})`);
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, cornerRadius, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  onMount(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    buildFlames();

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

    const unsubs = [
      fx.borderEnabled.subscribe(v   => { enabled = v; }),
      fx.borderIntensity.subscribe(v => { intensity = v; }),
      fx.borderSpeed.subscribe(v     => { speed = v; }),
      theme.subscribe(v              => { currentTheme = v; }),
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
