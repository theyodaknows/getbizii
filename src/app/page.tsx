import { getAllServices } from "@/data/services";

export default function HomePage() {
  const services = getAllServices();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-void via-[#0a1630] to-void pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* Background glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-violet/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-sky">
              Business Identity Platform
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build your business{" "}
              <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                right the first time
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
              GetBizii brings together business formation, bookkeeping, CPA
              services, and legal guidance under one roof — so you spend less
              time on compliance and more time building.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/services/biz-setup"
                className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
              >
                Get Started
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 sm:py-24" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              id="services-heading"
              className="font-heading text-3xl font-bold text-white sm:text-4xl"
            >
              Everything your business needs
            </h2>
            <p className="mt-4 text-base text-white/60 sm:text-lg">
              One platform. Four essential services. Zero guesswork.
            </p>
          </div>

          <ul
            role="list"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
                >
                  <h3 className="font-heading text-lg font-semibold text-white group-hover:text-primary-sky transition-colors duration-200">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                    {service.tagline}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-primary-sky">
                    {service.ctaLabel} →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
