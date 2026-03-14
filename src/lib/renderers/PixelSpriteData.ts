/**
 * PixelSpriteData — Pixel art character sprites for the agent rendering system.
 *
 * Characters are 16x24 pixels. Each row is an array of 16 hex color strings
 * (or '' for transparent). All 6 palettes share one template; palette swapping
 * replaces the four canonical colors at draw time.
 *
 * Sprite frames:
 *   walk1, walk2, walk3 (standing/idle), type1, type2, read1, read2
 * Directions: down, up, right  (left = mirror right horizontally at render time)
 *
 * Speech bubbles are 24x12 pixel sprites stored separately.
 */

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------

/** One row of a 16-pixel-wide sprite frame (empty string = transparent). */
export type SpriteRow = readonly string[];

/** A complete sprite frame: 24 rows × 16 columns. */
export type SpriteFrame = readonly SpriteRow[];

/** All animation frames for one facing direction. */
export interface DirectionFrames {
  readonly walk1: SpriteFrame;
  readonly walk2: SpriteFrame;
  readonly walk3: SpriteFrame; // standing / idle
  readonly type1: SpriteFrame;
  readonly type2: SpriteFrame;
  readonly read1: SpriteFrame;
  readonly read2: SpriteFrame;
}

/** All directions for a character template. */
export interface CharacterTemplate {
  readonly down: DirectionFrames;
  readonly up: DirectionFrames;
  readonly right: DirectionFrames;
  // left is derived by mirroring right at render time
}

/** The four canonical template colors that get swapped per palette. */
export interface PaletteColors {
  readonly skinColor: string;
  readonly hairColor: string;
  readonly shirtColor: string;
  readonly pantsColor: string;
  readonly shoeColor: string;
}

/** A named character palette (skin tone + outfit). */
export interface CharacterPalette {
  readonly name: string;
  readonly colors: PaletteColors;
}

/** Speech bubble variant identifiers. */
export const BubbleType = {
  permission: 'permission',
  done: 'done',
  error: 'error',
  blocked: 'blocked',
  voice: 'voice',
} as const;
export type BubbleType = (typeof BubbleType)[keyof typeof BubbleType];

/** A speech bubble sprite: 24 wide × 12 tall. */
export type BubbleSpriteFrame = readonly SpriteRow[];

// ---------------------------------------------------------------------------
// Template color constants (used in the pixel data below)
// These get swapped at render time using PaletteColors.
// ---------------------------------------------------------------------------

const SK = '#F4C18F'; // skin (template)
const HR = '#3B2314'; // hair (template)
const SH = '#4A90D9'; // shirt (template)
const PA = '#2C3E6B'; // pants (template)
const SO = '#1A1A2E'; // shoes (template)
const __ = '';        // transparent

// Shared accent colors (not swapped)
const EY = '#1A1A2E'; // eyes
const MO = '#C97B5A'; // mouth
const SK2 = '#E8A870'; // skin shadow
const SH2 = '#3570B0'; // shirt shadow
const PA2 = '#1E2D52'; // pants shadow
const WH = '#FFFFFF'; // white (shirt detail / eyes)

// ---------------------------------------------------------------------------
// Helper to build a 16×24 frame
// ---------------------------------------------------------------------------

/** Pad/trim a row to exactly 16 entries. */
function row16(...cells: string[]): SpriteRow {
  const r = cells.slice(0, 16);
  while (r.length < 16) r.push('');
  return r as unknown as SpriteRow;
}

// ---------------------------------------------------------------------------
// Character template — DOWN direction
// ---------------------------------------------------------------------------
// Layout (24 rows):
//   rows  0-3   : hair / head top
//   rows  4-7   : face
//   rows  8-15  : body / shirt
//   rows 16-19  : legs / pants
//   rows 20-23  : feet / shoes

