import React from "react";
import {
  Building2,
  BookOpen,
  Calculator,
  Briefcase,
  Layers,
  Radar,
  FileText,
  Palette,
  Type,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Check,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Service } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  Building2,
  BookOpen,
  Calculator,
  Briefcase,
  Layers,
  Radar,
};

interface Breadcrumb {
  label: string;
  href: string;
}

interface ServiceHeroProps {
  service: Service;
  breadcrumbs: Breadcrumb[];
}

export function ServiceHero({ service, breadcrumbs }: ServiceHeroProps) {
  const Icon = iconMap[service.icon];
  const isVisualIdentity = service.slug === "visual-identity";
  const isCreditBureau = service.slug === "credit-bureau";
  const isDataAggregator = service.slug === "data-aggregator";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "bg-linear-to-br from-void via-[#0a1630] to-void",
        "border-b border-white/10",
        "pt-24 pb-16 sm:pt-32 sm:pb-20"
      )}
    >
      {/* Subtle glow behind icon area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/30">
                    /
                  </span>
                )}
                <a
                  href={crumb.href}
                  className={cn(
                    "transition-colors duration-150 hover:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  )}
                >
                  {crumb.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2" aria-current="page">
              <span aria-hidden="true" className="text-white/30">
                /
              </span>
              <span className="text-white/80">{service.name}</span>
            </li>
          </ol>
        </nav>

        {/* Hero content */}
        <div
          className={cn(
            "flex flex-col gap-4 lg:flex-row lg:justify-between",
            isVisualIdentity ? "lg:items-start" : "lg:items-center"
          )}
        >
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {service.name}
            </h1>
            <p className="mt-4 text-lg text-white/70 sm:text-xl">
              {service.tagline}
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg whitespace-pre-line">
              {service.description}
            </p>
          </div>

          {/* Decorative icon */}
          {isVisualIdentity ? (
            <BrandIdentityDocumentGraphic />
          ) : isCreditBureau ? (
            <CreditBureauReportGraphic />
          ) : isDataAggregator ? (
            <DataAggregatorDirectoriesGraphic />
          ) : (
            Icon && (
              <div aria-hidden="true" className="shrink-0 lg:pr-8">
                <Icon
                  size={120}
                  className="text-white/10 lg:text-white/15"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function DataAggregatorDirectoriesGraphic() {
  const directories = [
    "Google Business Profile",
    "Apple Maps",
    "Bing Places",
    "Yelp",
    "Facebook",
    "Data Axle",
    "Foursquare",
    "Neustar Localeze",
  ];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2"
    >
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />

      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <div className="mb-3 border-b border-white/10 pb-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-white/75">
              DIRECTORY SYNC STATUS
            </p>
            <p className="mt-1 text-[11px] text-white/55">
              Listings verified and synchronized
            </p>
          </div>

          <div className="space-y-2.5">
            {directories.map((directory, index) => (
              <div
                key={directory}
                className="directory-row flex items-center justify-between rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className="text-xs text-white/80">{directory}</span>
                <span
                  className="directory-check-badge inline-flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ animationDelay: `${index * 220}ms` }}
                >
                  <Check size={12} className="text-slate-950" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreditBureauReportGraphic() {
  const bureauLogos = [
    { short: "D&B", name: "Dun & Bradstreet" },
    { short: "EXP", name: "Experian" },
    { short: "EFX", name: "Equifax" },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2"
    >
      <div className="pointer-events-none absolute -left-10 top-12 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl" />

      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-cyan-300" />
              <span className="text-xs font-semibold tracking-[0.14em] text-white/75">
                BUSINESS CREDIT REPORT
              </span>
            </div>
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] text-white/60">
              LIVE
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-slate-900/80 p-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/60">
                <BarChart3 size={13} className="text-cyan-300" />
                Bureau Scores
              </div>
              <div className="space-y-2">
                <ScoreRow label="Paydex" value="82" />
                <ScoreRow label="Intelliscore" value="78" />
                <ScoreRow label="Risk Score" value="80" />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-900/80 p-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/60">
                <ShieldCheck size={13} className="text-cyan-300" />
                Trade Line Health
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-2 text-white/80">
                  6 Active
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-2 text-white/80">
                  0 Late
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-2 text-white/80">
                  94% On-Time
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-900/80 p-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/60">
                <TrendingUp size={13} className="text-cyan-300" />
                Bureau Network
              </div>
              <div className="credit-bureau-carousel group relative overflow-hidden rounded-md border border-white/10 bg-white/[0.03] py-2">
                <div className="bureau-scroll flex w-max gap-2 px-2">
                  {[...bureauLogos, ...bureauLogos].map((bureau, index) => (
                    <div
                      key={`${bureau.short}-${index}`}
                      className="flex items-center gap-2 rounded-md border border-white/15 bg-slate-900/80 px-2 py-1.5 text-[10px] text-white/75"
                    >
                      <span className="rounded bg-cyan-400/20 px-1.5 py-0.5 font-semibold text-cyan-200">
                        {bureau.short}
                      </span>
                      <span>{bureau.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-white/65">{label}</span>
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
        </div>
        <span className="text-xs font-semibold text-white">{value}</span>
      </div>
    </div>
  );
}

function BrandIdentityDocumentGraphic() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2"
    >
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl" />

      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-cyan-300" />
              <span className="text-xs font-semibold tracking-[0.14em] text-white/75">
                BRAND IDENTITY GUIDE
              </span>
            </div>
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] text-white/60">
              v1.0
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-slate-900/80 p-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/60">
                <CheckCircle2 size={13} className="text-cyan-300" />
                Logo System
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-500">
                  <Layers size={18} className="text-slate-950" />
                </div>
                <div className="h-2 w-24 rounded-full bg-white/90" />
                <div className="h-2 w-12 rounded-full bg-white/35" />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-900/80 p-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/60">
                <Palette size={13} className="text-cyan-300" />
                Color Palette
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="h-8 rounded-md bg-[#22D3EE]" />
                <div className="h-8 rounded-md bg-[#3B82F6]" />
                <div className="h-8 rounded-md bg-[#1E293B]" />
                <div className="h-8 rounded-md bg-[#E2E8F0]" />
                <div className="h-8 rounded-md bg-[#0F172A]" />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-900/80 p-3">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/60">
                <Type size={13} className="text-cyan-300" />
                Typography
              </div>
              <div className="space-y-2">
                <div className="h-2 w-4/5 rounded-full bg-white/85" />
                <div className="h-2 w-3/5 rounded-full bg-white/50" />
                <div className="h-2 w-2/5 rounded-full bg-white/35" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
