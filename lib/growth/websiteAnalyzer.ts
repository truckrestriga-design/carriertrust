/**
 * Growth OS website analyzer.
 * Fetches only the user-supplied URL (and a few same-domain pages).
 * No search engines, no browser automation, no off-domain crawling.
 */

import { createChatCompletion } from "@/lib/openai/client";

export type WebsiteSummary = {
  companyDescription?: string;
  services: string[];
  industries: string[];
  countriesMentioned: string[];
  languages: string[];
  keywords: string[];
  confidence: number;
};

export type WebsiteAnalyzeResult = {
  summary: WebsiteSummary;
  pagesFetched: number;
  warnings: string[];
  textChars: number;
};

const MAX_PAGES = 5;
const MAX_TEXT_BYTES = 200 * 1024;
const TOTAL_TIMEOUT_MS = 10_000;
const PER_REQUEST_TIMEOUT_MS = 4_000;
const MAX_RESPONSE_BYTES = 1_500_000;

const PRIORITY_PATH_HINTS = [
  "/",
  "/about",
  "/about-us",
  "/aboutus",
  "/company",
  "/services",
  "/solutions",
  "/contact",
  "/contact-us",
  "/contactus",
];

const PRIORITY_LINK_LABELS = [
  "about",
  "about us",
  "company",
  "services",
  "solutions",
  "contact",
  "contact us",
  "who we are",
  "our services",
];

const EMPTY_SUMMARY: WebsiteSummary = {
  services: [],
  industries: [],
  countriesMentioned: [],
  languages: [],
  keywords: [],
  confidence: 0,
};

function emptyResult(warnings: string[]): WebsiteAnalyzeResult {
  return {
    summary: { ...EMPTY_SUMMARY },
    pagesFetched: 0,
    warnings,
    textChars: 0,
  };
}

function normalizeWebsiteUrl(raw: string): URL | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname || url.hostname === "localhost") return null;
    if (looksLikePrivateHostname(url.hostname)) return null;
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

function looksLikePrivateHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return true;
  }
  if (host === "0.0.0.0" || host === "::1" || host === "0:0:0:0:0:0:0:1") {
    return true;
  }

  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const parts = ipv4.slice(1).map(Number);
    if (parts.some((n) => n > 255)) return true;
    const [a, b] = parts;
    if (a === 10) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
  }

  // Basic IPv6 private/link-local checks
  if (host.includes(":")) {
    if (host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80")) {
      return true;
    }
  }

  return false;
}

function sameSite(a: URL, b: URL): boolean {
  const ha = a.hostname.replace(/^www\./i, "").toLowerCase();
  const hb = b.hostname.replace(/^www\./i, "").toLowerCase();
  return ha === hb;
}

function pathKey(url: URL): string {
  const path = (url.pathname || "/").replace(/\/+$/, "") || "/";
  return `${url.protocol}//${url.hostname.toLowerCase()}${path}${url.search}`;
}

function decodeBasicEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, n: string) => {
      const code = Number(n);
      return Number.isFinite(code) && code > 0 && code < 0x110000
        ? String.fromCodePoint(code)
        : "";
    });
}

function stripHtmlToText(html: string): string {
  let cleaned = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");

  cleaned = cleaned.replace(/<(br|hr|p|div|li|tr|h[1-6]|section|article|header|footer|nav)\b[^>]*>/gi, "\n");
  cleaned = cleaned.replace(/<\/(p|div|li|tr|h[1-6]|section|article|header|footer|nav)>/gi, "\n");
  cleaned = cleaned.replace(/<[^>]+>/g, " ");
  cleaned = decodeBasicEntities(cleaned);
  cleaned = cleaned.replace(/[ \t\f\v]+/g, " ");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  return cleaned.trim();
}

type FoundLink = { href: string; label: string };

function extractLinks(html: string, base: URL): FoundLink[] {
  const links: FoundLink[] = [];
  const re = /<a\b[^>]*href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const href = (match[1] || match[2] || match[3] || "").trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue;
    }
    const label = stripHtmlToText(match[4] || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
    try {
      const absolute = new URL(href, base);
      if (absolute.protocol !== "http:" && absolute.protocol !== "https:") continue;
      if (!sameSite(base, absolute)) continue;
      if (looksLikePrivateHostname(absolute.hostname)) continue;
      absolute.hash = "";
      links.push({ href: absolute.toString(), label });
    } catch {
      // ignore bad href
    }
  }
  return links;
}

