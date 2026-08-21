/**
 * Zoho Mail → Growth Memory Sync v1
 *
 * READ-ONLY from Zoho (list + message content GET).
 * WRITE only into Growth Memory via existing helpers.
 * Does NOT send, delete, move, archive, mark read/unread, create drafts,
 * change OAuth, call OpenAI, or run on a schedule.
 */

import {
  extractDomainFromEmail,
  findOrCreateCompany,
  findOrCreateContact,
  matchContact,
  normalizeEmail,
  recordInteraction,
} from "@/lib/growth/memory";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  getValidZohoTokens,
  getZohoMessageDetail,
  listInboxMessages,
  listSentMessages,
  type ZohoMessageSummary,
} from "@/lib/zoho/client";

export const ZOHO_MEMORY_SYNC_LIMIT = 100;
export const OWN_MAILBOX_EMAIL = "support@carriertrust.eu";
export const OWN_MAILBOX_DOMAIN = "carriertrust.eu";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "yandex.com",
  "yandex.ru",
  "zoho.com",
]);

const SYSTEM_LOCAL_PARTS = new Set([
  "no-reply",
  "noreply",
  "mailer-daemon",
  "postmaster",
  "bounce",
]);

export type FolderSyncStats = {
  scanned: number;
  imported: number;
  skippedExisting: number;
  skippedInvalid: number;
  missingIdOrFolder: number;
  noExternalRecipient: number;
  otherInvalid: number;
  errors: number;
};

export type ZohoMemorySyncResult = {
  ok: true;
  sent: FolderSyncStats;
  inbox: FolderSyncStats;
};

type ParsedAddress = {
  email: string;
  name: string | null;
};

function emptyStats(): FolderSyncStats {
  return {
    scanned: 0,
    imported: 0,
    skippedExisting: 0,
    skippedInvalid: 0,
    missingIdOrFolder: 0,
    noExternalRecipient: 0,
    otherInvalid: 0,
    errors: 0,
  };
}

