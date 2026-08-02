 "use client"

import { useEffect, useState } from "react"

type ProgramItem = {
  id: string
  title: string
  is_visible: boolean
}

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<ProgramItem[]>([])

  useEffect(() => {
    void fetch("/api/admin/programs", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setPrograms(Array.isArray(data?.programs) ? data.programs : [])
      })
  }, [])

  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-semibold">공고 목록</h2>
      <div className="mt-4 space-y-2 text-sm">
        {programs.length === 0 ? (
          <p className="text-muted-foreground">등록된 공고가 없습니다.</p>
        ) : (
          programs.map((program) => (
            <div key={program.id} className="flex items-center justify-between rounded-xl border p-3">
              <span>{program.title}</span>
              <span className="text-muted-foreground">{program.is_visible ? "노출" : "비노출"}</span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
