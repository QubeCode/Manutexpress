import type { ServiceId } from "@/lib/constants";

export type RequestStatus =
  | "new"
  | "reviewed"
  | "awaiting_deposit"
  | "confirmed";

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

export interface RequestPricing {
  totalPrice: number;
  depositAmount: number;
  depositMode?: "fixed_45" | "percent_30";
  balanceDue?: number;
}

export interface ServiceRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: RequestStatus;
  service: ServiceId;
  mission: MissionDetails;
  customer: CustomerDetails;
  scheduling: SchedulingDetails;
  pricing?: RequestPricing;
  payment?: {
    paidAt: string;
    stripeSessionId?: string;
  };
  adminNotes?: string;
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

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  new: "Nouvelle",
  reviewed: "Examinée",
  awaiting_deposit: "Acompte en attente",
  confirmed: "Confirmée",
};

export const REQUEST_STATUS_COLORS: Record<RequestStatus, string> = {
  new: "bg-blue-100 text-brand-blue",
  reviewed: "bg-amber-100 text-amber-800",
  awaiting_deposit: "bg-orange-100 text-brand-orange",
  confirmed: "bg-green-100 text-green-800",
};
