# Discussion: ระบบ Elemental Theme Effects — บริบทธาตุสำหรับ 3D Globe

**Date:** 08-03-2026 15:55
**Context:** ต้องการให้ทุกธีมมี energy effect เฉพาะตัว ไม่ใช่เอา effect ไฟฟ้าสีฟ้าไปใส่ทุกธีม
**Participants:** Developer + AI Reviewer
**Status:** Agreed

---

## Background

ระบบ Knowledge Graph Globe มี 9 ธีม (dark, light, fire, winter, galaxy, electric, void, aurora, rain) เดิมทีมี energy effect (arcs, orbit rings, core glow, spark burst, plasma aura, wisps) เฉพาะธีม electric เท่านั้น ผู้ใช้ต้องการ "apply concept electric ทุกธีม" — แต่ไม่ได้หมายถึงเอาสีฟ้า-ขาวไปใส่ทุกธีม แต่หมายถึงให้แต่ละธีมมี**บริบทของธาตุตัวเอง** effect สีและบรรยากาศต้องเข้ากับธาตุ

---

## Discussion Points

### Question 1: ทำไมไม่ใช้สีเดียวกันทุกธีม?

**Context:**
ความเข้าใจผิดแรกคือ "apply electric to all" = เปิด effect เดิมทุกธีม ซึ่งทำให้ globe ไฟมี arcs สีฟ้า, globe หิมะมี spark สีฟ้า — ขัดกับบริบทธาตุ

**Analysis:**
แต่ละธีมมี identity เฉพาะตัว:
- **Fire** = ธาตุไฟ → สีส้ม-แดง-ทอง
- **Electric** = ธาตุไฟฟ้า → สีฟ้า-ขาว
- **Winter** = ธาตุน้ำแข็ง → สีฟ้าอ่อน-ขาว
- ฯลฯ

การเอาสีฟ้าไปใส่ธีมไฟจะดูผิดบริบท ทำให้สูญเสียเอกลักษณ์ของธีม

| Option | Pros | Cons |
|--------|------|------|
| A: สีเดียวทุกธีม | ง่าย, code น้อย | ขาด identity, ดูผิดบริบท |
| B: Palette ต่อธีม | ถูกต้องตามบริบทธาตุ | Code เยอะขึ้น, ต้อง maintain palette |

**Decision:** ใช้ Option B — `ThemePalette` interface กำหนดสี 9 จุดต่อธีม เปลี่ยนตาม `setTheme()`

### Question 2: จะเปลี่ยนสียังไง runtime?

**Context:**
Effect มี 2 ประเภท: **Canvas texture** (aura, core, flash) ที่ต้อง rebuild, และ **Line material** (arcs, wisps, bolts) ที่ spawn ใหม่ตลอด

**Analysis:**

| Component | ประเภท | วิธีเปลี่ยนสี |
|-----------|--------|--------------|
| Plasma aura | Canvas texture → Sprite | Repaint canvas, set `needsUpdate = true` |
| Core glow | Canvas texture → Sprite | Repaint canvas, set `needsUpdate = true` |
| Spark flash | Canvas texture → Sprite | Repaint canvas, set `needsUpdate = true` |
| Orbit rings | Line material | `_rebuildOrbitRings()` สร้างใหม่ทั้งหมด |
| Lightning arcs | Line material (spawned) | อ่าน `this._palette` ตอน spawn — สีใหม่มาเอง |
| Energy wisps | Line material (spawned) | เหมือน arcs |
| Spark bolts | Line material (spawned) | เหมือน arcs |

**Decision:**
- Texture-based: rebuild canvas + flag `needsUpdate` (ไม่สร้าง sprite ใหม่ ป้องกัน memory leak)
- Orbit rings: `_rebuildOrbitRings()` สร้างใหม่พร้อมสีใหม่
- Spawned items (arcs/wisps/bolts): ใช้ `this._palette` ตอน spawn → สีเปลี่ยนตาม naturally

---

## Elemental Palette Reference

### วิธีเพิ่มธาตุ/ธีมใหม่

**ขั้นตอน:**

1. **เพิ่ม theme name** ใน `src/lib/stores/appState.ts`:
   ```typescript
   export type Theme = 'dark' | 'light' | ... | 'YOUR_NEW_THEME';
   ```

2. **เพิ่ม VALID_THEMES** ใน `src/lib/stores/persist.ts`:
   ```typescript
   const VALID_THEMES: readonly Theme[] = [..., 'YOUR_NEW_THEME'];
   ```

