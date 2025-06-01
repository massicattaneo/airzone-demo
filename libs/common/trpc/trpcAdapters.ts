import { Procedure, Router } from "@trpc/core"

export type CustomProcedure = Procedure<
  "mutation" | "query" | "subscription",
  {
    input: unknown
    output: unknown
  }
>

export interface CustomRouterRecord {
  [key: string]: CustomProcedure | CustomRouterRecord
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomRouter = Router<any>

export const isProcedure = (obj: unknown): obj is CustomProcedure => {
  return obj instanceof Object && "_def" in obj
}

export const isOpenApiMeta = (
  meta: unknown,
): meta is { openapi: { method: string; path: string } } => {
  return typeof meta === "object" && meta !== null && "openapi" in meta
}
