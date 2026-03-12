import type { IterationScore } from '../types';

// ── Score Thresholds ────────────────────────────────────────────────────────
export const SCORE_THRESHOLDS = {
  NEEDS_WORK: 2,     // ต้อง re-run อีก — ยังขาดเยอะ
  ACCEPTABLE: 3,     // พอใช้ได้ — แต่ยัง improve ได้
  GOOD: 4,           // ดี — re-run ถ้ามี specific goal
  EXCELLENT: 5,      // สมบูรณ์ — ไม่จำเป็นต้อง re-run
} as const;

// ── Score Labels ────────────────────────────────────────────────────────────
export function getScoreLabel(score: number): string {
  if (score >= 4.5) return 'Excellent';
  if (score >= 3.5) return 'Good';
  if (score >= 2.5) return 'Acceptable';
  if (score >= 1.5) return 'Needs Work';
  return 'Incomplete';
}

export function getScoreColor(score: number): string {
  if (score >= 4.5) return '#00ff88';
  if (score >= 3.5) return '#00e5ff';
  if (score >= 2.5) return '#eab308';
  if (score >= 1.5) return '#f97316';
  return '#ff5555';
}

// ── Score Calculation ───────────────────────────────────────────────────────

/**
 * Calculate overall score from 5 dimensions.
 * Each dimension is 1-5, overall = weighted average.
 */
export function calculateOverallScore(dimensions: {
  structure: number;
  accuracy: number;
  completeness: number;
  actionability: number;
  consistency: number;
}): IterationScore {
  const weights = {
    structure: 0.15,
    accuracy: 0.25,
    completeness: 0.25,
    actionability: 0.20,
    consistency: 0.15,
  };

  const overall =
    dimensions.structure * weights.structure +
    dimensions.accuracy * weights.accuracy +
    dimensions.completeness * weights.completeness +
    dimensions.actionability * weights.actionability +
    dimensions.consistency * weights.consistency;

  return {
    overall: Math.round(overall * 10) / 10,
    structure: dimensions.structure,
    accuracy: dimensions.accuracy,
    completeness: dimensions.completeness,
    actionability: dimensions.actionability,
    consistency: dimensions.consistency,
  };
}

/**
 * Estimate a quick score from simple heuristics.
 * Used when Claude doesn't provide a detailed breakdown.
 */
export function estimateScore(params: {
  hasRiskMatrix: boolean;
  hasCodeRefs: boolean;
  hasStepByStep: boolean;
  hasValidation: boolean;
  sectionCount: number;
  wordCount: number;
}): number {
  let score = 1;

  // Structure: sections count
  if (params.sectionCount >= 5) score += 0.5;
  if (params.sectionCount >= 8) score += 0.5;

  // Completeness: word count
  if (params.wordCount >= 200) score += 0.3;
  if (params.wordCount >= 500) score += 0.3;
  if (params.wordCount >= 1000) score += 0.4;

  // Accuracy: code references
  if (params.hasCodeRefs) score += 0.5;

  // Actionability: step-by-step + validation
  if (params.hasStepByStep) score += 0.5;
  if (params.hasValidation) score += 0.5;

  // Consistency: risk matrix
  if (params.hasRiskMatrix) score += 0.5;

  return Math.min(5, Math.round(score * 10) / 10);
}

/**
 * Compare two scores and determine improvement.
 */
export function scoreImprovement(
  before: number,
  after: number,
): { delta: number; improved: boolean; description: string } {
  const delta = Math.round((after - before) * 10) / 10;
  const improved = delta > 0;

  let description: string;
  if (delta > 1) description = 'Significant improvement';
  else if (delta > 0.5) description = 'Good improvement';
  else if (delta > 0) description = 'Minor improvement';
  else if (delta === 0) description = 'No change';
  else description = 'Score decreased';

  return { delta, improved, description };
}
