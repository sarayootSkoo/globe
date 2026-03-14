# Discussion: Pixel Agents + Voice Commands Integration เข้า Knowledge Graph Kanban

**Date:** 15-03-2026 01:35
**Context:** ต้องการนำแนวคิดจาก pixel-agents-main (VS Code extension แสดง AI agents เป็น pixel art characters) มาใส่ใน knowledge-graph kanban board พร้อมเพิ่มระบบสั่งงานด้วยเสียง
**Participants:** Developer + AI Reviewer
**Status:** Agreed

---

## Background

กำลังพัฒนา knowledge-graph ซึ่งมี kanban board สำหรับจัดการ SDLC tasks ที่ถูกดำเนินการโดย AI agents (13 agent types). ปัจจุบัน agent status แสดงเป็น dot สีเล็กๆ (`AgentStatusIndicator.svelte`) — ไม่ engaging และไม่สื่อว่า agent ทำอะไรอยู่จริงๆ. มี pixel-agents-main ที่ทำเรื่องนี้ได้ดีมากแล้ว (animated pixel art characters ใน office) จึงต้องการ port แนวคิดมา + เพิ่ม voice command ให้สั่งงาน hands-free

---

## Discussion Points

### Question 1: Rendering approach — Canvas overlay vs Embedded in HTML vs Three.js?

**Context:**
Knowledge-graph มีทั้ง HTML kanban board (DOM-based) และ Three.js renderer (`KanbanRenderer.ts` — renders cards เป็น 3D boxes). Pixel-agents ใช้ Canvas 2D แยกต่างหาก. ต้องเลือกว่าจะ render pixel characters ยังไง.

**Analysis:**

| Option | Pros | Cons |
|--------|------|------|
| **A: Canvas 2D overlay** บน HTML kanban | ไม่แก้ UI เดิม, `pointer-events: none` ไม่ block interaction, pixel-perfect rendering ง่าย, port จาก pixel-agents ได้ตรง | อีก layer ซ้อนกัน, ต้อง sync DOM positions, canvas resize tracking |
| **B: Embed ใน HTML cards** | ตำแหน่งถูกต้องเสมอ (อยู่ใน DOM), ไม่ต้อง track position | แก้ component เยอะ, sprite rendering ใน DOM ช้ากว่า canvas, ไม่มี cross-column walk animation |
| **C: Three.js** (extend KanbanRenderer) | ใช้ infrastructure ที่มีอยู่, 3D effects ได้ | KanbanRenderer เป็น TODO ยังไม่ integrated จริง, overkill สำหรับ 2D sprites, pixel-perfect ยากใน 3D |

**Decision:** **Option A — Canvas 2D overlay** เพราะ:
1. Port จาก pixel-agents ได้ง่ายที่สุด (same rendering model)
2. ไม่ต้องแก้ไข HTML kanban UI ที่ทำงานดีอยู่แล้ว
3. `pointer-events: none` + z-index control ทำให้ characters ลอยอยู่เหนือ board โดยไม่ block interaction
4. Animation (walk ข้าม columns) ทำได้เต็มที่บน canvas

### Question 2: Voice activation model — Always-on vs Push-to-talk vs Wake word?

**Context:**
เพิ่มระบบ voice command ให้สั่ง agent ด้วยเสียง. Project มี `audioReactive.ts` ที่ request mic access อยู่แล้วสำหรับ FFT visualization. ต้องเลือก activation model.

**Analysis:**

| Option | Pros | Cons |
|--------|------|------|
| **A: Always-on** (continuous listening) | Hands-free สุดๆ | กิน battery, background noise = false triggers, privacy concern, SpeechRecognition ต้อง restart ทุก ~60s |
| **B: Push-to-talk** (V key hold / mic button) | ชัดเจนว่าเมื่อไหร่ user ตั้งใจสั่ง, ไม่กิน battery, ไม่มี false trigger | ต้องกดปุ่ม (ไม่ 100% hands-free), ต้องจำ shortcut |
| **C: Wake word** ("Hey Agent") | Natural interaction, ไม่ต้องจำ shortcut | ต้อง implement wake word detection (ซับซ้อน), Web Speech API ไม่รองรับ native, ต้อง always-on บางส่วน |

