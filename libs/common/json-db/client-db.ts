import { JsonDb } from "./jsonDb"

export const newEmptyDb = () => {
  const db = {
    zones: new Array<{
      id: string
      zoneName: string
      ambientTemp: number
      targetTemp: number
      isOn: boolean
    }>(),
  }
  db.zones.push(
    {
      id: "zone-1",
      zoneName: "Living Room",
      ambientTemp: 10,
      targetTemp: 22,
      isOn: true,
    },
    {
      id: "zone-2",
      zoneName: "Bedroom",
      ambientTemp: 19,
      targetTemp: 24,
      isOn: true,
    },
    {
      id: "zone-3",
      zoneName: "Kitchen",
      ambientTemp: 23,
      targetTemp: 22,
      isOn: true,
    },
    {
      id: "zone-4",
      zoneName: "Office",
      ambientTemp: 21,
      targetTemp: 21,
      isOn: true,
    },
    {
      id: "zone-5",
      zoneName: "Guest Room",
      ambientTemp: 18,
      targetTemp: 22,
      isOn: false,
    },
  )
  return db
}
export type DbData = ReturnType<typeof newEmptyDb>

export const clientDb = new JsonDb(newEmptyDb())
