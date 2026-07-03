import { COMPANY, SERVICES } from "@/lib/constants";
import { LEGAL_ENTITY } from "@/lib/company-legal";
import { SEO_BRAND, SERVICE_TYPES } from "@/lib/seo-config";
import { SITE_URL } from "@/lib/seo";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const HOME_DESCRIPTION_SHORT =
  "MANUTEXPRESS — manutention, déménagement et services à Paris et en Île-de-France.";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SEO_BRAND.name,
    alternateName: [...SEO_BRAND.alternateNames],
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-icon-wordmark.png`,
    image: `${SITE_URL}/brand/logo-full.png`,
    description:
      "MANUTEXPRESS est une entreprise de manutention, aide au déménagement, débarras, montage et services ponctuels à Paris et en Île-de-France.",
    email: SEO_BRAND.email,
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: LEGAL_ENTITY.addressLine1,
      addressLocality: LEGAL_ENTITY.city,
      postalCode: LEGAL_ENTITY.postalCode,
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "Paris" },
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "AdministrativeArea", name: "Essonne" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phoneHref.replace("tel:", ""),
      email: SEO_BRAND.email,
      contactType: "customer service",
      areaServed: "FR",
      availableLanguage: ["French"],
    },
  };
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SEO_BRAND.name,
    alternateName: [...SEO_BRAND.alternateNames],
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-icon-wordmark.png`,
    image: `${SITE_URL}/brand/logo-full.png`,
    description:
      "Entreprise de manutention à Paris et en Île-de-France : aide au déménagement, débarras, montage de meubles et manutention ponctuelle. Devis rapide MANUTEXPRESS.",
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    email: SEO_BRAND.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: LEGAL_ENTITY.addressLine1,
      addressLocality: LEGAL_ENTITY.city,
      postalCode: LEGAL_ENTITY.postalCode,
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.6104,
      longitude: 2.4821,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "City", name: "Paris" },
      { "@type": "AdministrativeArea", name: "Essonne" },
      { "@type": "City", name: "Évry-Courcouronnes" },
      { "@type": "City", name: "Corbeil-Essonnes" },
    ],
    serviceType: [...SERVICE_TYPES],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    parentOrganization: { "@id": ORGANIZATION_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services MANUTEXPRESS",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          provider: { "@id": ORGANIZATION_ID },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Île-de-France",
          },
        },
      })),
    },
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SEO_BRAND.name,
    alternateName: [...SEO_BRAND.alternateNames],
    description: HOME_DESCRIPTION_SHORT,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "fr-FR",
  };
}

export function getServiceSchemasJsonLd() {
  return SERVICES.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} — MANUTEXPRESS`,
    description: service.description,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Île-de-France",
    },
    serviceType: service.title,
    url: `${SITE_URL}/devis?service=${service.id}`,
  }));
}

export function getAllJsonLd() {
  return [
    getOrganizationJsonLd(),
    getLocalBusinessJsonLd(),
    getWebsiteJsonLd(),
    ...getServiceSchemasJsonLd(),
  ];
}
