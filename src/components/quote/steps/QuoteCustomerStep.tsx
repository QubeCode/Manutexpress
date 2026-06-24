"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LEGAL_LINKS } from "@/lib/company-legal";
import type { CustomerDetails } from "@/types/request";

interface QuoteCustomerStepProps {
  data: CustomerDetails;
  onChange: (data: Partial<CustomerDetails>) => void;
}

export function QuoteCustomerStep({ data, onChange }: QuoteCustomerStepProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xl font-semibold text-brand-blue">
          Vos coordonnées
        </h3>
        <p className="text-muted-foreground">
          Nous vous recontacterons avec un devis personnalisé sous 24h.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            placeholder="Jean"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            placeholder="Dupont"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="06 12 34 56 78"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="jean.dupont@email.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
      </div>

      <div className="space-y-4 rounded-xl border bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="acceptTerms"
            checked={data.acceptTerms}
            onCheckedChange={(checked) =>
              onChange({ acceptTerms: checked === true })
            }
          />
          <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
            J&apos;accepte les{" "}
            <Link
              href={LEGAL_LINKS.cgv}
              target="_blank"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              Conditions Générales de Vente
            </Link>{" "}
            *
          </Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="acceptPrivacy"
            checked={data.acceptPrivacy}
            onCheckedChange={(checked) =>
              onChange({ acceptPrivacy: checked === true })
            }
          />
          <Label htmlFor="acceptPrivacy" className="text-sm leading-relaxed">
            J&apos;accepte la{" "}
            <Link
              href={LEGAL_LINKS.politiqueConfidentialite}
              target="_blank"
              className="font-medium text-brand-blue underline-offset-2 hover:underline"
            >
              politique de confidentialité
            </Link>{" "}
            *
          </Label>
        </div>
      </div>
    </div>
  );
}
