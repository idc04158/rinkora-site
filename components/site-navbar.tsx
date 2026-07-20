"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useAuthSession } from "@/components/auth/auth-provider"
import { mainNavigation } from "@/data/site"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { profile, logout } = useAuthSession()
  const isLoggedIn = profile.role !== "guest"
  const creditLabel =
    profile.aiCredits > 0
      ? `AI 조회권 ${profile.aiCredits}회 남음`
      : "조회권이 부족합니다."
  const navigationItems = isLoggedIn
    ? mainNavigation.filter((item) => item.label !== "로그인")
    : mainNavigation

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-primary">
            Rinkora
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/grants"
              className="rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted"
            >
              지원사업 찾기
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/ai/recommend"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  {creditLabel}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-muted"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/auth/signup"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                무료로 시작하기
              </Link>
            )}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                type="button"
                className="rounded-lg p-2 hover:bg-muted"
                aria-label="메뉴 열기"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Rinkora</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/grants"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border px-4 py-3 text-center text-sm font-semibold"
                >
                  지원사업 찾기
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/ai/recommend"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      {creditLabel}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        void logout()
                        setMobileOpen(false)
                      }}
                      className="rounded-lg border px-4 py-3 text-sm font-semibold"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    무료로 시작하기
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}
