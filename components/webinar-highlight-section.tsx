"use client"

import { useState } from "react"

export function WebinarHighlightSection() {
  const [pastIndex, setPastIndex] = useState(0)

  const nextWebinar = {
    title: "2026 일본 이커머스 트렌드 분석",
    date: "2026.03.15",
    description:
      "최근 플랫폼 정책, 광고 구조 변화, 물류비 동향을 종합적으로 정리합니다.",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    speakers: ["IARC 리서치", "Collaboticket"],
  }

  return (
    <section className="px-6 py-32 bg-[#0f172a] text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between max-w-4xl">
          <div>
            <p className="text-sm font-medium text-blue-400 tracking-wide">
              WEBINAR SERIES
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              데이터 기반 일본 수출 세미나
            </h2>
          </div>

          {/* ✅ 전체 웨비나 페이지 이동 */}
          <a
            href="/webinars"
            className="text-sm text-blue-400 hover:underline"
          >
            전체 아카이브 보기 →
          </a>
        </div>

        {/* NEXT WEBINAR */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-gray-700 bg-gradient-to-br from-[#1e293b] to-[#111827]">
          <div className="grid md:grid-cols-2">

            <div className="relative h-[320px] md:h-auto">
              <img
                src={nextWebinar.thumbnail}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="p-12">
              <p className="text-sm text-blue-400">
                다음 웨비나 · {nextWebinar.date}
              </p>

              <h3 className="mt-5 text-2xl font-semibold">
                {nextWebinar.title}
              </h3>

              <p className="mt-6 text-gray-400">
                {nextWebinar.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {nextWebinar.speakers.map((speaker, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-blue-400 text-blue-400 rounded-full text-sm"
                  >
                    {speaker}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
                <button className="bg-primary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                  참가 신청하기
                </button>

                {/* ✅ 상세 페이지 이동 */}
                <a
                  href="/webinars"
                  className="border border-gray-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                >
                  세미나 정리 보기
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* PAST WEBINARS */}
        <div className="mt-24">

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              지난 세미나 아카이브
            </h3>

            <a
              href="/webinars"
              className="text-sm text-blue-400 hover:underline"
            >
              전체 보기 →
            </a>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  setPastIndex((prev) =>
                    prev === 0 ? pastWebinars.length - 1 : prev - 1
                  )
                }
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
              >
                ◀
              </button>

              <button
                onClick={() =>
                  setPastIndex((prev) =>
                    prev === pastWebinars.length - 1 ? 0 : prev + 1
                  )
                }
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="mt-10 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${pastIndex * 100}%)`,
              }}
            >
              {pastWebinars.map((item, i) => (
                <div
                  key={i}
                  className="min-w-full md:min-w-[33%] pr-6"
                >
                  <div className="rounded-2xl border border-gray-700 overflow-hidden bg-[#111827] hover:bg-[#1e293b] transition">

                    <div className="relative h-48">
                      <img
                        src={item.thumbnail}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-4xl">
                        ▶
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-sm text-gray-400">
                        {item.date}
                      </p>
                      <p className="mt-3 font-medium">
                        {item.title}
                      </p>
                      <p className="mt-4 text-sm text-blue-400">
                        발표사: {item.speaker}
                      </p>

                      <a
                        href="/webinars"
                        className="mt-4 inline-block text-sm text-blue-400 hover:underline"
                      >
                        주요 내용 정리 보기 →
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

const pastWebinars = [
  {
    title: "라쿠텐 광고 구조 분석",
    date: "2026.02.10",
    speaker: "Rakuten Ads",
    thumbnail: "https://images.unsplash.com/photo-1559526324-593bc073d938",
  },
  {
    title: "일본 물류비 구조",
    date: "2025.12.18",
    speaker: "Japan 3PL Network",
    thumbnail: "https://images.unsplash.com/photo-1581090700227-1e8b50f5a7a0",
  },
  {
    title: "정부 바우처 활용 전략",
    date: "2025.11.22",
    speaker: "수출 컨설턴트",
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
  },
]