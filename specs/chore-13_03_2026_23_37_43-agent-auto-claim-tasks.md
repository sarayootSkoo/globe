# Chore: Agent Auto-Claim Tasks & Issues

## Metadata
adw_id: `agent-auto-claim`
prompt: `อยากให้ agent มาจอง task และ issue ที่พร้อมทำงาน ก่อนเราจะกด start เอง`
datetime: `13-03-2026 23:37:43`

---

## Chore Description
ปัจจุบัน card ที่อยู่ใน column `task` หรือ `issue` จะมีสถานะ `lifecycle: idle` และไม่มี agent assigned จนกว่า user จะเลือก agent เองหรือกด Start ระบบมี `agentSuggestions` derived store ที่คำนวณ agent ที่เหมาะสมอยู่แล้ว แต่ยังไม่มี mechanism ที่ auto-assign agent ให้กับ card ที่พร้อมทำงาน Feature นี้จะทำให้ระบบ auto-claim (จอง agent + เปลี่ยน lifecycle เป็น `started`) สำหรับ card ที่พร้อมทำงาน เพื่อให้ user แค่กด confirm เพื่อ launch agent จริงๆ

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[Card ถูกสร้าง/ย้ายมา column 'task']
  → kanbanCards derived store สร้าง card object
  → agentSuggestions คำนวณ suggested agents (เช่น 'implement' สำหรับ task)
  → card.agent = null, card.lifecycle = 'idle'
  → User ต้อง: (1) เลือก agent manually (2) กด Start manually
  → ไม่มี auto-assignment เลย
```
**Score: 2/5** — User ต้องทำ 2 steps manual ทุกครั้ง แม้ระบบรู้อยู่แล้วว่า agent ไหนเหมาะ

### TO-BE — Target State
```
[Card ถูกสร้าง/ย้ายมา column 'task']
  → kanbanCards derived store สร้าง card object
  → agentSuggestions คำนวณ suggested agents
  → ★ autoClaimEngine ตรวจสอบ:
      ✓ card อยู่ใน claimable column (task, issue, develop, testing, validate, update-docs)
      ✓ card.agent === null
      ✓ card.lifecycle === 'idle'
      ✓ card ไม่มี blockedBy dependencies ที่ยังไม่ done
  → ★ auto-assign top-priority agent จาก agentSuggestions
  → ★ lifecycle เปลี่ยนเป็น 'started' (claimed, รอ user confirm launch)
  → User แค่กด "Launch" ใน notification/card preview ✅
```
**Score: 4/5** — ลด friction จาก 2 steps เหลือ 1 click, agent ถูก assign อัตโนมัติ

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1   | Auto-assign agent ผิดประเภท (เช่น assign 'implement' ให้ issue card) | Medium | Agent ทำงานผิด เสีย token | ใช้ `AGENT_SUGGEST_RULES` + `CARD_TYPE_PREFERRED` ที่มีอยู่แล้ว, priority-based selection |
| 2   | Card ถูก claim ทั้งที่มี unresolved dependencies | High | Agent เริ่มงานทั้งที่ prerequisite ยังไม่เสร็จ | เช็ค `blockedBy` dependencies — ถ้ามี blocking card ที่ lifecycle !== 'completed' ให้ skip |
| 3   | Auto-claim ทำงานซ้ำ (claim card ที่ถูก claim แล้ว) | Low | Agent ถูก reassign | Guard: skip ถ้า `card.agent !== null` หรือ `lifecycle !== 'idle'` |
| 4   | User ไม่ต้องการ auto-claim บาง card | Medium | ต้องมี override | เพิ่ม toggle setting `autoClaimEnabled` + per-card opt-out |

---

## Promise.all Impact
**NO** — ไม่มี async ordering impact. Auto-claim engine ทำงานแบบ synchronous reactive (Svelte derived/effect store) ไม่มี race condition กับ agent launch flow

---

## Relevant Files

- `src/lib/stores/kanbanState.ts` — `agentSuggestions`, `assignAgent()`, `updateLifecycle()`, `AGENT_SUGGEST_RULES`
- `src/lib/stores/agentEventStore.ts` — WebSocket event processing, `agentLiveStatuses`
- `src/lib/types.ts` — `KanbanCard`, `CardLifecycleState`, `AgentType`
- `src/components/kanban/CardPreview.svelte` — card detail view ที่จะแสดง claim status
- `src/components/kanban/KanbanBoard.svelte` — board layout ที่ render cards

### New Files
- `src/lib/stores/autoClaimEngine.ts` — reactive auto-claim logic, settings store, claim/unclaim actions

---

## Step by Step Tasks

### 1. สร้าง Auto-Claim Engine Store
**File:** `src/lib/stores/autoClaimEngine.ts` (new)
- สร้าง `autoClaimEnabled` writable store (persisted ใน kanbanDB) — default `true`
- สร้าง `autoClaimExclusions` writable store — set ของ cardId ที่ opt-out จาก auto-claim
- สร้าง `CLAIMABLE_COLUMNS` constant — columns ที่ auto-claim ทำงาน: `['task', 'issue', 'develop', 'testing', 'validate', 'update-docs']`
- สร้าง `claimableCards` derived store จาก `kanbanCards` + `agentSuggestions` + `cardDependencies`:
  - filter cards ที่: อยู่ใน CLAIMABLE_COLUMNS, agent === null, lifecycle === 'idle', ไม่มี unresolved blockedBy, ไม่อยู่ใน exclusions
  - แต่ละ card map กับ top-priority agent จาก agentSuggestions

```typescript
// Key logic
export const claimableCards = derived(
  [kanbanCards, agentSuggestions, cardDependencies, autoClaimEnabled, autoClaimExclusions],
  ([$cards, $suggestions, $deps, $enabled, $exclusions]) => {
    if (!$enabled) return [];
    return $cards
      .filter(c =>
        CLAIMABLE_COLUMNS.includes(c.status) &&
        !c.agent &&
        c.lifecycle === 'idle' &&
        !$exclusions.has(c.node.id) &&
        !hasUnresolvedDeps(c.node.id, $deps, $cards)
      )
      .map(c => ({
        card: c,
        suggestedAgent: $suggestions.get(c.node.id)?.[0] ?? null,
      }))
      .filter(x => x.suggestedAgent !== null);
  }
);
```

### 2. สร้าง Auto-Claim Effect (reactive execution)
**File:** `src/lib/stores/autoClaimEngine.ts` (ต่อจาก task 1)
- สร้าง `startAutoClaim()` function ที่ subscribe ไป `claimableCards` และทำ auto-assign:
  - เมื่อมี claimable card ใหม่ → เรียก `assignAgent(cardId, agentType)`
  - เปลี่ยน lifecycle เป็น `'started'` ผ่าน `updateLifecycle(cardId, 'started')`
  - log activity: `addLog(cardId, 'agent:auto-claimed', { agent, reason })`
- เพิ่ม debounce 500ms เพื่อไม่ให้ claim ถี่เกินไปตอน board sync
- สร้าง `stopAutoClaim()` cleanup function

```typescript
// Before (manual flow)
// User clicks agent → assignAgent(id, 'implement') → user clicks Start → updateLifecycle(id, 'started')

