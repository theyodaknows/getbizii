export function OrderPipelineGraphic() {
  const orders = [
    { id: "#1042", item: "Business Cards", status: "Sent to Printer", statusColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25" },
    { id: "#1043", item: "Banners × 3", status: "In Production", statusColor: "text-blue-300 bg-blue-500/15 border-blue-500/25" },
    { id: "#1044", item: "T-Shirts × 12", status: "Awaiting Artwork", statusColor: "text-amber-300 bg-amber-500/15 border-amber-500/25" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Order Pipeline
          </p>
          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className="w-10 shrink-0 text-[11px] text-white/30">{order.id}</span>
                <span className="flex-1 text-xs text-white/80">{order.item}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
