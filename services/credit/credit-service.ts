import { prisma } from "@/lib/db/prisma"

export async function ensureUserCredit(userId: string) {
  return prisma.credit.upsert({
    where: { user_id: userId },
    update: {},
    create: {
      user_id: userId,
      remaining: 3,
      total: 3,
    },
  })
}

export async function grantCredits(userId: string, amount: number, description: string, type = "admin_grant") {
  await ensureUserCredit(userId)

  const credit = await prisma.credit.update({
    where: { user_id: userId },
    data: {
      remaining: { increment: amount },
      total: { increment: amount },
    },
  })

  await prisma.creditHistory.create({
    data: {
      user_id: userId,
      type,
      amount,
      description,
    },
  })

  return credit
}

export async function consumeCredit(userId: string, description: string) {
  const credit = await ensureUserCredit(userId)
  const unlimited = credit.unlimited_until && credit.unlimited_until > new Date()

  if (!unlimited && credit.remaining <= 0) return null

  const updated = await prisma.credit.update({
    where: { user_id: userId },
    data: unlimited ? {} : { remaining: { decrement: 1 } },
  })

  await prisma.creditHistory.create({
    data: {
      user_id: userId,
      type: "consume",
      amount: -1,
      description,
    },
  })

  return updated
}
