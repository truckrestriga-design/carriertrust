import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const GROWTH_ADMIN_EMAIL = "carriertrust.eu@gmail.com";

export function bearerToken(req: Request) {
  const authorization = req.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}

export async function requireGrowthAdmin(req: Request) {
  const token = bearerToken(req);

  if (!token) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const email = (user.email || "").toLowerCase();
  if (email !== GROWTH_ADMIN_EMAIL.toLowerCase()) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const, user, accessToken: token };
}
