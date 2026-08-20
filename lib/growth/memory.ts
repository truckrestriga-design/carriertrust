/**
 * Growth Memory v1 — server-side helpers for CarrierTrust Growth OS.
 *
 * Safe foundation only: read/write memory via supabaseAdmin.
 * Does NOT send email, touch Zoho mailboxes, or run sync/cron.
 */

import { supabaseAdmin } from "@/lib/supabaseAdmin";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GrowthCompanyStatus = "active" | "archived" | "possible_duplicate";

export type GrowthOutreachStatus =
  | "new"
  | "draft_ready"
  | "contacted"
  | "replied"
  | "interested"
  | "not_interested"
  | "follow_up_due"
  | "registered"
  | "do_not_contact";

export type GrowthInteractionType =
  | "ai_draft"
  | "zoho_draft"
  | "sent"
  | "received"
  | "note"
  | "follow_up";

export type GrowthLearningEventType =
  | "draft_generated"
  | "draft_edited"
  | "draft_saved"
  | "sent"
  | "positive_reply"
  | "negative_reply"
  | "registration";

export type GrowthCompany = {
  id: string;
  company_name: string;
  normalized_name: string;
  website: string | null;
  domain: string | null;
  country: string | null;
  vat_number: string | null;
  source: string;
  status: GrowthCompanyStatus;
  possible_duplicate_of: string | null;
  created_at: string;
  updated_at: string;
};

export type GrowthContact = {
  id: string;
  company_id: string;
  email: string;
  normalized_email: string;
  name: string | null;
  role: string | null;
  source: string;
  possible_duplicate_of: string | null;
  created_at: string;
  updated_at: string;
};

export type GrowthCompanyState = {
  company_id: string;
  outreach_status: GrowthOutreachStatus;
  first_contacted_at: string | null;
  last_contacted_at: string | null;
  last_replied_at: string | null;
  next_follow_up_at: string | null;
  do_not_contact_reason: string | null;
  updated_at: string;
};

