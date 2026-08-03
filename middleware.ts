import { NextRequest, NextResponse } from "next/server"
import {
  adminBasicUnauthorizedResponse,
  getAdminCredentials,
  isValidAdminBasicAuthFromRequest,
} from "@/lib/auth/admin-basic"

export function middleware(request: NextRequest) {
  const { id, password } = getAdminCredentials()

  if (!id || !password) {
    return new NextResponse("Admin credentials are not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    })
  }

  if (isValidAdminBasicAuthFromRequest(request)) {
    return NextResponse.next()
  }

  return adminBasicUnauthorizedResponse()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
