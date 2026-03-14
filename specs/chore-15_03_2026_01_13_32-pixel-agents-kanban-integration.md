# Chore: Pixel Agent Characters + Voice Commands บน Kanban Board

## Metadata
adw_id: `pixel-agents-kanban-integration`
prompt: `อยากได้ ideas pixel-agents-main ใส่ลง knowledge-graph + เพิ่มการสั่งงานด้วยเสียง`
datetime: `15-03-2026 01:13:32`

---

## Chore Description
นำแนวคิดจาก pixel-agents-main (VS Code extension ที่แสดง AI agent เป็นตัวละคร pixel art ใน office) มาใส่ใน knowledge-graph kanban board เพื่อให้ agent ที่ทำงานอยู่แสดงเป็นตัวละคร animated pixel art แทน status dot ปัจจุบัน ตัวละครจะ walk ระหว่าง column เมื่อ card ถูกย้าย, typing เมื่อ implement, reading เมื่อ review, และแสดง speech bubble เมื่อรอ input — ทำให้ board มีชีวิตชีวาและเข้าใจสถานะ agent ได้ทันที

เพิ่มเติม: ระบบ Voice Command ที่ให้ user สั่งงาน agent ด้วยเสียง โดยใช้ Web Speech API (SpeechRecognition) ร่วมกับ mic access ที่ audioReactive.ts ใช้อยู่แล้ว รองรับทั้งภาษาไทยและอังกฤษ สั่งได้เช่น "implement card X", "ย้าย card ไป done", "หยุด agent" — ตัวละคร pixel art จะ react ต่อ voice command ด้วย speech bubble แสดงคำสั่งที่ได้รับ

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
Agent ทำงาน → agentEventStore รับ WebSocket event
  → AgentStatusIndicator.svelte:62 แสดง status dot (idle/working/done/error)
  → แค่จุดสี + text label + elapsed timer
  → ไม่มี visual representation ของ agent ที่มีชีวิต

KanbanBoard.svelte:
  → card แสดง AgentStatusIndicator เป็น dot เล็กๆ
  → ไม่เห็นว่า agent กำลังทำอะไร (typing? reading? waiting?)
  → ไม่มี animation เมื่อ card ย้าย column

สั่งงาน:
  → ต้องคลิก card → เปิด StartDialog → เลือก command → กด Start
  → หรือ copy command string → paste ใน terminal
  → ไม่มี hands-free workflow, ต้องใช้ mouse ตลอด
```
**Score: 2/5** — functional แต่ไม่ engaging, ดูแล้วไม่รู้ว่า agent ทำอะไรอยู่จริงๆ + ต้องคลิกหลายขั้นตอน

### TO-BE — Target State
```
Agent ทำงาน → agentEventStore รับ WebSocket event
  → PixelAgentLayer.svelte จับ lifecycle state
  → Character FSM: idle→walk→type/read ตาม agent state
  → ตัวละคร pixel art เดินไปนั่งที่โต๊ะตรง column ที่ card อยู่
  → typing animation เมื่อ state=working + agent=implement/chore
  → reading animation เมื่อ state=working + agent=review/validate
  → speech bubble เมื่อ lifecycle=paused/blocked
  → matrix spawn effect เมื่อ agent เริ่มทำงาน
  → sound notification เมื่อ agent เสร็จ

Voice Command:
  → กดปุ่ม mic (หรือ hold V key) → SpeechRecognition เริ่มฟัง
  → พูด "implement allocation weight" → NLP จับ intent + card match
  → ตัวละครแสดง speech bubble "🎤 implement..."
  → auto-queue command → agent เริ่มทำงาน
  → รองรับทั้งไทย/อังกฤษ: "สั่ง review card นี้", "move to done"
