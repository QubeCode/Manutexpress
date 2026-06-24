import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { CookieBanner } from "@/components/legal/CookieBanner";

interface SiteLayoutProps {
  children: React.ReactNode;
  showStickyCta?: boolean;
  showFloatingWhatsApp?: boolean;
}

export function SiteLayout({
  children,
  showStickyCta = true,
  showFloatingWhatsApp = true,
}: SiteLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-20 lg:pb-0">{children}</main>
      <Footer />
      <CookieBanner />
      {showFloatingWhatsApp && <FloatingWhatsApp />}
      {showStickyCta && <StickyMobileCTA />}
    </>
  );
}
