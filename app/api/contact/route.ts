import { NextResponse } from "next/server"

const WEB_APP_URL = process.env.GOOGLE_SHEETS_CONTACT_URL

export async function POST(req: Request) {
  try {
    if (!WEB_APP_URL) {
      return NextResponse.json(
        {
          success: false,
          error: "GOOGLE_SHEETS_CONTACT_URL is not configured",
        },
        { status: 503 },
      )
    }

    const body = await req.json()

    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact",
        ...body,
      }),
    })

    const text = await response.text()
    if (!response.ok) {
      throw new Error(`Apps Script Error: ${text}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