```
**Score: 5/5** — visually rich + hands-free workflow, สั่งงาน agent เหมือนคุยกับทีมงาน

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1   | Canvas overlay บน HTML kanban อาจ block mouse events | Medium | ไม่สามารถ drag card หรือ click button ได้ | ใช้ `pointer-events: none` บน canvas layer, handle click เฉพาะตัวละคร |
| 2   | Sprite assets ขนาดใหญ่ ทำให้ load ช้า | Low | First paint delay | Lazy-load sprites หลัง board render, ใช้ inline base64 สำหรับ fallback |
| 3   | Canvas rendering + rAF loop กิน battery | Medium | Mobile/laptop users drain | ใช้ `requestAnimationFrame` เฉพาะเมื่อมี animation, idle = ไม่ render |
| 4   | Character position sync กับ card DOM position | Medium | ตัวละครลอยผิดที่ | ใช้ ResizeObserver + MutationObserver track column/card DOM rects |
| 5   | Conflict กับ existing KanbanRenderer.ts (Three.js) | Low | สับสนว่าใช้ renderer ไหน | Pixel agent layer เป็น 2D Canvas overlay แยกจาก Three.js renderer |
| 6   | SpeechRecognition ไม่ support บาง browser (Firefox, Safari) | Medium | Voice command ใช้ไม่ได้ใน Firefox | Feature detection + graceful fallback แสดง "Voice not supported" |
| 7   | Voice recognition accuracy ต่ำสำหรับ technical terms | Medium | จับชื่อ card/command ผิด | Fuzzy matching + confirmation dialog ก่อน execute, แสดง top-3 candidates |
| 8   | Mic shared ระหว่าง audioReactive + voiceCommand | Low | Audio visualizer หยุดเมื่อเปิด voice | ใช้ MediaStream เดียว แยก track — AudioContext สำหรับ FFT, SpeechRecognition สำหรับ voice |
| 9   | Background noise trigger false commands | Medium | สั่งผิด command โดยไม่ตั้งใจ | Push-to-talk mode (hold V key), ไม่ใช่ always-on. ต้อง confirm ก่อน execute destructive actions |

---

## Promise.all Impact
**YES — affects agentQueue + commandState** เมื่อ voice command queue งานใหม่ ต้องผ่าน `queueCommand()` → `agentQueue` → `startQueueProcessor()` ซึ่งเป็น async pipeline. Voice command ต้อง await confirmation ก่อน enqueue เพื่อป้องกัน race condition กับ manual button clicks ที่อาจ queue command ซ้ำ

---

## Relevant Files

### ต้องแก้ไข
- `src/components/kanban/KanbanBoard.svelte` — เพิ่ม PixelAgentLayer + VoiceCommandBar components
- `src/components/kanban/AgentStatusIndicator.svelte` — เปลี่ยนจาก dot เป็น mini pixel character (optional)
- `src/lib/types.ts` — เพิ่ม PixelCharacter, CharacterFSMState, VoiceCommand types
- `src/lib/stores/audioReactive.ts` — share MediaStream กับ voice recognition
- `src/lib/stores/commandState.ts` — เพิ่ม voice command source tracking
- `src/components/kanban/SettingsDialog.svelte` — เพิ่ม voice + pixel agent settings

### อ้างอิงจาก pixel-agents-main
- `webview-ui/src/office/engine/characters.ts` — Character FSM logic (idle/walk/type)
- `webview-ui/src/office/sprites/spriteData.ts` — Sprite pixel data format
- `webview-ui/src/office/engine/renderer.ts` — Canvas 2D rendering, z-sort
- `webview-ui/src/office/layout/tileMap.ts` — BFS pathfinding
- `webview-ui/src/office/engine/matrixEffect.ts` — Matrix spawn/despawn
- `src/constants.ts` — Animation timing constants
- `webview-ui/src/notificationSound.ts` — Web Audio chime

### New Files — Pixel Agents
- `src/components/kanban/PixelAgentLayer.svelte` — Canvas overlay component ที่ render ตัวละครทั้งหมด
- `src/lib/renderers/PixelCharacterEngine.ts` — Character FSM, sprite rendering, pathfinding (ported จาก pixel-agents)
- `src/lib/renderers/PixelSpriteData.ts` — Sprite definitions (6 characters, animations, bubbles)
- `src/lib/renderers/PixelMatrixEffect.ts` — Matrix spawn/despawn effect
- `src/lib/stores/pixelAgentState.ts` — Store mapping agent IDs → pixel characters + positions
- `public/assets/pixel-characters/` — Character sprite PNGs (6 diverse characters)

### New Files — Voice Commands
- `src/lib/voice/voiceEngine.ts` — Web Speech API wrapper (SpeechRecognition + intent parsing)
- `src/lib/voice/voiceCommands.ts` — Voice command registry (intent → action mapping)
- `src/lib/voice/voiceMatcher.ts` — Fuzzy card/command name matching (Thai + English)
- `src/lib/stores/voiceState.ts` — Voice recognition state store (listening, transcript, intent)
- `src/components/kanban/VoiceCommandBar.svelte` — Voice UI: mic button, live transcript, confirmation dialog

---

## Architecture: How It Fits

```
                     KanbanBoard.svelte
                    ┌───────────────────────────────────┐
                    │  HTML columns + cards (DOM)        │
                    │                                    │
                    │  ┌─────────────────────────────┐   │
                    │  │  PixelAgentLayer.svelte      │   │  ← Canvas overlay
                    │  │  (position: absolute)        │   │     pointer-events: none
                    │  │  ┌───────────────────────┐   │   │
                    │  │  │PixelCharacterEngine   │   │   │  ← FSM + rendering
                    │  │  └───────────────────────┘   │   │
                    │  └─────────────────────────────┘   │
                    │                                    │
                    │  ┌─────────────────────────────┐   │
                    │  │  VoiceCommandBar.svelte      │   │  ← 🎤 Voice UI
                    │  │  mic button + transcript     │   │     push-to-talk (V key)
                    │  │  + confirmation dialog       │   │
                    │  └─────────────────────────────┘   │
                    └───────────────────────────────────┘
                         ↕              ↕            ↕
              ┌─────────────────┐ ┌──────────┐ ┌─────────────┐
              │pixelAgentState.ts│ │voiceState│ │commandState │
              │(character state) │ │(speech)  │ │(queue cmds) │
              └─────────────────┘ └──────────┘ └─────────────┘
                    ↕        ↕         ↕              ↕
              ┌──────────────┐  ┌──────────────────┐  ┌────────────┐
              │agentEventStore│  │ kanbanState.ts   │  │ agentQueue │
              │(WebSocket)    │  │(card positions)  │  │(execution) │
              └──────────────┘  └──────────────────┘  └────────────┘

