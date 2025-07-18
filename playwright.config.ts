require('dotenv').config();
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', {open: 'never' }]],
 
  use: {
    baseURL: process.env.BASE_URL,
       httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME!,
        password: process.env.HTTP_CREDENTIALS_PASSWORD!,
    },
    headless: true,
    trace: 'on',
    // video: 'on',
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      use: {...devices['Desktop Chrome']},
      testMatch: '*/setup/**.ts',
      workers:1
    },
    {
      name: 'smoke',
      use: {...devices['Desktop Chrome'],
        headless: true,
       },
      testIgnore: '*/setup/**.ts',
      testMatch: '*/e2e/**.ts',
      dependencies: ['setup'],
      workers:5
    },
    {
      name: 'api',
      testIgnore: '*/setup/**.ts',
      testMatch: '*/api/**.ts',
      dependencies: ['setup'] 
    },
  ],
});
