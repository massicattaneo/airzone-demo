import { ApiRouter } from "@az/common/server-procedures"
import { createTRPCReact } from "@trpc/react-query"

export const clientApi = createTRPCReact<ApiRouter>({})

export const useToggleZone = (inputParams = {}) => {
  const utils = clientApi.useUtils()
  return clientApi.zone.toggle.useMutation({
    onMutate: async input => {
      utils.zone.id.setData({ id: input.zoneId }, prev => {
        if (!prev) return undefined
        return { ...prev, isOn: !prev.isOn }
      })
      utils.zone.list.setData(inputParams, prev => {
        if (!prev) return []
        return prev.map(zone => (zone.id === input.zoneId ? { ...zone, isOn: !zone.isOn } : zone))
      })
    },
    onError: () => {
      utils.zone.list.invalidate()
      utils.zone.id.invalidate()
    },
  })
}

export const useZonesTemperatures = (deviceIds: Array<string> | undefined) => {
  return clientApi.device.temperature.useQuery(
    {
      deviceIds: deviceIds || [],
    },
    {
      refetchInterval: 5_000,
      enabled: !!deviceIds,
    },
  )
}