Voice Flow:
  🎤 Mic → SpeechRecognition → voiceEngine.ts (parse intent)
       → voiceMatcher.ts (fuzzy match card/command)
       → VoiceCommandBar (show confirmation)
       → commandState.queueCommand() → agentQueue → execute
       → pixelAgentState → character speech bubble "🎤 ..."
```

### Agent State → Character Animation Mapping

| AgentType | Lifecycle State | Character Animation | Reason |
|-----------|-----------------|---------------------|--------|
| implement, chore, feature | working | **typing** | กำลังเขียนโค้ด |
| review, validate, security | working | **reading** | กำลังอ่าน/ตรวจ |
| test | working | **typing** | กำลังรัน test |
| docs | working | **reading** | กำลังเขียน docs |
| breakdown, estimate | working | **reading** | กำลังวิเคราะห์ |
| deploy | working | **typing** | กำลัง deploy |
| * | idle | **idle** (wander) | ยังไม่ได้รับงาน |
| * | paused | **idle** + speech bubble "..." | รอ input |
| * | completed | **idle** + speech bubble "✓" | เสร็จแล้ว |
| * | failed | **idle** + speech bubble "✗" (red) | error |
| * | blocked | **idle** + speech bubble "⏳" | รอ dependency |

### Character Position Logic

```
Column DOM rect → column center X, top Y
  → Each active agent in column gets a "desk position"
  → Desk positions stacked vertically (card Y + offset)
  → When card moves column:
    1. Character starts walking animation
    2. BFS path from old position → new column position
    3. Arrives → sits down → resumes tool animation
```

---

## Step by Step Tasks

### 1. สร้าง Sprite Data Module
**File:** `src/lib/renderers/PixelSpriteData.ts` (new)
- Port sprite format จาก pixel-agents `spriteData.ts`
- แปลง character sprites เป็น 2D hex array (16×32 per frame)
- 6 characters, 7 frames each (walk1, walk2, walk3, type1, type2, read1, read2)
- 3 direction rows (down, up, right; left = flipped right)
- Speech bubble sprites (permission "...", done "✓", error "✗", blocked "⏳")

```typescript
// Sprite format (same as pixel-agents)
export type SpriteData = (string | null)[][];  // rows of hex color or null

export interface CharacterSprites {
  down: SpriteData[];   // 7 frames
  up: SpriteData[];
  right: SpriteData[];
  // left = mirror of right at render time
}

export const PIXEL_CHARACTERS: CharacterSprites[] = [
  // 6 diverse character palettes
  // Load from PNGs at runtime (same pipeline as pixel-agents)
];

export const SPEECH_BUBBLES: Record<string, SpriteData> = {
  permission: /* amber dots */,
  done: /* green check */,
  error: /* red X */,
  blocked: /* hourglass */,
};
```

### 2. สร้าง Character Engine (FSM + Rendering)
**File:** `src/lib/renderers/PixelCharacterEngine.ts` (new)
- Port character FSM จาก pixel-agents `characters.ts`
- States: `idle` | `walk` | `type` | `read`
- BFS pathfinding สำหรับ walk animation (simplified — 1D path ระหว่าง columns)
- Canvas 2D rendering: sprite draw, z-sort, speech bubbles
- Pixel-perfect zoom (integer scaling)

```typescript
export interface PixelCharacter {
  id: string;             // agent session/card ID
  palette: number;        // 0-5 character skin
  x: number; y: number;   // pixel position on canvas
  targetX: number; targetY: number;  // walk destination
  state: 'idle' | 'walk' | 'type' | 'read';
  direction: 'down' | 'up' | 'left' | 'right';
  frame: number;
  frameTimer: number;
  bubble: string | null;  // speech bubble type
  bubbleTimer: number;
}

