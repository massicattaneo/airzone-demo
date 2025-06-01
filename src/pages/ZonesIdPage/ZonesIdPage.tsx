import { generatePath, useNavigate, useParams } from "react-router-dom"
import { ROUTES } from "src/utils/routes"
import { BackButton } from "@az/assets"
import { ZoneButton } from "@az/react/components"
import { clientApi, useToggleZone } from "@az/react/tanstack-api"

export const ZonesIdPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { data: zone, isLoading, error } = clientApi.zone.id.useQuery({ id: params.id ?? "" })
  const { mutateAsync: toggleZone } = useToggleZone({})

  if (error) {
    return <p>Error loading zone: {error.message}</p>
  }

  if (isLoading) {
    return <p>Loading zone...</p>
  }

  return (
    <div>
      <header className="flex items-center gap-2 mb-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="cursor-pointer text-gray-600 hover:text-gray-800 transition"
        >
          <BackButton />
        </button>
        <h1 className="text-2xl font-bold">{zone?.zoneName}:</h1>
      </header>

      <hr className="mb-4" />

      <section className="flex flex-wrap gap-8 justify-center">
        {zone && (
          <ZoneButton
            {...zone}
            size="large"
            to={generatePath(ROUTES.ZONE_ID, zone)}
            onToggle={async () => toggleZone({ zoneId: zone.id })}
          />
        )}
      </section>
    </div>
  )
}
