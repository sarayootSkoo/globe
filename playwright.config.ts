import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: 'http://localhost:4002',
    headless: false,          // visible browser for demo
    viewport: { width: 1440, height: 900 },
    video: 'on',              // record video for demo
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  // Don't start dev server — assume already running
});
