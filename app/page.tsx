import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AiSummarySection } from "@/components/ai-summary-section"
import { NewsFeedSection } from "@/components/news-feed-section"
import { WebinarHighlightSection } from "@/components/webinar-highlight-section"
import { ServiceLeads } from "@/components/service-leads"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorks } from "@/components/how-it-works"
import { NetworkSection } from "@/components/network-section"
import { InsightSection } from "@/components/insight-section"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="bg-background text-foreground">

      {/* Navigation */}
      <Navbar />

      {/* 1️⃣ Hero */}
      <Hero />

      {/* 2️⃣ AI 한 줄 요약 (차별화 포인트) */}
      <AiSummarySection />

      {/* 3️⃣ 실시간 기사 큐레이션 */}
      <NewsFeedSection />

      {/* 4️⃣ 웨비나 하이라이트 (강점 강조) */}
      <WebinarHighlightSection />

      {/* 5️⃣ 분야별 바로 탐색 (행동 유도) */}
      <ServiceLeads />

      {/* 6️⃣ 문제 공감 */}
      <ProblemSection />

      {/* 7️⃣ 진행 방식 */}
      <HowItWorks />

      {/* 8️⃣ 실행 네트워크 */}
      <NetworkSection />

      {/* 9️⃣ 자체 인사이트 */}
      <InsightSection />

      {/* 🔟 최종 진단 CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />

    </main>
  )
}