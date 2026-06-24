import { NextResponse } from "next/server";
import { getRequest, updateRequest } from "@/lib/requests-store";
import type { UpdateRequestInput } from "@/lib/requests-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const request = await getRequest(id);

  if (!request) {
    return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  }

  return NextResponse.json({ request });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const body = (await request.json()) as UpdateRequestInput;
    const updated = await updateRequest(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
    }

    return NextResponse.json({ request: updated });
  } catch {
    return NextResponse.json(
      { error: "Impossible de mettre à jour la demande." },
      { status: 500 }
    );
  }
}
