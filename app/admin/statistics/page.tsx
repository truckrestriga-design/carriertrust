"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/lib/supabaseClient";

type VisitRow = {
  id: string;
  created_at: string;
  page_path: string | null;
  page_url: string | null;
  country: string | null;
  city: string | null;
  referrer: string | null;
  referrer_domain: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  user_agent: string | null;
  session_id: string | null;
  visitor_id: string | null;
  ip: string | null;
  event_type: string | null;
  company_id: string | null;
  company_name: string | null;
  search_query: string | null;
  banner_id: string | null;
  banner_placement: string | null;
};

type Period = "7d" | "30d" | "90d" | "all";

const PIE_COLORS = [
  "#10b981",
  "#06b6d4",
  "#ec4899",
  "#f59e0b",
  "#6366f1",
  "#14b8a6",
  "#8b5cf6",
  "#f97316",
];

function startDateFromPeriod(period: Period) {
  if (period === "all") return null;

  const now = new Date();
  const date = new Date(now);

  if (period === "7d") date.setDate(now.getDate() - 7);
  if (period === "30d") date.setDate(now.getDate() - 30);
  if (period === "90d") date.setDate(now.getDate() - 90);

  return date.toISOString();
}

function previousStartDateFromPeriod(period: Period) {
  if (period === "all") return null;

  const now = new Date();
  const end = new Date(now);
  const start = new Date(now);

  if (period === "7d") {
    end.setDate(now.getDate() - 7);
    start.setDate(now.getDate() - 14);
  }

  if (period === "30d") {
    end.setDate(now.getDate() - 30);
    start.setDate(now.getDate() - 60);
  }

  if (period === "90d") {
    end.setDate(now.getDate() - 90);
    start.setDate(now.getDate() - 180);
  }

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

function normalizeLabel(value: string | null | undefined, fallback = "Unknown") {
  const v = String(value || "").trim();
  return v ? v : fallback;
}

function formatEventType(value: string | null | undefined) {
  const normalized = normalizeLabel(value, "page_view");
  return normalized
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function groupTop(rows: VisitRow[], getKey: (row: VisitRow) => string, limit = 8) {
  const map = new Map<string, number>();

  for (const row of rows) {
    const key = getKey(row);
    map.set(key, (map.get(key) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function groupTimeline(rows: VisitRow[]) {
  const map = new Map<string, number>();

  for (const row of rows) {
    const date = new Date(row.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
    map.set(key, (map.get(key) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([date, count]) => ({
      date,
      short: date.slice(5),
      visits: count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function formatCompact(n: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

function percent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

function changePercent(current: number, previous: number) {
  if (previous <= 0 && current > 0) return 100;
  if (previous <= 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
}

function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0;

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      <span>{positive ? "▲" : "▼"}</span>
      <span>{Math.abs(value)}%</span>
    </div>
  );
}

function KpiCard({
  title,
  value,
  note,
  trend,
}: {
  title: string;
  value: string | number;
  note?: string;
  trend?: number;
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-slate-600">{title}</div>
        {typeof trend === "number" ? <TrendBadge value={trend} /> : null}
      </div>

      <div className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{value}</div>
      {note ? <div className="mt-2 text-xs text-slate-500">{note}</div> : null}
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-5 shadow-sm">
      <div className="text-lg font-bold tracking-tight text-slate-900">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-slate-500">{subtitle}</div> : null}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function EmptyChartState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center">
      <div className="text-sm font-semibold text-slate-700">{title}</div>
      <div className="mt-2 max-w-sm text-xs leading-6 text-slate-500">{text}</div>
    </div>
  );
}

function StatsLegendList({
  items,
}: {
  items: { label: string; count: number }[];
}) {
  const total = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
            />
            <div className="truncate text-sm font-medium text-slate-700">{item.label}</div>
          </div>
          <div className="shrink-0 text-sm font-bold text-slate-900">
            {item.count}
            <span className="ml-2 text-xs font-medium text-slate-500">
              {percent(item.count, total)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TopList({
  items,
  emptyText,
}: {
  items: { label: string; count: number }[];
  emptyText: string;
}) {
  const total = items.reduce((sum, item) => sum + item.count, 0);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                #{index + 1}
              </div>
              <div className="mt-1 truncate text-sm font-semibold text-slate-800">{item.label}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-lg font-bold text-slate-900">{item.count}</div>
              <div className="text-xs text-slate-500">{percent(item.count, total)}%</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminStatisticsPage() {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("30d");
  const [rows, setRows] = useState<VisitRow[]>([]);
  const [previousRows, setPreviousRows] = useState<VisitRow[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  async function loadStats(selectedPeriod: Period) {
    setMsg(null);
    setLoading(true);

    try {
      let currentQuery = supabase
        .from("site_visits")
        .select(
          "id, created_at, page_path, page_url, country, city, referrer, referrer_domain, source, medium, campaign, device_type, browser, os, user_agent, session_id, visitor_id, ip, event_type, company_id, company_name, search_query, banner_id, banner_placement"
        )
        .order("created_at", { ascending: false })
        .limit(5000);

      const currentStartDate = startDateFromPeriod(selectedPeriod);
      if (currentStartDate) {
        currentQuery = currentQuery.gte("created_at", currentStartDate);
      }

      const { data: currentData, error: currentError } = await currentQuery;

      if (currentError) {
        setMsg(currentError.message);
        setRows([]);
        setPreviousRows([]);
        return;
      }

      setRows((currentData || []) as VisitRow[]);

      if (selectedPeriod === "all") {
        setPreviousRows([]);
        return;
      }

      const prevRange = previousStartDateFromPeriod(selectedPeriod);
      if (!prevRange) {
        setPreviousRows([]);
        return;
      }

      const { data: prevData, error: prevError } = await supabase
        .from("site_visits")
        .select(
          "id, created_at, page_path, page_url, country, city, referrer, referrer_domain, source, medium, campaign, device_type, browser, os, user_agent, session_id, visitor_id, ip, event_type, company_id, company_name, search_query, banner_id, banner_placement"
        )
        .gte("created_at", prevRange.start)
        .lt("created_at", prevRange.end)
        .order("created_at", { ascending: false })
        .limit(5000);

      if (prevError) {
        setPreviousRows([]);
      } else {
        setPreviousRows((prevData || []) as VisitRow[]);
      }
    } catch (e: any) {
      setMsg(String(e?.message || e));
      setRows([]);
      setPreviousRows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats(period);
  }, [period]);

  const totalVisits = rows.length;
  const prevTotalVisits = previousRows.length;

  const pageViewRows = useMemo(
    () => rows.filter((r) => normalizeLabel(r.event_type, "page_view") === "page_view"),
    [rows]
  );

  const companyViewRows = useMemo(
    () => rows.filter((r) => normalizeLabel(r.event_type, "") === "company_view"),
    [rows]
  );

  const searchRows = useMemo(
    () => rows.filter((r) => normalizeLabel(r.event_type, "") === "search"),
    [rows]
  );

  const bannerClickRows = useMemo(
    () => rows.filter((r) => normalizeLabel(r.event_type, "") === "banner_click"),
    [rows]
  );

  const prevCompanyViewRows = useMemo(
    () => previousRows.filter((r) => normalizeLabel(r.event_type, "") === "company_view"),
    [previousRows]
  );

  const prevSearchRows = useMemo(
    () => previousRows.filter((r) => normalizeLabel(r.event_type, "") === "search"),
    [previousRows]
  );

  const prevBannerClickRows = useMemo(
    () => previousRows.filter((r) => normalizeLabel(r.event_type, "") === "banner_click"),
    [previousRows]
  );

  const uniqueVisitors = useMemo(() => {
    const set = new Set<string>();
    for (const row of rows) {
      const key = row.visitor_id || row.session_id || row.ip || row.id;
      set.add(key);
    }
    return set.size;
  }, [rows]);

  const prevUniqueVisitors = useMemo(() => {
    const set = new Set<string>();
    for (const row of previousRows) {
      const key = row.visitor_id || row.session_id || row.ip || row.id;
      set.add(key);
    }
    return set.size;
  }, [previousRows]);

  const uniqueSessions = useMemo(() => {
    const set = new Set<string>();
    for (const row of rows) {
      if (row.session_id) set.add(row.session_id);
    }
    return set.size;
  }, [rows]);

  const prevUniqueSessions = useMemo(() => {
    const set = new Set<string>();
    for (const row of previousRows) {
      if (row.session_id) set.add(row.session_id);
    }
    return set.size;
  }, [previousRows]);

  const countries = useMemo(
    () => groupTop(rows, (r) => normalizeLabel(r.country, "Unknown country"), 8),
    [rows]
  );

  const referrers = useMemo(
    () => groupTop(rows, (r) => normalizeLabel(r.referrer_domain || r.referrer, "Direct / none"), 8),
    [rows]
  );

  const pages = useMemo(
    () => groupTop(rows, (r) => normalizeLabel(r.page_path || r.page_url, "Unknown page"), 8),
    [rows]
  );

  const devices = useMemo(
    () => groupTop(rows, (r) => normalizeLabel(r.device_type, "Unknown"), 6),
    [rows]
  );

  const browsers = useMemo(
    () => groupTop(rows, (r) => normalizeLabel(r.browser, "Unknown"), 6),
    [rows]
  );

  const osList = useMemo(
    () => groupTop(rows, (r) => normalizeLabel(r.os, "Unknown"), 6),
    [rows]
  );

  const sources = useMemo(
    () => groupTop(rows, (r) => normalizeLabel(r.source, "Unknown"), 6),
    [rows]
  );

  const eventTypes = useMemo(
    () => groupTop(rows, (r) => formatEventType(r.event_type), 8),
    [rows]
  );

  const topViewedCompanies = useMemo(
    () =>
      groupTop(
        companyViewRows,
        (r) => normalizeLabel(r.company_name || r.company_id, "Unknown company"),
        8
      ),
    [companyViewRows]
  );

  const topSearchQueries = useMemo(
    () =>
      groupTop(searchRows, (r) => normalizeLabel(r.search_query, "Empty search query"), 8),
    [searchRows]
  );

  const topBannerPlacements = useMemo(
    () =>
      groupTop(
        bannerClickRows,
        (r) => normalizeLabel(r.banner_placement || r.banner_id, "Unknown banner"),
        8
      ),
    [bannerClickRows]
  );

  const timeline = useMemo(() => groupTimeline(rows), [rows]);
  const pageViewsTimeline = useMemo(() => groupTimeline(pageViewRows), [pageViewRows]);
  const companyViewsTimeline = useMemo(() => groupTimeline(companyViewRows), [companyViewRows]);
  const searchesTimeline = useMemo(() => groupTimeline(searchRows), [searchRows]);

  const mobileCount = useMemo(
    () => rows.filter((r) => normalizeLabel(r.device_type, "").toLowerCase() === "mobile").length,
    [rows]
  );

  const desktopCount = useMemo(
    () => rows.filter((r) => normalizeLabel(r.device_type, "").toLowerCase() === "desktop").length,
    [rows]
  );

  const tabletCount = useMemo(
    () => rows.filter((r) => normalizeLabel(r.device_type, "").toLowerCase() === "tablet").length,
    [rows]
  );

  const directCount = useMemo(
    () => rows.filter((r) => !String(r.referrer_domain || r.referrer || "").trim()).length,
    [rows]
  );

  const companyPageCount = useMemo(
    () => rows.filter((r) => String(r.page_path || "").startsWith("/companies/")).length,
    [rows]
  );

  const searchPageCount = useMemo(
    () => rows.filter((r) => String(r.page_path || "").startsWith("/search")).length,
    [rows]
  );

  const reviewWriteCount = useMemo(
    () => rows.filter((r) => String(r.page_path || "").startsWith("/write-review")).length,
    [rows]
  );

  const mobileShare = percent(mobileCount, totalVisits);
  const directShare = percent(directCount, totalVisits);
  const companyPageShare = percent(companyPageCount, totalVisits);

  const latestRows = rows.slice(0, 100);

  const trafficMixData = [
    { name: "Company pages", value: companyPageCount },
    { name: "Search pages", value: searchPageCount },
    { name: "Write review", value: reviewWriteCount },
  ].filter((item) => item.value > 0);

  const devicePieData = [
    { name: "Desktop", value: desktopCount },
    { name: "Mobile", value: mobileCount },
    { name: "Tablet", value: tabletCount },
  ].filter((item) => item.value > 0);

  const eventTypePieData = eventTypes
    .map((item) => ({ name: item.label, value: item.count }))
    .filter((item) => item.value > 0);

  const timelineReady = timeline.length >= 2;
  const trafficMixReady = trafficMixData.length > 0;
  const pageViewsTimelineReady = pageViewsTimeline.length >= 2;
  const companyViewsTimelineReady = companyViewsTimeline.length >= 2;
  const searchesTimelineReady = searchesTimeline.length >= 2;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <style jsx global>{`
        .recharts-wrapper:focus,
        .recharts-surface:focus,
        .recharts-sector:focus,
        .recharts-bar-rectangle:focus,
        .recharts-rectangle:focus,
        .recharts-dot:focus,
        .recharts-line-curve:focus,
        .recharts-area-area:focus,
        .recharts-tooltip-wrapper:focus {
          outline: none !important;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.14),transparent)]" />
        <div className="absolute top-[8%] left-[8%] h-[22rem] w-[22rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] h-[18rem] w-[18rem] rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-36 md:pt-40">
        <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Analytics Pro
                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Statistics Dashboard
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Traffic growth, events, company views, searches and device analytics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/admin"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Back to Admin
                </Link>

                {(["7d", "30d", "90d", "all"] as Period[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setPeriod(item)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm ${
                      period === item
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item === "all" ? "All time" : item}
                  </button>
                ))}

                <button
                  onClick={() => loadStats(period)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  Refresh
                </button>
              </div>
            </div>

            {msg ? (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                {msg}
              </div>
            ) : null}

            {loading ? (
              <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
                Loading statistics...
              </div>
            ) : rows.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
                No statistics data yet.
              </div>
            ) : (
              <>
                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <KpiCard
                    title="Total events"
                    value={formatCompact(totalVisits)}
                    note={`${totalVisits} tracked events in selected period`}
                    trend={changePercent(totalVisits, prevTotalVisits)}
                  />
                  <KpiCard
                    title="Company views"
                    value={formatCompact(companyViewRows.length)}
                    note="Visits to company pages"
                    trend={changePercent(companyViewRows.length, prevCompanyViewRows.length)}
                  />
                  <KpiCard
                    title="Search events"
                    value={formatCompact(searchRows.length)}
                    note="Tracked search submissions"
                    trend={changePercent(searchRows.length, prevSearchRows.length)}
                  />
                  <KpiCard
                    title="Banner clicks"
                    value={formatCompact(bannerClickRows.length)}
                    note="Prepared for banner CTR"
                    trend={changePercent(bannerClickRows.length, prevBannerClickRows.length)}
                  />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <KpiCard
                    title="Unique visitors"
                    value={formatCompact(uniqueVisitors)}
                    note="Based on visitor/session/IP"
                    trend={changePercent(uniqueVisitors, prevUniqueVisitors)}
                  />
                  <KpiCard
                    title="Sessions"
                    value={formatCompact(uniqueSessions)}
                    note="Tracked browser sessions"
                    trend={changePercent(uniqueSessions, prevUniqueSessions)}
                  />
                  <KpiCard
                    title="Page views"
                    value={formatCompact(pageViewRows.length)}
                    note="Standard page_view events"
                  />
                  <KpiCard
                    title="Pages / visitor"
                    value={uniqueVisitors > 0 ? (totalVisits / uniqueVisitors).toFixed(2) : "0"}
                    note="Average event depth"
                  />
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                  <SectionCard title="Traffic timeline" subtitle="All tracked events by day">
                    {timelineReady ? (
                      <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={timeline}>
                            <defs>
                              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.03} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="short" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="visits"
                              stroke="#10b981"
                              strokeWidth={3}
                              fill="url(#trafficGradient)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="Not enough timeline data yet"
                        text="Traffic timeline needs events from at least 2 different days."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Event mix" subtitle="How users interact with the product">
                    {eventTypePieData.length > 0 ? (
                      <>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={eventTypePieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={105}
                                paddingAngle={3}
                              >
                                {eventTypePieData.map((_, index) => (
                                  <Cell
                                    key={`event-${index}`}
                                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <StatsLegendList
                          items={eventTypePieData.map((item) => ({
                            label: item.name,
                            count: item.value,
                          }))}
                        />
                      </>
                    ) : (
                      <EmptyChartState
                        title="No event data yet"
                        text="Event split appears when analytics rows are collected."
                      />
                    )}
                  </SectionCard>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-3">
                  <SectionCard title="Page views timeline" subtitle="page_view events by day">
                    {pageViewsTimelineReady ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={pageViewsTimeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="short" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="visits" stroke="#06b6d4" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="Not enough page views data"
                        text="Needs page_view events on at least 2 different days."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Company views timeline" subtitle="company_view events by day">
                    {companyViewsTimelineReady ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={companyViewsTimeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="short" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="Not enough company views data"
                        text="Needs company_view events on at least 2 different days."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Searches timeline" subtitle="search events by day">
                    {searchesTimelineReady ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={searchesTimeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="short" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="visits" stroke="#f59e0b" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="Not enough searches data"
                        text="Needs search events on at least 2 different days."
                      />
                    )}
                  </SectionCard>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-3">
                  <SectionCard title="Top viewed companies" subtitle="Most opened company pages">
                    <TopList
                      items={topViewedCompanies}
                      emptyText="Company views will appear after company_view events are tracked."
                    />
                  </SectionCard>

                  <SectionCard title="Top search queries" subtitle="What users search most often">
                    <TopList
                      items={topSearchQueries}
                      emptyText="Search queries will appear after search events are tracked."
                    />
                  </SectionCard>

                  <SectionCard title="Top banner clicks" subtitle="Prepared for banner click analytics">
                    <TopList
                      items={topBannerPlacements}
                      emptyText="Banner clicks will appear after banner_click events are tracked."
                    />
                  </SectionCard>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1.1fr_1fr]">
                  <SectionCard title="Traffic mix" subtitle="Main page groups">
                    {trafficMixReady ? (
                      <>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={trafficMixData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={105}
                                paddingAngle={3}
                              >
                                {trafficMixData.map((_, index) => (
                                  <Cell key={`mix-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <StatsLegendList
                          items={trafficMixData.map((item) => ({
                            label: item.name,
                            count: item.value,
                          }))}
                        />
                      </>
                    ) : (
                      <EmptyChartState
                        title="No page mix data yet"
                        text="This block fills when users visit company pages, search pages or write-review pages."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Devices" subtitle="Desktop vs mobile vs tablet">
                    {devicePieData.length > 0 ? (
                      <>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={devicePieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={105}
                                paddingAngle={3}
                              >
                                {devicePieData.map((_, index) => (
                                  <Cell
                                    key={`device-${index}`}
                                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <StatsLegendList
                          items={devicePieData.map((item) => ({
                            label: item.name,
                            count: item.value,
                          }))}
                        />
                      </>
                    ) : (
                      <EmptyChartState
                        title="No device data yet"
                        text="Device chart will appear after more visits are tracked."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Key ratios" subtitle="Quick traffic composition">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="rounded-2xl bg-slate-50 px-4 py-4">
                        <div className="text-xs uppercase tracking-wide text-slate-500">
                          Mobile share
                        </div>
                        <div className="mt-2 text-3xl font-bold text-slate-900">{mobileShare}%</div>
                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-emerald-500"
                            style={{ width: `${mobileShare}%` }}
                          />
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 px-4 py-4">
                        <div className="text-xs uppercase tracking-wide text-slate-500">
                          Direct traffic
                        </div>
                        <div className="mt-2 text-3xl font-bold text-slate-900">{directShare}%</div>
                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-cyan-500"
                            style={{ width: `${directShare}%` }}
                          />
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 px-4 py-4">
                        <div className="text-xs uppercase tracking-wide text-slate-500">
                          Company pages share
                        </div>
                        <div className="mt-2 text-3xl font-bold text-slate-900">{companyPageShare}%</div>
                        <div className="mt-2 h-2 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-pink-500"
                            style={{ width: `${companyPageShare}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-3">
                  <SectionCard title="Top countries" subtitle="Where visits come from">
                    {countries.length > 0 ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={countries.slice(0, 6)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                              {countries.slice(0, 6).map((_, index) => (
                                <Cell key={`country-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="No country data yet"
                        text="Country chart will populate when geolocation data is available."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Traffic sources" subtitle="Channel breakdown">
                    {sources.length > 0 ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={sources}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="No source data yet"
                        text="Traffic sources will populate when UTM or source info is available."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Top referrers" subtitle="Best traffic senders">
                    {referrers.length > 0 ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={referrers} layout="vertical" margin={{ left: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis
                              type="category"
                              dataKey="label"
                              tick={{ fontSize: 11, fill: "#64748b" }}
                              width={120}
                            />
                            <Tooltip />
                            <Bar dataKey="count" fill="#ec4899" radius={[0, 8, 8, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="No referrer data yet"
                        text="Referrer chart appears when traffic comes from external sites or search engines."
                      />
                    )}
                  </SectionCard>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-3">
                  <SectionCard title="Top pages" subtitle="Most visited routes">
                    {pages.length > 0 ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={pages} layout="vertical" margin={{ left: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis
                              type="category"
                              dataKey="label"
                              tick={{ fontSize: 11, fill: "#64748b" }}
                              width={140}
                            />
                            <Tooltip />
                            <Bar dataKey="count" fill="#0f172a" radius={[0, 8, 8, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="No page data yet"
                        text="Top pages will appear after more page visits are collected."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Browsers" subtitle="Visitor browser distribution">
                    {browsers.length > 1 ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={browsers}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="Not enough browser variation"
                        text="Browser chart becomes useful after visits come from more than one browser."
                      />
                    )}
                  </SectionCard>

                  <SectionCard title="Operating systems" subtitle="OS distribution">
                    {osList.length > 1 ? (
                      <div className="h-[260px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={osList}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} />
                            <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <EmptyChartState
                        title="Not enough OS variation"
                        text="OS chart becomes useful after visits come from more than one operating system."
                      />
                    )}
                  </SectionCard>
                </div>

                <div className="mt-6 rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-5 shadow-sm">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-lg font-bold tracking-tight text-slate-900">
                        Latest events
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        Last 100 tracked analytics rows
                      </div>
                    </div>

                    <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                      {rows.length} total rows loaded
                    </div>
                  </div>

                  <div className="mt-5 overflow-auto">
                    <table className="min-w-full text-sm">
                      <thead className="text-slate-500">
                        <tr className="border-b border-slate-200">
                          <th className="px-3 py-3 text-left font-semibold">Time</th>
                          <th className="px-3 py-3 text-left font-semibold">Event</th>
                          <th className="px-3 py-3 text-left font-semibold">Page</th>
                          <th className="px-3 py-3 text-left font-semibold">Company</th>
                          <th className="px-3 py-3 text-left font-semibold">Search query</th>
                          <th className="px-3 py-3 text-left font-semibold">Country</th>
                          <th className="px-3 py-3 text-left font-semibold">Referrer</th>
                          <th className="px-3 py-3 text-left font-semibold">Device</th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestRows.map((row) => (
                          <tr key={row.id} className="border-b border-slate-100 last:border-b-0">
                            <td className="px-3 py-3 text-slate-500">
                              {new Date(row.created_at).toLocaleString()}
                            </td>
                            <td className="px-3 py-3">
                              <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                {formatEventType(row.event_type)}
                              </span>
                            </td>
                            <td className="px-3 py-3 font-medium text-slate-800">
                              {normalizeLabel(row.page_path || row.page_url)}
                            </td>
                            <td className="px-3 py-3 text-slate-700">
                              {normalizeLabel(row.company_name || row.company_id, "—")}
                            </td>
                            <td className="px-3 py-3 text-slate-700">
                              {normalizeLabel(row.search_query, "—")}
                            </td>
                            <td className="px-3 py-3 text-slate-700">
                              {normalizeLabel(row.country, "Unknown")}
                            </td>
                            <td className="px-3 py-3 text-slate-700">
                              {normalizeLabel(row.referrer_domain || row.referrer, "Direct / none")}
                            </td>
                            <td className="px-3 py-3 text-slate-700">
                              {normalizeLabel(row.device_type)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}