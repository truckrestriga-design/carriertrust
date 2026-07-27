import type { Metadata } from "next";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import CompanyClient from "./CompanyClient";
import { supabaseServer } from "@/lib/supabaseServer";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type CompanySeoData = {
  id: string;
  slug: string | null;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
  trust_score: number | null;
  trust_level: string | null;
  trust_updated_at: string | null;
  is_verified_company: boolean | null;
  verified_at: string | null;
  verification_method: string | null;
  fraud_score: number | null;
  risk_level: string | null;
  auto_flagged: boolean | null;
};

type ReviewReplyData = {
  id: string;
  reply_text: string | null;
  updated_at: string | null;
};

type CompanyReviewData = {
  id: string;
  created_at: string;
  rating: number | null;
  issue_type: string | null;
  review_text: string | null;
  status: string | null;
  author_email: string | null;
  author_company: string | null;
  author_company_vat: string | null;
  is_verified: boolean | null;
  verification_method: string | null;
  risk_score: number | null;
  is_flagged: boolean | null;
  review_replies: ReviewReplyData[];
};

type PublicReplyRow = {
  review_id: string;
  reply_text: string | null;
  updated_at: string | null;
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
          "id, slug, name, vat_uid, country, trust_score, trust_level, trust_updated_at, is_verified_company, verified_at, verification_method, fraud_score, risk_level, auto_flagged"
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
          "id, slug, name, vat_uid, country, trust_score, trust_level, trust_updated_at, is_verified_company, verified_at, verification_method, fraud_score, risk_level, auto_flagged"
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

const getCompanyPageData = cache(async (companyId: string) => {
  const [planResult, reviewsResult, approvedClaimResult] = await Promise.all([
    supabaseServer
      .from("company_plans")
      .select("plan, plan_status, current_period_end")
      .eq("company_id", companyId)
      .eq("plan_status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabaseServer
      .from("reviews")
      .select(
        "id, created_at, rating, issue_type, review_text, status, author_email, author_company, author_company_vat, is_verified, verification_method, risk_score, is_flagged"
      )
      .eq("company_id", companyId)
      .eq("status", "published")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("company_claims")
      .select("id")
      .eq("company_id", companyId)
      .eq("status", "approved")
      .limit(1)
      .maybeSingle(),
  ]);

  if (planResult.error) {
    console.error("Company plan lookup failed:", planResult.error.message);
  }

  if (reviewsResult.error) {
    console.error("Company reviews lookup failed:", reviewsResult.error.message);
  }

  if (approvedClaimResult.error) {
    console.error(
      "Company approved claim lookup failed:",
      approvedClaimResult.error.message
    );
  }

  const reviews: CompanyReviewData[] = (reviewsResult.data || []).map((row) => ({
    ...row,
    review_replies: [],
  }));

  const reviewIds = reviews.map((review) => review.id).filter(Boolean);

  if (reviewIds.length > 0) {
    try {
      const repliesResult = await supabaseServer.functions.invoke(
        "company-replies",
        {
          method: "POST",
          body: {
            company_id: companyId,
            review_ids: reviewIds,
          },
        }
      );

      if (repliesResult.error) {
        console.error(
          "Company replies lookup failed:",
          repliesResult.error.message
        );
      }

      const rows = Array.isArray(repliesResult.data?.replies)
        ? (repliesResult.data.replies as PublicReplyRow[])
        : [];

      const repliesByReviewId = new Map(
        rows
          .filter((reply) => String(reply.review_id || "").trim())
          .map((reply) => [String(reply.review_id), reply])
      );

      for (const review of reviews) {
        const reply = repliesByReviewId.get(review.id);
        if (reply?.reply_text?.trim()) {
          review.review_replies = [
            {
              id: "public",
              reply_text: reply.reply_text,
              updated_at: reply.updated_at,
            },
          ];
        }
      }
    } catch (error) {
      console.error("Company replies lookup failed:", error);
    }
  }

  return {
    companyPlan: planResult.data?.plan ?? null,
    reviews,
    isClaimed: Boolean(approvedClaimResult.data?.id),
  };
});

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
  const canonicalUrl = `https://www.carriertrust.eu/companies/${canonicalSlug}`;

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

  const companyUrl = `https://www.carriertrust.eu/companies/${canonicalSlug}`;
  const { companyPlan, reviews, isClaimed } = await getCompanyPageData(company.id);

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
            item: "https://www.carriertrust.eu",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Companies",
            item: "https://www.carriertrust.eu/companies",
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

      <CompanyClient
        initialCompany={company}
        initialCompanyPlan={companyPlan}
        initialReviews={reviews}
        initialIsClaimed={isClaimed}
      />
    </>
  );
}