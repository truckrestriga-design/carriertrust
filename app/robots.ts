import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth", "/api", "/company/profile", "/billing"],
    },
    sitemap: "https://carriertrust.eu/sitemap.xml",
    host: "https://carriertrust.eu",
  };
}