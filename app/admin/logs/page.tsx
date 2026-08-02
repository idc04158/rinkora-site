 "use client"

import { useEffect, useState } from "react"

type AdminLogItem = {
  id: string
  action: string
  target: string
  admin: { email: string }
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLogItem[]>([])

  useEffect(() => {
    void fetch("/api/admin/logs", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setLogs(Array.isArray(data?.logs) ? data.logs : [])
      })
  }, [])

  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-semibold">관리자 로그</h2>
      <div className="mt-4 space-y-2 text-sm">
        {logs.map((log) => (
          <div key={log.id} className="rounded-xl border p-3">
            <p className="font-medium">{log.action}</p>
            <p className="text-muted-foreground">
              {log.admin.email} · {log.target}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
