"use client"



import Link from "next/link"

import { ArrowRight } from "lucide-react"

import { diagnosisLabels } from "@/data/site"



export function Hero() {

  return (

    <section className="relative px-6 pt-14 pb-10 md:pt-18 md:pb-14">

      <div className="relative mx-auto h-[400px] w-full max-w-6xl overflow-hidden rounded-3xl md:h-[440px]">

        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/80" />



        <div className="absolute inset-0 bg-black/40" />



        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-medium tracking-wide text-white/70">

              Japan Expansion Hub

              <span className="mx-2 opacity-50">·</span>

              일본 진출 허브

            </p>



            <h1 className="text-3xl font-bold leading-snug sm:text-4xl md:text-5xl md:leading-tight">

              일본 진출,

              <br />

              어디서부터 시작해야 할지

              <br className="hidden sm:block" />

              고민이라면

            </h1>



            <p className="mx-auto mt-5 max-w-lg text-sm text-white/85 md:text-base">

              린코라가 가장 적합한 진출 전략과 전문가를 함께 설계합니다.

              <br className="hidden sm:block" />

              서비스를 판매하지 않고, 브랜드 상황에 맞는 방향을 안내합니다.

            </p>



            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <Link

                href="/expansion/assessment"

                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"

              >

                {diagnosisLabels.primary}

                <ArrowRight className="h-4 w-4" />

              </Link>



              <Link

                href="/expansion"

                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"

              >

                Japan Expansion Hub

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}


