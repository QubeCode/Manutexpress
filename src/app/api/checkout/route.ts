import { NextResponse } from "next/server";
import { getRequest } from "@/lib/requests-store";
import { SERVICES } from "@/lib/constants";
import {
  eurosToCents,
  getAppUrl,
  getStripe,
  MIN_DEPOSIT_CENTS,
} from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { requestId } = (await request.json()) as { requestId?: string };

    if (!requestId) {
      return NextResponse.json(
        { error: "Identifiant de demande requis." },
        { status: 400 }
      );
    }

    const serviceRequest = await getRequest(requestId);

    if (!serviceRequest) {
      return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
    }

    if (serviceRequest.status !== "awaiting_deposit" || !serviceRequest.pricing) {
      return NextResponse.json(
        { error: "Cette demande n'est pas prête pour le paiement." },
        { status: 400 }
      );
    }

    const depositCents = eurosToCents(serviceRequest.pricing.depositAmount);

    if (depositCents < MIN_DEPOSIT_CENTS) {
      return NextResponse.json(
        { error: "L'acompte minimum est de 45 €." },
        { status: 400 }
      );
    }

    const appUrl = getAppUrl(request);
    const serviceTitle =
      SERVICES.find((s) => s.id === serviceRequest.service)?.title ??
      serviceRequest.service;

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: serviceRequest.customer.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: depositCents,
            product_data: {
              name: "Acompte MANUTEXPRESS",
              description: `${serviceTitle} — Réf. ${serviceRequest.id}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        requestId: serviceRequest.id,
        service: serviceRequest.service,
        totalPrice: String(serviceRequest.pricing.totalPrice),
        depositAmount: String(serviceRequest.pricing.depositAmount),
      },
      success_url: `${appUrl}/success?id=${serviceRequest.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment?id=${serviceRequest.id}`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session de paiement." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement Stripe." },
      { status: 500 }
    );
  }
}
