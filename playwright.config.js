// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000, // Timeout for each test
  expect: {
    timeout: 5000, // Timeout for expect assertions
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot :'on',
    trace: 'on', // Optional: collects trace on retry
  },

});
