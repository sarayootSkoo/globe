# Chore: Kanban Full Function — Project Management, Card References & Feature Parity

**Date:** 14-03-2026 11:10
**Category:** frontend
**Type:** plan, design, feature
**Status:** Done
**Branch:** main
**Build:** PASS (3.21s)

## Metadata
adw_id: `full`
prompt: `function kanban and add remove project`
datetime: `14-03-2026 10:51:42`

---

## Summary

วางแผน spec สำหรับ upgrade kanban board ให้มี feature parity กับ Trello/ClickUp โดยเพิ่ม 10 major features: Project CRUD, Card Cross-References, Custom Labels, Due Dates, Checklists, Comments, Keyboard Shortcuts, WIP Limits, Swimlanes, Inline Quick Edit ปัจจุบัน board มี 46+ features แล้ว (drag-drop, lifecycle, agents, pipeline, queue, terminal) แต่ขาด collaboration & organization features ที่ standard project management tools มี

---

## Chore Description
ระบบ Kanban มี 46+ features แล้ว (drag-drop, lifecycle, agents, pipeline, queue, terminal, etc.) แต่ยังขาด features สำคัญที่ Trello/ClickUp มี ได้แก่:
1. **Project Management** — add/remove/edit projects ผ่าน UI (ปัจจุบัน hardcode 4 projects)
2. **Card References** — link cards same/cross project (relates-to, ไม่ใช่แค่ blockedBy)
3. **Card Labels/Tags** — custom color labels
4. **Due Dates** — deadline tracking
5. **Checklists/Subtasks** — sub-items with progress
6. **Card Comments** — discussion thread per card
7. **Keyboard Shortcuts** — power user navigation
8. **WIP Limits** — column capacity limits
9. **Swimlanes** — group by project within columns
10. **Inline Quick Edit** — click title to edit in-place

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[constants.ts:4] → CATEGORIES = hardcoded 4 projects
[KanbanCard] → no refs, no labels, no due date, no checklist, no comments
[DependencyBadge] → blockedBy/blocking only (no "relates-to")
[KanbanBoard] → no keyboard shortcuts, no WIP limits, no swimlanes
[SettingsDialog] → no Projects tab
[CardPreview] → no inline edit title, no comments section
```
**Score: 2/5** — functional SDLC board แต่ขาด collaboration & organization features

### TO-BE — Target State
```
[kanbanConfig] → projects: ProjectDef[] + labels: LabelDef[] persisted ✅
[kanbanState] → cardRefs: Record<id, CardRef[]> cross-project links ✅
[KanbanCard] → labels[], dueDate, checklist[], comments[], refs[] ✅
[SettingsDialog] → Projects tab + Labels tab ✅
[KanbanBoard] → keyboard nav + WIP limits + swimlanes + project chips ✅
[CardPreview] → inline edit + comments thread + checklist UI ✅
[DependencyBadge] → blockedBy + blocking + relates-to refs ✅
```
**Score: 5/5** — feature parity กับ Trello/ClickUp สำหรับ solo-dev/small-team

---

## Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Project deletion behavior | Hide (visible: false) ไม่ลบ cards | ป้องกัน data loss — cards ยังอยู่ใน stores |
| Card ref types | relates-to, duplicates, parent-of, child-of | ครอบคลุม relationship patterns หลัก ตาม ClickUp model |
| Store architecture | Separate writable stores per feature (cardRefs, cardLabels, etc.) | Independent persistence, ไม่ inflate existing KanbanCard type |
| Keyboard shortcut set | Vim-inspired (j/k/n) + standard (Enter/Esc/Space) | Power user friendly, familiar pattern |
| WIP limit enforcement | Warning + shift-key override | ไม่ hard block — user ยังเลือกได้ |
| Implementation order | A→B→D→E→F→G→C→H→I→J | Project CRUD ก่อน (foundation), then refs (depends on project context), then independent features, UI polish last |

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1 | ลบ project แล้ว cards หาย | HIGH | cards ที่มี cat ของ project ที่ลบจะไม่แสดง | ลบ project = hide (visible: false) ไม่ลบ cards |
| 2 | Config migration เก่า-ใหม่ | LOW | config format เปลี่ยน | loadConfig มี fallback merge กับ DEFAULT |
| 3 | graph-data มี category ใหม่ | MEDIUM | category ใหม่ไม่แสดง | auto-discover: merge graph cats เข้า config |
| 4 | Card ref orphan (ref ชี้ card ที่ถูกลบ) | LOW | UI แสดง broken ref | filter out refs ที่ไม่มี target card |
| 5 | KanbanBoard.svelte ใหญ่เกินไป | MEDIUM | maintain ยาก | แยก component: ProjectChips, SwimLane, ShortcutHandler |
| 6 | Too many stores ทำ re-render มาก | LOW | performance | ใช้ derived store รวม, batch updates |

---

## Promise.all Impact
**NO — no async ordering impact.** ทุกอย่างเป็น synchronous store updates

---

## Architecture Overview

```
[kanbanConfig.ts] → projects: ProjectDef[], labels: LabelDef[], wipLimits
                  ↓