function toIsoDate(value: string | number | null | undefined): string | null {
  if (value == null || value === "") return null;
  if (typeof value === "number") {
    const ms = value > 1e12 ? value : value * 1000;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  const raw = String(value).trim();
  if (/^\d+$/.test(raw)) {
    const n = Number(raw);
    const ms = n > 1e12 ? n : n * 1000;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/**
 * Extract email addresses from Zoho header fields
 * ("Name" <a@b.com>, c@d.com).
 */
export function parseEmailAddresses(
  raw: string | null | undefined
): ParsedAddress[] {
  if (!raw || !String(raw).trim()) return [];

  const source = String(raw);
  const results: ParsedAddress[] = [];
  const seen = new Set<string>();

  const matches = source.matchAll(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  );

  for (const match of matches) {
    const email = normalizeEmail(match[0] || "");
    if (!email.includes("@") || seen.has(email)) continue;

    seen.add(email);

    let name: string | null = null;

    const before = source.slice(0, match.index ?? 0);
    const angleStart = before.lastIndexOf("<");
    const separator = Math.max(
      before.lastIndexOf(","),
      before.lastIndexOf(";")
    );

    const candidate = before
      .slice(separator + 1, angleStart >= 0 ? angleStart : undefined)
      .replace(/^["'\s]+|["'\s]+$/g, "")
      .trim();

    if (candidate && !candidate.includes("@")) {
      name = candidate;
    }

    results.push({ email, name });
  }

  return results;
}

export function isOwnMailboxEmail(
  email: string,
  extraOwnEmails: string[] = []
): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized.includes("@")) return false;

  const own = new Set(
    [OWN_MAILBOX_EMAIL, ...extraOwnEmails]
      .map((e) => normalizeEmail(e))
      .filter(Boolean)
  );
  if (own.has(normalized)) return true;

  const domain = extractDomainFromEmail(normalized);
  return domain === OWN_MAILBOX_DOMAIN;
}

export function isSystemEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  const local = normalized.split("@")[0] || "";
  const localClean = local.replace(/[._]/g, "");
  if (SYSTEM_LOCAL_PARTS.has(local) || SYSTEM_LOCAL_PARTS.has(localClean)) {
    return true;
  }
  // Soft: local-part starts with noreply / no-reply
  if (/^no[\._-]?reply/i.test(local)) return true;
  if (/^mailer[\._-]?daemon/i.test(local)) return true;
  return false;
}

function isFreeEmailDomain(domain: string | null): boolean {
  if (!domain) return true;
  return FREE_EMAIL_DOMAINS.has(domain.toLowerCase());
}

function pickExternalContact(
  candidates: ParsedAddress[],
  ownEmails: string[]
): ParsedAddress | null {
  for (const c of candidates) {
    if (isOwnMailboxEmail(c.email, ownEmails)) continue;
    if (isSystemEmail(c.email)) continue;
    return c;
  }
  return null;
}

function threadIdFromSummary(row: ZohoMessageSummary): string | null {
  const raw = row as ZohoMessageSummary & {
    threadId?: string | number;
    conversationId?: string | number;
  };
  const value = raw.threadId ?? raw.conversationId;
  if (value == null || value === "") return null;
  return String(value);
}

async function existingZohoMessageIds(
  messageIds: string[]
): Promise<Set<string>> {
  const found = new Set<string>();
  if (messageIds.length === 0) return found;

  // Chunk to keep query size reasonable
  const chunkSize = 50;
  for (let i = 0; i < messageIds.length; i += chunkSize) {
    const chunk = messageIds.slice(i, i + chunkSize);
    const { data, error } = await supabaseAdmin
      .from("growth_interactions")
      .select("zoho_message_id")
      .in("zoho_message_id", chunk);

    if (error) {
      throw new Error(
        `Growth Memory: existingZohoMessageIds: ${error.message}`
      );
    }

    for (const row of data || []) {
      if (row.zoho_message_id) found.add(String(row.zoho_message_id));
    }
  }

  return found;
}

function isUniqueViolation(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error || "");
  return (
    /duplicate key/i.test(message) ||
    /unique constraint/i.test(message) ||
    /zoho_message/i.test(message)
  );
}

async function importOneMessage(options: {
  summary: ZohoMessageSummary;
  folder: "sent" | "inbox";
  ownEmails: string[];
}): Promise<
  "imported" |
  "skippedExisting" |
  "missingIdOrFolder" |
  "noExternalRecipient" |
  "otherInvalid"
> {
  const { summary, folder, ownEmails } = options;
  const messageId = String(summary.messageId || "").trim();
  const folderId = String(summary.folderId || "").trim();

  if (!messageId || !folderId) {
    return "missingIdOrFolder";
  }

  const fromList = parseEmailAddresses(summary.fromAddress || summary.sender);
  const rawSummary = summary as ZohoMessageSummary & {
    toAddr?: string;
  };
  
  const toList = parseEmailAddresses(
    summary.toAddress || rawSummary.toAddr
  );

  let external: ParsedAddress | null = null;
  if (folder === "sent") {
    external = pickExternalContact(toList, ownEmails);
  } else {
    external = pickExternalContact(fromList, ownEmails);
  }

  if (!external) {
    if (folder === "sent") {

    }

    return "noExternalRecipient";
  }

  const domain = extractDomainFromEmail(external.email);
  const corporate = Boolean(domain && !isFreeEmailDomain(domain));

  // Email exact match first (strongest signal). No fuzzy name merge.
  const emailMatch = await matchContact({ email: external.email });

  let companyId: string;
  let contactId: string;

  if (emailMatch.kind === "exact") {
    companyId = emailMatch.contact.company_id;
    contactId = emailMatch.contact.id;
  } else {
    const companyName = corporate && domain ? domain : external.email;
    const companyDomain = corporate && domain ? domain : null;

    const { company } = await findOrCreateCompany({
      companyName,
      domain: companyDomain,
      website: companyDomain ? `https://${companyDomain}` : null,
      source: "zoho_sync",
    });

    const { contact } = await findOrCreateContact({
      companyId: company.id,
      email: external.email,
      name: external.name,
      source: "zoho_sync",
    });

    companyId = contact.company_id || company.id;
    contactId = contact.id;
  }

  // Prefer list headers; enrich body via read-only content GET.
  let subject = summary.subject || null;
  let fromAddress = summary.fromAddress || summary.sender || null;
  let toAddress = summary.toAddress || null;
  let dateRaw: string | number | null =
    summary.receivedTime ?? summary.sentDateInGMT ?? null;
  let body: string | null = summary.summary ? String(summary.summary) : null;
  const threadId = threadIdFromSummary(summary);

  try {
    const detail = await getZohoMessageDetail({
      messageId,
      folderId,
      subject: summary.subject,
      fromAddress: summary.fromAddress || summary.sender,
      toAddress: summary.toAddress,
      receivedTime: summary.receivedTime,
      sentDateInGMT: summary.sentDateInGMT,
      status: summary.status,
    });
    subject = detail.subject ?? subject;
    fromAddress = detail.fromAddress ?? fromAddress;
    toAddress = detail.toAddress ?? toAddress;
    dateRaw = detail.date ?? dateRaw;
    if (detail.plainTextBody) {
      body = detail.plainTextBody;
    }
  } catch {
    // Content fetch is best-effort; list metadata is enough to import.
  }

  const dateIso = toIsoDate(dateRaw);

  try {
    await recordInteraction({
      companyId,
      contactId,
      type: folder === "sent" ? "sent" : "received",
      zohoMessageId: messageId,
      zohoThreadId: threadId,
      subject,
      body,
      metadata: {
        source: "zoho_sync",
        date: dateIso,
        from: fromAddress,
        to: toAddress,
        folder,
      },
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return "skippedExisting";
    }
    throw error;
  }

  return "imported";
}

async function syncFolder(
  folder: "sent" | "inbox",
  ownEmails: string[]
): Promise<FolderSyncStats> {
  const stats = emptyStats();

  const list =
    folder === "sent"
      ? await listSentMessages({ limit: ZOHO_MEMORY_SYNC_LIMIT, start: 1 })
      : await listInboxMessages({ limit: ZOHO_MEMORY_SYNC_LIMIT, start: 1 });

  const messages = list.slice(0, ZOHO_MEMORY_SYNC_LIMIT);
  stats.scanned = messages.length;

  const ids = messages
    .map((m) => String(m.messageId || "").trim())
    .filter(Boolean);
  const existing = await existingZohoMessageIds(ids);

  for (const summary of messages) {
    const messageId = String(summary.messageId || "").trim();
    if (!messageId) {
      stats.skippedInvalid += 1;
      continue;
    }

    if (existing.has(messageId)) {
      stats.skippedExisting += 1;
      continue;
    }

    try {
      const result = await importOneMessage({
        summary,
        folder,
        ownEmails,
      });
      if (result === "imported") {
        stats.imported += 1;
        existing.add(messageId);
      } else if (result === "skippedExisting") {
        stats.skippedExisting += 1;
      } else {
        stats.skippedInvalid += 1;

        if (result === "missingIdOrFolder") {
          stats.missingIdOrFolder += 1;
        } else if (result === "noExternalRecipient") {
          stats.noExternalRecipient += 1;
        } else {
          stats.otherInvalid += 1;
        }
      }
    } catch (error) {
      stats.errors += 1;
      console.error(
        `ZOHO MEMORY SYNC ${folder} error for ${messageId}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  return stats;
}

/**
 * Import up to 100 Sent + 100 Inbox messages into Growth Memory.
 * Idempotent on zoho_message_id. Sent first, then Inbox (so reply state wins).
 */
export async function syncZohoHistoryToGrowthMemory(): Promise<ZohoMemorySyncResult> {
  const tokens = await getValidZohoTokens();
  const ownEmails = [OWN_MAILBOX_EMAIL];
  if (tokens.accountEmail) {
    ownEmails.push(tokens.accountEmail);
  }

  // Sent first → contacted, then Inbox → replied when applicable.
  const sent = await syncFolder("sent", ownEmails);
  const inbox = await syncFolder("inbox", ownEmails);

  return { ok: true, sent, inbox };
}
