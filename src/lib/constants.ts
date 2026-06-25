import { LEGAL_ENTITY } from "./company-legal";

export const COMPANY = {
  name: LEGAL_ENTITY.name,
  tagline: "Votre partenaire de confiance pour tous vos besoins",
  phone: "06 52 09 93 10",
  phoneHref: "tel:+33652099310",
  whatsappMessage:
    "Bonjour, j'aimerais obtenir un devis pour une prestation MANUTEXPRESS.",
  whatsappHref:
    "https://wa.me/33652099310?text=" +
    encodeURIComponent(
      "Bonjour, j'aimerais obtenir un devis pour une prestation MANUTEXPRESS."
    ),
  email: "contact@manutexpress.com",
  website: "www.manutexpress.com",
  websiteUrl: "https://www.manutexpress.com",
  address: LEGAL_ENTITY.address,
  addressLine1: LEGAL_ENTITY.addressLine1,
  postalCode: LEGAL_ENTITY.postalCode,
  city: LEGAL_ENTITY.city,
  hours: "Lun – Sam : 7h00 – 20h00",
  hoursDetail: "Dimanche : sur demande",
  coverage: "Intervention rapide en Île-de-France",
} as const;

export const SERVICES = [
  {
    id: "manutention",
    title: "Manutention",
    description:
      "Chargement / déchargement et déplacement d'objets lourds par des agents qualifiés.",
    price: "à partir de 45€",
    priceValue: 45,
    icon: "Package",
    features: [
      "Chargement et déchargement",
      "Déplacement d'objets lourds",
      "Intervention sous 24h",
    ],
  },
  {
    id: "livraison",
    title: "Livraison",
    description:
      "Livraison rapide et sécurisée de colis, meubles et électroménager.",
    price: "à partir de 45€",
    priceValue: 45,
    icon: "Truck",
    features: [
      "Colis, meubles, électroménager",
      "Transport local et régional",
      "Livraison express disponible",
    ],
  },
  {
    id: "nettoyage",
    title: "Nettoyage",
    description:
      "Nettoyage professionnel de bureaux, fin de chantier et domicile.",
    price: "35€/h ou 4€/m²",
    priceValue: null,
    icon: "Sparkles",
    features: [
      "Bureaux et locaux professionnels",
      "Fin de chantier",
      "Domicile et remise en état",
    ],
  },
  {
    id: "petits-travaux",
    title: "Petits travaux",
    description:
      "Petits travaux de bricolage : peinture, électricité et plomberie légère.",
    price: "à partir de 45€",
    priceValue: 45,
    icon: "Wrench",
    features: [
      "Peinture et finitions",
      "Électricité légère",
      "Plomberie légère",
    ],
  },
  {
    id: "montage-meubles",
    title: "Montage meubles",
    description:
      "Montage et démontage de meubles : cuisine, dressing et salon.",
    price: "à partir de 45€",
    priceValue: 45,
    icon: "Hammer",
    features: [
      "Cuisines et dressings",
      "Salons et chambres",
      "Montage soigné et rapide",
    ],
  },
  {
    id: "assistance-domicile",
    title: "Assistance domicile",
    description:
      "Assistance à domicile : aide au déménagement et rangement.",
    price: "à partir de 45€",
    priceValue: 45,
    icon: "Home",
    features: [
      "Aide au déménagement",
      "Rangement et organisation",
      "Services à la personne",
    ],
  },
] as const;

export const ADVANTAGES = [
  {
    title: "Intervention rapide",
    description: "Disponibilité sous 24h pour vos urgences en Île-de-France.",
    icon: "Zap",
  },
  {
    title: "Tarifs transparents",
    description:
      "Grille tarifaire, devis validé avant intervention, aucune surprise.",
    icon: "BadgeEuro",
  },
  {
    title: "Agents qualifiés",
    description: "Personnel formé, assuré et expérimenté à chaque mission.",
    icon: "ShieldCheck",
  },
  {
    title: "Disponibilité flexible",
    description: "Interventions planifiées ou en urgence, 7j/7.",
    icon: "CalendarClock",
  },
  {
    title: "Présence Île-de-France",
    description: "Paris et les 8 départements, particuliers et professionnels.",
    icon: "MapPin",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sophie M.",
    location: "Paris 15e",
    text: "Service rapide et très professionnel. L'équipe est arrivée à l'heure et a tout géré parfaitement. Je recommande vivement.",
    rating: 5,
    service: "Manutention",
  },
  {
    name: "Karim B.",
    location: "Boulogne-Billancourt",
    text: "Livraison express réalisée en moins de 2 heures. Communication claire et tarif honnête. Excellent service B2B.",
    rating: 5,
    service: "Livraison",
  },
  {
    name: "Claire D.",
    location: "Versailles",
    text: "Nettoyage de nos bureaux impeccable. Équipe discrète, efficace et ponctuelle. Nous avons signé un contrat régulier.",
    rating: 5,
    service: "Nettoyage",
  },
] as const;

export const TRUST_BADGES = [
  "Intervention rapide",
  "Tarifs transparents",
  "Agents qualifiés",
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];
