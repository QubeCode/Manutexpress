"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MissionDetails } from "@/types/booking";
import type { ServiceId } from "@/lib/constants";

interface MissionStepProps {
  service: ServiceId;
  data: MissionDetails;
  onChange: (data: Partial<MissionDetails>) => void;
}

export function MissionStep({ service, data, onChange }: MissionStepProps) {
  if (service === "manutention") {
    return (
      <div className="space-y-5">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-brand-blue">
            Détails de la mission — Manutention
          </h3>
          <p className="text-muted-foreground">
            Précisez votre besoin pour un devis adapté.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="missionType">Type de mission *</Label>
          <Select
            value={data.missionType || ""}
            onValueChange={(v) => onChange({ missionType: v })}
          >
            <SelectTrigger id="missionType">
              <SelectValue placeholder="Sélectionnez le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chargement">Chargement / déchargement</SelectItem>
              <SelectItem value="deplacement">Déplacement de marchandises</SelectItem>
              <SelectItem value="logistique">Aide logistique</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="itemCount">Nombre d&apos;éléments *</Label>
          <Input
            id="itemCount"
            type="number"
            min="1"
            placeholder="Ex: 10"
            value={data.itemCount || ""}
            onChange={(e) => onChange({ itemCount: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="heavyItems"
            checked={data.heavyItems || false}
            onCheckedChange={(checked) =>
              onChange({ heavyItems: checked === true })
            }
          />
          <Label htmlFor="heavyItems" className="cursor-pointer">
            Contient des objets lourds (+ de 30 kg)
          </Label>
        </div>
      </div>
    );
  }

  if (service === "livraison") {
    return (
      <div className="space-y-5">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-brand-blue">
            Détails de la mission — Livraison rapide
          </h3>
          <p className="text-muted-foreground">
            Indiquez les adresses et les caractéristiques du colis.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickupAddress">Adresse de collecte *</Label>
          <Input
            id="pickupAddress"
            placeholder="Rue, code postal, ville"
            value={data.pickupAddress || ""}
            onChange={(e) => onChange({ pickupAddress: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryAddress">Adresse de livraison *</Label>
          <Input
            id="deliveryAddress"
            placeholder="Rue, code postal, ville"
            value={data.deliveryAddress || ""}
            onChange={(e) => onChange({ deliveryAddress: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="packageSize">Taille du colis *</Label>
          <Select
            value={data.packageSize || ""}
            onValueChange={(v) => onChange({ packageSize: v })}
          >
            <SelectTrigger id="packageSize">
              <SelectValue placeholder="Sélectionnez la taille" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petit">Petit (enveloppe, document)</SelectItem>
              <SelectItem value="moyen">Moyen (carton standard)</SelectItem>
              <SelectItem value="grand">Grand (meuble, gros colis)</SelectItem>
              <SelectItem value="palette">Palette</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="urgent"
            checked={data.urgent || false}
            onCheckedChange={(checked) =>
              onChange({ urgent: checked === true })
            }
          />
          <Label htmlFor="urgent" className="cursor-pointer">
            Livraison urgente (sous 2h)
          </Label>
        </div>
      </div>
    );
  }

  if (service === "nettoyage") {
    return (
      <div className="space-y-5">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-brand-blue">
            Détails de la mission — Nettoyage
          </h3>
          <p className="text-muted-foreground">
            Décrivez les locaux à nettoyer.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="surface">Surface approximative (m²) *</Label>
          <Input
            id="surface"
            type="number"
            min="1"
            placeholder="Ex: 80"
            value={data.surface || ""}
            onChange={(e) => onChange({ surface: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="buildingType">Type de bâtiment *</Label>
          <Select
            value={data.buildingType || ""}
            onValueChange={(v) => onChange({ buildingType: v })}
          >
            <SelectTrigger id="buildingType">
              <SelectValue placeholder="Sélectionnez le type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bureau">Bureaux</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
              <SelectItem value="entrepot">Entrepôt / local industriel</SelectItem>
              <SelectItem value="appartement">Appartement / logement</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Fréquence souhaitée *</Label>
          <Select
            value={data.frequency || ""}
            onValueChange={(v) => onChange({ frequency: v })}
          >
            <SelectTrigger id="frequency">
              <SelectValue placeholder="Sélectionnez la fréquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ponctuel">Intervention ponctuelle</SelectItem>
              <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
              <SelectItem value="mensuel">Mensuel</SelectItem>
              <SelectItem value="trimestriel">Trimestriel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xl font-semibold text-brand-blue">
          Détails de la mission — Petits travaux
        </h3>
        <p className="text-muted-foreground">
          Décrivez les travaux à réaliser.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workType">Type de travaux *</Label>
        <Select
          value={data.workType || ""}
          onValueChange={(v) => onChange({ workType: v })}
        >
          <SelectTrigger id="workType">
            <SelectValue placeholder="Sélectionnez le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="montage">Montage de mobilier</SelectItem>
            <SelectItem value="fixation">Fixation / accrochage</SelectItem>
            <SelectItem value="petites-reparations">Petites réparations</SelectItem>
            <SelectItem value="assistance">Assistance ponctuelle</SelectItem>
            <SelectItem value="autre">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description détaillée *</Label>
        <Textarea
          id="description"
          placeholder="Décrivez précisément les travaux à effectuer..."
          rows={4}
          value={data.description || ""}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo (optionnel)</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) =>
            onChange({ photo: e.target.files?.[0] || null })
          }
        />
        <p className="text-xs text-muted-foreground">
          Ajoutez une photo pour nous aider à mieux évaluer la mission.
        </p>
      </div>
    </div>
  );
}
