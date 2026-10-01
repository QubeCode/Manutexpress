import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { QuoteRequestForm } from "@/components/quote/QuoteRequestForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Logo } from "@/components/brand/Logo";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Devis gratuit manutention Paris — MANUTEXPRESS",
  description:
    "Demandez un devis gratuit MANUTEXPRESS : manutention, aide au déménagement, livraison et montage en Île-de-France. Réponse sous 24 h, sans paiement en ligne.",
  path: "/devis",
  keywords: [
    "devis manutention Paris",
    "devis MANUTEXPRESS",
    "devis aide déménagement Paris",
    "manutention rapide Paris devis",
  ],
});

export default function DevisPage() {
  return (
    <SiteLayout>
      <section className="section-padding bg-gradient-to-b from-brand-blue/5 to-white pt-28">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <Logo layout="centered" className="mb-6" />
            <PageHeader
              badge="Phase 1 — Demande client"
              title="Demandez votre devis personnalisé en Île-de-France"
              description="Décrivez votre mission en 4 étapes — manutention Paris, livraison, nettoyage ou petits travaux en Essonne. Aucun paiement immédiat : tarif adapté sous 24 h."
            />
          </div>
          <div className="mx-auto min-w-0 max-w-2xl">
            <Suspense fallback={<p className="text-center">Chargement...</p>}>
              <QuoteRequestForm />
            </Suspense>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
