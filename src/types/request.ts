import type { ServiceId } from "@/lib/constants";

export interface MissionDetails {
  missionType?: string;
  itemCount?: string;
  agentCount?: "1" | "2";
  estimatedHours?: string;
  heavyItems?: boolean;
  floors?: string;
  noElevator?: boolean;
  pickupAddress?: string;
  deliveryAddress?: string;
  packageSize?: string;
  distanceKm?: string;
  urgent?: boolean;
  surface?: string;
  buildingType?: string;
  frequency?: string;
  pricingMode?: "hourly" | "sqm";
  workType?: string;
  description?: string;
  furnitureType?: string;
  assistanceType?: string;
  photoFileName?: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface SchedulingDetails {
  date: string;
  time: string;
  urgency: "urgent" | "flexible";
}

export interface QuoteFormData {
  service: ServiceId | "";
  mission: MissionDetails;
  customer: CustomerDetails;
  scheduling: SchedulingDetails;
}

export const INITIAL_QUOTE_FORM: QuoteFormData = {
  service: "",
  mission: {},
  customer: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    acceptTerms: false,
    acceptPrivacy: false,
  },
  scheduling: {
    date: "",
    time: "",
    urgency: "flexible",
  },
};
