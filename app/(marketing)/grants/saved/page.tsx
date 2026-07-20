"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useAuthSession } from "@/components/auth/auth-provider"
import { OpportunityList } from "@/components/opportunity"
import { getOpportunityRepository } from "@/services/opportunity"
import { OpportunityDto } from "@/types/opportunity"

export default function SavedGrantsPage() {
  const { profile } = useAuthSession()
  const repository = useMemo(() => getOpportunityRepository(), [])
  const [items, setItems] = useState<OpportunityDto[]>([])
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile.role === "guest") {
      setLoading(false)
      return
    }

    void Promise.all([
      repository.getOpportunities({}),
      fetch("/api/programs/save", { cache: "no-store" }).then((res) =>
        res.ok ? res.json() : { programIds: [] }
      ),
    ]).then(([all, savedData]) => {
      const ids = Array.isArray(savedData.programIds) ? savedData.programIds : []
      setSavedIds(ids)
      setItems(all.filter((item) => ids.includes(item.id)))
      setLoading(false)
    })
  }, [profile.role, repository])

  const toggleSave = async (opportunity: OpportunityDto) => {
    const response = await fetch("/api/programs/save", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: opportunity.id }),
    })
    if (!response.ok) return
    setSavedIds((prev) => prev.filter((id) => id !== opportunity.id))
    setItems((prev) => prev.filter((item) => item.id !== opportunity.id))
  }

  if (profile.role === "guest") {
    return (
      <main className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-card p-8">
          <h1 className="text-2xl font-bold">내 저장목록</h1>
          <p className="mt-3 text-sm text-muted-foreground">회원가입 후 저장 가능합니다.</p>
          <Link href="/auth/signup" className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            회원가입
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">내 저장목록</h1>
        <p className="mt-2 text-sm text-muted-foreground">저장한 공고를 확인하고 해제할 수 있습니다.</p>
        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-muted-foreground">불러오는 중...</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">저장한 공고가 없습니다.</p>
          ) : (
            <OpportunityList
              opportunities={items}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          )}
        </div>
      </div>
    </main>
  )
}
