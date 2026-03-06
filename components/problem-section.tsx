export function ProblemSection() {
  return (
    <section className="px-6 py-24 bg-[#f5f9ff]">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary">
            현황 점검
          </p>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-snug">
            일본 수출, 자료는 충분하지만 판단은 쉽지 않습니다
          </h2>

          <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed">
            입점 가이드, 정부 지원사업, 바우처 안내까지
            이미 많은 정보를 검토하셨을 겁니다.
            <br className="hidden sm:block" />
            다만 우리 브랜드 상황에 맞게 정리하는 과정은 또 다른 문제입니다.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-xl bg-white p-8 border border-blue-100 shadow-sm">
            <h3 className="text-base font-semibold text-primary">
              채널 선택과 실행 순서
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              아마존, 라쿠텐, Qoo10.
              어디에 먼저 집중해야 할지 기준이 필요합니다.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 border border-blue-100 shadow-sm">
            <h3 className="text-base font-semibold text-primary">
              비용 집행의 기준
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              광고, 물류, 운영 비용.
              예산 배분에 대한 명확한 판단 근거가 필요합니다.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 border border-blue-100 shadow-sm">
            <h3 className="text-base font-semibold text-primary">
              정부 지원 활용 방식
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              바우처를 받는 것과
              성과로 연결하는 것은 다른 문제입니다.
            </p>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-20 max-w-3xl">
          <p className="text-base md:text-lg font-medium">
            그래서 먼저 현재 상황을 점검하고,
            필요한 영역을 차분히 정리하는 과정이 필요합니다.
          </p>
        </div>

      </div>
    </section>
  )
}