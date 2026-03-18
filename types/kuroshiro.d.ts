// kuroshiro ships without complete TypeScript declarations; this module
// augmentation provides the minimum types needed by this project.
declare module "kuroshiro" {
  interface ConvertOptions {
    to?: "hiragana" | "katakana" | "romaji";
    mode?: "normal" | "spaced" | "okurigana" | "furigana";
    romajiSystem?: "nippon" | "passport" | "hepburn";
    delimiter_start?: string;
    delimiter_end?: string;
  }

  export default class Kuroshiro {
    init(analyzer: unknown): Promise<void>;
    convert(text: string, options?: ConvertOptions): Promise<string>;
    static Util: {
      isHiragana(ch: string): boolean;
      isKatakana(ch: string): boolean;
      isKana(ch: string): boolean;
      isKanji(ch: string): boolean;
      isJapanese(ch: string): boolean;
      hasHiragana(str: string): boolean;
      hasKatakana(str: string): boolean;
      hasKana(str: string): boolean;
      hasKanji(str: string): boolean;
      hasJapanese(str: string): boolean;
    };
  }
}

declare module "kuroshiro-analyzer-kuromoji" {
  interface KuromojiAnalyzerOptions {
    dictPath?: string;
  }
  export default class KuromojiAnalyzer {
    constructor(options?: KuromojiAnalyzerOptions);
  }
}
