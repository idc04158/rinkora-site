import { NextRequest, NextResponse } from "next/server"
import { ok, fail } from "@/lib/api/response"
import { signSessionToken } from "@/lib/auth/jwt"
import { getSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth/session"
import { signupWithEmail } from "@/services/auth/auth-service"
import { prisma } from "@/lib/db/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body.email ?? "").trim().toLowerCase()
    const password = String(body.password ?? "")

    if (!email || !password || password.length < 8) {
      return fail("유효한 이메일과 8자 이상 비밀번호가 필요합니다.", 400)
    }

    const user = await signupWithEmail(email, password)
    const credit = await prisma.credit.findUnique({ where: { user_id: user.id } })
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
      credits: credit
        ? {
            remaining: credit.remaining,
            total: credit.total,
            unlimitedUntil: credit.unlimited_until?.toISOString() ?? null,
          }
        : null,
    })

    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions())
    return response
  } catch (error) {
    return fail(error instanceof Error ? error.message : "회원가입 실패", 400)
  }
}
