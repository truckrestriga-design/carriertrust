import {
  getZohoOAuthConfig,
  refreshZohoAccessToken,
} from "@/lib/zoho/oauth";
import {
  loadZohoTokens,
  saveZohoTokens,
  type ZohoStoredTokens,
} from "@/lib/zoho/tokenStore";

export type ZohoFolder = {
  folderId: string;
  folderName: string;
  folderType?: string;
};

export type ZohoMessageSummary = {
  messageId: string;
  folderId?: string;
  subject?: string;
  fromAddress?: string;
  toAddress?: string;
  sender?: string;
  receivedTime?: string | number;
  sentDateInGMT?: string | number;
  summary?: string;
  hasAttachment?: boolean | string | number;
  /** Zoho list status: "0" unread, "1" read (when present). */
  status?: string | number;
  isRead?: boolean | null;
};

export type ZohoAttachmentMeta = {
  attachmentId: string;
  attachmentName?: string;
  attachmentSize?: number | string;
};

export type ZohoMessageDetail = {
  messageId: string;
  folderId: string;
  subject?: string;
  fromAddress?: string;
  toAddress?: string;
  date?: string | number | null;
  plainTextBody?: string | null;
  htmlBody?: string | null;
  attachments: ZohoAttachmentMeta[];
  isRead?: boolean | null;
};

export type CreateZohoDraftInput = {
  fromAddress: string;
  toAddress: string;
  subject: string;
  content: string;
  ccAddress?: string;
  bccAddress?: string;
  mailFormat?: "html" | "plaintext";
};

function mailBaseUrl(tokens: ZohoStoredTokens) {
  const configured = getZohoOAuthConfig().mailApiBaseUrl;
  // Prefer stored api_domain only when it looks like a Zoho mail host.
  if (tokens.apiDomain && /mail\.zoho\./i.test(tokens.apiDomain)) {
    return tokens.apiDomain.replace(/\/$/, "");
  }
  return configured;
}

async function zohoFetch(
  tokens: ZohoStoredTokens,
  path: string,
  init?: RequestInit
) {
  const url = `${mailBaseUrl(tokens)}${path}`;
  const headers = new Headers(init?.headers || {});
  headers.set("Authorization", `Zoho-oauthtoken ${tokens.accessToken}`);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Accept", "application/json");

  return fetch(url, { ...init, headers });
}

/**
 * Returns usable tokens, refreshing access_token when expired.
 * Never exposes refresh/access tokens to callers beyond this module's return
 * (server-side only). Callers must not log or return these values.
 */
export async function getValidZohoTokens(): Promise<ZohoStoredTokens> {
  const current = await loadZohoTokens();
  if (!current?.refreshToken) {
    throw new Error("Zoho Mail is not connected");
  }

  const skewMs = 60_000;
  if (current.accessToken && current.expiresAt > Date.now() + skewMs) {
    return current;
  }

  const refreshed = await refreshZohoAccessToken(current.refreshToken);
  const next: ZohoStoredTokens = {
    ...current,
    accessToken: refreshed.access_token,
    expiresAt: Date.now() + refreshed.expires_in * 1000,
    apiDomain: refreshed.api_domain || current.apiDomain,
    updatedAt: new Date().toISOString(),
  };

  await saveZohoTokens(next);
  return next;
}

export async function listZohoAccounts(tokens?: ZohoStoredTokens) {
  const t = tokens || (await getValidZohoTokens());
  const res = await zohoFetch(t, "/api/accounts");
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      `Zoho accounts error: ${json?.data?.errorCode || res.statusText}`
    );
  }

  return (json?.data || []) as Array<{
    accountId: string | number;
    primaryEmailAddress?: string;
    mailboxAddress?: string;
    displayName?: string;
  }>;
}

export async function listZohoFolders(
  accountId: string,
  tokens?: ZohoStoredTokens
) {
  const t = tokens || (await getValidZohoTokens());
  const res = await zohoFetch(t, `/api/accounts/${accountId}/folders`);
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      `Zoho folders error: ${json?.data?.errorCode || res.statusText}`
    );
  }

  return (json?.data || []) as ZohoFolder[];
}

