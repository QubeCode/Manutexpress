"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/#pourquoi-nous", label: "Pourquoi nous" },
  { href: "/devis", label: "Demander un devis" },
  { href: "/#temoignages", label: "Avis clients" },
  { href: "/contact", label: "Contact" },
] as const;

function MobileMenu({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 top-16 bg-brand-blue-dark/60"
        aria-label="Fermer le menu"
        onClick={onClose}
      />
      <nav
        id="mobile-nav"
        aria-label="Menu mobile"
        className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-gray-200 bg-white shadow-2xl"
      >
        <ul className="flex flex-col p-4 pb-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-xl px-4 py-3.5 text-base font-semibold leading-normal text-[#0B2E6B] transition-colors hover:bg-[#0B2E6B]/5 hover:text-[#FF7A00] active:bg-[#0B2E6B]/10"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-4 border-t border-gray-100 pt-4">
            <a href={COMPANY.phoneHref} className="mb-2 block" onClick={onClose}>
              <Button
                variant="outline"
                className="w-full gap-2 border-[#0B2E6B]/20 text-[#0B2E6B] hover:bg-[#0B2E6B]/5"
              >
                <Phone className="h-4 w-4" />
                Appeler — {COMPANY.phone}
              </Button>
            </a>
            <Link href="/devis" onClick={onClose}>
              <Button variant="secondary" className="w-full">
                Demander un devis
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === "/";
  const useLightHeader = isOpen || scrolled || !isHome;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          useLightHeader
            ? "bg-white shadow-md"
            : "bg-brand-blue-dark/95 shadow-lg"
        )}
      >
        <div className="container-max flex h-16 items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:h-20 lg:px-8">
          <Link href="/" className="flex min-w-0 shrink-0 items-center lg:gap-3">
            <Logo
              variant="full"
              theme={useLightHeader ? "default" : "onDark"}
              layout="headerMobile"
              className="lg:hidden"
            />
            <Logo
              variant="full"
              theme={useLightHeader ? "default" : "onDark"}
              className={cn("hidden lg:inline-flex", useLightHeader ? "h-10" : "h-11")}
            />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Navigation principale"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  useLightHeader
                    ? "text-brand-blue hover:text-brand-orange"
                    : "text-white hover:text-brand-orange-light"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={COMPANY.phoneHref}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2",
                  !useLightHeader &&
                    "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Phone className="h-4 w-4" />
                {COMPANY.phone}
              </Button>
            </a>
            <Link href="/devis">
              <Button variant="secondary" size="sm">
                Réserver maintenant
              </Button>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
            <a href={COMPANY.phoneHref} aria-label="Appeler MANUTEXPRESS">
              <Button
                variant={useLightHeader ? "outline" : "ghost"}
                size="icon"
                className={cn(
                  "h-9 w-9 shrink-0",
                  !useLightHeader &&
                    "border-white/40 text-white hover:bg-white/15 hover:text-white"
                )}
              >
                <Phone className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/devis" className="shrink-0">
              <Button
                variant="secondary"
                size="sm"
                className="h-9 px-2.5 text-xs sm:px-3 sm:text-sm"
              >
                Devis
              </Button>
            </Link>
            <button
              type="button"
              className={cn(
                "rounded-lg p-2 transition-colors",
                useLightHeader
                  ? "text-brand-blue hover:bg-brand-blue/5"
                  : "text-white hover:bg-white/15"
              )}
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {mounted && isOpen && createPortal(<MobileMenu onClose={closeMenu} />, document.body)}
    </>
  );
}
