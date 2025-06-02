import { generatePath } from "react-router-dom"
import { ROUTES } from "src/utils/routes"
import { ZoneButton } from "@az/react/components"
import { clientApi, useToggleZone, useZonesTemperatures } from "@az/react/tanstack-api"

const inputParams = {}

export const ZonesPage = () => {
  const { data, isLoading, error } = clientApi.zone.list.useQuery(inputParams)
  const { data: ambientTemps } = useZonesTemperatures(data?.map(zone => zone.deviceId))
  const { mutateAsync: toggleZone } = useToggleZone(inputParams)

  if (error) {
    return <p>Error loading zones: {error.message}</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Zones:</h1>
      <hr className="mb-4" />
      {isLoading && <p>Loading zones...</p>}
      {!isLoading && data && data.length === 0 && <p>No zones found.</p>}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {ambientTemps &&
          data?.map((zone, idx) => (
            <div key={idx} className="w-full">
              <ZoneButton
                zoneName={zone.zoneName}
                ambientTemp={ambientTemps[zone.deviceId]}
                targetTemp={zone.targetTemp}
                isOn={zone.isOn}
                to={generatePath(ROUTES.ZONE_ID, zone)}
                onToggle={async () => toggleZone({ zoneId: zone.id })}
              />
            </div>
          ))}
      </section>
    </div>
  )
}
