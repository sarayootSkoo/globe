/**
 * pixelAgentState.ts — Maps agent lifecycle events → pixel character state.
 *
 * Bridges agentEventStore (WebSocket) and kanbanState (card positions)
 * to produce PixelAgentMapping entries consumed by PixelAgentLayer.svelte.
 */

import { writable, get, derived } from 'svelte/store';
import { agentLiveStatuses } from './agentEventStore';
import { kanbanCards } from './kanbanState';
import { kanbanDB } from './kanbanDB';
import type { AgentType, CardLifecycleState, AgentLiveStatus, KanbanCard } from '../types';

// ── Types ──────────────────────────────────────────────────────────────────

export type CharacterFSMState = 'idle' | 'walk' | 'type' | 'read';

export interface PixelAgentMapping {
  agentId: string;
  cardId: string;
  palette: number;
  columnId: string;
  agentType: AgentType;
  lifecycle: CardLifecycleState;
  characterState: CharacterFSMState;
  bubble: string | null;
  voiceBubble: string | null;
  voiceBubbleTimer: number;
}

// ── Settings (persisted) ───────────────────────────────────────────────────

function loadPixelSetting<T>(key: string, fallback: T): T {
  const settings = kanbanDB.settings.get({});
  return (settings as Record<string, unknown>)[`pixel_${key}`] as T ?? fallback;
}

function savePixelSetting<T>(key: string, value: T): void {
  const settings = kanbanDB.settings.get({});
  kanbanDB.settings.set({ ...settings, [`pixel_${key}`]: value });
}

export const pixelAgentsEnabled = writable<boolean>(loadPixelSetting('enabled', true));
export const pixelSoundEnabled = writable<boolean>(loadPixelSetting('sound', false));
export const pixelMatrixEnabled = writable<boolean>(loadPixelSetting('matrix', true));
export const pixelAnimSpeed = writable<number>(loadPixelSetting('animSpeed', 100));

pixelAgentsEnabled.subscribe(v => savePixelSetting('enabled', v));
pixelSoundEnabled.subscribe(v => savePixelSetting('sound', v));
pixelMatrixEnabled.subscribe(v => savePixelSetting('matrix', v));
pixelAnimSpeed.subscribe(v => savePixelSetting('animSpeed', v));

// ── Agent Mapping Store ────────────────────────────────────────────────────

export const pixelAgents = writable<Map<string, PixelAgentMapping>>(new Map());

// Palette assignment: round-robin through 6 palettes
let nextPalette = 0;
function pickPalette(): number {
  const p = nextPalette;
  nextPalette = (nextPalette + 1) % 6;
  return p;
}

// ── Agent Type → Character Animation ───────────────────────────────────────

export function agentToAnimation(agent: AgentType, lifecycle: CardLifecycleState): CharacterFSMState {
  if (lifecycle !== 'running' && lifecycle !== 'started') return 'idle';
  switch (agent) {
    case 'implement': case 'chore': case 'feature': case 'test': case 'deploy':
      return 'type';
    case 'review': case 'validate': case 'security': case 'docs': case 'breakdown': case 'estimate':
      return 'read';
    case 'discussion': case 'issue':
      return 'read';
    default:
      return 'type';
  }
}

// ── Lifecycle → Speech Bubble ──────────────────────────────────────────────

export function lifecycleToBubble(lifecycle: CardLifecycleState): string | null {
  switch (lifecycle) {
    case 'paused':    return 'permission';
    case 'completed': return 'done';
    case 'failed':    return 'error';
    case 'blocked':   return 'blocked';
    default:          return null;
  }
}

// ── Voice Bubble ───────────────────────────────────────────────────────────

export function showVoiceBubble(agentId: string, text: string): void {
  pixelAgents.update(map => {
    const next = new Map(map);
    const agent = next.get(agentId);
    if (agent) {
      next.set(agentId, { ...agent, voiceBubble: text, voiceBubbleTimer: Date.now() });
    }
    return next;
  });

  // Auto-clear after 3 seconds
  setTimeout(() => {
    pixelAgents.update(map => {
      const next = new Map(map);
      const agent = next.get(agentId);
      if (agent && agent.voiceBubble === text) {
        next.set(agentId, { ...agent, voiceBubble: null, voiceBubbleTimer: 0 });
      }
      return next;
    });
  }, 3000);
}

// ── Sync from agentLiveStatuses + kanbanCards ─────────────────────────────

/** Cache card status for column lookup */
let cardStatusMap = new Map<string, string>();

/**
 * Call once during init to wire up the reactive bridge.
 * Subscribes to agentLiveStatuses and kanbanCards to produce pixelAgents.
 */
export function initPixelAgentSync(): () => void {
  const paletteMap = new Map<string, number>();

  // Keep cardStatusMap up-to-date
  const unsubCards = kanbanCards.subscribe((cards: KanbanCard[]) => {
    const next = new Map<string, string>();
    for (const card of cards) {
      next.set(card.node.id, card.status);
    }
    cardStatusMap = next;
  });

  const unsubStatuses = agentLiveStatuses.subscribe(statuses => {
    const current = get(pixelAgents);
    const next = new Map<string, PixelAgentMapping>();

    for (const [nodeId, status] of statuses) {
      // Assign palette if new
      if (!paletteMap.has(nodeId)) {
        paletteMap.set(nodeId, pickPalette());
      }

      const existing = current.get(nodeId);
      const lifecycle = statusToLifecycle(status);
      const agentType = (status.agent ?? null) as AgentType;

      // Get column from card status map
      const columnId = cardStatusMap.get(nodeId) ?? existing?.columnId ?? 'develop';

      next.set(nodeId, {
        agentId: nodeId,
        cardId: nodeId,
        palette: paletteMap.get(nodeId)!,
        columnId,
        agentType,
        lifecycle,
        characterState: agentToAnimation(agentType, lifecycle),
        bubble: lifecycleToBubble(lifecycle),
        voiceBubble: existing?.voiceBubble ?? null,
        voiceBubbleTimer: existing?.voiceBubbleTimer ?? 0,
      });
    }

    pixelAgents.set(next);
  });

  return () => {
    unsubCards();
    unsubStatuses();
  };
}

function statusToLifecycle(status: AgentLiveStatus): CardLifecycleState {
  switch (status.state) {
    case 'working': return 'running';
    case 'done':    return 'completed';
    case 'error':   return 'failed';
    case 'idle':
    default:        return 'idle';
  }
}

// ── Card-level agent status derived store ─────────────────────────────────

export interface CardAgentStatus {
  state: 'idle' | 'working' | 'done' | 'error';
  agent: string;
  lastAction: string;
  startedAt?: string;
}

export const agentStatusByCard = derived(agentLiveStatuses, ($statuses) => {
  const map = new Map<string, CardAgentStatus>();
  for (const [nodeId, status] of $statuses) {
    map.set(nodeId, {
      state: status.state,
      agent: status.agent ?? '',
      lastAction: status.lastAction ?? '',
      startedAt: status.startedAt,
    });
  }
  return map;
});
