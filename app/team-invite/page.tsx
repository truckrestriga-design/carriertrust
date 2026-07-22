"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/lib/language-context";

type Lang = "en" | "de" | "ru" | "fr" | "es" | "it";

type TextPack = {
  loading: string;
  title: string;
  subtitle: string;
  company: string;
  email: string;
  emailLocked: string;
  password: string;
  confirmPassword: string;
  passwordHint: string;
  submit: string;
  submitting: string;
  security: string;
  missingToken: string;
  invalid: string;
  passwordShort: string;
  passwordMismatch: string;
  generic: string;
  loginFailed: string;
  backHome: string;
  successTitle: string;
  successText: string;
  opening: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    loading: "Checking invitation...",
    title: "Create your manager account",
    subtitle: "Create a secure CarrierTrust account to manage the invited company profile.",
    company: "Company",
    email: "Manager email",
    emailLocked: "This email is linked to the invitation and cannot be changed.",
    password: "Create password",
    confirmPassword: "Confirm password",
    passwordHint: "Use at least 8 characters.",
    submit: "Create account & join company",
    submitting: "Creating your account...",
    security: "This invitation can be used only once. After registration, the link becomes inactive.",
    missingToken: "The invitation token is missing.",
    invalid: "This invitation link is invalid or no longer active.",
    passwordShort: "Password must contain at least 8 characters.",
    passwordMismatch: "The passwords do not match.",
    generic: "Something went wrong. Please try again.",
    loginFailed: "The account was created, but automatic login failed. Please log in with your new password.",
    backHome: "Back to home",
    successTitle: "Account created",
    successText: "You have been added as a manager.",
    opening: "Opening company profile...",
  },
  de: {
    loading: "Einladung wird geprüft...",
    title: "Managerkonto erstellen",
    subtitle: "Erstellen Sie ein sicheres CarrierTrust-Konto zur Verwaltung des Unternehmensprofils.",
    company: "Unternehmen",
    email: "Manager-E-Mail",
    emailLocked: "Diese E-Mail-Adresse ist mit der Einladung verbunden und kann nicht geändert werden.",
    password: "Passwort erstellen",
    confirmPassword: "Passwort bestätigen",
    passwordHint: "Verwenden Sie mindestens 8 Zeichen.",
    submit: "Konto erstellen und Unternehmen beitreten",
    submitting: "Konto wird erstellt...",
    security: "Diese Einladung kann nur einmal verwendet werden. Danach wird der Link inaktiv.",
    missingToken: "Der Einladungstoken fehlt.",
    invalid: "Dieser Einladungslink ist ungültig oder nicht mehr aktiv.",
    passwordShort: "Das Passwort muss mindestens 8 Zeichen enthalten.",
    passwordMismatch: "Die Passwörter stimmen nicht überein.",
    generic: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    loginFailed: "Das Konto wurde erstellt, aber die automatische Anmeldung ist fehlgeschlagen.",
    backHome: "Zur Startseite",
    successTitle: "Konto erstellt",
    successText: "Sie wurden als Manager hinzugefügt.",
    opening: "Unternehmensprofil wird geöffnet...",
  },
  ru: {
    loading: "Проверяем приглашение...",
    title: "Создайте аккаунт менеджера",
    subtitle: "Создайте защищённый аккаунт CarrierTrust для управления профилем приглашённой компании.",
    company: "Компания",
    email: "Email менеджера",
    emailLocked: "Этот email привязан к приглашению и не может быть изменён.",
    password: "Создайте пароль",
    confirmPassword: "Повторите пароль",
    passwordHint: "Используйте не менее 8 символов.",
    submit: "Создать аккаунт и присоединиться",
    submitting: "Создаём аккаунт...",
    security: "Приглашение можно использовать только один раз. После регистрации ссылка станет недоступной.",
    missingToken: "В ссылке отсутствует токен приглашения.",
    invalid: "Эта ссылка недействительна или больше не активна.",
    passwordShort: "Пароль должен содержать не менее 8 символов.",
    passwordMismatch: "Пароли не совпадают.",
    generic: "Произошла ошибка. Попробуйте ещё раз.",
    loginFailed: "Аккаунт создан, но автоматический вход не удался. Войдите с новым паролем.",
    backHome: "На главную",
    successTitle: "Аккаунт создан",
    successText: "Вы добавлены как менеджер.",
    opening: "Открываем профиль компании...",
  },
  fr: {
    loading: "Vérification de l’invitation...",
    title: "Créez votre compte gestionnaire",
    subtitle: "Créez un compte CarrierTrust sécurisé pour gérer le profil de l’entreprise.",
    company: "Entreprise",
    email: "E-mail du gestionnaire",
    emailLocked: "Cette adresse e-mail est liée à l’invitation et ne peut pas être modifiée.",
    password: "Créer un mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    passwordHint: "Utilisez au moins 8 caractères.",
    submit: "Créer le compte et rejoindre l’entreprise",
    submitting: "Création du compte...",
    security: "Cette invitation ne peut être utilisée qu’une seule fois. Ensuite, le lien devient inactif.",
    missingToken: "Le jeton d’invitation est manquant.",
    invalid: "Ce lien d’invitation est invalide ou n’est plus actif.",
    passwordShort: "Le mot de passe doit contenir au moins 8 caractères.",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
    generic: "Une erreur s’est produite. Veuillez réessayer.",
    loginFailed: "Le compte a été créé, mais la connexion automatique a échoué.",
    backHome: "Retour à l’accueil",
    successTitle: "Compte créé",
    successText: "Vous avez été ajouté comme gestionnaire.",
    opening: "Ouverture du profil de l’entreprise...",
  },
  es: {
    loading: "Comprobando la invitación...",
    title: "Crea tu cuenta de administrador",
    subtitle: "Crea una cuenta segura de CarrierTrust para gestionar el perfil de la empresa.",
    company: "Empresa",
    email: "Email del administrador",
    emailLocked: "Este email está vinculado a la invitación y no se puede modificar.",
    password: "Crear contraseña",
    confirmPassword: "Confirmar contraseña",
    passwordHint: "Utiliza al menos 8 caracteres.",
    submit: "Crear cuenta y unirse a la empresa",
    submitting: "Creando la cuenta...",
    security: "Esta invitación solo se puede utilizar una vez. Después, el enlace quedará inactivo.",
    missingToken: "Falta el token de invitación.",
    invalid: "Este enlace de invitación no es válido o ya no está activo.",
    passwordShort: "La contraseña debe contener al menos 8 caracteres.",
    passwordMismatch: "Las contraseñas no coinciden.",
    generic: "Algo salió mal. Inténtalo de nuevo.",
    loginFailed: "La cuenta se creó, pero el inicio de sesión automático falló.",
    backHome: "Volver al inicio",
    successTitle: "Cuenta creada",
    successText: "Has sido añadido como administrador.",
    opening: "Abriendo el perfil de la empresa...",
  },
  it: {
    loading: "Verifica dell’invito...",
    title: "Crea il tuo account manager",
    subtitle: "Crea un account CarrierTrust sicuro per gestire il profilo aziendale.",
    company: "Azienda",
    email: "Email del manager",
    emailLocked: "Questa email è collegata all’invito e non può essere modificata.",
    password: "Crea password",
    confirmPassword: "Conferma password",
    passwordHint: "Utilizza almeno 8 caratteri.",
    submit: "Crea account e unisciti all’azienda",
    submitting: "Creazione dell’account...",
    security: "Questo invito può essere utilizzato una sola volta. Dopo, il link diventerà inattivo.",
    missingToken: "Il token dell’invito è mancante.",
    invalid: "Questo link di invito non è valido o non è più attivo.",
    passwordShort: "La password deve contenere almeno 8 caratteri.",
    passwordMismatch: "Le password non corrispondono.",
    generic: "Si è verificato un errore. Riprova.",
    loginFailed: "L’account è stato creato, ma l’accesso automatico non è riuscito.",
    backHome: "Torna alla home",
    successTitle: "Account creato",
    successText: "Sei stato aggiunto come manager.",
    opening: "Apertura del profilo aziendale...",
  },
};

