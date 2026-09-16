import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/data/services";
import { PricingSelector } from "@/components/pricing";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing | GetBizii",
  description:
    "Choose individual GetBizii services à la carte. Net-30 terms are available on individual services.",
};

export default function PricingPage() {
  const services = getAllServices();

  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="pricing-hero-heading"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary-sky">
          Service Pricing
        </p>
        <h1
          id="pricing-hero-heading"
          className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Pick Only
          <br />
          <span className="text-primary-sky">What You Need.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          Choose only the GetBizii services your business needs right now.
          Net-30 terms are available on individual services.
        </p>
      </section>

      {/* Selector */}
      <section
        className="pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="pricing-selector-heading"
      >
        <h2 id="pricing-selector-heading" className="sr-only">
          À la carte service pricing
        </h2>
        <PricingSelector services={services} />
      </section>

      {/* CTA */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="pricing-cta-heading"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-16 text-center backdrop-blur-md sm:px-16">
          <h2
            id="pricing-cta-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Not sure which mix is right?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Book a consultation and we&apos;ll map your goals to the right mix
            of services and set up payment terms that fit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="primary">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/financing" variant="secondary">
              See Financing Options
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
