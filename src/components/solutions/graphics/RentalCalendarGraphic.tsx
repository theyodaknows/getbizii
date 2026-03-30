export function RentalCalendarGraphic() {
  const bookedDays = new Set([3, 4, 10, 11, 17, 18]);
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-amber-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-orange-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Availability Calendar
          </p>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day) => (
              <div
                key={day}
                className={`flex h-7 w-full items-center justify-center rounded text-[11px] ${
                  bookedDays.has(day)
                    ? "bg-amber-500/35 text-amber-200"
                    : "bg-white/[0.06] text-white/50"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1.5 text-center text-[11px] text-amber-300">
              6 Booked
            </div>
            <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1.5 text-center text-[11px] text-emerald-300">
              15 Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
