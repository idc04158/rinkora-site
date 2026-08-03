import { NextRequest } from "next/server"

export function getAdminCredentials() {
  const id = (process.env.ADMIN_ID || process.env.ADMIN_EMAIL || "").trim()
  const password = (process.env.ADMIN_PASSWORD || "").trim()
  return { id, password }
}

export function isValidAdminBasicAuth(
  authorizationHeader: string | null | undefined,
): boolean {
  const { id, password } = getAdminCredentials()
  if (!id || !password) return false
  if (!authorizationHeader?.startsWith("Basic ")) return false

  try {
    const decoded = atob(authorizationHeader.slice(6))
    const separator = decoded.indexOf(":")
    if (separator < 0) return false
    const user = decoded.slice(0, separator)
    const pass = decoded.slice(separator + 1)
    return user === id && pass === password
  } catch {
    return false
  }
}

export function isValidAdminBasicAuthFromRequest(request: NextRequest): boolean {
  return isValidAdminBasicAuth(request.headers.get("authorization"))
}

export function adminBasicUnauthorizedResponse() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Rinkora Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  })
}
