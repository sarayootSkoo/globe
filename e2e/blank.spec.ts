import { test, expect } from '@playwright/test';

test('blank test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*/);
});
