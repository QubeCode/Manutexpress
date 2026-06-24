import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLogoProps {
  className?: string;
}

/** Footer wordmark only — MANUT white + EXPRESS orange. Header logo unchanged. */
export function FooterLogo({ className }: FooterLogoProps) {
  return (
    <Link
      href="/"
      className={cn("mb-4 inline-block", className)}
      aria-label="MANUTEXPRESS — Accueil"
    >
      <span className="text-2xl font-extrabold italic tracking-wide sm:text-3xl">
        <span className="text-white">MANUT</span>
        <span className="text-brand-orange">EXPRESS</span>
      </span>
    </Link>
  );
}
