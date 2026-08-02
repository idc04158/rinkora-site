 "use client"

import { useEffect, useState } from "react"

type DashboardData = {
  totalUsers: number
  pendingBusinesses: number
  todaySignups: number
  aiUsage: number
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    pendingBusinesses: 0,
    todaySignups: 0,
    aiUsage: 0,
  })

  useEffect(() => {
    void fetch("/api/admin/dashboard", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((result) => {
        if (!result) return
        setData({
          totalUsers: result.totalUsers ?? 0,
          pendingBusinesses: result.pendingBusinesses ?? 0,
          todaySignups: result.todaySignups ?? 0,
          aiUsage: result.aiUsage ?? 0,
        })
      })
  }, [])

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="회원수" value={data.totalUsers} />
      <Card title="인증대기" value={data.pendingBusinesses} />
      <Card title="오늘 가입자" value={data.todaySignups} />
      <Card title="AI 조회수" value={data.aiUsage} />
    </section>
  )
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <article className="rounded-2xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
    </article>
  )
}