export class PixelCharacterEngine {
  private characters: Map<string, PixelCharacter> = new Map();
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animFrameId: number | null = null;
  private lastTime: number = 0;

  constructor(canvas: HTMLCanvasElement) { ... }

  // Add/remove characters
  spawn(id: string, x: number, y: number, palette: number): void { ... }
  despawn(id: string): void { ... }

  // Update character state from agent lifecycle
  setCharacterState(id: string, state: 'idle' | 'walk' | 'type' | 'read'): void { ... }
  moveTo(id: string, x: number, y: number): void { ... }  // triggers walk
  showBubble(id: string, type: string): void { ... }
  hideBubble(id: string): void { ... }

  // Game loop
  start(): void { ... }
  stop(): void { ... }
  private tick(time: number): void { ... }  // update + render
  private render(): void { ... }            // clear + draw all characters z-sorted
}
```

### 3. สร้าง Matrix Effect Module
**File:** `src/lib/renderers/PixelMatrixEffect.ts` (new)
- Port matrix spawn/despawn effect จาก pixel-agents `matrixEffect.ts`
- Green digital rain sweep (0.3s duration)
- Spawn: rain reveals character pixels
- Despawn: rain consumes character pixels

### 4. สร้าง Pixel Agent State Store
**File:** `src/lib/stores/pixelAgentState.ts` (new)
- Svelte store ที่ map agent lifecycle events → pixel character state
- Subscribe to `agentLiveStatuses` จาก `agentEventStore.ts`
- Subscribe to `kanbanCards` จาก `kanbanState.ts` สำหรับ card position

```typescript
import { derived, writable } from 'svelte/store';
import { agentLiveStatuses } from './agentEventStore';
import { kanbanCards } from './kanbanState';
import type { AgentType, CardLifecycleState } from '../types';

export interface PixelAgentMapping {
  agentId: string;
  cardId: string;
  palette: number;
  columnId: string;      // current kanban column
  agentType: AgentType;
  lifecycle: CardLifecycleState;
  characterState: 'idle' | 'walk' | 'type' | 'read';
  bubble: string | null;
}

// Map agentType → character animation
function agentToAnimation(agent: AgentType, lifecycle: CardLifecycleState): 'idle' | 'type' | 'read' {
  if (lifecycle !== 'running') return 'idle';
  switch (agent) {
    case 'implement': case 'chore': case 'feature': case 'test': case 'deploy':
      return 'type';
    case 'review': case 'validate': case 'security': case 'docs': case 'breakdown': case 'estimate':
      return 'read';
    default:
      return 'type';
  }
}

// Map lifecycle → speech bubble
function lifecycleToBubble(lifecycle: CardLifecycleState): string | null {
  switch (lifecycle) {
    case 'paused':    return 'permission';
    case 'completed': return 'done';
    case 'failed':    return 'error';
    case 'blocked':   return 'blocked';
    default:          return null;
  }
}

export const pixelAgents = writable<Map<string, PixelAgentMapping>>(new Map());
```

### 5. สร้าง PixelAgentLayer Component
**File:** `src/components/kanban/PixelAgentLayer.svelte` (new)
- Canvas overlay component (position: absolute, pointer-events: none)
- Initialize `PixelCharacterEngine` with canvas ref
- Subscribe to `pixelAgents` store → sync characters
- Track column DOM positions via `ResizeObserver`
- Enable/disable toggle ใน SettingsDialog

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { PixelCharacterEngine } from '../../lib/renderers/PixelCharacterEngine';
  import { pixelAgents } from '../../lib/stores/pixelAgentState';

  let canvas: HTMLCanvasElement;
  let engine: PixelCharacterEngine;

  // Track column positions from DOM
  let columnRects = new Map<string, DOMRect>();

  onMount(() => {
    engine = new PixelCharacterEngine(canvas);
    engine.start();

    // Subscribe to agent state changes
    const unsub = pixelAgents.subscribe(agents => {
      syncCharacters(agents);
    });

    return () => {
      unsub();
      engine.stop();
    };
  });

  function syncCharacters(agents: Map<string, PixelAgentMapping>) {
    // Spawn new, despawn removed, update state for existing
  }
</script>

<canvas
  bind:this={canvas}
  class="pixel-agent-canvas"
  style="position: absolute; inset: 0; pointer-events: none; z-index: 10;"
></canvas>
```

