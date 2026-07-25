import { CheckCircle2, ArrowRight } from "lucide-react";
import { PaymentCalculator } from "./PaymentCalculator";
import { Button } from "@/components/ui";
import { BUNDLE_PRICE } from "@/data/pricing";
import type { Service } from "@/types";

const FINANCING_PERKS = [
  "Monthly plans from $399/mo",
  "No hard credit pull",
  "24hr approval decisions",
  "0% interest for qualifying applicants",
  "Revenue share options available",
];

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

interface FinancingSectionProps {
  services: Service[];
}

export function FinancingSection({ services }: FinancingSectionProps) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="financing-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="financing-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Flexible Financing
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Launch your business without draining your savings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Left: Net Terms — installments on Business Solution builds */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
            <h3 className="font-heading text-2xl font-bold text-white">
              Net Terms
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Installment plans for full Business Solution builds.
            </p>

            <ul role="list" className="mt-6 space-y-3">
              {FINANCING_PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white/80">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PaymentCalculator />
            </div>
          </div>

          {/* Right: Service Pricing — bundle or a la carte, net-30 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
            <h3 className="font-heading text-2xl font-bold text-white">
              Service Pricing
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Bundle everything or pick individual services — net-30 terms
              available.
            </p>

            <ul role="list" className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug} className="flex items-center gap-3">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-primary-sky"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white/80">{service.name}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-heading text-3xl font-bold text-white">
              Bundle from {formatCurrency(BUNDLE_PRICE)}
            </p>

            <Button href="/pricing" variant="primary" className="mt-6 w-full">
              See Full Pricing
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
