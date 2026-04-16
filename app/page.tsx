"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLang } from "@/lib/language-context";

type SearchCompany = {
  id: string;
  name: string | null;
  vat_uid: string | null;
  country: string | null;
};

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return pos;
}

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, start };
}

function formatNumber(n: number | null) {
  if (n === null || !isFinite(n)) return "—";
  return n.toLocaleString();
}

function AnimatedNumber({
  value,
  label,
}: {
  value: number | null;
  label: string;
}) {
  const { ref, isInView } = useInView(0.5);
  const { count, start } = useCountUp(value || 0, 2000);

  useEffect(() => {
    if (isInView && value !== null) start();
  }, [isInView, value, start]);

  return (
    <div ref={ref} className="text-center">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-3xl font-bold text-transparent tabular-nums sm:text-4xl md:text-5xl">
        {formatNumber(count)}
      </div>
      <div className="mt-2 text-sm font-medium leading-snug text-slate-500">
        {label}
      </div>
    </div>
  );
}

function FloatingOrb({
  color,
  size,
  top,
  left,
  delay = 0,
}: {
  color: string;
  size: number;
  top: string;
  left: string;
  delay?: number;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 animate-pulse ${color}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        animationDelay: `${delay}s`,
        animationDuration: "8s",
      }}
    />
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color = "emerald",
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.3);
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses: Record<string, string> = {
    emerald: "from-emerald-400/20 to-teal-400/20 border-emerald-200/50",
    blue: "from-blue-400/20 to-cyan-400/20 border-blue-200/50",
    purple: "from-purple-400/20 to-pink-400/20 border-purple-200/50",
    amber: "from-amber-400/20 to-orange-400/20 border-amber-200/50",
  };

  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-700 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} rounded-3xl blur-xl transition-all duration-500 ${
          isHovered ? "scale-110 opacity-100" : "scale-100 opacity-0"
        }`}
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/60 p-6 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-100/50 backdrop-blur-xl sm:p-7 md:p-8">
        <div
          className={`absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br ${colorClasses[color]} blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-50`}
        />

        <div className="relative">
          <div
            className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClasses[color]} transition-transform duration-500 group-hover:scale-110 sm:h-14 sm:w-14`}
          >
            {icon}
          </div>

          <h3 className="mb-3 text-lg font-semibold text-slate-800 transition-colors group-hover:text-emerald-600 sm:text-xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  delay = 0,
}: {
  number: string;
  title: string;
  description: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView(0.3);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
        <div className="relative shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-xl font-bold text-white shadow-lg shadow-emerald-200 sm:h-16 sm:w-16 sm:text-2xl">
            {number}
          </div>
          <div className="absolute -right-2 -bottom-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-4 w-4 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="min-w-0 flex-1 pt-1 sm:pt-2">
          <h3 className="mb-2 text-lg font-semibold text-slate-800 sm:text-xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQItemCard({
  item,
  index,
}: {
  item: { q: string; a: string };
  index: number;
}) {
  const { ref, isInView } = useInView(0.3);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 transition-all duration-700 ${
        isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-start justify-between gap-3 p-4 text-left sm:items-center sm:p-6"
      >
        <h3 className="flex items-start gap-3 text-base font-semibold text-slate-800 sm:items-center sm:gap-4 sm:text-lg">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500 transition-all group-hover:bg-emerald-100 group-hover:text-emerald-600 sm:mt-0 sm:h-10 sm:w-10">
            {index + 1}
          </span>
          <span>{item.q}</span>
        </h3>
        <svg
          className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 sm:mt-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-48 sm:max-h-40" : "max-h-0"
        }`}
      >
        <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:pl-[5.5rem] sm:text-base">
          {item.a}
        </p>
      </div>
    </div>
  );
}

function OrbitingCards({
  mouse,
  t,
}: {
  mouse: { x: number; y: number };
  t: (key: string) => string;
}) {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;

    let animationId: number;
    const animate = () => {
      setRotation((prev) => (prev + 0.3) % 360);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const cards = [
    {
      id: 1,
      company: "FasterLogistic GmbH",
      rating: 5,
      review: t("orbitExcellentReview"),
      author: "Marco B.",
      route: "Munich → Vienna",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      starsColor: "text-emerald-400",
      stat: { value: "4.9", label: t("orbitRating"), trend: "+0.2" },
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      id: 2,
      company: "EuroTrucking Sp. z o.o.",
      rating: 4,
      review: t("orbitGoodReview"),
      author: "Anna K.",
      route: "Warsaw → Berlin",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      starsColor: "text-blue-400",
      stat: { value: "4.2", label: t("orbitRating"), trend: "+0.1" },
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      ),
    },
    {
      id: 3,
      company: "QuickKargos SRL",
      rating: 1,
      review: t("orbitBadReview"),
      author: "Pierre L.",
      route: "Milan → Paris",
      color: "from-red-400 to-rose-500",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      starsColor: "text-red-400",
      stat: { value: "1.8", label: t("orbitRating"), trend: "-2.1" },
      warning: t("orbitPaymentOverdue"),
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
  ];

  const getCardStyle = (index: number) => {
    const angle = rotation + index * 120;
    const radian = (angle * Math.PI) / 180;

    const radiusX = 220;
    const radiusY = 80;

    const x = radiusX * Math.cos(radian);
    const y = radiusY * Math.sin(radian);

    const scale = 0.7 + (0.3 * (Math.sin(radian) + 1)) / 2;
    const zIndex = Math.round((Math.sin(radian) + 1) * 50);
    const opacity = 0.4 + (0.6 * (Math.sin(radian) + 1)) / 2;
    const blur = Math.max(0, (1 - scale) * 4);

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      zIndex,
      opacity,
      filter: `blur(${blur}px)`,
      transition: isPaused ? "all 0.5s ease-out" : "none",
    };
  };

  const renderStars = (count: number, color: string) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < count ? color : "text-slate-200"
            } transition-all duration-500`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="perspective-[1200px] relative flex h-[400px] w-full items-center justify-center"
      style={{
        transform: `perspective(1200px) rotateY(${mouse.x * 4}deg) rotateX(${
          -mouse.y * 3
        }deg)`,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-3xl" />
      <div
        className="absolute h-[160px] w-[440px] rounded-full border border-slate-200/30"
        style={{ transform: "rotateX(60deg)" }}
      />

      {cards.map((card, index) => {
        const style = getCardStyle(index);
        const isFront = style.zIndex > 50;

        return (
          <div
            key={card.id}
            className="absolute w-72 cursor-pointer"
            style={style}
            onClick={() => {
              const targetRotation = 360 - index * 120 - (rotation % 360);
              setRotation((prev) => prev + targetRotation);
            }}
          >
            <div
              className={`relative overflow-hidden rounded-3xl border-2 ${card.borderColor} bg-white shadow-2xl transition-all duration-300 ${
                isFront ? "shadow-emerald-200/50" : ""
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${card.color}`} />

              {card.warning && (
                <div className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
                  {card.warning}
                </div>
              )}

              <div className="p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}
                  >
                    {card.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-slate-800">
                      {card.company}
                    </h4>
                    <p className="text-xs text-slate-500">{card.route}</p>
                  </div>
                </div>

                <div className="mb-3">{renderStars(card.rating, card.starsColor)}</div>

                <p
                  className={`mb-4 line-clamp-2 text-sm leading-relaxed ${card.textColor}`}
                >
                  "{card.review}"
                </p>

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">— {card.author}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${card.bgColor} ${card.textColor}`}
                  >
                    {t("orbitVerifiedBadge")}
                  </span>
                </div>

                <div
                  className={`flex items-center justify-between border-t pt-4 ${card.borderColor}`}
                >
                  <div>
                    <div className={`text-2xl font-bold ${card.textColor}`}>
                      {card.stat.value}
                    </div>
                    <div className="text-xs text-slate-400">{card.stat.label}</div>
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      card.stat.trend.startsWith("+")
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {card.stat.trend}
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 transition-opacity duration-500 hover:opacity-100" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const { t } = useLang();

  const [q, setQ] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [companiesCount, setCompaniesCount] = useState<number | null>(null);
  const [publishedReviewsCount, setPublishedReviewsCount] = useState<number | null>(
    null
  );

  const mouse = useMousePosition();
  const sectionsRef = useRef<HTMLDivElement>(null);
  const { ref: heroRef, isInView: heroInView } = useInView(0.1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { count: cCount } = await supabase
          .from("companies")
          .select("id", { count: "exact", head: true });
        setCompaniesCount(typeof cCount === "number" ? cCount : null);
      } catch {
        setCompaniesCount(null);
      }

      try {
        const { count: rCount } = await supabase
          .from("reviews")
          .select("id", { count: "exact", head: true })
          .eq("status", "published");
        setPublishedReviewsCount(typeof rCount === "number" ? rCount : null);
      } catch {
        setPublishedReviewsCount(null);
      }
    })();
  }, []);

  async function search() {
    setMsg(null);
    const query = q.trim();
    if (!query) return;

    setSearching(true);
    try {
      const vatCandidate = query.toUpperCase();
      const { data: byVat, error: vatErr } = await supabase
        .from("companies")
        .select("id, name, vat_uid, country")
        .eq("vat_uid", vatCandidate)
        .limit(1);

      if (vatErr) throw new Error(vatErr.message);
      if (byVat && byVat.length > 0) {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
        return;
      }

      const { data: byName, error: nameErr } = await supabase
        .from("companies")
        .select("id, name, vat_uid, country")
        .ilike("name", `%${query}%`)
        .order("name", { ascending: true })
        .limit(20);

      if (nameErr) throw new Error(nameErr.message);
      const rows = (byName || []) as SearchCompany[];

      if (rows.length === 0) {
        setMsg(t("heroNotFound"));
      } else {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }

    } catch (e: any) {
      setMsg(String(e?.message || e));
    } finally {
      setSearching(false);
    }
  }

  function scrollToSections() {
    sectionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const faqItems = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://carriertrust.eu/#website",
        name: "CarrierTrust",
        url: "https://carriertrust.eu",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://carriertrust.eu/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://carriertrust.eu/#organization",
        name: "CarrierTrust",
        url: "https://carriertrust.eu",
        description:
  "European logistics trust platform for cargo transportation, freight forwarding, carrier reviews, logistics verification, cargo delivery terms, Timocom alternative, cargo.lt market comparison, carrier risk index and company verification.",
  keywords: [
    "cargo",
    "delivery",
    "logistics",
    "timocom",
    "cargo.lt",
    "carrier reviews",
    "freight forwarding",
    "cargo delivery terms"
  ],
      },
      {
        "@type": "WebPage",
        "@id": "https://carriertrust.eu/#webpage",
        url: "https://carriertrust.eu",
        name: "CarrierTrust",
        isPartOf: {
          "@id": "https://carriertrust.eu/#website",
        },
        about: {
          "@id": "https://carriertrust.eu/#organization",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchema),
        }}
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]" />
        <FloatingOrb color="bg-emerald-400" size={400} top="10%" left="10%" delay={0} />
        <FloatingOrb color="bg-teal-400" size={300} top="60%" left="70%" delay={2} />
        <FloatingOrb color="bg-cyan-400" size={250} top="30%" left="80%" delay={4} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <section
        ref={heroRef}
        className="relative flex min-h-[88vh] items-center px-4 pt-24 pb-12 sm:px-6 sm:pt-28 md:pt-40 md:pb-10"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 xl:gap-14">
            <div className="relative z-10 space-y-4 sm:space-y-5">
              <div
                className={`inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 transition-all duration-1000 sm:px-4 sm:text-sm ${
                  heroInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {t("heroBadge")}
              </div>

              <h1
                className={`max-w-[14ch] text-4xl font-bold leading-[0.98] tracking-tight text-slate-900 transition-all duration-1000 delay-100 sm:max-w-none sm:text-5xl md:text-5xl xl:text-[4.25rem] ${
                  heroInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {t("heroTitleStart")}{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  {t("heroTitleAccent")}
                </span>{" "}
                {t("heroTitleEnd")}
              </h1>

              <p
                className={`max-w-xl text-base leading-relaxed text-slate-600 transition-all duration-1000 delay-200 sm:text-lg md:text-xl ${
                  heroInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {t("heroSub")}
              </p>

              <div
                className={`relative max-w-lg transition-all duration-1000 delay-300 ${
                  heroInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 blur opacity-20 transition duration-500 group-hover:opacity-40" />
                  <div className="relative flex flex-col items-stretch gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
                      <svg
                        className="h-5 w-5 shrink-0 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        value={q}
                        onChange={(e) => {
                          setQ(e.target.value);
                          setMsg(null);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && search()}
                        placeholder={t("heroPlaceholder")}
                        className="h-12 w-full min-w-0 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 sm:h-11 md:text-lg"
                      />
                    </div>
                    <button
                      onClick={search}
                      disabled={searching}
                      className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 disabled:opacity-50 sm:w-auto sm:px-8 sm:hover:scale-105"
                    >
                      {searching ? (
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        <span className="flex items-center gap-2">
                          {t("heroSearch")}
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {msg && (
                <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 animate-pulse">
                  <svg
                    className="h-4 w-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{msg}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-2 sm:flex sm:flex-wrap sm:gap-8 md:gap-10">
                <AnimatedNumber value={companiesCount} label={t("companiesIndexed")} />
                <AnimatedNumber
                  value={publishedReviewsCount}
                  label={t("publishedReviews")}
                />
                <div className="col-span-2 text-center sm:col-span-1">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                    EU
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-500">
                    {t("allEuCountries")}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden h-[450px] lg:block">
              {mounted && <OrbitingCards mouse={mouse} t={t} />}
            </div>
          </div>

          <button
            onClick={scrollToSections}
            className="group absolute bottom-2 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition-colors hover:text-emerald-500 md:flex"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              {t("scrollDown")}
            </span>
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-current p-2 group-hover:border-emerald-500">
              <div className="h-3 w-1.5 animate-bounce rounded-full bg-current group-hover:bg-emerald-500" />
            </div>
          </button>
        </div>
      </section>

      <div ref={sectionsRef} className="scroll-mt-20" />

      <section className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              {t("whyCarrierTrust")}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              {t("builtForB2B")}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            <FeatureCard
              icon={
                <svg
                  className="h-7 w-7 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              }
              title={t("lowerNeutralTitle")}
              description={t("lowerNeutralBody")}
              color="emerald"
              delay={0}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
              title={t("lowerBusinessTitle")}
              description={t("lowerBusinessBody")}
              color="blue"
              delay={150}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-7 w-7 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              }
              title={t("lowerEuTitle")}
              description={t("lowerEuBody")}
              color="purple"
              delay={300}
            />
          </div>
        </div>
      </section>

      <section className="relative bg-white/50 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                {t("processLabel")}
              </div>
              <h2 className="mb-5 text-3xl font-bold text-slate-900 sm:text-4xl md:mb-6 md:text-5xl">
                {t("sectionHowTitle")}
              </h2>
              <p className="mb-8 text-lg text-slate-600 sm:text-xl md:mb-12">
                {t("sectionHowSub")}
              </p>

              <div className="space-y-6 sm:space-y-8">
                <StepCard
                  number="01"
                  title={t("how1Title")}
                  description={t("how1Body")}
                  delay={0}
                />
                <StepCard
                  number="02"
                  title={t("how2Title")}
                  description={t("how2Body")}
                  delay={150}
                />
                <StepCard
                  number="03"
                  title={t("how3Title")}
                  description={t("how3Body")}
                  delay={300}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-r from-emerald-200 to-teal-200 opacity-50" />
              <div className="relative rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-200/50 sm:p-6 md:p-8">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 sm:h-32 sm:w-32" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-36 w-36 animate-[spin_10s_linear_infinite] rounded-full border-2 border-emerald-200 sm:h-48 sm:w-48" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-52 w-52 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-teal-200 sm:h-64 sm:w-64" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <svg
                        className="h-12 w-12 text-white sm:h-16 sm:w-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              {t("featuresLabel")}
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              {t("sectionSignalsTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
              {t("sectionSignalsSub")}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            <FeatureCard
              icon={
                <svg
                  className="h-7 w-7 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title={t("sig1Title")}
              description={t("sig1Body")}
              color="emerald"
              delay={0}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-7 w-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
              title={t("sig2Title")}
              description={t("sig2Body")}
              color="blue"
              delay={150}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-7 w-7 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              }
              title={t("sig3Title")}
              description={t("sig3Body")}
              color="purple"
              delay={300}
            />
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white to-slate-50 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 relative lg:order-1">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-200 to-teal-200 opacity-50 blur-xl" />
              <div className="relative rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl shadow-slate-200/50 sm:p-6 md:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="group flex cursor-pointer items-start gap-4 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-emerald-50 sm:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 transition-transform group-hover:scale-110">
                      <svg
                        className="h-6 w-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {t("companies1Title")}
                      </div>
                      <div className="text-sm text-slate-500">
                        {t("companies1Body")}
                      </div>
                    </div>
                  </div>

                  <div className="group flex cursor-pointer items-start gap-4 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-blue-50 sm:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 transition-transform group-hover:scale-110">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">
                        {t("companies2Title")}
                      </div>
                      <div className="text-sm text-slate-500">
                        {t("companies2Body")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                {t("businessLabel")}
              </div>
              <h2 className="mb-5 text-3xl font-bold text-slate-900 sm:text-4xl md:mb-6 md:text-5xl">
                {t("sectionCompaniesTitle")}
              </h2>
              <p className="mb-8 text-lg text-slate-600 sm:text-xl">
                {t("sectionCompaniesSub")}
              </p>

              <Link
                href="/verified-profile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 sm:w-auto sm:hover:scale-105"
              >
                {t("getStarted")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
  href="/companies"
  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-800 transition-all hover:bg-slate-100 sm:w-auto"
>
  Companies Directory
</Link>

            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              {t("sectionFAQTitle")}
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <FAQItemCard key={`${item.q}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-center shadow-2xl shadow-emerald-500/30 sm:rounded-[2.25rem] sm:p-8 md:rounded-[2.5rem] md:p-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

            <div className="relative">
              <h2 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:mb-6 md:text-6xl">
                {t("sectionCTAHeadline")}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-base text-emerald-100 sm:text-lg md:mb-12 md:text-xl">
                {t("sectionCTASub")}
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/write-review"
                  className="w-full rounded-2xl bg-white px-8 py-4 text-base font-bold text-emerald-600 shadow-xl transition-transform hover:scale-105 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                >
                  {t("ctaPrimary")}
                </Link>
                <Link
                  href="/verified-profile"
                  className="w-full rounded-2xl border-2 border-white/30 bg-emerald-400/30 px-8 py-4 text-base font-bold text-white transition-all hover:bg-emerald-400/50 sm:w-auto sm:px-10 sm:py-5 sm:text-lg"
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
     
    </main>
  );
}