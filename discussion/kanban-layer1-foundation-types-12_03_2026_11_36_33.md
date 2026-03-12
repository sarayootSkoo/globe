# Discussion: Kanban Foundation Types — Layer 1 Implementation

**Date:** 12-03-2026 11:36
**Context:** เริ่ม implement Layer 1 (Foundation Types) จาก 2 specs ที่ออกแบบไว้ เพื่อ unblock ทุก layer ข้างบน
**Participants:** Developer + AI Reviewer
**Status:** Agreed

---

## Background

ออกแบบ Kanban Workflow System ไว้ 2 specs (~5,000 lines รวมกัน):
- `specs/chore-12_03_2026_09_30_34-P1-command-workflow-system.md` — Command→SDLC mapping, 13 commands
- `specs/chore-12_03_2026_10_15_05-P1-kanban-workflow-full-system.md` — 12 Parts: lifecycle, DB, real-time, preview, iteration

ต้องตัดสินใจว่า implement อันไหนก่อน → วิเคราะห์ dependency chain → เริ่มที่ Foundation Types

---

## Discussion Points

### Question 1: ทำ spec ไหนก่อน — Command Workflow หรือ Full System?

**Context:**
2 specs มี dependencies ที่พันกัน — ไม่สามารถทำ spec A จบแล้วค่อย spec B ได้

**Analysis:**
วิเคราะห์ dependency layers ข้าม specs:

| Layer | ต้องการจาก Spec | ขนาดงาน | Unblocks |
|-------|----------------|---------|----------|
| 1. Foundation Types | ทั้ง 2 specs | ~200 lines | ทุก layer |
| 2. Command Registry + Workflow Engine | Command spec | ~400 lines | UI, templates |
| 3. UI Components (Preview, Re-run) | Full System spec | ~500 lines | User interaction |
| 4. Command Templates | Command spec | ~500 lines | Claude integration |

| Option | Pros | Cons |
|--------|------|------|
| ทำ Command spec ก่อนจบ | Logic ครบ | UI ยังไม่มี, ทดสอบยาก |
| ทำ Full System spec ก่อนจบ | UI เห็นผลเลย | ขาด types, registry |
| **ทำเป็น layers ข้าม specs** | **ทำทีละ layer ที่ unblock ถัดไป** | **ต้อง track cross-spec** |

**Decision:** ทำเป็น layers ข้าม specs — Layer 1 (types) ก่อน เพราะทุกอย่างพึ่ง types

### Question 2: AgentType ควรเป็น union type หรือ string?

**Context:**
ปัจจุบันเป็น union `'implement' | 'validate' | ... | null` — ต้องเพิ่มจาก 6 เป็น 13 ตัว

**Analysis:**

| Option | Pros | Cons |
|--------|------|------|
| Union type (คงเดิม) | Type-safe, autocomplete | ต้องแก้ทุกจุดเมื่อเพิ่ม |
| String type | Flexible, ไม่ต้องแก้ types | ไม่มี autocomplete, typo risk |

**Decision:** คง union type — type safety สำคัญกว่า flexibility เพราะ command registry ขึ้นกับ agent name ที่ถูกต้อง

### Question 3: KanbanCard — เพิ่ม fields ใหม่เป็น required หรือ optional?

**Context:**
KanbanCard ต้องเพิ่ม lifecycle, iterationCount, iterationScore, uploadPath, artifactPath

**Analysis:**
- ถ้า required: ต้องแก้ทุกจุดที่สร้าง KanbanCard (kanbanState.ts + KanbanRenderer.ts)
- ถ้า optional: backward compatible แต่ต้อง null check ทุกจุดที่ใช้

**Decision:** `lifecycle`, `iterationCount`, `iterationScore` เป็น **required** (มี default values) — ส่วน `uploadPath`, `artifactPath`, `lastCommand`, `lastRunAt`, `isLocal` เป็น **optional** เพราะไม่ใช่ทุก card ที่มี

### Question 4: Local Cards — สร้าง card จาก UI ที่ไม่มีไฟล์

