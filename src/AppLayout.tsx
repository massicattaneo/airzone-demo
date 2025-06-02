// AppLayout.tsx
import { useAtom } from "jotai/react"
import { Outlet } from "react-router-dom"
import { DesktopSidebar, MobileBottomNav } from "./components/Layout"
import { collapsedSidebarAtom } from "./utils/atoms"

export function AppLayout() {
  const [collapsed, setCollapsed] = useAtom(collapsedSidebarAtom)
  const leftMargin = collapsed ? "md:ml-16" : "md:ml-64"

  return (
    <div className="flex">
      <DesktopSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`px-4 sm:px-8 flex-1 pt-4 px-0 transition-all duration-300 ${leftMargin}`}>
        <Outlet />
        <MobileBottomNav />
      </main>
    </div>
  )
}
