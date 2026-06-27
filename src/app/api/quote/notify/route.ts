import { NextResponse } from "next/server";
import { sendQuoteEmails } from "@/lib/quote-email";
import {
  validateQuoteNotifyPayload,
  type QuoteNotifyPayload,
} from "@/lib/quote-notify-validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteNotifyPayload;
    const validationError = validateQuoteNotifyPayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    await sendQuoteEmails(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[POST /api/quote/notify]", error);
    const detail =
      error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi.";
    const clientMessage =
      process.env.NODE_ENV === "development"
        ? detail
        : detail.includes("Domaine email") || detail.includes("domaine non vérifié")
          ? "Envoi email temporairement indisponible. Contactez-nous par téléphone ou WhatsApp."
          : "Impossible d'enregistrer la demande.";

    return NextResponse.json({ error: clientMessage }, { status: 500 });
  }
}
