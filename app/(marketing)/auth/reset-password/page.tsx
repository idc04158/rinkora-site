"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"

function ResetPasswordContent() {
  const params = useSearchParams()
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const token = params.get("token") ?? ""

  const handleSubmit = async () => {
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await response.json()
    setMessage(data.message ?? (response.ok ? "변경 완료" : "오류"))
  }

  return (
    <main className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-md rounded-2xl border bg-card p-8">
        <p className="text-sm font-semibold tracking-wide text-primary">비밀번호 재설정</p>
        <h1 className="mt-3 text-2xl font-bold">새 비밀번호 입력</h1>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-5 h-11 w-full rounded-xl border bg-background px-3 text-sm"
          placeholder="새 비밀번호 (8자 이상)"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-3 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          재설정하기
        </button>
        {message ? <p className="mt-3 text-sm text-muted-foreground">{message}</p> : null}
      </div>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  )
}
