"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Service } from "@/types";

interface PricingSelectorProps {
  services: Service[];
}

export function PricingSelector({ services }: PricingSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(services.map((s) => s.slug))
  );

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  const selectedOneTime = services
    .filter((s) => s.priceType === "one-time" && selected.has(s.slug))
    .reduce((sum, s) => sum + s.price, 0);
  const selectedMonthly = services
    .filter((s) => s.priceType === "monthly" && selected.has(s.slug))
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="mx-auto max-w-xl">
      {/* À la carte checklist */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8">
        <h3 className="font-heading text-2xl font-bold text-white">
          Build Your Own
        </h3>
        <p className="mt-2 text-sm text-white/60">
          Uncheck anything you don&apos;t need. Every service is available on its
          own.
        </p>

        <ul role="list" className="mt-6 space-y-1">
          {services.map((s) => {
            const inputId = `pricing-${s.slug}`;
            return (
              <li key={s.slug}>
                <label
                  htmlFor={inputId}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={selected.has(s.slug)}
                      onChange={() => toggle(s.slug)}
                      className="h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                    />
                    <span className="text-sm text-white/85">{s.name}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-white">
                    {formatCurrency(s.price)}
                    {s.priceType === "monthly" && (
                      <span className="font-normal text-white/50">/mo</span>
                    )}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <div
          aria-live="polite"
          className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Your total
          </p>
          <p className="mt-1 font-heading text-3xl font-bold text-white">
            {formatCurrency(selectedOneTime)}
            {selectedMonthly > 0 && (
              <span className="text-lg font-normal text-white/70">
                {" "}
                + {formatCurrency(selectedMonthly)}/mo
              </span>
            )}
          </p>
        </div>

        <p className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          Net-30 terms available on individual services
        </p>

        <Button href="/contact" variant="secondary" className="mt-6 w-full">
          Talk to Us About This Mix
        </Button>
      </div>
    </div>
  );
}