### 6. สร้าง Sound Notification Module
**File:** `src/lib/stores/pixelAgentSound.ts` (new)
- Port Web Audio chime จาก pixel-agents `notificationSound.ts`
- Ascending two-note chime (E5 → E6) เมื่อ agent เสร็จ
- Toggle enable/disable ผ่าน settings
- `unlockAudio()` on first user interaction

### 7. เพิ่ม Pixel Agent Layer ใน KanbanBoard
**File:** `src/components/kanban/KanbanBoard.svelte`
- Import และ render `PixelAgentLayer` component
- Pass column DOM refs สำหรับ position tracking
- เพิ่ม toggle switch ใน header ("Show Agents" checkbox)

```svelte
<!-- เพิ่มหลัง column rendering -->
{#if showPixelAgents}
  <PixelAgentLayer {columnRefs} />
{/if}
```

### 8. เพิ่ม Settings สำหรับ Pixel Agents
**File:** `src/components/kanban/SettingsDialog.svelte`
- เพิ่ม section "Pixel Agents" ใน settings
- Toggle: Show pixel agents (default: on)
- Toggle: Sound notifications (default: off)
- Toggle: Matrix effects (default: on)
- Slider: Animation speed (50%–200%)

### 9. เพิ่ม Character Sprite Assets
**Directory:** `public/assets/pixel-characters/`
- Copy 6 character PNGs จาก pixel-agents (`char_0.png` – `char_5.png`)
- Copy speech bubble sprites
- หมายเหตุ: pixel-agents characters based on JIK-A-4 Metro City (check license compatibility — MIT licensed project)

### 10. Wire Up Agent Events → Pixel State
**File:** `src/lib/stores/initStores.ts`
- เพิ่ม initialization ของ pixelAgentState store
- Subscribe agentLiveStatuses → pixelAgents mapping
- Subscribe kanbanCards → position updates

---

## Part 2: Voice Commands (สั่งงานด้วยเสียง)

### 11. สร้าง Voice Engine (Web Speech API Wrapper)
**File:** `src/lib/voice/voiceEngine.ts` (new)
- Wrap `SpeechRecognition` / `webkitSpeechRecognition` with feature detection
- Support dual language: `th-TH` (default) + `en-US` (switchable)
- Push-to-talk mode: start on call, stop on release (ไม่ใช่ continuous)
- Emit events: `onResult(transcript, isFinal)`, `onError(error)`, `onEnd()`
- Share mic stream กับ audioReactive.ts เมื่อทั้งสองเปิดพร้อมกัน

```typescript
export interface VoiceEngineOptions {
  lang: 'th-TH' | 'en-US';
  continuous: boolean;
  interimResults: boolean;
}

export class VoiceEngine {
  private recognition: SpeechRecognition | null = null;
  private _isListening = false;

  static isSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  constructor(options?: Partial<VoiceEngineOptions>) {
    if (!VoiceEngine.isSupported()) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = options?.lang ?? 'th-TH';
    this.recognition.continuous = options?.continuous ?? false;
    this.recognition.interimResults = options?.interimResults ?? true;
  }

  start(): void { ... }
  stop(): void { ... }
  get isListening(): boolean { return this._isListening; }

  onResult: (transcript: string, isFinal: boolean) => void = () => {};
  onError: (error: string) => void = () => {};
  onEnd: () => void = () => {};
}
```

### 12. สร้าง Voice Command Registry
**File:** `src/lib/voice/voiceCommands.ts` (new)
- Map voice intents → kanban actions
- รองรับทั้ง Thai + English phrases

