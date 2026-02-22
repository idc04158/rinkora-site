import { AlertTriangle, Globe, Search } from "lucide-react"

const problems = [
  {
    icon: Search,
    title: "파트너를 찾는 것부터 막힙니다",
    description:
      "일본 수출을 도와줄 기업은 많지만, 우리 브랜드에 맞는 곳을 찾기는 쉽지 않습니다.",
  },
  {
    icon: AlertTriangle,
    title: "검증되지 않은 선택이 리스크입니다",
    description:
      "비용은 들지만 성과는 보장되지 않습니다. 잘못된 파트너 선택은 시간과 기회를 잃게 만듭니다.",
  },
  {
    icon: Globe,
    title: "각 분야를 따로 관리해야 합니다",
    description:
      "물류, 마케팅, 인증, 유통. 각각 다른 기업을 찾고 조율하는 과정은 생각보다 복잡합니다.",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary">
            Problem
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            일본 수출, 정보는 많지만 실행은 어렵습니다
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            많은 브랜드가 비슷한 지점에서 멈춥니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
                <problem.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                {problem.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}