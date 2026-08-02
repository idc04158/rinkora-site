"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Bell, Bookmark, Clock3, Search, ShieldCheck } from "lucide-react"
import { useAuthSession } from "@/components/auth/auth-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getOpportunityRepository } from "@/services/opportunity"
import { OpportunityDto, OpportunitySort } from "@/types/opportunity"

type FavoriteItem = {
  opportunityId: string
  createdAt: string
}

type SavedSearchItem = {
  id: string
  name: string
  query: string | null
  category: string | null
  region: string | null
  sort: string | null
  createdAt: string
  updatedAt: string
}

type NotificationItem = {
  id: string
  type: string
  opportunityId: string | null
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

type ViewHistoryItem = {
  id: string
  opportunityId: string
  viewedAt: string
}

type NewSearchForm = {
  name: string
  query: string
  category: string
  region: string
  sort: OpportunitySort
}

const DEFAULT_NEW_SEARCH: NewSearchForm = {
  name: "",
  query: "",
  category: "ALL",
  region: "ALL",
  sort: "deadline_asc",
}

function formatDate(input: string) {
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input
  return date.toLocaleString("ko-KR")
}

function toVerificationLabel(status: "unverified" | "pending" | "verified" | "rejected") {
  if (status === "pending") return "인증 대기"
  if (status === "verified") return "인증 완료"
  if (status === "rejected") return "반려"
  return "미인증"
}

export default function MePage() {
  const { profile } = useAuthSession()
  const repository = useMemo(() => getOpportunityRepository(), [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [savedSearches, setSavedSearches] = useState<SavedSearchItem[]>([])
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [viewHistory, setViewHistory] = useState<ViewHistoryItem[]>([])
  const [opportunityMap, setOpportunityMap] = useState<Record<string, OpportunityDto>>({})
  const [newSearch, setNewSearch] = useState<NewSearchForm>(DEFAULT_NEW_SEARCH)
  const [savingSearch, setSavingSearch] = useState(false)
  const [activeTab, setActiveTab] = useState("favorites")

  const unreadCount = notifications.filter((item) => !item.isRead).length

  const loadMeData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [favoritesRes, savedSearchesRes, notificationsRes, viewHistoryRes, opportunities] =
        await Promise.all([
          fetch("/api/favorites", { cache: "no-store" }),
          fetch("/api/saved-searches", { cache: "no-store" }),
          fetch("/api/notifications?limit=20", { cache: "no-store" }),
          fetch("/api/view-history?limit=30", { cache: "no-store" }),
          repository.getOpportunities({}),
        ])

      if (
        !favoritesRes.ok ||
        !savedSearchesRes.ok ||
        !notificationsRes.ok ||
        !viewHistoryRes.ok
      ) {
        throw new Error("마이페이지 데이터를 불러오지 못했습니다.")
      }

      const [favoritesData, savedSearchesData, notificationsData, viewHistoryData] =
        await Promise.all([
          favoritesRes.json(),
          savedSearchesRes.json(),
          notificationsRes.json(),
          viewHistoryRes.json(),
        ])

      setFavorites(Array.isArray(favoritesData.items) ? favoritesData.items : [])
      setSavedSearches(Array.isArray(savedSearchesData.items) ? savedSearchesData.items : [])
      setNotifications(Array.isArray(notificationsData.items) ? notificationsData.items : [])
      setViewHistory(Array.isArray(viewHistoryData.items) ? viewHistoryData.items : [])
      setOpportunityMap(
        opportunities.reduce<Record<string, OpportunityDto>>((acc, item) => {
          acc[item.id] = item
          return acc
        }, {}),
      )
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "알 수 없는 오류")
    } finally {
      setLoading(false)
    }
  }, [repository])

  useEffect(() => {
    if (profile.role === "guest") {
      setLoading(false)
      return
    }
    void loadMeData()
  }, [profile.role, loadMeData])

  const removeFavorite = async (opportunityId: string) => {
    const response = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId }),
    })
    if (!response.ok) return
    setFavorites((prev) => prev.filter((item) => item.opportunityId !== opportunityId))
  }

  const createSavedSearch = async () => {
    if (!newSearch.name.trim()) return

    setSavingSearch(true)
    try {
      const response = await fetch("/api/saved-searches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSearch.name.trim(),
          query: newSearch.query.trim() || undefined,
          category: newSearch.category === "ALL" ? undefined : newSearch.category,
          region: newSearch.region === "ALL" ? undefined : newSearch.region,
          sort: newSearch.sort,
        }),
      })

      if (!response.ok) return
      const created = (await response.json()) as SavedSearchItem
      setSavedSearches((prev) => [
        {
          ...created,
          query: created.query ?? null,
          category: created.category ?? null,
          region: created.region ?? null,
          sort: created.sort ?? null,
          updatedAt: created.createdAt,
        },
        ...prev,
      ])
      setNewSearch(DEFAULT_NEW_SEARCH)
    } finally {
      setSavingSearch(false)
    }
  }

  const deleteSavedSearchItem = async (savedSearchId: string) => {
    const response = await fetch("/api/saved-searches", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedSearchId }),
    })
    if (!response.ok) return
    setSavedSearches((prev) => prev.filter((item) => item.id !== savedSearchId))
  }

  const markNotificationAsRead = async (notificationId: string) => {
    const response = await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId }),
    })
    if (!response.ok) return
    setNotifications((prev) =>
      prev.map((item) => (item.id === notificationId ? { ...item, isRead: true } : item)),
    )
  }

  const toSavedSearchLink = (item: SavedSearchItem) => {
    const params = new URLSearchParams()
    if (item.query) params.set("q", item.query)
    if (item.category) params.set("category", item.category)
    if (item.region) params.set("region", item.region)
    if (item.sort) params.set("sort", item.sort)
    const queryString = params.toString()
    return queryString ? `/grants?${queryString}` : "/grants"
  }

  if (profile.role === "guest") {
    return (
      <main className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-card p-8">
          <h1 className="text-3xl font-bold">내 페이지</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            회원가입 후 관심 공고, 저장 검색, 알림, 열람 기록을 관리할 수 있습니다.
          </p>
          <Link
            href="/auth/signup"
            className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            회원가입
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">내 페이지</h1>
          <p className="mt-2 text-sm text-muted-foreground">회원 활동과 계정을 한곳에서 관리합니다.</p>
        </div>

        <section className="grid gap-4 lg:grid-cols-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-4 w-4" />
                내 계정 요약
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>이메일: {profile.email}</p>
              <p>권한: {profile.role}</p>
              <p>인증 상태: {toVerificationLabel(profile.verificationStatus)}</p>
              <p>
                조회권: {profile.aiCredits} / {profile.totalCredits}
              </p>
              {profile.unlimitedUntil ? <p>무제한 기간: {formatDate(profile.unlimitedUntil)}</p> : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">알림 현황</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>전체 알림 {notifications.length}건</p>
              <p>미읽음 {unreadCount}건</p>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("notifications")}>
                알림 탭 열기
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">빠른 이동</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Link href="/account" className="block text-muted-foreground hover:text-foreground">
                계정 설정
              </Link>
              <Link href="/grants/saved" className="block text-muted-foreground hover:text-foreground">
                저장한 공고
              </Link>
              <Link href="/verify" className="block text-muted-foreground hover:text-foreground">
                사업자 인증
              </Link>
              <Link href="/me/referrals" className="block text-muted-foreground hover:text-foreground">
                추천인 관리
              </Link>
            </CardContent>
          </Card>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="favorites">관심 공고</TabsTrigger>
            <TabsTrigger value="saved-searches">저장 검색</TabsTrigger>
            <TabsTrigger value="notifications">알림</TabsTrigger>
            <TabsTrigger value="history">열람 기록</TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="grid gap-4 pt-4 md:grid-cols-2">
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
              <Skeleton className="h-44 w-full" />
            </div>
          ) : null}

          {!loading && error ? (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <p className="text-sm text-destructive">{error}</p>
                <Button className="mt-4" onClick={loadMeData}>
                  다시 불러오기
                </Button>
              </CardContent>
            </Card>
          ) : null}

          {!loading && !error ? (
            <>
              <TabsContent value="favorites" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bookmark className="h-4 w-4" />
                      관심 공고 ({favorites.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {favorites.length === 0 ? (
                      <p className="text-sm text-muted-foreground">저장한 공고가 없습니다.</p>
                    ) : (
                      favorites.map((item) => {
                        const opportunity = opportunityMap[item.opportunityId]
                        return (
                          <div key={item.opportunityId} className="rounded-lg border p-3">
                            <Link
                              href={`/grants/${item.opportunityId}`}
                              className="text-sm font-semibold hover:underline"
                            >
                              {opportunity?.title ?? item.opportunityId}
                            </Link>
                            <p className="mt-1 text-xs text-muted-foreground">
                              저장일 {formatDate(item.createdAt)}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => removeFavorite(item.opportunityId)}
                            >
                              저장 해제
                            </Button>
                          </div>
                        )
                      })
                    )}
                    <Button asChild variant="outline" size="sm">
                      <Link href="/grants/saved">저장목록 전체 보기</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved-searches" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Search className="h-4 w-4" />
                      저장 검색 ({savedSearches.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 rounded-lg border p-3">
                      <Input
                        value={newSearch.name}
                        onChange={(event) =>
                          setNewSearch((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="저장 검색 이름"
                      />
                      <Input
                        value={newSearch.query}
                        onChange={(event) =>
                          setNewSearch((prev) => ({ ...prev, query: event.target.value }))
                        }
                        placeholder="검색어 (선택)"
                      />
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                        <Select
                          value={newSearch.category}
                          onValueChange={(value) =>
                            setNewSearch((prev) => ({ ...prev, category: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="카테고리" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ALL">전체</SelectItem>
                            <SelectItem value="AI">AI</SelectItem>
                            <SelectItem value="RND">RND</SelectItem>
                            <SelectItem value="EXPORT">EXPORT</SelectItem>
                            <SelectItem value="DATA">DATA</SelectItem>
                            <SelectItem value="MANUFACTURING">MANUFACTURING</SelectItem>
                            <SelectItem value="MARKETING">MARKETING</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={newSearch.region}
                          onValueChange={(value) =>
                            setNewSearch((prev) => ({ ...prev, region: value }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="지역" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ALL">전체</SelectItem>
                            <SelectItem value="전국">전국</SelectItem>
                            <SelectItem value="서울">서울</SelectItem>
                            <SelectItem value="경기">경기</SelectItem>
                            <SelectItem value="인천">인천</SelectItem>
                            <SelectItem value="부산">부산</SelectItem>
                            <SelectItem value="대구">대구</SelectItem>
                            <SelectItem value="대전">대전</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={newSearch.sort}
                          onValueChange={(value) =>
                            setNewSearch((prev) => ({ ...prev, sort: value as OpportunitySort }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="정렬" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deadline_asc">임박순</SelectItem>
                            <SelectItem value="deadline_desc">최신순</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        size="sm"
                        onClick={createSavedSearch}
                        disabled={savingSearch || !newSearch.name.trim()}
                      >
                        {savingSearch ? "저장 중..." : "검색 저장"}
                      </Button>
                    </div>

                    {savedSearches.length === 0 ? (
                      <p className="text-sm text-muted-foreground">저장한 검색이 없습니다.</p>
                    ) : (
                      savedSearches.map((item) => (
                        <div key={item.id} className="rounded-lg border p-3">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {item.query ? <Badge variant="outline">q: {item.query}</Badge> : null}
                            {item.category ? <Badge variant="outline">{item.category}</Badge> : null}
                            {item.region ? <Badge variant="outline">{item.region}</Badge> : null}
                            {item.sort ? <Badge variant="outline">{item.sort}</Badge> : null}
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            업데이트 {formatDate(item.updatedAt)}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Button asChild variant="secondary" size="sm">
                              <Link href={toSavedSearchLink(item)}>이 조건으로 검색</Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteSavedSearchItem(item.id)}
                            >
                              삭제
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bell className="h-4 w-4" />
                      알림 ({notifications.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-muted-foreground">받은 알림이 없습니다.</p>
                    ) : (
                      notifications.map((item) => (
                        <div key={item.id} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold">{item.title}</p>
                            {!item.isRead ? <Badge>NEW</Badge> : null}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {formatDate(item.createdAt)}
                          </p>
                          {item.opportunityId ? (
                            <Link
                              href={`/grants/${item.opportunityId}`}
                              className="mt-2 inline-flex text-xs font-semibold text-primary hover:underline"
                            >
                              관련 공고 보기
                            </Link>
                          ) : null}
                          {!item.isRead ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => markNotificationAsRead(item.id)}
                            >
                              읽음 처리
                            </Button>
                          ) : null}
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Clock3 className="h-4 w-4" />
                      최근 열람 ({viewHistory.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {viewHistory.length === 0 ? (
                      <p className="text-sm text-muted-foreground">열람 기록이 없습니다.</p>
                    ) : (
                      viewHistory.map((item) => {
                        const opportunity = opportunityMap[item.opportunityId]
                        return (
                          <div key={item.id} className="rounded-lg border p-3">
                            <Link
                              href={`/grants/${item.opportunityId}`}
                              className="text-sm font-semibold hover:underline"
                            >
                              {opportunity?.title ?? item.opportunityId}
                            </Link>
                            <p className="mt-1 text-xs text-muted-foreground">
                              열람일 {formatDate(item.viewedAt)}
                            </p>
                          </div>
                        )
                      })
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          ) : null}
        </Tabs>
      </div>
    </main>
  )
}
