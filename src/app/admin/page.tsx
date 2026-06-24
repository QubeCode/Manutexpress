import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Administration — MANUTEXPRESS",
  description: "Tableau de bord admin pour la gestion des demandes de devis.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <SiteLayout showStickyCta={false} showFloatingWhatsApp={false}>
      <section className="section-padding bg-gray-50 pt-28">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <PageHeader
            badge="Phase 2 — Validation admin"
            title="Tableau de bord des demandes"
            description="Examinez les demandes entrantes, définissez le prix final et l'acompte, puis envoyez le lien de paiement au client."
          />
          <AdminDashboard />
        </div>
      </section>
    </SiteLayout>
  );
}
