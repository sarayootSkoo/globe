import type {
  KanbanStatus, WorkflowChain, WorkflowExecution,
  WorkflowTransition, WorkflowStepRecord,
} from '../types';

// ── Workflow Chains ──────────────────────────────────────────────────────────
export const WORKFLOW_CHAINS: WorkflowChain[] = [
  {
    id: 'feature',
    name: 'Feature Flow',
    steps: [
      { from: 'create',      to: 'design',      trigger: '/chore',      artifactPattern: 'specs/chore-*.md' },
      { from: 'design',      to: 'task',         trigger: '/breakdown',  artifactPattern: 'tasks/sprint-*.md' },
      { from: 'task',        to: 'task',          trigger: '/estimate',   artifactPattern: 'estimates/*.md' },
      { from: 'task',        to: 'testing',       trigger: '/implement',  artifactPattern: '' },
      { from: 'testing',     to: 'testing',       trigger: '/test',       artifactPattern: 'tests/*.md' },
      { from: 'testing',     to: 'validate',      trigger: '/review',     artifactPattern: 'review/*.md' },
      { from: 'validate',    to: 'validate',      trigger: '/security',   artifactPattern: 'security/*.md' },
      { from: 'validate',    to: 'update-docs',   trigger: '/validate',   artifactPattern: '' },
      { from: 'update-docs', to: 'done',          trigger: '/docs',       artifactPattern: 'docs/*.md' },
      { from: 'done',        to: 'done',           trigger: '/deploy',     artifactPattern: '' },
    ],
  },
  {
    id: 'bugfix',
    name: 'Bug Fix Flow',
    steps: [
      { from: 'create',  to: 'task',         trigger: '/issue',      artifactPattern: 'tasks/issue/*.md' },
      { from: 'task',    to: 'design',        trigger: '/chore',      artifactPattern: 'specs/chore-*.md' },
      { from: 'task',    to: 'testing',        trigger: '/implement',  artifactPattern: '' },
      { from: 'testing', to: 'testing',        trigger: '/test',       artifactPattern: 'tests/*.md' },
      { from: 'testing', to: 'validate',       trigger: '/review',     artifactPattern: 'review/*.md' },
      { from: 'validate',to: 'update-docs',    trigger: '/validate',   artifactPattern: '' },
      { from: 'update-docs', to: 'done',       trigger: '/docs',       artifactPattern: 'docs/*.md' },
    ],
  },
  {
    id: 'chore',
    name: 'Chore Flow',
    steps: [
      { from: 'create',  to: 'design',     trigger: '/chore',      artifactPattern: 'specs/chore-*.md' },
      { from: 'task',    to: 'testing',      trigger: '/implement',  artifactPattern: '' },
      { from: 'testing', to: 'testing',      trigger: '/test',       artifactPattern: 'tests/*.md' },
      { from: 'validate',to: 'update-docs',  trigger: '/validate',   artifactPattern: '' },
      { from: 'update-docs', to: 'done',     trigger: '/docs',       artifactPattern: 'docs/*.md' },
    ],
  },
  {
    id: 'discussion',
    name: 'Discussion Flow',
    steps: [
      { from: 'design',  to: 'backlog',  trigger: '/discussion', artifactPattern: 'discussion/*.md' },
      { from: 'backlog',  to: 'design',  trigger: '/chore',      artifactPattern: 'specs/chore-*.md' },
      { from: 'design',  to: 'task',      trigger: '/breakdown',  artifactPattern: 'tasks/*.md' },
    ],
  },
];

// ── Workflow Functions ───────────────────────────────────────────────────────

/** Get the next suggested command based on current column and chain */
export function getNextCommand(
  column: KanbanStatus,
  chainId?: string,
): { command: string; description: string } | null {
  if (chainId) {
    const chain = WORKFLOW_CHAINS.find(c => c.id === chainId);
    if (chain) {
      const step = chain.steps.find(s => s.from === column);
      if (step) {
        return { command: step.trigger, description: `Next in ${chain.name}` };
      }
    }
  }

  // Default suggestions by column
  const defaults: Partial<Record<KanbanStatus, { command: string; description: string }>> = {
    'create':      { command: '/chore',     description: 'Create implementation plan' },
    'design':      { command: '/breakdown', description: 'Break spec into tasks' },
    'task':        { command: '/implement', description: 'Implement from spec' },
    'issue':       { command: '/issue',     description: 'Investigate root cause' },
    'develop':     { command: '/implement', description: 'Continue implementation' },
    'testing':     { command: '/test',      description: 'Write & run tests' },
    'validate':    { command: '/validate',  description: 'Validate business rules' },
    'update-docs': { command: '/docs',      description: 'Update documentation' },
    'done':        { command: '/deploy',    description: 'Create PR & deploy' },
  };

  return defaults[column] ?? null;
}

/** Detect which chain matches based on starting command */
export function detectChain(startCommand: string): WorkflowChain | null {
  if (startCommand === '/issue') return WORKFLOW_CHAINS.find(c => c.id === 'bugfix') ?? null;
  if (startCommand === '/discussion') return WORKFLOW_CHAINS.find(c => c.id === 'discussion') ?? null;
  if (startCommand === '/feature') return WORKFLOW_CHAINS.find(c => c.id === 'feature') ?? null;
  return WORKFLOW_CHAINS.find(c => c.id === 'chore') ?? null;
}

/** Create a new workflow execution */
export function createExecution(chainId: string, cardId: string): WorkflowExecution {
  const chain = WORKFLOW_CHAINS.find(c => c.id === chainId);
  if (!chain) throw new Error(`Unknown chain: ${chainId}`);

  return {
    chainId,
    cardId,
    currentStep: 0,
    totalSteps: chain.steps.length,
    status: 'active',
    history: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/** Advance a workflow execution to the next step */
export function advanceExecution(
  execution: WorkflowExecution,
  artifactPath: string | null,
): WorkflowExecution {
  const chain = WORKFLOW_CHAINS.find(c => c.id === execution.chainId);
  if (!chain) return execution;

  const step = chain.steps[execution.currentStep];
  if (!step) return execution;

  const record: WorkflowStepRecord = {
    index: execution.currentStep,
    command: step.trigger,
    fromColumn: step.from,
    toColumn: step.to,
    artifactPath,
    startedAt: execution.updatedAt,
    completedAt: Date.now(),
    status: 'completed',
  };

  const nextStep = execution.currentStep + 1;
  const isComplete = nextStep >= chain.steps.length;

  return {
    ...execution,
    currentStep: nextStep,
    status: isComplete ? 'completed' : 'active',
    history: [...execution.history, record],
    updatedAt: Date.now(),
  };
}

/** Get workflow progress as percentage */
export function getProgress(execution: WorkflowExecution): number {
  if (execution.totalSteps === 0) return 0;
  return Math.round((execution.currentStep / execution.totalSteps) * 100);
}