type Invite = {
  email: string;
  company_id: string;
  company_name: string | null;
  role: string;
  expires_at: string;
};

async function getFunctionError(error: unknown, fallback: string) {
  const value = error as {
    message?: string;
    context?: { json?: () => Promise<{ error?: string }> };
  };

  try {
    const body = await value.context?.json?.();
    if (body?.error) return body.error;
  } catch {
    // Keep the original function error.
  }

  return value.message || fallback;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-12 pt-32">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white bg-white px-7 py-10 shadow-[0_35px_100px_rgba(15,23,42,0.12)] md:px-12 md:py-14">
        {children}
      </div>
    </main>
  );
}

function TeamInvitePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useLang();

  const safeLang: Lang = ["en", "de", "ru", "fr", "es", "it"].includes(lang)
    ? (lang as Lang)
    : "en";

  const t = useMemo(() => TEXT[safeLang], [safeLang]);
  const token = String(searchParams.get("token") || "").trim();

  const [checking, setChecking] = useState(true);
  const [invite, setInvite] = useState<Invite | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    async function inspect() {
      if (!token) {
        if (active) {
          setError(t.missingToken);
          setChecking(false);
        }
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke(
        "register-company-team-invite",
        { body: { action: "inspect", token } },
      );

      if (!active) return;

      if (fnError) {
        setError(await getFunctionError(fnError, t.invalid));
        setChecking(false);
        return;
      }

      if (!data?.ok) {
        setError(data?.error || t.invalid);
        setChecking(false);
        return;
      }

      setInvite({
        email: String(data.email || ""),
        company_id: String(data.company_id || ""),
        company_name: data.company_name ? String(data.company_name) : null,
        role: String(data.role || "manager"),
        expires_at: String(data.expires_at || ""),
      });
      setChecking(false);
    }

    void inspect();

    return () => {
      active = false;
    };
  }, [token, t.invalid, t.missingToken]);

  async function register() {
    if (!invite || !token || busy) return;

    if (password.length < 8) {
      setError(t.passwordShort);
      return;
    }

    if (password !== confirm) {
      setError(t.passwordMismatch);
      return;
    }

    setBusy(true);
    setError("");

    const { data, error: fnError } = await supabase.functions.invoke(
      "register-company-team-invite",
      { body: { action: "register", token, password } },
    );

    if (fnError) {
      setError(await getFunctionError(fnError, t.generic));
      setBusy(false);
      return;
    }

    if (!data?.ok) {
      setError(data?.error || t.generic);
      setBusy(false);
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: invite.email,
      password,
    });

    if (loginError) {
      setError(t.loginFailed);
      setBusy(false);
      return;
    }

    setSuccess(true);
    setBusy(false);

    window.setTimeout(() => {
      router.replace("/company/profile");
      router.refresh();
    }, 1200);
  }

  if (checking) {
    return (
      <Shell>
        <div className="text-center text-slate-600">{t.loading}</div>
      </Shell>
    );
  }

  if (success) {
    return (
      <Shell>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">✓</div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">{t.successTitle}</h1>
          <p className="mt-3 text-slate-600">{t.successText}</p>
          <p className="mt-6 font-semibold text-emerald-700">{t.opening}</p>
        </div>
      </Shell>
    );
  }

  if (!invite) {
    return (
      <Shell>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error || t.invalid}
          </div>
          <Link href="/" className="mt-7 inline-flex h-12 items-center rounded-2xl bg-slate-900 px-6 font-semibold text-white">
            {t.backHome}
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-bold text-white">CT</div>
        <h1 className="mt-6 text-3xl font-bold text-slate-900">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">{t.subtitle}</p>

        <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.company}</div>
          <div className="mt-2 text-xl font-bold text-slate-900">{invite.company_name || "CarrierTrust company"}</div>
        </div>

        <div className="mx-auto mt-6 max-w-xl space-y-5 text-left">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">{t.email}</label>
            <input value={invite.email} disabled className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 text-slate-600" />
            <p className="mt-2 text-xs text-slate-500">{t.emailLocked}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">{t.password}</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={busy}
              autoComplete="new-password"
              className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-emerald-400"
            />
            <p className="mt-2 text-xs text-slate-500">{t.passwordHint}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800">{t.confirmPassword}</label>
            <input
              type="password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void register();
              }}
              disabled={busy}
              autoComplete="new-password"
              className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-emerald-400"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={() => void register()}
            disabled={busy}
            className="h-14 w-full rounded-2xl bg-slate-900 px-6 font-bold text-white disabled:opacity-60"
          >
            {busy ? t.submitting : t.submit}
          </button>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800">
            {t.security}
          </div>
        </div>
      </div>
    </Shell>
  );
}

export default function TeamInvitePage() {
  return (
    <Suspense fallback={<Shell><div className="text-center">Loading...</div></Shell>}>
      <TeamInvitePageInner />
    </Suspense>
  );
}
