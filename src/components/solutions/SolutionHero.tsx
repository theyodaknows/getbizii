import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Solution } from "@/types";
import {
  AppointmentSchedulerGraphic,
  RentalCalendarGraphic,
  OrderPipelineGraphic,
  DetailingJobsGraphic,
  DispatchBoardGraphic,
  StorefrontMetricsGraphic,
  CustomOrderWorkflowGraphic,
  ComingSoonGraphic,
} from "@/components/solutions/graphics";

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

function SolutionGraphic({ slug }: { slug: string }) {
  switch (slug) {
    case "mobile-dna-livescanning":
      return <AppointmentSchedulerGraphic />;
    case "party-rental":
      return <RentalCalendarGraphic />;
    case "print-reseller":
      return <OrderPipelineGraphic />;
    case "mobile-detailing":
      return <DetailingJobsGraphic />;
    case "plumber":
      return <DispatchBoardGraphic />;
    case "mini-apparel-shop":
      return <StorefrontMetricsGraphic />;
    case "custom-jewelry":
      return <CustomOrderWorkflowGraphic />;
    default:
      return <ComingSoonGraphic />;
  }
}

interface SolutionHeroProps {
  solution: Solution;
}

export function SolutionHero({ solution }: SolutionHeroProps) {
  const isWaitlist = solution.status === "waitlist";
  const heroId = "solution-hero-heading";

  return (
    <section
      aria-labelledby={heroId}
      className={cn(
        "relative w-full overflow-hidden",
        "bg-linear-to-br from-void via-[#0a1630] to-void",
        "border-b border-white/10",
        "pt-24 pb-16 sm:pt-32 sm:pb-20"
      )}
    >
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50">
            <li className="flex items-center gap-2">
              <Link
                href="/"
                className={cn(
                  "transition-colors duration-150 hover:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                )}
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="text-white/30">/</span>
              <Link
                href="/#solutions"
                className={cn(
                  "transition-colors duration-150 hover:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                )}
              >
                Solutions
              </Link>
            </li>
            <li className="flex items-center gap-2" aria-current="page">
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-white/80">{solution.name}</span>
            </li>
          </ol>
        </nav>

        {/* Hero content */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            {/* Tag badge */}
            <span
              className={cn(
                "mb-4 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                tagClass(solution.tag)
              )}
            >
              {solution.tag}
            </span>

            <h1
              id={heroId}
              className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {solution.name}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-white/60 sm:text-xl">
              {solution.shortDescription}
            </p>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={cn("text-2xl font-bold", isWaitlist ? "text-white/40" : "text-white")}>
                {isWaitlist ? "TBD" : solution.price}
                {!isWaitlist && (
                  <span className="sr-only">One-time build fee</span>
                )}
              </span>
              {!isWaitlist && (
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/60" aria-hidden="true">
                  One-time build fee
                </span>
              )}
            </div>
          </div>

          {/* Graphic */}
          <div className="mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
            <SolutionGraphic slug={solution.slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
