import { Building2, FileText, Calculator, Scale, Star } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Building2, label: "NGV Company" },
  { icon: FileText, label: "LLC & Corp Formation" },
  { icon: Calculator, label: "Brand Presence" },
  { icon: Scale, label: "Visible Compliance" },
  { icon: Star, label: "5-Star Rated" },
];

export function TrustBar() {
  return (
    <div
      className="border-y border-white/10 bg-white/5"
      aria-label="Trust indicators"
    >
      {/* Desktop: static row */}
      <div className="mx-auto hidden max-w-7xl items-center justify-center gap-2 px-4 py-4 sm:flex sm:px-6 lg:px-8">
        {TRUST_ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <item.icon
                className="h-4 w-4 text-white/50"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {item.label}
              </span>
            </div>
            {i < TRUST_ITEMS.length - 1 && (
              <span aria-hidden="true" className="text-white/20">
                ·
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: marquee */}
      <div className="overflow-hidden sm:hidden">
        <div className="flex animate-[marquee_18s_linear_infinite] gap-8 py-4 whitespace-nowrap">
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2">
              <item.icon className="h-4 w-4 text-white/50" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {item.label}
              </span>
              <span aria-hidden="true" className="ml-4 text-white/20">
                ·
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