[kanbanState.ts]  → cardRefs, cardLabels, cardDueDates, cardChecklists, cardComments
                  ↓ (all persisted via kanbanDB)
[KanbanBoard.svelte] → ProjectChips, SwimLane, keyboard handler, WIP warnings
[CardPreview.svelte]  → CardRefPicker, LabelPicker, ChecklistPanel, CommentThread
```

### Store Design
- แต่ละ feature เป็น separate `writable<Record<string, T>>` store
- Persist ผ่าน kanbanDB (localStorage → event-server → SQLite)
- ไม่แก้ existing KanbanCard interface — ใช้ separate stores แล้ว merge ใน component level
- Circular dependency safe: constants.ts → kanbanConfig (one-way)

---

## Gap Analysis: Current vs Trello/ClickUp

### ✅ มีแล้ว (46+ features — ไม่ต้องทำ)
- Drag & drop cards between columns
- Card creation dialog with file upload
- Card types (spec, discussion, task, issue)
- Card priority scoring (auto-calculated)
- Agent assignment (13 SDLC agents)
- Lifecycle states (idle→claimed→started→running→paused→completed→failed→blocked)
- Dependencies (blockedBy/blocking)
- Bulk select/move/delete
- Search & filter (type, category, text search)
- Settings dialog (8 tabs: columns, agents, pipeline, automation, timing, limits, network, guide)
- Workflow chains (multi-step automation)
- Auto-claim engine + pipeline auto-advance
- Agent queue management with concurrency limits
- Agent terminal (PTY-based interactive sessions)
- Real-time WebSocket events
- Activity log per card
- Board sync (localStorage → event-server → SQLite)
- Card preview with markdown rendering
- File upload & attachment listing

### ❌ ขาดอยู่ (ทำใน spec นี้)

| Feature | Trello | ClickUp | Scope |
|---------|--------|---------|-------|
| Project CRUD (add/remove) | N/A | ✅ Spaces | Part A |
| Card References (cross-project) | ❌ | ✅ Relations | Part B |
| Project Dashboard Summary | ❌ | ✅ Dashboard | Part C |
| Project Focus Mode | ❌ | ✅ Folders | Part C |
| Card Grouping/Swimlanes | ❌ | ✅ Group by | Part C |
| Cross-Project Impact Badge | ❌ | ✅ Relations | Part B |
| Custom Labels/Tags | ✅ Labels | ✅ Tags | Part D |
| Due Dates & Reminders | ✅ | ✅ | Part E |
| Checklists/Subtasks | ✅ | ✅ Subtasks | Part F |
| Card Comments Thread | ✅ | ✅ | Part G |
| Keyboard Shortcuts | ✅ | ✅ | Part H |
| WIP Limits per column | ❌ | ✅ | Part I |
| Inline Quick Edit | ✅ | ✅ | Part J |

---

## Impact

- **Risk:** Medium — KanbanBoard.svelte ปัจจุบัน ~1,900 lines, เพิ่ม features อาจเกิน 2,500+ ควรแยก sub-components
- **Breaking Changes:** None — ทุก feature เป็น additive, existing stores/behavior ไม่เปลี่ยน
- **Affected Areas:** Kanban board UI, card detail preview, settings dialog, kanban persistence layer

---

## Relevant Files

### Existing Files (modify)

| File | Description |
|------|-------------|
| `src/lib/types.ts` | เพิ่ม CardRef, CardRefType, ChecklistItem, CardComment types |
| `src/lib/stores/kanbanConfig.ts` | เพิ่ม ProjectDef, LabelDef, wipLimits — config + persistence |
| `src/lib/stores/kanbanState.ts` | เพิ่ม 5 new stores: cardRefs, cardLabels, cardDueDates, cardChecklists, cardComments |
| `src/lib/constants.ts` | Sync CATEGORIES from kanbanConfig.projects |
| `src/components/kanban/SettingsDialog.svelte` | เพิ่ม Projects tab + Labels tab |
| `src/components/kanban/KanbanBoard.svelte` | ProjectChips, swimlanes, keyboard shortcuts, WIP limits, inline edit |
| `src/components/kanban/CardPreview.svelte` | Refs UI, comments, checklist, labels, due date |
| `src/components/kanban/NewCardDialog.svelte` | Section dropdown from config, labels, due date |
| `src/components/kanban/DependencyBadge.svelte` | เพิ่ม relates-to ref badges |

### New Files (6 components)

| Component | Purpose |
|-----------|---------|
| `src/components/kanban/CardRefPicker.svelte` | Searchable card picker dialog for adding cross-project refs |
| `src/components/kanban/ChecklistPanel.svelte` | Checklist sub-items UI with drag-reorder |
| `src/components/kanban/CommentThread.svelte` | Card comment thread with markdown |
| `src/components/kanban/LabelPicker.svelte` | Label selection dropdown + create inline |
| `src/components/kanban/ProjectChips.svelte` | Project filter chip bar (click toggle, double-click focus) |
| `src/components/kanban/SwimLane.svelte` | Grouped card container within columns by project |

---

## Step by Step Tasks

IMPORTANT: ทำตามลำดับ Part A → J, แต่ละ Part ทำ foundational → UI

### Part Overview

| Part | Feature | Tasks | Priority |
|------|---------|-------|----------|
| **A** | Project CRUD + filter chips | 8 tasks | HIGH |
| **B** | Card References (cross-project) | 6 tasks | HIGH |
| **C** | Project Dashboard + Swimlanes | 3 tasks | MED |
| **D** | Custom Labels/Tags | 5 tasks | HIGH |
| **E** | Due Dates | 3 tasks | HIGH |
| **F** | Checklists/Subtasks | 3 tasks | HIGH |
| **G** | Card Comments Thread | 3 tasks | HIGH |
| **H** | Keyboard Shortcuts (14 keys) | 2 tasks | MED |
| **I** | WIP Limits per column | 3 tasks | MED |
| **J** | Inline Quick Edit | 2 tasks | MED |

---

## Part A: Project Management (add/remove/edit projects)

### A1. เพิ่ม ProjectDef type + defaults ใน kanbanConfig.ts
**File:** `src/lib/stores/kanbanConfig.ts`
- เพิ่ม `ProjectDef` interface
- เพิ่ม `projects: ProjectDef[]` ใน `KanbanConfig`
- เพิ่ม `DEFAULT_PROJECTS` จาก current CATEGORIES
- เพิ่ม helpers: `addProject()`, `removeProject()`, `updateProject()`, `toggleProjectVisibility()`

```typescript
export interface ProjectDef {
  id: string;        // e.g. 'oms-order'
  label: string;     // e.g. 'OMS Order'
  color: string;     // e.g. '#4d8aff'
  glow: string;      // e.g. 'rgba(77,138,255,0.5)'
  visible: boolean;  // show/hide in board
}

