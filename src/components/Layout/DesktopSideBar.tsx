// components/Sidebar.tsx
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  Settings,
} from "lucide-react"
import { Link } from "react-router-dom"
import { AirzoneLogo } from "@az/assets"
import { ROUTES } from "../../utils/routes"

type SidebarItemProps = {
  icon: React.ReactNode
  label: string
  collapsed: boolean
  to: string
}
function SidebarItem({ icon, label, collapsed, to }: SidebarItemProps) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center space-x-3 hover:bg-gray-700 rounded p-2 cursor-pointer"
      >
        {icon}
        {!collapsed && <span className="text-sm">{label}</span>}
      </Link>
    </li>
  )
}

type Props = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function DesktopSidebar({ collapsed, setCollapsed }: Props) {
  return (
    <aside
      role="navigation"
      aria-label="Sidebar Navigation"
      className={`bg-gray-800 text-white h-screen fixed top-0 left-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } hidden lg:flex flex-col`}
    >
      <div className="bg-gray-200 flex items-center justify-between px-4 h-16 border-b border-gray-700">
        {!collapsed && (
          <div className="w-32">
            <AirzoneLogo />
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white">
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <nav className="flex-1 mt-4">
        <ul className="space-y-2 px-2">
          <SidebarItem to={ROUTES.HOME} icon={<Home />} label="Home" collapsed={collapsed} />
          <SidebarItem
            to={ROUTES.ZONES}
            icon={<LayoutDashboard />}
            label="Zones"
            collapsed={collapsed}
          />
          <SidebarItem
            to={ROUTES.SCHEDULES}
            icon={<CalendarDays />}
            label="Schedules"
            collapsed={collapsed}
          />
          <SidebarItem
            to={ROUTES.SETTINGS}
            icon={<Settings />}
            label="Settings"
            collapsed={collapsed}
          />
        </ul>
      </nav>
    </aside>
  )
}
