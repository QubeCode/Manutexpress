import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/lib/brand";

type LogoLayout = "header" | "headerCompact" | "centered";

interface LogoProps {
  /**
   * @deprecated Use layout="centered" or default header layouts — mark crops the wordmark.
   */
  variant?: "full" | "mark";
  /** White frame around logo-full.png (opaque black PNG needs contrast on light backgrounds). */
  framed?: boolean;
  layout?: LogoLayout;
  className?: string;
}

const IMAGE_SIZES: Record<LogoLayout, string> = {
  headerCompact:
    "h-auto max-h-10 w-auto max-w-[168px] object-contain object-left sm:max-w-[188px]",
  header:
    "h-auto max-h-11 w-auto max-w-[200px] object-contain object-left lg:max-w-[220px]",
  centered:
    "h-auto max-h-14 w-auto max-w-[220px] object-contain object-center sm:max-h-16 sm:max-w-[260px]",
};

export function Logo({
  variant = "full",
  framed = true,
  layout = "header",
  className,
}: LogoProps) {
  const resolvedLayout: LogoLayout = variant === "mark" ? "centered" : layout;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        resolvedLayout === "centered" && "mx-auto",
        framed &&
          "rounded-xl bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5",
        className
      )}
    >
      <Image
        src={BRAND_ASSETS.logoFull}
        alt="MANUTEXPRESS — Votre partenaire multi-services en Île-de-France"
        width={600}
        height={330}
        className={IMAGE_SIZES[resolvedLayout]}
        priority={resolvedLayout !== "centered"}
      />
    </span>
  );
}
