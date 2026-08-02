import {
  OpportunityAttachment,
  OpportunityCategory,
  OpportunityDocument,
  OpportunityDto,
  OpportunityEnrichment,
  OpportunityRegion,
  OpportunitySearchParams,
  OpportunitySort,
  OpportunityTextSource,
} from "@/types/opportunity"
import { getOpportunityRepository } from "@/services/opportunity"

const REQUEST_TIMEOUT_MS = 8000

const CATEGORY_SET: OpportunityCategory[] = [
  "AI",
  "RND",
  "EXPORT",
  "DATA",
  "MANUFACTURING",
  "MARKETING",
]

const REGION_SET: OpportunityRegion[] = [
  "전국",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "대전",
]

type CatalogListResponse = {
  items: unknown[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
}

type CatalogDetailResponse = {
  item: unknown | null
}

type CatalogItemsResponse = {
  items: unknown[]
  total: number
}

export class CatalogProxyError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

function toPublicCatalogError(status: number, fallback: string) {
  if (status === 401) return "인증에 실패했습니다. 잠시 후 다시 시도해주세요."
  if (status === 404) return "요청한 지원사업 정보를 찾을 수 없습니다."
  if (status === 504) return "지원사업 정보 요청 시간이 초과되었습니다."
  if (status >= 500) return "지원사업 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
  return fallback
}

function toStringValue(value: unknown, fallback = "") {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return fallback
}

function toNumberValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return undefined
}

function toCategory(value: unknown): OpportunityCategory {
  const raw = toStringValue(value).toUpperCase()
  return CATEGORY_SET.includes(raw as OpportunityCategory)
    ? (raw as OpportunityCategory)
    : "MARKETING"
}

function toRegion(value: unknown): OpportunityRegion {
  const raw = toStringValue(value)
  return REGION_SET.includes(raw as OpportunityRegion) ? (raw as OpportunityRegion) : "전국"
}

function toAttachment(item: unknown): OpportunityAttachment | null {
  if (!item || typeof item !== "object") return null
  const source = item as Record<string, unknown>
  const url = toStringValue(source.url ?? source.link)
  if (!url) return null
  const fileTypeRaw = toStringValue(source.fileType ?? source.type ?? "link")
  const fileType: OpportunityAttachment["fileType"] = (
    ["pdf", "hwp", "docx", "link"].includes(fileTypeRaw) ? fileTypeRaw : "link"
  ) as OpportunityAttachment["fileType"]
  return {
    label: toStringValue(source.label ?? source.name ?? "첨부 자료"),
    fileType,
    url,
  }
}

function toTextOrRecord(value: unknown): string | Record<string, unknown> | undefined {
  if (typeof value === "string" && value.trim()) return value
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return undefined
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => toStringValue(item)).filter(Boolean)
}

function toDocument(item: unknown): OpportunityDocument | null {
  if (!item || typeof item !== "object") return null
  const source = item as Record<string, unknown>
  const label = toStringValue(source.label ?? source.name ?? source.title ?? "문서")
  const url = toStringValue(source.url ?? source.link) || undefined
  const ocrText = toStringValue(
    source.ocrText ?? source.text ?? source.content ?? source.extractedText,
  )
  if (!label && !url && !ocrText) return null
  return {
    id: toStringValue(source.id) || undefined,
    label: label || "문서",
    url,
    fileType: toStringValue(source.fileType ?? source.type) || undefined,
    ocrText: ocrText || undefined,
  }
}

function toTextSource(item: unknown): OpportunityTextSource | null {
  if (!item || typeof item !== "object") return null
  const source = item as Record<string, unknown>
  const label = toStringValue(source.label ?? source.name ?? source.title ?? "텍스트 소스")
  const text = toStringValue(source.text ?? source.content ?? source.ocrText)
  const url = toStringValue(source.url ?? source.link) || undefined
  if (!label && !text && !url) return null
  return {
    label: label || "텍스트 소스",
    url,
    text: text || undefined,
  }
}

