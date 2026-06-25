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
    return NextResponse.json(
      { error: "Impossible d'enregistrer la demande." },
      { status: 500 }
    );
  }
}
