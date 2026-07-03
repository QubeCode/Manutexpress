import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PricingGuide } from "@/components/sections/PricingGuide";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { ConversionCTA } from "@/components/sections/ConversionCTA";
import { LocalSeoSection } from "@/components/sections/LocalSeoSection";
import { BrandSeoSection } from "@/components/sections/BrandSeoSection";
import { Contact } from "@/components/sections/Contact";
import { buildPageMetadata, HOME_DESCRIPTION, HOME_TITLE } from "@/lib/seo";
import { BRAND_KEYWORDS, LOCAL_KEYWORDS } from "@/lib/seo-config";

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: [...BRAND_KEYWORDS, ...LOCAL_KEYWORDS],
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
      <BrandSeoSection />
      <Contact />
    </SiteLayout>
  );
}
