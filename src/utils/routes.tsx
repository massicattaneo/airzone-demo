import { RouteObject } from "react-router-dom"
import { HomePage } from "src/pages/HomePage"
import { SchedulesPage } from "src/pages/SchedulesPage"
import { SettingsPage } from "src/pages/SettingsPage"
import { ZonesIdPage } from "src/pages/ZonesIdPage"
import { ZonesPage } from "src/pages/ZonesPage"

const ROUTES = {
  HOME: "/",
  ZONES: "/zones",
  ZONE_ID: "/zones/:id",
  SCHEDULES: "/schedules",
  SETTINGS: "/settings",
}

const routes: RouteObject[] = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.ZONE_ID, element: <ZonesIdPage /> },
  { path: ROUTES.ZONES, element: <ZonesPage /> },
  { path: ROUTES.SCHEDULES, element: <SchedulesPage /> },
  { path: ROUTES.SETTINGS, element: <SettingsPage /> },
]

export { routes, ROUTES }
