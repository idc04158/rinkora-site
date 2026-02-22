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
      {/* 🔥 상단/하단 여백 축소 */}
      <section className="relative px-6 pt-14 pb-10 md:pt-18 md:pb-14">

        {/* 🔥 히어로 높이 축소 (과하게 크지 않게) */}
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

              <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                일본 수출, 더 빠르게 연결됩니다
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 md:text-base">
                일본 수출을 준비하는 한국 브랜드와
                검증된 수출 지원 기업을 매칭합니다.
              </p>

              {/* 🔥 버튼 간격 정리 */}
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

      {/* ✅ 모달은 section 밖 유지 (레이아웃 영향 없음) */}
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