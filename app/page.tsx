import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TrustStrip } from "@/components/trust-strip"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorks } from "@/components/how-it-works"
import { NetworkSection } from "@/components/network-section"
import { WhyRinkora } from "@/components/why-rinkora"
import { ServiceLeads } from "@/components/service-leads"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="bg-background text-foreground">

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Trust Metrics + Partner Logos */}
      <TrustStrip />

      {/* Problem Section */}
      <ProblemSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Network Strength */}
      <NetworkSection />

      {/* Why Rinkora */}
      <WhyRinkora />

      {/* 🔥 분야별 직접 상담 (리드 수집 핵심 구간) */}
      <ServiceLeads />

      {/* Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />

    </main>
  )
}