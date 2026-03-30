import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

const CURRENT_YEAR = new Date().getFullYear();

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
}

const sections: FooterSection[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Financing", href: "/financing" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Business Setup", href: "/services/biz-setup" },
      { label: "Credit Bureau Injection", href: "/services/credit-bureau" },
      { label: "Data Aggregator", href: "/services/data-aggregator" },
      { label: "Visual Identity", href: "/services/visual-identity" },
      { label: "Business Solutions", href: "/#solutions" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const linkClasses =
  "text-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded";

export function Footer() {
  return (
    <footer className={cn("w-full bg-void border-t border-white/10 py-16 px-4")}>
      <div className="mx-auto max-w-7xl">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              aria-label="GetBizii home"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded self-start"
            >
              <Image
                src="/logo_dark.svg"
                alt="GetBizii"
                width={120}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-primary-sky uppercase tracking-widest font-semibold">
              Business Identity Platform
            </p>
            <p className="text-sm text-white/50">
              A Nobel Gemini Ventures company
            </p>
          </div>

          {/* Columns 2–4 — Sections */}
          {sections.map(({ heading, links }) => (
            <nav key={heading} aria-label={`${heading} links`}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                {heading}
              </h3>
              <ul role="list" className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkClasses}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider + copyright row */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm text-white/50">
            &copy; {CURRENT_YEAR} GetBizii. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
