"use client";

import { Clock, BadgeEuro, ShieldCheck } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const TRUST_ICONS = [Clock, BadgeEuro, ShieldCheck];

export function TrustBar({ theme = "light" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-6 sm:gap-10 ${
        isDark ? "text-white/90" : "text-brand-blue"
      }`}
    >
      {TRUST_BADGES.map((label, index) => {
        const Icon = TRUST_ICONS[index];
        return (
          <div key={label} className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full ${
                isDark
                  ? "bg-white/10 text-brand-orange"
                  : "bg-brand-blue text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
