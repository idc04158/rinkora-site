"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthSession } from "@/components/auth/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    const normalized = email.trim()
    if (!normalized || !password) {
      setError("이메일과 비밀번호를 입력해주세요.")
      return
    }
    try {
      await login(normalized, password)
      router.push("/grants")
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.")
    }
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-md rounded-2xl border bg-card p-8">
        <p className="text-sm font-semibold tracking-wide text-primary">로그인</p>
        <h1 className="mt-3 text-2xl font-bold">다시 오신 것을 환영합니다</h1>
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
            onClick={handleLogin}
            className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            로그인
          </button>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          계정이 없나요?{" "}
          <Link href="/auth/signup" className="font-semibold text-primary">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  )
}
