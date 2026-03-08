import { writable, get } from 'svelte/store';
import * as fx from './themeEffects';
import { glowLevel } from './appState';

/**
 * Audio Reactive system — analyses microphone or system audio via Web Audio API
 * and drives effect parameters (arc intensity, pulse speed, border glow, etc.)
 * based on frequency data.
 */

export const audioEnabled = writable<boolean>(false);
export const audioSensitivity = writable<number>(1); // 0.1–3 multiplier
export const audioBass = writable<number>(0);   // 0–1 current bass level
export const audioMid = writable<number>(0);    // 0–1 current mid level
export const audioHigh = writable<number>(0);   // 0–1 current high level

let audioCtx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let source: MediaStreamAudioSourceNode | null = null;
let stream: MediaStream | null = null;
let animFrame: number | null = null;
let dataArray: Uint8Array<ArrayBuffer> | null = null;

// Store original values to restore when audio mode stops
let originals: Record<string, number> | null = null;

function saveOriginals(): void {
  originals = {
    arcInt: get(fx.electricArcIntensity),
    arcSpd: get(fx.electricArcSpeed),
    coreGlow: get(fx.electricCoreGlow),
    sparkInt: get(fx.sparkBurstIntensity),
    sparkRate: get(fx.sparkBurstRate),
    borderInt: get(fx.borderIntensity),
    borderSpd: get(fx.borderSpeed),
    glow: get(glowLevel),
  };
}

function restoreOriginals(): void {
  if (!originals) return;
  fx.electricArcIntensity.set(originals.arcInt);
  fx.electricArcSpeed.set(originals.arcSpd);
  fx.electricCoreGlow.set(originals.coreGlow);
  fx.sparkBurstIntensity.set(originals.sparkInt);
  fx.sparkBurstRate.set(originals.sparkRate);
  fx.borderIntensity.set(originals.borderInt);
  fx.borderSpeed.set(originals.borderSpd);
  glowLevel.set(originals.glow);
  originals = null;
}

function processAudio(): void {
  if (!analyser || !dataArray) return;

  analyser.getByteFrequencyData(dataArray);
  const len = dataArray.length;
  const sens = get(audioSensitivity);

  // Split into 3 bands: bass (0-15%), mid (15-50%), high (50-100%)
  const bassEnd = Math.floor(len * 0.15);
  const midEnd = Math.floor(len * 0.5);

  let bassSum = 0, midSum = 0, highSum = 0;
  for (let i = 0; i < bassEnd; i++) bassSum += dataArray[i];
  for (let i = bassEnd; i < midEnd; i++) midSum += dataArray[i];
  for (let i = midEnd; i < len; i++) highSum += dataArray[i];

  const bass = Math.min(1, (bassSum / (bassEnd * 255)) * 2 * sens);
  const mid = Math.min(1, (midSum / ((midEnd - bassEnd) * 255)) * 2.5 * sens);
  const high = Math.min(1, (highSum / ((len - midEnd) * 255)) * 3 * sens);

  audioBass.set(bass);
  audioMid.set(mid);
  audioHigh.set(high);

  // Drive effects from audio bands
  // Bass → arc intensity, core glow, border glow
  fx.electricArcIntensity.set(0.5 + bass * 4);
  fx.electricCoreGlow.set(0.5 + bass * 3);
  fx.borderIntensity.set(0.5 + bass * 3);

  // Mid → arc speed, spark intensity
  fx.electricArcSpeed.set(0.5 + mid * 3);
  fx.sparkBurstIntensity.set(0.5 + mid * 3);

  // High → spark rate, border speed
  fx.sparkBurstRate.set(0.5 + high * 4);
  fx.borderSpeed.set(0.5 + high * 3);

  // Overall glow from bass+mid average
  glowLevel.set(Math.min(1, 0.2 + (bass + mid) * 0.5));

  animFrame = requestAnimationFrame(processAudio);
}

export async function startAudio(): Promise<boolean> {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.7;

    source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    dataArray = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;

    saveOriginals();
    audioEnabled.set(true);
    animFrame = requestAnimationFrame(processAudio);
    return true;
  } catch {
    return false;
  }
}

export function stopAudio(): void {
  if (animFrame !== null) {
    cancelAnimationFrame(animFrame);
    animFrame = null;
  }
  if (source) { source.disconnect(); source = null; }
  if (audioCtx) { audioCtx.close(); audioCtx = null; }
  if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
  analyser = null;
  dataArray = null;

  restoreOriginals();
  audioEnabled.set(false);
  audioBass.set(0);
  audioMid.set(0);
  audioHigh.set(0);
}

export function toggleAudio(): void {
  if (get(audioEnabled)) {
    stopAudio();
  } else {
    startAudio();
  }
}
