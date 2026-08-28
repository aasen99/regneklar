"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { getStoredConsent } from "./CookieConsent";

export function ConditionalAnalytics({ gaId }: { gaId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(getStoredConsent() === "analytics");
    sync();
    window.addEventListener("cookie-consent-changed", sync);
    return () => window.removeEventListener("cookie-consent-changed", sync);
  }, []);

  if (!enabled) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
