import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timocom Alternative",
  description:
    "Looking for a Timocom alternative? Compare freight exchange visibility with company trust checks, reviews, and logistics risk signals across Europe.",
  alternates: {
    canonical: "https://carriertrust.eu/timocom-alternative",
  },
  openGraph: {
    title: "Timocom Alternative | CarrierTrust",
    description:
      "Looking for a Timocom alternative? Compare freight exchange visibility with company trust checks, reviews, and logistics risk signals across Europe.",
    url: "https://carriertrust.eu/timocom-alternative",
    siteName: "CarrierTrust",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timocom Alternative | CarrierTrust",
    description:
      "Looking for a Timocom alternative? Compare freight exchange visibility with company trust checks, reviews, and logistics risk signals across Europe.",
  },
};

export default function TimocomAlternativePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">Timocom Alternative</h1>

      <p className="mb-4 text-lg text-slate-700">
        A Timocom alternative is not only about finding cargo. It is also about
        checking who you work with, how reliable they are, and what risk signals
        appear before accepting a load.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">
          Freight exchange versus trust verification
        </h2>

        <p>
          Freight exchanges help logistics companies find loads and partners.
          But load access and company trust are not the same thing.
        </p>

        <p>
          Before accepting transport work, companies should review public trust
          signals, payment risk, company reputation, and delivery-related complaints.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">
          Why companies look for a Timocom alternative
        </h2>

        <p>
          Many companies do not only want load visibility. They also want better
          insight into logistics partners, cargo delivery risk, and cooperation reliability.
        </p>

        <p>
          A strong alternative should help users evaluate trust, not only discover offers.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">
          CarrierTrust as a trust layer for logistics
        </h2>

        <p>
          CarrierTrust focuses on company reviews, verification, trust signals,
          and logistics risk visibility across Europe.
        </p>

        <p>
          This gives transport companies another layer of protection before they
          agree on cargo delivery terms or start working with a new partner.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">
          Timocom, cargo.lt, and partner checks
        </h2>

        <p>
          Whether a company finds loads through Timocom, cargo.lt, or other freight
          exchanges, the trust check should happen separately.
        </p>

        <p>
          Reviews, verification status, and payment-related signals can help reduce
          fraud risk and improve logistics decision-making.
        </p>
      </section>
    </main>
  );
}