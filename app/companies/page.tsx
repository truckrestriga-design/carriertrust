import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import type { Metadata } from "next";
import CompaniesTitle from "@/app/companies/CompaniesTitle";

export const metadata: Metadata = {
  title: "Logistics Companies Directory, Carrier Reviews & Trust Scores",
  description:
    "Browse logistics companies, carrier reviews, freight forwarders and trust scores across Europe on CarrierTrust.",
  alternates: {
    canonical: "https://carriertrust.eu/companies",
  },
};

export default async function CompaniesPage() {
  const { data } = await supabaseServer
    .from("companies")
    .select("id, slug, name, country, vat_uid")
    .order("created_at", { ascending: false })
    .limit(1000);

  const companies = data || [];

  return (
    <main className="min-h-screen px-6 pt-46 pb-24">
      <div className="mx-auto max-w-4xl">
        <CompaniesTitle />

        <div className="grid gap-4">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.slug || company.id}`}
              className="block rounded-xl border border-slate-200 bg-white px-5 py-4 hover:bg-slate-50"
            >
              <div className="text-lg font-semibold text-slate-900">
                {company.name || "Company"}
              </div>

              <div className="text-sm text-slate-500 mt-1">
                {company.country || "—"} • VAT: {company.vat_uid || "—"}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}