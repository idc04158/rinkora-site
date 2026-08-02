"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

function genId(prefix = "") {
  return prefix + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9)
}

async function sendEvent(payload: Record<string, any>) {
  try {
    await fetch("/api/analytics/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  } catch {
    // noop
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const visitorIdRef = useRef<string | null>(null)
  const sessionIdRef = useRef<string | null>(null)
  const lastPingRef = useRef<number>(Date.now())

  // init ids
  useEffect(() => {
    if (!visitorIdRef.current) {
      const existing = typeof window !== "undefined" ? localStorage.getItem("rk_visitor_id") : null
      const v = existing ?? genId("v_")
      visitorIdRef.current = v
      try {
        localStorage.setItem("rk_visitor_id", v)
      } catch {}
    }
    if (!sessionIdRef.current) {
      const existing = typeof window !== "undefined" ? sessionStorage.getItem("rk_session_id") : null
      const s = existing ?? genId("s_")
      sessionIdRef.current = s
      try {
        sessionStorage.setItem("rk_session_id", s)
      } catch {}
    }
  }, [])

  // send page_view on pathname change
  useEffect(() => {
    if (!pathname) return
    const visitorId = visitorIdRef.current ?? genId("v_")
    const sessionId = sessionIdRef.current ?? genId("s_")
    lastPingRef.current = Date.now()
    void sendEvent({
      type: "page_view",
      sessionId,
      visitorId,
      path: pathname,
      referrer: document.referrer || null,
    })
  }, [pathname])

  // heartbeat
  useEffect(() => {
    const iv = setInterval(() => {
      const now = Date.now()
      const dwell = Math.max(0, now - lastPingRef.current)
      lastPingRef.current = now
      const visitorId = visitorIdRef.current ?? genId("v_")
      const sessionId = sessionIdRef.current ?? genId("s_")
      void sendEvent({
        type: "page_ping",
        sessionId,
        visitorId,
        path: pathname ?? window.location.pathname,
        dwellMs: dwell,
      })
    }, 15000)

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        const now = Date.now()
        const dwell = Math.max(0, now - lastPingRef.current)
        lastPingRef.current = now
        const visitorId = visitorIdRef.current ?? genId("v_")
        const sessionId = sessionIdRef.current ?? genId("s_")
        void sendEvent({
          type: "page_ping",
          sessionId,
          visitorId,
          path: window.location.pathname,
          dwellMs: dwell,
        })
      }
    }

    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      clearInterval(iv)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [pathname])

  return null
}

