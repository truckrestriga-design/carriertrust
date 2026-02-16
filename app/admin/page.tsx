"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Lang = "en" | "de" | "ru";

const TEXT: Record<
  Lang,
  {
    title: string;
    accessDenied: string;
    loading: string;
    filter: string;
    all: string;
    pending: string;
    published: string;
    edit: string;
    approve: string;
    del: string;
    cancel: string;
    save: string;
    saving: string;
    deleteConfirm: string;
    editTitle: string;
    fieldIssue: string;
    fieldRating: string;
    fieldText: string;
    searchPlaceholder: string;
    noResults: string;
  }
> = {
  en: {
    title: "Admin panel",
    accessDenied: "Access denied.",
    loading: "Loading...",
    filter: "Filter",
    all: "All",
    pending: "Pending",
    published: "Published",
    edit: "Edit",
    approve: "Approve",
    del: "Delete",
    cancel: "Cancel",
    save: "Save changes",
    saving: "Saving...",
    deleteConfirm: "Delete this review permanently?",
    editTitle: "Edit review",
    fieldIssue: "Issue type",
    fieldRating: "Rating",
    fieldText: "Review text",
    searchPlaceholder: "Search in published (company / VAT / text)…",
    noResults: "No results for your search.",
  },
  de: {
    title: "Admin Panel",
    accessDenied: "Kein Zugriff.",
    loading: "Laden...",
    filter: "Filter",
    all: "Alle",
    pending: "Ausstehend",
    published: "Veröffentlicht",
    edit: "Bearbeiten",
    approve: "Freigeben",
    del: "Löschen",
    cancel: "Abbrechen",
    save: "Speichern",
    saving: "Speichert...",
    deleteConfirm: "Diese Bewertung wirklich löschen?",
    editTitle: "Bewertung bearbeiten",
    fieldIssue: "Problemtyp",
    fieldRating: "Bewertung",
    fieldText: "Text",
    searchPlaceholder: "Suche in veröffentlicht (Firma / VAT / Text)…",
    noResults: "Keine Treffer.",
  },
  ru: {
    title: "Админка",
    accessDenied: "Доступ запрещён.",
    loading: "Загрузка...",
    filter: "Фильтр",
    all: "Все",
    pending: "Ожидают",
    published: "Опубликованы",
    edit: "Редактировать",
    approve: "Подтвердить",
    del: "Удалить",
    cancel: "Отмена",
    save: "Сохранить",
    saving: "Сохраняю...",
    deleteConfirm: "Удалить отзыв навсегда?",
    editTitle: "Редактирование отзыва",
    fieldIssue: "Тип проблемы",
    fieldRating: "Рейтинг",
    fieldText: "Текст отзыва",
    searchPlaceholder: "Поиск в опубликованных (компания / VAT / текст)…",
    noResults: "Ничего не найдено.",
  },
};

type ProblemKey = "non_payment" | "late_payment" | "dispute" | "fraud" | "other";

type ReviewRow = {
  id: string;
  company_id: string;
  rating: number;
  issue_type: ProblemKey | string;
  review_text: string;
  status: "pending" | "published" | "hidden" | string;
  created_at: string;
  author_email?: string | null;

  companies?: {
    name?: string;
    vat_uid?: string;
    country?: string;
  };
};

