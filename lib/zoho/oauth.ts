export const ZOHO_OAUTH_SCOPES = [
  "ZohoMail.accounts.READ",
  "ZohoMail.folders.READ",
  "ZohoMail.messages.READ",
  "ZohoMail.messages.CREATE",
].join(",");

export type ZohoTokenResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  api_domain?: string;
  token_type?: string;
  error?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export function getZohoOAuthConfig() {
  return {
    clientId: requiredEnv("ZOHO_CLIENT_ID"),
    clientSecret: requiredEnv("ZOHO_CLIENT_SECRET"),
    redirectUri: requiredEnv("ZOHO_REDIRECT_URI"),
    accountsBaseUrl: (
      process.env.ZOHO_ACCOUNTS_BASE_URL || "https://accounts.zoho.eu"
    ).replace(/\/$/, ""),
    mailApiBaseUrl: (
      process.env.ZOHO_MAIL_API_BASE_URL || "https://mail.zoho.eu"
    ).replace(/\/$/, ""),
  };
}

export function buildZohoAuthorizeUrl(state: string) {
  const { clientId, redirectUri, accountsBaseUrl } = getZohoOAuthConfig();
  const url = new URL(`${accountsBaseUrl}/oauth/v2/auth`);
  url.searchParams.set("scope", ZOHO_OAUTH_SCOPES);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);
  return url.toString();
}

async function postToken(
  params: Record<string, string>
): Promise<ZohoTokenResponse> {
  const { accountsBaseUrl } = getZohoOAuthConfig();
  const body = new URLSearchParams(params);

  const res = await fetch(`${accountsBaseUrl}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const json = (await res.json()) as ZohoTokenResponse;

  if (!res.ok || json.error || !json.access_token) {
    throw new Error(
      `Zoho token error: ${json.error || res.statusText || "unknown"}`
    );
  }

  return json;
}

export async function exchangeZohoCode(code: string) {
  const { clientId, clientSecret, redirectUri } = getZohoOAuthConfig();
  return postToken({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code,
  });
}

export async function refreshZohoAccessToken(refreshToken: string) {
  const { clientId, clientSecret } = getZohoOAuthConfig();
  return postToken({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });
}
