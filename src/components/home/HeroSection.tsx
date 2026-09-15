"use client";

import { RotatingText } from "@/components/ui/RotatingText";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* NGV badge */}
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
            <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse" aria-hidden="true" />
            Powered by NGV
          </p>

          {/* Main heading */}
          <h1
            id="hero-heading"
            className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            We Don&apos;t Just Launch Businesses —
            <br />
            <span className="mt-4 inline-flex items-center justify-center flex-wrap gap-2">
              <span className="text-white">We Build</span>
              <RotatingText
                texts={["Identities.", "Corporations.", "Brands.", "Empires."]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg shadow-lg"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl font-light">
            From LLC formation to full brand launch in weeks.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Get Started →
            </a>
            <a
              href="#credit-copilot"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Meet the Copilot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
