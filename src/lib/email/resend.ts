import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY manquant.");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export function getEmailFrom(): string {
  const raw = process.env.EMAIL_FROM?.trim();
  if (!raw) {
    return "MANUTEXPRESS <contact@manutexpress.com>";
  }
  if (raw.includes("<")) return raw;
  const match = raw.match(/^(.+?)\s+(\S+@\S+\.\S+)$/);
  if (match) {
    return `${match[1]} <${match[2]}>`;
  }
  return raw;
}

export function getEmailTo(): string {
  return process.env.EMAIL_TO?.trim() ?? "contact@manutexpress.com";
}