```typescript
export interface VoiceIntent {
  action: 'run_command' | 'move_card' | 'pause_agent' | 'resume_agent' | 'create_card' | 'select_card';
  command?: string;        // e.g., '/implement', '/review'
  cardQuery?: string;      // fuzzy card name/ID
  targetColumn?: string;   // for move_card
  confidence: number;      // 0-1
}

// Intent patterns (Thai + English)
const INTENT_PATTERNS: Array<{
  pattern: RegExp;
  lang: 'th' | 'en' | 'both';
  extract: (match: RegExpMatchArray) => Partial<VoiceIntent>;
}> = [
  // English patterns
  { pattern: /^(run|start|execute)\s+(\/?\w+)\s+(?:on\s+)?(.+)/i, lang: 'en',
    extract: m => ({ action: 'run_command', command: m[2], cardQuery: m[3] }) },
  { pattern: /^implement\s+(.+)/i, lang: 'en',
    extract: m => ({ action: 'run_command', command: '/implement', cardQuery: m[1] }) },
  { pattern: /^review\s+(.+)/i, lang: 'en',
    extract: m => ({ action: 'run_command', command: '/review', cardQuery: m[1] }) },
  { pattern: /^test\s+(.+)/i, lang: 'en',
    extract: m => ({ action: 'run_command', command: '/test', cardQuery: m[1] }) },
  { pattern: /^deploy\s+(.+)/i, lang: 'en',
    extract: m => ({ action: 'run_command', command: '/deploy', cardQuery: m[1] }) },
  { pattern: /^move\s+(.+?)\s+to\s+(\w+)/i, lang: 'en',
    extract: m => ({ action: 'move_card', cardQuery: m[1], targetColumn: m[2] }) },
  { pattern: /^(pause|stop|hold)\s*(.+)?/i, lang: 'en',
    extract: m => ({ action: 'pause_agent', cardQuery: m[2] }) },
  { pattern: /^(resume|continue)\s*(.+)?/i, lang: 'en',
    extract: m => ({ action: 'resume_agent', cardQuery: m[2] }) },
  { pattern: /^(create|new)\s+(card|task)\s+(.+)/i, lang: 'en',
    extract: m => ({ action: 'create_card', cardQuery: m[3] }) },
  { pattern: /^(select|show|open)\s+(.+)/i, lang: 'en',
    extract: m => ({ action: 'select_card', cardQuery: m[2] }) },

  // Thai patterns
  { pattern: /^(สั่ง|รัน|เริ่ม)\s*(\/?\w+)\s+(.+)/i, lang: 'th',
    extract: m => ({ action: 'run_command', command: m[2], cardQuery: m[3] }) },
  { pattern: /^(implement|อิมพลีเมนต์)\s+(.+)/i, lang: 'th',
    extract: m => ({ action: 'run_command', command: '/implement', cardQuery: m[2] }) },
  { pattern: /^(รีวิว|review)\s+(.+)/i, lang: 'th',
    extract: m => ({ action: 'run_command', command: '/review', cardQuery: m[2] }) },
  { pattern: /^(ย้าย|move)\s+(.+?)\s+(ไป|to)\s+(.+)/i, lang: 'th',
    extract: m => ({ action: 'move_card', cardQuery: m[2], targetColumn: m[4] }) },
  { pattern: /^(หยุด|พัก)\s*(.+)?/i, lang: 'th',
    extract: m => ({ action: 'pause_agent', cardQuery: m[2] }) },
  { pattern: /^(ต่อ|ทำต่อ)\s*(.+)?/i, lang: 'th',
    extract: m => ({ action: 'resume_agent', cardQuery: m[2] }) },
  { pattern: /^(สร้าง|เพิ่ม)\s*(card|การ์ด|task|งาน)\s+(.+)/i, lang: 'th',
    extract: m => ({ action: 'create_card', cardQuery: m[3] }) },
  { pattern: /^(เลือก|ดู|เปิด)\s+(.+)/i, lang: 'th',
    extract: m => ({ action: 'select_card', cardQuery: m[2] }) },
];

export function parseVoiceIntent(transcript: string): VoiceIntent | null { ... }
```

### 13. สร้าง Voice Fuzzy Matcher
**File:** `src/lib/voice/voiceMatcher.ts` (new)
- Fuzzy match voice transcript กับ card labels ใน kanban
- ใช้ Levenshtein distance + token overlap scoring
- Return top-3 candidates with confidence scores
- รองรับ partial match: "allocation" → match "allocation-weight-fix"

```typescript
export interface MatchCandidate {
  cardId: string;
  cardLabel: string;
  score: number;      // 0-1 confidence
  matchType: 'exact' | 'fuzzy' | 'partial';
}

export function matchCardByVoice(
  query: string,
  cards: KanbanCard[],
  topN?: number,
): MatchCandidate[] { ... }

export function matchColumnByVoice(
  query: string,
  columns: KanbanColumnDef[],
): KanbanStatus | null { ... }
```

### 14. สร้าง Voice State Store
**File:** `src/lib/stores/voiceState.ts` (new)
- Svelte store สำหรับ voice recognition state
- Track: isListening, transcript (interim + final), parsed intent, match candidates

