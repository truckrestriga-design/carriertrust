// supabase/functions/create-review-reply/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Body = {
  review_id: string;
  message: string;
};

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // client с service-role чтобы обходить RLS (мы специально запретили прямые inserts)
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // user из JWT (authorization header)
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace("Bearer ", "").trim();
    if (!jwt) return json(401, { error: "Missing Authorization Bearer token" });

    const authed = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });

    const { data: userData, error: userErr } = await authed.auth.getUser();
    if (userErr || !userData?.user) return json(401, { error: "Invalid token" });
    const userId = userData.user.id;

    const body = (await req.json()) as Body;
    const reviewId = (body.review_id || "").trim();
    const message = (body.message || "").trim();

    if (!reviewId) return json(400, { error: "review_id is required" });
    if (message.length < 10) return json(400, { error: "Message too short (min 10 chars)" });
    if (message.length > 2000) return json(400, { error: "Message too long (max 2000 chars)" });

    // 1) Найти review и company_id
    const { data: review, error: revErr } = await admin
      .from("reviews")
      .select("id, company_id")
      .eq("id", reviewId)
      .single();

    if (revErr || !review) return json(404, { error: "Review not found" });
    const companyId = review.company_id;

    // 2) Проверить что user = approved owner этой company
    const { data: claim, error: claimErr } = await admin
      .from("company_claims")
      .select("id, status")
      .eq("company_id", companyId)
      .eq("user_id", userId)
      .eq("status", "approved")
      .maybeSingle();

    if (claimErr) return json(500, { error: "Claim check failed" });
    if (!claim) return json(403, { error: "No approved company access" });

    // 3) Проверить: один reply на один review
    const { data: existing } = await admin
      .from("review_replies")
      .select("id")
      .eq("review_id", reviewId)
      .maybeSingle();

    if (existing?.id) {
      return json(409, { error: "Reply already exists for this review" });
    }

    // 4) (Подготовка под монетизацию) лимит для free: 3 replies за 30 дней.
    // Если таблицы/плана нет — просто пропускаем.
    // Ты позже подключишь Stripe и заменишь на реальную проверку подписки.
    const FREE_LIMIT = 3;
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const { count: replyCount30d } = await admin
      .from("review_replies")
      .select("id", { count: "exact", head: true })
      .eq("company_id", companyId)
      .gte("created_at", since);

    // ВАЖНО: сейчас считаем всех, даже hidden. Так честнее против спама.
    // Если хочешь считать только published — поменяем.
    if ((replyCount30d ?? 0) >= FREE_LIMIT) {
      return json(402, {
        error: "Free reply limit reached",
        limit: FREE_LIMIT,
        window_days: 30,
      });
    }

    // 5) Вставка reply
    const { data: inserted, error: insErr } = await admin
      .from("review_replies")
      .insert({
        review_id: reviewId,
        company_id: companyId,
        author_user_id: userId,
        message,
        status: "published",
      })
      .select("id, review_id, company_id, status, created_at")
      .single();

    if (insErr) return json(500, { error: "Insert failed" });

    return json(200, { ok: true, reply: inserted });
  } catch (e) {
    return json(500, { error: "Unexpected error", details: String(e) });
  }
});