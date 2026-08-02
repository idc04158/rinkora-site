import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import { resetPasswordWithToken } from "@/services/auth/auth-service"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const token = String(body.token ?? "")
  const password = String(body.password ?? "")

  if (!token || password.length < 8) {
    return fail("유효한 토큰과 8자 이상 비밀번호가 필요합니다.", 400)
  }

  const result = await resetPasswordWithToken(token, password)
  return ok(result)
}
