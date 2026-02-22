import { Building2, ShieldCheck, Users } from "lucide-react"

const stats = [
  { value: "50+", label: "검증된 서비스 기업" },
  { value: "12", label: "전문 서비스 분야" },
  { value: "200+", label: "성공적인 매칭 사례" },
]

export function NetworkSection() {
  return (
    <section id="network" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-wide text-primary">
              Network Strength
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              강력한 일본 수출 지원
              <br />
              서비스 네트워크
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              링코라는 물류, 마케팅, 법률, 인증, 유통 등 일본 수출에 필요한 다양한
              분야의 서비스 기업들과 협력합니다. 하나의 플랫폼에서 모든 파트너를
              만나보세요.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 sm:col-span-2">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">
                다분야 전문가 네트워크
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                물류, 마케팅, 법률, 인증 등 각 분야 최고의 전문가 그룹이
                브랜드의 일본 진출을 지원합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">
                검증된 기업만
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                엄격한 심사를 통과한 서비스 기업만 네트워크에 참여합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">
                지속적인 협업
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                일회성이 아닌 지속적인 파트너십으로 장기적 성과를 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
