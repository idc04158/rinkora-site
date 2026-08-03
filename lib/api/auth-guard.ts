import { NextRequest } from "next/server"
import type { SessionUser } from "@/types/auth"
import { fail } from "@/lib/api/response"
import { getAdminCredentials, isValidAdminBasicAuthFromRequest } from "@/lib/auth/admin-basic"
import { getSessionUserFromRequest } from "@/lib/auth/session"

export async function requireUser(request: NextRequest): Promise<SessionUser | Response> {
  const user = await getSessionUserFromRequest(request)
  if (!user) return fail("인증이 필요합니다.", 401)
  return user
}

export async function requireAdmin(request: NextRequest): Promise<SessionUser | Response> {
  const user = await getSessionUserFromRequest(request)
  if (user?.role === "admin") return user

  if (isValidAdminBasicAuthFromRequest(request)) {
    const { id } = getAdminCredentials()
    return {
      id: "env-admin",
      email: id,
      role: "admin",
      status: "active",
    }
  }

  return fail("관리자 권한이 필요합니다.", 403)
}
