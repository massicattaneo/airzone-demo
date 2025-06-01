export function matchPattern(url: string, pattern: string) {
  // Convert the pattern into a regular expression
  const paramNames: Array<string> = []
  const regexPattern = pattern
    .replace(/:[a-zA-Z0-9-_]+/g, match => {
      const paramName = match.substring(1)
      paramNames.push(paramName)
      return "([^/]+)" // Capture everything between slashes
    })
    .replace(/::/g, "([^/]+)") // Handle cases like ::subId

  const regex = new RegExp(`^${regexPattern}$`)
  return {
    match: !!url.match(regex),
    paramNames,
    matches: url.match(regex) ?? [],
  }
}

export function extractParams(url: string, pattern: string): Record<string, string> | null {
  const { matches, match, paramNames } = matchPattern(url, pattern)

  if (match) {
    // Extract the parameter values using the captured groups
    const params: Record<string, string> = {}
    paramNames.forEach((paramName, index) => {
      params[paramName] = matches[index + 1] // match[0] is the full URL match, params start at index 1
    })
    return params
  }

  return null // Return null if no match
}
