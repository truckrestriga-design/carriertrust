import Link from "next/link";

export default function StaticPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-6 pt-10 pb-20 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <span>←</span>
            <span>Back to home</span>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
          </div>

          <div className="relative p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-900">
              {title}
            </h1>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200/70 bg-white/75 p-6 md:p-8 shadow-sm">
              <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}