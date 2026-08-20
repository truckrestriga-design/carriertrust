"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "carriertrust.eu@gmail.com";

type MailTab = "inbox" | "sent" | "drafts";

type MailListItem = {
  messageId: string;
  folderId?: string;
  subject?: string;
  fromAddress?: string;
  toAddress?: string;
  sender?: string;
  receivedTime?: string | number;
  sentDateInGMT?: string | number;
  status?: string | number;
  isRead?: boolean | null;
};

type MailAttachment = {
  attachmentId: string;
  attachmentName?: string;
  attachmentSize?: number | string;
};

type MailDetail = {
  messageId: string;
  folderId: string;
  subject?: string;
  fromAddress?: string;
  toAddress?: string;
  date?: string | number | null;
  plainTextBody?: string | null;
  htmlBody?: string | null;
  attachments: MailAttachment[];
  isRead?: boolean | null;
};

const TABS: { id: MailTab; label: string }[] = [
  { id: "inbox", label: "Inbox" },
  { id: "sent", label: "Sent" },
  { id: "drafts", label: "Drafts" },
];

function formatMailDate(value?: string | number | null) {
  if (value === undefined || value === null || value === "") return "—";
  const raw = String(value);
  const asNumber = Number(raw);
  const date = Number.isFinite(asNumber) ? new Date(asNumber) : new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString();
}

function formatReadStatus(isRead: boolean | null | undefined) {
  if (isRead === true) return "Read";
  if (isRead === false) return "Unread";
  return "—";
}

