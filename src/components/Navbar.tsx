"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/biz-setup" },
  { label: "Pricing", href: "/" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/" },
];

const linkClasses =
  "text-sm font-medium text-white/80 hover:text-white transition-colors duration-150";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50",
        "bg-white/5 backdrop-blur-md border-b border-white/10"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold text-white tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          >
            GetBizii
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={linkClasses}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/services/biz-setup" variant="primary">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              "md:hidden inline-flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-lg",
              "text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            )}
          >
            <span
              className={cn(
                "block h-0.5 w-5 bg-current rounded-full transition-transform duration-200",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-current rounded-full transition-opacity duration-200",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-current rounded-full transition-transform duration-200",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200",
            mobileOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    linkClasses,
                    "block rounded-lg px-3 py-2 hover:bg-white/10"
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 px-3">
            <Button href="/services/biz-setup" variant="primary" className="w-full justify-center">
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
