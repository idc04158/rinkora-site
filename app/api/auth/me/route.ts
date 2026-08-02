import { NextRequest } from "next/server"
import { fail, ok } from "@/lib/api/response"
import { requireUser } from "@/lib/api/auth-guard"
import { prisma } from "@/lib/db/prisma"
import { updateProfile, withdrawUser } from "@/services/auth/auth-service"
import { getBusinessStatusForUser } from "@/services/business/business-service"

export async function GET(request: NextRequest) {
  const user = await requireUser(request)
  if (user instanceof Response) return user

  const [dbUser, credit, savedSearchCount, businessStatus] = await Promise.all([
    prisma.user.findUnique({ where: { id: user.id } }),
    prisma.credit.findUnique({ where: { user_id: user.id } }),
    prisma.savedSearch.count({ where: { user_id: user.id } }),
    getBusinessStatusForUser(user.id),
  ])

  if (!dbUser) return fail("회원 정보를 찾을 수 없습니다.", 404)

  return ok({
    user: {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
      status: dbUser.status,
      emailVerified: dbUser.email_verified,
      profileStep: savedSearchCount,
      verificationStatus: businessStatus.verificationStatus,
      rejectedReason: businessStatus.rejectedReason,
    },
    credits: credit
      ? {
          remaining: credit.remaining,
          total: credit.total,
          unlimitedUntil: credit.unlimited_until?.toISOString() ?? null,
        }
      : null,
  })
}

export async function PATCH(request: NextRequest) {
  const user = await requireUser(request)
  if (user instanceof Response) return user

  const body = await request.json()
  const email = body.email ? String(body.email).trim().toLowerCase() : undefined

  const updated = await updateProfile(user.id, { email })
  return ok({
    user: {
      id: updated.id,
      email: updated.email,
      role: updated.role,
      status: updated.status,
    },
  })
}

export async function DELETE(request: NextRequest) {
  const user = await requireUser(request)
  if (user instanceof Response) return user

  await withdrawUser(user.id)
  return ok({ success: true })
}
