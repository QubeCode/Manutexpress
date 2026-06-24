import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { FooterLogo } from "@/components/brand/FooterLogo";
import { COMPANY } from "@/lib/constants";
import { LEGAL_ENTITY, LEGAL_LINKS } from "@/lib/company-legal";

const FOOTER_LINKS = {
  services: [
    { label: "Manutention", href: "/devis?service=manutention" },
    { label: "Livraison", href: "/devis?service=livraison" },
    { label: "Nettoyage", href: "/devis?service=nettoyage" },
    { label: "Petits travaux", href: "/devis?service=petits-travaux" },
    { label: "Montage meubles", href: "/devis?service=montage-meubles" },
    { label: "Assistance domicile", href: "/devis?service=assistance-domicile" },
  ],
  company: [
    { label: "Pourquoi nous", href: "/#pourquoi-nous" },
    { label: "Avis clients", href: "/#temoignages" },
    { label: "Contact", href: "/contact" },
    { label: "Demander un devis", href: "/devis" },
  ],
  legal: [
    { label: "Mentions légales", href: LEGAL_LINKS.mentionsLegales },
    { label: "Politique de confidentialité", href: LEGAL_LINKS.politiqueConfidentialite },
    { label: "CGV", href: LEGAL_LINKS.cgv },
    { label: "Politique de cookies", href: LEGAL_LINKS.politiqueCookies },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="container-max section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <FooterLogo />
            <p className="mb-2 text-sm text-white/70">
              {LEGAL_ENTITY.legalForm} — Capital {LEGAL_ENTITY.shareCapital}
            </p>
            <p className="mb-4 text-sm text-white/70">
              {COMPANY.tagline}. {COMPANY.coverage}.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-brand-orange"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-brand-orange"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-brand-orange"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Nos services</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Entreprise</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0 text-brand-orange" />
                <a href={COMPANY.phoneHref} className="hover:text-white">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 shrink-0 text-brand-orange" />
                <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#25D366]"
                >
                  WhatsApp — Devis rapide
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                {COMPANY.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-10 sm:flex-row sm:flex-wrap">
          <Link
            href="/devis"
            className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-light"
          >
            Demander un devis
          </Link>
          <a
            href={COMPANY.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" />
            Appeler maintenant
          </a>
          <a
            href={COMPANY.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#25D366]/20"
          >
            WhatsApp
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {LEGAL_ENTITY.name} — SIREN {LEGAL_ENTITY.siren}
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
