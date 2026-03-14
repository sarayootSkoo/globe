/**
 * pipelineAdvance.ts — Auto-advance cards through the SDLC pipeline.
 *
 * When an agent completes successfully, this engine determines the next
 * stage in the pipeline and optionally enqueues the next agent.
 * Auto-advance is opt-in (disabled by default).
 */

import { get } from 'svelte/store';
import { kanbanCards, moveCard, assignAgent, AGENT_DEFS } from './kanbanState';
import { enqueue } from './agentQueue';
import { autoAdvanceEnabled } from './agentQueue';
import { addLog } from './activityLog';
import { addPendingAction } from './actionConfirm';
import type { PipelineAdvanceRule, KanbanStatus, AgentType } from '../types';

// ── Pipeline Rules (SDLC flow) ───────────────────────────────────────────────

export const PIPELINE_RULES: PipelineAdvanceRule[] = [
  { fromColumn: 'create',      toColumn: 'design',      autoAgent: 'chore',     autoLaunch: true },
  { fromColumn: 'design',      toColumn: 'task',         autoAgent: 'breakdown', autoLaunch: true },
  { fromColumn: 'task',         toColumn: 'develop',     autoAgent: 'implement', autoLaunch: true },
  { fromColumn: 'develop',     toColumn: 'testing',      autoAgent: 'test',      autoLaunch: true },
  { fromColumn: 'testing',     toColumn: 'validate',     autoAgent: 'validate',  autoLaunch: true },
  { fromColumn: 'validate',    toColumn: 'update-docs',  autoAgent: 'docs',      autoLaunch: true },
  { fromColumn: 'update-docs', toColumn: 'done',         autoAgent: 'deploy',    autoLaunch: false },
];

/**
 * Find the next pipeline rule for a given column.
 */
export function getNextRule(fromColumn: KanbanStatus): PipelineAdvanceRule | null {
  return PIPELINE_RULES.find(r => r.fromColumn === fromColumn) ?? null;
}

/**
 * Get the pipeline stage index (0-based) for a column.
 * Returns -1 if column is not in the pipeline (e.g., backlog, hold, issue).
 */
export function getPipelineIndex(column: KanbanStatus): number {
  const idx = PIPELINE_RULES.findIndex(r => r.fromColumn === column);
  if (idx >= 0) return idx;
  if (column === 'done') return PIPELINE_RULES.length;
  return -1;
}

/**
 * Get total pipeline stages count.
 */
export const PIPELINE_TOTAL_STAGES = PIPELINE_RULES.length + 1; // +1 for 'done'

/**
 * Advance a card to the next pipeline stage after agent completion.
 *
 * 1. Looks up current column → finds next rule
 * 2. Moves card to next column
 * 3. If autoAdvance is enabled and rule has autoAgent → assigns + enqueues
 *
 * Returns true if card was advanced.
 */
export function advanceCard(cardId: string): boolean {
  const $cards = get(kanbanCards);
  const card = $cards.find(c => c.node.id === cardId);
  if (!card) return false;

  const rule = getNextRule(card.status);
  if (!rule) {
    addLog(cardId, 'lifecycle:completed', { reason: 'pipeline_end', column: card.status });
    return false;
  }

  const title = card.node.label.slice(0, 40);
  const fromCol = rule.fromColumn;
  const toCol = rule.toColumn;

  // Queue a confirmation action for the advance
  addPendingAction(
    'advance',
    cardId,
    title,
    `Move ${fromCol} → ${toCol}` + (rule.autoAgent ? ` + assign ${rule.autoAgent}` : ''),
    () => {
      moveCard(cardId, toCol);
      addLog(cardId, 'card:moved', {
        from: fromCol,
        to: toCol,
        reason: 'pipeline_advance',
      });

      const $autoAdvance = get(autoAdvanceEnabled);
      if ($autoAdvance && rule.autoLaunch && rule.autoAgent) {
        const agentDef = AGENT_DEFS[rule.autoAgent];
        if (agentDef) {
          assignAgent(cardId, rule.autoAgent);
          const args = card.artifactPath ? `'${card.artifactPath}'` : `"${card.node.label}"`;
          enqueue(cardId, agentDef.command, args);
          addLog(cardId, 'command:started', {
            command: agentDef.command,
            agent: rule.autoAgent,
            reason: 'pipeline_auto_advance',
          });
        }
      }
    },
  );

  return true;
}