function priorityScore(url: URL, label: string): number {
  const path = (url.pathname || "/").toLowerCase().replace(/\/+$/, "") || "/";
  const labelNorm = label.toLowerCase().trim();

  let score = 0;
  if (path === "/" || path === "") score = Math.max(score, 100);

  for (const hint of PRIORITY_PATH_HINTS) {
    if (hint === "/") continue;
    if (path === hint || path.startsWith(`${hint}/`) || path.endsWith(hint)) {
      score = Math.max(score, 90);
    }
  }

  for (const wanted of PRIORITY_LINK_LABELS) {
    if (labelNorm === wanted || labelNorm.includes(wanted)) {
      score = Math.max(score, 80);
    }
  }

  // Prefer shallow paths
  const depth = path.split("/").filter(Boolean).length;
  score += Math.max(0, 5 - depth);

  return score;
}

function parseRobotsDisallows(robotsText: string, userAgent = "*"): string[] {
  const lines = robotsText.split(/\r?\n/);
  let inRelevant = false;
  const disallows: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const uaMatch = line.match(/^user-agent:\s*(.+)$/i);
    if (uaMatch) {
      const ua = uaMatch[1].trim().toLowerCase();
      inRelevant = ua === "*" || ua.includes(userAgent.toLowerCase());
      continue;
    }
    if (!inRelevant) continue;
    const disMatch = line.match(/^disallow:\s*(.*)$/i);
    if (disMatch) {
      const path = disMatch[1].trim();
      if (path) disallows.push(path);
    }
  }
  return disallows;
}

function isDisallowed(pathname: string, disallows: string[]): boolean {
  if (disallows.includes("/")) return true;
  for (const rule of disallows) {
    if (!rule) continue;
    if (rule === "/") return true;
    if (pathname.startsWith(rule)) return true;
  }
  return false;
}

async function fetchWithTimeout(
  url: string,
  signal: AbortSignal,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  signal.addEventListener("abort", onAbort);

  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "User-Agent": "CarrierTrustGrowthBot/1.0 (+https://carriertrust.eu)",
      },
    });
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", onAbort);
  }
}

async function readLimitedText(
  res: Response,
  maxBytes: number
): Promise<string> {
  const buf = await res.arrayBuffer();
  const slice = buf.byteLength > maxBytes ? buf.slice(0, maxBytes) : buf;
  return new TextDecoder("utf-8", { fatal: false }).decode(slice);
}

function utf8ByteLength(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

function appendTextBudget(
  current: string,
  addition: string,
  budgetBytes: number
): { text: string; truncated: boolean } {
  const currentBytes = utf8ByteLength(current);
  if (currentBytes >= budgetBytes) {
    return { text: current, truncated: true };
  }
  const remaining = budgetBytes - currentBytes;
  const additionBytes = utf8ByteLength(addition);
  if (additionBytes <= remaining) {
    return { text: current + addition, truncated: false };
  }
  // Truncate by characters conservatively
  let cut = addition;
  while (cut.length > 0 && utf8ByteLength(cut) > remaining) {
    cut = cut.slice(0, Math.floor(cut.length * 0.9));
  }
  return { text: current + cut, truncated: true };
}

function asStringArray(value: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const item of value) {
    if (typeof item !== "string") continue;
    const cleaned = item.trim().replace(/\s+/g, " ").slice(0, maxLen);
    if (!cleaned) continue;
    if (out.some((x) => x.toLowerCase() === cleaned.toLowerCase())) continue;
    out.push(cleaned);
    if (out.length >= maxItems) break;
  }
  return out;
}

function normalizeSummary(raw: unknown, hasSourceText: boolean): WebsiteSummary {
  if (!raw || typeof raw !== "object") {
    return { ...EMPTY_SUMMARY, confidence: hasSourceText ? 0.1 : 0 };
  }
  const obj = raw as Record<string, unknown>;
  const description =
    typeof obj.companyDescription === "string"
      ? obj.companyDescription.trim().replace(/\s+/g, " ").slice(0, 600)
      : "";

  let confidence =
    typeof obj.confidence === "number" && Number.isFinite(obj.confidence)
      ? Math.max(0, Math.min(1, obj.confidence))
      : 0;

  const services = asStringArray(obj.services, 12, 120);
  const industries = asStringArray(obj.industries, 10, 80);
  const countriesMentioned = asStringArray(obj.countriesMentioned, 15, 80);
  const languages = asStringArray(obj.languages, 10, 40);
  const keywords = asStringArray(obj.keywords, 20, 60);

  const hasAny =
    Boolean(description) ||
    services.length > 0 ||
    industries.length > 0 ||
    countriesMentioned.length > 0 ||
    languages.length > 0 ||
    keywords.length > 0;

  if (!hasSourceText || !hasAny) {
    confidence = 0;
  } else if (confidence === 0) {
    confidence = 0.4;
  }

  return {
    ...(description ? { companyDescription: description } : {}),
    services,
    industries,
    countriesMentioned,
    languages,
    keywords,
    confidence,
  };
}

