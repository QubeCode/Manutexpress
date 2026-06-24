"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md lg:hidden">
      <div className="flex gap-2">
        <a
          href={COMPANY.phoneHref}
          className="flex-1"
          aria-label="Appeler MANUTEXPRESS"
        >
          <Button variant="outline" className="w-full gap-1.5 px-2">
            <Phone className="h-4 w-4 shrink-0" />
            <span className="truncate">Appeler</span>
          </Button>
        </a>
        <a
          href={COMPANY.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
          aria-label="Contacter via WhatsApp"
        >
          <Button variant="outline" className="w-full gap-1.5 px-2 text-[#25D366] hover:text-[#25D366]">
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </Button>
        </a>
        <Link href="/devis" className="flex-[1.4]">
          <Button variant="secondary" className="w-full px-2">
            Devis
          </Button>
        </Link>
      </div>
    </div>
  );
}
