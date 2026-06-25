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

const LAYOUT_STYLES: Record<
  LogoLayout,
  { icon: string; text: string; gap: string }
> = {
  headerCompact: {
    icon: "h-8 w-auto sm:h-9",
    text: "text-[11px] sm:text-xs",
    gap: "gap-0.5",
  },
  header: {
    icon: "h-9 w-auto lg:h-10",
    text: "text-xs lg:text-sm",
    gap: "gap-0.5",
  },
  centered: {
    icon: "h-14 w-auto sm:h-16",
    text: "text-xl sm:text-2xl",
    gap: "gap-1",
  },
};

function Wordmark({ textClassName }: { textClassName: string }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap font-extrabold italic leading-none tracking-wide",
        textClassName
      )}
    >
      <span className="text-brand-blue">MANUT</span>
      <span className="text-brand-orange">EXPRESS</span>
    </span>
  );
}

export function Logo({ layout = "header", className }: LogoProps) {
  const styles = LAYOUT_STYLES[layout];

  return (
    <div
      role="img"
      aria-label="MANUTEXPRESS"
      className={cn(
        "inline-flex shrink-0 flex-col overflow-visible",
        layout === "centered" ? "items-center" : "items-center",
        styles.gap,
        className
      )}
    >
      <Image
        src={BRAND_ASSETS.logoIconWordmark}
        alt=""
        aria-hidden
        width={496}
        height={192}
        className={cn("block w-auto object-contain", styles.icon)}
        priority={layout !== "centered"}
      />
      <Wordmark textClassName={styles.text} />
    </div>
  );
}
