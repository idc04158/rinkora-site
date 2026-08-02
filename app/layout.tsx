import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from "@/components/auth/auth-provider"
import AnalyticsTracker from "@/components/analytics/analytics-tracker"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import './globals.css'

export const metadata: Metadata = {
  title: 'Rinkora | 기업 성장 기회 플랫폼',
  description:
    '린코라는 지원사업 검색부터 AI 추천, 전문가 매칭, 해외진출까지 이어지는 기업 성장 기회 플랫폼입니다.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <AnalyticsTracker />
          <GoogleAnalytics />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
