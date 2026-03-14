# Chore: ยกระดับ Kanban System ให้เป็น Powerful Agent Orchestration Platform

## Metadata
adw_id: `enchant`
prompt: `kanban system to powerful for agent`
datetime: `14-03-2026 01:12:50`

---

## Chore Description
ระบบ Kanban ปัจจุบันมี foundation ครบ (card lifecycle, agent assignment, auto-claim, PTY terminal, WebSocket events) แต่ยังขาด 3 ส่วนสำคัญที่จะทำให้เป็น **powerful agent orchestration**: (1) **Agent Queue & Concurrency** — ไม่มี queue จำกัด concurrent agents ทำให้ launch หลายตัวพร้อมกันแล้ว resource ล้น (2) **Auto-Advance Pipeline** — เมื่อ agent ทำเสร็จ card ไม่ advance ไปยัง next SDLC stage อัตโนมัติ ต้องลาก manual (3) **Agent Retry & Health Monitor** — ไม่มี auto-retry เมื่อ agent fail, ไม่มี health dashboard แสดง resource usage

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[User clicks Start] → POST /agent/launch → spawn claude process (no limit)
  └─ child.on('exit', code=0) → moveCardInBoard(cardId, 'done')  ← ข้ามทุก stage กลาง
  └─ child.on('exit', code≠0) → moveCardInBoard(cardId, 'task')  ← กลับ task เสมอ

[Auto-claim] → claimableCards.subscribe → assignAgent + lifecycle='claimed'
  └─ ไม่มี auto-launch ← ต้อง user กด Start เอง
  └─ ไม่มี queue ← claim ทุกตัวพร้อมกัน

[Agent health] → agentLiveStatuses (Map<string, AgentLiveStatus>)
  └─ state: idle|working|done|error ← ไม่มี retry logic
  └─ ไม่มี resource tracking (CPU/memory/token)
  └─ ไม่มี agent concurrency limit
```
**Score: 2/5** — มี infrastructure ครบแต่ไม่มี orchestration intelligence

### TO-BE — Target State
```
[Auto-claim] → claimableCards → assignAgent + lifecycle='claimed'
  └─ agentQueue.enqueue(card) → respects MAX_CONCURRENT (default: 2)
  └─ queue.dequeue() → POST /agent/launch → lifecycle='running'  ✅

[Agent exit, code=0] → pipeline.advance(card)
  └─ WORKFLOW_CHAINS lookup → next stage command
  └─ moveCardInBoard(cardId, nextColumn)  ✅
  └─ auto-suggest next agent → re-enqueue if autoAdvance=true  ✅

[Agent exit, code≠0] → retryEngine.evaluate(card)
  └─ retryCount < MAX_RETRIES (3) → re-enqueue with backoff  ✅
  └─ retryCount >= MAX_RETRIES → lifecycle='failed', notify user  ✅

[Health Monitor] → agentHealthStore
  └─ concurrent count, queue depth, avg duration, token usage  ✅
  └─ resource alerts (>80% token limit, >3 concurrent)  ✅
```
**Score: 5/5** — fully autonomous pipeline with safety guardrails

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1   | Concurrent agent limit อาจทำให้ queue ค้าง | Medium | Agent ไม่ได้ launch ถ้า queue full | แสดง queue depth ใน UI, allow manual override |
| 2   | Auto-advance ไปผิด column เพราะ workflow chain ไม่ match | High | Card อยู่ผิด stage | Validate next column exists ก่อน advance, fallback to manual |
| 3   | Retry loop ถ้า agent fail ซ้ำๆ | Medium | Resource waste | MAX_RETRIES=3 + exponential backoff + user notification |
| 4   | Race condition: auto-claim + manual launch พร้อมกัน | Low | Duplicate agent launch | Check lifecycle state ก่อน launch, dedup by cardId |

---

## Promise.all Impact
**YES — affects agent launch flow** เพราะ queue dequeue + launch เป็น async operation ที่ต้อง serialize per-card (ห้าม launch card เดียวกัน 2 ครั้ง) แต่ cross-card launches สามารถ parallel ได้ภายใน concurrency limit

---

## Relevant Files

- `src/lib/stores/autoClaimEngine.ts` — current auto-claim logic, จะเพิ่ม queue integration
- `src/lib/stores/agentEventStore.ts` — WebSocket event processing, จะเพิ่ม auto-advance + retry logic
- `src/lib/stores/kanbanState.ts` — card state management, lifecycle actions
- `src/lib/types.ts` — type definitions, จะเพิ่ม queue/health types
- `src/components/kanban/KanbanBoard.svelte` — UI, จะเพิ่ม queue indicator + health panel
- `scripts/event-server.mjs` — backend agent launch, จะเพิ่ม concurrency guard

### New Files
- `src/lib/stores/agentQueue.ts` — Agent queue engine with concurrency control
- `src/lib/stores/agentHealth.ts` — Health monitoring store (concurrent count, token usage, queue depth)
- `src/lib/stores/pipelineAdvance.ts` — Auto-advance logic: completed agent → next SDLC stage

---

## Step by Step Tasks
IMPORTANT: ทำตามลำดับจากบนลงล่าง เริ่มจาก foundational changes

### 1. เพิ่ม Types สำหรับ Queue, Health, Pipeline
**File:** `src/lib/types.ts` (ต่อท้าย)
- เพิ่ม `AgentQueueItem`, `AgentHealthSnapshot`, `PipelineAdvanceRule`

```typescript
// Before — ไม่มี queue types