function mapToEnrichment(item: unknown): OpportunityEnrichment {
  const source = (item ?? {}) as Record<string, unknown>
  const nested =
    source.enrichment && typeof source.enrichment === "object"
      ? (source.enrichment as Record<string, unknown>)
      : source
  const lake =
    nested.lake && typeof nested.lake === "object"
      ? (nested.lake as Record<string, unknown>)
      : {}

  const documentsRaw = Array.isArray(nested.documents)
    ? nested.documents
    : Array.isArray(source.documents)
      ? source.documents
      : []
  const textSourcesRaw = Array.isArray(nested.textSources)
    ? nested.textSources
    : Array.isArray(source.textSources)
      ? source.textSources
      : []

  return {
    eligibilityDetail: toTextOrRecord(
      nested.eligibilityDetail ?? nested.eligibility ?? source.eligibilityDetail,
    ),
    intelligence: toTextOrRecord(nested.intelligence ?? source.intelligence),
    insight: toTextOrRecord(nested.insight ?? source.insight),
    type: toStringValue(nested.type ?? source.type) || undefined,
    budgetText:
      toStringValue(nested.budgetText ?? nested.budget ?? source.budgetText) || undefined,
    agencyType: toStringValue(nested.agencyType ?? source.agencyType) || undefined,
    suggestedServices: toStringArray(nested.suggestedServices ?? source.suggestedServices),
    shortSummary:
      toStringValue(
        nested.shortSummary ?? lake.shortSummary ?? source.shortSummary,
      ) || undefined,
    relevanceScore: toNumberValue(
      nested.relevanceScore ?? lake.relevanceScore ?? source.relevanceScore,
    ),
    documents: documentsRaw
      .map((document) => toDocument(document))
      .filter((document): document is OpportunityDocument => document !== null),
    textSources: textSourcesRaw
      .map((textSource) => toTextSource(textSource))
      .filter((textSource): textSource is OpportunityTextSource => textSource !== null),
  }
}

function mapToOpportunityDto(item: unknown, enrichment?: OpportunityEnrichment): OpportunityDto {
  const source = (item ?? {}) as Record<string, unknown>
  const attachmentsRaw = Array.isArray(source.attachments) ? source.attachments : []
  const mappedEnrichment = enrichment ?? mapToEnrichment(source)
  const hasEnrichment = Boolean(
    mappedEnrichment.eligibilityDetail ||
      mappedEnrichment.intelligence ||
      mappedEnrichment.insight ||
      mappedEnrichment.type ||
      mappedEnrichment.budgetText ||
      mappedEnrichment.agencyType ||
      (mappedEnrichment.suggestedServices && mappedEnrichment.suggestedServices.length > 0) ||
      mappedEnrichment.shortSummary ||
      typeof mappedEnrichment.relevanceScore === "number" ||
      (mappedEnrichment.documents && mappedEnrichment.documents.length > 0) ||
      (mappedEnrichment.textSources && mappedEnrichment.textSources.length > 0),
  )

  return {
    id: toStringValue(source.id),
    title: toStringValue(source.title),
    organization: toStringValue(source.organization ?? source.orgName ?? source.provider),
    summary: toStringValue(source.summary ?? source.description ?? mappedEnrichment.shortSummary),
    deadline: toStringValue(source.deadline ?? source.endDate),
    category: toCategory(source.category),
    supportAmount: toStringValue(
      source.supportAmount ?? source.budget ?? source.amount ?? mappedEnrichment.budgetText,
    ),
    region: toRegion(source.region),
    tags: Array.isArray(source.tags)
      ? source.tags.map((tag) => toStringValue(tag)).filter(Boolean)
      : [],
    attachments: attachmentsRaw
      .map((attachment) => toAttachment(attachment))
      .filter((attachment): attachment is OpportunityAttachment => attachment !== null),
    url: toStringValue(source.url ?? source.link),
    enrichment: hasEnrichment ? mappedEnrichment : undefined,
  }
}

function buildMockListMeta(total: number, page: number, pageSize: number) {
  const hasNext = page * pageSize < total
  return { total, page, pageSize, hasNext }
}

async function requestCountSelf<T>(path: string, query?: Record<string, string>) {
  const baseUrl = process.env.COUNTSELF_API_BASE_URL
  const apiKey = process.env.COUNTSELF_API_KEY

  if (!baseUrl) {
    throw new CatalogProxyError(
      toPublicCatalogError(500, "지원사업 정보 설정이 완료되지 않았습니다."),
      500,
    )
  }
  if (!apiKey) {
    throw new CatalogProxyError(
      toPublicCatalogError(500, "지원사업 정보 설정이 완료되지 않았습니다."),
      500,
    )
  }

  const url = new URL(`${baseUrl.replace(/\/+$/, "")}${path}`)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== "") url.searchParams.set(key, value)
    })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new CatalogProxyError(
        toPublicCatalogError(
          response.status,
          "지원사업 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
        ),
        response.status,
      )
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof CatalogProxyError) throw error
    if (error instanceof Error && error.name === "AbortError") {
      throw new CatalogProxyError(toPublicCatalogError(504, "요청 시간이 초과되었습니다."), 504)
    }
    throw new CatalogProxyError(
      toPublicCatalogError(502, "지원사업 정보를 불러오지 못했습니다."),
      502,
    )
  } finally {
    clearTimeout(timeout)
  }
}

