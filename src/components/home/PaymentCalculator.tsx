"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/formatCurrency";

interface Bundle {
  name: string;
  price: number;
}

const BUNDLES: Bundle[] = [
  { name: "Print Reseller", price: 7500 },
  { name: "Mobile Detailing", price: 9800 },
  { name: "Mobile DNA & Livescanning", price: 12500 },
  { name: "Mini Apparel Shop", price: 14000 },
  { name: "Party Rental", price: 15000 },
  { name: "Plumber", price: 18500 },
  { name: "Custom Jewelry", price: 22000 },
];

const ANNUAL_RATE = 0.059;
const MONTHS = 24;

function calculateMonthly(principal: number): number {
  const r = ANNUAL_RATE / 12;
  const n = MONTHS;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function PaymentCalculator() {
  const [selectedIndex, setSelectedIndex] = useState(4); // Party Rental default

  const bundle = BUNDLES[selectedIndex];
  const monthly = calculateMonthly(bundle.price);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <h3 className="font-heading text-lg font-semibold text-white">
        Payment Calculator
      </h3>
      <p className="mt-1 text-sm text-white/60">
        Estimate your monthly payment at 5.9% APR over 24 months.
      </p>

      <div className="mt-5">
        <label
          htmlFor="bundle-select"
          className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60"
        >
          Select a Business Solution
        </label>
        <select
          id="bundle-select"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {BUNDLES.map((b, i) => (
            <option key={b.name} value={i} className="bg-[#0F1D3D] text-white">
              {b.name} — {formatCurrency(b.price)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 rounded-xl border border-blue-400/20 bg-blue-500/10 p-5 text-center">
        <p className="text-sm text-white/60">Estimated monthly payment</p>
        <p className="mt-1 font-heading text-4xl font-bold text-white">
          {formatCurrency(monthly)}
          <span className="text-xl font-normal text-white/60">/mo</span>
        </p>
        <p className="mt-1.5 text-xs text-white/70">
          {formatCurrency(bundle.price)} total · {MONTHS} months · 5.9% APR
        </p>
      </div>

      <a
        href="#contact"
        className="mt-4 flex w-full items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Apply for Financing →
      </a>
    </div>
  );
}
