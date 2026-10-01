/** Domaine canonique officiel (sans www). */
export const CANONICAL_SITE_URL = "https://manutexpress.com";
export const CANONICAL_DOMAIN = "manutexpress.com";

/** Constantes SEO centralisées — brand + local + indexation. */
export const SEO_BRAND = {
  name: "MANUTEXPRESS",
  alternateNames: ["Manut Express", "MANUT EXPRESS", "manutexpress.com"] as const,
  domain: CANONICAL_DOMAIN,
  email: "contact@manutexpress.com",
} as const;

export const BRAND_KEYWORDS = [
  "MANUTEXPRESS",
  "manutexpress",
  "manutexpress.com",
  "manut express",
  "MANUT EXPRESS",
] as const;

export const LOCAL_KEYWORDS = [
  "manutention Paris",
  "manutention Île-de-France",
  "manutention ile de france",
  "aide déménagement Paris",
  "aide demenagement paris",
  "entreprise manutention Paris",
  "manutention rapide Paris",
  "montage meubles Paris",
  "manutention ponctuelle Paris",
  "livraison rapide Paris",
  "petits travaux Paris",
  "Corbeil-Essonnes manutention",
  "Essonne manutention",
] as const;

export const SERVICE_TYPES = [
  "Manutention",
  "Aide au déménagement",
  "Montage de meubles",
  "Manutention ponctuelle",
  "Livraison",
  "Nettoyage",
  "Petits travaux",
  "Assistance à domicile",
] as const;

export const HOME_TITLE =
  "MANUTEXPRESS | Manutention, Déménagement & Services à Paris";

export const HOME_DESCRIPTION =
  "MANUTEXPRESS (manutexpress.com) : manutention, aide au déménagement, livraison et montage à Paris et en Île-de-France. Devis rapide sous 24 h — entreprise basée à Corbeil-Essonnes.";
