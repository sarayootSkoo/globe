# Chore: Agent Orchestration Ecosystem — ระบบจัดการ Agent อัตโนมัติ

## Metadata
adw_id: `agent-orchestration-ecosystem`
prompt: `adjust kanban system to powerful ecosystem for assign task to agent`
datetime: `14-03-2026 00:48:29`

---

## Chore Description
ระบบ kanban ปัจจุบันมี auto-claim engine ที่ assign agent ให้กับ card อัตโนมัติแล้ว แต่ยังขาดความสามารถในการ orchestrate agent ทั้ง pipeline — ยังไม่มี auto-launch, agent queue, auto-advance (card เสร็จแล้วเลื่อน column + เรียก agent ถัดไปอัตโนมัติ), concurrency control, และ batch operations. Feature นี้จะยกระดับ kanban จากระบบ manual เป็น **Agent Orchestration Ecosystem** ที่สามารถ run SDLC pipeline ตั้งแต่ design → done โดย agent ทำงานต่อเนื่องอัตโนมัติ

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[Card ย้ายเข้า column 'task']
  → autoClaimEngine assign agent + lifecycle='claimed'        (auto)
  → User กด card → StartDialog → เลือก "Launch Claude"       (manual)
  → launchAgent() POST /agent/pty → agent ทำงาน              (manual trigger)
  → agent เสร็จ → lifecycle='completed'                       (auto via WS)
  → User ลาก card ไป column ถัดไป                             (manual)
  → User กด Start อีกครั้ง → launch agent ถัดไป              (manual)
  → ซ้ำทุก column จนถึง 'done'

ปัญหา:
- ทุก transition ต้อง manual (4-5 clicks per column × 6 columns = ~30 clicks per card)
- ไม่มี queue → ถ้า launch 10 agents พร้อมกัน จะ overload
- ไม่มี auto-advance → card ค้างที่ 'completed' จนกว่า user มาดู
- ไม่มี batch operations → ต้องทำทีละ card
```
**Score: 2/5** — Auto-claim ช่วยแค่ step แรก (assign agent) แต่ทุก step หลังจากนั้นยัง manual ทั้งหมด

### TO-BE — Target State
```
[Card ย้ายเข้า column 'task']
  → autoClaimEngine assign agent + lifecycle='claimed'        (auto - มีอยู่แล้ว)
  → ★ orchestrationEngine ดู autoLaunch setting:
      mode='auto' → launchAgent() ทันที (ผ่าน queue)
      mode='confirm' → รอ user กด Launch (behavior เดิม)
  → ★ agentQueue จัดลำดับ:
      concurrency=2 → run ได้ 2 agents พร้อมกัน
      ที่เหลือรอ queue (FIFO + priority)
  → agent เสร็จ → lifecycle='completed'
  → ★ autoAdvance engine:
      ตรวจ COMMAND_REGISTRY[currentCommand].movesTo → ย้าย card อัตโนมัติ
      assign agent ถัดไป จาก AGENT_SUGGEST_RULES[newColumn]
      enqueue ใน agentQueue → auto-launch ถ้า mode='auto'
  → ★ pipeline runs autonomously: design → task → develop → testing → validate → docs → done
  → ★ batch: เลือกหลาย cards → "Launch All" button

Dashboard:
  → ★ Agent Queue Panel: แสดง queue, running, completed, failed
  → ★ Concurrency slider: 1-5 agents
  → ★ Auto-launch toggle: auto / confirm
  → ★ Pipeline progress: visual indicator per card
