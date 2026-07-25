import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/types";

const TAG_COLORS: Record<string, string> = {
  "Biometric Tech": "bg-black/70 text-blue-300 border-blue-500/30",
  "Event Tech": "bg-black/70 text-amber-300 border-amber-500/30",
  "E-Commerce": "bg-black/70 text-emerald-300 border-emerald-500/30",
  "Service Tech": "bg-black/70 text-violet-300 border-violet-500/30",
  "Field Service Tech": "bg-black/70 text-rose-300 border-rose-500/30",
  "Fashion Tech": "bg-black/70 text-pink-300 border-pink-500/30",
  "Luxury Tech": "bg-black/70 text-yellow-300 border-yellow-500/30",
  "Coming Soon": "bg-black/70 text-white/50 border-white/20",
};

function tagClass(tag: string): string {
  return TAG_COLORS[tag] ?? "bg-black/70 text-white/70 border-white/20";
}

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

interface SolutionsSectionProps {
  solutions: Solution[];
}

export function SolutionsSection({ solutions }: SolutionsSectionProps) {
  const featuredSlugs = new Set(
    solutions
      .filter((s) => s.status === "active")
      .slice()
      .sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
      .slice(0, 2)
      .map((s) => s.slug)
  );

  const orderedSolutions = [
    ...solutions.filter((s) => featuredSlugs.has(s.slug)),
    ...solutions.filter((s) => !featuredSlugs.has(s.slug)),
  ];

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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(190px,auto)] [grid-auto-flow:dense]"
        >
          {orderedSolutions.map((solution) => {
            const isWaitlist = solution.status === "waitlist";
            const isFeatured = featuredSlugs.has(solution.slug);

            return (
              <li
                key={solution.slug}
                className={[
                  "relative flex min-h-[190px]",
                  isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : "",
                ].join(" ")}
              >
                <a
                  href={isWaitlist ? "#contact" : `/solutions/${solution.slug}`}
                  className={[
                    "group relative flex w-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    isWaitlist
                      ? "cursor-default border-white/8"
                      : "border-white/10 hover:border-white/25 hover:-translate-y-0.5",
                  ].join(" ")}
                  aria-label={`${solution.name}${isWaitlist ? " — Coming Soon" : ` — ${solution.price}`}`}
                >
                  <Image
                    src={`/images/bento/${solution.slug}.png`}
                    alt=""
                    fill
                    sizes={
                      isFeatured
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    }
                    className={[
                      "z-0 object-cover",
                      isWaitlist ? "grayscale-[0.4] opacity-90" : "",
                    ].join(" ")}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-0 bg-linear-to-t from-void/95 via-void/55 to-void/15"
                  />
                  <div aria-hidden="true" className="absolute inset-0 z-0 bg-void/25" />

                  <span
                    className={[
                      "relative z-10 mb-4 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm",
                      tagClass(solution.tag),
                    ].join(" ")}
                  >
                    {solution.tag}
                  </span>

                  <h3 className="relative z-10 font-heading text-base font-semibold text-white">
                    {solution.name}
                  </h3>

                  <p className="relative z-10 mt-1.5 flex-1 text-sm leading-relaxed text-white/95">
                    {solution.shortDescription}
                  </p>

                  <div className="relative z-10 mt-5 flex items-end justify-between">
                    <span
                      className={[
                        "text-lg font-bold",
                        isWaitlist ? "text-white/50" : "text-white",
                      ].join(" ")}
                    >
                      {solution.price}
                    </span>
                    {isWaitlist ? (
                      <span className="text-xs font-semibold text-white/50">
                        Join Waitlist
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-primary-sky transition-all duration-200 group-hover:gap-2">
                        Learn More
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </a>

                {isWaitlist && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm"
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
