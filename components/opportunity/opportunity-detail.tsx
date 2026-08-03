"use client"

import Link from "next/link"
import { Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeadlineBadge } from "@/components/opportunity/deadline-badge"
import { SupportAmountBadge } from "@/components/opportunity/support-amount-badge"
import { OpportunityDto } from "@/types/opportunity"

type OpportunityDetailProps = {
  opportunity: OpportunityDto
  isSaved?: boolean
  onToggleSave?: (opportunity: OpportunityDto) => void
  saveDisabledMessage?: string
}

type DisplayRow = {
  key: string
  label: string
  value: string
}

const INSIGHT_LABELS: Record<string, string> = {
  sectors: "업종",
  revenueMinWon: "최소 매출",
  revenueMaxWon: "최대 매출",
  employeeMax: "직원 수 상한",
  companyAgeMinYears: "최소 업력",
  companyAgeMaxYears: "최대 업력",
  exportRequired: "수출 요건",
  startupFriendly: "창업기업 적합",
  looseRevenue: "매출 조건 완화",
  stageTags: "성장 단계",
  extractMethod: "분석 방식",
  rawEligibility: "자격 원문",
}

const TYPE_LABELS: Record<string, string> = {
  funding: "자금지원",
  grant: "보조금",
  loan: "융자",
  voucher: "바우처",
  consulting: "컨설팅",
  education: "교육",
  export: "수출지원",
  rnd: "R&D",
  marketing: "마케팅",
}

const AGENCY_LABELS: Record<string, string> = {
  public: "공공기관",
  private: "민간",
  local: "지자체",
  central: "중앙부처",
  ministry: "중앙부처",
}

const HIDDEN_INSIGHT_KEYS = new Set(["extractMethod", "rawEligibility"])

function isEmptyValue(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === "string") return value.trim() === ""
  if (typeof value === "boolean") return false
  if (typeof value === "number") return !Number.isFinite(value)
  if (Array.isArray(value)) {
    return value.length === 0 || value.every((item) => isEmptyValue(item))
  }
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).every((item) => isEmptyValue(item))
  }
  return false
}

function formatWon(value: number): string {
  if (value >= 100_000_000) {
    const eok = value / 100_000_000
    return `${Number.isInteger(eok) ? eok : eok.toFixed(1)}억원`
  }
  if (value >= 10_000) {
    const man = value / 10_000
    return `${Number.isInteger(man) ? man : man.toFixed(1)}만원`
  }
  return `${value.toLocaleString("ko-KR")}원`
}

function formatSector(value: string): string {
  const map: Record<string, string> = {
    other: "기타",
    ai: "AI",
    manufacturing: "제조",
    service: "서비스",
    retail: "유통/소매",
    bio: "바이오",
    ict: "ICT",
    export: "수출",
  }
  return map[value.toLowerCase()] ?? value
}

function formatDisplayValue(key: string, value: unknown): string | null {
  if (isEmptyValue(value)) return null

  if (typeof value === "boolean") {
    return value ? "예" : "아니오"
  }

  if (typeof value === "number") {
    if (key.toLowerCase().includes("revenue") || key.toLowerCase().endsWith("won")) {
      return formatWon(value)
    }
    if (key.toLowerCase().includes("employee")) {
      return `${value.toLocaleString("ko-KR")}명`
    }
    if (key.toLowerCase().includes("age") || key.toLowerCase().includes("year")) {
      return `${value}년`
    }
    return value.toLocaleString("ko-KR")
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => {
        if (typeof item === "string") {
          return key === "sectors" ? formatSector(item) : item
        }
        if (typeof item === "number" || typeof item === "boolean") return String(item)
        return null
      })
      .filter((item): item is string => Boolean(item && item.trim()))

    // "other"만 있는 업종은 사용자에게 의미가 거의 없으므로 숨김
    if (key === "sectors" && items.length === 1 && items[0] === "기타") {
      return null
    }
    return items.length > 0 ? items.join(", ") : null
  }

  if (typeof value === "string") {
    if (key === "sectors") return formatSector(value)
    return value.trim() || null
  }

  if (typeof value === "object") {
    const nested = toDisplayRows(value as Record<string, unknown>)
    if (nested.length === 0) return null
    return nested.map((row) => `${row.label}: ${row.value}`).join(" / ")
  }

  return null
}

function toDisplayRows(record: Record<string, unknown>): DisplayRow[] {
  return Object.entries(record)
    .filter(([key]) => !HIDDEN_INSIGHT_KEYS.has(key))
    .map(([key, entry]) => {
      const value = formatDisplayValue(key, entry)
      if (!value) return null
      return {
        key,
        label: INSIGHT_LABELS[key] ?? key,
        value,
      }
    })
    .filter((row): row is DisplayRow => row !== null)
}

