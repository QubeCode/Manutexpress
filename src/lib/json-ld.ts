import { COMPANY, SERVICES } from "@/lib/constants";
import { LEGAL_ENTITY } from "@/lib/company-legal";
import { SITE_URL } from "@/lib/seo";

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: LEGAL_ENTITY.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-full.png`,
    image: `${SITE_URL}/brand/logo-full.png`,
    description:
      "MANUTEXPRESS intervient en manutention, livraison rapide, nettoyage et petits travaux à Paris, en Essonne et dans toute l'Île-de-France.",
    telephone: COMPANY.phoneHref.replace("tel:", ""),
    email: COMPANY.email,
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services MANUTEXPRESS",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          areaServed: "Île-de-France",
        },
      })),
    },
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: LEGAL_ENTITY.name,
    description: COMPANY.coverage,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "fr-FR",
  };
}
