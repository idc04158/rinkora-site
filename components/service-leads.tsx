"use client"

import { useState } from "react"
import {
  Truck,
  Megaphone,
  Building2,
  ShieldCheck,
  Store,
  ArrowRight,
} from "lucide-react"

import { ConsultModal } from "@/components/consult-modal"

const services = [
  {
    title: "물류 · 3PL 점검",
    description: "현지 물류 구조 및 계약 조건을 확인합니다.",
    icon: Truck,
  },
  {
    title: "일본 마케팅 전략",
    description: "플랫폼 운영 및 광고 집행 구조를 진단합니다.",
    icon: Megaphone,
  },
  {
    title: "법인 설립 · 현지화",
    description: "현지 법인 설립 및 운영 체계를 검토합니다.",
    icon: Building2,
  },
  {
    title: "인증 · 통관",
    description: "카테고리별 규정 및 통관 리스크를 점검합니다.",
    icon: ShieldCheck,
  },
  {
    title: "유통 · 입점 전략",
    description: "오프라인 및 온라인 유통 채널을 설계합니다.",
    icon: Store,
  },
]

export function ServiceLeads() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <>
      <section className="px-6 py-32 bg-white border-t">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <p className="text-sm font-medium text-primary tracking-wide">
              NEXT STEP
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-snug">
              지금 필요한 영역부터 확인해보세요
            </h2>

            <p className="mt-6 text-muted-foreground leading-relaxed">
              이미 진출했든, 이제 시작하든
              점검해야 할 영역은 다릅니다.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => {
              const Icon = service.icon

              return (
                <button
                  key={service.title}
                  onClick={() => setSelectedService(service.title)}
                  className="group rounded-2xl border bg-white p-8 text-left transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">

                      <h3 className="text-lg font-semibold">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                        점검 시작하기
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>

                    </div>
                  </div>
                </button>
              )
            })}

          </div>

          {/* 바우처 강조 박스 */}
          <div className="mt-20 rounded-3xl border bg-primary/5 p-10 text-center">

            <h3 className="text-xl font-semibold">
              정부 바우처 활용 가능 여부도 함께 확인해보세요
            </h3>

            <p className="mt-4 text-muted-foreground">
              수출 지원 사업과 연계 가능한 파트너 여부를
              상담 시 함께 안내드립니다.
            </p>

            <button
              onClick={() => setSelectedService("바우처 활용")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
            >
              바우처 가능 여부 확인하기
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

        </div>
      </section>

      {selectedService && (
        <ConsultModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  )
}