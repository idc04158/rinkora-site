"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthSession } from "@/components/auth/auth-provider"

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuthSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSignup = async () => {
    const normalized = email.trim()
    if (!normalized || password.length < 8) {
      setError("이메일과 8자 이상 비밀번호를 입력해주세요.")
      return
    }
    try {
      await signup(normalized, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.")
      return
    }
    router.push("/grants")
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-md rounded-2xl border bg-card p-8">
        <p className="text-sm font-semibold tracking-wide text-primary">회원가입</p>
        <h1 className="mt-3 text-2xl font-bold">무료로 시작하세요</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          가입 직후에는 최소 정보만 받고, 기업 정보는 서비스 이용 과정에서 단계적으로 수집합니다.
        </p>
        <form className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none ring-primary transition focus:ring-2"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none ring-primary transition focus:ring-2"
          />
          <button
            type="button"
            onClick={handleSignup}
            className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            회원가입
          </button>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          이미 계정이 있나요?{" "}
          <Link href="/auth/login" className="font-semibold text-primary">
            로그인
          </Link>
        </p>
      </div>
    </main>
  )
}
