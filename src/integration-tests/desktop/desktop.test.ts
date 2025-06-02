import { expect, setupIntegrationTests, test } from "@az/common/integration-tests"

setupIntegrationTests()
test.describe("Home Page", () => {
  test("The user can use the app", async ({ page, mock }) => {
    await mock.api.device.temperature.fulfill({
      status: 200,
      json: {
        "device-1": 20,
        "device-2": 23,
        "device-3": 21,
        "device-5": 25,
      },
    })
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
    await expect(page.getByRole("link", { name: "Zone Living Room" }))
      .toMatchAriaSnapshot(`- link "Zone Living Room":
  - article "Zone Living Room":
    - button "Toggle Power":
      - img "power"
    - heading "20º" [level=2]
    - paragraph: Living Room
    - paragraph: Heating to 22º
    - img "heat"`)
    await page.getByRole("article", { name: "Zone Living Room" }).getByLabel("Toggle Power").click()
    await expect(page.getByRole("link", { name: "Zone Bedroom" }))
      .toMatchAriaSnapshot(`- link "Zone Bedroom":
  - article "Zone Bedroom":
    - button "Toggle Power":
      - img "power"
    - heading "23º" [level=2]
    - paragraph: Bedroom
    - paragraph: Cooling to 20º
    - img "cool"`)
    await expect(page.getByRole("link", { name: "Zone Kitchen" }))
      .toMatchAriaSnapshot(`- link "Zone Kitchen":
  - article "Zone Kitchen":
    - button "Toggle Power":
      - img "power"
    - heading "21º" [level=2]
    - paragraph: Kitchen
    - paragraph: Success`)
    await expect(page.getByRole("link", { name: "Zone Office" }))
      .toMatchAriaSnapshot(`- link "Zone Office":
  - article "Zone Office":
    - button "Toggle Power":
      - img "power"
    - heading "-" [level=2]
    - paragraph: Office
    - paragraph: Unknown`)
    await expect(page.getByRole("link", { name: "Zone Guest Room" }))
      .toMatchAriaSnapshot(`- link "Zone Guest Room":
  - article "Zone Guest Room":
    - button "Toggle Power":
      - img "power"
    - heading "25º" [level=2]
    - paragraph: Guest Room
    - paragraph: "OFF"`)
  })
})