export async function listCatalogOpportunities(
  params: OpportunitySearchParams & { page?: number; pageSize?: number },
) {
  const provider = process.env.CATALOG_PROVIDER ?? "mock"

  if (provider === "mock") {
    const repository = getOpportunityRepository("mock")
    const all = await repository.getOpportunities(params)
    const page = params.page && params.page > 0 ? params.page : 1
    const pageSize = params.pageSize && params.pageSize > 0 ? params.pageSize : 20
    const start = (page - 1) * pageSize
    const items = all.slice(start, start + pageSize)
    const meta = buildMockListMeta(all.length, page, pageSize)
    return { items, ...meta }
  }

  const query: Record<string, string> = {}
  if (params.query) query.query = params.query
  if (params.category && params.category !== "ALL") query.category = params.category
  if (params.region && params.region !== "ALL") query.region = params.region
  if (params.sortByDeadline) query.sortByDeadline = params.sortByDeadline
  if (params.page) query.page = String(params.page)
  if (params.pageSize) query.pageSize = String(params.pageSize)

  const response = await requestCountSelf<CatalogListResponse>("/catalog/opportunities", query)
  return {
    items: response.items.map((item) => mapToOpportunityDto(item)),
    total: Number(response.total ?? 0),
    page: Number(response.page ?? 1),
    pageSize: Number(response.pageSize ?? 20),
    hasNext: Boolean(response.hasNext),
  }
}

export async function getCatalogOpportunityEnrichment(id: string) {
  const provider = process.env.CATALOG_PROVIDER ?? "mock"
  if (provider === "mock") {
    return { item: null as OpportunityEnrichment | null }
  }

  const response = await requestCountSelf<unknown>(
    `/catalog/opportunities/${encodeURIComponent(id)}/enrichment`,
  )
  const payload =
    response && typeof response === "object" && "item" in response
      ? (response as { item: unknown }).item
      : response
  return { item: payload ? mapToEnrichment(payload) : null }
}

export async function getCatalogOpportunityDocuments(id: string) {
  const provider = process.env.CATALOG_PROVIDER ?? "mock"
  if (provider === "mock") {
    return { items: [] as OpportunityDocument[], total: 0 }
  }

  const response = await requestCountSelf<unknown>(
    `/catalog/opportunities/${encodeURIComponent(id)}/documents`,
  )
  const itemsRaw =
    response && typeof response === "object" && Array.isArray((response as { items?: unknown[] }).items)
      ? ((response as { items: unknown[] }).items)
      : Array.isArray(response)
        ? response
        : []
  const items = itemsRaw
    .map((item) => toDocument(item))
    .filter((item): item is OpportunityDocument => item !== null)
  return { items, total: items.length }
}

export async function getCatalogOpportunityById(id: string) {
  const provider = process.env.CATALOG_PROVIDER ?? "mock"

  if (provider === "mock") {
    const repository = getOpportunityRepository("mock")
    const item = await repository.getOpportunityById(id)
    return { item }
  }

  const [detailResponse, enrichmentResult, documentsResult] = await Promise.all([
    requestCountSelf<CatalogDetailResponse>(`/catalog/opportunities/${encodeURIComponent(id)}`),
    getCatalogOpportunityEnrichment(id).catch(() => ({ item: null })),
    getCatalogOpportunityDocuments(id).catch(() => ({ items: [], total: 0 })),
  ])

  if (!detailResponse.item) return { item: null }

  const enrichment = enrichmentResult.item ?? mapToEnrichment(detailResponse.item)
  if (documentsResult.items.length > 0) {
    enrichment.documents = documentsResult.items
  }

  return { item: mapToOpportunityDto(detailResponse.item, enrichment) }
}

export async function listCatalogCategories() {
  const provider = process.env.CATALOG_PROVIDER ?? "mock"

  if (provider === "mock") {
    const repository = getOpportunityRepository("mock")
    const categories = await repository.getCategories()
    return { items: categories, total: categories.length }
  }

  const response = await requestCountSelf<CatalogItemsResponse>("/catalog/categories")
  const items = Array.isArray(response.items)
    ? response.items.map((item) => toCategory(item))
    : []
  return { items, total: Number(response.total ?? items.length) }
}

export async function listCatalogOrganizations() {
  const provider = process.env.CATALOG_PROVIDER ?? "mock"

  if (provider === "mock") {
    const repository = getOpportunityRepository("mock")
    const organizations = await repository.getOrganizations()
    return { items: organizations, total: organizations.length }
  }

  const response = await requestCountSelf<CatalogItemsResponse>("/catalog/organizations")
  const items = Array.isArray(response.items)
    ? response.items.map((item) => toStringValue(item)).filter(Boolean)
    : []
  return { items, total: Number(response.total ?? items.length) }
}

export function parseSort(value: string | null): OpportunitySort | undefined {
  if (value === "deadline_asc" || value === "deadline_desc") return value
  return undefined
}
