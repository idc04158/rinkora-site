import Link from "next/link"

export function FreeSearchCta() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center md:px-16 md:py-20">
          <h2 className="text-3xl font-bold leading-snug text-white md:text-4xl">
            지원사업 검색, 지금 바로 시작하세요
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-white/85">
            검색은 무료로 사용할 수 있고, 가입 후에는 AI 추천과 저장 기능까지 이어집니다.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/grants"
              className="inline-flex items-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:opacity-90"
            >
              지원사업 검색
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center rounded-xl border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              무료로 시작하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
