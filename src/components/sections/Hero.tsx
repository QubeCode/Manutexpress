"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBar } from "@/components/brand/TrustBar";
import { SERVICES, COMPANY } from "@/lib/constants";
import { BRAND_ASSETS, SERVICE_BRAND_KEYS } from "@/lib/brand";
import { serviceImageAlt } from "@/lib/seo";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-dark pt-20 lg:pt-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-orange blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container-max relative flex min-h-[calc(100vh-5rem)] flex-col justify-center px-4 py-16 pb-24 sm:px-6 sm:pb-16 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block rounded-full bg-brand-orange/20 px-4 py-1.5 text-sm font-semibold text-brand-orange">
                Île-de-France • Intervention rapide
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Votre partenaire{" "}
              <span className="text-brand-orange">multi-services</span> en
              Île-de-France
            </motion.h1>

            <motion.p
              className="mb-8 max-w-xl text-lg text-white/80 sm:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Manutention, livraison rapide, nettoyage et petits travaux à
              Paris, en Essonne et dans toute l&apos;Île-de-France.
            </motion.p>

            <motion.div
              className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/devis" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Demander un devis
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href={COMPANY.phoneHref} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-brand-blue sm:w-auto"
                >
                  <Phone className="h-5 w-5" />
                  Appeler maintenant
                </Button>
              </a>
              <a
                href={COMPANY.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 border-[#25D366]/50 bg-[#25D366]/15 text-white hover:bg-[#25D366] hover:text-white sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <TrustBar theme="dark" />
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-lg px-1 sm:px-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative rounded-3xl bg-white/10 p-4 backdrop-blur-sm sm:p-6">
              <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-white/80">
                Nos 6 prestations
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SERVICES.map((service, index) => {
                  const brandKey = SERVICE_BRAND_KEYS[service.id];
                  const photoSrc =
                    BRAND_ASSETS.photos[
                      brandKey as keyof typeof BRAND_ASSETS.photos
                    ];

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="group overflow-hidden rounded-2xl bg-white shadow-brand"
                    >
                      <div className="relative h-28 overflow-hidden">
                        <Image
                          src={photoSrc}
                          alt={serviceImageAlt(service.title)}
                          fill
                          priority={index < 3}
                          loading={index < 3 ? undefined : "lazy"}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="200px"
                        />
                      </div>
                      <p className="px-3 py-2 text-center text-xs font-bold text-brand-blue">
                        {service.title}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="absolute -bottom-2 left-0 rounded-xl bg-white p-3 shadow-brand sm:-bottom-4 sm:-left-4 sm:p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm font-medium text-muted-foreground">
                Disponibilité
              </p>
              <p className="text-2xl font-bold text-brand-blue">Sous 24h</p>
              <p className="text-sm font-semibold text-brand-orange">
                Partout en Île-de-France
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path
            d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
