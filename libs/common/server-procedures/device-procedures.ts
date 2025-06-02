import { z } from "zod"
import { mainProcedure } from "./apiServer"

export const deviceProcedures = {
  temperature: mainProcedure
    .meta({ openapi: { method: "GET", path: "/api/device.temperature" } })
    .input(z.object({ deviceIds: z.array(z.string()) }))
    .query(async ({ input }) => {
      return input.deviceIds.reduce(
        (acc, deviceId) => {
          const chance = Math.random()
          if (chance < 0.1) return { ...acc, [deviceId]: null }
          const temperature = Math.floor(Math.random() * (24 - 16 + 1)) + 16
          return { ...acc, [deviceId]: temperature }
        },
        {} as Record<string, number | null>,
      )
    }),
}
