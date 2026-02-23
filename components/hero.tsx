"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { ConsultModal } from "@/components/consult-modal"
import { ServicePartnerModal } from "@/components/service-partner-modal"

export function Hero() {
  const [openConsult, setOpenConsult] = useState(false)
  const [openPartner, setOpenPartner] = useState(false)

  return (
    <>
      {/* 상단/하단 여백 */}
      <section className="relative px-6 pt-14 pb-10 md:pt-18 md:pb-14">

        {/* 히어로 박스 */}
        <div className="relative mx-auto w-full max-w-6xl h-[380px] md:h-[420px] rounded-3xl overflow-hidden">

          {/* Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
            <div className="max-w-3xl">

              {/* 🔵 수정된 헤드라인 */}
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                일본 수출, 방향을 먼저 정리하세요
              </h1>

              {/* 🔵 수정된 서브카피 */}
              <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 md:text-base leading-relaxed">
                시장 구조부터 실행 파트너까지,
                <br className="hidden sm:block" />
                필요한 정보를 한 곳에서 확인할 수 있습니다.
              </p>

              {/* 버튼 영역 */}
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">

                <button
                  onClick={() => setOpenConsult(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  브랜드 상담하기
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setOpenPartner(true)}
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  서비스 기업 참여하기
                </button>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 모달 */}
      {openConsult && (
        <ConsultModal
          service=""
          onClose={() => setOpenConsult(false)}
        />
      )}

      {openPartner && (
        <ServicePartnerModal
          onClose={() => setOpenPartner(false)}
        />
      )}
    </>
  )
}