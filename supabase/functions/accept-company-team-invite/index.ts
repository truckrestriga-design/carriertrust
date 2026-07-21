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
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SERVICE_ROLE_KEY =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SERVICE_ROLE_KEY) {
      return json(
        {
          ok: false,
          error: "Missing required environment secrets",
        },
        500,
      );
    }

    const authorization = req.headers.get("Authorization") ?? "";

    if (!authorization.startsWith("Bearer ")) {
      return json(
        {
          ok: false,
          error: "Authorization required",
        },
        401,
      );
    }

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: authorization,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return json(
        {
          ok: false,
          error: "Invalid or expired session",
        },
        401,
      );
    }

    const body = await req.json().catch(() => ({}));
    const token = String(body.token ?? "").trim();

    if (!token) {
      return json(
        {
          ok: false,
          error: "Invitation token is required",
        },
        400,
      );
    }

    const tokenHash = await sha256(token);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

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
              ? "Invitation has already been accepted"
              : "Invitation is no longer active",
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
          error: "Invitation has expired",
        },
        410,
      );
    }

    const invitedEmail = normalizeEmail(invite.email);
    const signedInEmail = normalizeEmail(user.email);

    if (!signedInEmail || signedInEmail !== invitedEmail) {
      return json(
        {
          ok: false,
          error:
            "Please sign in using the same email address that received the invitation",
          invited_email: invitedEmail,
        },
        403,
      );
    }

    const now = new Date().toISOString();

    const { data: existingMember, error: memberLookupError } =
      await admin
        .from("company_team_members")
        .select("id, user_id, status")
        .eq("company_id", invite.company_id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (memberLookupError) {
      console.error("Member lookup failed:", memberLookupError);

      return json(
        {
          ok: false,
          error: "Could not check existing membership",
        },
        500,
      );
    }

    let memberId: string;

    if (existingMember) {
      const { data: updatedMember, error: updateMemberError } =
        await admin
          .from("company_team_members")
          .update({
            email: invitedEmail,
            role: invite.role ?? "manager",
            status: "active",
            invited_by: invite.created_by,
            accepted_at: now,
            updated_at: now,
          })
          .eq("id", existingMember.id)
          .select("id")
          .single();

      if (updateMemberError || !updatedMember) {
        console.error("Member update failed:", updateMemberError);

        return json(
          {
            ok: false,
            error: "Could not activate team membership",
          },
          500,
        );
      }

      memberId = updatedMember.id;
    } else {
      const { data: createdMember, error: createMemberError } =
        await admin
          .from("company_team_members")
          .insert({
            company_id: invite.company_id,
            user_id: user.id,
            email: invitedEmail,
            role: invite.role ?? "manager",
            status: "active",
            invited_by: invite.created_by,
            accepted_at: now,
          })
          .select("id")
          .single();

      if (createMemberError || !createdMember) {
        console.error("Member creation failed:", createMemberError);

        return json(
          {
            ok: false,
            error: "Could not create team membership",
          },
          500,
        );
      }

      memberId = createdMember.id;
    }

    const { error: acceptInviteError } = await admin
      .from("company_team_invites")
      .update({
        status: "accepted",
        accepted_by: user.id,
        accepted_at: now,
        updated_at: now,
      })
      .eq("id", invite.id)
      .eq("status", "pending");

    if (acceptInviteError) {
      console.error(
        "Invite acceptance update failed:",
        acceptInviteError,
      );

      await admin
        .from("company_team_members")
        .update({
          status: "disabled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", memberId);

      return json(
        {
          ok: false,
          error: "Could not complete invitation acceptance",
        },
        500,
      );
    }

    const companyRelation = Array.isArray(invite.companies)
      ? invite.companies[0]
      : invite.companies;

    return json({
      ok: true,
      member_id: memberId,
      company_id: invite.company_id,
      company_name: companyRelation?.name ?? null,
      role: invite.role ?? "manager",
      status: "active",
    });
  } catch (error) {
    console.error("accept-company-team-invite fatal:", error);

    return json(
      {
        ok: false,
        error: "Unexpected server error",
      },
      500,
    );
  }
});
