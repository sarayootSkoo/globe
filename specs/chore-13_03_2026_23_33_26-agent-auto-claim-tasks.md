# Chore: Agent Auto-Claim — จอง Task/Issue อัตโนมัติก่อน User กด Start

## Metadata
adw_id: `auto-claim`
prompt: `อยากให้ agent มาจอง task และ issue ที่พร้อมทำงาน ก่อนเราจะกด start เอง`
datetime: `13-03-2026 23:33:26`

---

## Chore Description
ระบบปัจจุบันต้องรอ user กด lifecycle button (▶ Start) หรือ drag card เพื่อเริ่มงาน ซึ่งหมายความว่า card ที่พร้อมทำงานแล้ว (มี agent assigned, ไม่ถูก block, อยู่ใน column ที่ valid) ก็ต้องรอมนุษย์มากดทีละใบ feature นี้จะเพิ่ม **auto-claim** — ระบบ scan board หา card ที่พร้อม แล้ว "จอง" (claim) ไว้ให้ agent โดยเปลี่ยน lifecycle เป็น `claimed` ก่อน → user เห็น indicator ว่า agent พร้อมรอทำ → user กด approve หรือปล่อยให้ auto-start ตาม setting

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[Card idle + agent assigned] → user ต้องกด ▶ lifecycle button หรือ drag card
  → StartDialog เปิด → user กด "Launch Claude Agent"
  → POST /agent/launch → lifecycle = running

Card ที่พร้อมแต่ user ไม่มากด → ค้างเป็น idle ตลอด
```
**Score: 2/5** — ต้อง manual ทุกใบ ไม่ scale เมื่อมี 20+ cards ที่พร้อม

### TO-BE — Target State
```
[Card idle + agent assigned + no blockers + valid column]
  → autoClaimEngine scan ทุก 10s
  → lifecycle = 'claimed' (new state)  ✅
  → UI แสดง 🤖 CLAIMED badge + "Approve" / "Dismiss" buttons
  → user กด Approve → lifecycle = running, POST /agent/launch
  → (optional) autoApprove=true setting → auto-launch ทันทีหลัง claim

Event server: POST /agent/claim → จอง card + broadcast claim event ผ่าน WebSocket
```
**Score: 4/5** — agent proactive claim แต่ user ยังมี control ผ่าน approve/dismiss

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1   | Agent claim card ที่ user ไม่ต้องการ | Medium | เปลือง resource ถ้า auto-approve | Default auto-approve=false, user ต้อง approve ก่อน launch |
| 2   | Race condition: หลาย agent claim card เดียวกัน | Low | Duplicate work | Claim ใช้ single-threaded scan + idempotent lifecycle update |
| 3   | Claim ทุก 10s อาจกิน CPU บน board ใหญ่ | Low | UI lag | Derived store (reactive) ไม่ต้อง poll, engine ใช้ requestIdleCallback |
| 4   | New lifecycle state 'claimed' break existing code | Medium | Cards อาจ stuck | ตรวจทุกที่ที่ check lifecycle state, เพิ่ม claimed เข้า switch/if |

---

## Promise.all Impact
**NO — no async ordering impact.** Auto-claim engine เป็น independent polling loop ที่ไม่กระทบ existing async flows (board sync, WebSocket events)

---

## Relevant Files

- `src/lib/types.ts` — เพิ่ม `'claimed'` ใน CardLifecycleState
- `src/lib/stores/kanbanState.ts` — เพิ่ม `claimCard()` action, `claimableCards` derived store, auto-claim engine
- `src/lib/stores/agentEventStore.ts` — handle `lifecycle:claimed` event จาก WebSocket
- `src/components/kanban/KanbanBoard.svelte` — UI สำหรับ claimed badge, approve/dismiss buttons, lifecycle button state
- `src/components/kanban/CardPreview.svelte` — แสดง claimed status ใน preview
- `scripts/event-server.mjs` — POST `/agent/claim` endpoint
- `src/lib/stores/activityLog.ts` — เพิ่ม `'lifecycle:claimed'` event type

### New Files
- `src/lib/engines/autoClaimEngine.ts` — scan logic + interval manager สำหรับ auto-claim

---

## Step by Step Tasks
IMPORTANT: ทำตามลำดับจากบนลงล่าง เริ่มจาก foundational changes

### 1. เพิ่ม `claimed` lifecycle state ใน types
**File:** `src/lib/types.ts` (line 136-143)
- เพิ่ม `'claimed'` ใน `CardLifecycleState` union type

```typescript
// Before
export type CardLifecycleState =
  | 'idle'
  | 'started'
  | 'running'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'blocked';

// After
export type CardLifecycleState =
  | 'idle'
  | 'claimed'     // agent จองแล้ว รอ user approve
  | 'started'
  | 'running'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'blocked';
```

### 2. เพิ่ม `lifecycle:claimed` ใน activityLog
**File:** `src/lib/stores/activityLog.ts` (line 16 area)
- เพิ่ม `'lifecycle:claimed'` ใน LogAction union type

### 3. เพิ่ม claimCard action + claimableCards derived store
**File:** `src/lib/stores/kanbanState.ts`
- เพิ่ม `claimCard(nodeId)` — set lifecycle เป็น `claimed`, log activity
- เพิ่ม `claimableCards` derived store — filter cards ที่: `lifecycle === 'idle'` + `agent !== null` + `blockedBy` ว่าง + column อยู่ใน actionable columns (task, issue, develop)
- เพิ่ม `autoClaimEnabled` writable store (default: false) สำหรับ toggle

```typescript
// claimableCards — cards ที่พร้อมจะถูก claim
const CLAIMABLE_COLUMNS: KanbanStatus[] = ['task', 'issue', 'develop'];

