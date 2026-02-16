"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Lang = "en" | "de" | "ru";

type TextPack = {
  titleLogin: string;
  titleRegister: string;
  tabLogin: string;
  tabRegister: string;
  companyName: string;
  vat: string;
  email: string;
  password: string;
  btnLogin: string;
  btnRegister: string;
  backHome: string;
  regOk: string;
  confirmedOk: string;
  fillAll: string;
};

const TEXT: Record<Lang, TextPack> = {
  en: {
    titleLogin: "Login to write a review.",
    titleRegister: "Create an account to write a review.",
    tabLogin: "Login",
    tabRegister: "Register",
    companyName: "Your company name",
    vat: "Your company VAT number",
    email: "Email",
    password: "Password",
    btnLogin: "Login",
    btnRegister: "Register",
    backHome: "Back to home",
    regOk:
      "Registration created. Please check your email and confirm your account, then come back to login.",
    confirmedOk: "Thank you! Your email is confirmed. Please login.",
    fillAll: "Please fill all fields.",
  },
  de: {
    titleLogin: "Melde dich an, um eine Bewertung zu schreiben.",
    titleRegister: "Konto erstellen, um eine Bewertung zu schreiben.",
    tabLogin: "Login",
    tabRegister: "Registrieren",
    companyName: "Dein Firmenname",
    vat: "Deine USt-IdNr",
    email: "E-Mail",
    password: "Passwort",
    btnLogin: "Anmelden",
    btnRegister: "Registrieren",
    backHome: "Zur Startseite",
    regOk:
      "Registrierung erstellt. Bitte bestätige deine E-Mail und melde dich danach an.",
    confirmedOk: "Danke! E-Mail bestätigt. Bitte einloggen.",
    fillAll: "Bitte alle Felder ausfüllen.",
  },
  ru: {
    titleLogin: "Войдите, чтобы оставить отзыв.",
    titleRegister: "Создайте аккаунт, чтобы оставить отзыв.",
    tabLogin: "Вход",
    tabRegister: "Регистрация",
    companyName: "Название вашей компании",
    vat: "VAT номер вашей компании",
    email: "Email",
    password: "Пароль",
    btnLogin: "Войти",
    btnRegister: "Зарегистрироваться",
    backHome: "На главную",
    regOk: "Аккаунт создан. Подтвердите email по ссылке в письме, затем войдите.",
    confirmedOk: "Спасибо! Email подтверждён. Пожалуйста, войдите.",
    fillAll: "Пожалуйста, заполните все поля.",
  },
};

const ADMIN_EMAIL = "truckrest.riga@gmail.com";

export default function AuthInner() {
  const sp = useSearchParams();
  const nextUrl = sp.get("next") || "/write-review";
  const confirmed = sp.get("confirmed") === "1";
  const supabase = getSupabaseBrowserClient();

  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => TEXT[lang], [lang]);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [companyName, setCompanyName] = useState("");
  const [vat, setVat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  // ВАЖНО: на проде должен быть URL сайта (carriertrust.eu)
  // На Vercel мы его зададим в Environment Variables.
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const emailRedirectTo = useMemo(() => {
    return `${SITE_URL}/auth?next=${encodeURIComponent(nextUrl)}&confirmed=1`;
  }, [SITE_URL, nextUrl]);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "de" || saved === "ru") setLang(saved);

    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) return;
    
      const userEmail = (user.email || "").toLowerCase();
      if (userEmail === ADMIN_EMAIL.toLowerCase()) {
        window.location.href = "/admin";
        return;
      }
    
      window.location.href = nextUrl;
    })();
    
  }, [nextUrl]);

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-gray-900 text-black placeholder:text-gray-400 caret-black";

  function setError(m: string) {
    setMsgType("error");
    setMsg(m);
  }

  function setSuccess(m: string) {
    setMsgType("success");
    setMsg(m);
  }

  async function doLogin() {
    setLoading(true);
    setMsg(null);
    setMsgType(null);

    const emailNorm = email.trim().toLowerCase();

    const { error } = await supabase.auth.signInWithPassword({
      email: emailNorm,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (emailNorm === ADMIN_EMAIL.toLowerCase()) {
      window.location.href = "/admin";
      return;
    }

    window.location.href = nextUrl;
  }

  async function doRegister() {
    setLoading(true);
    setMsg(null);
    setMsgType(null);

    if (!companyName.trim() || !vat.trim() || !email.trim() || !password) {
      setError(t.fillAll);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setCompanyName("");
    setVat("");
    setEmail("");
    setPassword("");
    setSuccess(t.regOk);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="w-full max-w-md border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
          <div className="flex justify-center">
            <img src="/logo.png" alt="CarrierTrust" className="w-64" />
          </div>

          {confirmed && (
            <div className="mt-4 text-sm text-green-800 border border-green-200 bg-green-50 rounded-xl p-3 text-center">
              {t.confirmedOk}
            </div>
          )}

          <p className="mt-4 text-sm text-gray-700 text-center font-medium">
            {mode === "login" ? t.titleLogin : t.titleRegister}
          </p>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-semibold ${
                mode === "login"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setMode("login")}
            >
              {t.tabLogin}
            </button>

            <button
              type="button"
              className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-semibold ${
                mode === "register"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setMode("register")}
            >
              {t.tabRegister}
            </button>
          </div>

          {mode === "register" && (
            <div className="mt-5 space-y-3">
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={inputClass}
                placeholder={t.companyName}
              />
              <input
                value={vat}
                onChange={(e) => setVat(e.target.value)}
                className={inputClass}
                placeholder={t.vat}
              />
            </div>
          )}

          <div className="mt-5 space-y-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder={t.email}
              type="email"
              autoComplete="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder={t.password}
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {msg && msgType === "success" && (
            <div className="mt-4 text-sm text-green-800 border border-green-200 bg-green-50 rounded-xl p-3">
              {msg}
            </div>
          )}
          {msg && msgType === "error" && (
            <div className="mt-4 text-sm text-red-800 border border-red-200 bg-red-50 rounded-xl p-3">
              {msg}
            </div>
          )}

          <button
            type="button"
            className="mt-5 w-full px-4 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 disabled:opacity-60"
            disabled={loading}
            onClick={mode === "login" ? doLogin : doRegister}
          >
            {loading ? "Please wait..." : mode === "login" ? t.btnLogin : t.btnRegister}
          </button>

          <a
            href="/"
            className="mt-4 block text-center text-sm font-medium text-gray-700 hover:text-black"
          >
            {t.backHome}
          </a>
        </div>
      </div>
    </main>
  );
}