const SUMMARY_SYSTEM_PROMPT = `You extract a factual website summary for B2B outreach context.

Rules:
- Use ONLY facts explicitly present in the provided website text.
- Never invent, infer, or guess missing information.
- If a field cannot be supported by the text, omit it or use an empty array.
- Do not use outside knowledge about the company.
- Do not browse or search the web.
- Prefer short, concrete phrases over marketing fluff.
- confidence is 0–1 based on how much clear, usable factual content is present.

Return JSON only:
{
  "companyDescription": "optional short factual description",
  "services": ["..."],
  "industries": ["..."],
  "countriesMentioned": ["..."],
  "languages": ["..."],
  "keywords": ["..."],
  "confidence": 0.0
}`;

async function summarizeWebsiteText(sourceText: string): Promise<WebsiteSummary> {
  const clipped = sourceText.slice(0, 28_000);
  const completion = await createChatCompletion({
    messages: [
      { role: "system", content: SUMMARY_SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          "Extract a factual website summary from this text only.",
          "If information is missing, omit it.",
          "",
          "WEBSITE TEXT:",
          clipped,
        ].join("\n"),
      },
    ],
    temperature: 0.1,
    maxTokens: 700,
  });

  try {
    return normalizeSummary(JSON.parse(completion.content), true);
  } catch {
    return { ...EMPTY_SUMMARY, confidence: 0.1 };
  }
}

/**
 * Analyze a company website URL entered by the user.
 * Always returns a summary object (possibly empty) and never throws for crawl failures.
 */
