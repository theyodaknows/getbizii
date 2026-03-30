import React from "react";
import { cn } from "@/lib/cn";

const CURRENT_YEAR = new Date().getFullYear();

interface FooterSection {
  heading: string;
  links: { label: string; href: string }[];
}

const sections: FooterSection[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Press", href: "/" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Business Setup", href: "/services/biz-setup" },
      { label: "Bookkeeping", href: "/services/bookkeeping" },
      { label: "CPA Services", href: "/services/cpa" },
      { label: "Legal Services", href: "/services/legal" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/" },
      { label: "Terms", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
];

const linkClasses =
  "text-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded";

export function Footer() {
  return (
    <footer
      className={cn(
        "w-full",
        "bg-white/5 backdrop-blur-md border-t border-white/10"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Content sections */}
          {sections.map(({ heading, links }) => (
            <nav key={heading} aria-label={`${heading} links`}>
              <h3 className="text-sm font-semibold text-white tracking-wide mb-4">
                {heading}
              </h3>
              <ul role="list" className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className={linkClasses}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>

        {/* Footer meta */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/"
            className="text-base font-bold text-white tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            GetBizii
          </a>
          <p className="text-sm text-white/50">
            &copy; {CURRENT_YEAR} GetBizii. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
