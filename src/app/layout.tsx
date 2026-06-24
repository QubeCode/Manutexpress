import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DEFAULT_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getLocalBusinessJsonLd, getWebsiteJsonLd } from "@/lib/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Manutention & services en Île-de-France`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "MANUTEXPRESS : manutention Paris, livraison rapide, nettoyage et petits travaux en Essonne et Île-de-France. Devis rapide, intervention selon disponibilité.",
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: SITE_NAME }],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/brand/logo-full.png",
        width: 600,
        height: 330,
        alt: "MANUTEXPRESS — services multi-prestations en Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = [getLocalBusinessJsonLd(), getWebsiteJsonLd()];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
