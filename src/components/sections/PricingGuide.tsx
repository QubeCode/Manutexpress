"use client";

import Link from "next/link";
import { BadgeEuro } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated";
import { PRICING } from "@/lib/pricing";

const PRICING_ROWS = [
  {
    service: "Manutention",
    rates: [
      `1 agent : ${PRICING.manutention.oneAgentHourly}€/h`,
      `2 agents : ${PRICING.manutention.twoAgentsHourly}€/h`,
      `Minimum : ${PRICING.manutention.minimum}€`,
    ],
    extras: [
      `Objets lourds : +${PRICING.manutention.heavyItemsFee}€`,
      `Sans ascenseur : +${PRICING.manutention.floorNoElevatorFee}€/étage`,
      `Urgence : +${PRICING.manutention.emergencyFee}€`,
    ],
  },
  {
    service: "Livraison rapide",
    rates: [
      `Base : ${PRICING.livraison.base}€`,
      `+ ${PRICING.livraison.perKm}€/km`,
    ],
    extras: [`Urgence : +${PRICING.livraison.emergencyFee}€`],
  },
  {
    service: "Nettoyage",
    rates: [
      `${PRICING.nettoyage.hourly}€/h`,
      `ou ${PRICING.nettoyage.perSqm}€/m²`,
    ],
    extras: [],
  },
  {
    service: "Petits travaux",
    rates: [`Minimum : ${PRICING.petitsTravaux.minimum}€`],
    extras: ["Bricolage, peinture, électricité et plomberie légère"],
  },
  {
    service: "Montage meubles",
    rates: [`Minimum : ${PRICING.montageMeubles.minimum}€`],
    extras: ["Cuisine, dressing, salon — montage et démontage"],
  },
  {
    service: "Assistance domicile",
    rates: [`Minimum : ${PRICING.assistanceDomicile.minimum}€`],
    extras: ["Aide au déménagement et rangement"],
  },
];

export function PricingGuide() {
  return (
    <AnimatedSection className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold text-brand-orange">
            <BadgeEuro className="h-4 w-4" />
            Tarifs transparents
          </div>
          <h2 className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl">
            Grille tarifaire
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Prix indicatifs pour estimer votre budget. Le devis final est
            validé par notre équipe avant tout paiement.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_ROWS.map((row) => (
            <div
              key={row.service}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="mb-4 font-semibold text-brand-blue">
                {row.service}
              </h3>
              <ul className="mb-4 space-y-2">
                {row.rates.map((rate) => (
                  <li
                    key={rate}
                    className="text-sm font-medium text-brand-blue"
                  >
                    {rate}
                  </li>
                ))}
              </ul>
              {row.extras.length > 0 && (
                <ul className="space-y-1 border-t pt-4">
                  {row.extras.map((extra) => (
                    <li
                      key={extra}
                      className="text-xs text-muted-foreground"
                    >
                      {extra}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 p-6 text-center">
          <p className="mb-1 text-sm font-semibold text-brand-blue">
            Acompte à la confirmation
          </p>
          <p className="text-muted-foreground">
            {PRICING.deposit.fixedAmount}€ fixe ou{" "}
            {PRICING.deposit.percentOfTotal * 100}% du montant total — solde
            réglé après la prestation.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