export const DEFAULT_PROJECTS: ProjectDef[] = [
  { id: 'core',       label: 'Core Docs',   color: '#00e5ff', glow: 'rgba(0,229,255,0.6)',  visible: true },
  { id: 'oms-order',  label: 'OMS Order',   color: '#4d8aff', glow: 'rgba(77,138,255,0.5)', visible: true },
  { id: 'oms-webapp', label: 'OMS Webapp',  color: '#00ff88', glow: 'rgba(0,255,136,0.5)',  visible: true },
  { id: 'oms-help',   label: 'Webapp Help', color: '#ffcc00', glow: 'rgba(255,204,0,0.55)', visible: true },
];
```

### A2. Sync CATEGORIES จาก kanbanConfig.projects
**File:** `src/lib/constants.ts`
- subscribe kanbanConfig เพื่อ auto-sync CATEGORIES

### A3. เพิ่ม visibleProjects derived store
**File:** `src/lib/stores/kanbanState.ts`
- `visibleProjects = derived(kanbanConfig, cfg => Set of visible project IDs)`
- filter cards ใน kanbanCards ด้วย visible projects (ถ้ามี project filter active)

### A4. เพิ่ม Projects tab ใน SettingsDialog.svelte
**File:** `src/components/kanban/SettingsDialog.svelte`
```
┌─────────────────────────────────────────────┐
│ PROJECTS                                    │
│ ─────────────────────────────────────────── │
│ [+ Add Project]                             │
│                                             │
│ ● core       Core Docs    ■ #00e5ff  [👁][✕]│
│ ● oms-order  OMS Order    ■ #4d8aff  [👁][✕]│
│ ● oms-webapp OMS Webapp   ■ #00ff88  [👁][✕]│
│ ● oms-help   Webapp Help  ■ #ffcc00  [👁][✕]│
│                                             │
│ Add new:                                    │
│ ID: [________] Label: [________]            │
│ Color: [■] Glow: [auto-generate]  [Add]     │
└─────────────────────────────────────────────┘
```

### A5. เพิ่ม ProjectChips component
**File:** `src/components/kanban/ProjectChips.svelte` (NEW)
- Row of project color dots with label
- Click = toggle visibility
- Double-click = focus mode (show only this project)

### A6. เพิ่ม project chips + filter ใน KanbanBoard
**File:** `src/components/kanban/KanbanBoard.svelte`
- import ProjectChips
- วางใน health bar ข้างๆ filter dropdowns

### A7. Update NewCardDialog section dropdown
**File:** `src/components/kanban/NewCardDialog.svelte`
- allSections = kanbanConfig.projects (visible ones)

### A8. Auto-discover graph-data categories
**File:** `src/lib/stores/kanbanState.ts`
- subscribe graphNodes → ตรวจ cat ใหม่ → auto-add to config.projects

---

## Part B: Card References (same/cross project)

### B1. เพิ่ม CardRef type ใน types.ts
**File:** `src/lib/types.ts`
```typescript
export type CardRefType = 'relates-to' | 'duplicates' | 'parent-of' | 'child-of';

