import { Sparkles, Activity, Landmark, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";

const COPILOT_FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Guided Credit Building",
    description:
      "Personalized, step-by-step actions that build a strong business credit profile with the right vendors and bureaus.",
  },
  {
    icon: Activity,
    title: "24/7 Credit Monitoring",
    description:
      "Real-time alerts the moment anything changes across your business credit file — no more surprises.",
  },
  {
    icon: Landmark,
    title: "Funding Capability Insights",
    description:
      "Know what you qualify for, and what it takes to qualify for more, before you ever submit an application.",
  },
  {
    icon: MessageCircle,
    title: "Ask It Anything",
    description:
      "A conversational AI agent on call to answer credit questions and recommend your next best move.",
  },
];

export function CreditCopilotSection() {
  return (
    <section
      id="credit-copilot"
      className="py-20 sm:py-28"
      aria-labelledby="credit-copilot-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-sky">
            AI-Powered
          </p>
          <h2
            id="credit-copilot-heading"
            className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Meet Your Business Credit Copilot
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg">
            An AI agent that builds your business credit, monitors it around
            the clock, and tells you exactly what funding you qualify for —
            before you apply.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {COPILOT_FEATURES.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
            >
              <feature.icon
                className="h-8 w-8 text-primary-sky"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-heading text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Button variant="primary" href="/contact">
            Talk to Your Copilot
          </Button>
        </div>
      </div>
    </section>
  );
}
