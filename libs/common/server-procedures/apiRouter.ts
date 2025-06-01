import { apiServer } from "./apiServer"
import { zoneProcedures } from "./zone-procedures"

export const apiRouter = apiServer.router({
  zone: apiServer.router(zoneProcedures),
})
export type ApiRouter = typeof apiRouter
