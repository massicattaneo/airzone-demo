import { Route, test as base } from "@playwright/test"
import { DbData, JsonDb, newEmptyDb } from "../json-db"
import { apiRouter } from "../server-procedures"
import { trpcHttpAdapter } from "../trpc"

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export type CustomFixtures = {
  db: JsonDb<DbData>
  mock: {
    api: ReturnType<typeof trpcHttpAdapter<Route, typeof apiRouter>>["mock"]
    apiClear: () => void
  }
}

export const test = base.extend<CustomFixtures>({
  db: [
    async ({ page: _ }, use) => {
      const db = new JsonDb(newEmptyDb())
      await use(db)
    },
    { auto: true },
  ],

  mock: [
    async ({ page, db }, use) => {
      const createContext = async (route: Route) => {
        return {
          db: db,
          request: {
            headers: route.request().headers(),
            method: route.request().method().toUpperCase() as Method,
            url: new URL(route.request().url()),
            jsonBody: await route.request().postDataJSON(),
            rawBody: route.request().postData(),
          },
        }
      }
      const {
        handler,
        mock: api,
        clearAllMocks: apiClear,
      } = trpcHttpAdapter({
        router: apiRouter,
        createContext,
        onFulfill: (route, res) => {
          route.fulfill(res)
          return res
        },
        onContinue: route => {
          route.continue()
        },
      })

      await page.route(`http://localhost:1420/api/**`, handler)

      await use({ api, apiClear })
    },
    { auto: true },
  ],
})

export { expect } from "@playwright/test"
