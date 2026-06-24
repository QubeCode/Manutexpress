import { NextResponse } from "next/server";
import { markRequestPaidByStripe } from "@/lib/requests-store";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session de paiement invalide." },
      { status: 400 }
    );
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Le paiement n'a pas été confirmé." },
        { status: 400 }
      );
    }

    const requestId = session.metadata?.requestId;
    if (!requestId) {
      return NextResponse.json(
        { error: "Demande associée introuvable." },
        { status: 400 }
      );
    }

    const updated = await markRequestPaidByStripe(requestId, session.id);

    if (!updated) {
      return NextResponse.json(
        { error: "Impossible de confirmer la demande." },
        { status: 400 }
      );
    }

    return NextResponse.json({ request: updated });
  } catch (error) {
    console.error("Checkout verify error:", error);
    return NextResponse.json(
      { error: "Erreur de vérification du paiement." },
      { status: 500 }
    );
  }
}