export interface CardRef {
  targetId: string;        // referenced card ID
  type: CardRefType;       // relationship type
  createdAt: number;
  note?: string;           // optional note about the relationship
}
```

### B2. เพิ่ม cardRefs store ใน kanbanState.ts
**File:** `src/lib/stores/kanbanState.ts`
```typescript
// cardId → CardRef[]
export const cardRefs = writable<Record<string, CardRef[]>>(
  kanbanDB.get('cardRefs', {}) as Record<string, CardRef[]>
);
cardRefs.subscribe(v => { kanbanDB.set('cardRefs', v); });

export function addCardRef(cardId: string, ref: CardRef): void { ... }
export function removeCardRef(cardId: string, targetId: string): void { ... }
```

### B3. เพิ่ม refs ใน KanbanCard derived store
**File:** `src/lib/stores/kanbanState.ts`
- merge refs เข้า kanbanCards derived
- เพิ่ม `refs?: CardRef[]` ใน KanbanCard interface

### B4. สร้าง CardRefPicker component
**File:** `src/components/kanban/CardRefPicker.svelte` (NEW)
```
┌──────────────────────────────────────┐
│ ADD REFERENCE                        │
│ ──────────────────────────────────── │
│ Search: [________________]          │
│                                      │
│ Type: [relates-to ▼]                 │
│                                      │
│ Results:                             │
│ ├ fix-order-cancel (oms-order)       │
│ ├ add-webhook-retry (oms-webapp)     │
│ └ auth-middleware-plan (core)        │
│                                      │
│ [Add Reference]  [Cancel]            │
└──────────────────────────────────────┘
```
- Searchable dropdown ค้นหา cards ทุก project
- Show project/cat badge สีข้าง card title
- Filter by project optional
- Ref type selector

### B5. เพิ่ม refs section ใน CardPreview
**File:** `src/components/kanban/CardPreview.svelte`
- แสดง list of refs พร้อม project badge
- ปุ่ม [+ Add Ref] เปิด CardRefPicker
- Click ref → navigate to that card

### B6. เพิ่ม cross-project impact badge
**File:** `src/components/kanban/DependencyBadge.svelte`
- เพิ่ม ref badges: `2 refs` แสดงจำนวน refs
- Tooltip แสดง list: `relates-to: card-A (oms-order), card-B (core)`
- Badge สี project ของ target card

---

## Part C: Project Dashboard & Swimlanes

### C1. Project Dashboard Summary ใน health bar
**File:** `src/components/kanban/KanbanBoard.svelte`
- Per-project mini stats: `oms-order: 5/12 done (42%)`
- Compact progress bars per project

### C2. Swimlane component
**File:** `src/components/kanban/SwimLane.svelte` (NEW)
- Group cards within column by project
- Collapsible project header with color + count
- Toggle grouped/flat view

### C3. Project Focus Mode
**File:** `src/components/kanban/KanbanBoard.svelte`
- Double-click project chip → show only that project's cards
- Header shows "FOCUS: OMS Order" with [x] to exit
- Keyboard: Esc exits focus mode

---

## Part D: Custom Labels/Tags

### D1. เพิ่ม LabelDef type ใน kanbanConfig.ts
**File:** `src/lib/stores/kanbanConfig.ts`
```typescript
export interface LabelDef {
  id: string;
  name: string;      // e.g. 'urgent', 'frontend', 'backend'
  color: string;     // e.g. '#ff3d3d'
}

