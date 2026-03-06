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
      <section className="relative px-6 pt-14 pb-10 md:pt-18 md:pb-14">
        <div className="relative mx-auto w-full max-w-6xl h-[420px] md:h-[460px] rounded-3xl overflow-hidden">

          {/* Background Video */}
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
                일본 수출, 방향을 먼저 정리하세요
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base text-white/85 leading-relaxed">
                아마존, 라쿠텐, 각종 리포트까지 정보는 넘쳐납니다.
                <br className="hidden sm:block" />
                지금 위치에서 무엇을 점검해야 할지 함께 정리해보세요.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                <button
                  onClick={() => setOpenConsult(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  현재 단계 점검하기
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setOpenPartner(true)}
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  파트너 정보 보기
                </button>

              </div>

            </div>
          </div>
        </div>
      </section>

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