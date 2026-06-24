"use client";

import {
  Package,
  Truck,
  Sparkles,
  Wrench,
  Hammer,
  Home,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES, type ServiceId } from "@/lib/constants";
import { getPricingSummary } from "@/lib/pricing";

const ICON_MAP: Record<string, LucideIcon> = {
  Package,
  Truck,
  Sparkles,
  Wrench,
  Hammer,
  Home,
};

interface QuoteServiceStepProps {
  selected: ServiceId | "";
  onSelect: (service: ServiceId) => void;
}

export function QuoteServiceStep({ selected, onSelect }: QuoteServiceStepProps) {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold text-brand-blue">
        Choisissez votre service
      </h3>
      <p className="mb-6 text-muted-foreground">
        Décrivez votre besoin — notre équipe étudie chaque mission et vous
        envoie un devis personnalisé avant tout paiement.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => {
          const Icon = ICON_MAP[service.icon];
          const isSelected = selected === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service.id)}
              className={cn(
                "flex flex-col gap-3 rounded-xl border-2 p-5 text-left transition-all duration-200",
                isSelected
                  ? "border-brand-blue bg-brand-blue/5 shadow-brand"
                  : "border-gray-200 hover:border-brand-blue/30 hover:bg-gray-50"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                    isSelected
                      ? "bg-brand-blue text-white"
                      : "bg-gray-100 text-brand-blue"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-brand-blue">{service.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
              <p className="text-xs font-semibold text-brand-orange">
                {getPricingSummary(service.id)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
