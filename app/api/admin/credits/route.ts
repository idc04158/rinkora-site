import { NextRequest } from "next/server"
import { fail, ok } from "@/lib/api/response"
import { requireAdmin } from "@/lib/api/auth-guard"
import { prisma } from "@/lib/db/prisma"
import { grantCredits } from "@/services/credit/credit-service"
import { writeAdminLog } from "@/services/admin/admin-service"

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const userId = request.nextUrl.searchParams.get("userId")
  const history = await prisma.creditHistory.findMany({
    where: userId ? { user_id: userId } : undefined,
    orderBy: { created_at: "desc" },
    take: 300,
  })

  await writeAdminLog(admin.id, "credit_history", userId ?? "all")
  return ok({ history })
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const body = await request.json()
  const userId = String(body.userId ?? "")
  const action = String(body.action ?? "")
  const amount = Number(body.amount ?? 0)
  if (!userId || !action || !Number.isFinite(amount) || amount <= 0) {
    return fail("userId/action/amount를 확인해주세요.", 400)
  }

  if (action === "grant") {
    const credit = await grantCredits(userId, amount, "관리자 수동 지급", "admin_grant")
    await writeAdminLog(admin.id, "credit_grant", `${userId}:${amount}`)
    return ok({ credit })
  }

  if (action === "deduct") {
    const credit = await prisma.credit.update({
      where: { user_id: userId },
      data: { remaining: { decrement: amount } },
    })
    await prisma.creditHistory.create({
      data: {
        user_id: userId,
        type: "admin_deduct",
        amount: -amount,
        description: "관리자 수동 차감",
      },
    })
    await writeAdminLog(admin.id, "credit_deduct", `${userId}:${amount}`)
    return ok({ credit })
  }

  return fail("지원하지 않는 action입니다.", 400)
}
