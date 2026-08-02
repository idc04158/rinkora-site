import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import { requestPasswordReset } from "@/services/auth/auth-service"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const email = String(body.email ?? "").trim().toLowerCase()
  if (!email) return fail("이메일을 입력해주세요.", 400)

  const tokenData = await requestPasswordReset(email)

  return ok({
    success: true,
    message: "비밀번호 재설정 기능은 준비 중입니다.",
    tokenPreview: tokenData?.token ?? null,
    expiresAt: tokenData?.expiresAt.toISOString() ?? null,
  })
}
