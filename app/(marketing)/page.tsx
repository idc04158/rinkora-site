import { GrowthHero } from "@/components/home-v2/growth-hero"
import { SearchDemoSection } from "@/components/home-v2/search-demo-section"
import { AiRecommendationSection } from "@/components/home-v2/ai-recommendation-section"
import { LatestGrantsSection } from "@/components/home-v2/latest-grants-section"
import { FreeSearchCta } from "@/components/home-v2/free-search-cta"

export default function HomePage() {
  return (
    <>
      <GrowthHero />
      <SearchDemoSection />
      <AiRecommendationSection />
      <LatestGrantsSection />
      <FreeSearchCta />
    </>
  )
}