```typescript
import { writable, derived } from 'svelte/store';
import type { VoiceIntent, MatchCandidate } from '../voice/voiceCommands';

export const voiceListening = writable(false);
export const voiceTranscript = writable('');           // live interim text
export const voiceFinalTranscript = writable('');      // last final result
export const voiceIntent = writable<VoiceIntent | null>(null);
export const voiceCandidates = writable<MatchCandidate[]>([]);
export const voiceError = writable<string | null>(null);
export const voiceLang = writable<'th-TH' | 'en-US'>('th-TH');
export const voiceEnabled = writable(false);           // feature toggle
export const voiceConfirmRequired = writable(true);    // require confirm before execute

// Convenience derived
export const voiceHasIntent = derived(voiceIntent, i => i !== null);
```

### 15. สร้าง VoiceCommandBar Component
**File:** `src/components/kanban/VoiceCommandBar.svelte` (new)
- Fixed position bar ด้านล่างของ kanban board
- ปุ่ม mic (กดค้าง = push-to-talk, หรือ hold V key)
- แสดง live transcript ขณะพูด
- เมื่อ parse intent ได้ → แสดง confirmation card:
  - "🎤 implement → [card name]?" + [Confirm] [Cancel]
  - Top-3 candidates ถ้า fuzzy match
- Language toggle: 🇹🇭 TH / 🇺🇸 EN
- Visual feedback: mic icon pulse animation ขณะ listening
- Speech bubble บนตัวละคร pixel art แสดงคำสั่งที่ได้รับ

```svelte
<script lang="ts">
  import { voiceListening, voiceTranscript, voiceIntent,
           voiceCandidates, voiceLang, voiceEnabled } from '../../lib/stores/voiceState';
  import { VoiceEngine } from '../../lib/voice/voiceEngine';
  import { parseVoiceIntent } from '../../lib/voice/voiceCommands';
  import { matchCardByVoice } from '../../lib/voice/voiceMatcher';
  import { queueCommand } from '../../lib/stores/commandState';
  import { kanbanCards, moveCard } from '../../lib/stores/kanbanState';

  let engine: VoiceEngine;
  let holdTimer: ReturnType<typeof setTimeout> | null = null;

  // V key push-to-talk
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'v' && !e.repeat && !isInputFocused()) {
      startListening();
    }
  }
  function handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'v') {
      stopListening();
    }
  }

  function startListening() { ... }
  function stopListening() { ... }
  function confirmIntent() { ... }  // execute the parsed command
  function cancelIntent() { ... }
</script>

{#if $voiceEnabled}
  <div class="voice-bar" class:listening={$voiceListening}>
    <!-- Mic button -->
    <button class="mic-btn" class:active={$voiceListening}
            onmousedown={startListening} onmouseup={stopListening}>
      🎤
    </button>

    <!-- Live transcript -->
    {#if $voiceListening || $voiceTranscript}
      <span class="transcript">{$voiceTranscript || 'Listening...'}</span>
    {/if}

    <!-- Parsed intent confirmation -->
    {#if $voiceIntent}
      <div class="intent-card">
        <span class="intent-action">{$voiceIntent.action}</span>
        {#if $voiceIntent.command}
          <code>{$voiceIntent.command}</code>
        {/if}
        <span>→</span>
        <!-- Top candidates -->
        {#each $voiceCandidates.slice(0, 3) as candidate, i}
          <button class="candidate" class:selected={i === 0}
                  onclick={() => selectCandidate(candidate)}>
            {candidate.cardLabel} ({Math.round(candidate.score * 100)}%)
          </button>
        {/each}
        <button class="confirm-btn" onclick={confirmIntent}>✓</button>
        <button class="cancel-btn" onclick={cancelIntent}>✗</button>
      </div>
    {/if}

    <!-- Language toggle -->
    <button class="lang-toggle" onclick={toggleLang}>
      {$voiceLang === 'th-TH' ? '🇹🇭' : '🇺🇸'}
    </button>
  </div>
{/if}
```

### 16. Integrate Voice → Pixel Agent Speech Bubbles
**File:** `src/lib/stores/pixelAgentState.ts` (update)
- เมื่อ voice command ถูก confirm → แสดง speech bubble "🎤 /implement..." บนตัวละครที่ถูกสั่ง
- Bubble แสดง 3 วินาที แล้ว fade

```typescript
// เพิ่มใน pixelAgentState.ts
import { voiceIntent } from './voiceState';

// Subscribe to confirmed voice commands
voiceIntent.subscribe(intent => {
  if (!intent || !intent.cardQuery) return;
  // Find character for target card → show voice bubble
  const agentId = findAgentForCard(intent.cardQuery);
  if (agentId) {
    showVoiceBubble(agentId, intent.command ?? intent.action);
  }
});
```

