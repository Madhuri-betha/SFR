import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ["tests/login.test.ts"],
  use: {
    headless: false,
    screenshot: 'only-on-failure', // for screen shot
    video: 'retain-on-failure' // for video recording
  },

  retries: 0, // no of times a test case retries to run when it fails

  // generating report of the test case after the execution
  reporter: [["dot"], ["json", {
    outputFile: "jsonTests/jsonTestFile.json"
  }], ["html", {
    open: "on-failure"
  }]]

}

export default config