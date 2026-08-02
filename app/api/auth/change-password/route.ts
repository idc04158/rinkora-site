import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import { requireUser } from "@/lib/api/auth-guard"
import { changePassword } from "@/services/auth/auth-service"

export async function POST(request: NextRequest) {
  const user = await requireUser(request)
  if (user instanceof Response) return user

  try {
    const body = await request.json()
    const currentPassword = String(body.currentPassword ?? "")
    const nextPassword = String(body.nextPassword ?? "")

    if (nextPassword.length < 8) return fail("새 비밀번호는 8자 이상이어야 합니다.", 400)

    await changePassword(user.id, currentPassword, nextPassword)
    return ok({ success: true })
  } catch (error) {
    return fail(error instanceof Error ? error.message : "비밀번호 변경 실패", 400)
  }
}
