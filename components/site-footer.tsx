import Link from "next/link"
import { brand, footerNavigation } from "@/data/site"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="text-sm font-medium text-primary">
              {brand.taglineKo}
            </p>
            <h3 className="mt-1 text-xl font-bold">{brand.nameKo}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              린코라는 기업 성장에 필요한 기회를 연결합니다.
              <br className="hidden lg:block" />
              지원사업 검색부터 AI 추천, 전문가 매칭, 해외진출까지 이어집니다.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Growth Platform</h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.growth.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Content & Company</h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.content.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerNavigation.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              서울시 마포구 포은로8길 29, 477
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <a
                href="mailto:partner@rinkorab2b.com"
                className="underline hover:text-primary"
              >
                partner@rinkorab2b.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              이용약관
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
