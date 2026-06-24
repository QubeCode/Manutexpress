import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/lib/brand";

interface LogoProps {
  variant?: "full" | "mark";
  /** Use on dark backgrounds (hero) for better contrast. Header only — not footer. */
  theme?: "default" | "onDark";
  /** Full wordmark sizing for mobile header — no square crop. */
  layout?: "default" | "headerMobile";
  className?: string;
}

export function Logo({
  variant = "full",
  theme = "default",
  layout = "default",
  className,
}: LogoProps) {
  const onDark = theme === "onDark";
  const isHeaderMobile = layout === "headerMobile";

  if (variant === "mark") {
    return (
      <Image
        src={BRAND_ASSETS.logoMark}
        alt="MANUTEXPRESS"
        width={112}
        height={112}
        className={cn("h-10 w-10 shrink-0 rounded-xl object-contain", className)}
        priority
      />
    );
  }

  const imageClassName = isHeaderMobile
    ? "h-auto max-h-10 w-auto max-w-[160px] object-contain object-left sm:max-w-[180px]"
    : cn("h-10 w-auto object-contain object-left", onDark && "h-9");

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center",
        onDark &&
          "rounded-xl bg-white px-2 py-1 shadow-md ring-1 ring-black/5",
        className
      )}
    >
      <Image
        src={BRAND_ASSETS.logoFull}
        alt="MANUTEXPRESS — Votre partenaire multi-services en Île-de-France"
        width={600}
        height={330}
        className={imageClassName}
        priority={isHeaderMobile}
      />
    </div>
  );
}
