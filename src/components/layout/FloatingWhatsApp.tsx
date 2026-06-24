"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={COMPANY.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter MANUTEXPRESS sur WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 active:scale-95 lg:bottom-6"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}
