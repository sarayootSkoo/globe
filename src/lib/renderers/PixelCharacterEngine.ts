/**
 * PixelCharacterEngine — Canvas-based pixel character renderer.
 *
 * Manages a set of PixelCharacter instances, runs a game loop for movement /
 * frame animation, and draws them palette-swapped onto an HTMLCanvasElement at
 * 2× pixel scale.  Characters are z-sorted by Y so lower ones appear in front.
 *
 * Battery-saving: requestAnimationFrame is only requested while there are
 * active animations (movement, non-idle frames, matrix effects, visible
 * bubbles).  When everything is idle the loop suspends itself.
 */

import {
  CHARACTER_TEMPLATE,
  PALETTES,
  BUBBLE_SPRITES,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
  BUBBLE_WIDTH,
  BUBBLE_HEIGHT,
  RENDER_SCALE,
  TEMPLATE_COLORS,
  type SpriteFrame,
  type CharacterPalette,
  type BubbleType,
} from './PixelSpriteData.js';

import {
  areSheetsLoaded,
  getCharacter,
  drawCharacterFrame,
  CHAR_RENDER_W,
  CHAR_RENDER_H,
} from './SpriteSheetLoader.js';
import type { EngineDirection, EngineState } from './SpriteSheetLoader.js';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export const CharacterState = {
  idle: 'idle',
  walk: 'walk',
  type: 'type',
  read: 'read',
} as const;
export type CharacterState = (typeof CharacterState)[keyof typeof CharacterState];

export const CharacterDirection = {
  down: 'down',
  up: 'up',
  right: 'right',
  left: 'left',
} as const;
export type CharacterDirection = (typeof CharacterDirection)[keyof typeof CharacterDirection];

export const MatrixEffectType = {
  spawn: 'spawn',
  despawn: 'despawn',
} as const;
export type MatrixEffectType = (typeof MatrixEffectType)[keyof typeof MatrixEffectType];

export interface PixelCharacter {
  id: string;
  /** Index into PALETTES array (0-5). */
  palette: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  state: CharacterState;
  direction: CharacterDirection;
  /** Current animation frame index within the state's frame list. */
  frame: number;
  /** Elapsed ms since last frame change. */
  frameTimer: number;
  bubble: BubbleType | null;
  /** Remaining ms the bubble should stay visible (0 = permanent until hideBubble). */
  bubbleTimer: number;
  matrixEffect: MatrixEffectType | null;
  /** 0 → 1 progress of the current matrix effect. */
  matrixProgress: number;
  /** Render opacity (0-1). Default 1. */
  opacity: number;
}

// ---------------------------------------------------------------------------
// Internal constants
// ---------------------------------------------------------------------------

const MOVE_SPEED = 120; // px / second

const FRAME_DURATIONS: Record<CharacterState, number> = {
  idle: 0,    // static — no animation when idle
  walk: 150,  // ms per frame
  type: 200,
  read: 250,
};

const MATRIX_DURATION = 300; // ms

/** Frame sequences per state (indices into the directional frame tuple). */
const FRAME_SEQUENCES: Record<CharacterState, readonly string[]> = {
  idle: ['walk1', 'type1', 'walk3', 'read1', 'walk2', 'type2', 'read2', 'walk1', 'walk3', 'type1'],  // shuffled poses
  walk: ['walk1', 'walk2', 'walk3', 'walk2'],
  type: ['type1', 'type2'],
  read: ['read1', 'read2'],
};

// ---------------------------------------------------------------------------
// PixelCharacterEngine
// ---------------------------------------------------------------------------

export class PixelCharacterEngine {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  readonly scale: number;

  private characters: Map<string, PixelCharacter> = new Map();

  /** Pre-built per-palette pixel lookup tables: templateColor → paletteColor */
  private paletteSwapMaps: Map<string, Map<string, string>> = new Map();

  /** Off-screen canvases pre-rendered for each frame × palette combination. */
  private frameCache: Map<string, HTMLCanvasElement> = new Map();

  private running = false;
  private idle = false;
  private lastTime = 0;
  private rafHandle = 0;

