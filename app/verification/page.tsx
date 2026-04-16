import type { Metadata } from "next";
import VerificationClient from "./VerificationClient";

export const metadata: Metadata = {
  title: "Company Verification",
  description:
    "Learn how CarrierTrust company verification works, including VAT, domain, and admin checks that improve trust and visibility across Europe.",
  alternates: {
    canonical: "https://carriertrust.eu/verification",
  },
  openGraph: {
    title: "Company Verification | CarrierTrust",
    description:
      "Learn how CarrierTrust company verification works, including VAT, domain, and admin checks that improve trust and visibility across Europe.",
    url: "https://carriertrust.eu/verification",
    siteName: "CarrierTrust",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Verification | CarrierTrust",
    description:
      "Learn how CarrierTrust company verification works, including VAT, domain, and admin checks that improve trust and visibility across Europe.",
  },
};

export default function VerificationPage() {
  return <VerificationClient />;
}