import { writable, derived } from 'svelte/store';
import type { WorkflowExecution, WorkflowStepRecord, KanbanStatus } from '../types';
import { WORKFLOW_CHAINS } from '../workflow/workflowEngine';

// ── Persistence ─────────────────────────────────────────────────────────────
const WORKFLOW_KEY = 'kg-kanban-workflows';

function loadWorkflows(): Record<string, WorkflowExecution> {
  try {
    return JSON.parse(localStorage.getItem(WORKFLOW_KEY) || '{}');
  } catch { return {}; }
}

// ── Store ───────────────────────────────────────────────────────────────────

/** Active workflow executions — keyed by cardId */
export const workflowExecutions = writable<Record<string, WorkflowExecution>>(loadWorkflows());
workflowExecutions.subscribe(v => {
  localStorage.setItem(WORKFLOW_KEY, JSON.stringify(v));
});

// ── Derived ─────────────────────────────────────────────────────────────────

/** All active (non-completed) workflows */
export const activeWorkflows = derived(workflowExecutions, ($wf) =>
  Object.values($wf).filter(w => w.status === 'active' || w.status === 'paused')
);

/** Get workflow for a specific card */
export function getCardWorkflow(cardId: string): WorkflowExecution | null {
  const wfs = loadWorkflows();
  return wfs[cardId] ?? null;
}

// ── Actions ─────────────────────────────────────────────────────────────────

/** Start a workflow chain for a card */
export function startWorkflow(cardId: string, chainId: string): WorkflowExecution | null {
  const chain = WORKFLOW_CHAINS.find(c => c.id === chainId);
  if (!chain) return null;

  const execution: WorkflowExecution = {
    chainId,
    cardId,
    currentStep: 0,
    totalSteps: chain.steps.length,
    status: 'active',
    history: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  workflowExecutions.update(m => ({ ...m, [cardId]: execution }));
  return execution;
}

/** Record a completed step and advance to next */
export function advanceWorkflow(
  cardId: string,
  artifactPath: string | null,
): WorkflowExecution | null {
  let result: WorkflowExecution | null = null;

  workflowExecutions.update(m => {
    const exec = m[cardId];
    if (!exec || exec.status !== 'active') return m;

    const chain = WORKFLOW_CHAINS.find(c => c.id === exec.chainId);
    if (!chain) return m;

    const step = chain.steps[exec.currentStep];
    if (!step) return m;

    const record: WorkflowStepRecord = {
      index: exec.currentStep,
      command: step.trigger,
      fromColumn: step.from,
      toColumn: step.to,
      artifactPath,
      startedAt: exec.updatedAt,
      completedAt: Date.now(),
      status: 'completed',
    };

    const nextStep = exec.currentStep + 1;
    const isComplete = nextStep >= chain.steps.length;

    const updated: WorkflowExecution = {
      ...exec,
      currentStep: nextStep,
      status: isComplete ? 'completed' : 'active',
      history: [...exec.history, record],
      updatedAt: Date.now(),
    };

    result = updated;
    return { ...m, [cardId]: updated };
  });

  return result;
}

/** Pause a workflow */
export function pauseWorkflow(cardId: string): void {
  workflowExecutions.update(m => {
    if (!m[cardId]) return m;
    return { ...m, [cardId]: { ...m[cardId], status: 'paused', updatedAt: Date.now() } };
  });
}

/** Resume a paused workflow */
export function resumeWorkflow(cardId: string): void {
  workflowExecutions.update(m => {
    if (!m[cardId] || m[cardId].status !== 'paused') return m;
    return { ...m, [cardId]: { ...m[cardId], status: 'active', updatedAt: Date.now() } };
  });
}

/** Fail a workflow */
export function failWorkflow(cardId: string): void {
  workflowExecutions.update(m => {
    if (!m[cardId]) return m;
    return { ...m, [cardId]: { ...m[cardId], status: 'failed', updatedAt: Date.now() } };
  });
}

/** Remove a workflow (cleanup) */
export function removeWorkflow(cardId: string): void {
  workflowExecutions.update(m => {
    const next = { ...m };
    delete next[cardId];
    return next;
  });
}
