"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SchedulingDetails } from "@/types/request";

interface QuoteSchedulingStepProps {
  data: SchedulingDetails;
  onChange: (data: Partial<SchedulingDetails>) => void;
}

export function QuoteSchedulingStep({
  data,
  onChange,
}: QuoteSchedulingStepProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xl font-semibold text-brand-blue">
          Planification souhaitée
        </h3>
        <p className="text-muted-foreground">
          Indiquez vos préférences. La date finale sera confirmée après étude
          de votre demande.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[17rem] -translate-x-1.5 gap-4 min-[400px]:max-w-xs sm:max-w-none sm:translate-x-0 sm:grid-cols-2 sm:gap-5">
        <div className="min-w-0 space-y-2 text-center sm:text-left">
          <Label htmlFor="date">Date souhaitée *</Label>
          <Input
            id="date"
            type="date"
            min={today}
            value={data.date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="quote-datetime-input box-border h-10 w-full min-w-0 max-w-full px-2.5 text-xs sm:h-11 sm:px-4 sm:text-sm"
          />
        </div>
        <div className="min-w-0 space-y-2 text-center sm:text-left">
          <Label htmlFor="time">Créneau horaire préféré *</Label>
          <Input
            id="time"
            type="time"
            value={data.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className="quote-datetime-input box-border h-10 w-full min-w-0 max-w-full px-2.5 text-xs sm:h-11 sm:px-4 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Priorité *</Label>
        <RadioGroup
          value={data.urgency}
          onValueChange={(v) =>
            onChange({ urgency: v as "urgent" | "flexible" })
          }
          className="grid gap-3 p-0.5 sm:grid-cols-2"
        >
          <label
            htmlFor="urgent"
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
              data.urgency === "urgent"
                ? "border-brand-orange bg-brand-orange/5"
                : "border-gray-200"
            }`}
          >
            <RadioGroupItem value="urgent" id="urgent" className="shrink-0" />
            <div>
              <p className="font-semibold text-brand-blue">Urgent</p>
              <p className="text-sm text-muted-foreground">
                Intervention sous 24h
              </p>
            </div>
          </label>
          <label
            htmlFor="flexible"
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
              data.urgency === "flexible"
                ? "border-brand-blue bg-brand-blue/5"
                : "border-gray-200"
            }`}
          >
            <RadioGroupItem value="flexible" id="flexible" className="shrink-0" />
            <div>
              <p className="font-semibold text-brand-blue">Flexible</p>
              <p className="text-sm text-muted-foreground">
                Date à convenir ensemble
              </p>
            </div>
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}