3. **เพิ่ม palette** ใน `src/lib/renderers/GlobeElectricArcs.ts` → `THEME_PALETTES`:
   ```typescript
   your_new_theme: {
     bright: 0x______,    // สีสว่างหลัก (arcs, bolts ตัวหลัก)
     glow: 0x______,      // สีเรืองแสงเบื้องหลัง (glow lines)
     ring: 0x______,      // สี orbit ring หลัก
     ringGlow: 0x______,  // สี orbit ring เรืองแสง
     wisp: 0x______,      // สี energy wisps
     fork: 0x______,      // สี bolt fork branches
     aura: [              // gradient สำหรับ plasma aura (inner → outer)
       { r: ___, g: ___, b: ___ },  // inner (เข้มกว่า)
       { r: ___, g: ___, b: ___ },  // outer (สว่างกว่า)
     ],
     core: [              // gradient สำหรับ core glow (center → edge)
       { r: ___, g: ___, b: ___ },  // center (สว่างมาก)
       { r: ___, g: ___, b: ___ },  // edge (เข้ม)
     ],
     flash: [             // gradient สำหรับ spark burst flash
       { r: ___, g: ___, b: ___ },  // center (สว่าง)
       { r: ___, g: ___, b: ___ },  // edge (เข้ม)
     ],
   },
   ```

4. **เพิ่ม dot sphere gradient** ใน `src/lib/renderers/GlobeRenderer.ts` → `updateTheme()`:
   ```typescript
   case 'your_new_theme':
     topColor.set(r1, g1, b1);    // สีจุดด้านบน
     botColor.set(r2, g2, b2);    // สีจุดด้านล่าง
     wireColor = 0x______;         // สี wireframe
     break;
   ```

5. **เพิ่ม CSS theme** ใน `src/app.css`:
   ```css
   [data-theme="your_new_theme"] {
     --bg: #______;
     --text: #______;
     --accent: #______;
     --border: #______;
     /* ... */
   }
   ```

6. **เพิ่ม theme button** ใน `src/components/controls/TopControls.svelte`:
   ```html
   <button ... onclick={() => setTheme('your_new_theme')}>
     🔮 Your Theme
   </button>
   ```

7. **(Optional) เพิ่ม background effects** — ถ้าธีมมี effect พิเศษ (เช่น fire มี embers, winter มี snowflakes):
   - เพิ่ม store toggle ใน `src/lib/stores/themeEffects.ts`
   - เพิ่ม persistence ใน `src/lib/stores/persist.ts`
   - เพิ่ม rendering logic ใน background component

---

### Palette ปัจจุบัน (9 ธาตุ)

| Theme | ธาตุ | `bright` | `glow` | `ring` | `aura inner` | `core center` |
|-------|------|----------|--------|--------|--------------|---------------|
| **electric** | ⚡ ไฟฟ้า | `#ddeeff` | `#4090ff` | `#80c0ff` | `rgb(30,80,200)` | `rgb(200,230,255)` |
| **fire** | 🔥 เพลิง | `#ffddaa` | `#ff6020` | `#ff8040` | `rgb(200,60,10)` | `rgb(255,220,150)` |
| **winter** | ❄️ น้ำแข็ง | `#eeffff` | `#40aaff` | `#90d0ff` | `rgb(30,100,200)` | `rgb(220,240,255)` |
| **galaxy** | 🌌 จักรวาล | `#eeccff` | `#9040ff` | `#b070ff` | `rgb(120,40,200)` | `rgb(240,200,255)` |
| **void** | 🕳️ สุญญากาศ | `#ee99ff` | `#aa20dd` | `#cc44ff` | `rgb(150,20,180)` | `rgb(250,180,255)` |
| **aurora** | 🌈 แสงเหนือ | `#aaffcc` | `#20cc70` | `#60ffaa` | `rgb(20,160,80)` | `rgb(200,255,220)` |
| **rain** | 🌧️ ฝน | `#bbccdd` | `#5070aa` | `#7090bb` | `rgb(50,70,120)` | `rgb(190,210,230)` |
| **dark** | 🌑 มืด | `#aaddff` | `#3080cc` | `#60a0dd` | `rgb(20,70,160)` | `rgb(180,220,255)` |
| **light** | ☀️ สว่าง (พื้นกรมท่า) | `#ffeedd` | `#cc9944` | `#ddbb66` | `rgb(180,140,50)` | `rgb(255,240,200)` |

---

### ThemePalette Interface

