import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/a/macros/rinkorab2b.com/s/AKfycbyo5HBhjU0VaMwGJdkrE5WYOQdDYwjIXxbdksEKTXZXukNdgShBWa-_bJSYApUMhmQV/exec"

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit" },
      { status: 500 }
    )
  }
}