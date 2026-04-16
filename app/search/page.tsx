import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Search Logistics Companies, Carrier Reviews & Trust Scores",
    description:
  "Search logistics companies, carrier reviews, trust scores, freight forwarders and transport companies across Europe on CarrierTrust.",
    alternates: {
      canonical: "https://carriertrust.eu/search",
    },
    openGraph: {
      title: "Logistics Companies Search | CarrierTrust",
      description:
        "Search logistics companies, freight forwarders, cargo delivery providers and transport companies across Europe.",
      url: "https://carriertrust.eu/search",
      siteName: "CarrierTrust",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Logistics Companies Search | CarrierTrust",
      description:
        "Search logistics companies, freight forwarders, cargo delivery providers and transport companies across Europe.",
    },
  };
}

import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <SearchClient />
    </Suspense>
  );
}