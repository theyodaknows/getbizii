import React from "react";
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ServiceFeature } from "@/types";

interface ServiceFeaturesProps {
  features: ServiceFeature[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section aria-labelledby="features-heading" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="features-heading"
          className="mb-10 text-3xl font-bold text-white sm:text-4xl"
        >
          What's included
        </h2>

        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2"
        >
          {features.map((feature) => (
            <li key={feature.title}>
              <Card className="h-full p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle
                    size={20}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
