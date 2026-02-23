import type { Metadata, Viewport } from "next"
import { Noto_Sans_KR, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rinkorab2b.com"),

  title: {
    default: "일본 수출, 방향을 먼저 정리하세요 | Rinkora",
    template: "%s | Rinkora",
  },

  description:
    "시장 구조부터 실행 파트너까지, 일본 수출에 필요한 정보를 한 곳에서 확인할 수 있습니다. Rinkora는 신뢰할 수 있는 실행 네트워크 정보를 제공합니다.",

  keywords: [
    "일본 수출",
    "일본 진출",
    "일본 시장 조사",
    "아마존 재팬",
    "일본 B2B",
    "수출 파트너",
  ],

  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "일본 수출, 방향을 먼저 정리하세요",
    description:
      "시장 구조부터 실행 파트너까지, 일본 수출에 필요한 정보를 한 곳에서 확인할 수 있습니다.",
    url: "https://www.rinkorab2b.com",
    siteName: "Rinkora",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rinkora - 일본 수출 정보 플랫폼",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "일본 수출, 방향을 먼저 정리하세요",
    description:
      "시장 구조부터 실행 파트너까지, 일본 수출에 필요한 정보를 한 곳에서 확인할 수 있습니다.",
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body
        className={`${_notoSansKR.variable} ${_inter.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}