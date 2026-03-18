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
                AgGrow
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
              AgGrow Mobile Application
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Provided by Bartronics India Limited
            </p>
            <p className="text-sm text-foreground font-semibold pt-2">
              Effective Date: 12 February, 2026
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
              AgGrow ("App") is an enterprise-focused agriculture technology
              platform owned and operated by Bartronics India Limited, a company
              incorporated under the laws of India ("Company", "we", "our", or
              "us").
            </p>
            <p>
             The App provides digital tools such as farm management, analytics, advisory insights, dashboards, reporting tools, traceability support, and supply chain enablement (collectively, “Services”).
            </p>
            <p>
              AgGrow is a private technology platform and is NOT affiliated with, endorsed by, or representing any government authority, ministry, or agency.
            </p>
            <p>
             By accessing or using the App, you agree to be bound by these Terms of Use (“Terms”).
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            2. Nature of Services 
          </h2>
          <p className="mb-4">
            AgGrow provides data-driven insights, advisory inputs, analytics
            tools, and enterprise management support tools. The services are intended solely as decision-support tools and should not be relied upon as a substitute for professional agronomic, financial, or legal advice.
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
          <p>
            Any references to government programs or public initiatives are provided strictly for informational purposes.
          </p>
        </section>

        {/* Section 3 */}
         <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            3. Government Information Disclaimer
          </h2>
          <div className="space-y-4 text-justify">
            <p>
            The AgGrow Mobile Application may display or reference publicly available information related to agricultural schemes, weather updates, market prices, policies, or other agricultural resources for informational purposes only.
            </p>
            <p>
              AgGrow is a private agriculture technology platform operated by Bartronics India Limited.
            </p>
            <p>
              AgGrow does NOT represent, endorse, or operate on behalf of any Government authority, ministry, department, or agency.
            </p>
           <p>
            The App does not process, submit, or approve applications for government schemes, subsidies, or benefits, unless explicitly stated through a separate written authorization or official partnership.
           </p>
           <p>
            Information related to government programs or public initiatives is obtained from publicly available official government portals and open data sources.
           </p>
           <p>
            AgGrow does not guarantee the completeness, accuracy, or timeliness of government-related information, and users should verify details directly from the respective official government websites before taking any action.
           </p>
          </div>
        </section>
{/* Section 4 */}
  <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            4. Eligibility & Enterprise Use
          </h2>
          <p className="font-semibold text-foreground mb-3">
            You represent that:
          </p>
          <ul className="space-y-2 text-justify ml-4 list-disc">
            <li>
             You are authorized to bind the farm, enterprise, organization, Farmer Producer Organisation (FPO)/ Farmer Producer Company (FPC), distributor, or corporate entity you represent.
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
         
        </section>
        {/* Section 5*/}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-6">
            5. Subscription, Fees & Payments
          </h2>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            5.1 Subscription Plans
          </h3>
          <p className="mb-3">AgGrow may offer:</p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>Free trial plans</li>
            <li>Tiered subscription plans</li>
            <li>Enterprise pricing agreements</li>
            <li>Custom B2B contracts</li>
          </ul>
          <p className="mb-4">Features vary depending on the selected plan.</p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            5.2 Payment Terms
          </h3>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>
              Fees are charged in advance via Google Play billing or authorized
              processors.
            </li>
            <li>All fees are non-refundable except as required by law.</li>
            <li>Applicable taxes (e.g., GST) will be added.</li>
            <li>You must provide valid, current payment details.</li>
            <li>Payments must be made in the specified currency, and you are responsible for any currency conversion charges.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            5.3 Auto-Renewal
          </h3>
          <p className="mb-4">
            Subscriptions renew automatically unless cancelled via Google Play
            or your enterprise agreement. Renewal charges apply to your payment method.
          </p>

          

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            5.4 Suspension for Non-Payment
          </h3>
          <p className="mb-3">We reserve the right to:</p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>Suspend or restrict access for overdue accounts.</li>
            <li>Downgrade features after failed payment attempts.</li>
            <li>Terminate services for prolonged non-payment.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            5.5 Price Changes
          </h3>
          <p className="mb-4">
            We may adjust fees with at least 30 days' notice. Continued use after notice constitutes acceptance.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            6. Data Ownership & Use
          </h2>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.1 Ownership of User Data
          </h3>
          <p className="mb-4">
           You retain all rights, title, and interest in and to the data you submit, upload, generate, or transmit through the App, including but not limited to farm records, crop information, soil data, operational data, financial inputs, images, geolocation information, device data, and enterprise records (“User Data”).
          </p>
 <p>
  Nothing in these Terms transfers ownership of User Data to the Company.
 </p>
          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.2 License to Use Data
          </h3>
          <p>
           By using the Services, you grant the Company a limited, non-exclusive, worldwide, royalty-free, revocable license to collect, process, store, host, transmit, analyse, and use User Data solely for the following purposes:
          </p>
         <ol className="list-none ">
  <li>(a) Providing, maintaining, and improving the Services</li>
  <li>(b) Generating insights, analytics, reports, and decision-support tools</li>
  <li>(c) Enabling platform functionality and user support</li>
  <li>(d) Ensuring security, fraud detection, and system integrity</li>
  <li>(e) Performing internal research, testing, and product development</li>
  <li>(f) Complying with legal or regulatory obligations</li>
