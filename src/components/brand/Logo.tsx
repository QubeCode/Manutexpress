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
    "h-auto max-h-10 w-auto max-w-[168px] object-contain object-left sm:max-w-[188px]",
  header:
    "h-auto max-h-11 w-auto max-w-[200px] object-contain object-left lg:max-w-[220px]",
  centered:
    "h-auto max-h-14 w-auto max-w-[220px] object-contain object-center sm:max-h-16 sm:max-w-[260px]",
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
        "shrink-0",
        IMAGE_SIZES[layout],
        layout === "centered" && "mx-auto",
        className
      )}
      priority={layout !== "centered"}
    />
  );
}
