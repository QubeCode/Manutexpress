import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { COMPANY } from "@/lib/constants";
import { SEO_BRAND } from "@/lib/seo-config";

export function BrandSeoSection() {
  return (
    <section
      aria-labelledby="brand-seo-heading"
      className="section-padding border-t bg-gray-50"
    >
      <div className="container-max">
        <div className="mx-auto max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            À propos de {SEO_BRAND.name}
          </Badge>
          <h2
            id="brand-seo-heading"
            className="mb-6 text-2xl font-bold text-brand-blue sm:text-3xl"
          >
            MANUTEXPRESS — entreprise de manutention à Paris et en Île-de-France
          </h2>

          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-brand-blue">MANUTEXPRESS</strong> (
              {SEO_BRAND.domain}) est votre entreprise locale de{" "}
              <strong>manutention à Paris</strong> et dans toute l&apos;Île-de-France.
              Que vous recherchiez «&nbsp;manutexpress&nbsp;», «&nbsp;manut
              express&nbsp;» ou une{" "}
              <strong>entreprise manutention Paris</strong>, vous accédez ici à
              l&apos;ensemble de nos prestations et à notre formulaire de{" "}
              <Link href="/devis" className="font-medium text-brand-blue hover:underline">
                devis gratuit
              </Link>
              .
            </p>

            <p>
              Basés à Corbeil-Essonnes (Essonne), nous intervenons rapidement à
              Paris intra-muros, en petite couronne et dans les 8 départements
              d&apos;Île-de-France. Notre équipe prend en charge la{" "}
              <strong>manutention ponctuelle</strong>, l&apos;
              <strong>aide au déménagement</strong>, le{" "}
              <strong>montage de meubles</strong>,
              la livraison, le nettoyage et les petits travaux. Chaque mission
              est étudiée individuellement : pas de tarif automatique, mais un
              devis personnalisé adapté à votre situation.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-brand-blue">
              Des services pensés pour les particuliers et les professionnels
            </h3>
            <p>
              MANUTEXPRESS accompagne les déménagements partiels, le transport
              d&apos;objets lourds, la manutention en étage sans ascenseur, le
              déchargement de camions et les interventions urgentes sous 24 h.
              Nos agents qualifiés et assurés interviennent avec le matériel
              adapté, en respectant vos délais et votre budget.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-brand-blue">
              Manutention rapide Paris — devis sous 24 h
            </h3>
            <p>
              Pour toute demande de <strong>manutention rapide à Paris</strong>{" "}
              ou en Essonne, contactez-nous par téléphone au{" "}
              <a href={COMPANY.phoneHref} className="font-medium text-brand-blue hover:underline">
                {COMPANY.phone}
              </a>
              , par email à{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-medium text-brand-blue hover:underline"
              >
                {COMPANY.email}
              </a>{" "}
              ou via WhatsApp. Nous confirmons la réception de votre demande et
              revenons vers vous rapidement avec une proposition claire, sans
              engagement.
            </p>

            <p>
              MANUTEXPRESS, c&apos;est un interlocuteur unique pour vos besoins
              de <strong>manutention ile de france</strong> : réactivité,
              transparence tarifaire et suivi humain à chaque étape. Découvrez
              nos{" "}
              <Link href="/services" className="font-medium text-brand-blue hover:underline">
                services détaillés
              </Link>{" "}
              ou demandez votre devis dès maintenant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