```
**Score: 5/5** — Full autonomous SDLC pipeline, user เป็น supervisor ไม่ใช่ operator

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1   | Auto-launch agent ทำงานผิด column → ผลลัพธ์ผิด | High | เสีย token, output ไม่ตรง | เช็ค `canRunCommand()` ก่อน launch ทุกครั้ง + validate column × agent mapping |
| 2   | Concurrency สูงเกินไป → Claude rate limit / resource exhaustion | High | Agent fail กลางคัน | Default concurrency=2, max=5, queue overflow → pause + notify |
| 3   | Auto-advance loop ไม่สิ้นสุด (card วน column) | Critical | Infinite agent spawning | Max pipeline depth=10, detect cycle (visited columns set), emergency stop |
| 4   | Agent fail → auto-retry → fail loop | High | เสีย token ซ้ำ | Max retry=2, exponential backoff, หลัง max retry → lifecycle='failed' + notify |
| 5   | Batch launch 50 cards → overwhelm system | Medium | Queue backlog | Queue size limit=20, reject with notification ถ้าเกิน |
| 6   | Browser close ระหว่าง pipeline → orphan agents | Medium | Agent ทำงานต่อไม่มีคนดู | เดิมมี `stopAllAgents` on beforeunload + server-side timeout 30min |

---

## Promise.all Impact
**YES — affects agent launch flow** เพราะ queue system ต้อง manage async agent lifecycle:
- `enqueue()` → return Promise ที่ resolve เมื่อ agent เสร็จ
- `autoAdvance` ต้อง await completion ก่อน move card + launch ถัดไป
- Race condition: 2 agents complete พร้อมกัน ต้อง serialize auto-advance updates

Mitigation: ใช้ sequential processing ใน queue consumer (process one completion at a time)

---

## Relevant Files

- `src/lib/stores/kanbanState.ts` — core state, `assignAgent()`, `updateLifecycle()`, `moveCard()`
- `src/lib/stores/autoClaimEngine.ts` — auto-claim logic (จะ integrate กับ orchestration)
- `src/lib/stores/agentEventStore.ts` — WebSocket events, `processEvent()`, lifecycle tracking
- `src/lib/workflow/commandRegistry.ts` — `COMMAND_REGISTRY`, `canRunCommand()`, `getCommandsForColumn()`
- `src/lib/types.ts` — `CardLifecycleState`, `KanbanCard`, `AgentType`
- `src/components/kanban/KanbanBoard.svelte` — `launchAgent()`, dialog handlers, UI
- `scripts/event-server.mjs` — `/agent/pty`, `/agent/stop`, session management

### New Files
- `src/lib/stores/agentQueue.ts` — Agent Queue + Concurrency Manager + Auto-Launch logic
- `src/lib/stores/autoAdvanceEngine.ts` — Auto-advance engine (completed → move → next agent)
- `src/lib/stores/orchestrationSettings.ts` — Orchestration settings (persist via kanbanDB)
- `src/components/kanban/QueuePanel.svelte` — Agent Queue UI panel
- `src/components/kanban/PipelineProgress.svelte` — Per-card pipeline progress indicator

---

## Step by Step Tasks

### 1. สร้าง Orchestration Settings Store
**File:** `src/lib/stores/orchestrationSettings.ts` (new)
- สร้าง persisted settings via `kanbanDB`:
  - `launchMode`: `'auto' | 'confirm'` — default `'confirm'` (safe default)
  - `maxConcurrency`: `number` — default `2`, range 1-5
  - `autoAdvanceEnabled`: `boolean` — default `false` (opt-in)
  - `maxRetries`: `number` — default `2`
  - `maxPipelineDepth`: `number` — default `10`
  - `queueMaxSize`: `number` — default `20`

```typescript
// Before: ไม่มี orchestration settings
// After:
export const orchestrationSettings = writable<OrchestrationConfig>(
  kanbanDB.get('orchestration', DEFAULT_SETTINGS)
);
```

### 2. สร้าง Agent Queue System
**File:** `src/lib/stores/agentQueue.ts` (new)
- สร้าง `QueueItem` interface:
  ```typescript
  interface QueueItem {
    id: string;
    cardId: string;
    command: string;
    args: string;
    priority: number;      // higher = first
    status: 'queued' | 'running' | 'completed' | 'failed';
    retryCount: number;
    enqueuedAt: number;
    startedAt?: number;
    completedAt?: number;
    error?: string;
  }
  ```
- สร้าง `agentQueue` writable store — `QueueItem[]`
- สร้าง `runningCount` derived store — จำนวน items ที่ status='running'
- สร้าง `enqueue(cardId, command, args, priority?)` function:
  - เช็ค queue size < maxSize
  - เช็ค `canRunCommand()` ก่อน enqueue
  - เพิ่ม item เข้า queue sorted by priority
  - trigger `processQueue()`
- สร้าง `processQueue()` function:
  - ถ้า runningCount < maxConcurrency → dequeue item ที่ priority สูงสุด
  - call `launchAgentFromQueue(item)` — POST `/agent/pty`
  - update item status='running'
- สร้าง `onAgentComplete(cardId, success)` function:
  - update item status='completed' | 'failed'
  - ถ้า failed + retryCount < maxRetries → re-enqueue with retryCount++
  - trigger `processQueue()` เพื่อ dequeue ตัวถัดไป
  - ถ้า autoAdvanceEnabled → trigger auto-advance

```typescript
// Before: launchAgent() ใน KanbanBoard.svelte เรียก fetch() ตรงๆ
// After: ผ่าน queue
async function launchAgent(command, args, cardId) {
  enqueue(cardId, command, args);  // queue จัดการ concurrency
}
```

### 3. สร้าง Auto-Advance Engine
**File:** `src/lib/stores/autoAdvanceEngine.ts` (new)
- สร้าง `autoAdvance(cardId)` function ที่ถูกเรียกเมื่อ agent complete:
  1. หา current card + column
  2. หา command ที่เพิ่ง run (`lastCommand` จาก iterationStates)
  3. ดู `COMMAND_REGISTRY[command].movesTo` → target column
  4. ถ้า `staysInColumn=true` → ไม่ advance, แค่ mark completed
  5. เรียก `moveCard(cardId, targetColumn)`
  6. หา next agent จาก `AGENT_SUGGEST_RULES[targetColumn]`
  7. ถ้ามี next agent → `assignAgent(cardId, nextAgent)`
  8. ถ้า `launchMode='auto'` → `enqueue(cardId, nextCommand, args)`
  9. Track visited columns → ถ้า depth > maxPipelineDepth → stop + notify

```typescript
// Pipeline flow example:
// /chore completes in 'create' → movesTo 'design'
//   → assign 'breakdown' → auto-launch /breakdown
//     → movesTo 'task' → assign 'implement' → auto-launch /implement
//       → movesTo 'testing' → assign 'test' → auto-launch /test
//         → movesTo 'validate' → assign 'validate' → ...
//           → movesTo 'done' → pipeline complete ✅
```

- สร้าง `pipelineProgress` derived store:
  ```typescript
  // cardId → { totalSteps, completedSteps, currentStep, visitedColumns }
  ```

### 4. Integrate Queue กับ agentEventStore
**File:** `src/lib/stores/agentEventStore.ts` (line 132-155, `processEvent` command:completed/failed)
- เมื่อได้ `command:completed` event → เรียก `onAgentComplete(cardId, true)`
- เมื่อได้ `command:failed` event → เรียก `onAgentComplete(cardId, false)`
- เพิ่ม import จาก `agentQueue`

```typescript
// Before (processEvent, command:completed case):
if (cardId) {
  updateLifecycle(cardId, 'completed');
}

