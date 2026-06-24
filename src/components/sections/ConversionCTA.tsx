"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function ConversionCTA() {
  return (
    <section className="section-padding bg-brand-blue">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Prêt à lancer votre intervention ?
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Décrivez votre besoin en 2 minutes. Notre équipe vous répond sous
            24h avec un devis personnalisé — sans engagement.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/devis">
              <Button variant="secondary" size="lg" className="gap-2">
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/devis">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-blue"
              >
                Réserver maintenant
              </Button>
            </Link>
            <a href={COMPANY.phoneHref}>
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 text-white hover:bg-white/10 hover:text-white"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone}
              </Button>
            </a>
            <a
              href={COMPANY.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-blue"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
