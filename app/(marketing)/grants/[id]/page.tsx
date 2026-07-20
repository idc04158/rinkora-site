"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { useAuthSession } from "@/components/auth/auth-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { OpportunityDetail } from "@/components/opportunity"
import { getOpportunityRepository } from "@/services/opportunity"
import { OpportunityDto } from "@/types/opportunity"

export default function GrantDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { profile } = useAuthSession()
  const repository = useMemo(() => getOpportunityRepository(), [])
  const [opportunity, setOpportunity] = useState<OpportunityDto | null>(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) {
        setError("잘못된 공고 경로입니다.")
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const result = await repository.getOpportunityById(id)
        setOpportunity(result)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "알 수 없는 오류")
      } finally {
        setLoading(false)
      }
    }

    void loadDetail()
  }, [id, repository])

  useEffect(() => {
    if (profile.role === "guest" || !id) {
      setSaved(false)
      return
    }
    void fetch("/api/programs/save", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const ids = Array.isArray(data?.programIds) ? data.programIds : []
        setSaved(ids.includes(id))
      })
  }, [id, profile.role])

  const handleToggleSave = async (target: OpportunityDto) => {
    if (profile.role === "guest") return
    const method = saved ? "DELETE" : "POST"
    const response = await fetch("/api/programs/save", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        opportunityId: target.id,
        title: target.title,
        category: target.category,
      }),
    })
    if (!response.ok) return
    setSaved((prev) => !prev)
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl space-y-6">
        <p className="text-sm font-semibold tracking-wide text-primary">지원사업 상세</p>

        {loading ? (
          <section className="rounded-2xl border bg-card p-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-10 w-4/5" />
            <Skeleton className="mt-6 h-4 w-1/2" />
            <Skeleton className="mt-8 h-40 w-full" />
          </section>
        ) : null}

        {!loading && error ? (
          <Alert variant="destructive">
            <AlertTitle>상세 공고를 불러오지 못했습니다</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {!loading && !error && !opportunity ? (
          <Empty className="rounded-2xl border bg-card p-8">
            <EmptyHeader>
              <EmptyTitle>지원사업을 찾을 수 없습니다</EmptyTitle>
              <EmptyDescription>
                삭제되었거나 잘못된 주소일 수 있습니다.
              </EmptyDescription>
            </EmptyHeader>
            <Button asChild variant="outline">
              <Link href="/grants">목록으로 이동</Link>
            </Button>
          </Empty>
        ) : null}

        {!loading && !error && opportunity ? (
          <OpportunityDetail
            opportunity={opportunity}
            isSaved={saved}
            onToggleSave={handleToggleSave}
            saveDisabledMessage={
              profile.role === "guest" ? "회원가입 후 저장 가능합니다." : undefined
            }
          />
        ) : null}
      </div>
    </main>
  )
}
