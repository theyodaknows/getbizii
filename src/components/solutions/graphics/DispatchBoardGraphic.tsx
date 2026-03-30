export function DispatchBoardGraphic() {
  const jobs = [
    { job: "Leak Repair", tech: "Rodriguez", estimate: "$420", status: "Dispatched", statusColor: "text-blue-300 bg-blue-500/15 border-blue-500/25" },
    { job: "Water Heater", tech: "Williams", estimate: "$1,200", status: "In Progress", statusColor: "text-amber-300 bg-amber-500/15 border-amber-500/25" },
    { job: "Drain Clear", tech: "Kim", estimate: "$180", status: "Complete", statusColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/25" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-blue-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Active Jobs
          </p>
          <div className="space-y-2">
            {jobs.map((job) => (
              <div
                key={job.job}
                className="flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className="flex-1 text-xs text-white/80">{job.job}</span>
                <span className="text-[11px] text-white/40">{job.tech}</span>
                <span className="text-[11px] text-blue-300">{job.estimate}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${job.statusColor}`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
