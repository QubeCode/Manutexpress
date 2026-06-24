"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LEGAL_LINKS } from "@/lib/company-legal";

const STORAGE_KEY = "manutexpress-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-2xl rounded-xl border bg-white p-4 shadow-brand lg:bottom-6">
      <p className="mb-3 text-sm text-muted-foreground">
        Ce site utilise des cookies strictement nécessaires au fonctionnement
        (réservation, paiement sécurisé) et, le cas échéant, des cookies de
        mesure d&apos;audience. En continuant, vous acceptez leur utilisation.{" "}
        <Link
          href={LEGAL_LINKS.politiqueCookies}
          className="font-medium text-brand-blue underline-offset-2 hover:underline"
        >
          En savoir plus
        </Link>
      </p>
      <Button size="sm" onClick={accept}>
        J&apos;accepte
      </Button>
    </div>
  );
}
