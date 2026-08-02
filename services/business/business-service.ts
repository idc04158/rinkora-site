import { prisma } from "@/lib/db/prisma"
import { grantCredits } from "@/services/credit/credit-service"

export async function submitBusinessVerification(userId: string, input: {
  businessNumber: string
  companyName: string
  representative?: string
  certificateUrl?: string
}) {
  return prisma.business.upsert({
    where: { user_id: userId },
    update: {
      business_number: input.businessNumber,
      company_name: input.companyName,
      representative: input.representative,
      certificate_url: input.certificateUrl,
      status: "pending",
      rejected_reason: null,
    },
    create: {
      user_id: userId,
      business_number: input.businessNumber,
      company_name: input.companyName,
      representative: input.representative,
      certificate_url: input.certificateUrl,
      status: "pending",
      rejected_reason: null,
    },
  })
}

export async function getBusinessStatusForUser(userId: string) {
  const business = await prisma.business.findUnique({
    where: { user_id: userId },
    select: { status: true, rejected_reason: true },
  })

  if (!business) {
    return {
      verificationStatus: "unverified" as const,
      rejectedReason: null as string | null,
    }
  }

  if (business.status === "pending") {
    return { verificationStatus: "pending" as const, rejectedReason: null as string | null }
  }

  if (business.status === "approved") {
    return { verificationStatus: "verified" as const, rejectedReason: null as string | null }
  }

  return {
    verificationStatus: "rejected" as const,
    rejectedReason: business.rejected_reason,
  }
}

export async function approveBusiness(adminId: string, businessId: string) {
  const business = await prisma.business.update({
    where: { id: businessId },
    data: {
      status: "approved",
      rejected_reason: null,
      verified_at: new Date(),
    },
  })

  await prisma.user.update({
    where: { id: business.user_id },
    data: { role: "verified" },
  })

  await grantCredits(business.user_id, 27, "사업자 인증 완료 보너스 지급", "business_verify_bonus")

  await prisma.adminLog.create({
    data: {
      admin_id: adminId,
      action: "business_approve",
      target: businessId,
    },
  })

  return business
}

export async function rejectBusiness(adminId: string, businessId: string, rejectedReason: string) {
  const business = await prisma.business.update({
    where: { id: businessId },
    data: {
      status: "rejected",
      rejected_reason: rejectedReason,
    },
  })

  await prisma.notification.create({
    data: {
      user_id: business.user_id,
      type: "update",
      opportunity_id: null,
      title: "사업자 인증 심사 결과 안내",
      message: `사업자 인증이 반려되었습니다. 사유: ${rejectedReason}`,
      is_read: false,
    },
  })

  await prisma.adminLog.create({
    data: {
      admin_id: adminId,
      action: "business_reject",
      target: `${businessId}:${rejectedReason}`,
    },
  })

  return business
}
