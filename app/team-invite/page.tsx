"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  loading: string;
  title: string;
  subtitle: string;
  loginRequired: string;
  loginButton: string;
  accepting: string;
  acceptButton: string;
  successTitle: string;
  successText: string;
  company: string;
  role: string;
  manager: string;
  openProfile: string;
  invalidLink: string;
  missingToken: string;
  genericError: string;
  alreadyAccepted: string;
  wrongEmail: string;
  expired: string;
  backHome: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    loading: "Checking invitation...",
    title: "Company team invitation",
    subtitle: "Accept the invitation to use your own CarrierTrust account on behalf of the company.",
    loginRequired: "Please log in using the same email address that received this invitation.",
    loginButton: "Log in to continue",
    accepting: "Accepting invitation...",
    acceptButton: "Accept invitation",
    successTitle: "Invitation accepted",
    successText: "You are now an active manager of this company on CarrierTrust.",
    company: "Company",
    role: "Role",
    manager: "Manager",
    openProfile: "Open company profile",
    invalidLink: "This invitation link is invalid or no longer active.",
    missingToken: "The invitation token is missing.",
    genericError: "The invitation could not be accepted.",
    alreadyAccepted: "This invitation has already been accepted.",
    wrongEmail: "Please log in using the same email address that received the invitation.",
    expired: "This invitation has expired.",
    backHome: "Back to home",
  },
  de: {
    loading: "Einladung wird geprueft...",
    title: "Einladung zum Unternehmensteam",
    subtitle: "Nehmen Sie die Einladung an, um Ihr eigenes CarrierTrust-Konto im Namen des Unternehmens zu verwenden.",
    loginRequired: "Melden Sie sich mit derselben E-Mail-Adresse an, an die diese Einladung gesendet wurde.",
    loginButton: "Anmelden und fortfahren",
    accepting: "Einladung wird angenommen...",
    acceptButton: "Einladung annehmen",
    successTitle: "Einladung angenommen",
    successText: "Sie sind jetzt aktiver Manager dieses Unternehmens bei CarrierTrust.",
    company: "Unternehmen",
    role: "Rolle",
    manager: "Manager",
    openProfile: "Unternehmensprofil oeffnen",
    invalidLink: "Dieser Einladungslink ist ungueltig oder nicht mehr aktiv.",
    missingToken: "Der Einladungstoken fehlt.",
    genericError: "Die Einladung konnte nicht angenommen werden.",
    alreadyAccepted: "Diese Einladung wurde bereits angenommen.",
    wrongEmail: "Melden Sie sich mit derselben E-Mail-Adresse an, an die die Einladung gesendet wurde.",
    expired: "Diese Einladung ist abgelaufen.",
    backHome: "Zur Startseite",
  },
  ru: {
    loading: "Проверяем приглашение...",
    title: "Приглашение в команду компании",
    subtitle: "Примите приглашение, чтобы работать от имени компании через собственный аккаунт CarrierTrust.",
    loginRequired: "Войдите под тем же email, на который было отправлено приглашение.",
    loginButton: "Войти и продолжить",
    accepting: "Принимаем приглашение...",
    acceptButton: "Принять приглашение",
    successTitle: "Приглашение принято",
    successText: "Теперь вы являетесь активным менеджером этой компании в CarrierTrust.",
    company: "Компания",
    role: "Роль",
    manager: "Менеджер",
    openProfile: "Открыть профиль компании",
    invalidLink: "Эта ссылка приглашения недействительна или больше не активна.",
    missingToken: "В ссылке отсутствует токен приглашения.",
    genericError: "Не удалось принять приглашение.",
    alreadyAccepted: "Это приглашение уже было принято.",
    wrongEmail: "Войдите под тем же email, на который было отправлено приглашение.",
    expired: "Срок действия приглашения истек.",
    backHome: "На главную",
  },
  fr: {
    loading: "Verification de l'invitation...",
    title: "Invitation a l'equipe de l'entreprise",
    subtitle: "Acceptez l'invitation pour utiliser votre propre compte CarrierTrust au nom de l'entreprise.",
    loginRequired: "Connectez-vous avec la meme adresse email que celle ayant recu l'invitation.",
    loginButton: "Se connecter pour continuer",
    accepting: "Acceptation de l'invitation...",
    acceptButton: "Accepter l'invitation",
    successTitle: "Invitation acceptee",
    successText: "Vous etes maintenant un responsable actif de cette entreprise sur CarrierTrust.",
    company: "Entreprise",
    role: "Role",
    manager: "Responsable",
    openProfile: "Ouvrir le profil de l'entreprise",
    invalidLink: "Ce lien d'invitation est invalide ou n'est plus actif.",
    missingToken: "Le jeton d'invitation est manquant.",
    genericError: "L'invitation n'a pas pu etre acceptee.",
    alreadyAccepted: "Cette invitation a deja ete acceptee.",
    wrongEmail: "Connectez-vous avec la meme adresse email que celle ayant recu l'invitation.",
    expired: "Cette invitation a expire.",
    backHome: "Retour a l'accueil",
  },
  es: {
    loading: "Comprobando invitacion...",
    title: "Invitacion al equipo de la empresa",
    subtitle: "Acepta la invitacion para utilizar tu propia cuenta de CarrierTrust en nombre de la empresa.",
    loginRequired: "Inicia sesion con el mismo email que recibio esta invitacion.",
    loginButton: "Iniciar sesion para continuar",
    accepting: "Aceptando invitacion...",
    acceptButton: "Aceptar invitacion",
    successTitle: "Invitacion aceptada",
    successText: "Ahora eres un gerente activo de esta empresa en CarrierTrust.",
    company: "Empresa",
    role: "Rol",
    manager: "Gerente",
    openProfile: "Abrir perfil de empresa",
    invalidLink: "Este enlace de invitacion no es valido o ya no esta activo.",
    missingToken: "Falta el token de invitacion.",
    genericError: "No se pudo aceptar la invitacion.",
    alreadyAccepted: "Esta invitacion ya ha sido aceptada.",
    wrongEmail: "Inicia sesion con el mismo email que recibio la invitacion.",
    expired: "Esta invitacion ha caducado.",
    backHome: "Volver al inicio",
  },
  it: {
    loading: "Verifica dell'invito...",
    title: "Invito al team aziendale",
    subtitle: "Accetta l'invito per utilizzare il tuo account CarrierTrust per conto dell'azienda.",
    loginRequired: "Accedi con lo stesso indirizzo email che ha ricevuto questo invito.",
    loginButton: "Accedi per continuare",
    accepting: "Accettazione dell'invito...",
    acceptButton: "Accetta invito",
    successTitle: "Invito accettato",
    successText: "Ora sei un manager attivo di questa azienda su CarrierTrust.",
    company: "Azienda",
    role: "Ruolo",
    manager: "Manager",
    openProfile: "Apri profilo aziendale",
    invalidLink: "Questo link di invito non e valido o non e piu attivo.",
    missingToken: "Il token dell'invito e mancante.",
    genericError: "Non e stato possibile accettare l'invito.",
    alreadyAccepted: "Questo invito e gia stato accettato.",
    wrongEmail: "Accedi con lo stesso indirizzo email che ha ricevuto questo invito.",
    expired: "Questo invito e scaduto.",
    backHome: "Torna alla home",
  },
};

