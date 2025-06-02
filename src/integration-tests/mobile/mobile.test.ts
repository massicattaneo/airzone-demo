import { expect, setupIntegrationTests, test } from "@az/common/integration-tests"

setupIntegrationTests()
test.describe("Home Page", () => {
  test("The user can see the home page", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/AirZone Demo/)
    await expect(page.getByRole("navigation", { name: "Bottom Navigation" }))
      .toMatchAriaSnapshot(`- list:
  - listitem:
    - link "Home"
  - listitem:
    - link "Zones"
  - listitem:
    - link "Schedules"
  - listitem:
    - link "Settings"`)
    await page.getByRole("link", { name: "Zones" }).click()
    await page.getByRole("article", { name: "Zone Living Room" }).getByLabel("Toggle Power").click()
    await expect(page.getByRole("link", { name: "Zone Living Room" })).toBeVisible()
  })
})
