import { NextRequest } from "next/server"
import { ok } from "@/lib/api/response"
import { requireAdmin } from "@/lib/api/auth-guard"
import { prisma } from "@/lib/db/prisma"
import { writeAdminLog } from "@/services/admin/admin-service"

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const favorites = await prisma.favorite.groupBy({
    by: ["opportunity_id"],
    _count: { opportunity_id: true },
    orderBy: { _count: { opportunity_id: "desc" } },
    take: 300,
  })

  const programs = favorites.map((item) => ({
    id: item.opportunity_id,
    title: "Catalog API 소스 공고",
    saveCount: item._count.opportunity_id,
  }))

  await writeAdminLog(admin.id, "program_list", "all")
  return ok({ programs })
}