function makeHeadDown(): SpriteRow[] {
  return [
    // row 0 — hair top
    row16(__, __, __, __, __, HR, HR, HR, HR, HR, HR, __, __, __, __, __),
    // row 1 — hair
    row16(__, __, __, __, HR, HR, HR, HR, HR, HR, HR, HR, __, __, __, __),
    // row 2 — hair + skin top
    row16(__, __, __, HR, HR, SK, SK, SK, SK, SK, SK, HR, HR, __, __, __),
    // row 3 — hair + skin
    row16(__, __, __, HR, SK, SK, SK, SK, SK, SK, SK, SK, HR, __, __, __),
    // row 4 — face top (eyes)
    row16(__, __, __, SK, SK, EY, SK, SK, SK, SK, EY, SK, SK, __, __, __),
    // row 5 — face mid
    row16(__, __, __, SK, SK, SK, SK, SK, SK, SK, SK, SK, SK, __, __, __),
    // row 6 — face mouth
    row16(__, __, __, SK2, SK, SK, MO, SK, SK, MO, SK, SK, SK2, __, __, __),
    // row 7 — chin
    row16(__, __, __, __, SK2, SK, SK, SK, SK, SK, SK, SK2, __, __, __, __),
  ];
}

function makeBodyDown(armLeft: boolean, armRight: boolean): SpriteRow[] {
  // armLeft/armRight: true = arm raised (typing pose)
  const armL = armLeft ? SH2 : SH;
  const armR = armRight ? SH2 : SH;
  return [
    // row 8 — shoulders
    row16(__, __, armL, SH, SH, SH, SH, SH, SH, SH, SH, SH, armR, __, __, __),
    // row 9 — upper body
    row16(__, __, armL, SH, SH, WH, SH, SH, SH, WH, SH, SH, armR, __, __, __),
    // row 10 — body
    row16(__, __, SH, SH, SH, SH, SH, SH, SH, SH, SH, SH, SH, __, __, __),
    // row 11 — body lower
    row16(__, __, SH, SH, SH2, SH, SH, SH, SH, SH, SH2, SH, SH, __, __, __),
    // row 12 — waist
    row16(__, __, SH, SH, PA, PA, PA, PA, PA, PA, PA, PA, SH, __, __, __),
    // row 13 — belt
    row16(__, __, __, PA, PA, PA, PA, PA, PA, PA, PA, PA, __, __, __, __),
    // row 14 — upper legs
    row16(__, __, __, PA, PA, PA, PA2, PA, PA, PA2, PA, PA, __, __, __, __),
    // row 15 — legs
    row16(__, __, __, PA, PA, PA, PA2, PA, PA, PA2, PA, PA, __, __, __, __),
  ];
}

function makeLegsDown(step: 'neutral' | 'left' | 'right'): SpriteRow[] {
  if (step === 'neutral') {
    return [
      row16(__, __, __, __, PA, PA, PA, __, __, PA, PA, PA, __, __, __, __),
      row16(__, __, __, __, PA, PA2, PA, __, __, PA, PA2, PA, __, __, __, __),
      row16(__, __, __, __, SO, SO, PA, __, __, PA, SO, SO, __, __, __, __),
      row16(__, __, __, __, SO, SO, __, __, __, __, SO, SO, __, __, __, __),
    ];
  }
  if (step === 'left') {
    return [
      row16(__, __, __, __, PA, PA, __, __, __, __, PA, PA, __, __, __, __),
      row16(__, __, __, PA2, PA, PA, __, __, __, PA2, PA, PA, __, __, __, __),
      row16(__, __, __, SO, SO, __, __, __, __, __, PA, PA2, __, __, __, __),
      row16(__, __, __, SO, __, __, __, __, __, __, SO, SO, __, __, __, __),
    ];
  }
  // right
  return [
    row16(__, __, __, __, PA, PA, __, __, __, __, PA, PA, __, __, __, __),
    row16(__, __, __, __, PA, PA, PA2, __, __, __, PA, PA, __, __, __, __),
    row16(__, __, __, PA2, PA, __, __, __, __, __, __, SO, SO, __, __, __),
    row16(__, __, __, SO, SO, __, __, __, __, __, __, __, SO, __, __, __),
  ];
}

