import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Check a Logistics Company",
  description:
    "Learn how to check a logistics company before cooperation: reviews, payment signals, verification status, and trust indicators across Europe.",
  alternates: {
    canonical: "https://carriertrust.eu/how-to-check-logistics-company",
  },
  openGraph: {
    title: "How to Check a Logistics Company | CarrierTrust",
    description:
      "Learn how to check a logistics company before cooperation: reviews, payment signals, verification status, and trust indicators across Europe.",
    url: "https://carriertrust.eu/how-to-check-logistics-company",
    siteName: "CarrierTrust",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Check a Logistics Company | CarrierTrust",
    description:
      "Learn how to check a logistics company before cooperation: reviews, payment signals, verification status, and trust indicators across Europe.",
  },
};

export default function HowToCheckLogisticsCompanyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">How to Check a Logistics Company</h1>

      <p className="mb-4 text-lg text-slate-700">
        Before accepting cargo, signing transport agreements, or starting cooperation,
        logistics companies should verify who they work with.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Check company reviews</h2>

        <p>
          Reviews often show delivery disputes, payment delays, communication issues,
          and repeated complaints from other logistics partners.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Verify legal and tax details</h2>

        <p>
          VAT number, registration data, and company country should always match
          before transport cooperation begins.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Look for payment risk signals</h2>

        <p>
          Long payment delays, repeated disputes, and unclear cargo delivery terms
          often indicate elevated logistics risk.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Freight exchange is not enough</h2>

        <p>
          Even if a company appears on Timocom or cargo.lt, trust verification
          should still happen separately.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Use trust signals before cooperation</h2>

        <p>
          CarrierTrust helps logistics companies review trust indicators,
          verification status, and public reputation before working together.
        </p>
      </section>
    </main>
  );
}