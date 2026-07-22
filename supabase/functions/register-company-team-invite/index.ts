import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function normalizeEmail(value: unknown) {
  return String(value ?? "").trim().toLowerCase();
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(value: string) {
  const encoded = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return bytesToHex(new Uint8Array(digest));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json(
      {
        ok: false,
        error: "Method not allowed",
      },
      405,
    );
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SERVICE_ROLE_KEY =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return json(
        {
          ok: false,
          error: "Missing required environment secrets",
        },
        500,
      );
    }

    const body = await req.json().catch(() => ({}));

    const action = String(body.action ?? "inspect").trim();
    const token = String(body.token ?? "").trim();
    const password = String(body.password ?? "");

    if (!token) {
      return json(
        {
          ok: false,
          error: "Invitation token is required",
        },
        400,
      );
    }

    if (action !== "inspect" && action !== "register") {
      return json(
        {
          ok: false,
          error: "Unsupported action",
        },
        400,
      );
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const tokenHash = await sha256(token);

    const { data: invite, error: inviteError } = await admin
      .from("company_team_invites")
      .select(`
        id,
        company_id,
        email,
        role,
        status,
        expires_at,
        created_by,
        companies (
          id,
          name
        )
      `)
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (inviteError) {
      console.error("Invite lookup failed:", inviteError);

      return json(
        {
          ok: false,
          error: "Could not verify invitation",
        },
        500,
      );
    }

    if (!invite) {
      return json(
        {
          ok: false,
          error: "Invitation not found",
          code: "INVITE_NOT_FOUND",
        },
        404,
      );
    }

    if (invite.status !== "pending") {
      return json(
        {
          ok: false,
          error:
            invite.status === "accepted"
              ? "This invitation has already been used."
              : "This invitation is no longer active.",
          code:
            invite.status === "accepted"
              ? "INVITE_ALREADY_USED"
              : "INVITE_INACTIVE",
        },
        409,
      );
    }

    const expiresAt = new Date(invite.expires_at);

    if (
      Number.isNaN(expiresAt.getTime()) ||
      expiresAt.getTime() <= Date.now()
    ) {
      await admin
        .from("company_team_invites")
        .update({
          status: "expired",
          updated_at: new Date().toISOString(),
        })
        .eq("id", invite.id)
        .eq("status", "pending");

      return json(
        {
          ok: false,
          error: "This invitation has expired.",
          code: "INVITE_EXPIRED",
        },
        410,
      );
    }

    const companyRelation = Array.isArray(invite.companies)
      ? invite.companies[0]
      : invite.companies;

    const invitedEmail = normalizeEmail(invite.email);
    const companyName = companyRelation?.name ?? null;

    if (action === "inspect") {
      return json({
        ok: true,
        email: invitedEmail,
        company_id: invite.company_id,
        company_name: companyName,
        role: invite.role ?? "manager",
        expires_at: invite.expires_at,
      });
    }

    if (password.length < 8) {
      return json(
        {
          ok: false,
          error: "Password must contain at least 8 characters.",
          code: "PASSWORD_TOO_SHORT",
        },
        400,
      );
    }

    const { data: createdUserData, error: createUserError } =
      await admin.auth.admin.createUser({
        email: invitedEmail,
        password,
        email_confirm: true,
        user_metadata: {
          account_type: "company_manager",
          company_id: invite.company_id,
        },
      });

    if (createUserError || !createdUserData.user) {
      const message = String(createUserError?.message ?? "");

      if (
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("registered") ||
        message.toLowerCase().includes("exists")
      ) {
        return json(
          {
            ok: false,
            error: "This email is already registered on CarrierTrust.",
            code: "USER_ALREADY_EXISTS",
          },
          409,
        );
      }

      console.error("Manager account creation failed:", createUserError);

      return json(
        {
          ok: false,
          error: "Could not create the manager account.",
        },
        500,
      );
    }

    const newUser = createdUserData.user;
    const now = new Date().toISOString();

    const { data: member, error: memberError } = await admin
      .from("company_team_members")
      .insert({
        company_id: invite.company_id,
        user_id: newUser.id,
        email: invitedEmail,
        role: invite.role ?? "manager",
        status: "active",
        invited_by: invite.created_by,
        accepted_at: now,
      })
      .select("id")
      .single();

    if (memberError || !member) {
      console.error("Team member creation failed:", memberError);

      await admin.auth.admin.deleteUser(newUser.id);

      return json(
        {
          ok: false,
          error: "Could not add the manager to the company team.",
        },
        500,
      );
    }

    const { error: profileError } = await admin
      .from("profiles")
      .upsert({
        user_id: newUser.id,
        company_name: companyName,
      });

    if (profileError) {
      console.error("Manager profile creation warning:", profileError);
    }

    const { data: acceptedInvite, error: acceptError } = await admin
      .from("company_team_invites")
      .update({
        status: "accepted",
        accepted_by: newUser.id,
        accepted_at: now,
        updated_at: now,
      })
      .eq("id", invite.id)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();

    if (acceptError || !acceptedInvite) {
      console.error("Invitation acceptance failed:", acceptError);

      await admin
        .from("company_team_members")
        .delete()
        .eq("id", member.id);

      await admin.auth.admin.deleteUser(newUser.id);

      return json(
        {
          ok: false,
          error: "Could not complete invitation registration.",
        },
        409,
      );
    }

    return json({
      ok: true,
      email: invitedEmail,
      company_id: invite.company_id,
      company_name: companyName,
      role: invite.role ?? "manager",
      status: "active",
    });
  } catch (error) {
    console.error("register-company-team-invite fatal:", error);

    return json(
      {
        ok: false,
        error: "Unexpected server error",
      },
      500,
    );
  }
});
