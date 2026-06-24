"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Mission" },
  { id: 3, label: "Coordonnées" },
  { id: 4, label: "Planning" },
];

interface QuoteStepIndicatorProps {
  currentStep: number;
}

export function QuoteStepIndicator({ currentStep }: QuoteStepIndicatorProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                  currentStep > step.id
                    ? "bg-brand-orange text-white"
                    : currentStep === step.id
                      ? "bg-brand-blue text-white shadow-brand"
                      : "bg-gray-100 text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "mt-2 hidden text-xs font-semibold sm:block",
                  currentStep >= step.id
                    ? "text-brand-blue"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 transition-colors duration-300",
                  currentStep > step.id ? "bg-brand-orange" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
