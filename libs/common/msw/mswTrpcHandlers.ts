import { HttpResponse, JsonBodyType, http } from "msw"
import { newEmptyDb } from "@az/common/json-db"
import { JsonDb } from "@az/common/json-db"
import { apiRouter } from "@az/common/server-procedures"
import { trpcHttpAdapter } from "@az/common/trpc"

const dbStub = new JsonDb(newEmptyDb())

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

async function streamToString(stream: ReadableStream<Uint8Array> | null): Promise<string> {
  if (!stream) return ""
  try {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let result = ""

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      result += decoder.decode(value, { stream: true })
    }

    // Flush any remaining bytes
    result += decoder.decode()
    return result
  } catch {
    return ""
  }
}

type B = Parameters<Parameters<typeof http.all>[1]>[0]

const createContext = async (info: B) => {
  const headers: Array<{ key: string; value: string }> = []
  info.request.headers.forEach((value: string, key: string) => {
    return headers.push({ key, value })
  })
  let jsonBody: unknown = {}
  await new Promise(res => setTimeout(res, 300)) // simulate BE latency
  const rawBody = await streamToString(info.request.body)
  try {
    jsonBody = JSON.parse(rawBody)
  } catch {
    //
  }
  return {
    db: dbStub,
    request: {
      headers: headers.reduce(
        (acc, { key, value }) => {
          return { ...acc, [key]: value.toString() }
        },
        {} as Record<string, string>,
      ),
      method: info.request.method.toUpperCase() as Method,
      url: new URL(info.request.url),
      jsonBody,
      rawBody,
    },
  }
}

const {
  handler: bigdataHandler,
  mock: api,
  clearAllMocks: apiClear,
} = trpcHttpAdapter({
  router: apiRouter,
  createContext,
})

const mswTrpcHandlers = [
  http.all(`/api/**`, async info => {
    try {
      const res = await bigdataHandler(info)
      if (res)
        return HttpResponse.json({
          result: { data: res.json },
        } as JsonBodyType)
      return
    } catch (error) {
      console.error("Error in apiHandler:", error)
      return HttpResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
  }),
]

const mswStub = {
  api,
  apiClear,
}

export { dbStub, mswStub, mswTrpcHandlers }
