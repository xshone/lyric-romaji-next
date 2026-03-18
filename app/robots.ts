import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lyric-romaji.vercel.app/sitemap.xml", // Change domain if custom domain used
  }
}
