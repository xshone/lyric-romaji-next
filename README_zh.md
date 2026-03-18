# 🔤 Lyric Romaji (日语歌词罗马音转换器)

[English](README.md) | [简体中文](README_zh.md)

> 基于 Next.js 构建的极速日文歌词转罗马音工具。采用大胆的 **Neo-Brutalism (新粗野主义)** 设计风格。没有多余废话，粘贴即转。

## ✨ 功能特性

- **极速转换**：精准将日语汉字（Kanji）和假名转化为平文式罗马音。
- **Neo-Brutalism UI**：使用 Tailwind CSS 打造的高对比度、硬核并且前卫的新粗野主义界面。
- **原生多语言**：内置轻量级无依赖 i18n 支持（English、简体中文、日本語）。
- **智能文本预处理**：自动纠正动漫、J-Pop 饭制歌词中常见的“简体中文错别字”（如将“梦”自动纠正为“夢”，“东”纠正为“東”），大幅提高 Kuroshiro 引擎覆盖率。
- **纯净罗马音**：自动剥离长音等特殊符号（如 ō -> o），输出最干净的原生 ASCII 罗马音文本，方便学唱与排版。
- **一键导出**：支持将原文与罗马音精美对应的转换结果一键下载为 `.txt` 文本文件。

## 🚀 快速开始

本系统高度优化了服务端页面渲染（SSR）环境下的 `kuroshiro` 与 `kuromoji` 字典加载表现。

### 环境要求

- Node.js 18+

### 安装与运行

1. 克隆本项目
2. 安装依赖（此操作会自动触发 `postinstall` 脚本，将 Kuromoji 核心文件挂载至前端公开目录）：
   ```bash
   npm install
   ```
3. 启动本地开发服务器：
   ```bash
   npm run dev
   ```
4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可开始使用。

## 🛠️ 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **转换引擎**: [Kuroshiro](https://github.com/hexenq/kuroshiro) + [Kuromoji](https://github.com/takuyaa/kuromoji.js)
- **图标**: [Lucide React](https://lucide.dev/)

## ☁️ 部署 (Vercel)

本项目已为 Vercel 部署进行深度排雷与配置优化。

`next.config.mjs` 中使用了 `serverComponentsExternalPackages` 隔离了包含底层 Node `fs` API 而无法被 Webpack 直接打包的依赖库。配合项目的构建生命周期（postinstall 脚本注入打包），从而彻底解决了在 Serverless 生产环境下的字典文件稳定读取问题。
