// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { snapshot } from 'node:test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({
  // Test directory path
  testDir: './tests',
  // Global timeeout for each component test is 40 seconds
  timeout: 10 * 1000,
  // Global Timeout for assertions is 40 seconds
  expect:  {
    timeout: 5000
  },
  // Report
  reporter : 'html',

  use: {
    
    // Browser option
    browserName : 'chromium',
    // Headless mode
    headless : false,
    screenshot : 'on',
    trace : 'retain-on-failure',



  },
});

// Export config object to available throughout project level
module.exports = config
