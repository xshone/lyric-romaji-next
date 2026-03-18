"use client";

import Link from "next/link";
import { useLanguage, Language } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function TopNav() {
  const { lang, setLang } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-start pointer-events-auto">
        <Link 
          href="/" 
          className="bg-neo-secondary border-4 border-neo-black shadow-neo-md px-4 py-2 font-black text-2xl uppercase tracking-tighter hover:-translate-y-1 hover:shadow-neo-lg transition-transform duration-100 flex items-center justify-center -rotate-2"
        >
          LYRIC<span className="text-neo-accent px-1">ROMAJI</span>
        </Link>

        {/* Language Switcher */}
        <div className="bg-white border-4 border-neo-black shadow-neo-md flex items-center justify-center p-1 rotate-1">
          <Globe className="w-5 h-5 mx-2 stroke-[3px]" />
          <div className="flex bg-neo-bg border-2 border-neo-black">
            <LangBtn current={lang} target="en" label="EN" setLang={setLang} />
            <div className="w-0.5 bg-neo-black" />
            <LangBtn current={lang} target="zh" label="中文" setLang={setLang} />
            <div className="w-0.5 bg-neo-black" />
            <LangBtn current={lang} target="ja" label="日本語" setLang={setLang} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function LangBtn({ 
  current, 
  target, 
  label, 
  setLang 
}: { 
  current: Language; 
  target: Language; 
  label: string; 
  setLang: (l: Language) => void 
}) {
  const isActive = current === target;
  return (
    <button
      onClick={() => setLang(target)}
      className={`px-3 py-1 font-bold text-sm tracking-wide transition-colors duration-100 ${
        isActive 
          ? "bg-neo-black text-white" 
          : "bg-white text-neo-black hover:bg-neo-muted"
      }`}
    >
      {label}
    </button>
  );
}