// After:
if (cardId) {
  updateLifecycle(cardId, 'completed');
  onAgentComplete(cardId, true);  // ★ trigger queue + auto-advance
}
```

### 5. Integrate Queue กับ KanbanBoard launchAgent
**File:** `src/components/kanban/KanbanBoard.svelte` (line 250-275, `launchAgent`)
- เปลี่ยน `launchAgent()` จาก direct fetch → ผ่าน queue
- ใน `handleStartConfirm()` (line 278-304): ถ้า `launchMode='auto'` ไม่ต้องแสดง dialog

```typescript
// Before:
async function launchAgent(command, args, cardId) {
  const res = await fetch(`${EVENT_SERVER}/agent/pty`, { ... });
  ...
}

// After:
async function launchAgent(command, args, cardId) {
  enqueue(cardId, command, args);  // queue handles concurrency + launch
}
```

### 6. Integrate Auto-Launch กับ autoClaimEngine
**File:** `src/lib/stores/autoClaimEngine.ts` (line 99-119, `startAutoClaim`)
- หลัง auto-claim assign agent → ถ้า `launchMode='auto'`:
  - ดึง command จาก `AGENT_DEFS[agent].command`
  - เรียก `enqueue(cardId, command, args)` เพื่อ auto-launch

```typescript
// Before (startAutoClaim debounce callback):
assignAgent(card.node.id, suggestedAgent.agent);
updateLifecycle(card.node.id, 'claimed');