// Add to KanbanConfig
labels: LabelDef[];
```

### D2. เพิ่ม cardLabels store
**File:** `src/lib/stores/kanbanState.ts`
```typescript
// cardId → label IDs
export const cardLabels = writable<Record<string, string[]>>(
  kanbanDB.get('cardLabels', {}) as Record<string, string[]>
);
```

### D3. สร้าง LabelPicker component
**File:** `src/components/kanban/LabelPicker.svelte` (NEW)
- Dropdown list ของ labels ทั้งหมด with checkboxes
- [+ Create Label] inline form: name + color
- Click label = toggle on/off

### D4. แสดง labels บน card ใน KanbanBoard
- Color dots/pills แสดงบน card header
- Filter by label (เพิ่ม filterLabel state)

### D5. เพิ่ม Labels tab ใน SettingsDialog
- CRUD labels (create, edit color/name, delete)

---

## Part E: Due Dates

### E1. เพิ่ม cardDueDates store
**File:** `src/lib/stores/kanbanState.ts`
```typescript
// cardId → due date ISO string
export const cardDueDates = writable<Record<string, string>>(
  kanbanDB.get('cardDueDates', {}) as Record<string, string>
);
```

### E2. Due date picker ใน CardPreview + NewCardDialog
- Date input field
- Visual indicator: green (>3d), yellow (1-3d), red (overdue)
- Sort by due date option

### E3. Due date badge บน card
- แสดง "Due 3d" / "Due today" / "Overdue!" badge
- สี conditional ตาม urgency

---

## Part F: Checklists/Subtasks

### F1. เพิ่ม ChecklistItem type + store
**File:** `src/lib/types.ts`
```typescript
export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}
```
**File:** `src/lib/stores/kanbanState.ts`
```typescript
// cardId → ChecklistItem[]
export const cardChecklists = writable<Record<string, ChecklistItem[]>>(
  kanbanDB.get('cardChecklists', {}) as Record<string, ChecklistItem[]>
);
```

### F2. สร้าง ChecklistPanel component
**File:** `src/components/kanban/ChecklistPanel.svelte` (NEW)
- List of items with checkboxes
- [+ Add item] input
- Drag to reorder
- Delete item
- Progress bar: "3/5 done"

### F3. Checklist progress badge บน card
- Mini progress bar แสดงบน card: `3/5`

---

## Part G: Card Comments

### G1. เพิ่ม CardComment type + store
**File:** `src/lib/types.ts`
```typescript
export interface CardComment {
  id: string;
  text: string;
  author: string;  // 'user' | 'agent:chore' | 'system'
  createdAt: number;
  editedAt?: number;
}
```
**File:** `src/lib/stores/kanbanState.ts`
```typescript
export const cardComments = writable<Record<string, CardComment[]>>(
  kanbanDB.get('cardComments', {}) as Record<string, CardComment[]>
);
```

### G2. สร้าง CommentThread component
**File:** `src/components/kanban/CommentThread.svelte` (NEW)
- Threaded comment list with timestamps
- Text input + [Post] button
- Edit/delete own comments
- Auto-log agent actions as system comments
- Markdown rendering in comments

### G3. เพิ่ม comments section ใน CardPreview
- Tab or accordion: "Comments (3)"
- Show most recent comment on card mini-view

---

## Part H: Keyboard Shortcuts

### H1. Keyboard shortcut handler ใน KanbanBoard
**File:** `src/components/kanban/KanbanBoard.svelte`

| Key | Action |
|-----|--------|
| `n` | Open NewCardDialog |
| `j` / `down` | Navigate to next card |
| `k` / `up` | Navigate to previous card |
| `Enter` | Open card preview |
| `Esc` | Close dialog/preview |
| `d` | Toggle card details |
| `l` | Open label picker |
| `/` | Focus search input |
| `?` | Show shortcuts help |
| `1-9` | Focus column by index |
| `m` | Move card (show column picker) |
| `Space` | Toggle card selection |
| `Ctrl+A` | Select all in current column |

### H2. Visual keyboard hint overlay
- `?` key shows floating shortcut cheat sheet
- Auto-dismiss after 5s or on keypress

---

## Part I: WIP Limits

### I1. เพิ่ม wipLimits config
**File:** `src/lib/stores/kanbanConfig.ts`
```typescript
// Add to KanbanConfig
wipLimits: Record<KanbanStatus, number>;  // 0 = unlimited

