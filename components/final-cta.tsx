"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { ConsultModal } from "@/components/consult-modal"
import { ServicePartnerModal } from "@/components/service-partner-modal"

export function FinalCTA() {
  const [openConsult, setOpenConsult] = useState(false)
  const [openPartner, setOpenPartner] = useState(false)

  return (
    <>
      <section
        id="cta"
        className="scroll-mt-24 px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl bg-primary px-8 py-16 text-center md:px-16 md:py-20">

            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              일본 수출, 지금 시작하세요
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/80">
              린코라는 검증된 실행 네트워크와 함께
              브랜드의 일본 시장 진출을 설계하고 실행합니다.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              {/* 브랜드 상담 버튼 */}
              <button
                onClick={() => setOpenConsult(true)}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:opacity-90"
              >
                브랜드 상담하기
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* 서비스 기업 참여 버튼 */}
              <button
                onClick={() => setOpenPartner(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                서비스 기업 참여하기
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 브랜드 상담 모달 */}
      {openConsult && (
        <ConsultModal
          service=""
          onClose={() => setOpenConsult(false)}
        />
      )}

      {/* 서비스 기업 모달 */}
      {openPartner && (
        <ServicePartnerModal
          onClose={() => setOpenPartner(false)}
        />
      )}
    </>
  )
}