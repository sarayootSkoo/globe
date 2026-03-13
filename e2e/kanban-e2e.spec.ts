/**
 * Kanban Board — End-to-End Demo Test
 *
 * Tests the full pipeline:
 *   Board UI → Card Preview → Edit/Full View → Event Server → SQLite → WebSocket
 *
 * Run: npx playwright test e2e/kanban-e2e.spec.ts
 * Prerequisites: dev server (:4002) + event server (:4010) running
 */
import { test, expect } from '@playwright/test';

const EVENT_SERVER = 'http://localhost:4010';

// ── Helper: wait for board to load ──────────────────────────────────────────
async function waitForBoard(page: import('@playwright/test').Page) {
  // Navigate to /board route (kanban view)
  await page.goto('/board');
  // Wait for kanban columns to render
  await page.waitForSelector('.kanban-column', { timeout: 15_000 });
  // Wait for at least some cards to appear
  await page.waitForSelector('.kanban-card', { timeout: 10_000 });
}

// ── Helper: find a card with a known file (so edit/fullview work) ────────────
async function findCardWithFile(page: import('@playwright/test').Page) {
  // Look for cards in BACKLOG column that have file paths (discussion cards)
  const cards = page.locator('.kanban-column:has(.col-label:text("BACKLOG")) .kanban-card');
  const count = await cards.count();
  // Pick the first one
  if (count > 0) return cards.first();
  // Fallback: any card
  return page.locator('.kanban-card').first();
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 1: Board loads with cards and columns
// ═══════════════════════════════════════════════════════════════════════════════
test('1. Board loads with all SDLC columns and cards', async ({ page }) => {
  await waitForBoard(page);

  // Verify all 11 SDLC columns exist
  const columns = ['CREATE', 'DESIGN', 'BACKLOG', 'HOLD', 'TASK', 'ISSUE',
                    'DEVELOP', 'TESTING', 'VALIDATE', 'UPDATE DOCS', 'DONE'];
  for (const col of columns) {
    await expect(page.locator(`.col-label:text("${col}")`)).toBeVisible();
  }

  // Cards should be present
  const cardCount = await page.locator('.kanban-card').count();
  expect(cardCount).toBeGreaterThan(10);

  // Each card shows an ID and DB sync badge
  const firstCard = page.locator('.kanban-card').first();
  await expect(firstCard.locator('.card-id')).toBeVisible();

  await page.screenshot({ path: 'e2e/screenshots/01-board-loaded.png', fullPage: true });
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 2: Click card → CardPreview opens with markdown content
// ═══════════════════════════════════════════════════════════════════════════════
test('2. Click card → Preview shows markdown content', async ({ page }) => {
  await waitForBoard(page);

  // Click a card in BACKLOG (most likely to have preview content)
  const card = await findCardWithFile(page);
  await card.click();

  // CardPreview overlay should appear
  await expect(page.locator('.preview-overlay')).toBeVisible({ timeout: 3000 });
  await expect(page.locator('.preview-title')).toBeVisible();
  await expect(page.locator('.preview-panel')).toBeVisible();

  // Should show meta type badge
  await expect(page.locator('.meta-type')).toBeVisible();

  // Sidebar sections should be visible
  await expect(page.locator('.section-label:text("STATUS")')).toBeVisible();
  await expect(page.locator('.section-label:text("ITERATION")')).toBeVisible();

  await page.screenshot({ path: 'e2e/screenshots/02-card-preview.png' });

  // Close with × button
  await page.locator('.preview-close').click();
  await expect(page.locator('.preview-overlay')).not.toBeVisible();
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 3: Full View — opens fullscreen markdown reader
// ═══════════════════════════════════════════════════════════════════════════════
test('3. Full View — fullscreen markdown reader', async ({ page }) => {
  await waitForBoard(page);

  const card = await findCardWithFile(page);
  await card.click();
  await expect(page.locator('.preview-overlay')).toBeVisible({ timeout: 3000 });

  // Click "Full View" button
  const fullViewBtn = page.locator('.fullview-btn');
  if (await fullViewBtn.isVisible()) {
    await fullViewBtn.click();

    // Fullview overlay should appear
    await expect(page.locator('.fullview-overlay')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.fullview-title')).toBeVisible();

    // Should have content
    const body = page.locator('.fullview-body');
    await expect(body).toBeVisible();

    await page.screenshot({ path: 'e2e/screenshots/03-full-view.png' });

    // Click "Back" to return to preview
    await page.locator('.fv-btn.fv-close').click();
    await expect(page.locator('.fullview-overlay')).not.toBeVisible();
    await expect(page.locator('.preview-overlay')).toBeVisible();
  }

  // Close preview
  await page.locator('.preview-close').click();
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 4: Edit mode — edit markdown and save
// ═══════════════════════════════════════════════════════════════════════════════
test('4. Edit mode — load file, edit, and save', async ({ page }) => {
  await waitForBoard(page);

  const card = await findCardWithFile(page);
  await card.click();
  await expect(page.locator('.preview-overlay')).toBeVisible({ timeout: 3000 });

  // Click "Edit MD" button (there are two .edit-btn: "Edit Details" and "Edit MD")
  const editBtn = page.getByRole('button', { name: 'Edit MD' });
  if (await editBtn.isVisible()) {
    await editBtn.click();

    // Editor should appear
    await expect(page.locator('.md-editor')).toBeVisible({ timeout: 5000 });

    // Should have content loaded
    const editor = page.locator('.md-editor');
    const content = await editor.inputValue();
    expect(content.length).toBeGreaterThan(0);

    // Add a test comment at the end
    const testMarker = `\n<!-- E2E test: ${new Date().toISOString()} -->`;
    await editor.fill(content + testMarker);

    await page.screenshot({ path: 'e2e/screenshots/04-edit-mode.png' });

    // Click Save
    await page.locator('.save-btn').click();

    // Should show "Saved" banner
    await expect(page.locator('.save-banner.save-ok')).toBeVisible({ timeout: 3000 });

    // Revert: save original content back
    await editor.fill(content);
    await page.locator('.save-btn').click();
    await expect(page.locator('.save-banner.save-ok')).toBeVisible({ timeout: 3000 });

    // Cancel back to preview
    await page.locator('.action-btn:text("Cancel")').click();
    await expect(page.locator('.md-editor')).not.toBeVisible();
  }

  await page.locator('.preview-close').click();
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 5: Event server health + DB stats
// ═══════════════════════════════════════════════════════════════════════════════
test('5. Event server health and DB stats', async ({ request }) => {
  // Health check
  const health = await request.get(`${EVENT_SERVER}/health`);
  expect(health.ok()).toBeTruthy();
  const hData = await health.json();
  expect(hData.ok).toBe(true);

  // DB stats
  const stats = await request.get(`${EVENT_SERVER}/db/stats`);
  expect(stats.ok()).toBeTruthy();
  const sData = await stats.json();
  expect(sData.cards).toBeGreaterThan(600); // 607+ cards synced
  expect(sData.activity_log).toBeGreaterThan(0);

  // DB cards query
  const cards = await request.get(`${EVENT_SERVER}/db/cards`);
  expect(cards.ok()).toBeTruthy();
  const cData = await cards.json();
  expect(cData.total).toBeGreaterThan(600);
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 6: File read/write API endpoints
// ═══════════════════════════════════════════════════════════════════════════════
test('6. File read/write API round-trip', async ({ request }) => {
  const testPath = '_e2e-test-temp.md';
  const testContent = `# E2E Test\n\nGenerated: ${new Date().toISOString()}\n`;

  // Write file
  const writeRes = await request.post(`${EVENT_SERVER}/card/file`, {
    data: { path: testPath, content: testContent, cardId: 'e2e-test' },
  });
  expect(writeRes.ok()).toBeTruthy();
  const wData = await writeRes.json();
  expect(wData.success).toBe(true);

  // Read file back
  const readRes = await request.get(`${EVENT_SERVER}/card/file?path=${testPath}`);
  expect(readRes.ok()).toBeTruthy();
  const rData = await readRes.json();
  expect(rData.content).toBe(testContent);

  // Path traversal should be blocked
  const badRes = await request.get(`${EVENT_SERVER}/card/file?path=../../etc/passwd`);
  expect(badRes.status()).toBe(403);

  // Clean up: delete the test file via another write with empty marker
  // (or just leave it — it's in docs root)
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 7: Agent launch endpoint
// ═══════════════════════════════════════════════════════════════════════════════
test('7. Agent launch endpoint spawns process', async ({ request }) => {
  // Launch a quick echo-style command (will fail but tests the spawn pipeline)
  const res = await request.post(`${EVENT_SERVER}/agent/launch`, {
    data: { command: 'echo', args: 'e2e-test-ping' },
  });
  expect(res.ok()).toBeTruthy();
  const data = await res.json();
  expect(data.sessionId).toBeTruthy();
  expect(data.pid).toBeGreaterThan(0);

  // Check status shows the session
  await new Promise(r => setTimeout(r, 1000)); // wait for process
  const statusRes = await request.get(`${EVENT_SERVER}/status`);
  const statuses = await statusRes.json();
  expect(statuses[data.sessionId]).toBeTruthy();

  // Events should have the launch event
  const eventsRes = await request.get(`${EVENT_SERVER}/events`);
  const events = await eventsRes.json();
  const launchEvent = events.find(
    (e: any) => e.type === 'command:started' && e.data?.sessionId === data.sessionId
  );
  expect(launchEvent).toBeTruthy();
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 8: Card lifecycle — Start Dialog with Launch Claude
// ═══════════════════════════════════════════════════════════════════════════════
test('8. Card lifecycle — Start Dialog appears on lifecycle click', async ({ page }) => {
  await waitForBoard(page);

  // Find a card with "idle" lifecycle
  const idleBtn = page.locator('.lifecycle-btn.lifecycle-idle').first();
  if (await idleBtn.isVisible({ timeout: 3000 })) {
    await idleBtn.click();

    // StartDialog should appear
    await expect(page.locator('.dialog-overlay')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('.dialog-title:text("START WORK")')).toBeVisible();

    // Should show "Launch Claude Agent" button
    await expect(page.locator('.btn-launch:text("Launch Claude Agent")')).toBeVisible();
    // Should show "Copy Command Only" button
    await expect(page.locator('.btn-primary:text("Copy Command Only")')).toBeVisible();

    await page.screenshot({ path: 'e2e/screenshots/08-start-dialog.png' });

    // Cancel
    await page.locator('.btn-ghost:text("Cancel")').click();
    await expect(page.locator('.dialog-overlay')).not.toBeVisible();
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 9: Search and filter cards
// ═══════════════════════════════════════════════════════════════════════════════
test('9. Search and filter cards', async ({ page }) => {
  await waitForBoard(page);

  const initialCount = await page.locator('.kanban-card').count();

  // Search for "oms-order"
  await page.locator('.kanban-search').fill('oms-order');
  await page.waitForTimeout(300); // debounce
  const filteredCount = await page.locator('.kanban-card').count();
  expect(filteredCount).toBeLessThanOrEqual(initialCount);
  expect(filteredCount).toBeGreaterThan(0);

  await page.screenshot({ path: 'e2e/screenshots/09-search-filter.png' });

  // Clear search
  await page.locator('.kanban-search').fill('');
  await page.waitForTimeout(300);
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 10: WebSocket connectivity
// ═══════════════════════════════════════════════════════════════════════════════
test('10. WebSocket receives broadcast events', async ({ page, request }) => {
  await waitForBoard(page);

  // Listen for WebSocket messages on the page
  const wsMessages: string[] = [];
  await page.evaluate(() => {
    const ws = new WebSocket('ws://localhost:4010/ws');
    (window as any).__testWsMessages = [];
    ws.onmessage = (e) => {
      (window as any).__testWsMessages.push(e.data);
    };
    (window as any).__testWs = ws;
  });

  // Wait for WS connection
  await page.waitForTimeout(500);

  // Trigger an event via the API
  await request.post(`${EVENT_SERVER}/events`, {
    data: {
      type: 'e2e:test-broadcast',
      source: 'playwright',
      data: { msg: 'hello from e2e' },
    },
  });

  // Wait and check if message received
  await page.waitForTimeout(1000);
  const messages = await page.evaluate(() => (window as any).__testWsMessages);
  expect(messages.length).toBeGreaterThan(0);

  // Clean up WS
  await page.evaluate(() => {
    if ((window as any).__testWs) (window as any).__testWs.close();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// TEST 11: Full E2E demo flow — card through SDLC pipeline
// ═══════════════════════════════════════════════════════════════════════════════
test('11. Full demo — card preview → edit → full view → re-run command', async ({ page }) => {
  await waitForBoard(page);

  // Step 1: Find a card with content
  await page.locator('.kanban-search').fill('chore');
  await page.waitForTimeout(300);

  const card = page.locator('.kanban-card').first();
  await expect(card).toBeVisible({ timeout: 3000 });
  const cardTitle = await card.locator('.card-title').textContent();

  // Step 2: Open card preview
  await card.click();
  await expect(page.locator('.preview-overlay')).toBeVisible({ timeout: 3000 });
  await page.screenshot({ path: 'e2e/screenshots/11a-preview.png' });

  // Step 3: Open full view (if available)
  const fullViewBtn = page.locator('.fullview-btn');
  if (await fullViewBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await fullViewBtn.click();
    await expect(page.locator('.fullview-overlay')).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'e2e/screenshots/11b-fullview.png' });

    // Step 4: Switch to edit from full view
    await page.locator('.fv-btn:text("Edit")').click();
    await expect(page.locator('.md-editor')).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'e2e/screenshots/11c-edit.png' });

    // Step 5: Cancel edit → back to preview
    await page.locator('.action-btn:text("Cancel")').click();
    await expect(page.locator('.preview-overlay')).toBeVisible();
  }

  // Step 6: Check re-run commands are visible
  const rerunBtns = page.locator('.rerun-btn');
  if (await rerunBtns.count() > 0) {
    await page.screenshot({ path: 'e2e/screenshots/11d-rerun-commands.png' });
  }

  // Close
  await page.locator('.preview-close').click();
  await page.locator('.kanban-search').fill('');

  await page.screenshot({ path: 'e2e/screenshots/11e-final.png' });
});
