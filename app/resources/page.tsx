import Link from "next/link"

const guideSteps = [
  {
    title: "공고 요건 확인",
    description: "신청 자격, 지원 대상, 마감일과 제출 항목을 먼저 점검합니다.",
  },
  {
    title: "핵심 문서 준비",
    description: "사업계획서, 재무자료, 증빙서류를 체크리스트 기준으로 준비합니다.",
  },
  {
    title: "제출 전 최종 검토",
    description: "오탈자, 누락 문서, 필수 항목 입력 여부를 마지막으로 확인합니다.",
  },
]

export default function ResourcesPage() {
  return (
    <main className="px-6 py-24 md:py-32">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold tracking-wide text-primary">신청 가이드</p>
        <h1 className="mt-3 text-3xl font-bold leading-snug md:text-4xl">
          지원사업 신청서 작성 전
          <br />
          꼭 확인할 체크리스트
        </h1>
        <p className="mt-4 text-muted-foreground">
          복잡한 신청 과정을 빠르게 점검할 수 있도록 기본 흐름을 정리했습니다.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {guideSteps.map((step) => (
            <article key={step.title} className="rounded-2xl border bg-card p-5">
              <h2 className="text-lg font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/grants"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            지원사업 검색
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center rounded-xl border px-5 py-2.5 text-sm font-semibold"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </main>
  )
}
