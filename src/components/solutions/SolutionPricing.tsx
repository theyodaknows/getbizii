import type { Solution } from "@/types";

interface SolutionPricingProps {
  solution: Solution;
}

export function SolutionPricing({ solution }: SolutionPricingProps) {
  if (solution.status === "waitlist") {
    return null;
  }

  return (
    <section aria-labelledby="solution-pricing-heading" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="solution-pricing-heading" className="sr-only">
          Pricing
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left panel — Investment */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-widest text-white/40">
              Investment
            </p>
            <p className="mt-2 text-4xl font-bold text-white">
              {solution.price}
            </p>
            <p className="mt-1 text-sm text-white/50">One-time build fee</p>
            <hr className="my-4 border-white/10" />
            {solution.financingNote && (
              <p className="text-sm text-primary-sky">{solution.financingNote}</p>
            )}
          </div>

          {/* Right panel — Right for you */}
          {solution.rightForYou && solution.rightForYou.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-widest text-white/40">
                This is right for you if&hellip;
              </p>
              <ul className="mt-3 space-y-3">
                {solution.rightForYou.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/65"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-emerald-400">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
