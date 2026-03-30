export function ComingSoonGraphic() {
  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-slate-400/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-slate-500/15 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 text-center">
            <span className="text-3xl" role="img" aria-label="package">📦</span>
            <p className="text-xs text-white/50">This solution is in development</p>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] text-white/40">
              Join Waitlist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