**Context:**
ปัจจุบัน `kanbanCards` derive จาก `graphNodes` เท่านั้น — card ที่สร้างจาก UI จะไม่ปรากฏ

**Analysis:**
- Gap สำคัญ: CREATE column ต้องมีปุ่ม [+] ให้สร้าง card ใหม่
- Local cards ต้อง persist ใน localStorage แยก
- เมื่อ command สร้าง artifact file แล้ว → local card อาจถูก replace โดย graph node card

**Decision:** เพิ่ม `localCards` writable store → merge เข้า `kanbanCards` derived store — local cards มี `isLocal: true` flag และสร้าง fake `GraphNode` เพื่อ compatibility กับ UI ที่อ่าน `card.node.label`

### Question 5: AGENT_DEFS — ควร add `role` field หรือไม่?

**Context:**
Spec ออกแบบ 12 AI agent roles (Tech Lead, PM, Developer, etc.) — AGENT_DEFS ปัจจุบันมีแค่ label, color, icon, command

**Decision:** เพิ่ม `role` field — ใช้แสดงใน UI agent dropdown เป็น subtitle ช่วยให้ user เข้าใจว่า agent ทำอะไร

---

## Key Insights

- **Layer 1 เป็นงานเล็กที่สุด (~200 lines เปลี่ยน, ~300 lines ใหม่) แต่ unblock ทุก layer** — เป็น leverage point ที่ดี
- **Backward compatible ได้ 100%** — `AgentType` expand union ไม่ break existing code, `KanbanCard` new fields มี defaults, `AGENT_DEFS` expand entries ไม่ break `Object.entries()` iteration
- **`KanbanRenderer.ts` (3D kanban) ไม่ต้องแก้** — ใช้ `KanbanCard` แต่ new fields เป็น optional หรือมี default values
- **localStorage keys ใหม่ 3 ตัว** (lifecycle, iterations, local-cards) — แยกจาก keys เดิม (agents, moves) ไม่ conflict

---

## Code References

| File | Line | Relevance |
|------|------|-----------|
| `src/lib/types.ts` | 76-134 (old) → 76-300+ (new) | Expanded types: AgentType, lifecycle, workflow, events |
| `src/lib/stores/kanbanState.ts` | 21-28 (old) → 24-40 (new) | AGENT_DEFS: 6→13 agents with role field |
| `src/lib/stores/kanbanState.ts` | 107-127 (old) → merged | kanbanCards: now merges graphNodes + localCards |
| `src/lib/workflow/commandRegistry.ts` | NEW | 13 command definitions + helpers |
| `src/lib/workflow/workflowEngine.ts` | NEW | 4 workflow chains + execution logic |
| `src/components/kanban/KanbanBoard.svelte` | 252-263 | Agent dropdown — auto-shows 13 agents (no change needed) |

---

## Action Items

- [x] Expand `AgentType` union: 6 → 13
- [x] Add `CardLifecycleState`, `PauseReason` types
- [x] Add workflow types (transition, chain, execution)
- [x] Add iteration types (score, record)
- [x] Add real-time event types (24 event types)
- [x] Add `CommandDef` interface
- [x] Expand `KanbanCard` with lifecycle + iteration + upload fields
- [x] Expand `AGENT_DEFS` to 13 agents with `role` field
- [x] Add `AGENT_SUGGEST_RULES` per column
- [x] Add `localCards`, `lifecycleStates`, `iterationStates` stores
- [x] Merge graphNodes + localCards in `kanbanCards` derived store
- [x] Add action functions: `addLocalCard`, `updateLifecycle`, `updateIteration`
- [x] Create `commandRegistry.ts` with 13 commands + helpers
- [x] Create `workflowEngine.ts` with 4 chains + execution logic
- [x] Build passes: `pnpm run build` ✓

---

## Related

- `specs/chore-12_03_2026_09_30_34-P1-command-workflow-system.md` — Command Workflow spec
- `specs/chore-12_03_2026_10_15_05-P1-kanban-workflow-full-system.md` — Full System spec (12 Parts)
- `discussion/kanban-ai-agent-sdlc-12_03_2026_07_31_01.md` — Original SDLC pipeline design
