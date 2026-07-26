"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function GrowthHero() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const keyword = query.trim()
    const params = new URLSearchParams()
    if (keyword) params.set("q", keyword)
    const queryString = params.toString()
    router.push(queryString ? `/grants?${queryString}` : "/grants")
  }

  return (
    <section className="relative px-6 pt-14 pb-10 md:pt-18 md:pb-14">
      <div className="relative mx-auto h-[400px] w-full max-w-6xl overflow-hidden rounded-3xl md:h-[440px]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/80" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium tracking-wide text-white/70">
              Rinkora Grants Search
              <span className="mx-2 opacity-50">·</span>
              지원사업 검색 서비스
            </p>
            <h1 className="text-3xl font-bold leading-snug sm:text-4xl md:text-5xl md:leading-tight">
              지원사업 검색부터
              <br />
              AI 추천과 신청서 작성 지원까지
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-white/85 md:text-base">
              린코라에서 우리 기업에 맞는 공고를 찾고,
              <br className="hidden sm:block" />
              AI 추천과 신청 준비를 한 번에 시작하세요.
            </p>

            <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label htmlFor="home-grants-search" className="sr-only">
                지원사업 검색
              </label>
              <input
                id="home-grants-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="예: AI 바우처, 창업, 수출"
                className="h-11 flex-1 rounded-xl border border-white/30 bg-white/95 px-4 text-sm text-slate-900 outline-none ring-primary transition focus:ring-2"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                지원사업 검색
              </button>
            </form>

            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/grants"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                지원사업 검색
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                무료로 시작하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
