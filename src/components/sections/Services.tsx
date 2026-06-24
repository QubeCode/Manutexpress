"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Package,
  Truck,
  Sparkles,
  Wrench,
  Hammer,
  Home,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated";
import { SERVICES, COMPANY } from "@/lib/constants";
import { BRAND_ASSETS, SERVICE_BRAND_KEYS } from "@/lib/brand";
import { getPricingSummary } from "@/lib/pricing";
import { serviceImageAlt } from "@/lib/seo";

const SERVICE_ICONS = {
  Package,
  Truck,
  Sparkles,
  Wrench,
  Hammer,
  Home,
} as const;

export function Services() {
  return (
    <AnimatedSection id="services" className="section-padding bg-white">
      <div className="container-max">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Nos services
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl">
            Des solutions adaptées à chaque besoin
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Particuliers et professionnels : manutention à Paris, livraison
            rapide, nettoyage et petits travaux en Essonne — intervention sous
            24 h en Île-de-France.
          </p>
        </div>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const brandKey = SERVICE_BRAND_KEYS[service.id];
            const photoSrc =
              BRAND_ASSETS.photos[brandKey as keyof typeof BRAND_ASSETS.photos];
            const Icon =
              SERVICE_ICONS[service.icon as keyof typeof SERVICE_ICONS];

            return (
              <StaggerItem key={service.id}>
                <Card className="group h-full overflow-hidden border-0 bg-gray-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-brand">
                  <div className="relative h-40 overflow-hidden bg-brand-blue/5">
                    <Image
                      src={photoSrc}
                      alt={serviceImageAlt(service.title)}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/70 via-brand-blue/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-md">
                      <Icon className="h-5 w-5 text-brand-blue" />
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-brand-blue">
                      {service.title}
                    </CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm font-bold text-brand-orange">
                      {getPricingSummary(service.id)}
                    </span>
                    <Link href={`/devis?service=${service.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Demander un devis
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-12 rounded-2xl bg-brand-blue/5 p-6 text-center sm:p-8">
          <h3 className="mb-2 text-xl font-bold text-brand-blue sm:text-2xl">
            Besoin d&apos;une intervention en Île-de-France ?
          </h3>
          <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground sm:text-base">
            Manutention à Paris, livraison rapide, nettoyage ou petits travaux
            en Essonne — contactez-nous pour un devis rapide.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/devis">
              <Button variant="secondary" size="lg" className="w-full gap-2 sm:w-auto">
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href={COMPANY.phoneHref}>
              <Button variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
                <Phone className="h-5 w-5" />
                Appeler
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
                className="w-full gap-2 border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366]/10 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
