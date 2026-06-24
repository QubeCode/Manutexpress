"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MissionDetails } from "@/types/request";
import type { ServiceId } from "@/lib/constants";

interface QuoteMissionStepProps {
  service: ServiceId;
  data: MissionDetails;
  onChange: (data: Partial<MissionDetails>) => void;
}

export function QuoteMissionStep({
  service,
  data,
  onChange,
}: QuoteMissionStepProps) {
  if (service === "manutention") {
    return (
      <div className="space-y-5">
        <MissionHeader
          title="Manutention"
          subtitle="Précisez la charge, les étages et le nombre d'agents nécessaires."
        />
        <SelectField
          id="missionType"
          label="Type de mission *"
          value={data.missionType}
          placeholder="Sélectionnez le type"
          onChange={(v) => onChange({ missionType: v })}
          options={[
            ["chargement", "Chargement / déchargement"],
            ["deplacement", "Déplacement de marchandises"],
            ["logistique", "Aide logistique"],
            ["autre", "Autre"],
          ]}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="itemCount"
            label="Nombre d'éléments *"
            type="number"
            min="1"
            placeholder="Ex: 10"
            value={data.itemCount}
            onChange={(v) => onChange({ itemCount: v })}
          />
          <SelectField
            id="agentCount"
            label="Nombre d'agents *"
            value={data.agentCount}
            placeholder="Sélectionnez"
            onChange={(v) => onChange({ agentCount: v as "1" | "2" })}
            options={[
              ["1", "1 agent (45€/h)"],
              ["2", "2 agents (80€/h)"],
            ]}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="estimatedHours"
            label="Durée estimée (heures)"
            type="number"
            min="1"
            placeholder="Ex: 2"
            value={data.estimatedHours}
            onChange={(v) => onChange({ estimatedHours: v })}
          />
          <SelectField
            id="floors"
            label="Étages concernés *"
            value={data.floors}
            placeholder="Sélectionnez"
            onChange={(v) => onChange({ floors: v })}
            options={[
              ["rdc", "Rez-de-chaussée"],
              ["1", "1 étage"],
              ["2", "2 étages"],
              ["3", "3 étages"],
              ["4+", "4 étages et plus"],
            ]}
          />
        </div>
        <CheckboxField
          id="heavyItems"
          label="Objets lourds (+ de 30 kg) — supplément +15€"
          checked={data.heavyItems}
          onChange={(c) => onChange({ heavyItems: c })}
        />
        <CheckboxField
          id="noElevator"
          label="Étages sans ascenseur — +10€/étage"
          checked={data.noElevator}
          onChange={(c) => onChange({ noElevator: c })}
        />
      </div>
    );
  }

  if (service === "livraison") {
    return (
      <div className="space-y-5">
        <MissionHeader
          title="Livraison rapide"
          subtitle="Forfait 45€ + 1,50€/km. Urgence : +20€."
        />
        <Field
          id="pickupAddress"
          label="Adresse de collecte *"
          placeholder="Rue, code postal, ville"
          value={data.pickupAddress}
          onChange={(v) => onChange({ pickupAddress: v })}
        />
        <Field
          id="deliveryAddress"
          label="Adresse de livraison *"
          placeholder="Rue, code postal, ville"
          value={data.deliveryAddress}
          onChange={(v) => onChange({ deliveryAddress: v })}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id="packageSize"
            label="Taille du colis *"
            value={data.packageSize}
            placeholder="Sélectionnez"
            onChange={(v) => onChange({ packageSize: v })}
            options={[
              ["petit", "Petit"],
              ["moyen", "Moyen"],
              ["grand", "Grand"],
              ["palette", "Palette"],
            ]}
          />
          <Field
            id="distanceKm"
            label="Distance estimée (km)"
            type="number"
            min="1"
            placeholder="Ex: 15"
            value={data.distanceKm}
            onChange={(v) => onChange({ distanceKm: v })}
          />
        </div>
        <CheckboxField
          id="urgent"
          label="Livraison urgente (sous 2h) — +20€"
          checked={data.urgent}
          onChange={(c) => onChange({ urgent: c })}
        />
      </div>
    );
  }

  if (service === "nettoyage") {
    return (
      <div className="space-y-5">
        <MissionHeader
          title="Nettoyage"
          subtitle="35€/h ou 4€/m² — choisissez le mode de tarification."
        />
        <div className="space-y-3">
          <Label>Mode de tarification *</Label>
          <RadioGroup
            value={data.pricingMode || ""}
            onValueChange={(v) =>
              onChange({ pricingMode: v as "hourly" | "sqm" })
            }
            className="grid gap-3 sm:grid-cols-2"
          >
            <RadioCard
              id="hourly"
              value="hourly"
              selected={data.pricingMode === "hourly"}
              title="À l'heure"
              subtitle="35€/heure"
            />
            <RadioCard
              id="sqm"
              value="sqm"
              selected={data.pricingMode === "sqm"}
              title="Au m²"
              subtitle="4€/m²"
            />
          </RadioGroup>
        </div>
        {data.pricingMode === "sqm" ? (
          <Field
            id="surface"
            label="Surface (m²) *"
            type="number"
            min="1"
            placeholder="Ex: 80"
            value={data.surface}
            onChange={(v) => onChange({ surface: v })}
          />
        ) : data.pricingMode === "hourly" ? (
          <Field
            id="estimatedHours"
            label="Durée estimée (heures) *"
            type="number"
            min="1"
            placeholder="Ex: 3"
            value={data.estimatedHours}
            onChange={(v) => onChange({ estimatedHours: v })}
          />
        ) : null}
        <SelectField
          id="buildingType"
          label="Type de bâtiment *"
          value={data.buildingType}
          placeholder="Sélectionnez"
          onChange={(v) => onChange({ buildingType: v })}
          options={[
            ["bureau", "Bureaux"],
            ["commerce", "Commerce"],
            ["entrepot", "Entrepôt"],
            ["appartement", "Appartement"],
            ["autre", "Autre"],
          ]}
        />
        <SelectField
          id="frequency"
          label="Fréquence *"
          value={data.frequency}
          placeholder="Sélectionnez"
          onChange={(v) => onChange({ frequency: v })}
          options={[
            ["ponctuel", "Ponctuel"],
            ["hebdomadaire", "Hebdomadaire"],
            ["mensuel", "Mensuel"],
          ]}
        />
      </div>
    );
  }

  if (service === "montage-meubles") {
    return (
      <div className="space-y-5">
        <MissionHeader
          title="Montage meubles"
          subtitle="À partir de 45€ — devis personnalisé selon le mobilier."
        />
        <SelectField
          id="furnitureType"
          label="Type de mobilier *"
          value={data.furnitureType}
          placeholder="Sélectionnez"
          onChange={(v) => onChange({ furnitureType: v })}
          options={[
            ["ikea", "Meubles IKEA / kit"],
            ["salon", "Salon / canapé"],
            ["cuisine", "Cuisine équipée"],
            ["bureau", "Bureau / étagères"],
            ["autre", "Autre"],
          ]}
        />
        <Field
          id="itemCount"
          label="Nombre de meubles *"
          type="number"
          min="1"
          placeholder="Ex: 3"
          value={data.itemCount}
          onChange={(v) => onChange({ itemCount: v })}
        />
        <TextField
          id="description"
          label="Description *"
          placeholder="Marque, modèle, contraintes d'accès..."
          value={data.description}
          onChange={(v) => onChange({ description: v })}
        />
      </div>
    );
  }

  if (service === "assistance-domicile") {
    return (
      <div className="space-y-5">
        <MissionHeader
          title="Assistance domicile"
          subtitle="Aide logistique et opérationnelle à domicile."
        />
        <SelectField
          id="assistanceType"
          label="Type d'assistance *"
          value={data.assistanceType}
          placeholder="Sélectionnez"
          onChange={(v) => onChange({ assistanceType: v })}
          options={[
            ["courses", "Courses / livraisons"],
            ["menage", "Aide ménagère légère"],
            ["demenagement", "Aide déménagement"],
            ["seniors", "Assistance seniors"],
            ["autre", "Autre"],
          ]}
        />
        <Field
          id="estimatedHours"
          label="Durée estimée (heures)"
          type="number"
          min="1"
          placeholder="Ex: 2"
          value={data.estimatedHours}
          onChange={(v) => onChange({ estimatedHours: v })}
        />
        <TextField
          id="description"
          label="Description *"
          placeholder="Décrivez vos besoins précis..."
          value={data.description}
          onChange={(v) => onChange({ description: v })}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <MissionHeader
        title="Petits travaux"
        subtitle="Minimum 45€ — devis sur mesure selon la complexité."
      />
      <SelectField
        id="workType"
        label="Type de travaux *"
        value={data.workType}
        placeholder="Sélectionnez"
        onChange={(v) => onChange({ workType: v })}
        options={[
          ["peinture", "Peinture et finitions"],
          ["electricite", "Électricité légère"],
          ["plomberie", "Plomberie légère"],
          ["montage", "Montage / fixation"],
          ["reparations", "Petites réparations"],
          ["autre", "Autre"],
        ]}
      />
      <TextField
        id="description"
        label="Description détaillée *"
        placeholder="Décrivez les travaux..."
        value={data.description}
        onChange={(v) => onChange({ description: v })}
      />
    </div>
  );
}

function MissionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold text-brand-blue">{title}</h3>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
}: {
  id: string;
  label: string;
  value?: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  min?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        min={min}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        rows={4}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  id: string;
  label: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: [string, string][];
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value || ""} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(([val, lab]) => (
            <SelectItem key={val} value={val}>
              {lab}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function CheckboxField({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked?: boolean;
  onChange: (c: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-gray-50 p-4">
      <Checkbox
        id={id}
        checked={checked || false}
        onCheckedChange={(c) => onChange(c === true)}
      />
      <Label htmlFor={id} className="cursor-pointer">
        {label}
      </Label>
    </div>
  );
}

function RadioCard({
  id,
  value,
  selected,
  title,
  subtitle,
}: {
  id: string;
  value: string;
  selected: boolean;
  title: string;
  subtitle: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 ${
        selected ? "border-brand-blue bg-brand-blue/5" : "border-gray-200"
      }`}
    >
      <RadioGroupItem value={value} id={id} />
      <div>
        <p className="font-semibold text-brand-blue">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </label>
  );
}
