"use client";

import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { COMPANY } from "@/lib/constants";

const COVERAGE_AREAS = [
  { name: "Paris", code: "75" },
  { name: "Seine-et-Marne", code: "77" },
  { name: "Yvelines", code: "78" },
  { name: "Essonne", code: "91" },
  { name: "Hauts-de-Seine", code: "92" },
  { name: "Seine-Saint-Denis", code: "93" },
  { name: "Val-de-Marne", code: "94" },
  { name: "Val-d'Oise", code: "95" },
] as const;

/** OpenStreetMap embed — Île-de-France bbox, marker on siège Corbeil-Essonnes */
const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=1.4460%2C48.1200%2C3.5600%2C49.2410&layer=mapnik&marker=48.6104%2C2.4821";

export function CoverageMap() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-brand-orange" />
        <h3 className="font-semibold text-brand-blue">
          Zone d&apos;intervention — Île-de-France
        </h3>
      </div>

      <div className="relative mb-4 overflow-hidden rounded-xl border bg-gray-50">
        <iframe
          title="Carte zone d'intervention MANUTEXPRESS — Île-de-France"
          src={MAP_EMBED_URL}
          className="aspect-[4/3] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-2 text-xs shadow-sm">
          <p className="font-semibold text-brand-blue">Siège — {COMPANY.city}</p>
          <p className="text-muted-foreground">{COMPANY.addressLine1}</p>
        </div>
      </div>

      <p className="mb-3 text-sm text-muted-foreground">
        Intervention rapide dans les 8 départements d&apos;Île-de-France.
      </p>

      <div className="flex flex-wrap gap-2">
        {COVERAGE_AREAS.map((area) => (
          <Badge key={area.code} variant="outline" className="text-xs">
            {area.name} ({area.code})
          </Badge>
        ))}
      </div>
    </div>
  );
}