type AcceptResult = {
  ok?: boolean;
  error?: string;
  company_id?: string;
  company_name?: string | null;
  role?: string;
  status?: string;
};

function TeamInvitePageInner() {
  const searchParams = useSearchParams();
  const { lang } = useLang();

  const safeLang: Lang =
    lang === "en" || lang === "de" || lang === "ru" || lang === "fr" || lang === "es" || lang === "it"
      ? lang
      : "en";

  const t = useMemo(() => TEXT[safeLang], [safeLang]);
  const token = searchParams.get("token")?.trim() || "";

  const [checkingUser, setCheckingUser] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AcceptResult | null>(null);

  const invitePath = token ? `/team-invite?token=${encodeURIComponent(token)}` : "/team-invite";
  const authUrl = `/auth?next=${encodeURIComponent(invitePath)}`;

  useEffect(() => {
    let active = true;

    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      setSignedIn(Boolean(data.user));
      setCheckingUser(false);
    }

    void checkUser();

    return () => {
      active = false;
    };
  }, []);

  function resolveError(message: string) {
    const normalized = message.toLowerCase();

    if (normalized.includes("already been accepted")) return t.alreadyAccepted;
    if (normalized.includes("same email address") || normalized.includes("received the invitation")) return t.wrongEmail;
    if (normalized.includes("expired")) return t.expired;
    if (normalized.includes("not found") || normalized.includes("no longer active")) return t.invalidLink;

    return message || t.genericError;
  }

  async function acceptInvite() {
    if (!token) {
      setError(t.missingToken);
      return;
    }

    setBusy(true);
    setError("");

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        "accept-company-team-invite",
        { body: { token } }
      );

      if (functionError) {
        let message = functionError.message;
        const context = (
          functionError as {
            context?: {
              json?: () => Promise<{ error?: string }>;
            };
          }
        ).context;

        try {
          const body = await context?.json?.();
          if (body?.error) message = body.error;
        } catch {
          // Keep the original function error message.
        }

        throw new Error(message);
      }

      const response = data as AcceptResult;

      if (response?.ok === false) {
        throw new Error(response.error || t.genericError);
      }

      setResult(response);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t.genericError;
      setError(resolveError(message));
    } finally {
      setBusy(false);
    }
  }

  if (checkingUser) {
    return (
      <PageShell>
        <StatusCard text={t.loading} />
      </PageShell>
    );
  }

  if (!token) {
    return (
      <PageShell>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t.title}</h1>

          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {t.missingToken}
          </div>

          <Link
            href="/"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800"
          >
            {t.backHome}
          </Link>
        </div>
      </PageShell>
    );
  }

  if (result?.ok) {
    return (
      <PageShell>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">{t.successTitle}</h1>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">{t.successText}</p>

          <div className="mx-auto mt-7 max-w-lg rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-500">{t.company}</span>
              <span className="text-right font-semibold text-slate-900">
                {result.company_name || result.company_id || "—"}
              </span>
            </div>

            <div className="mt-4 flex items-start justify-between gap-4 border-t border-slate-200 pt-4">
              <span className="text-sm text-slate-500">{t.role}</span>
              <span className="font-semibold text-slate-900">{t.manager}</span>
            </div>
          </div>

          <Link
            href="/company/profile"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800"
          >
            {t.openProfile}
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-xl font-bold text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)]">
          CT
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">{t.title}</h1>

        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">{t.subtitle}</p>

        {!signedIn ? (
          <>
            <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-800">
              {t.loginRequired}
            </div>

            <a
              href={authUrl}
              className="mt-7 inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800"
            >
              {t.loginButton}
            </a>
          </>
        ) : (
          <button
            type="button"
            onClick={() => void acceptInvite()}
            disabled={busy}
            className="mt-7 inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? t.accepting : t.acceptButton}
          </button>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
            {error}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 pb-12 pt-32 md:px-6">
      <div className="pointer-events-none absolute left-[-120px] top-[120px] h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-100px] top-[260px] h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/85 px-7 py-10 shadow-[0_35px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:px-12 md:py-14">
        {children}
      </div>
    </main>
  );
}

function StatusCard({ text }: { text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />
      <p className="mt-5 text-sm font-medium text-slate-600">{text}</p>
    </div>
  );
}

export default function TeamInvitePage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <StatusCard text="Loading..." />
        </PageShell>
      }
    >
      <TeamInvitePageInner />
    </Suspense>
  );
}
