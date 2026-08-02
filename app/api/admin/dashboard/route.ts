import { NextRequest } from "next/server"
import { ok } from "@/lib/api/response"
import { requireAdmin } from "@/lib/api/auth-guard"
import { getDashboardSummary } from "@/services/admin/admin-service"

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (admin instanceof Response) return admin

  const summary = await getDashboardSummary()
  return ok(summary)
}
