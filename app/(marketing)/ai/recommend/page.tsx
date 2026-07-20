"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthSession } from "@/components/auth/auth-provider"

const tiers = [
  { role: "비회원", quota: "0회", action: "회원가입 필요" },
  { role: "회원", quota: "3회", action: "기본 조회권" },
  { role: "인증기업", quota: "30회", action: "확장 조회권" },
] as const

export default function AiRecommendPage() {
  const router = useRouter()
  const { profile, consumeAiCredit } = useAuthSession()
  const [answer, setAnswer] = useState("")
  const [message, setMessage] = useState("")

  const progressiveQuestions = useMemo(
    () => [
      { key: "industry", label: "업종", helper: "업종을 입력하면 추천 정확도가 올라갑니다." },
      { key: "employeeCount", label: "직원수", helper: "기업 규모를 알면 맞춤 공고를 좁힐 수 있습니다." },
      { key: "revenueBand", label: "매출 구간", helper: "재무 규모에 맞는 공고를 우선 추천합니다." },
      { key: "exportPlan", label: "수출 계획", helper: "해외진출 의향을 반영해 공고를 제안합니다." },
      { key: "interestField", label: "관심 분야", helper: "관심 분야 기반 알림과 추천을 강화합니다." },
    ],
    []
  )

  const currentQuestion =
    progressiveQuestions[profile.profileStep] ?? progressiveQuestions[progressiveQuestions.length - 1]

  const handleRecommend = async () => {
    if (profile.role === "guest") {
      router.push("/auth/signup")
      return
    }

    try {
      await consumeAiCredit(
        answer.trim()
          ? { key: currentQuestion.key, value: answer.trim() }
          : undefined
      )
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "조회권이 부족합니다. 사업자 인증 또는 추천인 혜택으로 조회권을 늘려주세요."
      )
      return
    }

    setAnswer("")
    setMessage("추천 결과가 갱신되었습니다. 다음 추천에서 추가 정보를 입력하면 정확도가 더 높아집니다.")
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-2xl border bg-card p-8">
          <p className="text-sm font-semibold tracking-wide text-primary">AI 추천</p>
          <h1 className="mt-3 text-3xl font-bold leading-snug md:text-4xl">
            우리 회사에 맞는 지원사업을
            <br />
            AI로 추천받으세요
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            추천을 진행하며 업종, 직원수, 매출 구간 등 필요한 정보만 점진적으로 입력합니다.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article key={tier.role} className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-sm font-semibold text-muted-foreground">{tier.role}</p>
              <p className="mt-2 text-3xl font-bold text-primary">{tier.quota}</p>
              <p className="mt-2 text-sm text-muted-foreground">{tier.action}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            현재 권한:{" "}
            <strong className="text-foreground">
              {profile.role === "guest"
                ? "비회원"
                : profile.role === "member"
                  ? "회원"
                  : "인증기업"}
            </strong>{" "}
            · 남은 조회권: <strong className="text-primary">{profile.aiCredits}회</strong>
          </p>
        </section>

        <section className="mt-6 rounded-2xl border bg-card p-8">
          <h2 className="text-xl font-semibold">추천 시작 (데모 플로우)</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            1회 추천마다 필요한 정보 1개만 추가로 입력받습니다.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={`${currentQuestion.label} 입력`}
              className="h-11 rounded-xl border bg-background px-3 text-sm outline-none ring-primary transition focus:ring-2"
            />
            <button
              type="button"
              onClick={handleRecommend}
              className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              다음 추천 보기
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{currentQuestion.helper}</p>
          {message ? <p className="mt-3 text-sm text-primary">{message}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/grants/saved" className="rounded-lg border px-3 py-2 text-xs font-semibold">
              저장한 공고 보기
            </Link>
            <Link
              href="/services"
              className="rounded-lg border px-3 py-2 text-xs font-semibold"
            >
              신청 가이드 보기
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
