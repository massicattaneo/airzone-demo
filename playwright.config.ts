import { defineConfig, devices } from "@playwright/test"

const use = {
  baseURL: "http://localhost:1420",
  trace: "on-first-retry" as const,
  launchOptions: {
    // slowMo: 500,
  },
}

export default defineConfig({
  reporter: "dot",
  workers: 3,
  retries: 1,
  webServer: {
    command: "yarn dev",
    port: 1420,
    timeout: 60 * 1000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "mobile-web",
      testDir: "src/integration-tests/mobile",
      use: {
        ...devices["Galaxy S9+"],
        ...use,
      },
    },
    {
      name: "desktop-web",
      testDir: "src/integration-tests/desktop",
      use,
    },
  ],
})
