import { NextRequest, NextResponse } from "next/server"
import { fail } from "@/lib/api/response"
import { signSessionToken } from "@/lib/auth/jwt"
import { getSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth/session"
import { loginWithEmail } from "@/services/auth/auth-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body.email ?? "").trim().toLowerCase()
    const password = String(body.password ?? "")

    if (!email || !password) {
      return fail("이메일과 비밀번호를 입력해주세요.", 400)
    }

    const { user, credit } = await loginWithEmail(email, password)

    const token = await signSessionToken({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      credits: {
        remaining: credit.remaining,
        total: credit.total,
        unlimitedUntil: credit.unlimited_until?.toISOString() ?? null,
      },
    })

    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions())
    return response
  } catch (error) {
    return fail(error instanceof Error ? error.message : "로그인 실패", 400)
  }
}
