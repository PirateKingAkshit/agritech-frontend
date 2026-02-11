export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo-agritech.png"
                alt="AGGROW Logo"
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold text-primary hidden sm:block">
                AGGROW
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Terms of Use</div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              TERMS OF USE
            </h1>
            <p className="text-base font-semibold text-foreground">
              AGGROW Mobile Application
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Provided by Bartronics India Limited
            </p>
            <p className="text-sm text-foreground font-semibold pt-2">
              Effective Date: February, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            1. Introduction
          </h2>
          <div className="space-y-4 text-justify">
            <p>
              AGGROW ("App") is an enterprise-focused agriculture technology
              platform owned and operated by Bartronics India Limited, a company
              incorporated under the laws of India ("Company", "we", "our", or
              "us").
            </p>
            <p>
              The App provides digital solutions including but not limited to
              agricultural management tools, analytics, advisory services,
              enterprise dashboards, farm data tracking, reporting tools,
              supply-chain enablement, and related services (collectively,
              "Services").
            </p>
            <p>
              By downloading, installing, registering, subscribing to, or using
              the App, you agree to be legally bound by these Terms of Use
              ("Terms").
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            2. Nature of Services (Important Agricultural Disclaimer)
          </h2>
          <p className="mb-4">
            AGGROW provides data-driven insights, advisory inputs, analytics
            tools, and enterprise management support tools.
          </p>
          <p className="font-semibold text-foreground mb-3">The Company:</p>
          <ul className="space-y-2 text-justify ml-4 list-disc">
            <li>
              Does not guarantee crop yields, profitability, weather accuracy,
              soil performance, or financial outcomes.
            </li>
            <li>
              Does not provide certified agronomic, financial, or legal advice
              unless stated in a separate written agreement.
            </li>
            <li>
              Relies on third-party sources (e.g., weather APIs, satellite data,
              user inputs, market feeds), which may include inaccuracies.
            </li>
            <li>
              Holds no responsibility for decisions based on the App—all risks
              are yours.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            3. Eligibility & Enterprise Use
          </h2>
          <p className="font-semibold text-foreground mb-3">
            You represent that:
          </p>
          <ul className="space-y-2 text-justify ml-4 list-disc">
            <li>
              You are authorized to bind the farm, enterprise, organization,
              FPO, distributor, or corporate entity you represent.
            </li>
            <li>
              You will use the Services only for legitimate agricultural or
              enterprise purposes.
            </li>
            <li>
              You comply with all applicable agricultural, trade, environmental,
              and data protection laws (including the Digital Personal Data
              Protection Act, 2023).
            </li>
          </ul>
          <p className="mt-4">
            The Company may request proof of authorization for enterprise
            accounts.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-6">
            4. Subscription, Fees & Payments
          </h2>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            4.1 Subscription Plans
          </h3>
          <p className="mb-3">AGGROW may offer:</p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>Free trial plans</li>
            <li>Tiered subscription plans</li>
            <li>Enterprise pricing agreements</li>
            <li>Custom B2B contracts</li>
          </ul>
          <p className="mb-4">Features vary depending on the selected plan.</p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            4.2 Payment Terms
          </h3>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>
              Fees are charged in advance via Google Play billing or authorized
              processors.
            </li>
            <li>All fees are non-refundable except as required by law.</li>
            <li>Applicable taxes (e.g., GST) will be added.</li>
            <li>You must provide valid, current payment details.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            4.3 Auto-Renewal
          </h3>
          <p className="mb-4">
            Subscriptions renew automatically unless cancelled via Google Play
            or your enterprise agreement. Renewal charges will be applied to
            your payment method on file.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            4.4 Enterprise Contracts
          </h3>
          <p className="mb-3">
            If you are using AGGROW under a signed enterprise agreement:
          </p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>
              The written enterprise agreement shall prevail in case of any
              conflict with these Terms.
            </li>
            <li>
              Payment timelines, SLA commitments, and custom pricing will be
              governed by that contract.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            4.5 Suspension for Non-Payment
          </h3>
          <p className="mb-3">We reserve the right to:</p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>Suspend or restrict access for overdue accounts.</li>
            <li>Downgrade features after failed payment attempts.</li>
            <li>Terminate services for prolonged non-payment.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            4.6 Price Changes
          </h3>
          <p className="mb-4">
            We may adjust fees with at least 30 days' notice (via in-app
            notification, email, or updated Terms). Continued use of the Service
            after the effective date of any price change constitutes your
            acceptance of the new fees.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            5. Data Ownership & Agricultural Data Rights
          </h2>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            5.1 User Data
          </h3>
          <p className="mb-4">
            You own your farm data, crop data, soil information, and operational
            data. You grant us a limited, non-exclusive, worldwide, royalty-free
            license to process, store, analyze, and use anonymized/aggregated
            forms to deliver and improve Services. See our Privacy Policy for
            details.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            5.2 Aggregated Data
          </h3>
          <p>
            We may use anonymized, aggregated data for research, analytics,
            product improvement, and industry benchmarking without identifying
            individual users.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            6. Compliance With Agricultural & Trade Laws
          </h2>
          <p>
            You must comply with all agricultural, trade, environmental, and
            data laws. Do not use the App for illegal activities (e.g.,
            unauthorized pesticide distribution). We bear no liability for your
            non-compliance.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            7. Service Availability & SLA Disclaimer
          </h2>
          <p>
            No guarantees of uninterrupted access unless specified in an
            enterprise SLA. We are not liable for downtime from internet issues,
            third-party providers, government sources, force majeure, or
            similar.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            8. Limitation of Agricultural & Commercial Liability
          </h2>
          <p className="mb-4">
            To the fullest extent permitted by law: Bartronics India Limited
            shall NOT be liable for:
          </p>
          <ul className="space-y-2 text-justify ml-4 list-disc mb-4">
            <li>Crop loss</li>
            <li>Weather-related damage</li>
            <li>Pest outbreaks</li>
            <li>Market price fluctuations</li>
            <li>Supply-chain disruption</li>
            <li>Financial loss</li>
            <li>Loss of government subsidy eligibility</li>
            <li>Business interruption</li>
          </ul>
          <p>
            Total liability shall not exceed the total subscription fees paid by
            you in the preceding 12 months.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            9. Indemnification
          </h2>
          <p className="mb-3">
            You agree to indemnify and hold harmless Bartronics India Limited
            against:
          </p>
          <ul className="space-y-2 text-justify ml-4 list-disc">
            <li>Claims arising from misuse of agricultural data</li>
            <li>Regulatory violations by your enterprise</li>
            <li>Third-party claims relating to your farming practices</li>
            <li>Unauthorized resale or distribution of the Services</li>
          </ul>
        </section>

        {/* Section 10 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            10. Intellectual Property
          </h2>
          <p>
            Our software, algorithms, models, dashboards, designs, trademarks,
            and frameworks are our exclusive property. You may not
            reverse-engineer, extract data, resell, or build competitors using
            the App.
          </p>
        </section>

        {/* Section 11 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            11. Confidentiality (Enterprise Users)
          </h2>
          <p>
            Enterprise users must keep our pricing, architecture, and processes
            confidential without written consent.
          </p>
        </section>

        {/* Section 12 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            12. Termination
          </h2>
          <p className="mb-3">We may suspend or terminate accounts for:</p>
          <ul className="space-y-2 text-justify ml-4 list-disc mb-4">
            <li>Non-payment</li>
            <li>Regulatory violations</li>
            <li>Fraud</li>
            <li>Abuse of platform services</li>
            <li>Breach of these Terms</li>
          </ul>
          <p>Termination does not waive outstanding payment obligations.</p>
        </section>

        {/* Section 13 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            13. Force Majeure
          </h2>
          <p className="mb-3">
            The Company shall not be liable for failure or delay due to:
          </p>
          <ul className="space-y-2 text-justify ml-4 list-disc">
            <li>Natural disasters</li>
            <li>Government actions</li>
            <li>Pandemic</li>
            <li>War</li>
            <li>Power outages</li>
            <li>Telecom failure</li>
          </ul>
        </section>

        {/* Section 14 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            14. Governing Law & Jurisdiction
          </h2>
          <p className="mb-4">
            These Terms shall be governed by the laws of India.
          </p>
          <p className="mb-4">
            Disputes shall be subject to the exclusive jurisdiction of courts
            located in Hyderabad, India.
          </p>
          <p>
            For enterprise agreements, arbitration clauses may apply if
            separately agreed.
          </p>
        </section>

        {/* Section 15 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-4">
            15. Contact Information
          </h2>
          <div className="bg-card p-6 rounded-lg border border-border">
            <p className="font-semibold text-foreground mb-2">
              Bartronics India Limited
            </p>
            <p className="text-sm mb-3">
              <span className="font-semibold">Registered office:</span> Trendz
              Atria House No. 3-196/NR, Plot No.196, 4th Floor, Survey No.48
              part, Guttala Begumpet Village, Kavuri Hills, Madhapur,
              Serilingampally Mandal, Ranga Reddy District, Hyderabad, Telangana
              - 500081
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:info@bartronics.com"
                className="text-primary hover:underline"
              >
                info@bartronics.com
              </a>
            </p>
            <p className="text-sm">
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:04049269269"
                className="text-primary hover:underline"
              >
                040-49269269
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
