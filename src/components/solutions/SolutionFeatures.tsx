import { Check } from "lucide-react";
import type { Solution } from "@/types";

interface SolutionFeaturesProps {
  solution: Solution;
}

export function SolutionFeatures({ solution }: SolutionFeaturesProps) {
  return (
    <section aria-labelledby="solution-features-heading" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="solution-features-heading"
          className="font-heading text-2xl font-bold text-white sm:text-3xl"
        >
          What&apos;s Built For You
        </h2>

        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {solution.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                <Check size={12} className="text-blue-400" />
              </span>
              <span className="text-sm text-white/75">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
