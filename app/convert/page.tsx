"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Play, XSquare, Download } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

const PLACEHOLDER = `春はあけぼの\nやうやう白くなりゆく山際`

export default function ConvertPage() {
  const { t } = useLanguage()
  const [input, setInput] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConvert() {
    if (!input.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch("/api/romaji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Unknown error")
      } else {
        setResult(data.result as string)
      }
    } catch {
      setError("Network error. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  const resultLines = result?.split("\n") ?? []

  function handleDownload() {
    if (!result) return
    const lines = result.split("\n")
    const parts: string[] = []
    for (let i = 0; i < lines.length; i += 2) {
      const original = lines[i] ?? ""
      const romaji = lines[i + 1] ?? ""
      if (original === "__PARA__") {
        parts.push("")
      } else {
        parts.push(original)
        parts.push(romaji)
      }
    }
    const blob = new Blob([parts.join("\n")], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "romaji.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="w-full h-full flex flex-col gap-6 relative">
      {/* Header controls */}
      <div className="flex justify-between items-center bg-white border-4 border-neo-black shadow-neo-sm p-4 w-full">
        <Link
          href="/"
          className="flex items-center gap-2 font-black uppercase text-xl hover:bg-neo-secondary px-3 py-1 -rotate-1 border-2 border-transparent hover:border-neo-black transition-all"
        >
          <ArrowLeft className="stroke-[4px]" />
          {t.back}
        </Link>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setInput("")
              setResult(null)
              setError(null)
            }}
            className="flex items-center gap-2 font-bold px-4 py-2 border-4 border-neo-black bg-white hover:bg-neo-muted shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            <XSquare className="stroke-[3px]" />
          </button>
          <button
            onClick={handleConvert}
            disabled={loading || !input.trim()}
            className="flex items-center gap-2 font-black uppercase text-lg px-6 py-2 border-4 border-neo-black bg-neo-accent text-white shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="stroke-[4px]" />
            {loading ? t.converting : t.convertBtn}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 h-full min-h-[600px]">
        {/* INPUT AREA */}
        <div className="flex-1 flex flex-col items-stretch relative">
          <div className="bg-neo-secondary border-4 border-black border-b-0 px-4 py-2 flex justify-between items-center group -rotate-1 origin-bottom-left relative z-10 w-fit">
            <span className="font-black uppercase tracking-widest text-lg">{t.inputSys}</span>
            <span className="font-bold border-2 border-black bg-white px-2 py-0.5 text-sm ml-4">
              {input.length} {t.chars}
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || PLACEHOLDER}
            className="flex-1 w-full bg-white border-4 border-neo-black shadow-neo-md p-6 font-bold text-lg resize-none focus:outline-none focus:bg-neo-bg focus:shadow-neo-lg transition-all"
          />
        </div>

        {/* OUTPUT AREA */}
        <div className="flex-1 flex flex-col items-stretch relative">
          <div className="flex justify-between items-end self-stretch">
            <div className="bg-neo-muted border-4 border-black border-b-0 px-4 py-2 flex items-center rotate-1 origin-bottom-right relative z-10">
              <span className="font-black uppercase tracking-widest text-lg">{t.outputSys}</span>
              {result && (
                <span className="font-bold border-2 border-black bg-white px-2 py-0.5 text-sm ml-4">
                  {resultLines.length} LINES
                </span>
              )}
            </div>
            {result && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 font-black uppercase text-sm px-4 py-2 border-4 border-neo-black bg-white hover:bg-neo-secondary shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all mb-0"
              >
                <Download className="w-4 h-4 stroke-[3px]" />
                {t.download}
              </button>
            )}
          </div>
          <div className="flex-1 w-full bg-white border-4 border-neo-black shadow-neo-md p-6 font-bold text-lg overflow-y-auto">
            {error ? (
              <div className="bg-neo-accent text-white border-4 border-neo-black p-4 font-black flex items-center justify-center h-full text-2xl -rotate-2">
                {t.error}: {error}
              </div>
            ) : result === null ? (
              <div className="h-full flex items-center justify-center font-black text-3xl opacity-20 uppercase rotate-6">
                {t.waiting}
              </div>
            ) : resultLines.length === 0 ? (
              <div className="text-neo-black/50 font-bold">{t.empty}</div>
            ) : (
              <div>
                {(() => {
                  const groups: Array<{ original: string; romaji: string }> = []
                  for (let i = 0; i < resultLines.length; i += 2) {
                    const original = resultLines[i] ?? ""
                    const romaji = resultLines[i + 1] ?? ""
                    groups.push({ original, romaji })
                  }
                  return groups.map((g, idx) =>
                    g.original === "__PARA__" ? (
                      <div key={idx} className="h-5" />
                    ) : (
                      <div
                        key={idx}
                        className="group relative border-l-4 border-transparent hover:border-neo-accent pl-4 py-1 transition-all"
                      >
                        <p className="text-lg font-bold text-neo-black">{g.original}</p>
                        <p className="text-lg font-black text-neo-accent tracking-wide">
                          {g.romaji}
                        </p>
                      </div>
                    ),
                  )
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
