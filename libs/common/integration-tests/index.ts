import { Given } from "./definitions.type"
import { test } from "./fixtures"

const givenACommonSetup: Given = async () => {}

const givenACommonCleanUp: Given = async ({ page }) => {
  await page.waitForTimeout(100)
}

export const setupIntegrationTests = () => {
  test.beforeEach(givenACommonSetup)
  test.afterEach(givenACommonCleanUp)
}

export * from "./fixtures"