**Decision:** **Option B — Push-to-talk (V key)** เพราะ:
1. ไม่มี false command trigger — critical เพราะ commands execute real actions (launch agents, move cards)
2. ไม่กิน battery เมื่อไม่ใช้
3. V key สะดวก — อยู่ใกล้ WASD ที่ user คุ้นเคยจาก globe mode
4. Wake word ไว้ทำ future — complexity สูงเกินไปสำหรับ v1

### Question 3: Language support — Thai only vs English only vs Dual?

**Context:**
User เป็นคนไทย แต่ command names เป็นภาษาอังกฤษ (`/implement`, `/review`). Card labels ปนทั้งไทยและอังกฤษ.

**Analysis:**

| Option | Pros | Cons |
|--------|------|------|
| **A: Thai only** (`th-TH`) | Natural สำหรับ user | จับ technical terms ภาษาอังกฤษไม่ดี ("implement" อาจกลายเป็น "อิมพลีเมนต์") |
| **B: English only** (`en-US`) | จับ command names ได้ accurate | ไม่ natural สำหรับ user ที่พูดไทย |
| **C: Dual** (toggle TH/EN + Thai patterns ที่มี English embedded) | ยืดหยุ่นที่สุด, รองรับทั้ง "สั่ง implement" และ "run implement" | ซับซ้อนกว่า, ต้อง maintain 2 ชุด patterns |

**Decision:** **Option C — Dual language** with toggle เพราะ:
1. Real-world usage จะปน TH+EN — "สั่ง implement card allocation" คือ pattern จริง
2. Intent patterns แยก TH/EN ชัดเจน ไม่ปนกัน
3. Toggle button (🇹🇭/🇺🇸) ง่ายสำหรับ user ที่ต้องการ switch
4. Default `th-TH` เพราะ user เป็นคนไทย

### Question 4: Voice → Action safety — Direct execute vs Confirmation?

**Context:**
Voice recognition ไม่ 100% accurate. การสั่ง `/implement` ผิด card อาจ launch agent ที่ไม่ต้องการ.

**Analysis:**

| Option | Pros | Cons |
|--------|------|------|
| **A: Direct execute** (ไม่ confirm) | เร็ว, hands-free จริงๆ | สั่งผิดได้ → waste tokens, wrong agent launched |
| **B: Always confirm** | ปลอดภัย 100% | ช้า, ต้อง click confirm ทุกครั้ง → ลด benefit ของ voice |
| **C: Smart confirm** (confirm เฉพาะ destructive + fuzzy match < 90%) | Balance ระหว่าง speed + safety | Logic ซับซ้อนกว่า |

**Decision:** **Option B — Always confirm (v1)** แล้วค่อย evolve เป็น Option C เพราะ:
1. v1 ต้อง safe ก่อน — voice recognition accuracy ยังไม่ proven
2. Confirm dialog แสดง top-3 candidates → user เห็น fuzzy match results
3. 1 click confirm ยังดีกว่า 4 clicks ของ flow เดิม
4. Setting `voiceConfirmRequired` ไว้ให้ user ปิดได้ถ้ามั่นใจ

### Question 5: Shared mic stream — audioReactive + SpeechRecognition?

**Context:**
`audioReactive.ts` ใช้ `getUserMedia({ audio: true })` สำหรับ FFT visualization. Voice command ก็ต้องใช้ mic. จะ share ยังไง?

**Analysis:**
- `SpeechRecognition` API **ไม่รับ MediaStream parameter** — มัน request mic เอง internally
- แต่ browser จะ prompt permission แค่ครั้งเดียวถ้า already granted
- ปัญหา: `audioReactive` อาจ interfere กับ `SpeechRecognition` audio processing

| Option | Pros | Cons |
|--------|------|------|
| **A: Independent streams** | Simple, ไม่ interfere | User อาจเห็น 2 mic permission prompts |
| **B: Pause audioReactive ขณะ voice** | ไม่ interfere | Visual effects หยุดขณะพูด |
| **C: Run ทั้งสองพร้อมกัน** | Best UX | อาจ interfere (browser-dependent) |

