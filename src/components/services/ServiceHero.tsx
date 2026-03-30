import React from "react";
import { Building2, BookOpen, Calculator, Briefcase } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Service } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  Building2,
  BookOpen,
  Calculator,
  Briefcase,
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

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        "bg-gradient-to-br from-[#070E1F] via-[#0a1630] to-[#070E1F]",
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {service.name}
            </h1>
            <p className="mt-4 text-lg text-white/70 sm:text-xl">
              {service.tagline}
            </p>
          </div>

          {/* Decorative icon */}
          {Icon && (
            <div aria-hidden="true" className="shrink-0 lg:pr-8">
              <Icon
                size={120}
                className="text-white/10 lg:text-white/15"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