export default function AdminPage() {
  const supabase = getSupabaseBrowserClient();

  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => TEXT[lang], [lang]);

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const [filter, setFilter] = useState<"all" | "pending" | "published">("pending");

  // ✅ Search
  const [searchTerm, setSearchTerm] = useState("");

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState<ReviewRow | null>(null);
  const [editIssue, setEditIssue] = useState<ProblemKey>("non_payment");
  const [editRating, setEditRating] = useState<number>(5);
  const [editText, setEditText] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de" || saved === "ru") setLang(saved);

    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.href = "/auth?next=/admin";
        return;
      }

      const { data: prof, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("user_id", data.user.id)
        .single();

      if (error || !prof?.is_admin) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      await loadReviews("pending");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadReviews(nextFilter: typeof filter) {
    setLoading(true);
    setMsg(null);
    setFilter(nextFilter);
    setSearchTerm("");

    let q = supabase
      .from("reviews")
      .select(
        "id,company_id,rating,issue_type,review_text,status,created_at,author_email,companies(name,vat_uid,country)"
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (nextFilter !== "all") q = q.eq("status", nextFilter);

    const { data, error } = await q;

    if (error) {
      setMsg(error.message);
      setRows([]);
      setLoading(false);
      return;
    }

    setRows((data || []) as ReviewRow[]);
    setLoading(false);
  }

  async function approve(id: string) {
    setMsg(null);

    const { error } = await supabase.from("reviews").update({ status: "published" }).eq("id", id);
    if (error) return setMsg(error.message);

    // ✅ email to author (approve)
    const { error: fnErr } = await supabase.functions.invoke("notify-review-status", {
      body: { review_id: id, new_status: "published" },
    });
    if (fnErr) setMsg("Approved, but email failed: " + fnErr.message);

    await loadReviews(filter);
  }

  function openEdit(r: ReviewRow) {
    setEditRow(r);
    setEditIssue((r.issue_type as ProblemKey) || "non_payment");
    setEditRating(typeof r.rating === "number" ? r.rating : 5);
    setEditText(r.review_text || "");
    setEditOpen(true);
  }

  async function saveEdit() {
    if (!editRow) return;

    setSaving(true);
    setMsg(null);

    const { error } = await supabase
      .from("reviews")
      .update({
        issue_type: editIssue,
        rating: editRating,
        review_text: editText,
      })
      .eq("id", editRow.id);

    setSaving(false);

    if (error) return setMsg(error.message);

    setEditOpen(false);
    setEditRow(null);
    await loadReviews(filter);
  }

  async function del(id: string) {
    if (!confirm(t.deleteConfirm)) return;

    setMsg(null);

    // ✅ email to author (delete) BEFORE delete (function reads review)
    const { error: fnErr } = await supabase.functions.invoke("notify-review-deleted", {
      body: { review_id: id },
    });
    if (fnErr) setMsg("Delete: email failed: " + fnErr.message);

    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return setMsg(error.message);

    await loadReviews(filter);
  }

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900 text-black placeholder:text-gray-400 caret-black";

  // ✅ client-side filtered rows for published/all
  const shownRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rows;

    return rows.filter((r) => {
      const name = (r.companies?.name || "").toLowerCase();
      const vat = (r.companies?.vat_uid || "").toLowerCase();
      const text = (r.review_text || "").toLowerCase();
      return name.includes(term) || vat.includes(term) || text.includes(term);
    });
  }, [rows, searchTerm]);

  if (!isAdmin && !loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="min-h-screen flex items-center justify-center px-4 pt-24">
          <div className="w-full max-w-md border border-gray-200 rounded-2xl p-6 shadow-sm bg-white text-center">
            <div className="flex justify-center">
              <img src="/logo.png" alt="CarrierTrust" className="w-64" />
            </div>

            <div className="mt-6 text-sm text-red-800 border border-red-200 bg-red-50 rounded-xl p-3">
              {t.accessDenied}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="min-h-screen flex items-start justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-4xl border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
          <div className="flex justify-center">
            <img src="/logo.png" alt="CarrierTrust" className="w-64" />
          </div>

          <h1 className="mt-4 text-lg font-semibold text-gray-900 text-center">
            {t.title}
          </h1>

          {msg && (
            <div className="mt-4 text-sm text-red-800 border border-red-200 bg-red-50 rounded-xl p-3">
              {msg}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-gray-900">{t.filter}</div>

            <select
              className="border border-gray-300 rounded-xl px-4 py-2 text-black"
              value={filter}
              onChange={(e) => loadReviews(e.target.value as any)}
            >
              <option value="pending">{t.pending}</option>
              <option value="published">{t.published}</option>
              <option value="all">{t.all}</option>
            </select>
          </div>

          {/* ✅ Search only on Published / All */}
          {(filter === "published" || filter === "all") && (
            <div className="mt-4">
              <input
                className={inputClass}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
              />
            </div>
          )}

          {loading ? (
            <p className="mt-6 text-center text-black">{t.loading}</p>
          ) : (
            <div className="mt-6 space-y-3">
              {shownRows.length === 0 ? (
                <div className="text-sm text-gray-700 border border-gray-200 bg-gray-50 rounded-xl p-3 text-center">
                  {t.noResults}
                </div>
              ) : (
                shownRows.map((r) => (
                  <div key={r.id} className="border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-black">
                          {r.companies?.name || "Company"}{" "}
                          <span className="text-gray-600 text-sm">
                            • {r.companies?.country || ""} • VAT: {r.companies?.vat_uid || ""}
                          </span>
                        </div>

                        <div className="mt-1 text-sm text-gray-800">
                          ⭐ {r.rating}/5 • {r.issue_type} •{" "}
                          <span className="font-semibold">{r.status}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {r.status !== "published" && (
                          <button
                            onClick={() => approve(r.id)}
                            className="px-3 py-1 rounded-lg border border-gray-400 text-sm font-semibold text-black hover:bg-gray-100"
                          >
                            {t.approve}
                          </button>
                        )}

                        <button
                          onClick={() => openEdit(r)}
                          className="px-3 py-1 rounded-lg border border-gray-400 text-sm font-semibold text-black hover:bg-gray-100"
                        >
                          {t.edit}
                        </button>

                        <button
                          onClick={() => del(r.id)}
                          className="px-3 py-1 rounded-lg border border-gray-400 text-sm font-semibold text-black hover:bg-gray-100"
                        >
                          {t.del}
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-900 whitespace-pre-wrap">{r.review_text}</p>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && editRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setEditOpen(false)} />

          <div className="relative w-full max-w-md border border-gray-200 rounded-2xl p-6 shadow-xl bg-white">
            <h2 className="text-lg font-semibold text-gray-900 text-center">
              {t.editTitle}
            </h2>

            <div className="mt-5 space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-900">
                  {t.fieldIssue}
                </label>
                <select
                  className={inputClass}
                  value={editIssue}
                  onChange={(e) => setEditIssue(e.target.value as any)}
                >
                  <option value="non_payment">non_payment</option>
                  <option value="late_payment">late_payment</option>
                  <option value="dispute">dispute</option>
                  <option value="fraud">fraud</option>
                  <option value="other">other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-900">
                  {t.fieldRating}
                </label>
                <input
                  className={inputClass}
                  type="number"
                  min={1}
                  max={5}
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-900">
                  {t.fieldText}
                </label>
                <textarea
                  className={inputClass}
                  rows={6}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50"
                >
                  {t.cancel}
                </button>

                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={saving}
                  className="flex-1 px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-60"
                >
                  {saving ? t.saving : t.save}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
