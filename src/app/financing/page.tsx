import type { Metadata } from "next";
import { DollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Financing | GetBizii",
  description:
    "Split your GetBizii purchase into manageable monthly payments. Flexible installment financing with fast approvals and no hard credit pull.",
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Services",
    description:
      "Select any GetBizii service or subscription plan à la carte. Financing is available on purchases above $500.",
  },
  {
    step: "02",
    title: "Apply in Minutes",
    description:
      "Complete a short application during your consultation. Most approvals are same-day with no hard credit pull required upfront.",
  },
  {
    step: "03",
    title: "Set Your Schedule",
    description:
      "Choose 3, 6, or 12-month repayment terms. Payments are fixed and predictable — no surprises.",
  },
  {
    step: "04",
    title: "We Get to Work",
    description:
      "Work begins immediately upon approval. You don't wait to start while payments are arranged.",
  },
];

const BENEFITS = [
  "No large upfront payment required",
  "Fixed monthly payments with no hidden fees",
  "Available on every GetBizii service",
  "Work begins immediately upon approval",
  "Terms from 3 to 12 months",
  "Soft credit check for initial qualification",
];

export default function FinancingPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="financing-hero-heading"
      >
        <p className="text-xs uppercase tracking-widest text-primary-sky font-semibold mb-4">
          Flexible Payments
        </p>
        <h1
          id="financing-hero-heading"
          className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Build Now.
          <br />
          <span className="text-primary-sky">Pay Over Time.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          Building your business credit foundation shouldn&apos;t be delayed
          by cash flow. GetBizii offers flexible installment financing so you
          can start building the right way — today — and spread the
          investment over time.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Apply for Financing
          </Button>
          <Button href="/#pricing-tiers" variant="secondary">
            Browse Plans
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="financing-how-heading"
      >
        <h2
          id="financing-how-heading"
          className="font-heading text-3xl font-bold text-white sm:text-4xl"
        >
          How It Works
        </h2>

        <ol
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Financing steps"
        >
          {HOW_IT_WORKS.map(({ step, title, description }) => (
            <li
              key={step}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8"
            >
              <p className="font-heading text-4xl font-bold text-primary-sky/70">
                {step}
              </p>
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Benefits */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="financing-benefits-heading"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2
              id="financing-benefits-heading"
              className="font-heading text-3xl font-bold text-white sm:text-4xl"
            >
              What&apos;s Included
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
              Our financing program is designed to remove the biggest barrier
              between entrepreneurs and a proper business foundation. No gimmicks,
              no surprise fees — just a straightforward payment plan.
            </p>
          </div>

          <ul role="list" className="grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-4"
              >
                <CheckCircle2
                  className="h-5 w-5 text-primary-sky shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm text-white/75">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing reference */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="financing-example-heading"
      >
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign
              className="h-8 w-8 text-primary-sky"
              aria-hidden="true"
            />
            <h2
              id="financing-example-heading"
              className="font-heading text-2xl font-bold text-white"
            >
              Example Payment Schedules
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "3-Month Plan", amount: "$1,000", monthly: "$333/mo" },
              {
                label: "6-Month Plan",
                amount: "$2,500",
                monthly: "$417/mo",
              },
              {
                label: "12-Month Plan",
                amount: "$5,000",
                monthly: "$417/mo",
              },
            ].map(({ label, amount, monthly }) => (
              <div
                key={label}
                className="rounded-xl bg-white/5 border border-white/10 p-6 text-center"
              >
                <p className="text-xs uppercase tracking-widest text-white/70 mb-3">
                  {label}
                </p>
                <p className="font-heading text-3xl font-bold text-white">
                  {monthly}
                </p>
                <p className="text-sm text-white/50 mt-1">
                  on a {amount} purchase
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/70 text-center">
            Example rates shown for illustration. Actual terms determined during
            consultation. Subject to approval.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="financing-cta-heading"
      >
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-8 py-16 text-center sm:px-16">
          <h2
            id="financing-cta-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Ready to get started?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Book a consultation and ask about financing options. We&apos;ll match you
            with the right plan and payment schedule for your situation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="primary">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/#pricing-tiers" variant="secondary">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
