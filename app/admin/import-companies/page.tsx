"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type PreviewRow = {
  name: string;
  vat_uid: string;
  country: string;
  row_number: string;
};

type ErrorRow = {
  row_number: string;
  error: string;
};

export default function AdminImportCompaniesPage() {
  const [csvText, setCsvText] = useState(
    "name,vat_uid,country\nGAJA PLUSS OU,EE3243243432,Estonia\nCEBUREK SIA,LV34322532,Latvia"
  );
  const [loading, setLoading] = useState(false);
  const [previewRows, setPreviewRows] = useState<PreviewRow[]>([]);
  const [errors, setErrors] = useState<ErrorRow[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function previewImport() {
    setLoading(true);
    setSummary(null);
    setErrors([]);
    setPreviewRows([]);

    try {
      const res = await supabase.functions.invoke("admin-import-companies", {
        body: {
          mode: "preview",
          csv_text: csvText,
        },
      });

      const data: any = res?.data;
      const fnError: any = res?.error;

      if (fnError) {
        setSummary(fnError.message || "Preview failed.");
        return;
      }

      if (!data?.ok) {
        setSummary(String(data?.error || "Preview failed."));
        return;
      }

      setPreviewRows(data.preview || []);
      setErrors(data.errors || []);
      setSummary(
        `Preview ready. Total: ${data.total_rows}, valid: ${data.valid_rows}, invalid: ${data.invalid_rows}`
      );
    } catch (e: any) {
      setSummary(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function runImport() {
    const ok = window.confirm("Import companies now?");
    if (!ok) return;

    setLoading(true);
    setSummary(null);

    try {
      const res = await supabase.functions.invoke("admin-import-companies", {
        body: {
          mode: "import",
          csv_text: csvText,
        },
      });

      const data: any = res?.data;
      const fnError: any = res?.error;

      if (fnError) {
        setSummary(fnError.message || "Import failed.");
        return;
      }

      if (!data?.ok) {
        setSummary(String(data?.error || "Import failed."));
        return;
      }

      setErrors(data.errors || []);
      setSummary(
        `Import complete. Inserted: ${data.inserted}, updated: ${data.updated}, failed: ${data.failed}`
      );
    } catch (e: any) {
      setSummary(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function handleFileChange(file: File | null) {
    if (!file) return;

    try {
      const text = await file.text();
      setCsvText(text);
      setFileName(file.name);
      setSummary(`Loaded file: ${file.name}`);
      setPreviewRows([]);
      setErrors([]);
    } catch (e: any) {
      setSummary(`Could not read file: ${String(e?.message || e)}`);
    }
  }

  return (
    <main className="min-h-screen text-black px-6">
      <div className="max-w-6xl mx-auto pt-24 pb-16">
        <div className="flex items-center justify-between gap-4">
          <Link href="/admin" className="text-sm text-black/55 hover:text-black transition">
            ← Admin
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/billing"
              className="inline-flex items-center justify-center rounded-2xl px-4 py-3 border border-black/10 bg-white/70 text-sm font-semibold hover:bg-white transition"
            >
              Billing
            </Link>
          </div>
        </div>

        <div className="mt-5 rounded-[28px] border border-black/10 bg-white/80 backdrop-blur shadow-[0_14px_60px_rgba(15,20,30,0.08)] p-7">
          <h1 className="text-[34px] leading-[1.05] font-extrabold tracking-tight">
            Import Companies
          </h1>

          <p className="mt-2 text-sm text-black/60">
            CSV format: <code>name,vat_uid,country</code>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center rounded-2xl px-4 py-3 border border-black/10 bg-white/70 text-sm font-semibold hover:bg-white transition"
            >
              Choose CSV file
            </button>

            {fileName ? (
              <div className="inline-flex items-center rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm">
                {fileName}
              </div>
            ) : null}
          </div>

          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={14}
            className="mt-6 w-full rounded-2xl border border-black/10 bg-white px-4 py-4 outline-none focus:border-black/25 font-mono text-sm"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={previewImport}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl px-4 py-3 bg-black text-white font-semibold hover:bg-black/90 transition shadow-sm disabled:opacity-60"
            >
              {loading ? "Working..." : "Preview"}
            </button>

            <button
              onClick={runImport}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-2xl px-4 py-3 border border-black/10 bg-white/70 text-sm font-semibold hover:bg-white transition disabled:opacity-60"
            >
              {loading ? "Working..." : "Import"}
            </button>
          </div>

          {summary ? (
            <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm">
              {summary}
            </div>
          ) : null}

          {previewRows.length > 0 ? (
            <div className="mt-6 overflow-auto rounded-2xl border border-black/10 bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-black/[0.03]">
                  <tr>
                    <th className="text-left p-3">Row</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">VAT</th>
                    <th className="text-left p-3">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row) => (
                    <tr key={row.row_number} className="border-t border-black/6">
                      <td className="p-3">{row.row_number}</td>
                      <td className="p-3">{row.name}</td>
                      <td className="p-3">{row.vat_uid}</td>
                      <td className="p-3">{row.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {errors.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4">
              <div className="font-semibold text-red-900">Import errors</div>
              <div className="mt-3 space-y-2 text-sm text-red-800">
                {errors.map((err, i) => (
                  <div key={`${err.row_number}-${i}`}>
                    Row {err.row_number}: {err.error}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}