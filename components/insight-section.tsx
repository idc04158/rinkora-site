export function InsightSection() {
  return (
    <section className="px-6 py-24 bg-[#f5f9ff]">
      <div className="mx-auto max-w-6xl">

        <h2 className="text-xl md:text-2xl font-semibold">
          린코라 인사이트
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 border">
            <h3 className="font-semibold">
              일본 수출 바우처 활용 시 주의할 점
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              바우처 집행 시 자주 발생하는 실수 정리
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 border">
            <h3 className="font-semibold">
              아마존 vs 라쿠텐 운영 전략 비교
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              플랫폼별 운영 방식 차이 분석
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 border">
            <h3 className="font-semibold">
              일본 3PL 선택 기준
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              물류 파트너 선정 시 체크 포인트
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}