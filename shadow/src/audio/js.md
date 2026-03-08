# react_audio

## Status: 🟢 done
## Prod: src/lib/stores/audioReactive.ts

// Stores
audioEnabled:  writable<boolean>(false)
audioError:    writable<string|null>(null)
bass:          writable<number>(0)    // [0.0–1.0]
mid:           writable<number>(0)
high:          writable<number>(0)

// Internal
let ctx: AudioContext | null = null
let analyser: AnalyserNode | null = null
let stream: MediaStream | null = null
let rafId: number

// Band bin ranges (fftSize=256 → 128 bins, ~172 Hz/bin at 44.1kHz)
BASS_RANGE  = [0, 4]      // bins 0–3
MID_RANGE   = [4, 28]     // bins 4–27
HIGH_RANGE  = [28, 128]   // bins 28–127

startAudio():
  stream = await navigator.mediaDevices.getUserMedia({ audio:true, video:false })
  ctx = new AudioContext()
  analyser = ctx.createAnalyser()
  analyser.fftSize = 256
  analyser.smoothingTimeConstant = 0.8
  source = ctx.createMediaStreamSource(stream)
  source.connect(analyser)
  audioEnabled.set(true)
  analyzeLoop()

  catch PermissionDeniedError:
    audioError.set('Microphone access denied')
    audioEnabled.set(false)

analyzeLoop():
  data = new Uint8Array(analyser.frequencyBinCount)  // 128 bytes
  rafId = requestAnimationFrame(() => {
    analyser.getByteFrequencyData(data)
    bass.set(avg(data, BASS_RANGE)  / 255)
    mid.set( avg(data, MID_RANGE)   / 255)
    high.set(avg(data, HIGH_RANGE)  / 255)
    analyzeLoop()
  })

avg(data, [start,end]): data.slice(start,end).reduce(sum)/length

stopAudio():
  cancelAnimationFrame(rafId)
  stream?.getTracks().forEach(t => t.stop())
  ctx?.close()
  ctx = analyser = stream = null
  audioEnabled.set(false)
  bass.set(0); mid.set(0); high.set(0)

// Consumer pattern (in ParticleBackground.ts)
derived([effectDensity, bass], ([d, b]) => d * (1 + b * 0.5))
