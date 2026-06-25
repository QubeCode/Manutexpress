import { SERVICES, type ServiceId } from "@/lib/constants";
import { validateQuoteStep } from "@/lib/quote-validation";
import type {
  CustomerDetails,
  MissionDetails,
  QuoteFormData,
  SchedulingDetails,
} from "@/types/request";

export interface QuoteNotifyPayload {
  service: ServiceId;
  mission: MissionDetails;
  customer: CustomerDetails;
  scheduling: SchedulingDetails;
}

export function validateQuoteNotifyPayload(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return "Données invalides.";
  }

  const data = body as Partial<QuoteNotifyPayload>;

  if (!data.service || !SERVICES.some((s) => s.id === data.service)) {
    return "Service invalide.";
  }

  if (!data.mission || !data.customer || !data.scheduling) {
    return "Données de demande incomplètes.";
  }

  const formData: QuoteFormData = {
    service: data.service,
    mission: data.mission,
    customer: data.customer,
    scheduling: data.scheduling,
  };

  for (let step = 1; step <= 4; step++) {
    const error = validateQuoteStep(step, formData);
    if (error) return error;
  }

  return null;
}
