import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { COMPANY } from "@/lib/constants";
import { LEGAL_ENTITY } from "@/lib/company-legal";

export const metadata: Metadata = {
  title: "Mentions légales — MANUTEXPRESS",
  description: "Mentions légales du site MANUTEXPRESS.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      updatedAt={LEGAL_ENTITY.lastUpdated}
    >
      <h2>Éditeur du site</h2>
      <p>
        Le présent site est édité par la société <strong>{LEGAL_ENTITY.name}</strong>,
        {LEGAL_ENTITY.legalForm}, au capital social de {LEGAL_ENTITY.shareCapital}.
      </p>
      <ul>
        <li>Siège social : {LEGAL_ENTITY.address}</li>
        <li>SIREN : {LEGAL_ENTITY.siren}</li>
        <li>RCS : {LEGAL_ENTITY.rcs}</li>
        <li>Numéro de TVA intracommunautaire : {LEGAL_ENTITY.vatNumber}</li>
        <li>Immatriculation : {LEGAL_ENTITY.registrationDate}</li>
        <li>Président et directeur de la publication : {LEGAL_ENTITY.president}</li>
        <li>Email : {COMPANY.email}</li>
        <li>Téléphone : {COMPANY.phone}</li>
      </ul>

      <h2>Activité</h2>
      <p>{LEGAL_ENTITY.activityDescription}</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par {LEGAL_ENTITY.hostingProvider}.
        <br />
        Adresse de l&apos;hébergeur : {LEGAL_ENTITY.hostingAddress}.
      </p>
      <p>
        <em>
          Ces informations seront complétées lors de la mise en production du
          site (ex. Vercel, OVH, etc.).
        </em>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (textes, images, graphismes, logo,
        structure) est protégé par le droit de la propriété intellectuelle.
        Toute reproduction, représentation ou exploitation, totale ou partielle,
        sans autorisation écrite préalable de {LEGAL_ENTITY.name}, est interdite.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        {LEGAL_ENTITY.name} s&apos;efforce d&apos;assurer l&apos;exactitude des
        informations diffusées sur le site. Toutefois, la société ne saurait
        être tenue responsable des omissions, inexactitudes ou indisponibilités
        temporaires du service.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Pour toute information relative au traitement de vos données
        personnelles, consultez notre{" "}
        <a href="/politique-confidentialite" className="text-brand-blue hover:underline">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>Litiges</h2>
      <p>
        Le présent site est soumis au droit français. En cas de litige, une
        solution amiable sera recherchée avant toute action judiciaire.
        À défaut, les tribunaux français seront seuls compétents.
      </p>
    </LegalPageLayout>
  );
}
