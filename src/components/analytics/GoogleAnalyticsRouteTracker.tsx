"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

interface GoogleAnalyticsRouteTrackerProps {
  gaId: string;
}

export function GoogleAnalyticsRouteTracker({
  gaId,
}: GoogleAnalyticsRouteTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipInitialPageView = useRef(true);

  useEffect(() => {
    // gtag('config') in the root layout already sends the first page_view.
    // App Router navigations do not remount the layout or reload gtag.js.
    if (skipInitialPageView.current) {
      skipInitialPageView.current = false;
      return;
    }

    if (typeof window.gtag !== "function") return;

    const query = searchParams.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: gaId,
    });
  }, [gaId, pathname, searchParams]);

  return null;
}
