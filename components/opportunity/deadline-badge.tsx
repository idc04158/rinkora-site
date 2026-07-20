import { Badge } from "@/components/ui/badge"

type DeadlineBadgeProps = {
  deadline: string
}

function getDaysLeft(deadline: string) {
  const now = new Date()
  const target = new Date(deadline)
  const diffMs = target.getTime() - now.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

export function DeadlineBadge({ deadline }: DeadlineBadgeProps) {
  const daysLeft = getDaysLeft(deadline)

  if (Number.isNaN(daysLeft)) {
    return <Badge variant="outline">마감일 확인 필요</Badge>
  }

  if (daysLeft < 0) {
    return <Badge variant="destructive">마감</Badge>
  }

  if (daysLeft <= 3) {
    return <Badge variant="destructive">D-{daysLeft}</Badge>
  }

  return <Badge variant="secondary">D-{daysLeft}</Badge>
}
