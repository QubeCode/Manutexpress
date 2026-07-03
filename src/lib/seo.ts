import type { Metadata } from "next";
import {
  BRAND_KEYWORDS,
  CANONICAL_SITE_URL,
  HOME_DESCRIPTION,
  HOME_TITLE,
  LOCAL_KEYWORDS,
  SEO_BRAND,
} from "@/lib/seo-config";

/** URL canonique unique — toujours sans www pour manutexpress.com. */
function resolveSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_APP_URL?.trim() || CANONICAL_SITE_URL).replace(
    /\/$/,
    ""
  );
  return raw.replace(/^https:\/\/www\.manutexpress\.com/i, CANONICAL_SITE_URL);
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = SEO_BRAND.name;

export const DEFAULT_KEYWORDS = [
  ...BRAND_KEYWORDS,
  ...LOCAL_KEYWORDS,
] as const;

const OG_IMAGE = {
  url: `${SITE_URL}/brand/logo-full.png`,
  width: 600,
  height: 330,
  alt: "MANUTEXPRESS — manutention, déménagement et services à Paris et en Île-de-France",
};

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function getVerificationMetadata(): Pick<Metadata, "verification"> | Record<string, never> {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();
  const yandex = process.env.YANDEX_SITE_VERIFICATION?.trim();

  const verification: NonNullable<Metadata["verification"]> = {};
  if (google) verification.google = google;
  if (bing) verification.other = { "msvalidate.01": bing };
  if (yandex) verification.yandex = yandex;

  return Object.keys(verification).length > 0 ? { verification } : {};
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
    path === "/"
      ? title
      : title.includes(SITE_NAME)
        ? title
        : `${title} | ${SITE_NAME}`;

  return {
    title: path === "/" ? { absolute: fullTitle } : fullTitle,
    description,
    keywords,
    applicationName: SITE_NAME,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
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
    ...getVerificationMetadata(),
  };
}

export function buildLegalMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return buildPageMetadata({
    title,
    description,
    path,
    keywords: [...BRAND_KEYWORDS],
    noIndex: false,
  });
}

export { HOME_TITLE, HOME_DESCRIPTION };

export function serviceImageAlt(serviceTitle: string): string {
  return `${serviceTitle} MANUTEXPRESS — manutention et services à Paris, Île-de-France`;
}

export const LOCAL_AREAS = [
  {
    name: "Paris",
    description: "Manutention Paris, aide déménagement et livraison rapide",
  },
  {
    name: "Essonne (91)",
    description: "Entreprise manutention Essonne, Corbeil-Essonnes et alentours",
  },
  {
    name: "Évry-Courcouronnes",
    description: "Manutention rapide et débarras en Essonne",
  },
  {
    name: "Île-de-France",
    description: "Manutention ile de france — intervention sous 24 h",
  },
] as const;
