# 🔤 Lyric Romaji

[English](README.md) | [简体中文](README_zh.md)

> Blazing fast, dead-simple Japanese to Romaji converter built with Next.js. Featuring a bold **Neo-Brutalism** aesthetic. No BS, just results.

## ✨ Features

- **Instant Translation**: Converts Japanese Kanji and Kana to plain Hepburn Romaji instantly.
- **Neo-Brutalism UI**: High-contrast, bold, and retro-hardcore design built with Tailwind CSS.
- **Multi-language Support**: Built-in lightweight i18n support (English, 简体中文, 日本語).
- **Smart Pre-processing**: Automatically maps common Simplified Chinese character typos (e.g., 梦 -> 夢) often found in J-Pop / Anime fan-lyrics to valid Japanese Kanji for accurate translation.
- **Clean Romaji**: Automatically strips combining diacritical marks (e.g., ō -> o) for clean, easily readable ASCII text output.
- **Export**: One-click download of your dual-line translated lyrics as a `.txt` file.

## 🚀 Getting Started

This project is heavily optimized for Server-Side conversion using `kuroshiro` and `kuroshiro-analyzer-kuromoji`.

### Prerequisites

- Node.js 18+

### Installation & Run

1. Clone the repository.
2. Install dependencies (this will automatically run the `postinstall` script to copy Kuromoji dictionaries):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Translation Engine**: [Kuroshiro](https://github.com/hexenq/kuroshiro) + [Kuromoji](https://github.com/takuyaa/kuromoji.js)
- **Icons**: [Lucide React](https://lucide.dev/)

## ☁️ Deployment (Vercel Ready)

This app is fully configured for Vercel deployment.

The `next.config.mjs` explicitly excludes `kuroshiro-analyzer-kuromoji` from being bundled as a client module to fix `fs` dependency resolution issues in the serverless environment. Additionally, a custom `postinstall` hook accurately relocates the heavy linguistic dictionaries into the `public/dict/` directory for guaranteed runtime access.
