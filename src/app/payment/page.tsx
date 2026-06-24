"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PaymentView } from "@/components/payment/PaymentView";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import type { ServiceRequest } from "@/types/request";

function PaymentContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Lien de paiement invalide.");
      return;
    }

    fetch(`/api/requests/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.request) {
          setError("Demande introuvable.");
          return;
        }
        if (data.request.status !== "awaiting_deposit") {
          setError(
            data.request.status === "confirmed"
              ? "Cette demande a déjà été confirmée."
              : "Le paiement n'est pas encore disponible pour cette demande."
          );
          return;
        }
        if (!data.request.pricing) {
          setError("Le montant n'a pas encore été défini par notre équipe.");
          return;
        }
        setRequest(data.request);
      })
      .catch(() => setError("Impossible de charger la demande."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-muted-foreground">Chargement...</p>
    );
  }

  if (error || !request) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <p className="mb-6 text-muted-foreground">{error}</p>
        <Link href="/">
          <Button variant="outline">Retour à l&apos;accueil</Button>
        </Link>
      </div>
    );
  }

  return <PaymentView request={request} />;
}

export default function PaymentPage() {
  return (
    <SiteLayout showStickyCta={false}>
      <section className="section-padding bg-gradient-to-b from-brand-blue/5 to-white pt-28">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <PageHeader
            badge="Phase 3 — Paiement"
            title="Confirmez votre réservation"
            description="Payez l'acompte demandé pour valider définitivement votre intervention."
          />
          <Suspense fallback={<p className="text-center">Chargement...</p>}>
            <PaymentContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
