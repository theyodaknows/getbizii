import React from "react";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

interface ServiceCTAProps {
  service: Service;
}

export function ServiceCTA({ service }: ServiceCTAProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-blue-800/20 border border-white/10 px-8 py-14 text-center sm:px-12 sm:py-16">
          <h2
            id="cta-heading"
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Start your {service.name} journey with GetBizii today.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={service.ctaHref} variant="primary">
              {service.ctaLabel}
            </Button>
            <a
              href="/contact"
              className="text-sm font-medium text-white/70 underline underline-offset-4 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Talk to our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
