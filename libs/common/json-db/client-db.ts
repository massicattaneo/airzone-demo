import { JsonDb } from "./jsonDb"

export const newEmptyDb = () => {
  const db = {
    zones: new Array<{
      id: string
      zoneName: string
      isOn: boolean
      deviceId: string
      targetTemp: number
    }>(),
  }
  db.zones.push(
    {
      id: "zone-1",
      zoneName: "Living Room",
      isOn: true,
      deviceId: "device-1",
      targetTemp: 22,
    },
    {
      id: "zone-2",
      zoneName: "Bedroom",
      isOn: true,
      deviceId: "device-2",
      targetTemp: 20,
    },
    {
      id: "zone-3",
      zoneName: "Kitchen",
      deviceId: "device-3",
      isOn: true,
      targetTemp: 21,
    },
    {
      id: "zone-4",
      zoneName: "Office",
      isOn: true,
      deviceId: "device-4",
      targetTemp: 23,
    },
    {
      id: "zone-5",
      zoneName: "Guest Room",
      isOn: false,
      deviceId: "device-5",
      targetTemp: 19,
    },
  )
  return db
}
export type DbData = ReturnType<typeof newEmptyDb>

export const clientDb = new JsonDb(newEmptyDb())
