// Voice command intent parser — English + Thai patterns

export type VoiceAction =
  | 'run_command'
  | 'move_card'
  | 'pause_agent'
  | 'resume_agent'
  | 'create_card'
  | 'select_card';

export interface VoiceIntent {
  action: VoiceAction;
  command?: string;
  cardQuery?: string;
  targetColumn?: string;
  confidence: number;
}

interface IntentPattern {
  /** Regex to test against the normalized transcript. Named groups: card, column, target. */
  pattern: RegExp;
  action: VoiceAction;
  /** Base confidence (0–1); higher = more specific pattern. */
  confidence: number;
  /** Extract intent fields from match groups. */
  extract: (match: RegExpMatchArray) => Partial<VoiceIntent>;
}

// Normalize a command name to include "/" prefix
function normalizeCommand(name: string): string {
  const n = name.trim().toLowerCase();
  return n.startsWith('/') ? n : `/${n}`;
}

// Known slash commands for run_command action
const KNOWN_COMMANDS = new Set([
  'implement', 'review', 'test', 'deploy', 'chore', 'feature',
  'breakdown', 'estimate', 'issue', 'security', 'validate', 'docs', 'discussion',
  // Thai aliases resolved externally
]);

const INTENT_PATTERNS: IntentPattern[] = [
  // ── English: move ─────────────────────────────────────────────────────────
  {
    pattern: /\bmove\s+(?<card>.+?)\s+to\s+(?<column>.+)/i,
    action: 'move_card',
    confidence: 0.9,
    extract: (m) => ({
      cardQuery: m.groups?.['card']?.trim(),
      targetColumn: m.groups?.['column']?.trim(),
    }),
  },
  // ── English: run_command (explicit command words) ──────────────────────────
  {
    pattern: /\b(?<cmd>implement|deploy|review|test|chore|feature|breakdown|estimate|security|validate|docs|discussion)\s+(?<card>.+)/i,
    action: 'run_command',
    confidence: 0.85,
    extract: (m) => ({
      command: normalizeCommand(m.groups?.['cmd'] ?? ''),
      cardQuery: m.groups?.['card']?.trim(),
    }),
  },
  // ── English: pause ────────────────────────────────────────────────────────
  {
    pattern: /\bpause\s+(?<card>.+)/i,
    action: 'pause_agent',
    confidence: 0.85,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },
  // ── English: resume ───────────────────────────────────────────────────────
  {
    pattern: /\bresume\s+(?<card>.+)/i,
    action: 'resume_agent',
    confidence: 0.85,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },
  // ── English: create card ──────────────────────────────────────────────────
  {
    pattern: /\bcreate\s+card\s+(?<card>.+)/i,
    action: 'create_card',
    confidence: 0.9,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },
  // ── English: select ───────────────────────────────────────────────────────
  {
    pattern: /\bselect\s+(?<card>.+)/i,
    action: 'select_card',
    confidence: 0.8,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },

  // ── Thai: สั่ง implement X ────────────────────────────────────────────────
  {
    pattern: /สั่ง\s+(?<cmd>implement|review|test|deploy|chore|feature|breakdown|estimate|issue|security|validate|docs|discussion)\s+(?<card>.+)/,
    action: 'run_command',
    confidence: 0.9,
    extract: (m) => ({
      command: normalizeCommand(m.groups?.['cmd'] ?? ''),
      cardQuery: m.groups?.['card']?.trim(),
    }),
  },
  // ── Thai: รีวิว X ──────────────────────────────────────────────────────────
  {
    pattern: /รีวิว\s+(?<card>.+)/,
    action: 'run_command',
    confidence: 0.85,
    extract: (m) => ({
      command: '/review',
      cardQuery: m.groups?.['card']?.trim(),
    }),
  },
  // ── Thai: ย้าย X ไป Y ─────────────────────────────────────────────────────
  {
    pattern: /ย้าย\s+(?<card>.+?)\s+ไป\s+(?<column>.+)/,
    action: 'move_card',
    confidence: 0.9,
    extract: (m) => ({
      cardQuery: m.groups?.['card']?.trim(),
      targetColumn: m.groups?.['column']?.trim(),
    }),
  },
  // ── Thai: หยุด X ──────────────────────────────────────────────────────────
  {
    pattern: /หยุด\s+(?<card>.+)/,
    action: 'pause_agent',
    confidence: 0.85,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },
  // ── Thai: ทำต่อ X ─────────────────────────────────────────────────────────
  {
    pattern: /ทำต่อ\s+(?<card>.+)/,
    action: 'resume_agent',
    confidence: 0.85,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },
  // ── Thai: สร้าง card X ────────────────────────────────────────────────────
  {
    pattern: /สร้าง\s+card\s+(?<card>.+)/,
    action: 'create_card',
    confidence: 0.9,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },
  // ── Thai: เลือก X ─────────────────────────────────────────────────────────
  {
    pattern: /เลือก\s+(?<card>.+)/,
    action: 'select_card',
    confidence: 0.8,
    extract: (m) => ({ cardQuery: m.groups?.['card']?.trim() }),
  },
];

/**
 * Parse a raw transcript string into a structured VoiceIntent.
 * Returns null if no pattern matches.
 */
export function parseVoiceIntent(transcript: string): VoiceIntent | null {
  const normalized = transcript.trim().toLowerCase();

  for (const { pattern, action, confidence, extract } of INTENT_PATTERNS) {
    // Test against lowercase for English; also try original for Thai (unicode)
    const match = normalized.match(pattern) ?? transcript.trim().match(pattern);
    if (!match) continue;

    const fields = extract(match);
    return {
      action,
      confidence,
      ...fields,
    };
  }

  return null;
}

export { INTENT_PATTERNS, KNOWN_COMMANDS };
