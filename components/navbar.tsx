"use client"

import { useState } from "react"
import { ConsultModal } from "@/components/consult-modal"
import { ServicePartnerModal } from "@/components/service-partner-modal"

export function Navbar() {
  const [brandOpen, setBrandOpen] = useState(false)
  const [partnerOpen, setPartnerOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <a href="/" className="text-lg font-bold text-primary">
            Rinkora
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#problem" className="hover:text-primary transition">
              일본 수출 구조
            </a>
            <a href="#how" className="hover:text-primary transition">
              진행 프로세스
            </a>
            <a href="#network" className="hover:text-primary transition">
              실행 네트워크
            </a>
            <a href="#why" className="hover:text-primary transition">
              린코라의 차별점
            </a>
          </nav>

          {/* CTA 영역 */}
          <div className="hidden md:flex items-center gap-3">

            {/* 서비스 기업 참여 */}
            <button
              onClick={() => setPartnerOpen(true)}
              className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition"
            >
              서비스 기업 참여
            </button>

            {/* 브랜드 상담 */}
            <button
              onClick={() => setBrandOpen(true)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              브랜드 상담하기
            </button>

          </div>

        </div>
      </header>

      {/* 브랜드 상담 모달 */}
      {brandOpen && (
        <ConsultModal
          service=""   // 기본값 비워둠 → 선택 필수
          onClose={() => setBrandOpen(false)}
        />
      )}

      {/* 서비스 기업 참여 모달 */}
      {partnerOpen && (
        <ServicePartnerModal
          onClose={() => setPartnerOpen(false)}
        />
      )}
    </>
  )
}