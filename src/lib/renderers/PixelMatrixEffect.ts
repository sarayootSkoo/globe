/**
 * PixelMatrixEffect — Standalone matrix rain effect for pixel character spawn/despawn.
 *
 * renderMatrixEffect(ctx, character, spriteOffscreen, progress, type)
 *
 * Duration: 300ms (caller drives progress from 0 → 1).
 * Spawn:   Green digital rain columns sweep top-to-bottom, character pixels
 *          are revealed behind the rain.
 * Despawn: Green rain columns sweep top-to-bottom, consuming (erasing)
 *          character pixels as they pass.
 *
 * 8 vertical columns with per-column staggered timing (deterministic seeds
 * so the pattern is stable across frames for a given character).
 *
 * Color: #00ff41 (matrix green).
 */

import type { PixelCharacter, MatrixEffectType } from './PixelCharacterEngine.js';
import { SPRITE_WIDTH, SPRITE_HEIGHT, RENDER_SCALE } from './PixelSpriteData.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MATRIX_GREEN = '#00ff41';
const MATRIX_GREEN_DIM = '#007a1f';
const NUM_COLS = 8;

/**
 * Rain characters: ASCII hex digits + Katakana half-width lookalikes.
 * Kept as a flat string for fast random access.
 */
const RAIN_CHARS =
  '0123456789ABCDEF' +
  'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

// ---------------------------------------------------------------------------
// Deterministic pseudo-random helpers
// ---------------------------------------------------------------------------

/** Hash a seed integer into [0, 1) — deterministic across frames. */
function hash(n: number): number {
  let x = Math.sin(n + 1) * 43758.5453123;
  return x - Math.floor(x);
}

/** Pick a rain character from the pool deterministically. */
function rainChar(col: number, row: number, tick: number): string {
  const idx = Math.floor(hash(col * 97 + row * 31 + tick * 7) * RAIN_CHARS.length);
  return RAIN_CHARS[idx];
}

/** Column delay offset [0, 0.5) so columns start at staggered times. */
function colDelay(col: number): number {
  return hash(col * 53) * 0.5;
}

// ---------------------------------------------------------------------------
// Core rendering
// ---------------------------------------------------------------------------

/**
 * Render one frame of the matrix effect onto `ctx`.
 *
 * @param ctx         - The canvas 2D context to draw into (should be the main canvas).
 * @param character   - The PixelCharacter being affected (used for position & direction).
 * @param spriteFrame - Pre-rendered offscreen canvas of the character's current sprite frame.
 * @param progress    - Animation progress 0 → 1 (caller increments this each tick).
 * @param type        - 'spawn' or 'despawn'.
 */
