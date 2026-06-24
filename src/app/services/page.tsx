import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Services } from "@/components/sections/Services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Services — Manutention, Livraison & Nettoyage Paris & Essonne",
  description:
    "Manutention Paris, livraison rapide, nettoyage professionnel, petits travaux et aide déménagement en Essonne. Interventions à Évry-Courcouronnes et toute l'Île-de-France.",
  path: "/services",
  keywords: [
    "manutention Paris",
    "livraison rapide Paris",
    "nettoyage Île-de-France",
    "petits travaux Paris",
    "aide déménagement Essonne",
    "montage meubles Paris",
  ],
});

export default function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-blue/5 to-white pt-28 pb-8">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <PageHeader
            badge="Nos prestations"
            title="Services de manutention et livraison en Île-de-France"
            description="Manutention à Paris, livraison express, nettoyage et petits travaux en Essonne : chaque mission est étudiée pour un tarif juste, adapté au lieu et à l'urgence."
          />
        </div>
      </section>
      <Services />
      <section className="section-padding bg-white">
        <div className="container-max max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-brand-blue">
            Une équipe locale à Paris et en Essonne
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Depuis notre siège à Corbeil-Essonnes, nous couvrons Paris
            intra-muros, Évry-Courcouronnes et l&apos;ensemble des départements
            d&apos;Île-de-France. Que vous recherchiez une aide au déménagement
            en Essonne ou une livraison rapide à Paris, nos équipes qualifiées
            interviennent sous 24 h.
          </p>
          <h3 className="mb-2 text-lg font-semibold text-brand-blue">
            6 prestations, un seul interlocuteur
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Manutention, livraison, nettoyage, petits travaux, montage de meubles
            et assistance à domicile : MANUTEXPRESS centralise vos besoins pour
            simplifier vos projets en Île-de-France.
          </p>
        </div>
      </section>
      <section className="section-padding bg-gray-50">
        <div className="container-max text-center">
          <h2 className="mb-4 text-2xl font-bold text-brand-blue">
            Prêt à démarrer ?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Décrivez votre mission en quelques minutes. Notre équipe vous
            recontacte avec un devis personnalisé.
          </p>
          <Link href="/devis">
            <Button variant="secondary" size="lg" className="gap-2">
              Demander un devis gratuit
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
