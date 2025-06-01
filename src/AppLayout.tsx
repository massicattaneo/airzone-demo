// AppLayout.tsx
import { useAtom } from "jotai/react"
import { Outlet } from "react-router-dom"
import { DesktopSidebar, MobileBottomNav } from "./components/Layout"
import { collapsedSidebarAtom } from "./utils/atoms"

export function AppLayout() {
  const [collapsed, setCollapsed] = useAtom(collapsedSidebarAtom)
  const leftMargin = collapsed ? "lg:ml-16" : "lg:ml-64"

  return (
    <div className="flex">
      <DesktopSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`flex-1 pt-4 px-4 transition-all duration-300 ${leftMargin}`}>
        <Outlet />
        <MobileBottomNav />
      </main>
    </div>
  )
}