function assembleFrame(
  head: SpriteRow[],
  body: SpriteRow[],
  legs: SpriteRow[],
): SpriteFrame {
  return [...head, ...body, ...legs] as unknown as SpriteFrame;
}

const downWalk1 = assembleFrame(
  makeHeadDown(),
  makeBodyDown(false, false),
  makeLegsDown('left'),
);
const downWalk2 = assembleFrame(
  makeHeadDown(),
  makeBodyDown(false, false),
  makeLegsDown('right'),
);
const downWalk3 = assembleFrame(
  makeHeadDown(),
  makeBodyDown(false, false),
  makeLegsDown('neutral'),
);
const downType1 = assembleFrame(
  makeHeadDown(),
  makeBodyDown(true, false),
  makeLegsDown('neutral'),
);
const downType2 = assembleFrame(
  makeHeadDown(),
  makeBodyDown(false, true),
  makeLegsDown('neutral'),
);

// Read frames — head tilted slightly (same structure, face rows adjusted)
function makeHeadDownRead(tilt: 'left' | 'right'): SpriteRow[] {
  const base = makeHeadDown();
  // shift eyes/mouth by 1 pixel in tilt direction to suggest looking down at book
  if (tilt === 'left') {
    const f = base.map((r) => [...r] as string[]);
    f[4] = row16(__, __, __, SK, SK, SK, EY, SK, SK, SK, SK, EY, SK, __, __, __) as unknown as string[];
    f[6] = row16(__, __, __, SK2, SK, SK, SK, MO, SK, SK, SK, SK, SK2, __, __, __) as unknown as string[];
    return f as unknown as SpriteRow[];
  }
  const f = base.map((r) => [...r] as string[]);
  f[4] = row16(__, __, __, SK, EY, SK, SK, SK, SK, EY, SK, SK, SK, __, __, __) as unknown as string[];
  f[6] = row16(__, __, __, SK2, SK, SK, SK, SK, MO, SK, SK, SK, SK2, __, __, __) as unknown as string[];
  return f as unknown as SpriteRow[];
}

const downRead1 = assembleFrame(
  makeHeadDownRead('left'),
  makeBodyDown(false, false),
  makeLegsDown('neutral'),
);
const downRead2 = assembleFrame(
  makeHeadDownRead('right'),
  makeBodyDown(false, false),
  makeLegsDown('neutral'),
);

// ---------------------------------------------------------------------------
// UP direction — back of character
// ---------------------------------------------------------------------------

function makeHeadUp(): SpriteRow[] {
  return [
    row16(__, __, __, __, __, HR, HR, HR, HR, HR, HR, __, __, __, __, __),
    row16(__, __, __, __, HR, HR, HR, HR, HR, HR, HR, HR, __, __, __, __),
    row16(__, __, __, HR, HR, HR, HR, HR, HR, HR, HR, HR, HR, __, __, __),
    row16(__, __, __, HR, SK, SK, SK, SK, SK, SK, SK, SK, HR, __, __, __),
    row16(__, __, __, SK, SK, SK, SK, SK, SK, SK, SK, SK, SK, __, __, __),
    row16(__, __, __, SK, SK, SK, SK, SK, SK, SK, SK, SK, SK, __, __, __),
    row16(__, __, __, SK2, SK, SK, SK, SK, SK, SK, SK, SK, SK2, __, __, __),
    row16(__, __, __, __, SK2, SK, SK, SK, SK, SK, SK, SK2, __, __, __, __),
  ];
}

