import { prisma } from "@/lib/db/prisma"

export async function writeAdminLog(adminId: string, action: string, target: string) {
  await prisma.adminLog.create({
    data: {
      admin_id: adminId,
      action,
      target,
    },
  })
}

export async function getDashboardSummary() {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const [todaySignups, totalUsers, pendingBusinesses, aiUsage, popularOpportunities] =
    await Promise.all([
    prisma.user.count({ where: { created_at: { gte: startOfToday }, deleted_at: null } }),
    prisma.user.count({ where: { deleted_at: null } }),
    prisma.business.count({ where: { status: "pending" } }),
    prisma.creditHistory.count({ where: { type: "consume", created_at: { gte: startOfToday } } }),
    prisma.favorite.groupBy({
      by: ["opportunity_id"],
      _count: { opportunity_id: true },
      orderBy: { _count: { opportunity_id: "desc" } },
      take: 5,
    }),
    ])

  return {
    todaySignups,
    totalUsers,
    pendingBusinesses,
    aiUsage,
    popularPrograms: popularOpportunities.map((item) => ({
      opportunityId: item.opportunity_id,
      count: item._count.opportunity_id,
      title: "Catalog API 소스 공고",
    })),
  }
}
