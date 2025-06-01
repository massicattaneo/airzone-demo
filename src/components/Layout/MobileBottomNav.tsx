// components/MobileNav.tsx
import { CalendarDays, Home, LayoutDashboard, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"

export function MobileBottomNav() {
  return (
    <nav
      role="navigation"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 inset-x-0 bg-white border-t shadow-md lg:hidden"
    >
      <ul className="flex justify-around items-center h-16 text-gray-700">
        <li className="flex flex-col items-center">
          <Link to={ROUTES.HOME} className="flex flex-col items-center">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to={ROUTES.ZONES} className="flex flex-col items-center">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs">Zones</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to={ROUTES.SCHEDULES} className="flex flex-col items-center">
            <CalendarDays className="h-5 w-5" />
            <span className="text-xs">Schedules</span>
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <Link to={ROUTES.SETTINGS} className="flex flex-col items-center">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