const upWalk1 = assembleFrame(makeHeadUp(), makeBodyDown(false, false), makeLegsDown('left'));
const upWalk2 = assembleFrame(makeHeadUp(), makeBodyDown(false, false), makeLegsDown('right'));
const upWalk3 = assembleFrame(makeHeadUp(), makeBodyDown(false, false), makeLegsDown('neutral'));
const upType1 = assembleFrame(makeHeadUp(), makeBodyDown(true, false), makeLegsDown('neutral'));
const upType2 = assembleFrame(makeHeadUp(), makeBodyDown(false, true), makeLegsDown('neutral'));
const upRead1 = upWalk3;
const upRead2 = upWalk3;

// ---------------------------------------------------------------------------
// RIGHT direction — side profile
// ---------------------------------------------------------------------------

function makeHeadRight(): SpriteRow[] {
  return [
    // row 0
    row16(__, __, __, __, __, HR, HR, HR, HR, HR, __, __, __, __, __, __),
    // row 1
    row16(__, __, __, __, HR, HR, HR, HR, HR, HR, HR, __, __, __, __, __),
    // row 2
    row16(__, __, __, HR, HR, SK, SK, SK, SK, SK, HR, __, __, __, __, __),
    // row 3
    row16(__, __, __, HR, SK, SK, SK, SK, SK, SK, HR, __, __, __, __, __),
    // row 4 — eye on right side of face (profile: one eye visible)
    row16(__, __, __, SK, SK, SK, SK, EY, SK, SK, __, __, __, __, __, __),
    // row 5
    row16(__, __, __, SK, SK, SK, SK, SK, SK, SK, __, __, __, __, __, __),
    // row 6 — mouth visible on right
    row16(__, __, __, SK2, SK, SK, SK, SK, MO, SK2, __, __, __, __, __, __),
    // row 7 — chin pointing right
    row16(__, __, __, __, SK2, SK, SK, SK2, __, __, __, __, __, __, __, __),
  ];
}

function makeBodyRight(armForward: boolean): SpriteRow[] {
  const armF = armForward ? SH2 : SH;
  return [
    row16(__, __, __, SH, SH, SH, SH, SH, SH, SH, __, __, __, __, __, __),
    row16(__, __, armF, SH, SH, WH, SH, SH, SH, SH, __, __, __, __, __, __),
    row16(__, __, SH, SH, SH, SH, SH, SH, SH, SH, __, __, __, __, __, __),
    row16(__, __, SH2, SH, SH, SH2, SH, SH, SH, SH, __, __, __, __, __, __),
    row16(__, __, __, PA, PA, PA, PA, PA, PA, __, __, __, __, __, __, __),
    row16(__, __, __, PA, PA, PA, PA, PA, __, __, __, __, __, __, __, __),
    row16(__, __, __, PA, PA2, PA, PA, PA, __, __, __, __, __, __, __, __),
    row16(__, __, __, PA, PA2, PA, PA, __, __, __, __, __, __, __, __, __),
  ];
}

function makeLegsRight(step: 'neutral' | 'left' | 'right'): SpriteRow[] {
  if (step === 'neutral') {
    return [
      row16(__, __, __, PA, PA, PA, PA, __, __, __, __, __, __, __, __, __),
      row16(__, __, __, PA2, PA, PA, PA, __, __, __, __, __, __, __, __, __),
      row16(__, __, __, SO, SO, PA, __, __, __, __, __, __, __, __, __, __),
      row16(__, __, __, SO, SO, __, __, __, __, __, __, __, __, __, __, __),
    ];
  }
  if (step === 'left') {
    return [
      row16(__, __, PA, PA, PA, __, __, PA, PA, __, __, __, __, __, __, __),
      row16(__, __, PA2, PA, __, __, __, PA2, PA, __, __, __, __, __, __, __),
      row16(__, __, SO, SO, __, __, __, __, PA, PA, __, __, __, __, __, __),
      row16(__, __, SO, __, __, __, __, __, SO, SO, __, __, __, __, __, __),
    ];
  }
  return [
    row16(__, __, __, PA, PA, PA, __, PA, PA, __, __, __, __, __, __, __),
    row16(__, __, __, PA, PA2, PA, __, PA2, PA, __, __, __, __, __, __, __),
    row16(__, __, __, __, PA, SO, SO, SO, __, __, __, __, __, __, __, __),
    row16(__, __, __, __, __, SO, SO, __, __, __, __, __, __, __, __, __),
  ];
}

