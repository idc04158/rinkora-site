import { NextRequest } from "next/server"
import { ok } from "@/lib/api/response"
import { requireAdmin } from "@/lib/api/auth-guard"
import { prisma } from "@/lib/db/prisma"

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const logs = await prisma.adminLog.findMany({
    orderBy: { created_at: "desc" },
    take: 200,
    include: { admin: { select: { email: true } } },
  })
  return ok({ logs })
}
