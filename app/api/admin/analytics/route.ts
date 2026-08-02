import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api/auth-guard"
import { getSummary } from "@/services/analytics/analytics-service"

export async function GET(request: NextRequest) {
  const maybeUser = await requireAdmin(request)
  if ((maybeUser as Response) instanceof Response) {
    return maybeUser as Response
  }

  const url = new URL(request.url)
  const range = Number(url.searchParams.get("range") ?? "7")
  const summary = await getSummary(range)
  return NextResponse.json({ ok: true, data: summary })
}

