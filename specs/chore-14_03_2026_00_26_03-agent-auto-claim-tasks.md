# Chore: Agent Auto-Claim — จองงานอัตโนมัติก่อน User กด Start

## Metadata
adw_id: `agent-auto-claim`
prompt: `อยากให้ agent มาจอง task และ issue ที่พร้อมทำงาน ก่อนเราจะกด start เอง`
datetime: `14-03-2026 00:26:03`

---

## Chore Description
ปัจจุบัน card ที่อยู่ใน column `task`/`issue` ต้องรอ user เลือก agent แล้วกด Start เอง ทั้งที่ระบบมี `agentSuggestions` derived store (kanbanState.ts:469) ที่คำนวณ agent เหมาะสมอยู่แล้ว Feature นี้จะสร้าง auto-claim engine ที่ reactive subscribe การเปลี่ยนแปลงของ board แล้ว auto-assign agent + ตั้ง lifecycle เป็น `claimed` (state ใหม่) ให้ card ที่พร้อมทำงาน — user แค่กด "Launch" เพื่อ spawn process จริง

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[Card สร้าง/ย้ายมา column 'task']
  → kanbanCards derived → card object (lifecycle: 'idle', agent: null)
  → agentSuggestions คำนวณ suggestions (kanbanState.ts:469)
  → ❌ ไม่มี auto-assign — รอ user manual:
     (1) เลือก agent จาก suggestion list
     (2) กด Start → updateLifecycle(id, 'started')
     (3) กด Launch → POST /agent/launch
```
**Score: 2/5** — ต้อง manual 3 steps ทุก card แม้ระบบรู้คำตอบอยู่แล้ว

### TO-BE — Target State
```
[Card สร้าง/ย้ายมา column 'task']
  → kanbanCards derived → card object (lifecycle: 'idle', agent: null)
  → agentSuggestions คำนวณ suggestions
  → ★ autoClaimEngine (reactive) ตรวจ:
     ✓ card อยู่ใน CLAIMABLE_COLUMNS
     ✓ card.agent === null && lifecycle === 'idle'
     ✓ ไม่มี unresolved blockedBy dependencies
  → auto: assignAgent(id, topSuggestion) + updateLifecycle(id, 'claimed')
  → UI แสดง claimed badge + "Launch" button
  → User กด Launch → POST /agent/launch ✅
```
**Score: 4/5** — ลด friction เหลือ 1 click, agent ถูก pre-assign อัตโนมัติ

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1   | Auto-assign agent ผิดประเภท | Medium | Agent ทำงานผิด เสีย token | ใช้ AGENT_SUGGEST_RULES + CARD_TYPE_PREFERRED ที่มี priority-based selection อยู่แล้ว (kanbanState.ts:44,462) |
| 2   | Claim card ที่มี unresolved dependencies | High | Agent เริ่มงานทั้งที่ prerequisite ยังไม่เสร็จ | เช็ค cardDependencies (kanbanState.ts:123) — skip ถ้า blockedBy card ไหน lifecycle !== 'completed' |
| 3   | Claim ซ้ำ (card ที่ claimed แล้ว) | Low | Agent ถูก reassign | Guard: skip ถ้า agent !== null หรือ lifecycle !== 'idle' |
| 4   | Board sync override local claimed state | Low | Remote data ลบ claim | Remote wins OK ตาม existing mergeBoardState strategy (kanbanState.ts:592) — auto-claim จะ re-claim ถ้า card กลับเป็น idle |
| 5   | User ไม่ต้องการ auto-claim บาง card | Medium | ต้อง undo ได้ | เพิ่ม toggle + per-card opt-out + unclaim action |

---

## Promise.all Impact
**NO** — ไม่มี async ordering impact. Auto-claim engine ทำงานแบบ synchronous reactive (Svelte derived/effect) ไม่มี race condition กับ agent launch flow. POST /agent/launch ยังคงเป็น user-initiated action เท่านั้น

---

## Relevant Files

- `src/lib/stores/kanbanState.ts` — `agentSuggestions` (:469), `assignAgent()` (:182), `updateLifecycle()` (:220), `AGENT_SUGGEST_RULES` (:44), `cardDependencies` (:123), `lifecycleStates` (:157), `kanbanCards` derived, `mergeBoardState()` (:592)
- `src/lib/stores/agentEventStore.ts` — WebSocket event processing, lifecycle updates on agent events
- `src/lib/types.ts` — `KanbanCard`, `CardLifecycleState` (:137), `AgentType` (:89), `LogAction` (:274)
- `src/components/kanban/CardPreview.svelte` — card detail view — จะแสดง claimed status
- `src/components/kanban/KanbanBoard.svelte` — board layout, handle start/launch actions

### New Files
- `src/lib/stores/autoClaimEngine.ts` — reactive auto-claim logic, settings, claim/unclaim actions

---

## Step by Step Tasks
IMPORTANT: ทำตามลำดับจากบนลงล่าง เริ่มจาก foundational changes

### 1. เพิ่ม 'claimed' ใน CardLifecycleState type
**File:** `src/lib/types.ts` (line 137-138)
- เพิ่ม `'claimed'` เป็น lifecycle state ใหม่ระหว่าง `'idle'` กับ `'started'`
- เพิ่ม `'lifecycle:claimed'` ใน LogAction union type

```typescript
// Before
export type CardLifecycleState =
  | 'idle'       // สร้างแล้ว ยังไม่เริ่ม
  | 'started'    // กด Start แล้ว กำลังเตรียม

