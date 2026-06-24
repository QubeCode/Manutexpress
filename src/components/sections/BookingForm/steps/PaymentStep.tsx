"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Smartphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingFormData } from "@/types/booking";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface PaymentStepProps {
  formData: BookingFormData;
  clientSecret: string;
  onSuccess: () => void;
  onBack: () => void;
}

function CheckoutForm({
  formData,
  onSuccess,
  onBack,
}: Omit<PaymentStepProps, "clientSecret">) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/?payment=success`,
        payment_method_data: {
          billing_details: {
            name: `${formData.customer.firstName} ${formData.customer.lastName}`,
            email: formData.customer.email,
            phone: formData.customer.phone,
          },
        },
      },
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message || "Une erreur est survenue.");
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Acompte à régler</span>
          <span className="text-2xl font-bold text-brand-orange">45,00 €</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Cet acompte confirme votre réservation. Le solde sera calculé selon
          votre mission.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm">
          <CreditCard className="h-4 w-4 text-brand-blue" />
          Carte bancaire
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm">
          <Smartphone className="h-4 w-4 text-brand-blue" />
          Apple Pay / Google Pay
        </div>
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
          wallets: {
            applePay: "auto",
            googlePay: "auto",
          },
        }}
      />

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Retour
        </Button>
        <Button
          type="submit"
          variant="secondary"
          disabled={!stripe || isProcessing}
          className="flex-[2]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Traitement...
            </>
          ) : (
            "Payer 45€ et confirmer"
          )}
        </Button>
      </div>
    </form>
  );
}

export function PaymentStep({
  formData,
  clientSecret,
  onSuccess,
  onBack,
}: PaymentStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xl font-semibold text-brand-blue">
          Paiement de l&apos;acompte
        </h3>
        <p className="text-muted-foreground">
          Un acompte de 45€ est requis pour confirmer votre réservation.
        </p>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#0B2E6B",
              colorBackground: "#ffffff",
              colorText: "#1a1a2e",
              borderRadius: "8px",
            },
          },
          locale: "fr",
        }}
      >
        <CheckoutForm
          formData={formData}
          onSuccess={onSuccess}
          onBack={onBack}
        />
      </Elements>
    </div>
  );
}
