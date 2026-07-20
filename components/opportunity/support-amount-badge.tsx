import { Badge } from "@/components/ui/badge"

type SupportAmountBadgeProps = {
  supportAmount: string
}

export function SupportAmountBadge({ supportAmount }: SupportAmountBadgeProps) {
  return (
    <Badge variant="outline" className="border-primary/30 text-primary">
      지원금 {supportAmount}
    </Badge>
  )
}
