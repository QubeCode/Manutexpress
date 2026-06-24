import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLogoProps {
  className?: string;
}

/**
 * Footer-only vector logo — no PNG (logo-footer.png has a baked-in gray background).
 * M + arrow in SVG; MANUT white + EXPRESS orange in HTML. Header assets unchanged.
 */
export function FooterLogo({ className }: FooterLogoProps) {
  return (
    <Link
      href="/"
      className={cn("mb-4 inline-flex flex-col items-start gap-2", className)}
      aria-label="MANUTEXPRESS — Accueil"
    >
      <svg
        viewBox="0 0 120 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-auto"
        aria-hidden
      >
        <path
          d="M12 14V34M12 14L22 34M22 34L32 14M32 14V34M42 14V34"
          stroke="white"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 26H8M4 29H10M4 32H7"
          stroke="#FF7A00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M46 32C54 28 62 28 70 32"
          stroke="#FF7A00"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M70 32C78 24 88 20 102 22"
          stroke="#FF7A00"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path d="M104 18L112 22L104 26V18Z" fill="white" />
      </svg>
      <span className="text-xl font-extrabold italic tracking-wide sm:text-2xl">
        <span className="text-white">MANUT</span>
        <span className="text-brand-orange">EXPRESS</span>
      </span>
    </Link>
  );
}
