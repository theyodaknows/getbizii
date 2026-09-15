import { Check } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { PRICING_TIERS } from "@/data/pricingTiers";

export function PricingTiersSection() {
  return (
    <section
      id="pricing-tiers"
      className="py-20 sm:py-28"
      aria-labelledby="pricing-tiers-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="pricing-tiers-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Two plans built to grow with your business.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.slug}
              className={cn(
                "rounded-2xl border p-6 backdrop-blur-md sm:p-8",
                tier.highlighted
                  ? "border-blue-400/30 bg-linear-to-br from-blue-500/25 to-blue-500/8"
                  : "border-white/10 bg-white/5"
              )}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  <span aria-hidden="true">★</span> Most Popular
                </span>
              )}
              <h3 className="font-heading text-2xl font-bold text-white">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-white/60">{tier.description}</p>
              <p className="mt-6 font-heading text-3xl font-bold text-white">
                {tier.priceLabel}
              </p>
              <ul className="mt-6 space-y-2" role="list">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-white/80"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href={tier.ctaHref}
                variant={tier.highlighted ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                {tier.ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
