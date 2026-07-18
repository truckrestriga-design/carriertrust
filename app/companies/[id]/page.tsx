import type { Metadata } from "next";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import CompanyClient from "./CompanyClient";
import { supabaseServer } from "@/lib/supabaseServer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type CompanySeoData = {
  id: string;
  slug: string | null;
  name: string | null;
  country: string | null;
  vat_uid: string | null;
  trust_score: number | null;
  risk_level: string | null;
};

function slugifyPart(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function cleanVat(value: string | null | undefined) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Единый canonical slug для каждой компании:
 *
 * company-name-vat
 *
 * Если VAT отсутствует:
 * company-name-первые-8-символов-UUID
 */
function createCanonicalSlug(company: CompanySeoData) {
  /*
   * Используем slug, сохранённый в Supabase.
   * Это важно для компаний-дубликатов, которым SQL добавит уникальный суффикс.
   */
  const storedSlug = company.slug?.trim();

  if (storedSlug) {
    return storedSlug;
  }

  const namePart = slugifyPart(company.name || "company");
  const vatPart = cleanVat(company.vat_uid);

  if (vatPart) {
    return `${namePart}-${vatPart}`;
  }

  const idPart = String(company.id)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 8)
    .toLowerCase();

  return `${namePart}-${idPart || "profile"}`;
}

const getCompany = cache(
  async (identifier: string): Promise<CompanySeoData | null> => {
    try {
      const decodedIdentifier = decodeURIComponent(identifier);

      /*
       * 1. Сначала ищем по текущему slug.
       */
      const bySlug = await supabaseServer
        .from("companies")
        .select(
          "id, name, slug, country, vat_uid, trust_score, risk_level"
        )
        .eq("slug", decodedIdentifier)
        .maybeSingle();

      if (bySlug.error) {
        console.error("Company lookup by slug failed:", bySlug.error.message);
      }

      if (bySlug.data?.id) {
        return bySlug.data as CompanySeoData;
      }

      /*
       * 2. Поддерживаем старые ссылки с UUID.
       */
      const byId = await supabaseServer
        .from("companies")
        .select(
          "id, name, slug, country, vat_uid, trust_score, risk_level"
        )
        .eq("id", decodedIdentifier)
        .maybeSingle();

      if (byId.error) {
        console.error("Company lookup by id failed:", byId.error.message);
      }

      if (byId.data?.id) {
        return byId.data as CompanySeoData;
      }

      return null;
    } catch (error) {
      console.error("Company lookup failed:", error);
      return null;
    }
  }
);

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const company = await getCompany(id);

  if (!company) {
    return {
      title: "Company not found | CarrierTrust",
      description: "The requested company profile could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const companyName = company.name?.trim() || "Company";
  const country = company.country?.trim() || "Europe";
  const vat = company.vat_uid?.trim() || "";

  const trustScore =
    company.trust_score !== null &&
    company.trust_score !== undefined
      ? String(company.trust_score)
      : "";

  const riskLevel = company.risk_level?.trim() || "";

  /*
   * Canonical больше не зависит от старого значения slug в базе.
   * Он всегда строится по одному правилу.
   */
  const canonicalSlug = createCanonicalSlug(company);
  const canonicalUrl = `https://carriertrust.eu/companies/${canonicalSlug}`;

  const title = `${companyName} Reviews, Trust Score & Carrier Reputation`;

  const descriptionParts = [
    `Read reviews, trust score and carrier reputation for ${companyName}`,
    `logistics company profile in ${country}`,
    trustScore ? `trust score ${trustScore}` : null,
    riskLevel ? `risk level ${riskLevel}` : null,
    vat ? `VAT ${vat}` : null,
  ].filter(Boolean);

  const description = `${descriptionParts.join(", ")}.`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: `${companyName} Reviews, Trust Score & Carrier Reputation | CarrierTrust`,
      description,
      url: canonicalUrl,
      siteName: "CarrierTrust",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${companyName} Reviews, Trust Score & Carrier Reputation | CarrierTrust`,
      description,
    },

    keywords: [
      companyName,
      vat,
      "carrier reviews",
      "logistics company reviews",
      "freight forwarding reviews",
      "transport company reviews",
      "trust score",
      "carrier reputation",
      "payment reputation",
    ].filter(Boolean),

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { id } = await params;
  const company = await getCompany(id);

  if (!company) {
    notFound();
  }

  const canonicalSlug = createCanonicalSlug(company);

  /*
   * UUID, старый slug или неправильный регистр
   * автоматически перенаправляются на единый URL.
   *
   * permanentRedirect в Next.js использует постоянный 308 redirect.
   */
  if (id !== canonicalSlug) {
    permanentRedirect(`/companies/${canonicalSlug}`);
  }

  const companyUrl = `https://carriertrust.eu/companies/${canonicalSlug}`;

  const companySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${companyUrl}#organization`,
        name: company.name || "Company",
        url: companyUrl,

        description: `Read reviews and trust signals for ${
          company.name || "this company"
        }, logistics company profile${
          company.country ? ` in ${company.country}` : " in Europe"
        }${company.vat_uid ? `, VAT ${company.vat_uid}` : ""}.`,

        areaServed: {
          "@type": "Place",
          name: "Europe",
        },

        knowsAbout: [
          "logistics",
          "freight forwarding",
          "cargo transportation",
          "carrier reviews",
          "payment reputation",
          "company verification",
        ],

        ...(company.country
          ? {
              address: {
                "@type": "PostalAddress",
                addressCountry: company.country,
              },
            }
          : {}),

        ...(company.vat_uid
          ? {
              identifier: [
                {
                  "@type": "PropertyValue",
                  name: "VAT",
                  value: company.vat_uid,
                },
              ],
            }
          : {}),
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${companyUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://carriertrust.eu",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Companies",
            item: "https://carriertrust.eu/companies",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: company.name || "Company",
            item: companyUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(companySchema).replace(/</g, "\\u003c"),
        }}
      />

      <CompanyClient />
    </>
  );
}