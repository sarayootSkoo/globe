/**
 * pixelAgentSound.ts — Web Audio notification chime.
 *
 * Ported from pixel-agents-main notificationSound.ts.
 * Ascending two-note chime (E5 → E6) plays when an agent completes.
 */

import { get } from 'svelte/store';
import { pixelSoundEnabled } from './pixelAgentState';

// ── Audio Context ──────────────────────────────────────────────────────────

let audioCtx: AudioContext | null = null;
let unlocked = false;

function getCtx(): AudioContext | null {
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

/**
 * Call on first user interaction (click/keydown) to unlock AudioContext.
 * Browsers require user gesture before playing audio.
 */
export function unlockAudio(): void {
  if (unlocked) return;
  const ctx = getCtx();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
  unlocked = true;
}

// ── Chime ──────────────────────────────────────────────────────────────────

const E5 = 659.25;
const E6 = 1318.51;

/**
 * Play ascending two-note chime.
 * Only plays if sound is enabled in settings.
 */
export function playChime(): void {
  if (!get(pixelSoundEnabled)) return;

  const ctx = getCtx();
  if (!ctx) return;

  // Resume if suspended
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  // Note 1: E5 (short)
  playTone(ctx, E5, now, 0.15, 0.3);

  // Note 2: E6 (slightly longer, delayed)
  playTone(ctx, E6, now + 0.12, 0.2, 0.25);
}

function playTone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume: number,
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// ── Cleanup ────────────────────────────────────────────────────────────────

export function disposeAudio(): void {
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
  unlocked = false;
}
