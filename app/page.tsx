"use client"

import Link from "next/link"
import { ArrowRight, Zap, CheckCircle2, RotateCcw } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <main className="w-full flex-grow flex flex-col justify-center items-center py-10">
      <div className="w-full flex flex-col lg:flex-row gap-12 items-center justify-between mt-10">
        {/* Left Side: Copy & CTA */}
        <div className="flex-1 space-y-10 relative">
          <div className="absolute -top-10 -left-6 bg-neo-muted border-4 border-neo-black shadow-neo-sm px-4 py-1 -rotate-6 z-10 font-bold tracking-widest text-sm">
            VER 2.0 ✨
          </div>

          <h1 className="font-black text-6xl md:text-8xl leading-[0.85] tracking-tighter uppercase relative z-20">
            <span className="block text-stroke">{t.title.split(" ")[0]}</span>
            <span className="block bg-neo-accent text-white px-4 py-2 border-8 border-neo-black shadow-neo-lg w-max rotate-2 mt-4">
              {t.title.split(" ")[1] || t.title}
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-bold max-w-lg bg-white border-4 border-neo-black shadow-neo-md p-6 relative">
            <span className="absolute -top-3 -right-3 w-6 h-6 bg-neo-secondary border-2 border-neo-black rounded-full" />
            {t.subtitle}
          </p>

          <div>
            <Link
              href="/convert"
              className="inline-flex items-center gap-4 bg-neo-accent border-4 border-neo-black shadow-neo-md px-8 py-5 font-black text-2xl uppercase tracking-wider hover:shadow-neo-lg hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
            >
              {t.tryNow}
              <div className="bg-white border-2 border-neo-black p-1 rounded-full">
                <ArrowRight className="w-6 h-6 stroke-[4px]" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side: Features */}
        <div className="flex-1 w-full flex flex-col gap-6 relative">
          <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4 bg-neo-secondary border-4 border-neo-black" />

          <FeatureCard
            icon={<Zap className="w-8 h-8 stroke-[3px]" />}
            title={t.fast}
            desc={t.fastDesc}
            color="bg-neo-accent text-white"
            rotation="-rotate-1"
          />
          <FeatureCard
            icon={<CheckCircle2 className="w-8 h-8 stroke-[3px]" />}
            title={t.accurate}
            desc={t.accurateDesc}
            color="bg-white text-neo-black"
            rotation="rotate-2"
          />
          <FeatureCard
            icon={<RotateCcw className="w-8 h-8 stroke-[3px]" />}
            title={t.simple}
            desc={t.simpleDesc}
            color="bg-neo-muted text-neo-black"
            rotation="-rotate-2"
          />
        </div>
      </div>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
  color,
  rotation,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
  rotation: string
}) {
  return (
    <div
      className={`border-4 border-neo-black shadow-neo-sm p-6 flex gap-6 items-start ${color} ${rotation} hover:rotate-0 hover:-translate-y-1 hover:shadow-neo-md transition-all duration-200`}
    >
      <div className="bg-neo-bg text-neo-black border-4 border-neo-black p-3 shrink-0">{icon}</div>
      <div>
        <h3 className="font-black text-2xl uppercase tracking-tight mb-2">{title}</h3>
        <p className="font-bold text-lg leading-snug opacity-90">{desc}</p>
      </div>
    </div>
  )
}
