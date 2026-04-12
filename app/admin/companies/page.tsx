"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type CompanyRow = {
  id: string;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
  created_at: string | null;
  is_verified_company: boolean | null;
  verified_at: string | null;
  published_reviews_count: number | null;
  avg_rating: number | null;
  trust_score: number | null;
};

type FilterType =
  | "all"
  | "verified"
  | "unverified"
  | "with_reviews"
  | "no_reviews";

const ADMIN_EMAIL = "carriertrust.eu@gmail.com";

export default function AdminCompaniesPage() {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [rows, setRows] = useState<CompanyRow[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editVatUid, setEditVatUid] = useState("");
  const [editCountry, setEditCountry] = useState("");

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

  async function loadCompanies() {
    setMsg(null);

    if (!SUPABASE_URL) {
      setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
      setRows([]);
      return;
    }

    try {
      const headers = await getFunctionHeaders();
      const url = new URL(`${SUPABASE_URL}/functions/v1/admin-companies`);
      url.searchParams.set("limit", "500");
      url.searchParams.set("filter", filter);

      if (q.trim()) {
        url.searchParams.set("q", q.trim());
      }

      const resp = await fetch(url.toString(), {
        method: "GET",
        headers,
      });

      const out = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        setMsg(
          out?.error || out?.details || `Failed to load companies (${resp.status})`
        );
        setRows([]);
        return;
      }

      if (!out?.ok) {
        setMsg(out?.error || "Failed to load companies");
        setRows([]);
        return;
      }

      setRows(out.rows || []);
    } catch (e: any) {
      setMsg(String(e?.message || e));
      setRows([]);
    }
  }

  async function callVerifyFunction(company_id: string, action: "verify" | "unverify") {
    setMsg(null);
    setBusyId(company_id);

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

      await loadCompanies();
      setMsg(action === "verify" ? "Company verified." : "Company unverified.");
      setTimeout(() => setMsg(null), 1400);
    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setBusyId(null);
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

  function openEdit(row: CompanyRow) {
    setEditCompanyId(row.id);
    setEditName(row.name || "");
    setEditVatUid(row.vat_uid || "");
    setEditCountry(row.country || "");
    setEditOpen(true);
  }

  async function saveEdit() {
    if (!editCompanyId) return;

    const name = editName.trim();
    const vat_uid = editVatUid.trim().toUpperCase();
    const country = editCountry.trim();

    if (!name) {
      setMsg("Company name is required.");
      return;
    }

    if (!vat_uid) {
      setMsg("VAT UID is required.");
      return;
    }

    if (!country) {
      setMsg("Country is required.");
      return;
    }

    setMsg(null);
    setBusyId(editCompanyId);

    try {
      if (!SUPABASE_URL) {
        setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
        return;
      }

      const headers = await getFunctionHeaders();

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/admin-companies`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          company_id: editCompanyId,
          action: "update",
          name,
          vat_uid,
          country,
        }),
      });

      const out = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        setMsg(
          out?.error || out?.details || `Failed to update company (${resp.status})`
        );
        return;
      }

      if (!out?.ok) {
        setMsg(out?.error || "Failed to update company");
        return;
      }

      setEditOpen(false);
      setEditCompanyId(null);
      await loadCompanies();
      setMsg("Company updated.");
      setTimeout(() => setMsg(null), 1400);
    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setBusyId(null);
    }
  }

  async function deleteCompany(company_id: string) {
    const confirmWord = prompt("Type DELETE to remove company permanently");
    if (confirmWord !== "DELETE") return;

    setMsg(null);
    setBusyId(company_id);

    try {
      if (!SUPABASE_URL) {
        setMsg("Missing NEXT_PUBLIC_SUPABASE_URL");
        return;
      }

      const headers = await getFunctionHeaders();

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/admin-companies`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({
          company_id,
          confirm: "DELETE",
        }),
      });

      const out = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        setMsg(
          out?.error || out?.details || `Failed to delete company (${resp.status})`
        );
        return;
      }

      if (!out?.ok) {
        setMsg(out?.error || "Failed to delete company");
        return;
      }

      await loadCompanies();
      setMsg("Company deleted.");
      setTimeout(() => setMsg(null), 1400);
    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setBusyId(null);
    }
  }

  useEffect(() => {
    (async () => {
      const ok = await requireAdminOrRedirect();
      if (!ok) return;

      await loadCompanies();
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="p-10 text-black">Loading…</div>;
  }

  return (
    <main className="min-h-screen text-black px-6">
      <div className="max-w-7xl mx-auto pt-28 pb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Companies</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage all companies, including imported companies without reviews.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
            >
              Back to Admin
            </Link>

            <button
              onClick={async () => {
                setRefreshing(true);
                try {
                  await loadCompanies();
                  setMsg("Companies refreshed.");
                  setTimeout(() => setMsg(null), 1200);
                } finally {
                  setRefreshing(false);
                }
              }}
              disabled={refreshing}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {msg && (
          <div className="mt-4 text-sm border rounded-xl p-3 bg-gray-50 text-gray-800">
            {msg}
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company name, VAT, country…"
            className="w-full sm:max-w-xl border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="w-full sm:w-52 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900 bg-white"
          >
            <option value="all">All companies</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="with_reviews">With reviews</option>
            <option value="no_reviews">No reviews</option>
          </select>

          <button
            onClick={loadCompanies}
            className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
          >
            Search
          </button>

          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{rows.length}</span>
          </div>
        </div>

        <div className="mt-6 overflow-auto border border-gray-200 rounded-2xl bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Country</th>
                <th className="text-left p-3">Reviews</th>
                <th className="text-left p-3">Rating</th>
                <th className="text-left p-3">Trust</th>
                <th className="text-left p-3">Created</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => {
                const isVerified = Boolean(r.is_verified_company);

                return (
                  <tr key={r.id} className="border-t border-gray-200 align-top">
                    <td className="p-3">
                      <div className="font-semibold flex items-center gap-2">
                        <span>{r.name || "—"}</span>
                        {isVerified ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                            Verified
                          </span>
                        ) : null}
                      </div>
                      <div className="text-xs text-gray-500">VAT: {r.vat_uid || "—"}</div>
                      <div className="text-xs text-gray-500">ID: {r.id}</div>
                    </td>

                    <td className="p-3">{r.country || "—"}</td>
                    <td className="p-3">{r.published_reviews_count ?? 0}</td>
                    <td className="p-3">{r.avg_rating ?? "—"}</td>
                    <td className="p-3">{r.trust_score ?? "—"}</td>
                    <td className="p-3 text-xs text-gray-600">
                      {r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`/companies/${r.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
                        >
                          Open
                        </a>

                        {!isVerified ? (
                          <button
                            onClick={() => verifyCompany(r.id)}
                            disabled={busyId === r.id}
                            className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"
                          >
                            {busyId === r.id ? "Working..." : "Verify"}
                          </button>
                        ) : (
                          <button
                            onClick={() => unverifyCompany(r.id)}
                            disabled={busyId === r.id}
                            className="px-3 py-1.5 rounded-lg border border-red-300 bg-red-50 text-red-800 hover:bg-red-100 disabled:opacity-60"
                          >
                            {busyId === r.id ? "Working..." : "Unverify"}
                          </button>
                        )}

                        <button
                          onClick={() => openEdit(r)}
                          disabled={busyId === r.id}
                          className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCompany(r.id)}
                          disabled={busyId === r.id}
                          className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-60"
                        >
                          {busyId === r.id ? "Working..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 && (
                <tr>
                  <td className="p-6 text-gray-500" colSpan={7}>
                    No companies found.
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
                  <h2 className="text-lg font-semibold">Edit company</h2>
                  <p className="text-sm text-gray-600">
                    Update company name, VAT, and country.
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
                <label className="text-sm font-semibold">Company name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-semibold">VAT UID</label>
                <input
                  value={editVatUid}
                  onChange={(e) => setEditVatUid(e.target.value.toUpperCase())}
                  className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900"
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-semibold">Country</label>
                <input
                  value={editCountry}
                  onChange={(e) => setEditCountry(e.target.value)}
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
                  disabled={busyId === editCompanyId}
                >
                  {busyId === editCompanyId ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}