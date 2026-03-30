import type { Metadata } from "next";
import { Handshake, Share2, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Partners | GetBizii",
  description:
    "Partner with GetBizii. Referral partners, strategic alliances, and integration opportunities for organizations that serve small business owners and entrepreneurs.",
};

const PARTNER_TYPES = [
  {
    Icon: Share2,
    title: "Referral Partners",
    description:
      "Accountants, attorneys, coaches, and consultants who regularly work with business owners. Earn a referral fee for every client you send our way.",
    cta: "Become a Referral Partner",
  },
  {
    Icon: Handshake,
    title: "Strategic Alliances",
    description:
      "Organizations, chambers of commerce, and business development networks looking to add GetBizii services as a resource for their members.",
    cta: "Explore an Alliance",
  },
  {
    Icon: DollarSign,
    title: "Financing Partners",
    description:
      "Lenders, CDFIs, and financial institutions interested in co-offering financing solutions alongside GetBizii business builds.",
    cta: "Partner on Financing",
  },
  {
    Icon: Users,
    title: "Reseller Partners",
    description:
      "Agencies and service firms that want to white-label or bundle GetBizii services within their own offerings.",
    cta: "Explore Reselling",
  },
];

const BENEFITS = [
  {
    value: "Revenue Share",
    description:
      "Competitive referral fees and revenue-share structures for qualified partners.",
  },
  {
    value: "Co-Marketing",
    description:
      "Joint content, shared audiences, and co-branded resources to grow both brands.",
  },
  {
    value: "Dedicated Support",
    description:
      "A partner success contact to handle client handoffs, updates, and escalations.",
  },
  {
    value: "Partner Portal",
    description:
      "Track referrals, view client progress, and access resources in one place.",
  },
];

export default function PartnersPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="partners-hero-heading"
      >
        <p className="text-xs uppercase tracking-widest text-primary-sky font-semibold mb-4">
          Partner Program
        </p>
        <h1
          id="partners-hero-heading"
          className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Grow Together.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
          GetBizii partners with organizations and professionals who share our
          commitment to helping entrepreneurs build real businesses. Whether
          you&apos;re a consultant, a chamber, or a financial institution — let&apos;s
          build something together.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Apply to Partner
          </Button>
          <Button href="#partner-types" variant="secondary">
            Explore Options
          </Button>
        </div>
      </section>

      {/* Partner types */}
      <section
        id="partner-types"
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="partner-types-heading"
      >
        <h2
          id="partner-types-heading"
          className="font-heading text-3xl font-bold text-white sm:text-4xl"
        >
          Partnership Options
        </h2>

        <ul
          role="list"
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {PARTNER_TYPES.map(({ Icon, title, description, cta }) => (
            <li
              key={title}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8"
            >
              <Icon className="h-8 w-8 text-primary-sky" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-xl font-semibold text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {description}
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center text-sm font-semibold text-primary-sky hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                {cta} →
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="partner-benefits-heading"
      >
        <h2
          id="partner-benefits-heading"
          className="font-heading text-3xl font-bold text-white sm:text-4xl"
        >
          What Partners Get
        </h2>

        <ul
          role="list"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map(({ value, description }) => (
            <li
              key={value}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6"
            >
              <p className="font-heading text-xl font-bold text-primary-sky">
                {value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="partners-cta-heading"
      >
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-8 py-16 text-center sm:px-16">
          <h2
            id="partners-cta-heading"
            className="font-heading text-3xl font-bold text-white sm:text-4xl"
          >
            Ready to partner with us?
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Fill out a short inquiry and our partnerships team will follow up
            within 2 business days to explore the right structure for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" variant="primary">
              Start the Conversation
            </Button>
            <Button href="/about" variant="secondary">
              About GetBizii
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
