"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/constants";
import type { ServiceRequest } from "@/types/request";

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const sessionId = searchParams.get("session_id");
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function confirmPayment() {
      if (!id) {
        setError("Référence de demande manquante.");
        setLoading(false);
        return;
      }

      try {
        if (sessionId) {
          const verifyRes = await fetch(
            `/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`
          );
          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.request) {
            setRequest(verifyData.request);
            return;
          }

          const res = await fetch(`/api/requests/${id}`);
          const data = await res.json();

          if (data.request?.status === "confirmed") {
            setRequest(data.request);
            return;
          }

          setError(
            verifyData.error ||
              "Le paiement est en cours de confirmation. Rechargez la page dans quelques instants."
          );
          return;
        }

        const res = await fetch(`/api/requests/${id}`);
        const data = await res.json();

        if (data.request?.status === "confirmed") {
          setRequest(data.request);
        } else {
          setError("Lien de confirmation invalide.");
        }
      } catch {
        setError("Impossible de confirmer votre paiement.");
      } finally {
        setLoading(false);
      }
    }

    confirmPayment();
  }, [id, sessionId]);

  const serviceTitle = request
    ? SERVICES.find((s) => s.id === request.service)?.title
    : null;

  if (loading) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-12">
        <Loader2 className="h-10 w-10 animate-spin text-brand-blue" />
        <p className="text-muted-foreground">Confirmation de votre paiement...</p>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <p className="mb-6 text-muted-foreground">{error}</p>
        <Link href="/">
          <Button variant="outline">Retour à l&apos;accueil</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border bg-white p-8 text-center shadow-brand sm:p-12">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>
      <h1 className="mb-4 text-3xl font-bold text-brand-blue">
        Merci pour votre confiance
      </h1>
      <p className="mb-2 text-lg text-muted-foreground">
        Votre acompte a bien été reçu.
      </p>
      <p className="mb-8 text-muted-foreground">
        Votre réservation est confirmée. Un agent MANUTEXPRESS vous contactera
        rapidement pour finaliser les détails de l&apos;intervention.
      </p>

      <div className="mb-8 rounded-xl bg-brand-blue/5 p-5 text-left text-sm">
        {serviceTitle && (
          <p className="mb-1">
            <span className="text-muted-foreground">Prestation :</span>{" "}
            <strong className="text-brand-blue">{serviceTitle}</strong>
          </p>
        )}
        <p className="mb-1">
          <span className="text-muted-foreground">Référence :</span>{" "}
          <strong>{request.id}</strong>
        </p>
        {request.pricing && (
          <>
            <p className="mb-1">
              <span className="text-muted-foreground">Prestation totale :</span>{" "}
              <strong>{request.pricing.totalPrice} €</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Acompte payé :</span>{" "}
              <strong className="text-brand-orange">
                {request.pricing.depositAmount} €
              </strong>
            </p>
          </>
        )}
      </div>

      <Link href="/">
        <Button variant="secondary" size="lg">
          Retour à l&apos;accueil
        </Button>
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <SiteLayout showStickyCta={false}>
      <section className="section-padding bg-gray-50 pt-28">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<p className="text-center">Chargement...</p>}>
            <SuccessContent />
          </Suspense>
        </div>
      </section>
    </SiteLayout>
  );
}
