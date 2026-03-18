import { NextRequest, NextResponse } from "next/server"
import { convertToRomaji } from "@/lib/romaji-utils"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const text: unknown = body?.text

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "A non-empty 'text' string is required." }, { status: 400 })
    }

    const result = await convertToRomaji(text)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("[api/romaji] Conversion error:", error)
    return NextResponse.json({ error: "Conversion failed. Please try again." }, { status: 500 })
  }
}
