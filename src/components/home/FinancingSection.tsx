import { CheckCircle2 } from "lucide-react";
import { PaymentCalculator } from "./PaymentCalculator";

const FINANCING_PERKS = [
  "Monthly plans from $399/mo",
  "No hard credit pull",
  "24hr approval decisions",
  "0% interest for qualifying applicants",
  "Revenue share options available",
];

export function FinancingSection() {
  return (
    <section
      className="py-20 sm:py-28"
      aria-labelledby="financing-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: copy */}
          <div>
            <h2
              id="financing-heading"
              className="font-heading text-3xl font-bold text-white sm:text-4xl"
            >
              Flexible Financing
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              Launch your business without draining your savings.
            </p>

            <ul role="list" className="mt-8 space-y-4">
              {FINANCING_PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white/80">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: calculator */}
          <div>
            <PaymentCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