const rightWalk1 = assembleFrame(makeHeadRight(), makeBodyRight(false), makeLegsRight('left'));
const rightWalk2 = assembleFrame(makeHeadRight(), makeBodyRight(false), makeLegsRight('right'));
const rightWalk3 = assembleFrame(makeHeadRight(), makeBodyRight(false), makeLegsRight('neutral'));
const rightType1 = assembleFrame(makeHeadRight(), makeBodyRight(true), makeLegsRight('neutral'));
const rightType2 = assembleFrame(makeHeadRight(), makeBodyRight(false), makeLegsRight('neutral'));
const rightRead1 = assembleFrame(makeHeadRight(), makeBodyRight(true), makeLegsRight('neutral'));
const rightRead2 = assembleFrame(makeHeadRight(), makeBodyRight(false), makeLegsRight('neutral'));

// ---------------------------------------------------------------------------
// Assembled character template
// ---------------------------------------------------------------------------

export const CHARACTER_TEMPLATE: CharacterTemplate = {
  down: {
    walk1: downWalk1,
    walk2: downWalk2,
    walk3: downWalk3,
    type1: downType1,
    type2: downType2,
    read1: downRead1,
    read2: downRead2,
  },
  up: {
    walk1: upWalk1,
    walk2: upWalk2,
    walk3: upWalk3,
    type1: upType1,
    type2: upType2,
    read1: upRead1,
    read2: upRead2,
  },
  right: {
    walk1: rightWalk1,
    walk2: rightWalk2,
    walk3: rightWalk3,
    type1: rightType1,
    type2: rightType2,
    read1: rightRead1,
    read2: rightRead2,
  },
};

// ---------------------------------------------------------------------------
// Template canonical colors (order matters — must match PaletteColors)
// ---------------------------------------------------------------------------

export const TEMPLATE_COLORS = {
  skinColor: SK,
  skinShadow: SK2,
  hairColor: HR,
  shirtColor: SH,
  shirtShadow: SH2,
  pantsColor: PA,
  pantsShadow: PA2,
  shoeColor: SO,
} as const;

// ---------------------------------------------------------------------------
// 6 character palettes — diverse skin tones + distinct outfits
// ---------------------------------------------------------------------------

export const PALETTES: readonly CharacterPalette[] = [
  {
    name: 'azure',
    colors: {
      skinColor: '#F4C18F',
      hairColor: '#3B2314',
      shirtColor: '#4A90D9',
      pantsColor: '#2C3E6B',
      shoeColor: '#1A1A2E',
    },
  },
  {
    name: 'ember',
    colors: {
      skinColor: '#C68642',
      hairColor: '#1A0A00',
      shirtColor: '#D94A3A',
      pantsColor: '#4A2C1A',
      shoeColor: '#1A0A00',
    },
  },
  {
    name: 'sage',
    colors: {
      skinColor: '#E8B89A',
      hairColor: '#704214',
      shirtColor: '#4AA068',
      pantsColor: '#2C4A38',
      shoeColor: '#1A2814',
    },
  },
  {
    name: 'violet',
    colors: {
      skinColor: '#8D5524',
      hairColor: '#0A0000',
      shirtColor: '#7B4ABA',
      pantsColor: '#2E1A52',
      shoeColor: '#0A0010',
    },
  },
  {
    name: 'gold',
    colors: {
      skinColor: '#FDDBB4',
      hairColor: '#C8A020',
      shirtColor: '#D4A020',
      pantsColor: '#5A4010',
      shoeColor: '#2A1A00',
    },
  },
  {
    name: 'slate',
    colors: {
      skinColor: '#DBAА88',
      hairColor: '#AAAAAA',
      shirtColor: '#607080',
      pantsColor: '#303840',
      shoeColor: '#101418',
    },
  },
] as const;