function renderRichContent(value?: string | Record<string, unknown>) {
  if (!value) return null

  if (typeof value === "string") {
    const trimmed = value.trim()
    if (!trimmed) return null
    return <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{trimmed}</p>
  }

  const rows = toDisplayRows(value)
  if (rows.length === 0) return null

  return (
    <dl className="space-y-2 text-sm text-muted-foreground">
      {rows.map((row) => (
        <div key={row.key} className="rounded-lg border bg-muted/20 px-3 py-2">
          <dt className="font-medium text-foreground">{row.label}</dt>
          <dd className="mt-1 whitespace-pre-wrap">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function mapTypeLabel(value?: string) {
  if (!value) return null
  return TYPE_LABELS[value.toLowerCase()] ?? value
}

function mapAgencyLabel(value?: string) {
  if (!value) return null
  return AGENCY_LABELS[value.toLowerCase()] ?? value
}

function buildFallbackSummary(opportunity: OpportunityDto) {
  const org = opportunity.organization?.trim()
  if (org) {
    return `${org}에서 공고한 지원사업입니다. 자세한 내용은 원문 공고에서 확인해 주세요.`
  }
  return "자세한 내용은 원문 공고에서 확인해 주세요."
}

export function OpportunityDetail({
  opportunity,
  isSaved = false,
  onToggleSave,
  saveDisabledMessage,
}: OpportunityDetailProps) {
  const enrichment = opportunity.enrichment
  const documents = enrichment?.documents ?? []
  const textSources = enrichment?.textSources ?? []
  const suggestedServices = enrichment?.suggestedServices ?? []
  const typeLabel = mapTypeLabel(enrichment?.type)
  const agencyLabel = mapAgencyLabel(enrichment?.agencyType)
  const budgetText = (enrichment?.budgetText || opportunity.supportAmount || "").trim()
  const shortSummary = enrichment?.shortSummary?.trim()
  const summary = opportunity.summary?.trim()
  const eligibilityContent = renderRichContent(enrichment?.eligibilityDetail)
  const intelligenceContent = renderRichContent(enrichment?.intelligence)
  const insightContent = renderRichContent(enrichment?.insight)

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{opportunity.category}</Badge>
          <Badge variant="secondary">{opportunity.region}</Badge>
          {typeLabel ? <Badge variant="outline">{typeLabel}</Badge> : null}
          {agencyLabel ? <Badge variant="outline">{agencyLabel}</Badge> : null}
          <DeadlineBadge deadline={opportunity.deadline} />
          {budgetText ? <SupportAmountBadge supportAmount={budgetText} /> : null}
          {typeof enrichment?.relevanceScore === "number" ? (
            <Badge variant="secondary">관련도 {Math.round(enrichment.relevanceScore)}</Badge>
          ) : null}
        </div>
        <CardTitle className="text-2xl leading-snug md:text-3xl">
          {opportunity.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {shortSummary ? (
          <section className="rounded-xl border bg-muted/20 p-4">
            <p className="text-sm font-semibold">핵심 요약</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{shortSummary}</p>
          </section>
        ) : null}

        <p className="text-sm leading-7 text-muted-foreground">
          {summary || buildFallbackSummary(opportunity)}
        </p>

        {eligibilityContent ? (
          <section>
            <p className="text-sm font-semibold">지원 자격 / 요건 분석</p>
            <div className="mt-2">{eligibilityContent}</div>
          </section>
        ) : null}

        {intelligenceContent ? (
          <section>
            <p className="text-sm font-semibold">공고 인텔리전스</p>
            <div className="mt-2">{intelligenceContent}</div>
          </section>
        ) : null}

        {insightContent ? (
          <section>
            <p className="text-sm font-semibold">인사이트</p>
            <div className="mt-2">{insightContent}</div>
          </section>
        ) : null}

        {suggestedServices.length > 0 ? (
          <section>
            <p className="text-sm font-semibold">추천 서비스 영역</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestedServices.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
          </section>
        ) : null}

        <div>
          <p className="text-sm font-semibold">첨부 자료</p>
          {opportunity.attachments.length > 0 ? (
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {opportunity.attachments.map((attachment) => (
                <li key={attachment.url}>
                  <Link
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground hover:underline"
                  >
                    {attachment.label} ({attachment.fileType})
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">첨부 자료가 없습니다.</p>
          )}
        </div>

        {documents.length > 0 ? (
          <section>
            <p className="text-sm font-semibold">문서 / OCR</p>
            <ul className="mt-2 space-y-3">
              {documents.map((document, index) => (
                <li
                  key={`${document.id ?? document.label}-${index}`}
                  className="rounded-xl border bg-muted/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{document.label}</p>
                    {document.url ? (
                      <Link
                        href={document.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        원문 열기
                      </Link>
                    ) : null}
                  </div>
                  {document.fileType ? (
                    <p className="mt-1 text-xs text-muted-foreground">{document.fileType}</p>
                  ) : null}
                  {document.ocrText ? (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-semibold text-primary">
                        OCR 텍스트 보기
                      </summary>
                      <p className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-6 text-muted-foreground">
                        {document.ocrText}
                      </p>
                    </details>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {textSources.length > 0 ? (
          <section>
            <p className="text-sm font-semibold">텍스트 소스</p>
            <ul className="mt-2 space-y-3">
              {textSources.map((source, index) => (
                <li key={`${source.label}-${index}`} className="rounded-xl border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{source.label}</p>
                    {source.url ? (
                      <Link
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        소스 열기
                      </Link>
                    ) : null}
                  </div>
                  {source.text ? (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-semibold text-primary">
                        내용 보기
                      </summary>
                      <p className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-6 text-muted-foreground">
                        {source.text}
                      </p>
                    </details>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div>
          <p className="text-sm font-semibold">태그</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {opportunity.tags.length > 0 ? (
              opportunity.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">태그가 없습니다.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {opportunity.url ? (
            <Button asChild>
              <Link href={opportunity.url} target="_blank" rel="noreferrer">
                원문 공고 열기
              </Link>
            </Button>
          ) : null}
          {onToggleSave ? (
            <Button variant="outline" onClick={() => onToggleSave(opportunity)}>
              <Bookmark className="h-4 w-4" />
              {isSaved ? "저장 해제" : "공고 저장"}
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <Link href="/grants">목록으로 돌아가기</Link>
          </Button>
        </div>
        {saveDisabledMessage ? (
          <p className="text-xs text-muted-foreground">{saveDisabledMessage}</p>
        ) : null}
      </CardContent>
    </Card>
  )
}
