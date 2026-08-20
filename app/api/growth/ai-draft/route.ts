import { NextResponse } from "next/server";
import {
  analyzeCompanyWebsite,
  formatWebsiteSummaryForPrompt,
  type WebsiteSummary,
} from "@/lib/growth/websiteAnalyzer";
import { createChatCompletion } from "@/lib/openai/client";
import { requireGrowthAdmin } from "@/lib/zoho/adminGuard";

export const runtime = "nodejs";

type AiDraftBody = {
  companyName?: unknown;
  companyWebsite?: unknown;
  contactEmail?: unknown;
  contactName?: unknown;
  country?: unknown;
  notes?: unknown;
};

function asOptionalString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function isValidEmailAddress(value: string): boolean {
  const email = value.trim();
  if (!email || email.length > 254) return false;
  if (/[,\s<>"]/.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const SYSTEM_PROMPT = `You write short, human B2B outreach emails for CarrierTrust (carriertrust.eu).

Voice: a founder/team at a European B2B product writing one concrete note to another logistics professional. Plain, calm, specific. Not a mass sales blast.

What CarrierTrust is:
- A reputation platform/network specifically for European transport, logistics, and forwarding companies.
- A company can register or claim its profile, invite managers, publish real business reviews about partners, and receive reviews in return.
- It helps build transparent business reputation and check potential partners before working with them.

Length and structure:
- Body: about 90–150 words.
- Subject: short, natural, no marketing/spam language.
- Plain text only. Greeting, a few short paragraphs, light CTA, sign-off as the CarrierTrust team.
- Soft CTA only: invitation to register / take a look. No hard sell, no urgency, no "book a demo" pressure.

Hard avoid:
- Openers like "I hope this message finds you well".
- Buzzwords: enhance credibility, take advantage, unlock, revolutionize, game-changer, seamless, leverage, cutting-edge, and similar hype.
- Aggressive sales tone, hype, or generic AI sales copy.
- Long dashes (em dashes) and overly polished AI-style prose. Prefer short sentences and normal punctuation.
- Inventing facts about the recipient company.
- Claiming you researched their website beyond what the website summary provides.
- Promising features CarrierTrust does not have (no freight exchange, load board, guaranteed deals, payment processing, or automatic partner matching).

Website summary rules (critical):
- Use website summary only as factual context.
- Never invent company information.
- If the summary lacks information, do not fabricate.
- You may naturally reference real details from the summary (services, focus, geography) ONLY when they are present.
- If confidence is low or fields are empty, write a solid generic outreach without pretending to know company specifics.

Using other context fields:
- Use company name. Address the contact by name only if a contact name is provided.
- Use country and notes ONLY when they add useful, non-speculative context.
- If fields contradict each other, omit the disputed fact rather than guessing.

Language: English by default.

Output: generate only JSON, nothing else:
{"subject":"...","body":"..."}`;

/**
 * Generate an outreach email draft (subject + body) for Growth OS.
 * Draft only — this endpoint never sends mail.
 * Before generation, analyzes the supplied company website (same-domain only).
 */
export async function POST(req: Request) {
  try {
    const auth = await requireGrowthAdmin(req);
    if (!auth.ok) {
      return NextResponse.json(
        { ok: false, error: auth.error },
        { status: auth.status }
      );
    }

    let payload: AiDraftBody;
    try {
      payload = (await req.json()) as AiDraftBody;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const companyName = asOptionalString(payload.companyName, 200);
    const companyWebsite = asOptionalString(payload.companyWebsite, 500);
    const contactEmail = asOptionalString(payload.contactEmail, 254);
    const contactName = asOptionalString(payload.contactName, 120);
    const country = asOptionalString(payload.country, 120);
    const notes = asOptionalString(payload.notes, 2000);

    if (!companyName) {
      return NextResponse.json(
        { ok: false, error: "companyName is required" },
        { status: 400 }
      );
    }
    if (!companyWebsite) {
      return NextResponse.json(
        { ok: false, error: "companyWebsite is required" },
        { status: 400 }
      );
    }
    if (!contactEmail) {
      return NextResponse.json(
        { ok: false, error: "contactEmail is required" },
        { status: 400 }
      );
    }
    if (!isValidEmailAddress(contactEmail)) {
      return NextResponse.json(
        { ok: false, error: "Invalid contactEmail" },
        { status: 400 }
      );
    }

    // Phase 2: analyze only the user-supplied website URL (never web search).
    const analysis = await analyzeCompanyWebsite(companyWebsite);
    const websiteSummary: WebsiteSummary = analysis.summary;

    const userPrompt = [
      "Write one short human outreach email from this context only.",
      "",
      "Use website summary only as factual context.",
      "Never invent company information.",
      "If the summary lacks information, do not fabricate.",
      "Naturally reference real website details only when they exist in the summary.",
      "",
      "USER INPUT:",
      `- Company name: ${companyName}`,
      `- Company website: ${companyWebsite}`,
      `- Contact email: ${contactEmail}`,
      contactName ? `- Contact name: ${contactName}` : "- Contact name: (not provided)",
      country ? `- Country: ${country}` : "- Country: (not provided)",
      notes
        ? `- Notes/context from the sender:\n${notes}`
        : "- Notes/context: (none)",
      "",
      "WEBSITE SUMMARY (factual context only; omit empty fields mentally):",
      formatWebsiteSummaryForPrompt(websiteSummary),
      analysis.pagesFetched
        ? `- pagesFetched: ${analysis.pagesFetched}`
        : "- pagesFetched: 0",
      "",
      'Generate only JSON: {"subject":"...","body":"..."}',
    ].join("\n");

    const completion = await createChatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.55,
      maxTokens: 900,
    });

    let parsed: { subject?: unknown; body?: unknown };
    try {
      parsed = JSON.parse(completion.content) as {
        subject?: unknown;
        body?: unknown;
      };
    } catch {
      return NextResponse.json(
        { ok: false, error: "AI returned invalid JSON" },
        { status: 502 }
      );
    }

    const subject =
      typeof parsed.subject === "string" ? parsed.subject.trim() : "";
    const body = typeof parsed.body === "string" ? parsed.body.trim() : "";

    if (!subject || !body) {
      return NextResponse.json(
        { ok: false, error: "AI response missing subject or body" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      subject,
      body,
      websiteSummary,
      websiteAnalysis: {
        pagesFetched: analysis.pagesFetched,
        textChars: analysis.textChars,
        warnings: analysis.warnings,
        confidence: websiteSummary.confidence,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI draft generation failed";
    console.error("GROWTH AI DRAFT ERROR:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
