import type { Metadata } from "next";
import CompanyClient from "./CompanyClient";
import { supabaseServer } from "@/lib/supabaseServer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let companyName = "Company";
  let country = "Europe";
  let vat = "";
  let trustScore = "";
  let riskLevel = "";

  try {
    let company = null;

const bySlug = await supabaseServer
  .from("companies")
  .select("id, name, slug, country, vat_uid, trust_score, risk_level")
  .eq("slug", id)
  .maybeSingle();

if (bySlug.data) {
  company = bySlug.data;
} else {
  const byId = await supabaseServer
    .from("companies")
    .select("id, name, slug, country, vat_uid, trust_score, risk_level")
    .eq("id", id)
    .maybeSingle();

  company = byId.data;
}

    if (company?.name) companyName = String(company.name);
    if (company?.country) country = String(company.country);
    if (company?.vat_uid) vat = String(company.vat_uid);
    if (company?.trust_score !== null && company?.trust_score !== undefined) {
      trustScore = String(company.trust_score);
    }
    if (company?.risk_level) riskLevel = String(company.risk_level);
  } catch {
    // safe fallback
  }

  const title = `${companyName} Reviews, Trust Score & Carrier Reputation`;

  const descriptionParts = [
    `Read reviews, trust score and carrier reputation for ${companyName}`,
    `logistics company profile in ${country}`,
    trustScore ? `trust score ${trustScore}` : null,
    riskLevel ? `risk level ${riskLevel}` : null,
    vat ? `VAT ${vat}` : null,
  ].filter(Boolean);
  
  const description = `${descriptionParts.join(", ")}.`;
  const url = `https://carriertrust.eu/companies/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${companyName} Reviews, Trust Score & Carrier Reputation | CarrierTrust`,
      description,
      url,
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
      "carrier reviews",
      "logistics company reviews",
      "freight forwarding reviews",
      "transport company reviews",
      "trust score",
      "carrier reputation",
      vat,
    ].filter(Boolean),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { id } = await params;

  let company: {
    id?: string | null;
    slug?: string | null;
    name?: string | null;
    country?: string | null;
    vat_uid?: string | null;
    trust_score?: number | null;
  } | null = null;

  try {
    const bySlug = await supabaseServer
      .from("companies")
      .select("id, slug, name, country, vat_uid, trust_score")
      .eq("slug", id)
      .maybeSingle();
  
    if (bySlug.data) {
      company = bySlug.data;
    } else {
      const byId = await supabaseServer
        .from("companies")
        .select("id, slug, name, country, vat_uid, trust_score")
        .eq("id", id)
        .maybeSingle();
  
      company = byId.data ?? null;
    }
  } catch {
    company = null;
  }

  const companyUrl = `https://carriertrust.eu/companies/${company?.slug || id}`;

  const companySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${companyUrl}#organization`,
        name: company?.name || "Company",
        url: companyUrl,
        description: `Read reviews and trust signals for ${company?.name || "this company"}, logistics company profile${
          company?.country ? ` in ${company.country}` : " in Europe"
        }${company?.vat_uid ? `, VAT ${company.vat_uid}` : ""}.`,
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
        ...(company?.country
          ? {
              address: {
                "@type": "PostalAddress",
                addressCountry: company.country,
              },
            }
          : {}),
        ...(company?.vat_uid
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
        ...(typeof company?.trust_score === "number"
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: company.trust_score,
                bestRating: 100,
                worstRating: 0,
                ratingCount: 1,
              },
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
            item: "https://carriertrust.eu/search",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: company?.name || "Company",
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
          __html: JSON.stringify(companySchema),
        }}
      />
      <CompanyClient />
    </>
  );
}
