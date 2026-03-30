"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

const SERVICE_OPTIONS = [
  { value: "Business Setup", label: "Business Setup" },
  { value: "Bookkeeping", label: "Bookkeeping" },
  { value: "CPA Services", label: "CPA Services" },
  { value: "Legal Services", label: "Legal Services" },
  { value: "Business Solutions — General", label: "Business Solutions — General" },
  { value: "Other", label: "Other" },
];

const inputClass =
  "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary transition-colors";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: Record<string, string>): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!data.firstName.trim()) errs.firstName = "First name is required.";
    if (!data.lastName.trim()) errs.lastName = "Last name is required.";
    if (!data.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!data.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {
      firstName: (fd.get("firstName") as string) ?? "",
      lastName: (fd.get("lastName") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      phone: (fd.get("phone") as string) ?? "",
      service: (fd.get("service") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8"
    >
      {/* Success banner */}
      {status === "success" && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400"
        >
          Thank you! We&apos;ll be in touch within 24 hours.
        </div>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-400"
        >
          Something went wrong. Please try again.
        </div>
      )}

      {/* Name row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div suppressHydrationWarning>
          <label htmlFor="firstName" className={labelClass}>
            First Name <span aria-hidden="true" className="text-rose-400">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            aria-required="true"
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={cn(inputClass, errors.firstName && "border-rose-500/50")}
            placeholder="Jane"
          />
          {errors.firstName && (
            <p id="firstName-error" role="alert" className="mt-1 text-xs text-rose-400">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name <span aria-hidden="true" className="text-rose-400">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            aria-required="true"
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={cn(inputClass, errors.lastName && "border-rose-500/50")}
            placeholder="Smith"
          />
          {errors.lastName && (
            <p id="lastName-error" role="alert" className="mt-1 text-xs text-rose-400">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email + Phone row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span aria-hidden="true" className="text-rose-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, errors.email && "border-rose-500/50")}
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-rose-400">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-white/30 normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Service selector */}
      <div className="mt-4">
        <label htmlFor="service" className={labelClass}>
          Service
        </label>
        <select
          id="service"
          name="service"
          className={cn(inputClass, "cursor-pointer")}
          defaultValue=""
        >
          <option value="" disabled className="bg-[#0F1D3D] text-white/40">
            Select a service...
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0F1D3D] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          Message <span aria-hidden="true" className="text-rose-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass, "resize-none", errors.message && "border-rose-500/50")}
          placeholder="Tell us about your business and what you need..."
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-xs text-rose-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message →"
        )}
      </button>
    </form>
  );
}
