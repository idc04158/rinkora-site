import {
  OpportunityCategory,
  OpportunityDto,
  OpportunityRegion,
  OpportunitySearchParams,
} from "@/types/opportunity"

export interface OpportunityRepository {
  getOpportunities(params?: OpportunitySearchParams): Promise<OpportunityDto[]>
  getOpportunityById(id: string): Promise<OpportunityDto | null>
  getCategories(): Promise<OpportunityCategory[]>
  getOrganizations(): Promise<string[]>
  getRegions(): Promise<OpportunityRegion[]>
}