function findFolderId(
  folders: ZohoFolder[],
  kind: "inbox" | "sent" | "drafts"
): string | null {
  const needle =
    kind === "inbox"
      ? [/inbox/i, /^in$/i]
      : kind === "sent"
        ? [/sent/i, /sent items/i, /^out$/i]
        : [/draft/i, /drafts/i];

  for (const folder of folders) {
    const name = folder.folderName || "";
    const type = folder.folderType || "";
    if (
      needle.some((re) => re.test(name) || re.test(type)) ||
      (kind === "inbox" && String(folder.folderType) === "Inbox") ||
      (kind === "sent" && /sent/i.test(String(folder.folderType))) ||
      (kind === "drafts" && /draft/i.test(String(folder.folderType)))
    ) {
      return String(folder.folderId);
    }
  }

  return null;
}

function parseIsRead(status: string | number | undefined): boolean | null {
  if (status === undefined || status === null || status === "") return null;
  const value = String(status);
  if (value === "0") return false;
  if (value === "1") return true;
  return null;
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function resolveAccountId(
  tokens: ZohoStoredTokens,
  accountId?: string
): Promise<string> {
  const resolved =
    accountId ||
    tokens.accountId ||
    String((await listZohoAccounts(tokens))[0]?.accountId || "");

  if (!resolved) throw new Error("No Zoho Mail account found");
  return resolved;
}

function normalizeMessageSummary(
  row: ZohoMessageSummary,
  folderId: string
): ZohoMessageSummary {
  return {
    ...row,
    messageId: String(row.messageId),
    folderId: row.folderId ? String(row.folderId) : folderId,
    isRead: parseIsRead(row.status),
  };
}

export async function listFolderMessages(
  accountId: string,
  folderId: string,
  options?: { limit?: number; start?: number },
  tokens?: ZohoStoredTokens
): Promise<ZohoMessageSummary[]> {
  const t = tokens || (await getValidZohoTokens());
  const limit = Math.min(Math.max(options?.limit ?? 25, 1), 100);
  const start = Math.max(options?.start ?? 1, 1);

  const qs = new URLSearchParams({
    limit: String(limit),
    start: String(start),
    includeto: "true",
  });

  const res = await zohoFetch(
    t,
    `/api/accounts/${accountId}/messages/view?folderId=${encodeURIComponent(
      folderId
    )}&${qs.toString()}`
  );
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      `Zoho messages error: ${json?.data?.errorCode || res.statusText}`
    );
  }

  const rows = (json?.data || []) as ZohoMessageSummary[];
  return rows.map((row) => normalizeMessageSummary(row, folderId));
}

/** Read Inbox messages only. Does not send or mutate mail. */
export async function listInboxMessages(
  options?: { limit?: number; start?: number; accountId?: string }
) {
  const tokens = await getValidZohoTokens();
  const accountId = await resolveAccountId(tokens, options?.accountId);

  const folders = await listZohoFolders(accountId, tokens);
  const folderId = findFolderId(folders, "inbox");
  if (!folderId) throw new Error("Inbox folder not found");

  return listFolderMessages(accountId, folderId, options, tokens);
}

/** Read Sent messages only. Does not send or mutate mail. */
export async function listSentMessages(
  options?: { limit?: number; start?: number; accountId?: string }
) {
  const tokens = await getValidZohoTokens();
  const accountId = await resolveAccountId(tokens, options?.accountId);

  const folders = await listZohoFolders(accountId, tokens);
  const folderId = findFolderId(folders, "sent");
  if (!folderId) throw new Error("Sent folder not found");

  return listFolderMessages(accountId, folderId, options, tokens);
}

/** Read Drafts messages only. Does not create or mutate drafts. */
export async function listDraftMessages(
  options?: { limit?: number; start?: number; accountId?: string }
) {
  const tokens = await getValidZohoTokens();
  const accountId = await resolveAccountId(tokens, options?.accountId);

  const folders = await listZohoFolders(accountId, tokens);
  const folderId = findFolderId(folders, "drafts");
  if (!folderId) throw new Error("Drafts folder not found");

  return listFolderMessages(accountId, folderId, options, tokens);
}

/**
 * Fetch a single message body + attachment metadata (GET only).
 * Does not send, delete, move, or call mark-read/unread endpoints.
 */
