import { NextResponse } from "next/server"

// 🔥 여기에 Apps Script 웹앱 URL 넣기 (script.google.com/macros/.../exec)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyRl_DOdpF57cCCIWqO9Ps6n6fs8fY0HK_heSkg-eog3bN0foUz7NUzaKNcqu8xw1JY2A/exec"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    console.log("📩 받은 데이터:", body)

    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const text = await response.text()
    console.log("📨 Apps Script 응답:", text)

    if (!response.ok) {
      throw new Error(`Apps Script Error: ${text}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ API ERROR:", error)

    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}