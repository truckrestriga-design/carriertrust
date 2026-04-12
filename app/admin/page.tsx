"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ReviewRow = {
  id: string;
  created_at: string;
  rating: number | null;
  issue_type: string | null;
  review_text: string | null;
  status: string | null;
  company_id: string | null;
  companies?: {
    name: string | null;
    vat_uid: string | null;
    is_verified_company?: boolean | null;
    verified_at?: string | null;
  } | null;
  review_replies?: { id: string; reply_text: string | null; updated_at: string | null }[] | null;
};

type ReportRow = {
  id: string;
  created_at: string;
  status: "new" | "in_review" | "action_taken" | "rejected";
  admin_notes: string | null;
  processed_at: string | null;
  review_id: string;
  company_id: string;
  company_name: string | null;
  company_vat: string | null;
  page_url: string | null;
  reporter_email: string;
  reporter_company: string | null;
  reason: string;
  details: string | null;
  ip: string | null;
  user_agent: string | null;
};

type AuditRow = {
  id: string;
  admin_email: string | null;
  action: string | null;
  target_company_id: string | null;
  details: any;
  created_at: string;
};

type Tab = "reviews" | "reports" | "replies" | "audit";
type StatusFilter = "all" | "published" | "hidden" | "pending";
type ReportStatusFilter = "all" | "new" | "in_review" | "action_taken" | "rejected";

const ADMIN_EMAIL = "carriertrust.eu@gmail.com";

function badgeReview(s?: string | null) {
  const st = (s || "").toLowerCase();
  if (st === "published") return "bg-green-50 text-green-700 border-green-200";
  if (st === "hidden") return "bg-yellow-50 text-yellow-700 border-yellow-200";
  if (st === "pending") return "bg-gray-50 text-gray-700 border-gray-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
}

