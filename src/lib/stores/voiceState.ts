import { writable, derived } from 'svelte/store';

// Local type definitions — mirrors voiceCommands.ts / voiceMatcher.ts
// (defined here to avoid circular imports between stores and voice modules)

export interface VoiceIntent {
  action: string;
  command?: string;
  cardQuery?: string;
  targetColumn?: string;
  confidence: number;
}

export interface MatchCandidate {
  cardId: string;
  cardLabel: string;
  score: number;
  matchType: 'exact' | 'fuzzy' | 'partial';
}

// ── Writable stores ───────────────────────────────────────────────────────────

/** True while the microphone is actively listening */
export const voiceListening = writable(false);

/** Live (interim) transcript from the recognition engine */
export const voiceTranscript = writable('');

/** Last confirmed final transcript */
export const voiceFinalTranscript = writable('');

/** Parsed intent from the final transcript, or null if not yet parsed */
export const voiceIntent = writable<VoiceIntent | null>(null);

/** Top match candidates for the cardQuery in the current intent */
export const voiceCandidates = writable<MatchCandidate[]>([]);

/** Last error message from the voice engine, or null */
export const voiceError = writable<string | null>(null);

/** Active recognition language */
export const voiceLang = writable<'th-TH' | 'en-US'>('th-TH');

/** Whether the voice command feature is enabled at all */
export const voiceEnabled = writable(false);

/** When true, prompt the user to confirm before executing a recognised intent */
export const voiceConfirmRequired = writable(true);

// ── Derived stores ────────────────────────────────────────────────────────────

/** True when an intent has been parsed and is awaiting action */
export const voiceHasIntent = derived(voiceIntent, (i) => i !== null);

// ── Reset helper ──────────────────────────────────────────────────────────────

/**
 * Clear all transient voice state between recognition sessions.
 * Does NOT reset voiceEnabled, voiceLang, or voiceConfirmRequired.
 */
export function resetVoiceState(): void {
  voiceTranscript.set('');
  voiceFinalTranscript.set('');
  voiceIntent.set(null);
  voiceCandidates.set([]);
  voiceError.set(null);
}
