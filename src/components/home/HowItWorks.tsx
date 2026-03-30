const STEPS = [
  {
    number: "01",
    title: "Choose Your Path",
    description:
      "Browse our service packages or business solutions and select what fits your goals.",
  },
  {
    number: "02",
    title: "We Build Your Stack",
    description:
      "Our team handles formation, tech setup, branding, and every system you need.",
  },
  {
    number: "03",
    title: "Launch & Go Live",
    description:
      "Your business is operational with everything configured and ready to take clients.",
  },
  {
    number: "04",
    title: "Grow With Support",
    description:
      "Ongoing maintenance, updates, and strategic support as your business scales.",
  },
];

export function HowItWorks() {
  return (
    <section
      className="py-20 sm:py-28"
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
            From idea to operational business in days, not months.
          </p>
        </div>

        {/* Timeline grid */}
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
          />

          {STEPS.map((step, i) => (
            <li
              key={step.number}
              className="relative flex flex-col"
            >
              {/* Step number badge */}
              <div
                className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/30 to-cyan-500/20 border border-blue-400/20"
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
