"use client";

import { motion } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function Confirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8 text-center"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h3 className="mb-3 text-2xl font-bold text-brand-blue">
        Merci pour votre demande !
      </h3>
      <p className="mx-auto mb-2 max-w-md text-muted-foreground">
        Votre demande a bien été enregistrée.
      </p>
      <p className="mx-auto mb-8 max-w-md text-muted-foreground">
        Un conseiller MANUTEXPRESS vous contactera rapidement pour finaliser
        les détails de votre intervention.
      </p>

      <div className="mx-auto max-w-sm rounded-xl bg-brand-blue/5 p-6">
        <p className="mb-2 text-sm text-muted-foreground">
          Besoin d&apos;une réponse immédiate ?
        </p>
        <a href={COMPANY.phoneHref}>
          <Button variant="secondary" className="gap-2">
            <Phone className="h-4 w-4" />
            {COMPANY.phone}
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
