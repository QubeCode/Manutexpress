"use client";

import {
  Zap,
  ShieldCheck,
  BadgeEuro,
  CalendarClock,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TrustBar } from "@/components/brand/TrustBar";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated";
import { ADVANTAGES } from "@/lib/constants";

const ADVANTAGE_ICONS = {
  Zap,
  ShieldCheck,
  BadgeEuro,
  CalendarClock,
  MapPin,
} as const;

export function WhyUs() {
  return (
    <AnimatedSection
      id="pourquoi-nous"
      className="section-padding bg-gray-50"
    >
      <div className="container-max">
        <div className="mb-12 text-center">
          <Badge className="mb-4">Pourquoi nous choisir</Badge>
          <h2 className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl">
            La rapidité et la fiabilité au service de vos projets
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            MANUTEXPRESS combine réactivité, professionnalisme et tarifs
            transparents pour répondre à toutes vos urgences.
          </p>
        </div>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage, index) => {
            const Icon =
              ADVANTAGE_ICONS[
                advantage.icon as keyof typeof ADVANTAGE_ICONS
              ];

            return (
              <StaggerItem key={advantage.title}>
                <div
                  className={`rounded-2xl p-6 transition-all duration-300 hover:shadow-brand ${
                    index === 0
                      ? "bg-brand-blue text-white"
                      : "bg-white"
                  }`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                      index === 0
                        ? "bg-white/15 text-brand-orange"
                        : "bg-brand-blue/10 text-brand-blue"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3
                    className={`mb-2 text-lg font-semibold ${
                      index === 0 ? "text-white" : "text-brand-blue"
                    }`}
                  >
                    {advantage.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      index === 0 ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {advantage.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
          <TrustBar theme="light" />
        </div>

        <div className="mt-8 rounded-2xl bg-brand-orange p-8 text-center text-white sm:p-12">
          <h3 className="mb-2 text-2xl font-bold sm:text-3xl">
            Prêt à démarrer votre mission ?
          </h3>
          <p className="mb-6 text-white/90">
            Réservez en ligne et confirmez avec un acompte de 45€ seulement.
          </p>
          <a
            href="/devis"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-brand-orange transition-transform hover:scale-105"
          >
            Demander un devis
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
