export function HowItWorks() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary">
            진행 방식
          </p>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold leading-snug">
            점검은 이렇게 진행됩니다
          </h2>

          <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed">
            복잡한 절차 없이, 현재 상황을 기준으로 차분히 정리합니다.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-10 md:grid-cols-3">

          <div>
            <div className="text-primary font-semibold text-lg">
              01
            </div>
            <h3 className="mt-3 font-semibold">
              현재 상황 확인
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              매출 단계, 운영 채널, 예산 집행 현황을 간단히 점검합니다.
            </p>
          </div>

          <div>
            <div className="text-primary font-semibold text-lg">
              02
            </div>
            <h3 className="mt-3 font-semibold">
              우선순위 정리
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              지금 필요한 영역과 이후 준비할 부분을 구분합니다.
            </p>
          </div>

          <div>
            <div className="text-primary font-semibold text-lg">
              03
            </div>
            <h3 className="mt-3 font-semibold">
              실행 네트워크 안내
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              필요한 경우, 해당 분야 경험이 있는 파트너를 안내합니다.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}