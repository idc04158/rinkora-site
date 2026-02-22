import { CheckCircle2 } from "lucide-react"

const differentiators = [
  {
    title: "검증된 파트너만 연결",
    description:
      "모든 서비스 기업은 실적과 전문성을 기반으로 엄격히 심사됩니다.",
  },
  {
    title: "브랜드 맞춤 매칭",
    description:
      "브랜드의 규모, 카테고리, 목표에 맞는 최적의 서비스 기업을 추천합니다.",
  },
  {
    title: "원스톱 수출 지원",
    description:
      "물류부터 마케팅까지, 하나의 플랫폼에서 모든 수출 과정을 관리하세요.",
  },
  {
    title: "투명한 프로세스",
    description:
      "진행 상황을 실시간으로 확인하고, 명확한 커뮤니케이션을 보장합니다.",
  },
  {
    title: "리스크 최소화",
    description:
      "검증된 프로세스와 전문 파트너를 통해 수출 리스크를 최소화합니다.",
  },
  {
    title: "지속적인 성장 지원",
    description:
      "초기 진출부터 현지 안착까지, 장기적인 성장 전략을 함께 수립합니다.",
  },
]

export function WhyRinkora() {
  return (
    <section id="why" className="bg-muted/50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary">
            Why Rinkora
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            왜 린코라와 함께해야 할까요?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            린코라가 다른 이유, 간결하게 보여드립니다.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-1.5 font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
