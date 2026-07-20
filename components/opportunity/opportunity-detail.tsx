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

export function OpportunityDetail({
  opportunity,
  isSaved = false,
  onToggleSave,
  saveDisabledMessage,
}: OpportunityDetailProps) {
  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{opportunity.category}</Badge>
          <Badge variant="secondary">{opportunity.region}</Badge>
          <DeadlineBadge deadline={opportunity.deadline} />
          <SupportAmountBadge supportAmount={opportunity.supportAmount} />
        </div>
        <CardTitle className="text-2xl leading-snug md:text-3xl">
          {opportunity.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{opportunity.organization}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm leading-7 text-muted-foreground">{opportunity.summary}</p>

        <div>
          <p className="text-sm font-semibold">첨부 자료</p>
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
        </div>

        <div>
          <p className="text-sm font-semibold">태그</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {opportunity.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={opportunity.url} target="_blank" rel="noreferrer">
              원문 공고 열기
            </Link>
          </Button>
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
