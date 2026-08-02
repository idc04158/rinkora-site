import {
  OpportunityCategory,
  OpportunityDocument,
  OpportunityDto,
  OpportunityEnrichment,
} from "@/types/opportunity"

export const catalogApiEndpoints = {
  listOpportunities: "GET /catalog/opportunities",
  getOpportunityById: "GET /catalog/opportunities/:id",
  getOpportunityEnrichment: "GET /catalog/opportunities/:id/enrichment",
  getOpportunityDocuments: "GET /catalog/opportunities/:id/documents",
  listCategories: "GET /catalog/categories",
  listOrganizations: "GET /catalog/organizations",
} as const

export type GetCatalogOpportunitiesResponse = {
  items: OpportunityDto[]
  total: number
}

export type GetCatalogOpportunityByIdResponse = OpportunityDto

export type GetCatalogOpportunityEnrichmentResponse = {
  item: OpportunityEnrichment | null
}

export type GetCatalogOpportunityDocumentsResponse = {
  items: OpportunityDocument[]
  total: number
}

export type GetCatalogCategoriesResponse = {
  categories: OpportunityCategory[]
}

export type GetCatalogOrganizationsResponse = {
  organizations: string[]
}