// After
export interface AgentQueueItem {
  cardId: string;
  command: string;
  args: string;
  priority: number;
  enqueuedAt: number;
  retryCount: number;
}

export interface AgentHealthSnapshot {
  runningCount: number;
  queueDepth: number;
  maxConcurrent: number;
  totalLaunched: number;
  totalCompleted: number;
  totalFailed: number;
  avgDurationMs: number;
}

export interface PipelineAdvanceRule {
  fromColumn: KanbanStatus;
  toColumn: KanbanStatus;
  autoAgent: AgentType | null;
  autoLaunch: boolean;
}
```

### 2. สร้าง Agent Queue Engine
**File:** `src/lib/stores/agentQueue.ts` (new)
- Writable store: `agentQueue` (AgentQueueItem[])
- Settings: `maxConcurrent` (default 2, persisted via kanbanDB)
- `enqueue(card, command, args)` — เพิ่ม item, sorted by priority
- `dequeue()` — ดึง top item ถ้า running < maxConcurrent
- `processQueue()` — reactive loop: subscribe to agentLiveStatuses, เมื่อ running count ลด → dequeue + launch
- Launch via `fetch('http://localhost:4010/agent/launch', ...)` + update lifecycle to 'running'
- Dedup guard: ห้าม enqueue card ที่มี lifecycle='running' อยู่แล้ว

### 3. สร้าง Pipeline Auto-Advance Engine
**File:** `src/lib/stores/pipelineAdvance.ts` (new)
- Define `PIPELINE_RULES: PipelineAdvanceRule[]` mapping ตาม SDLC flow:
  ```
  design → task (agent: breakdown), task → develop (agent: implement),
  develop → testing (agent: test), testing → validate (agent: validate),
  validate → update-docs (agent: docs), update-docs → done (agent: deploy)
  ```
- `advanceCard(cardId)` — เมื่อ agent completed:
  1. อ่าน current column จาก kanbanState
  2. Lookup PIPELINE_RULES → next column + auto-agent
  3. `moveCard(cardId, nextColumn)`
  4. ถ้า autoLaunch=true → `agentQueue.enqueue(card, nextAgent.command)`
- Hook เข้า `agentEventStore.processEvent` ที่ event type = `command:completed`

### 4. เพิ่ม Retry Logic ใน agentEventStore
**File:** `src/lib/stores/agentEventStore.ts` (line 145-155, case 'command:failed')
- เมื่อ agent fail: ตรวจ retryCount จาก iterationStates
- ถ้า retryCount < MAX_RETRIES (3) → re-enqueue ด้วย backoff delay
- ถ้า retryCount >= MAX_RETRIES → lifecycle='failed' (เดิม)

```typescript
// Before (line 145)
case 'command:failed':
  next.set(nodeId, { ...current, state: 'error', lastAction: message || 'Failed' });
  if (cardId) {
    updateLifecycle(cardId, 'failed');
  }
  break;

// After
case 'command:failed':
  next.set(nodeId, { ...current, state: 'error', lastAction: message || 'Failed' });
  if (cardId) {
    const retryResult = evaluateRetry(cardId);
    if (retryResult.shouldRetry) {
      updateLifecycle(cardId, 'paused', 'error_retry');
      setTimeout(() => { agentQueue.enqueue(cardId, retryResult.command, '', retryResult.retryCount); }, retryResult.backoffMs);
    } else {
      updateLifecycle(cardId, 'failed');
    }
  }
  break;
