import { JsonDbTable } from "./jsonDbTable"

export type JsonDbBase = Record<"id" | string, Array<Record<string, unknown>>>

export class JsonDb<Data extends JsonDbBase> {
  private tables: { [key in keyof Data]: JsonDbTable<Data[key]> }
  constructor(defaultData: Data) {
    this.tables = Object.keys(defaultData).reduce(
      (acc, table) => {
        return { ...acc, [table]: new JsonDbTable(defaultData[table]) }
      },
      {} as { [key in keyof Data]: JsonDbTable<Data[key]> },
    )
  }
  collection<T extends keyof Data>(name: T): JsonDbTable<Data[T]> {
    return this.tables[name]
  }
  restoreInitialData(): void {
    Object.keys(this.tables).forEach(table => {
      this.tables[table as keyof Data].restoreInitialData()
    })
  }
}
