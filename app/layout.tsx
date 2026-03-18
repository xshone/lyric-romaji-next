import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n"
import TopNav from "@/components/TopNav"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Lyric Romaji | Convert Japanese Lyrics to Romaji Instantly",
    template: "%s | Lyric Romaji",
  },
  description:
    "The fastest and most accurate Japanese to Romaji converter using Kuroshiro. Instantly translate J-Pop syllables, Anime lyrics, and Kanji to Hepburn Romaji. No BS, just results.",
  keywords: [
    "japanese to romaji",
    "lyric romaji",
    "kanji to romaji converter",
    "jpop romaji",
    "romanize japanese",
    "kuroshiro",
    "learn japanese",
    "anime lyrics romaji",
  ],
  authors: [{ name: "Lyric Romaji" }],
  creator: "Lyric Romaji",
  publisher: "Lyric Romaji",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Lyric Romaji | Convert Japanese Lyrics to Romaji Instantly",
    description:
      "The fastest J-Pop & Anime lyrics romaji converter. Paste Japanese text, get Hepburn Romaji instantly.",
    url: "https://lyric-romaji.vercel.app",
    siteName: "Lyric Romaji",
    images: [
      {
        url: "/og-image.png", // Next.js standard or custom OG
        width: 1200,
        height: 630,
        alt: "Lyric Romaji Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyric Romaji | Convert Japanese Lyrics to Romaji Instantly",
    description:
      "The fastest Japanese to Romaji lyrics converter. Paste Kanji/Kana, get Hepburn Romaji instantly.",
    creator: "@lyricromaji", // optional, replace with real if desired
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lyric-romaji.vercel.app",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="bg-neo-bg text-neo-black font-body antialiased min-h-screen flex flex-col bg-halftone">
        <LanguageProvider>
          <TopNav />
          <div className="flex-1 pt-24 pb-12 w-full max-w-7xl mx-auto px-4 md:px-8">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  )
}
