// supabase/functions/admin-reviews/index.ts
//
// Admin-only. Moderates reviews using SERVICE ROLE.
//
// POST body examples:
// {
//   "review_id": "uuid",
//   "action": "hide"
// }
//
// {
//   "review_id": "uuid",
//   "action": "publish"
// }
//
// {
//   "review_id": "uuid",
//   "action": "delete"
// }
//
// {
//   "review_id": "uuid",
//   "action": "edit",
//   "review_text": "new full text"
// }
//
// Response:
// { ok:true }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    if (req.method !== "POST") {
      return json({ ok: false, error: "Method not allowed" }, 405);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_EMAIL) {
      return json({ ok: false, error: "Server misconfigured (missing secrets)" }, 500);
    }

    const authHeader = req.headers.get("authorization") || "";

    const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await anon.auth.getUser();
    if (userErr || !userData?.user) {
      return json({ ok: false, error: "Unauthorized" }, 401);
    }

    const adminEmail = (userData.user.email || "").toLowerCase();
    if (adminEmail !== ADMIN_EMAIL.toLowerCase()) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const review_id = String(body.review_id || "").trim();
    const action = String(body.action || "").trim().toLowerCase();
    const review_text = typeof body.review_text === "string" ? body.review_text.trim() : "";
    const edit_reason = typeof body.edit_reason === "string" ? body.edit_reason.trim() : "";

    if (!review_id) {
      return json({ ok: false, error: "Missing review_id" }, 400);
    }

    if (!["hide", "publish", "delete", "edit"].includes(action)) {
      return json({ ok: false, error: "Invalid action" }, 400);
    }

    if (action === "edit" && !review_text) {
      return json({ ok: false, error: "Missing review_text" }, 400);
    }

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: existingReview, error: existingErr } = await service
      .from("reviews")
      .select("id, company_id, status, review_text")
      .eq("id", review_id)
      .single();

    if (existingErr || !existingReview) {
      return json({ ok: false, error: "Review not found" }, 404);
    }

    if (action === "hide") {
      const { error } = await service
        .from("reviews")
        .update({ status: "hidden" })
        .eq("id", review_id);

      if (error) {
        return json({ ok: false, error: "Failed to hide review", details: error.message }, 500);
      }

      await service.from("admin_audit_log").insert({
        admin_email: userData.user.email || null,
        action: "review_hide",
        target_company_id: existingReview.company_id || null,
        target_review_id: review_id,
        details: {
          previous_status: existingReview.status,
          new_status: "hidden",
        },
      });

      return json({ ok: true });
    }

    if (action === "publish") {
      const { error } = await service
        .from("reviews")
        .update({ status: "published" })
        .eq("id", review_id);

      if (error) {
        return json({ ok: false, error: "Failed to publish review", details: error.message }, 500);
      }

      await service.from("admin_audit_log").insert({
        admin_email: userData.user.email || null,
        action: "review_publish",
        target_company_id: existingReview.company_id || null,
        target_review_id: review_id,
        details: {
          previous_status: existingReview.status,
          new_status: "published",
        },
      });

      return json({ ok: true });
    }

    if (action === "edit") {
      const suffix = edit_reason ? `\n\n[Edited by admin: ${edit_reason}]` : "";
      const finalText = review_text.endsWith(suffix) || !suffix ? review_text : review_text + suffix;

      const { error } = await service
        .from("reviews")
        .update({ review_text: finalText })
        .eq("id", review_id);

      if (error) {
        return json({ ok: false, error: "Failed to edit review", details: error.message }, 500);
      }

      await service.from("admin_audit_log").insert({
        admin_email: userData.user.email || null,
        action: "review_edit",
        target_company_id: existingReview.company_id || null,
        target_review_id: review_id,
        details: {
          previous_text: existingReview.review_text || null,
          new_text: finalText,
          edit_reason: edit_reason || null,
        },
      });

      return json({ ok: true });
    }

    const { error } = await service.from("reviews").delete().eq("id", review_id);

    if (error) {
      return json({ ok: false, error: "Failed to delete review", details: error.message }, 500);
    }

    await service.from("admin_audit_log").insert({
      admin_email: userData.user.email || null,
      action: "review_delete",
      target_company_id: existingReview.company_id || null,
      target_review_id: review_id,
      details: {
        deleted_status: existingReview.status,
        deleted_text: existingReview.review_text || null,
      },
    });

    return json({ ok: true });
  } catch (e) {
    console.error("admin-reviews error:", e);
    return json({ ok: false, error: "Internal error" }, 500);
  }
});