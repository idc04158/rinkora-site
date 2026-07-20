import { NextRequest } from "next/server"
import { ok, fail } from "@/lib/api/response"
import {
  CatalogProxyError,
  listCatalogCategories,
} from "@/services/opportunity/catalog-proxy-service"

export async function GET(_request: NextRequest) {
  try {
    const result = await listCatalogCategories()
    return ok(result)
  } catch (error) {
    if (error instanceof CatalogProxyError) {
      return fail(error.message, error.status)
    }
    return fail("Catalog categories request failed.", 500)
  }
}
