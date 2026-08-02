import { prisma } from "@/lib/db/prisma"

function startOfDay(d: Date) {
  const t = new Date(d)
  t.setHours(0, 0, 0, 0)
  return t
}

const emptySummary = {
  today: { uv: 0, pv: 0, avgDwellMs: 0 },
  topPaths: [] as Array<{ path: string; count: number }>,
  topSearches: [] as Array<{ query: string | null; count: number }>,
  dailyUV: [] as Array<{ date: string; uv: number }>,
}

export async function getSummary(rangeDays = 7) {
  try {
    const now = new Date()
    const startToday = startOfDay(now)
    const rangeStart = startOfDay(
      new Date(now.getTime() - (rangeDays - 1) * 24 * 60 * 60 * 1000),
    )

    const uvGroup = await prisma.analyticsEvent.groupBy({
      by: ["visitor_id"],
      where: { created_at: { gte: startToday }, is_excluded: false },
    })
    const todayUV = uvGroup.length

    const todayPV = await prisma.analyticsEvent.count({
      where: {
        type: "page_view",
        created_at: { gte: startToday },
        is_excluded: false,
      },
    })

    const aggPing = await prisma.analyticsEvent.aggregate({
      _sum: { dwell_ms: true },
      _count: { id: true },
      where: {
        type: "page_ping",
        dwell_ms: { not: null },
        created_at: { gte: startToday },
        is_excluded: false,
      },
    })
    const avgDwellMs = aggPing._count.id
      ? Math.round((aggPing._sum.dwell_ms ?? 0) / aggPing._count.id)
      : 0

    const topPaths = await prisma.analyticsEvent.groupBy({
      by: ["path"],
      where: {
        type: "page_view",
        created_at: { gte: rangeStart },
        is_excluded: false,
      },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    })

    const topSearches = await prisma.analyticsEvent.groupBy({
      by: ["query"],
      where: {
        type: "site_search",
        created_at: { gte: rangeStart },
        is_excluded: false,
        query: { not: null },
      },
      _count: { query: true },
      orderBy: { _count: { query: "desc" } },
      take: 20,
    })

    const dailyUV: Array<{ date: string; uv: number }> = []
    for (let i = 0; i < rangeDays; i++) {
      const day = new Date(rangeStart.getTime() + i * 24 * 60 * 60 * 1000)
      const dayStart = startOfDay(day)
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
      const group = await prisma.analyticsEvent.groupBy({
        by: ["visitor_id"],
        where: {
          created_at: { gte: dayStart, lt: dayEnd },
          is_excluded: false,
        },
      })
      dailyUV.push({
        date: dayStart.toISOString().slice(0, 10),
        uv: group.length,
      })
    }

    return {
      today: { uv: todayUV, pv: todayPV, avgDwellMs },
      topPaths: topPaths.map((p) => ({ path: p.path, count: p._count.path })),
      topSearches: topSearches.map((s) => ({
        query: s.query,
        count: s._count.query,
      })),
      dailyUV,
    }
  } catch {
    return emptySummary
  }
}
