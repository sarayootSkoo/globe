<script lang="ts">
  import { onMount } from 'svelte';
  import {
    voiceListening, voiceTranscript, voiceIntent,
    voiceCandidates, voiceLang, voiceEnabled, voiceError,
    voiceConfirmRequired, resetVoiceState,
  } from '../../lib/stores/voiceState';
  import type { VoiceIntent, MatchCandidate } from '../../lib/stores/voiceState';
  import { VoiceEngine } from '../../lib/voice/voiceEngine';
  import { parseVoiceIntent } from '../../lib/voice/voiceCommands';
  import { matchCardByVoice } from '../../lib/voice/voiceMatcher';
  import { queueCommand } from '../../lib/stores/commandState';
  import { kanbanCards, moveCard } from '../../lib/stores/kanbanState';
  import { showVoiceBubble } from '../../lib/stores/pixelAgentState';
  import { get } from 'svelte/store';
  import type { KanbanCard } from '../../lib/types';

  let engine: VoiceEngine | null = null;
  let isEnabled = $state(false);
  let isListening = $state(false);
  let transcript = $state('');
  let intent = $state<VoiceIntent | null>(null);
  let candidates = $state<MatchCandidate[]>([]);
  let selectedIdx = $state(0);
  let error = $state<string | null>(null);
  let lang = $state<'th-TH' | 'en-US'>('th-TH');

  $effect(() => {
    const u1 = voiceEnabled.subscribe(v => { isEnabled = v; });
    const u2 = voiceListening.subscribe(v => { isListening = v; });
    const u3 = voiceTranscript.subscribe(v => { transcript = v; });
    const u4 = voiceIntent.subscribe(v => { intent = v; });
    const u5 = voiceCandidates.subscribe(v => { candidates = v; });
    const u6 = voiceError.subscribe(v => { error = v; });
    const u7 = voiceLang.subscribe(v => { lang = v; });
    return () => { u1(); u2(); u3(); u4(); u5(); u6(); u7(); };
  });

  onMount(() => {
    if (VoiceEngine.isSupported()) {
      engine = new VoiceEngine({ lang: get(voiceLang) });

      engine.onResult = (text: string, isFinal: boolean) => {
        voiceTranscript.set(text);
        if (isFinal) {
          processTranscript(text);
        }
      };

      engine.onError = (err: string) => {
        voiceError.set(err);
        voiceListening.set(false);
      };

      engine.onEnd = () => {
        voiceListening.set(false);
      };
    }

    // V key push-to-talk
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isEnabled) return;
      if (e.key === 'v' && !e.repeat && !isInputFocused()) {
        e.preventDefault();
        startListening();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'v' && !isInputFocused()) {
        stopListening();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      engine?.stop();
    };
  });

  function isInputFocused(): boolean {
    const active = document.activeElement;
    if (!active) return false;
    const tag = active.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' ||
           (active as HTMLElement).contentEditable === 'true';
  }

  function startListening() {
    if (!engine || isListening) return;
    resetVoiceState();
    engine.setLang(get(voiceLang));
    engine.start();
    voiceListening.set(true);
  }

  function stopListening() {
    if (!engine || !isListening) return;
    engine.stop();
    // Don't set voiceListening false here — onEnd callback handles it
  }

  function processTranscript(text: string) {
    const parsed = parseVoiceIntent(text);
    if (!parsed) {
      voiceError.set('Could not understand command');
      return;
    }

    voiceIntent.set(parsed);

    // Fuzzy match cards
    if (parsed.cardQuery) {
      const allCards = get(kanbanCards) as KanbanCard[];
      const matches = matchCardByVoice(parsed.cardQuery, allCards);
      voiceCandidates.set(matches);
      selectedIdx = 0;
    }

    // Auto-execute if confirmation not required
    if (!get(voiceConfirmRequired) && candidates.length > 0) {
      confirmIntent();
    }
  }

  function selectCandidate(idx: number) {
    selectedIdx = idx;
  }

  function confirmIntent() {
    if (!intent) return;

    const card = candidates[selectedIdx];

    if (intent.action === 'run_command' && intent.command && card) {
      queueCommand(intent.command, `"${card.cardLabel}"`, card.cardId, 'voice');
      showVoiceBubble(card.cardId, intent.command);
    } else if (intent.action === 'move_card' && card && intent.targetColumn) {
      moveCard(card.cardId, intent.targetColumn as any);
      showVoiceBubble(card.cardId, `move → ${intent.targetColumn}`);
    }

    resetVoiceState();
  }

  function cancelIntent() {
    resetVoiceState();
  }

  function toggleLang() {
    const next = lang === 'th-TH' ? 'en-US' as const : 'th-TH' as const;
    voiceLang.set(next);
  }
