import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosures & Legal Notices | GetBizii",
  description:
    "Legal disclosures, disclaimers, and notices for GetBizii services including business formation, credit building, and brand identity.",
};

export default function FooterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
      <h1 className="font-heading text-4xl font-bold text-white mb-2">
        Disclosures &amp; Legal Notices
      </h1>
      <p className="text-sm text-white/40 mb-12">Last updated: March 30, 2026</p>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          General Disclaimer
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          The information provided on this website and through GetBizii services is for
          general informational and educational purposes only. Nothing on this site
          constitutes legal, financial, tax, or accounting advice. GetBizii is not a law
          firm, a certified public accounting firm, or a financial advisor. Use of our
          services does not create an attorney-client or fiduciary relationship. We
          strongly encourage you to consult with a licensed attorney, CPA, or financial
          advisor for advice specific to your situation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Business Formation Disclaimer
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          GetBizii assists clients with the preparation and filing of business formation
          documents, registered agent services, and related administrative tasks.
          Document preparation services are not the practice of law. GetBizii does not
          provide legal advice regarding the appropriate entity type, jurisdiction, or
          structure for your specific business needs. Results and processing times vary
          by state and are subject to government processing schedules outside our
          control.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Business Credit Disclaimer
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          GetBizii provides guidance and services designed to help establish and build
          business credit profiles with major commercial credit bureaus. We do not
          guarantee specific credit scores, credit limits, funding approvals, or
          outcomes with any lender or credit bureau. Business credit results depend on
          many factors including payment history, time in business, industry, and
          individual bureau methodology. No results are guaranteed and past client
          outcomes are not indicative of future results.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Financing Disclaimer
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          Financing options described on this website are subject to credit approval and
          may not be available in all circumstances. Example payment schedules shown are
          for illustrative purposes only and do not represent a quote, commitment, or
          guarantee of financing terms. Actual rates, fees, and repayment terms are
          determined at the time of application and may differ from examples shown.
          GetBizii is not a lender and does not make lending decisions. Financing is
          provided through third-party financing partners.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Earnings &amp; Results Disclaimer
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          Any statistics, testimonials, case studies, or examples referenced on this
          website are illustrative only and are not guarantees of results. Business
          success depends on a variety of factors including market conditions, individual
          effort, business model, and execution. GetBizii makes no representation that
          any client will achieve specific results, revenues, credit approvals, or
          business outcomes as a result of using our services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Third-Party Links &amp; Services
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          This website may contain links to third-party websites and services.
          GetBizii does not control, endorse, or assume responsibility for the content,
          privacy practices, or accuracy of any third-party site. Links are provided for
          convenience only. Your use of any third-party site is at your own risk and
          subject to that site&apos;s own terms and policies.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Intellectual Property
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          All content on this website — including text, graphics, logos, icons, images,
          and software — is the property of GetBizii or its content suppliers and is
          protected by applicable copyright, trademark, and intellectual property laws.
          Unauthorized reproduction, distribution, or use of any content on this site
          without express written permission from GetBizii is strictly prohibited.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Limitation of Liability
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          To the maximum extent permitted by applicable law, GetBizii and its affiliates,
          officers, employees, agents, and licensors shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising from your use
          of this website or our services. Our total liability for any claim arising out
          of or relating to our services shall not exceed the amount you paid to us for
          the specific service giving rise to the claim.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Governing Law
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          These disclosures and all matters relating to your use of this website and
          GetBizii services are governed by the laws of the United States and the state
          in which Nobel Gemini Ventures is incorporated, without regard to conflict of
          law principles. Any disputes shall be resolved in the appropriate courts of
          competent jurisdiction.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-heading text-xl font-semibold text-white mb-3">
          Contact
        </h2>
        <p className="text-base text-white/60 leading-relaxed">
          For questions about these disclosures or our legal policies, please contact us
          at{" "}
          <a
            href="mailto:legal@getbizii.com"
            className="text-primary-sky hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            legal@getbizii.com
          </a>
          . Nobel Gemini Ventures, United States.
        </p>
      </section>
    </div>
  );
}
