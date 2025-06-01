import { generatePath } from "react-router-dom"
import { ROUTES } from "src/utils/routes"
import { ZoneButton } from "@az/react/components"
import { clientApi, useToggleZone } from "@az/react/tanstack-api"

const inputParams = {}

export const ZonesPage = () => {
  const { data, isLoading, error } = clientApi.zone.list.useQuery(inputParams, {
    refetchInterval: 5_000, // Refetch every 10 seconds
  })
  const { mutateAsync: toggleZone } = useToggleZone(inputParams)

  if (error) {
    return <p>Error loading zones: {error.message}</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Zones:</h1>
      <hr className="mb-4" />
      <section className="flex flex-wrap gap-8 justify-center pb-24">
        {isLoading && <p>Loading zones...</p>}
        {!isLoading && data && data.length === 0 && <p>No zones found.</p>}
        {data?.map((zone, idx) => (
          <div key={idx} className="flex-shrink-0">
            <ZoneButton
              {...zone}
              to={generatePath(ROUTES.ZONE_ID, zone)}
              onToggle={async () => toggleZone({ zoneId: zone.id })}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
