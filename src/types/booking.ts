import type { ServiceId } from "@/lib/constants";

export interface BookingFormData {
  service: ServiceId | "";
  mission: MissionDetails;
  customer: CustomerDetails;
  scheduling: SchedulingDetails;
}

export interface MissionDetails {
  // Manutention
  missionType?: string;
  itemCount?: string;
  heavyItems?: boolean;
  // Livraison
  pickupAddress?: string;
  deliveryAddress?: string;
  packageSize?: string;
  urgent?: boolean;
  // Nettoyage
  surface?: string;
  buildingType?: string;
  frequency?: string;
  // Petits travaux
  workType?: string;
  description?: string;
  photo?: File | null;
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

export const INITIAL_FORM_DATA: BookingFormData = {
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
