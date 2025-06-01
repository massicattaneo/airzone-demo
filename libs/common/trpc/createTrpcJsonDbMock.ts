import {
  AnyQueryProcedure,
  AnyTRPCRouter,
  TRPCCombinedDataTransformer,
  inferProcedureInput,
  inferProcedureOutput,
} from "@trpc/server"

type ErrorStatuses = 400 | 401 | 402 | 403 | 404 | 500

type FulfillResponse<K extends AnyQueryProcedure> =
  | {
      status?: 200
      json: inferProcedureOutput<K>
    }
  | { status: ErrorStatuses; json?: Error }

type FulfillHandler<K extends AnyQueryProcedure | AnyTRPCRouter | undefined> =
  K extends AnyQueryProcedure
    ?
        | FulfillResponse<K>
        | ((input: inferProcedureInput<K>, response: inferProcedureOutput<K>) => FulfillResponse<K>)
    : unknown

type TrpcPlaywrightMock<Router> = {
  [key in keyof Router]: Router[key] extends AnyQueryProcedure
    ? {
        fulfill: (response: FulfillHandler<Router[key]>) => Promise<{ clear: () => void }>
      }
    : TrpcPlaywrightMock<Router[key]>
}

type Config = {
  transformer?: TRPCCombinedDataTransformer
}

type ConfigWthMocks = Config & {
  mocks: Record<string, FulfillHandler<AnyQueryProcedure>>
}

const defaultTransformer: TRPCCombinedDataTransformer = {
  input: { serialize: obj => obj, deserialize: obj => obj },
  output: { serialize: obj => obj, deserialize: obj => obj },
}

const createTypedTRPC = <Router extends AnyTRPCRouter>(
  { transformer = defaultTransformer, mocks }: ConfigWthMocks = { mocks: {} },
  pathParts: Array<string> = [],
  _context?: Router,
): TrpcPlaywrightMock<Router> => {
  return new Proxy<TrpcPlaywrightMock<Router>>({} as TrpcPlaywrightMock<Router>, {
    get(proxy, procedureKey: keyof typeof _context) {
      if (procedureKey === "fulfill") {
        return (response: FulfillHandler<typeof _context>) => {
          Object.assign(mocks, { [pathParts.join(".")]: response })
          return Promise.resolve({
            clear: () => {
              Object.assign(mocks, { [pathParts.join(".")]: undefined })
            },
          })
        }
      }
      return createTypedTRPC(
        { transformer, mocks },
        [...pathParts, procedureKey],
        proxy[procedureKey],
      )
    },
  })
}

export const createTrpcHttpMocker = <Router extends AnyTRPCRouter>(config: Config = {}) => {
  const mocks: Record<string, FulfillHandler<AnyQueryProcedure>> = {}
  return {
    mock: createTypedTRPC<Router>({ ...config, mocks }),
    hasMock: (path: string) => {
      return mocks[path]
    },
    clearAllMocks: () => {
      Object.keys(mocks).forEach(key => {
        Object.assign(mocks, { [key]: undefined })
      })
    },
  }
}
