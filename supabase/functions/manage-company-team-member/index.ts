import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type TeamAction =
  | "list_team"
  | "remove_member"
  | "revoke_invite";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function errorResponse(
  status: number,
  code: string,
  message: string,
  details?: unknown,
) {
  return json(
    {
      ok: false,
      code,
      error: message,
      ...(details === undefined ? {} : { details }),
    },
    status,
  );
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return errorResponse(
      405,
      "METHOD_NOT_ALLOWED",
      "Method not allowed",
    );
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_ANON_KEY =
      Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const SERVICE_ROLE_KEY =
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (
      !SUPABASE_URL ||
      !SUPABASE_ANON_KEY ||
      !SERVICE_ROLE_KEY
    ) {
      return errorResponse(
        500,
        "SERVER_MISCONFIGURED",
        "Missing required environment secrets",
      );
    }

    const authorization =
      req.headers.get("Authorization") ??
      req.headers.get("authorization") ??
      "";

    if (!authorization.startsWith("Bearer ")) {
      return errorResponse(
        401,
        "AUTH_REQUIRED",
        "Authorization required",
      );
    }

    const userClient = createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: authorization,
          },
        },
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return errorResponse(
        401,
        "INVALID_SESSION",
        "Invalid or expired session",
      );
    }

    const body = await req.json().catch(() => ({}));

    const action = String(body.action ?? "").trim() as TeamAction;
    const companyId = String(body.company_id ?? "").trim();

    if (
      action !== "list_team" &&
      action !== "remove_member" &&
      action !== "revoke_invite"
    ) {
      return errorResponse(
        400,
        "INVALID_ACTION",
        "Unsupported team action",
      );
    }

    if (!companyId || !isUuid(companyId)) {
      return errorResponse(
        400,
        "INVALID_COMPANY_ID",
        "A valid company_id is required",
      );
    }

    const admin = createClient(
      SUPABASE_URL,
      SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const [ownerResult, membershipResult] = await Promise.all([
      admin
        .from("company_claims")
        .select(
          "claimant_user_id, claimant_email, created_at",
        )
        .eq("company_id", companyId)
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(1),
      admin
        .from("company_team_members")
        .select("id, user_id, email, role, status")
        .eq("company_id", companyId)
        .eq("user_id", user.id)
        .eq("status", "active")
        .maybeSingle(),
    ]);

    if (ownerResult.error) {
      console.error(
        "Owner lookup failed:",
        ownerResult.error,
      );

      return errorResponse(
        500,
        "OWNER_LOOKUP_FAILED",
        "Could not verify company ownership",
      );
    }

    if (membershipResult.error) {
      console.error(
        "Membership lookup failed:",
        membershipResult.error,
      );

      return errorResponse(
        500,
        "MEMBERSHIP_LOOKUP_FAILED",
        "Could not verify team membership",
      );
    }

    const owner = ownerResult.data?.[0] ?? null;

    if (!owner) {
      return errorResponse(
        404,
        "OWNER_NOT_FOUND",
        "Approved company owner not found",
      );
    }

    const isOwner =
      String(owner.claimant_user_id ?? "") === user.id;

    const isManager =
      Boolean(membershipResult.data) &&
      membershipResult.data?.status === "active";

    if (!isOwner && !isManager) {
      return errorResponse(
        403,
        "COMPANY_ACCESS_DENIED",
        "You do not have access to this company team",
      );
    }

    if (action === "list_team") {
      const { data: managers, error: managersError } =
        await admin
          .from("company_team_members")
          .select(
            "id, user_id, email, role, status, created_at, accepted_at",
          )
          .eq("company_id", companyId)
          .eq("status", "active")
          .order("created_at", { ascending: true });

      if (managersError) {
        console.error(
          "Team list lookup failed:",
          managersError,
        );

        return errorResponse(
          500,
          "TEAM_LIST_FAILED",
          "Could not load the company team",
        );
      }

      let pendingInvites: unknown[] = [];

      if (isOwner) {
        const { data: invites, error: invitesError } =
          await admin
            .from("company_team_invites")
            .select(
              "id, email, role, status, expires_at, created_at",
            )
            .eq("company_id", companyId)
            .eq("status", "pending")
            .order("created_at", { ascending: false });

        if (invitesError) {
          console.error(
            "Invitation list lookup failed:",
            invitesError,
          );

          return errorResponse(
            500,
            "INVITE_LIST_FAILED",
            "Could not load pending invitations",
          );
        }

        pendingInvites = invites ?? [];
      }

      return json({
        ok: true,
        company_id: companyId,
        current_role: isOwner ? "owner" : "manager",
        owner: {
          user_id: owner.claimant_user_id,
          email: owner.claimant_email ?? null,
          role: "owner",
        },
        managers: managers ?? [],
        pending_invites: pendingInvites,
      });
    }

    if (!isOwner) {
      return errorResponse(
        403,
        "OWNER_REQUIRED",
        "Only the approved company owner can manage team access",
      );
    }

    if (action === "remove_member") {
      const memberId = String(body.member_id ?? "").trim();

      if (!memberId || !isUuid(memberId)) {
        return errorResponse(
          400,
          "INVALID_MEMBER_ID",
          "A valid member_id is required",
        );
      }

      const { data: targetMember, error: targetError } =
        await admin
          .from("company_team_members")
          .select(
            "id, company_id, user_id, email, role, status",
          )
          .eq("id", memberId)
          .maybeSingle();

      if (targetError) {
        console.error(
          "Target member lookup failed:",
          targetError,
        );

        return errorResponse(
          500,
          "MEMBER_LOOKUP_FAILED",
          "Could not verify the selected manager",
        );
      }

      if (
        !targetMember ||
        targetMember.company_id !== companyId
      ) {
        return errorResponse(
          404,
          "MEMBER_NOT_FOUND",
          "Manager not found in this company",
        );
      }

      if (targetMember.status !== "active") {
        return errorResponse(
          409,
          "MEMBER_NOT_ACTIVE",
          "This manager is no longer active",
        );
      }

      const now = new Date().toISOString();

      const { data: removedMember, error: removeError } =
        await admin
          .from("company_team_members")
          .update({
            status: "removed",
            updated_at: now,
          })
          .eq("id", memberId)
          .eq("company_id", companyId)
          .eq("status", "active")
          .select("id, user_id, email, status")
          .maybeSingle();

      if (removeError) {
        console.error(
          "Manager removal failed:",
          removeError,
        );

        return errorResponse(
          500,
          "MEMBER_REMOVE_FAILED",
          "Could not remove the manager",
        );
      }

      if (!removedMember) {
        return errorResponse(
          409,
          "MEMBER_STATE_CHANGED",
          "The manager status changed before removal",
        );
      }

      const { error: relatedInviteError } = await admin
        .from("company_team_invites")
        .update({
          status: "revoked",
          revoked_at: now,
          updated_at: now,
        })
        .eq("company_id", companyId)
        .ilike("email", targetMember.email)
        .eq("status", "pending");

      if (relatedInviteError) {
        console.error(
          "Related invitation revoke warning:",
          relatedInviteError,
        );
      }

      return json({
        ok: true,
        action: "remove_member",
        member: removedMember,
        related_invites_revoked: !relatedInviteError,
        auth_account_deleted: false,
      });
    }

    const inviteId = String(body.invite_id ?? "").trim();

    if (!inviteId || !isUuid(inviteId)) {
      return errorResponse(
        400,
        "INVALID_INVITE_ID",
        "A valid invite_id is required",
      );
    }

    const { data: targetInvite, error: inviteLookupError } =
      await admin
        .from("company_team_invites")
        .select("id, company_id, email, status")
        .eq("id", inviteId)
        .maybeSingle();

    if (inviteLookupError) {
      console.error(
        "Invitation lookup failed:",
        inviteLookupError,
      );

      return errorResponse(
        500,
        "INVITE_LOOKUP_FAILED",
        "Could not verify the invitation",
      );
    }

    if (
      !targetInvite ||
      targetInvite.company_id !== companyId
    ) {
      return errorResponse(
        404,
        "INVITE_NOT_FOUND",
        "Invitation not found in this company",
      );
    }

    if (targetInvite.status !== "pending") {
      return errorResponse(
        409,
        "INVITE_NOT_PENDING",
        "This invitation is no longer pending",
      );
    }

    const now = new Date().toISOString();

    const { data: revokedInvite, error: revokeError } =
      await admin
        .from("company_team_invites")
        .update({
          status: "revoked",
          revoked_at: now,
          updated_at: now,
        })
        .eq("id", inviteId)
        .eq("company_id", companyId)
        .eq("status", "pending")
        .select("id, email, status, revoked_at")
        .maybeSingle();

    if (revokeError) {
      console.error(
        "Invitation revoke failed:",
        revokeError,
      );

      return errorResponse(
        500,
        "INVITE_REVOKE_FAILED",
        "Could not revoke the invitation",
      );
    }

    if (!revokedInvite) {
      return errorResponse(
        409,
        "INVITE_STATE_CHANGED",
        "The invitation status changed before revocation",
      );
    }

    return json({
      ok: true,
      action: "revoke_invite",
      invitation: revokedInvite,
    });
  } catch (error) {
    console.error(
      "manage-company-team-member fatal:",
      error,
    );

    return errorResponse(
      500,
      "UNEXPECTED_ERROR",
      "Unexpected server error",
    );
  }
});
