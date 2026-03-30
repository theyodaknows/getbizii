import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <h2
              id="contact-heading"
              className="font-heading text-3xl font-bold text-white sm:text-4xl"
            >
              Get In Touch
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              Ready to build your business identity? Reach out and our team will
              respond within one business day.
            </p>

            <ul role="list" className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-sky"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Email
                  </p>
                  <a
                    href="mailto:hello@getbizii.com"
                    className="mt-0.5 text-sm text-white hover:text-primary-sky transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    hello@getbizii.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-sky"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Phone
                  </p>
                  <a
                    href="tel:+18005550000"
                    className="mt-0.5 text-sm text-white hover:text-primary-sky transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    +1 (800) 555-0000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-sky"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Headquarters
                  </p>
                  <p className="mt-0.5 text-sm text-white/70">
                    Nobel Gemini Ventures
                    <br />
                    United States
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
