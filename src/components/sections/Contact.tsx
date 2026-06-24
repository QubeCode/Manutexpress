"use client";

import { Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { COMPANY } from "@/lib/constants";

interface ContactProps {
  hideHeader?: boolean;
}

export function Contact({ hideHeader = false }: ContactProps) {
  return (
    <AnimatedSection id="contact" className="section-padding bg-gray-50">
      <div className="container-max">
        {!hideHeader && (
          <div className="mb-12 text-center">
            <Badge className="mb-4">Contact</Badge>
            <h2 className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl">
              Une question ? Contactez-nous
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {COMPANY.coverage}. Notre équipe répond rapidement à toutes vos
              demandes.
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl bg-brand-blue p-8 text-white">
              <p className="mb-2 text-sm text-white/70">Appelez-nous directement</p>
              <a
                href={COMPANY.phoneHref}
                className="mb-6 block break-words text-3xl font-bold text-brand-orange transition-colors hover:text-brand-orange-light sm:text-4xl lg:text-5xl"
              >
                {COMPANY.phone}
              </a>
              <a href={COMPANY.phoneHref}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Appelez-nous maintenant
                </Button>
              </a>
              <a
                href={COMPANY.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-blue sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  Écrire sur WhatsApp
                </Button>
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <Clock className="mb-3 h-6 w-6 text-brand-orange" />
                <h3 className="mb-1 font-semibold text-brand-blue">Horaires</h3>
                <p className="text-sm text-muted-foreground">{COMPANY.hours}</p>
                <p className="text-sm text-muted-foreground">{COMPANY.hoursDetail}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <Mail className="mb-3 h-6 w-6 text-brand-orange" />
                <h3 className="mb-1 font-semibold text-brand-blue">Email</h3>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-muted-foreground hover:text-brand-blue"
                >
                  {COMPANY.email}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  <a
                    href={COMPANY.websiteUrl}
                    className="hover:text-brand-blue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {COMPANY.website}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <CoverageMap />
        </div>
      </div>
    </AnimatedSection>
  );
}
