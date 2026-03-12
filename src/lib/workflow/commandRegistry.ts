import type { CommandDef, KanbanStatus, KanbanCard, KanbanEventType } from '../types';

// ── Command Registry (13 commands — full SDLC pipeline) ──────────────────────
export const COMMAND_REGISTRY: Record<string, CommandDef> = {
  '/feature': {
    operatesIn: ['create'],
    movesTo: 'design',
    artifactDir: 'specs/',
    artifactPattern: 'feature-*.md',
    agent: 'feature',
    role: 'Tech Lead',
    description: 'Create feature spec',
    rerunnable: true,
    acceptsUpload: true,
    emitsEvents: ['card:created', 'card:moved', 'command:completed'],
  },
  '/chore': {
    operatesIn: ['create', 'design'],
    movesTo: 'design',
    artifactDir: 'specs/',
    artifactPattern: 'chore-*.md',
    agent: 'chore',
    role: 'Tech Lead',
    description: 'Create implementation plan',
    rerunnable: true,
    acceptsUpload: true,
    emitsEvents: ['card:created', 'card:moved', 'command:completed'],
  },
  '/breakdown': {
    operatesIn: ['design'],
    movesTo: 'task',
    artifactDir: 'tasks/',
    artifactPattern: 'sprint-*-task.md',
    agent: 'breakdown',
    role: 'Product Manager',
    description: 'Break spec into tasks',
    rerunnable: true,
    acceptsUpload: true,
    emitsEvents: ['card:moved', 'command:completed'],
  },
  '/estimate': {
    operatesIn: ['task'],
    movesTo: 'task',
    staysInColumn: true,
    artifactDir: 'estimates/',
    artifactPattern: 'estimate-*.md',
    agent: 'estimate',
    role: 'Scrum Master',
    description: 'Estimate story points & sprint plan',
    rerunnable: true,
    acceptsUpload: false,
    emitsEvents: ['command:completed'],
  },
  '/implement': {
    operatesIn: ['task', 'develop'],
    movesTo: 'testing',
    artifactDir: null,
    artifactPattern: null,
    agent: 'implement',
    role: 'Developer',
    description: 'Implement from spec',
    rerunnable: false,
    acceptsUpload: false,
    emitsEvents: ['card:moved', 'command:progress', 'command:completed'],
  },
  '/issue': {
    operatesIn: ['issue', 'create'],
    movesTo: 'task',
    artifactDir: 'tasks/issue/',
    artifactPattern: 'issue-*.md',
    agent: 'issue',
    role: 'Investigator',
    description: 'Investigate root cause',
    rerunnable: true,
    acceptsUpload: true,
    emitsEvents: ['card:moved', 'command:completed'],
  },
  '/test': {
    operatesIn: ['testing'],
    movesTo: 'testing',
    staysInColumn: true,
    artifactDir: 'tests/',
    artifactPattern: 'test-report-*.md',
    agent: 'test',
    role: 'QA Engineer',
    description: 'Write & run tests, coverage report',
    rerunnable: true,
    acceptsUpload: false,
    emitsEvents: ['command:progress', 'command:completed'],
  },
  '/review': {
    operatesIn: ['testing'],
    movesTo: 'validate',
    artifactDir: 'review/',
    artifactPattern: 'review-*.md',
    agent: 'review',
    role: 'Code Reviewer',
    description: 'Review code quality',
    rerunnable: true,
    acceptsUpload: false,
    emitsEvents: ['card:moved', 'command:completed'],
  },
  '/security': {
    operatesIn: ['validate'],
    movesTo: 'validate',
    staysInColumn: true,
    artifactDir: 'security/',
    artifactPattern: 'security-audit-*.md',
    agent: 'security',
    role: 'Security Auditor',
    description: 'OWASP scan, deps audit, secrets check',
    rerunnable: true,
    acceptsUpload: false,
    emitsEvents: ['command:completed'],
  },
  '/validate': {
    operatesIn: ['validate'],
    movesTo: 'update-docs',
    artifactDir: null,
    artifactPattern: null,
    agent: 'validate',
    role: 'Domain Expert',
    description: 'Validate against business rules',
    rerunnable: true,
    acceptsUpload: false,
    emitsEvents: ['card:moved', 'command:completed'],
  },
  '/docs': {
    operatesIn: ['update-docs'],
    movesTo: 'done',
    artifactDir: 'docs/',
    artifactPattern: 'docs-*.md',
    agent: 'docs',
    role: 'Tech Writer',
    description: 'Update documentation',
    rerunnable: true,
    acceptsUpload: false,
    emitsEvents: ['card:moved', 'command:completed'],
  },
  '/deploy': {
    operatesIn: ['done'],
    movesTo: 'done',
    staysInColumn: true,
    artifactDir: null,
    artifactPattern: null,
    agent: 'deploy',
    role: 'DevOps Engineer',
    description: 'Create PR, run CI, merge',
    rerunnable: false,
    acceptsUpload: false,
    emitsEvents: ['command:completed'],
  },
  '/discussion': {
    operatesIn: ['design', 'backlog'],
    movesTo: 'backlog',
    artifactDir: 'discussion/',
    artifactPattern: '*.md',
    agent: 'discussion',
    role: 'Architect',
    description: 'Capture architectural decisions',
    rerunnable: true,
    acceptsUpload: false,
    emitsEvents: ['card:moved', 'command:completed'],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get commands valid for a given column */
export function getCommandsForColumn(column: KanbanStatus): string[] {
  return Object.entries(COMMAND_REGISTRY)
    .filter(([, def]) => def.operatesIn.includes(column))
    .map(([cmd]) => cmd);
}

/** Get the command definition by name */
export function getCommandDef(command: string): CommandDef | undefined {
  return COMMAND_REGISTRY[command];
}

/** Check if a command can run on a card (validates column + lifecycle) */
export function canRunCommand(
  card: KanbanCard,
  command: string,
): { allowed: boolean; reason?: string } {
  const cmdDef = COMMAND_REGISTRY[command];
  if (!cmdDef) return { allowed: false, reason: `Unknown command: ${command}` };

  // Check lifecycle — must be started or running
  if (card.lifecycle === 'idle') {
    return { allowed: false, reason: 'Card must be started first. Click Start.' };
  }
  if (card.lifecycle === 'paused') {
    return { allowed: false, reason: 'Card is paused. Resume before running.' };
  }
  if (card.lifecycle === 'completed') {
    return { allowed: false, reason: 'Card is completed. Start a new iteration.' };
  }

  // Check column validity
  if (!cmdDef.operatesIn.includes(card.status)) {
    return {
      allowed: false,
      reason: `${command} operates in [${cmdDef.operatesIn.join(', ')}], not ${card.status}`,
    };
  }

  // Check re-run capability
  if (card.iterationCount > 0 && !cmdDef.rerunnable) {
    return { allowed: false, reason: `${command} doesn't support re-run` };
  }

  return { allowed: true };
}

/** Build the command string for clipboard/terminal */
export function buildCommandString(card: KanbanCard, command: string): string {
  const cmdDef = COMMAND_REGISTRY[command];
  if (!cmdDef) return command;

  // Iterate mode: re-run on existing artifact
  if (card.artifactPath && card.iterationCount > 0 && cmdDef.rerunnable) {
    return `${command} '${card.artifactPath}'`;
  }

  // Upload mode: use uploaded files as input
  if (card.uploadPath && cmdDef.acceptsUpload) {
    return `${command} '${card.uploadPath}'`;
  }

  // Create mode: new card
  return `${command} "${card.node.label}"`;
}
