import { apiServer } from "./apiServer"
import { deviceProcedures } from "./device-procedures"
import { zoneProcedures } from "./zone-procedures"

export const apiRouter = apiServer.router({
  zone: apiServer.router(zoneProcedures),
  device: apiServer.router(deviceProcedures),
})
export type ApiRouter = typeof apiRouter
