import { Badge } from "@/components/ui/badge"

type SupportAmountBadgeProps = {
  supportAmount: string
}

export function SupportAmountBadge({ supportAmount }: SupportAmountBadgeProps) {
  const value = supportAmount.trim()
  if (!value) return null

  return (
    <Badge variant="outline" className="border-primary/30 text-primary">
      지원금 {value}
    </Badge>
  )
}
