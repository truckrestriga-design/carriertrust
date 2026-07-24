"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type CompanyTeamManagerProps = {
  companyId: string;
  isOwner: boolean;
};

type TeamOwner = {
  user_id: string;
  email: string | null;
  role: "owner";
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

export default function CompanyTeamManager({
  companyId,
  isOwner,
}: CompanyTeamManagerProps) {
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState<TeamOwner | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [removeCandidate, setRemoveCandidate] = useState<TeamMember | null>(null);
  const [removingMemberId, setRemovingMemberId] = useState<string | null>(null);
  const [revokeCandidate, setRevokeCandidate] = useState<TeamInvite | null>(null);
  const [revokingInviteId, setRevokingInviteId] = useState<string | null>(null);
  const [teamActionError, setTeamActionError] = useState<string | null>(null);
  const [teamActionSuccess, setTeamActionSuccess] = useState<string | null>(null);

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

    try {
      const { data, error } = await supabase.functions.invoke(
        "manage-company-team-member",
        {
          body: {
            action: "list_team",
            company_id: companyId,
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
                message?: string;
                code?: string;
              }>;
            };
          }
        ).context;

        try {
          const responseBody = await context?.json?.();

          if (
            typeof responseBody?.error === "string" &&
            responseBody.error.trim()
          ) {
            message = responseBody.error;
          } else if (
            typeof responseBody?.message === "string" &&
            responseBody.message.trim()
          ) {
            message = responseBody.message;
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
            : "Could not load the company team.",
        );
      }

      setOwner((data?.owner || null) as TeamOwner | null);
      setMembers((data?.managers || []) as TeamMember[]);
      setInvites((data?.pending_invites || []) as TeamInvite[]);
    } catch (error) {
      setOwner(null);
      setMembers([]);
      setInvites([]);
      setLoadError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
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
      setSuccessMessage(
        data?.access_restored === true
          ? data?.email_sent === false
            ? `Manager access restored for ${normalizedEmail}, but the notification email could not be sent.`
            : `Manager access restored and notification sent to ${normalizedEmail}.`
          : `Invitation sent to ${normalizedEmail}.`,
      );
      await loadTeam();
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setSending(false);
    }
  }

  async function removeManager() {
    if (!isOwner || !removeCandidate || removingMemberId) return;

    const member = removeCandidate;

    setRemovingMemberId(member.id);
    setTeamActionError(null);
    setTeamActionSuccess(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "manage-company-team-member",
        {
          body: {
            action: "remove_member",
            company_id: companyId,
            member_id: member.id,
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
                message?: string;
                code?: string;
              }>;
            };
          }
        ).context;

        try {
          const responseBody = await context?.json?.();

          if (
            typeof responseBody?.error === "string" &&
            responseBody.error.trim()
          ) {
            message = responseBody.error;
          } else if (
            typeof responseBody?.message === "string" &&
            responseBody.message.trim()
          ) {
            message = responseBody.message;
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
            : "Could not remove the manager.",
        );
      }

      setRemoveCandidate(null);
      setTeamActionSuccess(
        `${member.email} no longer has manager access.`,
      );

      await loadTeam();
    } catch (error) {
      setTeamActionError(getErrorMessage(error));
    } finally {
      setRemovingMemberId(null);
    }
  }

  async function revokeInvitation() {
    if (!isOwner || !revokeCandidate || revokingInviteId) return;

    const invite = revokeCandidate;

    setRevokingInviteId(invite.id);
    setTeamActionError(null);
    setTeamActionSuccess(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "manage-company-team-member",
        {
          body: {
            action: "revoke_invite",
            company_id: companyId,
            invite_id: invite.id,
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
                message?: string;
                code?: string;
              }>;
            };
          }
        ).context;

        try {
          const responseBody = await context?.json?.();

          if (
            typeof responseBody?.error === "string" &&
            responseBody.error.trim()
          ) {
            message = responseBody.error;
          } else if (
            typeof responseBody?.message === "string" &&
            responseBody.message.trim()
          ) {
            message = responseBody.message;
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
            : "Could not revoke the invitation.",
        );
      }

      setRevokeCandidate(null);
      setTeamActionSuccess(
        `Invitation to ${invite.email} has been revoked.`,
      );

      await loadTeam();
    } catch (error) {
      setTeamActionError(getErrorMessage(error));
    } finally {
      setRevokingInviteId(null);
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
            {isOwner
              ? "Invite managers to help manage the company profile and official replies. Only the approved company owner can add team members."
              : "View the Company Admin and active managers who currently have access to this company profile."}
          </p>
        </div>

        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
          {isOwner ? "Owner controls access" : "Team access"}
        </div>
      </div>

      {isOwner && (
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
      )}

      <div className="mt-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-extrabold">Company Admin</h3>

          <span className="rounded-full bg-black/[0.05] px-2.5 py-1 text-xs font-bold text-black/60">
            {owner ? 1 : 0}
          </span>
        </div>

        <div className="mt-3">
          {loading ? (
            <div className="rounded-2xl border border-black/10 px-4 py-4 text-sm text-black/50">
              Loading owner...
            </div>
          ) : owner ? (
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold">
                    {owner.email || "Approved company owner"}
                  </div>

                  <div className="mt-1 text-xs text-black/45">
                    Verified company owner
                  </div>
                </div>

                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-800">
                  Admin
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/15 px-4 py-5 text-sm text-black/50">
              Owner information is unavailable.
            </div>
          )}
        </div>
      </div>

      <div className={isOwner ? "mt-7 grid gap-6 lg:grid-cols-2" : "mt-7"}>
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
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => {
                          setTeamActionError(null);
                          setTeamActionSuccess(null);
                          setRemoveCandidate(member);
                        }}
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-700 transition hover:border-red-300 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {isOwner && (
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
                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                          Pending
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setTeamActionError(null);
                            setTeamActionSuccess(null);
                            setRevokeCandidate(invite);
                          }}
                          className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-700 transition hover:border-red-300 hover:bg-red-100"
                        >
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {isOwner && removeCandidate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="remove-manager-title"
        >
          <div className="w-full max-w-md rounded-[28px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">
              Access management
            </div>

            <h3
              id="remove-manager-title"
              className="mt-2 text-xl font-extrabold text-black"
            >
              Remove manager?
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/60">
              <span className="font-bold text-black">
                {removeCandidate.email}
              </span>{" "}
              will immediately lose access to this company profile and its
              management features.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={removingMemberId === removeCandidate.id}
                onClick={() => setRemoveCandidate(null)}
                className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={removingMemberId === removeCandidate.id}
                onClick={() => void removeManager()}
                className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {removingMemberId === removeCandidate.id
                  ? "Removing..."
                  : "Remove manager"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isOwner && revokeCandidate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="revoke-invitation-title"
        >
          <div className="w-full max-w-md rounded-[28px] border border-black/10 bg-white p-6 shadow-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-red-600">
              Access management
            </div>

            <h3
              id="revoke-invitation-title"
              className="mt-2 text-xl font-extrabold text-black"
            >
              Revoke invitation?
            </h3>

            <p className="mt-3 text-sm leading-6 text-black/60">
              The invitation sent to{" "}
              <span className="font-bold text-black">
                {revokeCandidate.email}
              </span>{" "}
              will stop working immediately. You can send a new invitation
              later.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={revokingInviteId === revokeCandidate.id}
                onClick={() => setRevokeCandidate(null)}
                className="rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={revokingInviteId === revokeCandidate.id}
                onClick={() => void revokeInvitation()}
                className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {revokingInviteId === revokeCandidate.id
                  ? "Revoking..."
                  : "Revoke invitation"}
              </button>
            </div>
          </div>
        </div>
      )}

      {teamActionSuccess && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {teamActionSuccess}
        </div>
      )}

      {teamActionError && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {teamActionError}
        </div>
      )}

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

    </section>
  );
}
