import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { redirect } from "next/navigation"
import type { SessionUser } from "@/types/auth"
import { verifySessionToken } from "@/lib/auth/jwt"

export const SESSION_COOKIE_NAME = "rinkora_session"

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  }
}

export async function getSessionUserFromRequest(request: NextRequest): Promise<SessionUser | null> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  try {
    const payload = await verifySessionToken(token)
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      status: payload.status,
    }
  } catch {
    return null
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  try {
    const payload = await verifySessionToken(token)
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      status: payload.status,
    }
  } catch {
    return null
  }
}

export async function requireAdminPage() {
  const user = await getSessionUser()
  if (!user || user.role !== "admin") {
    redirect("/auth/login")
  }
  return user
}