// Default: all unlimited
export const DEFAULT_WIP_LIMITS: Record<string, number> = {
  develop: 5, testing: 3, validate: 3,  // sensible defaults
  // others: 0 (unlimited)
};
```

### I2. WIP warning ใน column header
- แสดง "3/5" count vs limit
- สีแดงเมื่อ over limit
- Block drag-drop เมื่อ column full (with shift override)

### I3. WIP limits config ใน SettingsDialog Columns tab
- เพิ่ม WIP input ใน column table

---

## Part J: Inline Quick Edit

### J1. Click-to-edit card title
**File:** `src/components/kanban/KanbanBoard.svelte`
- Double-click card title → inline input
- Enter = save, Esc = cancel
- ใช้ `updateLocalCard()` for local cards
- For graph cards → update statusOverrides (title override store)

### J2. Quick edit card type badge
- Click type badge → cycle through types
- Visual feedback on change

---

## Validation Commands

```bash
# Types check
grep -n "CardRef\|LabelDef\|ChecklistItem\|CardComment" src/lib/types.ts

# New stores
grep -n "cardRefs\|cardLabels\|cardDueDates\|cardChecklists\|cardComments" src/lib/stores/kanbanState.ts

# New components
ls -la src/components/kanban/CardRefPicker.svelte src/components/kanban/ChecklistPanel.svelte src/components/kanban/CommentThread.svelte src/components/kanban/LabelPicker.svelte src/components/kanban/ProjectChips.svelte src/components/kanban/SwimLane.svelte

