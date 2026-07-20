import {
  OpportunityAttachment,
  OpportunityCategory,
  OpportunityDto,
  OpportunityRegion,
  OpportunitySearchParams,
  OpportunitySort,
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

function toStringValue(value: unknown, fallback = "") {
  if (typeof value === "string") return value
  if (typeof value === "number") return String(value)
  return fallback
}

function toCategory(value: unknown): OpportunityCategory {
  const raw = toStringValue(value).toUpperCase()
  return CATEGORY_SET.includes(raw as OpportunityCategory)
    ? (raw as OpportunityCategory)
    : "MARKETING"
}

function toRegion(value: unknown): OpportunityRegion {
  const raw = toStringValue(value)
  return REGION_SET.includes(raw as OpportunityRegion)
    ? (raw as OpportunityRegion)
    : "전국"
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
    label: toStringValue(source.label ?? source.name ?? "첨부자료"),
    fileType,
    url,
  }
}

function mapToOpportunityDto(item: unknown): OpportunityDto {
  const source = (item ?? {}) as Record<string, unknown>
  const attachmentsRaw = Array.isArray(source.attachments) ? source.attachments : []

  return {
    id: toStringValue(source.id),
    title: toStringValue(source.title),
    organization: toStringValue(source.organization ?? source.orgName ?? source.provider),
    summary: toStringValue(source.summary ?? source.description),
    deadline: toStringValue(source.deadline ?? source.endDate),
    category: toCategory(source.category),
    supportAmount: toStringValue(source.supportAmount ?? source.budget ?? source.amount),
    region: toRegion(source.region),
    tags: Array.isArray(source.tags)
      ? source.tags.map((tag) => toStringValue(tag)).filter(Boolean)
      : [],
    attachments: attachmentsRaw
      .map((attachment) => toAttachment(attachment))
      .filter((attachment): attachment is OpportunityAttachment => attachment !== null),
    url: toStringValue(source.url ?? source.link),
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
    throw new CatalogProxyError("COUNTSELF_API_BASE_URL is not configured.", 500)
  }
  if (!apiKey) {
    throw new CatalogProxyError("COUNTSELF_API_KEY is not configured.", 500)
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
      const body = (await response.json().catch(() => ({}))) as { message?: string }
      throw new CatalogProxyError(
        body.message ?? `CountSelf request failed with status ${response.status}`,
        response.status
      )
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof CatalogProxyError) throw error
    if (error instanceof Error && error.name === "AbortError") {
      throw new CatalogProxyError("CountSelf request timeout", 504)
    }
    throw new CatalogProxyError("CountSelf network error", 502)
  } finally {
    clearTimeout(timeout)
  }
}

export async function listCatalogOpportunities(params: OpportunitySearchParams & { page?: number; pageSize?: number }) {
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

export async function getCatalogOpportunityById(id: string) {
  const provider = process.env.CATALOG_PROVIDER ?? "mock"

  if (provider === "mock") {
    const repository = getOpportunityRepository("mock")
    const item = await repository.getOpportunityById(id)
    return { item }
  }

  const response = await requestCountSelf<CatalogDetailResponse>(
    `/catalog/opportunities/${encodeURIComponent(id)}`
  )

  return { item: response.item ? mapToOpportunityDto(response.item) : null }
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
