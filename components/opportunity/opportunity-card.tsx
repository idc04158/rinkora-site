import Link from "next/link"
import { Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeadlineBadge } from "@/components/opportunity/deadline-badge"
import { SupportAmountBadge } from "@/components/opportunity/support-amount-badge"
import { OpportunityDto } from "@/types/opportunity"

type OpportunityCardProps = {
  opportunity: OpportunityDto
  isSaved?: boolean
  onToggleSave?: (opportunity: OpportunityDto) => void
  saveDisabledMessage?: string
}

export function OpportunityCard({
  opportunity,
  isSaved = false,
  onToggleSave,
  saveDisabledMessage,
}: OpportunityCardProps) {
  return (
    <Link href={`/grants/${opportunity.id}`} className="block">
      <Card className="h-full hover:shadow-lg focus-within:shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline">{opportunity.category}</Badge>
            <DeadlineBadge deadline={opportunity.deadline} />
          </div>
          <CardTitle className="text-lg leading-snug">{opportunity.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {opportunity.enrichment?.shortSummary || opportunity.summary || "상세 요약을 확인해보세요."}
          </p>
          <div className="flex flex-wrap gap-2">
            <SupportAmountBadge
              supportAmount={
                opportunity.enrichment?.budgetText || opportunity.supportAmount
              }
            />
            <Badge variant="secondary">{opportunity.region}</Badge>
            {typeof opportunity.enrichment?.relevanceScore === "number" ? (
              <Badge variant="outline">
                관련도 {Math.round(opportunity.enrichment.relevanceScore)}
              </Badge>
            ) : null}
            {opportunity.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex text-sm font-semibold text-primary opacity-90">
              상세 보기
            </span>
            {onToggleSave ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onToggleSave(opportunity)
                }}
                className="h-8"
              >
                <Bookmark className="h-3.5 w-3.5" />
                {isSaved ? "저장 해제" : "저장"}
              </Button>
            ) : null}
          </div>
          {saveDisabledMessage ? (
            <p className="text-xs text-muted-foreground">{saveDisabledMessage}</p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  )
}
