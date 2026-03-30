import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | GetBizii",
  description:
    "GetBizii cookie policy — how we use cookies and similar tracking technologies on our website.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
      <h1 className="font-heading text-4xl font-bold text-white mb-2">
        Cookie Policy
      </h1>
      <p className="text-sm text-white/40 mb-12">Last updated: March 30, 2026</p>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          What Are Cookies
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          Cookies are small text files that are placed on your device — computer,
          tablet, or smartphone — when you visit a website. They allow the site to
          remember your actions and preferences over a period of time so you
          don&apos;t have to re-enter them each time you visit. Cookies can also help
          websites understand how visitors interact with their content, which enables
          ongoing improvements to the user experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          How We Use Cookies
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We use cookies to keep the site functioning correctly (essential cookies),
          to understand how visitors interact with our pages and content (analytics
          cookies), and occasionally to deliver relevant advertising to users who have
          previously visited our site (marketing cookies). Marketing cookies are only
          activated with your explicit consent. We do not use cookies to collect
          sensitive personal information or to track you across unrelated websites
          without your knowledge.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Types of Cookies We Use
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-base text-white/60 leading-relaxed">
              <span className="text-white font-medium">Essential Cookies</span> — These
              cookies are strictly necessary for the website to function. They enable
              core features such as security, session management, and page navigation.
              They cannot be disabled without affecting basic site functionality.
            </p>
          </div>
          <div>
            <p className="text-base text-white/60 leading-relaxed">
              <span className="text-white font-medium">Analytics Cookies</span> — We
              use Google Analytics to collect aggregated data about page views, session
              duration, traffic sources, and user behavior. This information helps us
              understand what content is most useful and where we can improve. Data is
              anonymized before processing.
            </p>
          </div>
          <div>
            <p className="text-base text-white/60 leading-relaxed">
              <span className="text-white font-medium">Preference Cookies</span> —
              These cookies remember your settings and choices — such as language
              preferences or form data — to personalize your experience on return
              visits.
            </p>
          </div>
          <div>
            <p className="text-base text-white/60 leading-relaxed">
              <span className="text-white font-medium">Marketing Cookies</span> — Used
              to deliver targeted advertising based on your browsing behavior. These
              cookies are only placed on your device after you have given your explicit
              consent. You may withdraw consent at any time through your browser
              settings.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Third-Party Cookies
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          Some cookies on our site are set by third-party services integrated into our
          platform, such as Google Analytics, HubSpot, or embedded social media
          widgets. These third parties may set their own cookies and collect information
          in accordance with their own privacy policies, over which we have no direct
          control. We encourage you to review the privacy policies of any third-party
          services whose cookies may be active on our site.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Managing Cookies
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          You can control and manage cookies through your browser settings. Most
          browsers allow you to view, block, or delete cookies at any time. Please note
          that blocking certain categories of cookies — particularly essential cookies —
          may affect how the site functions. If you wish to opt out of Google Analytics
          tracking specifically, you can install the Google Analytics opt-out browser
          add-on available at{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-sky hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Changes to This Policy
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We may update this Cookie Policy from time to time as our use of cookies
          evolves or as legal requirements change. When we make significant changes, we
          will update the &quot;Last updated&quot; date at the top of this page. We encourage
          you to check this page periodically to stay informed about how we use cookies.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Contact
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          For questions about our cookie practices, please contact us at{" "}
          <a
            href="mailto:privacy@getbizii.com"
            className="text-primary-sky hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            privacy@getbizii.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
