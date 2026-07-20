import { OpportunityCard } from "@/components/opportunity/opportunity-card"
import { OpportunityDto } from "@/types/opportunity"

type OpportunityListProps = {
  opportunities: OpportunityDto[]
  savedIds?: string[]
  onToggleSave?: (opportunity: OpportunityDto) => void
  saveDisabledMessage?: string
}

export function OpportunityList({
  opportunities,
  savedIds = [],
  onToggleSave,
  saveDisabledMessage,
}: OpportunityListProps) {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isSaved={savedIds.includes(opportunity.id)}
          onToggleSave={onToggleSave}
          saveDisabledMessage={saveDisabledMessage}
        />
      ))}
    </section>
  )
}