  constructor(canvas: HTMLCanvasElement, options?: { scale?: number }) {
    this.canvas = canvas;
    this.scale = options?.scale ?? RENDER_SCALE;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('PixelCharacterEngine: could not get 2D context');
    ctx.imageSmoothingEnabled = false;
    this.ctx = ctx;

    // Build swap maps for all palettes up-front
    for (let i = 0; i < PALETTES.length; i++) {
      this.buildPaletteSwapMap(i);
    }
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /** Returns the IDs of all currently alive characters (including despawning). */
  getCharacterIds(): Set<string> {
    return new Set(this.characters.keys());
  }

  spawn(id: string, x: number, y: number, palette = 0): void {
    const char: PixelCharacter = {
      id,
      palette: Math.min(Math.max(palette, 0), PALETTES.length - 1),
      x: Math.round(x),
      y: Math.round(y),
      targetX: Math.round(x),
      targetY: Math.round(y),
      state: 'idle',
      direction: 'down',
      frame: palette % 4,  // offset start frame per character so they don't sync
      frameTimer: (palette * 137) % 400,  // stagger timer offset
      bubble: null,
      bubbleTimer: 0,
      matrixEffect: 'spawn',
      matrixProgress: 0,
      opacity: 1,
    };
    this.characters.set(id, char);
    this.wakeUp();
  }

  /** Set render opacity for a character (0-1). */
  setOpacity(id: string, opacity: number): void {
    const char = this.characters.get(id);
    if (char) {
      char.opacity = Math.max(0, Math.min(1, opacity));
      this.wakeUp();
    }
  }

  despawn(id: string): void {
    const char = this.characters.get(id);
    if (!char) return;
    char.matrixEffect = 'despawn';
    char.matrixProgress = 0;
    this.wakeUp();
  }

  setCharacterState(id: string, state: CharacterState): void {
    const char = this.characters.get(id);
    if (!char) return;
    if (char.state === state) return;
    char.state = state;
    char.frame = 0;
    char.frameTimer = 0;
    this.wakeUp();
  }

  moveTo(id: string, x: number, y: number): void {
    const char = this.characters.get(id);
    if (!char) return;
    char.targetX = Math.round(x);
    char.targetY = Math.round(y);
    if (char.targetX !== char.x || char.targetY !== char.y) {
      char.state = 'walk';
      char.frame = 0;
      char.frameTimer = 0;
    }
    this.wakeUp();
  }

  showBubble(id: string, type: BubbleType, durationMs = 0): void {
    const char = this.characters.get(id);
    if (!char) return;
    char.bubble = type;
    char.bubbleTimer = durationMs;
    this.wakeUp();
  }

  hideBubble(id: string): void {
    const char = this.characters.get(id);
    if (!char) return;
    char.bubble = null;
    char.bubbleTimer = 0;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.rafHandle = requestAnimationFrame((t) => this.tick(t));
  }

  stop(): void {
    this.running = false;
    if (this.rafHandle) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = 0;
    }
  }

  // -------------------------------------------------------------------------
  // Game loop
  // -------------------------------------------------------------------------

  private wakeUp(): void {
    if (this.idle) {
      this.idle = false;
      this.lastTime = performance.now();
      this.rafHandle = requestAnimationFrame((t) => this.tick(t));
    }
  }

  private tick(time: number): void {
    if (!this.running) return;

    const dt = Math.min(time - this.lastTime, 100); // cap at 100ms to avoid huge jumps
    this.lastTime = time;

    let anyActive = false;

    for (const [id, char] of this.characters) {
      const active = this.updateCharacter(char, dt);
      if (active) anyActive = true;

      // Remove despawned characters once animation completes
      if (char.matrixEffect === 'despawn' && char.matrixProgress >= 1) {
        this.characters.delete(id);
      }
    }

    this.render();

    if (anyActive) {
      // Active animations (walk/type/read/matrix) → full 60fps
      this.rafHandle = requestAnimationFrame((t) => this.tick(t));
    } else {
      // All idle — stop the loop; wakeUp() will restart when state changes
      this.idle = true;
    }
  }

