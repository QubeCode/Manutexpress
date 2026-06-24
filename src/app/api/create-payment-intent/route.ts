import { NextResponse } from "next/server";
import { getStripe, MIN_DEPOSIT_CENTS } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, metadata } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: MIN_DEPOSIT_CENTS,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      metadata: {
        customer_name: name || "",
        ...metadata,
      },
      description: "Acompte MANUTEXPRESS - Confirmation de réservation",
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
