"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "zh" | "ja";

type Translations = {
  [key in Language]: {
    title: string;
    subtitle: string;
    tryNow: string;
    fast: string;
    fastDesc: string;
    accurate: string;
    accurateDesc: string;
    simple: string;
    simpleDesc: string;
    inputPlaceholder: string;
    convertBtn: string;
    converting: string;
    outputSys: string;
    inputSys: string;
    chars: string;
    words: string;
    back: string;
    error: string;
    empty: string;
    waiting: string;
    download: string;
  };
};

export const translations: Translations = {
  en: {
    title: "LYRIC ROMAJI",
    subtitle: "CONVERT JAPANESE LYRICS TO ROMAJI INSTANTLY. NO BS.",
    tryNow: "TRY NOW (FREE)",
    fast: "BLAZING FAST",
    fastDesc: "Results in under a second.",
    accurate: "KUROSHIRO ENGINE",
    accurateDesc: "Standardized Hepburn transliteration.",
    simple: "DEAD SIMPLE",
    simpleDesc: "Paste text. Click convert. Done.",
    inputPlaceholder: "Paste your Japanese lyrics here...",
    convertBtn: "CONVERT NOW",
    converting: "PROCESSING...",
    inputSys: "INPUT",
    outputSys: "OUTPUT (ROMAJI)",
    chars: "CHARS",
    words: "WORDS",
    back: "GO BACK",
    error: "ERROR",
    empty: "EMPTY SEQUENCE",
    waiting: "WAITING FOR INPUT...",
    download: "DOWNLOAD TXT",
  },
  zh: {
    title: "歌词罗马音",
    subtitle: "瞬间将日语歌词转换为罗马音，就是这么简单。",
    tryNow: "立即体验 (免费)",
    fast: "极速转换",
    fastDesc: "不到一秒即可获得转换结果。",
    accurate: "KUROSHIRO 引擎",
    accurateDesc: "标准的平文式罗马音转换。",
    simple: "极简操作",
    simpleDesc: "粘贴文本，点击转换，完成。",
    inputPlaceholder: "在这里粘贴你的日语歌词...",
    convertBtn: "立即转换",
    converting: "转换中...",
    inputSys: "输入区",
    outputSys: "输出区 (罗马音)",
    chars: "字符",
    words: "词数",
    back: "返回首页",
    error: "错误",
    empty: "结果为空",
    waiting: "等待输入...",
    download: "下载 TXT",
  },
  ja: {
    title: "歌詞ローマ字",
    subtitle: "日本語の歌詞を瞬時にローマ字に変換します。無駄なし。",
    tryNow: "今すぐ試す（無料）",
    fast: "超高速",
    fastDesc: "1秒未満で結果を表示。",
    accurate: "KUROSHIRO エンジン",
    accurateDesc: "標準的なヘボン式ローマ字。",
    simple: "超簡単",
    simpleDesc: "テキストを貼り付け、変換をクリック。完了。",
    inputPlaceholder: "ここに日本語の歌詞を貼り付けてください...",
    convertBtn: "変換する",
    converting: "処理中...",
    inputSys: "入力",
    outputSys: "出力（ローマ字）",
    chars: "文字",
    words: "単語",
    back: "戻る",
    error: "エラー",
    empty: "結果が空です",
    waiting: "入力を待っています...",
    download: "TXT ダウンロード",
  }
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations["en"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
