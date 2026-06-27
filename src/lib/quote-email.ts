import { COMPANY, SERVICES } from "@/lib/constants";
import {
  getEmailFrom,
  getEmailTo,
  getResend,
  isDomainVerificationError,
} from "@/lib/email/resend";
import type { QuoteNotifyPayload } from "@/lib/quote-notify-validation";
import type { MissionDetails } from "@/types/request";

const MISSION_FIELD_LABELS: Record<keyof MissionDetails, string> = {
  missionType: "Type de mission",
  itemCount: "Nombre d'éléments",
  agentCount: "Nombre d'agents",
  estimatedHours: "Durée estimée",
  heavyItems: "Objets lourds",
  floors: "Étages",
  noElevator: "Sans ascenseur",
  pickupAddress: "Adresse de départ",
  deliveryAddress: "Adresse de livraison",
  packageSize: "Taille du colis",
  distanceKm: "Distance (km)",
  urgent: "Livraison urgente",
  surface: "Surface (m²)",
  buildingType: "Type de bâtiment",
  frequency: "Fréquence",
  pricingMode: "Mode de tarification",
  workType: "Type de travaux",
  description: "Description",
  furnitureType: "Type de meuble",
  assistanceType: "Type d'assistance",
  photoFileName: "Photo jointe",
};

function formatBoolean(value: boolean): string {
  return value ? "Oui" : "Non";
}

function formatMissionValue(key: keyof MissionDetails, value: unknown): string {
  if (typeof value === "boolean") return formatBoolean(value);
  if (key === "pricingMode") {
    return value === "sqm" ? "Au m²" : value === "hourly" ? "À l'heure" : String(value);
  }
  if (key === "agentCount") {
    return value === "2" ? "2 agents" : "1 agent";
  }
  return String(value);
}

export function formatMissionDetails(mission: MissionDetails): string {
  const lines = (Object.keys(mission) as (keyof MissionDetails)[])
    .filter((key) => {
      const value = mission[key];
      return value !== undefined && value !== null && value !== "";
    })
    .map((key) => {
      const label = MISSION_FIELD_LABELS[key] ?? key;
      return `${label} : ${formatMissionValue(key, mission[key])}`;
    });

  return lines.length > 0 ? lines.join("\n") : "—";
}

function getServiceTitle(serviceId: string): string {
  return SERVICES.find((s) => s.id === serviceId)?.title ?? serviceId;
}

function formatUrgency(urgency: "urgent" | "flexible"): string {
  return urgency === "urgent" ? "Urgent" : "Flexible";
}

export function buildCustomerConfirmationEmail(payload: QuoteNotifyPayload) {
  const { customer } = payload;

  return {
    subject: "Demande bien reçue — MANUTEXPRESS",
    text: `Bonjour ${customer.firstName},

Nous confirmons la bonne réception de votre demande d'intervention.

Votre demande a bien été transmise à notre équipe.
Nous reviendrons vers vous dans les meilleurs délais afin d'étudier votre besoin et vous proposer une solution adaptée.

Pour toute urgence, vous pouvez également nous contacter directement :

• par téléphone : ${COMPANY.phone}
• ou via WhatsApp : ${COMPANY.whatsappHref}

Merci pour votre confiance.

L'équipe MANUTEXPRESS
${COMPANY.phone}
${COMPANY.email}`,
  };
}

export function buildTeamNotificationEmail(payload: QuoteNotifyPayload) {
  const { service, mission, customer, scheduling } = payload;
  const serviceTitle = getServiceTitle(service);
  const missionBlock = formatMissionDetails(mission);

  return {
    subject: `Nouveau devis — ${serviceTitle} — ${customer.firstName} ${customer.lastName}`,
    text: `NOUVELLE DEMANDE DE DEVIS

Service :
${serviceTitle}

CLIENT
Nom : ${customer.lastName}
Prénom : ${customer.firstName}
Téléphone : ${customer.phone}
Email : ${customer.email}

MISSION
${missionBlock}

PLANNING
Date : ${scheduling.date}
Horaire : ${scheduling.time}
Urgence : ${formatUrgency(scheduling.urgency)}`,
  };
}

export async function sendQuoteEmails(payload: QuoteNotifyPayload) {
  const resend = getResend();
  const from = getEmailFrom();
  const teamEmail = getEmailTo();
  const customerEmail = buildCustomerConfirmationEmail(payload);
  const teamNotification = buildTeamNotificationEmail(payload);

  const teamResult = await resend.emails.send({
    from,
    to: teamEmail,
    replyTo: payload.customer.email,
    subject: teamNotification.subject,
    text: teamNotification.text,
  });

  if (teamResult.error) {
    const msg = teamResult.error.message ?? "erreur inconnue";
    if (isDomainVerificationError(msg)) {
      throw new Error(
        "Domaine email non vérifié chez Resend. Vérifiez manutexpress.com dans le dashboard Resend, ou utilisez RESEND_SANDBOX=true avec RESEND_SANDBOX_FROM=onboarding@resend.dev en attendant."
      );
    }
    throw new Error(`Échec email équipe : ${msg}`);
  }

  const customerResult = await resend.emails.send({
    from,
    to: payload.customer.email,
    subject: customerEmail.subject,
    text: customerEmail.text,
  });

  if (customerResult.error) {
    const msg = customerResult.error.message ?? "erreur inconnue";
    if (isDomainVerificationError(msg)) {
      throw new Error(
        "Impossible d'envoyer l'email de confirmation au client : domaine non vérifié chez Resend. Vérifiez manutexpress.com dans Resend (DNS SPF/DKIM)."
      );
    }
    throw new Error(`Échec email client : ${msg}`);
  }
}
