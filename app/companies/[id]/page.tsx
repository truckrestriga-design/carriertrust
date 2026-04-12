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
    const { data } = await supabaseServer
      .from("companies")
      .select("name, country, vat_uid, trust_score, risk_level")
      .eq("slug", id)
      .maybeSingle();

    if (data?.name) companyName = String(data.name);
    if (data?.country) country = String(data.country);
    if (data?.vat_uid) vat = String(data.vat_uid);
    if (data?.trust_score !== null && data?.trust_score !== undefined) {
      trustScore = String(data.trust_score);
    }
    if (data?.risk_level) riskLevel = String(data.risk_level);
  } catch {
    // safe fallback
  }

  const title = `${companyName} Reviews & Trust Score`;

  const descriptionParts = [
    `Read reviews and trust signals for ${companyName}`,
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
      title: `${companyName} Reviews & Trust Score | CarrierTrust`,
      description,
      url,
      siteName: "CarrierTrust",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${companyName} Reviews & Trust Score | CarrierTrust`,
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

export default function CompanyPage() {
  return <CompanyClient />;
}