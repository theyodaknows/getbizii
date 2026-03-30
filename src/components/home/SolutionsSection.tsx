import { ArrowRight } from "lucide-react";
import type { Solution } from "@/types";

const TAG_COLORS: Record<string, string> = {
  "Biometric Tech": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Event Tech": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "E-Commerce": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Service Tech": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Field Service Tech": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Fashion Tech": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Luxury Tech": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Coming Soon": "bg-white/10 text-white/50 border-white/20",
};

function tagClass(tag: string): string {
  return TAG_COLORS[tag] ?? "bg-white/10 text-white/50 border-white/20";
}

interface SolutionsSectionProps {
  solutions: Solution[];
}

export function SolutionsSection({ solutions }: SolutionsSectionProps) {
  return (
    <section
      id="solutions"
      className="py-20 sm:py-28"
      aria-labelledby="solutions-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="solutions-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Business Solutions
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            Complete tech stacks for specific business types. Pick your business,
            we build the empire.
          </p>
        </div>

        <ul
          role="list"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {solutions.map((solution) => {
            const isWaitlist = solution.status === "waitlist";
            return (
              <li key={solution.slug} className="relative">
                <a
                  href={isWaitlist ? "#contact" : `/solutions/${solution.slug}`}
                  className={[
                    "group flex h-full flex-col rounded-2xl border p-6 backdrop-blur-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    isWaitlist
                      ? "cursor-default border-white/8 bg-white/3 opacity-70"
                      : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8 hover:-translate-y-0.5",
                  ].join(" ")}
                  aria-label={`${solution.name}${isWaitlist ? " — Coming Soon" : ` — ${solution.price}`}`}
                >
                  {/* Tag badge */}
                  <span
                    className={[
                      "mb-4 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                      tagClass(solution.tag),
                    ].join(" ")}
                  >
                    {solution.tag}
                  </span>

                  <h3 className="font-heading text-base font-semibold text-white">
                    {solution.name}
                  </h3>

                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-white/60">
                    {solution.shortDescription}
                  </p>

                  <div className="mt-5 flex items-end justify-between">
                    <span className={["text-lg font-bold", isWaitlist ? "text-white/40" : "text-white"].join(" ")}>
                      {solution.price}
                    </span>
                    {isWaitlist ? (
                      <span className="text-xs font-semibold text-white/40">
                        Join Waitlist
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary-sky group-hover:gap-2 transition-all duration-200">
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </a>

                {/* Coming soon overlay badge */}
                {isWaitlist && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50"
                  >
                    Coming Soon
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