</script>

{#if isEnabled}
  <div class="voice-bar" class:listening={isListening}>
    <!-- Mic button -->
    <button
      class="mic-btn"
      class:active={isListening}
      onmousedown={startListening}
      onmouseup={stopListening}
      title="Hold to speak (or press V key)"
    >
      <span class="mic-icon">{isListening ? '🔴' : '🎤'}</span>
    </button>

    <!-- Live transcript -->
    {#if isListening || transcript}
      <span class="transcript" class:listening-text={isListening}>
        {transcript || 'Listening...'}
      </span>
    {/if}

    <!-- Error -->
    {#if error && !intent}
      <span class="error-text">{error}</span>
    {/if}

    <!-- Intent confirmation -->
    {#if intent}
      <div class="intent-card">
        <span class="intent-action">{intent.action.replace('_', ' ')}</span>
        {#if intent.command}
          <code class="intent-cmd">{intent.command}</code>
        {/if}
        {#if candidates.length > 0}
          <span class="intent-arrow">→</span>
          {#each candidates.slice(0, 3) as candidate, i}
            <button
              class="candidate-btn"
              class:candidate-selected={i === selectedIdx}
              onclick={() => selectCandidate(i)}
            >
              {candidate.cardLabel}
              <span class="score">{Math.round(candidate.score * 100)}%</span>
            </button>
          {/each}
        {/if}
        <button class="confirm-btn" onclick={confirmIntent} title="Confirm">✓</button>
        <button class="cancel-btn" onclick={cancelIntent} title="Cancel">✗</button>
      </div>
    {/if}

    <!-- Language toggle -->
    <button class="lang-btn" onclick={toggleLang} title="Switch language">
      {lang === 'th-TH' ? '🇹🇭' : '🇺🇸'}
    </button>

    <!-- Shortcut hint -->
    <span class="hint">Hold V</span>
  </div>
{/if}

<style>
  .voice-bar {
    position: fixed;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: rgba(18, 20, 26, 0.95);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    font-family: var(--font, 'JetBrains Mono', monospace);
    font-size: 11px;
    color: #aaa;
    z-index: 150;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    transition: all 0.2s;
    max-width: 90vw;
  }

  .voice-bar.listening {
    border-color: rgba(239, 68, 68, 0.4);
    box-shadow: 0 4px 24px rgba(239, 68, 68, 0.15);
  }

  .mic-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    flex-shrink: 0;
  }

  .mic-btn:hover {
    background: rgba(255,255,255,0.1);
  }

  .mic-btn.active {
    border-color: rgba(239, 68, 68, 0.6);
    background: rgba(239, 68, 68, 0.15);
    animation: pulse-mic 1.2s ease-in-out infinite;
  }

  @keyframes pulse-mic {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3); }
    50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
  }

  .mic-icon { font-size: 14px; }

  .transcript {
    color: #888;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .listening-text {
    color: #ef4444;
  }

  .error-text {
    color: #f97316;
    font-size: 10px;
  }

  .intent-card {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    background: rgba(0, 229, 255, 0.06);
    border: 1px solid rgba(0, 229, 255, 0.15);
    border-radius: 8px;
  }

  .intent-action {
    font-size: 10px;
    font-weight: 700;
    color: #00e5ff;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .intent-cmd {
    font-size: 10px;
    color: #4d8aff;
    background: rgba(77,138,255,0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .intent-arrow { color: #555; }

  .candidate-btn {
    font-size: 10px;
    font-family: inherit;
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    color: #aaa;
    cursor: pointer;
    transition: all 0.12s;
  }

  .candidate-btn:hover { background: rgba(255,255,255,0.06); }

  .candidate-selected {
    border-color: rgba(0, 229, 255, 0.3);
    color: #00e5ff;
    background: rgba(0, 229, 255, 0.08);
  }

  .score {
    font-size: 8px;
    color: #555;
    margin-left: 4px;
  }

  .confirm-btn, .cancel-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.12s;
  }

  .confirm-btn {
    border-color: rgba(34, 197, 94, 0.4);
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }

  .confirm-btn:hover { background: rgba(34, 197, 94, 0.2); }

  .cancel-btn {
    border-color: rgba(239, 68, 68, 0.4);
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  .cancel-btn:hover { background: rgba(239, 68, 68, 0.2); }

  .lang-btn {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 2px;
    line-height: 1;
  }

  .hint {
    font-size: 9px;
    color: #444;
    letter-spacing: 0.04em;
  }
</style>
