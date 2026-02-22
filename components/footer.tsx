"use client"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-12">

        {/* 회사 정보 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            B2B 전문 마케팅 에이전시
          </p>

          <h3 className="text-xl font-bold">
            린코라
          </h3>

          <p className="text-sm text-muted-foreground">
            서울시 마포구 포은로8길 29, 477
          </p>

          <p className="text-sm text-muted-foreground">
            E-mail:{" "}
            <a
              href="mailto:partner@rinkorab2b.com"
              className="underline hover:text-primary transition"
            >
              partner@rinkorab2b.com
            </a>
          </p>
        </div>

        {/* 하단 영역 */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* 기존 정책 링크 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-primary transition">
              이용약관
            </a>
          </div>

          {/* 저작권 */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rinkora. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  )
}