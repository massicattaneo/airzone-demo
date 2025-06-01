import { atomWithStorage } from "jotai/utils"

export const collapsedSidebarAtom = atomWithStorage<boolean>("sidebar.collapsed", false)
