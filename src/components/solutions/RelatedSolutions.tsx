import Link from "next/link";
import { cn } from "@/lib/cn";
import { getRelatedSolutions } from "@/data/solutions";
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

interface RelatedSolutionsProps {
  solution: Solution;
}

export function RelatedSolutions({ solution }: RelatedSolutionsProps) {
  const related = getRelatedSolutions(solution.slug, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="solution-related-heading"
      className="py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="solution-related-heading"
          className="font-heading text-2xl font-bold text-white sm:text-3xl"
        >
          Other Solutions
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 p-5",
                "transition-colors hover:border-white/20 hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              )}
            >
              <span
                className={cn(
                  "inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                  tagClass(s.tag)
                )}
              >
                {s.tag}
              </span>

              <p className="mt-2 text-base font-semibold text-white">
                {s.name}
              </p>

              <p className="mt-1 line-clamp-2 text-sm text-white/55">
                {s.shortDescription}
              </p>

              <p className="mt-3 text-sm font-semibold text-primary-sky">
                {s.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
