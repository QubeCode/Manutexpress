"use client";

import Link from "next/link";
import { ArrowRight, FileText, Search, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated";

const STEPS = [
  {
    icon: FileText,
    title: "1. Vous décrivez votre besoin",
    description:
      "Remplissez le formulaire en ligne : service, détails de mission, coordonnées et planning souhaité.",
  },
  {
    icon: Search,
    title: "2. Nous étudions votre demande",
    description:
      "Notre équipe analyse la mission, la localisation, l'urgence et les ressources nécessaires.",
  },
  {
    icon: CreditCard,
    title: "3. Vous payez l'acompte",
    description:
      "Après validation du devis, vous recevez un lien sécurisé pour confirmer par un acompte.",
  },
  {
    icon: CheckCircle2,
    title: "4. Intervention confirmée",
    description:
      "Une fois l'acompte reçu, votre mission est planifiée et un agent vous contacte.",
  },
];

export function WorkflowSection() {
  return (
    <AnimatedSection className="section-padding bg-white">
      <div className="container-max">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl">
            Comment ça fonctionne ?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Pas de réservation instantanée : chaque mission est étudiée pour
            vous proposer un tarif juste et adapté.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border bg-gray-50 p-6 transition-shadow hover:shadow-brand"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-brand-blue">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/devis">
            <Button variant="secondary" size="lg" className="gap-2">
              Démarrer ma demande
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
