import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GetBizii",
  description:
    "GetBizii privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
      <h1 className="font-heading text-4xl font-bold text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-white/40 mb-12">Last updated: March 30, 2026</p>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Introduction
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          GetBizii (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates getbizii.com and is committed to
          protecting your personal information. This Privacy Policy explains what data
          we collect when you interact with our website and services, how we use and
          safeguard that information, and the rights you have with respect to your
          personal data. By using our website or engaging our services, you acknowledge
          that you have read and understood this policy.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Information We Collect
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We collect information you provide directly to us — including your name, email
          address, phone number, and business details — when you submit a contact form,
          request a quote, or sign up for any of our services. We also collect
          information automatically as you navigate our site, such as your IP address,
          browser type and version, pages visited, session duration, and referring URLs,
          using cookies and similar tracking technologies. Additionally, to fulfill
          certain services (such as business formation or data aggregation), we may
          obtain information from third-party sources including public business
          registries and government databases.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          How We Use Your Information
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We use your information to provide, operate, and continuously improve our
          services; to respond to your inquiries and fulfill service orders; and to send
          transactional communications related to your account or engagement with us. We
          may use aggregated, anonymized data to analyze usage trends and improve site
          performance. We do not sell, rent, or trade your personal information to third
          parties for their marketing purposes.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Cookies &amp; Tracking
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We use essential cookies required to operate the site (such as session and
          security cookies), analytics cookies — including Google Analytics — to
          understand how visitors interact with our content, and marketing cookies to
          deliver relevant advertising. Marketing cookies are only activated with your
          explicit consent. You can manage or disable cookies at any time through your
          browser settings; note that disabling certain cookies may limit site
          functionality.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Data Sharing
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We share your data only with trusted service providers who assist us in
          operating our platform, including hosting providers, customer relationship
          management tools, and email delivery services. These providers are
          contractually bound to handle your data securely and only as directed by us.
          We may also disclose your information when required to do so by law, court
          order, or in response to a lawful request from a government authority.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Data Retention
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We retain your personal information for as long as necessary to fulfill the
          purposes described in this policy, maintain our business records, or comply
          with applicable legal obligations. When your data is no longer needed, we
          delete or anonymize it. You may request deletion of your personal data at any
          time by contacting us at the address below.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Your Rights
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          Depending on your location, you may have the right to access the personal
          data we hold about you, request corrections to inaccurate information, ask us
          to delete your data, restrict or object to certain processing activities, or
          request a portable copy of your data. California residents may have additional
          rights under the CCPA. To exercise any of these rights, please contact us at
          privacy@getbizii.com and we will respond within the timeframe required by
          applicable law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Contact
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          For privacy-related inquiries, requests, or concerns, please contact us at{" "}
          <a
            href="mailto:privacy@getbizii.com"
            className="text-primary-sky hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            privacy@getbizii.com
          </a>
          . Nobel Gemini Ventures, United States.
        </p>
      </section>
    </div>
  );
}
