import { writable, derived } from 'svelte/store';

export interface SubAgentNode {
  sessionId: string;
  parentSessionId: string | null;
  cardId: string;
  agent: string;
  state: 'running' | 'done' | 'error';
  startedAt: string;
  children: string[]; // child session IDs
}

export const subAgentNodes = writable<Map<string, SubAgentNode>>(new Map());

export function registerSubAgent(sessionId: string, parentSessionId: string | null, cardId: string, agent: string): void {
  subAgentNodes.update(map => {
    const next = new Map(map);
    next.set(sessionId, {
      sessionId,
      parentSessionId,
      cardId,
      agent,
      state: 'running',
      startedAt: new Date().toISOString(),
      children: [],
    });
    // Add as child to parent
    if (parentSessionId) {
      const parent = next.get(parentSessionId);
      if (parent) {
        next.set(parentSessionId, { ...parent, children: [...parent.children, sessionId] });
      }
    }
    return next;
  });
}

export function updateSubAgentState(sessionId: string, state: 'running' | 'done' | 'error'): void {
  subAgentNodes.update(map => {
    const next = new Map(map);
    const node = next.get(sessionId);
    if (node) {
      next.set(sessionId, { ...node, state });
    }
    return next;
  });
}

// Derived: get root sessions (no parent)
export const rootSessions = derived(subAgentNodes, ($nodes) => {
  const roots: SubAgentNode[] = [];
  for (const node of $nodes.values()) {
    if (!node.parentSessionId) roots.push(node);
  }
  return roots;
});

// Get tree for a session
export function getSessionTree(sessionId: string): SubAgentNode[] {
  // Will be used by UI components to render hierarchy
  return []; // placeholder — UI reads from store directly
}
