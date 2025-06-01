import { JsonDb } from "@az/common/json-db"
import { DbData } from "@az/common/json-db"
import { initTRPC } from "@trpc/server"

type OpenApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

type InputContext = {
  db: JsonDb<DbData>
  request: {
    headers: Record<string, string>
    method: OpenApiMethod
    url: URL
    jsonBody: unknown
    rawBody: string
  }
}

export type JsonDbTrpcOpenApiMeta = {
  openapi?: { method: OpenApiMethod; path: `/${string}` }
}
// export type TrpcContext = Awaited<ReturnType<typeof createTrpcContext>>
export type JsonDbTrpcContext = Awaited<InputContext>

export const apiServer = initTRPC
  .context<JsonDbTrpcContext>()
  .meta<JsonDbTrpcOpenApiMeta>()
  .create({ isServer: true })

export const mainProcedure = apiServer.procedure