export async function getZohoMessageDetail(options: {
  messageId: string;
  folderId: string;
  accountId?: string;
  /** Optional list-row fields so the UI can show headers without a second list fetch. */
  subject?: string;
  fromAddress?: string;
  toAddress?: string;
  receivedTime?: string | number;
  sentDateInGMT?: string | number;
  status?: string | number;
}): Promise<ZohoMessageDetail> {
  const tokens = await getValidZohoTokens();
  const accountId = await resolveAccountId(tokens, options.accountId);
  const messageId = String(options.messageId);
  const folderId = String(options.folderId);

  if (!messageId || !folderId) {
    throw new Error("messageId and folderId are required");
  }

  const contentPath = `/api/accounts/${accountId}/folders/${encodeURIComponent(
    folderId
  )}/messages/${encodeURIComponent(messageId)}/content`;
  const attachPath = `/api/accounts/${accountId}/folders/${encodeURIComponent(
    folderId
  )}/messages/${encodeURIComponent(messageId)}/attachmentinfo`;

  const [contentRes, attachRes] = await Promise.all([
    zohoFetch(tokens, contentPath),
    zohoFetch(tokens, attachPath),
  ]);

  const contentJson = await contentRes.json().catch(() => ({}));
  if (!contentRes.ok) {
    throw new Error(
      `Zoho message content error: ${
        contentJson?.data?.errorCode || contentRes.statusText
      }`
    );
  }

  const contentData = (contentJson?.data || {}) as {
    messageId?: string | number;
    content?: string;
    plainContent?: string;
    textContent?: string;
    htmlContent?: string;
    subject?: string;
    fromAddress?: string;
    toAddress?: string;
    receivedTime?: string | number;
    sentDateInGMT?: string | number;
  };

  const htmlBody =
    contentData.htmlContent ||
    contentData.content ||
    null;
  const plainFromApi =
    contentData.plainContent || contentData.textContent || null;
  const plainTextBody =
    plainFromApi || (htmlBody ? htmlToPlainText(htmlBody) : null);

  let attachments: ZohoAttachmentMeta[] = [];
  if (attachRes.ok) {
    const attachJson = await attachRes.json().catch(() => ({}));
    const list = (attachJson?.data?.attachments || []) as Array<{
      attachmentId?: string | number;
      attachmentName?: string;
      attachmentSize?: number | string;
    }>;
    attachments = list
      .filter((a) => a.attachmentId != null)
      .map((a) => ({
        attachmentId: String(a.attachmentId),
        attachmentName: a.attachmentName,
        attachmentSize: a.attachmentSize,
      }));
  }

  return {
    messageId,
    folderId,
    subject: options.subject ?? contentData.subject,
    fromAddress: options.fromAddress ?? contentData.fromAddress,
    toAddress: options.toAddress ?? contentData.toAddress,
    date:
      options.receivedTime ??
      options.sentDateInGMT ??
      contentData.receivedTime ??
      contentData.sentDateInGMT ??
      null,
    plainTextBody,
    htmlBody,
    attachments,
    isRead: parseIsRead(options.status),
  };
}

/**
 * Create a Draft only via Zoho "Save Draft / Template" API:
 * POST /api/accounts/{accountId}/messages with mode: "draft".
 * Never omits mode (that would send). No send/schedule helpers.
 * Docs: https://www.zoho.com/mail/help/api/post-save-draft-template.html
 */
export async function createZohoDraft(
  input: CreateZohoDraftInput,
  options?: { accountId?: string }
) {
  const tokens = await getValidZohoTokens();
  const accountId =
    options?.accountId ||
    tokens.accountId ||
    String((await listZohoAccounts(tokens))[0]?.accountId || "");

  if (!accountId) throw new Error("No Zoho Mail account found");

  const fromAddress =
    input.fromAddress || tokens.accountEmail || "";
  if (!fromAddress) {
    throw new Error("fromAddress is required to create a draft");
  }

  // Hard-lock: Zoho sends when mode is absent; draft requires mode:"draft".
  const body = {
    mode: "draft" as const,
    fromAddress,
    toAddress: input.toAddress,
    subject: input.subject,
    content: input.content,
    mailFormat: input.mailFormat || "html",
    ...(input.ccAddress ? { ccAddress: input.ccAddress } : {}),
    ...(input.bccAddress ? { bccAddress: input.bccAddress } : {}),
  };

  if (body.mode !== "draft") {
    throw new Error("Refusing Zoho messages POST without mode=draft");
  }

  const res = await zohoFetch(tokens, `/api/accounts/${accountId}/messages`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      `Zoho create draft error: ${json?.data?.errorCode || res.statusText}`
    );
  }

  return json?.data ?? json;
}
