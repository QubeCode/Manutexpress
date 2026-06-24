import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { COMPANY } from "@/lib/constants";
import { LEGAL_ENTITY } from "@/lib/company-legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité — MANUTEXPRESS",
  description:
    "Politique de confidentialité et protection des données personnelles (RGPD).",
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      updatedAt={LEGAL_ENTITY.lastUpdated}
    >
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles est{" "}
        <strong>{LEGAL_ENTITY.name}</strong>, {LEGAL_ENTITY.legalForm},
        dont le siège social est situé {LEGAL_ENTITY.address}.
      </p>
      <p>
        Contact : {COMPANY.email} — {COMPANY.phone}
        <br />
        Délégué à la protection des données (DPO) : {LEGAL_ENTITY.dpoEmail}
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons les données suivantes dans le cadre de nos services :</p>
      <ul>
        <li>Identité : nom, prénom</li>
        <li>Coordonnées : email, téléphone, adresse d&apos;intervention</li>
        <li>Données de mission : type de service, description, date souhaitée</li>
        <li>Données de paiement : traitées par Stripe (nous ne stockons pas vos coordonnées bancaires)</li>
        <li>Données techniques : logs, adresse IP, cookies (voir politique cookies)</li>
      </ul>

      <h2>3. Finalités et bases légales</h2>
      <ul>
        <li>Traitement de votre demande de devis ou réservation (exécution du contrat)</li>
        <li>Gestion des interventions et facturation (obligation légale et contractuelle)</li>
        <li>Paiement sécurisé de l&apos;acompte via Stripe (exécution du contrat)</li>
        <li>Support client et suivi commercial (intérêt légitime)</li>
        <li>Respect des obligations comptables et fiscales (obligation légale)</li>
      </ul>

      <h2>4. Destinataires des données</h2>
      <p>Vos données peuvent être communiquées à :</p>
      <ul>
        <li>Le personnel habilité de {LEGAL_ENTITY.name}</li>
        <li>Stripe Payments Europe Ltd. (paiement en ligne)</li>
        <li>Notre hébergeur et prestataires techniques</li>
        <li>Les autorités compétentes sur réquisition légale</li>
      </ul>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li>Données de contact et de mission : 3 ans après le dernier contact</li>
        <li>Données comptables et facturation : 10 ans (obligation légale)</li>
        <li>Données de paiement : selon les durées imposées par Stripe et la réglementation</li>
        <li>Cookies : voir notre politique cookies</li>
      </ul>

      <h2>6. Vos droits (RGPD)</h2>
      <p>
        Conformément au Règlement (UE) 2016/679 et à la loi Informatique et
        Libertés, vous disposez des droits suivants :
      </p>
      <ul>
        <li>Droit d&apos;accès, de rectification et d&apos;effacement</li>
        <li>Droit à la limitation et à l&apos;opposition du traitement</li>
        <li>Droit à la portabilité des données</li>
        <li>Droit de retirer votre consentement à tout moment</li>
        <li>Droit de définir des directives relatives au sort de vos données après votre décès</li>
      </ul>
      <p>
        Pour exercer vos droits : {COMPANY.email} ou courrier à{" "}
        {LEGAL_ENTITY.address}, en joignant une copie d&apos;un justificatif
        d&apos;identité.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la CNIL
        (www.cnil.fr).
      </p>

      <h2>7. Sécurité</h2>
      <p>
        {LEGAL_ENTITY.name} met en œuvre des mesures techniques et
        organisationnelles appropriées pour protéger vos données contre tout
        accès non autorisé, perte ou altération. Les paiements sont sécurisés
        par Stripe (certifié PCI-DSS).
      </p>

      <h2>8. Transferts hors UE</h2>
      <p>
        Certains prestataires (notamment Stripe) peuvent traiter des données
        hors de l&apos;Union européenne, dans le cadre de garanties appropriées
        (clauses contractuelles types, décisions d&apos;adéquation).
      </p>
    </LegalPageLayout>
  );
}
