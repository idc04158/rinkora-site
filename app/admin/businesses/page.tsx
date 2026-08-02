 "use client"

import { useEffect, useState } from "react"
import { BusinessActions } from "@/components/admin/business-actions"

type BusinessItem = {
  id: string
  company_name: string
  business_number: string
  certificate_url: string | null
  user: { email: string }
}

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<BusinessItem[]>([])

  const loadBusinesses = () => {
    void fetch("/api/admin/businesses?status=pending", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setBusinesses(Array.isArray(data?.businesses) ? data.businesses : [])
      })
  }

  useEffect(() => {
    loadBusinesses()
  }, [])

  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-semibold">사업자 인증 신청 목록</h2>
      <div className="mt-4 space-y-3 text-sm">
        {businesses.length === 0 ? (
          <p className="text-muted-foreground">대기 중인 신청이 없습니다.</p>
        ) : (
          businesses.map((business) => (
            <article key={business.id} className="rounded-xl border p-4">
              <p className="font-semibold">{business.company_name}</p>
              <p className="text-muted-foreground">
                {business.business_number} · {business.user.email}
              </p>
              {business.certificate_url ? (
                <a
                  href={business.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-xs text-primary hover:underline"
                >
                  사업자등록증 보기
                </a>
              ) : null}
              <BusinessActions businessId={business.id} onCompleted={loadBusinesses} />
            </article>
          ))
        )}
      </div>
    </section>
  )
}
