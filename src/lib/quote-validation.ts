import type { QuoteFormData } from "@/types/request";

export function validateQuoteStep(
  step: number,
  data: QuoteFormData
): string | null {
  switch (step) {
    case 1:
      if (!data.service) return "Veuillez sélectionner un service.";
      return null;
    case 2: {
      const { mission, service } = data;
      if (service === "manutention") {
        if (
          !mission.missionType ||
          !mission.itemCount ||
          !mission.floors ||
          !mission.agentCount
        )
          return "Veuillez remplir tous les champs obligatoires.";
      } else if (service === "livraison") {
        if (
          !mission.pickupAddress ||
          !mission.deliveryAddress ||
          !mission.packageSize
        )
          return "Veuillez remplir tous les champs obligatoires.";
      } else if (service === "nettoyage") {
        if (!mission.buildingType || !mission.frequency || !mission.pricingMode)
          return "Veuillez remplir tous les champs obligatoires.";
        if (mission.pricingMode === "sqm" && !mission.surface)
          return "Indiquez la surface en m².";
        if (mission.pricingMode === "hourly" && !mission.estimatedHours)
          return "Indiquez la durée estimée.";
      } else if (service === "petits-travaux") {
        if (!mission.workType || !mission.description)
          return "Veuillez remplir tous les champs obligatoires.";
      } else if (service === "montage-meubles") {
        if (!mission.furnitureType || !mission.itemCount || !mission.description)
          return "Veuillez remplir tous les champs obligatoires.";
      } else if (service === "assistance-domicile") {
        if (!mission.assistanceType || !mission.description)
          return "Veuillez remplir tous les champs obligatoires.";
      }
      return null;
    }
    case 3: {
      const { customer } = data;
      if (
        !customer.firstName ||
        !customer.lastName ||
        !customer.phone ||
        !customer.email
      )
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
