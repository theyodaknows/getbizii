import type { PricingTier } from "@/types";

// Placeholder pricing — replace with real figures (see BUNDLE_PRICE convention in src/data/pricing.ts)
export const PRICING_TIERS: PricingTier[] = [
  {
    slug: "starter",
    name: "Starter",
    priceLabel: "Starting at $199/mo", // PLACEHOLDER
    description: "Everything you need to establish and start building business credit.",
    features: [
      "Business identity & EIN setup guidance",
      "Credit bureau registration (Dun & Bradstreet, Experian, Equifax)",
      "AI Copilot credit-building action plan",
      "Monthly credit monitoring",
      "Email support",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
  },
  {
    slug: "growth",
    name: "Growth",
    priceLabel: "Starting at $399/mo", // PLACEHOLDER
    description: "Full-service credit building and funding-readiness for scaling businesses.",
    features: [
      "Everything in Starter",
      "Real-time credit monitoring & alerts",
      "Funding capability assessment",
      "Priority vendor & tradeline recommendations",
      "Dedicated account support",
    ],
    ctaLabel: "Talk to Sales",
    ctaHref: "/contact",
    highlighted: true,
  },
];
