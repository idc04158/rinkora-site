"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

// Providers will later be fetched from Apify crawler

const slugToCategory: Record<string, string> = {
  strategy: "시장 진입 전략",
  marketing: "마케팅 / PR",
  ecommerce: "이커머스",
  logistics: "물류",
  creative: "제작 / 디자인",
  legal: "법률 / 행정",
  offline: "전시 / 팝업",
}

type Provider = {
  id: string
  name: string
  country: "Korea" | "Japan" | "Overseas"
  category: string
  description: string
  services: string[]
  website: string
  logo?: string
}

const categories = [
  "시장 진입 전략",
  "마케팅 / PR",
  "이커머스",
  "물류",
  "제작 / 디자인",
  "법률 / 행정",
  "전시 / 팝업",
] as const

const providers: Provider[] = [
  {
    id: "1",
    name: "Tokyo CrossBorder Consulting",
    country: "Japan",
    category: "시장 진입 전략",
    description: "일본 시장 진입 전략과 유통 파트너 발굴을 지원합니다.",
    services: ["시장 조사", "유통 파트너 발굴", "시장 진입 전략"],
    website: "https://example.com",
  },
  {
    id: "2",
    name: "Rakuten Commerce Agency",
    country: "Japan",
    category: "이커머스",
    description: "라쿠텐, 아마존 일본 운영 대행 전문 에이전시.",
    services: ["라쿠텐 운영", "Amazon Japan 운영", "광고 관리"],
    website: "https://example.com",
  },
  {
    id: "3",
    name: "Seoul Japan Logistics",
    country: "Korea",
    category: "물류",
    description: "한일 크로스보더 물류 및 3PL 통합 솔루션.",
    services: ["한일 배송", "통관 대행", "재고 관리"],
    website: "https://example.com",
  },
  {
    id: "4",
    name: "K-Beauty Japan Partners",
    country: "Korea",
    category: "마케팅 / PR",
    description: "일본 시장 K-뷰티 브랜드 마케팅 및 PR 전문.",
    services: ["인플루언서 마케팅", "PR 배포", "SNS 운영"],
    website: "https://example.com",
  },
  {
    id: "5",
    name: "Osaka Creative Studio",
    country: "Japan",
    category: "제작 / 디자인",
    description: "일본 시장 맞춤 패키지 디자인 및 콘텐츠 제작.",
    services: ["패키지 디자인", "사진 촬영", "동영상 제작"],
    website: "https://example.com",
  },
  {
    id: "6",
    name: "Tokyo Legal Advisors",
    country: "Japan",
    category: "법률 / 행정",
    description: "일본 법인 설립, 인증, 통관 법률 자문.",
    services: ["법인 설립", "인증 대행", "통관 자문"],
    website: "https://example.com",
  },
  {
    id: "7",
    name: "Japan Pop-up Events",
    country: "Japan",
    category: "전시 / 팝업",
    description: "일본 전시회 및 팝업 스토어 기획·운영.",
    services: ["전시회 부스", "팝업 스토어", "이벤트 기획"],
    website: "https://example.com",
  },
  {
    id: "8",
    name: "Global Ecommerce Solutions",
    country: "Overseas",
    category: "이커머스",
    description: "글로벌 이커머스 플랫폼 통합 운영.",
    services: ["멀티채널 운영", "재고 동기화", "결제 연동"],
    website: "https://example.com",
  },
  {
    id: "9",
    name: "Busan Japan Entry",
    country: "Korea",
    category: "시장 진입 전략",
    description: "식품·뷰티 카테고리 일본 시장 진입 컨설팅.",
    services: ["시장 분석", "입점 전략", "파트너 매칭"],
    website: "https://example.com",
  },
  {
    id: "10",
    name: "Tokyo 3PL Network",
    country: "Japan",
    category: "물류",
    description: "일본 국내 물류 및 FBA 대행 전문.",
    services: ["FBA 대행", "국내 배송", "반품 처리"],
    website: "https://example.com",
  },
  {
    id: "11",
    name: "Seoul Design Lab",
    country: "Korea",
    category: "제작 / 디자인",
    description: "일본 시장용 로컬라이징 디자인 전문.",
    services: ["로고 디자인", "브랜드 가이드", "제품 사진"],
    website: "https://example.com",
  },
  {
    id: "12",
    name: "Influencer Japan Agency",
    country: "Japan",
    category: "마케팅 / PR",
    description: "일본 인플루언서 마케팅 및 체험단 운영.",
    services: ["인플루언서 매칭", "체험단 운영", "UGC 제작"],
    website: "https://example.com",
  },
]

