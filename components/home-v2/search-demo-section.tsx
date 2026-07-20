import Link from "next/link"

export function SearchDemoSection() {
  return (
    <section id="search" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold tracking-wide text-primary">
            핵심 기능
          </p>
          <h2 className="text-3xl font-bold leading-snug md:text-4xl">
            지원사업 탐색부터
            <br />
            신청 준비까지 한 번에
          </h2>
          <p className="mt-4 text-muted-foreground">
            린코라는 검색, AI 추천, 신청 가이드로 이어지는 실전 흐름을 제공합니다.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold">지원사업 검색</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              키워드와 필터로 우리 기업에 맞는 공고를 빠르게 찾을 수 있습니다.
            </p>
            <Link
              href="/grants"
              className="mt-5 inline-flex rounded-lg border px-3 py-2 text-xs font-semibold transition hover:bg-muted"
            >
              지금 검색하기
            </Link>
          </article>

          <article className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold">AI 지원사업 추천</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              기업 상황을 기반으로 우선순위 높은 지원사업을 추천받을 수 있습니다.
            </p>
            <Link
              href="/ai/recommend"
              className="mt-5 inline-flex rounded-lg border px-3 py-2 text-xs font-semibold transition hover:bg-muted"
            >
              AI 추천 보기
            </Link>
          </article>

          <article className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold">신청서 작성 지원</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              신청 전에 필요한 준비 항목과 작성 가이드를 확인할 수 있습니다.
            </p>
            <Link
              href="/resources"
              className="mt-5 inline-flex rounded-lg border px-3 py-2 text-xs font-semibold transition hover:bg-muted"
            >
              신청 가이드 보기
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
