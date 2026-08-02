import { getSummary } from "@/services/analytics/analytics-service"
import ExcludeToggle from "@/components/admin/exclude-toggle"
import { fetchGaSummary, fetchGscTopQueries } from "@/services/google/external-metrics"

export default async function AdminAnalyticsPage() {
  const summary = await getSummary(7)
  const ga =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
      ? await fetchGaSummary(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, 7)
      : null
  const gsc =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON && process.env.NEXT_PUBLIC_GSC_SITE_URL
      ? await fetchGscTopQueries(process.env.NEXT_PUBLIC_GSC_SITE_URL, 7, 10)
      : null

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <div className="flex items-center gap-4">
          <ExcludeToggle />
          <div>
          <a
            href={process.env.NEXT_PUBLIC_GA_DASHBOARD_URL ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="mr-3 text-sm text-primary underline"
          >
            GA4 대시보드
          </a>
          <a
            href={process.env.NEXT_PUBLIC_GSC_URL ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary underline"
          >
            Search Console
          </a>
        </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">오늘 UV (나 제외)</p>
          <p className="mt-2 text-3xl font-bold">{summary.today.uv}</p>
        </article>
        <article className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">오늘 PV</p>
          <p className="mt-2 text-3xl font-bold">{summary.today.pv}</p>
        </article>
        <article className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">평균 체류 (초)</p>
          <p className="mt-2 text-3xl font-bold">{Math.round((summary.today.avgDwellMs ?? 0) / 1000)}</p>
        </article>
        <article className="rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">7일간 UV 합계</p>
          <p className="mt-2 text-3xl font-bold">{summary.dailyUV.reduce((s, d) => s + d.uv, 0)}</p>
        </article>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">인기 화면 (최근 7일)</h3>
        <ul className="space-y-2">
        {summary.topPaths.map((p: { path: string; count: number }) => (
            <li key={p.path} className="flex justify-between rounded-md border bg-background p-3">
              <span className="text-sm text-muted-foreground">{p.path}</span>
              <span className="font-medium">{p.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">외부 유입 요약 (GA4)</h3>
        {ga ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border bg-card p-5">
              <p className="text-sm text-muted-foreground">세션 (7일)</p>
              <p className="mt-2 text-2xl font-bold">{ga.sessions ?? "-"}</p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <p className="text-sm text-muted-foreground">사용자 (7일)</p>
              <p className="mt-2 text-2xl font-bold">{ga.totalUsers ?? "-"}</p>
            </article>
            <article className="rounded-2xl border bg-card p-5">
              <p className="text-sm text-muted-foreground">평균 세션(초)</p>
              <p className="mt-2 text-2xl font-bold">{Math.round((ga.avgSessionDuration ?? 0) / 1000)}</p>
            </article>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">GA4 연동 설정이 필요합니다.</p>
        )}
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Search Console 상위 쿼리 (7일)</h3>
        {gsc ? (
          <ul className="space-y-2">
            {gsc.map((q) => (
              <li key={q.query} className="flex justify-between rounded-md border bg-background p-3">
                <span className="text-sm text-muted-foreground">{q.query}</span>
                <span className="font-medium">{q.clicks}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Search Console 연동 설정이 필요합니다.</p>
        )}
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">사이트 내 검색어 (최근 7일)</h3>
        <ul className="space-y-2">
          {summary.topSearches.map((s: { query: string; count: number }) => (
            <li key={s.query} className="flex justify-between rounded-md border bg-background p-3">
              <span className="text-sm text-muted-foreground">{s.query}</span>
              <span className="font-medium">{s.count}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

