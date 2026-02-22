"use client"

import { useEffect, useState } from "react"

type Props = {
  onClose: () => void
}

const serviceFields = [
  "물류",
  "마케팅",
  "법인 설립",
  "인증 / 통관",
  "유통 입점",
]


export function ServicePartnerModal({ onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  // ESC로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedFields.length === 0) {
      alert("제공 서비스 분야를 선택해주세요.")
      return
    }

    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      fields: selectedFields.join(", "),
      intro: formData.get("intro"),
    }

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed")

      setSubmitted(true)
    } catch (error) {
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
            <h2 className="text-xl font-bold">
              서비스 기업 참여 신청
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              <input
                name="name"
                required
                placeholder="담당자 이름"
                className="w-full rounded-lg border px-4 py-2"
              />

              <input
                name="email"
                required
                type="email"
                placeholder="이메일"
                className="w-full rounded-lg border px-4 py-2"
              />

              <input
                name="company"
                required
                placeholder="회사명"
                className="w-full rounded-lg border px-4 py-2"
              />

              <div>
                <p className="mb-2 text-sm font-medium">
                  제공 서비스 분야 (복수 선택 가능)
                </p>

                <div className="flex flex-wrap gap-2">
                  {serviceFields.map((field) => (
                    <button
                      type="button"
                      key={field}
                      onClick={() => toggleField(field)}
                      className={`rounded-full px-3 py-1 text-sm border transition ${
                        selectedFields.includes(field)
                          ? "bg-primary text-white border-primary"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                name="intro"
                required
                placeholder="회사 소개 및 주요 강점"
                className="w-full rounded-lg border px-4 py-2 h-24"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
              >
                {loading ? "전송 중..." : "참여 신청하기"}
              </button>

            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">
              신청 완료
            </h2>

<p className="mt-4 text-sm text-gray-600 whitespace-pre-line">
  신청해주셔서 감사합니다.
  {"\n"}
  확인 후 개별 연락드리겠습니다.
</p>
            <button
              onClick={onClose}
              className="mt-6 w-full text-sm text-gray-500"
            >
              닫기
            </button>
          </>
        )}
      </div>
    </div>
  )
}