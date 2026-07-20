import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import {
  CatalogProxyError,
  getCatalogOpportunityById,
} from "@/services/opportunity/catalog-proxy-service"

type RouteProps = {
  params: Promise<{ id: string }>
}

export async function GET(_request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params
    if (!id) return fail("Opportunity id is required.", 400)

    const result = await getCatalogOpportunityById(id)
    if (!result.item) return fail("Opportunity not found.", 404)

    return ok(result)
  } catch (error) {
    if (error instanceof CatalogProxyError) {
      return fail(error.message, error.status)
    }
    return fail("Catalog opportunity detail request failed.", 500)
  }
}
