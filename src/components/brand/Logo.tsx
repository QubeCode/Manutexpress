import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/lib/brand";

type LogoLayout = "header" | "headerCompact" | "centered";

interface LogoProps {
  /** @deprecated Ignored — always renders full wordmark. */
  variant?: "full" | "mark";
  layout?: LogoLayout;
  className?: string;
}

const IMAGE_SIZES: Record<LogoLayout, string> = {
  headerCompact:
    "h-9 w-auto object-contain object-left sm:h-10",
  header:
    "h-10 w-auto object-contain object-left lg:h-11",
  centered:
    "h-auto max-h-14 w-auto max-w-[min(100%,280px)] object-contain object-center sm:max-h-16",
};

export function Logo({
  layout = "header",
  className,
}: LogoProps) {
  return (
    <Image
      src={BRAND_ASSETS.logoFull}
      alt="MANUTEXPRESS — Votre partenaire multi-services en Île-de-France"
      width={600}
      height={330}
      className={cn(
        "block shrink-0 overflow-visible",
        IMAGE_SIZES[layout],
        layout === "centered" && "mx-auto",
        className
      )}
      priority={layout !== "centered"}
    />
  );
}
