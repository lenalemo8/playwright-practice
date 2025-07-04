import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();
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
  reporter: 'html',
 
  use: {
    baseURL: process.env.BASE_URL,
       httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME!,
        password: process.env.HTTP_CREDENTIALS_PASSWORD!,
    },
    headless: false,
    trace: 'on',
    // video: 'on',
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
       },
    },
  ],
});
