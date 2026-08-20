"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "carriertrust.eu@gmail.com";

type ZohoStatus = {
  ok?: boolean;
  connected?: boolean;
  accountEmail?: string | null;
  accountId?: string | null;
  connectedAt?: string | null;
  storage?: {
    bucket: string;
    path: string;
    encryption: string;
  };
  error?: string;
};

export default function AdminGrowthSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ZohoStatus | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function requireAdminOrRedirect() {
    const { data } = await supabase.auth.getUser();
    const email = (data.user?.email || "").toLowerCase();

    if (!data.user || email !== ADMIN_EMAIL.toLowerCase()) {
      window.location.href = "/";
      return false;
    }

    return true;
  }

  async function getAccessToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || "";
  }

  async function loadStatus() {
    const token = await getAccessToken();
    if (!token) {
      setError("Missing session");
      return;
    }

    const res = await fetch("/api/zoho/status", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = (await res.json()) as ZohoStatus;
    if (!res.ok) {
      setError(json.error || "Failed to load Zoho status");
      setStatus(null);
      return;
    }
    setError(null);
    setStatus(json);
  }

  useEffect(() => {
    (async () => {
      const ok = await requireAdminOrRedirect();
      if (!ok) return;

      const params = new URLSearchParams(window.location.search);
      const zoho = params.get("zoho");
      if (zoho === "connected") {
        setBanner("Zoho Mail connected. Tokens stored encrypted server-side.");
      } else if (zoho === "error") {
        setBanner(
          `Zoho connect failed: ${params.get("reason") || "unknown error"}`
        );
      }

      await loadStatus();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function connectZoho() {
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/zoho/connect", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.authorizeUrl) {
        throw new Error(json.error || "Failed to start Zoho OAuth");
      }
      window.location.href = json.authorizeUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Connect failed");
      setBusy(false);
    }
  }

  async function disconnectZoho() {
    if (!window.confirm("Disconnect Zoho Mail and delete stored tokens?")) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const res = await fetch("/api/zoho/status", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = (await res.json()) as ZohoStatus;
      if (!res.ok) {
        throw new Error(json.error || "Disconnect failed");
      }
      setStatus(json);
      setBanner("Zoho Mail disconnected. Encrypted token blob removed.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Disconnect failed");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-black">Loading…</div>;
  }

  return (
    <main className="min-h-screen text-black px-6">
      <div className="max-w-3xl mx-auto pt-36 md:pt-40 pb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Growth Settings</h1>
            <p className="mt-1 text-sm text-gray-600">
              Zoho Mail connection for Growth OS. Phase 1: Inbox/Sent read and
              Drafts only — no automatic sends.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/growth"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Back to Growth
            </Link>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Safety mode: OAuth connect stores encrypted tokens server-side. Client
          secret and tokens never ship to the browser. No send API is exposed in
          this build.
        </div>

        {banner ? (
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
            {banner}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Zoho Mail</h2>
          <p className="mt-2 text-sm text-gray-600">
            Uses your existing Zoho Server-based OAuth client. Refresh/access
            tokens are encrypted with{" "}
            <code className="text-xs">ZOHO_TOKEN_ENCRYPTION_KEY</code> and
            stored in private Supabase Storage.
          </p>

          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-gray-100 py-2">
              <dt className="text-gray-500">Status</dt>
              <dd className="font-medium">
                {status?.connected ? "Connected" : "Not connected"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 py-2">
              <dt className="text-gray-500">Account</dt>
              <dd>{status?.accountEmail || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 py-2">
              <dt className="text-gray-500">Account ID</dt>
              <dd className="font-mono text-xs">
                {status?.accountId || "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-gray-100 py-2">
              <dt className="text-gray-500">Connected at</dt>
              <dd>
                {status?.connectedAt
                  ? new Date(status.connectedAt).toLocaleString()
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <dt className="text-gray-500">Token storage</dt>
              <dd className="text-right font-mono text-xs text-gray-700">
                {status?.storage
                  ? `${status.storage.bucket}/${status.storage.path} (${status.storage.encryption})`
                  : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={connectZoho}
              className="px-4 py-2 rounded-xl border border-black bg-black text-white hover:opacity-90 disabled:opacity-50"
            >
              {status?.connected ? "Reconnect Zoho" : "Connect Zoho Mail"}
            </button>
            <button
              type="button"
              disabled={busy || !status?.connected}
              onClick={disconnectZoho}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              Disconnect
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
