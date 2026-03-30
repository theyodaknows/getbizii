import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | GetBizii",
  description:
    "GetBizii terms of service — the agreement governing your use of our platform and services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
      <h1 className="font-heading text-4xl font-bold text-white mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-white/40 mb-12">Last updated: March 30, 2026</p>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Acceptance of Terms
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          By accessing or using GetBizii&apos;s website or any of our services, you agree to
          be bound by these Terms of Service and all applicable laws and regulations. If
          you do not agree with any part of these terms, you must not use our services.
          These terms apply to all visitors, prospective clients, active clients, and
          any other users of the platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Services
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          GetBizii provides business formation, business credit building, data
          aggregation, and visual identity services to entrepreneurs and small business
          owners. The specific scope of deliverables, turnaround timelines, and any
          service-specific conditions are defined in the individual service agreement or
          order confirmation provided to you at the time of purchase. GetBizii reserves
          the right to modify, suspend, or discontinue any service at any time with
          reasonable notice.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Client Responsibilities
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          You agree to provide accurate, complete, and current information as required
          to fulfill your service order. Providing inaccurate or incomplete information
          that delays or prevents delivery of services does not constitute grounds for a
          refund. You are solely responsible for ensuring your use of our services
          complies with all applicable federal, state, and local laws in your
          jurisdiction, including laws governing business formation, licensing, and
          commercial activity.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Payment &amp; Refunds
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          Service fees are due as stated in your order confirmation or service
          agreement. All sales are final unless a written service agreement explicitly
          states otherwise or applicable consumer protection law requires a refund.
          GetBizii reserves the right to pause or permanently terminate service delivery
          in the event of non-payment, chargebacks, or disputed transactions. Any
          government filing fees, third-party costs, or state fees are separate from and
          in addition to GetBizii service fees.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Intellectual Property
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          Upon receipt of full payment, you own all custom deliverables created
          specifically for your engagement — including logos, brand assets, and
          formation documents prepared on your behalf. GetBizii retains full ownership
          of its proprietary processes, internal templates, platform software, and any
          pre-existing intellectual property used in delivering services. Nothing in
          these terms transfers any rights to GetBizii&apos;s brand, trademarks, or
          platform.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Limitation of Liability
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          To the fullest extent permitted by law, GetBizii&apos;s total liability for any
          claim arising out of or related to the use of our services is limited to the
          amount you paid for the specific service giving rise to the claim. GetBizii
          is not liable for any indirect, incidental, special, consequential, or
          punitive damages, including but not limited to loss of profits, loss of data,
          or business interruption, even if we have been advised of the possibility of
          such damages.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Governing Law
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          These Terms of Service are governed by and construed in accordance with the
          laws of the United States. Any disputes arising under or in connection with
          these terms shall be resolved through binding arbitration in accordance with
          applicable arbitration rules, or in a court of competent jurisdiction where
          arbitration is not permitted or enforceable. You waive any right to a jury
          trial in connection with any such dispute.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Changes to Terms
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          We may update these Terms of Service at any time. When we make material
          changes, we will update the &quot;Last updated&quot; date at the top of this page.
          Your continued use of our website or services after any changes have been
          posted constitutes your acceptance of the revised terms. We encourage you to
          review this page periodically.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Contact
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          For questions or concerns about these Terms of Service, please contact us at{" "}
          <a
            href="mailto:legal@getbizii.com"
            className="text-primary-sky hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            legal@getbizii.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
