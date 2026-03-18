import path from "path"
import Kuroshiro from "kuroshiro"
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji"

let kuroshiro: Kuroshiro | null = null

/**
 * Initialises Kuroshiro once and reuses the instance across requests.
 * The dict path resolves to /public/dict which is included in the Vercel
 * deployment bundle and accessible via the filesystem at runtime.
 */
export async function initKuroshiro(): Promise<Kuroshiro> {
  if (!kuroshiro) {
    kuroshiro = new Kuroshiro()
    // process.cwd() points to the project root both locally and on Vercel
    const dictPath = path.join(process.cwd(), "public", "dict")
    const analyzer = new KuromojiAnalyzer({ dictPath })
    await kuroshiro.init(analyzer)
  }
  return kuroshiro
}

/**
 * Maps simplified Chinese characters (Simplified Han) to their Japanese
 * kanji equivalents so Kuromoji can correctly read them.
 * Japanese lyrics sometimes contain Simplified Chinese characters written
 * by mistake or stylistically, especially in fan-transcribed lyrics.
 */
const SIMPLIFIED_TO_JAPANESE: Record<string, string> = {
  // Most commonly seen in J-Pop/Anime lyrics
  梦: "夢",
  见: "見",
  东: "東",
  并: "並",
  边: "辺",
  爱: "愛",
  変: "変",
  来: "来",
  离: "離",
  远: "遠",
  发: "発",
  乐: "楽",
  进: "進",
  开: "開",
  让: "让",
  说: "説",
  听: "聴",
  现: "現",
  样: "様",
  阳: "陽",
  应: "応",
  总: "総",
  转: "転",
  习: "習",
  认: "認",
  还: "還",
  过: "過",
  从: "従",
  风: "風",
  长: "長",
  义: "義",
  亲: "親",
  热: "熱",
  间: "間",
  时: "時",
  话: "話",
  动: "動",
  关: "関",
  联: "連",
  华: "華",
  单: "単",
  终: "終",
  续: "続",
  题: "題",
  带: "帯",
  区: "区",
  号: "号",
  图: "図",
  丰: "豊",
  电: "電",
  门: "門",
  问: "問",
  万: "万",
  为: "為",
  与: "与",
  无: "無",
  専: "専",
  気: "気",
}

function normalizeKanji(text: string): string {
  return text.replace(/[\u4E00-\u9FFF]/g, (ch) => SIMPLIFIED_TO_JAPANESE[ch] ?? ch)
}

/**
 * Strips combining diacritical marks (e.g. ō→o, ā→a, ū→u) from a string
 * so that romaji output uses only plain ASCII letters.
 */
function stripDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Converts Japanese text line-by-line. Each source line is followed by its
 * Hepburn romaji transliteration.
 */
export async function convertToRomaji(text: string): Promise<string> {
  const engine = await initKuroshiro()
  const lines = text.split("\n")
  const processed: string[] = []
  let blankRun = 0 // consecutive blank lines seen so far

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      blankRun++
      continue // defer — decide what to emit once we see the next real line
    }

    // Emit a paragraph-break marker only when 2+ consecutive blanks preceded this line
    if (blankRun >= 2) {
      processed.push("__PARA__")
      processed.push("")
    }
    blankRun = 0

    const romaji = await engine.convert(normalizeKanji(trimmed), {
      to: "romaji",
      mode: "spaced",
      romajiSystem: "hepburn",
    })

    const plain = stripDiacritics(romaji)
    processed.push(trimmed)
    // Capitalise the first letter of each romaji line for readability
    processed.push(plain.charAt(0).toUpperCase() + plain.slice(1))
  }

  return processed.join("\n")
}
