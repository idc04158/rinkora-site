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

function renderRichText(value?: string | Record<string, unknown>) {
  if (!value) return null
  if (typeof value === "string") {
    return <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{value}</p>
  }

  return (
    <dl className="space-y-2 text-sm text-muted-foreground">
      {Object.entries(value).map(([key, entry]) => (
        <div key={key} className="rounded-lg border bg-muted/20 px-3 py-2">
          <dt className="font-medium text-foreground">{key}</dt>
          <dd className="mt-1 whitespace-pre-wrap">
            {typeof entry === "string" || typeof entry === "number"
              ? String(entry)
              : JSON.stringify(entry, null, 2)}
          </dd>
        </div>
      ))}
    </dl>
  )
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

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{opportunity.category}</Badge>
          <Badge variant="secondary">{opportunity.region}</Badge>
          {enrichment?.type ? <Badge variant="outline">{enrichment.type}</Badge> : null}
          {enrichment?.agencyType ? (
            <Badge variant="outline">{enrichment.agencyType}</Badge>
          ) : null}
          <DeadlineBadge deadline={opportunity.deadline} />
          <SupportAmountBadge
            supportAmount={enrichment?.budgetText || opportunity.supportAmount}
          />
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
        {enrichment?.shortSummary ? (
          <section className="rounded-xl border bg-muted/20 p-4">
            <p className="text-sm font-semibold">핵심 요약</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {enrichment.shortSummary}
            </p>
          </section>
        ) : null}

        <p className="text-sm leading-7 text-muted-foreground">
          {opportunity.summary || "상세 요약 정보가 아직 제공되지 않았습니다."}
        </p>

        {enrichment?.eligibilityDetail ? (
          <section>
            <p className="text-sm font-semibold">지원 자격 / 요건 분석</p>
            <div className="mt-2">{renderRichText(enrichment.eligibilityDetail)}</div>
          </section>
        ) : null}

        {enrichment?.intelligence ? (
          <section>
            <p className="text-sm font-semibold">공고 인텔리전스</p>
            <div className="mt-2">{renderRichText(enrichment.intelligence)}</div>
          </section>
        ) : null}

        {enrichment?.insight ? (
          <section>
            <p className="text-sm font-semibold">인사이트</p>
            <div className="mt-2">{renderRichText(enrichment.insight)}</div>
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
