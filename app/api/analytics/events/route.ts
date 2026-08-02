import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db/prisma"
import { getSessionUserFromRequest } from "@/lib/auth/session"

const EXCLUDE_COOKIE = "rk_exclude_analytics"

const EventSchema = z.object({
  type: z.enum(["page_view", "page_ping", "site_search"]),
  sessionId: z.string().min(1).max(128),
  visitorId: z.string().min(1).max(128),
  path: z.string().min(1).max(500),
  referrer: z.string().max(1000).optional().nullable(),
  query: z.string().max(300).optional().nullable(),
  dwellMs: z.number().int().min(0).max(86_400_000).optional().nullable(),
})

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const parse = EventSchema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 })
  }

  const { type, sessionId, visitorId, path, referrer, query, dwellMs } = parse.data

  if (path.startsWith("/admin")) {
    return NextResponse.json({ ok: true })
  }

  if (type === "site_search" && (!query || !query.trim())) {
    return NextResponse.json({ ok: true })
  }

  let userId: string | undefined
  let isExcluded = false

  try {
    const user = await getSessionUserFromRequest(request)
    if (user) {
      userId = user.id
      if (user.role === "admin" || user.email === process.env.ADMIN_EMAIL) {
        isExcluded = true
      }
    }
  } catch {
    // ignore session errors
  }

  if (request.cookies.get(EXCLUDE_COOKIE)?.value === "1") {
    isExcluded = true
  }

  try {
    await prisma.analyticsEvent.create({
      data: {
        type,
        session_id: sessionId,
        visitor_id: visitorId,
        user_id: userId,
        path,
        referrer: referrer ?? undefined,
        query: query?.trim() || undefined,
        dwell_ms: dwellMs ?? undefined,
        is_excluded: isExcluded,
      },
    })
  } catch {
    // DB unavailable should not break the site
    return NextResponse.json({ ok: false }, { status: 202 })
  }

  return NextResponse.json({ ok: true })
}
