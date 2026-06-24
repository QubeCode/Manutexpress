import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { COMPANY } from "@/lib/constants";
import { LEGAL_ENTITY } from "@/lib/company-legal";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — MANUTEXPRESS",
  description: "CGV applicables aux prestations et réservations MANUTEXPRESS.",
  robots: { index: true, follow: true },
};

export default function CgvPage() {
  return (
    <LegalPageLayout title="Conditions Générales de Vente" updatedAt={LEGAL_ENTITY.lastUpdated}>
      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales de Vente (CGV) régissent les
        relations contractuelles entre la société <strong>{LEGAL_ENTITY.name}</strong>,
        {LEGAL_ENTITY.legalForm}, immatriculée au {LEGAL_ENTITY.rcs},
        dont le siège est {LEGAL_ENTITY.address} (ci-après « le Prestataire »),
        et toute personne physique ou morale commandant une prestation via le
        site internet ou par tout autre moyen (ci-après « le Client »).
      </p>

      <h2>2. Prestations proposées</h2>
      <p>Le Prestataire propose notamment :</p>
      <ul>
        <li>Manutention légère</li>
        <li>Livraison rapide</li>
        <li>Nettoyage courant de locaux</li>
        <li>Petits travaux de bricolage et assistance ponctuelle</li>
      </ul>
      <p>
        Les prestations sont réalisées en Île-de-France, pour des clients
        particuliers et professionnels, dans le cadre de services à la personne
        le cas échéant.
      </p>

      <h2>3. Devis et commande</h2>
      <p>
        Toute demande effectuée via le formulaire en ligne constitue une
        demande de devis ou de réservation. Le contrat n&apos;est définitif
        qu&apos;après confirmation écrite ou téléphonique par le Prestataire,
        précisant le tarif, la date et les conditions d&apos;intervention.
      </p>
      <p>
        Le Client s&apos;engage à fournir des informations exactes et
        complètes (adresse, accès, nature de la mission, contraintes particulières).
      </p>

      <h2>4. Tarifs et paiement</h2>
      <ul>
        <li>Les tarifs affichés sont indicatifs (« à partir de 45 € » ou « sur devis »).</li>
        <li>
          Un acompte de <strong>45 € TTC</strong> peut être exigé lors de la
          réservation en ligne pour confirmer la mission. Ce montant est
          déduit du prix total de la prestation.
        </li>
        <li>Le solde est payable à l&apos;issue de l&apos;intervention selon les modalités convenues.</li>
        <li>Les paiements en ligne sont traités de manière sécurisée par Stripe.</li>
        <li>En cas de prestation B2B, des conditions particulières peuvent s&apos;appliquer.</li>
      </ul>

      <h2>5. Annulation et modification</h2>
      <ul>
        <li>
          Annulation par le Client plus de 24 h avant l&apos;intervention :
          l&apos;acompte peut être reporté ou remboursé selon accord.
        </li>
        <li>
          Annulation moins de 24 h avant ou en cas de non-présentation :
          l&apos;acompte peut être conservé à titre de dédommagement.
        </li>
        <li>
          Le Prestataire se réserve le droit d&apos;annuler ou reporter une
          intervention en cas de force majeure, avec remboursement de l&apos;acompte le cas échéant.
        </li>
      </ul>

      <h2>6. Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L221-28 du Code de la consommation, le
        droit de rétractation de 14 jours ne s&apos;applique pas notamment aux
        prestations de services dont l&apos;exécution a commencé, avec l&apos;accord
        du consommateur, avant la fin du délai de rétractation, ni aux
        prestations de services à la personne.
      </p>
      <p>
        Toute demande d&apos;annulation doit être adressée à {COMPANY.email}
        ou {COMPANY.phone}.
      </p>

      <h2>7. Obligations du Client</h2>
      <ul>
        <li>Assurer un accès libre et sécurisé au lieu d&apos;intervention</li>
        <li>Signaler tout risque particulier (objets fragiles, animaux, contraintes d&apos;accès)</li>
        <li>Être présent ou désigner un représentant lors de l&apos;intervention</li>
      </ul>

      <h2>8. Responsabilité</h2>
      <p>
        Le Prestataire est couvert par une assurance responsabilité civile
        professionnelle. Sa responsabilité est limitée au montant de la
        prestation facturée, sauf faute lourde ou dolosive. Le Client est
        responsable de la déclaration de tout dommage constaté lors de
        l&apos;intervention.
      </p>

      <h2>9. Réclamations et médiation</h2>
      <p>
        Toute réclamation doit être adressée par écrit à {COMPANY.email} ou
        à {LEGAL_ENTITY.address}, dans un délai de 30 jours suivant
        l&apos;intervention.
      </p>
      <p>
        Conformément aux articles L612-1 et suivants du Code de la
        consommation, le Client consommateur peut recourir gratuitement à un
        médiateur de la consommation en vue de la résolution amiable du litige.
        Les coordonnées du médiateur seront communiquées sur demande et
        figurent sur la facture. Vous pouvez également consulter le site
        officiel :{" "}
        <a
          href="https://www.economie.gouv.fr/particuliers/mediation-conso"
          className="text-brand-blue hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          economie.gouv.fr/mediation-conso
        </a>
        .
      </p>

      <h2>10. Données personnelles</h2>
      <p>
        Les données collectées sont traitées conformément à notre{" "}
        <a href="/politique-confidentialite" className="text-brand-blue hover:underline">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>11. Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige
        non résolu à l&apos;amiable, compétence est attribuée aux tribunaux
        du ressort du siège social du Prestataire, sous réserve des règles
        d&apos;ordre public protectrices du consommateur.
      </p>
    </LegalPageLayout>
  );
}
