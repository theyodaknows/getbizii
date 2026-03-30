import type { Metadata } from "next";
import { Zap, Shield, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About GetBizii — Business Identity Platform",
  description:
    "Learn about GetBizii, the business identity platform built by Nobel Gemini Ventures to help entrepreneurs launch, build credit, get discovered, and develop a brand that lasts.",
};

const STATS = [
  { value: "500+", label: "Businesses Launched" },
  { value: "4", label: "Core Services" },
  { value: "NGV", label: "Nobel Gemini Ventures" },
];

const VALUES = [
  {
    Icon: Zap,
    title: "Speed Without Shortcuts",
    description:
      "We move fast and we do it right. Speed to market matters, but not at the cost of the foundation your business is built on.",
  },
  {
    Icon: Shield,
    title: "Protect the Builder",
    description:
      "Every entrepreneur takes a risk. Our job is to reduce the ones that shouldn't exist — legal gaps, invisible credit files, and missed visibility.",
  },
  {
    Icon: Layers,
    title: "Complete, Not Partial",
    description:
      "We don't hand you one piece and walk away. GetBizii builds the whole foundation: legal, credit, visibility, and brand — together.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Section 1 — Hero */}
      <section
        className="pt-32 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="about-hero-heading"
      >
        <h1
          id="about-hero-heading"
          className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Built for Builders.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          GetBizii is the business identity platform for entrepreneurs who refuse
          to settle. We handle the foundation — legal, credit, visibility, brand
          — so you can focus on what you built this for.
        </p>
      </section>

      {/* Section 2 — Mission */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="mission-heading"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left: text */}
          <div>
            <h2
              id="mission-heading"
              className="font-heading text-3xl font-bold text-white sm:text-4xl"
            >
              Our Mission
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
              Most business formation services stop at the paperwork. We start
              there. GetBizii was built on the belief that every entrepreneur
              deserves a complete launch — not just an LLC number, but a
              fundable credit profile, a discoverable presence, and a brand
              identity that commands respect from day one.
            </p>
          </div>

          {/* Right: stats */}
          <ul role="list" className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {STATS.map(({ value, label }) => (
              <li
                key={label}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6"
              >
                <p className="font-heading text-4xl font-bold text-primary-sky">
                  {value}
                </p>
                <p className="mt-2 text-sm text-white/60">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 3 — Values */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="values-heading"
      >
        <h2
          id="values-heading"
          className="font-heading text-3xl font-bold text-white sm:text-4xl"
        >
          What We Stand For
        </h2>

        <ul
          role="list"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VALUES.map(({ Icon, title, description }) => (
            <li
              key={title}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8"
            >
              <Icon
                className="h-8 w-8 text-primary-sky"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 4 — CTA */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="about-cta-heading"
      >
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-8 py-16 text-center sm:px-16">
          <h2
            id="about-cta-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Ready to Build?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Start with a conversation. Tell us where you are and where you're
            going — we'll show you how GetBizii gets you there.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/#contact" variant="primary">
              Get Started
            </Button>
            <Button href="/services/biz-setup" variant="secondary">
              View Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
