import { OpportunityRepository } from "@/services/opportunity/opportunity-repository"
import { MockOpportunityRepository } from "@/services/opportunity/mock-opportunity-repository"
import { ApiOpportunityRepository } from "@/services/opportunity/api-opportunity-repository"

export type OpportunityDataSource = "mock" | "api"

const mockRepository = new MockOpportunityRepository()
const apiRepository = new ApiOpportunityRepository()

export function getOpportunityRepository(
  source: OpportunityDataSource = "api",
): OpportunityRepository {
  return source === "mock" ? mockRepository : apiRepository
}

export type { OpportunityRepository } from "@/services/opportunity/opportunity-repository"
export { MockOpportunityRepository } from "@/services/opportunity/mock-opportunity-repository"
export { ApiOpportunityRepository } from "@/services/opportunity/api-opportunity-repository"
export { catalogApiEndpoints } from "@/services/opportunity/catalog-api-contract"
