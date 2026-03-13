# Chore: เพิ่ม console.log timestamp ใน health endpoint response ของ event-server

## Metadata
adw_id: `demo-001`
prompt: `add a console.log timestamp to event-server health endpoint response`
datetime: `12-03-2026 23:22:56`

---

## Chore Description
Health endpoint (`GET /health`) ของ event-server ส่ง response กลับพร้อม timestamp แล้ว แต่ไม่มี console.log บันทึกไว้ฝั่ง server เมื่อมี request เข้ามา ทำให้ debug/monitor ยากเวลาตรวจสอบว่า health check ถูกเรียกเมื่อไหร่ จะเพิ่ม console.log พร้อม timestamp ก่อน send response

---

## AS-IS vs TO-BE

### AS-IS — Current State
```
[Client] → GET /health → event-server.mjs:446-448
  → send(res, 200, { ok: true, ts: new Date().toISOString(), clients: wsClients.size })
  → ไม่มี log ใดๆ บน server console
```
**Score: 3/5** — response ทำงานถูกต้อง แต่ไม่มี server-side log สำหรับ observability

### TO-BE — Target State
```
[Client] → GET /health → event-server.mjs:446-449
  → console.log(`[health] ${new Date().toISOString()} — clients: ${wsClients.size}`)
  → send(res, 200, { ok: true, ts: new Date().toISOString(), clients: wsClients.size })  ✅
```
**Score: 4/5** — มี log timestamp ให้ตรวจสอบ health check activity ได้

---

## Risk Matrix

| #   | Risk | Severity | Business Impact | Mitigation |
| --- | ---- | -------- | --------------- | ---------- |
| 1   | Log volume สูงถ้า health check ถี่มาก | Low | ไม่มี — dev server เท่านั้น | ใช้ log format กระชับ |

---

## Promise.all Impact
**NO — ไม่มี async ordering impact** เป็นแค่ synchronous console.log ก่อน send response

---

## Relevant Files

- `scripts/event-server.mjs` — HTTP server handler, health endpoint อยู่ line 445-449

### New Files
- ไม่มี

---

## Step by Step Tasks

### 1. เพิ่ม console.log ใน health endpoint handler
**File:** `scripts/event-server.mjs` (line 446-448)
- เพิ่ม console.log พร้อม timestamp ก่อน send response

```javascript
// Before
if (req.method === 'GET' && urlPath === '/health') {
    send(res, 200, { ok: true, ts: new Date().toISOString(), clients: wsClients.size }, cors);
    return;
}

// After
if (req.method === 'GET' && urlPath === '/health') {
    console.log(`[health] ${new Date().toISOString()} — clients: ${wsClients.size}`);
    send(res, 200, { ok: true, ts: new Date().toISOString(), clients: wsClients.size }, cors);
    return;
}
```

---

## Validation Commands

```bash
# Grep ยืนยัน pattern ที่ถูกต้อง
grep -n "console.log.*health" scripts/event-server.mjs

# ทดสอบ manual
node scripts/event-server.mjs &
curl http://localhost:4010/health
# ควรเห็น log บน terminal พร้อม timestamp
```

---

## Notes
- เป็น dev-only event server ไม่ใช่ production — log volume ไม่เป็นปัญหา
- Response body ยังคง format เดิมไม่เปลี่ยนแปลง
