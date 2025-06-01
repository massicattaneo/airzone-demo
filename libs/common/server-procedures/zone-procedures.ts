import { z } from "zod"
import { mainProcedure } from "./apiServer"

export const zoneProcedures = {
  list: mainProcedure
    .meta({ openapi: { method: "GET", path: "/api/zone.list" } })
    .input(z.object({}))
    .query(async ({ ctx }) => {
      return ctx.db.collection("zones").find()
    }),
  id: mainProcedure
    .meta({ openapi: { method: "GET", path: "/api/zone.id" } })
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.collection("zones").findOne({ id: input.id })
    }),
  toggle: mainProcedure
    .meta({ openapi: { method: "POST", path: "/api/zone.toggle" } })
    .input(z.object({ zoneId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const zone = await ctx.db.collection("zones").findOne({ id: input.zoneId })
      if (!zone) {
        throw new Error("Zone not found")
      }
      return ctx.db.collection("zones").updateOne({ id: input.zoneId }, { isOn: !zone.isOn })
    }),
}
