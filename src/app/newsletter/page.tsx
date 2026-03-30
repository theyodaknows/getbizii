import type { Metadata } from "next";
import { Mail, TrendingUp, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Newsletter | GetBizii",
  description:
    "Join the GetBizii newsletter — actionable insights on business formation, building business credit, brand identity, and growing a fundable company.",
};

const TOPICS = [
  {
    Icon: BookOpen,
    title: "Business Formation",
    description:
      "Entity structure, registered agents, EINs, and the steps most founders skip that cost them later.",
  },
  {
    Icon: TrendingUp,
    title: "Building Business Credit",
    description:
      "Trade lines, bureau reporting, and the exact sequence that builds a fundable credit profile from scratch.",
  },
  {
    Icon: Zap,
    title: "Brand & Visibility",
    description:
      "Logo systems, directory listings, and the identity work that makes your business look legitimate before it's large.",
  },
  {
    Icon: Mail,
    title: "Operator Tactics",
    description:
      "Real moves from founders in the field — what's working now across service businesses, e-commerce, and B2B.",
  },
];

export default function NewsletterPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="newsletter-hero-heading"
      >
        <p className="text-xs uppercase tracking-widest text-primary-sky font-semibold mb-4">
          Free · Weekly
        </p>
        <h1
          id="newsletter-hero-heading"
          className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Build Smarter.
          <br />
          <span className="text-primary-sky">Stay Ahead.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          The GetBizii newsletter delivers practical guidance on business
          formation, credit building, brand identity, and operational growth —
          straight to your inbox, every week.
        </p>

        {/* Sign-up form */}
        <form
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg"
          aria-label="Newsletter sign-up"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="your@email.com"
            className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-white/35">
          No spam. Unsubscribe anytime.
        </p>
      </section>

      {/* What you'll get */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="newsletter-topics-heading"
      >
        <h2
          id="newsletter-topics-heading"
          className="font-heading text-3xl font-bold text-white sm:text-4xl"
        >
          What We Cover
        </h2>

        <ul
          role="list"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TOPICS.map(({ Icon, title, description }) => (
            <li
              key={title}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8"
            >
              <Icon className="h-8 w-8 text-primary-sky" aria-hidden="true" />
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

      {/* CTA */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="newsletter-cta-heading"
      >
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-8 py-16 text-center sm:px-16">
          <h2
            id="newsletter-cta-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Ready to launch your business right?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            The newsletter keeps you informed — our services get it done. Explore
            what GetBizii builds for entrepreneurs like you.
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
