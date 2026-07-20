import {
  OpportunityCategory,
  OpportunityDto,
  OpportunityRegion,
  OpportunitySearchParams,
} from "@/types/opportunity"
import { OpportunityRepository } from "@/services/opportunity/opportunity-repository"

type CatalogListResponse = {
  items: OpportunityDto[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}

const REQUEST_TIMEOUT_MS = 8000

export class ApiOpportunityRepository implements OpportunityRepository {
  private toError(status: number, fallback: string) {
    if (status === 401) return new Error("인증에 실패했습니다. (401)")
    if (status === 404) return new Error("요청한 데이터를 찾을 수 없습니다. (404)")
    if (status >= 500) return new Error("Catalog 서버 오류가 발생했습니다. (500)")
    return new Error(fallback)
  }

  private async request<T>(path: string, query?: Record<string, string>) {
    const url = new URL(path, "http://localhost")
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== "") url.searchParams.set(key, value)
      })
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(`${url.pathname}${url.search}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      })

      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { message?: string }
        throw this.toError(response.status, body.message ?? "Catalog API 요청에 실패했습니다.")
      }

      return (await response.json()) as T
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Catalog API 요청 시간이 초과되었습니다. (Timeout)")
      }
      if (error instanceof TypeError) {
        throw new Error("Catalog API 네트워크 오류가 발생했습니다.")
      }
      throw error
    } finally {
      clearTimeout(timeout)
    }
  }

  async getOpportunities(
    params: OpportunitySearchParams = {},
  ): Promise<OpportunityDto[]> {
    const query: Record<string, string> = {}
    if (params.query) query.query = params.query
    if (params.category && params.category !== "ALL") query.category = params.category
    if (params.region && params.region !== "ALL") query.region = params.region
    if (params.sortByDeadline) query.sortByDeadline = params.sortByDeadline

    const response = await this.request<CatalogListResponse>("/api/catalog/opportunities", query)
    return response.items
  }

  async getOpportunityById(id: string): Promise<OpportunityDto | null> {
    const response = await this.request<{ item: OpportunityDto | null }>(
      `/api/catalog/opportunities/${encodeURIComponent(id)}`
    )
    return response.item
  }

  async getCategories(): Promise<OpportunityCategory[]> {
    const response = await this.request<{ items: OpportunityCategory[]; total: number }>(
      "/api/catalog/categories"
    )
    return response.items
  }

  async getOrganizations(): Promise<string[]> {
    const response = await this.request<{ items: string[]; total: number }>(
      "/api/catalog/organizations"
    )
    return response.items
  }

  async getRegions(): Promise<OpportunityRegion[]> {
    const opportunities = await this.getOpportunities()
    return Array.from(new Set(opportunities.map((item) => item.region)))
  }
}
