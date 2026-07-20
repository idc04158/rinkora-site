import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import {
  CatalogProxyError,
  listCatalogOpportunities,
  parseSort,
} from "@/services/opportunity/catalog-proxy-service"
import { OpportunitySearchParams } from "@/types/opportunity"

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query") ?? undefined
    const category = request.nextUrl.searchParams.get("category") ?? undefined
    const region = request.nextUrl.searchParams.get("region") ?? undefined
    const sortByDeadline = parseSort(request.nextUrl.searchParams.get("sortByDeadline"))
    const page = Number(request.nextUrl.searchParams.get("page") ?? "1")
    const pageSize = Number(request.nextUrl.searchParams.get("pageSize") ?? "20")

    const result = await listCatalogOpportunities({
      query,
      category: category as OpportunitySearchParams["category"],
      region: region as OpportunitySearchParams["region"],
      sortByDeadline,
      page: Number.isFinite(page) ? page : 1,
      pageSize: Number.isFinite(pageSize) ? pageSize : 20,
    })

    return ok(result)
  } catch (error) {
    if (error instanceof CatalogProxyError) {
      return fail(error.message, error.status)
    }
    return fail("Catalog opportunities request failed.", 500)
  }
}
