# react_audio

## Status: 🟢 done
## Prod: src/lib/stores/audioReactive.ts

startAudio sets audioEnabled true on permission granted:
  mockGetUserMedia.mockResolvedValue(mockStream)
  await startAudio()
  expect(get(audioEnabled)).toBe(true)

startAudio sets audioError on PermissionDeniedError:
  mockGetUserMedia.mockRejectedValue(new DOMException('','NotAllowedError'))
  await startAudio()
  expect(get(audioEnabled)).toBe(false)
  expect(get(audioError)).toMatch(/denied/i)

band values normalized to [0.0–1.0]:
  mockAnalyser returns Uint8Array([255, 255, 255, 255, ...])
  tick()
  expect(get(bass)).toBeCloseTo(1.0)
  expect(get(bass)).toBeLessThanOrEqual(1.0)

silence → bands all zero:
  mockAnalyser returns Uint8Array(128).fill(0)
  tick()
  expect(get(bass)).toBe(0)
  expect(get(mid)).toBe(0)
  expect(get(high)).toBe(0)

stopAudio resets stores:
  await startAudio(); stopAudio()
  expect(get(audioEnabled)).toBe(false)
  expect(get(bass)).toBe(0)

stopAudio closes AudioContext:
  await startAudio(); stopAudio()
  expect(mockCtx.close).toHaveBeenCalled()

stopAudio stops stream tracks:
  await startAudio(); stopAudio()
  mockStream.getTracks().forEach(t => expect(t.stop).toHaveBeenCalled())

analyzeLoop uses smoothingTimeConstant 0.8:
  await startAudio()
  expect(mockAnalyser.smoothingTimeConstant).toBe(0.8)

fftSize is 256:
  await startAudio()
  expect(mockAnalyser.fftSize).toBe(256)