// After
export type CardLifecycleState =
  | 'idle'       // สร้างแล้ว ยังไม่เริ่ม
  | 'claimed'    // auto-claimed agent assigned รอ user launch
  | 'started'    // กด Start แล้ว กำลังเตรียม
```

### 2. สร้าง Auto-Claim Engine Store
**File:** `src/lib/stores/autoClaimEngine.ts` (new)
- `autoClaimEnabled` — writable boolean, persisted ใน kanbanDB, default `true`
- `autoClaimExclusions` — writable `Set<string>` ของ cardId ที่ opt-out
- `CLAIMABLE_COLUMNS` — `['task', 'issue', 'develop', 'testing', 'validate', 'update-docs']`
- `claimableCards` — derived store จาก `kanbanCards` + `agentSuggestions` + `cardDependencies` + `lifecycleStates`:
  - filter: อยู่ใน CLAIMABLE_COLUMNS, agent === null, lifecycle === 'idle', ไม่มี unresolved deps, ไม่อยู่ใน exclusions
  - map: แต่ละ card + top-priority agent จาก agentSuggestions

```typescript
import { derived, writable, get } from 'svelte/store';
import { kanbanCards, agentSuggestions, cardDependencies, lifecycleStates,
         assignAgent, updateLifecycle } from './kanbanState';
import { addLog } from './activityLog';
import { kanbanDB } from './kanbanDB';
import type { KanbanStatus } from '$lib/types';

export const autoClaimEnabled = writable<boolean>(
  kanbanDB.get('autoClaimEnabled', true) as boolean
);
autoClaimEnabled.subscribe(v => kanbanDB.set('autoClaimEnabled', v));

export const autoClaimExclusions = writable<Set<string>>(
  new Set(kanbanDB.get('autoClaimExclusions', []) as string[])
);
autoClaimExclusions.subscribe(v => kanbanDB.set('autoClaimExclusions', [...v]));

const CLAIMABLE_COLUMNS: KanbanStatus[] = [
  'task', 'issue', 'develop', 'testing', 'validate', 'update-docs'
];

function hasUnresolvedDeps(
  cardId: string,
  deps: Map<string, { blockedBy: string[]; blocking: string[] }>,
  lifecycles: Record<string, { state: string }>
): boolean {
  const d = deps.get(cardId);
  if (!d || d.blockedBy.length === 0) return false;
  return d.blockedBy.some(bid => lifecycles[bid]?.state !== 'completed');
}

export const claimableCards = derived(
  [kanbanCards, agentSuggestions, cardDependencies, autoClaimEnabled,
   autoClaimExclusions, lifecycleStates],
  ([$cards, $suggestions, $deps, $enabled, $exclusions, $lifecycle]) => {
    if (!$enabled) return [];
    return $cards
      .filter(c =>
        CLAIMABLE_COLUMNS.includes(c.status) &&
        !c.agent &&
        c.lifecycle === 'idle' &&
        !$exclusions.has(c.node.id) &&
        !hasUnresolvedDeps(c.node.id, $deps, $lifecycle)
      )
      .map(c => ({
        card: c,
        suggestedAgent: $suggestions.get(c.node.id)?.[0] ?? null,
      }))
      .filter(x => x.suggestedAgent !== null);
  }
);
```

### 3. สร้าง Auto-Claim Effect (reactive execution)
**File:** `src/lib/stores/autoClaimEngine.ts` (ต่อจาก task 2)
- `startAutoClaim()` — subscribe `claimableCards`, debounce 500ms, auto-assign + set lifecycle 'claimed'
- `stopAutoClaim()` — unsubscribe cleanup
- ไม่ POST `/agent/launch` — แค่ pre-assign agent + lifecycle

```typescript
let _unsubscribe: (() => void) | null = null;
let _debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function startAutoClaim(): void {
  if (_unsubscribe) return; // already running
  _unsubscribe = claimableCards.subscribe(($claimable) => {
    if ($claimable.length === 0) return;
    if (_debounceTimer) clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(() => {
      for (const { card, suggestedAgent } of $claimable) {
        if (!suggestedAgent) continue;
        assignAgent(card.node.id, suggestedAgent.agent);
        updateLifecycle(card.node.id, 'claimed');
        addLog(card.node.id, 'lifecycle:claimed', {
          agent: suggestedAgent.agent,
          reason: suggestedAgent.note,
          auto: true,
        });
      }
    }, 500);
  });
}

