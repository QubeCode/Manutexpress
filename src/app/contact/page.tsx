import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Contact } from "@/components/sections/Contact";
import { LocalSeoSection } from "@/components/sections/LocalSeoSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { buildPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/constants";
import { LEGAL_ENTITY } from "@/lib/company-legal";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact — Manutention Paris & services en Île-de-France",
  description:
    "Contactez MANUTEXPRESS à Corbeil-Essonnes. Manutention Paris, livraison rapide, nettoyage et petits travaux en Essonne. Tél. 06 52 09 93 10 — WhatsApp disponible.",
  path: "/contact",
  keywords: [
    "contact manutention Paris",
    "MANUTEXPRESS Essonne",
    "livraison rapide Paris contact",
    "aide déménagement Essonne",
    "services Évry Courcouronnes",
  ],
});

export default function ContactPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-to-b from-brand-blue/5 to-white pt-28 pb-4">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <PageHeader
            badge="Contact"
            title="Contactez MANUTEXPRESS en Île-de-France"
            description={`Notre équipe est joignable du lundi au samedi. Siège social : ${LEGAL_ENTITY.city} (${LEGAL_ENTITY.postalCode}), intervention à Paris, en Essonne et dans toute la région parisienne.`}
          />
        </div>
      </section>
      <Contact hideHeader />
      <LocalSeoSection />
      <section className="section-padding bg-gray-50">
        <div className="container-max max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-brand-blue">
            Où intervenons-nous ?
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            MANUTEXPRESS couvre l&apos;ensemble de l&apos;Île-de-France : Paris
            intra-muros, la petite couronne et l&apos;Essonne, notamment
            Évry-Courcouronnes, Corbeil-Essonnes, Massy, Savigny-sur-Orge et les
            communes alentour. Pour toute demande de manutention, livraison
            express, nettoyage ou aide au déménagement, contactez-nous au{" "}
            <a href={COMPANY.phoneHref} className="font-medium text-brand-blue">
              {COMPANY.phone}
            </a>{" "}
            ou par email à{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-medium text-brand-blue"
            >
              {COMPANY.email}
            </a>
            .
          </p>
          <h3 className="mb-2 text-lg font-semibold text-brand-blue">
            Délais de réponse
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            Nous traitons chaque demande sous 24 h ouvrées. Pour les urgences en
            manutention ou livraison rapide à Paris et en Essonne, appelez-nous
            directement pour une prise en charge prioritaire.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