// After:
assignAgent(card.node.id, suggestedAgent.agent);
updateLifecycle(card.node.id, 'claimed');
if (get(orchestrationSettings).launchMode === 'auto') {
  const cmd = AGENT_DEFS[suggestedAgent.agent]?.command;
  if (cmd) {
    const args = card.artifactPath || card.filePath || `"${card.node.label}"`;
    enqueue(card.node.id, cmd, args);
  }
}
```

### 7. สร้าง Queue Panel UI
**File:** `src/components/kanban/QueuePanel.svelte` (new)
- แสดง queue items: queued (pending), running, recently completed/failed
- แสดง running count / max concurrency
- ปุ่ม: Pause Queue, Clear Queue, Retry Failed
- แต่ละ item: card title, command, status badge, elapsed time, cancel button

### 8. สร้าง Pipeline Progress Indicator
**File:** `src/components/kanban/PipelineProgress.svelte` (new)
- Mini progress bar แสดงบน card:
  - SDLC columns เป็น dots: ○ ○ ● ○ ○ ○ (● = current)
  - สี: completed=green, current=blue, upcoming=gray, failed=red
- Tooltip แสดง: "Step 3/7: testing → validate next"

### 9. เพิ่ม Orchestration Controls ใน Board Header
**File:** `src/components/kanban/KanbanBoard.svelte` (board header section)
- เพิ่มถัดจาก auto-claim toggle:
  - Launch Mode dropdown: `Auto` | `Confirm`
  - Concurrency slider: 1-5
  - Auto-advance toggle
  - Queue status badge: "3 queued, 2 running"
  - "Launch All Claimed" batch button

### 10. Batch Operations
**File:** `src/components/kanban/KanbanBoard.svelte`
- เพิ่ม checkbox mode สำหรับ multi-select cards
- "Launch Selected" button → enqueue ทุก selected cards
- "Move Selected" → bulk move to target column
- keyboard shortcut: `Ctrl+A` select all in column, `Ctrl+Enter` launch selected

### 11. Emergency Stop
**File:** `src/lib/stores/agentQueue.ts`
- สร้าง `emergencyStop()` function:
  - Clear queue
  - POST `/agent/stop-all` ไปที่ event server
  - Update ทุก running items → 'failed' with reason 'emergency_stop'
  - Update ทุก running card lifecycles → 'paused' with reason 'user_pause'
- เพิ่มปุ่ม Emergency Stop สีแดงใน Board Header (แสดงเมื่อมี agents running)

### 12. Initialize Orchestration ใน App Bootstrap
**File:** `src/main.ts`
- import `startAutoAdvance` จาก autoAdvanceEngine
- import queue initialization
- เรียกหลัง `startAutoClaim()`:
  ```typescript
  startBoardSync();
  startAutoClaim();
  startAutoAdvance();  // ★ new
  ```

---

## Validation Commands

```bash
# ตรวจสอบ new files
ls -la src/lib/stores/agentQueue.ts src/lib/stores/autoAdvanceEngine.ts src/lib/stores/orchestrationSettings.ts

# ตรวจสอบ queue integration
grep -n "enqueue\|onAgentComplete\|processQueue" src/lib/stores/agentQueue.ts

# ตรวจสอบ auto-advance
grep -n "autoAdvance\|pipelineProgress" src/lib/stores/autoAdvanceEngine.ts

# ตรวจสอบ integration points
grep -rn "enqueue\|onAgentComplete" src/lib/stores/agentEventStore.ts src/components/kanban/KanbanBoard.svelte

# Build
pnpm run build 2>&1 | tail -20

# Type check
pnpm run check 2>&1 | tail -20
```

---

## Notes
- Default `launchMode='confirm'` เพื่อ backward compatibility — user ต้อง opt-in เป็น auto
- Auto-advance disabled by default — เป็น opt-in feature เพื่อไม่ให้ agent ทำงานโดยไม่คาดหมาย
- `COMMAND_REGISTRY` (`commandRegistry.ts`) มี `movesTo` field อยู่แล้ว — auto-advance engine ใช้ field นี้เพื่อรู้ว่า card ต้องย้ายไป column ไหน
- `staysInColumn` flag ใน `COMMAND_REGISTRY` — ถ้า true agent complete แล้ว card ไม่ย้าย column (เช่น `/estimate` ทำใน 'task' แล้วอยู่ 'task' ต่อ)
- Queue system ใช้ in-memory (Svelte store) ไม่ persist — ถ้า refresh หน้า queue จะหาย แต่ running agents ยังทำงานอยู่ (server-side)
- Emergency stop ใช้ existing `/agent/stop-all` endpoint ที่มีอยู่แล้วใน event-server.mjs
- Existing specs: `specs/chore-13_03_2026_23_37_43-agent-auto-claim-tasks.md` (implemented แล้ว)
