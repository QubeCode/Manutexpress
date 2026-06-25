import type { RequestStatus, ServiceRequest } from "@/types/request";
import type { ServiceId } from "@/lib/constants";
import type {
  CustomerDetails,
  MissionDetails,
  SchedulingDetails,
} from "@/types/request";
import { readAllRequests, writeAllRequests } from "@/lib/requests-storage";

function generateId() {
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function listRequests(): Promise<ServiceRequest[]> {
  const requests = await readAllRequests();
  return requests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getRequest(id: string): Promise<ServiceRequest | null> {
  const requests = await readAllRequests();
  return requests.find((r) => r.id === id) ?? null;
}

export interface CreateRequestInput {
  service: ServiceId;
  mission: MissionDetails;
  customer: CustomerDetails;
  scheduling: SchedulingDetails;
}

export async function createRequest(
  input: CreateRequestInput
): Promise<ServiceRequest> {
  const requests = await readAllRequests();
  const now = new Date().toISOString();

  const request: ServiceRequest = {
    id: generateId(),
    createdAt: now,
    updatedAt: now,
    status: "new",
    service: input.service,
    mission: input.mission,
    customer: input.customer,
    scheduling: input.scheduling,
  };

  requests.push(request);
  await writeAllRequests(requests);
  return request;
}

export interface UpdateRequestInput {
  status?: RequestStatus;
  pricing?: {
    totalPrice: number;
    depositAmount: number;
    depositMode?: "fixed_45" | "percent_30";
    balanceDue?: number;
  };
  adminNotes?: string;
}

export async function updateRequest(
  id: string,
  input: UpdateRequestInput
): Promise<ServiceRequest | null> {
  const requests = await readAllRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const current = requests[index];
  const updated: ServiceRequest = {
    ...current,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  if (input.pricing) {
    updated.pricing = {
      ...input.pricing,
      balanceDue:
        input.pricing.balanceDue ??
        input.pricing.totalPrice - input.pricing.depositAmount,
    };
    // Auto-advance only when admin did not explicitly choose a status.
    if (input.status === undefined && updated.status !== "confirmed") {
      updated.status = "awaiting_deposit";
    }
  }

  requests[index] = updated;
  await writeAllRequests(requests);
  return updated;
}

export async function markRequestPaidByStripe(
  id: string,
  stripeSessionId: string
): Promise<ServiceRequest | null> {
  const requests = await readAllRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const current = requests[index];

  if (current.status === "confirmed") {
    return current;
  }

  if (current.status !== "awaiting_deposit" || !current.pricing) {
    return null;
  }

  const updated: ServiceRequest = {
    ...current,
    status: "confirmed",
    updatedAt: new Date().toISOString(),
    payment: {
      paidAt: new Date().toISOString(),
      stripeSessionId,
    },
  };

  requests[index] = updated;
  await writeAllRequests(requests);
  return updated;
}
