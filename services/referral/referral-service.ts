import { prisma } from "@/lib/db/prisma"
import { grantCredits } from "@/services/credit/credit-service"

export async function registerReferral(inviterId: string, inviteeId: string) {
  if (inviterId === inviteeId) return null

  return prisma.referral.upsert({
    where: {
      inviter_id_invitee_id: {
        inviter_id: inviterId,
        invitee_id: inviteeId,
      },
    },
    update: {},
    create: {
      inviter_id: inviterId,
      invitee_id: inviteeId,
      status: "invited",
      reward: 0,
    },
  })
}

export async function rewardReferralOnVerification(inviteeId: string) {
  const pending = await prisma.referral.findFirst({
    where: {
      invitee_id: inviteeId,
      status: { in: ["invited", "verified"] },
    },
  })

  if (!pending) return null

  await prisma.referral.update({
    where: { id: pending.id },
    data: {
      status: "rewarded",
      reward: 10,
    },
  })

  await grantCredits(pending.inviter_id, 10, "추천인 인증 완료 보상", "referral_reward")

  const rewardedCount = await prisma.referral.count({
    where: {
      inviter_id: pending.inviter_id,
      status: "rewarded",
    },
  })

  if (rewardedCount >= 5) {
    await prisma.credit.update({
      where: { user_id: pending.inviter_id },
      data: {
        unlimited_until: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    })
  }

  return pending
}
