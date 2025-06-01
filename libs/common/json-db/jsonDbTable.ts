type StandardData = Array<Record<string, unknown>>
type FindFields<Data> = Partial<Data> | ((item: Data) => boolean)

export class JsonDbTable<Data extends StandardData> {
  private data: Data
  private initialData: Data
  constructor(table: Data) {
    this.initialData = JSON.parse(JSON.stringify(table)) as Data
    this.data = table
  }
  private getIndex(fields: FindFields<Data[0]>) {
    if (fields instanceof Function) return this.data.findIndex(fields)
    return this.data.findIndex(item => {
      return Object.entries(fields).every(([key, value]) => {
        return item[key] === value
      })
    })
  }
  public async findOne(fields: FindFields<Data[0]> = {}): Promise<Data[0] | undefined> {
    const index = this.getIndex(fields)
    return index > -1 ? this.data[index] : undefined
  }
  public async find(fields: FindFields<Data[0]> = {}, { exact } = { exact: false }): Promise<Data> {
    if (fields instanceof Function) return this.data.filter(fields) as Data
    if (!Object.entries(fields).length) return this.data
    const ret: Data = this.data.filter(item => {
      return Object.entries(fields).some(([key, value]) => {
        if (exact) return item[key] === value
        return item[key]?.toString().includes(value.toString())
      })
    }) as Data
    return ret
  }
  public async insertOne(set: Data[0]): Promise<Data[0]> {
    this.data.push(set)
    return set
  }
  public async insertMany(sets: Data): Promise<Data> {
    this.data.push(...sets)
    return sets
  }
  public async deleteOne(fields: FindFields<Data[0]>): Promise<Data[0] | undefined> {
    const index = this.getIndex(fields)
    const [item] = this.data.splice(index, 1)
    return item
  }
  public async clear(): Promise<undefined> {
    this.data.splice(0, this.data.length)
    return
  }
  public async updateOne(
    fields: FindFields<Data[0]>,
    set: Partial<Data[0]> | ((prev: Data[0]) => Partial<Data[0]>),
  ): Promise<Data[0] | undefined> {
    const index = this.getIndex(fields)
    if (index > -1) {
      const prev = this.data[index]
      const updates = typeof set === "function" ? set(prev) : set
      const clean = Object.entries(updates).reduce(
        (acc, [key, value]) => {
          if (value === undefined) return acc
          return { ...acc, [key]: value }
        },
        {} as Partial<Data[0]>,
      )
      const item = { ...prev, ...clean }
      this.data.splice(index, 1, item)
      return item
    }

    return
  }
  public async restoreInitialData(): Promise<void> {
    this.data = JSON.parse(JSON.stringify(this.initialData)) as Data
  }
}
