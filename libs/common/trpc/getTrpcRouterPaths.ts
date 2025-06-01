import { AnyTRPCProcedure, AnyTRPCRouter } from "@trpc/server"
import { CustomProcedure } from "./trpcAdapters"

export function getTrpcRouterPaths<T extends AnyTRPCRouter>(
  router: T,
): Array<{
  procedure: CustomProcedure
  path: string
}> {
  if (router._def && router._def.procedures) {
    return Object.entries(router._def.procedures).map(([path, procedure]) => {
      return { procedure: procedure as AnyTRPCProcedure, path }
    })
  }
  return []
}
