import React, { useState } from "react"
import { clientApi } from "@az/react/tanstack-api"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpLink } from "@trpc/client"

function fetchFunction(url: URL | RequestInfo, options: RequestInit | undefined) {
  return fetch(window.location.origin + url, {
    ...options,
    headers: {
      ...options?.headers,
    },
  })
}

const ApiQueryClientProvider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus() {
              return true
            },
            retry: 1,
          },
        },
      }),
  )

  const [trpcClient] = useState(() => {
    return clientApi.createClient({
      links: [
        httpLink({
          url: "/api",
          async fetch(url, options) {
            const res = await fetchFunction(url, options)
            if (res.status === 401) {
              return fetchFunction(url, options)
            }
            return res
          },
        }),
      ],
    })
  })

  return (
    <clientApi.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </clientApi.Provider>
  )
}

export { ApiQueryClientProvider }
