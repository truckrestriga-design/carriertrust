"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type BillingRow = {
  plan_row_id: string;
  company_id: string;
  company_name: string | null;
  vat_uid: string | null;
  country: string | null;
  billing_email: string | null;
  plan: string | null;
  plan_status: string | null;
  current_period_end: string | null;
  commitment_end: string | null;
  scheduled_plan: string | null;
  scheduled_start_at: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  scheduled_stripe_subscription_id: string | null;
  replies_limit: number | null;
  replies_used: number | null;
};

function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return String(value);
  }
}

function safeText(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

function pillClass(value: string | null | undefined): string {
  const v = String(value || "").toLowerCase();

  if (v === "pro" || v === "active") {
    return "bg-emerald-50 text-emerald-800 border border-emerald-200";
  }

  if (v === "one_month") {
    return "bg-blue-50 text-blue-800 border border-blue-200";
  }

  if (v === "free" || v === "inactive") {
    return "bg-neutral-100 text-neutral-700 border border-neutral-200";
  }

  return "bg-amber-50 text-amber-800 border border-amber-200";
}

function confirmWordForAction(action: string): string {
  if (action === "activate_pro_now") return "ACTIVATE";
  if (action === "cancel_scheduled_pro") return "CANCEL";
  if (action === "extend_one_month_30d") return "EXTEND";
  if (action === "reset_to_free") return "RESET";
  return "";
}

function isPast(value: string | null | undefined): boolean {
  if (!value) return false;
  const t = new Date(value).getTime();
  return Number.isFinite(t) && t < Date.now();
}

function getAlerts(row: BillingRow): string[] {
  const alerts: string[] = [];
  const plan = String(row.plan || "").toLowerCase();
  const status = String(row.plan_status || "").toLowerCase();

  if (!row.billing_email) alerts.push("Missing billing email");

  if (!row.stripe_customer_id && (plan === "one_month" || plan === "pro" || row.scheduled_plan === "pro")) {
    alerts.push("Missing Stripe customer");
  }

  if (plan === "pro" && status === "active" && !row.stripe_subscription_id) {
    alerts.push("Missing Stripe subscription");
  }

  if (String(row.scheduled_plan || "").toLowerCase() === "pro" && !row.scheduled_stripe_subscription_id) {
    alerts.push("Missing scheduled sub");
  }

  if (plan === "one_month" && status === "active" && isPast(row.current_period_end)) {
    alerts.push("Expired ONE MONTH");
  }

  return alerts;
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm text-black/65">
      <span className="font-semibold text-black">{label}:</span> {value}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  tone = "neutral",
}: {
  title: string;
  value: number;
  tone?: "neutral" | "soft";
}) {
  const toneClass =
    tone === "soft"
      ? "border-rose-200/70 bg-rose-50/55"
      : "border-amber-200/70 bg-amber-50/45";

  return (
    <div
      className={`rounded-2xl border px-5 py-5 h-[156px] flex flex-col ${toneClass}`}
    >
      <div className="h-[52px] overflow-hidden">
        <div className="text-[13px] font-semibold uppercase tracking-[0.04em] text-black/70 leading-[1.25] line-clamp-2">
          {title}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="text-[44px] leading-none font-extrabold tabular-nums text-black/85">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function AdminBillingPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<BillingRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewerEmail, setViewerEmail] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [workingId, setWorkingId] = useState<string | null>(null);

  const hero =
    "rounded-[28px] border border-black/10 bg-white/80 backdrop-blur shadow-[0_14px_60px_rgba(15,20,30,0.08)]";
  const btn =
    "inline-flex items-center justify-center rounded-2xl px-4 py-3 bg-black text-white font-semibold hover:bg-black/90 transition shadow-sm disabled:opacity-60";
  const smallBtn =
    "inline-flex items-center justify-center rounded-xl px-3 py-2 border border-black/10 bg-white text-xs font-semibold hover:bg-black/[0.03] transition disabled:opacity-60";

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const res = await supabase.functions.invoke("admin-billing-monitor", {
        body: { action: "list" },
      });

      const data: any = res?.data;
      const fnError: any = res?.error;

      if (fnError) {
        setError(fnError.message || "Could not load billing monitor.");
        setRows([]);
        return;
      }

      if (!data?.ok) {
        setError(String(data?.error || "Could not load billing monitor."));
        setRows([]);
        return;
      }

      setRows(Array.isArray(data.rows) ? data.rows : []);
      setViewerEmail(data.viewer_email || null);
    } catch (e: any) {
      setError(String(e?.message || e));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  async function refreshNow(): Promise<void> {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  async function runAction(row: BillingRow, action: string): Promise<void> {
    const confirmWord = confirmWordForAction(action);

    const typed = window.prompt(
      `Dangerous admin action for "${row.company_name || row.company_id}".\n\nType ${confirmWord} to continue.`
    );

    if (typed !== confirmWord) return;

    setWorkingId(row.plan_row_id);
    setError(null);

    try {
      const res = await supabase.functions.invoke("admin-billing-monitor", {
        body: {
          action,
          plan_row_id: row.plan_row_id,
          company_id: row.company_id,
          confirm_word: confirmWord,
        },
      });

      const data: any = res?.data;
      const fnError: any = res?.error;

      if (fnError) {
        setError(fnError.message || "Action failed.");
        return;
      }

      if (!data?.ok) {
        setError(String(data?.error || "Action failed."));
        return;
      }

      await loadData();
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setWorkingId(null);
    }
  }

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;

    return rows.filter((row) => {
      const alerts = getAlerts(row).join(" ").toLowerCase();

      return [
        row.company_name,
        row.company_id,
        row.billing_email,
        row.plan,
        row.plan_status,
        row.scheduled_plan,
        row.stripe_customer_id,
        row.stripe_subscription_id,
        row.scheduled_stripe_subscription_id,
        row.vat_uid,
        row.country,
        alerts,
      ]
        .map((v) => String(v || "").toLowerCase())
        .some((v) => v.includes(q));
    });
  }, [rows, query]);

  const summary = useMemo(() => {
    let brokenRows = 0;
    let missingBillingEmail = 0;
    let missingStripeCustomer = 0;
    let missingStripeSubscription = 0;
    let missingScheduledSub = 0;
    let expiredOneMonth = 0;

    for (const row of rows) {
      const alerts = getAlerts(row);
      if (alerts.length > 0) brokenRows += 1;
      if (alerts.includes("Missing billing email")) missingBillingEmail += 1;
      if (alerts.includes("Missing Stripe customer")) missingStripeCustomer += 1;
      if (alerts.includes("Missing Stripe subscription")) missingStripeSubscription += 1;
      if (alerts.includes("Missing scheduled sub")) missingScheduledSub += 1;
      if (alerts.includes("Expired ONE MONTH")) expiredOneMonth += 1;
    }

    return {
      brokenRows,
      missingBillingEmail,
      missingStripeCustomer,
      missingStripeSubscription,
      missingScheduledSub,
      expiredOneMonth,
    };
  }, [rows]);

  if (loading) {
    return (
      <main className="min-h-screen text-black">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="text-black/70">Loading billing monitor…</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-16">
        <div className={`p-7 ${hero}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-[34px] leading-[1.05] font-extrabold tracking-tight">
                Admin Billing Monitor
              </h1>
              <p className="mt-2 text-sm text-black/60">
                Internal overview of plans, billing dates, scheduled upgrades, Stripe ids, quick actions, and billing alerts.
              </p>
              {viewerEmail ? (
                <div className="mt-3 text-sm text-black/60">
                  Signed in as <span className="font-semibold text-black">{viewerEmail}</span>
                </div>
              ) : null}
            </div>

            <div className="w-full lg:w-[360px]">
              <div className="mb-3 flex justify-start lg:justify-end">
                <button onClick={refreshNow} disabled={refreshing} className={btn}>
                  {refreshing ? "Refreshing…" : "Refresh"}
                </button>
              </div>

              <label className="block text-xs font-semibold uppercase tracking-wide text-black/45 mb-2">
                Search
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Company, email, plan, Stripe id, alert…"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/25"
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
            <SummaryCard title="NOT CLAIMED YET" value={summary.brokenRows} tone="soft" />
            <SummaryCard title="NO BILLING EMAIL YET" value={summary.missingBillingEmail} tone="neutral" />
            <SummaryCard title="NO STRIPE CUSTOMER YET" value={summary.missingStripeCustomer} tone="neutral" />
            <SummaryCard title="NO STRIPE SUBSCRIPTION YET" value={summary.missingStripeSubscription} tone="neutral" />
            <SummaryCard title="EXPIRED ONE MONTH" value={summary.expiredOneMonth} tone="soft" />
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-950">
              <div className="font-semibold">Billing action error</div>
              <div className="mt-1">{error}</div>
            </div>
          ) : null}

          <div className="mt-6 text-sm text-black/55">
            Companies: <span className="font-semibold text-black">{filteredRows.length}</span>
          </div>

          <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredRows.map((row) => {
              const alerts = getAlerts(row);

              return (
                <div
                  key={row.plan_row_id}
                  className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xl font-extrabold tracking-tight text-black">
                          {safeText(row.company_name)}
                        </div>
                        <div className="mt-2 space-y-1">
                          <InfoLine label="Plan row ID" value={row.plan_row_id} />
                          <InfoLine label="Company ID" value={row.company_id} />
                          <InfoLine label="VAT" value={safeText(row.vat_uid)} />
                          <InfoLine label="Country" value={safeText(row.country)} />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-end">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${pillClass(row.plan)}`}>
                          {safeText(row.plan)}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${pillClass(row.plan_status)}`}>
                          {safeText(row.plan_status)}
                        </span>
                        {row.scheduled_plan ? (
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${pillClass(row.scheduled_plan)}`}>
                            scheduled: {safeText(row.scheduled_plan)}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                        <div className="text-sm font-semibold text-black">Plan details</div>
                        <div className="mt-3 space-y-2">
                          <InfoLine label="Current period end" value={formatDateTime(row.current_period_end)} />
                          <InfoLine label="Commitment end" value={formatDateTime(row.commitment_end)} />
                          <InfoLine label="Scheduled start" value={formatDateTime(row.scheduled_start_at)} />
                          <InfoLine
                            label="Replies"
                            value={`${safeText(row.replies_used)} / ${safeText(row.replies_limit)}`}
                          />
                        </div>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                        <div className="text-sm font-semibold text-black">Billing & Stripe</div>
                        <div className="mt-3 space-y-2">
                          <InfoLine label="Billing email" value={safeText(row.billing_email)} />
                          <InfoLine label="Stripe customer" value={safeText(row.stripe_customer_id)} />
                          <InfoLine label="Stripe subscription" value={safeText(row.stripe_subscription_id)} />
                          <InfoLine
                            label="Scheduled subscription"
                            value={safeText(row.scheduled_stripe_subscription_id)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-black">Alerts</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {alerts.length > 0 ? (
                          alerts.map((alert) => (
                            <span
                              key={alert}
                              className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-800"
                            >
                              {alert}
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                            OK
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-black">Actions</div>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          className={smallBtn}
                          disabled={workingId === row.plan_row_id}
                          onClick={() => runAction(row, "activate_pro_now")}
                        >
                          {workingId === row.plan_row_id ? "Working…" : "Activate PRO now"}
                        </button>

                        <button
                          className={smallBtn}
                          disabled={workingId === row.plan_row_id}
                          onClick={() => runAction(row, "cancel_scheduled_pro")}
                        >
                          {workingId === row.plan_row_id ? "Working…" : "Cancel scheduled PRO"}
                        </button>

                        <button
                          className={smallBtn}
                          disabled={workingId === row.plan_row_id}
                          onClick={() => runAction(row, "extend_one_month_30d")}
                        >
                          {workingId === row.plan_row_id ? "Working…" : "Extend ONE MONTH +30d"}
                        </button>

                        <button
                          className={`${smallBtn} border-red-200 text-red-700 hover:bg-red-50`}
                          disabled={workingId === row.plan_row_id}
                          onClick={() => runAction(row, "reset_to_free")}
                        >
                          {workingId === row.plan_row_id ? "Working…" : "Reset to FREE"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredRows.length === 0 ? (
              <div className="rounded-[24px] border border-black/10 bg-white p-10 text-center text-black/45">
                Nothing found.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}