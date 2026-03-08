# react_audio

## Status: 🟢 done
## Prod: src/lib/stores/audioReactive.ts

Domain: real-time microphone analysis → visual effect modulation
Permission: browser mic access required (getUserMedia); graceful fallback if denied
Signal chain: mic → AudioContext → AnalyserNode → FFT byte data → frequency bands

Frequency bands:
  bass  (~20–250 Hz)  → particle density, border glow, blackhole pulse
  mid   (~250–4k Hz)  → sparkle rate, shooting star trigger
  high  (~4k–20k Hz)  → glitter burst, plasma wave amplitude

Reactive output: normalized floats [0.0–1.0] per band
  visuals subscribe → scale their parameters by band value
  e.g. effectDensity effective = base * (1 + bass * 0.5)

Rules:
- AudioContext created only after user gesture (browser policy)
- analyser.fftSize = 256 (128 usable bins)
- smoothingTimeConstant = 0.8 (temporal smoothing)
- if permission denied → all band values = 0.0, visuals use base values
- audio processing runs in separate requestAnimationFrame loop
- destroy() closes AudioContext + stops mic stream track