export type GrowthInteraction = {
  id: string;
  company_id: string;
  contact_id: string | null;
  type: GrowthInteractionType;
  zoho_message_id: string | null;
  zoho_thread_id: string | null;
  subject: string | null;
  body: string | null;
  summary: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type GrowthLearningEvent = {
  id: string;
  company_id: string | null;
  contact_id: string | null;
  event_type: GrowthLearningEventType;
  ai_original: string | null;
  final_text: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export type CompanyMatchResult =
  | { kind: "exact"; company: GrowthCompany }
  | { kind: "possible_duplicate"; company: GrowthCompany; reason: string }
  | { kind: "none" };

export type ContactMatchResult =
  | { kind: "exact"; contact: GrowthContact }
  | { kind: "possible_duplicate"; contact: GrowthContact; reason: string }
  | { kind: "none" };

export type CanContactResult = {
  allowed: boolean;
  reasons: string[];
};

export type CompanyMemory = {
  company: GrowthCompany;
  state: GrowthCompanyState | null;
  contacts: GrowthContact[];
  recentInteractions: GrowthInteraction[];
  recentLearningEvents: GrowthLearningEvent[];
};

/** Default cool-down before another cold outreach to the same company. */
export const DEFAULT_CONTACT_COOLDOWN_DAYS = 30;

// ---------------------------------------------------------------------------
// Normalization helpers
// ---------------------------------------------------------------------------

const LEGAL_SUFFIXES = new Set([
  "gmbh",
  "ag",
  "ltd",
  "limited",
  "llc",
  "inc",
  "corp",
  "corporation",
  "co",
  "company",
  "oy",
  "oyj",
  "ab",
  "asa",
  "as",
  "bv",
  "nv",
  "sa",
  "sas",
  "sarl",
  "srl",
  "spa",
  "plc",
  "pte",
  "pty",
  "kg",
  "ug",
  "eood",
  "ood",
  "sp",
  "zoo",
  "sro",
  "kft",
]);

export function normalizeCompanyName(name: string): string {
  let s = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const parts = s.split(" ").filter(Boolean);
  while (parts.length > 1 && LEGAL_SUFFIXES.has(parts[parts.length - 1]!)) {
    parts.pop();
  }
  // Handle "sp zoo" style two-token suffix already covered by sequential pops
  return parts.join(" ");
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function extractDomainFromEmail(email: string): string | null {
  const normalized = normalizeEmail(email);
  const at = normalized.lastIndexOf("@");
  if (at < 0) return null;
  const domain = normalized.slice(at + 1).trim();
  return domain || null;
}

export function extractDomainFromWebsite(website: string): string | null {
  const raw = website.trim();
  if (!raw) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const host = new URL(withProtocol).hostname.toLowerCase();
    const withoutWww = host.replace(/^www\./, "");
    return withoutWww || null;
  } catch {
    const cleaned = raw
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      ?.trim();
    return cleaned || null;
  }
}

function daysAgoIso(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function throwIfError(error: { message: string } | null, context: string): void {
  if (error) {
    throw new Error(`Growth Memory: ${context}: ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// Matching helpers (no aggressive auto-merge)
// ---------------------------------------------------------------------------

/**
 * Exact match on domain or normalized_name.
 * Soft signals (similar name without shared domain) → possible_duplicate only.
 */
export async function matchCompany(input: {
  companyName: string;
  website?: string | null;
  domain?: string | null;
}): Promise<CompanyMatchResult> {
  const normalizedName = normalizeCompanyName(input.companyName);
  const domain =
    (input.domain && input.domain.trim().toLowerCase()) ||
    (input.website ? extractDomainFromWebsite(input.website) : null);

  if (domain) {
    const { data, error } = await supabaseAdmin
      .from("growth_companies")
      .select("*")
      .eq("domain", domain)
      .neq("status", "archived")
      .maybeSingle();
    throwIfError(error, "matchCompany by domain");
    if (data) {
      return { kind: "exact", company: data as GrowthCompany };
    }
  }

  if (normalizedName) {
    const { data, error } = await supabaseAdmin
      .from("growth_companies")
      .select("*")
      .eq("normalized_name", normalizedName)
      .neq("status", "archived")
      .maybeSingle();
    throwIfError(error, "matchCompany by name");
    if (data) {
      return { kind: "exact", company: data as GrowthCompany };
    }
  }

  // Soft: same first significant token + length proximity → flag only
  if (normalizedName.length >= 4) {
    const token = normalizedName.split(" ")[0]!;
    if (token.length >= 3) {
      const { data: candidates, error } = await supabaseAdmin
        .from("growth_companies")
        .select("*")
        .neq("status", "archived")
        .ilike("normalized_name", `${token}%`)
        .limit(10);
      throwIfError(error, "matchCompany soft scan");

      const soft = (candidates as GrowthCompany[] | null)?.find((c) => {
        if (c.normalized_name === normalizedName) return false;
        const a = c.normalized_name;
        const b = normalizedName;
        const lenDiff = Math.abs(a.length - b.length);
        return (
          (a.includes(b) || b.includes(a)) &&
          lenDiff <= 8 &&
          a.split(" ")[0] === b.split(" ")[0]
        );
      });

      if (soft) {
        return {
          kind: "possible_duplicate",
          company: soft,
          reason: `Similar name to existing company "${soft.company_name}"`,
        };
      }
    }
  }

  return { kind: "none" };
}

/**
 * Exact match on normalized_email (global).
 * Soft: same local-part on different domains under same company → possible only.
 */
export async function matchContact(input: {
  email: string;
  companyId?: string;
}): Promise<ContactMatchResult> {
  const normalizedEmail = normalizeEmail(input.email);
  if (!normalizedEmail.includes("@")) {
    return { kind: "none" };
  }

  const { data, error } = await supabaseAdmin
    .from("growth_contacts")
    .select("*")
    .eq("normalized_email", normalizedEmail)
    .maybeSingle();
  throwIfError(error, "matchContact by email");
  if (data) {
    return { kind: "exact", contact: data as GrowthContact };
  }

  if (input.companyId) {
    const local = normalizedEmail.split("@")[0]!;
    if (local.length >= 3) {
      const { data: siblings, error: sibErr } = await supabaseAdmin
        .from("growth_contacts")
        .select("*")
        .eq("company_id", input.companyId)
        .limit(50);
      throwIfError(sibErr, "matchContact soft scan");

      const soft = (siblings as GrowthContact[] | null)?.find((c) => {
        const otherLocal = c.normalized_email.split("@")[0];
        return otherLocal === local && c.normalized_email !== normalizedEmail;
      });

      if (soft) {
        return {
          kind: "possible_duplicate",
          contact: soft,
          reason: `Same local-part as existing contact ${soft.email}`,
        };
      }
    }
  }

  return { kind: "none" };
}

// ---------------------------------------------------------------------------
// Core API
// ---------------------------------------------------------------------------

export async function findOrCreateCompany(input: {
  companyName: string;
  website?: string | null;
  domain?: string | null;
  country?: string | null;
  vatNumber?: string | null;
  source?: string;
}): Promise<{
  company: GrowthCompany;
  created: boolean;
  possibleDuplicateOf: string | null;
  matchNote: string | null;
}> {
  const companyName = input.companyName.trim();
  if (!companyName) {
    throw new Error("Growth Memory: companyName is required");
  }

  const normalizedName = normalizeCompanyName(companyName);
  const domain =
    (input.domain && input.domain.trim().toLowerCase().replace(/^www\./, "")) ||
    (input.website ? extractDomainFromWebsite(input.website) : null);
  const website = input.website?.trim() || null;
  const source = input.source?.trim() || "manual";

  const match = await matchCompany({
    companyName,
    website,
    domain,
  });

  if (match.kind === "exact") {
    return {
      company: match.company,
      created: false,
      possibleDuplicateOf: match.company.possible_duplicate_of,
      matchNote: null,
    };
  }

  const possibleDuplicateOf =
    match.kind === "possible_duplicate" ? match.company.id : null;
  const status: GrowthCompanyStatus = possibleDuplicateOf
    ? "possible_duplicate"
    : "active";

  const { data, error } = await supabaseAdmin
    .from("growth_companies")
    .insert({
      company_name: companyName,
      normalized_name: normalizedName,
      website,
      domain,
      country: input.country?.trim() || null,
      vat_number: input.vatNumber?.trim() || null,
      source,
      status,
      possible_duplicate_of: possibleDuplicateOf,
    })
    .select("*")
    .single();

  // Race on unique indexes: re-fetch exact
  if (error) {
    const race = await matchCompany({ companyName, website, domain });
    if (race.kind === "exact") {
      return {
        company: race.company,
        created: false,
        possibleDuplicateOf: race.company.possible_duplicate_of,
        matchNote: "resolved concurrent insert",
      };
    }
    throwIfError(error, "findOrCreateCompany insert");
  }

  const company = data as GrowthCompany;

  // Ensure state row exists
  const { error: stateErr } = await supabaseAdmin
    .from("growth_company_state")
    .upsert(
      {
        company_id: company.id,
        outreach_status: "new",
      },
      { onConflict: "company_id", ignoreDuplicates: true }
    );
  throwIfError(stateErr, "findOrCreateCompany ensure state");

  return {
    company,
    created: true,
    possibleDuplicateOf,
    matchNote:
      match.kind === "possible_duplicate" ? match.reason : null,
  };
}

export async function findOrCreateContact(input: {
  companyId: string;
  email: string;
  name?: string | null;
  role?: string | null;
  source?: string;
}): Promise<{
  contact: GrowthContact;
  created: boolean;
  possibleDuplicateOf: string | null;
  matchNote: string | null;
}> {
  const email = input.email.trim();
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail.includes("@")) {
    throw new Error("Growth Memory: invalid email");
  }

  const match = await matchContact({
    email: normalizedEmail,
    companyId: input.companyId,
  });

  if (match.kind === "exact") {
    return {
      contact: match.contact,
      created: false,
      possibleDuplicateOf: match.contact.possible_duplicate_of,
      matchNote:
        match.contact.company_id !== input.companyId
          ? `Email already linked to company ${match.contact.company_id}`
          : null,
    };
  }

  const possibleDuplicateOf =
    match.kind === "possible_duplicate" ? match.contact.id : null;

  const { data, error } = await supabaseAdmin
    .from("growth_contacts")
    .insert({
      company_id: input.companyId,
      email,
      normalized_email: normalizedEmail,
      name: input.name?.trim() || null,
      role: input.role?.trim() || null,
      source: input.source?.trim() || "manual",
      possible_duplicate_of: possibleDuplicateOf,
    })
    .select("*")
    .single();

  if (error) {
    const race = await matchContact({ email: normalizedEmail });
    if (race.kind === "exact") {
      return {
        contact: race.contact,
        created: false,
        possibleDuplicateOf: race.contact.possible_duplicate_of,
        matchNote: "resolved concurrent insert",
      };
    }
    throwIfError(error, "findOrCreateContact insert");
  }

  return {
    contact: data as GrowthContact,
    created: true,
    possibleDuplicateOf,
    matchNote: match.kind === "possible_duplicate" ? match.reason : null,
  };
}

export async function recordInteraction(input: {
  companyId: string;
  contactId?: string | null;
  type: GrowthInteractionType;
  zohoMessageId?: string | null;
  zohoThreadId?: string | null;
  subject?: string | null;
  body?: string | null;
  summary?: string | null;
  metadata?: Record<string, unknown>;
  /** When true (default for sent/received), refresh growth_company_state. */
  updateState?: boolean;
}): Promise<GrowthInteraction> {
  const { data, error } = await supabaseAdmin
    .from("growth_interactions")
    .insert({
      company_id: input.companyId,
      contact_id: input.contactId ?? null,
      type: input.type,
      zoho_message_id: input.zohoMessageId ?? null,
      zoho_thread_id: input.zohoThreadId ?? null,
      subject: input.subject ?? null,
      body: input.body ?? null,
      summary: input.summary ?? null,
      metadata: input.metadata ?? {},
    })
    .select("*")
    .single();
  throwIfError(error, "recordInteraction");

  const interaction = data as GrowthInteraction;
  const shouldUpdateState = input.updateState !== false;

  if (shouldUpdateState) {
    await applyStateSideEffects(input.companyId, input.type);
  }

  return interaction;
}

async function applyStateSideEffects(
  companyId: string,
  type: GrowthInteractionType
): Promise<void> {
  const { data: existing, error } = await supabaseAdmin
    .from("growth_company_state")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();
  throwIfError(error, "applyStateSideEffects load");

  const now = new Date().toISOString();
  const state = (existing as GrowthCompanyState | null) ?? {
    company_id: companyId,
    outreach_status: "new" as GrowthOutreachStatus,
    first_contacted_at: null,
    last_contacted_at: null,
    last_replied_at: null,
    next_follow_up_at: null,
    do_not_contact_reason: null,
    updated_at: now,
  };

  // Never override terminal statuses from incidental interaction types
  const terminal: GrowthOutreachStatus[] = [
    "do_not_contact",
    "registered",
    "not_interested",
  ];
  if (terminal.includes(state.outreach_status) && type !== "note") {
    return;
  }

  const patch: Partial<GrowthCompanyState> & { company_id: string } = {
    company_id: companyId,
  };

  if (type === "ai_draft" || type === "zoho_draft") {
    if (state.outreach_status === "new") {
      patch.outreach_status = "draft_ready";
    }
  } else if (type === "sent") {
    patch.outreach_status =
      state.outreach_status === "replied" ||
      state.outreach_status === "follow_up_due" ||
      state.outreach_status === "interested"
        ? state.outreach_status
        : "contacted";
    patch.last_contacted_at = now;
    if (!state.first_contacted_at) {
      patch.first_contacted_at = now;
    }
  } else if (type === "received") {
    patch.outreach_status = "replied";
    patch.last_replied_at = now;
  } else if (type === "follow_up") {
    patch.outreach_status = "follow_up_due";
  }

  const { error: upsertErr } = await supabaseAdmin
    .from("growth_company_state")
    .upsert(patch, { onConflict: "company_id" });
  throwIfError(upsertErr, "applyStateSideEffects upsert");
}

export async function getCompanyMemory(
  companyId: string,
  options?: { interactionLimit?: number; learningLimit?: number }
): Promise<CompanyMemory | null> {
  const interactionLimit = options?.interactionLimit ?? 50;
  const learningLimit = options?.learningLimit ?? 50;

  const { data: company, error: companyErr } = await supabaseAdmin
    .from("growth_companies")
    .select("*")
    .eq("id", companyId)
    .maybeSingle();
  throwIfError(companyErr, "getCompanyMemory company");
  if (!company) return null;

  const [
    { data: state, error: stateErr },
    { data: contacts, error: contactsErr },
    { data: interactions, error: interactionsErr },
    { data: learning, error: learningErr },
  ] = await Promise.all([
    supabaseAdmin
      .from("growth_company_state")
      .select("*")
      .eq("company_id", companyId)
      .maybeSingle(),
    supabaseAdmin
      .from("growth_contacts")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: true }),
    supabaseAdmin
      .from("growth_interactions")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(interactionLimit),
    supabaseAdmin
      .from("growth_learning_events")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(learningLimit),
  ]);

  throwIfError(stateErr, "getCompanyMemory state");
  throwIfError(contactsErr, "getCompanyMemory contacts");
  throwIfError(interactionsErr, "getCompanyMemory interactions");
  throwIfError(learningErr, "getCompanyMemory learning");

  return {
    company: company as GrowthCompany,
    state: (state as GrowthCompanyState | null) ?? null,
    contacts: (contacts as GrowthContact[]) ?? [],
    recentInteractions: (interactions as GrowthInteraction[]) ?? [],
    recentLearningEvents: (learning as GrowthLearningEvent[]) ?? [],
  };
}

/**
 * Gate for new cold outreach.
 * Blocks: do_not_contact, registered, recent contact, open reply needing follow-up,
 * and same email already contacted (sent).
 */
export async function canContactCompany(input: {
  companyId?: string;
  email?: string;
  cooldownDays?: number;
}): Promise<CanContactResult> {
  const reasons: string[] = [];
  const cooldownDays = input.cooldownDays ?? DEFAULT_CONTACT_COOLDOWN_DAYS;
  let companyId = input.companyId;
  const email = input.email?.trim();

  if (email) {
    const normalizedEmail = normalizeEmail(email);
    const { data: contact, error } = await supabaseAdmin
      .from("growth_contacts")
      .select("*")
      .eq("normalized_email", normalizedEmail)
      .maybeSingle();
    throwIfError(error, "canContactCompany lookup contact");

    if (contact) {
      if (!companyId) {
        companyId = (contact as GrowthContact).company_id;
      }

      const { data: sentRows, error: sentErr } = await supabaseAdmin
        .from("growth_interactions")
        .select("id")
        .eq("contact_id", (contact as GrowthContact).id)
        .eq("type", "sent")
        .limit(1);
      throwIfError(sentErr, "canContactCompany email sent check");

      if (sentRows && sentRows.length > 0) {
        reasons.push("same email already contacted");
      }
    }
  }

  if (!companyId) {
    return {
      allowed: reasons.length === 0,
      reasons,
    };
  }

  const { data: state, error: stateErr } = await supabaseAdmin
    .from("growth_company_state")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();
  throwIfError(stateErr, "canContactCompany state");

  const s = state as GrowthCompanyState | null;

  if (s?.outreach_status === "do_not_contact") {
    reasons.push(
      s.do_not_contact_reason
        ? `do_not_contact: ${s.do_not_contact_reason}`
        : "do_not_contact"
    );
  }

  if (s?.outreach_status === "registered") {
    reasons.push("registered");
  }

  if (s?.last_contacted_at) {
    const cutoff = daysAgoIso(cooldownDays);
    if (s.last_contacted_at > cutoff) {
      reasons.push(
        `contacted recently (within ${cooldownDays} days)`
      );
    }
  }

  // Reply exists and follow-up is due / unanswered reply path
  if (
    s?.outreach_status === "replied" ||
    s?.outreach_status === "follow_up_due" ||
    s?.outreach_status === "interested"
  ) {
    reasons.push("reply already exists requiring follow-up (not cold outreach)");
  } else if (s?.last_replied_at && !s.next_follow_up_at) {
    // Soft signal: reply recorded but status not yet advanced
    reasons.push("reply already exists requiring follow-up (not cold outreach)");
  }

  // Deduplicate reasons
  const unique = [...new Set(reasons)];
  return {
    allowed: unique.length === 0,
    reasons: unique,
  };
}

export async function recordLearningEvent(input: {
  companyId?: string | null;
  contactId?: string | null;
  eventType: GrowthLearningEventType;
  aiOriginal?: string | null;
  finalText?: string | null;
  metadata?: Record<string, unknown>;
}): Promise<GrowthLearningEvent> {
  const { data, error } = await supabaseAdmin
    .from("growth_learning_events")
    .insert({
      company_id: input.companyId ?? null,
      contact_id: input.contactId ?? null,
      event_type: input.eventType,
      ai_original: input.aiOriginal ?? null,
      final_text: input.finalText ?? null,
      metadata: input.metadata ?? {},
    })
    .select("*")
    .single();
  throwIfError(error, "recordLearningEvent");
  return data as GrowthLearningEvent;
}

/**
 * Explicitly mark do-not-contact (manual / compliance).
 * Does not send email or alter Zoho.
 */
export async function markDoNotContact(
  companyId: string,
  reason?: string
): Promise<GrowthCompanyState> {
  const { data, error } = await supabaseAdmin
    .from("growth_company_state")
    .upsert(
      {
        company_id: companyId,
        outreach_status: "do_not_contact",
        do_not_contact_reason: reason?.trim() || null,
      },
      { onConflict: "company_id" }
    )
    .select("*")
    .single();
  throwIfError(error, "markDoNotContact");
  return data as GrowthCompanyState;
}