export async function analyzeCompanyWebsite(
  websiteInput: string
): Promise<WebsiteAnalyzeResult> {
  const warnings: string[] = [];
  const root = normalizeWebsiteUrl(websiteInput);
  if (!root) {
    return emptyResult(["Invalid website URL"]);
  }

  const overall = new AbortController();
  const overallTimer = setTimeout(() => overall.abort(), TOTAL_TIMEOUT_MS);

  try {
    // Best-effort robots.txt — never block the whole analysis if missing/unreadable.
    let disallows: string[] = [];
    try {
      const robotsUrl = new URL("/robots.txt", root).toString();
      const robotsRes = await fetchWithTimeout(
        robotsUrl,
        overall.signal,
        Math.min(PER_REQUEST_TIMEOUT_MS, 2500)
      );
      if (robotsRes.ok) {
        const robotsText = await readLimitedText(robotsRes, 64_000);
        disallows = parseRobotsDisallows(robotsText);
        if (isDisallowed(root.pathname || "/", disallows)) {
          warnings.push("robots.txt disallows the homepage; attempting limited analysis anyway may skip paths");
        }
      }
    } catch {
      warnings.push("Could not read robots.txt");
    }

    const queue: Array<{ url: URL; score: number }> = [
      { url: root, score: 100 },
    ];
    const seen = new Set<string>();
    const pageTexts: string[] = [];
    let combined = "";
    let pagesFetched = 0;
    let truncated = false;

    while (queue.length > 0 && pagesFetched < MAX_PAGES && !truncated) {
      if (overall.signal.aborted) {
        warnings.push("Analysis timed out");
        break;
      }

      queue.sort((a, b) => b.score - a.score);
      const next = queue.shift();
      if (!next) break;

      const key = pathKey(next.url);
      if (seen.has(key)) continue;
      seen.add(key);

      if (isDisallowed(next.url.pathname || "/", disallows) && pagesFetched > 0) {
        warnings.push(`Skipped disallowed path: ${next.url.pathname}`);
        continue;
      }

      let res: Response;
      try {
        res = await fetchWithTimeout(
          next.url.toString(),
          overall.signal,
          PER_REQUEST_TIMEOUT_MS
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : "fetch failed";
        if (/aborted|timeout/i.test(msg) || overall.signal.aborted) {
          warnings.push("Request timed out");
          break;
        }
        if (/certificate|SSL|TLS/i.test(msg)) {
          warnings.push(`SSL issue fetching ${next.url.pathname || "/"}`);
        } else {
          warnings.push(`Failed to fetch ${next.url.pathname || "/"}`);
        }
        continue;
      }

      // Stay on the supplied domain even after redirects.
      try {
        const finalUrl = new URL(res.url);
        if (!sameSite(root, finalUrl) || looksLikePrivateHostname(finalUrl.hostname)) {
          warnings.push("Skipped off-domain redirect");
          continue;
        }
      } catch {
        warnings.push("Invalid final URL");
        continue;
      }

      if (res.status === 404) {
        warnings.push(`404 at ${next.url.pathname || "/"}`);
        continue;
      }
      if (!res.ok) {
        warnings.push(`HTTP ${res.status} at ${next.url.pathname || "/"}`);
        continue;
      }

      const contentType = (res.headers.get("content-type") || "").toLowerCase();
      if (contentType && !contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
        warnings.push(`Skipped non-HTML at ${next.url.pathname || "/"}`);
        continue;
      }

      let html = "";
      try {
        html = await readLimitedText(res, MAX_RESPONSE_BYTES);
      } catch {
        warnings.push(`Failed to read body at ${next.url.pathname || "/"}`);
        continue;
      }

      if (!html.trim()) {
        warnings.push(`Empty page at ${next.url.pathname || "/"}`);
        continue;
      }

      const text = stripHtmlToText(html);
      pagesFetched += 1;

      if (text) {
        const chunk = `\n\n--- PAGE: ${next.url.pathname || "/"} ---\n${text}`;
        const appended = appendTextBudget(combined, chunk, MAX_TEXT_BYTES);
        combined = appended.text;
        truncated = appended.truncated;
        pageTexts.push(text);
      }

      if (pagesFetched >= MAX_PAGES || truncated) break;

      const links = extractLinks(html, next.url);
      for (const link of links) {
        try {
          const linkUrl = new URL(link.href);
          if (!sameSite(root, linkUrl)) continue;
          if (looksLikePrivateHostname(linkUrl.hostname)) continue;
          if (isDisallowed(linkUrl.pathname || "/", disallows)) continue;
          const linkKey = pathKey(linkUrl);
          if (seen.has(linkKey)) continue;
          const score = priorityScore(linkUrl, link.label);
          if (score < 70) continue;
          queue.push({ url: linkUrl, score });
        } catch {
          // ignore
        }
      }

      // After the homepage, probe a few common internal paths if not already linked.
      if (pagesFetched === 1) {
        const speculative = [
          "/about",
          "/about-us",
          "/company",
          "/services",
          "/solutions",
          "/contact",
        ];
        for (const hint of speculative) {
          try {
            const hintUrl = new URL(hint, root);
            const hintKey = pathKey(hintUrl);
            if (seen.has(hintKey)) continue;
            if (isDisallowed(hintUrl.pathname || "/", disallows)) continue;
            // Slightly below strong link matches so discovered About/Services win first.
            queue.push({ url: hintUrl, score: 75 });
          } catch {
            // ignore
          }
        }
      }
    }

    if (truncated) {
      warnings.push("Text truncated at 200 KB limit");
    }

    if (!combined.trim()) {
      return {
        summary: { ...EMPTY_SUMMARY },
        pagesFetched,
        warnings: warnings.length ? warnings : ["No readable website text found"],
        textChars: 0,
      };
    }

    let summary: WebsiteSummary;
    try {
      summary = await summarizeWebsiteText(combined);
    } catch (err) {
      const message = err instanceof Error ? err.message : "summary failed";
      warnings.push(`Summary extraction failed: ${message}`);
      summary = { ...EMPTY_SUMMARY, confidence: 0.1 };
    }

    return {
      summary,
      pagesFetched,
      warnings,
      textChars: combined.length,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Website analysis failed";
    return emptyResult([message]);
  } finally {
    clearTimeout(overallTimer);
  }
}

export function formatWebsiteSummaryForPrompt(summary: WebsiteSummary): string {
  const lines: string[] = [];
  if (summary.companyDescription) {
    lines.push(`- companyDescription: ${summary.companyDescription}`);
  }
  lines.push(
    `- services: ${summary.services.length ? summary.services.join("; ") : "(none extracted)"}`
  );
  lines.push(
    `- industries: ${summary.industries.length ? summary.industries.join("; ") : "(none extracted)"}`
  );
  lines.push(
    `- countriesMentioned: ${
      summary.countriesMentioned.length
        ? summary.countriesMentioned.join("; ")
        : "(none extracted)"
    }`
  );
  lines.push(
    `- languages: ${summary.languages.length ? summary.languages.join("; ") : "(none extracted)"}`
  );
  lines.push(
    `- keywords: ${summary.keywords.length ? summary.keywords.join("; ") : "(none extracted)"}`
  );
  lines.push(`- confidence: ${summary.confidence}`);
  return lines.join("\n");
}
