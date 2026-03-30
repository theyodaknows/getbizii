"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X, Menu, Building2, CreditCard, Database, Layers } from "lucide-react";
import { cn } from "@/lib/cn";

interface ServiceLink {
  label: string;
  tagline: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const serviceLinks: ServiceLink[] = [
  { label: "Business Setup", tagline: "Register & launch your business", href: "/services/biz-setup", Icon: Building2 },
  { label: "Credit Bureau Injection", tagline: "Build fundable business credit", href: "/services/credit-bureau", Icon: CreditCard },
  { label: "Data Aggregator", tagline: "Get found on every directory", href: "/services/data-aggregator", Icon: Database },
  { label: "Visual Identity", tagline: "Brand design that earns trust", href: "/services/visual-identity", Icon: Layers },
];

const topLevelLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
          setIsVisible(false);
        } else if (lastScrollY.current - currentScrollY > 5) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      clearTimeout(timer);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [servicesOpen]);

  // Escape key handling
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (mobileOpen) {
        setMobileOpen(false);
        document.getElementById("mobile-menu-button")?.focus();
      }
      if (servicesOpen) {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    }
  }, [mobileOpen, servicesOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (mobileOpen) {
      firstMobileLinkRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const isServiceActive = pathname.startsWith("/services/");

  return (
    <>
      <header
        className={cn(
          "fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0",
          hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <nav
          aria-label="Main navigation"
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2.5 flex items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="GetBizii home"
            className="flex items-center hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full px-1"
          >
            <Image
              src="/logo_dark.svg"
              alt="GetBizii"
              width={120}
              height={32}
              className="h-8 w-auto brightness-0 invert"
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  pathname === "/" ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                Home
              </Link>
            </li>

            {/* Services dropdown */}
            <li className="relative">
              <button
                ref={servicesButtonRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  isServiceActive ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                Services
                <ChevronDown
                  className={cn("w-3.5 h-3.5 transition-transform duration-150", servicesOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-void/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 min-w-[220px] shadow-xl shadow-black/40"
                  >
                    <ul role="list" className="flex flex-col gap-1">
                      {serviceLinks.map(({ label, tagline, href, Icon }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            aria-current={pathname === href ? "page" : undefined}
                            onClick={() => setServicesOpen(false)}
                            className={cn(
                              "flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                              "hover:bg-white/8",
                              pathname === href ? "bg-white/8" : ""
                            )}
                          >
                            <Icon className="w-4 h-4 mt-0.5 text-primary-sky shrink-0" />
                            <span className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium text-white leading-tight">{label}</span>
                              <span className="text-xs text-white/50 leading-tight">{tagline}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link
                href="/about"
                aria-current={pathname === "/about" ? "page" : undefined}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  pathname === "/about" ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                About
              </Link>
            </li>

            <li>
              <a
                href="/#contact"
                className="text-sm font-medium px-3 py-1.5 rounded-full text-white/70 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Desktop CTA */}
          <a
            href="/#contact"
            className="hidden md:inline-flex items-center gap-1 bg-white text-black font-semibold rounded-full px-5 py-1.5 text-sm hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Get Started <span aria-hidden="true">→</span>
          </a>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full",
              "text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            )}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl flex flex-col px-6 pt-24 pb-8 md:hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul role="list" className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/"
                    ref={firstMobileLinkRef}
                    aria-current={pathname === "/" ? "page" : undefined}
                    onClick={closeMobile}
                    className="block text-lg font-medium text-white/80 hover:text-white px-3 py-3 rounded-xl hover:bg-white/8 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest px-3 pt-4 pb-2">
                    Services
                  </p>
                  <ul role="list" className="flex flex-col gap-1">
                    {serviceLinks.map(({ label, tagline, href, Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          aria-current={pathname === href ? "page" : undefined}
                          onClick={closeMobile}
                          className={cn(
                            "flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                            "hover:bg-white/8",
                            pathname === href ? "bg-white/8" : ""
                          )}
                        >
                          <Icon className="w-4 h-4 mt-0.5 text-primary-sky shrink-0" />
                          <span className="flex flex-col gap-0.5">
                            <span className="text-base font-medium text-white leading-tight">{label}</span>
                            <span className="text-sm text-white/50 leading-tight">{tagline}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {topLevelLinks.filter(l => l.label !== "Home").map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      onClick={closeMobile}
                      className="block text-lg font-medium text-white/80 hover:text-white px-3 py-3 rounded-xl hover:bg-white/8 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href="/#contact"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-1 w-full bg-white text-black font-semibold rounded-full px-4 py-3 text-base hover:bg-gray-50 hover:scale-105 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Get Started <span aria-hidden="true">→</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
