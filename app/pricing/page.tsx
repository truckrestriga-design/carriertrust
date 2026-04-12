import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore CarrierTrust pricing for logistics companies, carrier verification, reputation tools, review management, and trust visibility across Europe.",
  alternates: {
    canonical: "https://carriertrust.eu/pricing",
  },
  openGraph: {
    title: "Pricing | CarrierTrust",
    description:
      "Explore CarrierTrust pricing for logistics companies, carrier verification, reputation tools, review management, and trust visibility across Europe.",
    url: "https://carriertrust.eu/pricing",
    siteName: "CarrierTrust",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | CarrierTrust",
    description:
      "Explore CarrierTrust pricing for logistics companies, carrier verification, reputation tools, review management, and trust visibility across Europe.",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}