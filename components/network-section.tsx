import { Building2, ShieldCheck, Users, BarChart3 } from "lucide-react"

const stats = [
  { value: "50+", label: "검증된 서비스 기업" },
  { value: "12", label: "전문 분야" },
  { value: "200+", label: "매칭 사례" },
]

export function NetworkSection() {
  return (
    <section
      id="network"
      className="px-6 py-32 bg-white border-t"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary tracking-wide">
            PARTNER NETWORK
          </p>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-snug">
            검증된 일본 수출 실행 네트워크
          </h2>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            물류, 마케팅, 인증, 유통 등
            일본 진출에 필요한 핵심 영역을
            분야별로 검증된 파트너와 연결합니다.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border p-8 hover:shadow-xl transition">
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
              <Users className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold">
              분야별 전문 네트워크
            </h3>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              물류, 마케팅, 인증, 법률, 유통 등
              각 영역의 전문 기업과 연결합니다.
            </p>
          </div>

          <div className="rounded-2xl border p-8 hover:shadow-xl transition">
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold">
              검증 절차 기반 선별
            </h3>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              단순 등록이 아닌
              실제 수행 경험을 기준으로 선별합니다.
            </p>
          </div>

          <div className="rounded-2xl border p-8 hover:shadow-xl transition">
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold">
              데이터 기반 매칭
            </h3>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              업종, 단계, 목표에 맞는
              적합 파트너를 구조적으로 연결합니다.
            </p>
          </div>

          <div className="rounded-2xl border p-8 hover:shadow-xl transition">
            <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
              <Building2 className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold">
              바우처 연계 경험
            </h3>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              정부 수출 지원 사업과
              연계 가능한 파트너를 함께 안내합니다.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}