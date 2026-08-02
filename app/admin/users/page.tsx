 "use client"

import { useEffect, useMemo, useState } from "react"

type AdminUser = {
  id: string
  email: string
  role: string
  status: string
}

export default function AdminUsersPage() {
  const [query, setQuery] = useState("")
  const [users, setUsers] = useState<AdminUser[]>([])

  useEffect(() => {
    const search = query.trim()
    const url = search ? `/api/admin/users?q=${encodeURIComponent(search)}` : "/api/admin/users"
    void fetch(url, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUsers(Array.isArray(data?.users) ? data.users : [])
      })
  }, [query])

  const totalLabel = useMemo(() => `${users.length}명`, [users.length])

  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-semibold">회원관리</h2>
      <p className="mt-1 text-sm text-muted-foreground">조회 결과: {totalLabel}</p>
      <div className="mt-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="이메일 검색"
          className="h-10 w-full rounded-xl border bg-background px-3 text-sm sm:max-w-sm"
        />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between rounded-xl border p-3">
            <span>{user.email}</span>
            <span className="text-muted-foreground">
              {user.role} · {user.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
