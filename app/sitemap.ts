import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const paths = [
    "",
    "grants",
    "services",
    "insights",
    "contact",
    "newsletter",
  ]

  return paths.map((p) => {
    const url = `${base}/${p}`.replace(/\/+$/, "")
    return {
      url,
      lastModified: new Date().toISOString(),
    }
  })
}

