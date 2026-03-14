/**
 * initStores.ts — Re-initialize all stores from kanbanDB cache.
 *
 * Called AFTER kanbanDB.init() loads data from SQLite.
 * This ensures stores get the persisted values instead of empty defaults.
 */

import { kanbanDB } from './kanbanDB';

// Kanban state stores
import {
  agentAssignments, statusOverrides, cardUpdatedAt,
  localCards, cardDependencyMap, lifecycleStates, iterationStates,
} from './kanbanState';
import type { KanbanStatus, AgentType, CardType } from '../types';
import type { LocalCardData, LifecycleData, IterationData } from './kanbanState';

// Command state
import { commandQueue, commandPanelOpen } from './commandState';
import type { QueuedCommand } from './commandState';

// Workflow state
import { workflowExecutions } from './workflowState';
import type { WorkflowExecution } from '../types';

// Preview state
import { previewWidth } from './previewState';

// Config
import { kanbanConfig } from './kanbanConfig';
import type { KanbanConfig } from './kanbanConfig';
import { DEFAULT_CONFIG } from './kanbanConfig';

export function initAllStores(): void {
  // Kanban core
  agentAssignments.set(kanbanDB.get('agents', {}) as Record<string, AgentType>);
  statusOverrides.set(kanbanDB.get('moves', {}) as Record<string, KanbanStatus>);
  cardUpdatedAt.set(kanbanDB.get('cardUpdatedAt', {}) as Record<string, number>);
  localCards.set(kanbanDB.get('cards', {}) as Record<string, LocalCardData>);
  cardDependencyMap.set(kanbanDB.get('dependencies', {}) as Record<string, string[]>);
  lifecycleStates.set(kanbanDB.get('lifecycle', {}) as Record<string, LifecycleData>);
  iterationStates.set(kanbanDB.get('iterations', {}) as Record<string, IterationData>);

  // Commands
  commandQueue.set(kanbanDB.commands.get([] as unknown[]) as QueuedCommand[]);
  commandPanelOpen.set(kanbanDB.commandPanel.get(false));

  // Workflows
  workflowExecutions.set(
    kanbanDB.workflows.get({} as Record<string, unknown>) as Record<string, WorkflowExecution>
  );

  // Preview
  previewWidth.set(kanbanDB.previewWidth.get(80));

  // Config
  const storedConfig = kanbanDB.config.get({} as Record<string, unknown>);
  if (storedConfig && Object.keys(storedConfig).length > 0) {
    kanbanConfig.set({ ...DEFAULT_CONFIG, ...storedConfig } as KanbanConfig);
  }
}
