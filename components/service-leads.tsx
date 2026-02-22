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
  { title: "물류", icon: Truck },
  { title: "마케팅", icon: Megaphone },
  { title: "법인 설립", icon: Building2 },
  { title: "인증 / 통관", icon: ShieldCheck },
  { title: "유통 입점", icon: Store },
]

export function ServiceLeads() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              분야별 바로 상담하기
            </h2>
            <p className="mt-4 text-muted-foreground">
              필요한 영역부터 빠르게 연결하세요.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <button
                  key={service.title}
                  onClick={() => setSelectedService(service.title)}
                  className="group rounded-2xl border bg-white p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">
                        {service.title}
                      </h3>

                      <p className="mt-2 flex items-center gap-1 text-sm font-medium text-primary">
                        상담 연결하기
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 모달 */}
      {selectedService && (
        <ConsultModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  )
}