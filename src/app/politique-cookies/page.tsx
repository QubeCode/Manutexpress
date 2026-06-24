import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { COMPANY } from "@/lib/constants";
import { LEGAL_ENTITY } from "@/lib/company-legal";

export const metadata: Metadata = {
  title: "Politique de cookies — MANUTEXPRESS",
  description: "Informations sur l'utilisation des cookies sur le site MANUTEXPRESS.",
  robots: { index: true, follow: true },
};

export default function PolitiqueCookiesPage() {
  return (
    <LegalPageLayout title="Politique de cookies" updatedAt={LEGAL_ENTITY.lastUpdated}>
      <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre terminal
        (ordinateur, tablette, smartphone) lors de la consultation d&apos;un
        site internet.
      </p>

      <h2>2. Cookies utilisés sur ce site</h2>
      <p>Nous utilisons les catégories de cookies suivantes :</p>

      <h2>Cookies strictement nécessaires</h2>
      <p>
        Indispensables au fonctionnement du site (réservation, session,
        sécurité). Ils ne nécessitent pas votre consentement préalable.
      </p>

      <h2>Cookies de paiement (Stripe)</h2>
      <p>
        Lors d&apos;un paiement en ligne, Stripe peut déposer des cookies
        techniques pour sécuriser la transaction et lutter contre la fraude.
        Pour plus d&apos;informations :{" "}
        <a
          href="https://stripe.com/fr/privacy"
          className="text-brand-blue hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          politique de confidentialité Stripe
        </a>
        .
      </p>

      <h2>Cookies de mesure d&apos;audience (le cas échéant)</h2>
      <p>
        Si des outils d&apos;analyse (ex. Google Analytics) sont activés, des
        cookies de mesure d&apos;audience anonymisés peuvent être utilisés pour
        améliorer le site. Dans ce cas, votre consentement sera demandé via
        le bandeau cookies.
      </p>

      <h2>3. Gestion de vos préférences</h2>
      <p>
        Vous pouvez à tout moment configurer votre navigateur pour refuser les
        cookies ou être alerté de leur dépôt. Le refus des cookies
        strictement nécessaires peut limiter certaines fonctionnalités
        (notamment la réservation et le paiement en ligne).
      </p>

      <h2>4. Durée de conservation</h2>
      <p>
        Les cookies techniques sont conservés le temps de la session ou pour
        une durée maximale de 13 mois conformément aux recommandations de la CNIL.
      </p>

      <h2>5. Contact</h2>
      <p>
        Pour toute question : {COMPANY.email} — {LEGAL_ENTITY.name},{" "}
        {LEGAL_ENTITY.address}.
      </p>
    </LegalPageLayout>
  );
}
