import { Resend } from "resend";

let resendClient: Resend | null = null;

function stripEnvQuotes(value: string | undefined): string | undefined {
  if (!value) return value;
  let v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

export function getResend(): Resend {
  if (!resendClient) {
    const apiKey = stripEnvQuotes(process.env.RESEND_API_KEY);
    if (!apiKey) {
      throw new Error("RESEND_API_KEY manquant.");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function formatFromAddress(name: string, email: string): string {
  return `${name} <${email}>`;
}

export function getEmailFrom(): string {
  const sandboxFrom = stripEnvQuotes(process.env.RESEND_SANDBOX_FROM);
  if (process.env.RESEND_SANDBOX === "true" && sandboxFrom) {
    return sandboxFrom.includes("<")
      ? sandboxFrom
      : formatFromAddress("MANUTEXPRESS", sandboxFrom);
  }

  const raw = stripEnvQuotes(process.env.EMAIL_FROM);
  if (!raw) {
    return formatFromAddress("MANUTEXPRESS", "contact@manutexpress.com");
  }
  if (raw.includes("<")) return raw;

  const match = raw.match(/^(.+?)\s+(\S+@\S+\.\S+)$/);
  if (match) {
    return formatFromAddress(match[1], match[2]);
  }

  if (raw.includes("@")) {
    return formatFromAddress("MANUTEXPRESS", raw);
  }

  return raw;
}

export function getEmailTo(): string {
  return stripEnvQuotes(process.env.EMAIL_TO) ?? "contact@manutexpress.com";
}

export function getResendErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Erreur inconnue lors de l'envoi email.";
}

export function isDomainVerificationError(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("verify") ||
    lower.includes("domain") ||
    lower.includes("not authorized") ||
    lower.includes("testing emails")
  );
}
