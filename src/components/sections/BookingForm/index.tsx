"use client";

import { useState } from "react";
import { useScrollToRefOnStepChange } from "@/hooks/useScrollToRefOnStepChange";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/brand/Logo";
import { AnimatedSection } from "@/components/ui/animated";
import { StepIndicator } from "./StepIndicator";
import { ServiceStep } from "./steps/ServiceStep";
import { MissionStep } from "./steps/MissionStep";
import { CustomerStep } from "./steps/CustomerStep";
import { SchedulingStep } from "./steps/SchedulingStep";
import { PaymentStep } from "./steps/PaymentStep";
import { Confirmation } from "./Confirmation";
import {
  INITIAL_FORM_DATA,
  type BookingFormData,
} from "@/types/booking";
import type { ServiceId } from "@/lib/constants";

function validateStep(step: number, data: BookingFormData): string | null {
  switch (step) {
    case 1:
      if (!data.service) return "Veuillez sélectionner un service.";
      return null;
    case 2: {
      const { mission, service } = data;
      if (service === "manutention") {
        if (!mission.missionType || !mission.itemCount)
          return "Veuillez remplir tous les champs obligatoires.";
      } else if (service === "livraison") {
        if (!mission.pickupAddress || !mission.deliveryAddress || !mission.packageSize)
          return "Veuillez remplir tous les champs obligatoires.";
      } else if (service === "nettoyage") {
        if (!mission.surface || !mission.buildingType || !mission.frequency)
          return "Veuillez remplir tous les champs obligatoires.";
      } else if (service === "petits-travaux") {
        if (!mission.workType || !mission.description)
          return "Veuillez remplir tous les champs obligatoires.";
      }
      return null;
    }
    case 3: {
      const { customer } = data;
      if (!customer.firstName || !customer.lastName || !customer.phone || !customer.email)
        return "Veuillez remplir tous les champs obligatoires.";
      if (!customer.acceptTerms || !customer.acceptPrivacy)
        return "Veuillez accepter les CGV et la politique de confidentialité.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
        return "Veuillez entrer une adresse email valide.";
      return null;
    }
    case 4: {
      const { scheduling } = data;
      if (!scheduling.date || !scheduling.time)
        return "Veuillez sélectionner une date et un créneau.";
      return null;
    }
    default:
      return null;
  }
}

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const formRef = useScrollToRefOnStepChange(currentStep);

  const updateFormData = (partial: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const handleNext = async () => {
    const validationError = validateStep(currentStep, formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

    if (currentStep === 4) {
      setIsLoadingPayment(true);
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.customer.email,
            name: `${formData.customer.firstName} ${formData.customer.lastName}`,
            metadata: {
              service: formData.service,
              phone: formData.customer.phone,
            },
          }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setCurrentStep(5);
        } else {
          setError(data.error || "Erreur lors de la création du paiement.");
        }
      } catch {
        setError("Erreur de connexion. Veuillez réessayer.");
      } finally {
        setIsLoadingPayment(false);
      }
      return;
    }

    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handlePaymentSuccess = () => {
    setIsComplete(true);
  };

  return (
    <AnimatedSection id="reservation" className="section-padding bg-white">
      <div className="container-max">
        <div className="mb-10 text-center">
          <Logo layout="centered" className="mb-6" />
          <Badge variant="secondary" className="mb-4">
            Devis & Réservation
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl">
            Demandez un devis ou réservez en ligne
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Remplissez le formulaire en quelques étapes et confirmez votre
            réservation avec un acompte de 45€.
          </p>
        </div>

        <div
          ref={formRef}
          className="mx-auto max-w-2xl scroll-mt-24 rounded-2xl border bg-white p-6 shadow-brand sm:p-8"
        >
          {isComplete ? (
            <Confirmation />
          ) : (
            <>
              <StepIndicator currentStep={currentStep} />

              {error && (
                <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <ServiceStep
                      selected={formData.service}
                      onSelect={(service: ServiceId) =>
                        updateFormData({ service })
                      }
                    />
                  )}
                  {currentStep === 2 && formData.service && (
                    <MissionStep
                      service={formData.service}
                      data={formData.mission}
                      onChange={(mission) =>
                        updateFormData({
                          mission: { ...formData.mission, ...mission },
                        })
                      }
                    />
                  )}
                  {currentStep === 3 && (
                    <CustomerStep
                      data={formData.customer}
                      onChange={(customer) =>
                        updateFormData({
                          customer: { ...formData.customer, ...customer },
                        })
                      }
                    />
                  )}
                  {currentStep === 4 && (
                    <SchedulingStep
                      data={formData.scheduling}
                      onChange={(scheduling) =>
                        updateFormData({
                          scheduling: {
                            ...formData.scheduling,
                            ...scheduling,
                          },
                        })
                      }
                    />
                  )}
                  {currentStep === 5 && clientSecret && (
                    <PaymentStep
                      formData={formData}
                      clientSecret={clientSecret}
                      onSuccess={handlePaymentSuccess}
                      onBack={handleBack}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {currentStep < 5 && (
                <div className="mt-8 flex gap-3">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1 gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Retour
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={handleNext}
                    disabled={isLoadingPayment}
                    className="flex-[2] gap-2"
                  >
                    {isLoadingPayment ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Chargement...
                      </>
                    ) : currentStep === 4 ? (
                      <>
                        Continuer vers le paiement
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Continuer
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
