"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "carriertrust.eu@gmail.com";

type AgentCard = {
  title: string;
  description: string;
  status: string;
};

const AGENTS: AgentCard[] = [
  {
    title: "Sales Agent",
    description:
      "Prepares outreach and follow-up drafts for sales conversations. Review and approve before any send.",
    status: "Stub — drafts only",
  },
  {
    title: "PR Agent",
    description:
      "Drafts PR and communication copy for review. Nothing is published or emailed automatically.",
    status: "Stub — drafts only",
  },
  {
    title: "Inbox AI",
    description:
      "Suggests reply drafts for inbound messages. Sends only after explicit human approval.",
    status: "Stub — drafts only",
  },
  {
    title: "Learning",
    description:
      "Placeholder for agent learning signals and feedback. No live model training or external sync yet.",
    status: "Stub — offline",
  },
];

export default function AdminGrowthPage() {
  const [loading, setLoading] = useState(true);

  async function requireAdminOrRedirect() {
    const { data } = await supabase.auth.getUser();
    const email = (data.user?.email || "").toLowerCase();

    if (!data.user || email !== ADMIN_EMAIL.toLowerCase()) {
      window.location.href = "/";
      return false;
    }

    return true;
  }

  useEffect(() => {
    (async () => {
      const ok = await requireAdminOrRedirect();
      if (!ok) return;
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="p-10 text-black">Loading…</div>;
  }

  return (
    <main className="min-h-screen text-black px-6">
      <div className="max-w-6xl mx-auto pt-36 md:pt-40 pb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Growth AI</h1>
            <p className="mt-1 text-sm text-gray-600">
              Closed admin dashboard for Sales, PR, Inbox, and Learning agents.
              Agents create Drafts only — nothing is sent automatically.
            </p>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
          >
            Back to Admin
          </Link>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Safety mode: all agents produce Drafts for human review. No automatic
          sends, publishes, or Zoho sync in this build.
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AGENTS.map((agent) => (
            <section
              key={agent.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">{agent.title}</h2>
                <span className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
                  {agent.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{agent.description}</p>
              <p className="mt-4 text-xs text-gray-500">
                Coming soon — no live actions on this page yet.
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