function badgeReport(s?: string | null) {
  const st = (s || "").toLowerCase();
  if (st === "new") return "bg-gray-50 text-gray-700 border-gray-200";
  if (st === "in_review") return "bg-yellow-50 text-yellow-700 border-yellow-200";
  if (st === "action_taken") return "bg-green-50 text-green-700 border-green-200";
  if (st === "rejected") return "bg-red-50 text-red-700 border-red-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("reviews");
  const [msg, setMsg] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [trustBusy, setTrustBusy] = useState(false);
  const [trustCompanyId, setTrustCompanyId] = useState("");
  const [trustLimit, setTrustLimit] = useState<number>(50);

  const [verifyBusyCompanyId, setVerifyBusyCompanyId] = useState<string | null>(null);

  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [savingId, setSavingId] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editReason, setEditReason] = useState("Remove personal data / illegal content");

  const [reportRows, setReportRows] = useState<ReportRow[]>([]);
  const [rq, setRq] = useState("");
  const [reportStatus, setReportStatus] = useState<ReportStatusFilter>("all");
  const [reportSaving, setReportSaving] = useState<string | null>(null);

  const [notesOpen, setNotesOpen] = useState(false);
  const [notesId, setNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");

  const [replyRows, setReplyRows] = useState<ReviewRow[]>([]);
  const [replyQ, setReplyQ] = useState("");
  const [replySaving, setReplySaving] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});

  const [auditRows, setAuditRows] = useState<AuditRow[]>([]);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  async function requireAdminOrRedirect() {
    const { data } = await supabase.auth.getUser();
    const email = (data.user?.email || "").toLowerCase();
    if (!data.user || email !== ADMIN_EMAIL.toLowerCase()) {
      window.location.href = "/";
      return false;
    }
    return true;
  }

  async function getFunctionHeaders() {
    if (!SUPABASE_ANON_KEY) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token || "";

    return {
      apikey: SUPABASE_ANON_KEY,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }

  async function recomputeTrustScoreBatch() {
    setMsg(null);

    if (!SUPABASE_URL) {
      setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
      return;
    }

    const lim = Math.max(1, Math.min(200, Number(trustLimit || 50)));

    setTrustBusy(true);
    try {
      const headers = await getFunctionHeaders();
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/recompute-trust-score`, {
        method: "POST",
        headers,
        body: JSON.stringify({ limit: lim }),
      });

      const out = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setMsg(out?.error || out?.details || `Failed to recompute trust score (${resp.status})`);
        return;
      }

      const updated = out?.updated ?? null;
      setMsg(updated !== null ? `Trust score recomputed. Updated: ${updated}` : "Trust score recomputed.");
      setTimeout(() => setMsg(null), 1800);
    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setTrustBusy(false);
    }
  }

  async function recomputeTrustScoreOneCompany() {
    setMsg(null);

    if (!SUPABASE_URL) {
      setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
      return;
    }

    const cid = trustCompanyId.trim();
    if (!cid) {
      setMsg("Enter company_id first.");
      return;
    }

    setTrustBusy(true);
    try {
      const headers = await getFunctionHeaders();
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/recompute-trust-score`, {
        method: "POST",
        headers,
        body: JSON.stringify({ company_id: cid }),
      });

      const out = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setMsg(out?.error || out?.details || `Failed to recompute trust score (${resp.status})`);
        return;
      }

      const item = Array.isArray(out?.items) && out.items.length ? out.items[0] : null;
      if (item?.trust_score != null) {
        setMsg(`Company updated. Score: ${item.trust_score}/100 • level: ${item.trust_level}`);
      } else {
        setMsg("Trust score recomputed for company.");
      }

      setTimeout(() => setMsg(null), 2200);
    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setTrustBusy(false);
    }
  }

  async function callVerifyFunction(company_id: string, action: "verify" | "unverify") {
    setMsg(null);
    setVerifyBusyCompanyId(company_id);

    try {
      const res = await supabase.functions.invoke("admin-verify-company", {
        body: { company_id, action },
      });

      const data: any = (res as any)?.data;
      const error: any = (res as any)?.error;

      if (error) {
        setMsg(`Verify failed: ${error.message || String(error)}`);
        return;
      }

      if (!data?.ok) {
        setMsg(data?.error || "Verify failed.");
        return;
      }

      await loadReviews();
      setMsg(action === "verify" ? "Company verified." : "Company unverified.");
      setTimeout(() => setMsg(null), 1400);
    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setVerifyBusyCompanyId(null);
    }
  }

  async function verifyCompany(company_id: string) {
    const ok = confirm("Mark this company as VERIFIED?");
    if (!ok) return;
    await callVerifyFunction(company_id, "verify");
  }

  async function unverifyCompany(company_id: string) {
    const ok = confirm("Remove VERIFIED status from this company?");
    if (!ok) return;
    await callVerifyFunction(company_id, "unverify");
  }

  async function callReviewAction(
    review_id: string,
    action: "hide" | "publish" | "delete" | "edit",
    extra?: { review_text?: string; edit_reason?: string }
  ) {
    setMsg(null);
    setSavingId(review_id);

    try {
      if (!SUPABASE_URL) {
        setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
        return false;
      }

      const headers = await getFunctionHeaders();

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/admin-reviews`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          review_id,
          action,
          review_text: extra?.review_text ?? null,
          edit_reason: extra?.edit_reason ?? null,
        }),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        setMsg(data?.error || data?.details || `Review action failed (${resp.status})`);
        return false;
      }

      if (!data?.ok) {
        setMsg(data?.error || "Review action failed.");
        return false;
      }

      return true;
    } catch (e: any) {
      setMsg(String(e?.message || e));
      return false;
    } finally {
      setSavingId(null);
    }
  }

  useEffect(() => {
    (async () => {
      setMsg(null);
      const ok = await requireAdminOrRedirect();
      if (!ok) return;

      await loadReviews();
      setLoading(false);
    })();
  }, []);

  async function loadReviews() {
    setMsg(null);

    if (!SUPABASE_URL) {
      setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
      setRows([]);
      return;
    }

    try {
      const headers = await getFunctionHeaders();
      const url = new URL(`${SUPABASE_URL}/functions/v1/admin-reviews-list`);
      url.searchParams.set("limit", "500");

      const resp = await fetch(url.toString(), {
        method: "GET",
        headers,
      });

      const out = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        setMsg(out?.error || out?.details || `Failed to load reviews (${resp.status})`);
        setRows([]);
        return;
      }

      if (!out?.ok) {
        setMsg(out?.error || "Failed to load reviews");
        setRows([]);
        return;
      }

      setRows(out.rows || []);
    } catch (e: any) {
      setMsg(String(e?.message || e));
      setRows([]);
    }
  }

  async function refreshReviews() {
    await loadReviews();
    setMsg("Reviews refreshed.");
    setTimeout(() => setMsg(null), 1200);
  }

  async function setStatus(id: string, status: "published" | "hidden" | "pending") {
    if (status === "pending") {
      setMsg("Pending action is not wired yet.");
      return;
    }

    const ok = await callReviewAction(id, status === "hidden" ? "hide" : "publish");
    if (!ok) return;

    await loadReviews();
    setMsg(status === "hidden" ? "Review hidden." : "Review published.");
    setTimeout(() => setMsg(null), 1200);
  }

  async function removeReview(id: string) {
    const ok = confirm("Delete this review permanently?");
    if (!ok) return;

    const done = await callReviewAction(id, "delete");
    if (!done) return;

    await loadReviews();
    setMsg("Review deleted.");
    setTimeout(() => setMsg(null), 1200);
  }

  function openEdit(r: ReviewRow) {
    setEditId(r.id);
    setEditText(r.review_text || "");
    setEditReason("Remove personal data / illegal content");
    setEditOpen(true);
  }

  async function saveEdit() {
    if (!editId) return;

    const newText = editText.trim();
    if (!newText) {
      alert("Review text cannot be empty.");
      return;
    }

    const ok = await callReviewAction(editId, "edit", {
      review_text: newText,
      edit_reason: editReason,
    });

    if (!ok) return;

    setEditOpen(false);
    setEditId(null);
    await loadReviews();
    setMsg("Review updated.");
    setTimeout(() => setMsg(null), 1200);
  }

  const filteredReviews = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return rows.filter((r) => {
      const st = (r.status || "").toLowerCase();
      if (statusFilter !== "all" && st !== statusFilter) return false;
      if (!needle) return true;

      const companyName = (r.companies?.name || "").toLowerCase();
      const vat = (r.companies?.vat_uid || "").toLowerCase();
      const text = (r.review_text || "").toLowerCase();
      const issue = (r.issue_type || "").toLowerCase();

      return (
        companyName.includes(needle) ||
        vat.includes(needle) ||
        text.includes(needle) ||
        issue.includes(needle) ||
        st.includes(needle)
      );
    });
  }, [rows, q, statusFilter]);

  async function loadReports() {
    setMsg(null);

    if (!SUPABASE_URL) {
      setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
      setReportRows([]);
      return;
    }

    try {
      const headers = await getFunctionHeaders();
      const url = new URL(`${SUPABASE_URL}/functions/v1/admin-reports`);
      url.searchParams.set("limit", "300");
      url.searchParams.set("status", reportStatus);
      if (rq.trim()) url.searchParams.set("q", rq.trim());

      const resp = await fetch(url.toString(), { method: "GET", headers });
      const out = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        setMsg(out?.error || out?.details || `Failed to load reports (${resp.status})`);
        setReportRows([]);
        return;
      }

      setReportRows(out?.data || []);
    } catch (e: any) {
      setMsg(String(e?.message || e));
      setReportRows([]);
    }
  }

  async function refreshReports() {
    await loadReports();
    setMsg("Reports refreshed.");
    setTimeout(() => setMsg(null), 1200);
  }

  async function updateReportStatus(id: string, status: ReportRow["status"]) {
    setMsg(null);
    setReportSaving(id);

    try {
      const headers = await getFunctionHeaders();
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/admin-reports`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id, status }),
      });

      const out = await resp.json().catch(() => ({}));
      setReportSaving(null);

      if (!resp.ok) {
        setMsg(out?.error || out?.details || `Failed to update report (${resp.status})`);
        return;
      }

      await loadReports();
    } catch (e: any) {
      setReportSaving(null);
      setMsg(String(e?.message || e));
    }
  }

  function openNotes(r: ReportRow) {
    setNotesId(r.id);
    setNotesText(r.admin_notes || "");
    setNotesOpen(true);
  }

  async function saveNotes() {
    if (!notesId) return;

    setMsg(null);
    setReportSaving(notesId);

    try {
      const headers = await getFunctionHeaders();
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/admin-reports`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id: notesId, admin_notes: notesText }),
      });

      const out = await resp.json().catch(() => ({}));
      setReportSaving(null);

      if (!resp.ok) {
        setMsg(out?.error || out?.details || `Failed to save notes (${resp.status})`);
        return;
      }

      setNotesOpen(false);
      setNotesId(null);
      await loadReports();
    } catch (e: any) {
      setReportSaving(null);
      setMsg(String(e?.message || e));
    }
  }

  const filteredReports = useMemo(() => {
    const needle = rq.trim().toLowerCase();

    return reportRows.filter((r) => {
      if (reportStatus !== "all" && r.status !== reportStatus) return false;
      if (!needle) return true;

      return [
        r.company_name,
        r.company_vat,
        r.reporter_email,
        r.reporter_company,
        r.reason,
        r.details,
        r.status,
        r.admin_notes,
        r.page_url,
      ]
        .map((v) => String(v || "").toLowerCase())
        .some((v) => v.includes(needle));
    });
  }, [reportRows, rq, reportStatus]);

  async function loadReplies() {
    setMsg(null);

    if (!SUPABASE_URL) {
      setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
      setReplyRows([]);
      return;
    }

    try {
      const headers = await getFunctionHeaders();
      const url = new URL(`${SUPABASE_URL}/functions/v1/admin-replies`);
      url.searchParams.set("limit", "250");
      if (replyQ.trim()) url.searchParams.set("q", replyQ.trim());

      const resp = await fetch(url.toString(), { method: "GET", headers });
      const out = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        setMsg(out?.error || out?.details || `Failed to load replies (${resp.status})`);
        setReplyRows([]);
        return;
      }

      const data: ReviewRow[] = out?.data || [];
      setReplyRows(data);

      const nextDraft: Record<string, string> = {};
      for (const r of data) {
        const existing =
          r.review_replies && r.review_replies[0]?.reply_text
            ? String(r.review_replies[0].reply_text)
            : "";
        nextDraft[r.id] = existing;
      }
      setReplyDraft(nextDraft);
    } catch (e: any) {
      setMsg(String(e?.message || e));
      setReplyRows([]);
    }
  }

  async function saveReply(review_id: string) {
    setMsg(null);
    setReplySaving(review_id);

    try {
      const reply_text = (replyDraft[review_id] || "").trim();

      const res = await supabase.functions.invoke("admin-replies", {
        body: { review_id, reply_text },
      });

      const data: any = (res as any)?.data;
      const error: any = (res as any)?.error;

      if (error) {
        setMsg(error.message || String(error));
        return;
      }

      if (!data?.ok) {
        setMsg(data?.error || "Failed to save reply");
        return;
      }

      await loadReplies();
      setMsg("Reply saved.");
      setTimeout(() => setMsg(null), 1200);
    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setReplySaving(null);
    }
  }

  const filteredReplyRows = useMemo(() => {
    const needle = replyQ.trim().toLowerCase();
    if (!needle) return replyRows;

    return replyRows.filter((r) => {
      return [
        r.companies?.name,
        r.companies?.vat_uid,
        r.review_text,
        r.issue_type,
        r.status,
        r.review_replies?.[0]?.reply_text,
      ]
        .map((v) => String(v || "").toLowerCase())
        .some((v) => v.includes(needle));
    });
  }, [replyRows, replyQ]);

  async function loadAuditLog() {
    setMsg(null);

    try {
      const res = await supabase.functions.invoke("admin-audit-log", {
        body: {},
      });

      const data: any = (res as any)?.data;
      const error: any = (res as any)?.error;

      if (error) {
        setMsg(error.message || String(error));
        setAuditRows([]);
        return;
      }

      if (!data?.ok) {
        setMsg(data?.error || "Failed to load audit log");
        setAuditRows([]);
        return;
      }

      setAuditRows(data.rows || []);
    } catch (e: any) {
      setMsg(String(e?.message || e));
      setAuditRows([]);
    }
  }

  useEffect(() => {
    if (tab === "reports") loadReports();
    if (tab === "replies") loadReplies();
    if (tab === "audit") loadAuditLog();
  }, [tab]);

  if (loading) {
    return <div className="p-10 text-black">Loading…</div>;
  }

  return (
    <main className="min-h-screen text-black px-6">
      <div className="max-w-6xl mx-auto pt-36 md:pt-40 pb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin</h1>
            <p className="mt-1 text-sm text-gray-600">
              Use actions only for policy, legal, and support reasons.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={() => setTab("reviews")}
              className={`px-4 py-2 rounded-xl border ${
                tab === "reviews" ? "border-black bg-black text-white" : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Reviews
            </button>

            <button
              onClick={() => setTab("reports")}
              className={`px-4 py-2 rounded-xl border ${
                tab === "reports" ? "border-black bg-black text-white" : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Reports
            </button>

            <button
              onClick={() => setTab("replies")}
              className={`px-4 py-2 rounded-xl border ${
                tab === "replies" ? "border-black bg-black text-white" : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Replies
            </button>

            <Link
              href="/admin/banner-orders"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Banner Orders
            </Link>

            <Link
              href="/admin/billing"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Billing
            </Link>

            <Link
              href="/admin/companies"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Companies
            </Link>

            <Link
              href="/admin/import-companies"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Import Companies
            </Link>

            <Link
              href="/admin/statistics"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Statistics
            </Link>

            <button
              onClick={() => setTab("audit")}
              className={`px-4 py-2 rounded-xl border ${
                tab === "audit" ? "border-black bg-black text-white" : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Audit Log
            </button>

            <button
              onClick={async () => {
                setRefreshing(true);
                try {
                  if (tab === "reviews") {
                    await refreshReviews();
                  } else if (tab === "reports") {
                    await refreshReports();
                  } else if (tab === "replies") {
                    await loadReplies();
                    setMsg("Replies refreshed.");
                    setTimeout(() => setMsg(null), 1200);
                  } else if (tab === "audit") {
                    await loadAuditLog();
                    setMsg("Audit log refreshed.");
                    setTimeout(() => setMsg(null), 1200);
                  }
                } finally {
                  setRefreshing(false);
                }
              }}
              disabled={refreshing}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-xs text-gray-600 font-semibold">Trust score</div>

              <input
                value={trustCompanyId}
                onChange={(e) => setTrustCompanyId(e.target.value)}
                placeholder="company_id (optional)"
                className="w-[240px] border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-900"
              />

              <button
                onClick={recomputeTrustScoreOneCompany}
                disabled={trustBusy}
                className="px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-60 text-sm"
              >
                {trustBusy ? "Working..." : "Recompute (one)"}
              </button>

              <input
                value={String(trustLimit)}
                onChange={(e) => setTrustLimit(Number(e.target.value))}
                placeholder="limit"
                className="w-[90px] border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-gray-900"
              />

              <button
                onClick={recomputeTrustScoreBatch}
                disabled={trustBusy}
                className="px-3 py-2 rounded-xl bg-black text-white hover:bg-gray-900 disabled:opacity-60 text-sm"
              >
                {trustBusy ? "Working..." : "Recompute (batch)"}
              </button>
            </div>
          </div>
        </div>

        {msg && <div className="mt-4 text-sm border rounded-xl p-3 bg-gray-50 text-gray-800">{msg}</div>}

        {tab === "reviews" && (
          <>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search company name, VAT, text…"
                className="w-full sm:max-w-xl border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="w-full sm:w-48 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900 bg-white"
              >
                <option value="all">All statuses</option>
                <option value="published">Published</option>
                <option value="hidden">Hidden</option>
                <option value="pending">Pending</option>
              </select>

              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredReviews.length}</span> / {rows.length}
              </div>
            </div>

            <div className="mt-6 overflow-auto border border-gray-200 rounded-2xl bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left p-3">Company</th>
                    <th className="text-left p-3">Rating</th>
                    <th className="text-left p-3">Issue</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Created</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReviews.map((r) => {
                    const cid = r.company_id || "";
                    const isVerified = Boolean(r.companies?.is_verified_company);

                    return (
                      <tr key={r.id} className="border-t border-gray-200 align-top">
                        <td className="p-3">
                          <div className="font-semibold flex items-center gap-2">
                            <span>{r.companies?.name || "—"}</span>
                            {isVerified ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                                Verified
                              </span>
                            ) : null}
                          </div>

                          <div className="text-xs text-gray-500">VAT: {r.companies?.vat_uid || "—"}</div>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {cid ? (
                              <>
                                <a
                                  className="text-xs underline text-gray-700 hover:text-black"
                                  href={`/companies/${cid}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Open company
                                </a>

                                {!isVerified ? (
                                  <button
                                    onClick={() => verifyCompany(cid)}
                                    disabled={verifyBusyCompanyId === cid}
                                    className="text-xs px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"
                                  >
                                    {verifyBusyCompanyId === cid ? "..." : "Verify company"}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => unverifyCompany(cid)}
                                    disabled={verifyBusyCompanyId === cid}
                                    className="text-xs px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 text-red-800 hover:bg-red-100 disabled:opacity-60"
                                  >
                                    {verifyBusyCompanyId === cid ? "..." : "Unverify"}
                                  </button>
                                )}
                              </>
                            ) : null}
                          </div>
                        </td>

                        <td className="p-3">{r.rating ?? "—"}</td>
                        <td className="p-3">{r.issue_type ?? "—"}</td>

                        <td className="p-3">
                          <span className={`inline-block px-2 py-1 rounded-lg border ${badgeReview(r.status)}`}>
                            {r.status || "—"}
                          </span>
                        </td>

                        <td className="p-3 text-xs text-gray-600">{new Date(r.created_at).toLocaleString()}</td>

                        <td className="p-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setStatus(r.id, "hidden")}
                              disabled={savingId === r.id}
                              className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                            >
                              {savingId === r.id ? "Working..." : "Hide"}
                            </button>

                            <button
                              onClick={() => setStatus(r.id, "published")}
                              disabled={savingId === r.id}
                              className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                            >
                              {savingId === r.id ? "Working..." : "Publish"}
                            </button>

                            <button
                              onClick={() => openEdit(r)}
                              disabled={savingId === r.id}
                              className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => removeReview(r.id)}
                              disabled={savingId === r.id}
                              className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-60"
                            >
                              {savingId === r.id ? "Working..." : "Delete"}
                            </button>
                          </div>

                          <div className="mt-2 text-xs text-gray-600 max-w-xl whitespace-pre-wrap">
                            {r.review_text || ""}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredReviews.length === 0 && (
                    <tr>
                      <td className="p-6 text-gray-500" colSpan={6}>
                        No reviews found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {editOpen && (
              <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-lg p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">Edit review</h2>
                      <p className="text-sm text-gray-600">
                        Only edit to remove illegal content or personal data.
                      </p>
                    </div>

                    <button
                      onClick={() => setEditOpen(false)}
                      className="px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-semibold">Reason</label>
                    <select
                      value={editReason}
                      onChange={(e) => setEditReason(e.target.value)}
                      className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900 bg-white"
                    >
                      <option>Remove personal data / illegal content</option>
                      <option>Remove hate speech / threats</option>
                      <option>Remove spam / advertising</option>
                      <option>Remove copyrighted content</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="text-sm font-semibold">Review text</label>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={8}
                      className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setEditOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={saveEdit}
                      className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 disabled:opacity-60"
                      disabled={savingId === editId}
                    >
                      {savingId === editId ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "reports" && (
          <>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                value={rq}
                onChange={(e) => setRq(e.target.value)}
                placeholder="Search company, reporter email, reason, notes…"
                className="w-full sm:max-w-xl border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
              />

              <select
                value={reportStatus}
                onChange={(e) => setReportStatus(e.target.value as ReportStatusFilter)}
                className="w-full sm:w-48 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900 bg-white"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="in_review">In review</option>
                <option value="action_taken">Action taken</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={loadReports}
                className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
              >
                Search
              </button>

              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredReports.length}</span> / {reportRows.length}
              </div>
            </div>

            <div className="mt-6 overflow-auto border border-gray-200 rounded-2xl bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left p-3">Company</th>
                    <th className="text-left p-3">Reporter</th>
                    <th className="text-left p-3">Reason</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Created</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReports.map((r) => (
                    <tr key={r.id} className="border-t border-gray-200 align-top">
                      <td className="p-3">
                        <div className="font-semibold">{r.company_name || "—"}</div>
                        <div className="text-xs text-gray-500">VAT: {r.company_vat || "—"}</div>
                        <div className="text-xs text-gray-500">Company ID: {r.company_id || "—"}</div>

                        {r.page_url ? (
                          <a
                            href={r.page_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-xs underline text-gray-700 hover:text-black"
                          >
                            Open page
                          </a>
                        ) : null}
                      </td>

                      <td className="p-3">
                        <div>{r.reporter_email}</div>
                        <div className="text-xs text-gray-500">{r.reporter_company || "—"}</div>
                        <div className="mt-2 text-[11px] text-gray-400">IP: {r.ip || "—"}</div>
                      </td>

                      <td className="p-3">
                        <div className="font-medium">{r.reason}</div>
                        <div className="mt-2 text-xs text-gray-600 whitespace-pre-wrap max-w-lg">
                          {r.details || "—"}
                        </div>
                      </td>

                      <td className="p-3">
                        <span className={`inline-block px-2 py-1 rounded-lg border ${badgeReport(r.status)}`}>
                          {r.status}
                        </span>

                        {r.processed_at ? (
                          <div className="mt-2 text-xs text-gray-500">
                            Processed: {new Date(r.processed_at).toLocaleString()}
                          </div>
                        ) : null}
                      </td>

                      <td className="p-3 text-xs text-gray-600">{new Date(r.created_at).toLocaleString()}</td>

                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => updateReportStatus(r.id, "in_review")}
                            disabled={reportSaving === r.id}
                            className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                          >
                            In review
                          </button>

                          <button
                            onClick={() => updateReportStatus(r.id, "action_taken")}
                            disabled={reportSaving === r.id}
                            className="px-3 py-1.5 rounded-lg border border-green-300 text-green-700 hover:bg-green-50 disabled:opacity-60"
                          >
                            Action taken
                          </button>

                          <button
                            onClick={() => updateReportStatus(r.id, "rejected")}
                            disabled={reportSaving === r.id}
                            className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-60"
                          >
                            Reject
                          </button>

                          <button
                            onClick={() => openNotes(r)}
                            disabled={reportSaving === r.id}
                            className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                          >
                            Notes
                          </button>
                        </div>

                        {r.admin_notes ? (
                          <div className="mt-3 text-xs text-gray-600 whitespace-pre-wrap max-w-md">
                            <span className="font-semibold text-gray-800">Notes:</span> {r.admin_notes}
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}

                  {filteredReports.length === 0 && (
                    <tr>
                      <td className="p-6 text-gray-500" colSpan={6}>
                        No reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {notesOpen && (
              <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-lg p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">Admin notes</h2>
                      <p className="text-sm text-gray-600">Internal notes for this report.</p>
                    </div>

                    <button
                      onClick={() => setNotesOpen(false)}
                      className="px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-4">
                    <textarea
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      rows={8}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
                      placeholder="Write internal admin notes…"
                    />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => setNotesOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={saveNotes}
                      className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 disabled:opacity-60"
                      disabled={reportSaving === notesId}
                    >
                      {reportSaving === notesId ? "Saving..." : "Save notes"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "replies" && (
          <>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
              <input
                value={replyQ}
                onChange={(e) => setReplyQ(e.target.value)}
                placeholder="Search company, VAT, review text, reply…"
                className="w-full sm:max-w-xl border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
              />

              <button
                onClick={loadReplies}
                className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
              >
                Search
              </button>

              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredReplyRows.length}</span> / {replyRows.length}
              </div>
            </div>

            <div className="mt-6 overflow-auto border border-gray-200 rounded-2xl bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left p-3">Company</th>
                    <th className="text-left p-3">Review</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Reply</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReplyRows.map((r) => (
                    <tr key={r.id} className="border-t border-gray-200 align-top">
                      <td className="p-3">
                        <div className="font-semibold">{r.companies?.name || "—"}</div>
                        <div className="text-xs text-gray-500">VAT: {r.companies?.vat_uid || "—"}</div>
                        <div className="mt-2 text-xs text-gray-500">
                          Created: {new Date(r.created_at).toLocaleString()}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="text-sm whitespace-pre-wrap max-w-xl">{r.review_text || "—"}</div>
                        <div className="mt-2 text-xs text-gray-500">
                          Rating: {r.rating ?? "—"} • Issue: {r.issue_type || "—"}
                        </div>
                      </td>

                      <td className="p-3">
                        <span className={`inline-block px-2 py-1 rounded-lg border ${badgeReview(r.status)}`}>
                          {r.status || "—"}
                        </span>
                      </td>

                      <td className="p-3">
                        <textarea
                          value={replyDraft[r.id] || ""}
                          onChange={(e) =>
                            setReplyDraft((prev) => ({
                              ...prev,
                              [r.id]: e.target.value,
                            }))
                          }
                          rows={5}
                          className="w-[360px] max-w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
                          placeholder="Write or edit reply…"
                        />

                        {r.review_replies?.[0]?.updated_at ? (
                          <div className="mt-2 text-xs text-gray-500">
                            Last updated: {new Date(r.review_replies[0].updated_at).toLocaleString()}
                          </div>
                        ) : null}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => saveReply(r.id)}
                          disabled={replySaving === r.id}
                          className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-900 disabled:opacity-60"
                        >
                          {replySaving === r.id ? "Saving..." : "Save reply"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredReplyRows.length === 0 && (
                    <tr>
                      <td className="p-6 text-gray-500" colSpan={5}>
                        No reply items found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "audit" && (
          <div className="mt-6 overflow-auto border border-gray-200 rounded-2xl bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left p-3">Admin</th>
                  <th className="text-left p-3">Action</th>
                  <th className="text-left p-3">Company ID</th>
                  <th className="text-left p-3">Details</th>
                  <th className="text-left p-3">Created</th>
                </tr>
              </thead>

              <tbody>
                {auditRows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-200 align-top">
                    <td className="p-3">{r.admin_email || "—"}</td>
                    <td className="p-3">{r.action || "—"}</td>
                    <td className="p-3">{r.target_company_id || "—"}</td>
                    <td className="p-3 text-xs text-gray-700">
                      {r.details && Object.keys(r.details).length > 0 ? (
                        <div className="space-y-1">
                          {Object.entries(r.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-semibold text-gray-900">
                                {key
                                  .replace("vat_uid", "vat")
                                  .replace("old_vat", "old vat")
                                  .replace("new_vat", "new vat")}
                                :
                              </span>{" "}
                              <span className="break-all">{String(value ?? "—")}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="p-3 text-xs text-gray-600">{new Date(r.created_at).toLocaleString()}</td>
                  </tr>
                ))}

                {auditRows.length === 0 && (
                  <tr>
                    <td className="p-6 text-gray-500" colSpan={5}>
                      No audit records.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}