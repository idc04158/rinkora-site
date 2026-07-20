import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import {
  CatalogProxyError,
  listCatalogOrganizations,
} from "@/services/opportunity/catalog-proxy-service"

export async function GET(_request: NextRequest) {
  try {
    const result = await listCatalogOrganizations()
    return ok(result)
  } catch (error) {
    if (error instanceof CatalogProxyError) {
      return fail(error.message, error.status)
    }
    return fail("Catalog organizations request failed.", 500)
  }
}
