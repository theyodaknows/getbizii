export function AppointmentSchedulerGraphic() {
  const appointments = [
    { time: "9:00 AM", service: "DNA Collection", client: "Johnson", color: "bg-emerald-400" },
    { time: "11:30 AM", service: "Livescan", client: "Martinez", color: "bg-blue-400" },
    { time: "2:00 PM", service: "Background Check", client: "Patel", color: "bg-amber-400" },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-emerald-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Appointment Status
          </p>
          <div className="space-y-2">
            {appointments.map((apt) => (
              <div
                key={apt.time}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${apt.color}`} />
                <span className="text-[11px] text-white/40">{apt.time}</span>
                <span className="flex-1 text-xs text-white/80">{apt.service}</span>
                <span className="text-[11px] text-white/50">{apt.client}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1.5 text-center text-[11px] text-emerald-300">
              HIPAA Compliant
            </div>
            <div className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-1.5 text-center text-[11px] text-blue-300">
              Results Portal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
