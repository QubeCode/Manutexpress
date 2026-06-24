import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LOCAL_AREAS } from "@/lib/seo";

export function LocalSeoSection() {
  return (
    <section
      aria-labelledby="local-seo-heading"
      className="section-padding border-t bg-white"
    >
      <div className="container-max">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            Zone d&apos;intervention
          </Badge>
          <h2
            id="local-seo-heading"
            className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl"
          >
            Votre prestataire local en Île-de-France
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Basés à <strong>Corbeil-Essonnes</strong>, nous intervenons rapidement
            à <strong>Paris</strong>, en <strong>Essonne</strong>, à{" "}
            <strong>Évry-Courcouronnes</strong> et dans les 8 départements
            d&apos;Île-de-France. Que vous ayez besoin de manutention, d&apos;une
            livraison rapide, d&apos;un nettoyage professionnel ou de petits travaux,
            MANUTEXPRESS vous répond sous 24 h.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LOCAL_AREAS.map((area) => (
            <article
              key={area.name}
              className="flex items-center justify-center rounded-xl border bg-gray-50 p-5 text-center"
            >
              <p className="text-sm leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Recherchez-vous une aide au déménagement en Essonne, une manutention à
          Paris ou un nettoyage en Île-de-France ?{" "}
          <Link href="/devis" className="font-medium text-brand-blue hover:underline">
            Demandez votre devis gratuit
          </Link>{" "}
          — sans engagement.
        </p>
      </div>
    </section>
  );
}
