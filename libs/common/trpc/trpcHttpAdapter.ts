import qs from "qs"
import { createTrpcHttpMocker } from "./createTrpcJsonDbMock"
import { extractParams, matchPattern } from "./extractParams"
import { getTrpcRouterPaths } from "./getTrpcRouterPaths"
import { CustomRouter, isOpenApiMeta, isProcedure } from "./trpcAdapters"

export function trpcHttpAdapter<
  ContextParam,
  TRouter extends CustomRouter,
  TContext extends {
    request: {
      headers: Record<string, string>
      method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
      url: URL
      jsonBody: unknown
      rawBody: null | string
    }
  } = {
    request: {
      headers: Record<string, string>
      method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
      url: URL
      jsonBody: unknown
      rawBody: null | string
    }
  },
>({
  router,
  createContext,
  onFulfill,
  onContinue,
}: {
  router: TRouter
  createContext: (params: ContextParam) => Promise<TContext>
  onFulfill?: (
    params: ContextParam,
    response: { status?: number; json: unknown },
  ) => { status?: number; json: unknown }
  onContinue?: (params: ContextParam) => undefined
}) {
  const paths = getTrpcRouterPaths(router)
  const { mock, hasMock, clearAllMocks } = createTrpcHttpMocker<TRouter>()
  const handler = async function callProcedure(params: ContextParam) {
    const ctx = await createContext(params)
    const procedure = Object.values(router._def.procedures).find(proc => {
      if (!isProcedure(proc)) return false
      const meta = isOpenApiMeta(proc._def.meta) ? proc._def.meta : null
      if (!meta) return false
      const { path, method } = meta.openapi
      const { match } = matchPattern(ctx.request.url.pathname, path)
      return method === ctx.request.method && match
    })
    if (procedure && isProcedure(procedure)) {
      const { path = "" } = paths.find(({ procedure: p }) => p === procedure) ?? {}
      const mockResponse = hasMock(path)
      const meta = isOpenApiMeta(procedure._def.meta) ? procedure._def.meta : null
      const search = qs.parse(ctx.request.url.search, {
        ignoreQueryPrefix: true,
        decoder(str, defaultDecoder, _charset, type) {
          if (type === "value") {
            if (str === "true") return true
            if (str === "false") return false
            const num = Number(str)
            if (!isNaN(num) && str.trim() !== "") return num
          }
          return defaultDecoder(decodeURIComponent(str))
        },
      })
      const rawInput = {
        ...search,
        ...(search["input"] ? JSON.parse(search["input"] as string) : {}),
        ...extractParams(ctx.request.url.pathname, meta?.openapi.path ?? ""),
        ...(ctx.request.jsonBody instanceof Object ? ctx.request.jsonBody : {}),
      }
      const json = await procedure({
        ctx,
        getRawInput: async () => rawInput,
        path: ctx.request.url.pathname,
        type: procedure._def.type,
      })
      if (mockResponse) {
        const res = mockResponse instanceof Function ? mockResponse(rawInput, json) : mockResponse
        const response = { status: res.status ?? 200, json: { result: { data: res.json } } }
        return onFulfill?.(params, response) ?? res
      }
      const res = { status: 200, json: { result: { data: json } } }
      return onFulfill?.(params, res) ?? res
    }
    return onContinue?.(params)
  }
  return { handler, mock, clearAllMocks }
}