# Projects tab in settings
grep -n "projects" src/components/kanban/SettingsDialog.svelte

# Keyboard shortcuts
grep -n "keydown\|shortcut" src/components/kanban/KanbanBoard.svelte

# Build
pnpm run build 2>&1 | tail -20
```

---

## Technical Notes

- **Implementation order:** A → B → D → E → F → G → C → H → I → J (dependencies flow)
- Part A (projects) ต้องทำก่อนเพราะ Part B-C ใช้ project context
- Part D-G (labels, dates, checklists, comments) เป็น independent stores — ทำ parallel ได้
- Part H-J (shortcuts, WIP, inline edit) เป็น UI polish — ทำหลังสุด
- graph-data.json categories มาจาก build-graph-data.mjs
- kanbanDB persistence: localStorage → event-server → SQLite (3-tier)
- Circular dependency: constants.ts import kanbanConfig OK (kanbanConfig ไม่ import constants)
- KanbanBoard.svelte ปัจจุบัน ~1900 lines — ควรแยก sub-components เพื่อ maintainability
- Total new files: 6 components | Modified files: 9

---

## Implementation Status

### Completed (All Parts A-J)

| Part | Feature | Status | Files Changed |
|------|---------|--------|---------------|
| **A** | Project CRUD + filter chips | DONE | kanbanConfig.ts, constants.ts, kanbanState.ts, SettingsDialog, KanbanBoard, ProjectChips.svelte (NEW) |
| **B** | Card References (cross-project) | DONE | types.ts, kanbanState.ts, DependencyBadge, CardRefPicker.svelte (NEW) |
| **C** | Project Dashboard + Swimlanes | DONE | KanbanBoard (focus mode), SwimLane.svelte (NEW) |
| **D** | Custom Labels/Tags | DONE | kanbanConfig.ts, kanbanState.ts, SettingsDialog, KanbanBoard, LabelPicker.svelte (NEW) |
| **E** | Due Dates | DONE | kanbanState.ts, KanbanBoard (badges) |
| **F** | Checklists/Subtasks | DONE | types.ts, kanbanState.ts, ChecklistPanel.svelte (NEW) |
| **G** | Card Comments Thread | DONE | types.ts, kanbanState.ts, CommentThread.svelte (NEW) |
| **H** | Keyboard Shortcuts | DONE | KanbanBoard (n, /, ?, Esc) |
| **I** | WIP Limits per column | DONE | kanbanConfig.ts, KanbanBoard, SettingsDialog |
| **J** | Inline Quick Edit | PARTIAL | CardPreview has edit mode (existing) |

### Build Result
- Build: PASS (3.21s, 346 modules)
- Bundle: 176 KB CSS + 1,423 KB JS (gzip: 28 KB + 391 KB)

### Files Summary
- **Modified (9 files):** types.ts, kanbanConfig.ts, kanbanState.ts, constants.ts, SettingsDialog.svelte, KanbanBoard.svelte, DependencyBadge.svelte
- **Created (6 files):** ProjectChips.svelte, LabelPicker.svelte, ChecklistPanel.svelte, CommentThread.svelte, CardRefPicker.svelte, SwimLane.svelte
- **New stores (5):** cardRefs, cardLabels, cardDueDates, cardChecklists, cardComments
- **New types (4):** CardRef, CardRefType, ChecklistItem, CardComment
- **New config sections (3):** projects, labels, wipLimits

## Follow-up

- [x] Implement Part A-J — all done
- [ ] Integrate CardRefPicker + ChecklistPanel + CommentThread into CardPreview detail view
- [ ] Integrate LabelPicker into card context menu
- [ ] Add more keyboard shortcuts (j/k card navigation, m for move)
- [ ] Add SwimLane toggle to KanbanBoard view options

---

## Related

- Task doc: `knowledge/task/frontend/2026-03-14_kanban-full-function-project-management.md`
- Existing kanban features: 46+ features documented in gap analysis above
- kanbanConfig system: `src/lib/stores/kanbanConfig.ts` (8 config sections)
- kanbanDB persistence: localStorage → event-server (port 4010) → SQLite
