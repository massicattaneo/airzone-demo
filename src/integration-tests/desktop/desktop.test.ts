import { expect, setupIntegrationTests, test } from "@az/common/integration-tests"

setupIntegrationTests()
test.describe("Home Page", () => {
  test("The user can use the app", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/AirZone Demo/)
    await expect(page.getByRole("navigation", { name: "Sidebar Navigation" }))
      .toMatchAriaSnapshot(`- navigation:
  - img
  - button
  - navigation:
    - list:
      - listitem:
        - link "Home"
      - listitem:
        - link "Zones"
      - listitem:
        - link "Schedules"
      - listitem:
        - link "Settings"`)
    await page.getByRole("link", { name: "Zones" }).click()
    await expect(page.getByText("Loading Zones...")).toBeVisible()
    await expect(page.getByRole("article", { name: "Zone Living Room" }))
      .toMatchAriaSnapshot(`- article "Zone Living Room":
  - heading "Living Room" [level=2]
  - button "Toggle Power":
    - img "power"
  - paragraph: Heating to 22º
  - paragraph: 10º
  - img "heat"`)
    await page.getByRole("article", { name: "Zone Living Room" }).getByLabel("Toggle Power").click()
    await expect(page.getByRole("article", { name: "Zone Living Room" }))
      .toMatchAriaSnapshot(`- article "Zone Living Room":
  - heading "Living Room" [level=2]
  - button "Toggle Power":
    - img "power"
  - paragraph: "OFF"
  - paragraph: 10º`)
  })
})