---

## Validation Commands

```bash
# Build check
cd /Users/grammer/Documents/git-central/knowledge/projects/knowledge-graph
pnpm run build 2>&1 | tail -20

# Type check
pnpm run check 2>&1 | tail -20

# Verify new pixel agent files exist
ls -la src/lib/renderers/Pixel*.ts
ls -la src/components/kanban/PixelAgentLayer.svelte
ls -la src/lib/stores/pixelAgentState.ts

# Verify new voice command files exist
ls -la src/lib/voice/
ls -la src/components/kanban/VoiceCommandBar.svelte
ls -la src/lib/stores/voiceState.ts

# Grep ยืนยัน integration
grep -n "PixelAgentLayer" src/components/kanban/KanbanBoard.svelte
grep -n "VoiceCommandBar" src/components/kanban/KanbanBoard.svelte
grep -n "pixelAgents" src/lib/stores/initStores.ts
grep -n "voiceEnabled" src/components/kanban/SettingsDialog.svelte
grep -n "SpeechRecognition" src/lib/voice/voiceEngine.ts

# E2E test
npx playwright test e2e/kanban-e2e.spec.ts 2>&1 | tail -20
```

---

## Notes

### License
- pixel-agents ใช้ MIT License — สามารถ port code ได้
- Character sprites based on JIK-A-4 Metro City pack — ต้องเช็ค license terms สำหรับ redistribution
- อาจต้องสร้าง custom sprites ใหม่ถ้า license ไม่อนุญาต

### ความแตกต่างจาก pixel-agents
| Aspect | pixel-agents | knowledge-graph integration |
|--------|-------------|---------------------------|
| Rendering | Full office with furniture | Characters overlay บน HTML kanban |
| Position | Tile-based grid | DOM-relative (track column/card rects) |
| Agent source | JSONL file watching | WebSocket events from event-server |
| Character count | 1 per terminal | 1 per active agent on board |
| Persistence | VS Code workspaceState | kanbanDB (SQLite) |

### Voice Command — Technical Notes
- **Web Speech API** (`SpeechRecognition`) support: Chrome ✅, Edge ✅, Safari ✅ (partial), Firefox ❌
- ใช้ `webkitSpeechRecognition` fallback สำหรับ Safari
- Thai recognition quality ขึ้นกับ Google's speech service — ชื่อ technical ภาษาอังกฤษปนไทยอาจจับได้ไม่ดี → fuzzy matching ช่วย
- Push-to-talk (V key) ดีกว่า always-on เพราะ: (1) ไม่กิน battery (2) ไม่ trigger false commands (3) ชัดเจนว่าเมื่อไหร่ user ตั้งใจสั่ง
- Mic permission ถ้า audioReactive เปิดอยู่ → reuse stream ได้เลย, ไม่ต้องขอ permission ซ้ำ

### audioReactive.ts Shared Stream Design
```
getUserMedia({ audio: true })
  → MediaStream
     ├── AudioContext.createMediaStreamSource() → AnalyserNode (FFT for visuals)
     └── SpeechRecognition (voice commands)

เมื่อ audioReactive เปิดอยู่แล้ว:
  voiceEngine.start() → reuse existing stream
  voiceEngine.stop() → ไม่ปิด stream (audioReactive ยังใช้)

เมื่อ audioReactive ปิด:
  voiceEngine.start() → getUserMedia ใหม่
  voiceEngine.stop() → ปิด stream
```

### Future Ideas (ไม่ต้องทำตอนนี้)
1. **Office mode** — full office layout editor เหมือน pixel-agents (Sprint 4+)
2. **3D pixel agents** — render ตัวละครใน Three.js KanbanRenderer
3. **Custom character uploads** — ให้ user upload sprite sheets ของตัวเอง
4. **Agent conversations** — speech bubbles แสดง last action text แทน status only
5. **Desk = Card** — ตัวละครนั่งโต๊ะที่ link กับ specific card ไม่ใช่แค่ column
6. **Voice-to-Claude** — ส่ง voice transcript ตรงไปที่ Claude agent เป็น prompt (ไม่แค่ kanban action)
7. **Voice feedback** — ใช้ Web Speech Synthesis (TTS) ให้ agent ตอบกลับด้วยเสียง "เริ่ม implement แล้วครับ"
8. **Wake word** — "Hey Agent" หรือ "สวัสดี Agent" เพื่อเริ่ม listening โดยไม่ต้องกดปุ่ม
9. **Voice macros** — สร้าง custom voice shortcuts เช่น "full pipeline" = /breakdown → /implement → /test → /review