export function stopAutoClaim(): void {
  if (_debounceTimer) clearTimeout(_debounceTimer);
  if (_unsubscribe) { _unsubscribe(); _unsubscribe = null; }
}

export function unclaimCard(cardId: string): void {
  assignAgent(cardId, null as any); // reset agent
  updateLifecycle(cardId, 'idle');
  addLog(cardId, 'lifecycle:idle', { reason: 'user_unclaim' });
}

export function excludeFromAutoClaim(cardId: string): void {
  autoClaimExclusions.update(s => { s.add(cardId); return new Set(s); });
  unclaimCard(cardId);
}
```

### 4. เพิ่ม Claimed Badge + Actions ใน Card Preview
**File:** `src/components/kanban/CardPreview.svelte`
- แสดง "Auto-claimed" badge เมื่อ lifecycle === 'claimed'
- ปุ่ม "Unclaim" → `unclaimCard(id)` — reset agent + lifecycle กลับ idle
- ปุ่ม "Exclude" → `excludeFromAutoClaim(id)` — unclaim + opt-out ถาวร
- ปุ่ม "Launch" → เดิมที่มีอยู่ ใช้สำหรับ spawn agent process จริง

### 5. เพิ่ม Auto-Claim Toggle ใน KanbanBoard
**File:** `src/components/kanban/KanbanBoard.svelte`
- เพิ่ม toggle switch ใน board header: `autoClaimEnabled` on/off
- แสดง counter: จำนวน claimed cards ที่รอ launch
- ใช้ icon/badge สี distinct จาก started/running

### 6. Initialize Auto-Claim ใน App Bootstrap
**File:** `src/main.ts` หรือ top-level component ที่ init stores
- import `startAutoClaim` จาก autoClaimEngine
- เรียก `startAutoClaim()` หลังจาก board data loaded (หลัง `startBoardSync()`)

### 7. Handle 'claimed' State ใน Existing Lifecycle Logic
**File:** `src/lib/stores/agentEventStore.ts`
- เมื่อ agent event `session_start` มา → ถ้า card lifecycle === 'claimed' → transition เป็น 'running' (skip 'started')
- เมื่อ board:updated merge มา → 'claimed' cards ที่ถูก remote override กลับ 'idle' → auto-claim engine จะ re-claim ถ้ายังผ่าน criteria

---

## Validation Commands

```bash
# ตรวจสอบ claimed type ถูกเพิ่ม
grep -n "claimed" src/lib/types.ts

# ตรวจสอบ autoClaimEngine ถูกสร้าง
grep -n "claimableCards\|startAutoClaim\|autoClaimEnabled" src/lib/stores/autoClaimEngine.ts

# ตรวจสอบ main.ts import
grep -n "autoClaim" src/main.ts

# Build
pnpm run build 2>&1 | tail -20

# E2E Tests
npx playwright test e2e/kanban-e2e.spec.ts 2>&1 | tail -20
```

---

## Notes
- Spec นี้ refine จาก specs เก่า 2 ไฟล์: `chore-13_03_2026_23_33_26` และ `chore-13_03_2026_23_37_43`
- ใช้ `claimed` state ใหม่แทนที่จะ reuse `started` เพื่อแยก "auto-claimed รอ launch" ออกจาก "user กด start เอง"
- `agentSuggestions` (kanbanState.ts:469) ใช้ priority-based sorting — `[0]` คือ top priority agent เสมอ
- `AGENT_SUGGEST_RULES` (kanbanState.ts:44) กำหนดว่า column ไหนมี agent ไหน — columns ที่ array ว่าง (`backlog`, `hold`) ไม่ถูก claim
- Auto-claim ไม่ launch process จริง — แค่ pre-assign + set lifecycle เพื่อลด manual friction
