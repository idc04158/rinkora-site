"use client"

import { useEffect, useState } from "react"

export function NewsFeedSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % news.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-6 py-28 bg-white border-t">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-primary tracking-wide">
              MARKET NEWS
            </p>

            <div className="mt-3 flex items-center gap-4">
              <h2 className="text-3xl font-bold">
                일본 수출 관련 뉴스
              </h2>

              <span className="flex items-center gap-2 text-xs text-primary font-medium">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                LIVE
              </span>
            </div>
          </div>

          <button className="text-sm font-semibold text-primary hover:underline transition">
            뉴스 더보기 →
          </button>
        </div>

        {/* Layout */}
        <div className="mt-16 grid gap-12 md:grid-cols-3">

          {/* Featured Article */}
          <div className="md:col-span-2 group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/news-sample.jpg"
                alt="featured news"
                className="h-[380px] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute bottom-0 p-10 text-white">
                <p className="text-xs uppercase tracking-wider opacity-80">
                  경제 · 2026.02.26
                </p>

                <h3 className="mt-3 text-2xl font-semibold leading-snug">
                  일본 EC 시장 성장률 둔화 조짐, 셀러 전략 조정 필요
                </h3>

                <p className="mt-4 text-sm opacity-80">
                  출처: Nikkei Asia
                </p>
              </div>
            </div>
          </div>

          {/* Rotating List */}
          <div className="relative h-[380px] overflow-hidden border-l pl-8">

            {/* Content */}
            <div
              className="transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateY(-${index * 120}px)`
              }}
            >
              {news.concat(news).map((item, i) => (
                <div key={i} className="h-[120px] flex flex-col justify-center border-b pb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {item.category} · {item.date}
                  </p>

                  <p className="mt-2 font-medium leading-snug">
                    {item.title}
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    출처: {item.source}
                  </p>
                </div>
              ))}
            </div>

            {/* Top Fade */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent" />

            {/* Bottom Blue Fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#eaf2ff] to-transparent" />

          </div>

        </div>

      </div>
    </section>
  )
}

const news = [
  {
    category: "플랫폼",
    title: "라쿠텐 광고 노출 알고리즘 일부 조정",
    source: "Rakuten 공식 공지",
    date: "2026.02.25",
  },
  {
    category: "물류",
    title: "일본 3PL 계약 조건 재조정 사례 증가",
    source: "Japan Logistics Report",
    date: "2026.02.24",
  },
  {
    category: "정책",
    title: "일본 수입 규정 일부 개정 발표",
    source: "일본 경제산업성",
    date: "2026.02.23",
  },
  {
    category: "소비 트렌드",
    title: "일본 Z세대 소비 패턴 변화 분석",
    source: "Nikkei Trend",
    date: "2026.02.22",
  },
]