import { defineConfig, devices } from "@playwright/test";

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
const config = {
  testDir: "./tests",
  fullyParallel: true,
  // eslint-disable-next-line node/prefer-global/process, dot-notation
  forbidOnly: !!process.env["CI"],
  // eslint-disable-next-line node/prefer-global/process, dot-notation
  retries: process.env["CI"] ? 2 : 0,
  // eslint-disable-next-line node/prefer-global/process, dot-notation
  workers: process.env["CI"] ? 1 : undefined,
  reporter: "html" as const,
  use: {
    trace: "on-first-retry" as const,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};

export default defineConfig(config as any);
