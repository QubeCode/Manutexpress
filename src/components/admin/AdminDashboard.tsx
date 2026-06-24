"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ClipboardList,
  Copy,
  Euro,
  RefreshCw,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SERVICES } from "@/lib/constants";
import {
  calculateDeposit,
  estimateRequestPrice,
  type DepositMode,
} from "@/lib/pricing";
import {
  REQUEST_STATUS_COLORS,
  REQUEST_STATUS_LABELS,
  type RequestStatus,
  type ServiceRequest,
} from "@/types/request";

function getServiceTitle(serviceId: string) {
  return SERVICES.find((s) => s.id === serviceId)?.title ?? serviceId;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [depositAmount, setDepositAmount] = useState("45");
  const [depositMode, setDepositMode] = useState<DepositMode>("fixed_45");
  const [status, setStatus] = useState<RequestStatus>("new");
  const [adminNotes, setAdminNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const selected = requests.find((r) => r.id === selectedId) ?? null;

  const estimate = useMemo(() => {
    if (!selected) return null;
    return estimateRequestPrice(
      selected.service,
      selected.mission,
      selected.scheduling
    );
  }, [selected]);

  const balanceDue = useMemo(() => {
    const total = Number(totalPrice);
    const deposit = Number(depositAmount);
    if (!total || !deposit) return 0;
    return Math.max(0, total - deposit);
  }, [totalPrice, depositAmount]);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/requests");
      const data = await res.json();
      setRequests(data.requests ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    if (selected) {
      setStatus(selected.status);
      setAdminNotes(selected.adminNotes ?? "");
      setTotalPrice(selected.pricing?.totalPrice?.toString() ?? "");
      setDepositAmount(
        selected.pricing?.depositAmount?.toString() ??
          estimate?.depositFixed.toString() ??
          "45"
      );
      setDepositMode(selected.pricing?.depositMode ?? "fixed_45");
    }
  }, [selected, estimate?.depositFixed]);

  const applyEstimate = () => {
    if (!estimate) return;
    setTotalPrice(estimate.suggestedTotal.toString());
    setDepositAmount(
      depositMode === "fixed_45"
        ? estimate.depositFixed.toString()
        : estimate.depositPercent.toString()
    );
  };

  const handleDepositModeChange = (mode: DepositMode) => {
    setDepositMode(mode);
    const total = Number(totalPrice);
    if (total > 0) {
      setDepositAmount(calculateDeposit(total, mode).toString());
    } else if (estimate) {
      setDepositAmount(
        mode === "fixed_45"
          ? estimate.depositFixed.toString()
          : estimate.depositPercent.toString()
      );
    }
  };

  const handleTotalChange = (value: string) => {
    setTotalPrice(value);
    const total = Number(value);
    if (total > 0) {
      setDepositAmount(calculateDeposit(total, depositMode).toString());
    }
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);

    const body: Record<string, unknown> = {
      status,
      adminNotes,
    };

    if (totalPrice && depositAmount) {
      const total = Number(totalPrice);
      const deposit = Number(depositAmount);
      body.pricing = {
        totalPrice: total,
        depositAmount: deposit,
        depositMode,
        balanceDue: total - deposit,
      };
    }

    try {
      const res = await fetch(`/api/requests/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchRequests();
        setSelectedId(data.request.id);
      }
    } finally {
      setSaving(false);
    }
  };

  const sendPaymentRequest = async () => {
    if (!selected || !totalPrice || !depositAmount) return;
    await handleSave();
  };

  const paymentUrl =
    typeof window !== "undefined" && selected
      ? `${window.location.origin}/payment?id=${selected.id}`
      : "";

  const copyPaymentLink = async () => {
    if (!paymentUrl) return;
    await navigator.clipboard.writeText(paymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-brand-blue">
            Demandes entrantes
          </h2>
          <Button variant="outline" size="sm" onClick={fetchRequests}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Chargement...</p>
        ) : requests.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Aucune demande pour le moment.
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <button
                key={request.id}
                type="button"
                onClick={() => setSelectedId(request.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all hover:shadow-sm ${
                  selectedId === request.id
                    ? "border-brand-blue bg-brand-blue/5 shadow-brand"
                    : "bg-white"
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="font-semibold text-brand-blue">
                    {getServiceTitle(request.service)}
                  </p>
                  <Badge
                    className={REQUEST_STATUS_COLORS[request.status]}
                    variant="secondary"
                  >
                    {REQUEST_STATUS_LABELS[request.status]}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5" />
                    {request.customer.firstName} {request.customer.lastName}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {request.scheduling.date} à {request.scheduling.time}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-3">
        {selected ? (
          <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-blue">
                Détail de la demande
              </h2>
              <Badge className={REQUEST_STATUS_COLORS[selected.status]}>
                {REQUEST_STATUS_LABELS[selected.status]}
              </Badge>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <InfoBlock label="Client">
                {selected.customer.firstName} {selected.customer.lastName}
                <br />
                {selected.customer.email}
                <br />
                {selected.customer.phone}
              </InfoBlock>
              <InfoBlock label="Service">
                {getServiceTitle(selected.service)}
              </InfoBlock>
              <InfoBlock label="Planning">
                {selected.scheduling.date} — {selected.scheduling.time}
                <br />
                {selected.scheduling.urgency === "urgent"
                  ? "Urgent"
                  : "Flexible"}
              </InfoBlock>
              <InfoBlock label="Référence">
                {selected.id}
                <br />
                Créée le {formatDate(selected.createdAt)}
              </InfoBlock>
            </div>

            <div className="mb-8 rounded-xl bg-gray-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-blue">
                <ClipboardList className="h-4 w-4" />
                Détails mission
              </p>
              <pre className="overflow-x-auto text-xs text-muted-foreground">
                {JSON.stringify(selected.mission, null, 2)}
              </pre>
            </div>

            {estimate && (
              <div className="mb-8 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                    <Sparkles className="h-4 w-4" />
                    Estimation automatique
                  </p>
                  <Button variant="outline" size="sm" onClick={applyEstimate}>
                    Appliquer {estimate.suggestedTotal} €
                  </Button>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {estimate.breakdown.map((line) => (
                    <li key={line.label} className="flex justify-between">
                      <span>{line.label}</span>
                      <span className="font-medium text-brand-blue">
                        {line.amount} €
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t pt-3 text-sm font-semibold text-brand-blue">
                  Total suggéré : {estimate.suggestedTotal} €
                </p>
              </div>
            )}

            <div className="space-y-5 border-t pt-6">
              <h3 className="font-semibold text-brand-blue">
                Validation admin
              </h3>

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select
                  value={status}
                  onValueChange={(v) => setStatus(v as RequestStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      Object.entries(REQUEST_STATUS_LABELS) as [
                        RequestStatus,
                        string,
                      ][]
                    ).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="totalPrice">Prix total final (€)</Label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="totalPrice"
                      type="number"
                      min="0"
                      className="pl-9"
                      placeholder="180"
                      value={totalPrice}
                      onChange={(e) => handleTotalChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depositAmount">Acompte demandé (€)</Label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="depositAmount"
                      type="number"
                      min="0"
                      className="pl-9"
                      placeholder="45"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Mode d&apos;acompte</Label>
                <RadioGroup
                  value={depositMode}
                  onValueChange={(v) =>
                    handleDepositModeChange(v as DepositMode)
                  }
                  className="grid gap-3 sm:grid-cols-2"
                >
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 ${
                      depositMode === "fixed_45"
                        ? "border-brand-blue bg-brand-blue/5"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value="fixed_45" />
                    <div>
                      <p className="font-semibold text-brand-blue">45€ fixe</p>
                      <p className="text-xs text-muted-foreground">
                        Acompte standard
                      </p>
                    </div>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 ${
                      depositMode === "percent_30"
                        ? "border-brand-blue bg-brand-blue/5"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value="percent_30" />
                    <div>
                      <p className="font-semibold text-brand-blue">30% du total</p>
                      <p className="text-xs text-muted-foreground">
                        Minimum 45€
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              {totalPrice && depositAmount && (
                <div className="rounded-xl bg-gray-50 p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Solde après prestation</span>
                    <span className="font-semibold text-brand-blue">
                      {balanceDue} €
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="adminNotes">Notes internes</Label>
                <Textarea
                  id="adminNotes"
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Notes pour l'équipe..."
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="secondary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Enregistrement..." : "Enregistrer la validation"}
                </Button>
                {totalPrice && depositAmount && (
                  <Button
                    variant="outline"
                    onClick={sendPaymentRequest}
                    disabled={saving}
                  >
                    Envoyer demande de paiement
                  </Button>
                )}
              </div>

              {selected.status === "awaiting_deposit" && selected.pricing && (
                <div className="rounded-xl border border-brand-orange/30 bg-brand-orange/5 p-4">
                  <p className="mb-2 text-sm font-semibold text-brand-blue">
                    Lien de paiement client
                  </p>
                  <p className="mb-3 break-all text-xs text-muted-foreground">
                    {paymentUrl}
                  </p>
                  <Button variant="outline" size="sm" onClick={copyPaymentLink}>
                    <Copy className="h-4 w-4" />
                    {copied ? "Copié !" : "Copier le lien"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed bg-white p-8 text-center text-muted-foreground">
            Sélectionnez une demande pour la traiter.
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-gray-50 p-4">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-brand-blue">{children}</p>
    </div>
  );
}
