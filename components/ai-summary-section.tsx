export function AiSummarySection() {
  return (
    <section className="px-6 py-24 bg-gradient-to-b from-white to-[#f6f9ff]">
      <div className="mx-auto max-w-6xl text-center">

        {/* Header */}
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-primary tracking-wide">
            MARKET BRIEF
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-snug">
            일본 이커머스 데이터 브리핑
          </h2>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            주요 플랫폼, 정책, 물류, 소비 트렌드를 정기적으로 분석합니다.
            감이 아니라 데이터 기반으로 시장을 살펴봅니다.
          </p>
        </div>

        {/* Centered Card */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl rounded-3xl bg-white p-12 border border-blue-200 shadow-sm">

            {/* Left Accent */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-primary rounded-l-3xl" />

            <p className="text-xs text-muted-foreground uppercase tracking-wider text-left">
              플랫폼 정책 · 2026.02.26 업데이트
            </p>

            <h3 className="mt-6 text-2xl font-semibold leading-relaxed text-left">
              일본 소비세 인상 이슈는 단기 영향은 제한적이나,
              플랫폼 정책 변화는 중장기 모니터링이 필요합니다.
            </h3>

            <p className="mt-8 text-base text-muted-foreground leading-relaxed text-left">
              최근 발표된 일본 EC 시장 데이터와 플랫폼 정책 변화를 종합하면,
              크로스보더 셀러에게 직접적인 매출 충격은 제한적입니다.
              다만 광고 노출 로직과 수수료 구조 변동 가능성은 지속 확인이 필요합니다.
            </p>

            <div className="mt-10 pt-6 border-t text-sm text-muted-foreground text-left">
              데이터 출처: 일본 경제산업성 · 라쿠텐 IR 리포트 · Amazon Japan 정책 공지
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}