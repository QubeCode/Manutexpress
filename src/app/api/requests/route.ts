import { NextResponse } from "next/server";
import { createRequest, listRequests } from "@/lib/requests-store";
import type { CreateRequestInput } from "@/lib/requests-store";

export async function GET() {
  const requests = await listRequests();
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateRequestInput;

    if (!body.service || !body.customer || !body.scheduling || !body.mission) {
      return NextResponse.json(
        { error: "Données de demande incomplètes." },
        { status: 400 }
      );
    }

    const created = await createRequest(body);
    return NextResponse.json({ request: created }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer la demande." },
      { status: 500 }
    );
  }
}