function formatBytes(size?: number | string) {
  const n = Number(size);
  if (!Number.isFinite(n) || n < 0) return size != null ? String(size) : "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminGrowthMailPage() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<MailTab>("inbox");
  const [messages, setMessages] = useState<MailListItem[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [notConnected, setNotConnected] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<MailDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

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

  const loadList = useCallback(async (activeTab: MailTab) => {
    setListLoading(true);
    setListError(null);
    setNotConnected(false);
    setSelectedId(null);
    setDetail(null);
    setDetailError(null);

    try {
      const token = await getAccessToken();
      if (!token) {
        setListError("Missing session");
        setMessages([]);
        return;
      }

      const res = await fetch(`/api/zoho/mail/${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (json?.notConnected || /not connected/i.test(String(json?.error || ""))) {
          setNotConnected(true);
          setMessages([]);
          setListError(null);
          return;
        }
        setListError(json?.error || `Failed to load ${activeTab}`);
        setMessages([]);
        return;
      }

      setMessages(Array.isArray(json.messages) ? json.messages : []);
    } catch (e) {
      setListError(e instanceof Error ? e.message : "Failed to load messages");
      setMessages([]);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const ok = await requireAdminOrRedirect();
      if (!ok) return;
      setLoading(false);
      await loadList("inbox");
    })();
  }, [loadList]);

  async function openMessage(item: MailListItem) {
    if (!item.messageId || !item.folderId) {
      setDetailError("Message is missing folderId; cannot load content.");
      return;
    }

    setSelectedId(item.messageId);
    setDetail(null);
    setDetailError(null);
    setDetailLoading(true);

    try {
      const token = await getAccessToken();
      if (!token) {
        setDetailError("Missing session");
        return;
      }

      const qs = new URLSearchParams({
        folderId: String(item.folderId),
      });
      if (item.subject) qs.set("subject", item.subject);
      if (item.fromAddress) qs.set("fromAddress", item.fromAddress);
      if (item.toAddress) qs.set("toAddress", item.toAddress);
      if (item.receivedTime != null) qs.set("receivedTime", String(item.receivedTime));
      if (item.sentDateInGMT != null) {
        qs.set("sentDateInGMT", String(item.sentDateInGMT));
      }
      if (item.status != null) qs.set("status", String(item.status));

      const res = await fetch(
        `/api/zoho/mail/message/${encodeURIComponent(item.messageId)}?${qs}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (json?.notConnected || /not connected/i.test(String(json?.error || ""))) {
          setNotConnected(true);
          setDetailError(null);
          return;
        }
        setDetailError(json?.error || "Failed to load message");
        return;
      }

      setDetail(json.message as MailDetail);
    } catch (e) {
      setDetailError(e instanceof Error ? e.message : "Failed to load message");
    } finally {
      setDetailLoading(false);
    }
  }

  function switchTab(next: MailTab) {
    setTab(next);
    void loadList(next);
  }

  if (loading) {
    return <div className="p-10 text-black">Loading…</div>;
  }

  return (
    <main className="min-h-screen text-black px-6">
      <div className="max-w-6xl mx-auto pt-36 md:pt-40 pb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mail Explorer</h1>
            <p className="mt-1 text-sm text-gray-600">
              Read-only Zoho Mail view for Growth OS. Lists and opens messages
              only — no send, delete, or status changes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/growth/settings"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Settings
            </Link>
            <Link
              href="/admin/growth"
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 inline-flex items-center"
            >
              Back to Growth
            </Link>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Safety mode: Inbox / Sent / Drafts are read-only. Message bodies load
          only when you open a row. No mail send endpoints are used.
        </div>

        {notConnected ? (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Zoho Mail is not connected</h2>
            <p className="mt-2 text-sm text-gray-600">
              Connect Zoho Mail in Growth Settings before using Mail Explorer.
            </p>
            <Link
              href="/admin/growth/settings"
              className="mt-4 inline-flex px-4 py-2 rounded-xl border border-black bg-black text-white hover:opacity-90"
            >
              Open Growth Settings
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => switchTab(t.id)}
                  className={`px-4 py-2 rounded-xl border text-sm ${
                    tab === t.id
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {listError ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {listError}
                <button
                  type="button"
                  onClick={() => loadList(tab)}
                  className="ml-3 underline"
                >
                  Retry
                </button>
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <section className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold capitalize">{tab}</h2>
                  <span className="text-xs text-gray-500">
                    Last {messages.length} of up to 20
                  </span>
                </div>

                {listLoading ? (
                  <div className="p-6 text-sm text-gray-600">Loading messages…</div>
                ) : messages.length === 0 ? (
                  <div className="p-6 text-sm text-gray-600">No messages found.</div>
                ) : (
                  <ul className="divide-y divide-gray-100 max-h-[70vh] overflow-auto">
                    {messages.map((m) => {
                      const active = selectedId === m.messageId;
                      const party =
                        tab === "sent" || tab === "drafts"
                          ? m.toAddress || "—"
                          : m.fromAddress || m.sender || "—";
                      const partyLabel =
                        tab === "sent" || tab === "drafts" ? "To" : "From";

                      return (
                        <li key={m.messageId}>
                          <button
                            type="button"
                            onClick={() => openMessage(m)}
                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                              active ? "bg-gray-50" : ""
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {m.subject || "(no subject)"}
                                </p>
                                <p className="mt-1 text-xs text-gray-600 truncate">
                                  {partyLabel}: {party}
                                </p>
                                <p className="mt-1 text-[11px] text-gray-400 font-mono truncate">
                                  id: {m.messageId}
                                </p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="text-xs text-gray-500">
                                  {formatMailDate(
                                    m.receivedTime ?? m.sentDateInGMT
                                  )}
                                </p>
                                <p className="mt-1 text-[11px] text-gray-500">
                                  {formatReadStatus(m.isRead)}
                                </p>
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <h2 className="font-semibold">Message</h2>
                </div>

                {!selectedId && !detailLoading ? (
                  <div className="p-6 text-sm text-gray-600">
                    Select a message to load its content.
                  </div>
                ) : null}

                {detailLoading ? (
                  <div className="p-6 text-sm text-gray-600">Loading content…</div>
                ) : null}

                {detailError ? (
                  <div className="m-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {detailError}
                  </div>
                ) : null}

                {detail ? (
                  <div className="p-4 space-y-4 max-h-[70vh] overflow-auto">
                    <dl className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <dt className="text-gray-500">Subject</dt>
                        <dd className="font-medium">
                          {detail.subject || "(no subject)"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">From</dt>
                        <dd>{detail.fromAddress || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">To</dt>
                        <dd>{detail.toAddress || "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Date</dt>
                        <dd>{formatMailDate(detail.date)}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Message ID</dt>
                        <dd className="font-mono text-xs">{detail.messageId}</dd>
                      </div>
                    </dl>

                    <div>
                      <h3 className="text-sm font-semibold">Plain text</h3>
                      <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-800">
                        {detail.plainTextBody || "(empty)"}
                      </pre>
                    </div>

                    {detail.htmlBody ? (
                      <div>
                        <h3 className="text-sm font-semibold">HTML body</h3>
                        <pre className="mt-2 whitespace-pre-wrap break-all rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-800 max-h-64 overflow-auto">
                          {detail.htmlBody}
                        </pre>
                      </div>
                    ) : null}

                    <div>
                      <h3 className="text-sm font-semibold">Attachments</h3>
                      {detail.attachments?.length ? (
                        <ul className="mt-2 space-y-1 text-sm">
                          {detail.attachments.map((a) => (
                            <li
                              key={a.attachmentId}
                              className="rounded-lg border border-gray-100 px-3 py-2"
                            >
                              <span className="font-medium">
                                {a.attachmentName || "attachment"}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                {formatBytes(a.attachmentSize)}
                              </span>
                              <div className="mt-0.5 font-mono text-[11px] text-gray-400">
                                {a.attachmentId}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500">
                          No attachments metadata.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