  /**
   * Update a single character's FSM, movement, and timers.
   * Returns true if the character has any active animation.
   */
  private updateCharacter(char: PixelCharacter, dt: number): boolean {
    let active = false;

    // --- Matrix effect ---
    if (char.matrixEffect) {
      char.matrixProgress = Math.min(char.matrixProgress + dt / MATRIX_DURATION, 1);
      active = true;
      if (char.matrixEffect === 'spawn' && char.matrixProgress >= 1) {
        char.matrixEffect = null;
      }
      // despawn removal is handled in tick()
    }

    // --- Movement ---
    if (char.state === 'walk') {
      const dx = char.targetX - char.x;
      const dy = char.targetY - char.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1) {
        // Arrived
        char.x = char.targetX;
        char.y = char.targetY;
        char.state = 'idle';
        char.frame = 0;
        char.frameTimer = 0;
      } else {
        // Update direction
        if (Math.abs(dx) >= Math.abs(dy)) {
          char.direction = dx > 0 ? 'right' : 'left';
        } else {
          char.direction = dy > 0 ? 'down' : 'up';
        }

        const step = Math.min((MOVE_SPEED * dt) / 1000, dist);
        char.x = Math.round(char.x + (dx / dist) * step);
        char.y = Math.round(char.y + (dy / dist) * step);
        active = true;
      }
    }

    // --- Frame animation ---
    const baseDuration = FRAME_DURATIONS[char.state];
    if (baseDuration > 0) {
      // Idle uses random duration 200–800ms (step 100) per frame for organic feel
      const frameDuration = char.state === 'idle'
        ? 200 + Math.floor(((char.frame * 137 + char.palette * 53) % 7) * 100)
        : baseDuration;
      char.frameTimer += dt;
      if (char.frameTimer >= frameDuration) {
        char.frameTimer -= frameDuration;
        const seq = FRAME_SEQUENCES[char.state];
        char.frame = (char.frame + 1) % seq.length;
        active = true;
      }
    }

    // --- Bubble timer ---
    if (char.bubble && char.bubbleTimer > 0) {
      char.bubbleTimer -= dt;
      if (char.bubbleTimer <= 0) {
        char.bubble = null;
        char.bubbleTimer = 0;
      }
      active = true;
    }

    if (char.bubble) active = true;

