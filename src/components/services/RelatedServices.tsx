import React from "react";
import { Building2, BookOpen, Calculator, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { getRelatedServices } from "@/data/services";

type LucideIcon = React.ComponentType<{
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

const iconMap: Record<string, LucideIcon> = {
  Building2,
  BookOpen,
  Calculator,
  Briefcase,
};

interface RelatedServicesProps {
  currentSlug: string;
  count?: number;
}

export function RelatedServices({ currentSlug, count = 3 }: RelatedServicesProps) {
  const related = getRelatedServices(currentSlug, count);

  if (related.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-heading"
      className="py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="related-heading"
          className="mb-10 text-3xl font-bold text-white sm:text-4xl"
        >
          Explore other services
        </h2>

        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {related.map((service) => {
            const Icon = iconMap[service.icon];

            return (
              <li key={service.slug}>
                <a
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group block h-full rounded-lg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                  )}
                >
                  <Card className="h-full p-6 transition-colors duration-200 group-hover:border-white/20 group-hover:bg-white/10">
                    {Icon && (
                      <div aria-hidden="true" className="mb-4">
                        <Icon size={28} className="text-cyan-400" />
                      </div>
                    )}
                    <h3 className="text-base font-semibold text-white">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {service.tagline}
                    </p>
                  </Card>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
