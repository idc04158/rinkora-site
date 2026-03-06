import { Metadata } from "next"

export const metadata: Metadata = {
  title: "린코라 웨비나 아카이브",
  description:
    "일본 수출 관련 데이터 기반 웨비나 아카이브 및 주요 내용 정리 페이지입니다.",
}

export default function WebinarsPage() {
  return (
    <main className="bg-background text-foreground px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-primary tracking-wide">
            WEBINAR ARCHIVE
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold">
            일본 수출 세미나 아카이브
          </h1>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            린코라가 진행한 데이터 기반 웨비나의
            주요 내용과 발표 자료 요약을 정리합니다.
          </p>
        </div>

        {/* Webinar List */}
        <div className="mt-16 space-y-12">

          <ArchiveCard
            title="2026 일본 이커머스 트렌드 분석"
            date="2026.03.15"
            summary="플랫폼 정책 변화, 광고 구조 개편, 물류비 동향 정리"
          />

          <ArchiveCard
            title="라쿠텐 & 아마존 광고 구조 심층 분석"
            date="2026.02.10"
            summary="광고 알고리즘 변화와 운영 전략 대응 방법"
          />

          <ArchiveCard
            title="정부 바우처 활용 전략과 주의사항"
            date="2025.11.22"
            summary="수출바우처 활용 시 주의점 및 실무 사례"
          />

        </div>

      </div>
    </main>
  )
}

function ArchiveCard({
  title,
  date,
  summary,
}: {
  title: string
  date: string
  summary: string
}) {
  return (
    <div className="border rounded-2xl p-8 hover:shadow-md transition">
      <p className="text-sm text-muted-foreground">
        {date}
      </p>

      <h2 className="mt-3 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-4 text-muted-foreground">
        {summary}
      </p>

      <button className="mt-6 text-primary font-medium hover:underline">
        주요 내용 보기 →
      </button>
    </div>
  )
}