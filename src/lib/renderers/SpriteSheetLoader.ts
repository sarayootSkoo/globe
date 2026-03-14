/**
 * SpriteSheetLoader — Loads RPG-style character sprite sheets.
 *
 * Each sheet is 800×450 with a 5×2 grid (5 poses × 2 characters):
 *   Col 0: front  |  Col 1: 3/4 front-left  |  Col 2: side-left
 *   Col 3: 3/4 back-left  |  Col 4: back
 *   Row 0: Male variant  |  Row 1: Female variant
 *
 * Mapping to engine directions:
 *   front (col 0)   → down
 *   side (col 2)    → right  (left = flip horizontally)
 *   back (col 4)    → up
 *   3/4 front (col 1) → down (walk variant)
 *   3/4 back (col 3)  → up (walk variant)
 */

// ── Constants ──────────────────────────────────────────────────────────────

export const SHEET_COLS = 5;
export const SHEET_ROWS = 2;
export const CELL_W = 160;
export const CELL_H = 225;

// Trim whitespace — actual character is roughly centered, ~100×180px within 160×225
// We'll use full cells and let the engine handle positioning
export const CHAR_RENDER_W = 80;   // display width on canvas
export const CHAR_RENDER_H = 112;  // display height on canvas

// ── Sprite Sheet Sources ───────────────────────────────────────────────────

export const SPRITE_SHEETS = [
  { id: 'red',    file: 'g5gBnEX.jpg' },   // Red cape — blonde male, pink female
  { id: 'white',  file: '3q8Rrg7.jpg' },   // White cape — brown male, blonde female
  { id: 'purple', file: '47iTcVS.jpg' },    // Purple cape — gray male, white female
] as const;

// Character index mapping: 0–5
// Sheet 0 row 0, Sheet 0 row 1, Sheet 1 row 0, Sheet 1 row 1, Sheet 2 row 0, Sheet 2 row 1
export const CHARACTER_COUNT = SPRITE_SHEETS.length * SHEET_ROWS; // 6

// ── Direction Mapping ──────────────────────────────────────────────────────
// For each engine direction, which sprite sheet columns to use for animation

export interface FrameSource {
  col: number;
  row: number;    // 0 = male, 1 = female (within sheet)
  flipX: boolean;
}

// Map engine directions → sheet columns
// Columns: 0=front, 1=3/4front, 2=side, 3=3/4back, 4=back
// Animation uses all 5 poses for smooth movement
// All 5 poses: 0=front, 1=3/4front, 2=side, 3=3/4back, 4=back
// Idle = front-facing (col 0) always. Active states shuffle through poses.
const DIR_MAP = {
  down:  { idle: [0], walk: [0, 1, 2, 3, 4], type: [0, 1, 2, 1], read: [0, 1, 2, 3] },
  up:    { idle: [0], walk: [4, 3, 2, 1, 0], type: [4, 3, 2, 3], read: [4, 3, 2, 1] },
  right: { idle: [0], walk: [2, 1, 0, 1, 2], type: [2, 1, 0, 1], read: [2, 3, 4, 3] },
  left:  { idle: [0], walk: [2, 3, 4, 3, 2], type: [2, 1, 0, 1], read: [2, 3, 4, 3] },
} as const;

export type EngineDirection = 'down' | 'up' | 'right' | 'left';
export type EngineState = 'idle' | 'walk' | 'type' | 'read';

// ── Loaded Sprite Data ─────────────────────────────────────────────────────

export interface LoadedCharacter {
  /** Index 0–5 */
  index: number;
  /** Source canvas (full sheet, white bg removed) */
  image: HTMLCanvasElement;
  /** Row within the sheet (0 or 1) */
  sheetRow: number;
}

let loadedSheets: HTMLCanvasElement[] = [];
let loadPromise: Promise<void> | null = null;

/**
 * Remove white/near-white background from a loaded image.
 * Returns an offscreen canvas with transparent background.
 */
