import { MapPin } from "lucide-react";

export function DetailingJobsGraphic() {
  const jobs = [
    { time: "8:30 AM", service: "Full Detail", rating: "★★★★★" },
    { time: "11:00 AM", service: "Interior Only", rating: "★★★★☆" },
    { time: "2:30 PM", service: "Express Wash", rating: "Pending" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-violet-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-purple-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Today&apos;s Jobs
          </p>
          <div className="space-y-2">
            {jobs.map((job) => (
              <div
                key={job.time}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className="w-16 shrink-0 text-[11px] text-white/40">{job.time}</span>
                <span className="flex-1 text-xs text-white/80">{job.service}</span>
                <span className="text-[11px] text-amber-400">{job.rating}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-md border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-center text-[11px] text-violet-300">
            <MapPin size={11} className="inline-block mr-1" />GPS Dispatch Active
          </div>
        </div>
      </div>
    </div>
  );
}
