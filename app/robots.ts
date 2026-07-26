import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth", "/api", "/company/profile", "/billing"],
    },
    sitemap: "https://www.carriertrust.eu/sitemap.xml",
    host: "https://www.carriertrust.eu",
  };
}