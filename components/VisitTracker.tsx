"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

function VisitTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = searchParams?.toString();
    const pageKey = query ? `${pathname}?${query}` : pathname || "/";

    if (lastTrackedRef.current === pageKey) return;
    lastTrackedRef.current = pageKey;

    trackEvent({
      event_type: "page_view",
      page_path: pageKey,
      page_url: window.location.href,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function VisitTracker() {
  return (
    <Suspense fallback={null}>
      <VisitTrackerInner />
    </Suspense>
  );
}