**Decision:** **Option C — Run ทั้งสองพร้อมกัน** with fallback to Option B เพราะ:
1. Modern browsers handle multiple audio consumers ได้ดี
2. Push-to-talk session สั้น (2-5 วินาที) → interference minimal
3. Fallback: ถ้า SpeechRecognition error → pause audioReactive → retry → resume

---

## Key Insights

- **Pixel-agents ออกแบบดีมาก** — Character FSM (idle/walk/type/read), BFS pathfinding, z-sort rendering, matrix effects เป็น proven patterns ที่ port ได้ตรง. ไม่ต้อง reinvent
- **Canvas overlay เป็น pattern ที่ดี** สำหรับ augmenting existing UI — ไม่ต้องแก้ DOM, `pointer-events: none` ทำให้ไม่กระทบ UX เดิม, ใช้ได้ทั้ง game characters และ voice visualization
- **Voice command ของ kanban board ต่างจาก general voice assistant** — vocabulary จำกัด (13 commands + card names) → ไม่ต้อง NLU ที่ซับซ้อน, regex intent patterns + fuzzy card matching เพียงพอ
- **Push-to-talk + confirmation = safest v1** — เมื่อ voice recognition ยังไม่ proven, conservative approach ดีกว่า. ค่อย relax constraints เมื่อ user มั่นใจ
- **audioReactive.ts เป็น precedent ที่ดี** — project มี mic infrastructure อยู่แล้ว, user คุ้นเคยกับ granting mic permission, UX pattern (toggle button) สามารถ reuse ได้
- **Agent type → animation mapping เป็น natural fit** — implement/chore = typing, review/validate = reading สื่อความหมายได้ตรงโดยไม่ต้อง label

---

## Code References

| File | Line | Relevance |
|------|------|-----------|
| `src/components/kanban/AgentStatusIndicator.svelte` | :62-102 | AS-IS: status dot rendering ที่จะถูก augment ด้วย pixel characters |
| `src/lib/stores/agentHealth.ts` | :72-95 | Derived health snapshot ที่ track running count — ใช้สำหรับ character spawn/despawn |
| `src/lib/stores/agentEventStore.ts` | all | WebSocket event source → pixelAgentState mapping |
| `src/lib/stores/audioReactive.ts` | :97-117 | `startAudio()` — mic access + AudioContext setup ที่อาจ share กับ voice |
| `src/lib/workflow/commandRegistry.ts` | :4-165 | COMMAND_REGISTRY — 13 commands เป็น vocabulary สำหรับ voice intent matching |
| `src/lib/stores/commandState.ts` | all | `queueCommand()` — entry point สำหรับ voice → execute pipeline |
| `src/lib/renderers/KanbanRenderer.ts` | :1-6 | TODO: 3D Kanban ยังไม่ integrated — ไม่ใช้สำหรับ pixel agents |
| `src/lib/types.ts` | :91-106 | AgentType union — 13 types mapped to character animations |
| `src/lib/types.ts` | :138-147 | CardLifecycleState — mapped to speech bubbles |

---

## Action Items

- [ ] สร้าง spec file (done: `specs/chore-15_03_2026_01_13_32-pixel-agents-kanban-integration.md`)
- [ ] Breakdown spec เป็น tasks — `/breakdown` on the spec
- [ ] Check JIK-A-4 Metro City sprite license — อาจต้องสร้าง custom characters
- [ ] Prototype voice recognition accuracy ก่อน full implementation — ทดสอบ Web Speech API กับ Thai + mixed TH/EN sentences
- [ ] ตัดสินใจ v1 scope: Pixel agents only (Task 1-10) หรือ Pixel + Voice (Task 1-16)?

---

## Related

- `specs/chore-15_03_2026_01_13_32-pixel-agents-kanban-integration.md` — Implementation spec (16 tasks)
- `src/lib/renderers/KanbanRenderer.ts` — Existing 3D kanban renderer (unused, for reference)
- Pixel Agents Main — `../pixel-agents-main/` source code
- `discussion/kanban-layer1-foundation-types-12_03_2026_11_36_33.md` — Previous kanban architecture discussion
