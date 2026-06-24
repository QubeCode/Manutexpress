"use client";

import { useState } from "react";
import { CreditCard, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/constants";
import type { ServiceRequest } from "@/types/request";

interface PaymentViewProps {
  request: ServiceRequest;
}

export function PaymentView({ request }: PaymentViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceTitle =
    SERVICES.find((s) => s.id === request.service)?.title ?? request.service;

  const totalPrice = request.pricing?.totalPrice ?? 0;
  const depositAmount = request.pricing?.depositAmount ?? 0;
  const balanceDue =
    request.pricing?.balanceDue ?? totalPrice - depositAmount;

  const handleCheckout = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: request.id }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || "Impossible de lancer le paiement.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-8 rounded-2xl border bg-white p-6 shadow-brand">
        <h2 className="mb-4 text-lg font-semibold text-brand-blue">
          Récapitulatif de votre prestation
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Prestation</span>
            <span className="text-right font-medium text-brand-blue">
              {serviceTitle}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Client</span>
            <span className="font-medium">
              {request.customer.firstName} {request.customer.lastName}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Référence</span>
            <span className="font-mono text-xs">{request.id}</span>
          </div>
          <div className="flex justify-between border-t pt-3">
            <span className="text-muted-foreground">Prestation totale</span>
            <span className="text-lg font-semibold text-brand-blue">
              {totalPrice} €
            </span>
          </div>
          <div className="flex justify-between rounded-xl bg-brand-orange/10 p-4">
            <span className="font-semibold text-brand-blue">Acompte demandé</span>
            <span className="text-xl font-bold text-brand-orange">
              {depositAmount} €
            </span>
          </div>
          {balanceDue > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Solde après prestation</span>
              <span className="font-medium">{balanceDue} €</span>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 shrink-0 text-brand-blue" />
            Paiement sécurisé via Stripe Checkout
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 shrink-0 text-brand-blue" />
            Carte bancaire, Apple Pay et Google Pay acceptés
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button
          variant="secondary"
          size="lg"
          className="w-full gap-2"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Redirection vers Stripe...
            </>
          ) : (
            <>
              <ShieldCheck className="h-5 w-5" />
              Payer l&apos;acompte
            </>
          )}
        </Button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Vous serez redirigé vers la page de paiement sécurisée Stripe pour
          régler l&apos;acompte de {depositAmount} €.
        </p>
      </div>
    </div>
  );
}
