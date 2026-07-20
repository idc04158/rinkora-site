import { opportunityMockData } from "@/data/opportunities"
import {
  OpportunityCategory,
  OpportunityDto,
  OpportunityRegion,
  OpportunitySearchParams,
} from "@/types/opportunity"
import { OpportunityRepository } from "@/services/opportunity/opportunity-repository"

const MOCK_DELAY_MS = 600

function toDate(deadline: string) {
  return new Date(deadline).getTime()
}

export class MockOpportunityRepository implements OpportunityRepository {
  async getOpportunities(
    params: OpportunitySearchParams = {},
  ): Promise<OpportunityDto[]> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))

    const query = params.query?.trim().toLowerCase() ?? ""
    const category = params.category ?? "ALL"
    const region = params.region ?? "ALL"
    const sortByDeadline = params.sortByDeadline ?? "deadline_asc"

    if (query === "error") {
      throw new Error("Mock repository forced error for UI testing.")
    }

    const filtered = opportunityMockData.filter((item) => {
      const matchesQuery =
        query.length === 0 ||
        item.title.toLowerCase().includes(query) ||
        item.organization.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))

      const matchesCategory = category === "ALL" || item.category === category
      const matchesRegion = region === "ALL" || item.region === region

      return matchesQuery && matchesCategory && matchesRegion
    })

    const sorted = [...filtered].sort((a, b) => {
      const left = toDate(a.deadline)
      const right = toDate(b.deadline)
      return sortByDeadline === "deadline_asc" ? left - right : right - left
    })

    return sorted
  }

  async getOpportunityById(id: string): Promise<OpportunityDto | null> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
    return opportunityMockData.find((item) => item.id === id) ?? null
  }

  async getCategories(): Promise<OpportunityCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return Array.from(new Set(opportunityMockData.map((item) => item.category)))
  }

  async getOrganizations(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return Array.from(
      new Set(opportunityMockData.map((item) => item.organization)),
    ).sort((a, b) => a.localeCompare(b))
  }

  async getRegions(): Promise<OpportunityRegion[]> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return Array.from(new Set(opportunityMockData.map((item) => item.region)))
  }
}