```

### 5. สร้าง Agent Health Monitor Store
**File:** `src/lib/stores/agentHealth.ts` (new)
- Derived store จาก `agentLiveStatuses` + `agentQueue`
- คำนวณ: runningCount, queueDepth, totalLaunched, totalFailed, avgDuration
- Export `agentHealthSnapshot` (derived store)
- Alert threshold: ถ้า running >= maxConcurrent → `isAtCapacity = true`

### 6. เพิ่ม Concurrency Guard ใน Event Server
**File:** `scripts/event-server.mjs` (line 745-760, POST /agent/launch)
- เพิ่ม check: count running agents (state='running' in agentStatuses)
- ถ้า running >= MAX_SERVER_CONCURRENT (5) → return 429 Too Many Requests
- Client (agentQueue.ts) จะ handle 429 โดย keep item ใน queue + retry later

```javascript
// Before (line 745)
if (req.method === 'POST' && urlPath === '/agent/launch') {

// After — add concurrency check at top of handler
if (req.method === 'POST' && urlPath === '/agent/launch') {
  const runningCount = [...agentStatuses.values()].filter(s => s.state === 'running').length;
  if (runningCount >= MAX_SERVER_CONCURRENT) {
    send(res, 429, { error: 'Too many concurrent agents', running: runningCount, max: MAX_SERVER_CONCURRENT }, cors);
    return;
  }
```

### 7. เชื่อม Auto-Claim → Queue (แทน direct launch)
**File:** `src/lib/stores/autoClaimEngine.ts` (line 106-118)
- หลัง assign agent + set lifecycle='claimed' → enqueue ใน agentQueue
- Queue จะจัดการ launch timing ตาม concurrency limit

```typescript
// Before (line 109)
for (const { card, suggestedAgent } of current) {
  assignAgent(card.node.id, suggestedAgent.agent as AgentType);
  updateLifecycle(card.node.id, 'claimed');
}

// After
for (const { card, suggestedAgent } of current) {
  assignAgent(card.node.id, suggestedAgent.agent as AgentType);
  updateLifecycle(card.node.id, 'claimed');
  // Enqueue for auto-launch via queue system
  agentQueue.enqueue(card.node.id, suggestedAgent.command, '', 0);
}
```

### 8. UI: เพิ่ม Queue & Health Indicators ใน KanbanBoard
**File:** `src/components/kanban/KanbanBoard.svelte`
- Import `agentHealthSnapshot` + `agentQueue`
- เพิ่ม header bar: `🔄 Running: 2/2 | Queue: 3 | ✅ 12 completed | ❌ 1 failed`
- เพิ่ม settings: max concurrent slider (1-5)
- เพิ่ม toggle: auto-advance pipeline on/off
- แสดง queue position badge บน card ที่อยู่ใน queue

### 9. UI: เพิ่ม Pipeline Visualization
**File:** `src/components/kanban/KanbanBoard.svelte`
- เมื่อ card มี active pipeline → แสดง progress indicator
  ```
  [design] ──▶ [task] ──▶ [develop] ──▶ [testing] ──▶ [done]
                              ▲ current
  ```
- สีเปลี่ยนตาม progress: completed stages = green, current = blue, upcoming = gray

---

## Validation Commands

```bash
# Grep ยืนยัน type definitions
grep -n "AgentQueueItem\|AgentHealthSnapshot\|PipelineAdvanceRule" src/lib/types.ts

# Verify new stores exist
ls -la src/lib/stores/agentQueue.ts src/lib/stores/agentHealth.ts src/lib/stores/pipelineAdvance.ts

# Verify concurrency guard in event server
grep -n "MAX_SERVER_CONCURRENT\|429" scripts/event-server.mjs

# Build
pnpm run build 2>&1 | tail -20

# Dev server test
pnpm run dev 2>&1 | head -10
```

---

## Notes
- ระบบ queue ต้อง persist ผ่าน kanbanDB เพื่อ survive page refresh
- Concurrency limit ควรแยก client-side (maxConcurrent=2) กับ server-side (MAX_SERVER_CONCURRENT=5) เพราะอาจมีหลาย browser tab
- Auto-advance pipeline ควรเป็น opt-in (default off) เพราะบาง card อาจต้อง manual review ก่อน advance
- Retry backoff formula: `Math.min(30000, 1000 * 2^retryCount)` — 1s, 2s, 4s max 30s
- Related specs: `specs/chore-14_03_2026_00_26_03-agent-auto-claim-tasks.md`
