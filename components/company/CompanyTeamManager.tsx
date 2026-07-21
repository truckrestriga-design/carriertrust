"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type CompanyTeamManagerProps = {
  companyId: string;
};

type TeamMember = {
  id: string;
  user_id: string;
  email: string;
  role: "manager";
  status: "active" | "disabled" | "removed";
  created_at: string;
  accepted_at: string | null;
};

type TeamInvite = {
  id: string;
  email: string;
  role: "manager";
  status: "pending" | "accepted" | "revoked" | "expired";
  expires_at: string;
  created_at: string;
};

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getErrorMessage(error: unknown) {
  if (!error) return "Something went wrong.";
  if (typeof error === "string") return error;

  if (typeof error === "object") {
    const candidate = error as { message?: unknown; error?: unknown };
    if (typeof candidate.message === "string" && candidate.message.trim()) {
      return candidate.message;
    }
    if (typeof candidate.error === "string" && candidate.error.trim()) {
      return candidate.error;
    }
  }

  return "Something went wrong.";
}

export default function CompanyTeamManager({ companyId }: CompanyTeamManagerProps) {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activeMembers = useMemo(
    () => members.filter((member) => member.status === "active"),
    [members],
  );

  const pendingInvites = useMemo(
    () => invites.filter((invite) => invite.status === "pending"),
    [invites],
  );

  const loadTeam = useCallback(async () => {
    if (!companyId) return;

    setLoading(true);
    setLoadError(null);

    const [membersResult, invitesResult] = await Promise.all([
      supabase
        .from("company_team_members")
        .select("id, user_id, email, role, status, created_at, accepted_at")
        .eq("company_id", companyId)
        .order("created_at", { ascending: false }),
      supabase
        .from("company_team_invites")
        .select("id, email, role, status, expires_at, created_at")
        .eq("company_id", companyId)
        .eq("status", "pending")
        .order("created_at", { ascending: false }),
    ]);

    if (membersResult.error || invitesResult.error) {
      setLoadError(
        membersResult.error?.message ||
          invitesResult.error?.message ||
          "Could not load the company team.",
      );
    } else {
      setMembers((membersResult.data || []) as TeamMember[]);
      setInvites((invitesResult.data || []) as TeamInvite[]);
    }

    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    void loadTeam();
  }, [loadTeam]);

  async function sendInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    setFormError(null);
    setSuccessMessage(null);

    if (!normalizedEmail) {
      setFormError("Enter the manager's email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setFormError("Enter a valid email address.");
      return;
    }

    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "invite-company-team-member",
        {
          body: {
            company_id: companyId,
            email: normalizedEmail,
          },
        },
      );

      if (error) {
        let message = getErrorMessage(error);

        const context = (
          error as {
            context?: {
              json?: () => Promise<{
                error?: string;
                code?: string;
              }>;
            };
          }
        ).context;

        try {
          const body = await context?.json?.();

          if (typeof body?.error === "string" && body.error.trim()) {
            message = body.error;
          }
        } catch {
          // Keep the original Supabase error message.
        }

        throw new Error(message);
      }

      if (data?.ok === false) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Could not send the invitation.",
        );
      }

      setEmail("");
      setSuccessMessage(`Invitation sent to ${normalizedEmail}.`);
      await loadTeam();
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setSending(false);
    }
  }

  const card =
    "rounded-[28px] border border-black/10 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.05)]";
  const input =
    "w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-black/30 focus:ring-4 focus:ring-black/[0.04]";

  return (
    <section className={`p-6 md:p-7 ${card}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">
            Access management
          </div>
          <h2 className="mt-2 text-xl font-extrabold">Company team</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-black/60">
            Invite managers to help manage the company profile and official replies.
            Only the approved company owner can add team members.
          </p>
        </div>

        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
          Owner controls access
        </div>
      </div>

      <form
        onSubmit={sendInvitation}
        className="mt-6 rounded-3xl border border-black/10 bg-black/[0.02] p-4 md:p-5"
      >
        <div className="grid gap-3 md:grid-cols-[1fr_170px] md:items-end">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Manager email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setFormError(null);
                setSuccessMessage(null);
              }}
              placeholder="manager@company.com"
              autoComplete="email"
              className={input}
              disabled={sending}
            />
          </label>

          <button
            type="submit"
            disabled={sending}
            className={`rounded-2xl px-5 py-3.5 text-sm font-bold transition ${
              sending
                ? "cursor-not-allowed bg-black/20 text-black/45"
                : "bg-black text-white hover:bg-black/85"
            }`}
          >
            {sending ? "Sending..." : "Send invitation"}
          </button>
        </div>

        <div className="mt-3 text-xs leading-5 text-black/50">
          The recipient must sign in using this exact email address.
        </div>

        {formError && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {formError}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {successMessage}
          </div>
        )}
      </form>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold">Active managers</h3>
            <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-xs font-bold text-black/60">
              {activeMembers.length}
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {loading ? (
              <div className="rounded-2xl border border-black/10 px-4 py-4 text-sm text-black/50">
                Loading team...
              </div>
            ) : activeMembers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/15 px-4 py-5 text-sm text-black/50">
                No managers have joined this company yet.
              </div>
            ) : (
              activeMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{member.email}</div>
                      <div className="mt-1 text-xs text-black/45">
                        Joined {formatDate(member.accepted_at || member.created_at)}
                      </div>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                      Manager
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-extrabold">Pending invitations</h3>
            <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-xs font-bold text-black/60">
              {pendingInvites.length}
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {loading ? (
              <div className="rounded-2xl border border-black/10 px-4 py-4 text-sm text-black/50">
                Loading invitations...
              </div>
            ) : pendingInvites.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/15 px-4 py-5 text-sm text-black/50">
                There are no pending invitations.
              </div>
            ) : (
              pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="rounded-2xl border border-black/10 bg-white px-4 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{invite.email}</div>
                      <div className="mt-1 text-xs leading-5 text-black/45">
                        Sent {formatDate(invite.created_at)}
                        <br />
                        Expires {formatDate(invite.expires_at)}
                      </div>
                    </div>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                      Pending
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {loadError && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {loadError}
          <button
            type="button"
            onClick={() => void loadTeam()}
            className="ml-2 font-bold underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-5 text-xs leading-5 text-black/45">
        Revoking invitations and removing managers will be added through protected
        server functions. Browser-side database writes remain disabled for security.
      </div>
    </section>
  );
}
