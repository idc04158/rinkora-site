"use client"

import { useState } from "react"

export function BusinessActions({
  businessId,
  onCompleted,
}: {
  businessId: string
  onCompleted?: () => void
}) {
  const [reason, setReason] = useState("")
  const [message, setMessage] = useState("")

  const approve = async () => {
    const response = await fetch("/api/admin/businesses", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, action: "approve" }),
    })
    const data = await response.json()
    setMessage(response.ok ? "승인 완료" : data.message ?? "승인 실패")
    if (response.ok) onCompleted?.()
  }

  const reject = async () => {
    const response = await fetch("/api/admin/businesses", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, action: "reject", rejectedReason: reason }),
    })
    const data = await response.json()
    setMessage(response.ok ? "반려 완료" : data.message ?? "반려 실패")
    if (response.ok) onCompleted?.()
  }

  return (
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={approve}
          className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
        >
          승인
        </button>
        <button
          type="button"
          onClick={reject}
          className="rounded-lg border border-destructive px-3 py-2 text-xs font-semibold text-destructive"
        >
          반려
        </button>
      </div>
      <input
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="반려 사유"
        className="h-9 w-full rounded-lg border bg-background px-2 text-xs"
      />
      {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}
    </div>
  )
}