// After (auto-claim)
// claimableCards changes → auto: assignAgent(id, 'implement') + updateLifecycle(id, 'started')
// User only needs to click "Launch" to actually spawn the agent process
```

### 3. เพิ่ม Claimed Badge ใน Card Preview
**File:** `src/components/kanban/CardPreview.svelte`
- เพิ่มแสดง "Auto-claimed" badge เมื่อ card.lifecycle === 'started' && card.agent !== null
- เพิ่มปุ่ม "Unclaim" เพื่อให้ user สามารถ undo auto-claim ได้ (reset agent + lifecycle)
- เพิ่มปุ่ม "Exclude from auto-claim" สำหรับ per-card opt-out

### 4. เพิ่ม Auto-Claim Toggle ใน Board Settings
**File:** `src/components/kanban/KanbanBoard.svelte`
- เพิ่ม toggle switch ใน board header สำหรับ `autoClaimEnabled`
- แสดงจำนวน claimed cards (เช่น "3 cards auto-claimed")

### 5. Initialize Auto-Claim ใน App Bootstrap
**File:** `src/main.ts`
- import `startAutoClaim` จาก autoClaimEngine
- เรียก `startAutoClaim()` หลังจาก `startBoardSync()` เพื่อให้ board data พร้อมก่อน

### 6. Handle Board Sync — ไม่ override auto-claimed state
**File:** `src/lib/stores/kanbanState.ts` (line 592-612, `mergeBoardState`)
- ใน `mergeBoardState()`: ถ้า remote data มี agent/lifecycle สำหรับ card ที่ถูก auto-claimed locally → ให้ remote wins (ไม่ต้องทำอะไรเพิ่ม เพราะ logic ปัจจุบัน `{ ...current, ...board.agents }` ก็ merge ถูกอยู่แล้ว)
- ถ้า remote ส่ง lifecycle = 'idle' มา override card ที่ local auto-claimed เป็น 'started' → remote wins OK เพราะอาจเป็น user ที่ unclaim จาก device อื่น

---

## Validation Commands

```bash
# ตรวจสอบว่า autoClaimEngine ถูกสร้าง
grep -n "claimableCards\|startAutoClaim\|autoClaimEnabled" src/lib/stores/autoClaimEngine.ts

# ตรวจสอบว่า main.ts import auto-claim
grep -n "autoClaim" src/main.ts

# Build
pnpm run build 2>&1 | tail -20

# E2E Tests
npx playwright test e2e/kanban-e2e.spec.ts 2>&1 | tail -20
```

---

## Notes
- `agentSuggestions` derived store (`kanbanState.ts:469`) มี logic priority-based อยู่แล้ว — auto-claim engine ใช้ `[0]` (top priority) จาก suggestions
- `AGENT_SUGGEST_RULES` (`kanbanState.ts:44`) define ว่า column ไหนมี agent ไหนบ้าง — columns ที่ array ว่าง (`backlog`, `hold`) จะไม่ถูก auto-claim
- `cardDependencies` derived store (`kanbanState.ts:123`) ให้ blockedBy/blocking info — ต้องเช็คว่า blocking cards ทั้งหมด lifecycle === 'completed' ก่อน claim
- ระบบ auto-claim ไม่ได้ launch agent process จริง (ไม่ POST ไป `/agent/launch`) — แค่ assign agent + set lifecycle เป็น 'started' เพื่อรอ user confirm
