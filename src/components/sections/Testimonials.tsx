"use client";

import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <AnimatedSection id="temoignages" className="section-padding bg-white">
      <div className="container-max">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Avis clients
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-brand-blue sm:text-4xl">
            Ils nous font confiance
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Des centaines de clients satisfaits en Île-de-France.
          </p>
        </div>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <div className="relative h-full rounded-2xl border bg-gray-50 p-6">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-orange/20" />
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-brand-orange text-brand-orange"
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-brand-blue">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {testimonial.service}
                  </Badge>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