```typescript
interface ThemePalette {
  bright: number;     // สีหลักของ arc/bolt lines (hex)
  glow: number;       // สี glow line เบื้องหลัง (hex)
  ring: number;       // สี orbit ring main (hex)
  ringGlow: number;   // สี orbit ring glow (hex)
  wisp: number;       // สี energy wisp tendrils (hex)
  fork: number;       // สี bolt fork branches (hex)
  aura: { r, g, b }[]; // Canvas gradient ของ plasma aura [inner, outer]
  core: { r, g, b }[]; // Canvas gradient ของ core glow [center, edge]
  flash: { r, g, b }[]; // Canvas gradient ของ spark flash [center, edge]
}
```

**หลักการเลือกสี:**
- `bright` = สีสว่างสุด ใช้กับ main bolt/arc (ควรสว่าง, ดูชัดบน dark bg)
- `glow` = เข้มกว่า bright ใช้เป็น bloom effect
- `ring` = สว่างปานกลาง orbit ring ต้องดูละเอียด ไม่จ้าเกิน
- `aura inner` = สีเข้ม (base) → `aura outer` = สว่างขึ้น (ค่อยๆ fade)
- `core center` = สว่างมาก (ใกล้ขาว) → `core edge` = เข้ม (ธาตุ)
- ทุกสีใช้ `AdditiveBlending` ดังนั้นสีจะสว่างขึ้นเมื่อซ้อนกัน — ห้ามใช้สีจ้าเกิน

---

## Key Insights

- **"Apply concept" ≠ "Copy paste"** — ผู้ใช้หมายถึงให้ concept เดียวกัน (energy effects) ทำงานบนทุกธีม แต่ด้วย**บริบทของธาตุนั้นๆ**
- **Additive blending sensitivity** — เพราะใช้ `THREE.AdditiveBlending` ทุกที่ สีที่สว่างเกินจะ blowout เป็นสีขาว ดังนั้น palette ควรใช้สี saturated ระดับกลาง
- **Texture vs spawned objects** — Canvas texture ต้อง rebuild explicitly, แต่ line-based objects (arcs/wisps/bolts) จะหมดอายุและ spawn ใหม่ด้วยสีปัจจุบันเอง → เป็น natural transition
- **Fallback safety** — ถ้า `setTheme()` ได้ชื่อธีมที่ไม่รู้จัก จะ fallback เป็น `dark` palette

---

## Code References

| File | Line | Relevance |
|------|------|-----------|
| `src/lib/renderers/GlobeElectricArcs.ts` | ~18-120 | `ThemePalette` interface + `THEME_PALETTES` สี 9 ธาตุ |
| `src/lib/renderers/GlobeElectricArcs.ts` | ~785 | `setTheme()` method — rebuild textures + rings |
| `src/lib/renderers/GlobeElectricArcs.ts` | ~125-200 | `_buildAura()`, `_buildCore()` — canvas texture rebuild |
| `src/lib/renderers/GlobeElectricArcs.ts` | ~330-345 | `_spawnArc()` — ใช้ `this._palette.bright/glow` |
| `src/lib/renderers/GlobeElectricArcs.ts` | ~450-460 | `_buildSparkBolt()` — ใช้ `this._palette.bright/glow/fork` |
| `src/lib/renderers/GlobeRenderer.ts` | ~995-1075 | `updateTheme()` — dot sphere gradient + wireframe color |
| `src/lib/stores/appState.ts` | ~8 | `Theme` union type |
| `src/lib/stores/persist.ts` | ~17 | `VALID_THEMES` array |
| `src/components/globe/GlobeCanvas.svelte` | ~168-170 | `setTheme(t)` + `setEnabled(true)` on theme change |
| `src/components/controls/GlobeControls.svelte` | ~656 | Electric controls (now ungated, visible on all themes) |
| `src/app.css` | — | CSS `[data-theme]` blocks per theme |

---

## Action Items

- [x] สร้าง `ThemePalette` interface และ `THEME_PALETTES` สำหรับ 9 ธีม
- [x] เปลี่ยน hardcoded สีใน `GlobeElectricArcs` ทุกจุดให้อ่านจาก `this._palette`
- [x] เพิ่ม `setTheme()` method ที่ rebuild textures + orbit rings
- [x] Wire `setTheme()` ใน `GlobeCanvas.svelte` เมื่อธีมเปลี่ยน
- [x] แสดง energy effect controls ทุกธีม (ลบ `{#if isElectricTheme}` gate)
- [ ] (Future) เพิ่มธาตุใหม่ตาม guide ด้านบน
- [ ] (Future) ปรับ background particle effects ให้ทุกธีมมี particle ของตัวเอง

---

## Related

- `src/lib/renderers/GlobeElectricArcs.ts` — ไฟล์หลักของระบบ energy effects
- `src/lib/renderers/GlobeRenderer.ts` — dot sphere + wireframe color per theme
- `src/app.css` — CSS variable definitions per theme
