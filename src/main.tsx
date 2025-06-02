import React from "react"
import { setupWorker } from "msw/browser"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { mswTrpcHandlers } from "@az/common/msw"
import "./App.css"
import { AppLayout } from "./AppLayout"
import { ApiQueryClientProvider } from "./components/ApiQueryClientProvider"
import { routes } from "./utils/routes"

;(async function name() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <AppLayout />,
        children: routes,
      },
    ],
    { basename: import.meta.env.BASE_URL },
  )
  if (!window.localStorage.getItem("integration-testing")) {
    const mswWorker = setupWorker(...mswTrpcHandlers)
    await mswWorker.start({
      onUnhandledRequest: "bypass",
      quiet: true,
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
    })
  }

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <ApiQueryClientProvider>
        <RouterProvider router={router} />
      </ApiQueryClientProvider>
    </React.StrictMode>,
  )
})()
