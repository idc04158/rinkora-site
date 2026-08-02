"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { SearchX } from "lucide-react"
import { useAuthSession } from "@/components/auth/auth-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { FilterPanel, OpportunityList, SearchBar } from "@/components/opportunity"
import { getOpportunityRepository } from "@/services/opportunity"
import {
  OpportunityCategory,
  OpportunityDto,
  OpportunityRegion,
  OpportunitySort,
} from "@/types/opportunity"

const categoryOptions: OpportunityCategory[] = [
  "AI",
  "RND",
  "EXPORT",
  "DATA",
  "MANUFACTURING",
  "MARKETING",
]

const regionOptions: OpportunityRegion[] = [
  "전국",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "대전",
]

export default function GrantsPage() {
  const { profile } = useAuthSession()
  const repository = useMemo(() => getOpportunityRepository(), [])
  const [opportunities, setOpportunities] = useState<OpportunityDto[]>([])
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [categories, setCategories] = useState<OpportunityCategory[]>([])
  const [regions, setRegions] = useState<OpportunityRegion[]>([])
  const [query, setQuery] = useState("")

  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | "ALL">(
    "ALL",
  )
  const [selectedRegion, setSelectedRegion] = useState<OpportunityRegion | "ALL">("ALL")
  const [selectedSort, setSelectedSort] = useState<OpportunitySort>("deadline_asc")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saveSearchName, setSaveSearchName] = useState("")
  const [saveSearchMessage, setSaveSearchMessage] = useState("")
  const [savingSearch, setSavingSearch] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const keyword = params.get("q") ?? ""
    const rawCategory = params.get("category")
    const rawRegion = params.get("region")
    const rawSort = params.get("sort")

    if (keyword) setQuery(keyword)
    if (rawCategory && categoryOptions.includes(rawCategory as OpportunityCategory)) {
      setSelectedCategory(rawCategory as OpportunityCategory)
    }
    if (rawRegion && regionOptions.includes(rawRegion as OpportunityRegion)) {
      setSelectedRegion(rawRegion as OpportunityRegion)
    }
    if (rawSort === "deadline_asc" || rawSort === "deadline_desc") {
      setSelectedSort(rawSort)
    }
  }, [])

  const fetchOpportunities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // log site search for analytics (client-side)
      try {
        if (query && query.trim()) {
          const visitorId = typeof window !== "undefined" ? localStorage.getItem("rk_visitor_id") ?? undefined : undefined
          const sessionId = typeof window !== "undefined" ? sessionStorage.getItem("rk_session_id") ?? undefined : undefined
          void fetch("/api/analytics/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "site_search",
              sessionId: sessionId ?? `s_${Date.now().toString(36)}`,
              visitorId: visitorId ?? `v_${Date.now().toString(36)}`,
              path: "/grants",
              query: query,
            }),
          })
        }
      } catch {}

      const result = await repository.getOpportunities({
        query,
        category: selectedCategory,
        region: selectedRegion,
        sortByDeadline: selectedSort,
      })
      setOpportunities(result)
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "알 수 없는 오류")
    } finally {
      setLoading(false)
    }
  }, [query, repository, selectedCategory, selectedRegion, selectedSort])

  useEffect(() => {
    const loadFilterMetadata = async () => {
      const [categoryResult, regionResult] = await Promise.all([
        repository.getCategories(),
        repository.getRegions(),
      ])
      setCategories(categoryResult)
      setRegions(regionResult)
    }

    void loadFilterMetadata()
  }, [repository])

  useEffect(() => {
    void fetchOpportunities()
  }, [fetchOpportunities])

  useEffect(() => {
    if (profile.role === "guest") {
      setSavedIds([])
      return
    }

    void fetch("/api/favorites", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const ids = Array.isArray(data?.items)
          ? data.items.map((item: { opportunityId: string }) => item.opportunityId)
          : []
        setSavedIds(ids)
      })
  }, [profile.role])

  const handleToggleSave = async (opportunity: OpportunityDto) => {
    if (profile.role === "guest") return

    const isSaved = savedIds.includes(opportunity.id)
    const method = isSaved ? "DELETE" : "POST"
    const response = await fetch("/api/favorites", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        opportunityId: opportunity.id,
      }),
    })

    if (!response.ok) return

    setSavedIds((prev) =>
      isSaved ? prev.filter((id) => id !== opportunity.id) : [...prev, opportunity.id]
    )
  }

  const handleSaveCurrentSearch = async () => {
    const trimmedName = saveSearchName.trim()
    if (!trimmedName) {
      setSaveSearchMessage("저장 검색 이름을 입력해주세요.")
      return
    }

    setSavingSearch(true)
    setSaveSearchMessage("")

    try {
      const response = await fetch("/api/saved-searches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          query: query || undefined,
          category: selectedCategory === "ALL" ? undefined : selectedCategory,
          region: selectedRegion === "ALL" ? undefined : selectedRegion,
          sort: selectedSort,
        }),
      })
      const payload = (await response.json().catch(() => null)) as { message?: string } | null
      if (!response.ok) {
        setSaveSearchMessage(payload?.message ?? "저장 검색 생성에 실패했습니다.")
        return
      }

      setSaveSearchMessage("현재 검색 조건을 저장했습니다.")
      setSaveSearchName("")
    } finally {
      setSavingSearch(false)
    }
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-2xl border bg-card p-8">
          <p className="text-sm font-semibold tracking-wide text-primary">지원사업 검색</p>
          <h1 className="mt-3 text-3xl font-bold leading-snug md:text-4xl">
            우리 기업에 맞는
            <br />
            지원사업을 찾아보세요
          </h1>
          <p className="mt-4 text-muted-foreground">
            키워드 검색과 필터를 활용해 필요한 지원사업을 빠르게 탐색할 수 있습니다.
          </p>
          <div className="mt-6">
            <SearchBar initialValue={query} onSearch={setQuery} />
          </div>
          {profile.role !== "guest" ? (
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/grants/saved"
                  className="inline-flex rounded-lg border px-3 py-2 text-xs font-semibold hover:bg-muted"
                >
                  내 저장목록 보기
                </Link>
                <Link
                  href="/me"
                  className="inline-flex rounded-lg border px-3 py-2 text-xs font-semibold hover:bg-muted"
                >
                  내 페이지
                </Link>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={saveSearchName}
                  onChange={(event) => setSaveSearchName(event.target.value)}
                  placeholder="현재 검색 저장 이름"
                  className="h-9 w-full rounded-lg border bg-background px-3 text-xs sm:max-w-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSaveCurrentSearch}
                  disabled={savingSearch}
                >
                  {savingSearch ? "저장 중..." : "현재 검색 저장"}
                </Button>
              </div>
              {saveSearchMessage ? (
                <p className="text-xs text-muted-foreground">{saveSearchMessage}</p>
              ) : null}
            </div>
          ) : null}
          <div className="mt-4">
            <FilterPanel
              categories={categories}
              regions={regions}
              selectedCategory={selectedCategory}
              selectedRegion={selectedRegion}
              selectedSort={selectedSort}
              onCategoryChange={setSelectedCategory}
              onRegionChange={setSelectedRegion}
              onSortChange={setSelectedSort}
            />
          </div>
        </section>

        {loading ? (
          <section className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl border p-6">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="mt-4 h-6 w-4/5" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
              </div>
            ))}
          </section>
        ) : null}

        {!loading && error ? (
          <Alert variant="destructive">
            <AlertTitle>지원사업을 불러오지 못했습니다</AlertTitle>
            <AlertDescription>
              {error}
              <Button variant="secondary" size="sm" className="mt-3" onClick={fetchOpportunities}>
                다시 시도
              </Button>
            </AlertDescription>
          </Alert>
        ) : null}

        {!loading && !error && opportunities.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX />
              </EmptyMedia>
              <EmptyTitle>검색 결과가 없습니다</EmptyTitle>
              <EmptyDescription>
                키워드 또는 필터를 변경해서 다시 검색해보세요.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {!loading && !error && opportunities.length > 0 ? (
          <OpportunityList
            opportunities={opportunities}
            savedIds={savedIds}
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
