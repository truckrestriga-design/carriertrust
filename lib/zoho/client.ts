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
  receivedTime?: string | number;
  summary?: string;
  hasAttachment?: boolean;
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
  kind: "inbox" | "sent"
): string | null {
  const needle =
    kind === "inbox"
      ? [/inbox/i, /^in$/i]
      : [/sent/i, /sent items/i, /^out$/i];

  for (const folder of folders) {
    const name = folder.folderName || "";
    const type = folder.folderType || "";
    if (
      needle.some((re) => re.test(name) || re.test(type)) ||
      (kind === "inbox" && String(folder.folderType) === "Inbox") ||
      (kind === "sent" && /sent/i.test(String(folder.folderType)))
    ) {
      return String(folder.folderId);
    }
  }

  return null;
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
  return rows.map((row) => ({
    ...row,
    messageId: String(row.messageId),
    folderId: row.folderId ? String(row.folderId) : folderId,
  }));
}

/** Read Inbox messages only. Does not send mail. */
export async function listInboxMessages(
  options?: { limit?: number; start?: number; accountId?: string }
) {
  const tokens = await getValidZohoTokens();
  const accountId =
    options?.accountId ||
    tokens.accountId ||
    String((await listZohoAccounts(tokens))[0]?.accountId || "");

  if (!accountId) throw new Error("No Zoho Mail account found");

  const folders = await listZohoFolders(accountId, tokens);
  const folderId = findFolderId(folders, "inbox");
  if (!folderId) throw new Error("Inbox folder not found");

  return listFolderMessages(accountId, folderId, options, tokens);
}

/** Read Sent messages only. Does not send mail. */
export async function listSentMessages(
  options?: { limit?: number; start?: number; accountId?: string }
) {
  const tokens = await getValidZohoTokens();
  const accountId =
    options?.accountId ||
    tokens.accountId ||
    String((await listZohoAccounts(tokens))[0]?.accountId || "");

  if (!accountId) throw new Error("No Zoho Mail account found");

  const folders = await listZohoFolders(accountId, tokens);
  const folderId = findFolderId(folders, "sent");
  if (!folderId) throw new Error("Sent folder not found");

  return listFolderMessages(accountId, folderId, options, tokens);
}

/**
 * Create a Draft only (`mode: "draft"`).
 * Intentionally no sendEmail / schedule helpers in phase 1.
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