export function renderMatrixEffect(
  ctx: CanvasRenderingContext2D,
  character: PixelCharacter,
  spriteFrame: HTMLCanvasElement,
  progress: number,
  type: MatrixEffectType,
): void {
  const drawW = SPRITE_WIDTH * RENDER_SCALE;
  const drawH = SPRITE_HEIGHT * RENDER_SCALE;

  // Character origin: (x, y) is bottom-center
  const dx = Math.round(character.x - drawW / 2);
  const dy = Math.round(character.y - drawH);

  const colW = drawW / NUM_COLS;
  const charH = drawH / (SPRITE_HEIGHT); // pixel height of one sprite row in canvas coords = RENDER_SCALE

  // Tick drives rain character selection — advances with progress so symbols change
  const tick = Math.floor(progress * 30);

  ctx.save();

  // Handle left-facing mirror
  if (character.direction === 'left') {
    ctx.translate(dx + drawW, dy);
    ctx.scale(-1, 1);
    ctx.translate(-dx, -dy);
  }

  // Clip to character bounding box
  ctx.beginPath();
  ctx.rect(dx, dy, drawW, drawH);
  ctx.clip();

  if (type === 'spawn') {
    renderSpawn(ctx, spriteFrame, dx, dy, drawW, drawH, colW, charH, NUM_COLS, tick, progress);
  } else {
    renderDespawn(ctx, spriteFrame, dx, dy, drawW, drawH, colW, charH, NUM_COLS, tick, progress);
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Spawn effect
// ---------------------------------------------------------------------------

function renderSpawn(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  dx: number,
  dy: number,
  drawW: number,
  drawH: number,
  colW: number,
  charH: number,
  numCols: number,
  tick: number,
  progress: number,
): void {
  // Draw the character first — it fades in from nothing as the rain sweeps past
  const charAlpha = easeIn(progress);
  ctx.globalAlpha = charAlpha;
  ctx.drawImage(sprite, dx, dy);
  ctx.globalAlpha = 1;

  const fontSize = Math.max(8, Math.round(colW * 0.9));
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textBaseline = 'top';

  for (let col = 0; col < numCols; col++) {
    const delay = colDelay(col);
    // Normalised progress for this column
    const cp = saturate((progress - delay) / (1 - delay));
    if (cp <= 0) continue;

    const cx = dx + col * colW;
    // Sweep front Y: where the leading rain drop is
    const frontY = dy + cp * (drawH + charH * 4);

    // Draw rain column from top to frontY
    const visibleRows = Math.ceil((frontY - dy) / charH);

    for (let r = 0; r < visibleRows; r++) {
      const ry = dy + r * charH;
      if (ry > dy + drawH) break;

      const distFromFront = visibleRows - 1 - r;
      const trailLen = 6;

      if (distFromFront === 0) {
        // Brightest leading character
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
      } else if (distFromFront < trailLen) {
        // Fading trail
        const t = distFromFront / trailLen;
        ctx.globalAlpha = 1 - t;
        ctx.fillStyle = distFromFront === 1 ? MATRIX_GREEN : MATRIX_GREEN_DIM;
      } else {
        // Rain has already passed — erase the rain character so the sprite shows through
        // (no drawing needed; sprite was already drawn below)
        continue;
      }

      const ch = rainChar(col, r, tick);
      ctx.fillText(ch, cx, ry);
    }
  }

  ctx.globalAlpha = 1;
}

// ---------------------------------------------------------------------------
// Despawn effect
// ---------------------------------------------------------------------------

function renderDespawn(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLCanvasElement,
  dx: number,
  dy: number,
  drawW: number,
  drawH: number,
  colW: number,
  charH: number,
  numCols: number,
  tick: number,
  progress: number,
): void {
  // Draw the character — portions above each column's sweep will be erased
  ctx.drawImage(sprite, dx, dy);

  const fontSize = Math.max(8, Math.round(colW * 0.9));
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textBaseline = 'top';

  for (let col = 0; col < numCols; col++) {
    const delay = colDelay(col);
    const cp = saturate((progress - delay) / (1 - delay));
    if (cp <= 0) continue;

    const cx = dx + col * colW;
    const frontY = dy + cp * drawH;

    // Erase character pixels that the rain has already consumed
    ctx.clearRect(cx, dy, colW, frontY - dy);

    // Draw rain column above and at the sweep point
    const visibleRows = Math.ceil((frontY - dy) / charH);

    for (let r = Math.max(0, visibleRows - 8); r <= visibleRows; r++) {
      const ry = dy + r * charH;
      if (ry < dy) continue;

      const distFromFront = visibleRows - r;

      if (distFromFront === 0) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#ffffff';
      } else {
        const trailLen = 7;
        const t = distFromFront / trailLen;
        ctx.globalAlpha = Math.max(0, 1 - t);
        ctx.fillStyle = distFromFront <= 2 ? MATRIX_GREEN : MATRIX_GREEN_DIM;
      }

      const ch = rainChar(col, r, tick);
      ctx.fillText(ch, cx, ry);
    }

    // Continuation rain below the character bounding box — short tail
    for (let t = 1; t <= 4; t++) {
      const ry = frontY + t * charH;
      if (ry > dy + drawH + charH * 6) break;
      ctx.globalAlpha = (1 - t / 5) * cp;
      ctx.fillStyle = MATRIX_GREEN_DIM;
      const ch = rainChar(col, visibleRows + t, tick);
      ctx.fillText(ch, cx, ry);
    }
  }

  ctx.globalAlpha = 1;
}

// ---------------------------------------------------------------------------
// Easing helpers
// ---------------------------------------------------------------------------

function saturate(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function easeIn(t: number): number {
  return t * t;
}
