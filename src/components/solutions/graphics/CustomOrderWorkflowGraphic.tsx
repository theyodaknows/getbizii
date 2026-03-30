import { Check } from "lucide-react";

export function CustomOrderWorkflowGraphic() {
  const steps = [
    { label: "Design Brief", detail: "Received", done: true },
    { label: "Stone Selection", detail: "14k Gold · Oval Ruby", done: true },
    { label: "Preview Approval", detail: "Client Approved", done: true },
    { label: "Certificate", detail: "Generating…", done: false },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-md shrink-0 lg:mt-0 lg:pr-2">
      <div className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-yellow-400/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-amber-500/20 blur-2xl" />
      <div className="relative rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
        <div className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Custom Order #C-0087
          </p>
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.label}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-slate-900/80 px-3 py-2"
              >
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-amber-500/20" : "bg-white/[0.06]"}`}>
                  {step.done ? (
                    <Check size={10} className="text-amber-400" />
                  ) : (
                    <span className="text-[10px] text-white/30">⟳</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/80">{step.label}</p>
                  <p className="text-[11px] text-white/40">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
