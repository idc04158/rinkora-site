import Link from "next/link"
import { requireAdminPage } from "@/lib/auth/session"

const menus = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/users", label: "회원관리" },
  { href: "/admin/businesses", label: "사업자 인증" },
  { href: "/admin/programs", label: "지원사업 관리" },
  { href: "/admin/logs", label: "시스템 로그" },
] as const

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdminPage()

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-2xl border bg-card p-6">
          <p className="text-sm font-semibold text-primary">Rinkora Admin</p>
          <h1 className="mt-2 text-3xl font-bold">관리자 페이지</h1>
          <nav className="mt-5 flex flex-wrap gap-2">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition hover:text-primary"
              >
                {menu.label}
              </Link>
            ))}
          </nav>
        </header>
        <section className="mt-6">{children}</section>
      </div>
    </main>
  )
}
