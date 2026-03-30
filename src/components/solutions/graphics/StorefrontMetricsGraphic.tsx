export function StorefrontMetricsGraphic() {
  const metrics = [
    { value: "48", label: "Active Listings" },
    { value: "$3,240", label: "Revenue" },
    { value: "12%", label: "Conversion" },
    { value: "94", label: "Units Sold" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-pink-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-rose-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Storefront Metrics
          </p>
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-md border border-white/10 bg-slate-900/80 p-3 text-center"
              >
                <p className="text-lg font-bold text-white">{m.value}</p>
                <p className="mt-0.5 text-[11px] text-white/45">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-md border border-pink-500/20 bg-pink-500/10 px-3 py-1.5 text-center text-[11px] text-pink-300">
            Instagram Shop Connected
          </div>
        </div>
      </div>
    </div>
  );
}
