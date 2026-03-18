import path from "path";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

let kuroshiro: Kuroshiro | null = null;

/**
 * Initialises Kuroshiro once and reuses the instance across requests.
 * The dict path resolves to /public/dict which is included in the Vercel
 * deployment bundle and accessible via the filesystem at runtime.
 */
export async function initKuroshiro(): Promise<Kuroshiro> {
  if (!kuroshiro) {
    kuroshiro = new Kuroshiro();
    // process.cwd() points to the project root both locally and on Vercel
    const dictPath = path.join(process.cwd(), "public", "dict");
    const analyzer = new KuromojiAnalyzer({ dictPath });
    await kuroshiro.init(analyzer);
  }
  return kuroshiro;
}

/**
 * Strips combining diacritical marks (e.g. ō→o, ā→a, ū→u) from a string
 * so that romaji output uses only plain ASCII letters.
 */
function stripDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Converts Japanese text line-by-line. Each source line is followed by its
 * Hepburn romaji transliteration.
 */
export async function convertToRomaji(text: string): Promise<string> {
  const engine = await initKuroshiro();
  const lines = text.split("\n");
  const processed: string[] = [];
  let blankRun = 0; // consecutive blank lines seen so far

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      blankRun++;
      continue; // defer — decide what to emit once we see the next real line
    }

    // Emit a paragraph-break marker only when 2+ consecutive blanks preceded this line
    if (blankRun >= 2) {
      processed.push("__PARA__");
      processed.push("");
    }
    blankRun = 0;

    const romaji = await engine.convert(trimmed, {
      to: "romaji",
      mode: "spaced",
      romajiSystem: "hepburn",
    });

    const plain = stripDiacritics(romaji);
    processed.push(trimmed);
    // Capitalise the first letter of each romaji line for readability
    processed.push(plain.charAt(0).toUpperCase() + plain.slice(1));
  }

  return processed.join("\n");
}