export const autoClaimEnabled = writable<boolean>(
  kanbanDB.get('autoClaimEnabled', false) as boolean
);
autoClaimEnabled.subscribe(v => { kanbanDB.set('autoClaimEnabled', v); });

export const claimableCards = derived(kanbanCards, ($cards) =>
  $cards.filter(c =>
    c.lifecycle === 'idle' &&
    c.agent !== null &&
    (!c.blockedBy || c.blockedBy.length === 0) &&
    CLAIMABLE_COLUMNS.includes(c.status)
  )
);

export function claimCard(nodeId: string): void {
  updateLifecycle(nodeId, 'claimed');
  addLog(nodeId, 'lifecycle:claimed', { auto: true });
}
```

### 4. สร้าง Auto-Claim Engine
**File:** `src/lib/engines/autoClaimEngine.ts` (new)
- Subscribe `claimableCards` + `autoClaimEnabled`
- เมื่อ enabled: ทุก 10 วินาที scan claimable cards แล้วเรียก `claimCard()` ทีละใบ
- Rate limit: claim ไม่เกิน 3 cards ต่อ cycle
- Expose `startAutoClaimEngine()` / `stopAutoClaimEngine()`

```typescript
import { get } from 'svelte/store';
import { claimableCards, autoClaimEnabled, claimCard } from '../stores/kanbanState';

const CLAIM_INTERVAL_MS = 10_000;
const MAX_CLAIMS_PER_CYCLE = 3;

let timer: ReturnType<typeof setInterval> | null = null;

function claimCycle(): void {
  if (!get(autoClaimEnabled)) return;
  const cards = get(claimableCards);
  const toClaim = cards.slice(0, MAX_CLAIMS_PER_CYCLE);
  for (const card of toClaim) {
    claimCard(card.node.id);
  }
}

export function startAutoClaimEngine(): void {
  if (timer) return;
  claimCycle(); // initial claim
  timer = setInterval(claimCycle, CLAIM_INTERVAL_MS);
}

export function stopAutoClaimEngine(): void {
  if (timer) { clearInterval(timer); timer = null; }
}
```

### 5. Handle `lifecycle:claimed` ใน agentEventStore WebSocket
**File:** `src/lib/stores/agentEventStore.ts` (line 95-210 switch block)
- เพิ่ม case `'lifecycle:claimed'` ที่ set live status เป็น `claimed` state

```typescript
case 'lifecycle:claimed':
  next.set(nodeId, {
    ...current,
    state: 'idle',  // still idle from agent perspective
    lastAction: message || 'Claimed — awaiting approval',
  });
  if (cardId) {
    updateLifecycle(cardId, 'claimed');
    addLog(cardId, 'lifecycle:claimed', { message });
  }
  break;
```

### 6. เพิ่ม POST /agent/claim endpoint บน event-server
**File:** `scripts/event-server.mjs` (after `/agent/launch` block ~line 510)
- รับ `{ cardId, agent }` → broadcast `lifecycle:claimed` event ผ่าน WebSocket
- Update board.json ด้วย claimed state

### 7. UI: แสดง claimed state บน KanbanBoard
**File:** `src/components/kanban/KanbanBoard.svelte`
- Lifecycle button: เมื่อ `claimed` แสดง icon 🤖 สี agent
- เพิ่ม approve/dismiss action เมื่อ click claimed card
  - Approve → `updateLifecycle(id, 'started')` + `launchAgent()`
  - Dismiss → `updateLifecycle(id, 'idle')`
- เพิ่ม Auto-Claim toggle ใน board header

```typescript
// lifecycle button addition
{#if card.lifecycle === 'claimed'}
  🤖
{:else if card.lifecycle === 'idle'}
  ▶
...
```

### 8. UI: CardPreview claimed indicator
**File:** `src/components/kanban/CardPreview.svelte` (line 1152 area)
- เพิ่ม `.lifecycle-claimed` CSS class
- แสดง "CLAIMED — Waiting for approval" badge ใน preview

### 9. Initialize engine ใน main.ts
**File:** `src/main.ts`
- Import และ call `startAutoClaimEngine()` after board sync starts

---

## Validation Commands

```bash
# Grep ยืนยัน claimed state ถูกเพิ่มแล้ว
grep -n "claimed" src/lib/types.ts

# Grep ยืนยัน claimableCards store
grep -n "claimableCards" src/lib/stores/kanbanState.ts

# Verify new engine file exists
ls src/lib/engines/autoClaimEngine.ts

# Build
pnpm run build 2>&1 | tail -20

# E2E Tests
npx playwright test e2e/kanban-e2e.spec.ts 2>&1 | tail -20
```

---

## Notes
- `claimed` เป็น state ใหม่ระหว่าง `idle` กับ `started` — ทุกที่ที่ check `idle` ต้อง review ว่าต้องเพิ่ม `claimed` ด้วยหรือไม่
- Auto-claim default OFF — user ต้อง enable เอง เพื่อไม่ให้ surprise agent launch
- Rate limit 3 cards/cycle ป้องกันกรณี board มี 50+ idle cards แล้ว claim ทีเดียวหมด
- ใช้ existing `AGENT_SUGGEST_RULES` เพื่อ validate ว่า agent type ที่ assigned เหมาะกับ column จริง
