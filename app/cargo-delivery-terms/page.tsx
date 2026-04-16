import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cargo Delivery Terms",
  description:
    "Understand cargo delivery terms, payment conditions, freight deadlines, and logistics agreement risks across Europe.",
  alternates: {
    canonical: "https://carriertrust.eu/cargo-delivery-terms",
  },
  openGraph: {
    title: "Cargo Delivery Terms | CarrierTrust",
    description:
      "Understand cargo delivery terms, payment conditions, freight deadlines, and logistics agreement risks across Europe.",
    url: "https://carriertrust.eu/cargo-delivery-terms",
    siteName: "CarrierTrust",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cargo Delivery Terms | CarrierTrust",
    description:
      "Understand cargo delivery terms, payment conditions, freight deadlines, and logistics agreement risks across Europe.",
  },
};

export default function CargoDeliveryTermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">Cargo Delivery Terms</h1>

      <p className="mb-4 text-lg text-slate-700">
        Cargo delivery terms define payment conditions, deadlines, liability,
        and transport obligations between logistics companies operating across Europe.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">What cargo delivery terms usually include</h2>

        <p>
          In logistics and freight transport, cargo delivery terms often include
          payment deadlines, unloading conditions, waiting times, claim procedures,
          and proof of delivery requirements.
        </p>

        <p>
          Common payment terms in cargo delivery agreements include 15, 30, 45,
          and 60 day payment periods, depending on the company, route, and level
          of trust between partners.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Why cargo delivery terms matter in logistics</h2>

        <p>
          Poorly defined delivery terms increase the risk of payment delays,
          disputes, and fraud. Before accepting a load, logistics companies should
          verify the counterparty, payment reputation, and trust signals.
        </p>

        <p>
          This is especially important in European cargo transport where companies
          often work with new partners across multiple countries and legal systems.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Freight exchanges, Timocom, and cargo.lt</h2>

        <p>
          Companies working through freight exchanges such as Timocom and cargo.lt
          should treat load availability and company trust as two separate checks.
        </p>

        <p>
          A freight exchange can help find cargo, but it does not replace company
          verification, payment risk assessment, and reputation checks before work begins.
        </p>

        <p>
          Before accepting cargo delivery terms from a new partner, review company
          details, payment behavior, and public trust indicators.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">How CarrierTrust helps</h2>

        <p>
          CarrierTrust helps logistics companies assess trust signals, reviews,
          and risk indicators before agreeing to cargo delivery terms.
        </p>

        <p>
          This helps reduce disputes, late payments, and cooperation risks in
          cargo delivery and freight transport across Europe.
        </p>
      </section>
      <section className="mt-12 border-t pt-8">
  <h2 className="mb-4 text-2xl font-semibold">Related logistics trust topics</h2>

  <ul className="space-y-3">
    <li>
      <a href="/timocom-alternative" className="text-blue-600 underline">
        Timocom alternative for logistics trust checks
      </a>
    </li>

    <li>
      <a href="/how-to-check-logistics-company" className="text-blue-600 underline">
        How to check a logistics company before cooperation
      </a>
    </li>
  </ul>
</section>
    </main>
  );
}