</ol>
          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          6.3 Aggregated and Anonymized Data
          </h3>

          <p>
            The Company may create anonymized, de-identified, or aggregated datasets derived from User Data that do not identify any individual user, farm, or enterprise.
          </p>
          <br/>
           <p className="mb-3">Such aggregated data may be used for:</p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>Statistical analysis</li>
            <li>Product improvement</li>
            <li>Research and development</li>
            <li>
              Benchmarking and industry insights
            </li>
            <li>
              Training analytical or machine learning models
            </li>
          </ul>
          <p>
            Aggregated data shall not be used to identify or target individual users.
          </p>
          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.4 Data Processing Transparency
          </h3>
          <p>
            We process data in accordance with applicable data protection laws, including the Digital Personal Data Protection Act, 2023.
          </p>
          <br/>
          <p>
            We implement reasonable administrative, technical, and organizational safeguards designed to protect data against unauthorized access, loss, misuse, or disclosure.
          </p>
           <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.5 Personal Data and Consent
          </h3>
          <p>
            Where User Data includes personal information, you represent that you have obtained all necessary consents and lawful authority to provide such data.
          </p>
          <br/>
          <p>
            You agree to use the App in compliance with applicable privacy and data protection laws
          </p>
        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.6 Government and Public Data Sources
          </h3>
          <p>
            Where the App integrates or displays publicly available data (including weather feeds, market prices, or government information), such data is sourced from third-party or official public sources and is provided for informational purposes only.
          </p>
          <p>
            <br/>
            The Company does not guarantee accuracy or completeness of such external data.
          </p>
        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.7 Data Sharing with Service Providers
          </h3>
          <p>
            We may share User Data with trusted service providers, cloud infrastructure providers, analytics partners, or contractors strictly on a need-to-know basis and subject to confidentiality and data protection obligations.
          </p>
          <br/>
          <p>
            We do not sell personal data.
          </p>
           <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.8 Data Security
          </h3>
        <p>
          While we implement commercially reasonable security measures, no system can be completely secure. You acknowledge and accept inherent risks associated with digital platforms and internet transmissions.
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          6.9 Data Retention
        </h3>
        <p>
          We retain User Data only for as long as necessary to provide the Services, comply with legal obligations, resolve disputes, enforce agreements, and maintain business records.
        </p>
        <br/>
        <p>
          Upon account termination, data may be deleted, anonymized, or retained as required by law or legitimate business purposes.
        </p>
       <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
          6.10 User Responsibilities
        </h3>
         <p className="mb-3">You are responsible for:</p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>Accuracy of data you provide</li>
            <li>Maintaining confidentiality of account credentials</li>
            <li>Ensuring lawful collection of data entered into the App</li>
            <li>
              Backing up critical records where necessary
            </li>
           
          </ul>
          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.11 Data Portability and Access
          </h3>
          <p>
            Subject to technical feasibility and applicable laws, you may request access to or export of your data through supported features or by contacting us.
          </p>
           <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.12 AI and Analytics Use
          </h3>
          <p>
            Where analytics, automation, or AI tools are used, outputs are generated based on available data and models and are intended solely as informational support.
          </p>
          <br/>
          <p>
            They should not be treated as guaranteed outcomes or professional advice.
          </p>
          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.13 Cross-Border Processing
          </h3>
          <p>
            User Data may be processed or stored on secure servers located in jurisdictions permitted under applicable law.
          </p>
          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.14 Suspension or Legal Disclosure
          </h3>
           <p className="mb-3">We may access, preserve, or disclose data if required to:</p>
          <ul className="space-y-2 text-justify ml-6 list-disc mb-4">
            <li>Comply with law or legal process</li>
            <li>Enforce these Terms</li>
            <li>Protect users or platform security</li>
            <li>
             Investigate fraud or misuse
            </li>
           
          </ul>
           <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.15 No Unauthorized Commercial Use
          </h3>
          <p>
            You agree not to extract, scrape, or misuse platform data for unauthorized commercial purposes.
          </p>
          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">
            6.16 Survival
          </h3>
          <p>
            This section shall survive termination of your account or these Terms.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            7. Compliance With Laws
          </h2>
          <p>
          You agree not to use the App for unlawful activities, including unauthorized sale of regulated agricultural inputs.
          </p>
          <p>
            We are not responsible for your regulatory compliance.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            8. Service Availability 
          </h2>
          <p>
           We use commercially reasonable efforts to keep the AgGrow platform available; however, the Services are provided on an “as available” and “as is” basis without guarantees of uninterrupted or error-free operation.
          </p>
          <br/>
          <p>
            Access may be limited or interrupted due to maintenance, technical issues, internet or telecom failures, third-party service disruptions (including weather or data providers), security updates, or events beyond our control.
          </p>
          <br/>
          <p>
            We may modify, suspend, or discontinue features at any time to improve the Services or comply with legal or operational requirements.
          </p>
          <br/>
          <p>
            We are not responsible for downtime caused by user devices, connectivity issues, or external systems. Any service level commitments apply only where expressly agreed in a separate written enterprise agreement.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            9. Limitation of Liability
          </h2>
          <p className="mb-4">
            To the maximum extent permitted by law, the Company is not liable for:
          </p>
          <ul className="space-y-2 text-justify ml-4 list-disc mb-4">
            <li>Crop loss</li>
            <li>Weather impacts</li>
            <li>Pest or disease events</li>
            <li>Market price changes</li>
            <li>Loss of subsidy eligibility</li>
            <li>Financial losses</li>
            <li>Business interruption</li>
           
          </ul>
          <p>
            Total liability shall not exceed the total subscription fees paid by
            you in the preceding 12 months.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            10. Indemnification
          </h2>
          <p className="mb-3">
           You agree to indemnify the Company against claims arising from misuse of the App, regulatory violations, or third-party disputes related to your operations.
          </p>
         
        </section>

        {/* Section 11 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            11. Intellectual Property
          </h2>
          <p>
            Our software, algorithms, models, dashboards, designs, trademarks,
            and frameworks are our exclusive property. You may not
            reverse-engineer, extract data, resell, or build competitors using
            the App.
          </p>
        </section>

        {/* Section 12 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            12. Confidentiality (Enterprise Users)
          </h2>
          <p>
            Enterprise users must keep our pricing, architecture, and processes
            confidential without written consent.
          </p>
        </section>

        {/* Section 13 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            13. Termination
          </h2>
          <p className="mb-3">We may suspend or terminate accounts for:</p>
          <ul className="space-y-2 text-justify ml-4 list-disc mb-4">
            <li>Non-payment</li>
            <li>Regulatory violations</li>
            <li>Fraud</li>
            <li>Abuse of platform services</li>
            <li>Breach of these Terms</li>
            <li>
              Termination does not waive outstanding payment obligations accrued prior to termination, including outstanding payment obligations.
            </li>
          </ul>
         
        </section>

        {/* Section 14 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            14. Force Majeure
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
            <li>Telecom failure or similar events beyond our reasonable control</li>
          </ul>
        </section>

        {/* Section 15 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-primary mb-4">
            15. Governing Law & Jurisdiction
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

        {/* Section 16 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-4">
            16. Contact Information
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
