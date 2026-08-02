"use client"

import { useEffect, useState } from "react"

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"))
  return match ? decodeURIComponent(match[1]) : null
}

export default function ExcludeToggle() {
  const [excluded, setExcluded] = useState(false)

  useEffect(() => {
    setExcluded(readCookie("rk_exclude_analytics") === "1")
  }, [])

  function toggle() {
    if (excluded) {
      document.cookie = "rk_exclude_analytics=; path=/; max-age=0"
      setExcluded(false)
    } else {
      document.cookie = "rk_exclude_analytics=1; path=/; max-age=31536000"
      setExcluded(true)
    }
  }

  return (
    <button
      onClick={toggle}
      className="rounded-xl border px-3 py-1 text-sm transition hover:bg-muted"
    >
      {excluded ? "내 트래픽 포함" : "내 트래픽 제외"}
    </button>
  )
}

