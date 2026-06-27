import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PricingGuide } from "@/components/sections/PricingGuide";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { LocalSeoSection } from "@/components/sections/LocalSeoSection";
import { Contact } from "@/components/sections/Contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title:
    "MANUTEXPRESS | Manutention, Livraison et Nettoyage en Île-de-France",
  description:
    "Services rapides de manutention, livraison, nettoyage et petits travaux en Île-de-France. Devis rapide et intervention selon disponibilité.",
  path: "/",
  keywords: [
    "manutention Île-de-France",
    "manutention Paris",
    "livraison rapide Paris",
    "nettoyage Île-de-France",
    "petits travaux Paris",
    "aide déménagement Essonne",
  ],
});

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Services />
      <LocalSeoSection />
      <PricingGuide />
      <WorkflowSection />
      <WhyUs />
      <ConversionCTA />
      <Contact />
    </SiteLayout>
  );
}
