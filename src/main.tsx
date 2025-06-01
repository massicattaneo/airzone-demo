import React from "react"
import { setupWorker } from "msw/browser"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { mswTrpcHandlers } from "@az/common/msw"
import "./App.css"
import { AppLayout } from "./AppLayout"
import { ApiQueryClientProvider } from "./components/ApiQueryClientProvider"
import { routes } from "./utils/routes"

const mswWorker = setupWorker(...mswTrpcHandlers)

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: routes,
  },
])

mswWorker
  .start({
    onUnhandledRequest: "bypass",
    quiet: true,
    serviceWorker: {
      url: `/mockServiceWorker.js`,
    },
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
        <ApiQueryClientProvider>
          <RouterProvider router={router} />
        </ApiQueryClientProvider>
      </React.StrictMode>,
    )
  })