// ---------------------------------------------------------------------------
// Speech bubble sprites (24w × 12h)
// ---------------------------------------------------------------------------

const BB = '#1A1A1A'; // bubble border
const BG = '#F5F0E8'; // bubble background

function brow(...cells: string[]): SpriteRow {
  const r = cells.slice(0, 24);
  while (r.length < 24) r.push('');
  return r as unknown as SpriteRow;
}

/** Amber "..." — permission request */
const BUBBLE_PERMISSION: BubbleSpriteFrame = [
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, '#F5A623', '#F5A623', BG, BG, BG, BG, BG, BG, '#F5A623', '#F5A623', BG, BG, BG, BG, BG, BG, '#F5A623', '#F5A623', BG, BG, BB),
  brow(BB, BG, BG, '#F5A623', '#F5A623', BG, BG, BG, BG, BG, BG, '#F5A623', '#F5A623', BG, BG, BG, BG, BG, BG, '#F5A623', '#F5A623', BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(__, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, __, BB, __, __, __, __, __, __, __, __, __, __, __),
];

/** Green "✓" — done */
const GR = '#27AE60';
const BUBBLE_DONE: BubbleSpriteFrame = [
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, GR, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, GR, GR, BG, BB),
  brow(BB, BG, GR, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, GR, GR, BG, BG, BB),
  brow(BB, BG, GR, GR, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, GR, GR, BG, BG, BG, BB),
  brow(BB, BG, BG, GR, GR, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, GR, GR, BG, BG, BG, BG, BB),
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(__, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, __, BB, __, __, __, __, __, __, __, __, __, __, __),
];

/** Red "✗" — error */
const RD = '#E74C3C';
const BUBBLE_ERROR: BubbleSpriteFrame = [
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, RD, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, RD, BG, BB),
  brow(BB, BG, BG, RD, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, RD, BG, BG, BB),
  brow(BB, BG, BG, BG, RD, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, RD, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, RD, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, RD, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, RD, BG, RD, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, RD, BG, RD, BG, BG, BG, BB),
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(__, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, __, BB, __, __, __, __, __, __, __, __, __, __, __),
];

/** Yellow "⏳" — blocked */
const YL = '#F1C40F';
const BUBBLE_BLOCKED: BubbleSpriteFrame = [
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, YL, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, YL, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, YL, YL, YL, YL, YL, YL, YL, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, YL, YL, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, YL, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, YL, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, BG, BG, BG, BB),
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(__, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, __, BB, __, __, __, __, __, __, __, __, __, __, __),
];

/** Blue "🎤" — voice/speaking */
const BL = '#3498DB';
const BUBBLE_VOICE: BubbleSpriteFrame = [
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BL, BL, BL, BL, BL, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BL, BG, BG, BG, BG, BG, BL, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BL, BG, BG, BG, BG, BG, BL, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BL, BG, BG, BG, BG, BG, BL, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BL, BL, BL, BL, BL, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(BB, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BL, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BG, BB),
  brow(__, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, BB, __),
  brow(__, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, BB, BB, __, __, __, __, __, __, __, __, __, __, __),
  brow(__, __, __, __, __, __, __, __, __, __, __, __, BB, __, __, __, __, __, __, __, __, __, __, __),
];

export const BUBBLE_SPRITES: Record<BubbleType, BubbleSpriteFrame> = {
  permission: BUBBLE_PERMISSION,
  done: BUBBLE_DONE,
  error: BUBBLE_ERROR,
  blocked: BUBBLE_BLOCKED,
  voice: BUBBLE_VOICE,
};

// ---------------------------------------------------------------------------
// Sprite dimensions
// ---------------------------------------------------------------------------

export const SPRITE_WIDTH = 16;
export const SPRITE_HEIGHT = 24;
export const BUBBLE_WIDTH = 24;
export const BUBBLE_HEIGHT = 12;
export const RENDER_SCALE = 2;
