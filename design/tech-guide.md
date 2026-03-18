# Next.js 歌词罗马音转换器实现指南

## 1. 核心需求描述

在 Next.js (App Router) 项目中实现一个功能：输入一段日语歌词（包含汉字、假名），输出每一行日语文本及其对应的罗马音（Romaji）对照。

## 2. 技术栈建议

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **核心库**: `kuroshiro` (核心转换逻辑)
- **分词器**: `kuroshiro-analyzer-kuromoji` (日语形态素分析)
- **部署目标**: Vercel

## 3. 环境准备与依赖安装

由于 `kuromoji` 需要加载物理字典文件，在 Vercel 环境下需要确保字典路径能被正确读取。

```bash
npm install kuroshiro kuroshiro-analyzer-kuromoji
npm install -D @types/kuroshiro
```

> **注意 (给 Agent 的提示)**: `kuroshiro` 的类型定义可能不完整，必要时请在 `types/kuroshiro.d.ts` 中添加 `declare module 'kuroshiro'`。

## 4. 关键实现逻辑

### A. 字典文件存放

为了确保 Vercel 部署后能找到字典，请将 `node_modules/kuromoji/dict` 中的所有文件复制到项目的 `public/dict` 文件夹下。

### B. 核心转换工具类 (`lib/romaji-utils.ts`)

```typescript
import Kuroshiro from "kuroshiro"
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji"

let kuroshiro: Kuroshiro | null = null

export async function initKuroshiro() {
  if (!kuroshiro) {
    kuroshiro = new Kuroshiro()
    const analyzer = new KuromojiAnalyzer({
      // 这里的路径指向 public/dict，以便在服务端/客户端都能访问
      dictPath: "/dict",
    })
    await kuroshiro.init(analyzer)
  }
  return kuroshiro
}

export async function convertToRomaji(text: string): Promise<string> {
  const engine = await initKuroshiro()
  const lines = text.split("\n")
  const processed = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      processed.push("")
      continue
    }

    // 转换为罗马音，采用平文式 (hepburn)，单词间加空格
    const romaji = await engine.convert(trimmed, {
      to: "romaji",
      mode: "spaced",
      romajiSystem: "hepburn",
    })

    processed.push(trimmed)
    // 首字母大写美化
    processed.push(romaji.charAt(0).toUpperCase() + romaji.slice(1))
  }

  return processed.join("\n")
}
```

### C. API Route 实现 (`app/api/romaji/route.ts`)

为了避免在客户端加载沉重的字典文件，建议将转换逻辑放在服务端：

```typescript
import { NextRequest, NextResponse } from "next/server"
import { convertToRomaji } from "@/lib/romaji-utils"

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 })

    const result = await convertToRomaji(text)
    return NextResponse.json({ result })
  } catch (error) {
    console.error("Romaji conversion error:", error)
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 })
  }
}
```

## 5. Agent 任务清单

1.  **初始化项目**: 创建一个 Next.js 页面，包含一个 `textarea` 输入框和一个展示结果的区域。
2.  **配置脚本**: 在 `package.json` 中添加一个 `postinstall` 脚本，自动将 `kuromoji` 的字典文件拷贝到 `public/dict`（或者手动提醒开发者拷贝）。
3.  **UI 交互**: 使用 `fetch` 调用 `/api/romaji` 接口，并处理 Loading 状态。
4.  **Vercel 优化**: 确保字典路径在 Vercel 的 Serverless Function 环境下可读（使用 `path.join(process.cwd(), 'public/dict')`）。
