import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import {
  CatalogProxyError,
  getCatalogOpportunityDocuments,
} from "@/services/opportunity/catalog-proxy-service"

type RouteProps = {
  params: Promise<{ id: string }>
}

export async function GET(_request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params
    if (!id) return fail("Opportunity id is required.", 400)

    const result = await getCatalogOpportunityDocuments(id)
    return ok(result)
  } catch (error) {
    if (error instanceof CatalogProxyError) {
      return fail(error.message, error.status)
    }
    return fail("지원사업 문서 정보를 불러오지 못했습니다.", 500)
  }
}