function removeWhiteBackground(img: HTMLImageElement): HTMLCanvasElement {
  const oc = document.createElement('canvas');
  oc.width = img.width;
  oc.height = img.height;
  const ctx = oc.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, oc.width, oc.height);
  const data = imageData.data;

  // Make white/near-white pixels transparent
  const threshold = 230; // r,g,b all above this → transparent
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > threshold && data[i + 1] > threshold && data[i + 2] > threshold) {
      data[i + 3] = 0; // set alpha to 0
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return oc;
}

/**
 * Async wrapper around removeWhiteBackground that yields to the browser
 * before the pixel-processing work so it doesn't block initial render.
 */
async function removeWhiteBackgroundAsync(img: HTMLImageElement): Promise<HTMLCanvasElement> {
  // Yield to browser before heavy pixel work (~1M pixels per sheet)
  await new Promise<void>(r => setTimeout(r, 0));
  return removeWhiteBackground(img);
}

/**
 * Load all sprite sheet images. Call once at startup.
 * Returns a promise that resolves when all images are loaded.
 * JPG white backgrounds are automatically removed (non-blocking per sheet).
 */
export function loadSpriteSheets(basePath = '/assets/characters'): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = Promise.all(
    SPRITE_SHEETS.map((sheet) => {
      return new Promise<HTMLCanvasElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => { void removeWhiteBackgroundAsync(img).then(resolve); };
        img.onerror = () => reject(new Error(`Failed to load sprite sheet: ${sheet.file}`));
        img.src = `${basePath}/${sheet.file}`;
      });
    })
  ).then((canvases) => {
    loadedSheets = canvases;
  });

  return loadPromise;
}

/** Check if sprite sheets are loaded. */
export function areSheetsLoaded(): boolean {
  return loadedSheets.length === SPRITE_SHEETS.length;
}

/**
 * Get the loaded character data for a palette index (0–5).
 */
export function getCharacter(paletteIndex: number): LoadedCharacter | null {
  if (!areSheetsLoaded()) return null;
  const clamped = Math.abs(paletteIndex) % CHARACTER_COUNT;
  const sheetIdx = Math.floor(clamped / SHEET_ROWS);
  const sheetRow = clamped % SHEET_ROWS;
  return {
    index: clamped,
    image: loadedSheets[sheetIdx],
    sheetRow,
  };
}

/**
 * Get the source rectangle in the sprite sheet for a given direction/state/frame.
 */
export function getFrameRect(
  character: LoadedCharacter,
  direction: EngineDirection,
  state: EngineState,
  frameIndex: number,
): { sx: number; sy: number; sw: number; sh: number; flipX: boolean } {
  const dirMap = DIR_MAP[direction];
  const flipX = direction === 'left';

  const frames = dirMap[state];
  const col = frames[frameIndex % frames.length];

  return {
    sx: col * CELL_W,
    sy: character.sheetRow * CELL_H,
    sw: CELL_W,
    sh: CELL_H,
    flipX,
  };
}

/**
 * Draw a character frame onto a canvas context.
 */
export function drawCharacterFrame(
  ctx: CanvasRenderingContext2D,
  character: LoadedCharacter,
  direction: EngineDirection,
  state: EngineState,
  frameIndex: number,
  destX: number,
  destY: number,
  destW: number,
  destH: number,
): void {
  const rect = getFrameRect(character, direction, state, frameIndex);

  ctx.save();

  if (rect.flipX) {
    ctx.translate(destX + destW, destY);
    ctx.scale(-1, 1);
    ctx.drawImage(
      character.image,
      rect.sx, rect.sy, rect.sw, rect.sh,
      0, 0, destW, destH,
    );
  } else {
    ctx.drawImage(
      character.image,
      rect.sx, rect.sy, rect.sw, rect.sh,
      destX, destY, destW, destH,
    );
  }

  ctx.restore();
}
