import type { KanbanColumnDef } from '../types';

export interface MatchCandidate {
  cardId: string;
  cardLabel: string;
  score: number;
  matchType: 'exact' | 'fuzzy' | 'partial';
}

// ── Levenshtein distance ──────────────────────────────────────────────────────

export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // dp[i][j] = edit distance between a[0..i-1] and b[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// ── Token overlap ─────────────────────────────────────────────────────────────

/**
 * Proportion of shared tokens relative to the union of both token sets (0–1).
 */
export function tokenOverlap(query: string, target: string): number {
  const tokenize = (s: string) =>
    s.toLowerCase().split(/[\s\-_/]+/).filter(Boolean);

  const qTokens = new Set(tokenize(query));
  const tTokens = new Set(tokenize(target));

  let shared = 0;
  for (const t of qTokens) {
    if (tTokens.has(t)) shared++;
  }

  const union = new Set([...qTokens, ...tTokens]).size;
  return union === 0 ? 0 : shared / union;
}

// ── Card matching ─────────────────────────────────────────────────────────────

/**
 * Find the top-N kanban cards that best match a voice query string.
 */
export function matchCardByVoice(
  query: string,
  cards: Array<{ node: { id: string; label: string } }>,
  topN = 3
): MatchCandidate[] {
  const normalizedQuery = query.trim().toLowerCase();

  const scored: MatchCandidate[] = cards.map(({ node }) => {
    const normalizedLabel = node.label.trim().toLowerCase();

    const maxLen = Math.max(normalizedQuery.length, normalizedLabel.length, 1);
    const levScore = 1 - levenshtein(normalizedQuery, normalizedLabel) / maxLen;
    const tokScore = tokenOverlap(normalizedQuery, normalizedLabel);

    let score = Math.max(levScore, tokScore);
    let matchType: MatchCandidate['matchType'] = 'fuzzy';

    // Exact substring bonus
    if (
      normalizedLabel.includes(normalizedQuery) ||
      normalizedQuery.includes(normalizedLabel)
    ) {
      score = Math.min(1, score + 0.3);
      matchType = normalizedLabel === normalizedQuery ? 'exact' : 'partial';
    }

    return {
      cardId: node.id,
      cardLabel: node.label,
      score,
      matchType,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topN);
}

// ── Column matching ───────────────────────────────────────────────────────────

/** Voice alias → column ID mapping (English + Thai) */
const COLUMN_VOICE_MAP: Record<string, string> = {
  // English aliases
  done: 'done',
  finished: 'done',
  complete: 'done',
  completed: 'done',
  testing: 'testing',
  test: 'testing',
  qa: 'testing',
  backlog: 'backlog',
  todo: 'backlog',
  develop: 'develop',
  development: 'develop',
  developing: 'develop',
  'in progress': 'develop',
  inprogress: 'develop',
  review: 'validate',
  validate: 'validate',
  validation: 'validate',
  hold: 'hold',
  blocked: 'hold',
  design: 'design',
  create: 'create',
  archive: 'archive',
  delete: 'delete',
  task: 'task',
  issue: 'issue',
  docs: 'update-docs',
  'update docs': 'update-docs',
  // Thai aliases
  เสร็จ: 'done',
  ทดสอบ: 'testing',
  พัฒนา: 'develop',
  รอ: 'hold',
  ตรวจสอบ: 'validate',
  ออกแบบ: 'design',
  สร้าง: 'create',
  เก็บถาวร: 'archive',
  งาน: 'task',
  ปัญหา: 'issue',
  เอกสาร: 'update-docs',
};

/**
 * Map a voice query to a column ID using the alias table.
 * Falls back to fuzzy-matching against column labels if no alias is found.
 * Returns null if no match is confident enough.
 */
export function matchColumnByVoice(
  query: string,
  columns: Array<Pick<KanbanColumnDef, 'id' | 'label'>>
): string | null {
  const normalized = query.trim().toLowerCase();

  // Direct alias lookup
  if (normalized in COLUMN_VOICE_MAP) {
    return COLUMN_VOICE_MAP[normalized] ?? null;
  }

  // Partial alias scan (e.g. "move to done" — query may include extra words)
  for (const [alias, colId] of Object.entries(COLUMN_VOICE_MAP)) {
    if (normalized.includes(alias)) return colId;
  }

  // Fuzzy fallback against actual column labels
  let bestScore = 0;
  let bestId: string | null = null;

  for (const col of columns) {
    const label = col.label.trim().toLowerCase();
    const maxLen = Math.max(normalized.length, label.length, 1);
    const score = 1 - levenshtein(normalized, label) / maxLen;
    if (score > bestScore) {
      bestScore = score;
      bestId = col.id;
    }
  }

  // Require at least 0.5 similarity to avoid false positives
  return bestScore >= 0.5 ? bestId : null;
}