    return active;
  }

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  private render(): void {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Z-sort by Y (lower Y = behind)
    const sorted = [...this.characters.values()].sort((a, b) => a.y - b.y);

    for (const char of sorted) {
      this.drawCharacter(char);
    }
  }

  private drawCharacter(char: PixelCharacter): void {
    const { ctx } = this;

    // Apply opacity
    const prevAlpha = ctx.globalAlpha;
    if (char.opacity < 1) {
      ctx.globalAlpha = char.opacity;
    }

    // ── Try image-based sprite sheet first ──────────────────────────────
    if (areSheetsLoaded()) {
      const charData = getCharacter(char.palette);
      if (charData) {
        const drawW = Math.round(CHAR_RENDER_W * (this.scale / 2));
        const drawH = Math.round(CHAR_RENDER_H * (this.scale / 2));
        const dx = Math.round(char.x - drawW / 2);

        const dy = Math.round(char.y - drawH);

        const dir = char.direction as EngineDirection;
        const state = char.state as EngineState;

        drawCharacterFrame(ctx, charData, dir, state, char.frame, dx, dy, drawW, drawH);

        // Speech bubble
        if (char.bubble) {
          this.drawBubble(char, dx, dy);
        }

        // Restore opacity
        ctx.globalAlpha = prevAlpha;
        return;
      }
    }

    // ── Fallback: pixel data rendering ─────────────────────────────────
    const spriteDir = char.direction === 'left' ? 'right' : char.direction;
    const dirFrames = CHARACTER_TEMPLATE[spriteDir];
    const seq = FRAME_SEQUENCES[char.state];
    const frameName = seq[char.frame % seq.length] as keyof typeof dirFrames;
    const spriteFrame = dirFrames[frameName];

    const cacheKey = this.frameCacheKey(char.palette, spriteDir, frameName);
    let offscreen = this.frameCache.get(cacheKey);
    if (!offscreen) {
      offscreen = this.renderFrameToOffscreen(spriteFrame, char.palette);
      this.frameCache.set(cacheKey, offscreen);
    }

    const drawW = SPRITE_WIDTH * this.scale;
    const drawH = SPRITE_HEIGHT * this.scale;
    const dx = Math.round(char.x - drawW / 2);
    const dy = Math.round(char.y - drawH);

    if (char.matrixEffect) {
      renderMatrixEffectInline(ctx, char, offscreen, drawW, drawH, dx, dy);
    } else {
      if (char.direction === 'left') {
        ctx.save();
        ctx.translate(dx + drawW, dy);
        ctx.scale(-1, 1);
        ctx.drawImage(offscreen, 0, 0);
        ctx.restore();
      } else {
        ctx.drawImage(offscreen, dx, dy);
      }
    }

    // Speech bubble
    if (char.bubble) {
      this.drawBubble(char, dx, dy);
    }

    // Restore opacity
    ctx.globalAlpha = prevAlpha;
  }

  private drawBubble(char: PixelCharacter, charDx: number, charDy: number): void {
    if (!char.bubble) return;
    const { ctx } = this;
    const frame = BUBBLE_SPRITES[char.bubble];
    const bw = BUBBLE_WIDTH * this.scale;
    const bh = BUBBLE_HEIGHT * this.scale;

    // Position bubble above and to the right of character
    const bx = Math.round(charDx + SPRITE_WIDTH * this.scale * 0.4);
    const by = Math.round(charDy - bh - 4);

    const offscreen = this.getBubbleOffscreen(char.bubble);
    ctx.drawImage(offscreen, bx, by, bw, bh);
  }

  private bubbleCache: Map<BubbleType, HTMLCanvasElement> = new Map();

  private getBubbleOffscreen(type: BubbleType): HTMLCanvasElement {
    const cached = this.bubbleCache.get(type);
    if (cached) return cached;

    const oc = document.createElement('canvas');
    oc.width = BUBBLE_WIDTH;
    oc.height = BUBBLE_HEIGHT;
    const octx = oc.getContext('2d')!;
    octx.imageSmoothingEnabled = false;

    const frame = BUBBLE_SPRITES[type];
    for (let row = 0; row < frame.length; row++) {
      const rowData = frame[row];
      for (let col = 0; col < rowData.length; col++) {
        const color = rowData[col];
        if (color) {
          octx.fillStyle = color;
          octx.fillRect(col, row, 1, 1);
        }
      }
    }

    this.bubbleCache.set(type, oc);
    return oc;
  }

  // -------------------------------------------------------------------------
  // Palette swap helpers
  // -------------------------------------------------------------------------

  private buildPaletteSwapMap(paletteIndex: number): void {
    const palette = PALETTES[paletteIndex];
    if (!palette) return;

    const map = new Map<string, string>();
    const { colors } = palette;

    // Primary colors
    map.set(TEMPLATE_COLORS.skinColor, colors.skinColor);
    map.set(TEMPLATE_COLORS.hairColor, colors.hairColor);
    map.set(TEMPLATE_COLORS.shirtColor, colors.shirtColor);
    map.set(TEMPLATE_COLORS.pantsColor, colors.pantsColor);
    map.set(TEMPLATE_COLORS.shoeColor, colors.shoeColor);

    // Derived shadow colors (darken by ~20%)
    map.set(TEMPLATE_COLORS.skinShadow, darken(colors.skinColor, 0.2));
    map.set(TEMPLATE_COLORS.shirtShadow, darken(colors.shirtColor, 0.2));
    map.set(TEMPLATE_COLORS.pantsShadow, darken(colors.pantsColor, 0.2));

    this.paletteSwapMaps.set(String(paletteIndex), map);
  }

  private frameCacheKey(
    palette: number,
    dir: string,
    frame: string,
  ): string {
    return `${palette}:${dir}:${frame}`;
  }

  private renderFrameToOffscreen(frame: SpriteFrame, paletteIndex: number): HTMLCanvasElement {
    const oc = document.createElement('canvas');
    oc.width = SPRITE_WIDTH * this.scale;
    oc.height = SPRITE_HEIGHT * this.scale;
    const octx = oc.getContext('2d')!;
    octx.imageSmoothingEnabled = false;

    const swapMap = this.paletteSwapMaps.get(String(paletteIndex));

    for (let row = 0; row < frame.length; row++) {
      const rowData = frame[row];
      for (let col = 0; col < rowData.length; col++) {
        const rawColor = rowData[col];
        if (!rawColor) continue;
        const color = swapMap?.get(rawColor) ?? rawColor;
        octx.fillStyle = color;
        octx.fillRect(col * this.scale, row * this.scale, this.scale, this.scale);
      }
    }

    return oc;
  }

  // -------------------------------------------------------------------------
  // Palette factory (for external use)
  // -------------------------------------------------------------------------

  /** Returns a CharacterPalette by index, wrapping if out of bounds. */
  static getPalette(index: number): CharacterPalette {
    return PALETTES[((index % PALETTES.length) + PALETTES.length) % PALETTES.length];
  }
}

