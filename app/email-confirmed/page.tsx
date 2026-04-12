"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmailConfirmedPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth?confirmed=1");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-sm text-neutral-500">Redirecting…</div>
    </div>
  );
}
