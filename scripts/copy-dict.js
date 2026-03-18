/**
 * Copies kuromoji dictionary files into public/dict so they are accessible
 * both in development and in Vercel's Serverless Function runtime.
 */
const fs = require("fs")
const path = require("path")

const src = path.join(__dirname, "..", "node_modules", "kuromoji", "dict")
const dest = path.join(__dirname, "..", "public", "dict")

if (!fs.existsSync(src)) {
  console.error("[copy-dict] kuromoji dict not found at:", src)
  process.exit(1)
}

fs.mkdirSync(dest, { recursive: true })

const files = fs.readdirSync(src)
for (const file of files) {
  fs.copyFileSync(path.join(src, file), path.join(dest, file))
}

console.log(`[copy-dict] Copied ${files.length} dictionary files to public/dict`)
