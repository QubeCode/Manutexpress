import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/** @deprecated Use Stripe Checkout via POST /api/checkout */
export async function POST(_request: Request, { params }: RouteParams) {
  await params;
  return NextResponse.json(
    { error: "Utilisez Stripe Checkout pour payer l'acompte." },
    { status: 410 }
  );
}
