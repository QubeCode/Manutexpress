import type { MissionDetails, SchedulingDetails } from "@/types/request";
import type { ServiceId } from "@/lib/constants";

export const PRICING = {
  manutention: {
    oneAgentHourly: 45,
    twoAgentsHourly: 80,
    minimum: 45,
    heavyItemsFee: 15,
    floorNoElevatorFee: 10,
    emergencyFee: 20,
  },
  livraison: {
    base: 45,
    perKm: 1.5,
    emergencyFee: 20,
  },
  nettoyage: {
    hourly: 35,
    perSqm: 4,
  },
  petitsTravaux: { minimum: 45 },
  montageMeubles: { minimum: 45 },
  assistanceDomicile: { minimum: 45 },
  deposit: {
    fixedAmount: 45,
    percentOfTotal: 0.3,
  },
} as const;

export type DepositMode = "fixed_45" | "percent_30";

export interface PriceBreakdownLine {
  label: string;
  amount: number;
}

export interface PriceEstimate {
  suggestedTotal: number;
  breakdown: PriceBreakdownLine[];
  depositFixed: number;
  depositPercent: number;
}

function parseFloors(floors?: string): number {
  if (!floors || floors === "rdc") return 0;
  if (floors === "4+") return 4;
  return Number.parseInt(floors, 10) || 0;
}

export function calculateDeposit(
  totalPrice: number,
  mode: DepositMode
): number {
  if (mode === "fixed_45") return PRICING.deposit.fixedAmount;
  return Math.max(
    PRICING.deposit.fixedAmount,
    Math.round(totalPrice * PRICING.deposit.percentOfTotal)
  );
}

export function estimateRequestPrice(
  service: ServiceId,
  mission: MissionDetails,
  scheduling: SchedulingDetails
): PriceEstimate {
  const breakdown: PriceBreakdownLine[] = [];
  let total = 0;
  const isUrgent =
    scheduling.urgency === "urgent" || mission.urgent === true;

  switch (service) {
    case "manutention": {
      const hours = Math.max(1, Number(mission.estimatedHours) || 1);
      const agents = mission.agentCount === "2" ? 2 : 1;
      const hourly =
        agents === 2
          ? PRICING.manutention.twoAgentsHourly
          : PRICING.manutention.oneAgentHourly;
      const labor = hourly * hours;
      breakdown.push({
        label: `${agents} agent${agents > 1 ? "s" : ""} × ${hours}h`,
        amount: labor,
      });
      total += labor;

      if (mission.heavyItems) {
        breakdown.push({
          label: "Objets lourds",
          amount: PRICING.manutention.heavyItemsFee,
        });
        total += PRICING.manutention.heavyItemsFee;
      }

      const floors = parseFloors(mission.floors);
      if (floors > 0 && mission.noElevator) {
        const floorFee = floors * PRICING.manutention.floorNoElevatorFee;
        breakdown.push({
          label: `Étages sans ascenseur (${floors})`,
          amount: floorFee,
        });
        total += floorFee;
      }

      if (isUrgent) {
        breakdown.push({
          label: "Urgence",
          amount: PRICING.manutention.emergencyFee,
        });
        total += PRICING.manutention.emergencyFee;
      }

      total = Math.max(total, PRICING.manutention.minimum);
      break;
    }

    case "livraison": {
      breakdown.push({ label: "Forfait de base", amount: PRICING.livraison.base });
      total += PRICING.livraison.base;

      const km = Number(mission.distanceKm) || 10;
      const kmFee = Math.round(km * PRICING.livraison.perKm * 100) / 100;
      breakdown.push({ label: `Distance (${km} km)`, amount: kmFee });
      total += kmFee;

      if (isUrgent) {
        breakdown.push({
          label: "Urgence",
          amount: PRICING.livraison.emergencyFee,
        });
        total += PRICING.livraison.emergencyFee;
      }
      break;
    }

    case "nettoyage": {
      if (mission.pricingMode === "sqm") {
        const sqm = Number(mission.surface) || 20;
        const fee = sqm * PRICING.nettoyage.perSqm;
        breakdown.push({ label: `${sqm} m² × ${PRICING.nettoyage.perSqm}€`, amount: fee });
        total += fee;
      } else {
        const hours = Math.max(2, Number(mission.estimatedHours) || 2);
        const fee = hours * PRICING.nettoyage.hourly;
        breakdown.push({
          label: `${hours}h × ${PRICING.nettoyage.hourly}€`,
          amount: fee,
        });
        total += fee;
      }
      break;
    }

    case "petits-travaux":
    case "montage-meubles":
    case "assistance-domicile": {
      const min =
        service === "petits-travaux"
          ? PRICING.petitsTravaux.minimum
          : service === "montage-meubles"
            ? PRICING.montageMeubles.minimum
            : PRICING.assistanceDomicile.minimum;
      breakdown.push({ label: "Forfait minimum (devis personnalisé)", amount: min });
      total = min;
      if (mission.estimatedHours) {
        const extra = Number(mission.estimatedHours) * 35;
        breakdown.push({ label: "Estimation complémentaire", amount: extra });
        total += extra;
      }
      break;
    }
  }

  total = Math.round(total * 100) / 100;

  return {
    suggestedTotal: total,
    breakdown,
    depositFixed: calculateDeposit(total, "fixed_45"),
    depositPercent: calculateDeposit(total, "percent_30"),
  };
}

export function getPricingSummary(serviceId: ServiceId): string {
  const summaries: Record<ServiceId, string> = {
    manutention: "45€/h (1 agent) • 80€/h (2 agents) • min. 45€",
    livraison: "45€ + 1,50€/km",
    nettoyage: "35€/h ou 4€/m²",
    "petits-travaux": "À partir de 45€ — devis sur mesure",
    "montage-meubles": "À partir de 45€ — devis sur mesure",
    "assistance-domicile": "À partir de 45€ — devis sur mesure",
  };
  return summaries[serviceId];
}
