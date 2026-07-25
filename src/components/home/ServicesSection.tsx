import { Building2, Layers, Database, CreditCard, Radar, ArrowRight } from "lucide-react";
import type { Service } from "@/types";

function getIcon(slug: string) {
  const map: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: "true" }>> = {
    "biz-setup": Building2,
    "visual-identity": Layers,
    "data-aggregator": Database,
    "credit-bureau": CreditCard,
    "credit-monitoring": Radar,
  };
  return map[slug] ?? Building2;
}

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [featured, ...rest] = services;

  return (
    <section
      id="services"
      className="py-20 sm:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="services-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Everything Your Business Needs
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            One platform. Five essential services. Zero guesswork.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 lg:grid-cols-5 lg:grid-rows-2">
          {/* Featured: Business Setup — large left card, spans 2 rows */}
          {featured && (() => {
            const FeaturedIcon = getIcon(featured.slug);
            return (
              <a
                href={`/services/${featured.slug}`}
                className="group relative flex flex-col rounded-2xl border border-blue-400/30 bg-linear-to-br from-blue-500/25 to-blue-500/8 p-8 backdrop-blur-md transition-all duration-200 hover:border-blue-400/50 hover:from-blue-500/30 hover:to-blue-500/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:col-span-3 lg:row-span-2"
                aria-label={`${featured.name} — ${featured.tagline}`}
              >
                {/* Badge */}
                <div className="mb-6 flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                    <span aria-hidden="true">★</span> Most Popular
                  </span>
                  <FeaturedIcon
                    className="h-8 w-8 text-blue-400"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/70">
                  {featured.tagline}
                </p>

                {/* Feature highlights */}
                <ul className="mt-6 space-y-2" role="list">
                  {featured.features.slice(0, 4).map((f) => (
                    <li key={f.title} className="flex items-center gap-2 text-sm text-white/60">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      {f.title}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:gap-3 transition-all duration-200">
                  {featured.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </a>
            );
          })()}

          {/* Right compact cards */}
          {rest.map((service) => {
            const Icon = getIcon(service.slug);
            return (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:col-span-2"
                aria-label={`${service.name} — ${service.tagline}`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-heading text-base font-semibold text-white group-hover:text-primary-sky transition-colors duration-200">
                    {service.name}
                  </h3>
                  <Icon className="h-5 w-5 shrink-0 text-white/40" aria-hidden="true" />
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                  {service.tagline}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-sky group-hover:gap-2 transition-all duration-200">
                  {service.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
