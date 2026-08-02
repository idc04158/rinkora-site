import { NextRequest } from "next/server"
import { ok } from "@/lib/api/response"
import { requireAdmin } from "@/lib/api/auth-guard"
import { prisma } from "@/lib/db/prisma"
import { writeAdminLog } from "@/services/admin/admin-service"

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const query = request.nextUrl.searchParams.get("q")?.trim()
  const users = await prisma.user.findMany({
    where: {
      deleted_at: null,
      email: query ? { contains: query } : undefined,
    },
    orderBy: { created_at: "desc" },
    take: 200,
    include: { credit: true, business: true },
  })

  await writeAdminLog(admin.id, "users_list", query ?? "all")
  return ok({ users })
}
