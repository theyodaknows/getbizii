"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const STEPS = [
  {
    number: "01",
    title: "AI Review",
    description:
      "Our AI agent reviews your business profile and identifies the fastest path to build strong credit.",
  },
  {
    number: "02",
    title: "Identity Established",
    description:
      "We register your business identity across the major credit bureaus and data aggregators.",
  },
  {
    number: "03",
    title: "Build Credit",
    description:
      "Your Copilot recommends tradelines and vendor relationships that build your credit file month over month.",
  },
  {
    number: "04",
    title: "Monitor Credit",
    description:
      "Real-time monitoring keeps you alerted to every change so you always know where you stand.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("py-20 sm:py-28", inView && "in-view")}
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="how-it-works-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            How It Works
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            From first review to a monitored, fundable credit profile.
          </p>
        </div>

        {/* Timeline grid */}
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          >
            <span className="how-it-works-glare" aria-hidden="true" />
          </div>

          {STEPS.map((step, i) => (
            <li
              key={step.number}
              className="relative flex flex-col"
              style={{ "--step-delay": `${i * 0.5}s` } as React.CSSProperties}
            >
              {/* Step number badge */}
              <div
                className="how-it-works-badge relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/20"
                aria-hidden="true"
              >
                <span className="font-heading text-2xl font-bold text-blue-300">
                  {step.number}
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>

              {/* Mobile connector */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute left-10 top-20 h-8 w-px bg-gradient-to-b from-blue-400/30 to-transparent lg:hidden"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
