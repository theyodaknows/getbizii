import Link from "next/link";
import type { Solution } from "@/types";

interface SolutionCTAProps {
  solution: Solution;
}

export function SolutionCTA({ solution }: SolutionCTAProps) {
  const isWaitlist = solution.status === "waitlist";

  const headline = isWaitlist
    ? `Be first to know when ${solution.name} launches.`
    : `Ready to launch your ${solution.name} business?`;

  const subtext = isWaitlist
    ? "Join the waitlist and we'll reach out when it's ready."
    : "Let's talk about your goals and get you started.";

  const primaryLabel = isWaitlist ? "Join Waitlist" : "Get Started";
  const primaryHref = isWaitlist ? "/#contact" : "/contact";

  return (
    <section
      aria-labelledby="solution-cta-heading"
      className="py-20 text-center"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="solution-cta-heading"
          className="font-heading text-3xl font-bold text-white"
        >
          {headline}
        </h2>

        <p className="mt-4 text-lg text-white/60">{subtext}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {primaryLabel}
          </Link>

          <Link
            href="/#solutions"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            View All Solutions
          </Link>
        </div>
      </div>
    </section>
  );
}
