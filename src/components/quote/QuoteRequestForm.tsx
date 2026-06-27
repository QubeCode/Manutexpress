"use client";

import { useState, useEffect } from "react";
import { useScrollToRefOnStepChange } from "@/hooks/useScrollToRefOnStepChange";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteStepIndicator } from "./QuoteStepIndicator";
import { QuoteServiceStep } from "./steps/QuoteServiceStep";
import { QuoteMissionStep } from "./steps/QuoteMissionStep";
import { QuoteCustomerStep } from "./steps/QuoteCustomerStep";
import { QuoteSchedulingStep } from "./steps/QuoteSchedulingStep";
import { INITIAL_QUOTE_FORM, type QuoteFormData } from "@/types/request";
import { validateQuoteStep } from "@/lib/quote-validation";
import { SERVICES, type ServiceId } from "@/lib/constants";

interface QuoteRequestFormProps {
  onSubmitted?: (firstName: string) => void;
}

export function QuoteRequestForm({ onSubmitted }: QuoteRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>(INITIAL_QUOTE_FORM);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState<string | null>(
    null
  );
  const searchParams = useSearchParams();
  const formRef = useScrollToRefOnStepChange(currentStep);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (
      serviceParam &&
      SERVICES.some((s) => s.id === serviceParam) &&
      !formData.service
    ) {
      setFormData((prev) => ({
        ...prev,
        service: serviceParam as ServiceId,
      }));
    }
  }, [searchParams, formData.service]);

  const updateFormData = (partial: Partial<QuoteFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  };

  const handleNext = () => {
    const validationError = validateQuoteStep(currentStep, formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setCurrentStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    const validationError = validateQuoteStep(4, formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!formData.service) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/quote/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: formData.service,
          mission: formData.mission,
          customer: formData.customer,
          scheduling: formData.scheduling,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'envoi de la demande.");
        return;
      }

      setSubmittedFirstName(formData.customer.firstName);
      onSubmitted?.(formData.customer.firstName);
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedFirstName) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center shadow-brand sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-brand-blue">
          Demande envoyée avec succès
        </h3>
        <p className="mb-2 text-muted-foreground">
          Merci {submittedFirstName}. Votre demande a bien été envoyée.
        </p>
        <p className="text-muted-foreground">
          Notre équipe va étudier votre besoin et reviendra vers vous
          rapidement.
        </p>
      </div>
    );
  }

  return (
    <div
      id="devis-form"
      ref={formRef}
      tabIndex={-1}
      className="scroll-mt-28 w-full max-w-full rounded-2xl border bg-white p-6 shadow-brand outline-none sm:p-8"
    >
      <QuoteStepIndicator currentStep={currentStep} />

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-full"
        >
          {currentStep === 1 && (
            <QuoteServiceStep
              selected={formData.service}
              onSelect={(service: ServiceId) => updateFormData({ service })}
            />
          )}
          {currentStep === 2 && formData.service && (
            <QuoteMissionStep
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
            <QuoteCustomerStep
              data={formData.customer}
              onChange={(customer) =>
                updateFormData({
                  customer: { ...formData.customer, ...customer },
                })
              }
            />
          )}
          {currentStep === 4 && (
            <QuoteSchedulingStep
              data={formData.scheduling}
              onChange={(scheduling) =>
                updateFormData({
                  scheduling: { ...formData.scheduling, ...scheduling },
                })
              }
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex gap-3">
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
        {currentStep < 4 ? (
          <Button
            variant="secondary"
            onClick={handleNext}
            className="flex-[2] gap-2"
          >
            Continuer
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-[2] gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer ma demande
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
