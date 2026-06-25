import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "https://www.manutexpress.com";

export const SITE_NAME = "MANUTEXPRESS";

export const DEFAULT_KEYWORDS = [
  "manutention Île-de-France",
  "manutention Paris",
  "livraison rapide Paris",
  "nettoyage Île-de-France",
  "petits travaux Paris",
  "aide déménagement Essonne",
  "MANUTEXPRESS",
  "services à domicile Paris",
  "intervention rapide Île-de-France",
] as const;

const OG_IMAGE = {
  url: `${SITE_URL}/brand/logo-full.png`,
  width: 600,
  height: 330,
  alt: "MANUTEXPRESS — services multi-prestations en Île-de-France",
};

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [...DEFAULT_KEYWORDS],
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle =
    path === "/" ? title : title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: path === "/" ? { absolute: fullTitle } : fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function serviceImageAlt(serviceTitle: string): string {
  return `${serviceTitle} — MANUTEXPRESS, prestation en Île-de-France et Paris`;
}

export const LOCAL_AREAS = [
  { name: "Paris", description: "manutention, livraison rapide et petits travaux" },
  { name: "Essonne (91)", description: "aide déménagement, manutention et nettoyage" },
  { name: "Évry-Courcouronnes", description: "interventions rapides à domicile et en entreprise" },
  { name: "Corbeil-Essonnes", description: "siège MANUTEXPRESS, zone d'intervention prioritaire" },
] as const;
