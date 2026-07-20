import { OpportunityCategory, OpportunityDto } from "@/types/opportunity"

export const catalogApiEndpoints = {
  listOpportunities: "GET /catalog/opportunities",
  getOpportunityById: "GET /catalog/opportunities/:id",
  listCategories: "GET /catalog/categories",
  listOrganizations: "GET /catalog/organizations",
} as const

export type GetCatalogOpportunitiesResponse = {
  items: OpportunityDto[]
  total: number
}

export type GetCatalogOpportunityByIdResponse = OpportunityDto

export type GetCatalogCategoriesResponse = {
  categories: OpportunityCategory[]
}

export type GetCatalogOrganizationsResponse = {
  organizations: string[]
}