function countryBadge(country: Provider["country"]) {
  const map = { Korea: "한국", Japan: "일본", Overseas: "해외" } as const
  return map[country]
}

function ServicesPageContent() {
  const params = useSearchParams()
  const slug = params.get("category")
  const initialCategory = slug && slugToCategory[slug] ? slugToCategory[slug] : null
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [detailProvider, setDetailProvider] = useState<Provider | null>(null)
  const [consultProvider, setConsultProvider] = useState<Provider | null>(null)

  useEffect(() => {
    const s = params.get("category")
    const cat = s && slugToCategory[s] ? slugToCategory[s] : null
    setSelectedCategory(cat)
  }, [params])

  const filtered =
    selectedCategory === null
      ? providers
      : providers.filter((p) => p.category === selectedCategory)

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Hero */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-blue-500">SERVICE MARKETPLACE</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          일본 시장 진출 서비스
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          검증된 파트너와 함께 일본 시장 진출을 준비하세요.
        </p>
      </section>

      {/* Category Toggle */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700">카테고리</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              selectedCategory === null
                ? "border-blue-200 bg-blue-50 text-blue-600"
                : "border-slate-200 hover:border-blue-200 hover:text-blue-500"
            }`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedCategory === cat
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 hover:border-blue-200 hover:text-blue-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Provider List */}
      <section className="mt-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onDetail={() => setDetailProvider(provider)}
              onConsult={() => setConsultProvider(provider)}
            />
          ))}
        </div>
      </section>

      {/* Provider Detail Modal */}
      {detailProvider && (
        <ProviderDetailModal
          provider={detailProvider}
          onClose={() => setDetailProvider(null)}
          onConsult={() => {
            setDetailProvider(null)
            setConsultProvider(detailProvider)
          }}
        />
      )}

      {/* Consultation Modal */}
      {consultProvider && (
        <ConsultationModal
          provider={consultProvider}
          onClose={() => setConsultProvider(null)}
        />
      )}
    </main>
  )
}

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesPageContent />
    </Suspense>
  )
}

function ProviderCard({
  provider,
  onDetail,
  onConsult,
}: {
  provider: Provider
  onDetail: () => void
  onConsult: () => void
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="flex h-32 items-center justify-center bg-slate-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-500">
          {provider.name.charAt(0)}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-slate-900">{provider.name}</h3>
          <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
            {countryBadge(provider.country)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-slate-600">{provider.description}</p>
        <div className="flex flex-wrap gap-1">
          {provider.services.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          연락처는 상담 요청 후 제공됩니다.
        </p>
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onDetail}
            className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-500"
          >
            상세 보기
          </button>
          <button
            type="button"
            onClick={onConsult}
            className="flex-1 rounded-lg bg-blue-500 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
          >
            상담 요청
          </button>
        </div>
      </div>
    </article>
  )
}

function ProviderDetailModal({
  provider,
  onClose,
  onConsult,
}: {
  provider: Provider
  onClose: () => void
  onConsult: () => void
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-lg font-bold text-slate-600">
              {provider.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{provider.name}</h2>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
                {countryBadge(provider.country)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">회사 소개</h3>
            <p className="mt-2 text-sm text-slate-600">{provider.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">제공 서비스</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {provider.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700">주요 고객 / 사례</h3>
            <p className="mt-2 text-sm text-slate-500">(준비 중)</p>
          </div>

          <div>
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              회사 홈페이지 →
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={onConsult}
          className="mt-8 w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-600"
        >
          상담 요청
        </button>
      </div>
    </div>
  )
}

function ConsultationModal({
  provider,
  onClose,
}: {
  provider: Provider
  onClose: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      const payload = Object.fromEntries(formData.entries())
      payload.providerId = provider.id
      payload.providerName = provider.name

      const res = await fetch("/api/services-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
    } catch {
      alert("전송 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            <h2 className="text-xl font-bold text-slate-900">
              상담 요청
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              린코라가 적합한 파트너를 연결해드립니다.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                name="company"
                required
                placeholder="회사명"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
              />
              <input
                name="contact"
                required
                placeholder="담당자"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="이메일"
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
              />
              <textarea
                name="message"
                required
                placeholder="문의 내용"
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  필요한 서비스 카테고리
                </label>
                <select
                  name="category"
                  required
                  defaultValue={provider.category}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-500 py-3 font-medium text-white transition hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "전송 중..." : "상담 요청하기"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-slate-900">요청 완료</h2>
            <p className="mt-4 text-sm text-slate-600">
              24시간 이내 담당자가 연락드립니다.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg border border-slate-200 py-2 text-sm text-slate-600"
            >
              닫기
            </button>
          </>
        )}
      </div>
    </div>
  )
}
