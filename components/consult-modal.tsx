"use client"

import { useEffect, useState } from "react"

type Props = {
  service?: string
  onClose: () => void
}

const serviceOptions = [
  "물류",
  "마케팅",
  "법인 설립",
  "인증 / 통관",
  "유통 입점",
]

export function ConsultModal({ service = "", onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // 서비스 자동 선택 (카드에서 열었을 때)
  useEffect(() => {
    if (service) {
      setSelectedService(service)
    }
  }, [service])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedService) {
      alert("필요 서비스를 선택해주세요.")
      return
    }

    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      status: formData.get("status"),
      service: selectedService,
    }

    try {
      const res = await fetch("/api/consult", {
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
      onClick={onClose} // 🔥 배경 클릭 시 닫기
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8"
        onClick={(e) => e.stopPropagation()} // 🔥 내부 클릭은 닫기 방지
      >
        {!submitted ? (
          <>
            <h2 className="text-xl font-bold">
              상담 신청
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              <input
                name="name"
                required
                placeholder="이름"
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
                  일본 진출 여부
                </p>

                <div className="space-y-1 text-sm">
                  <label className="block">
                    <input type="radio" name="status" value="이미 진출" required /> 이미 진출
                  </label>
                  <label className="block">
                    <input type="radio" name="status" value="준비 중" required /> 준비 중
                  </label>
                  <label className="block">
                    <input type="radio" name="status" value="검토 단계" required /> 검토 단계
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">
                  필요 서비스
                </p>

                <select
                  required
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-lg border px-4 py-2"
                >
                  <option value="" disabled>
                    필요 서비스를 선택해주세요
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
              >
                {loading ? "전송 중..." : "상담 신청하기"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">
              상담 신청 완료
            </h2>

            <p className="mt-4 text-sm text-gray-600">
              24시간 이내 담당자가 연락드립니다.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="/ebook.pdf"
                download
                className="block w-full rounded-lg border py-3 text-center"
              >
                일본 3대 플랫폼 분석 가이드 받기
              </a>

              <a
                href="https://event-us.kr/kjbiz/event"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-black py-3 text-center text-white"
              >
                관련 웨비나 신청하기
              </a>
            </div>

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