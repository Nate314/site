import { defineConfig, devices } from '@playwright/test';

// The suite targets an already running site. Start it with ./run.sh or .\run.ps1
// (the launcher prints the real URL when 8080 is taken) and pass it via BASE_URL.
const baseURL = (process.env.BASE_URL ?? 'http://localhost:8080').replace(/\/+$/, '');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
