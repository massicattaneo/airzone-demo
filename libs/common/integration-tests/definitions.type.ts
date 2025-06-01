import { Page } from "@playwright/test"
import { CustomFixtures } from "./fixtures"

type Params = { page: Page } & CustomFixtures
export type Given = (params: Params) => Promise<void>