// ---------------------------------------------------------------------------
// Inline matrix effect (avoids circular import with PixelMatrixEffect.ts)
// — calls the exported function from PixelMatrixEffect once imported
// ---------------------------------------------------------------------------

// We use a dynamic-style inline fallback here; the real renderMatrixEffect
// from PixelMatrixEffect.ts is re-exported separately and should be used
// by consumers who need the full effect.  This keeps the engine self-contained
// while still applying the effect correctly.

function renderMatrixEffectInline(
  ctx: CanvasRenderingContext2D,
  char: PixelCharacter,
  offscreen: HTMLCanvasElement,
  drawW: number,
  drawH: number,
  dx: number,
  dy: number,
): void {
  const { matrixEffect, matrixProgress, direction } = char;
  if (!matrixEffect) return;

  const COLS = 8;
  const colW = drawW / COLS;
  const MATRIX_GREEN = '#00ff41';
  const RAIN_CHARS = '0123456789ABCDEFｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺ';

  ctx.save();

  if (direction === 'left') {
    ctx.translate(dx + drawW, dy);
    ctx.scale(-1, 1);
    ctx.translate(-dx, -dy);
  }

  // Clip to character bounding box
  ctx.beginPath();
  ctx.rect(dx, dy, drawW, drawH);
  ctx.clip();

  if (matrixEffect === 'spawn') {
    // Phase 1: draw character under rain (character reveals as rain sweeps down)
    ctx.globalAlpha = Math.min(matrixProgress * 2, 1);
    ctx.drawImage(offscreen, dx, dy);
    ctx.globalAlpha = 1;

    // Rain columns sweep from top
    for (let col = 0; col < COLS; col++) {
      const seed = (col * 7 + 13) / 37;
      const colDelay = seed * 0.4;
      const colProgress = Math.max(0, (matrixProgress - colDelay) / (1 - colDelay));
      if (colProgress <= 0) continue;

      const sweepY = dy + colProgress * drawH;
      const cx = dx + col * colW;

      // Rain trail
      const trailLen = Math.min(colProgress * drawH, drawH * 0.3);
      for (let t = 0; t < 5; t++) {
        const ry = sweepY - t * (trailLen / 5);
        if (ry < dy || ry > dy + drawH) continue;
        const alpha = (1 - t / 5) * (1 - colProgress);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = MATRIX_GREEN;
        ctx.font = `${Math.round(colW * 0.8)}px monospace`;
        const ch = RAIN_CHARS[Math.floor((col * 3 + t * 7 + matrixProgress * 20) % RAIN_CHARS.length)];
        ctx.fillText(ch, cx + 1, ry);
      }
    }
    ctx.globalAlpha = 1;
  } else {
    // Despawn: rain consumes the character
    ctx.drawImage(offscreen, dx, dy);

    for (let col = 0; col < COLS; col++) {
      const seed = (col * 7 + 13) / 37;
      const colDelay = seed * 0.4;
      const colProgress = Math.max(0, (matrixProgress - colDelay) / (1 - colDelay));
      if (colProgress <= 0) continue;

      const sweepY = dy + colProgress * drawH;
      const cx = dx + col * colW;

      // Erase character pixels above the sweep line (already "consumed")
      ctx.clearRect(cx, dy, colW, sweepY - dy);

      // Rain head
      ctx.globalAlpha = 1;
      ctx.fillStyle = MATRIX_GREEN;
      ctx.font = `${Math.round(colW * 0.8)}px monospace`;
      const ch = RAIN_CHARS[Math.floor((col * 3 + matrixProgress * 20) % RAIN_CHARS.length)];
      ctx.fillText(ch, cx + 1, sweepY);

      // Fading trail
      for (let t = 1; t < 6; t++) {
        const ry = sweepY + t * (drawH * 0.06);
        if (ry > dy + drawH) break;
        ctx.globalAlpha = (1 - t / 6) * 0.8;
        const ch2 = RAIN_CHARS[Math.floor((col * 5 + t * 11 + matrixProgress * 30) % RAIN_CHARS.length)];
        ctx.fillText(ch2, cx + 1, ry);
      }
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function darken(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  if (isNaN(n)) return hex;
  const r = Math.max(0, ((n >> 16) & 0xff) * (1 - amount));
  const g = Math.max(0, ((n >> 8) & 0xff) * (1 - amount));
  const b = Math.max(0, (n & 0xff) * (1 - amount));
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}
