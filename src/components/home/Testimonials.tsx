const TESTIMONIALS = [
  {
    quote:
      "GetBizii took my mobile detailing idea from a concept to a fully operational business in under two weeks. The booking system alone paid for itself in the first month.",
    author: "Marcus T.",
    businessType: "Mobile Detailing Owner",
    rating: 5,
  },
  {
    quote:
      "I tried to launch my party rental business for six months and got nowhere. GetBizii built everything — website, booking system, contracts — in 10 days.",
    author: "Priya K.",
    businessType: "Party Rental Entrepreneur",
    rating: 5,
  },
  {
    quote:
      "The CPA services alone are worth it. They found deductions in my first year that more than covered the entire platform cost.",
    author: "Jordan L.",
    businessType: "Small Business Owner",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section
      className="py-20 sm:py-28"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            What Entrepreneurs Are Saying
          </h2>
        </div>

        <ul role="list" className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.author}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                {/* Large decorative quote mark */}
                <span
                  aria-hidden="true"
                  className="mb-4 font-heading text-5xl font-bold leading-none text-blue-500/60"
                >
                  &ldquo;
                </span>

                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed text-white/70">
                    {t.quote}
                  </p>
                </blockquote>

                <figcaption className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-white/50">{t.businessType}</p>
                  </div>
                  <div
                    className="flex gap-0.5"
                    role="img"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-amber-400" aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
