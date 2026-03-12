import type { IterationRecord, IterationScore } from '../types';
import { updateIteration } from '../stores/kanbanState';

// ── Iteration Tracking ──────────────────────────────────────────────────────

const HISTORY_KEY = 'kg-kanban-iteration-history';

function loadHistory(): Record<string, IterationRecord[]> {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
  } catch { return {}; }
}

function saveHistory(h: Record<string, IterationRecord[]>): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
}

/** Get iteration history for a card */
export function getIterationHistory(cardId: string): IterationRecord[] {
  return loadHistory()[cardId] || [];
}

/** Record a new iteration for a card */
export function recordIteration(
  cardId: string,
  command: string,
  scoreBefore: number,
  scoreAfter: number,
  changesSummary: string[],
  durationMs: number,
): IterationRecord {
  const history = loadHistory();
  const cardHistory = history[cardId] || [];
  const iterationNumber = cardHistory.length + 1;

  const record: IterationRecord = {
    iterationNumber,
    command,
    changesSummary,
    scoreBefore,
    scoreAfter,
    executedAt: Date.now(),
    durationMs,
  };

  history[cardId] = [...cardHistory, record];
  saveHistory(history);

  // Update the kanban state store
  updateIteration(cardId, {
    count: iterationNumber,
    score: scoreAfter,
    lastCommand: command,
    lastRunAt: Date.now(),
  });

  return record;
}

/** Get the latest score for a card */
export function getLatestScore(cardId: string): number {
  const history = getIterationHistory(cardId);
  if (history.length === 0) return 0;
  return history[history.length - 1].scoreAfter;
}

/** Get total iteration count for a card */
export function getIterationCount(cardId: string): number {
  return getIterationHistory(cardId).length;
}

/** Get commands used on a card (unique) */
export function getCommandsUsed(cardId: string): string[] {
  const history = getIterationHistory(cardId);
  return [...new Set(history.map(r => r.command))];
}

/** Check if score threshold suggests re-run is needed */
export function shouldRerun(cardId: string): { needed: boolean; reason: string } {
  const score = getLatestScore(cardId);
  if (score === 0) return { needed: true, reason: 'No iterations yet' };
  if (score < 3) return { needed: true, reason: `Score ${score}/5 — needs more work` };
  if (score < 4) return { needed: false, reason: `Score ${score}/5 — acceptable, optional re-run` };
  return { needed: false, reason: `Score ${score}/5 — good quality` };
}

/** Clear iteration history for a card */
export function clearIterationHistory(cardId: string): void {
  const history = loadHistory();
  delete history[cardId];
  saveHistory(history);
}
