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
  title: "Lyric Romaji | Neo-Brutalism Ed.",
  description: "Convert Japanese Lyrics to Romaji",
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
