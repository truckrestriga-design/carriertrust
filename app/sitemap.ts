import type { MetadataRoute } from "next";
import { supabaseServer } from "@/lib/supabaseServer";

type CompanySitemapRow = {
  id: string;
  slug: string | null;
  updated_at: string | null;
};

const COMPANY_PAGE_SIZE = 1000;

async function getAllCompanies(): Promise<CompanySitemapRow[]> {
  const allCompanies: CompanySitemapRow[] = [];

  for (let from = 0; ; from += COMPANY_PAGE_SIZE) {
    const { data, error } = await supabaseServer
      .from("companies")
      .select("id, slug, updated_at")
      .order("updated_at", { ascending: false })
      .order("id", { ascending: true })
      .range(from, from + COMPANY_PAGE_SIZE - 1);

    if (error) {
      console.error(
        `Failed to load companies for sitemap from row ${from}:`,
        error.message
      );
      break;
    }

    const rows = (data || []) as CompanySitemapRow[];
    allCompanies.push(...rows);

    if (rows.length < COMPANY_PAGE_SIZE) {
      break;
    }
  }

  return allCompanies;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.carriertrust.eu";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/companies`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/risk-index`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/write-review`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/verification`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/cargo-delivery-terms`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/timocom-alternative`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/how-to-check-logistics-company`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/review-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const companies = await getAllCompanies();

  const companyPages: MetadataRoute.Sitemap = companies
    .filter(
      (
        company
      ): company is CompanySitemapRow & { slug: string } =>
        typeof company.slug === "string" && company.slug.trim().length > 0
    )
    .map((company) => ({
      url: `${base}/companies/${company.slug}`,
      lastModified: company.updated_at
        ? new Date(company.updated_at)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticPages, ...companyPages];
}
