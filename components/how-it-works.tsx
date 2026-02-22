"use client"

export function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-24 px-6 py-24 md:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary">
            Process
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            3단계로 설계되는 일본 수출
          </h2>
          <p className="mt-4 text-muted-foreground">
            전략 → 매칭 → 실행까지, 실행 중심의 구조화된 로드맵
          </p>
        </div>

        {/* ROADMAP BAR */}
        <div className="mb-20 flex items-center justify-center gap-6 text-sm font-semibold">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs">
              01
            </span>
            <div className="h-px w-16 bg-primary" />
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">
              02
            </span>
            <div className="h-px w-16 bg-muted-foreground/30" />
          </div>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">
            03
          </span>
        </div>

        <div className="space-y-24">

          {/* STEP 1 */}
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">

            <div className="rounded-2xl border bg-white p-8 shadow-sm min-h-[360px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">01</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    1–2주
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  브랜드 진단
                </h3>

                <p className="mt-3 text-muted-foreground">
                  브랜드의 현재 상태와 일본 시장 진출 목표를 분석하고
                  실행 전략을 정의합니다.
                </p>

                <div className="mt-6 rounded-lg bg-muted px-4 py-3 text-sm">
                  ✔ 일본 진출 전략 방향 수립
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <p className="text-sm font-semibold text-primary">
                  이 단계 산출물
                </p>
                <p className="text-sm text-muted-foreground">
                  일본 시장 진출 전략 리포트
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm min-h-[360px]">
              <img
                src="/deliverable-1.png"
                alt="전략 리포트"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* STEP 2 */}
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">

            <div className="rounded-2xl overflow-hidden shadow-sm min-h-[360px] order-1 lg:order-2">
              <img
                src="/deliverable-2.png"
                alt="매칭 리스트"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm min-h-[360px] flex flex-col justify-between order-2 lg:order-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">02</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    2–4주
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  적합한 서비스 기업 매칭
                </h3>

                <p className="mt-3 text-muted-foreground">
                  브랜드에 가장 적합한 실행 파트너를 선정하고
                  실행 구조를 설계합니다.
                </p>

                <div className="mt-6 rounded-lg bg-muted px-4 py-3 text-sm">
                  ✔ 실행 파트너 확정
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <p className="text-sm font-semibold text-primary">
                  이 단계 산출물
                </p>
                <p className="text-sm text-muted-foreground">
                  실행 파트너 매칭 리스트
                </p>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">

            <div className="rounded-2xl border bg-white p-8 shadow-sm min-h-[360px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">03</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    3개월~
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  공동 실행
                </h3>

                <p className="mt-3 text-muted-foreground">
                  브랜드와 파트너가 함께 전략을 실행하며
                  실제 매출 발생과 시장 안착을 만듭니다.
                </p>

                <div className="mt-6 rounded-lg bg-muted px-4 py-3 text-sm">
                  ✔ 실제 매출 발생 및 시장 안착
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <p className="text-sm font-semibold text-primary">
                  이 단계 산출물
                </p>
                <p className="text-sm text-muted-foreground">
                  3개월 실행 로드맵
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm min-h-[360px]">
              <img
                src="/deliverable-3.png"
                alt="로드맵"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}