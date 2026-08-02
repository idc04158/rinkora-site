import { NextRequest } from "next/server"
import { fail, ok } from "@/lib/api/response"
import { requireAdmin } from "@/lib/api/auth-guard"
import { prisma } from "@/lib/db/prisma"
import { approveBusiness, rejectBusiness } from "@/services/business/business-service"

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const status = request.nextUrl.searchParams.get("status")
  const businesses = await prisma.business.findMany({
    where: status ? { status: status as "pending" | "approved" | "rejected" } : undefined,
    orderBy: { created_at: "desc" },
    include: { user: { select: { email: true, role: true, status: true } } },
  })

  return ok({ businesses })
}

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const body = await request.json()
  const businessId = String(body.businessId ?? "")
  const action = String(body.action ?? "")

  if (!businessId || !action) return fail("businessId와 action은 필수입니다.", 400)

  if (action === "approve") {
    const business = await approveBusiness(admin.id, businessId)
    return ok({ business })
  }

  if (action === "reject") {
    const rejectedReason = String(body.rejectedReason ?? "").trim()
    if (!rejectedReason) return fail("반려 사유를 입력해주세요.", 400)
    const business = await rejectBusiness(admin.id, businessId, rejectedReason)
    return ok({ business })
  }

  return fail("지원하지 않는 action입니다.", 400)
}
